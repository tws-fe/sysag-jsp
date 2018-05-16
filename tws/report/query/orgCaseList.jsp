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
				text:'分类查看',
				cls:'x-btn-text-icon', 
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					edit(0);
				}
			},'-',	
			{
				text:'单页查看',
				cls:'x-btn-text-icon',
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					edit(1);
				}
			},'-',			
			{
				text:'查询',
				cls:'x-btn-text-icon',
				icon:'${ctx}/css/theme/default/btn/query.png',
				handler:function () {	
					_grid.customQryWinFun();
				}
			},'-',
	  		{
				text:'关闭',
				cls:'x-btn-text-icon',
				icon:'${ctx}/css/theme/default/btn/close.png',
				handler:function () {	
					closeTab(parent.tab);
				}
			}]
		});				

		 _grid= new Ext.matech.grid.GridPanel({
				id:"gridId_caseList",
				autoid:"js:police.CaseInfoGridJson2",
				param:{formType:"QUERY",unitId:"${unitId}"},		
				currentPage:1,
				singleSelect:true,
				columns:[
						{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
				        {id:"DSTATUSNAME",header:"状态",dataIndex:"DSTATUSNAME",width:80,sortable:true,align:"left"},
				        {id:"CASENUMBER",header:"案件编号",dataIndex:"CASENUMBER",width:180,sortable:true,align:"left"},
				        {id:"CASETYPE",header:"案件类型",dataIndex:"CASETYPE",width:100,sortable:true,align:"left"},
				        {id:"CAUSE",header:"案由",dataIndex:"CAUSE",width:180,sortable:true,align:"left"},
				        {id:"DISPOSE",header:"处理结果",dataIndex:"DISPOSE",width:180,sortable:true,align:"left"},
				        {id:"IDENTITYNUMBER",header:"身份证号码",dataIndex:"IDENTITYNUMBER",width:180,sortable:true,align:"left"},
						{id:"SUSPECTSNAME",header:"姓名",dataIndex:"SUSPECTSNAME",width:140,sortable:true,align:"left"},
						{id:"GENDER",header:"性别",dataIndex:"GENDER",width:60,sortable:true,align:"left"},
						{id:"BIRTH",header:"出身日期",dataIndex:"BIRTH",width:80,sortable:true,align:"left"},
						{id:"NATION",header:"民族",dataIndex:"NATION",width:60,sortable:true,align:"left"},
						{id:"REGISTER_SITE",header:"户籍地址",dataIndex:"REGISTER_SITE",width:300,sortable:true,align:"left"},
						{id:"TELEPHONE",header:"联系电话",dataIndex:"TELEPHONE",width:130,sortable:true,align:"left"},
						{id:"CURUSERNAME",header:"承办民警",dataIndex:"CURUSERNAME",width:100,sortable:true,align:"left"},
						{id:"CURLEADERNAME",header:"审核领导",dataIndex:"CURLEADERNAME",width:100,sortable:true,align:"left"},
						{id:"HASOUT",header:"是否中途带离过",dataIndex:"HASOUT",width:100,sortable:true,align:"left",hidden:true},
						{id:"ISQUESTIONDOOR",header:"是否有审讯步骤",dataIndex:"ISQUESTIONDOOR",width:100,sortable:true,align:"left",hidden:true},
						{id:"ISDISPOSE",header:"是否有处理步骤",dataIndex:"ISDISPOSE",width:100,sortable:true,align:"left",hidden:true},
						{id:"ENTERTIME",header:"进入时间",dataIndex:"ENTERTIME",width:150,sortable:true,align:"left"}
							],
				fields:["UUID","CASENUMBER","CASETYPE","CAUSE","IDENTITYNUMBER","SUSPECTSNAME","GENDER","BIRTH","NATION","REGISTER_SITE","DISPOSE",
				        "TELEPHONE","CURUSERNAME","CURLEADERNAME","CURUSERIDS_ASSISTNAME","ENTERTIME","STATUSNAME","FINISHNAME","DSTATUSNAME","HASOUT","ISDISPOSE","ISQUESTIONDOOR"],
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

//编辑
function edit(ftype) {
	
		var value =_grid.chooseValue("UUID");
		if (value == "") {
			alert('请选择嫌疑人!');
			return;
		}
		
		var tabId="${formType}";
		var tabName="${formTypeName}";
		var casenumber=_grid.chooseValue("CASENUMBER");
		var suspectsname=_grid.chooseValue("SUSPECTSNAME");
		
		
		var url = MATECH_SYSTEM_WEB_ROOT + "/jingan.do?method=caseInfoMain&view=${view}&formType=${formType}&editType=update&uuid=" + value;
		if(ftype=="1"){
			url=MATECH_SYSTEM_WEB_ROOT +"/jingan.do?method=caseInfoEdit&view=${view}&formType=QUERY&editType=update&uuid=" + value;
		}else{
			url = MATECH_SYSTEM_WEB_ROOT + "/jingan.do?method=caseInfoMain&view=${view}&formType=QUERY&editType=update&uuid=" + value;
		}

		tabId=casenumber+"${formType}";
		tabName="${formTypeName}【"+suspectsname+"】";
		
		tabId=casenumber+"${formType}"+ftype;
		if(ftype=="1"){
			tabName="案件单页查看【"+suspectsname+"】";
		}else{
			tabName="案件分类查看【"+suspectsname+"】";
		}
			
		matech.openTab(tabId,tabName,url,true,parent);
	
}

</script>
</head>
<body>

</body>
</html>