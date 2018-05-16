<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>案件信息登记情况表</title>
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
						customQryWinFun('${tableId}');
					}
				},'-',
		      	{
					text:'案件指派',
					cls:'x-btn-text-icon', 
					icon:contextPath + btn_img_url + 'edit.png',
					handler:function () {	
						dealCase("1");
					}
				},'-',		
		      	{
					text:'取消关注',
					cls:'x-btn-text-icon', 
					icon:contextPath + btn_img_url + 'edit.png',
					handler:function () {	
						dealCase("3");
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
			id:"gridId_caseConcernList",
			autoid:"js:gbag.casese.CaseConcernListGridJson",
			param:{flag:"${flag}"},		
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
					/* {id:"ISSIGNNAME",header:"是否签收",dataIndex:"ISSIGNNAME",width:100,sortable:true,align:"left"},
					{id:"ISHANDOVERNAME",header:"是否交案",dataIndex:"ISHANDOVERNAME",width:100,sortable:true,align:"left"}, */
					{id:"BJSJ",header:"报警时间",dataIndex:"BJSJ",width:300,sortable:true,align:"left"},
					{id:"CASEDETAILS",header:"简要案情",dataIndex:"CASEDETAILS",width:220,sortable:true,align:"left"}
						],
			fields:["UUID","TASKSCHEDULE","CASENUMBER","CASETYPE","CASENATURENAME","CASENAME","STATENAMES","_USERNAME_AUDITDIRECTOR","ISSIGNNAME","ISHANDOVERNAME","BJSJ",
			        "CASEDETAILS","ORGANID_"],
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


function getTask(){
	var value =_grid.chooseValue("UUID");
	
	if (value == "") {
		alert('请选择案件!');
		return;
	} else{
		
	/* 	var issign = document.getElementById("trValueId_"+value).getAttribute('issign');
		if (issign != "1") {
			alert("案件未签收，不允许编辑任务！");
			return;
		} */
		
		var url = contextPath + "/case.do?method=caseTaskEdit&editType=update&flag=${flag}&uuid=" + value;
		openTab("caseTaskid", "案件任务信息", url, parent.parent);		
	}
}


function dealCase(dealType){
	var value =_grid.chooseValue("UUID");
	
	if (value == "") {
		alert('请选择案件!');
		return;
	} else{
		if(dealType=="2"){
			if (confirm("您确认要关注当前案件吗？")) {
				var url = contextPath + "/case.do?method=caseDeal&r=" + Math.random();
				var request = "&editType=deal&dealType="+dealType+"&uuid=" + value;
				var result = ajaxLoadPageSynch(url, request);
				if(result.indexOf("ok")>-1){
					alert("该案件已关注，请到【我的关注】确认！");
				}			
			}
		}else if(dealType=="3"){
			if (confirm("您确认要取消关注当前案件吗？")) {
				var url = contextPath + "/case.do?method=caseDeal&r=" + Math.random();
				var request = "&editType=deal&dealType="+dealType+"&uuid=" + value;
				var result = ajaxLoadPageSynch(url, request);
				if(result.indexOf("ok")>-1){
					alert("该案件已取消关注，请确认！");
					/* goSearch_caseUnList_${tableId}(); */
					window.location.reload();
				}			
			}
		}else{
			$("#dealDiv").css("display","");
			$("#uuid").val(value);
			$("#dealType").val(dealType);
			
			getDealWin();				
		}
	}

}


//开始处理
var setDealWin;
function getDealWin(){
if(!setDealWin) { 
	setDealWin = new Ext.Window({
		id:'setDealWin',
     	width: 600,
     	height:230,
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
            icon: contextPath + btn_img_url + 'check.png',
            handler:function(){
        		if (!formSubmitCheck('dealForm')) {
        			return;
        		}
        		var dealType=$("#dealType").val();
        		var uuid=$("#uuid").val();
				var processor=$("#processor").val();
				var curOrganId="${sessionScope.userSession.userOrganId}";
				
				if(processor==""){
					alert("主办民警不允许为空！");
					return;
				}
				
				var url = contextPath + "/case.do?method=caseDeal&r=" + Math.random();
				var request = "&editType=deal&dealType="+dealType+"&uuid=" + uuid+"&processor=" + processor;
				
				var result = ajaxLoadPageSynch(url, request);
				if(result.indexOf("ok")>-1){
					alert("案件已指派，请确认！");
					/* goSearch_caseUnList_${tableId}(); */
					window.location.reload();
				}
				
            	setDealWin.hide();
            }
        }]
    });
} 

setDealWin.show(); 	

}



function add(){
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/jingan.do?method=casePersonEdit&editType=add";

	window.location = url;	
	
}

//编辑
function edit() {
	var value =_grid.chooseValue("UUID");
	if (value == "") {
		alert('请选择要修改的数据!');
		return;

	}
	
	/* var url = MATECH_SYSTEM_WEB_ROOT + "/jingan.do?method=casePersonEdit&editType=update&uuid=" + value;
	
	window.location.href = url; */
}


function remove(){
	var value =_grid.chooseValue("UUID");
	if (value == "") {
		alert('请选择要删除的数据!');
		return;

	} 
	if (confirm("您确认要将删除当前选中的数据吗？")) {
		var url = MATECH_SYSTEM_WEB_ROOT + "/jingan.do?method=casePersonRemove&editType=delete&uuid=" + value;
		window.location.href = url;		
	}

}

</script>
</head>
<body>
<div id="dealDiv" style='display:none;'>
	<form name="dealForm" id="dealForm" method="post" action="" class="autoHeightDiv">
		<table  cellpadding="8" cellspacing="0" style='width:100%;' align="center" class="data_tb" >
			<tr>
				<th class="x-panel-header" colspan="100" style="text-align: center;"></th>
			</tr>
			<tr>
				<td class="data_tb_alignright" align="right" style='' >操作名称：</td>
				<td class="data_tb_content"  style='' >
					<input name="manageway" id="manageway" class="required" type="text" style="width:210px;" value="案件指派"  readOnly>
				</td>
			</tr>			
			<tr>
				<td class="data_tb_alignright" align="right"  style='' >主办民警：</td>
				<td class="data_tb_content"  style='' >
					<c:if test="${flag eq 'policeLeader'}">
						<input name="processor" size=23 type="text" id="processor"  ext_type="singleSelect"  valuemustexist=true ext_select="1510"  autoid="js:gbag.AuditdirectorPliceLeaderType" refer='${userSession.userId}' value="">
					</c:if>
					<c:if test="${flag ne 'policeLeader'}">
						<input name="processor" size=23 type="text" id="processor"   autoid="js:gbag.AuditdirectorType" value="">
					</c:if>		
				</td>
		    </tr>    
		</table>	
		<input type="hidden" id="uuid" name="uuid" value="">
		<input type="hidden" id="dealType" name="dealType" value="">
	</form>
</div>
</body>
</html>