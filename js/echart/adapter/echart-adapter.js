
function EchartAdaptee() {

} // function EchartAdaptee(d){...}

EchartAdaptee.prototype.init = function() {
	
	
	
	this.type = this.type || 'table';
	this.type = this.type.toLowerCase();

	this.title = this.title || '';
	this.subtitle = this.subtitle || '';

	this.xAxis = this.xAxis || '';
	this.yAxis = this.yAxis || [];

	this.fieldid = this.fieldid || [];
	this.fieldname = this.fieldname || [];
	this.fieldmap = this.fieldmap || {};
	this.mergerow = this.mergerow || [];
	
	

	for(var k = 0; k < this.fieldname.length; k++){
		if (this.fieldname[k].lastIndexOf('_合并') > 0){
			this.mergerow[k] = { prev : null };
			this.fieldname[k] = this.fieldname[k].substring(0, this.fieldname[k].length - 3);
		}
		this.fieldmap[this.fieldid[k]] = this.fieldname[k];
	}
	
	this.yAxisNames = [];
	for(var y = 0; y < this.yAxis.length; y++){
		this.yAxisNames.push(this.fieldmap[this.yAxis[y]]);
	}

	this.series = this.series || [];
	
	this.adapteeExpression = this.adapteeExpression || 'adaptee';

	this.statistics = this.statistics || [];
	this.links = this.links || [];

	this.titlepos = this.titlepos || {
		x : 'left',
		y : 'top'
	};

	this.calculable = this.calculable || true;

	if (this.series[0]) {
		if (typeof this.series[0].length == 'undefined') {
			this.series = [ this.series ];
		}
	}
	
	this.inited = true;
	return this;
}; // this.init = function(){...}



var EchartAdapter = {
	proto : {}
};

EchartAdapter.setRadius = function(option, radius) {
	var $s = option.series;
	for (var i = 0; i < $s.length; i++) {
		$s[i].radius = radius;
	}
}

EchartAdapter.limitFloatingPoint = function(value, limit) {
	if (!value)
		return value;
	value = value.toString();
	var dot = value.indexOf('.');
	if (dot < 0)
		return value;
	var len = value.length;
	if (!limit) {
		limit = 2;
	}
	if (value.length - dot > limit) {
		value = value.substring(0, dot + limit + 1);
	}
	return value * 1;
}

/**
 * 把中介的 js 对象变成 echart 需要的 option 对象, 
 * @param echartAdaptee 中介 js 对象
 * @param wo 額外參數对象
 */
EchartAdapter.adapt = function(echartAdaptee, wo) { 	
	var $o = {}; // option
	var $a = echartAdaptee;
	wo = wo || {};
	var docsize = DomUtil ? DomUtil.init().getDocumentSize() : { width : 750, height : 500};

	if (!$a.inited){
		$a.init();
	}
	
	$o.title = {
		text : $a.title,
		subtext : $a.subtitle
	};
	$o.title.x = $a.titlepos.x ? $a.titlepos.x : 'left';
	$o.title.y = $a.titlepos.y ? $a.titlepos.y : 'top';
	
	
	$o.legend = {
		orient : 'vertical',
		x : 'left',
		data : []
	};
	

	$o.calculable = $a.calculable;
	$o.tooltip = $a.tooltip ? $a.tooltip : EchartAdapter.proto.tooltip;
	$o.toolbox = $a.toolbox ? $a.toolbox : EchartAdapter.proto.toolbox_min;

	var $s = []; // series
	for (var i = 0; i < $a.series.length; i++) { // 1st for, series
		var xAxisData = [];
		var xAxisName = $a.xAxis;
		var xAxisAlias = $a.fieldmap[xAxisName];
		for (var y = 0; y < $a.yAxis.length; y++) { // 2nd for, yAxis array,
			
			
			var $$s; // a serie
			var yAxisName = $a.yAxis[y];
			var yAxisAlias = $a.fieldmap[yAxisName];
			var yAxisData = [];
			var ySum = 0, yMax;
			var everyYAxisIsASerie = true;
			for (var n = 0; n < $a.series[i].length; n++) {
				var row = $a.series[i][n];
				var yOne = row[yAxisName] * 1;
				if (n == 0){
					yMax = yOne;
				} else if (yOne > yMax){
					yMax = yOne;
				}
				yAxisData.push(yOne);
				ySum = ySum + yOne;
				if (y == 0) {
					xAxisData.push(row[$a.xAxis]);
				}
			}
			switch ($a.type) {
			case 'pie':
				$$s = {
					type : 'pie',
					radius : wo.radius || '65%',
					center : [ wo.centerX || '50%', wo.centerY || '60%' ],
					data : []
				};				
				for (var n = 0; n < $a.series[i].length; n++) {
					var row = $a.series[i][n];
					var value = row[yAxisName];
					
					$$s.data.push({
						name : row[$a.xAxis]+ ' (' + value + ') ('+ EchartAdapter.limitFloatingPoint(value / ySum * 100, 2) + '%)',
						value : value
					});
					
					/*
					$$s.data.push({
						name : row[$a.xAxis], value : value
					});
					*/
				}				
				$o.tooltip.formatter = wo.formatter || "{a} <br/>{b}";
				break; // pie
			case 'bar':
			case 'barstack':
				$$s = {
					type : 'bar',
					name : $a.fieldmap[yAxisName],
					data : yAxisData,
					markPoint : wo.markPoint || {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
					
				};
				if ($a.type.indexOf('stack') >= 0){
					$$s.stack = 'stack';
				}
				if ($a.fieldname.length <= 3){
					$$s.markLine = wo.markLine || {
						data : [ {
							type : 'average',
							name : '平均值'
						} ]
					};
				}
				$o.xAxis = [ {
					type : 'category',
					data : xAxisData,
					axisLabel: {
						formatter : function(val){ 
							return val.split("").join("\n");
						},
						textStyle : {
							fontSize : 7
						},
						interval : 0
					}
				} ];
				$o.yAxis = [ {
					type : 'value'					
				} ];
				$o.tooltip = {
					trigger : 'axis',
					axisPointer : { 
						type : 'shadow'
					}
				};
				$o.legend = wo.legend || {
					show : (wo.legendShow == undefined) ? true : wo.legendShow,
					data : $a.yAxisNames 
				};
				$o.toolbox.magicType = {show: true, type: ['line', 'bar']};
				break; // bar
			case 'line':
			case 'linkstack':
				$$s = {
					name : $a.fieldmap[yAxisName],
					type : 'line',
					data : yAxisData,
					smooth:true,
					markPoint : wo.markPoint || {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					}
				};
				if ($a.type.indexOf('stack') >= 0 || wo.stack){
					$$s.stack = 'stack';
				}
				if ($a.fieldname.length <= 3){
					$$s.markLine = {
						data : [ {
							type : 'average',
							name : '平均值'
						} ]
					};
				}
				$o.xAxis = [ {
					type : 'category',
					boundaryGap : false,
					data : xAxisData,
					axisLabel: {
						formatter : function(val){ 
							return val.split("").join("\n");
						},
						textStyle : {
							fontSize : 7
						},
						interval : 0
					}
				} ];
				$o.yAxis = [ {
					type : 'value'										
				} ];
				$o.tooltip = {
					trigger : 'axis'	
				};
				$o.legend = wo.legend || {
					show : (wo.legendShow == undefined) ? true : wo.legendShow,
					data : $a.yAxisNames 
				};
				$o.toolbox.magicType = {show: true, type: ['line', 'bar']};
				break; // line
			case 'scatter':
				$$s = {
				    name : xAxisAlias + ' / ' + yAxisAlias,
				    type : 'scatter',
				    data : []
				};
				for (var n = 0; n < $a.series[i].length; n++) {
					var row = $a.series[i][n];
					$$s.data.push([ row[$a.xAxis], row[$a.yAxis[y]] ]);
				}
				$o.xAxis = [ {
					type : 'value',
					scale : true,
					axisLabel : {
						formatter : '{value} ' + $a.xAxis
					}
				} ];
				$o.yAxis = [ {
					type : 'value',
					scale : true,
					axisLabel : {
						formatter : '{value} ' + $a.yAxis[y]
					}
				} ];
				var yUnit = $a.yAxis[y];
				$o.tooltip = {
			        trigger: 'axis',
			        showDelay : 0,
			        formatter : function (params) {
			            if (params.value.length > 1) {
			                return params.seriesName + ' : <br/>'
			                   + params.value[0] + $a.xAxis + ','
			                   + params.value[1] + yUnit;
			            }
			            else {
			                return params.seriesName + ' :<br/>'
			                   + params.name + ' : ' +
			                   + params.value + yUnit;
			            }
			        },  
			        axisPointer:{
			            show: true,
			            type : 'cross',
			            lineStyle: {
			                type : 'solid',
			                width : 1
			            }
			        }
			    };
				y++;
				break;
			case 'radar': // 雷达
				if (y == 0){
					$o.polar = [{
						indicator : []
					}];
					$o.tooltip = { trigger : 'axis' };
					$o.legend = wo.legend || {
						orient : 'vertical',
					    x : 'right',
					    y : 'bottom',
					    data:[]
					};
					for (var n = 0; n < $a.series[i].length; n++) {
						var row = $a.series[i][n];
						$o.polar[0].indicator.push({ text : row[$a.xAxis], max : yMax });
					}
					$$s = {
						name : xAxisAlias,
						type : 'radar',
						data : []
					};
					$o.radarMax = yMax;
				}
				if (yMax > $o.radarMax){
					$o.radarMax = yMax;
					for(var ind = 0; ind < $o.polar[0].indicator.length; ind++){
						$o.polar[0].indicator[ind].max = $o.radarMax;
					}
				}
				$o.legend.data.push($a.fieldmap[yAxisName]);
				
				$$s.name = $$s.name + yAxisName + ' . ';
				$$s.data.push({
					name : $a.fieldmap[yAxisName],
					value : yAxisData
				});
				everyYAxisIsASerie = (y == $a.yAxis.length - 1);
				break;
			case 'eventriver': // 事件河流
			case 'eventRiver':
				$$s = {
					xAxisIndex : y,
					name : xAxisAlias,
					type : 'eventRiver',
					weight : 50,
					data : []
				};
				for (var n = 0; n < $a.series[i].length; n++) {
					var row = $a.series[i][n];
					$$s.data.push({
						name : row[$a.xAxis],
						evolution : [
						    { time : row[$a.yAxis[y]], value : 3, detail : { text : "开始" }},
						    { time : row[$a.yAxis[y + 1]], value : 1, detail : { text : "结束" }}
						]
					});
				}
				$o.xAxis = [
				    {
				        type : 'time',
				        boundaryGap: [0.0,0.0]
				    }
				];
				$o.legend = wo.legend || { data:[ xAxisAlias ] };
				$o.tooltip = wo.tooltip || { trigger: 'item', enterable: true };
				y++;
				break; // eventriver
			case 'gauge': // 
				var row = $a.series[i][0];
				var name = row[$a.xAxis];
				var value = row[$a.yAxis[y]];
				var formatter = '{value}';
				if (typeof value == 'string'){
					if (value.charAt(value.length - 1) == '%'){
						value = value.substring(0, value.length - 1);
						formatter = formatter + '%';
					}
					value = value * 1;
				}
				$$s = {
					name : xAxisAlias,
					type : 'gauge',
					detail : {formatter : formatter },
					data : [{name : name, value : value }]
				};
				
				$o.tooltip = wo.tooltip || {
			        formatter: wo.formatter || "{a} <br/>{b} : {c}%"
			    };
				
				break;
			case 'wordCloud': // 字符云
			case 'wordcloud':
				$$s = {
					name : xAxisAlias + ' ' + yAxisAlias,
					type : 'wordCloud',
					size : [ '90%', '90%'],
					textRotation : [0, 10, -10, 15, -15],
					textPadding : 5,
					autSize : {
						enable : true,
						minSize : 12
					},
					data : []
				};
				for (var n = 0; n < $a.series[i].length; n++) {
					var row = $a.series[i][n];
					var randomColor 
						= 'rgb(' + [ Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160) ].join(',')  + ')' 
					$$s.data.push({
						name : row[$a.xAxis],
						value : row[$a.yAxis[y]] * 1,
						itemStyle : {
							normal : { color : randomColor }
						}
					});
				}
				$o.tooltip = wo.tooltip || {
					show : true,
					formatter: wo.formatter || "{a} <br/> {b} : {c}"
				};
				break;
			case 'force': // 力向图
				var legend = [];
				var categories = [];
				var catemap = {};
				var nodes = [];
				var links = [];
				var category_index = -1;
				for (var n = 0; n < $a.series[i].length; n++) {
					var row = $a.series[i][n];
					if (!row.type){
						continue;
					}
					switch (row.type){
					case 'c': // 力向图分类
						row.category = row.category || '未分类';
						categories.push({ name : row.category, symbol : row.symbol || 'circle' });
						if (!catemap[row.category]){
							catemap[row.category] = ++category_index;
							legend.push(row.category);
						}
						break;
					case 'n': // 力向图節点
						if (row.name){
							row.category = row.category || '未分类';
							nodes.push({ category : row.category, name : row.name, value : row.value || 10, symbol : row.symbol });
							if (!catemap[row.category]){
								catemap[row.category] = ++category_index;
								legend.push(row.category);
								categories.push({ name : row.category });
							}
						}
						break;
					case 'l': // 力向图連接線
						if (row.source && row.target){
							links.push({ source : row.source, target : row.target, weight : row.weight || 1 });
						}
						break;
					}
				}
													
				for (var n = 0; n < nodes.length; n++){
					nodes.category = catemap[nodes.category];
				}
				
				$$s = {
					type : 'force',
					categories : categories,
					nodes : nodes,
					links : links,
					name  : (wo.name || wo.title) || '',
					ribbonType: wo.ribbonType == undefined ? false : wo.ribbonType,		
					minRadius : wo.minRadius || (docsize.height * 0.055),
        			maxRadius : wo.maxRadius || (docsize.height * 0.110),
        			gravity: wo.gravity || 1.35,
        			scaling: wo.scaling || 1.35,
        			draggable: (wo.draggable == undefined) ? true : wo.draggable,
        			steps: wo.steps || 1,
        			coolDown: wo.coolDown || 0.9,
        			roam: (wo.raom == undefined) ? true : wo.roam,
        			useWorker: (wo.useWorker == undefined) ? false : wo.useWorker
				};
				
				if (wo.linkSymbol != undefined){
					option.series[0].linkSymbol = wo.linkSymbol;
				}
				
				$$s.itemStyle = wo.itemStyle || {
					normal: {
						label: {
							show: true,
				 			textStyle: {
								color: wo.labelColor || '#111'
				 			}
				 		},
				 		nodeStyle : {
							brushType : wo.brushType || 'curve',
							borderWidth : wo.borderWidth || 1
						},
						linkStyle: {
							type: wo.linkStyle || 'line'
						}
					},
					emphasis : wo.emphasis || {
						label: {
							show: false
							// 	textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
						},
						nodeStyle : {
							// r: 30
						},
						linkStyle : {}
					}
				};
				
								
				$o.tooltip = wo.tooltip || {
        			trigger: 'item',
        			formatter: wo.formatter || '{b}'
    			};
				
				$o.legend = wo.legend || {
					x : wo.legendX || 'left',
    				y : wo.legendY || 'bottom',
					data : legend
				};
				
				
				break;
			case 'venn':				
				break;
			case 'tree':
				break;
			case 'table':
				break; // table
			} // switch($a.type)
			if (everyYAxisIsASerie){
				$s.push($$s);
			}
			
		} // 2nd for, yAxis
	} // 1st for, series	
	$o.series = $s;
	$o.title = {
		text : wo.title || '',
		subtext : wo.subtitle || ''
	};
	$o.x = wo.x || 'left';
	$o.y = wo.y || 'top';
	return $o;
}; // echart_adapter.adapt = function(type)

/**
 * 樹的 adapt
 */
EchartAdapter.adapt_tree = function(json, o) {
	if (typeof json == 'string'){
		json = eval('(' + json + ')');
	}	
	// var docsize = DomUtil.init().getDocumentSize();
	var docsize = DomUtil ? DomUtil.init().getDocumentSize() : { width : 750, height : 500};
	o.rawseries = json;	
	o.orient = o.orient || 'horizontal';
	var isHorizontal = o.orient == 'horizontal';
	var defaultScale = isHorizontal ? docsize.width : docsize.height;
	if (!o.rootLocation){
		o.rootLocation = isHorizontal ? { x : '5%', y : 'center' } : { x : 'center', y : '5%'}; 
	}
	
	var option = {
		title : {
			text: o.title || '',
			subtext: o.subtitle || ''
		},
		calculable : false,
		series : [{
			name: o.name,
			type: 'tree',
		    orient: o.orient,  // vertical horizontal
		    rootLocation: o.rootLocation, // 根节点位置  {x: 100, y: 'center'}
		    roam : o.roam || true,
		    nodePadding: o.nodePadding || (defaultScale * 0.005),
	        layerPadding: o.layerPadding || (defaultScale * 0.06),
	        symbol : o.symbol || 'circle',
	        symbolSize: o.symbolSize || (defaultScale * 0.02),	        		    	   		         
		   	data: [ o.rawseries ]
		}]
	};
	
	option.series[0].itemStyle = o.itemStyle || {
		normal: {
		    label: {
		    	show: o.labelShow || true,
		    	formatter: o.labelFormatter || "{b}",
		    	position: o.labelPosition || (o.orient == 'horizontal' ? 'right' : 'bottom' )
		    },
		    lineStyle: o.lineStyle || {
		    	color: o.lineColor ||  '#cccccc',		                        
		    	type: o.lineType || 'dotted' 	// 'curve'|'broken'|'solid'|'dotted'|'dashed'
		    }
		},
		emphasis : o.emphasis || {
			label: {
				show: true
			}
		}
	};	
		                    		                  
	return option;
		
}; // EchartAdapter.adapt_tree


/* 力向图的 adapt */
EchartAdapter.adapt_force = function(json, o){
	if (typeof json == 'string'){
		json = eval('(' + json + ')');
	}
	var docsize = DomUtil ? DomUtil.init().getDocumentSize() : { width : 750, height : 500};
	var catemap = {};
	var catearr = [];
	var categories = json.categories || o.categories;
	var nodes = json.nodes || o.nodes;
	var links = json.links || o.links;
	
	
	categories = categories || [];
	nodes = nodes || [];
	links = links || [];
	
	// 若果數据沒有 categories 时, 默認用 nodes 的 category 
	if (categories.length == 0){
		catemap['未分类'] = 0; // 沒有的話歸為  0
		for(var i = 0; i < nodes.length; i++){
			if (nodes[i].category){
				if (!catemap[nodes[i].category]){
					catemap[nodes[i].category] = i + 1;
				}			
				nodes[i].category = i + 1;
			} else {
				nodes[i].category = 0;
			}		
		}
		for(var k in catemap){
			categories.push({ name : k });
			catearr.push(k);
		}	
	}
	
	for(var i = 0; i < nodes.length; i++){
		if (nodes[i].value == undefined){
			nodes[i].value = 10;
		}
	}
	
	for(var i = 0; i < links.weight; i++){
		if (links[i].weight == undefined){
			links[i].weight = 1;
		}
	}
	
	
	
	var option = {
		title : {
			text: o.title || '',
			subtext: o.subtitle || ''
		},
		x : o.x || 'left',
		y : o.y || 'top',
		tooltip : o.tooltip || {
        	trigger: 'item',
        	formatter: o.formatter || '{b}'
    	},
    	toolbox: o.toolbox || {
        	show : (o.showToolbox == undefined) ?  true : o.showToolbox,
        	feature : {
            	restore : {show: true },
            	magicType: {show: true, type: ['force', 'chord']},
            	saveAsImage : {show: true}
        	}
    	},
    	legend : o.legend || {
    		show : (o.legendShow == undefined) ? true : o.legendShow,
    		x : o.legendX || 'left',
    		y : o.legendY || 'bottom',
    		data : catearr
    	}
	}; // option	
	
	option.series = [{
		type : 'force',
		name : o.name || option.title.text,
		categories : categories,
		nodes : nodes,
		links : links,
		ribbonType: o.ribbonType == undefined ? false : o.ribbonType,		
		minRadius : o.minRadius || (docsize.height * 0.055),
        maxRadius : o.maxRadius || (docsize.height * 0.110),
        gravity: o.gravity || 1.35,
        scaling: o.scaling || 1.35,
        draggable: (o.draggable == undefined) ? true : o.draggable,
        steps: o.steps || 1,
        coolDown: o.coolDown || 0.9,
        roam: (o.raom == undefined) ? true : o.roam,
        useWorker: (o.useWorker == undefined) ? false : o.useWorker
	}]; // option.series
	
	if (o.linkSymbol != undefined){
		option.series[0].linkSymbol = o.linkSymbol;
	}
	
	option.series[0].itemStyle = o.itemStyle || {
		normal: {
			label: {
				 show: true,
				 textStyle: {
					color: o.labelColor || '#111'
				 }
			},
			nodeStyle : {
				brushType : o.brushType || 'curve',
				borderWidth : o.borderWidth || 1
			},
			linkStyle: {
				type: o.linkStyle || 'line'
			}
		},
		emphasis: o.emphasis || {
			label: {
				show: false
				// textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
			},
			nodeStyle : {
				// r: 30
			},
			linkStyle : {}
		}
	}; // option.series[0].itemStyle
	return option;	
}; // EchartAdapter.adapt_force

EchartAdapter.computeStatistic = function(type, array){
	type = type.toLowerCase();
	var result;
	switch(type){
	case 'avg':
	case 'sum':
		result = 0;
		for(var i = 0; i < array.length; i++){
			result += array[i];
		}
		if (type == 'avg'){
			result = result / array.length;
		}
		break;
	case 'max':
		result = array[0];
		for(var i = 1; i < array.length; i++){
			if (array[i] > result){
				result = array[i];
			}
		}
	case 'min':
		result = array[0];
		for(var i = 1; i < array.length; i++){
			if (array[i] < result){
				result = array[i];
			}
		}
		break;
	
	}
	return result;
}; // EchartAdapter.computeStatistic = function(type, array){ ... } 

/* ============================== proto =================================== */

EchartAdapter.proto.tooltip = {
	trigger : 'item',
	formatter : "{a} <br/>{b} : {c} ({d}%)"
},

EchartAdapter.proto.toolbox = {
	show : true,
	feature : {
		mark : {
			show : true
		},
		dataView : {
			show : true,
			readOnly : false
		},
		magicType : {
			show : true,
			type : [ 'pie', 'funnel' ],
			option : {
				funnel : {
					x : '25%',
					width : '50%',
					funnelAlign : 'left',
					max : 1548
				}
			}
		},
		restore : {
			show : true
		},
		saveAsImage : {
			show : true
		}
	}
};

EchartAdapter.proto.toolbox_min = {
		show : true,
		orient : 'vertical',
		feature : {
			mark : {
				show : true
			},
			dataView : {
				show : true,
				readOnly : false
			},
			restore : {
				show : true
			},
			saveAsImage : {
				show : true
			}
		}
	};
