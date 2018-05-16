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
					window.location="${ctx}/sysScript.do?method=list&scriptId=${scriptId}";
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

//Ext.onReady(ext_init);
Ext.onReady(function(){
    //初始化页面
    ext_init();
    //下拉控件初始化
    mt_init_form_Control();	
	
});

</script>
</head>
<body>

<div id="tab1">
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/sysScript.do?method=editSave" class="autoHeightExtForm">
		<table border="0" cellspacing="0" class="editTable">
			<tr>
				<td class="editTitle"  colspan="6">脚本管理</td>
			</tr>
			<tr>
				<th>文件名：<span class="mustSpan">[*]</span></th>

				<td>
					<input size="50" id="fname"  name="fname"  value = "${sysScript.fname}" readOnly />
				</td>
			</tr>
			<tr>
				<th>文件路径：<span class="mustSpan">[*]</span></th>

				<td>
					<input size="140" id="cpath"  name="cpath"  type="text"     value = "${sysScript.cpath}"  readOnly/>
				</td>
			</tr>
			<tr>
				<th>文件父路径：<span class="mustSpan">[*]</span></th>

				<td>
					<input size="140" id="path"  name="path"  type="text"      value = "${sysScript.path}" readOnly />
				</td>
			</tr>
			<tr>
					<th>文件内容：</th>
					<td >
						<textarea id="fileContent" name="fileContent" rows="26" class="required" cols="90" >${sysScript.fileContent}</textarea>
					</td>
			</tr>
			
		</table>
		<input name="editType" id="editType" type="hidden" value="${editType}">
		<input name="id" id="id" type="hidden" value="${sysScript.id}">
		<input name="scriptId" id="scriptId" type="hidden" value="${scriptId}">
	</form>
	<input type="hidden" id="fieldNameId" name="fieldNameId">
</div>

</body>

<script type="text/javascript">

Ext.onReady(function(){
	new Ext.matech.HTMLEditor({
		applyTo:'fileContent',
		width:1000,
		height:500,
		enableAlignments:true,
		enableColors:true,
		enableFont:true,
		enableFontSize:true,
		enableFormat:true,
		enableLinks:true,
		enableLists:true,
		enbleSourceEdit:true 
	});
});		

function save(){
	
	matech.formSummit('thisForm',"${ctx}/sysScript.do?method=list&scriptId=${scriptId}");
	
}

</script>
</html>