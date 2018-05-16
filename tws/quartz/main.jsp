<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript">
var tree;
var root;

function extInit(){
	root = new Ext.tree.AsyncTreeNode({
		id:'root',
		text: '调度器组',
		expanded:true
	});
	
	tree = new Ext.matech.TreePanel({
		id:'userTree',
		region : 'west',
		width : 248,
		autoid:'js:quartz.QuartzGroup',
		root:root,
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
		autoScroll:false,
		margins:'0 0 0 0',
		html:'<iframe name="scheduleListframe" id="scheduleListframe" scrolling="no" frameborder="0" width="100%" height="100%" src="${ctx}/quartz.do?method=list"></iframe>'
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
	Ext.get("scheduleListframe").dom.src = "${ctx}/quartz.do?method=list&nodeId=" + node.id+"&rand=" + Math.random();
}

function refreshTree() {
	 tree.refresh();
}

Ext.onReady(extInit);
</script>
</head>
</body>
</html>