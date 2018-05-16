<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>案件呈案情况表</title>
<script type="text/javascript">

var _grid;
var _toolbar;

Ext.onReady(function(){
		_toolbar = new Ext.Toolbar({
			height:30,
			width:Ext.getBody().getWidth(),
			region:'north',
		    items:[
				{
					text:'新增',
					cls:'x-btn-text-icon', 
					icon:contextPath + btn_img_url + 'add.png',
					handler:function () {	
						add();
					}
				},'-',
				{
					text:'修改',
					cls:'x-btn-text-icon', 
					icon:contextPath + btn_img_url + 'edit.png',
					handler:function () {	
						edit();
					}
				},'-',
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
					icon:contextPath + btn_img_url + 'close.png',
					handler:function () {	
						closeTab(parent.parent.tab);
					}
				}]
			});	
	
	 _grid= new Ext.matech.grid.GridPanel({
			id:"gridId_handAddCaseList",
			autoid:"js:gbag.casese.HandAddCaseGridJson",
			param:{},		
			currentPage:1,
			singleSelect:true,
			columns:[
					{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
			        {id:"CASENUMBER",header:"案件编号",dataIndex:"CASENUMBER",width:220,sortable:true,align:"left"},
			        {id:"CASETYPE",header:"案件类型",dataIndex:"CASETYPE",width:100,sortable:true,align:"left"},
			        {id:"CASENATURENAME",header:"案件性质",dataIndex:"CASENATURENAME",width:180,sortable:true,align:"left"},
			        {id:"CASENAME",header:"案件名称",dataIndex:"CASENAME",width:180,sortable:true,align:"left"},
					{id:"STATENAMES",header:"案件状态",dataIndex:"STATENAMES",width:100,sortable:true,align:"left"},
					{id:"_USERNAME_AUDITDIRECTOR",header:"主办民警",dataIndex:"_USERNAME_AUDITDIRECTOR",width:80,sortable:true,align:"left"},
					{id:"ISHANDOVERNAME",header:"是否交案",dataIndex:"ISHANDOVERNAME",width:100,sortable:true,align:"left"},
					{id:"BJSJ",header:"报警时间",dataIndex:"BJSJ",width:300,sortable:true,align:"left"},
					{id:"CASEDETAILS",header:"简要案情",dataIndex:"CASEDETAILS",width:220,sortable:true,align:"left"}
						],
			fields:["UUID","CASENUMBER","CASETYPE","CASENATURENAME","CASENAME","STATENAMES","_USERNAME_AUDITDIRECTOR","ISSIGNNAME","ISHANDOVERNAME","BJSJ",
			        "CASEDETAILS","ISSIGN","ORGANID_"],
			region: 'center',
			ondbclick:edit	
		});
		 
		new Ext.Viewport({
			layout:'border',
			items:[
				_toolbar,
				_grid
			]
		});	
		
		_grid.getStore().addListener('load',_restoreSelectCheck);//数据加载后监听该方法
});


//编辑案件信息及嫌疑人，受害人信息
function add() {
	var url = MATECH_SYSTEM_WEB_ROOT + "/case.do?method=caseAddEdit&editType=add";
	window.location.href = url; 
}

//编辑案件信息及嫌疑人，受害人信息
function edit() {
     var value= _grid.chooseValue("UUID");
	if (value == "") {
		alert('请选择要修改的数据!');
		return;

	}
	var url = MATECH_SYSTEM_WEB_ROOT + "/case.do?method=caseAddEdit&editType=update&uuid=" + value;
	window.location.href = url; 
}





//双击
function grid_dblclick() {	
	
	var value =_grid.chooseValue("UUID");
	var url = contextPath + "/case.do?method=caseEdit&editType=update&flag=${flag}&uuid=" + value;
	openTab("caseid", "案件信息", url, parent.parent);
}	

</script>
</head>


<script language="javascript">
</script>
</html>