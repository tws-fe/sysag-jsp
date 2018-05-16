<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>我的提醒</title>
<script type="text/javascript">

var _grid4;
var mytab;

Ext.onReady(function(){
	
	 _grid4= new Ext.matech.grid.GridPanel({
			id:"gridId_auditMsgList",
			autoid:"js:process.AuditInfoGridJson",
			param:{formType:"auditMsg"},		
			currentPage:1,
			singleSelect:true,
			autoExpandColumn:'CONTENT',
			columns:[
					{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
			        {id:"CREATEMODAL",header:"提醒类型",dataIndex:"CREATEMODAL",width:120,sortable:true,align:"left"},
			        {id:"PHONES",header:"手机号码",dataIndex:"PHONES",width:120,sortable:true,align:"left"},
			        {id:"CONTENT",header:"信息内容",dataIndex:"CONTENT",width:400,sortable:true,align:"left"},
			        {id:"CREATEDATETIME",header:"创建时间",dataIndex:"CREATEDATETIME",width:150,sortable:true,align:"left"},
			        {id:"SENDDATETIME",header:"短信发送时间",dataIndex:"SENDDATETIME",width:150,sortable:true,align:"left"}
						],
			fields:["UUID","CREATEMODAL","PHONES","CONTENT","CREATEDATETIME","SENDDATETIME"],
			region: 'center'
		});	
	 
		new Ext.Viewport({
			layout:'border',
			items:[_grid4]
		});	
});


</script>
</head>
<body>
</body>
</html>