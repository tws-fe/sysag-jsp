<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">
var _tbar;
function ext_init(){
	//工具栏
	_tbar=new Ext.Toolbar({
		items:[
			{   id:'btn-1',
				text:'保存',
				icon:'${ctx}/tws/css/img/save.gif',
				handler:function(){
				 	save();
				}
			},'-',{
				id:'btn-2',
				text:'返回',
				icon:'${ctx}/tws/css/img/back.gif',
				handler:function(){
					window.location = "${ctx}/quartz.do?method=cronList";
				}
			}
		]
	});
	//内容
	var mypanel=new Ext.Panel({
        id: 'contentPanel',
        region:'center',
        width:document.body.clientWidth,
        height:document.body.clientHeight,
        tbar:_tbar,
        autoScroll:true,
        items:[
   	        {contentEl: "content_div",id:"contentItem"}
   	    ]
    });	
	
 	var layout = new Ext.Viewport({
		layout:'border',
		items:[{
				region:'center',
	    		id:'center-panel',
	    		margins:'0 0 0 0',
	    		layout:'border',
	    		lines:true,
	    		items:[mypanel]
			}
		 ]
	});
 	layout.doLayout();
 	
}

function cronTypeChange(obj){
	if(obj.value=="1"){
		$("#cronName").attr("disabled","true");
		$("#cronStr").attr("disabled","true");
	}else{
		$("#cronName").attr("disabled","");
		$("#cronStr").attr("disabled","");
	}
}


Ext.onReady(ext_init);
</script>
</head>
<body>
<div id="content_div">
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/quartz.do?method=cronSave" class="autoHeightExtForm">
		<table align="center" border="0" cellspacing="0" class="editTable">
			<tr>
				<td class="editTitle"  colspan="2">调度规则管理</td>
			</tr>
			<tr>
				<th >规则类型：</th>
				<td >
					<input size="50" autoid="js:quartz.CronType" class='required' type="text" name="cronType" id="cronType" listWidth="350" noinput="true" value="${cronInfo.cronType}" onselect="cronTypeChange(this);">
				</td>
			</tr>
			<tr>
				<th >规则名称：</th>
				<td >
					<input  size="50" type="text" class='required' name="cronName" id="cronName" value="${cronInfo.cronName}" >
				</td>
			</tr>
			<tr>
				<th >规则表达式：</th>
				<td >
					<input class='required' size="50" type="text" name="cronStr" id="cronStr" value="${cronInfo.cronStr}" >
				</td>
			</tr>
			<tr>
				<th >表达式说明:</th>
				<td style="font-size:12px;color:red">
					秒(0~59)/分钟(0~59)/小时(0~23)/天(月)(0~31)/月(0~11)/天(星期)(1~7 1=SUN)/年份(1970－2099) 
				</td>
			</tr>			
			<tr>
				<th >备注:</th>
				<td >
					<textarea rows="7" cols="48" name="remark" id="remark">${cronInfo.remark}</textarea>
				</td>
			</tr>				
		</table>
		
		<input name="editType" id="editType" type="hidden" value="${editType }">
		<input name="uuid" id="uuid" type="hidden" value="${cronInfo.uuid}">

		<br>
	</form>
</div>
	
</body>

<script type="text/javascript">
if("${cronInfo.cronType}"=="1"){
	$("#cronName").attr("disabled","true");
	$("#cronStr").attr("disabled","true");
}
if("${cronInfo.cronType}"==""){
	$("#cronType").val("0");
}

function save(){
	if (!formSubmitCheck('thisForm')) {
		return;
	}
	if("${cronInfo.cronType}"=="0"){
		if(!validExpression()){
			alert("规则表达式错误，请核实！");
			return;
		}
	}
	matech.formSummit('thisForm',"${ctx}/quartz.do?method=cronList");
}

function validExpression(){
	var url="${ctx}/quartz.do?method=validExpression";
	var request="cronstr="+$("#cronStr").val();
	var result=ajaxLoadPageSynch(url,request);
	
	if(result=="1"){
		return true;
	}else{
		return false;
	}
}
</script>
</html>