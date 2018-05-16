<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript">

var _grid;
var _toolbar;

function ext_init(){  
	_toolbar=new Ext.Toolbar({
		height:30,
		width:Ext.getBody().getWidth(),
		region:'north',
		items:[
     	      	{
   				text:'查询',
   				cls:'x-btn-text-icon', 
   				icon:contextPath + btn_img_url + 'query.png',
   				handler:function () {	
   					_grid.customQryWinFun();
   				}
   			},'-',
			{
				text:'关闭',
				cls:'x-btn-text-icon', 
				icon:contextPath + btn_img_url + 'edit.png',
				handler:function () {	
					matech.closeTab(parent);
				}
			}
   		]
	});
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:gbag.seizeRes.ManageGridJson",
		param:{unitId:"${unitId}"},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"CASENUMBER",header:"CASENUM",dataIndex:"CASENUMBER",width:320,sortable:true,hidden:true,align:"left"},
		         {id:"SUSPECT",header:"SUS",dataIndex:"SUSPECT",width:320,sortable:true,align:"left",hidden:true},
		         {id:"UUID",header:"ID",dataIndex:"UUID",width:320,sortable:true,align:"left",hidden:true},
		         {id:"CASENAME",header:"案件编号",dataIndex:"CASENAME",width:320,sortable:true,align:"left"},
		        {id:"CASETYPE",header:"案件性质",dataIndex:"CASETYPE",width:90,sortable:true,align:"left"},
 				{id:"DATATYPE",header:"案件类型",dataIndex:"DATATYPE",width:90,sortable:true,align:"left"},
 				{id:"SUSPECTNAME",header:"嫌疑人",dataIndex:"SUSPECTNAME",width:240,sortable:true,align:"left"},
 				{id:"FILESNUMBER",header:"物品编号",dataIndex:"FILESNUMBER",width:100,sortable:true,align:"left"},
 				{id:"FILESNAME",header:"物品名称",dataIndex:"FILESNAME",width:140,sortable:true,align:"left"},
 				{id:"FILECOUNT",header:"数量",dataIndex:"FILECOUNT",width:70,sortable:true,align:"left"},
 				{id:"FILESDESCRIBE",header:"特征",dataIndex:"FILESDESCRIBE",width:140,sortable:true,align:"left"},
 				{id:"REMARKS",header:"备注",dataIndex:"REMARKS",width:140,sortable:true,align:"left"},
 				{id:"AUDITUSERNAME",header:"主办民警",dataIndex:"AUDITUSERNAME",width:140,sortable:true,align:"left"},
 				{id:"STATENAME",header:"状态",dataIndex:"STATENAME",width:120,sortable:true,align:"left"}
 				],
 		fields:["UUID","SUSPECT","CASENUMBER","CASENAME","CASETYPE","DATATYPE","SUSPECTNAME","FILESNUMBER","FILESNAME","FILECOUNT","FILESDESCRIBE","REMARKS","AUDITUSERNAME","STATENAME"],
		ondbclick:deleteUnDeal,
		region: 'center'
	});	

	new Ext.Viewport({
		layout:'border',
		items:[
			_toolbar,
			_grid
		]
	});
}

Ext.onReady(ext_init);

</script>
</head>

<body>

</body>

<script type="text/javascript">
function deleteUnDeal(){
			
}

function dealStore(dealType){
	
}

//开始扫描
var setBorrowWin;
function getBorrow(){
	var html = "<div style='padding:10 5 5 15;'>物品|档案编号：";
	html += "<input type=text id='qrcodeentxt' name='qrcodeentxt'  onpropertychange='change_line(this);' oninput='change_line(this)' size=40 ><br>";
	html += "<font color=red><span id='qrcodeenresult' ></span></font>";
	html += "</div>";	
	
	if(!setBorrowWin) { 
	    setBorrowWin = new Ext.Window({
	     	renderTo : Ext.getBody(),
	     	width: 600,
	     	id:'setBorrowWin',
	     	height:130,
	     	title:'扫描二维码',
	     	closable:true,
        	closeAction:'hide',
			modal:true,
       	    listeners : {
	         	'hide':{
	         		fn: function () {	         			
						setBorrowWin.hide();
						document.getElementById("qrcodeentxt").value = "";
					}
				},'show':{
	         		fn: function () {	         									
						$("#qrcodeentxt").delay(100).queue(function(){$(this).focus().dequeue();}); //表示延时
					}
				}
	        },
	       	html:html,
        	layout:'fit',
			buttons:[{
	            text: '确定',
	            icon: contextPath + btn_img_url + 'check.png',
	            handler:function(){
	            	setBorrowWin.hide();
	            }
	        }]
	    });
    } 
	
 	setBorrowWin.show(); 	
	
}

	
</script>
</html>