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
					window.location="${ctx}/autoCode.do?method=list&unitId=${unitId}";
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
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/autoCode.do?method=save" class="autoHeightExtForm">
		<table border="0" cellspacing="0" class="editTable">
			<tr>
				<td class="editTitle"  colspan="2">全局自动编码【所有单位】</td>
			</tr>
										
			<tr>
				<th  >类型[英文]：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="text" name="atype" id="atype"  value="${autoCode.atype}" >
				</td>
			</tr>
			<tr>
				<th  >类型[中文]：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="text" name="typename" id="typename"  value="${autoCode.typename}" >
				</td>
			</tr>			
			<tr>
				<th  >记数器：<span class="mustSpan">[*]</span></th>
				<td >
				  <input class="required" size="50" type="text" name="curnum" id="curnum"  value="${autoCode.curnum}" >
				</td>
			</tr>
			<tr>
				<th  >长度：<span class="mustSpan">[*]</span></th>
				<td >
				  <input class="required" size="50" type="text" name="showlen" id="showlen"  value="${autoCode.showlen}" >
				</td>
			</tr>	
			<tr>
				<th  >初始值：<span class="mustSpan">[*]</span></th>
				<td >
				  <input class="required" size="50" type="text" name="initnum" id="initnum"  value="${autoCode.initnum}" >
				</td>
			</tr>
			<tr>
				<th  >模板：<span class="mustSpan">[*]</span></th>
				<td >
				  <input class="required" size="50" type="text" name="format" id="format"  value="${autoCode.format}" >
				</td>
			</tr>	
			<tr>
				<th  >标志[日|月|年]：</th>
				<td >
				  <input size="50" type="text" name="flag" id="flag"  value="${autoCode.flag}" >
				</td>
			</tr>	
			<tr>
				<th  >当前标志值：<span class="mustSpan">[*]</span></th>
				<td >
				  <input size="50" type="text" name="judge" id="judge"  value="${autoCode.judge}" >
				</td>
			</tr>
			<tr>
				<th>是否保存到子表:</th>
				<td>
				  <input autoid="com.tws.impl.autoHitSelect.constant.IsOrNot" id="state" name="state" size="50" value="${autoCode.state}" />
				</td>
			</tr>																													
			<tr>
				<th>说明：</th>
				<td>
					<textarea rows="3" cols="50" name="property" id="property">${autoCode.property}</textarea>
				</td>
			</tr>
						
		</table>
		<input name="editType" id="editType" type="hidden" value="${editType}">
		<input name="unitId" id="unitId" type="hidden" value="${unitId}">
		<input name="uuid" id="uuid" type="hidden" value="${autoCode.uuid}">
	</form>
</div>

</body>

<script type="text/javascript">

function save(){
	
	matech.formSummit('thisForm',"${ctx}/autoCode.do?method=list&unitId=${unitId}");
	
}

</script>
</html>