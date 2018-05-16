<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>类型增加</title>
<script type="text/javascript">
//EXT初始化
function ext_init(){
	var _tbar=new Ext.Toolbar({
		region:'north',
		height:30,
		items:[
			{ 
				text:'保存',
				icon:'${ctx}/tws/css/img/save.gif' ,
				handler:function(){
					save();
				}
			},'-',{
				text:'返回',
				icon:'${ctx}/tws/css/img/back.gif' ,
				handler:function(){
				     parent.closeWin();
				}
			}
		]	
	});
	//内容
	var mypanel=new Ext.Panel({
        id: 'contentPanel',
        region:'center',
        border:false,
        autoScroll:true,
        items:[
   	        {contentEl: "content_div",id:"contentItem"}
   	    ]
    });	
 	new Ext.Viewport({
		layout:'border',
		items:[_tbar,mypanel]
	});
} 
Ext.onReady(ext_init);
</script>
</head>
<body>
	<div id="content_div">
		<form name="thisForm" id="thisForm" method="post" action="" class="autoHeightExtForm">
		<table border="0" cellspacing="0" class="editTable">
			<tr>
				<td class="editTitle"  colspan="2">报表配置类型设置</td>
			</tr>
			<tr>
				<th width="120" >报表类型名称：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="text" name="type_name" id="type_name" value="${type_name }"  <c:if test="${nodeType!=null && nodeType!=2 }">readonly="readonly"</c:if> >
				</td>
			</tr>
		</table>
	<input type="hidden" id="reportId" name="reportId" value="${reportId}">
	<input type="hidden" id="opt" name="opt" value="${opt}">
	</form>
	</div>
</body>
<script type="text/javascript">
	//保存
	function save(){
		if(!formSubmitCheck('thisForm')){
			return;
		}
		document.thisForm.action="${ctx}/reportConfig.do?method=saveReportType";
		document.thisForm.submit();
		parent.closeWin();
		//parent.refresh();
	}
</script>
</html>