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
					saveGroup();
				}
			},'-',{
				text:'返回',
				icon:'${ctx}/tws/css/img/back.gif',
				handler:function(){
					window.location="${ctx}/scheduling.do?method=groupList";
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
        items:[{contentEl: "tab1",id:"p1",title:""}]
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

//Ext.onReady(ext_init);

var __win_html_url = MATECH_SYSTEM_WEB_ROOT + '/tws/scheduling/change_group_sequence.jsp';
var __win_js_url = MATECH_SYSTEM_WEB_ROOT + '/js/itil/shift/change_group_sequence.js';

function _show_change_group_sequence(){
	    var group = new Object();
		group.uuid = 'i';
		group.groupname = document.getElementById('groupname').value;
		group.teamgroupmemberid = document.getElementById('teamgroupmemberid').value;
		if (!group.teamgroupmemberid || group.teamgroupmemberid.length <= 1){
			return;
		}
		group.teamgroupmember = document.getElementById('teamgroupmember').value;	
		
		UpdateSeq.show.call(UpdateSeq, 'memory', [group], true);
};

function _save_operation(){
		document.getElementById('teamgroupmemberid').value = UpdateSeq.member_ids;
		document.getElementById('teamgroupmember').value = UpdateSeq.member_names;
}

Ext.onReady(function(){
	
		mt_init_form_Control();	
	
	    //初始化页面
	    ext_init();
	    
		jQuery.get(__win_html_url,function(html){
			var div = document.getElementById('div-change-group-sequence');
			div.innerHTML = html;
			jQuery.getScript(__win_js_url, function(){
				UpdateSeq.save_operation = _save_operation;
			}); 
			jQuery.getScript(MATECH_SYSTEM_WEB_ROOT + '/js/multiSelect.js');
			document.getElementById('select-groupname').style.width = '200px';
			document.getElementById('select-group-sequence').style.width = '200px';
		});
		
});

</script>
</head>
<body>

<div id="tab1"  style="text-align: center">
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/scheduling.do?method=groupSave" class="schedulingExtForm">
      <table border="0" class="x-window-mc">
		<tbody>
			<tr>
				<th class="x-panel-header" colspan="100">
					班组设置</th>
			</tr>
			<tr>
				<td>
					<label for="groupname">组名：</label></td>
				<td colspan="2">
					<input property="" style="width: 210px; height: 30px" ext_id="groupname"  id="groupname"  ext_name="groupname"  name="groupname"  ext_field="groupname"  field=groupname  ext_maxLength="32"  maxLength=32  ext_type="singleSelect"  type="text" valuemustexist=true  type="text"  ext_validate="required"  class="required"  value = "${shiftGroup.groupname}"  /></td>
			</tr>
			<tr>
				<td>
					<label for="teamgroupmember">班组成员：</label></td>
				<td>
					<input property="" style="width: 210px; height: 27px" ext_id="teamgroupmember"  id="teamgroupmember"  ext_name="teamgroupmember"  name="teamgroupmember"  ext_maxLength="4096"  maxLength=4096  ext_type="text"  type="text"  ext_field="teamgroupmember"  field=teamgroupmember  ext_validate="required"  class="required"  value = "${shiftGroup.teamgroupmember}"   /> <input property="" style="width: 210px; height: 27px" ext_id="teamgroupmemberid"  id="teamgroupmemberid"  ext_name="teamgroupmemberid"  name="teamgroupmemberid"  ext_type="hidden"  type="hidden"  ext_field="teamgroupmemberid"  field=teamgroupmemberid  value = "${shiftGroup.teamgroupmemberid}" /></td>
				<td>
					<div>
						<input onclick="show_selectUser('teamgroupmember','teamgroupmemberid')" style="width: 150px" type="button" value="选班组成员" /></div>
					<div>
						<input onclick="_show_change_group_sequence()" style="width: 150px" type="button" value="改变班组排班顺序" /></div>
				</td>
			</tr>
			<tr>
				<td>
					<label for="shiftid">适用班次：</label></td>
				<td colspan="2">
					<input property="" style="width: 210px; height: 27px" ext_id="shiftid"  id="shiftid"  name="shiftid"  ext_type="multiSelect"  type="text"  multiselect=true  ext_field="shiftid"  field=shiftid  ext_validate="required"  class="required"  autoid="js:sys.ScheduleClass"  value = "${shiftGroup.shiftid}"  /></td>
			</tr>
			<tr>
				<th class="x-panel-header" colspan="100">
					排班规则</th>
			</tr>
			<tr>
				<td>
					<label for="shift_person_number">值班人数：</label></td>
				<td colspan="2">
					<input  style="width: 210px; height: 30px" ext_id="shift_person_number"  id="shift_person_number"  ext_name="shift_person_number"  name="shift_person_number"    maxLength=8   type="text"    field=shift_person_number  ext_validate="validate-positiveInt"  class="validate-positiveInt"  <c:if test="${!empty shiftGroup.shift_person_number }">  value = "${shiftGroup.shift_person_number}" </c:if>  <c:if test="${ empty shiftGroup.shift_person_number}">  value = "1" </c:if> /></td>
			</tr>
			<tr>
				<td>
					<label for="shiftdays">星期几轮班：</label></td>
				<td>
					<input  style="width: 210px; height: 26px"   id="group_shiftdays"  ext_name="group_shiftdays"  name="group_shiftdays"  ext_type="multiSelect"  type="text" valuemustexist=true multiselect=true  ext_field="group_shiftdays"  field=group_shiftdays  autoid="js:sys.ScheduleShift"  value = "${shiftGroup.group_shiftdays}"  />
				</td>
			</tr>
			<tr>
				<td>
					<label for="isfestivalrest">节日休息：</label></td>
				<td>
					<input  style="width: 210px; height: 27px"   id="group_isfestivalrest"  ext_default="根据班次"  ext_type="radio"  type="hidden"  ext_select="0|根据班次|Y|N"  select="0|根据班次|Y|N"  name="group_isfestivalrest"   value = "${shiftGroup.group_isfestivalrest}" />
			     </td>
			</tr>
		</tbody>
	</table>
	<div id="div-change-group-sequence">&nbsp;</div>
		<input name="editType" id="editType" type="hidden" value="${editType}">
		<input name="uuid" id="uuid" type="hidden" value="${uuid}">
	</form>
</div>

</body>

<script type="text/javascript">
 //保存
function saveGroup() {
	if(!formSubmitCheck('thisForm')){
		return;
	}
	var url="${ctx}/scheduling.do?method=groupList";
	matech.formSummit("thisForm",url);
} 

</script>
</html>