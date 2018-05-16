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
					window.location="${ctx}/unit.do?method=list&departId=${parentId}";
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
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/unit.do?method=save" class="autoHeightExtForm">
		<table border="0" cellspacing="0" class="editTable">
			<tr>
				<td class="editTitle"  colspan="2">单位管理</td>
			</tr>
			
			<tr>
				<th  >单位ID：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required validate-number" size="50" type="text" name="departId" id="departId"  value="${unit.departId}" >
				</td>
			</tr>
										
			<tr>
				<th  >单位名称：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="text" name="departName" id="departName"  value="${unit.departName}" >
				</td>
			</tr>
						
			<tr>
				<th  >单位简称：<span class="mustSpan">[*]</span></th>
				<td >
					<input  class="required" size="50" type="text" name="standbyName" id="standbyName"  value="${unit.standbyName}">
				</td>
			</tr>

			<tr>
				<th>单位缩写：<span class="mustSpan">[*]</span></th>
				<td>
					<input  class="required" size="50" type="text" name="departEnName" id="departEnName"  value="${unit.departEnName}">
				</td>
			</tr>
						
			<tr>
				<th >上级单位:</th>
				<td >
				  <input autoid="js:sys.unit.BasicCtlUnitImpl" listWidth="600" id="parentDepartId" name="parentDepartId" size="50" value="${unit.parentDepartId}" multilevel=true listWidth="320" loadAll="false" />
				</td>
			</tr>
			
			<tr>
				<th >联系人：</th>
				<td>
					 <input type="text" size="50" name="linkMan" id="linkMan"  value="${unit.linkMan }" />
				</td>
			</tr>	
			<tr>
				<th >联系电话：</th>
				<td>
					 <input type="text" size="50" name="phone" id="phone"  class="phonenumber-wheninputed" value="${unit.phone}" />
				</td>
			</tr>			
			<tr>
				<th >单位地址：</th>
				<td >
					<input size="50" type="text" name="address" id="address"  value="${unit.address}">
				</td>
			</tr>
			<tr>
				<th >数据权限:</th>
				<td >
				  <input autoid="js:sys.unit.BasicCtlUnitImpl" listWidth="600" id="ctlDepartId" name="ctlDepartId" size="50" value="${unit.ctlDepartId}" multilevel=true listWidth="320" loadAll="false" />
				</td>
			</tr>			
		</table>
		<input name="editType" id="editType" type="hidden" value="${editType}">
		<input name="parentId" id="parentId" type="hidden" value="${parentId}">
	</form>
</div>

</body>

<script type="text/javascript">

function save(){
	if($("#editType").val() == "update"){
		if($("#departId").val()==Ext.getCmp("parentDepartId").getValue()){
			alert("上级单位不能为当前修改单位,请重新选择!");
			return;
		}		
	}
	
	matech.formSummit('thisForm',"${ctx}/unit.do?method=list&departId=${parentId}",function(){
		if("${editType}"=="add"){
			parent.refreshTree();
		}
	});
	
}

</script>
</html>