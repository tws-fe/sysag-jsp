<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript">
var tree;

function extInit(){
	//加载树
	tree = new Ext.matech.TreePanel({
		id:'unitTree',
		rootId:'root-dwbm',
		rootText:'所有单位',
		rootVisible:false,
		defaultExpLevel:2,
		region : 'west',
		loadAll:true,
		width : 248,
		autoid:'js:sys.unit.BasicCtlUnitImpl',
		onclick:treeClick
	});
	
    var left = new Ext.Panel({
    	id:'leftPanel',
    	region:'west',
    	split:true,
        containerScroll: true, 
        collapsible: true,
        margins:'0 0 0 0',
        cmargins:'0 0 0 0',
        lines:false,
        collapseMode:'mini',
        hideCollapseTool : true,
        width: 250,
		items:[tree],
		listeners:{resize:function(){
			if(Ext.getCmp('leftPanel')){
				tree.setWidth(Ext.getCmp('leftPanel').getWidth()-2);
				tree.setHeight(Ext.getCmp('leftPanel').getHeight()-3);
			}
		}}
	});
	
	var center = new Ext.Panel({
		layout:'fit',
		region:'center',
		border:true,
		margins:'0 0 0 0',
		html:'<iframe name="listframe" id="listframe" scrolling="no" frameborder="0" width="100%" height="100%" src="${ctx}/dept.do?method=list&unitId=${unitId}"></iframe>'
	});
    	
	new Ext.Viewport({
		layout:'border',
		items:[
			left,
			center
		]
	});
}

function treeClick(node){
	var doc = Ext.get("listframe");
	doc.dom.src = "${pageContext.request.contextPath}/dept.do?method=list&unitId="+node.id+"&rand="+Math.random();
}

Ext.onReady(extInit);

</script>
</head>
<body>
</body>
</html>