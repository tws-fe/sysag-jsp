
function KiList(o){
	this.adaptOption(o);
}

(function($){
	
	KiList.Item = function(o){
		this.adaptOption(o);
	};
	
	KiList.prototype.adaptOption = function(o){
		if (!o){
			o = this.option;
			if (!o) {
				throw "[KiList] no option";
			}
		}
		for(var k in o ){
			this[k] = o[k];
		}
		
		this.renderMode = this.renderMode || 'normal';
		this.items_raw = this.items || [];
		this.items = [];
		var item;
		for(var i = 0; i < this.items_raw.length; i++){
			item = new KiList.Item(this.items_raw[i]);
			item.index = i;
			item.parent = this;
			this.items.push(item);
		}
		this.className = this.className || '';
		return this;
	};
	
	KiList.prototype.resize = function(){
		if (this.left){
			$(this.renderTo).css('left', this.left);
		}
		if (this.top){
			$(this.renderTo).css('top', this.top);
		}
		if (this.width){
			$(this.renderTo).css('width', this.width);
		}
		if (this.height){
			$(this.renderTo).css('height', this.height);
		}
	};
	
	KiList.prototype.render = function(renderMode){
		if (typeof renderMode != 'undefined'){
			this.renderMode = renderMode;
		}
		if (!this.renderTo || !document.getElementById(this.renderTo)){
			throw "[KiList] invalid element to be rendered to";
		}
		this.id = this.id || 'ki_list_' + this.renderTo;
		
		if (this.beforeRender){
			this.beforeRender();
		}
		
		$('#' + this.renderTo).html(this.renderHtml());
		
		this.hookEvent();
		
		if (this.afterRender){
			this.afterRender();
		}
		
		this.setActiveItem(this.activeIndex || 0);
		return this;
	};	
	
	KiList.prototype.renderHtml = function(){
		var h = [];
		h.push('<ul id="' + this.id);
		h.push('" class="ki-list ' + this.className);
		h.push('" style="');
		if (this.width){
			h.push('width:' + this.width + ';')
		}
		if (this.height){
			h.push('height:' + this.height + ';');
		}
		if (this.left){
			h.push('left:' + this.left + ';')
		}
		if (this.top){
			h.push('top:' + this.top + ';');
		}
		if (this.style){
			h.push(this.style);
		}
		h.push('">'); 
		for(var i = 0; i < this.items.length; i++){
			var hitem = this.items[i].render('normal');
			h.push(hitem);
		}
		h.push('</ul>');
		return h.join('');
	};
	
	KiList.prototype.hookEvent = function(){
		var $items = $('#' + this.renderTo + ' .ki-list-item');
		for(var i = 0; i < $items.length; i++){
			var $item = $($items[i]);
			var itemobj = this.items[i];
			
			$item.on('click', (function(itemobj){
				return function(e){
					if (itemobj.handlers){
						if (!itemobj.activated && itemobj.handlers.activate){
							if (itemobj.handlers.activate.call(this, e, itemobj, itemobj.parent, itemobj.index) == false){
								return;
							}
						}
						if (itemobj.handlers.click){
							if (itemobj.handlers.click.call(this, e, itemobj, itemobj.parent, itemobj.index) == false){
								return;
							}	
						}
					}
					itemobj.activated = true;
					if (!itemobj.parent.inactive && !itemobj.inactive){
						$('#' + itemobj.parent.renderTo + ' .ki-list-item').removeClass('ki-list-item-active');
						$(this).addClass('ki-list-item-active');
						itemobj.parent.activeItem = itemobj;
						itemobj.parent.activeIndex = itemobj.index;
					}
				};
			})(itemobj));
			
			var itemhandlers = this.items[i].handlers
			if (!itemhandlers){
				continue;
			}
				
			for(var eventname in itemhandlers){
				if (eventname == 'click'){
					continue;
				}
				$item.on(eventname, (function(itemobj, eventname){
					return function(e){
						itemhandlers[eventname].call($item[0], e, itemobj, itemobj.parent, itemobj.index);
					};
				})(itemobj, eventname) );	
			}	
		}
		if (this.handlers){
			var list = this;
			for(var eventname in this.handlers){
				$('#' + this.renderTo).on( eventname, (function(list){
					return function(e){
						this.handlers[eventname].call(list, e, this);
					};
				})(list) );
			}
		};
		return this;
	};
	
	KiList.prototype.setActiveItem = function(o){
		var $items = $('#' + this.renderTo + ' .ki-list-item');
		switch(typeof o){
		case 'number':
			$($items[o]).click();
			break;
		}
		this.activeIndex = o;
		this.activeItem = this.items[o];
	};
})(jQuery);

(function($, Item){
	Item.prototype.adaptOption = function(o){
		if (!o){
			o = this.option;
			if (!o) {
				throw "[KiList.Item] no option";
			}
		}
		for(var k in o ){
			this[k] = o[k];
		}
		this.id = this.id || '';
		this.className = this.className || '';
		return this;
	};
	
	Item.prototype.render = function(renderMode){
		var h = [];
		h.push('<li id="' + this.id);
		h.push('" class="ki-list-item ' + this.className);
		if (this.inactive || this.parent.inactive){
			h.push(' ki-list-item-inactive');
		}
		h.push('" style="');
		if (this.width){
			h.push('width:' + this.width + ';')
		}
		if (this.height){
			h.push('height:' + this.height + ';');
		}
		if (this.style){
			h.push(this.style);
		}
		h.push('">'); 
		if (this.icon){
			h.push('<img src="' + this.icon + '" />'); 
		}
		if (typeof this.html == 'function'){
			h.push(this.html.call(this));
		} else {
			h.push(this.html);
		}
		h.push('</li>');
		return h.join('');
	};
	
	Item.prototype.hookEvent = function(){
		if (!this.handlers){
			return this;
		}
		return this;
	};
})(jQuery, KiList.Item);