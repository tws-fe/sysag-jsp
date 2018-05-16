
function TableWindow(o){
	this.init(o);
}

(function($){
	TableWindow.prototype.init = function(o){
		for(var k in o){
			this[k] = o[k];
		}
		if (!this.renderTo || !document.getElementById(this.renderTo)){
			"[TableWindow] invalid element to be rendered to : " + this.renderTo;
		}
		this.title = this.title || '';
		this.modal = typeof this.modal == 'undefined' ? true : this.modal;
		return this;
	};
	
	TableWindow.prototype.createWindow = function(o){
		var me = this;
		var buttons = this.buttons || [];
		buttons = buttons.concat({
        	id : this.renderTo + '-button-close',
        	text:'关闭',
      		handler:function() {
      			me.hide();
    		}
    	});
		for(var i = 0; i < buttons.length; i++){
			buttons[i].scope = this;
		}
		
		this.window = new Ext.Window({
			title : this.title || '',
			width : this.width,
			height : this.height,
			modal : this.modal, 
			contentEl : this.renderTo, 
	        closeAction: 'hide',
	        listeners:{
				'hide' : {fn: function () {
					me.hide();
				}}
			},
	        layout:'fit',
		    buttons: buttons
	    });
		
		var $renderTo = $('#' + this.renderTo);
		$('<div class="tawin-header"></div>').appendTo(this.renderHeader(o));
		$renderTo.append('<div class="tawin-body" id="tawin-kitable-' + this.renderTo + '" style="overflow-y:auto;height:' + (this.height - 70) + '"></div>');
		$('<div class="tawin-fotter"></div>').appendTo(this.renderFooter(o));
		
		this.renderTable(o);
		return this;
	};
	
	TableWindow.prototype.renderTable = function(o){
		this.table.renderTo = 'tawin-kitable-' + this.renderTo;
		this.table.instance = new Kitable(this.table);
		this.table.instance.render(o.data);
	};
	
	TableWindow.prototype.renderHeader = function(o){
		return '';
	};
	
	TableWindow.prototype.renderFooter = function(o){
		return '';
	};
	
	TableWindow.prototype.show = function(o){
		o = o || {};
		this.mapping = o.mapping ? o.mapping : this.mapping;
		var _this_ = this;
		var url = this.url || o.url;
		var param = this.param || o.param;
		if (url && !o.fetched){
			jQuery.ajax({
				url : url,
				data : param || {},
				type : 'POST',
				dataType : 'text',
				success : function(r){
					_this_.data = o.data = r ? eval('(' + r + ')') : [];
					var adaptData = _this_.adaptData || o.adaptData;
					if (adaptData){
						var ret = adaptData.call(_this_, _this_.data, r);
						if (typeof ret != 'undefined' && ret instanceof Array){
							o.data = ret;
						}
					}
					o.fetched = true;
					_this_.show(o);
				},
				error : function(e){
					throw "[TableWindow] fetch data exception " + e;
				}
			})
			return;
		}
		if (!this.window){
			this.createWindow(o);
		}
		if (o.title){
			this.window.setTitle(o.title);
		}
		if (this.beforeShow){
			if (this.beforeShow(o) == false){
				return this;
			}
		}
		if (o.refresh){
		
			_this_.data = o.data ? o.data : _this_.data;
			this.table.instance.render(o.data);
		}
		this.window.show();
		document.getElementById(this.renderTo).style.display = '';
		if (this.afterShow){
			this.afterShow(o);
		}
		return this;
	};
	
	TableWindow.prototype.hide = function(o){
		if (this.window){
			if (this.beforeHide){
				if(this.beforeHide(o) == false){
					return this;
				}
			}
			document.getElementById(this.renderTo).style.display = "none";
			this.window.hide();
			if (this.afterHide){
				this.afterHide(o);
			}
		}
		return this;
	};
})(jQuery);
