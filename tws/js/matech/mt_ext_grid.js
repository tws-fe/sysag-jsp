/*
*
*控件名称：页面表格控件
*控件版本：1.0
*备         注：根据通用自定义标签mt:DataGridPrintByBean改版，主要是用MVC模式将页面与后台数据交换进行分隔
*调整记录：
*
*/
Ext.namespace("Ext.matech.grid");

var TEMP_SYSTEM_WEB_ROOT=MATECH_SYSTEM_WEB_ROOT;
var DEFAULT_GRID_URL =TEMP_SYSTEM_WEB_ROOT+ "/general.do?method=getGridJsonData";

//GRID自动换行
function gridPanelAutoRow(_isAutoRow){
	if(_isAutoRow){
		$(".x-grid3-cell-inner").css("white-space","normal");
		$(".x-grid3-cell-inner").css("overflow","visible");		
	}else{
		$(".x-grid3-cell-inner").css("white-space","");
		$(".x-grid3-cell-inner").css("overflow","");		
	}
}

Ext.matech.grid.GridPanel = Ext.extend(Ext.grid.GridPanel,{
	tableId:"",
	autoid:"",
	qryWidth:600,
	qryHeight:300,
	qryY:10,
	isShowBbar:true,
	isShowRefresh:true,
	isShowQuery:true,
	isShowExport:true,
	isShowClearState:false,
	isShowCalculator:false,
	singleSelect:true,
	currentPage:1,
	pageSize:50,
	isGridsum:false,
	border:false,
    margins:'0 0 0 0',
    cmargins:'0 0 0 0',
	columnLines :true,
	stripeRows: true,
 	stateful:true,
 	stateEvents:['beforedestroy','columnresize'],
 	isStateDirty:false,
 	forceFit:false,
 	autoRow:false,
	loadMask:{msg:'数据加载中,请稍等...'},
	isLocked:true,
	remoteSort:true,
	backQuery:true,
	searchParams:{},
	reSearchParams:{},
	viewConfig:{},
	
	listeners : {
		'render':function(){
			var self=this;
			
	        if(!self.isShowClearState){
		    	 return;
		    }
	        
			$(window).bind("beforeunload", function () { 
				matech.mt_grid_destory(self,self.tableId);
			});
		},
		'rowdblclick':function(grid,rowIndex,e) {
	 		if(this.ondbclick){
	 			if(typeof this.ondbclick =="function"){
		 		    this.ondbclick(grid.store.getAt(rowIndex),this);
		 		}
	 		}
	 	},
	 	'rowclick':function(grid,rowIndex,e) {
	 		if(this.onclick){
	 			if(typeof this.onclick =="function"){
	 		       this.onclick(grid.store.getAt(rowIndex),this);
	 			}
	 		}
	 	 },
	 	 'columnresize':function(grid,columnIndex,newWidth) {
	 	  		this.isStateDirty = true ;
	 	  },
	 	'sortchange':function(grid,sortInfo) {
 	  		this.isStateDirty = true ;
	 	 }
	},
	//初始化页面标签
	initHideDom:function(){

		var qryhtml='<div id="customQry_'+this.tableId+'" style="display: none;"><br/>'+
			'<table class="qryTb" align="center"><tr><th width="5%"> <a href="javascript:;" onclick="matech.addQuery(\''+this.tableId+'\');"> '+
			'<img src="'+TEMP_SYSTEM_WEB_ROOT+'/tws/css/img/add.gif" /></a> </th> <th width=20%>列名称</th><th width=8%>条件</th><th width=30%>值</th>'+
			'<th width=5%>删除</th></tr>	<tbody id="queryTBody_'+this.tableId+'"></tbody></table>'+
			'<input type="hidden" id="qryWhere_'+this.tableId+'" name="qryWhere_'+this.tableId+'" value=""></div>';
		
		var cfghtml='<div id="gridConfig_'+this.tableId+'" style="display: none;"><br/>'+
		 			'<table class="qryTb" align="center"> <tr><th width="5%">选</th><th width="20%" align="left">描述</th>	</tr>'+
		 			'<tbody><tr><td width="5%"><input type="checkbox" checked="checked" class="checkbox" id="colWidth_clear_'+this.tableId+'"></td><td width="20%">清除列宽</td></tr>'+
		 			'<tr><td width="5%"><input type="checkbox" checked="checked" class="checkbox" id="colSort_clear_'+this.tableId+'"></td><td width="20%">清除列排序</td>	</tr>'+
		 			'<tr><td width="5%"><input type="checkbox" checked="checked" class="checkbox" id="colSeq_clear_'+this.tableId+'"></td><td width="20%">清除列交换顺序</td></tr>'+
		 			'<tr><td width="5%"><input type="checkbox" checked="checked" class="checkbox" id="colHide_clear_'+this.tableId+'"></td><td width="20%">清除列隐藏</td></tr>'+
		 			'</tbody></table></div>';
		
		var exphtml='<div style="display:none"><form id="grid_'+this.tableId+'_form" name="grid_'+this.tableId+'_form" action="" method="post">'+
					'<input type="hidden" name="grid_'+this.tableId+'_TableId" id="grid_'+this.tableId+'_TableId"/>'+
					'<input type="hidden" name="grid_'+this.tableId+'_DisplayColName" id="grid_'+this.tableId+'_DisplayColName"/>'+
					'<input type="hidden" name="grid_'+this.tableId+'_Width" id="grid_'+this.tableId+'_Width"/>'+
					'<input type="hidden" name="grid_'+this.tableId+'_ColName" id="grid_'+this.tableId+'_ColName"/>'+
					'<input type="hidden" name="grid_'+this.tableId+'_Sql" id="grid_'+this.tableId+'_Sql"/>'+
					'</form><iframe name="grid_'+this.tableId+'_iframe"></iframe></div>';
		
		
  		Ext.DomHelper.append(Ext.getBody(),qryhtml+cfghtml+exphtml,true);

	},
	//获取选中的记录JSON
	getSelectDataJson:function(){
		var gridDataJson="";
	    var sels=this.getSelectionModel().getSelections();
	    var len = sels.length;
	    if(len<=0){
	    	return gridDataJson;
	    }
		//数据信息
		for(var index=0;index<len;index++){
			if(index==0){
				gridDataJson=Ext.encode(sels[index].data);
			}else{
				gridDataJson=gridDataJson+","+Ext.encode(sels[index].data);
			}
		}		
		var gridJson = "{\"results\":";
		gridJson+="["+gridDataJson+"]";
		gridJson+=",\"totalCount\":"+len+"}";
		return gridJson;
	},
	//获取列JSON信息
	getColumnsJson:function(){
		var columns = this.getColumnModel().columns;
		var columnJson="";
		//列信息
		for(var i=0;i<columns.length;i++) {
			var str="";
			if(columns[i].dataIndex){
				if(columns[i].id){
					str=str+'id:"'+columns[i].id+'",';
				}
				if(columns[i].freequery){
					str=str+'freequery:"'+columns[i].freequery+'",';
				}
				if(columns[i].header){
					str=str+'header:"'+columns[i].header+'",';
				}	
				if(columns[i].dataIndex){
					str=str+'dataIndex:"'+columns[i].dataIndex+'",';
				}	
				if(columns[i].width){
					str=str+'width:'+columns[i].width+',';
				}
				if(columns[i].align){
					str=str+'align:"'+columns[i].align+'",';
				}
				str='{'+str.substring(0, str.length-1)+'}';
			}
			
			if(columnJson==""){
				columnJson=str;
			}else{
				columnJson=columnJson+","+str;
			}			
		}
		return "["+columnJson+"]";
	},
    //初始化引用参数
    initReferParam: function () {
  	  
  	  	var param = new Array(3);
  	  	var refer = this.refer;
	  	var refer1 = this.refer1;
	  	var refer2 = this.refer2;
	  	
	  	var referObj = document.getElementById(refer) ;
	  	var refer1Obj = document.getElementById(refer1) ;
	  	var refer2Obj = document.getElementById(refer2) ;
	  	
	  	if(referObj) {
	  		param[0] = referObj.value ; 
	  	}else {
	  		param[0] = refer ; 
	  	}
	  	
	  	if(refer1Obj) {
	  		param[1] = refer1Obj.value ; 
	  	}else {
	  		param[1] = refer1 ; 
	  	}
	  	
	  	if(refer2Obj) {
	  		param[2] = refer2Obj.value ; 
	  	}else {
	  		param[2] = refer2 ; 
	  	} 
	  	
	  	return param ;
    },
	//初始化
	initComponent : function() {

		var self=this;
		
		self.tableId="tableId_"+self.getId();
		
		if(self.isShowBbar){
			self.initHideDom();
		}
		
		var queryParam = self.initReferParam() ; 
		
		//操作习惯数据
		 Ext.state.Manager.setProvider( 
			new Ext.state.HttpProvider({ 
				 tableId: self.tableId
			}) 
		);
		 
		//每页显示记录数
		var cp = new Ext.state.CookieProvider();

		var pageSize=self.pageSize;
		if(self.pageSize<1000){
			pageSize = cp.get('pageSize_'+self.tableId);
			if(!pageSize || pageSize < 1) {
			 		pageSize = 50;
			};			
		}
		if(pageSize>1000){
			pageSize=1000;
		}
		//处理列和字段
		if(self.dataHeadUrl){
			var _request="";
			if(self.param){
				for(var paramObj in self.param){
					_request="&"+paramObj+"="+self.param[paramObj];					
				}
			}
			var _result = ajaxLoadPageSynch(self.dataHeadUrl, _request);
			if(_result){
				_result=Ext.decode(_result);
				if(!self.columns){
					self.columns=_result;
				}
				if(!self.fields){
					self.fields=matech.getFieldsFromJson(_result);
				}
			}
			pageSize=self.pageSize;
		}
		
	 	//数据行
	    var _colM;
	    var _columns=[new Ext.grid.RowNumberer()];
	    if(this.singleSelect){
	    	_columns=_columns.concat([new Ext.grid.RadioboxSelectionModel({singleSelect:true})]);
	    }else{
	    	_columns=_columns.concat([new Ext.grid.CheckboxSelectionModel({
	    		singleSelect:false,
	    		listeners : {
	    			'rowselect':function(sm,row,record){
	    				if(self.checkChange){
	    					self.checkChange(record,true);
	    				}
	    			},
	    			'rowdeselect':function(sm,row,record){
	    				if(self.checkChange){
	    					self.checkChange(record,false);
	    				}
	    			}
	    		 }
	    		})]);
	    }
 		if(self.columns){
 			_columns=_columns.concat(self.columns);
 		}
 		
 		if(this.isLocked){
 			if(self.groupHead){
 				 _colM=new Ext.grid.ColumnModel({columns:_columns,defaults:{sortable:true}});
 			}else{
 	 	 		this.view=new Ext.ux.grid.LockingGridView();
 	 	 		_colM=new Ext.ux.grid.LockingColumnModel({columns:_columns,defaults:{sortable:true}}); 				
 			}
 		}else{
 		    _colM=new Ext.grid.ColumnModel({columns:_columns,defaults:{sortable:true}});
 		};
 		
	    _colM.addListener('hiddenchange',function(grid,columnIndex,hidden) {
	 	  		self.isStateDirty = true ;
	 	  }); 
	    _colM.addListener('columnmoved',function(grid,columnIndex,hidden) {
 	  		self.isStateDirty = true ;
	    }); 
	    
		self.sm=_colM.columns[1];
		self.cm=_colM;
		
		var _store;

		if(!self.store){
			if(self.recordId){
				_store=new Ext.data.JsonStore({
					autoLoad:true,
					proxy: new Ext.data.HttpProxy({
							url: self.dataUrl?self.dataUrl:DEFAULT_GRID_URL
						   }),
					root:"results",
					id:self.recordId,
					totalProperty:"totalCount",
					remoteSort:self.remoteSort,
					fields:self.fields
				});				
			}else{
				_store=new Ext.data.JsonStore({
					autoLoad:true,
					proxy: new Ext.data.HttpProxy({
							url: self.dataUrl?self.dataUrl:DEFAULT_GRID_URL
						   }),
					root:"results",
					totalProperty:"totalCount",
					remoteSort:self.remoteSort,
					fields:self.fields
				});				
			}

			self.store=_store;
			
			if(!self.param){
				self.param={};
			};
			
			_store.on('beforeload', function(inStore,inOptions) {
				var _reSearchParams={};
				var _searchParams={};
				var _params={};
				
				for(var _obj in self.reSearchParams){
					_reSearchParams[_obj]=self.reSearchParams[_obj];
				}
				for(var _obj in self.searchParams){
					_searchParams[_obj]=self.searchParams[_obj];
				}				
				for(var _obj in self.param){
					_params[_obj]=self.param[_obj];
				}
				
				
				var qryWhere = $('#qryWhere_'+self.tableId).val();

				if((!qryWhere || qryWhere=="") && self.qryWhere){
					qryWhere=self.qryWhere;
				};
				
				var _start=(self.currentPage-1)*pageSize;
				if(inOptions.params["start"]){
					_start=inOptions.params["start"];
				}
				
				//判断是否回显				
				_params['backQuery']=self.backQuery;

				var inParams={qryWhere:qryWhere,
							  start:_start,
							  limit:pageSize,
							  tableId:self.tableId,
							  autoid:self.autoid,
			            	  refer:queryParam[0],
			            	  refer1:queryParam[1],
			            	  refer2:queryParam[2]			   
				}; 
				
				for(var _obj in _searchParams){
					inOptions.params[_obj]=_searchParams[_obj];
				}				
				for(var _obj in _params){
					inOptions.params[_obj]=_params[_obj];
				}
				for(var _obj in inParams){
					inOptions.params[_obj]=inParams[_obj];
				}
				for(var _obj in _reSearchParams){
					if(_obj=="start" || _obj=="limit" || _obj=="autoid"){
						
					}else{
						inOptions.params[_obj]=_reSearchParams[_obj];
					}
				}
				
				/*
				Ext.apply(inOptions.params,self.param); 				
				Ext.apply(inOptions.params,self.reSearchParams); 
				Ext.apply(inOptions.params,inParams);
				matech.showObjectMsg(_params);
				*/
				
				self.gridState=self.gridState+1;
			}); 			
			
			
			var groupHeadObj;
			//多表头
			if(self.groupHead){
				groupHeadObj = new Ext.ux.grid.ColumnHeaderGroup({rows:self.groupHead}); 
			}
		 	if(self.isShowBbar){
		 		
				//底部工具条
				var pageSizeField = new  Ext.form.NumberField({
					fieldLabel:'每页显示:',
					width :40, 
					allowDecimals :false,
					maxValue :1000,
					maxText :'不能大于1000',
					minValue :0,
					minText :'不能小于0',
					value :pageSize,
					enableKeyEvents:true
				});	
				
				var _bbar_items=['每页显示：',pageSizeField,'条'];
				if(self.isShowRefresh){
					_bbar_items=_bbar_items.concat(['-',{
													text:'刷新',
													icon:TEMP_SYSTEM_WEB_ROOT+'/tws/css/img/refresh.gif',
													handler:function(){
										          		$("#qryWhere_"+self.tableId).val("all");
										          		self.reSearchParams["qryWhere"]="";
										          		self.goSearch(self.reSearchParams);
													}
										        }]);
				};
				if(self.isShowQuery){
					_bbar_items=_bbar_items.concat(['-',{
													text:'筛选',
													icon:TEMP_SYSTEM_WEB_ROOT+'/tws/css/img/sqlQuery.png',
													handler:function(){
														self.customQryWinFun();
													}
												}]);
				};
				if(self.isShowExport){
					_bbar_items=_bbar_items.concat(['-',{
													text:'导出',
													icon:TEMP_SYSTEM_WEB_ROOT+'/tws/css/img/excel.gif',
													handler:function(){
														matech.expExcel(self.tableId,self);
													}
												}]);
				};
				if(self.isShowClearState){
					_bbar_items=_bbar_items.concat(['-',{
													text:'清除操作习惯',
													icon:TEMP_SYSTEM_WEB_ROOT+'/tws/css/img/clear.gif',
													handler:function(){
														self.isStateDirty=false;
														self.clearConfigWin();
													}
												}]);
				};
				if(self.isShowCalculator){
					_bbar_items=_bbar_items.concat(['-',{
														text:'计算器',
														icon:TEMP_SYSTEM_WEB_ROOT+'/tws/css/img/cal.gif',
														handler:function(){
															self.createcalculater(self.tableId);
														}
													}]);			
				};
				
				_bbar_items=_bbar_items.concat(['-',{
					text:'自动换行',
					icon:TEMP_SYSTEM_WEB_ROOT+'/tws/css/img/gridAutoRow.png',
					handler:function(){
						if(self.getColumnModel().isLocked(0)){
							if(self.getColumnModel().getLockedCount()==2){
								self.getColumnModel().setLocked(1,false);
								self.getColumnModel().setLocked(0,false);
							}else{
								alert("请先解除固定列!");
								return;								
							}
						}
						if(this.autoRow){
							this.autoRow=false;
							gridPanelAutoRow(this.autoRow);
							
						}else{
							this.autoRow=true;
							gridPanelAutoRow(this.autoRow);
						}
					}
				}]);		
				
				var _bbar = new Ext.PagingToolbar({
					pageSize : pageSize,
					id:"pagingToolbar_"+self.tableId,
					border:false,
					width:Ext.getBody().getWidth(),
					store : _store,
					displayInfo : true,
					items :_bbar_items ,
					displayMsg : '第 {0} 条到 {1} 条，共 {2} 条',
					emptyMsg : "没有记录"
				});
				
				pageSizeField.on('keydown', function(field,e) {
					if(e.getKey()==13) {
						
						var _pageSize = parseInt(field.getValue());
						
						if(_pageSize > 1000 || _pageSize < 0 ){ 
							return false;
						}
						pageSize = _pageSize;
						_bbar.pageSize = _pageSize;
						_bbar.doRefresh();
						
						_store.reload({ 
								params : {
									start : 0,
									limit : _bbar.pageSize 
								} 
							});
						
						cp.set('pageSize_'+self.tableId,_pageSize);	
						
						
					}
				});	
				//隐藏刷新按钮
				_bbar.get(10).hide();
				//记录当前页面
				_bbar.on('change',function(pageBar){
					if(self.gridState>0){
						cp.set('pageCurrent_'+self.tableId,self.getCurrentPage());
					}
				}); 

				self.bbar=_bbar;		 		
		 		
		 	}
		 	
		 	//合并插件
		 	if(!self.plugins){
		 		self.plugins=[]; 
		 	}
		 	if(self.groupHead){
		 		self.plugins=self.plugins.concat([groupHeadObj]); 
		 	}

		 	//gridState用于标示grid是否已经初始化
		 	self.gridState=0;
		 	
		 	if(self.ctxmenu){
		 		self.on("rowcontextmenu",function(grid,rowIndex,e){
		            e.preventDefault();
		            if(rowIndex<0){return;}
		            
			 		for(var ctxObj in self.ctxmenu){
			 			if(ctxObj=="doubts"){
				            var gridMenu = new Ext.menu.Menu([{text:"发送到疑点库",iconCls: "btn_add",pressed:true, handler:function(){
				            	matech.sendToDoubts(self.getColumnsJson(),self.getSelectDataJson(),parent);			            	
				            }}]);
				            gridMenu.showAt(e.getPoint());		 				
			 			}
			 		}   
		 		}); 
		 	}			
	
		}
		
		if(self.autoExpandColumn){
			
			if(self.viewConfig){
				self.viewConfig.forceFit=true;
			}else{
				self.viewConfig={forceFit:true};
			}	
		}

		self.applyState=function(state) {
	 		self.initApplyState(self,state);    
	 	},
	 	
		Ext.matech.grid.GridPanel.superclass.initComponent.call(self); 
	},
	//获取选择的值
	chooseValue:function(index){
	       var result ="";
	       var sels=this.getSelectionModel().getSelections();
	       var len = sels.length;
	       for(var i=0;i<len;i++){
	    	   if(i==0){
	    		   result=sels[i].get(index); 
	    	   }else{
	    		   result=result+","+sels[i].get(index); 
	    	   }	    	   
	       }
	       return result;
	},
	//获取当前页面
	getCurrentPage:function(){
		  var  _bbar=this.getBottomToolbar();
		  var _currentPage=_bbar.get(4).getValue();
		  return _currentPage;
	},
	//改变页码
	changeCurrenPage:function(curPage){
		  //取得当前页面
		  var _currentPage=this.getCurrentPage();
		  curPage=parseInt(curPage);
		  if(curPage==_currentPage){
			  return;
		  }
		  this.getBottomToolbar().changePage(curPage); 
	},
	//应用操作习惯
	initApplyState:function(grid,state) {
	      if(!this.isShowClearState){
	    	 return;
	      }
		  var cm = grid.colModel ;
		  
		  var colHide = state.colHide ;
		  var colSeq = state.colSeq ;
		  var colSort = state.colSort ;
		  var colWidth = state.colWidth ;
		  
		  var store = grid.getStore();
		  
		  //设置列隐藏
		  if(colHide){
			  colHide = Ext.decode(colHide) ;
			  for(var i in colHide) {
				  var column = cm.getColumnById(i);
				  if(column) {
					  var colIndex = cm.getIndexById(i) ;
					  cm.setHidden(colIndex,colHide[i]);
				  }
			  }
		  }
		  
		  //设置列宽度
		  if(colWidth){
			  colWidth = Ext.decode(colWidth) ;
			  for(var j in colWidth) {
				  var column = cm.getColumnById(j);
				  if(column) {
					  var colIndex = cm.getIndexById(j) ;
					  cm.setColumnWidth(colIndex,colWidth[j]);
				  }
			  }
		  }
		  
		  //设置列顺序
		  if(colSeq){
			  colSeq = Ext.decode(colSeq) ;
			  for(var k in colSeq) {
				  var column = cm.getColumnById(k);
				  if(column) {
					  var colIndex = cm.getIndexById(k) ;
					  if(colIndex != colSeq[k]){
			              cm.moveColumn(colIndex,colSeq[k]);
			          }
				  }
			  }
		  }
		  
		  //设置排序
		  if(store && colSort){
			  colSort = Ext.decode(colSort) ;
	          for(var z in colSort) {
	 			  var column = cm.getColumnById(z);
	 			  if(column) {
	 				 store.setDefaultSort(z,colSort[z]);
	 			  }
	 		  }
	       }
		
	},
	//清除操作习惯
	clearConfigWin:function() {
		var self=this;

		var gridConfigWin = this["gridConfigWin_"+self.tableId] ;
		$("#gridConfig_"+self.tableId).css("display","");

		if(gridConfigWin == null) { 
			gridConfigWin = new Ext.Window({
				title: '清除操作习惯',
				width: 420,
				height:280,
				contentEl:'gridConfig_'+self.tableId, 
		        closeAction:'hide',
		        autoScroll:true,
		        modal:true,
		        listeners:{
					'hide':{fn: function () {
						 $("#gridConfig_"+self.tableId).css("display","none");
					}}
				},
		        layout:'fit',
			    buttons:[{
		            text:'确定',
		            icon:TEMP_SYSTEM_WEB_ROOT+'/tws/css/img/confirm.gif',
		          	handler:function() {
		          		self.clearGridConfig() ;
		          		gridConfigWin.hide();
		          	}
		        },{
		            text:'取消',
		            icon:TEMP_SYSTEM_WEB_ROOT+'/tws/css/img/close.gif',
		            handler:function(){
		            	gridConfigWin.hide();
		            }
		        }]
		    }); 
			this["gridConfigWin_"+self.tableId] = gridConfigWin ;
		}
		
		gridConfigWin.show();
	},
	clearGridConfig:function(){
		var self=this;
		
		var colWidth = $("#colWidth_clear_"+self.tableId).attr("checked") ;
		var colSort = $("#colSort_clear_"+self.tableId).attr("checked") ;
		var colSeq = $("#colSeq_clear_"+self.tableId).attr("checked") ;
		var colHide = $("#colHide_clear_"+self.tableId).attr("checked") ;		
		
		
		if(!colWidth && !colSort && !colSeq && !colHide) {
			alert("请选择要清除的类型！") ;
		}
		
		var request = "&tableId="+self.tableId ;
		
		if(colWidth) {
			request += "&colWidth=true" ;
		}
		
		if(colSort) {
			request += "&colSort=true" ;
		}
		
		if(colSeq) {
			request += "&colSeq=true" ;
		}
		
		if(colHide) {
			request += "&colHide=true" ;
		}
		
		
		var url = MATECH_SYSTEM_WEB_ROOT+"/general.do?method=clearGridConfig" ;
		var text = ajaxLoadPageSynch(url,request) ;
		if(text == "ok") {
			if(confirm("清除成功,是否需要刷新表格?")){
				window.location.reload();
			}
		}else {
			alert("后台发生异常,清除失败！");
		}
	},
	//自定义查询窗口
	customQryWinFun:function(){
		var self=this;

		var _width=self.qryWidth;
		var _height=self.qryHeight;
		var _Y=self.qryY;
		var customQryWin = this["customQryWin_"+self.tableId] ;
		$("#customQry_"+self.tableId).css("display","");

		if(customQryWin == null) { 
			customQryWin = new Ext.Window({
				title: '自定义查询条件',
				width: _width,
				height:_height,
				y:_Y,
				contentEl:'customQry_'+self.tableId, 
		        closeAction:'hide',
		        autoScroll:true,
		        modal:true,
		        listeners:{
					'hide':{fn: function () {
						 $("#customQry_"+tableId).css("display","none");
					}}
				},
		        layout:'fit',
			    buttons:[{
		            text:'确定',
		            icon:TEMP_SYSTEM_WEB_ROOT+'/tws/css/img/confirm.gif',
		          	handler:function() {
		          		var qryWhere =self.createQryWhere(self.tableId);
		          		if(qryWhere == false) return ;
		          		$("#qryWhere_"+self.tableId).val(qryWhere);

		          		self.reSearchParams["qryWhere"]=qryWhere;
		          		self.goSearch(self.reSearchParams);
		          		
		          		customQryWin.hide();
		          	}
		        },{
		            text:'取消',
		            icon:TEMP_SYSTEM_WEB_ROOT+'/tws/css/img/close.gif',
		            handler:function(){
		            	customQryWin.hide();
		            }
		        }]
		    }); 
			this["customQryWin_"+self.tableId] = customQryWin ;
			
			var qryWhere = $("#qryWhere_"+self.tableId).val() ;
			if(qryWhere != "") {
				var qryWhereArr = qryWhere.split("and") ; 
				for(var i=0;i<qryWhereArr.length;i++){
					if(qryWhereArr[i] != "") {
						var qryOrArr = qryWhereArr[i].split("or") ;
						for(var j=0;j<qryOrArr.length;j++){
							var trimqryOrArr = qryOrArr[j].replace(new RegExp(" ","gm"),""); 
							if(qryOrArr[j] != "" && trimqryOrArr != "") {
								matech.addQuery(self.tableId,false,qryOrArr[j]);
							}
							
						}
					}
				}
			}else {
				matech.addQuery(self.tableId,true);
			}
			
		}
		
		customQryWin.show();

	},
	//生成查询条件语句
	createQryWhere:function(tableId) {
		var query_logic = document.getElementsByName("query_logic_"+tableId) ;
		var query_column = document.getElementsByName("query_column_"+tableId) ;
		var query_operator = document.getElementsByName("query_operator_"+tableId) ;
		var query_condition = document.getElementsByName("query_condition_"+tableId) ;
		
		var qryWhere = "" ;
		for(var i=0;i<query_logic.length;i++) {
			var logic = query_logic[i].value ;
			var column = query_column[i].value ;
			var operator = query_operator[i].value ;
			var condition = query_condition[i].value ;
			
			if(column == "") {
				alert("请选择列名,列名不得为空!") ;
				return false ;
			}
			
			if(operator.indexOf("like") > -1) {
				if(condition != "") {
					condition = "'%" + condition + "%'" ;
				}
			}else {
				condition = "'" + condition + "'" ;
			}
			qryWhere += " " + logic + " " + column + " " + operator + " " + condition ;
		}
		return qryWhere ; 
	},
	//查询
	goSearch:function (param,recodeId){ 
		
		
		var params=param||{};

		
		var self=this;
		var _store=self.getStore();
		var cp = new Ext.state.CookieProvider();
		var _pageSize = cp.get('pageSize_'+self.tableId);

		if(!_pageSize || _pageSize < 1) {
			_pageSize = 50;
		};
		
		self.reSearchParams=params;
		
		params["start"]=0;
		params["limit"]=_pageSize;

		_store.reload({ 
				params :params,
				callback:function(){
					if(self.reloadCallBack){
						self.reloadCallBack();
					}else{
						self.setSelectById(recodeId);
					};
				}
		});	 

	},
	setSelectById:function(recodeId){
		var self=this;
		var index=self.getStore().indexOfId(recodeId);
		var model =self.getSelectionModel();
		model.selectRow(index);		
	},
	createcalculater:function() {
		var calWin= new Ext.Window({
		     title: '计算器',
		     width: 400,
		     height:100,
		     closeAction:'hide',
		     listeners   : {
		        	'hide':{fn: function () {
						calWin.hide();	         	
		        	}}
		     },
		     layout:'fit',
			 html:'<input type="<input type="text" size="120" id="sText" onpropertychange="matech.calculateValue()" value="" /> = <input type="text" size="30" id="sValue" value="" />'
			  		+'<button onclick="matech.calculatorReset(\''+self.tableId+'\')" >重置</button>'
		    });
	 	calWin.show();
	 },
	 savePoint:function(){
		var sel=this;
		 
		var gridSqlJson=sel.getStore().reader.jsonData;
		var _gridSql="";
		if(gridSqlJson && gridSqlJson["gridSql"]){
			_gridSql=Ext.util.JSON.encode(gridSqlJson["gridSql"][0]);
		}
		if (_gridSql==""){
		   return;	
		}
		
		$.ajax({
			type :"Post",
			async:true,
			url : MATECH_SYSTEM_WEB_ROOT+"/general.do?method=gridSavePoint",
			data:{gridSql:_gridSql},
			success : function(data) {
				strResult=unescape(data);
			}
		});	
		
	 }
});