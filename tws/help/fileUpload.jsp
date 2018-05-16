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
				text:'关闭',
				icon:'${ctx}/tws/css/img/close.gif',
				handler:function(){
					parent.closeWin();
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
        items:[{contentEl: "tab1",id:"p1"}]
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
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/policeCommon.do?method=saveImport" class="autoHeightExtForm">
		<table border="0" cellspacing="0" class="editTable">
			<tr>
				<td class="editTitle"  colspan="2">文件上传</td>
			</tr>							
			<tr>
				<th>导入文件：<span class="mustSpan">[*]</span></th>
				<td>
				   <input type="hidden" name="attachId" id="attachId" value="${param.uuid}" ext_type="attachFile" 
				   maxAttach="1"  indexTable="UploadFile" buttonText="上传文件"  handler="CommonHandler" saveToDB="false"/>
				</td>
			</tr>
		</table>
		<input name="indexTable" id="indexTable" type="hidden" value="UploadFile">
	</form>
</div>

</body>

<script type="text/javascript">

function save(){
	matech.formSummit('thisForm',null,function(){
		parent.closeWin();
	});
	
}

</script>
</html>