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
					window.location="${ctx}/dicNew.do?method=list&ctype="+encodeURI(encodeURI("${ctype}"));
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
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/dicNew.do?method=save" class="autoHeightExtForm">
		<table border="0" cellspacing="0" class="editTable">
			<tr>
				<td class="editTitle"  colspan="2">k_dic维护</td>
			</tr>
			
			<tr>
				<th>名称：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="text" name="Name" id="Name"  value="${dic.name}" >
				</td>
			</tr>
										
			<tr>
				<th  >值：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="text" name="Value" id="Value"  value="${dic.value}" >
				</td>
			</tr>
			
			<tr>
				<th  >所属类型：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="text" name="ctype" id="ctype"  value="${ctype}"  readOnly>
				</td>
			</tr>
			
			<tr>
				<th  >排序：</th>
				<td >
					<input class="required" size="50" type="text" name="property" id="property"  value="${dic.property}" >
				</td>
			</tr>
						
		</table>
		<input name="editType" id="editType" type="hidden" value="${editType}">
		<input name="autoId" id="autoId" type="hidden" value="${autoId}">
	</form>
</div>

</body>

<script type="text/javascript">

function save(){

	matech.formSummit('thisForm',"${ctx}/dicNew.do?method=list&ctype="+encodeURI(encodeURI("${ctype}")),function(){
		parent.refreshTree();
	});
	
}

</script>
</html>