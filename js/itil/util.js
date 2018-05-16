/* ============================================ TimeUtil ======================================================= */

function checkdatetime(param){
	if(param.value !=''){
	var reg = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))(\s([0-1]\d|[2][0-3])\:[0-5]\d\:[0-5]\d)/;
	var r = param.value.match(reg);
	
	  if(r==null){
		 $('#'+ param.id).val("");
		 alert("请输入正确的时间");
	  }
	}
}


function TimeUtil() {

};

TimeUtil.init = function() {
	
	if (TimeUtil.inited){
		return TimeUtil;
	}
	
	TimeUtil.weekname = ['日', '日','一','二','三','四','五','六','日'];
	TimeUtil.days_in_month = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	TimeUtil.getDateInterval = function(type) {
		var today = new Date();
		var start = new Date();
		var end = new Date();
		var startTime, endTime;

		var day_of_week = today.getDay();
		var day_of_month = today.getDate();

		var aday = 24 * 60 * 60 * 1000;
		if (type == 'last_week') {
			endTime = today.getTime() - (day_of_week + 1) * aday;
			startTime = endTime - 6 * aday;
		} else if (type == 'this_week') {
			startTime = today.getTime() - day_of_week * aday;
			endTime = startTime + 6 * aday;
		} else if (type == 'next_week') {
			startTime = today.getTime() - (day_of_week - 1) * aday;
			endTime = startTime + 12 * aday;
		}else if (type.indexOf('month_') == 0) {
			var month = type.split('_')[1] * 1.0 - 1;
			startTime = new Date();
			startTime.setMonth(month);
			startTime.setDate(1);

			endTime = new Date();
			endTime.setMonth(month + 1);
			endTime.setDate(1);

			endTime = endTime.getTime() - aday;
		} else if (type == 'last_month') {
			startTime = new Date();
			startTime.setMonth(today.getMonth() - 1);
			startTime.setDate(1);

			endTime = new Date();
			endTime.setDate(1);
			endTime = endTime.getTime() - aday;
		} else if (type == 'this_month') {
			startTime = new Date();
			startTime.setDate(1);

			endTime = new Date();
			endTime.setMonth(endTime.getMonth() + 1);
			endTime.setDate(1);
			endTime = endTime.getTime() - aday;
		} else if (type == 'three_month') {
			endTime = new Date();
			endTime.setMonth(endTime.getMonth() + 1);
			endTime.setDate(1);
			endTime.setTime(endTime.getTime() - aday);

			startTime = new Date();
			startTime.setMonth(endTime.getMonth() - 2);
			startTime.setDate(1);
		} else if (type == 'six_month') {
			endTime = new Date();
			endTime.setMonth(endTime.getMonth() + 1);
			endTime.setDate(1);
			endTime.setTime(endTime.getTime() - aday);

			startTime = new Date();
			startTime.setMonth(endTime.getMonth() - 5);
			startTime.setDate(1);
		} else if (type == 'last_year') {
			startTime = new Date();
			startTime.setFullYear(startTime.getFullYear() - 1);
			startTime.setMonth(0);
			startTime.setDate(1);

			endTime = new Date();
			endTime.setMonth(0);
			endTime.setDate(1);
			endTime = endTime.getTime() - aday;

		} else if (type == 'this_year') {
			startTime = new Date();
			startTime.setMonth(0);
			startTime.setDate(1);

			endTime = new Date();
			endTime.setMonth(11);
			endTime.setDate(31);
		}
		endTime = endTime instanceof Date ? endTime.getTime() : endTime;
		startTime = startTime instanceof Date ? startTime.getTime() : startTime;

		end.setTime(endTime);
		start.setTime(startTime);

		var interval = new Object();
		interval.start = start;
		interval.end = end;
		return interval;
	}; // TimeUtil.getDateInterval

	TimeUtil.format00 = function(num) {
		return num < 10 ? '0' + num : num;
	} // TimeUtil.format00

	TimeUtil.format_date = function(date) {
		var sdate = date.getFullYear() + '-' + format00(date.getMonth() + 1)
				+ '-' + format00(date.getDate()) + ' ';
		sdate = sdate + format00(date.getHours()) + ':'
				+ format00(date.getMinutes()) + ':'
				+ format00(date.getSeconds());
		return sdate;
	} // TimeUtil.format_date

	TimeUtil.getServerTimeTo = function(callback, _async) {
		var returnVal;
		_async = _async == undefined ? true : _async;
		jQuery.ajax({
			type : 'post',
			url : CONTEXTPATH + "/formcheck.do?method=getTime",
			async : _async,
			data : {},
			dataType : 'text',
			success : function(response, xhr) {
				if (callback) {
					returnVal = callback(response, xhr);
				} else {
					returnVal = response;
				}
			},
			error : function() {
				alert('unable to get server time');
			}
		});
		return returnVal;
	} 
	
	TimeUtil.stringToDate = function(s, ymd_splitter, bs_splitter, hms_splitter){
		ymd_splitter = ymd_splitter || '-';
		bs_splitter = bs_splitter || ' ';
		hms_splitter = hms_splitter || ':';
		var twopart = s.split(bs_splitter);
		
		var ymd = twopart[0].trim();
		ymd = ymd.split(ymd_splitter);
		
		var t = new Date();
		t.setYear(ymd[0] * 1);
		t.setMonth(ymd[1] * 1 - 1);
		t.setDate(ymd[2] * 1);
		
		var hms = twopart[1];
		if (hms){
			hms = hms.trim().split(hms_splitter);
			t.setHours(hms[0] * 1);		
			t.setMinutes(hms[1] * 1);
			t.setSeconds(hms[2] * 1);
		} else {
			t.setHours(0);		
			t.setMinutes(0);
			t.setSeconds(0);
		}
		t.setMilliseconds(1);
		
		return t;
	};  // TimeUtil.stringToDate = function(s, ymd_splitter, bs_splitter, hms_splitter){
	
	TimeUtil.dateToString = function(d, need_hms, ymd_splitter, bs_splitter, hms_splitter){
		
		ymd_splitter = ymd_splitter || '-';
		bs_splitter = bs_splitter || ' ';
		hms_splitter = hms_splitter || ':';
		need_hms = typeof need_hms == 'undefined' ? true : need_hms;
		
		var s;
		s = d.getFullYear() + ymd_splitter;
		s += (d.getMonth() >= 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)) + ymd_splitter;
		s += d.getDate() >= 10 ? d.getDate() : '0' + d.getDate();
		
		if (need_hms){
			s += bs_splitter;
			s += ((d.getHours() >= 10) ? d.getHours() : '0' + d.getHours()) + hms_splitter;
			s += ((d.getMinutes() >= 10) ? d.getMinutes() : '0' + d.getMinutes()) + hms_splitter;
			s += ((d.getSeconds() >= 10) ? d.getSeconds() : '0' + d.getSeconds());
		}
		return s;
	}; 
	
	TimeUtil.isLeapYear = function(date){
		var y = date.getFullYear();
		if (y % 400 == 0) return true;
		if (y % 100 == 0) return false;
		if (y % 4 == 0) return true;
		return false;
	};
	
	TimeUtil.getDaysInMonth = function(date){
		var m = date.getMonth();
		if (m == 1){
			return TimeUtil.isLeapYear(date) ? 29 : 28;
		}
		return TimeUtil.days_in_month[m];
	}; 
	
	TimeUtil.getDayOfYear = function(date){
		var m = date.getMonth();
		var s = 0;
		for(var i = 0; i < 12; i++){
			if (i == 1){
				s += TimeUtil.isLeapYear(date) ? 29 : 28;
			} else {
				s += TimeUtil.days_in_month[i];
			}
		}
		return s;
	}; 
	
	TimeUtil.getFirstDayOfMonth = function(date){
		var d = new Date(date.getTime());
		d.setDate(1);
		return d.getDay();
	}; 
	
	TimeUtil.add = function(sdate, interval, scale, need_hms){
		need_hms = typeof need_hms == 'undefined' ? true : need_hms;
		var d = TimeUtil.stringToDate(sdate);
		var time = d.getTime();
		switch(scale){
		case 'year':
			d.setYear(d.getFullYear() + interval); 
			time = d.getTime();
			break;
		case 'month':
			var month = d.getMonth() + interval;
			if (month < 0){
				d.setYear(d.getFullYear() + Math.floor(month / 12.0));
				month = month % 12;
				month = month + 12;
			} else if (month > 11){
				d.setYear(d.getFullYear() + Math.floor(month / 12.0));
				month = month % 12;
			}
			
			d.setMonth(month);
			time = d.getTime();
			break;
		case 'day':
			time = time + interval * 24 * 60 * 60 * 1000;
			break;
		case 'hour':
			time = time + interval * 60 * 60 * 1000;
			break;
		case 'minute':
			time = time + interval * 60 * 1000;
			break;
		case 'second':
			time = time + interval * 1000;
			break;
		}
		d.setTime(time);
		return TimeUtil.dateToString(d, need_hms);
	};
	
	
	TimeUtil.inited = true;
	return TimeUtil;
} /* TimeUtil init() */
/*
 * ============================================== StringUtil
 * =====================================================
 */

function Common() {

};

Common.init = function() {

	if (Common.inited){
		return Common;
	}
	/**
	 * data [String|Array] splitregex : for string only
	 */
	Common.onlyone = function(data, splitregex) {
		var i;
		var bigarray = [];
		if (splitregex) {
			bigarray = data.split(splitregex);
		} else {
			bigarray = data;
		}
		var map = {};
		for (i = 0; i < bigarray.length; i++) {
			map[bigarray[i] + ''] = bigarray[i];
		}
		var bigarray = [];
		i = 0;
		for ( var e in map) {
			bigarray[i++] = map[e];
		}
		return bigarray;
	};

	Common.onlyonestr = function(data, splitregex) {
		return Common.onlyone(data, splitregex).join(splitregex);
	};

	Common.join = function(array, field, token) {
		if (array.length == 0)
			return '';
		var arraylen = array.length;
		var result = array[0][field];
		for (var i = 1; i < arraylen; i++) {
			result = result + token + array[i][field];
		}
		return result;
	};

	Common.replaceAll = function(str, pattern, newvalue) {
		return str.replace(new RegExp(pattern, 'g'), newvalue);
	};

	Common.trim = function(o){
		if (!o){
			return o;
		} else if (typeof o == 'string'){
			o = o.trim();
		} else if (o instanceof Array){
			for(var i = 0; i < o.length; i++){
				if (o[i]){
					o[i] = o[i].trim();
				}
			}
		}
		return o;
	}
	
	/* print */
	Common.print = function(id_str, prefix, suffix, css, javascript) {

		var iframe = document.createElement('IFRAME');
		iframe
				.setAttribute('style',
						'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
		document.body.appendChild(iframe);
		var doc = iframe.contentWindow.document;
		if (css) {
			css = css.split(',');
			for (var i = 0; i < css.length; i++) {
				doc.write('<link rel="stylesheet" type="text/css" href="'
						+ css[i] + '">')
			}
		}
		if (prefix) {
			doc.write(prefix);
		}
		if (id_str) {
			if ((id_str instanceof Array) == false) {
				id_str = [ id_str ];
			}
			for (var i = 0; i < id_str.length; i++) {
				var el = document.getElementById(id_str[i]);
				doc.write('<div>' + el.innerHTML + '</div>');
			}
		}
		if (suffix) {
			doc.write(suffix);
		}
		if (javascript) {
			javascript = javascript.split(',');
			for (var i = 0; i < javascript.length; i++) {
				doc.write('<scirpt src="' + javascript[i]
						+ '" type="text/javascript"></script>');
			}
		}
		doc.close();

		iframe.contentWindow.focus();
		alert("您确定要打印吗？");
		iframe.contentWindow.print();

		if (navigator.userAgent.indexOf("MSIE") > 0) {
			document.body.removeChild(iframe);
		}
	}; // Common.print
	
	
	/* token */
	Common.getTokenMap = function(tokenPrefix, tokenSuffix, string){
		var $pre = tokenPrefix, $suf = tokenSuffix, $s = string;
		var map = {};
		while (true) {
			i$pre = $s.indexOf($pre);
			if (i$pre < 0) {
				break;
			}
			$s = $s.substring(i$pre + $pre.length);
			i$suf = $s.indexOf($suf);
			if (i$suf < 0) {
				continue;
			}
			$token = $s.substring(0, i$suf);
			$s = $s.substring(i$suf + $suf.length);
			map[$token] = $token;
		}
		return map;
	};

	Common.parseToken = function(tokenPrefix, tokenSuffix, string, mapping, parser) {
		if (!string) {
			return '';
		}
		if (mapping) {
			if (!mapping['0']) {
				mapping = {
					'0' : mapping
				};
			}
		}
		if (parser) {
			if (!parser['0']) {
				parser = {
					'0' : parser
				};
			}
		}
		var $pre = tokenPrefix, $suf = tokenSuffix, $s = string, $parts = [];
		var i$pre, i$suf, i$dot;
		var $token, $value, $tokencategory;

		while (true) {
			i$pre = $s.indexOf($pre);
			if (i$pre < 0) {
				break;
			}
			$parts.push($s.substring(0, i$pre))
			$s = $s.substring(i$pre + $pre.length);
			i$suf = $s.indexOf($suf);
			if (i$suf < 0) {
				continue;
			}
			$token = $s.substring(0, i$suf);
			$s = $s.substring(i$suf + $suf.length);
			i$dot = $token.indexOf('.');
			if (i$dot < 0) {
				$tokencategory = '0';
			} else {
				$tokencategory = $token.substring(0, i$dot)
				$token = $token.substring(i$dot + 1);
			}
			if (mapping && mapping[$tokencategory]) {
				$value = mapping[$tokencategory][$token];
			} else if (parser && parser[$tokencategory]) {
				$value = parser[$tokencategory]($token);
			}
			$parts.push($value ? $value : '');
		}
		$parts.push($s);
		$s = '';
		for (var i = 0; i < $parts.length; i++) {
			$s += $parts[i];
		}
		return $s;
	}; // Common.parseToken(tokenPrefix, tokenSuffix, string, mapping, parser)

	
	Common.concatMap = function(src, des, keep){
		if (typeof keep == 'undefined'){
			keep = false;
		}
		if (!(src instanceof Array)){
			src = [ src ];
		}
		for(var i = 0; i < src.length; i++){
			for(var k in src[i]){
				if (des[k] && keep){
					continue;
				}
				des[k] = src[i][k];
			}
		}
		return des;
	}; // Common.concatMap(src, des)
	
	Common.shadowClone = function(src, fields){
		var des = {};
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
	
	Common.iterate_array_replacestr = function(array, regex, to){
		for(var i = 0; i < array.length; i++){
			if (!array[i]){
				continue;
			}
			if (typeof array[i] == 'string') {
				array[i] = array[i].replace(regex, to);
			} else if (array[i] instanceof Array){
				array[i] = Common.iterate_array_replacestr(array[i], regex, to);
			} else {
				array[i] = Common.iterate_map_replacestr(array[i], regex, to);
			}
		}
		return array;
	}; // Common.iterate_array_replacestr = function(array, regex, to)
	
	Common.iterate_map_replacestr = function(map, regex, to){
		for(var k in map){
			if (!map[k]) {
				continue;
			}
			if (typeof map[k] == 'string') {
				map[k] = map[k].replace(regex, to);
			} else if (map[k] instanceof Array){
				map[k] = Common.iterate_array_replacestr(map[k], regex, to);
			} else {
				map[k] = Common.iterate_map_replacestr(map[k], regex, to);
			}
		}
		return map;
	}; // Common.iterate_map_replacestr = function(map, regex, to)
	
	Common.iterate_replacestr = function(object, regex, to){
		if (!object) return null;
		if (object instanceof Array){
			return Common.iterate_array_replacestr(object, regex, to);
		} else {
			return Common.iterate_map_replacestr(object, regex, to);
		}
	}; // Common.iterate_replacestr = function(object, regex, to)
	
	Common.eval = function(str) {
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
				r = Common.iterate_replacestr(r, /;@n@;/g, '\n');
			}
		} else if (str.indexOf('%') >= 0){
			str = decodeURIComponent(str);
			return Common.eval(str);
		} else {
			if (hasEscape){
				str = str.replace(/\n/g, '');
			}
			r = eval(str);
		}
		return r;
	}; // Common.eval(str)
	
	
	Common.toJson = function(obj, q, depthlimit){
		var json = [];
		Common.toJsonArray(obj, json, q, 0, depthlimit);
		return json.join('');
	};
	
	Common.toJsonArray = function(obj, json, q, depth, depthlimit){
		
		q = q || '"';
		json = json || [];
		depth = depth || 0;
		
		if (depthlimit && depth > depthlimit){
			json.push('null');
			return json;
		}
		
		
		
		if (obj instanceof Array){
			var limit = obj.length - 1;
			json.push('[');
			for(var i = 0; i < obj.length; i++){
				var ret = Common.toJsonArray(obj[i], null, q, depth + 1, depthlimit).join('');
				if (ret == 'null'){
					continue;
				}
				json.push(ret);
				if (i < limit){
					json.push(',');
				}
			}
			json.push(']');
		} else if (obj instanceof Object && typeof obj != 'function'){
			var hasChild = false;
			json.push('{');
			for(var k in obj){
				var ret = Common.toJsonArray(obj[k], null, q, depth + 1, depthlimit).join('');
				if (ret == 'null'){
					continue;
				}
				json.push(q);
				json.push(k);
				json.push(q);
				json.push(':');
				json.push(ret);
				json.push(',')
				hasChild = true;
			}
			if (hasChild){
				json.pop();
			}
			json.push('}');
		} else if (obj == null){
			json.push('null');
			
		} else {
			switch(typeof obj){
			case 'function':
			case 'undefined':
				json.push('null');
				break;
			case 'number':
			case 'boolean':
				json.push(obj);
				break;
			case 'string':
			default:
				json.push(q);
				json.push(obj);
				json.push(q);
				break;
			}
		}
		return json;
	};
	
	Common.stringToMap = function(str, splitter){
		splitter = splitter || '&';
		var e = str.split(splitter);
		var m = {};
		for(var i = 0; i < e.length; i++){
			if (!e[i]){
				continue;
			}
			var iequal = e[i].indexOf('=');
			if (iequal > 0){
				m[e[i].substring(0, iequal)] = e[i].substring(iequal + 1);
			} else {
				m[e[i]] = e[i];
			}
		}
		return m;
	};
	
	Common.inited = true;
	return Common;
} /* Common.init() */
/*
 * ============================================== Jax =====================================================
 */

function Jax() {

}

Jax.scriptMap = {};
Jax.defineMap = {};
Jax.doLocalStorage = true;

Jax.to = function(_url, _data, callback, _async, _onerror) {
	var returnVal;
	if (_url && _url.url) {
		_data = _url.data;
		callback = _url.callback;
		_async = _url.async;
		_onerror = _url.onerror;
		_url = _url.url;
	}
	_async = _async == undefined ? true : _async;
	jQuery.ajax({
		type : 'post',
		url : _url,
		async : _async,
		data : _data,
		dataType : 'text',
		success : function(response, xhr) {
			if (callback) {
				returnVal = callback(response, xhr);
			} else {
				returnVal = response;
			}
		},
		error : function(xhr, errormsg, status) {
			if (_onerror) {
				if (_onerror instanceof String) {
					alert(_onerror);
				} else {
					_onerror(xhr, errormsg, status);
				}
			}
		}
	});
	return returnVal;
};

Jax.go = function(url, data, callback, async, onerror) {
	return Jax.to(CONTEXTPATH + '/' + url, data, callback, async, onerror);
};

Jax.delegate = function(url) {
	return function(data, callback, async, onerror) {
		return Jax.to(CONTEXTPATH + url, data, callback, async,onerror);
	};
};


Jax.loadScript = function(scripts, callback, async, context, jsarray, doLocalStorage){
	if (typeof async == 'undefined' || async == null){
		async = true;
	}
	if (!(scripts instanceof Array)){
		scripts = [ scripts ];
	}
	if (!jsarray){
		jsarray = [];
	}
	if (scripts.length == 0){
		if (!context){
			context = window;
		}
		for(var i = 0; i < jsarray.length; i++){
			try {
				if (navigator.userAgent.indexOf('MSIE') >= 0){
					execScript(jsarray[i]);
				} else {
					eval.call(context, jsarray[i]);
				}
			} catch (e){
				if (console){
					console.log('Load Script ' + jsarray[i].substring(0, 64) + ': ' + e);
				}
			}
		}
		if (callback){
			callback.call(context);
		}
		return 
	}
	var script = scripts.pop();
	if (!script){
		Jax.loadScript(scripts, callback, async, context, jsarray, doLocalStorage);
		return;
	}
	if (Jax.scriptMap[script]){
		jsarray.push(Jax.scriptMap[script]);
		Jax.loadScript(scripts, callback, async, context, jsarray, doLocalStorage);
		return;
	}
	if (typeof doLocalStorage == 'undefined' || doLocalStorage == null){
		doLocalStorage = true;
	}
	if (doLocalStorage && window.localStorage){
		var storage = window.localStorage.getItem('__jax_script__' + script);
		if (storage){
			jsarray.push(storage);
			Jax.scriptMap[script] = storage;
			Jax.loadScript(scripts, callback, async, context, jsarray, doLocalStorage);
			return;
		}
	}
	var url = script.indexOf('http') == 0 ? script : CONTEXTPATH + '/' + script;
	jQuery.ajax({
		url: url,
	    dataType: "text",
	    cache: true,
	    async: async,
		success : function(js){
			jsarray.push(js);
			Jax.scriptMap[script] = js;
			if (doLocalStorage && window.localStorage){
				window.localStorage.setItem('__jax_script__' + script, js);
			}
			Jax.loadScript(scripts, callback, async, context, jsarray, doLocalStorage);
		},
		error : function(){
			Jax.loadScript(scripts, callback, async, context, jsarray, doLocalStorage);
		}
	});
}; // Jax.loadScript()

Jax.loadDependency = function(dep, callback, async, context, jsarray, doLocalStorage){
	if (typeof async == 'undefined' || async == null){
		async = true;
	}
	if (!(dep instanceof Array)){
		dep = [ dep ];
	}
	if (!jsarray){
		jsarray = [];
	}
	if (dep.length == 0){
		if (!context){
			context = window;
		}
		for(var i = 0; i < jsarray.length; i++){
			try {
				if (navigator.userAgent.indexOf('MSIE') >= 0){
					execScript(jsarray[i]);
				} else {
					eval.call(context, jsarray[i]);
				}
			} catch (e){
				/*if (console){
					console.log('Load Dependency ' + jsarray[i].substring(0, 64) + ': ' + e);
				}*/
			}
		}
		if (callback){
			callback.call(context);
		}
		return;
	}
	var adep = dep.pop();
	if (!adep.src){
		Jax.loadDependency(dep, callback, async, context, jsarray, doLocalStorage);
		return;
	}
	if (Jax.scriptMap[adep.src]){
		jsarray.push(Jax.scriptMap[adep.src]);
		Jax.loadDependency(dep, callback, async, context, jsarray, doLocalStorage);
		return;
	}
	if (typeof doLocalStorage == 'undefined' || doLocalStorage == null){
		doLocalStorage = true;
	}
	if (doLocalStorage && window.localStorage){
		var storage = window.localStorage.getItem('__jax_script__' + adep.src);
		if (storage){
			jsarray.push(storage);
			Jax.scriptMap[adep.src] = storage;
			Jax.loadDependency(dep, callback, async, context, jsarray, doLocalStorage);
			return;
		}
	}
	if (typeof eval('window.' + adep.obj) == 'undefined'){
		var url = adep.src.indexOf('http') == 0 ? adep.src : CONTEXTPATH + '/' + adep.src;
		jQuery.ajax({
			url: url,
		    dataType: "text",
		    cache: true,
		    async: async,
			success : function(js){
				jsarray.push(js);
				Jax.scriptMap[adep.src] = js;
				if (doLocalStorage && window.localStorage){
					window.localStorage.setItem('__jax_script__' + adep.src, js);
				}
				Jax.loadDependency(dep, callback, async, context, jsarray, doLocalStorage);
			},
			error : function(js){
				Jax.loadDependency(dep, callback, async, context, jsarray, doLocalStorage);
			}
		});
	} else {
		Jax.loadDependency(dep, callback, async, context, jsarray, doLocalStorage);
	}
}; // Jax.loadDependency()


Jax.loadCSS = function(css, callback, params, context){
	if (!(css instanceof Array)){
		css = [ css ];
	}
	
	var appendIn;
	var appendInList = ["head", "body", "html"];
	for(var i = 0; i < appendInList.length; i++){
		var appendIn = document.getElementsByTagName(appendInList[i]);
		if (appendIn && appendIn.length > 0){
			break;
		}
	}
	
	for(var i = 0; i < css.length; i++){
		var link = document.createElement('link');
	 	link.type = 'text/css';
	    link.rel = 'stylesheet';
	    link.href = css[i].indexOf('http') == 0 ? css[i] : CONTEXTPATH + '/' + css[i];	    
	    appendIn[0].appendChild(link);

	}
	if (callback){
		return callback.call(context || window, params);
	}
}; // Jax.loadCSS()


Jax.simple_define = function(defineWrapper){
	if (defineWrapper){
		try {
			return defineWrapper();
		} catch (e){
			return defineWrapper;
		}
	}
};

/**
 * 仿 AMD require 格式的 require, 
 * require 拿到的 js 格式要以 define(function(){ 开始 並返回一个对象
 * @param requires 路徑, 可以多个
 * @param callback 回調, 第一个參數是最后一个 define, 第二个參數是所有 define, this 是指定的 context
 * @param defineArray 儲存解析后的 define 对象
 * @param async 是否異步
 * @param context 上下文 this, 供回調使用
 * @param defineFuncPrefix 用來解析 define() 的函數, 默認是 Jax.simple_define()
 * @param doLocalStorage 是否存在 html5 local storage, 还是 session storage
 */
Jax.simple_require = function(requires, callback, defineArray, async, context, defineFuncPrefix, doLocalStorage){
	
	if (!defineArray){
		defineArray = [];
	}
	if (requires.length == 0){
		if (typeof defineFuncPrefix == 'undefined' || defineFuncPrefix == null){
			defineFuncPrefix = 'Jax.simple_';
		}
		var defines = [];
		for(var i = 0; i < defineArray.length; i++){
			try {
				var obj = eval(defineFuncPrefix + defineArray[i]);
				defines.push(obj);
			} catch (e){
				console.log(e);
			}
		}
		if (callback){
			callback.call(context || window, defines[defines.length - 1], defines);
		}
		return;
	}
	var arequire = requires.pop();
	if (arequire.lastIndexOf('.js') <= 0){
		arequire = arequire + '.js';
	}
	if (Jax.defineMap[arequire]){
		defineArray.push(Jax.defineMap[arequire]);
		Jax.simple_require(requires, callback, defineArray, async, context, defineFuncPrefix, doLocalStorage);
		return;
	}
	if (typeof doLocalStorage == 'undefined' || doLocalStorage == null){
		doLocalStorage = true;
	}
	if (doLocalStorage && window.localStorage){
		var storage = window.localStorage.getItem('__jax_define__' + arequire);
		if (storage){
			defineArray.push(storage);
			Jax.defineMap[arequire] = storage;
			Jax.simple_require(requires, callback, defineArray, async, context, defineFuncPrefix, doLocalStorage);
			return;
		}
	}
	
	var url = arequire.indexOf('http') == 0 ? arequire : CONTEXTPATH + '/' + arequire;
	if (typeof async == 'undefined' || async == null){
		async = true;
	}
	jQuery.ajax({
		url: url,
	    dataType: "text",
	    cache: true,
	    async: async,
		success : function(define){
			defineArray.push(define);
			Jax.defineMap[arequire] = define; // 存在 html5 storage
			if (doLocalStorage && window.localStorage){
				window.localStorage.setItem('__jax_define__' + arequire, define);
			}
			// 下一个
			Jax.simple_require(requires, callback, defineArray, async, context, defineFuncPrefix, doLocalStorage);
		},
		error : function(js){
			Jax.simple_require(requires, callback, defineArray, async, context, defineFuncPrefix, doLocalStorage);
		}
	});
};


