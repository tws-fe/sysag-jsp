<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>案件任务材料情况表</title>
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
		 				text:'确认入库',
		 				cls:'x-btn-text-icon', 
		 				icon:contextPath + btn_img_url + 'edit.png',
		 				handler:function () {	
		 					dealCaseTask();
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
			id:"gridId_archiveTaskItemsList",
			autoid:"js:gbag.archive.archiveTaskItemsListGridJson",
			param:{flag:"${flag}",casetype:"${casestyle}"},		
			currentPage:1,
			singleSelect:true,
			columns:[
						{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
						{id:"ISFINISH",header:"状态",dataIndex:"ISFINISH",width:80,sortable:true,align:"left"},
						{id:"TASKCONTENT",header:"任务名称",dataIndex:"TASKCONTENT",width:160,sortable:true,align:"left"},
						{id:"HANDLETIME",header:"完成时间",dataIndex:"HANDLETIME",width:200,sortable:true,align:"left"},
						{id:"TASKRESULT",header:"处理结果",dataIndex:"TASKRESULT",width:160,sortable:true,align:"left"},
				        {id:"REMINDERSUM",header:"催办次数",dataIndex:"REMINDERSUM",renderer : function(value) {var val=parseInt(value);if (isNaN(val)){val = null;}return val;},width:80,sortable:true,align:"left"},
				        {id:"CASENUMBER",header:"案件编号",dataIndex:"CASENUMBER",width:220,sortable:true,align:"left"},
				        {id:"CASETYPE",header:"案件类型",dataIndex:"CASETYPE",width:100,sortable:true,align:"left"},
				        {id:"CASENATURENAME",header:"案件性质",dataIndex:"CASENATURENAME",width:180,sortable:true,align:"left"},
				        {id:"CASENAME",header:"案件名称",dataIndex:"CASENAME",width:180,sortable:true,align:"left"},
						{id:"STATENAMES",header:"案件状态",dataIndex:"STATENAMES",width:100,sortable:true,align:"left"},
						{id:"_USERNAME_AUDITDIRECTOR",header:"主办民警",dataIndex:"_USERNAME_AUDITDIRECTOR",width:80,sortable:true,align:"left"},
						{id:"CASEDETAILS",header:"简要案情",dataIndex:"CASEDETAILS",width:220,sortable:true,align:"left"}
							],
				fields:["UUID","ISFINISH","TASKCONTENT","HANDLETIME","TASKRESULT","ISHANDOVERNAME","REMINDERSUM","CASENUMBER","CASETYPE","CASENATURENAME","CASENAME","STATENAMES","_USERNAME_AUDITDIRECTOR",
				        "CASEDETAILS","ORGANID_"],
			region: 'center'
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


//确认入库
function dealCaseTask() {
	var value =_grid.chooseValue("UUID");
	if (value == '') {
		alert('请选择要入库的数据!');
		return;
	}
	if (confirm("您确认对当前任务成果材料进行入库确认吗？")) {
		
		var url = contextPath + "//police.do?method=ConfirmCaseTask&r=" + Math.random();
		var request = "&uuid=" + value;
		var result = ajaxLoadPageSynch(url, request);
		if(result.indexOf("ok")>-1){
			alert("该任务成果材料已入库！");
			window.location.reload();
		}			

	}

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
			Ext.getCmp('gridId_archiveTaskItemsList').getView().getRow(girdcount).style.backgroundColor='red';
		}else if(remindersum>="1"&&remindersum<"3"){
			Ext.getCmp('gridId_archiveTaskItemsList').getView().getRow(girdcount).style.backgroundColor='orange';
		}
		girdcount=girdcount+1;
	});
}
</script>
</html>