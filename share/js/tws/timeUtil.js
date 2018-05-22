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
/* TimeUtil init() */
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
};
