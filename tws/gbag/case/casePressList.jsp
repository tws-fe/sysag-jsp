<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>我的案件情况表</title>

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
						text:'案件催办',
						cls:'x-btn-text-icon', 
						icon:contextPath + btn_img_url + 'edit.png',
						handler:function () {	
							dealCase("30");
						}
					}]
			});
	 _grid= new Ext.matech.grid.GridPanel({
			id:"gridId_myCaseList",
			autoid:"js:gbag.casese.MyCaseListGridJson",
			param:{flag:"${flag}",ismyCase:"${ismyCase}"},		
			currentPage:1,
			singleSelect:true,
			columns:[
					{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
					{id:"TASKSCHEDULE",header:"任务进度",dataIndex:"TASKSCHEDULE",xtype: 'gridcolumn',
						renderer : function(value) {var val = parseInt(value, 10);if (isNaN(val)){val =null;return val;}else{return "<div style='width:100%;background:#fff;border:1px solid #ccc;'><div style='height:12px;width:"+val+"%;background:#77FF00;font-size:10px;'>"+val+"%</div></div>";}},
						width:160,sortable:true,align:"left"},
			        {id:"REMINDERSUM",header:"催办次数",dataIndex:"REMINDERSUM",renderer : function(value) {var val=parseInt(value);if (isNaN(val)){val = null;}return val;},width:80,sortable:true,align:"left"},
			        {id:"CASENUMBER",header:"案件编号",dataIndex:"CASENUMBER",width:220,sortable:true,align:"left"},
			        {id:"CASETYPE",header:"案件类型",dataIndex:"CASETYPE",width:100,sortable:true,align:"left"},
			        {id:"CASENATURENAME",header:"案件性质",dataIndex:"CASENATURENAME",width:180,sortable:true,align:"left"},
			        {id:"CASENAME",header:"案件名称",dataIndex:"CASENAME",width:180,sortable:true,align:"left"},
					{id:"STATENAMES",header:"案件状态",dataIndex:"STATENAMES",width:100,sortable:true,align:"left"},
					{id:"_USERNAME_AUDITDIRECTOR",header:"主办民警",dataIndex:"_USERNAME_AUDITDIRECTOR",width:80,sortable:true,align:"left"},
					/* {id:"ISSIGNNAME",header:"是否签收",dataIndex:"ISSIGNNAME",width:100,sortable:true,align:"left"}, */
					{id:"ISHANDOVERNAME",header:"是否交案",dataIndex:"ISHANDOVERNAME",width:100,sortable:true,align:"left"},
					{id:"BJSJ",header:"报警时间",dataIndex:"BJSJ",width:300,sortable:true,align:"left"},
					{id:"CASEDETAILS",header:"简要案情",dataIndex:"CASEDETAILS",width:220,sortable:true,align:"left"}
						],
			fields:["UUID","TASKSCHEDULE","REMINDERSUM","CASENUMBER","CASETYPE","CASENATURENAME","CASENAME","STATENAMES","_USERNAME_AUDITDIRECTOR","ISSIGNNAME","ISHANDOVERNAME","BJSJ",
			        "CASEDETAILS","FINISHSUM","TASKSCHEDULE","ISSIGN","ORGANID_"],
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
	var value =_grid.chooseValue("UUID");
	
	if (value == "") {
		alert('请选择案件!');
		return;
	} else{
		 if(dealType=="30"){
			 
			/* var issign =_grid.chooseValue("ISSIGN");
			if (issign != "1") {
				alert("案件尚未签收！");
				return;
			} */
			
			if (confirm("您确认对当前案件进行催办吗？")) {
				var url = contextPath + "/case.do?method=caseDeal&r=" + Math.random();
				var request = "&editType=deal&dealType="+dealType+"&uuid=" + value;
				var result = ajaxLoadPageSynch(url, request);
				if(result.indexOf("ok")>-1){
					alert("该案件已催办！");
					window.location.reload();
				}			
			}
		}
	}

}

//双击
function grid_dblclick() {	
	
	var value =_grid.chooseValue("UUID");
	/* if (value == "") {
		alert('请选择要修改的数据!');
		return;

	} */
	var url = contextPath + "/case.do?method=caseEdit&editType=update&flag=${flag}&uuid=" + value;
	openTab("caseid", "案件信息", url, parent.parent);
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
			Ext.getCmp('gridId_myCaseList').getView().getRow(girdcount).style.backgroundColor='red';
		}else if(remindersum>="1"&&remindersum<"3"){
			Ext.getCmp('gridId_myCaseList').getView().getRow(girdcount).style.backgroundColor='orange';
		}
		girdcount=girdcount+1;
	});
}
</script>
</html>