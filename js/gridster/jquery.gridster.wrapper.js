
function GridsterWrapper(o){
	this.init(o);
};


(function($){
	
	GridsterWrapper.Item = function(o, parent){
		this.init(o, parent);
	};
	
	GridsterWrapper.prototype.init = function(o){
		for(var k in o ){
			this[k] = o[k];
		}
		this.selector = this.renderTo || this.selector;
		if (!this.selector){
			throw "no selector(container) to be rendered to ";
		}
		if (!this.id){
			for(var i = 0; ; i++){
				if (!document.getElementById('gridster' + i)){
					this.id = 'gridster' + i;
					break;
				}
			}
		}
		this.items = this.items || [];
		this.item_template = this.item_template || {};
		// header & body
		this.header = this.header || {};
		this.header.height = this.header.height || 20; 
		
		// events
		if (this.resize && this.resize.stop){
			var wrapped_stop = this.resize.stop;
			this.resize.stop = function(e, ui, $widget){
				var wrapper = this.__wrapper__;
				var $body = $widget.find('.gridster-wrapper-body');
				if ($body.length > 0){
					var item_height = $widget.attr('data-sizey') * this.options.widget_base_dimensions[1];
					$body[0].style.height = ((item_height -  wrapper.header.height) / item_height * 100) + '%';
				}
				return wrapped_stop.call(this, e, ui, $widget);
			};
		}
		return this;
	};
	
	GridsterWrapper.prototype.addWidgets = function(wrappedWidgets){
		if ((wrappedWidgets instanceof Array) == false){
			wrappedWidgets = [ wrappedWidgets ];
		}
		for(var i = 0; i < wrappedWidgets.length; i++){
			var ww = wrappedWidgets[i];
			if ((ww instanceof GridsterWrapper.Item) == false){
				ww = new GridsterWrapper.Item(ww, this);
			} 
			ww.appendTo(this);
		}
		return this;
	};
	
	GridsterWrapper.prototype.pushWidget = function(widget){
		var ww = widget;
		if ((ww instanceof GridsterWrapper.Item) == false){
			ww = new GridsterWrapper.Item(ww, this);
		}
		ww.appendTo(this, this.items.length, true);
		return ww;
	};
	
	GridsterWrapper.prototype.render = function(){
		var $selector = $(this.selector);
		var dom = $selector[0];
		if (this.style){
			dom.setAttribute('style', this.style);
		}
		this.instance = $selector.gridster(this).data('gridster');
		this.instance.__wrapper__ = this;
		return this;
	};
	
	GridsterWrapper.serializeFields = [ 'id' ];
	
	
	/**
	 * @param param
	 * 		attr : 將各个  widget item 中的某一个屬性序列化
	 * 		depthlimit : 序列化深度
	 * @returns
	 */
	GridsterWrapper.prototype.serialize = function(param){
		
		var $selector = $(this.selector);
		var dom = $selector[0];
		var json = [];
		var fields = GridsterWrapper.serializeFields;
		json.push('{');
		for(var i = 0; i < fields.length; i++){
			json.push(fields[i] + ':\'');
			json.push(dom.getAttribute(fields[i]));
			json.push('\',');	
		}
		if (param.map){
			var mapjson = Common.init().toJson(param.map, "'" , param.depthlimit);
			mapjson = mapjson.substring(1, mapjson.length - 1);
			if (mapjson){
				json.push(mapjson);
				json.push(',');
			}
		}
		json.push('items:[');
		for(var i = 0; i < this.items.length; i++){
			json.push(this.items[i].serialize(param));
			json.push(',');
		}
		if (i > 0){
			json.pop();
		}
		json.push(']');
		json.push('}')
		return json.join('');
	};
	
	GridsterWrapper.prototype.remove = function(target, arg){		
		if (typeof target == 'number'){
			target = this.items[target];
		} else if (typeof target == 'string'){
			for(var i = 0; i < this.items.length; i++){
				if (target == this.items[i].id){
					target = this.items[i];
					break;
				}
			}
		}
		if (!target){
			return -1;
		}
		if (target.beforeRemove){
			if (!target.beforeRemove.call(target, arg)){
				return -1;
			}
		}
		var index = target.index;
		this.instance.remove_widget(target.jquery);
		if (target.afterRemove){
			target.afterRemove.call(target, arg);
		}
		delete this.items[index];
		var nitems = [];
		for(var i = 0; i < this.items.length; i++){
			if (this.items[i]){
				nitems.push(this.items[i]);
			}
		}
		this.items = nitems;
		
		return index;
	};
	
	GridsterWrapper.prototype.removeAll = function(){
		if (!this.instance){
			return this;
		}
		this.instance.remove_all_widgets();
		this.instance.remove_style_tags();
		delete this.items;
		this.items = [];
		return this;
	};
	
	
	GridsterWrapper.prototype.clear = function(){
		$(this.selector)[0].style = this.style;
		for(var i = 0 ; i < this.items.length; i++){
			this.items[i].clear();
		}
		return this;
	};
	
	
	
})(jQuery);


(function($, Item){
	Item.prototype.init = function(o, parent){
		if (parent){
			this.parent = parent;
		}
		var template = parent.item_template || {}; // 模版
		for(var k in o){
			this[k] = o[k];
		}
		
		if (this.data && this.data instanceof Array){
			this.size_x = (this.data[0] || 1) * 1.0;
			this.size_y = (this.data[1] || 1) * 1.0;
			this.row = (this.data[2] || 1) * 1.0;
			this.col = (this.data[3] || 1) * 1.0;
		}
		
		this.tagName = this.tagName || 'li';
		this.style = this.style || '';
		this.className = this.className || '';
		
		this.beforeRemove = this.beforeRemove || template.beforeRemove;
		this.afterRemove = this.afterRemove || template.afterRemove;
		
		if (this.header){
			this.header.title = this.header.title || template.header.title;
			this.header.buttons = this.header.buttons || template.header.buttons;
		}
		
		return this;
	}
	
	Item.prototype.toJQueryHtml = function(parent, $parent){
		this.jquery = null;
		var item = this;
		var html = 	'<' + this.tagName + ' id="' + this.id + '" ' +
						' data-sizex="' + this.size_x + '" data-sizey="' + this.size_y + '" ' +
						' data-row="' + this.row + '" data-col="' + this.col + '" ' +
						' class="' + this.className + '"  style="' + this.style + '"> ' +
					'</' +this.tagName + '>';
		this.jquery = $(html);
		
		
		if (this.header){
			var $header = $('<div class="gridster-wrapper-header"></div>').appendTo(this.jquery);
			var headercontent = '', bodycontent = '';
			if (typeof this.header == 'string'){
				headercontent = this.header;
			}
			// widget header 标題
			$header.append('<div class="gridster-wrapper-header-title">' + (this.header.title || '') + '</div>');
			// widget header 按鈕
			if (this.header.buttons && typeof this.header.buttons == 'object') {
				var $header_buttons = $('<div class="gridster-wrapper-header-buttons"></div>').appendTo($header);
				for(var buttontype in this.header.buttons){
					var abutton = this.header.buttons[buttontype];
					var button_html = '';
					
					var imgsrc = '';
					try {
						imgsrc = abutton.img;
					} catch (e){
						try {
							imgsrc = parent.item_template.header.buttons[buttontype].img;
						} catch (e){ }
					}
					if (imgsrc){
						button_html = '<img src="' + imgsrc + '" class="gridster-wrapper-header-a-button"/>'
					} else {
						button_html = '<span class="gridster-wrapper-header-a-button">' + buttontype + '&nbsp;</span>'
					}
					// 按鈕若有 handler, 則調用 handler, 若沒有, 有一些默認的按鈕有, 如 close
					$(button_html).appendTo($header_buttons).on('click', (function(abutton, buttontype){
						return function(event){
							var onclick;
							try {
								onclick = abutton.onclick;
								if (typeof onclick != 'function') { throw ""; }
							} catch (e){
								try { onclick = parent.item_template.header.buttons[buttontype].onclick; } catch (e){ }
							}
							if (onclick && typeof onclick == "function"){
								return onclick.call(item, event, parent, this);
							}
							switch(buttontype){
							case 'close':
								parent.remove(item, { src : this, item : item, event : event });
								break;
							}
						};
					})(abutton, buttontype));					
				} // for(var i = 0; i < this.header.buttons.length; i++)
			} // if (this.header.buttons && this.header.buttons instanceof Array)
			
			if (this.body && typeof this.bodycontent == 'string'){
				bodycontent = this.body;
			}
			var item_height = parent.widget_base_dimensions[1] * this.size_y;
			var body_style = 'height:' + ((item_height -  parent.header.height) / item_height * 100) + '%';
			this.jquery.append('<div class="gridster-wrapper-body" style="' + body_style + '">' + bodycontent + '</div>');
		} // header & body
		
		return this.jquery;
	};
	
	Item.prototype.hookEvent = function(){
		if (!this.handlers){
			return;
		}
		for(var eventname in this.handlers){
			this.jquery.on(eventname, (function(src, eventname){
				return function(e){
					src.handlers[eventname](e, src);
				};
			})(this, eventname));
		}
		return this;
	};
	
	Item.prototype.appendTo = function(parent, index, push){
		if (!index){
			index = parent.items.length;
		}
		this.parent = parent;
		this.index = index;
		if (!this.id){
			var tempindex = index;
			for(; document.getElementById(parent.id + '-' + tempindex); tempindex++);
			this.id = parent.id + '-' + tempindex;
		}
		var $parent = $(parent.selector);
		this.toJQueryHtml(parent, $parent);
		if (push){
			parent.instance.add_widget.apply(parent.instance, [this.jquery[0], this.size_x, this.size_y, this.col, this.row]);
		} else {
			this.jquery.appendTo($parent);
		}
		
		this.hookEvent();
		parent.items.push(this);
		return this;
	};
	
	Item.serializeFields = ['id','tagName','data-sizex','data-sizey','data-row','data-col'];
	
	Item.prototype.serialize = function(param){
		
		var dom = this.jquery[0];
		var fields = Item.serializeFields;
		var sobj = {};
		for(var i = 0; i < fields.length; i++){
			sobj[fields[i]] = dom.getAttribute(fields[i]);
		}
		if (param.attr && param.attr instanceof Array){
			for(var i = 0; i < param.attr.length; i++){
				sobj[param.attr[i]] = dom.getAttribute(param.attr[i]) || dom[param.attr[i]];
				if (!sobj[param.attr[i]]){
					sobj[param.attr[i]] = this[param.attr[i]];
				}
			}	
		}
		
		sobj.size_x = sobj['data-sizex'];
		sobj.size_y = sobj['data-sizey'];
		sobj.row = sobj['data-row'];
		sobj.col = sobj['data-col'];
		sobj.className = sobj['class'];
		return Common.init().toJson(sobj, "'" , param.depthlimit);
	};
	
	
	Item.prototype.clear = function(){
		var dom = this.jquery[0];
		dom.innerHTML = '';
		dom.setAttribute('style', this.style);
		return this;
	};
	
	Item.prototype.resize = function(sizex, sizey, callback){
		var winstance = this.parent.instance;
		sizex = sizex * 1;
		sizey = sizey * 1;
		winstance.resize_widget.apply(winstance, [this.jquery, sizex, sizey, callback, this]);
		this['size_x'] = sizex;
		this['size_y'] = sizey;
		this['data-sizex'] = sizex;
		this['data-sizey'] = sizey;
		return this;
	};
	
	Item.prototype.getTitle = function(){
		var $title = this.jquery.find('.gridster-wrapper-header-title');
		if ($title.length == 0){
			return null;
		}
		return $title[0].innerHTML;
	};
	
	Item.prototype.setTitle = function(newTitle){
		var $title = this.jquery.find('.gridster-wrapper-header-title');
		if ($title.length == 0){
			throw "[setTitle] no gridster-wrapper-header-title is found in this item: " + this.id;
		}
		this.header = this.header || {};
		this.header.title = newTitle;
		$title[0].innerHTML = newTitle;
		return this;
	};
	
	Item.prototype.getHeader = function(){
		var $header = this.jquery.find('.gridster-wrapper-header');
		if ($header.length == 0){
			return null;
		}
		return $header;
	};
	
	Item.prototype.getBody = function(){
		var $body = this.jquery.find('.gridster-wrapper-body');
		if ($body.length == 0){
			return null;
		}
		return $body;
	};
	
	Item.prototype.setBodyContent = function(html){
		var $body = this.getBody();
		if ($body){
			$body.html(html);
		}
		return this;
	};
})(jQuery, GridsterWrapper.Item);
