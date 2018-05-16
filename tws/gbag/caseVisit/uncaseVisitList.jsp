<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>我的接访情况表</title>

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
						text:'来访分流',
						cls:'x-btn-text-icon', 
						icon:contextPath + btn_img_url + 'add.png',
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
							closeTab(parent.tab);
						}
					}]
			});
	 		
	
	 _grid= new Ext.matech.grid.GridPanel({
			id:"gridId_unCaseVisitList",
			autoid:"js:gbag.casevisit.UnCaseVisitListGridJson",
			param:{flag:"${flag}"},		
			currentPage:1,
			singleSelect:true,
			columns:[
					{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
			        
			        
			        {id:"NAME",header:"来访人",dataIndex:"NAME",width:180,sortable:true,align:"left"},
			        {id:"VISITTIME",header:"来访时间",dataIndex:"VISITTIME",width:100,sortable:true,align:"left"},
			        {id:"VISITFOR",header:"来访事由",dataIndex:"VISITFOR",width:100,sortable:true,align:"left"},
			        {id:"RECEIVECOPNAME",header:"接访民警",dataIndex:"RECEIVECOPNAME",width:100,sortable:true,align:"left"},
			        {id:"TELNUM",header:"联系电话",dataIndex:"TELNUM",width:180,sortable:true,align:"left"},
			        {id:"RESULT",header:"接访结果",dataIndex:"RESULT",width:220,sortable:true,align:"left"},
					{id:"RECEIVEREPLY",header:"前台答复",dataIndex:"RECEIVEREPLY",width:80,sortable:true,align:"left"},
					{id:"REPLY",header:"答复内容",dataIndex:"REPLY",width:220,sortable:true,align:"left"},
			        {id:"CASENUMBER",header:"案件编号",dataIndex:"CASENUMBER",width:220,sortable:true,align:"left"},
			        {id:"CASETYPE",header:"案件类型",dataIndex:"CASETYPE",width:100,sortable:true,align:"left"},
			        {id:"CASENATURENAME",header:"案件性质",dataIndex:"CASENATURENAME",width:180,sortable:true,align:"left"},
			        {id:"CASENAME",header:"案件名称",dataIndex:"CASENAME",width:180,sortable:true,align:"left"},
					{id:"STATENAMES",header:"案件状态",dataIndex:"STATENAMES",width:100,sortable:true,align:"left"},
					{id:"IDCARDNUM",header:"身份证号码",dataIndex:"IDCARDNUM",width:100,sortable:true,align:"left"},
					{id:"_USERNAME_AUDITDIRECTOR",header:"主办民警",dataIndex:"_USERNAME_AUDITDIRECTOR",width:80,sortable:true,align:"left"},
					{id:"CASEINFO",header:"简要案情",dataIndex:"CASEINFO",width:220,sortable:true,align:"left"}
						],
			fields:["UUID","RESULT","VISITTIME","NAME","TELNUM","VISITFOR","RECEIVECOPNAME","RECEIVEREPLY","REPLY","CASENUMBER","CASETYPE","CASENATURENAME","CASENAME","STATENAMES","_USERNAME_AUDITDIRECTOR","ISSIGNNAME","ISHANDOVERNAME","BJSJ",
			        "IDCARDNUM","CASEINFO","ORGANID_"],
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
		
		
});


//编辑来访分流
function edit() {
     var value= _grid.chooseValue("UUID");
	if (value == "") {
		alert('请选择要修改的数据!');
		return;

	}
	var url = MATECH_SYSTEM_WEB_ROOT + "/caseVist.do?method=caseVisitEdit&flag=nq&pfl=fl&editType=update&uuid=" + value;
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