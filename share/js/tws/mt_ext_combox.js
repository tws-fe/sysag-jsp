/*
*
*控件名称：通用下拉选择框
*控件版本：2.0
*调整记录：
*1.删除已经注释的代码
*2.grid初始时方法this.beforeBlur增加是否多选判断，解决多选时无法回选问题
*3.删除initEvents方法，限制的下拉时键盘上下移动
*4.删除了grid初始化中的局部变量clickRecord
*5.增加参数leafonly，用来控制下拉多选树是返回值是否只包含叶子节点
*6.树级联选择改用new Ext.plugin.tree.TreeNodeChecked插件,同时删除tree.on('checkchange')方法，存在不能够自动展开选择节点的所有下级节点问题
*7.增加方法initHideDom，初始化时根据hiddenId判断该input页面标签是否存在，不存在的则自动创建一个隐藏域
*8.方法girdMultiSelect增加在单击按钮全部选中时，如果数据列表没有选中则清空
*9.Grid增加new Ext.grid.RowNumberer()序号列
*10.Grid增加属性gridFieldIndex，在grid初始化时进行列名和宽度的初始化
*11.grid调整选择框列宽为8
*
*历史版本：
*/

Ext.namespace("Ext.matech.form");  

var TEMP_SYSTEM_WEB_ROOT = MATECH_SYSTEM_WEB_ROOT;
var DEFAULT_REFRESHURL = TEMP_SYSTEM_WEB_ROOT + "/general.do?method=combox";
Ext.Ajax.timeout = 90000;  

Ext.matech.form.mtCombox = Ext.extend(Ext.form.ComboBox, {
		triggerAction : 'all',
		displayField : 'text',
		valueField : 'value',
		loadingText : '正在加载数据...',
		listEmptyText:'没有找到记录',
		emptyText:'请选择或输入...',
		lazyInit: true,// 控件获得焦点时才会初始化下拉框包括树
		typeAhead : false,
		resizable : true,
		checkField:'checked',
		queryParam : 'pk1',
		separator:',',
		anchor : '100%',
		minChars:1,  //输入几个字符开始搜索 
		selectOnFocus:true,
		editable:true,
		minListWidth:200, 
		comlisttree:null,	
		defaultExpLevel:2,
		hasAutoExp:false,
		tempCheckValue:'',
		
		listeners : {
			'change':function(){
				if(this.onchange){ 
	                	this.onchange.call(this.getValue()) ;
				}   
			},
			'collapse':function(){
				this.hasAutoExp=false;
			},
		    'beforequery':function(e){ 

		        var combo = e.combo; 
		        
		        var refer = combo.refer ;
			  	var refer1 = combo.refer1 ;
			  	var refer2 = combo.refer2 ;
			  	
			  	var referObj = document.getElementById(refer);
			  	var refer1Obj = document.getElementById(refer1);
			  	var refer2Obj = document.getElementById(refer2);
			  			  				  				  
			  	var referValue = "";
			  	var refer1Value = "";
			  	var refer2Value = "";
			  	
			  	if(referObj) {
			  		referValue = referObj.value ; 
			  	}else {
			  		referValue = refer ; 
			  	}
			  	
			  	if(refer1Obj) {
			  		refer1Value = refer1Obj.value ; 
			  	}else {
			  		refer1Value = refer1 ; 
			  	}
			  	
			  	if(refer2Obj) {
			  		refer2Value = refer2Obj.value ; 
			  	}else {
			  		refer2Value = refer2 ; 
			  	}
			  	
			  	if(refer && !referValue ) {
			  		var obj=Ext.getCmp(refer);
			  		if(obj){
			  			alert("请先录入或选择【" + (obj.title ? obj.title : referObj.id) + "】");
			  		}else{
			  			alert("请先录入或选择【" + (referObj.title ? referObj.title : referObj.id) + "】");
			  		}
			  		return false ;
			  	}
			  	
			  	if(refer1 && !refer1Value) {
			  		var objFirst=Ext.getCmp(refer1);
			  		if(objFirst){
			  			alert("请先录入或选择【" + (objFirst.title ? objFirst.title : refer1Obj.id) + "】");
			  		}else{
			  			alert("请先录入或选择【" + (refer1Obj.title ? refer1Obj.title : refer1Obj.id) + "】");
			  		}
			  		return false ;
			  	}
			  	
			  	if(refer2 && !refer2Value) {
			  		var objTwo=Ext.getCmp(refer2);
			  		if(objTwo){
			  			alert("请先录入或选择【" + (objTwo.title ? objTwo.title : refer2Obj.id) + "】");
			  		}else{
			  			alert("请先录入或选择【" + (refer2Obj.title ? refer2Obj.title : refer2Obj.id) + "】");

			  		}
			  		return false ;
			  	}
			 
			  	combo.store.baseParams["refer"] = referValue;
			  	combo.store.baseParams["refer1"] = refer1Value;
			  	combo.store.baseParams["refer2"] = refer2Value;
			  	
		        var input = e.query;
		        if(combo.grid) {
		        	//过滤表格
		        	var grid = Ext.getCmp("mt_combox_grid_"+ combo.id + "_" +combo.autoid) ;
		        	if(!grid) return ;
		        	var start = combo.multiselect ? '' : 0 ;
		        	var limit = combo.multiselect ? '' : 50 ;
		        	grid.store.load({
						params:{grid:this.grid,autoid:this.autoid,start:start,limit:limit,pk1:input}
					});
		        	
		        	combo.expand(); 
		        	return false ; 
		        }else if(combo.multilevel) {
		        	//树状下拉,要使用树的过滤
		        	combo.filter.filter(input);
		        	combo.expand();
					return false; 
		        }else {
		             if(this.mode == 'local'){
	                    combo.selectedIndex = -1;
	                    if(e.forceAll){
	                        combo.store.clearFilter();
	                    }else{
	                        combo.store.filter(this.displayField, input);
	                    }
	                    combo.onLoad();
	                }else{
	                    combo.store.baseParams[this.queryParam] = input;
	                    combo.store.load({
	                    	params: this.getParams(input),
	                        callback :function (r,options,success){
	                        	if(combo.store.getTotalCount()<=50) {
	                        		//记录不足两页就不显示分页了
	                        	
	                        		if(combo.pageSize && combo.footer){
	                        			combo.footer.hide() ;
		                        		combo.restrictHeight();
	                                }
	                        	}else {
	                        		
	                        		if(combo.pageSize && combo.footer){
	                        			combo.footer.show() ;
		                        		combo.restrictHeight();
	                                }
	                        		
	                        	}
	                        	
	                        	if(combo.multiselect) {
	                        		var value = combo.separator+Ext.get(combo.hiddenId).dom.value+combo.separator;
	                        		combo.store.each(function(r) {
	                        			if(value.indexOf(combo.separator+r.data["value"]+combo.separator) > -1) {
	                        				r.set(combo.checkField, true);
	                        			}
	                        		}, combo);
	                        	}else{
	                        		var value = combo.separator+Ext.get(combo.hiddenId).dom.value+combo.separator;
	                        		combo.store.each(function(r) {
	                        			if(value.indexOf(combo.separator+r.data["value"]+combo.separator) > -1) {
	                        				combo.selectByValue(Ext.get(combo.hiddenId).dom.value,true);
	                        			}
	                        		}, combo);	                        		
	                        	}
	                        }
	                    });
	                    combo.expand();
	                } 
		            return false;     
	        	}
		    }
		},   
	  
	  // EXT的下面这个方法可能有bug 所有重写了
	  onViewClick : function(doFocus) {  
	        var index = this.view.getSelectedIndexes()[0], s = this.store, r = s.getAt(index);   
	        if (r) {   
	          this.onSelect(r, index);   
	        } else if (s.getCount() === 0) {   
	          this.collapse();   
	        }   
	        if (doFocus !== false) {   
	          this.el.focus();   
	        }
      },
      
      onLoad : function(){
 
          if(!this.hasFocus){
              return;
          }
          if(this.store.getCount() > 0 || this.listEmptyText){
              this.expand();
              this.restrictHeight();
              if(this.lastQuery == this.allQuery){
                  if(this.editable){
                      this.el.dom.select();
                  }

                  if(this.autoSelect !== false && !this.selectByValue(this.value, true)){
                      this.select(0, true);
                  }
              }else{
                  if(this.autoSelect !== false){
                      this.selectNext();
                  }
                  if(this.typeAhead && this.lastKey != Ext.EventObject.BACKSPACE && this.lastKey != Ext.EventObject.DELETE){
                      this.taTask.delay(this.typeAheadDelay);
                  }
              }
          }else{
              //this.collapse();
          }          
      },
      //自动创建页面标记元素，用来记录相关值
      initHideDom:function(){
  	  	var hideValue=this.value;
	  	var hideObj=document.getElementById(this.hiddenId);
	  	
	  	if(!hideObj){
	  		Ext.DomHelper.append(Ext.getBody(),'<input type="hidden" name="'+this.hiddenId+'" id="'+this.hiddenId+'" value="'+hideValue+'"/>',true);
	  	}
	  	
	  	if(this.multiselect){
	  		if(!Ext.isBoolean(this.multiselect)){
	  			if(this.multiselect=="false"){
	  				this.multiselect=false;
	  			}else{
	  				this.multiselect=true;
	  			}
	  		}
	  	};
		
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
	  getCheckedDisplay:function() {   
	        var re = new RegExp(this.separator, "g");   
	        return this.getCheckedValue(this.displayField).replace(re, this.separator + ' ');   
	  },  
	  getCheckedValue:function(field) {   
	        field = field || this.valueField;   
	        var c = [];   
	        var snapshot = this.store.snapshot || this.store.data;   
	  
	        snapshot.each(function(r) {   
	            if(r.get(this.checkField)) {   
	                c.push(r.get(field));   
	            }   
	        }, this);   
	  
	        return c.join(this.separator);   
	  },
	  //初始化时回显
	  setRealValue:function(value,callback){

			var queryParam = new Array(3) ;
			var hideObj=document.getElementById(this.hiddenId);
			var referObj = document.getElementById(this.refer) ;
		  	var refer1Obj = document.getElementById(this.refer1) ;
		  	var refer2Obj = document.getElementById(this.refer2) ;

		  	if(value){
			  	if(value==""){
				  	if(hideObj){
				  		value=hideObj.value;
				  	}		  		
			  	}			  		
		  	}else{
			  	if(hideObj){
			  		value=hideObj.value;
			  	}		  			  		
		  	}
		  	
		  	if(referObj) {
		  		queryParam[0] = referObj.value ;
		  	}else {
		  		queryParam[0] = this.refer ;
		  	}
		  	
		  	if(refer1Obj) {
		  		queryParam[1] = refer1Obj.value ;
		  	}else {
		  		queryParam[1] = this.refer1 ;
		  	}
		  	
		  	if(refer2Obj) {
		  		queryParam[2] = refer2Obj.value ;
		  	}else {
		  		queryParam[2] = this.refer2 ;
		  	}
		  	
			if(this.hiddenId) {
            	Ext.get(this.hiddenId).dom.value =  value; 
            }
			
			var tempValue = "" ; //传到后台文本框的值
			if(this.multiselect && !this.grid) {
				 //多选时,处理字符串，让后台可以用in拼出sql
				 var reg3=new RegExp(this.separator,"g");    //替换英文,为','
				 tempValue = (value+"").replace(reg3,"','");
				
			 }else {
				 tempValue = value ;
			 }
			
			var combox = this ;
			
			if(value && value != "") {
				
				if(value=="root"){
					combox.setValue("根节点") ;
					if(combox.hiddenId) {
		            	Ext.get(combox.hiddenId).dom.value =  value; 
		            }
					combox.setRawValue(rawValue); 
					combox.startRawValue = rawValue ;					
				}
				
				if(this.rawValue){
					combox.setValue(value) ;
					if(combox.hiddenId) {
		            	Ext.get(combox.hiddenId).dom.value =  value; 
		            }
					combox.setRawValue(rawValue); 
					combox.startRawValue = rawValue ;					
				}else{
					Ext.Ajax.request({
						method: 'POST',
						url: DEFAULT_REFRESHURL,
						success: function(response) {
							var reslutJson = response.responseText ;
	
							if(reslutJson.indexOf("ERROR|") > -1) {
								alert("下拉初始化错误,原因："+reslutJson.replace("ERROR|")) ;
								return ;
							}

							if(!combox.multiselect || combox.grid) {
								//单选
								if(reslutJson != "") {
									
									var jsonArr = Ext.util.JSON.decode(reslutJson) ;
									if(combox.grid) {
										jsonArr = jsonArr.data ;
									}
									if(jsonArr){
										var i = 0 ;
										var rsValue = "" ;
										var rsText = "" ; 
										
										jsonArr = jsonArr[0] ; 
										for(var j in jsonArr) {
											
											if(i == 0) {
												rsValue = jsonArr[j] ;
											} 
											  
											if(i == 1) {
												rsText = jsonArr[j] ; 
												break ;
											}
											i++ ;
										}
										
										if(rsValue == value && rsText!= value) {
											combox.setValue(value);
											combox.setRawValue(rsText); 
											combox.startRawValue = rsText ;
										}else{
											if(rsValue!=""){
												combox.setValue(rsValue);
												combox.setRawValue(rsText); 
												combox.startRawValue = rsText ;
											}else{
												if(combox.editable){
													combox.setValue(value);
													combox.setRawValue(value); 
													combox.startRawValue = value ;		
												}											
											}
										}
										
									}
								}
							}else {
								//多选
								if(reslutJson != "") {
									//遍历，拼,号分隔字符串
									var jsonArr = eval(reslutJson) ;
									var text = "" ;
									for(var i=0;i<jsonArr.length;i++) {
										if(jsonArr[i]){
											var rsText = jsonArr[i].text ;
											text += rsText + combox.separator ;
										}
									}
									
									if(text != "") {
										text = text.substring(0,text.length - 1) ;
										combox.setValue(value);
										combox.setRawValue(text); 
										combox.startRawValue = text ;	
									}
								}
							}	
							
							if(callback){
								callback.call(this,combox) ;
							}
							
			 			},
						failure: function() {
			 				alert("后台发生异常,下拉初始化失败!");
			 			},
			 			params: {
			 				autoid:combox.autoid,
		            		multilevel:combox.multilevel,
		            		multiselect:combox.multiselect,
			 				grid:combox.grid,
			 				checkmode:true,
			 				pk1:tempValue,
			 				refer:queryParam[0],
			 				refer1:queryParam[1],
			 				refer2:queryParam[2]
			 			}
					});
				}
			}
	  },
	  initGridColumn:function(columns){
		 try{
			 var decCols=[];
		     if('string'==typeof this.gridFieldIndex) {     
		         decCols=Ext.util.JSON.decode(this.gridFieldIndex);   
		     }
		     if(Ext.isArray(this.gridFieldIndex)){
		    	 decCols=this.gridFieldIndex;
		     }
		     if(decCols){
		    	 for(var index=0;index<columns.length;index++){
		    		 Ext.each(decCols,function(decCol){
		    			 if(columns[index]['id'].toUpperCase()==decCol['index'].toUpperCase()){
		    				 if(decCol['text']){
		    					 columns[index]['header']=decCol['text']; 
		    				 }
			    			 if(decCol['width']){
			    				 columns[index].width=parseInt(decCol['width']);
			    			 }	
		    				 if(decCol['hidden']){
		    					 columns[index]['hidden']=decCol['hidden']; 
		    				 }
		    				 if(decCol['hideable']){
		    					 columns[index]['hideable']=decCol['hideable']; 
		    				 }
		    			 }
		    		 });
		    	 };
		     }
		 }catch(err){
			alert('无法初始化下拉框【'+this.id+'】数据显示列！'); 
		 }
		 return columns;
	  },
	  //初始化GRID
	  initGridPanel:function(_queryParam){
		  	var queryParam=_queryParam;
		  	var url = DEFAULT_REFRESHURL;	
		  	var comboObj = this ;		  
		  
	  		this.store = new Ext.data.SimpleStore({
				fields : [],
				data : [[]]
		 	}) ;
		 	
		 	this.mode = 'local' ;
		 	this.resizable = false ;  
	  		this.tpl = "<tpl for='.'><div style='height:300px' id='grid"+this.id+"'></div></tpl>" ;
	  		
	  		var gridPanel=null;
	  		var jsonStore=null;

	  		var value = "" ;
			var text = "" ;  
			
			
			var start = this.multiselect ? '' : 0 ;
			var limit = this.multiselect ? '' : 50 ;
	  		
	  		Ext.Ajax.request({
					method: 'POST',
					url: url,
					success: function(response) {
						
						if(response.responseText.indexOf("ERROR") > -1) {
							alert(response.responseText.replace("ERROR",""));
							return ;
						}
						var obj = Ext.util.JSON.decode(response.responseText);
						
						var columns = eval(obj[0].columns) ;
						var fields = eval(obj[0].fields) ;
						
						Ext.util.JSON.encode(comboObj.initGridColumn(columns));
						
						if(comboObj.multiselect) {
							
							var chooseArr = [new Ext.grid.RowNumberer(),{id:'choose',header:'<input style="text-align:left" type="checkbox" onclick="mt_select_selectAll(\'' + comboObj.autoid + '\',\'' + comboObj.id + '\',this)" />',
											width:8,menuDisabled:true,sortable:false,dataIndex:columns[0].dataIndex,renderer:function(v,params,record,rowIndex){
								var group = record.data.hidden_select_group ||  record.data.select_group; //是否同组，同组时可以一起选中
								var groupStr = "" ;
								if(group) groupStr = " group="+group ;
								return '<input type=checkbox '+groupStr+' onclick=mt_select_groupSelect(\'' + comboObj.autoid + '\',\'' + comboObj.id + '\',this) value="'+v+'" name="mt_gridMultiSelect_' + comboObj.id + "_" + comboObj.autoid + '" rowIndex="' + rowIndex + '">' ;
							}}] ;
							columns = chooseArr.concat(columns);
						}else{
							columns=[new Ext.grid.RowNumberer()].concat(columns);
						}   
						if(fields.length > 0) {
							value = fields[0].name ;
							text = fields[1].name ;
						}
						
						jsonStore = new Ext.data.JsonStore({ 
							fields: fields,
					 		url: url,
							root: 'data',
							totalProperty:'totalProperty',
							remoteSort:false 
						});
						
						jsonStore.on('beforeload', function(store) {
							queryParam = comboObj.initReferParam();
							jsonStore.baseParams={grid:comboObj.grid,autoid:comboObj.autoid,refer:queryParam[0],refer1:queryParam[1],refer2:queryParam[2]};
						}); 
						
						var bbar = null ;
						if(!comboObj.multiselect) {
							bbar = new Ext.PagingToolbar({
								store:jsonStore,
								pageSize: 50,  
								emptyMsg: "没有记录"
						  	}) ;
						}
						
						gridPanel = new Ext.grid.GridPanel({
							frame:true,  
							id:"mt_combox_grid_"+ comboObj.id + "_" +comboObj.autoid,
							store:jsonStore,
							columns:columns,
							sm :new Ext.grid.RowSelectionModel({singleSelect:true}),
							bbar:bbar
						}) ;
						
						gridPanel.on('rowclick', function(grid, rowIndex, e) {
							
							if(!comboObj.multiselect) {
								
								comboObj.collapse();
								
								var selections = grid.getSelectionModel().getSelections();
						       	for (var i = 0; i < selections.length; i++) {
						            var record = selections[i];
						            
						            comboObj.value = record.get(value);  
					                comboObj.setRawValue(record.get(text)); 
					                
					                var columns = "" ; 
					                if(fields.length > 0) {
					                	columns += "{" ;
										for(var j=0;j<fields.length;j++) {
											columns += "'" + fields[j].name + "':" ;
											columns += "'" + record.get(fields[j].name).replace(new RegExp("'","gm"),"\\\'") + "'," ;
										}  
										columns = columns.substring(0, columns.length -1) ;
										columns += "}" ; 
									}
					                if(columns !="") {
					                	 Ext.get(comboObj.hiddenId).dom.columns = columns ;
					                	 Ext.get(comboObj.el.dom.id).dom.columns = columns ;  
					                }
					                
					                if(comboObj.hiddenId) {
					                	Ext.get(comboObj.hiddenId).dom.value = comboObj.value; 
					                }					 
	
					                if(comboObj.onselect)   
					                	comboObj.onselect.call(Ext.get(comboObj.el.dom.id).dom,columns) ;
					                
						       	}
						       	
							}
					    });
						if(columns.length < 5) {
							gridPanel.getView().forceFit = true ;
						}
						comboObj.gridPanel = gridPanel ;
		 			},
					failure: function() {
		 				alert("后台获取数据失败");
		 			},
		 			params: {grid:this.grid,autoid:this.autoid,head:true,start:start,limit:limit,refer:queryParam[0],refer1:queryParam[1],refer2:queryParam[2]}
	 		});
	 		
	 		this.on('expand', function() {
	 	         if(this.onexpand){
	 	        	 return;
	 	         }
	 			this.innerList.dom.style.overflowY="hidden";
	 			gridPanel.render('grid'+this.id); 
	 			gridPanel.store.load({
					params:{grid:this.grid,autoid:this.autoid,start:start,limit:limit},
					callback:function (){
						//勾选多选框 
			 			if(comboObj.value) {
			 				var valueArr = comboObj.value.split(",") ;
			 				var checkbox = document.getElementsByName("mt_gridMultiSelect_" + comboObj.id + "_" +comboObj.autoid) ;
			 				for(var k=0;k<checkbox.length;k++) {
			 					for(var y=0;y<valueArr.length;y++) {
			 						if(checkbox[k].value == valueArr[y]) {
			 							checkbox[k].checked = true ;
			 						}
			 					}
			 				}
			 			}
					}
				});
	 			
	 			this.restrictHeight();
	 			gridPanel.setWidth(this.listWidth*1);               
	 			gridPanel.setHeight(this.innerList.getHeight()*1) ;
	 			
			}); 
			
	 		
			this.onRealBlur = function() {   
				
				if(!this.multiselect) {
					this.list.hide();  
					if(!this.value && this.getRawValue()) {
						 this.value = this.getRawValue();   
		                 if(this.hiddenId) {
		                 	Ext.get(this.hiddenId).dom.value =  this.getRawValue(); 
		                 }
					 }
				}
		    } ;
		    
		    this.findRecord = function(prop, value){
		        var record=null;
		        if(!jsonStore) return ;
		        if(jsonStore.getCount() > 0){
		        	jsonStore.each(function(r){
		                if(r.data[prop] == value){
		                    record = r;
		                    return false;
		                }
		            });
		        }
		        return record;
		    } ;
		    
		    this.beforeBlur = function (){
		    	if(this.readOnly) return ;
		    	if(!this.multiselect) {
		            var val = this.getRawValue();
		            var rec=null;

		            if(this.valueField && Ext.isDefined(this.value)){
		                rec = this.findRecord(value, this.value);
		            }
		            if(!rec || rec.get(text) != val){
		                rec = this.findRecord(text, val);
		            }
		            
		            if(!rec && this.forceSelection){
		                if(val.length > 0 && val != this.emptyText){
		                    this.el.dom.value = Ext.value(this.lastSelectionText, '');
		                    this.applyEmptyText();
		                }else{
		                    this.clearValue();
		                }
		            }else{
		                if(rec && value){
		                    if (this.value == val){
		                        return;
		                    }
		                    val = rec.get(value || text);
		                }
		                this.value = val;
		                if(this.hiddenId) {
		                 	Ext.get(this.hiddenId).dom.value = val; 
		                 }
		            }		    		
		    	}	
		    } ;
		    
		    this.on({   
	             scope:this  
	            ,blur:this.onRealBlur
	        });
			
		    this.girdMultiSelect = function (combo) {
		    	
		    	var choose = document.getElementsByName("mt_gridMultiSelect_"+ this.id + "_" +this.autoid) ;
		    	
		    	var grid = Ext.getCmp("mt_combox_grid_"+ comboObj.id + "_" +comboObj.autoid) ;
		    	if(!grid) return ;
    			var store = grid.store ;
    			
    			var fields = store.fields ;
    			
    			var json = "" ;
    			var columns = "" ; 
    			var value = "" ;
    			var text = "" ;
		    	for(var i=0;i<choose.length;i++) {
		    		
		    		if(choose[i].checked) {
		    			var rowIndex = choose[i].rowIndex ;
		    			var record = store.getAt(rowIndex) ;
		                 if(fields.length > 0) {
		                	columns += "{" ; ;
		                	fields.each(function(field,index){
		                		columns += "'" + field.name + "':" ;
								columns += "'" + record.get(field.name).replace(new RegExp("'","gm"),"\\\'") + "'," ;
								
								if(index == 0) {
									value += record.get(field.name) + "," ;
								}else if(index == 1) {
									text += record.get(field.name) + "," ;
								}
		                	})  ;
							columns = columns.substring(0, columns.length -1) ;
							columns += "}," ; 
						}
		    		}
		    	}
		    	
		    	if(columns !="") {
		    		columns = columns.substring(0, columns.length -1) ;
		    		value = value.substring(0, value.length -1) ;
		    		text = text.substring(0, text.length -1) ;
		    		comboObj.value = value;  
	                comboObj.setRawValue(text); 
	                if(comboObj.hiddenId) {
	                	Ext.get(comboObj.hiddenId).dom.value = value; 
	                }
		    		
		    		json += "[" + columns + "]" ;
               	 	Ext.get(comboObj.hiddenId).dom.columns = json ;
               	 	Ext.get(comboObj.el.dom.id).dom.columns = json ;  
                }else{
		    		comboObj.value = value;  
	                comboObj.setRawValue(text); 
	                if(comboObj.hiddenId) {
	                	Ext.get(comboObj.hiddenId).dom.value = value; 
	                }                	
                }
		    	
		    	if(comboObj.onselect)   
                	comboObj.onselect.call(Ext.get(comboObj.el.dom.id).dom,json) ;
		    	
		    	comboObj.collapse();
		    } ;		  
	  },
	  //初始化TREE
	  initTreePanel:function(_queryParam){
			var queryParam=_queryParam;
			var url = DEFAULT_REFRESHURL;	
			var comboObj = this ;
		  	
			this.tpl = "<tpl for='.'><div style='height:300px'><div id='tree"+this.id+"'></div></div></tpl>" ;
	    	
	    	var root = new Ext.tree.AsyncTreeNode({   
	      		text :this.loadingText,  
	      		id : 'root',
	      		expanded : false
	    	});

	    	var treeLoader = new Ext.tree.TreeLoader({   
		      	dataUrl : url,
		      	autoLoad:false,
		      	baseParams:{
		      		autoid:this.autoid,
		      		loadAll:this.loadAll,
		      		multilevel:this.multilevel,
		      		multiselect:this.multiselect,
		      		refer:queryParam[0],
		      		refer1:queryParam[1],
		      		refer2:queryParam[2],
		      		pk1:Ext.get(this.hiddenId).dom.value
		      	}
	    	}) ; 
	    	var obj = this ;
	
	    	treeLoader.on('beforeload', function(store) {
				queryParam = obj.initReferParam();
				treeLoader.baseParams={pk1:Ext.get(obj.hiddenId).dom.value,loadAll:obj.loadAll,multilevel:obj.multilevel,multiselect:obj.multiselect,autoid:obj.autoid,refer:queryParam[0],refer1:queryParam[1],refer2:queryParam[2]};
			}); 
	    	
	    	treeLoader.on('load', function(loader, node) {	    		
				if(obj.defaultExpLevel&&!obj.hasAutoExp){
					if(obj.multilevel){
						obj.hasAutoExp=true;
						obj.treeNodeExpandOrCollap(2,obj.defaultExpLevel);
					}
				}					
				if(obj.loadEvent){
					obj.loadEvent(node);
				}
			}, this);
			
		 	var tree = new Ext.tree.TreePanel({ 
				root :root,
				loader : treeLoader, 
			    plugins: [new Ext.plugin.tree.TreeNodeChecked({   
			        // 级联选中   
			        cascadeCheck: true,   
			        // 级联父节点   
			        cascadeParent:obj.cascadeParent,   
			        // 级联子节点   
			        cascadeChild:obj.cascadeChild, 
			        // 连续选中   
			        linkedCheck: true,   
			        // 异步加载时，级联选中下级子节点   
			        asyncCheck: true  
			    })],				
				autoScroll : true,
				animate : false,
				useArrows : false,  
				rootVisible:true,  
				border : false  
	    	});
	    	
		 	this.comlisttree=tree;
		 	
		 	tree.on('checkchange',function(node){
		         
		         //obj.value = matech.arrayStrConcat(obj.getValue(),obj.getTreeCheckedValue());   
		         //obj.setRawValue(matech.arrayStrConcat(obj.getRawValue(),obj.getTreeCheckedText()));
		         
		         obj.value=obj.getTreeCheckedValue();
		         obj.setRawValue(obj.getTreeCheckedText());
		         
                 if(obj.hiddenId) {
                 	Ext.get(obj.hiddenId).dom.value = obj.value; 
                 	obj.tempCheckValue=obj.value;
                 }	
                 if(!comboObj.isClear){
                	 node.select();
                 }
                 
		 	});
		 	
			this.filter = new Ext.ux.form.TreeFilter(tree,{
				ignoreFolder:this.ignoreFolder,
				clearAction:'collapse'
			});
			
	    	if(this.multiselect) {
	    		
	    		obj.tempCheckValue=Ext.get(comboObj.hiddenId).dom.value;
	    		
	    		this.getTreeCheckedValue = function () {
					var selects = tree.getChecked();
					var values = "" ;
					
					for(var i=0;i<selects.length;i++) {
						if(obj.leafonly){
							if(selects[i].isLeaf()) {
								values += selects[i].id + this.separator;  
							}							
						}else{
							values += selects[i].id + this.separator;  
						}
					}
					if(values != "") {
						values = values.substr(0,values.length-1) ;
					}
					return values ;
				} ;
				
				this.getTreeCheckedText = function () {
					var selects = tree.getChecked();
					var values = "" ;
					
					for(var i=0;i<selects.length;i++) {
						if(obj.leafonly){
							if(selects[i].isLeaf()) {
								values += selects[i].text.replace(/<[^>]+>/g,"") + this.separator;  
							}							
						}else{
							values += selects[i].text.replace(/<[^>]+>/g,"") + this.separator;  					
						}
					}
					if(values != "") {
						values = values.substr(0,values.length-1) ;
					}
					return values ;
				} ;
				
				this.clearCheck = function () {
					comboObj.isClear=true;
					var nodes = tree.getChecked();  
			        if (nodes && nodes.length) {  
			            for (var i = 0; i < nodes.length; i++) {  
			                nodes[i].getUI().toggleCheck(false);  
			                nodes[i].attributes.checked = false;  
			            }  
			        }  
			        comboObj.isClear=false;
				} ;
				
				this.onRealBlur = function() {
			         this.list.hide();
			         this.value = this.getTreeCheckedValue();   
			         this.setRawValue(this.getTreeCheckedText());   
	                 if(this.hiddenId) {
	                 	Ext.get(this.hiddenId).dom.value =  this.value; 
	                 	obj.tempCheckValue=this.value;
	                 }	                 
			    };
			    
		    	tree.on('expandnode',function(_node){
		    		var checkValue = comboObj.separator+Ext.get(comboObj.hiddenId).dom.value+comboObj.separator;
		    		_node.eachChild(function (child) { 
		    			if(checkValue.indexOf(comboObj.separator+child.id+comboObj.separator) > -1) {
		    				if(!child.attributes.checked){
			    				child.attributes.checked = true;
			    				child.getUI().toggleCheck(true);	    					
		    				}
		    			}else{
		    				if(child.attributes.checked){
			    				child.attributes.checked = false;
			    				child.getUI().toggleCheck(false);		    					
		    				}
		    			}
		    		}); 
		    		
		    	});
		    	
		    	this.onLostFocut=function(){
		    		
		    		this.list.hide();
		    		this.value =obj.tempCheckValue;  
	                if(this.hiddenId) {
	                 	Ext.get(this.hiddenId).dom.value = obj.tempCheckValue; 	
	                }
	                
		    	};
			    
			    this.on({   
		             scope:this  
		            ,blur:this.onLostFocut   
		        });
	    		
	    	}else {
	    		var comboxObj = Ext.getCmp(this.id) ;
	    		
	    		var clickNode ;  //记录哪个结点被点击了 
	    		tree.on('click',function(node,event){	    			 
		    		event.stopEvent();
	
		    		if(obj.leafonly){
		    			if(!node.isLeaf()){
		    				return;
		    			};
		    		}
		    		clickNode = node ;
					comboxObj.setRawValue(node.text);  
					comboxObj.value = node.id ; 
	                 
	                if(comboxObj.hiddenId) {
	                   Ext.get(comboxObj.hiddenId).dom.value =  comboxObj.value ;  
	                }
	                if(comboxObj.onclick){
	                	try{
	                		eval(comboxObj.onclick+"('"+node.text+"')");
	                	}catch(e){
	                		
	                	}
	                }
	          		comboxObj.collapse(); 
	                if(comboObj.onclick){
	                	comboObj.onclick.call(node.id) ;
	                }   
	                	
	   		  	});
	   		  	
	   		  	 this.onRealBlur = function() {
	   		  	 	this.list.hide();  
	   		  	 	if(clickNode) {
	   		  	 		if(this.value!=""){
		   		  	 		//把最后点击节点的值赋到combox里面去
		   		  	 		 this.value = clickNode.id;   
			                 this.setRawValue(clickNode.text);   
			                 if(this.hiddenId) {
			                 	Ext.get(this.hiddenId).dom.value =  this.value; 
			                 }	   		  	 			
	   		  	 		};
	   		  	 	}
			    } ;
			    
			   this.beforeBlur = function (){
				 if(!this.value && this.getRawValue()) {
					 this.value = this.getRawValue();   
	                 if(this.hiddenId) {
	                 	Ext.get(this.hiddenId).dom.value =  this.getRawValue(); 
	                 }
				 }
			   };
	   		  	
	   		  	 this.on({   
		             scope:this  
		            ,blur:this.onRealBlur
		        });
		        
	    	}
	    	
			this.on('expand', function() {
		         if(this.onexpand){
		        	 return;
		         }
				//展开时才去加载树
				tree.root.reload(); 
				tree.render('tree'+this.id); 
				var combo = this ;
				root.expand(false,true,function(){
					combo.restrictHeight();
					root.setText("");
					
					//combo.treeNodeChecked(root,Ext.get(comboObj.hiddenId).dom.value);

				});
			}); 
			
			this.store = new Ext.data.SimpleStore({
				fields : [],
				data : [[]]
		 	}) ;
		 	
		 	this.mode = 'local' ;		  
	  },
	  initComBoxList:function(){
		  var url = DEFAULT_REFRESHURL;
		  var obj = this ;
		  
    	  var jsonStore = new Ext.data.JsonStore({
		    	url:url,    
	            root:'data',    
	            totalProperty: 'totalProperty',    
	            remoteSort: true,    
	            fields:['value','text'],
				baseParams : {
					autoid : this.autoid
				}
			});
			
	        this.mode = 'remote' ;
			this.store = jsonStore ;
			
			if(this.multiselect) { 
				
				 if(!this.tpl) {
		            this.tpl =      
		                 '<tpl for=".">'  
		                +'<div class="x-combo-list-item">'  
		                +'<img src="' + Ext.BLANK_IMAGE_URL + '" '  
		                +'class="ux-lovcombo-icon ux-lovcombo-icon-'  
		                +'{[values.' + this.checkField + '?"checked":"unchecked"' + ']}">'  
		                +'<span class="ux-lovcombo-item-text">{' + (this.displayField || 'text' )+ '}</span>'  
		                +'</div>'  
		                +'</tpl>'   
		            ;   
		        }
		        
		         this.onSelect = function(record, index) {  
		        	 
			        if(this.fireEvent('beforeselect', this, record, index) !== false){   
			            record.set(this.checkField, !record.get(this.checkField));   
			            if(this.store.isFiltered()) {   
			                this.doQuery(this.allQuery);   
			            }   
			            this.setValue(this.getCheckedValue());   
			            this.fireEvent('select', this, record, index);   
			        }
			        
					if(this.onselect)   
						this.onselect.call(Ext.get(this.el.dom.id).dom) ;
			    } ;
			    
			    this.setValue = function(v) { 
			        if(v) {
			            v = '' + v;   
			            if(this.valueField) {   
			                this.store.clearFilter();   
			                this.store.each(function(r) {
			                    var checked = !(!v.match(   
			                         '(^|' + this.separator + ')' + RegExp.escape(r.get(this.valueField))   
			                        +'(' + this.separator + '|$)'))   
			                    ;   
			  
			                    r.set(this.checkField, checked);   
			                }, this);   
			                if(this.getCheckedValue()||this.getCheckedValue()!=""){
				                this.value = this.getCheckedValue();
				                this.setRawValue(this.getCheckedDisplay());   				                	
			                }else{
				                this.value =v;
				                this.setRawValue(v);   				                	
			                }
			                if(this.hiddenId) {
			                    Ext.get(this.hiddenId).dom.value =  v ;
			                }
			                
			            }else {   
			                this.value = v;   
			                this.setRawValue(v);   
			                if(this.hiddenId) {
			                	Ext.get(this.hiddenId).dom.value =  v ;
			                }
			            }   
			            if(this.el) {   
			                this.el.removeClass(this.emptyClass);   
			            }   
			        }   
			        else {   
			            this.clearValue();   
			        }   
			    } ;
			    
			    this.beforeBlur = function(){				    	
			    	if(this.readOnly) return ;
				    var val = this.getRawValue();  
				    if(this.forceSelection){
				        if(val.length > 0 && val != this.emptyText){  
				           this.el.dom.value = Ext.isDefined(this.lastSelectionText) ? this.lastSelectionText : '';  
				            this.applyEmptyText();  
				        }else{  
				            this.clearValue();  
				        }  
				    }else{  
			            var texts = val.split(this.separator);  
			            var values='';  
			            for(var i=0;i<texts.length;i++){
		                    var rec = this.findRecord(this.displayField, texts[i].trim()); 
		                 	if(rec){  
		                        values+=(values.length>0?this.separator:'')+rec.data[this.valueField];  
		                    }  
		                }  
				        this.setValue(values);  
				    }  
				} ;
				
				this.clearCheckValue = function(){
			        this.value = '';  
			        this.setRawValue(this.value);  
			        this.store.clearFilter();  
			        this.store.each(function(r) {  
			            r.set(this.checkField, false);  
			        }, this);  
			        if(this.hiddenField) {  
			            this.hiddenField.value = '';  
			        }  
			        this.applyEmptyText();  
				} ;
				
				this.selectAll = function() {
			        this.store.each(function(record){
			            record.set(this.checkField, true);
			        }, this);
			        this.setValue(this.getCheckedValue());
			    } ;
			    
			    this.onRealBlur = function() {
			    	if(this.readOnly) return ;
			        this.list.hide();   
			        var rv = this.getRawValue();
			        var rva = rv.split(new RegExp(RegExp.escape(this.separator) + ' *'));   
			        var va = [];   
			        var snapshot = this.store.snapshot || this.store.data;   
			        Ext.each(rva, function(v) {   
			            snapshot.each(function(r) {
			                if(v === r.get(this.displayField)) {
			                    va.push(r.get(this.valueField));   
			                }   
			            }, this);   
			        }, this);
			        this.setValue(va.join(this.separator));   
			        this.store.clearFilter();   
			    } ;
			    
			    this.on({   
		             scope:this  
		            ,blur:this.onRealBlur   
		        });
			}else {
				//普通下拉，可以通过重写onSelect实现选择一个元素后的东				
				this.pageSize = 100 ;				
				this.onSelect = function(record, index) {
					
					if(this.fireEvent('beforeselect', this, record, index) !== false){
			            this.setValue(record.data[this.valueField || this.displayField]);
			            Ext.get(obj.hiddenId).dom.value = record.data[this.valueField || this.displayField];
			            this.collapse();
			            this.fireEvent('select', this, record, index);
			        }   

					if(this.onselect){	
						Ext.get(this.el.dom.id).dom.value=Ext.get(obj.hiddenId).dom.value;
						this.onselect.call(Ext.get(this.el.dom.id).dom) ;	
						this.setValue(Ext.get(obj.hiddenId).dom.value);
					}
			    } ;
			    
			    this.beforeBlur = function (){
			    	if(this.readOnly) return ;
			    	if(this.store.getCount() <=0 && this.startRawValue == this.getRawValue()) {
			    		return ;
			    	}else {
			    		this.assertValue();
			    	}
			    	
			    } ;
			}	
 				
	  },
	  initComponent : function() {
		if(!this.loadAll){
			this.loadAll="true";
		}
		
		this.initHideDom();

	  	var queryParam=null;
	  	
	  	if(this.multilevel || this.grid) {
	  		queryParam = this.initReferParam() ; 
	  	}

	  	if(this.grid) {
	  		this.initGridPanel(queryParam);
	  	}else if(this.multilevel) {
	  		this.initTreePanel(queryParam);	
	    }else {
	    	this.initComBoxList();
	    } 	  	

	  	Ext.matech.form.mtCombox.superclass.initComponent.call(this);  

	  },
	  
	  initList : function () {
	  	
        if(!this.list){
            var cls = 'x-combo-list',
                listParent = Ext.getDom(this.getListParent() || Ext.getBody()),
                zindex = parseInt(Ext.fly(listParent).getStyle('z-index'), 10);

            if (!zindex) {
                zindex = this.getParentZIndex();
            }

            this.list = new Ext.Layer({
                parentEl: listParent,
                shadow: this.shadow,
                cls: [cls, this.listClass].join(' '),
                constrain:false,
                zindex: (zindex || 12000) + 5
            });

            var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
            this.list.setSize(lw, 0);
            this.list.swallowEvent('mousewheel');
            this.assetHeight = 0;
            if(this.syncFont !== false){
                this.list.setStyle('font-size', this.el.getStyle('font-size'));
            }
           
            if(this.title){
                this.header = this.list.createChild({cls:cls+'-hd', html: this.title});
                this.assetHeight += this.header.getHeight();
            }
            
            var combo = this ;
 
	  		this.tbar = new Ext.Toolbar({
		           items:[{
					text:'清空',
			   		icon:TEMP_SYSTEM_WEB_ROOT+'/share/css/ext/img/delete.gif',
			   		 handler:function(){
			   			combo.clear();
			   			
						if(combo.onselect)  {
							try {
								combo.onselect.call(Ext.get(combo.el.dom.id).dom) ;
							} catch (e){
								eval(combo.onselect);
							}
						}
			   		 }
				},'-'
		        ]
		    });  
	  		
	  		if(this.grid && this.multiselect) {
	  			this.tbar.add({
					text:'确定',
			   		icon:TEMP_SYSTEM_WEB_ROOT+'/share/css/ext/img/selectall.gif',
			   		 handler:function(){
			   			combo.girdMultiSelect(combo) ;
			   		 }
				},'-') ;
	  			
	  		}else if(this.multiselect && !this.multilevel) {
	  			this.tbar.add({
					text:'全选',
			   		icon:TEMP_SYSTEM_WEB_ROOT+'/share/css/ext/img/selectall.gif',
			   		 handler:function(){
			   			combo.selectAll() ;
			   			
						if(combo.onselect)  {
							try {
								combo.onselect.call(Ext.get(combo.el.dom.id).dom) ;
							} catch (e){
								eval(combo.onselect);
							}
						}
			   			
			   		 }
				},'-') ;
	  		}else{
	  			if(this.multiselect && this.multilevel){
		  			this.tbar.add({
						text:'全选',
				   		icon:TEMP_SYSTEM_WEB_ROOT+'/share/css/ext/img/selectall.gif',
				   		 handler:function(){
				   			//combo.onRealBlur();
				   			var _checked=true;
				   			treeNodeCheckAll(combo.comlisttree,_checked);
				   			combo.comlisttree.fireEvent('checkchange', combo.comlisttree);
				   		 }
					},'-',{
						text:'已选',
				   		icon:TEMP_SYSTEM_WEB_ROOT+'/share/css/ext/img/selectall.gif',
				   		 handler:function(){
				   			if(this.getText()=="已选"){
				   				var checkValue = combo.separator+Ext.get(combo.hiddenId).dom.value+combo.separator;
				   				combo.filter.checkFilter(checkValue);
				   				this.setText("返回");
				   			}else{
				   				this.setText("已选");
				   				combo.treeNodeSearch("");
				   			}
				   		 }
					},'-') ;	  				
	  			}
	  		}
	  		
	  		if(this.multilevel){				
				this.tbar.add([{text:'',icon:TEMP_SYSTEM_WEB_ROOT+'/share/css/ext/img/tree/treeAllExpand.png',handler:function(){combo.treeNodeExpandOrCollap(0);}},
				               '-',
				               {text:'',icon:TEMP_SYSTEM_WEB_ROOT+'/share/css/ext/img/tree/treeAllCollaps.png',handler:function(){combo.treeNodeExpandOrCollap(1);}}
				               ]);
				var _data=[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8],[9,9],[10,10]];
				var level=new Ext.form.ComboBox({
					 width:40,
					 listWidth:40,
					 store: new Ext.data.SimpleStore({
						 	fields: ['value', 'text'],
						 	data : _data
					 	 }),
					 valueField:'value',
					 displayField:'text',
					 typeAhead: true,
					 mode: 'local',
					 triggerAction: 'all',
					 editable:false,
					 selectOnFocus:false,//用户不能自己输入,只能选择列表中有的记录
					 allowBlank:false,
			         listeners:{'select':function(){
				        	 combo.treeNodeExpandOrCollap(2,this.getValue());
				         },'expand':function(){
				        	 Ext.getDoc().un('mousewheel',combo.collapseIf, combo);  
				        	 Ext.getDoc().un('mousedown', combo.collapseIf, combo);  			        	 
				         },'collapse':function(){
				        	 combo.mon(Ext.getDoc(), {
				                 scope: combo,
				                 mousewheel: combo.collapseIf,
				                 mousedown: combo.collapseIf
				             }); 
				         }
			         }
				});
				this.tbar.add(level);
				var _inputId='search'+combo.id;
				var _input=new Ext.form.TextField({id:_inputId,
												   width:150,
												   listeners:{    
												            specialkey:function(field,e){    
												                if (e.getKey()==Ext.EventObject.ENTER){    
												                	combo.treeNodeSearch(Ext.getCmp(_inputId).getValue());
												                }    
												            } }
												 });
				this.tbar.add(_input);
				this.tbar.add([{text:'',icon:TEMP_SYSTEM_WEB_ROOT+'/share/css/ext/img/tree/treeSearch.gif',handler:function(){combo.treeNodeSearch(Ext.getCmp(_inputId).getValue());}}]);
	  			
	  		}
	  		
	  		this.tbar.doLayout() ;
	  		
		  	 if (this.tbar) {
	            var tbar = this.list.createChild();
	            this.tbar.render(tbar);
	            
	            this.assetHeight += tbar.getHeight();
	            lw = this.listWidth ||  Math.max(this.list.getWidth(),tbar.getWidth());
	            this.list.setWidth(lw);
	        }
	
            this.innerList = this.list.createChild({cls:cls+'-inner'});
            this.mon(this.innerList, 'mouseover', this.onViewOver, this);
            this.mon(this.innerList, 'mousemove', this.onViewMove, this);
            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
			
           
            if(this.pageSize){
                this.footer = this.list.createChild({cls:cls+'-ft'});
                this.pageTb = new Ext.PagingToolbar({
                    store: this.store,
                    pageSize: this.pageSize,
                    renderTo:this.footer
                });
                this.assetHeight += this.footer.getHeight();
            }

            if(!this.tpl){
                this.tpl = '<tpl for="."><div class="'+cls+'-item">{' + this.displayField + '}</div></tpl>';
            }

            this.view = new Ext.DataView({
                applyTo: this.innerList,
                tpl: this.tpl,
                singleSelect: true,
                selectedClass: this.selectedClass,
                itemSelector: this.itemSelector || '.' + cls + '-item',
                emptyText: this.listEmptyText,
                deferEmptyText: false
            });

            this.mon(this.view, {
                containerclick : this.onViewClick,
                click : this.onViewClick,
                scope :this
            });
	
            this.bindStore(this.store, true);
            if(this.resizable){
                this.resizer = new Ext.Resizable(this.list,  {
                   pinned:true, handles:'se'
                });
                this.mon(this.resizer, 'resize', function(r, w, h){
                    this.maxHeight = h-this.handleHeight-this.list.getFrameWidth('tb')-this.assetHeight;
                    this.listWidth = w;
                    this.innerList.setWidth(w - this.list.getFrameWidth('lr'));
                    this.restrictHeight();
                }, this);

                this[this.pageSize?'footer':'innerList'].setStyle('margin-bottom', this.handleHeight+'px');
            }
        }
	 },
	 treeNodeExpandOrCollap:function(_type,_level){
		    var self=this;
		    var _tree=this.comlisttree;
			var node=_tree.getSelectionModel().getSelectedNode();
			//0.展开,1.收回0)
			if(_type==0){
				if(node){
					node.expand();
					node.expandChildNodes(true);
				}else{
					_tree.expandAll();
				}
			}
			if(_type==1){
				if(node){
					node.collapseChildNodes(true);
					node.collapse();
				}else{
					_tree.collapseAll();
				}			
			}
			if(_type==2){
				var _root=_tree.getRootNode();
				_root.expand();
				_root.cascade(function(n){
					if(n.getDepth()<_level && n.hasChildNodes() && !n.isExpanded()){
						n.expand();	
					}
					if(n.getDepth()>=_level){
						n.collapse();
					}
				},this);
			}			
			
		},
	 treeNodeChecked:function(_node,_pk){
		var comboObj=this;
 		var checkValue = comboObj.separator+_pk+comboObj.separator;
			
		_node.eachChild(function (child) { 
			if(checkValue.indexOf(comboObj.separator+child.id+comboObj.separator) > -1) {
				if(comboObj.multiselect){
					child.attributes.checked = true;
					child.getUI().toggleCheck(true);					
				}else{
					child.select();
				}
			}
			if(child.hasChildNodes()){
				child.expand();	
				comboObj.treeNodeChecked(child,_pk);
			}
		});		 
	 },
	 treeNodeSearch:function(_value){
		 this.filter.filter(_value);
		},
	 restrictHeight : function(){ 
         if(this.onexpand){
        	 return;
         }  
        this.innerList.dom.style.height = '';
        var inner = this.innerList.dom,
        pad = this.list.getFrameWidth('tb') + (this.resizable ? this.handleHeight : 0) + this.assetHeight,
        h = Math.max(inner.clientHeight, inner.offsetHeight, inner.scrollHeight),
        ha = this.getPosition()[1]-Ext.getBody().getScroll().top,
        hb = Ext.lib.Dom.getViewHeight()-ha-this.getSize().height,
        space = Math.max(ha, hb, this.minHeight || 0)-this.list.shadowOffset-pad-5;
        h = Math.min(h, space, this.maxHeight);
        
        this.innerList.setHeight(h);
        this.list.beginUpdate();
        this.list.setHeight(h+pad);       
        this.list.alignTo.apply(this.list, [this.el].concat(this.listAlign));
        this.list.endUpdate();
        
	    },

	 expand : function(){
		 var comboxObj=this;
         if(comboxObj.onexpand){
         	try{
         		eval(comboxObj.onexpand+"('"+comboxObj.id+"')");
         		//this.onexpand.call(Ext.get(this.el.dom.id).dom) ;
         	}catch(e){
         		
         	}
        	return;
         }  
		 
		if(this.multiselect && this.multilevel){
			try{
				if(this.tbar.items.items[4].getText()=="返回"){
					this.tbar.items.items[4].setText("已选");
				}
			}catch(e){
				
			}
		}
				
        if(this.isExpanded() || !this.hasFocus){
            return; 
        }

        if(this.title || this.pageSize || this.tbar){
            this.assetHeight = 0;
            if(this.title){
                this.assetHeight += this.header.getHeight();
            }
            if(this.pageSize && this.footer){
            	this.assetHeight += this.footer.getHeight();
            }
            if(this.tbar) {
            	this.assetHeight += this.tbar.getHeight(); 
            }
        }

        if(this.bufferSize){
            this.doResize(this.bufferSize);
            delete this.bufferSize;
        }
        this.list.alignTo.apply(this.list, [this.el].concat(this.listAlign));

        var listParent = Ext.getDom(this.getListParent() || Ext.getBody()),
            zindex = parseInt(Ext.fly(listParent).getStyle('z-index') ,10);
        if (!zindex){
            zindex = this.getParentZIndex();
        }
        if (zindex) {
            this.list.setZIndex(zindex + 5);
        }
        
        this.list.show(); 
        
        if(Ext.isGecko2){
            this.innerList.setOverflow('auto'); // necessary for FF 2.0/Mac
        }
        this.mon(Ext.getDoc(), {
            scope: this,
            mousewheel: this.collapseIf,
            mousedown: this.collapseIf
        });
        
        this.fireEvent('expand', this);
    },
    clear : function () {
    	var obj=this;
    	if(this.multiselect && !this.grid) {
    		if(this.multilevel) {
    			
    			this.clearCheck() ;
    			this.clearValue();
 
    			obj.tempCheckValue="";
    			
    		}else {
    			this.clearCheckValue();
    		}
    	}else {
    		this.clearValue();
    	}
    }
	
});

String.prototype.trim = function() {                
  return this.replace(/^\s+|\s+$/g, '');          
} ;

if('function' !== typeof RegExp.escape) {     
    RegExp.escape = function(s) {     
        if('string' !== typeof s) {     
            return s;     
        } 
        return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');     
    };  
}
//自动初始化页面下拉标签
var initCombox = function (param,callback){
	var selectAttributeName = "autoid" ;
	var inputArray ;
	
	if(param) {
		if(typeof(param) == "string") {
			inputArray = Ext.query("#"+param) ;
		}else {
			var arr = new Array();
			arr.push(param) ;
			inputArray = arr ;
		}
	}else {
		inputArray = Ext.query("input["+selectAttributeName+"]") ;
	}
	
	Ext.each(inputArray,function(input){
		if(input.style.display == "none") return ;
		var autoId = input.getAttribute(selectAttributeName) ;			//自动下拉取数ID
		var id = input.getAttribute("id") ;								//标签ID
		var name = input.getAttribute("name") ;							//标签名称
		var noinput = input.getAttribute("noinput") ; 					//是否允许输入
		var width = input.clientWidth ;									//宽度
		var multiselect = input.getAttribute("multiselect") ; 			//是否多选
		var multilevel = input.getAttribute("multilevel") ;  			//是否多级
		var leafonly=input.getAttribute("leafonly") ;  					//树多级选择时是否只返回叶子节点的值
		var separator = input.getAttribute("separator") ;  				//多选分隔符
		var grid = input.getAttribute("grid") ;  						//是否显示下拉表格
		var value = input.value;
		var className = input.className ;								//验证
		var size = input.size ;											//宽度
		var onselect = input.onselect ;									//grid表格单击记录回调函数
		var readOnly = input.readOnly ;									//只读
		var property = input.getAttribute("property") ;					//备注字段		
		var listWidth = input.getAttribute("listWidth") ;				//下拉显示面板宽度
		var onchange = input.onchange ;									//
		var cascadeParent = input.getAttribute("cascadeParent") ;		//级联父级节点
		var cascadeChild = input.getAttribute("cascadeChild") ;	 		//级联子节点	
		var gridFieldIndex = input.getAttribute("gridFieldIndex") ;		//		
		var refer = input.getAttribute("refer") ;						//	
		var refer1 = input.getAttribute("refer1") ;						//
		var refer2 = input.getAttribute("refer2") ; 					//
		var validRefer = input.getAttribute("validRefer") ; 
		var rawValue = input.getAttribute("rawValue") ; 
		var isValid = input.isValid ;									//
		var loadAll = input.getAttribute("loadAll") ; 
		var title = input.getAttribute("title");
		var onclick = input.ontreeclick;									//
		var defaultExpLevel=input.getAttribute("defaultExpLevel");
		var onexpand=input.onexpand;
		
		
		if(!defaultExpLevel){
			defaultExpLevel=2;
		}
			
		var emptyText = "请选择或输入...";								//空值显示
		var editable = true ;											//是否允许输入
		if(noinput && noinput == "true" || multiselect == "true") {
			//设置了noinput或多选或下拉表格都设置不允许输入
			editable = false ;
			emptyText = "请选择...";
		}
		if(multilevel) {
			if(noinput){
				if(noinput == "false" ){
					editable = true ;
					emptyText = "请选择或输入...";
				}else{
					editable = false ;
					emptyText = "请选择...";
				}				
			}else{
				editable = false ;
				emptyText = "请选择...";				
			}
		}
		
		if(readOnly) {
			emptyText = "";
		}
		if(width == 0){
			width = size*8 + 20 ; //如果取不到宽度,就用size来取代  20为右边下拉图片宽度
			
		}
		
		if(!listWidth)  listWidth = width > 200 ? width : 200;
		if(multilevel && multiselect=="true"){
			if(listWidth<500){
				listWidth=500;
			}
		}		
		var mtCombox =new Ext.matech.form.mtCombox({
			multilevel:multilevel,
			leafonly:leafonly,
			autoid:autoId,
			transform:id,
			emptyText:emptyText,
			listWidth :listWidth,
			hiddenName:name,
			hiddenId:id,
			width:width,
			multiselect:multiselect,
			id:id, 
			editable:editable,
			separator:separator || ',',
			grid:grid,
			refer:refer,
			refer1:refer1,
			refer2:refer2,
			validRefer:validRefer,
			property:property,
			className:className,
			isValid:isValid,
			readOnly:readOnly,
			loadAll:loadAll,
			cascadeParent:cascadeParent,
			cascadeChild:cascadeChild,
			onselect:onselect,
			onchange:onchange,
			onexpand:onexpand,
			onclick:onclick,
			gridFieldIndex:gridFieldIndex,
			title:title,
			isAutoInit:true,
			defaultExpLevel:defaultExpLevel
		}) ;
		
		if(mtCombox.el) {
			Ext.get(mtCombox.el.dom.id).dom.property = property;
			Ext.get(mtCombox.el.dom.id).dom.inputId = id;
			
			if(isValid){
				Ext.get(mtCombox.el.dom.id).dom.isValid = isValid;
			}
		}
		mtCombox.addClass(className) ;
		
		if(onchange)   
			mtCombox.on("change",onchange) ;
		
		if(value && value != "") {
			if(rawValue){
				mtCombox.setValue(value) ;
				if(mtCombox.hiddenId) {
	            	Ext.get(mtCombox.hiddenId).dom.value =  value; 
	            }
				mtCombox.setRawValue(rawValue); 
				mtCombox.startRawValue = rawValue ;
				
				if(callback)
					callback.call(this,mtCombox) ;
			}else {
				mtCombox.setRealValue(value,callback) ;
			}
		}else {
			if(callback)
				callback.call(this,mtCombox) ;
		}
		
	}) ;
} ;

var mt_select_selectAll = function(autoid,inputId,obj) {
	var check = obj.checked ;
	var checkboxs = Ext.query("input[name=mt_gridMultiSelect_"+inputId+"_"+ autoid +"]") ;
	for(var i=0;i<checkboxs.length;i++) {
		checkboxs[i].checked = check ;
	}
} ;

var mt_select_formatNumber = function(v) {
	var result = "";
	if(parseFloat(v) < 0 ) {  
		result = "<div style='color:red' >" + formatDecimal(v,2) +  "</div>";
	} else {
		result = "<div style='color:blue' >" + formatDecimal(v,2) +  "</div>";
	}
	
	return result;
};

var mt_select_groupSelect = function(autoid,inputId,obj) {
	var group = obj.group ;
	if(!group) return ; 
	var check = obj.checked ;
	var checkboxs = Ext.query("input[name=mt_gridMultiSelect_"+inputId+"_"+ autoid +"]") ;
	for(var i=0;i<checkboxs.length;i++) {
		if(checkboxs[i].group == group)
			checkboxs[i].checked = check ;
	}
} ;
