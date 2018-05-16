<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<style type="text/css">.x-panel-body{border:0px;}</style>
<script type="text/javascript">

var _tbar;
var mypanel; 
function ext_init(){	
	var _tbar=new Ext.Toolbar({
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
					window.location="${ctx}/systemManger.do?method=list";
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
        items:[{contentEl: "tab1",id:"p1",title:"系统管理"}]
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
 	
	if("${sessionScope.userSession.userLoginId}" !="admin"){
		matech.setExtBtnShow(['btn-1'],false);
	}	
}

Ext.onReady(ext_init);

</script>
</head>

<body>
	<div id="tab1">
		<form action="${ctx}/systemManger.do?method=save" method="post" name="thisForm" id="thisForm" enctype="multipart/form-data">
			<%-- <input type="hidden" name="sysid" id="sysid" value="${systemManger.sysid}"> --%>
			<input type="hidden" name="editType" id="editType" value="${editType}">
			
			<table border="0" cellspacing="0" class="editTable" style="width:80%;" >
				<tr style="width:80%;" >
					<td class="editTitle" colspan="3">系统名称管理</td>
				</tr>
				<tr>
				<th>系统编号：<span class="mustSpan">[*]</span></th>
				<td >
					<input style="height: 30px; width: 652px" type="text" name="sysid" id="sysid" class="required validate-alpha"   <c:if test="${editType eq 'update'}">readOnly</c:if> value="${systemManger.sysid}" title="请输入英文，该编号必须唯一！">
				</td>
			   </tr>
				<tr>
				<th>系统名称：<span class="mustSpan">[*]</span></th>
				<td >
					<input style="height: 30px; width: 652px" type="text" name="sysname" id="sysname" class="required"  value="${systemManger.sysname}" >
				</td>
			   </tr>
				<tr>
				<th>备注：</th>
				<td >
					<input style="height: 70px; width: 652px" type="text" name="remark" id="remark"  value="${systemManger.remark}" >
				</td>
			   </tr>
				
			
			</table>
		</form>
		
</div>

</body>
<script type="text/javascript">

//保存
function save() {
	if(!formSubmitCheck('thisForm')){
		return;
	}
	var url="${ctx}/systemManger.do?method=list";
	matech.formSummit("thisForm",url);
	//document.thisForm.submit();
}




</script>
</html>
