<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>行政档案材料列表</title>

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
			   			text:'任务材料确认',
			   			cls:'x-btn-text-icon', 
			   			icon:contextPath + btn_img_url + 'add.png',
			   			handler:function () {	
			   				var url = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=archiveTaskItemsList&savastyle=XZ";
			   				openTab("archiveCaseTaskid", "案件材料入库确认", url, parent.parent);	
			   			}
			   		},'-',                  
					{
						text:'新增',
						cls:'x-btn-text-icon', 
						icon:contextPath + btn_img_url + 'add.png',
						handler:function () {	
							addlist();
						}
					},'-',
					{
						text:'修改',
						cls:'x-btn-text-icon', 
						icon:contextPath + btn_img_url + 'edit.png',
						handler:function () {	
							editlist();
						}
					},'-',	
			      	{
						text:'删除',
						cls:'x-btn-text-icon', 
						icon:contextPath + btn_img_url + 'delete.png',
						handler:function () {	
							remove();
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
						text:'移交档案室',
						cls:'x-btn-text-icon', 
						icon:contextPath + btn_img_url + 'edit.png',
						handler:function () {	
							deliver();
						}
					},'-',	
			  		 {
				        text:'导出excel表',
						cls:'x-btn-text-icon',
						icon:contextPath + btn_img_url + 'excel.png',
				        handler:function(){
				        	 exPExcel();
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
			id:"gridId_archiveItemsXZList",
			autoid:"js:gbag.archive.archiveItemsXZListGridJson",
			param:{flag:"${flag}",casenumber:"${casenumber}"},		
			currentPage:1,
			singleSelect:false,
			columns:[
					{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
			        {id:"HANDOVERTIME",header:"日期",dataIndex:"HANDOVERTIME",width:220,sortable:true,align:"left"},
			        {id:"VICTIMNAME",header:"事主姓名",dataIndex:"VICTIMNAME",width:100,sortable:true,align:"left"},
			        {id:"CASENAME",header:"案件名称",dataIndex:"CASENAME",width:180,sortable:true,align:"left"},
			        {id:"CASETYPE",header:"案件类型",dataIndex:"CASETYPE",width:100,sortable:true,align:"left"},
			        {id:"CASESTYLE",header:"案件性质",dataIndex:"CASESTYLE",width:180,sortable:true,align:"left"},
					{id:"CASESTATENAME",header:"案件状态",dataIndex:"CASESTATENAME",width:100,sortable:true,align:"left"},
					{id:"AUDITDIRECTOR",header:"主办民警",dataIndex:"AUDITDIRECTOR",width:80,sortable:true,align:"left"},
					{id:"DELIVERYERNAME",header:"移交人",dataIndex:"DELIVERYERNAME",width:180,sortable:true,align:"left"},
					{id:"ACCEPTTIME",header:"移交日期",dataIndex:"ACCEPTTIME",width:180,sortable:true,align:"left"},
					{id:"RECEIVERNAME",header:"接收人",dataIndex:"RECEIVERNAME",width:180,sortable:true,align:"left"},
					{id:"FILESDESCRIBE",header:"备注",dataIndex:"FILESDESCRIBE",width:220,sortable:true,align:"left"}, 
					{id:"DELIVERSTATENAME",header:"移交状态",dataIndex:"DELIVERSTATENAME",width:120,sortable:true,align:"left"}
						],
			fields:["UUID","HANDOVERTIME","VICTIMNAME","CASETYPE","CASESTYLE","CASENAME","CASESTATENAME","AUDITDIRECTOR","DELIVERYERNAME",
			        "ACCEPTTIME","RECEIVERNAME","FILESDESCRIBE","DELIVERSTATENAME","ORGANID_"],
			region: 'center',
			ondbclick:editlist
		});
		 
		new Ext.Viewport({
			layout:'border',
			items:[
				_toolbar,
				_grid
			]
		});	
		
		
});


</script>
</head>
<body>
</body>

<script language="javascript">


//列表式新增
function addlist(){
	var url = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=archiveItemsXZ&savestyle=XZ&editType=add&show=list";
	window.location = url;	
}
//列表编辑
function editlist() {
	
	 var value= _grid.chooseValue("UUID");
	 if (value == "") {
		alert('请选择要修改的数据!');
		return;

	 }
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=archiveItemsXZEdit&show=list&savestyle=XZ&editType=update&uuid=" + value;
	
	window.location.href = url; 
}

//删除
function remove() {
	
	var value= _grid.chooseValue("UUID");
	if (value == "") {
		 alert('请选择要删除的数据!');
			return;
	}
	
	if (confirm("您确认要将删除当前选中的档案材料吗？")) {
		var url = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=XZeditRemove&editType=remove&uuid=" + value;
		window.location.href = url;	
	}

}

//移交
function deliver() {
	
	var value= _grid.chooseValue("UUID");
	if (value == "") {
		alert('请选择要移交的档案材料!');
		return;

	}
	if (confirm("您确认要将移交当前选中的档案材料吗？")) {
		var url = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=deliver&delivertype=xz&uuid=" + value;
		window.location.href = url;	
	}

}

//导出excel
function exPExcel(){
	
	var vals= _grid.chooseValue("UUID");
	if (vals== "") {
		alert('请选择要导出的数据!');
		return;

	}
	var url = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=expExcel&vals=" + vals;				
	window.location.href = url;
}
	
</script>
</html>