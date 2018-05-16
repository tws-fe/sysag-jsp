<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>涉案人员登记情况表</title>
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
   				text:'编制任务',
   				cls:'x-btn-text-icon', 
   				icon:contextPath + btn_img_url + 'edit.png',
   				handler:function () {	
   					dealCase("1");
   				}
   			},'-',
   	      	{
   				text:'任务催办',
   				cls:'x-btn-text-icon', 
   				icon:contextPath + btn_img_url + 'edit.png',
   				handler:function () {	
   					dealCase("30");
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
				}
   			]
		});			

	 _grid= new Ext.matech.grid.GridPanel({
			id:"gridId_caseTaskUnDealList",
			autoid:"js:gbag.casese.CaseTaskUnDealGridJson",
			param:{flag:"${flag}"},		
			currentPage:1,
			singleSelect:true,
			columns:[
						{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
						{id:"ISFINISH",header:"状态",dataIndex:"ISFINISH",width:80,sortable:true,align:"left"},
				        {id:"REMINDERSUM",header:"催办次数",dataIndex:"REMINDERSUM",renderer : function(value) {var val=parseInt(value);if (isNaN(val)){val = null;}return val;},width:80,sortable:true,align:"left"},
				        {id:"TASKCONTENT",header:"任务名称",dataIndex:"TASKCONTENT",width:220,sortable:true,align:"left"},
				        /* {id:"HANDLETIME",header:"完成时间",dataIndex:"HANDLETIME",width:100,sortable:true,align:"left"}, */
				        {id:"TASKRESULT",header:"处理结果",dataIndex:"TASKRESULT",width:100,sortable:true,align:"left"},
				        {id:"CASENUMBER",header:"案件编号",dataIndex:"CASENUMBER",width:220,sortable:true,align:"left"},
				        {id:"CASENAME",header:"案件名称",dataIndex:"CASENAME",width:180,sortable:true,align:"left"},
				        {id:"CASENATURENAME",header:"案件性质",dataIndex:"CASENATURENAME",width:180,sortable:true,align:"left"},
				        {id:"CASETYPE",header:"案件类型",dataIndex:"CASETYPE",width:180,sortable:true,align:"left"},
						{id:"STATENAMES",header:"案件状态",dataIndex:"STATENAMES",width:100,sortable:true,align:"left"},
						{id:"_USERNAME_AUDITDIRECTOR",header:"主办民警",dataIndex:"_USERNAME_AUDITDIRECTOR",width:100,sortable:true,align:"left"},
						{id:"CASEDETAILS",header:"简要案情",dataIndex:"CASEDETAILS",width:220,sortable:true,align:"left"}
							],
				fields:["UUID","ISFINISH","REMINDERSUM","TASKCONTENT","HANDLETIME","TASKRESULT","CASENUMBER","TASKRESULT","CASENATURENAME","CASENAME","CASENATURENAME","CASETYPE","STATENAMES",
				        "_USERNAME_AUDITDIRECTOR","CASEDETAILS","ORGANID_"],
			region: 'center',
			ondbclick:grid_dblclick	
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



function dealCase(dealType){
	var value =_grid.chooseValue("CASENUMBER");//获取案件编号
	if(dealType=="1"){
		if (value == "") {
			alert('请选择案件!');
			return;
		} 
		
		var url = contextPath + "/case.do?method=caseTaskEdit&editType=update&flag=${flag}&ismyCase=${ismyCase}&uuid=" +value;
		openTab("caseTaskid", "案件任务信息", url, parent.parent);	
		
	}else if(dealType=="30"){
		if (value == "") {
			alert('请选择任务!');
			return;
		} 
		if (confirm("您确认对当前任务进行催办吗？")) {
			var url = contextPath + "/case.do?method=caseDeal&r=" + Math.random();
			var request = "&editType=deal&dealType="+dealType+"&uuid=" + value;
			var result = ajaxLoadPageSynch(url, request);
			if(result.indexOf("ok")>-1){
				alert("该任务已催办！");
				window.location.reload();
			}			
		}
	}

	
}

//双击
function grid_dblclick() {
	var value =_grid.chooseValue("CASENUMBER");//获取案件编号
	if (value == "") {
		alert('请选择案件!');
		return;
	} 
	var url = contextPath + "/case.do?method=caseTaskEdit&editType=update&flag=${flag}&ismyCase=${ismyCase}&uuid=" +value;
	openTab("caseTaskid", "案件任务信息", url, parent.parent);
	
}	

</script>
</head>
<body>
</body>
<script language="javascript">
$(".autoheight").css("height",document.body.clientHeight-85+"px");

function _restoreSelectCheck(store,records){
	
	var girdcount=0;
	store.each(function(r){
		var remindersum=r.get("REMINDERSUM");//催办次数
		if(remindersum>=3){
			Ext.getCmp('gridId_caseTaskUnDealList').getView().getRow(girdcount).style.backgroundColor='red';
		}else if(remindersum>="1"&&remindersum<"3"){
			Ext.getCmp('gridId_caseTaskUnDealList').getView().getRow(girdcount).style.backgroundColor='orange';
		}
		girdcount=girdcount+1;
	});
}
</script>
</html>