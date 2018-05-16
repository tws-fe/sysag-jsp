/**
 * 將數据庫查出的二維 json 及图表描述轉換成一个 EchartAdaptee 对象
 * EchartAdaptee 对象会再被轉化為 echart 需要的 option 对象, 最后生成 echart
 * 依頼 itil/util.js 中的 Common.init() 对象
 */ 
var EchartAdapterItil = {
	datasrc :  (window.CONTEXTPATH || '') + 'echart.do?method=generic_echart_json',
	theme_storage_name : '$$ECHART_THEME',
	theme_path : 'js/echart/theme/',
	theme_cache : true,
	charts : {
		
	},
	getChart : function (chartId){
		return EchartAdapterItil.charts[chartId];
	},
	refresh : function(doRefresh, interval){
		for(var id in this.charts){
			this.charts[id].refresh(doRefresh, interval);
		}
	}
};

//分析表头
function dynamicHead(fields){
	var obj = [];
	var rowspan = 1;
	for(var i=0;i<fields.length;i++){		
		var fds = fields[i].split(".");
		if(fds.length > rowspan) rowspan = fds.length;
		for(var j = 0;j<fds.length;j++){
			var b = true;
			//先比较是否已存在
			for(var k=0;k<obj.length;k++){
				if(obj[k]["fieldname"] == fds[j]){
					b = false; //不新增
					obj[k]["colspan"] = obj[k]["colspan"] + 1;
					break;
				}
			}
			if(b){
				var o = {};
				o["fieldname"] = fds[j];
				o["rowindex"] = j;
				o["rowspan"] = 1;
				o["colspan"] = 1;
				o["flag"] = fds.length;
				obj.push(o);				
			}
		}
	}
	
	var oo = [];
	for(var i=0;i<obj.length;i++){
		obj[i]["rowspan"] = rowspan - obj[i]["flag"] + 1;
	}
	
	for(var k=0,h=0;h<rowspan;h++){
		for(var i=0;i<obj.length;i++){
			if(h == obj[i]["rowindex"]){
				oo[k++] = obj[i];
			}
		}
	}
	
	return oo;
}

EchartAdapterItil.renderTable = function(container, adaptee, tableclass) {
	if (typeof container == 'string') {
		container = document.getElementById(container);
	}
	if (!tableclass) {
		tableclass = 'echart-table';
	}
	var html = '';
	var $a = adaptee;
	if (!$a.inited){
		$a.init();
	}
	
	html += '<div class="' + tableclass + '-header">' + (adaptee.header || '') +'</div>';
	
	for (var i = 0; i < $a.series.length; i++) {
		var $s = $a.series[i];
		var coldata = new Array($a.fieldid.length);
		html += '<table class="' + tableclass + '" align="center">';
		// header
		/*
		html += '<tr>';
		for (var h = 0; h < $a.fieldname.length; h++) {
			html += '<th celltype="header" row="-1" col="' + h + '" colName="' + $a.fieldname[h] + '">' + $a.fieldname[h] + '</th>';
		}
		html += '</tr>';
		*/
		//复杂表头=XXX,合并列.XXX,合并列.XXX....
		var o = dynamicHead($a.fieldname);
		var rowindex = -1;
		html += '<tr>';
		for (var h = 0; h < o.length; h++) {
			if(rowindex != o[h]["rowindex"]){
				rowindex = o[h]["rowindex"]
				html += '</tr><tr>';
			}			
			html += '<th celltype="header" rowspan="'+o[h]["rowspan"]+'" colspan="' + o[h]["colspan"] + '" colName="' + o[h]["fieldname"] + '">' + o[h]["fieldname"] + '</th>';
		}
		html += '</tr>';
		
		// body
		
		for (var n = 0; n < $s.length; n++) {
			html += '<tr>';
			for (var k = 0; k < $a.fieldid.length; k++) {
				var value = $s[n][$a.fieldid[k]];
				var $value = value;
				var tdstyle = '';
				//如果value是数字就右对齐
				if(!isNaN(value.replace('%','')))
					tdstyle+='text-align:right;' ;
				if ($a.mergerow[k]){
					tdstyle += 'border-bottom: none; border-right: 1px dotted rgb(196,196,196);';
					if ($a.mergerow[k].prev == value){
						$value = '&nbsp';
					} else if (n > 0){
						tdstyle += 'border-top: 1px dotted rgb(196,196,196);';
					}
					$a.mergerow[k].prev = value;
				}
				html += '<td celltype="data" row="' + n + '" col="' + k + '" seriesIndex="' + i + '" value="' + $value + '" rawvalue="' + value + '" colName="' + $a.fieldname[k] + '" style="' + tdstyle + '">';
				if ($a.links[k]){
					//var onclick = $a.echart_table_onclick + '(' +  i + ',' + n + ',' + k + ',\'' + $a.adapteeExpression + '\')'; 	
					html += '<a class="e-l-portal" >' + $value + '</a></td>';
				} else {
					html += $value + '</td>';
				}
				if ($a.statistics[k]){
					if (!coldata[k]){
						coldata[k] = [];
					}
					coldata[k].push($value * 1);
				}
			}
			html += '</tr>';
		}
		// statistics
		if ($a.statistics.length > 0 && $s.length > 0){
			html += '<tr>';
			for (var s = 0; s < $a.statistics.length; s++) {
				var statistic_result = '&nbsp;';
				var tdpro = '' ;
				//如果value是数字就文字左对齐
				if(!isNaN(value.replace('%','')))
					tdpro='style="text-align:right"' ;
				if ($a.statistics[s]) {
					statistic_result = EchartAdapter.computeStatistic($a.statistics[s], coldata[s]);
					try {
						statistic_result = statistic_result ? EchartAdapter.limitFloatingPoint(statistic_result, 2) : '0';
					} catch (e){
						statistic_result = $a.statistics[s];
					}
					if($a.statistics[s]=="合计"){statistic_result= $a.statistics[s];}
				} 
				html += '<td celltype="statistic" col="" colName="" class="echart-statistic" '+tdpro+' >' + statistic_result + '</td>';
			}
			html += '</tr>';
		}
		html += '<tr><td celltype="rowcount" class="echart-table-row-count" style="border-top: 1px dotted rgb(64, 128, 192); border-bottom: 0px;" colspan="' + $a.fieldid.length + '"> 共计 ' + $s.length + ' 行数据</td><tr>';
		html += '</table>';
	}
	html += '<table class="' + tableclass + '-footer">' + (adaptee.footer || '') + '</div>';
	container.innerHTML = html;
	try {
		var $container = jQuery(container);
		var cells = $container.find('td').add('th');
		cells.on('click', function(event){ // 為格子加上点擊事件
			event.stopPropagation(); // 停事件冒泡
			var callback = container.on_cell_click;
			if (typeof callback == 'undefined' || typeof callback != 'function'){
				return;
			}
			var args = {
				src : this, // td, th 格子 dom 对象
				event : event,
				adaptee : adaptee,				
				container : container,				
				row : this.getAttribute('row') * 1,
				col : this.getAttribute('col') * 1,
				colName : this.getAttribute('colName'),
				value : this.getAttribute('value'),
				rawvalue : this.getAttribute('rawvalue'),
				celltype : this.getAttribute('celltype'),
				seriesIndex : this.getAttribute('seriesIndex') * 1 // 通常都是  0, 多只有一个 series
			};
			callback.call(this, args);
		});
	} catch (e){
		console.log(e);
	}
	return container;
}; // EchartAdapterItil.renderTable = function(container, option){...}

function EchartItilWrappedOption(o){
	for(var k in o){
		this[k] = o[k];
	}
	delete(o);
}

EchartItilWrappedOption.prototype.refresh = function(doRefresh, interval){
	if (interval){
		this.refreshInterval = interval;
	}
	if (typeof doRefresh == 'undefined'){
		doRefresh = true;
	} else {
		this.doRefresh = (doRefresh == true) ? '1' : '0';
	}
	if (this.refreshTimer){
		clearTimeout(this.refreshTimer);
	}
	if (doRefresh){
		EchartAdapterItil.renderTo(this.renderTo);
	}
	return this;
}

EchartAdapterItil.transParam = function(data){
	var common = Common.init();
	for(var k in data){
		var v = data[k];
		data[k] = common.parseToken('{{', '}}', v, null, {
			'0' : function(v){
				return v;
			},
			'input' : function(v){
				var dom = document.getElementById(v);
				return dom ? dom.value : '';
			}
		});
	}
	return data;
};


EchartAdapterItil.adapt = function(data){
	if (data.exception && typeof data.exception == 'string'){
		throw data.exception;		
	}
	
	var $a = new EchartAdaptee();
	
	$a.title = data.title;
	
	var typeElements  = data.iconterms.split('|');
	if (typeElements.length > 1){
		$a.type = typeElements[0].toLowerCase();
		$a.xAxis = typeElements[1];
		$a.yAxis = typeElements[2].split(',');
	} else {
		$a.type = 'table';
	}
	
	
	
	$a.fieldid = data.fieldid.split(',');
	$a.fieldname = data.fieldname.split(',');
	
	$a.statistics = data.sumterm ? data.sumterm.split('|') : [];
	$a.links = data.fielduri ? data.fielduri.split('|') : [];
	
	
	$a.series = data.series;
	return $a;
};

EchartAdapterItil.default_on_cell_click = function(args){
	if (args.celltype != 'data'){
		return;
	}
	var adaptee = args.adaptee; // 原始 SQL 報表數据
	var row = args.row;
	var col = args.col;
	var seriesIndex = args.seriesIndex;
	var directive = adaptee.links[col]
	if (typeof directive == 'undefined'){
		return;
	}
	
	var urlparams = DomUtil.init().urlParamToMap(window.location.href);
	var params = DomUtil.init().urlParamToMap(directive);
	
	var url = null;
	var qIndex = directive.indexOf('://');
	if (qIndex > 0){
		url = directive;
	}
	qIndex = directive.indexOf('?');		
	if (qIndex >= 0){
		url = directive.substring(0, qIndex + 1);			
		url += '__=__';
	} else {
		if (url == null){
			url = adaptee.linkurl || 'echart.do?method=generic_echart';
		} else {
			url += '?__=__'
		}
	}
	
	
	
	for(var key in params){
		if (!key) continue;
		var value = params[key];
		value = Common.init().parseToken('${', '}', value, {
			'0' : adaptee.series[seriesIndex][row],
			'param' : urlparams
		});
		if (encodeURIComponent){
			value = encodeURIComponent(encodeURIComponent(value));
		} else {
			value = encodeURI(encodeURI(value));
		}
		url += '&' + key + '=' + value;
	} 
	
	var title = params['__title__']; // 标題轉換
	if (typeof title == 'undefined' || title == ''){
		title = '报表';
	} else {
		title = Common.init().parseToken('${', '}', title, {
			'0' : adaptee.series[seriesIndex][row],
			'param' : urlparams
		});	
	}
	
	try {
		var MainIndex = DomUtil.init().getParentObj('MainIndex'); // 找到首頁对象
		var tab = MainIndex.tab;
		var n = tab.add({    
			title : title,    
			closable : true,      
			html:'<iframe name="iframe-sub-report" scrolling="no" frameborder="0" width="100%" height="100%" src="' + url + '"></iframe>'   
		}); 
		tab.setActiveTab(n);
		return;
	} catch (e){
		window.open(url);
	}
}; // 

/**
 * 取數据
 * @param data 參數
 * @param callback 回調
 * @param async 是否同步
 * @param context 上下文, 即 this 对象
 */
EchartAdapterItil.getData = function(data, callback, async, context, o){
	if (typeof async == 'undefined'){
		async = true;
	}
	var datasrc = o.datasrc || EchartAdapterItil.datasrc;
	data = data || o.data;
	if (o && o.charttype){
		data.charttype = o.charttype;
	}
	var rdata;
	switch (typeof datasrc){
	case 'string':
		jQuery.ajax({
			url  : datasrc,
			type : 'POST',
			dataType : 'text',
			data : data,
			async : async,
			success : function(r){
				r = eval('(' + r + ')'); // 最好改用 js 解析 json 框架, 防換行等特殊符号
				rdata = r;
				if (callback){
					callback.call(context, r, o);
				}
			},
			error : function(r){
				throw String.toString(r);
			}
		});
		break;
	case 'function':
		rdata = r = datasrc.call(context || this, o.data, o);
		if (typeof r == 'string'){
			r = eval('(' + r + ')');
			rdata = r;			
		}
		if (callback){
			callback.call(context, r, o);
		}
		break;
	case 'object':
		rdata = r = datasrc;
		if (callback){
			callback.call(context, r, o);
		}
		break;
	}
		
	return rdata;
}; // EchartAdapterItil.getRawData()

/**
 * 取 echart 需要的 option, 其中会調用 EchartAdapterItil.getData()
 * @param data 參數
 * @param callback 回調
 * @param async 是否同步
 * @param context 上下文, 即 this 对象
 * @param datasrc 数据源 url
 * @param json2obj   : AJAX json 变成 js object
 * @param obj2option : js object 变成 echart option
 */
EchartAdapterItil.getOption = function(data, callback, async, context, o){
	var option;
	EchartAdapterItil.getData(data, function(result){
		if (typeof data.exception != 'undefined'){
			throw "[echart] exception : " + data.exception;
		}
		/*
		Jax.loadDependency([
		    { obj : 'EchartAdapter', src : '/js/echart/adapter/echart-adapter.js'}
		], function(){
		*/
			var adaptee;
			// json 对象轉成中介的自定義 js object, 要一個 js object 是作一個中介 adapter 的作用
			if (o.json2obj && typeof(o.json2obj) == 'function'){
				adaptee = o.json2obj(result, o.charttype);
			} else {				
				switch(o.charttype){				
				default:
					adaptee = EchartAdapterItil.adapt(result, o.charttype, o);
					break;
				case 'tree':
					adaptee = result;
					break;
				case 'force':
					if (o.datasrc){						
						adaptee = result;
					} else {
						adaptee = EchartAdapterItil.adapt(result, o.charttype, o);
					}					
					break;
				}							
			}
			if (o.charttype){
				adaptee.type = o.charttype;
			} else if (data.charttype){
				adaptee.type = data.charttype.toLowerCase();
			}
			// js object 再轉成 option
			var option;
			if (o.obj2option && typeof(o.obj2option) == 'function'){
				o.obj2option(adaptee, o.charttype);
			} else {
				switch(adaptee.type){
				case 'table':
					option = adaptee.init();
					break;
				case 'tree':
					option = EchartAdapter.adapt_tree(adaptee, o);
					break;
				case 'force':
					if (o.datasrc){
						option = EchartAdapter.adapt_force(adaptee, o);
					} else {
						option = EchartAdapter.adapt(adaptee, o);		
					}					
					break;
				default:
					option = EchartAdapter.adapt(adaptee, o);	
					break;
				}
			}			
			if (option){
				option.adaptee = adaptee;
				option.rawseries = adaptee.series; 
			} else {
				option = adaptee;
			}			
			if (callback){
				var callback_ret = callback.call(context, option, o);
				if (callback_ret){
					option = callback_ret;
				}
			}
		/*
		}, async, context);
		*/		
	}, async, context, o);
	return option;
}; // EchartAdapterItil.getOption()


EchartAdapterItil.attrlist = 
	[ 
	 	'reportid', 'birtname',
	 	'charttype', 'stack',
	 	'data', 'urlparam',
	 	'timetoken', 'usertoken',
	 	'themeSrc', 'themeName',
	 	'title', 'subtitle', 'showTitle', 'showToolbox', 'showAnimation', 'forceInit',
	 	'doRefresh', 'refreshInterval',
	 	'render', 'beforeRender', 'afterRender', 'context'
	];

EchartAdapterItil.eventlist = 
	[ 
	  	'render', 'beforeRender', 'afterRender', 'context'
	];

/**
 * 
 */
EchartAdapterItil.domToAdapterOption = function(id){
	var e = document.getElementById(id); // class 要固定用 echart-container-simple
	if (!e){
		return;
	}
	var o = new EchartItilWrappedOption();
	
	o.renderTo = id; // 要畫图上去的元素 id
	o.window = window;	
	for(var i = 0; i < EchartAdapterItil.attrlist.length; i++){
		var attr = EchartAdapterItil.attrlist[i];
		o[attr] = e.getAttribute(attr) || e[attr];
	}
	 
	if (o.data && (typeof o.data == 'string')){
		o.data = eval('(' + o.data + ')');
	}
	for(var i = 0; i < EchartAdapterItil.eventlist.length; i++){
		var evt = EchartAdapterItil.eventlist[i];
		if (o[evt] && (typeof o[evt] == 'string')){
			o[evt] = eval('window.' + o[evt]);
		}
	}
	return o;
}; // EchartAdapterItil.domToAdapterOption(id);

EchartAdapterItil.renderToDom = function(id, doRefresh){
	var o = EchartAdapterItil.domToAdapterOption(id);
	if (typeof refresh != 'undefined'){
		o.doRefresh = (doRefresh == true) ? '1' : '0';
	}
	EchartAdapterItil.renderTo(o);
}; // EchartAdapterItil.renderToDom(id); 

EchartAdapterItil.renderToDoms = function(param){
	if (!param){
		param = { };
	} 
	if (!param.selector){
		param.selector = '.echart-container-simple';
	}
	if (typeof param.doRefresh == 'undefined'){
		param.doRefresh = true;
	}
	if (param.beforeRender){
		param.beforeRender();
	}
	var $dom = jQuery(param.selector);
	for(var i = 0; i < $dom.length; i++){
		EchartAdapterItil.renderToDom($dom[i].id, param.doRefresh);
	}
	if (param.afterRender){
		param.afterRender();
	}
	delete param;
	return EchartAdapterItil;
};

EchartAdapterItil.renderTo = function(o){
	if (typeof o == 'string'){
		o = EchartAdapterItil.charts[o];
	}
	if (!o || (!o.target && !o.renderTo)){
		throw "[echart] no target to be render to";
	}
	if (!(o instanceof EchartItilWrappedOption)){
		o = new EchartItilWrappedOption(o);
	}
	if (!o.target){
		o.target = document.getElementById(o.renderTo);
		if (!o.target){
			throw "[echart] invalid target to be rendered to";
		}
	}
	
	o.data = o.data || {};
	if (o.urlparam){
		var urlparammap = Common.init().stringToMap(o.urlparam);
		Common.init().concatMap(urlparammap, o.data, true);
	}
	o.data = EchartAdapterItil.transParam(o.data);
	
	if (o.reportid){ o.data.reportid = o.reportid; }
	if (o.birtname){ o.data.birtname = o.birtname; }	
	if (o.timetoken){ o.data.timetoken = o.timetoken; }
	if (o.usertoken){ o.data.usertoken = o.usertoken; }
	if (o.charttype){ o.data.charttype = o.charttype; }
	if (!o.context){
		o.context = window;
	}
	if (!o.window) {
		o.window = window;
	}
	if (o.refreshInterval){
		o.refreshInterval = o.refreshInterval * 1.0;
	}
	if (typeof o.doRefresh == 'undefined'){
		o.doRefresh = '1';
	}
	if (!o.theme){
		if (!o.themeSrc){
			o.themeSrc = 'itil.js';
		}
		if (o.themeSrc.charAt(0) != '/'){
			o.themeSrc = '/js/echart/theme/' + o.themeSrc;
		}
		if (!o.themeName){
			o.themeName = 'theme_itil';
		}
	}
	if (!o.themeRequire){
		if (window.localStorage){
			var echart_theme = window.localStorage.getItem(EchartAdapterItil.theme_storage_name)
			if (!echart_theme){
				echart_theme = 'default';
			}
			o.themeRequire = EchartAdapterItil.theme_path + echart_theme;
		}
	}
	EchartAdapterItil.getOption(o.data, function(option){
		if (!o.theme){
			o.theme = eval('window.' + o.themeName);
		}
		
		if (o.window.echarts){
			EchartAdapterItil.render(option, o);
		} else {
			Jax.loadCSS('/css/echart/echart.css'); // 加載 css
			Jax.loadDependency([  { // 加載依頼 js
				obj : 'echarts',
				src : '/js/echart/echarts-all.js?version=20160416'
			}, {
				obj : o.themeName,
				src : o.themeSrc
			} ], function(){
				EchartAdapterItil.render(option, o);
			});
		}
		if ('1' == o.doRefresh && o.refreshInterval && o.refreshInterval > 0.5){
			if (typeof o.animation == 'undefined'){
				option.animation = false;
			}
			if (o.refreshTimer){ // 定时刷新數据的 timer标的
				clearTimeout(o.refreshTimer);
			}
			o.refreshTimer = setTimeout(function(){
				EchartAdapterItil.renderTo(o);
			}, o.refreshInterval * 1000)
		}
		EchartAdapterItil.charts[o.renderTo || o.target.id] = o;
	}, true, o.window, o);
}; // EchartAdapterItil.renderTo() 


EchartAdapterItil.render = function(option, o){
	
	if (o.showToolbox == '0' && option.toolbox){ // 工具欄
		option.toolbox.show = false;
	}
	if (option.title){ // 标題
		if (o.showTitle == '0'){
			option.title.show = false;
		} else {
			option.title.text = typeof o.title == 'undefined' ? option.title.text : o.title;
			option.title.subtext = typeof o.subtitle == 'undefined' ? option.title.subtext : o.subtitle;
		}
	}
	
	if (o.showAnimation == '0'){ // 是否有动畫
		option.animation = false;
	}
	
	if (o.stack){ // bar 和  line 有 stack 选項 
		for(var s = 0; s < option.series.length; s++){
			option.series[s].stack = o.stack;
		}
	}
	if (o.radius){ // radius 是圓形类图用, 半徑大小
		for(var i = 0; i < option.series.length; i++){
			if (option.series.type == 'pie'){
				option.series[i].radius = o.radius;
			}
		}
	}
	if (o.dataZoom){ // echart 的时間拉伸條
		if (o.dataZoom == '1'){
			option.dataZoom = {
		        show : true,
		        realtime : true,
		        start : 0,
		        end : 100
		    };
		} else {
			option.dataZoom = o.dataZoom;
		}
	}
	
	if (o.beforeRender) { // 渲染前事件
		/*
		 * option : echart 所需的 option 对象
		 * o : 封裝的  option 对象
		 * o.instance : 即是 chart 对象, 一般情況在 beforeRender 中應該為空
		 */
		o.beforeRender.call(o.context || option, option, o, o.instance); 
	}
	if (!o.render){
		switch(o.charttype){
		case 'table':
			EchartAdapterItil.renderTable(o.target, option);
			break;
		default:
			if (!o.chart || o.forceInit == '1'){
				if (o.themeRequire){
					Jax.simple_require([ o.themeRequire ], function(theme){
						o.theme = theme || o.theme;
						o.instance = o.chart = o.window.echarts.init(o.target, o.theme);
						o.instance.setOption(option);
						if (o.setOptionTo){
							o.instance.setOption(o.setOptionTo);
						}
					}, null, null, o.context, null, EchartAdapterItil.doCache);
				} else {
					o.instance = o.chart = o.window.echarts.init(o.target, o.theme);
					o.instance.setOption(option);
					if (o.setOptionTo){
						o.instance.setOption(o.setOptionTo);
					}
				}
			} else {
				o.instance.setSeries(option.series); // 只更新數据
			}
			break;
		}
	} else { // 自定義渲染
		o.render.call(o.context || option, option, o,  o.instance);
	}
	if (o.event){ // 掛鈎事件, 事件由 echart 中的 config.js EVENT 对象定義, 如 click, mouseout 等
		for (eventname in o.event){
			try {
				o.instance.on(eventname, function(params){ // params 是 echart 的事件參數, 詳細參考 echart 文档
					o.event[eventname].call(o.context || o.instance, params, option, o, o.instance); 
				});
			} catch (e){
				console.log(e);
			}
		}
	}
	if (o.afterRender) { // 渲染后事件
		/*
		 * option : echart 所需的 option 对象
		 * o : 封裝的  option 对象
		 * o.instance : 即是 chart 对象, 一般情況在 beforeRender 中應該為空
		 */
		o.afterRender.call(o.context || o.instance, option, o, o.instance);
	}
};


 