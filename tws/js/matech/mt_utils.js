/*
 *  全局公用函数
 * 该全局公用函数主要是考虑到mt_common函数中比较杂乱，故重新进行编写，将本系统中使用到的一些
 * 公用的函数进行归类，为了不与com文件函数冲突，增加命名空间global
 * 
 */
Ext.Ajax.timeout=300000;

if (!this.matech) {
    this.matech = {};
}
(function () {
	/*
	 * 打印对象所有属性及值
	 * 
	 * 参数：对象
	 * 
	 */
	matech.showObjectMsg=function(objs){
		var _str="";
		for(var obj in objs){
			_str=_str+obj+":"+objs[obj]+",";
		}
		alert(_str);
	};
	/*
	 * 
	 * 增加系统锁
	 * 
	 */	
	matech.addSysLock=function(){
		var _key=new UUID().createUUID();
		var _url="";
	   	var _request="";
	   	//加锁
	   	_url=MATECH_SYSTEM_WEB_ROOT+"/general.do?method=addSysGlobalLocked";
	   	_request="&key="+_key;
	   	var result=ajaxLoadPageSynch(_url, _request);
	   	if(result=="Y"){
	   		return _key;
	   	}else{
	   		alert("无法执行加锁程序，请联系管理员！");
	   	}		
	};
	/*
	 * 
	 * 释放系统锁
	 * 
	 * 参数：锁ID
	 * 
	 */		
	matech.removeSysLock=function(lockKey){
		Ext.Ajax.request({      
	       url:MATECH_SYSTEM_WEB_ROOT+'/general.do?method=removeSysGlobalLocked',   
	       params:{
	    	   key:lockKey   
	        } 
  		});		
	};
	/*
	 * 
	 * 查看锁状态
	 * 
	 * 参数1：锁ID
	 * 参数2：等待提示信息
	 * 参数3：回调函数
	 * 
	 */		
	matech.checkSysLock=function(lockKey,waitMsg,callback){
		var _resizeInterval=null;
   		if(waitMsg){
	   		matech.showWaiting("100%","100%",waitMsg);
   		}else{
	   		matech.showWaiting("100%","100%","正在更新数据，请稍后....");
   		}	
   		_resizeInterval=setInterval(checkState,500);
   			
    	function checkState(){
    		Ext.Ajax.request({      
    		       url:MATECH_SYSTEM_WEB_ROOT+'/general.do?method=isSysGlobalLocked',   
    		       params:{
    		    	   key:lockKey
    		        },   
    		        success: function(resp,opts) {  
    		            if(resp.responseText=="N"){
    		            	matech.stopWaiting();
    		            	clearInterval(_resizeInterval);
    		            	callback();
    		            };		                    
    		        }     
    		});
    	}
	};
	/*
	 * 
	 * 加排斥锁执行请求
	 * 
	 * 
	 * 参数1：请求URL
	 * 参数2：请求参数
	 * 参数3：回调函数
	 * 参数4：等待提示信息
	 * 参数5：排斥锁ID
	 * 
	 */		
	matech.ajaxLoadPage=function(url,request,callback,waitMsg,lockKey) {
		var _key=lockKey||new UUID().createUUID();
	   	var _resizeInterval=null;
	   	var _url="";
	   	var _request="";
	   	
	   	//加锁
	   	_url=MATECH_SYSTEM_WEB_ROOT+"/general.do?method=addSysGlobalLocked";
	   	_request="&key="+_key;
	   	var result=ajaxLoadPageSynch(_url, _request);
	   	if(result=="Y"){
	   		if(waitMsg){
		   		matech.showWaiting("100%","100%",waitMsg);
	   		}else{
		   		matech.showWaiting("100%","100%","正在更新数据，请稍后....");
	   		}
	   		_resizeInterval=setInterval(checkState,500);
	   		
	   		ajaxLoadPageCallBack(url,request,function(){
		   			removeState();
		   			matech.stopWaiting();
		   			callback();			   		
	   		});		
	   								   		 		
	   	}else{
	   		alert("无法执行加锁程序，请联系管理员！");
	   	}

    	function checkState(){
    		Ext.Ajax.request({      
    		       url:MATECH_SYSTEM_WEB_ROOT+'/general.do?method=isSysGlobalLocked',   
    		       params:{
    		    	   key:_key
    		        },   
    		        success: function(resp,opts) {  
    		            if(resp.responseText=="N"){
    		            	clearInterval(_resizeInterval);
    		            	callback();
    		            };		                    
    		        }     
    		});
    	}		
		
    	function removeState(){
    		Ext.Ajax.request({      
   		       url:MATECH_SYSTEM_WEB_ROOT+'/general.do?method=removeSysGlobalLocked',   
   		       params:{
   		    	   key:_key   
   		        } 
      		});
    	}
		
	};
	
	
	matech.addPageListener=function(_nodeType,_key,_listenerVaule,_callback) {
		var _resizeInterval=null;
		
		_resizeInterval=setInterval(_checkState,500);
		
		function _checkState(){
			matech.getCacheValue(_nodeType,_key,function(obj){
				for(var index=0;index<_listenerVaule.length;index++){
					if(obj==_listenerVaule[index]){
						clearInterval(_resizeInterval);
						matech.removeCache(_nodeType,_key);
						_callback(obj);
						break;
					}
				}
			});
		}
		
	};
	
	/*
	 * 
	 * 获取缓存值
	 * 
	 * 
	 * 参数1：缓存类型
	 * 参数2：缓存key
	 * 参数3：回调函数
	 * 参数4：是否异步
	 * 
	 */		
	matech.getCacheValue=function(_nodeType,_key,_callback,_async) {
	   	var result="";
	   	var async=_async||true;
	   	if(!_key || _key==""){
	   		return;
	   	}
		$.ajax({
			cache: false,
			type: "POST",
			url:MATECH_SYSTEM_WEB_ROOT+"/general.do?method=getCacheValue",
			data:{nodeType:_nodeType,key:_key},
			async: async,
			error: function(request) {
			},
			success: function(data) {
				result=unescape(data);
				if(_callback){
					_callback(result);	
				}		
			}
		});
		
	};	
	/*
	 * 
	 * 移除缓存值
	 * 
	 * 
	 * 参数1：缓存类型
	 * 参数2：缓存key
	 * 参数3：回调函数
	 * 参数4：是否异步
	 * 
	 */		
	matech.removeCache=function(_nodeType,_key,_callback,_async) {
	   	var result="";
	   	var async=_async||true;
		$.ajax({
			cache: false,
			type: "POST",
			url:MATECH_SYSTEM_WEB_ROOT+"/general.do?method=removeCache",
			data:{nodeType:_nodeType,key:_key},
			async: async,
			error: function(request) {
			},
			success: function(data) {
				result=unescape(data);
				if(_callback){
					_callback(result);	
				}	
			}
		});
		
	};	
	/*
	 * 
	 * 获取主界面指针
	 * 
	 * 参数1：页面父级对象
	 * 
	 */		
	matech.getIndexPoint=function(parent){
		if(!parent.mainTab){
			parent=parent.parent;
		}
		if(!parent.mainTab){
			parent=parent.parent;
		}
		if(!parent.mainTab){
			parent=parent.parent;
		}
		if(!parent.mainTab){
			parent=parent.parent;
		}		
		if(!parent.mainTab){
			alert("找不到主页面的窗口对象！");
		}
		
		return parent;
	};
	/*
	 * 
	 * 在主界面mainTab中打开一个新的标签
	 * 
	 * 参数1：标签ID
	 * 参数2：标签名称
	 * 参数3：标签URL
	 * 参数4：是否显示滚动条
	 * 参数5：页面父级对象
	 * 
	 */		
	matech.openTab = function(id,name,url,scroll,parent) {
		if(!parent.mainTab){
			parent=parent.parent;
		}
		if(!parent.mainTab){
			parent=parent.parent;
		}
		if(!parent.mainTab){
			parent=parent.parent;
		}
		if(!parent.mainTab){
			alert("找不到主页面的窗口对象！");
		}
		if(url.indexOf(MATECH_SYSTEM_WEB_ROOT+"/")==0){
			url=url.substring(MATECH_SYSTEM_WEB_ROOT.length+1);
		}else if(url.indexOf(MATECH_SYSTEM_WEB_ROOT)==0){
			url=url.substring(MATECH_SYSTEM_WEB_ROOT.length);
		}
		if(scroll.toString()=="true"){
			scroll="是";
		}
		parent.openTab(id,name,url,"0",scroll);
   	
    };    
	/*
	 * 
	 * 关闭主界面mainTab中的标签
	 * 
	 * 参数1：页面父级对象
	 * 参数2：标签ID
	 * 参数3：关闭后活动Tab的ID
	 * 
	 */		    
	matech.closeTab=function(parent,_id,activeTab){
		if(!parent.mainTab){
			parent=parent.parent;
		}
		if(!parent.mainTab){
			parent=parent.parent;
		}
		if(!parent.mainTab){
			parent=parent.parent;
		}		
		if(!parent.mainTab){
			alert("找不到主页面的窗口对象！");
		}
		if(!_id){
			parent.mainTab.remove(parent.mainTab.getActiveTab()); 
			return;
		}
		var n = parent.mainTab.getComponent(_id);
		if(n){
			parent.mainTab.remove(n);
		}
		if(activeTab){
			parent.mainTab.setActiveTab(activeTab);
		}
	};
	/*
	 * 
	 * 在主界面中打开一个新的window窗口
	 * 
	 * 参数1：窗口参数
	 * 参数2：URL链接
	 * 参数3：页面父级对象
	 * 参数4：回调函数
	 * 
	 */		
    matech.openWin = function(jsonStr,iframUrl,parent,callback) {
    	var param=jsonStr;
    	if(typeof jsonStr=="string"){
    		param=JSON.parse(jsonStr);
    	}
    	var key="";
        if(!param.id){
        	key=new UUID().createUUID();
        	param.id=key;
        }
        key=param.id;

		if(!parent.openWin){
			parent=parent.parent;
		}
		if(!parent.openWin){
			parent=parent.parent;
		}
		if(parent.openWin){
			parent.openWin(param,iframUrl); 
		}else{
			alert("找不到对应的窗口对象！");
			return "false";
		}
        if(callback){
        	matech.openWinListener(key,callback);
        };
        return key;
    };
	/*
	 * 
	 * 在主界面中打开一个新的window窗口
	 * 
	 * 参数1：标题
	 * 参数2：URL链接
	 * 参数3：宽度
	 * 参数4：高度
	 * 参数5：页面父级对象
	 * 参数6：回调函数
	 * 
	 */	    
    matech.openWindow = function(_title,_Url,_width,_height,parent,callback) {
    	var param={};
    	param.id=new UUID().createUUID();
    	param.title=_title;
    	param.width=_width;
    	param.height=_height;
    	
    	return matech.openWin(param,_Url,parent,callback);
    	
    };
	/*
	 * 
	 * 关闭在主界面中打开的window窗口
	 * 
	 * 参数1：页面父级对象
	 * 
	 */	    
    matech.closeWindow=function(parent){
		if(!parent.closeWin){
			parent=parent.parent;
		}
		if(!parent.closeWin){
			parent=parent.parent;
		}
		if(parent.closeWin){
			parent.closeWin(); 
		}else{
			alert("找不到对应的窗口对象！");
		}    	
    };
	/*
	 * 
	 * 窗口关闭回调
	 * 
	 * 参数1：窗口ID
	 * 参数2：回调函数
	 * 
	 */	     
    matech.openWinListener=function(winId,callback){
    	var _resizeInterval=null;
		Ext.Ajax.request({      
		       url:MATECH_SYSTEM_WEB_ROOT+'/general.do?method=addSysGlobalLocked',   
		       params:{
		    	   key:winId   
		        },   
		        success: function(resp,opts) {    
		        	_resizeInterval=setInterval(checkState,500);
		        },    
		        failure: function(resp,opts){
		        	alert("系统错误，无法增加监听器！");
		        }      
		});

    	function checkState(){
    		Ext.Ajax.request({      
    		       url:MATECH_SYSTEM_WEB_ROOT+'/general.do?method=isSysGlobalLocked',   
    		       params:{
    		    	   key:winId
    		        },   
    		        success: function(resp,opts) {  
    		            if(resp.responseText=="N"){
    		            	clearInterval(_resizeInterval);
    		            	callback();
    		            };		                    
    		        }     
    		});
    	}
    };
	/*
	 * 
	 * 在浏览器中打开一个新的IE窗口
	 * 
	 * 参数1:URL地址
	 * 参数2：新窗口位置
	 * 参数3：窗口参数
	 */    
	matech.OpenUrlByWindowOpen = function(url,target,param) {
		var targetTemp = "_blank";
		var paramTemp = "resizable=yes,channelmode=1,toolbar=no,menubar=no,titlebar=no,scrollbars=yes,z-look=yes";

		if (target != "") {
			targetTemp = target;
		}

		if (param != "") {
			paramTemp = param;
		}

		var win=window.open(url, targetTemp, paramTemp);  	
		
		return win;
    };
	/*
	 * 
	 * 判断JS函数是否存在
	 * 
	 * 参数：函数名
	 */   
	matech.funExists=function(funName){
    	try{  
    		if(typeof eval(funName)=="undefined"){
    			return false;
    		} 
    		if(typeof eval(funName)=="function"){
    			return true;
    		}
    	} catch(e){
    		return false;
    	}   		
	};
	/*
	 * 
	 * 显示遮蔽窗
	 * 
	 * 参数1：高度
	 * 参数2：宽度
	 * 参数3：提示信息
	 * 
	 */    
	matech.msgBoxObj=null;
	matech.showWaiting=function(hight,wight,msg){
		if(msg==null||msg=="") {
			msg = "处理中，请稍等……";
		}
		
		if(hight==null||hight==""){
			hight="200";
		}
		if(wight==null||wight==""){
			wight="400";
		}
		  
		var strTalk="<div style=\"text-align:center;\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/tws/css/img/loading.gif\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div><span style=\"font-size:16px;color: red\">"+msg+"</span></div>";
		
		matech.msgBoxObj=Ext.MessageBox.show({
				msg: strTalk,
		        animal:"id1",  
		        width: 400,  
		        modal:true,  
		        icon:Ext.Msg.INFO,
		        closable: true
		});				  
    		
	};
	/*
	 * 
	 * 取消遮蔽窗
	 * 
	 */   
	matech.stopWaiting=function(){
		if(matech.msgBoxObj) {
			matech.msgBoxObj.hide();
	    }   		
	};
	/*
	 * 
	 * 获取文件的扩展名
	 * 
	 * 参数：文件名
	 */   	
    matech.getfilenameext=function(filename){
      return filename.replace(/(.*\.)/g,'').toUpperCase();
    };
	/*
	 * 
	 * 获取主机地址
	 * 
	 */      
    matech.getlocationhost=function (){
      return "http:\/\/"+window.location.host;
    };
    
/************树的级联选择******************************/
/** ***************** 级联选中支持开始 ******************** */
	/*
	 * 
	 * 级联父级
	 * 
	 */
	 matech.cascadeParent=function() {
	 	var pn = this.parentNode;
	 	if (!pn || !Ext.isBoolean(this.attributes.checked))
	 		return;
	 	if (this.attributes.checked) {// 级联选中
	 		pn.getUI().toggleCheck(true);
	 	} else {// 级联未选中
	 		var b = true;
	 		Ext.each(pn.childNodes, function(n) {
	 					if (n.getUI().isChecked()) {
	 						return b = false;
	 					}
	 					return true;
	 				});
	 		if (b)
	 			pn.getUI().toggleCheck(false);
	 	}
	 	pn.cascadeParent();
	 };
	/*
	 * 
	 * 级联所有的子级
	 * 
	 */	 
	 matech.cascadeChildren=function () {
	 	var ch = this.attributes.checked;
	 	if (!Ext.isBoolean(ch))
	 		return;
	 	Ext.each(this.childNodes, function(n) {
	 				n.getUI().toggleCheck(ch);
	 				n.cascadeChildren();
	 			});
	 };
	/*
	 * 
	 * 级联初始化化
	 * 
	 * 参数1：是否级联父级
	 * 参数2：是否级联子级
	 * 
	 */	 
	 matech.cascadeInit=function(parent,children){
		 if(parent){
			 Ext.apply(Ext.tree.TreeNode.prototype, {
		 			cascadeParent : matech.cascadeParent
		 		});	
			 Ext.override(Ext.tree.TreeEventModel, {
		 			onCheckboxClick : Ext.tree.TreeEventModel.prototype.onCheckboxClick
		 					.createSequence(function(e, node) {
		 								node.cascadeParent();
		 							})
			 });
		 }
		 if(children){
			 Ext.apply(Ext.tree.TreeNode.prototype, {
			 			cascadeChildren : matech.cascadeChildren
			 		});
			 Ext.override(Ext.tree.TreeEventModel, {
			 			onCheckboxClick : Ext.tree.TreeEventModel.prototype.onCheckboxClick
			 					.createSequence(function(e, node) {
			 								node.cascadeChildren();
			 							})
			 });			 
		 }
	 };
	/*
	 * 
	 * 级联父级函数
	 * 
	 * 参数1：树对象
	 * 
	 */	 	 
    matech.cascadeFromChild=function(tree){
    	//级联父级
    	function nodeChecked(node,checked){
    	
    		if(node.parentNode.getUI().checkbox!=undefined){
    			var childs=node.parentNode.childNodes;
    				for(var i=0;i<childs.length;i++){
    					if(childs[i].attributes.checked){
    						node.parentNode.getUI().checkbox.checked=true;
    						node.parentNode.attributes.checked=true;
    					}else{
    						node.parentNode.getUI().checkbox.checked=false;
    						node.parentNode.attributes.checked=false;
    						break;
    					}
    				}
    			
    			nodeChecked(node.parentNode,checked);
    		}
    		
    	};  
    	//级联选中的操作
    	tree.on('checkchange', function(node, checked){   
    			node.expand();   
    			node.attributes.checked = checked; 
    			node.eachChild(function(child) {  
    				child.ui.toggleCheck(checked);   
    				child.attributes.checked = checked;   
    				child.fireEvent('checkchange', child, checked);  
    			}); 
    			nodeChecked(node,checked);
    		},tree);  
    };	 
   
/***Grid处理相关函数****************************************************************/
	/*
	 * 
	 * 格式化金额值
	 * 保留2位小数
	 * 
	 * 参数：金额
	 * 
	 */	 
	matech.showMoney=function(content){
		if (content && content!="") {

			var d = parseFloat(content);
			s = d.toFixed(2); // -1,234,568

			if (s.trim().indexOf("-") == 0) {
				return ("<div style=\"text-align:right;color:#FF0000;\">" + s + "</div>");
			} else {
				return ("<div style=\"text-align:right;color:#0000FF;\">" + s + "</div>");
			}
		} else {
			return ("<div style=\"text-align:right; color:#0000FF;\"> - </div>");
		}
	};
	/*
	 * 
	 * 格式化货币值
	 * 
	 * 参数：数字
	 * 
	 */	 	
	matech.showCurrency=function(num) {
	    num = num.toString().replace(/\$|\,/g,'');
	    if(isNaN(num))
	    	num = "0";
	    
	    sign = (num == (num = Math.abs(num)));
	    num = Math.floor(num*100+0.50000000001);
	    cents = num%100;
	    num = Math.floor(num/100).toString();
	    
	    if(cents<10)
	    	cents = "0" + cents;
	    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	    	num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));
	    	
		if (num.trim().indexOf("-") == 0) {
			return ("<div style=\"text-align:right;color:#FF0000;\">" + (((sign)?'':'-') + num + '.' + cents) + "</div>");
		} else {
			return ("<div style=\"text-align:right;color:#0000FF;\">" + (((sign)?'':'-') + num + '.' + cents)+ "</div>");
		}
	};
	/*
	 * 
	 * 格式化百分比
	 * 
	 * 参数：数值
	 * 
	 */	 
	matech.showPercent=function(content){
		if (content && content!="") {

			var d = parseFloat(content);
			s = d.toFixed(2); // -1,234,568

			if (s.trim().indexOf("-") == 0) {
				return ("<div style=\"text-align:right;color:#FF0000;\">" + s + "%</div>");
			} else {
				return ("<div style=\"text-align:right;color:#0000FF;\">" + s + "%</div>");
			}
		} else {
			return ("<div style=\"text-align:right; color:#0000FF;\"> - </div>");
		}
	};
	/*
	 * 
	 * 居中显示
	 * 
	 * 参数：内容
	 * 
	 */	 
	matech.showCenter=function(content){
		if (content && content!="") {
			return ("<div style=\"text-align:center;\">" + content + "</div>");
		} else {
			return "<div>&nbsp;</div>";
		}
	};
	/*
	 * 
	 * Grid销毁回调函数
	 * 
	 * 参数1：Grid对象
	 * 参数2：Grid的ID
	 * 
	 */	 	
	matech.mt_grid_destory=function(gridCmp,tableId){
		//状态发生了改变
		if(gridCmp.isStateDirty){
			 var col_width = "" ;
			 var col_hide = "" ;
			 var col_sort = "" ;
			 var col_seq = "" ;
			 
			 var cms = gridCmp.getColumnModel();
			 var store = gridCmp.getStore();
			 
			 for (var i = 0; i < cms.getColumnCount(); i++) {
				 var col_id = cms.getColumnId(i) ;
				 var colObj = cms.getColumnById(col_id) ;
				// alert("hidden:" + cms.isHidden(i) + " width:" + colObj.width + " id:"+colObj.id+" sort:");
				 col_width += colObj.id + ":" + colObj.width + "," ;
				 col_hide += colObj.id + ":" + cms.isHidden(i) + "," ;
				 col_seq += colObj.id + ":" + i + "," ;
			 }
			 
			 if(col_width != "") col_width = "{" + col_width.substring(0, col_width.length - 1) + "}" ;
			 if(col_hide != "") col_hide = "{" + col_hide.substring(0, col_hide.length - 1) + "}" ;
			 if(col_seq != "") col_seq = "{" + col_seq.substring(0, col_seq.length - 1) + "}" ;
			 
			 if(store.getSortState()){
				 col_sort = "{" + store.getSortState().field + ":'" + store.getSortState().direction + "'}" ;
			 }
			 
			 var url = MATECH_SYSTEM_WEB_ROOT+"/general.do?method=saveGridConfig" ;
			 var request = "&colWidth="+col_width+"&colHide="+col_hide+"&colSort="+col_sort+"&colSeq="+col_seq+"&tableId="+tableId;
			 ajaxLoadPageSynch(url,request) ;
			 
		}
	};	
	/*
	 * 
	 * 新增自定义查询
	 * 
	 * 参数1：Grid的ID
	 * 参数2：
	 * 参数3：
	 * 
	 */	 	
	matech.addQuery=function (tableId,first,nameValue) {

		var trObj ;
		var tdObj ;
		
		var grid = Ext.getCmp(tableId.substring(8));
		
		var columns = grid.getColumnModel().columns;
		
		var name = "" ;
		var value = "" ;
		var operator = "" ;
		var isSelected=false;
		
		if(nameValue){
			
			if(nameValue.indexOf("=") > -1) {
				operator = "=" ;
			}else if(nameValue.indexOf("!=") > -1) {
				operator = "!=" ;
			}else if(nameValue.indexOf(">") > -1) {
				operator = ">" ;
			}else if(nameValue.indexOf("<") > -1) {
				operator = "<" ;
			}else if(nameValue.indexOf(">=") > -1) {
				operator = ">=" ;
			}else if(nameValue.indexOf("<=") > -1) {
				operator = "<=" ;
			}else if(nameValue.indexOf("like") > -1) {
				operator = "like" ;
			}else if(nameValue.indexOf("not like") > -1) {
				operator = "not like" ;
			}
			var nameValueArr = nameValue.split(operator) ;
			name = nameValueArr[0].replace(new RegExp(" ","gm"),""); 
			value = nameValueArr[1].replace(new RegExp(" ","gm"),""); 
			value = value.replace(new RegExp("\\'","gm"),""); 
			value = value.replace(new RegExp("%","gm"),""); 
		}
		
		var tbody = document.getElementById("queryTBody_"+tableId);
		trObj = tbody.insertRow();
		trObj.id = "queryTr_" + tableId;
		
		//连接
		tdObj = trObj.insertCell();
		tdObj.align = "center";
		
		var display = "" ;
		if(first) {
			display = "display:none;" ;
		}
		tdObj.innerHTML = "<div class=selectDiv style=\"width:80px;"+display+"\">"
						+ "<select class=mySelect style=\"width:80px;\" name='query_logic_"+tableId+"' id='query_logic_" + tableId + "'>"
						+ "		<option value='and'>并且(and)</option>"
						+ "		<option value='or'>或者(or)</option>"
						+ "</select>"
						+ "</div>" ;
		
		//列名
		tdObj = trObj.insertCell();
		tdObj.align = "center";
		
		var columnHtml = "<div class=selectDiv style=\"width:120px;\">"
						+ "	<select class=mySelect style=\"width:120px;\" name='query_column_" + tableId + "' id='query_column_" + tableId + "'>" ;
						
		for(var i=0;i<columns.length;i++) {
			var hidden = columns[i].hidden ;
			
			if(hidden){
				continue;
			}
			
			var id = columns[i].freequery || columns[i].id||'' ;
			
			var header = columns[i].header||'' ;
			
			
			var selected = ""; 
			if(id == name) {
				selected = " selected " ;
				isSelected=true;
			}
			 
			if(header != "选" && id != "numberer" && header != "trValue" && id != "chooseValue") {
				columnHtml += "<option value='" + id + "' "+selected+"> " + header + " </option>" ;
			}  
		}

		columnHtml += " </select>";
		columnHtml += " </div>";
		tdObj.innerHTML = columnHtml ;
		
		//运算符
		tdObj = trObj.insertCell();
		tdObj.align = "center";
		
		var index = Math.round(Math.random() * 10000) ;
		tdObj.innerHTML = "<div class=selectDiv style=\"width:80px;\">"
		+ "	<select class=mySelect style=\"width:80px;\" name='query_operator_" + tableId + "' id='query_operator_" + tableId + "_"+index+"'>"
		+ "		<option value='='> 等于(=) </option> "
		+ "		<option value='!='> 不等于(!=) </option> "
		+ "		<option value='>'> 大于(&gt;) </option> "
		+ "		<option value='<'> 小于(&lt;) </option> "
		+ "		<option value='>='> 大于等于(&gt;=) </option> "
		+ "		<option value='<='> 小于等于(&lt;=) </option> "
		+ "		<option value='like' selected> 包含 </option> "
		+ "		<option value='not like'> 不包含 </option> "
		+ " </select>";
		+ " </div>";
		
		if(operator != "") {
			document.getElementById("query_operator_" + tableId + "_"+index).value = operator ;
		}
		
		
		//内容
		tdObj = trObj.insertCell();
		tdObj.align = "center";

		if(!isSelected){
			value="";
		}
		
		tdObj.innerHTML = "<input type=text id='query_condition_" + tableId + "' name='query_condition_" + tableId + "' value='"+value+"'  size='30'>";
		
		//操作
		tdObj = trObj.insertCell();
		tdObj.align = "center";
		if(!first) {
			tdObj.innerHTML = "<a href='javascript:;' onclick='matech.removeQuery(this);' ><img src=" + MATECH_SYSTEM_WEB_ROOT + "/img/delete.gif></a>" ;
		}
		
	};
	/*
	 * 
	 * 删除自定义查询
	 * 
	 * 参数1：自定义查询行对象
	 * 
	 */		
	matech.removeQuery=function(obj) {

		var tbody = obj.parentElement.parentElement.parentElement ;
		var trObj = obj.parentElement.parentElement ;
		if(trObj) {
			tbody.removeChild(trObj);
		}
	};
	/*
	 * 
	 * Grid计算器计算函数
	 * 
	 * 
	 */		
	matech.calculateValue=function() {
		var sTextValue = sText.value;
		try {
			sTextValue =  eval(sTextValue.replace(new RegExp(",","gm"),""));
			sValue.value = Ext.util.Format.number(sTextValue,'0,000.00') ;
		}catch(e){}
	};
	/*
	 * 
	 * Grid计算器计算重置
	 * 
	 * 
	 */		
	matech.calculatorReset=function(tableId) {
		sText.value='';
		sValue.value='';
		Ext.getCmp(tableId.substring(8)).getSelectionModel().clearSelections();
		
		Ext.getCmp(tableId.substring(8)).getSelectionModel().selectedArea='';
	};
	/*
	 * 
	 * Grid数据导出
	 * 
	 * 参数1：Grid的ID
	 * 参数2：Grid对象
	 * 
	 */		
	matech.expExcel=function(tableId,_grid) {
		var grid;
		if(_grid){
			grid=_grid;
		}else{
			grid = Ext.getCmp(tableId.substring(8));
		}
		
		var columns = grid.getColumnModel().columns;
		var displayColName="";
		var colName="";
		var colWidth="";
		
		
		var mainWindow=matech.getIndexPoint(parent);
		
		var obj = mainWindow.mainTab.items;
		var key = mainWindow.mainTab.items.keys;
		var titleName = "";

		for(var i=0;i<obj.length;i++){
			var k = key[i];
			var o = obj.map[k];
			
			if(!o.hidden){
				titleName = o.title;
			}
		}

		for(var i=0;i<columns.length;i++) {
			var hidden = columns[i].hidden ;
			
			if(hidden){
				continue;
			}
			if(!columns[i].dataIndex || columns[i].dataIndex==""){
				continue;
			}
			if(displayColName==""){
				displayColName=columns[i].header;
				colName=columns[i].dataIndex;
				colWidth=columns[i].width;
			}else{
				displayColName=displayColName+","+columns[i].header;
				colName=colName+","+columns[i].dataIndex;
				colWidth=colWidth+","+columns[i].width;
			}
		}
		var formId="grid_"+tableId+"_form";

		var gridSqlJson=grid.getStore().reader.jsonData;

		var gridSql="";
		if(gridSqlJson){
			if(gridSqlJson["gridSql"]){
				gridSql=Ext.util.JSON.encode(gridSqlJson["gridSql"][0]);
			}else{
			    matech.excel.exportExcel(grid,true);
				return false;
			}
		}else{
			
		}
		
		titleName = encodeURI(encodeURI(titleName));
		document.getElementById("grid_"+tableId+"_TableId").value=tableId;		
		document.getElementById("grid_"+tableId+"_DisplayColName").value=displayColName;
		document.getElementById("grid_"+tableId+"_Width").value=colWidth;
		document.getElementById("grid_"+tableId+"_ColName").value=colName;
		document.getElementById("grid_"+tableId+"_Sql").value=gridSql;
		document.getElementById(formId).action=MATECH_SYSTEM_WEB_ROOT + '/general.do?method=expExcel&titleName='+titleName;
		document.getElementById(formId).target="grid_"+tableId+"_iframe";
		document.getElementById(formId).submit();
	    return false;
	};
	/*
	 * 
	 * 根据列JSON数据获取fields
	 * 
	 * 参数：Grid的Column配置信息
	 * 
	 */			
	matech.getFieldsFromJson=function(columnJson){
		var fields=new Array();
		for(var i=0;i<columnJson.length;i++){
			fields.push(columnJson[i].dataIndex);
		}
		return fields;
	};
	
/****表单操作*****************************************************************************************/
	/*
	 * 
	 * 将页面表单所有From标签设置成非修改状态
	 * 
	 * 
	 */	
	matech.setFormELAllEnabled=function(){
		$("form input").attr("readOnly","true");
		$("form select").attr("disabled","disabled");
		$("form textarea").attr("disabled","disabled");
		$("form password").attr("readOnly","true");
		
		Ext.ComponentMgr.all.each(function(cmp){ 
			if(cmp.getXType()){
				if("|tabpanel|treepanel|panel|viewport|button|toolbar|htmleditor|".indexOf(cmp.getXType().toLowerCase())<=0){
					cmp.setDisabled("true");
				}
			}
		});  
	};
	/*
	 * 
	 * 设置页面Ext按钮控件是否可以点击
	 * 
	 * 参数1：按钮ID数组
	 * 参数2：是否可以点击
	 * 
	 */		
	matech.setExtBtnShow=function(btnIndex,isEnabled){
		if(!Ext.isArray(btnIndex)){
			alert("参数类型错误,第一个参数必须是数组！");
			return;
		}
		var index;
		var extObj;
		for(index=0;index<btnIndex.length;index++){
			extObj=Ext.getCmp(btnIndex[index]);
			if(extObj){
				if(isEnabled){
					extObj.enable();
				}else{
					extObj.disable();
				}
			}
		}
	};
	/*
	 * 
	 * 设置页面Ext按钮控件是否可见
	 * 
	 * 参数1：按钮ID数组
	 * 参数2：是否可见
	 * 
	 */		
	matech.setExtBtnVisible=function(btnIndex,isEnabled){
		if(!Ext.isArray(btnIndex)){
			alert("参数类型错误,第一个参数必须是数组！");
			return;
		}
		var index;
		var extObj;
		for(index=0;index<btnIndex.length;index++){
			extObj=Ext.getCmp(btnIndex[index]);
			if(extObj){
				if(isEnabled){
					extObj.show();
				}else{
					extObj.hide();
				}
			}
		}
	};	
	/*
	 * 
	 * 从一串条件字符串"unit_id=10001,datayear=2012"中获取指定条件的值
	 * 
	 * 参数1：条件字符串
	 * 参数2：参数名
	 * 
	 */		
	matech.getValueFromQueryConditionStr=function(condStr,sParamStr){
		var str=condStr.toLowerCase();
		var sParamStr=sParamStr.toLowerCase();
		
		var i=str.indexOf(sParamStr,0);	
		if(i>=0){
			var j=str.indexOf(",",i);
			if(j<0){
				j=str.length;
			}
			return condStr.substring(i+sParamStr.length, j);
		}else{
			return "";
		}
	};	
	/*
	 * 
	 * 从一串条件字符串"unit_id=10001,datayear=2012"中删除指定条件的值	
	 * 
	 * 参数1：条件字符串
	 * 参数2：参数名
	 * 
	 */		
	matech.removeValueFromQueryConditionStr=function(condStr,sParamStr){

		var str=condStr.toLowerCase();
		var sParamStr=sParamStr.toLowerCase();
		var _result=condStr;
		
		var i=str.indexOf(sParamStr,0);	

		if(i>=0){
			var j=str.indexOf(",",i);
			if(j<0){
				j=str.length;
			}
			if(i==0){
				_result=condStr.substring(0,i)+condStr.substring(j,condStr.length);
			}else{
				_result=condStr.substring(0,i-1)+condStr.substring(j,condStr.length);
			}
			
			str=_result.toLowerCase();
			i=str.indexOf(sParamStr,0);
			if(i>=0){
			   _result=matech.removeValueFromQueryConditionStr(_result,sParamStr);
			}
			
		}
		
		return _result;
		
	};
	/*
	 * 
	 * 根据文件类型用div图片进行渲染
	 * 
	 * 参数：文件类型
	 * 
	 */		
	matech.photoRender=function(fileType){
		var s;
		fileType=fileType.toLowerCase();
		if(fileType=="0"){
    		s = '<div style="width:15px;height:15px">' +
    		 	'<img style="width:100%" src="'+MATECH_SYSTEM_WEB_ROOT + '/tws/css/img/ext/pap.png"></div>';
     		return s;
		}				 
		if(fileType.indexOf("xls")>-1){
			s = '<div style="width:15px;height:15px">' +
	    		'<img style="width:100%" src="'+MATECH_SYSTEM_WEB_ROOT + '/tws/css/img/ext/excel.png"></div>';
	     	return s;
		}
		if(fileType.indexOf("doc")>-1){
			s = '<div style="width:15px;height:15px">' +
    		 	'<img style="width:100%" src="'+MATECH_SYSTEM_WEB_ROOT + '/tws/css/img/ext/word.png"></div>';
     		return s;
		}
		if(fileType.indexOf("pdf")>-1){
			s = '<div style="width:15px;height:15px">' +
				'<img style="width:100%" src="'+MATECH_SYSTEM_WEB_ROOT + '/tws/css/img/ext/pdf.png"></div>';
 			return s;
		}
		if(fileType.indexOf("rar")>-1 || fileType.indexOf("zip")>-1){
			s = '<div style="width:15px;height:15px">' +
				'<img style="width:100%" src="'+MATECH_SYSTEM_WEB_ROOT + '/tws/css/img/ext/zip.png"></div>';
 			return s;
		}
		if(fileType.indexOf("jpg")>-1||fileType.indexOf("png")>-1||fileType.indexOf("gif")>-1){
			s = '<div style="width:15px;height:15px">' +
    		 	'<img style="width:100%" src="'+MATECH_SYSTEM_WEB_ROOT + '/tws/css/img/ext/pic.png"></div>';
     		return s;
		}else{
			s = '<div style="width:15px;height:15px">' +
    		 	'<img style="width:100%" src="'+MATECH_SYSTEM_WEB_ROOT + '/tws/css/img/ext/other.png"></div>';
     		return s;
		}		
	};
	/*
	 * 
	 * 获取URL中的参数
	 * 
	 * 参数：URL
	 * 
	 */		
	matech.getUrlRequest=function(_url){
		    var theRequest = new Object();
	   		var _index=_url.indexOf("?");
	   		if (_index>-1) {
		      var str =_url.substr(_index+1);
		      strs = str.split("&");
		      for(var i = 0; i < strs.length; i ++) {
		      	if(strs[i]|| strs.indexOf("=")>-1){
		         	theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		        }
		      }
		   }
		   return theRequest;		
	};
	/*
	 * 
	 * 获取URL中的参数
	 * 
	 * 参数：页面请求参数
	 * 
	 */		
	matech.getStrRequest=function(_request){
		var theRequest = new Object();
		if(_request){
		      strs =_request.split("&");
		      for(var i = 0; i < strs.length; i ++) {
		    	 if(strs[i]|| strs.indexOf("=")>-1){
		    	 	theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		    	 }
		      }			
		}
		return theRequest;		
	};
	/*
	 * 
	 * 调用拍摄设备
	 * 
	 * 参数1：页面父级对象
	 * 参数2：Key值，归类拍摄的图片
	 * 参数3：回调函数
	 * 
	 */			
	matech.callCamere = function(parent,_key,callback) {
		if(_key==""){
			alert("请选择附件拍摄需要说明的对象，如底稿、疑点等！");
			return;
		}
		if(!parent.showCamere){
			parent=parent.parent;
		}
		if(!parent.showCamere){
			parent=parent.parent;
		}
		if(!parent.showCamere){
			parent=parent.parent;
		}
		if(!parent.showCamere){
			alert("找不到拍摄设备,请联系管理员！");
			return;
		}
		parent.showCamere(_key);
		
		if(matech.funExists(callback)){
			callback(); 
		}      	
    };
	/*
	 * 
	 * 发送到疑点库
	 * 
	 * 参数1：Grid显示头
	 * 参数2：Grid显示内容
	 * 参数3：页面父级对象
	 * 
	 */	
	matech.sendToDoubts=function(sHead,sData,parent) {
		
		var id=new UUID().createUUID();
		
		var url = MATECH_SYSTEM_WEB_ROOT+"/general.do?method=sendOcxData";
		var request = "&uuid=" + id + "&sHead="+sHead+ "&sData="+sData;
		
		var result = ajaxLoadPageSynch(url, request);

		
		if(result=="0"){
			alert("发送数据出错,请联系系统管理员！");		
		}else{
			url=MATECH_SYSTEM_WEB_ROOT+"/doubts.do?method=sendToDoubts&type=java&uuid="+id;

			var jsonStr='{"id":"'+id+'","title":"发送到疑点库","width":"800","height":"500"}';
			
			matech.openWin(jsonStr,encodeURI(encodeURI(url)),parent);	
		}
	};
	/*
	 * 
	 * 根据配置信息从数据库加载信息
	 * 
	 * 参数1：配置项
	 * 参数2：值，对应参数$1
	 * 参数3：值，对应参数$2
	 * 参数4：值，对应参数$3
	 * 参数5：值，对应参数$4
	 * 
	 */		
	matech.getAutoData=function(autoId,value,refer,refer1,refer2){
		var result=[];
		
		$.ajax({
			type :"Post",
			async:false,
			url : MATECH_SYSTEM_WEB_ROOT+"/general.do?method=getAutoJsonData",
			data:{autoid:autoId,pk1:value,refer:refer,refer1:refer1,refer2:refer2},
			success : function(data) {
				result=unescape(data);
				result=Ext.util.JSON.decode(result);
			}
		});	
		
		return result;
	};
	/*
	 * 
	 * 页面表单Ajax提交
	 * 
	 * 参数1：Form表单ID
	 * 参数2：提交成功后显示的URL
	 * 参数3：回调函数
	 * 参数4：操作成功后是否显示提示信息，默认为True
	 * 
	 */		
	matech.formSummit=function(formId,showList,callback,isShowMsg){
		var result="";
		
		if(typeof(isShowMsg) == "undefined"){
			isShowMsg=true;
		}
		
		if (!formSubmitCheck(formId)) {
			return;
		}
		
		matech.showWaiting("100%","100%","正在保存数据,请稍后....");

		$.ajax({
				cache: false,
				type: "POST",
				url:$('#'+formId).attr("action"), //把表单数据发送到ajax.jsp
				data:$('#'+formId).serialize(), //要发送的是ajaxFrm表单中的数据
				async: true,
				error: function(request) {
					matech.stopWaiting();
					alert("发送请求失败,请检查网络连接！");
				},
				success: function(data) {
					matech.stopWaiting();
					result=unescape(data);
					result=Ext.util.JSON.decode(result)[0];
					//操作成功
					if(result["result"]=="1"){
						if(isShowMsg){
							alert("操作成功！");
						}
						if(showList){
							window.location =showList;
						}
						if(callback){
							callback();
						}
					}else{
						alert("操作失败！\n"+result["error"]);
					}
				}
		});
		
		return result;
	};
	/*
	 * 
	 * 请求Ajax提交
	 * 
	 * 参数1：URL请求
	 * 参数2：请求参数
	 * 参数3：是否异步提交
	 * 参数4：回调函数
	 * 参数5：操作成功后是否显示提示信息，默认为True
	 * 
	 */			
	matech.ajaxSumit=function(url,request,async,callback,isShowMsg){

		if(typeof(isShowMsg) == "undefined"){
			isShowMsg=true;
		}
		
		if(!async){
			async=true;
		}
		var params=matech.getStrRequest(request);

		var result="";
		
		matech.showWaiting("100%","100%","正在执行操作，请稍后...");

		$.ajax({
				cache: false,
				type: "POST",
				url:url, //把表单数据发送到ajax.jsp
				data:params, //要发送的是ajaxFrm表单中的数据
				async: async,
				error: function(request) {
					matech.stopWaiting();
					alert("发送请求失败,请检查网络连接！");
				},
				success: function(data) {
					matech.stopWaiting();
					result=unescape(data);
					result=Ext.util.JSON.decode(result)[0];
					//操作成功
					if(result["result"]=="1"){
						if(isShowMsg){
							alert("操作成功！");
						}
						if(callback){
							callback(result);
						}
					}else{
						alert("操作失败！\n"+result["error"]);
					}
				}
		});
		
		return result;
	};
	
	/*
	 * 
	 * 请求脚本
	 * 
	 * 参数1：脚本路径
	 * 参数2：请求参数
	 * 参数3：是否异步提交
	 * 参数4：回调函数
	 * 参数5：操作成功后是否显示提示信息，默认为True
	 * 
	 */			
	matech.ajaxScript=function(autoid,request,async,callback){
		
		var url = MATECH_SYSTEM_WEB_ROOT+"/general.do?method=getAutoScript&autoId="+autoid;
		if(!async){
			async=false;
		}
		
		var params=matech.getStrRequest(request);
		params["autoid"]=autoid;
		
		var result="";
		
		matech.showWaiting("100%","100%");

		$.ajax({
				cache: false,
				type: "POST",
				url:url, //把表单数据发送到ajax.jsp
				data:params, //要发送的是ajaxFrm表单中的数据
				async: async,
				error: function(request) {
					matech.stopWaiting();
					alert("发送请求失败,请检查网络连接！");
				},
				success: function(data) {
					matech.stopWaiting();
					result=unescape(data);
					if(callback){
						callback(result);
					}
				}
		});
		
		return result;
	};	
	/*
	 * 
	 * 获取系统自动生成的编码
	 *  根据1条SQL语句生成
	 * 
	 * 参数1：配置信息
	 * 参数2：请求参数，用|隔离，从$2开始计算
	 * 参数3：请求参数，对应参数$1
	 * 
	 */		
	matech.getAutoCode=function(_autoId,_refer,_value){
		if(!_autoId || _autoId==""){
			alert("自动编码生成关键字不能为空!");
			return;
		}
		var _url = MATECH_SYSTEM_WEB_ROOT+"/general.do?method=AutoCode&autoId="+_autoId;
		var _param = "&refer="+_refer+"&value="+_value;
		
		var strResult = ajaxLoadPageSynch(_url,_param) ;
		
		return strResult;		
	};
	/*
	 * 
	 * 获取系统自动生成的编码
	 *  从编码配置表获取
	 * 
	 * 参数1：编码类型
	 * 参数2：编码所有者
	 * 
	 */		
	matech.autoCode=function(codeType,codeOwner){
		var result="";
		
		matech.showWaiting("100%","100%","正在获取自动编码");

		$.ajax({
				cache: false,
				type: "POST",
				url:MATECH_SYSTEM_WEB_ROOT+"/general.do?method=AutoPlusCode",
				data:{codeType:codeType,codeOwner:codeOwner},
				async: false,
				error: function(request) {
					matech.stopWaiting();
					alert("发送请求失败,请检查网络连接！");
				},
				success: function(data) {
					matech.stopWaiting();
					result=unescape(data);
					result=Ext.util.JSON.decode(result)[0];
					//操作成功
					if(result["result"]=="0"){
						alert("操作失败！\n"+result["error"]);
					}
				}
		});
		
		return result;
	};	
	/*
	 * 
	 * 执行系统后台校验
	 * 
	 * 参数1：校验类型
	 * 参数2：校验ID
	 * 参数3：参数$1
	 * 参数4：参数$2开始，中间用|隔开
	 * 参数5: uuid参数
	 * 
	 */	
	matech.validate=function(type,validateId,value,refer,uuid){
		var result="";
		
		matech.showWaiting("100%","100%","正在执行校验");

		$.ajax({
				cache: false,
				type: "POST",
				url:MATECH_SYSTEM_WEB_ROOT+"/general.do?method=validate",
				data:{validateId:validateId,uuid:uuid,type:type,value:value,refer:refer},
				async: false,
				error: function(request) {
					matech.stopWaiting();
					alert("发送请求失败,请检查网络连接！");
				},
				success: function(data) {
					matech.stopWaiting();
					result=unescape(data);
				}
		});
		
		return result;
	};	
	/*
	 * 
	 * 执行系统后台校验，如果存在则返回True
	 * 
	 * 参数1：校验ID
	 * 参数2：参数$1
	 * 参数3：校验发生错误时返回的信息
	 * 参数4：参数$2开始，中间用|隔开
	 * 参数5: uuid参数
	 * 
	 */	
	matech.checkIsExist=function(validateId,value,errValue,refer,uuid){
		
		var result=matech.validate(1,validateId,value,refer,uuid);

		if(result=="ok"){
			return true;
		}else{
			if(result.substring(0,8)=="验证后台发生错误"){
				alert(result);
				return errValue;
			}
			return false;
		}
		
	};	
	/*
	 * 
	 * 执行系统后台校验，如果不存在则返回True
	 * 
	 * 参数1：校验ID
	 * 参数2：参数$1
	 * 参数3：校验发生错误时返回的信息
	 * 参数4：参数$2开始，中间用|隔开
	 * 参数5: uuid参数
	 * 
	 */		
	matech.checkIsNotExist=function(validateId,value,errValue,refer,uuid){
		
		var result=matech.validate(0,validateId,value,refer,uuid);
		
		if(result=="ok"){
			return true;
		}else{
			if(result.substring(0,8)=="验证后台发生错误"){
				alert(result);
				return errValue;
			}
			return false;
		}
	};	
	/*
	 * 
	 * 记录后台日志
	 * 
	 * 参数1：日志类型
	 * 参数2：操作模块
	 * 参数3：日志内容
	 * 参数4：操作SQL语句
	 * 
	 */	
	matech.log=function(type,optFunc,optText,optSql){
		$.ajax({
			cache: false,
			type: "POST",
			url:MATECH_SYSTEM_WEB_ROOT+"/system.do?method=clientLog",
			data:{type:type,optFunc:optFunc,optText:optText,optSql:optSql},
			async:true,
			error: function(request) {
				alert("发送日志请求失败,请检查网络连接！");
			}
		});
	};
	/*
	 * 
	 * 记录后台Info日志
	 * 
	 * 参数1：操作模块
	 * 参数2：日志内容
	 * 参数3：操作SQL语句
	 * 
	 */		
	matech.log.info=function(optFunc,optText,optSql){
		matech.log("info",optFunc,optText,optSql);
	};
	/*
	 * 
	 * 记录后台warn日志
	 * 
	 * 参数1：操作模块
	 * 参数2：日志内容
	 * 参数3：操作SQL语句
	 * 
	 */		
	matech.log.warn=function(optFunc,optText,optSql){
		matech.log("warn",optFunc,optText,optSql);
	};
	/*
	 * 
	 * 在指定Tabs上打开新标签
	 * 
	 * 参数1：Tabs对象
	 * 参数2：新标签ID
	 * 参数3：新标签标题
	 * 参数4：新标签URL
	 * 参数5：活动标签ID
	 * 
	 */		
	matech.openLocalTab=function(tabs,_id,_title,_url,activeTab){
		if(!activeTab){
			activeTab=0;
		}
		var n = tabs.getComponent(_id);
		if(!n){
			tabs.add({
				 id:_id,    
				 title:_title,  
				 closable:true,
				 html:'<iframe name="iframe'+_id+'" id="iframe'+_id+'" scrolling="no" frameborder="0" width="100%" height="100%" src="' + _url + '"></iframe>',
				 listeners:{close:function(){
					tabs.setActiveTab(activeTab);
				 }}
			}).show();
		}else{
			document.getElementById("iframe"+_id).src =_url;
		}
		tabs.setActiveTab(n);	
	};
	/*
	 * 
	 * 在指定Tabs上关闭标签
	 * 
	 * 参数1：Tabs对象
	 * 参数2：标签ID
	 * 参数3：活动标签ID
	 * 
	 */		
	matech.closeLocalTab=function(tabs,_id,activeTab){
		if(!activeTab){
			activeTab=0;
		}
		var n = tabs.getComponent(_id);
		if(n){
			tabs.remove(n);
		}
		tabs.setActiveTab(activeTab);
	};

	/*
	 * 
	 * 在一个页面获取另外一个页面url传过来的参数
	 *    正则分析法
	 *    
	 * 参数：参数名称
	 * 
	 * 返回值：字符串
	 */		
	matech.getQueryString=function(name){
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null){
	    	return unescape(r[2]);
	    } else{
	    	return null;
	    }		
	};
	/*
	 * 
	 * 在一个页面获取另外一个页面url传过来的参数
	 *    
	 * 返回值：参数对象
	 */		
	matech.GetRequest=function(){
	   var url = location.search; //获取url中"?"符后的字串
	   var theRequest = new Object();
	   if (url.indexOf("?") != -1) {
	      var str = url.substr(1);
	      strs = str.split("&");
	      for(var i = 0; i < strs.length; i ++) {
	         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
	      }
	   }
	   return theRequest;		
	};
	
	/*
	 * 
	 * 合并多个数组去重算法
	 *    
	 * 返回值：参数对象
	 */		
	matech.arrayConcat= function(arr1,arr2){
		var arr = arr1.concat();
		for(var i=0;i<arr2.length;i++){
			arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0;
		}
		return arr;
	};
	/*
	 * 
	 * 合并多个字符串去重算法
	 *    
	 * 返回值：参数对象
	 */			
	matech.arrayStrConcat= function(arrStr1,arrStr2){
		var arrStr="";
		var arr1=arrStr1.split(",");
		var arr2=arrStr2.split(",");
		
		var arr = matech.arrayConcat(arr1,arr2);
		for(var i=0;i<arr.length;i++){
			if(arr[i] && arr[i]!=""){
				if(arrStr==""){
					arrStr=arr[i];
				}else{
					arrStr=arrStr+","+arr[i];
				}			
			}
		}
		return arrStr;
	};
	
	
	//打开附件
	matech.openAttach=function(handler,attachId,isIndex){
		var parent=matech.parentObj;
		if(!parent.showAttach){
			parent=parent.parent;
		}
		if(!parent.showAttach){
			parent=parent.parent;
		}
		if(!parent.showAttach){
			parent=parent.parent;
		}
		if(!parent.showAttach){
			alert("找不到附件下载控件,请联系系统管理员！");
			return;
		}
		if(!handler || handler==""){
			handler="CommonHandler";
		}

		var url = MATECH_SYSTEM_WEB_ROOT+"/general.do?method=getAttachList";
		var request = "&handler="+handler;	
		if(isIndex){
			request =request+ "&indexId=" + attachId;	
		}else{
			request =request+ "&attachId=" + attachId;	
		}
		var result = ajaxLoadPageSynch(url, request);
		var attachList=Ext.util.JSON.decode(result);
		if(attachList.length>0){
			var attach=attachList[0];
			attachId=attach.attachId;
			var _attachJs="ViewAttach.s";
			var fileType=attach.fileType;
			var fileName=attach.attachName;
			var fileTable="MT_COM_ATTACH_DATA";
			var pField="ATTACHID";
			var bField="FILEDATA";
			
			if(handler=="DocumentHandler"){
				fileTable="VW_SJ_PRJ_PAPER_ATTACH_DATA";
			}else if(handler=="FileCenterHandler"){
				fileTable="VW_SYS_ATTACH_DATA";
			}else if(handler=="OaAttachHandler"){
				fileTable="MT_COM_ATTACH_OA_DATA";
			}else if(handler=="OaAttachReceiveHandler"){
				fileTable="MT_COM_ATTACH_OA_RECEIVE_DATA";
			}else if(handler=="PaperHandler"){
				fileTable="MT_COM_ATTACH_PAPER_DATA";
			}else if(handler=="PlanAttachHandler"){
				fileTable="MT_COM_ATTACH_PLAN_DATA";
			}else if(handler=="ProjectAttachHandler"){
				fileTable="VW_SJ_PRJ_ATTACH_DATA";		
			}else if(handler=="ProjectAttachHandler"){
				fileTable="VW_SJ_PRJ_ATTACH_DATA";		
			}
			
			var _params="fileName="+fileName+",fileTable="+fileTable+",pField="+pField+",bField="+bField+",id="+attachId+",ext="+fileType;
			
			parent.showAttach(_attachJs,_params);
		}else{
			alert("没有对应对应的文档！");
		}					
		
	};	
	
}());
