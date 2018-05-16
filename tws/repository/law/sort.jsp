<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript">

	function ext_init(){
		

		//创建工具条
	    var treeTbar=new Ext.Toolbar({
	    	region : 'north',
	    	height:30,
			items:[{ 
				text:'返回',
				icon:'${ctx}/tws/css/img/back.gif',
				handler:function(){
					window.location = "${ctx}/law.do?method=lawTypeLists";
				}
			}]
		});
		
		
	    //根节点
		var root = new Ext.tree.AsyncTreeNode({
			id:'root',
			text: '分类排序',
			expanded:true
		});
		//加载树
		var tree = new Ext.matech.TreePanel({
			id:'sortControlTree',
			region : 'center',
			dataUrl:"${ctx}/general.do?method=getTreeJsonData",
			sortUrl:'${ctx}/law.do?method=updateLawTypeSort',
			autoid:'js:repository.LawTypeByParentId',
			rowData:'false',
			refer:"${param.parentId}",
			multilevel:false,
			enableDD:true,
			rootVisible : true,
			root:root
		});
		
	    new Ext.Viewport({
			layout:'border',
			items:[treeTbar,tree]
	    });	

	}
	
	Ext.onReady(ext_init);
</script>
</head>
<body>
	
</body>
</html>