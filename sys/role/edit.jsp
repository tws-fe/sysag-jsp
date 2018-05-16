<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
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
					window.location="${ctx}/roleNew.do?method=list";
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

<div id="tab1">
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/roleNew.do?method=save" class="autoHeightExtForm">
		<table border="0" cellspacing="0" class="editTable">
			<tr>
				<td class="editTitle"  colspan="2">角色管理</td>
			</tr>
			
			<tr>
				<th>角色ID：<span class="mustSpan">[*]</span></th>
				<td >
					<input size="50" type="text" name="id" id="id"  value="${role.id}" readOnly>
				</td>
			</tr>
										
			<tr>
				<th  >角色名称：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="text" name="roleName" id="roleName"  value="${role.roleName}" >
				</td>
			</tr>
			
			<tr>
				<th >角色功能:</th>
				<td >
				  <input size="50" type="text" name="roleValue" id="roleValue"  value="${role.roleValue}" >
				</td>
			</tr>
			<tr>
				<th>备注：</th>
				<td>
					<textarea rows="10" cols="50" name="remark" id="remark">${role.remark}</textarea>
				</td>
			</tr>			
		</table>
		<input name="editType" id="editType" type="hidden" value="${editType}">
		<input name="roleId" id="roleId" type="hidden" value="${roleId}">
	</form>
</div>

</body>

<script type="text/javascript">

function save(){

	matech.formSummit('thisForm',"${ctx}/roleNew.do?method=list",function(){
		parent.refreshTree();
	});
	
}

</script>
</html>