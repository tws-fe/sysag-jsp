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
					window.location="${ctx}/autoHint.do?method=list";
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
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/autoHint.do?method=save" class="autoHeightExtForm">
		<table border="0" cellspacing="0" class="editTable">
			<tr>
				<td class="editTitle"  colspan="2">下拉配置</td>
			</tr>
					
			<tr>
				<th >ID：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required validate-number" style="height: 27px; width: 651px" type="text" name="id" id="id" value="${autoHint.id}"    <c:if test="${editType eq 'update'}">readOnly</c:if> />
				</td>
			</tr>
			<tr>
				<th>初始化sql：<span class="mustSpan">[*]</span></th>
				<td >
					<input style="height: 77px; width: 652px" type="text" name="strinitsql" id="strinitsql"  value="${autoHint.strinitsql}" >
				</td>
			</tr>
			<tr>
				<th>strsql：<span class="mustSpan">[*]</span></th>
				<td >
					<input style="height: 77px; width: 652px" type="text" name="strsql" id="strsql"  value="${autoHint.strsql}" >
				</td>
			</tr>
			<tr>
				<th>strchecksql：<span class="mustSpan">[*]</span></th>
				<td >
					<input style="height: 77px; width: 652px" type="text" name="strchecksql" id="strchecksql"  value="${autoHint.strchecksql}" >
				</td>
			</tr>
			
			<tr>
				<th>memo：<span class="mustSpan">[*]</span></th>
				<td >
					<input style="height: 77px; width: 652px" type="text" name="memo" id="memo"  value="${autoHint.memo}" >
				</td>
			</tr>
			
			
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

	var url="${ctx}/autoHint.do?method=list";
	matech.formSummit("thisForm",url);
}

</script>
</html>