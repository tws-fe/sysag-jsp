
(function($){
	
	window.KiUtil = {};
	
	KiUtil.weekname = ['日', '日','一','二','三','四','五','六','日'];
	KiUtil.days_in_month = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	KiUtil.stringToDate = function(s){
		var ymd = s.split('-');
		if (ymd.length == 0){
			ymd = s.split('.');
		}
		t = new Date();
		t.setYear(ymd[0] * 1);
		t.setMonth(ymd[1] * 1 - 1);
		t.setDate(ymd[2] * 1);
		
		t.setHours(0);
		t.setMinutes(0);
		t.setSeconds(0);
		t.setMilliseconds(1);
		
		return t;
	}; //KiUtil.stringToDate = function(str)
	
	KiUtil.dateToString = function(d, sep){
		if (!sep){
			sep = '-';
		}
		var s = d.getFullYear() + sep;
		s += (d.getMonth() >= 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)) + sep;
		s += d.getDate() >= 10 ? d.getDate() : '0' + d.getDate();
		return s;
	}; // KiUtil.dateToString = function(date, seperator)
	
	KiUtil.isLeapYear = function(date){
		var y = date.getFullYear();
		if (y % 400 == 0) return true;
		if (y % 100 == 0) return false;
		if (y % 4 == 0) return true;
		return false;
	}
	
	KiUtil.getDaysInMonth = function(date){
		var m = date.getMonth();
		if (m == 1){
			return KiUtil.isLeapYear(date) ? 29 : 28;
		}
		return KiUtil.days_in_month[m];
	}; // KiUtil.getDaysInMonth = function(date)
	
	KiUtil.getDayOfYear = function(date){
		var m = date.getMonth();
		var s = 0;
		for(var i = 0; i < 12; i++){
			if (i == 1){
				s += KiUtil.isLeapYear(date) ? 29 : 28;
			} else {
				s += KiUtil.days_in_month[i];
			}
		}
		return s;
	}; // KiUtil.getDayOfYear = function(date)
	
	KiUtil.getFirstDayOfMonth = function(date){
		var d = new Date(date.getTime());
		d.setDate(1);
		return d.getDay();
	}; // KiUtil.getFirstDayOfMonth = function(date)
	
	KiUtil.iterate_array_replacestr = function(array, regex, to){
		for(var i = 0; i < array.length; i++){
			if (!array[i]){
				continue;
			}
			if (typeof array[i] == 'string') {
				array[i] = array[i].replace(regex, to);
			} else if (array[i] instanceof Array){
				array[i] = KiUtil.iterate_array_replacestr(array[i], regex, to);
			} else {
				array[i] = KiUtil.iterate_map_replacestr(array[i], regex, to);
			}
		}
		return array;
	}; 
	
	KiUtil.iterate_map_replacestr = function(map, regex, to){
		for(var k in map){
			if (!map[k]) {
				continue;
			}
			if (typeof map[k] == 'string') {
				map[k] = map[k].replace(regex, to);
			} else if (map[k] instanceof Array){
				map[k] = KiUtil.iterate_array_replacestr(map[k], regex, to);
			} else {
				map[k] = KiUtil.iterate_map_replacestr(map[k], regex, to);
			}
		}
		return map;
	};
	
	KiUtil.iterate_replacestr = function(object, regex, to){
		if (!object) return null;
		if (object instanceof Array){
			return KiUtil.iterate_array_replacestr(object, regex, to);
		} else {
			return KiUtil.iterate_map_replacestr(object, regex, to);
		}
	};
	
	KiUtil.cloneMap = function(src, des, fields){
		if (!src){
			return;
		}
		des = des || {};
		if (fields){
			for(var i = 0; i < fields.length; i++){
				des[fields[i]] = src[fields[i]];
			}
		} else {
			for(var k in src){
				des[k] = src[k];
			}
		}
		return des;
	};
	
	KiUtil.eval = function(str) {
		if (!str){
			return null;
		}
		var hasEscape = str.indexOf('\n') >= 0;
		if (str.indexOf('\r') >= 0){
			str = str.replace(/\r/g, '');
		}
		var h = str.charAt(0);
		var r;
		if (h == '[' || h == '{'){
			if (hasEscape){
				str = str.replace(/\n/g, ';@n@;');
			}
			r = eval('(' + str + ')');
			if (hasEscape){
				r = KiUtil.iterate_replacestr(r, /;@n@;/g, '\n');
			}
		} else if (str.indexOf('%') >= 0){
			str = decodeURIComponent(str);
			return KiUtil.eval(str);
		} else {
			if (hasEscape){
				str = str.replace(/\n/g, '');
			}
			r = eval(str);
		}
		return r;
	}; // KiUtil.eval(str)
	
	KiUtil.parseToken = function(str, context){
		if (context){
			return KiUtil.parseToekn.call(context, str);
		}
		var r = '', head, tail, expression;
		while (true) {
			head = str.indexOf('{{');
			if (head < 0) {
				break;
			}
			tail = str.indexOf('}}')
			expression = str.substring(head + 2, tail);
			r += str.substring(0, head);
			str = str.substring(tail + 2);
			try {
				r += eval( expression);
			} catch (e){
				r += KiUtil.eval(expression);
			}
		}
		return r || str;
	};
	
	KiUtil.parseTokenMap = function(map, context){
		if (context){
			return KiUtil.parseTokenMap.call(context, map);
		}
		var param_c = {};
		for(var k in map){
			var v = map[k];
			switch(typeof v){
			case 'function':
				param_c[k] = v.call(this, map);
				break;
			case 'string':
				param_c[k] = KiUtil.parseToken.call(this, v);
				break;
			}
			
		}
		return param_c;
	};
})(jQuery);