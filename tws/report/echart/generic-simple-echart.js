

// 图表和表格点擊回調
function datajump(args){ 
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
	// window.location.href = url;
}; // 
/* ============================= 解析數据 ================================ */

window.__data__ = data;
if (!data.series || data.series.length == 0) {
	document.getElementById('div-msg').innerHTML = '根据查询条件, 没有查询到数据';
	throw "根据查询条件, 没有查询到数据";
}
var urlparams 	= DomUtil.init().urlParamToMap(window.location.href); // 得到 url 参数
var docsize 	= DomUtil.init().getDocumentSize(); 
var layout_param, table_position; // 页面布局, 表格位置
var adaptee, fieldcount; // adaptee 是通用的中间数据结构, 用作转为真正 echart 使用的 option
var option, chart;

adaptee = EchartAdapterItil.adapt(data).init(); // 先将项目特有的数据结构转为中间数据结构

fieldcount = adaptee.fieldname.length; // 列数

// rendertable 参数控制是否生成表格
var rendertable = '0' != urlparams['rendertable'];

if (urlparams['charttype']) {
	adaptee.type = urlparams['charttype'];
}

try {
	document.title = adaptee.title;
	if (parent.tab) {
		var tabitems = parent.tab.items.items;
		for (var i = tabitems.length - 1; i >= 1; i--) {
			if (tabitems[i].title == '报表') {
				tabitems[i].setTitle(adaptee.title);
				tabitems[i].title = adaptee.title;
				break;
			}
		}
	}
} catch (e) { }

var store_ex = null;
if (adaptee.type == 'table' || !adaptee.type) { // 若果只生成表格就如此做
	table_position = 'center'; // 表格位置为中间的 div
	layout_param = {
		center : [ 0.95, 0.95 ]
	};
	
	if (typeof before_resizeLayout == 'function'){
		try {
			before_resizeLayout.call(window, layout_param, adaptee);
		} catch (ex) { store_ex = ex; }
	}	
	DomUtil.init().resizeLayout(layout_param); // 调置页面布局大小
} else {
	option = EchartAdapter.adapt(adaptee); // 将 EchartAdaptee 转成 option	
	if (rendertable) {
		if (fieldcount <= 1) { // 列数小於等於 6 时表格放在左边
			var widthRadio = fieldcount / 15;
			table_position = 'left';
			layout_param = {
				//top : [ 0 , 0 ],
				//left : [ widthRadio - 0.025, 0.95 ],
				//center : [ 1 - widthRadio - 0.025 , 0.95 ],
				center : [ 0.95, 0.95 ]
				//right : [ 0, 0 ],
				//bottom : [ 0, 0 ]
			};
		} else { // 列数大 6 时表格放在下边
			table_position = 'bottom';
			layout_param = {
				//top : [ 0, 0 ],
				//left : [ 0, 0 ],
				center : [ 0.95, 0.675 ]
				//right : [ 0, 0 ],
				//bottom : [ 0.95, 0.275 ]
			};
		}
	} else { // 否生成表格
		layout_param = {
			//center : [ 1.5, 1.5 ]
			center : [ 0.95, 0.675 ]
		};
	}
	
	if (typeof before_resizeLayout == 'function'){
		try {
			before_resizeLayout.call(window, layout_param, adaptee, option);
		} catch (ex) { store_ex = ex; }
	}
	DomUtil.init().resizeLayout(layout_param); // 调置页面布局大小	
	
	switch(adaptee.type){	
	case 'bar':
	case 'line':
	case 'barstack':
	case 'linestack':	
		var $center = $('#center');
		var chart_height = $center.height() * 1.1;
		$center.height(chart_height);		
		if (!option.grid){
			option.grid = {};
		}
		option.grid.y2 = chart_height * 0.35;
		break;	
	}
	
	var themeRequire;
	if (window.localStorage) {
		themeRequire = window.localStorage.getItem(EchartAdapterItil.theme_storage_name);
	}
	if (!themeRequire) {
		themeRequire = 'default';
	}
	themeRequire = EchartAdapterItil.theme_path + themeRequire;
	Jax.simple_require([ themeRequire ], function(theme) {
		
		var chart_container = document.getElementById('center');
		if (typeof before_render_chart == 'function'){
			before_render_chart.call(chart_container || window, option, adaptee, theme);
		}
		
		chart = echarts.init(chart_container, theme);
		chart.setOption(option);
		
		// Echart 点擊回調
		chart.on('click', function(params){
			var colId = adaptee.yAxis[params.seriesIndex];
			var row = params.dataIndex;		
			var col, colName;
			for(var i = 0; i < adaptee.fieldid.length; i++){
				if (adaptee.fieldid[i] == colId){
					col = i;
					colName = adaptee.fieldname[i]; 
					break;
				}
			}
			var args = {
				src : this,
				event : params.event,
				params: params,
				adaptee : adaptee,
				container : chart,			
				row : row,
				col : col,
				colName : colName,
				value : params.data.value,
				rawvalue : params.data.value,
				celltype : 'data',
				seriesIndex : params.seriesIndex
			};
			datajump.call(this, args);
		});
		
		if (typeof after_render_chart == 'function'){
			after_render_chart.call(chart || chart_container, chart, option, adaptee, theme);
		}
		
	}, null, null, null, null, EchartAdapterItil.doCache);
	
	
}



/* ============================= 显示表格 ========================= */
if (rendertable) {
	var doRenderTable = true;
	try {
		if (typeof before_render_table == 'function'){
			doRenderTable = before_render_table.call(adaptee || window, adaptee, table_position); 
		}
	} catch (ex){
		store_ex = ex;
	}
	var table_container = document.getElementById(table_position); 
	if (false != doRenderTable){		
		EchartAdapterItil.renderTable(table_position, adaptee); // 生成表格
		table_container.on_cell_click = datajump;
	}
	if (typeof after_render_table == 'function'){
		after_render_table.call(table_container, table_container, adaptee);
	}
}

/* ============================= 最后回調, 可以在这里作最后改变 ========================= */

if (typeof after_render_all == 'function'){
	after_render_all.call(window, chart, option, adaptee, table_position);
}

if (store_ex){
	throw store_ex;
}
