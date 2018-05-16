/*====================================================================================
*
*控件名称：页面可编辑表格控件
*控件版本：1.0
*调整记录：
*
*=====================================================================================
*/
Ext.namespace("Ext.matech.grid");

var TEMP_SYSTEM_WEB_ROOT=MATECH_SYSTEM_WEB_ROOT;
var DEFAULT_GRID_URL =TEMP_SYSTEM_WEB_ROOT+ "/general.do?method=getGridJsonData";

Ext.matech.grid.EditorGridPanel = Ext.extend(Ext.grid.EditorGridPanel,{
	tableId:"",
	autoid:"",
	qryWidth:600,
	qryHeight:300,
	qryY:10,
	remoteSort:false,
	isShowBbar:true,
	isShowRefresh:true,
	isShowQuery:true,
	isShowExport:true,
	singleSelect:true,
	currentPage:1,
	pageSize:100,
	isGridsum:false,
	border:false,
    margins:'0 0 0 0',
    cmargins:'0 0 0 0',
	columnLines :true,
	clicksToEdit:1,
	stripeRows: true,
 	forceFit:false,
 	saveAll:false,
	loadMask:{msg:'数据加载中,请稍等...'},

	viewConfig:{},
	
	listeners : {
		'rowdblclick':function(grid,rowIndex,e) {
	 		if(this.ondbclick){
	 			if(typeof this.ondbclick =="function"){
		 		    this.ondbclick(grid.store.getAt(rowIndex));
		 		}
	 		}
	 	},
	 	'rowclick':function(grid,rowIndex,e) {
	 		if(this.onclick){
	 			if(typeof this.onclick =="function"){
	 		       this.onclick(grid.store.getAt(rowIndex));
	 			}
	 		}
	 	 }
	},
	//初始化页面标签
	initHideDom:function(){

		var qryhtml='<div id="customQry_'+this.tableId+'" style="display: none;"><br/>'+
			'<table class="qryTb" align="center"><tr><th width="5%"> <a href="javascript:;" onclick="matech.addQuery(\''+this.tableId+'\');"> '+
			'<img src="'+TEMP_SYSTEM_WEB_ROOT+'/img/add.gif" /></a> </th> <th width=20%>列名称</th><th width=8%>条件</th><th width=30%>值</th>'+
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
					'<input type="hidden" name="gridTableId" id="gridTableId"/>'+
					'<input type="hidden" name="gridDisplayColName" id="gridDisplayColName"/>'+
					'<input type="hidden" name="gridWidth" id="gridWidth"/>'+
					'<input type="hidden" name="gridColName" id="gridColName"/>'+
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
		
		self.initHideDom();
		
		var queryParam = self.initReferParam() ; 
		 
		//每页显示记录数
		var cp = new Ext.state.CookieProvider();
		var pageSize = cp.get('pageSize_'+self.tableId);
		if(!pageSize || pageSize < 1) {
		 		pageSize = 100;
		};
		
		
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
	    	_columns=_columns.concat([new Ext.grid.CheckboxSelectionModel({singleSelect:false})]);
	    }
 		if(self.columns){
 			_columns=_columns.concat(self.columns);
 		}
	    _colM=new Ext.grid.ColumnModel({columns:_columns});
	    
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
			_store.on('beforeload', function(store) {
				store.commitChanges();
				var qryWhere = $('#qryWhere_'+self.tableId).val();
				if((!qryWhere || qryWhere=="") && self.qryWhere){
					qryWhere=self.qryWhere;
				};
				var _start=(self.currentPage-1)*pageSize;
				//判断是否回显
				if(self.param['backQuery'] && self.gridState==0){
					pageSize = cp.get('pageSize_'+self.tableId);
					if(!pageSize || pageSize < 1) {
					 		pageSize = 100;
					};
					
					_start = cp.get('pageCurrent_'+self.tableId);
					
					if(!_start || _start < 1) {
						_start = 0;
					}else{
						_start=(_start-1)*pageSize;
					};
					if(self.param['backQuery']==1){
						self.param['backQuery']=true;
					}
				}else{
					self.param['backQuery']=false;
				}
				
				_store.baseParams={qryWhere:qryWhere,
								   start:_start,
								   limit:pageSize,
								   tableId:self.tableId,
								   autoid:self.autoid,
				            	   refer:queryParam[0],
				            	   refer1:queryParam[1],
				            	   refer2:queryParam[2]			   
				};
				if(self.param){
					for(var paramObj in self.param){
						_store.baseParams[paramObj]=self.param[paramObj];					
					}
				}
				
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
													icon:TEMP_SYSTEM_WEB_ROOT+'/img/refresh.gif',
													handler:function(){
														$("#qryWhere_"+self.tableId).val("all");
														self.goSearch();
													}
										        }]);
				};
				if(self.isShowQuery){
					_bbar_items=_bbar_items.concat(['-',{
													text:'筛选查询',
													icon:TEMP_SYSTEM_WEB_ROOT+'/img/sqlQuery.png',
													handler:function(){
														self.customQryWinFun();
													}
												}]);
				};
				if(self.isShowExport){
					_bbar_items=_bbar_items.concat(['-',{
													text:'导出EXCEL',
													icon:TEMP_SYSTEM_WEB_ROOT+'/img/excel.gif',
													handler:function(){
														matech.expExcel(self.tableId,self);
													}
												}]);
				};	
				
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
				            	matech.sendToDoubts(self.tableId,grid);			            	
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
		
		Ext.matech.grid.EditorGridPanel.superclass.initComponent.call(self); 
		
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
	//获取选择的记录ID
	getChooseId:function(){
	       var result ="";
	       var sels=this.getSelectionModel().getSelections();
	       var len = sels.length;
	       for(var i=0;i<len;i++){
	    	   if(i==0){
	    		   result=sels[i].id; 
	    	   }else{
	    		   result=result+","+sels[i].id; 
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
		            icon:MATECH_SYSTEM_WEB_ROOT+'/img/confirm.gif',
		          	handler:function() {
		          		var qryWhere =self.createQryWhere(self.tableId);
		          		if(qryWhere == false) return ;
		          		$("#qryWhere_"+self.tableId).val(qryWhere);
		          		self.goSearch();
		          		customQryWin.hide();
		          	}
		        },{
		            text:'取消',
		            icon:MATECH_SYSTEM_WEB_ROOT+'/img/close.gif',
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
			_pageSize = 100;
		};
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
	//新增空白行
	insert:function(_startEdit,_default){
		_default=_default||{};
		if(!_startEdit){
			_startEdit=0;
		}	
		var self=this;
	    var _record = self.getStore().recordType;
	    var _fields=self.fields;
	    var _rObj={};
	    
	    Ext.each(_fields,function(element){
	    	_rObj[element]="";
	    	if(_default[element]){
	    		_rObj[element]=_default[element];
	    	}
	    });
	    
	    var r = new _record(_rObj);
	    
	    self.stopEditing();
	    self.getStore().insert(0, r);
	    self.startEditing(0,_startEdit);	
  
	},
	//保存表格数据
	save:function(_excape,_opt,param){
		var params=param||{};
		
		_opt=_opt||"update";
		_excape=_excape||"";
		_excape=","+_excape+",";
		
		var self=this;
		var _url=self.saveDataUrl;
		if(!_url){
			alert("没有设置数据保存处理方法!");
			return;
		}
		
		var jsonArray = [];  
	    var store = self.getStore();  
	    var modified = store.modified.slice(0);
	    if(self.saveAll){
		    self.store.each(function(r) {
		    	jsonArray.push(r.data); 
			}, self);	    	
	    }else{
		    Ext.each(modified,function(m){  
		    	if(_excape.indexOf(","+m.id+",")<0){
		    		jsonArray.push(m.data); 	
		    	}
		    }); 	    	
	    }
	    if(jsonArray.length<1){
	    	return;
	    };
	    
	    params.gridDataJson=Ext.util.JSON.encode(jsonArray);
	    
		matech.showWaiting("100%","100%","正在保存数据,请稍后...");
		Ext.Ajax.request({
			   method:'post',
		       url:_url,   
		       params:params,   
		       success: function(resp,opts) {  
		        	matech.stopWaiting();
		            if(resp.responseText=="Y"){
		            	if(_opt=="delete"){
		            		store.commitChanges();
		            	}else{
		            		self.goSearch(params);
		            		alert("数据保存成功!");
		            	}
		            }else{
		            	alert("数据保存失败,请重新保存一次!");
		            };		                    
		        },
		        failure:function(){
		        	matech.stopWaiting();
		        	alert("无法连接到服务器,请检查网络连接是否正常!");
		        }
		});		
	},
	//删除
	remove:function(param){
		var params=param||{};
		
		var self=this;
		var _url=self.delDataUrl;
		if(!_url){
			alert("没有设置数据删除处理方法!");
			return;
		}

       var sels=self.getSelectionModel().getSelections();
       var len = sels.length;
       if(len<1){
			alert("请选择需要删除的记录!");
			return;   	   
       }
       if(!confirm("删除前将先保存先前修改的数据，是否确定继续进行?")) {
			return;
       }
	   self.save(self.getChooseId(),"delete");

		matech.showWaiting("100%","100%","正在删除数据,请稍后...");
		Ext.Ajax.request({
			   method:'post',
		       url:_url,   
		       params:{
		    	   gridDataJson:self.getSelectDataJson()
		        },   
		        success: function(resp,opts) {  
		        	matech.stopWaiting();
		            if(resp.responseText=="Y"){
		            	self.goSearch(params);
		            	alert("数据删除成功!");
		            }else{
		            	alert("数据删除失败,请重新执行删除操作!");
		            };		                    
		        },
		        failure:function(){
		        	matech.stopWaiting();
		        	alert("无法连接到服务器,请检查网络连接是否正常!");
		        }
		});		   
	}
});