<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>在线档案材料列表</title>

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
			id:"gridId_archiveItemsSelectList",
			autoid:"js:gbag.archive.archiveItemsSelectListGridJson",
			param:{flag:"${flag}",casenumber:"${casenumber}"},		
			currentPage:1,
			singleSelect:true,
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


</script>
</head>
<body>
</body>

<script language="javascript">

</script>
</html>