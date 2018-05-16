<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>案件确认表</title>

<script type="text/javascript">

var _grid;
var _toolbar;
Ext.onReady(function(){

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
		        text:'本月案件确认',
				cls:'x-btn-text-icon',
				icon:contextPath + btn_img_url + 'excel.png',
		        handler:function(){
		        	exPExcel("thismonth");
				}
	  		},'-',
	  		{
		        text:'上月案件确认',
				cls:'x-btn-text-icon',
				icon:contextPath + btn_img_url + 'excel.png',
		        handler:function(){
		        	exPExcel("lastmonth");
				}
	  		},'-',
	  		{
		        text:'导出Excel',
				cls:'x-btn-text-icon',
				icon:contextPath + btn_img_url + 'excel.png',
		        handler:function(){
		        	exExcel();
				}
	  		},'-',
	  		{
				text:'关闭',
				cls:'x-btn-text-icon',
				icon:contextPath + btn_img_url + 'close.png',
				handler:function () {	
					closeTab(parent.tab);
				}
			}]
		});	
		
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_caseConfirmList",
		autoid:"js:gbag.casese.CaseConfirmListGridJson",
		param:{flag:"${flag}"},		
		currentPage:1,
		singleSelect : false,//默认是多选框
		columns:[
				{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
		        {id:"CASENAME",header:"案件名称",dataIndex:"CASENAME",width:180,sortable:true,align:"left"},
		        {id:"CASENUMBER",header:"案件编号",dataIndex:"CASENUMBER",width:220,sortable:true,align:"left"},
		        {id:"_USERNAME_AUDITDIRECTOR",header:"主办民警",dataIndex:"_USERNAME_AUDITDIRECTOR",width:80,sortable:true,align:"left"},
		        {id:"BJSJ",header:"报警时间",dataIndex:"BJSJ",width:300,sortable:true,align:"left"},
		        {id:"CASENATURENAME",header:"案件性质",dataIndex:"CASENATURENAME",width:180,sortable:true,align:"left"},
				{id:"STATENAMES",header:"案件状态",dataIndex:"STATENAMES",width:100,sortable:true,align:"left"},
				{id:"ASSIGNTORNAME",header:"指派领导",dataIndex:"ASSIGNTORNAME",width:100,sortable:true,align:"left"},
				{id:"REMARK",header:"备注",dataIndex:"REMARK",width:100,sortable:true,align:"left"}
					],
		fields:["UUID","CASENAME","CASENUMBER","_USERNAME_AUDITDIRECTOR","BJSJ","CASENATURENAME","STATENAMES",
		        "ASSIGNTORNAME","REMARK","ORGANID_"],
		region: 'center'
	});
	new Ext.Viewport({
		layout:'border',
		items:[
			_toolbar,
			_grid
		]
	});	
		
	
});

/*
 * 导出excel
 *参数month：本月（thismonth）：时间为上个月26-本月25，例如：2017.12.26-2018.01.25(后台直接处理)
 *参数month：上月（lastmonth）：时间为上个月26-本月25，例如：2017.11.26-2017.12.25(后台直接处理)
 */
function exPExcel(month){
	
	var url = contextPath+ "/case.do?method=expExcel&month="+month;
	window.location.href = url;
}

//导出excel：通过案件编号来获取
function exExcel(){
	
	var vals= _grid.chooseValue("CASENUMBER");//获取案件编号
	if(vals == ""){
		alert("请选择要导出的记录");
		return;
	}
	var url = MATECH_SYSTEM_WEB_ROOT + "/case.do?method=exExcel&vals="+vals;				
	window.location.href = url;
} 
</script>
</head>
<body>
</body>

<script language="javascript">
$(".autoheight").css("height",document.body.clientHeight-85+"px");
</script>
</html>