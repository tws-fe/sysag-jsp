<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>案件未交案况表</title>
<script type="text/javascript">

var _grid;
var _toolbar;

Ext.onReady(function(){
	
	if("${flag}"=="police"){
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
	}else{
		
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
						text:'交案确认',
						cls:'x-btn-text-icon', 
						icon:contextPath + btn_img_url + 'edit.png',
						handler:function () {	
							dealCase("31");
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
	}
	
	 		
	
	 _grid= new Ext.matech.grid.GridPanel({
			id:"gridId_caseHandOverList",
			autoid:"js:gbag.casese.CaseHandOverGridJson",
			param:{flag:"${flag}"},		
			currentPage:1,
			singleSelect:true,
			columns:[
						{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
						{id:"TASKSCHEDULE",header:"任务进度",dataIndex:"TASKSCHEDULE",xtype: 'gridcolumn',
							renderer : function(value) {var val = parseInt(value, 10);if (isNaN(val)){val =null;return val;}else{return "<div style='width:100%;background:#fff;border:1px solid #ccc;'><div style='height:12px;width:"+val+"%;background:#77FF00;font-size:10px;'>"+val+"%</div></div>";}},
							width:160,sortable:true,align:"left"},
						{id:"ISHANDOVERNAME",header:"是否交案",dataIndex:"ISHANDOVERNAME",width:100,sortable:true,align:"left"},
				        {id:"REMINDERCJSUM",header:"催交次数",dataIndex:"REMINDERCJSUM",renderer : function(value) {var val=parseInt(value);if (isNaN(val)){val = null;}return val;},width:80,sortable:true,align:"left"},
				        {id:"CASENUMBER",header:"案件编号",dataIndex:"CASENUMBER",width:220,sortable:true,align:"left"},
				        {id:"CASETYPE",header:"案件类型",dataIndex:"CASETYPE",width:100,sortable:true,align:"left"},
				        {id:"CASENATURENAME",header:"案件性质",dataIndex:"CASENATURENAME",width:180,sortable:true,align:"left"},
				        {id:"CASENAME",header:"案件名称",dataIndex:"CASENAME",width:180,sortable:true,align:"left"},
						{id:"STATENAMES",header:"案件状态",dataIndex:"STATENAMES",width:100,sortable:true,align:"left"},
						{id:"_USERNAME_AUDITDIRECTOR",header:"主办民警",dataIndex:"_USERNAME_AUDITDIRECTOR",width:80,sortable:true,align:"left"},
						{id:"BJSJ",header:"报警时间",dataIndex:"BJSJ",width:300,sortable:true,align:"left"},
						{id:"CASEDETAILS",header:"简要案情",dataIndex:"CASEDETAILS",width:220,sortable:true,align:"left"}
							],
				fields:["UUID","TASKSCHEDULE","ISHANDOVERNAME","REMINDERCJSUM","CASENUMBER","CASETYPE","CASENATURENAME","CASENAME","STATENAMES","_USERNAME_AUDITDIRECTOR","BJSJ",
				        "CASEDETAILS","ISSIGN","ORGANID_"],
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
				}			
			}
		}else if(dealType=="10"){
			if (confirm("您确认要签收当前案件吗？")) {
				var url = contextPath + "/case.do?method=caseDeal&r=" + Math.random();
				var request = "&editType=deal&dealType="+dealType+"&uuid=" + value;
				var result = ajaxLoadPageSynch(url, request);
				if(result.indexOf("ok")>-1){
					alert("该案件已签收，请确认！");
					window.location.reload();
				}			
			}
		}else if(dealType=="11"){
			if (confirm("您确认拒绝签收当前案件吗？")) {
				var url = contextPath + "/case.do?method=caseDeal&r=" + Math.random();
				var request = "&editType=deal&dealType="+dealType+"&uuid=" + value;
				var result = ajaxLoadPageSynch(url, request);
				if(result.indexOf("ok")>-1){
					alert("该案件已拒签，请确认！");
					window.location.reload();
				}			
			}
		}else if(dealType=="12"){
			
			if (confirm("您确认当前案件交案吗？")) {
				var url = contextPath + "/case.do?method=caseDeal&r=" + Math.random();
				var request = "&editType=deal&dealType="+dealType+"&uuid=" + value;
				var result = ajaxLoadPageSynch(url, request);
				if(result.indexOf("ok")>-1){
					alert("该案件已交案，请确认！");
					window.location.reload();
				}			
			}
		}else if(dealType=="30"){
			var issign =_grid.chooseValue("ISSIGN");
			/* var issign = document.getElementById("trValueId_"+value).getAttribute('issign'); */
			if (issign != "1") {
				alert("案件尚未签收！");
				return;
			}
			
			if (confirm("您确认对当前案件进行催办吗？")) {
				var url = contextPath + "/case.do?method=caseDeal&r=" + Math.random();
				var request = "&editType=deal&dealType="+dealType+"&uuid=" + value;
				var result = ajaxLoadPageSynch(url, request);
				if(result.indexOf("ok")>-1){
					alert("该案件已催办！");
					window.location.reload();
				}			
			}
		}else if(dealType=="31"){
			
			if (confirm("您确认当前案件已经交案吗？")) {
				var url = contextPath + "/case.do?method=caseDeal&r=" + Math.random();
				var request = "&editType=deal&dealType="+dealType+"&uuid=" + value;
				var result = ajaxLoadPageSynch(url, request);
				if(result.indexOf("ok")>-1){
					alert("该案件交案已确认！");
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



/*
 * 任务分派
 */
function getTask(){
	var value =_grid.chooseValue("UUID");
	
	var flag=("${flag}");
	if (value == "") {
		alert('请选择案件!');
		return;
	} else{
		
	/* 	var issign = document.getElementById("trValueId_"+value).getAttribute('issign');
		if (issign != "1") {
			alert("案件未签收，不允许编辑任务！");
			return;
		} */
		if(flag=="policeLeader"){
			
		}else if(flag=="leader"||flag=="all"){
			flag="policeLeader";
		}else{
			flag="police";
		}
		var url = contextPath + "/case.do?method=caseTaskEdit&editType=update&uuid="+ value+"&flag="+ flag;
		openTab("caseTaskid", "案件任务信息", url, parent.parent);		
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


function printWord(){
	
    var uuid = _grid.chooseValue("UUID");
	
	if (uuid == '') {
		alert("请选择要打印案件的责任指定人文书");
		return;
	}
		extWordPrint('&tables=vw_ga_case1`single`uuid&uuid='+uuid+'&word=zrzd001',uuid);
}



function extWordPrint(param,uuid){
   	//打印
	var url =contextPath+ "/case.do?method=expWord&"+param;
	$.ajax({ 
		async: true, 
		type : "POST", 
		url : url,
    	cache:false,    
		success : function(data) { 
			var t=data;
			try{ 
				downloadOpen(t,uuid);
			}catch(e){alert(e);}
		} 
 	}); 
	
}

function downloadOpen(path,_key){
	var o=police.getWebOffice();
	if (o){
		var uuid=_key;
		var url = police.getlocationhost() +"/"+ path;
		var t=o.funDownloadZipFileAndOpen(url,uuid);
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
						<input name="processor" size=23 type="text" id="processor"  ext_type="singleSelect"  valuemustexist=true   autoid="js:gbag.AuditdirectorPliceLeaderType" refer='${userSession.userId}' value="">
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
<script language="javascript">
$(".autoheight").css("height",document.body.clientHeight-85+"px");

function _restoreSelectCheck(store,records){
	
	var girdcount=0;
	store.each(function(r){
		var remindersum=r.get("REMINDERCJSUM");//催办次数
		if(remindersum>=3){
			Ext.getCmp('gridId_caseUnHandOverList').getView().getRow(girdcount).style.backgroundColor='red';
		}else if(remindersum>="1"&&remindersum<"3"){
			Ext.getCmp('gridId_caseUnHandOverList').getView().getRow(girdcount).style.backgroundColor='orange';
		}
		girdcount=girdcount+1;
	});
}
</script>
</html>