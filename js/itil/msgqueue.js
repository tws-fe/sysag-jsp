

function MsgQueueAgent(o){
	if (!o){
		return this;
	}
	this.poll_url = o.poll_url || CONTEXTPATH + '/user.do?method=pollMessage';
	this.poll_break_url = o.poll_break_url || CONTEXTPATH + '/user.do?method=pollBreak';
	this.timeout = o.timeout || (120 * 1000);
	this.window = window;
};

function MsgQueueInfo(agent, option){
	this.agent = agent;
	this.option = option;
	this.qname = option.qname;
}



(function(MsgQueueAgent, $){
	
	MsgQueueAgent.prototype.poll_url = CONTEXTPATH + '/user.do?method=pollMessage';
	MsgQueueAgent.prototype.poll_break_url = CONTEXTPATH + '/user.do?method=pollBreak';
	MsgQueueAgent.prototype.timeout = 120 * 1000;
	MsgQueueAgent.prototype.poller = {};
	MsgQueueAgent.prototype.window = window;
	
	// 判斷是否  hook 的委託对象的 window 被回收而引起的異常
	MsgQueueAgent.isReleaseHookException = function(e){
		var browser = navigator.userAgent;
		if (browser.indexOf('WebKit') >= 0){
			return e.indexOf('opener');
		} else if (browser.indexOf('Trident') >= 0){
			return e.indexOf('Script');
		} else if (browser.indexOf('Firefox') >= 0){
			return e.indexOf('');
		} else {
			return e.indexOf
		}
	}; // MsgQueueAgent.isReleaseHookException
	
	/** 加一个記錄 poll 的數据結构 */
	MsgQueueAgent.prototype.setMsgQueueInfo = function(option){
		if (!option || !option.qname){
			throw 'option / option.qname is null';
		}
		var poller = this.poller[option.qname];
		if (poller){
			poller.option = option;
		} else {
			this.poller[option.qname] = poller = new MsgQueueInfo(this, option);
			var fn = function(){
				poller.agent.pollBreak(poller.qname);
			}
			if (this.window.addEventListener){
				this.window.addEventListener('beforeunload', fn);
			} else {
				this.window.onbeforeunload = fn;
			}			
			poller.unloadHooked = true;
		}
		return poller;
	}; // MsgQueueAgent.prototype.setMsgQueueInfo 
	
	/** 
	 * 將消息出队, 若暫無消息則阻塞, 造成長連接, 
	 * 設置 timeout 固定时間超時后自动重連 
	 */
	MsgQueueAgent.prototype.poll = function(o, isCustomer){
		if (o == undefined || !o.qname){
			throw 'option / option.qname is null';
		}
		o.context = o.agent = this;
		var poller = this.poller[o.qname];
		if (poller){
			if (poller.timer){ // 清連接異常計时器
				clearTimeout(poller.timer);
			}
		}
		
		o.url = o.url || this.poll_url; 
		o.timeout = o.timeout || this.timeout; // 長連接超时时間, 防不釋放服務器線程, 建議  60  至 180 秒
		o.timeout = o.timeout * 1;
		if (o.timeout <= 30000){
			o.timeout = 60 * 1000;
		}
		o.create = o.create || '1';
		o.data = o.data || {};
		
		o.data.qname = o.qname;
		o.data.create = o.create;
		o.data.filter = o.filter;
		o.data.mode = o.mode;
		o.data.timeout = o.timeout;
		
		poller = this.setMsgQueueInfo(o); // 加一个 MsgQueueInfo
		poller.state = 1;
		
		// 非主人类的  poll, 將  success, error 放在 hook 上, 正式回調置空
		if (isCustomer){  
			this.pollHook(o.qname, 'success', o.success);
			this.pollHook(o.qname, 'error', o.error);
			o.success = null;
			o.error = null;
		}
		// poll ajax, ajax 的  context 是对應 qname 的  MsgQueueInfo (poller)
		jQuery.ajax({
			async : true,
			type : 'POST',
			dataType : 'text',
			url : o.url,
			data : o.data,
			timeout : o.timeout,
			context : poller,
			complete : function (xhr, status){
				// this 是对應的 MsgQueueInfo, o 是  option, agent 是  MsgQueueAgent
				var o = this.option;
				var agent = this.agent;
				try {
					var code = xhr.status;
					if (xhr.responseText && xhr.responseText.indexOf('http-equiv') >= 0){
						code = 500;
					}
				} catch (e){
					console.log(e);
				}
				this.state = 2;
				switch(code){
				case 200: // success
					// success callback
					try {
						this.state = 3;
						o.retry_interval = 0; // 異常重連間隔歸零
						if (o.success){ 
							if (o.success.call(this, xhr.responseText, xhr, status) == false){
								return;
							}
						}
						if (o.count != undefined){ // 計數器
							o.count = o.count - 1;
							if (o.count == 0){
								return;
							}
						}
					} catch (e){ console.log(e); }
					// success hooks
					if (this.hook){
						var hooks = this.hook['success'];
						if (hooks && hooks instanceof Array){
							for(var i = 0; i < hooks.length; i++){
								try {
									if (hooks[i]){
										hooks[i].func.call(this, xhr.responseText, xhr, status);
									}
								} catch (e) { 
									console.log(e); 
								}
							}
						}
					}
					// poll loop
					agent.poll(o);
					break;
				case 0:
				default: // error
					this.state = -3;
					if (o.error){
						try {
							if (o.error.call(this, xhr, status) == false){
								return;
							}
						} catch (e){ console.log(e); }
					}
					// error hooks
					if (this.hook){
						var hooks = this.hook['error'];
						if (hooks && hooks instanceof Array){
							for(var i = 0; i < hooks.length; i++){
								try {
									if (hooks[i]){
										hooks[i].func.call(this, xhr, status);
									}
								} catch (e) { 
									console.log(e); 
								}
							}
						}
					}
					 
					if (status == 'timeout'){ // 正常的無消息超时, 入 poll loop
						agent.poll(o);
					} else { // 其他異常, 过一度时間重連
						if (!o.retry_interval){
							o.retry_interval = 3000;
						} else {
							o.retry_interval = (o.retry_interval * 1.2) + 3000; // 異常重連时間一直加長
						}
						this.timer = setTimeout(function(){
							agent.poll(o);
						}, o.retry_interval);
					}
					break;
				} 
				
			}
		}); // jQuery.ajax()
	}; // MsgQueueAgent.prototype.poll
	
	
	/**
	 * 將回調加在另一個 MsgQueueAgent 的 poll 連接上
	 */
	MsgQueueAgent.prototype.pollHook = function(qname, type, hook, win){ // poll 构
		if (!qname || !type){
			throw 'qname / customer / type / hook is null or undefined'; 
		}
		if (!win){
			throw 'anchar window for agent is null';
		}
		var poller = this.poller[qname];
		if(!poller){
			return false;
		}
		if (!poller.hook){
			poller.hook = {};
		}
		if (!poller.hook[type]){
			poller.hook[type] = [];
		}
		poller.hook[type].push({ // window 是用來發現委託頁面是否还存在
			'window' : win,
			'func' :  hook
		});
		var fn = function(){ // 委託的 window 清除 hook
			var hooks = poller.hook[type];
			var findHook = false;
			for(var i = 0; i < hooks.length; i++){		
				if (findHook){
					hooks[i] = hooks[i + 1];
				} else if (hooks[i].window == win){
					delete hooks[i]; 
					hooks[i] = hooks[i + 1];
					findHook = true;
				}
			}
		};
		if (win.addEventListener){
			win.addEventListener('beforeunload', fn);
		} else {
			win.onbeforeunload = fn;
		}
		
		return true;
	}; // MsgQueueAgent.prototype.pollHook
	
	/**
	 * 委託一个上層 frame 的 MsgQueueAgent 來 poll
	 * 回調透过上層 MsgQueueAgent hook 进行
	 * 要用这种方法是因為一个頁面多个 frame 下, 对同一个队列作出队会分散消息 (除非后台有对應的机制)
	 * 所以同一頁面多个 frame 对同一队列, 統一由一個上級的 MsgQueueAgent 來 poll, 
	 * 其他 frame 的 MsgQueueAgent 只是作回調, 消息分發在前端进行
	 * 这个方法無法跨頁面 
	 */
	MsgQueueAgent.prototype.pollForMe = function(o){ // 將  poll 的拉取工作交給其他  frame 中的对象, 回調放入 hook 完成 
		if (!o || !o.agentName){ // o.agent 是目标 frame 存在的对象名, 如  MainIndex
			throw 'o / o.agentName is null or undefined';
		}
		var domUtil = DomUtil.init();
		var tFrame = {}; 
		var agent = domUtil.getParentObj(o.agentName, tFrame); // 循環向上找 frame
		if (agent == null){
			throw 'cannot find agent ' + o.agentName;
		}
		var poller = agent.poller[o.qname]; 
		if (!poller){
			agent.poll(o, true);
		} else {
			agent.pollHook(o.qname, 'success', o.success, o.window || window);
			agent.pollHook(o.qname, 'error', o.error, o.window || window);
		}
	}; // MsgQueueAgent.prototype.hookForUs
	
	/**
	 * 將对队列 poll 的線程強制喚醒, 解除阻塞
	 */
	MsgQueueAgent.prototype.pollBreak = function(qname, success, error){ // 發出請求喚醒后台  poll 線程
		jQuery.ajax({
			type : 'POST',
			dataType : 'text',
			url : this.poll_break_url,
			context : this.poller[qname] || this,
			data : {
				qname : qname
			},
			success : success || function(r){},
			error : error || function(xhr, status){}
		}); // jQuery.ajax();
	}; // MsgQueueAgent.prototype.pollBreak
	
	MsgQueueAgent.prototype.offer = function(o){
		if (o == undefined || !o.qname){
			throw 'o / o.qname is null';
		}
		jQuery.ajax({
			
		}); // jQuery.ajax();
	}; // MsgQueueAgent.prototype.offer
})(MsgQueueAgent, jQuery);

(function(MsgQueueInfo, $){
	
	MsgQueueInfo.prototype.agent = null;
	MsgQueueInfo.prototype.qname = null;
	MsgQueueInfo.prototype.option = null;
	MsgQueueInfo.prototype.timer = null;
	MsgQueueInfo.prototype.state = 0;
	
	MsgQueueInfo.prototype.hook = {
		success : new Array(),
		error : new Array()
	};
	
})(MsgQueueInfo, jQuery);
