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
					window.location="${ctx}/notice.do?method=list&unitId=${unitId}";
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
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/stock.do?method=save" class="autoHeightExtForm">
		<table border="0" cellspacing="0" class="editTable">
			<tr>
				<td class="editTitle"  colspan="2">库存管理</td>
			</tr>
			
			<tr>
				<th>产品编号：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="text" name="productNumber" id="productNumber"  value="${stock.productNumber}" >
				</td>
			</tr>
										
			<tr>
				<th  >名称：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="text" name="productName" id="productName"  value="${stock.productName}" >
				</td>
			</tr>
			
			<tr>
				<th  >产品类型：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="text" name="productType" id="productType"  value="${stock.productType}" >
				</td>
			</tr>
			
			<tr>
				<th  >数量：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="text" name="number" id="number"  value="${stock.number}" >
				</td>
			</tr>
			
			<tr>
				<th  >原厂商：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="text" name="oldProvider" id="oldProvider"  value="${stock.oldProvider}" >
				</td>
			</tr>
			
			<tr>
				<th >所属单位:</th>
				<td >
				  <input autoid="js:sys.unit.BasicCtlUnitImpl" listWidth="600" id="organId_" name="organId_" size="50" value="${stock.organId_}" multilevel=true listWidth="320" loadAll="false" readOnly/>
				</td>
			</tr>
			
		</table>
		<input name="editType" id="editType" type="hidden" value="${editType}">
		<input name="unitId" id="unitId" type="hidden" value="${unitId}">
		<input name="uuid" id="uuid" type="hidden" value="${stockId}">
	</form>
</div>

</body>

<script type="text/javascript">

function save(){

	matech.formSummit('thisForm',"${ctx}/stock.do?method=list&unitId=${unitId}",function(){
		parent.refreshTree();
	});
	
}

</script>
</html>