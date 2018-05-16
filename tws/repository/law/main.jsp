<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript">

var tree;
var root;

//EXT初始化
function ext_init(){  

	 //根节点
	root = new Ext.tree.AsyncTreeNode({
		id:'root',
		text: '法律法规库',
		expanded:true
	});

	//加载树
	tree = new Ext.matech.TreePanel({
		id:'lawTree',
		region : 'west',
		width : 248,
		autoid:'js:repository.LawType',//后台构造树SQL的ID
		rowData:'false',
		multilevel:'true',
		rootVisible:false,
		attr:'NODEMODIFY',
		onclick:nodeClick,
		root:root
	});
	
	function nodeClick(node){
		var doc = Ext.get("rightFrame");
		
	   	var id = node.id;
        var type=node.attributes.NODEMODIFY;

    	doc.dom.src = "${pageContext.request.contextPath}/law.do?method=list&parentid=" + id + "&type="+type+"&view=${param.view}&rand=" + Math.random();
		
	}

    root.expand();
   
    new Ext.Viewport({
		layout:'border',
		items:[{
			id:'viewport_west',
			region:'west',
			margins:'0 0 0 0',
			split:true,
			cmargins:'0 0 0 0',
			width: 250,
			collapsible: true,
			containerScroll: true, 
        	split:true,
        	collapseMode:'mini',
        	hideCollapseTool : true,
	        lines:false,
	        items:[tree],
	    	listeners:{resize:function(){
	    		if(Ext.getCmp('lawTree')){
	    			Ext.getCmp('lawTree').setWidth(Ext.getCmp('viewport_west').getWidth());
	    			Ext.getCmp('lawTree').setHeight(Ext.getCmp('viewport_west').getHeight());
	    		}
	    	}}
		},{
			region:'center',
			layout:'fit',
			border:true,
			margins:'0 0 0 5',
			html:'<iframe name="rightFrame" id="rightFrame" scrolling="no" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/law.do?method=list&view=${param.view}&id="'+id+'"></iframe>'
		}]
    });
}  

//刷新树
function refreshTree() {
	 //获取选中的节点
	 tree.refresh();
}

Ext.onReady(ext_init);
</script>
</head>
<body >

</body>

</html>