<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">

	function ext_init(){
		

		//创建工具条
	    var treeTbar=new Ext.Toolbar({
			items:[{ 
				text:'返回',
				icon:'${ctx}/img/back.gif',
				handler:function(){
						window.location = "${pageContext.request.contextPath}/law.do?method=list&parentid=${parentid}";

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
			id:'sortLawTree',
			region : 'west',
			height:document.body.clientHeight-30,
			dataUrl:"${pageContext.request.contextPath}/law.do?method=getList",
			enableDD:true,
			rootVisible : true,
			root:root
		});
		
	    new Ext.Viewport({
			layout:'border',//布局类型
			items:[{
				region:'center',
				margins:'0 0 0 0',
				split:true,
				cmargins:'0 0 0 0',
				autoScroll:true,
				containerScroll: true, 
	        	collapseMode:'mini',//是面板折叠时出现一个小箭头
	        	hideCollapseTool : true,//设置是否隐藏面板的“展开收缩”按钮,true为隐藏，false表示显示,默认为fasle.和Collapsible属性相对，如果该属性设置为true，则Collapsible失效
		        lines:false,
		        items:[treeTbar,tree]//显示树状菜单
			}]
	    });	

	}
	
	Ext.onReady(ext_init);
</script>
</head>
<body>
	
</body>
</html>