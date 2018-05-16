<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>案件分派规则编辑页面</title>
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
			    	window.location = "${ctx}/assignrule.do?method=list&unitId=${unitId}";
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
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/assignrule.do?method=assignRuleSave" class="autoHeightExtForm">
		<input type="hidden" name="uuid" id="uuid" value="${assignRule.uuid}">
		<input type="hidden" name="nodeId" id="nodeId" value="${nodeId}">

		<table align="center" class="editTable" cellspacing="0" cellpadding="0">
			<tr>
				<td class="editTitle" colspan="2">案件分派规则管理</td>
			</tr>
					
			<tr>
				<th>分派规则名称：<span class="mustSpan">[*]</span>
				</th>
				<td>
					<input type="text" name="ftitle" id="ftitle" class="required" size="30" value="${assignRule.ftitle}">
				</td>
			</tr>

			<tr>
				<th>分派规则接口：<span class="mustSpan">[*]</span></th>
				<td><select name="ruleclass" id="ruleclass" style="width:500px;">
						<c:forEach items="${classList}" var="class">
							<option value="${class.name}" <c:if test='${assignRule.ruleclass==class.name}'> selected="selected" </c:if>>${class.name}</option>
						</c:forEach>
				</select>
				</td>
			</tr>
	
			<tr>
				<th>所属机构：<span class="mustSpan">[*]</span></th>
				<td>
					<input autoid="js:sys.unit.BasicCtlUnitImpl"  type="text" name="organId" id="organId" class="required " listWidth="600" size="50" value="${unitId}"  multilevel=true listWidth="320" loadAll="false" readOnly />
				</td>
			</tr>					
									
			<tr>
				<th >备注：</th>
				<td> 
				   <textarea name="remark" id="remark" rows="5" cols="80">${assignRule.remark}</textarea>
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
	var url="${ctx}/assignrule.do?method=list&unitId=${unitId}";
	matech.formSummit("thisForm",url);
}
</script>
</html>