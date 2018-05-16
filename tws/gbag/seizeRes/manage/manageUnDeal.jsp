<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript">
//未处置物品列表
var _grid;
var _toolbar;

function ext_init(){  
	_toolbar=new Ext.Toolbar({
		height:30,
		width:Ext.getBody().getWidth(),
		region:'north',
		items:[
     	      	{
   				text:'删除',
   				cls:'x-btn-text-icon', 
   				icon:contextPath + btn_img_url + 'delete.png',
   				handler:function () {	
   					deleteUnDeal();
   				}
   			},'-',
			{
				text:'归还',
				cls:'x-btn-text-icon', 
				icon:contextPath + btn_img_url + 'edit.png',
				handler:function () {	
					dealStore();
				}
			},'-',
			{
				text:'销毁',
				cls:'x-btn-text-icon', 
				icon:contextPath + btn_img_url + 'edit.png',
				handler:function () {	
					destoryDeal();
				}
			},'-',
			{
				text:'上缴国库',
				cls:'x-btn-text-icon', 
				icon:contextPath + btn_img_url + 'edit.png',
				handler:function () {	
					handInDeal();
				}
			},'-',
			{
				text:'移交',
				cls:'x-btn-text-icon', 
				icon:contextPath + btn_img_url + 'edit.png',
				handler:function () {	
					turnOverDeal();
				}
			}
			/* ,'-',{
	            text:'条码扫描',
	            cls:'x-btn-text-icon',
	            icon:contextPath + btn_img_url + 'switch.png',
	            handler:function(){
	            	
				}
          } */
   		]
	});
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:gbag.seizeRes.ManageUnGridJson",
		param:{unitId:"${unitId}"},
		currentPage:1,
		singleSelect:false,
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
//删除
function deleteUnDeal(){
	var uuid = _grid.chooseValue("UUID");
	if(uuid==""){
		alert("请选择物品后再操作");
		return;
	}
	if(confirm("请注意，此项操作不可逆，系统将保留本次删除记录")){
		$.ajax({
			type :"Post",
			async:true,
			url : "${pageContext.request.contextPath}/seizeRes.do?method=deleteDeal",
			data:{"uuid":uuid},
			success : function(data){
				var result=unescape(data);
				result=Ext.util.JSON.decode(result);
				result=result[0].result;
				if(result==-1){
					alert("警告,数据非法");
				}
				if(result==0){
					alert("失败了，待会儿再试吧~");
				}
				if(result==1){
					alert("操作成功");
					_grid.goSearch();
				}
				
			},
			error: function(){
				alert("提交失败，稍后再重试吧~");
			}
		});
	}
}
//归还
function dealStore(){
	var uuid = _grid.chooseValue("UUID");
	if(uuid==""){
		alert("请选择物品后再操作");
		return;
	}
	var casename = _grid.chooseValue("CASENAME");
	casename=encodeURI(encodeURI(casename));
	var name=_grid.chooseValue("SUSPECTNAME")+"---"+_grid.chooseValue("FILESNAME");
	name=encodeURI(encodeURI(name));
	//打开小窗口
	var url="${ctx}/seizeRes.do?method=chooseHuman&uuid="+uuid+"&name="+name+"&casename="+casename;
	matech.openWindow("请填写领取/归还人",url,600,350,parent,function(){});
}
//销毁
function destoryDeal(){
	var uuid = _grid.chooseValue("UUID");
	if(uuid==""){
		alert("请选择物品后再操作");
		return;
	}
	if(confirm("请确认该物品已被销毁")){
		toSubmit(uuid,2);
	}
}
//上缴国库
function handInDeal(){
	var uuid = _grid.chooseValue("UUID");
	if(uuid==""){
		alert("请选择物品后再操作");
		return;
	}
	if(confirm("点击确认后上交国库")){
		toSubmit(uuid,3);
	}
}
function toSubmit(uuid,state){
	$.ajax({
		type :"Post",
		async:true,
		url : "${pageContext.request.contextPath}/seizeRes.do?method=turnOnDeal",
		data:{"uuid":uuid,"editType":state},
		success : function(data){
			var result=unescape(data);
			result=Ext.util.JSON.decode(result);
			result=result[0].result;
			if(result==-1){
				alert("警告,数据非法");
			}
			if(result==0){
				alert("失败了，待会儿再试吧~");
			}
			if(result==1){
				alert("操作成功");
				_grid.goSearch();
			}
			
		},
		error: function(){
			alert("提交失败，稍后再重试吧~");
		}
	});
}
//移交
function turnOverDeal(){
	var uuid = _grid.chooseValue("UUID");
	if(uuid==""){
		alert("请选择物品后再操作");
		return;
	}
	var casename = _grid.chooseValue("CASENAME");
	casename=encodeURI(encodeURI(casename));
	var name=_grid.chooseValue("SUSPECTNAME")+"---"+_grid.chooseValue("FILESNAME");
	name=encodeURI(encodeURI(name));
	//打开小窗口
	var url="${ctx}/seizeRes.do?method=chooseOrgan&uuid="+uuid+"&name="+name+"&casename="+casename;
	matech.openWindow("请选择接收部门",url,600,350,parent,function(){});

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