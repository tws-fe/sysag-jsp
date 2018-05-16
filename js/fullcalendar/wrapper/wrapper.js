
function FullCalendarWrapper(o){
	this.init(o);
};

FullCalendarWrapper.eventCallback = [
	'viewRender','viewDestroy','dayRender','windowResize',
	'loading',
	'dayClick',
	'eventClick', 'eventMouseover', 'eventMouseout',
	'select', 'unselect',
	'eventRender', 'eventAfterRender', 'eventAfterAllRender', 'eventDestroy',
	'eventDragStart', 'eventDragStop', 'eventDrop', 'eventResizeStart', 'eventResizeStop', 'eventResize'
];

(function($, Wrapper){
	
	Wrapper.prototype.init = function(o){
		var _this_ = this;
		var iamIE = navigator.userAgent.indexOf('MSIE') >= 0;
		
		for(var k in o){
			this[k] = o[k];
		}
		
		this.header = this.header || {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		};
		
		
		this.businessHours = this.businessHours || {
		    start: '7:00', 
		    end: '20:00', 
		    dow: [ 1, 2, 3, 4, 5, 6, 0 ] 
		};

		this.lang = this.lang || 'zh-cn';
		this.defaultDate = this.defaultDate || new Date();
		this.editable = this.editable || true;
		this.eventLimit = this.eventLimit || true;
		
		this.slotDuration = this.slotDuration || '00:15:00';
		
		
		this.eventTextColor = this.eventTextColor || 'rgb(64,128,196)';
		this.eventBorderColor = this.eventBorderColor || 'rgb(64,128,196)';
		this.eventBackgroundColor = this.eventBackgroundColor || 'rgb(255,255,255)';
		
		this.defaultTimedEventDuration = this.defaultTimedEventDuration || (iamIE ? '00:30:00' : '00:15:00');
		
		
		
		this.eventDataTransform = this.eventDataTransform || function(eventData){
			if (this.mapping){
				for(var k in this.mapping){
					var mapto = this.mapping[k];
					if (typeof mapto == 'string'){
						eventData[k] = eventData[mapto];
					} else if (mapto instanceof Array){
						for(var i = 0; i < mapto.length; i++){
							if (eventData[mapto[i]]){
								eventData[k] = eventData[mapto[i]];
								break;
							}
						}
					}
				}
			}
			if (this.callback && this.callback.eventDataTransform){
				var callback_ret = this.callback.eventDataTransform.call(this, eventData, _this_);
				if (callback_ret){
					eventData = callback_ret;
				}
			}
			return eventData;
		};
		
		
		for(var i = 0; i < FullCalendarWrapper.eventCallback.length; i++){
			var eventName = FullCalendarWrapper.eventCallback[i];
			this[eventName] = this[eventName] || (function(eventName){
				return function(){
					if (_this_.callback && _this_.callback[eventName]){
						var args = Array.prototype.slice.call(arguments).concat(_this_);
						return _this_.callback[eventName].apply(this, args);
					}
				};
			})(eventName);	
		}
		return this;
	}
	
	Wrapper.prototype.render = function(){
		if (!this.selector){
			throw "[FullCalendar Wrapper] no selector found";
		}
		
		this.instance = $(this.selector).fullCalendar(this);
		
		if (this.afterRender){
			this.afterRender(this.instance);
		}
		this.setRefetchInterval();
		if (navigator.userAgent.indexOf('MSIE') >= 0 || navigator.userAgent.indexOf('Trident') >= 0){ // IE9 的 prev, next 按鈕出不來, 可能是 css3 的問題, 在这手动加一个
			
			var btnCss = null;
			if (navigator.userAgent.indexOf('MSIE') >= 0){
				btnCss = {
					marginTop : '6px',
					fontWeight : 'bold'
				}; 					
			} else {
				btnCss = {
					marginTop : '3px',
					fontWeight : 'bold'
				};
			}
			var btnNext = $('.fc-icon-right-single-arrow');
			var btnPrev = $('.fc-icon-left-single-arrow');
			btnNext.removeClass('fc-icon-right-single-arrow');
			btnPrev.removeClass('fc-icon-left-single-arrow');
			btnNext.html(' > ');
			btnPrev.html(' < ');
			btnNext.css(btnCss);
			btnPrev.css(btnCss);
		} 
		
		return this;
	};
	
	
	Wrapper.prototype.setRefetchInterval = function(refetchInterval){
		this.refetchInterval = refetchInterval || this.refetchInterval;
		if (this.refetchInterval && this.refetchInterval > 0){
			if (this.refetchTimer){
				clearTimeout(this.refetchTimer);
			}
			var _this_ = this;
			this.refetchTimer = setTimeout(function(){
				if (_this_.beforeRefetch && _this_.beforeRefecth() == false){
					return;
				}
				jQuery(_this_.selector).fullCalendar('refetchEvents');
				if (_this_.afterRefetch){
					_this_.afterRefecth();
				}
				_this_.setRefetchInterval();
			}, this.refetchInterval * 1000);
		}
		return this;
	};
	
	
	
})(jQuery, FullCalendarWrapper);