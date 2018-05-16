<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>日志管理</title>
<script type="text/javascript">
	
	var tree;
	var root ;

	function ext_init(){
	    //根节点
		root = new Ext.tree.AsyncTreeNode({
			id:'root',
			text: '日志类型',
			expanded:true
		});
		//加载树
		tree = new Ext.matech.TreePanel({
			id:'folderTypeTree',
			region : 'west',
			width : 248,
			autoid:'js:sys.LogType',//后台构造树SQL的ID
			multilevel:'false',//是否多级展开树
			checked:'false',//是否显示选择框
			root:root
		});
	    
	    tree.on('click',function(node,event){
	    	 event.stopEvent();
	    	 var doc = Ext.get("listframe");
	    	
	    	if (!node.isLeaf()){	
	    		//非叶子
				//刷新非叶子
				node.expand();
			}
	    	 doc.dom.src = "${pageContext.request.contextPath}/sysLog.do?method=list&typeId="+node.id+"&rand="+Math.random();
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
				//左面板随窗口变化时要同时调整树容器
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
			html:'<iframe name="listframe" id="listframe" scrolling="no" frameborder="0" width="100%" height="100%" src="${ctx}/sysLog.do?method=list&typeId=3"></iframe>'
		});
	    	
		new Ext.Viewport({
			layout:'border',
			items:[
				left,
				center
			]
		});
		
}

	Ext.onReady(ext_init);
</script>
</head>
<body>

</body>
</html>