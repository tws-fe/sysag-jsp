<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<style type="text/css">
	.x-panel-body{border:0px;}
</style>

<script type="text/javascript">

var _tbar;
var mypanel;

function ext_init(){
	//工具栏
	_tbar=new Ext.Toolbar({
		height:30,
		items:[
			{ 
				id:'btn-1',
				text:'保存',
				icon:'${ctx}/tws/css/img/save.gif',
				handler:function(){
					save();
				}
			},'-',{
				text:'返回',
				icon:'${ctx}/tws/css/img/back.gif',
				handler:function(){
					window.location="${ctx}/scheduleConfig.do?method=list";
				}
			}
		]	
	});
	
	mypanel = new Ext.Panel({
        id: 'contentPanel',
        region:'center',
        width:document.body.clientWidth,
        height:document.body.clientHeight,
        tbar:_tbar,
        autoScroll:true,
        items:[{contentEl: "tab1",id:"p1",title:"基础信息"}]
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

Ext.onReady(ext_init);

</script>
</head>
<body>

<div id="tab1"  style="text-align: center">
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/scheduleConfig.do?method=save" class="sheduleConfigExtForm">
	<table border="0" class="x-window-mc">
		<tbody>
			<tr>
				<th class="x-panel-header" colspan="100">
					轮班班次设置</th>
			</tr>
			<tr>
				<td>
					<label for="shiftname">班次名称：</label></td>
				<td colspan="3">
					<input  style="width: 210px; height: 30px"   id="shiftname"    name="shiftname"   maxLength=50    type="text"   class="required"   autoid="js:BasicDicImpl" refer="班次设置"  noinput="true" multiselect="false"  <c:if test="${!empty shiftManage.shiftname }">  value = "${shiftManage.shiftname}" </c:if>  <c:if test="${ empty shiftManage.shiftname}">  value ="全天班" </c:if>/>
				</td>
			</tr>
			<tr>
				<td>
					<label for="starttime">开始时间：</label></td>
				<td>
					<input  style="width: 210px; height: 27px"   id="starttime"    name="starttime"    maxLength=50    type="text"      class="required"  value = "${shiftManage.starttime}"  /></td>
				<td>
					<label for="endtime">结束时间：</label></td>
				<td>
					<input  style="width: 210px; height: 27px"   id="endtime"    name="endtime"    maxLength=50    type="text"       class="required"  value = "${shiftManage.endtime}"  /></td>
			</tr>
			<tr>
				<td>
					&nbsp;</td>
				<td colspan="3">
					开始和结束时间请以 00:00:00 的 24 小时格式填写，如 08:30:00, 14:00:00, 21:30:00</td>
			</tr>
			<tr>
				<td>
					<label for="shiftdays">星期几轮班：</label></td>
				<td>
					<input  style="width: 210px; height: 26px"   id="shiftdays"    name="shiftdays"   field="shiftdays"     maxLength=32    type="text"  valuemustexist=true multiselect=true   class="required"    autoid="js:BasicDicImpl"  refer="星期与数字对应"    <c:if test="${!empty shiftManage.shiftdays }">  value = "${shiftManage.shiftdays}" </c:if>  <c:if test="${ empty shiftManage.shiftdays}">  value ="1,2,3,4,5,6,7" </c:if>/></td>
				<td>
					<label for="isfestivalrest">节日休息：</label></td>
				<td>
					<input  style="width: 210px; height: 27px"   id="isfestivalrest"    name="isfestivalrest"     ext_type="radio" type="hidden"   class="required"  autoid="js:BasicDicImpl" refer="(Y/N)是与否" type="radio"  type="hidden"  <c:if test="${!empty shiftManage.isfestivalrest }">  value = "${shiftManage.isfestivalrest}" </c:if>  <c:if test="${ empty shiftManage.isfestivalrest}">  value = "y" </c:if>/></td>
			</tr>
			<tr>
				<td>
					<label for="shiftorder">显示顺序：</label></td>
				<td colspan="3">
					<input  style="width: 210px; height: 27px"   id="shiftorder"    name="shiftorder"      maxLength=50    type="text"   class="validate-number"  value = "${shiftManage.shiftorder}"  /></td>
			</tr>
		</tbody>
	</table>
		<input name="editType" id="editType" type="hidden" value="${editType}">
		<input name="uuid" id="uuid" type="hidden" value="${uuid}">
	</form>
</div>

</body>

<script type="text/javascript">


//保存
function save() {
	if(!formSubmitCheck('thisForm')){
		return;
	}

	var url="${ctx}/scheduleConfig.do?method=list";
	matech.formSummit("thisForm",url);
}

</script>
</html>