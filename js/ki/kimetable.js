
function Kimetable(o){
	this.init(o);
}

(function($){
	
	
	Kimetable.prototype.jump = function(interval){
		if (this.beforeJump){
			this.beforeJump(interval);
		}
		if (!interval){			
			this.date = this.date_src ? null : new Date();
			this.render();
			return;
		}
		var j = new Date(this.date.time);
		var y = this.date.year;
		var m = this.date.month;
		switch(this.scale){
		case 'week':
			j = new Date(j.getTime() + interval * 7 * 24 * 60 * 60 * 1000);
			m = j.getMonth() + 1;
			y = j.getFullYear();
			break;
		case 'year':
			break;
		case 'month':
		default:
			m = m + interval;
			break;
		}
		if (m <= 0){
			y = y - 1;
		} else if (m >= 13) {
			y = y + 1;
		}
		j.setMonth(m - 1);
		j.setFullYear(y);
		this.date = j;
		
		this.render();
		if (this.afterJump){
			this.afterJump(interval);
		}
	}; // Kimetable.prototype.jump = function(interval)
	
	
})(jQuery);


/* prototype */
(function($){
	
	Kimetable.prototype.init = function(o){
		for(var k in o){
			this[k] = o[k];
		}
		this.date = this.date || new Date();
		
		this.scale = this.scale || 'month';
		this.direction = this.direction || 'vertical';
		this.renderMode = this.direction + '-' + this.scale;
		
	}; // Kimetable.prototype.init = function(o)
	
	
	
	Kimetable.prototype.adaptDate = function(d){
		if (!this.date){
			this.date = new Date();
		}
		if (!d){
			d = this.date;	
		}
		var t;
		this.date = {};
		if (typeof d == 'string'){
			t = KiUtil.stringToDate(d);
		} else if (typeof d == 'number'){
			this.date.time = d;
			t = new Date(this.date.time);
		} else if (d instanceof Date){
			t = d;
		} else {
			t = new Date();
		}
		
		t.setHours(0);
		t.setMinutes(0);
		t.setSeconds(0);
		t.setMilliseconds(1);
		
		this.date.time = t.getTime();
		
		this.date.year = t.getFullYear();
		this.date.month = t.getMonth() + 1;
			
		this.date.day_count = KiUtil.getDaysInMonth(t);
			
		this.date.day_of_year = KiUtil.getDayOfYear(t);
			
		this.date.day_of_month = t.getDate();
		this.date.first_day_of_week = KiUtil.getFirstDayOfMonth(t);
		
		var e = new Date(t.getTime());
		switch(this.scale){
		case 'week':
			t.setDate(t.getDate() - t.getDay()); 
			e.setDate(e.getDate() - e.getDay() + 6);
			break;
		case 'year':
			t.setMonth(0);
			e.setMonth(11);
		case 'month':
			t.setDate(1); 
			e.setDate(KiUtil.getDaysInMonth(e));
			break;
		}
		e.setHours(23);
		e.setMinutes(59);
		e.setSeconds(59);
		
		this.date.begin = t.getTime();
		this.date.startdate = KiUtil.dateToString(t , '-');
		
		
		this.date.end = e.getTime();
		this.date.enddate = KiUtil.dateToString(e , '-');
		
		
		// 周数
		this.date.week_count = Math.floor((this.date.day_count + this.date.first_day_of_week) / 7); 
		this.date.week_count = (this.date.day_count + this.date.first_day_of_week) % 7 == 0 ? this.date.week_count : this.date.week_count + 1;
	}; // Kimetable.prototype.adaptDate = function(date)
	
	Kimetable.prototype.adaptSize = function(){
		var $renderTo = $("#" + this.renderTo);
		var width = $renderTo.width();
		var height = $renderTo.height();
		if (this.beforeAdaptSize){
			if (this.beforeAdaptSize(width, height) == false){
				return this;
			}
		}
		switch(this.renderMode){
		case 'horizontal-week':
			$('.kime-div-date').css('height', '22px');
			break;
		case 'vertical-month':
		default:
			$('.kime-div-data').height(height / this.date.week_count * 0.75);
			break;
		}
		if (this.afterAdaptSize){
			this.afterAdaptSize(width, height);
		}
		return this;
	}; // Kimetable.prototype.adaptSize = function()
	
	
	Kimetable.prototype.clearTable = function(){
		document.getElementById(this.renderTo).innerHTML = '';
	}; // Kimetable.prototype.clearTable = function()
	
	Kimetable.prototype.clearData = function(){
		$("#" + this.renderTo + '-table .kime-div-data').html('');
		this.data = null;
	}; // Kimetable.prototype.clearData = function()
	
	Kimetable.prototype.render = function(mode){
		this.renderTable(this.renderData);
	};
	
	
	Kimetable.prototype.renderTable = function(callback){
		var $renderTo = $('#' + this.renderTo);
		if (!$renderTo || $renderTo.length == 0){
			throw "[kimetable] no target to be rendered to : " + this.renderTo;
		}
		
		var rmsplit = this.renderMode.split('-'); 
		this.scale = rmsplit[1];
		this.direction = rmsplit[0];
		
		if (this.date_src){
			$.ajax({
				type : 'POST',
				url : this.date_src,
				data : KiUtil.parseToken.call(this, this.date_param),
				dataType : 'text',
				context : this,
				success : function(r){
					this.date = KiUtil.eval(r);
					this.clearTable();
					this.$$renderTable($renderTo, callback);
				},
				error : function(e){
					throw "[kimetable] fetch date from " + this.date_src + " fail : " + e;
				}
			});
		} else {
			this.clearTable();
			this.$$renderTable($renderTo, callback);
		}
	}; // Kimetable.prototype.renderTable = function()
	
	Kimetable.prototype.$$renderTable = function($renderTo, callback){
		
		this.adaptDate();
		
		this.renderHeader();
		
		var $t = $('<table id="' + this.renderTo + '-table" class="kime-table" align="center"></table>').appendTo($renderTo);
		
		
		
		var html;
		switch(this.renderMode){
		case 'horizontal-week':
			html = this.render_horizontal_week();
			break;
		case 'vertical-month':
		default:
			html = this.render_vertical_month();
			break;
		}
		$t.html(html.join(''));
		
		this.adaptSize();
		
		// 找出今天
		var today = new Date();
		if (today.getTime() >= this.date.begin && today.getTime() <= this.date.end){
			var $div_date = $("#" + this.renderTo + '-table .kime-div-date');
			var div_date_today; 
			switch(this.scale){
			case 'week':
				var interval = today.getTime() - this.date.begin;
				interval = Math.floor(interval / (24 * 60 * 60 * 1000));
				div_date_today = $div_date[interval];
				break;
			case 'month':
			default:
				div_date_today = $div_date[ this.date.first_day_of_week + today.getDate() - 1];
				break;
			}
			div_date_today.className = div_date_today.className + ' kime-today'; 
		}
		this.hookEvents();
		if (callback){
			callback.call(this);	
		}
		delete html;
	}; // Kimetable.prototype.$$renderTable = function(renderTo, renderMode)
	
	Kimetable.prototype.$$hookEvents = function(selector, eventname, callbackname){
		if (!this[callbackname]){
			return;
		}
		var kimetable = this;
		var $kime_div_data = $('#' + this.renderTo + ' ' + selector);
		for(var i = 0; i < $kime_div_data.length; i++){
			$kime_div_data[i][eventname] = (function(src, i){
				return function() {
					kimetable[callbackname](src, kimetable.data[i], i);
				};
			})($kime_div_data[i], i);
		}
	}; // Kimetable.prototype.$$hookEvents = function()
	
	Kimetable.prototype.hookEvents = function(){
		this.$$hookEvents('.kime-div-data', 'onclick', 'on_data_click');
		this.$$hookEvents('.kime-div-data', 'ondblclick', 'on_data_dblclick');
		this.$$hookEvents('.kime-div-data', 'onmouseover', 'on_data_mouseover');
		this.$$hookEvents('.kime-div-data', 'onmouseout', 'on_data_mouseout');
	}; // Kimetable.prototype.hookEvents = function()
	
	Kimetable.prototype.render_horizontal_week = function(){
		var h = [];
		h.push('<tr class="kime-tr-weekname">');
		for(var d = 1 ; d <= 7; d++){
			h.push('<td class="kime-td-weekname">');
			h.push(KiUtil.weekname[d]);
			h.push('</td>');
		}	
		h.push('</tr>');
		
		var startdate = new Date(this.date.begin);
		var tr_class = '';
		
		h.push('<tr class="kime-tr '); h.push(tr_class); h.push('">');
		for(var d = 1; d <= 7; d++){
			var td_class = 'kime-td-date ', div_date_class = 'kime-div-date ', div_data_class = '';
			var div_date_content = '&nbsp;', div_data_content = '&nbsp;';
			
			div_data_class = 'kime-div-data '
			div_date_content = new Date(this.date.begin + (d - 1) * 24 * 60 * 60 * 1000).getDate();
			if (d == 1 || d == 7){
				div_date_class += 'kime-holiday ';
			} else {
				div_date_class += 'kime-workday ';
			}
			
			td_class += ('kime-d' + d);
			
			h.push('<td class="'); h.push(td_class); h.push('">');
			h.push('<div class="'); h.push(div_date_class); h.push('">');
			h.push(div_date_content); 
			h.push('</div>');
			h.push('<div class="'); h.push(div_data_class); h.push('">'); 
			h.push(div_data_content); 
			h.push('</div>');
			h.push('</td>');
		}
		h.push('</tr>');
		return h;
	}; // Kimetable.prototype.render_horizontal_week = function(){
	
	Kimetable.prototype.render_vertical_month = function(){
		var h = [];
		h.push('<tr class="kime-tr-weekname">');
		for(var d = 1 ; d <= 7; d++){
			h.push('<td class="kime-td-weekname">');
			h.push(KiUtil.weekname[d]);
			h.push('</td>');
		}	
		h.push('</tr>');
		var day = 1 - this.date.first_day_of_week;
		
		for(var w = 1; w <= this.date.week_count; w++){
			var tr_class = '';
			h.push('<tr class="kime-tr '); h.push(tr_class); h.push('">');
			for(var d = 1; d <= 7; d++){
				var td_class = 'kime-td-date ', div_date_class = 'kime-div-date ', div_data_class = '';
				var div_date_content = '&nbsp;', div_data_content = '&nbsp;';
				if (day <= 0){
					div_data_class = 'kime-div-blank ';				
				} else if (day <= this.date.day_count){
					div_data_class = 'kime-div-data '
					div_date_content = day;
					if (d == 1 || d == 7){
						div_date_class += 'kime-holiday ';
					} else {
						div_date_class += 'kime-workday ';
					}
				} else {
					div_data_class = 'kime-div-blank ';
				}
				
				td_class += ('kime-d' + day);
				
				h.push('<td class="'); h.push(td_class); h.push('">');
				h.push('<div class="'); h.push(div_date_class); h.push('">');
				h.push(div_date_content); 
				h.push('</div>');
				h.push('<div class="'); h.push(div_data_class); h.push('">'); 
				h.push(div_data_content); 
				h.push('</div>');
				h.push('</td>');
				day++;
			}
			h.push('</tr>');
		}
		return h;
	}; // Kimetable.prototype.render_vertical_month = function(html)
	
	Kimetable.prototype.renderData = function(data, callback){
		if (data){
			this.data = data;
		}
		if (this.data_src){
			var param = KiUtil.parseTokenMap.call(this, this.data_param);
			$.ajax({
				type : 'POST',
				url : this.data_src,
				data : param,
				dataType : 'text',
				context : this,
				success : function(r){
					this.data = KiUtil.eval(r);
					if (this.adaptData){
						var r = this.adaptData(this.data);
						if (r){
							this.data = r;
						}
					}
					this.$$renderData(callback);
				}, 
				error : function(e){
					throw "[kimetable] fetch data from " + this.data_src + " fail : " + e;
				}
			});
		} else {
			if (this.adaptData){
				var r = this.adaptData(this.data);
				if (r){
					this.data = r;
				}
			}
			this.$$renderData(callback);
		}
	} // Kimetable.prototpe.renderData = function(date)
	
	Kimetable.prototype.adaptData = function(){
		var array = [];
		
		if (this.data instanceof String){
			this.data = KiUtil.eval(this.data);
		}
		
		var need_to_adapt = false;
		if (this.data instanceof Array){
			for(var i = 0; i < this.data.length; i++){
				if (this.data[i] && typeof this.data[i][this.date_name] == 'string'){
					need_to_adapt = true;
					break;
				}	
			}
		} else if (this.data instanceof Object){
			for(var k in this.data){
				if (typeof k == 'string' && k.indexOf('-') > 0){
					need_to_adapt = true;
				}
				break;
			}
			if (need_to_adapt) {
				var temparray = [];
				for(var k in this.data){
					data[k].date = k;
					temparray.push(data[k]);
				}
			}
		}
		
		if (need_to_adapt){
			var begin = this.date.begin; 	// point zero
			var dm = 1000 * 60 * 60 * 24;
			if (!this.date_name){
				this.date_name = 'date';
			}
			for(var i = 0; i < this.data.length; i++){
				if (this.data[i]){
					var d = this.data[i][this.date_name];
					if (typeof d == 'string'){
						var t = KiUtil.stringToDate(d).getTime();
						var interval = Math.floor((t - begin) / dm);
						if (array[interval]){
							if (array[interval] instanceof Array){
								array[interval].push(this.data[i]);
							} else {
								array[interval] = [ array[interval], this.data[i] ];
							}
						} else {
							array[interval] = this.data[i];
						}
					}
				}
			}
		}
		this.data_raw = this.data;
		this.data = array;
	}; // Kimetable.prototype.adaptData = function()
	
	Kimetable.prototype.$$renderData = function(callback){
		if (!this.data){
			return;
		}
		var $div_data = $("#" + this.renderTo + '-table .kime-div-data');
		
		for(var i = 0; i < this.data.length; i++){
			if ($div_data[i] && this.data[i]){
				var html = this.dataHandler(this.data[i], i, $div_data[i]);
				if (html){
					$div_data[i].innerHTML = html;
				}
			}
		}			
		if (callback){
			callback.call(this);
		}
		return this;
	}; // Kimetable.prototype.renderDate = function()
	
	Kimetable.prototype.renderHeader = function(scale){
		if (!scale){
			scale = this.scale;
		}
		if (!this.scale){
			this.scale = this.renderMode.split('-')[1];
		}
		var $header = $('<div id=' + this.renderTo + '-header class="kime-header"></div>').appendTo($('#' + this.renderTo));
		var h = '';
		switch(this.scale){
		case 'week':
			h += '<a class="kime-button kime-previous" >上周</a>';
			h += '<a class="kime-button kime-current">' +  this.date.startdate + ' ~ ' + this.date.enddate + '</a>';
			h += '<a class="kime-button kime-next" >下周</a>';
			break;
		case 'month':
		default:
			h += '<a class="kime-button kime-previous" >上月</a>';
			h += '<a class="kime-button kime-current">' +  this.date.year + ' 年 ' + this.date.month + ' 月</a>';
			h += '<a class="kime-button kime-next" >下月</a>';
			break;
		}
		$header.html(h);
		
		var kimetable = this;
		
		$('#' + this.renderTo + ' .kime-previous').on('click', function(e){
			kimetable.jump(-1); 
		});
		$('#' + this.renderTo + ' .kime-current').on('click', function(e){ 
			kimetable.jump(0); 
		});
		$('#' + this.renderTo + ' .kime-next').on('click', function(e){ 
			kimetable.jump(1); 
		});
			
		return $header;		
	}; // Kimetable.prototype.renderHeader = function() [default] 
	
	Kimetable.prototype.dataHandler = function(data, index){
		switch(typeof data){
		case 'boolean':
		case 'number':
		case 'string':
			return data;
		case 'function':
			return data.call(this, index);
		case 'undefined':
			return '';
		case 'object':
			if (data == null){
				return '';
			}
		}
	}; // Kimetable.prototype.dataHandler = function(data, index) [default] 
	
	
})(jQuery);