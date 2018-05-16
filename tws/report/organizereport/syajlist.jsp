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
	if("${formType}"=="QUERY"){
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
			}]
		});				
	}else if("${formType}"=="RSJC"){
		_toolbar = new Ext.Toolbar({
			height:30,
			width:Ext.getBody().getWidth(),
			region:'north',
	           items:[   	
	      	{
				text:'人身检查',
				cls:'x-btn-text-icon', 
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					edit();
				}
			},'-',
	      	{
				text:'物品登记',
				cls:'x-btn-text-icon', 
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					edit("wpdj");
				}
			},'-',
	      	{
				text:'快速建档',
				cls:'x-btn-text-icon', 
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					edit("ksjd");
				}
			},'-',			
	      	{
				text:'开等候室',
				cls:'x-btn-text-icon', 
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					openDoor(1);
				}
			},'-',	
	      	{
				text:'开储物柜',
				cls:'x-btn-text-icon', 
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					openDoor(2);
				}
			},'-',							
			{
				text:'查询',
				cls:'x-btn-text-icon',
				icon:'${ctx}/css/theme/default/btn/query.png',
				handler:function () {	
					_grid.customQryWinFun();
				}
			}]
		});			
	}else if("${formType}"=="XXCJ"){
		_toolbar = new Ext.Toolbar({
			height:30,
			width:Ext.getBody().getWidth(),
			region:'north',
	           items:[   	
	      	{
				text:'信息采集',
				cls:'x-btn-text-icon', 
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					edit();
				}
			},'-',
	      	{
				text:'物品登记',
				cls:'x-btn-text-icon', 
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					edit("wpdj");
				}
			},'-',
	      	{
				text:'快速建档',
				cls:'x-btn-text-icon', 
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					edit("ksjd");
				}
			},'-',			
	      	{
				text:'开等候室',
				cls:'x-btn-text-icon', 
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					openDoor(1);
				}
			},'-',	
	      	{
				text:'开储物柜',
				cls:'x-btn-text-icon', 
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					openDoor(2);
				}
			},'-',							
			{
				text:'查询',
				cls:'x-btn-text-icon',
				icon:'${ctx}/css/theme/default/btn/query.png',
				handler:function () {	
					_grid.customQryWinFun();
				}
			}]
		});			
	}else{
		_toolbar = new Ext.Toolbar({
			height:30,
			width:Ext.getBody().getWidth(),
			region:'north',
	           items:[   	
	      	{
				text:'处理',
				cls:'x-btn-text-icon', 
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					edit();
				}
			},'-',
	      	{
				text:'开等候室',
				cls:'x-btn-text-icon', 
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					openDoor(1);
				}
			},'-',	
	      	{
				text:'开储物柜',
				cls:'x-btn-text-icon', 
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					openDoor(2);
				}
			},'-',	
			/*
	      	{
				text:'任务指派',
				cls:'x-btn-text-icon', 
				icon:'${ctx}/css/theme/default/btn/edit.png',
				handler:function () {	
					taskDesign();
				}
			},'-',	
			*/
			{
				text:'查询',
				cls:'x-btn-text-icon',
				icon:'${ctx}/css/theme/default/btn/query.png',
				handler:function () {	
					_grid.customQryWinFun();
				}
			}]
		});	
	}
	
	 _grid= new Ext.matech.grid.GridPanel({
			id:"gridId_caseList",
			autoid:"js:police.CaseInfoGridJson2",
			param:{formType:"${formType}",unitId:"${unitId}"},		
			currentPage:1,
			singleSelect:true,
			columns:[
					{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
			        {id:"DSTATUSNAME",header:"状态",dataIndex:"DSTATUSNAME",width:80,sortable:true,align:"left"},
			        {id:"CASENUMBER",header:"案件编号",dataIndex:"CASENUMBER",width:180,sortable:true,align:"left"},
			        {id:"CASETYPE",header:"案件类型",dataIndex:"CASETYPE",width:100,sortable:true,align:"left"},
			        {id:"CAUSE",header:"案由",dataIndex:"CAUSE",width:180,sortable:true,align:"left"},
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
			fields:["UUID","CASENUMBER","CASETYPE","CAUSE","IDENTITYNUMBER","SUSPECTSNAME","GENDER","BIRTH","NATION","REGISTER_SITE",
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
	
	if(ftype=="ksjd"){
		
		var url = "${pageContext.request.contextPath}/jingan.do?method=casePersonEdit2&formType=${formType}";
		window.location = url;	
		
	}else{
		var value =_grid.chooseValue("UUID");
		if (value == "") {
			alert('请选择嫌疑人!');
			return;
		}
		
		var tabId="${formType}";
		var tabName="${formTypeName}";
		var casenumber=_grid.chooseValue("CASENUMBER");
		var suspectsname=_grid.chooseValue("SUSPECTSNAME");
		
		
		var url = MATECH_SYSTEM_WEB_ROOT + "/jingan.do?method=caseInfoMain&formType=${formType}&editType=update&uuid=" + value;
		if("${formType}"=="BANR"){
			url=MATECH_SYSTEM_WEB_ROOT + "/jingan.do?method=caseInfoEdit&formType=${formType}&editType=update&uuid=" + value;
		}else if("${formType}"=="QUERY"){
			if(ftype=="1"){
				url=MATECH_SYSTEM_WEB_ROOT +"/jingan.do?method=caseInfoEdit&formType=QUERY&editType=update&uuid=" + value;
			}else{
				url = MATECH_SYSTEM_WEB_ROOT + "/jingan.do?method=caseInfoMain&formType=QUERY&editType=update&uuid=" + value;
			}
		}
		
		if(ftype=="wpdj"){
			url=MATECH_SYSTEM_WEB_ROOT + "/jingan.do?method=casePersonUrineAssetEdit&formType=${formType}&editType=update&uuid=" + value;
			tabId=casenumber+"WPDJ";
			tabName="物品登记【"+suspectsname+"】";
		}else{
			tabId=casenumber+"${formType}";
			tabName="${formTypeName}【"+suspectsname+"】";
			
			if("${formType}"=="QUERY"){
				tabId=casenumber+"${formType}"+ftype;
				if(ftype=="1"){
					tabName="案件单页查看【"+suspectsname+"】";
				}else{
					tabName="案件分类查看【"+suspectsname+"】";
				}
			}
		}
		matech.openTab(tabId,tabName,url,true,parent);
	}
}

function openDoor(doorType){
	
	if(doorType=="1"){
		var value =_grid.chooseValue("UUID");
		if (value == "") {
			alert('请选择嫌疑人!');
			return;
		}
		
		if("${isDHSAudit}"=="是"){
			var url = MATECH_SYSTEM_WEB_ROOT + "/jingan.do?method=caseInfoMain&formType=DHS&editType=update&uuid=" + value;
			var casenumber=_grid.chooseValue("CASENUMBER");
			var suspectsname=_grid.chooseValue("SUSPECTSNAME");
			var tabId=casenumber+"DHS";
			var tabName="拘留等候【处理】【"+suspectsname+"】";
			
			matech.openTab(tabId,tabName,url,true,parent);
			
		}else{
			$.ajax({
				type :"Post",
				async:true,
				url : "${ctx}/jingan.do?method=openWaitingDoor",
				data:{"uuid":value,"doorType":doorType},
				success : function(data) {
					result=unescape(data);
					result=Ext.util.JSON.decode(result);
					
					if(result.length>0){
						var doorNum=result[0].awaitdoor_number;
						if(doorNum==""){
							alert("请先到【进入等候室】流程申请需要使用的等候室！");
						}
					}else{
						alert("请先到【进入等候室】流程申请需要使用的等候室！");
					}				
				}
			});				
		}
	}else{
		
		var url="${ctx}/jingan.do?method=casePersonCabinetDoorList";
		
		matech.openTab("opencabinet","打开储物柜",url,true,parent);
		
	}
}

function taskDesign(){
	var value =_grid.chooseValue("UUID");
	if (value == "") {
		alert('请选择嫌疑人!');
		return;
	}
	
	$("#uuid").val(value);
	$("#dealType").val("caseAssign");
	
	getDealWin();
	
}


//开始处理
var setDealWin;
function getDealWin(){
	$("#dealDiv").css("display","");
	
	if(!setDealWin) { 
		setDealWin = new Ext.Window({
			id:'setDealWin',
	     	width: 600,
	     	height:400,
	     	title:'案件指派',
	     	closable:true,
        	closeAction:'hide',
        	contentEl:'dealDiv',
			modal:true,
       	    listeners : {
	         	'hide':{
	         		fn: function () {	         			
	         			setDealWin.hide();
					}
				},'show':{
	         		fn: function () {	         									
					}
				}
	        },
        	layout:'fit',
			buttons:[{
	            text: '确定',
	            icon:'${ctx}/css/theme/default/btn/check.png',
	            handler:function(){

	            	var chkRadio = $('input:radio[name="seluserId"]:checked').val();
					if(chkRadio && chkRadio!=""){
						$("#processor").val(chkRadio);
					}
					
	        		var uuid=$("#uuid").val();
					var processor=$("#processor").val();
					var dealType=$("#dealType").val();
					if(processor==""){
						alert("主办民警不允许为空！");
						return;
					}
					
					var url = "${ctx}/jingan.do?method=caseDeal&r=" + Math.random();
					var request = "&editType=deal&dealType="+dealType+"&uuid=" + uuid+"&processor=" + processor;
					var result = ajaxLoadPageSynch(url, request);
					if(result.indexOf("ok")>-1){
						alert("案件已指派，请确认！");
						_grid.goSearch();
					}
					
	            	setDealWin.hide();
	            }
	        }]
	    });
    } 
	
	setDealWin.show(); 	
	
}

</script>
</head>
<body>

<div id="dealDiv" style="display:none">
	<form name="selectFrom" method="post" action="" id="selectForm" >
		 <table align="center" border="0" >
			<c:forEach var="user" items="${list}" varStatus="status">
			   <c:if test="${status.index%8==0}">
			   		<tr>
			   </c:if>
			   <c:if test="${status.index%8==0}">
			      </tr>
			   </c:if>
			   <td style="width:160px;">
			   		<input id="seluserId" name="seluserId" type="radio" value="${user.id}" />
			   		<span id="span_${user.id}">${user.name}</span>
			   </td> 

			 </c:forEach>      
			 <input type="hidden" name="uuid" id="uuid" value="">   
			 <input type="hidden" name="processor" id="processor" value="">   
			 <input type="hidden" name="dealType" id="dealType" value="">                                                       
		 </table>	 
	 </form>
	
</div>

</body>
</html>