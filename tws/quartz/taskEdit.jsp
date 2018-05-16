<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">
//EXT初始化
function ext_init(){
	var _tbar=new Ext.Toolbar({
		items:[  
			{ 
				text:'保存',
				icon:'${ctx}/tws/css/img/save.gif',
				handler:function(){
					save();
				}
			},'-',{
				text:'返回',
				icon:'${ctx}/tws/css/img/back.gif',
				handler:function(){		
			    	window.location = "${ctx}/quartz.do?method=taskList";
				}
			}
		]
	});
	
	var mypanel=new Ext.Panel({
        id: 'contentPanel',
        region:'center',
        tbar:_tbar,
        autoScroll:true,
        width:document.body.clientWidth,
        height:document.body.clientHeight,
        items:[
   	        {contentEl:"taskDiv",id:"contentItem"}
   	    ]
    });	
	
 	new Ext.Viewport({
		layout:'border',
		items:[mypanel]
	});	
	
}
  
Ext.onReady(ext_init);

</script>

</head>
<body>

<div id="taskDiv" >
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/quartz.do?method=taskSave" class="autoHeightExtForm">
		<input type="hidden" name="uuid" id="uuid" value="${quartzTask.uuid}">

		<table align="center" class="editTable" cellspacing="0" cellpadding="0">
			<tr>
				<td class="editTitle" colspan="2">任务管理</td>
			</tr>
					
			<tr>
				<th><span class="mustSpan">任务名称：</span>
				</th>
				<td>
					<input type="text" name="taskName" id="taskName" class="required" size="30" value="${quartzTask.taskName}">
				</td>
			</tr>

			<tr>
				<th><span class="mustSpan">调用接口：</span></th>
				<td><select name="className" id="className" style="width:400px;">
						<c:forEach items="${classList}" var="classws">
							<option value="${classws.name}" <c:if test='${quartzTask.className==classws.name}'> selected="selected" </c:if>>${classws.name}</option>
						</c:forEach>
				</select>
				</td>
			</tr>

			<tr>
				<th>任务参数：</th>
				<td>
					<textarea name="taskParam" id="taskParam" rows="5" cols="80">${quartzTask.taskParam}</textarea>
				</td>
			</tr>
						
			<tr>
				<th><span class="mustSpan">调度规则：</span></th>
				<td>
					<input autoid="js:quartz.CronSortTree"  type="text" name="quartzId" id="quartzId" class="required valuemustexist" size="30" value="${quartzTask.quartzId}" />
				</td>
			</tr>					
								
			<tr>
				<th><span class="mustSpan">任务状态：</span></th>
				<td>
					<input type="checkbox" name="state" value="启用" 
						   <c:if test="${quartzTask.state ne '禁用'}">checked='false'</c:if> 
					/>启用
				</td>
			</tr>
			<tr>
				<th><span class="mustSpan">排序：</span></th>
				<td>
					<input type="text" name="sortFlag" id="sortFlag" class="required validate-positiveInt" size="30" value="${quartzTask.sortFlag}">
				</td>
			</tr>		
			<tr>
				<th >备注：</th>
				<td>
				   <textarea name="remark" id="remark" rows="5" cols="80">${quartzTask.remark}</textarea>
				</td>
			</tr>

		</table>
	</form>
</div>	
 
</body>

<script type="text/javascript">
//保存
function save() {
	if (!formSubmitCheck('thisForm')) {
		return;
	}
	var url="${ctx}/quartz.do?method=taskList";
	matech.formSummit("thisForm",url);
}
</script>
</html>