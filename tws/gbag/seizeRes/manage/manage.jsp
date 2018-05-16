<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<html>
<head>
<title>物品处置</title>


<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<script type="text/javascript">

function ext_init() {
	//内容
	
	var undealStorepanel = new Ext.Panel({
		id:'undealStorePanel',
		title : '未处置列表',
		layout:'fit',
		region:'center',
		border:true,
		margins:'0 0 0 0',
		html:'<iframe name="undealStore" id="undealStore" scrolling="no" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/seizeRes.do?method=manageUnDeal"></iframe>'
	});
	
	var dealStorepanel = new Ext.Panel({
		id:'dealStorePanel',
		title : '已处置档案/物品',
		layout:'fit',
		region:'center',
		border:true,
		margins:'0 0 0 0',
		html:'<iframe name="dealStore" id="dealStore" scrolling="no" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/seizeRes.do?method=manageUnDeal"></iframe>'
	});
	
	
	var tabs = new Ext.TabPanel({
		id:"tab",
 	   	region:'center',
 	    activeTab: 0,
 	    deferredRender:false,
 	   	autoScroll:true,
 	    items: [undealStorepanel,dealStorepanel]
 	});
	
	tabs.on('tabchange',function(tabTanel,activeTab){
		var id=activeTab.id;
		if(id=="undealStorePanel"){
			var doc = Ext.get("undealStore");
			doc.dom.src ="${pageContext.request.contextPath}/seizeRes.do?method=manageUnDeal";
		}
		if(id=="dealStorePanel"){
			var doc = Ext.get("dealStore");
			doc.dom.src ="${pageContext.request.contextPath}/seizeRes.do?method=manageDeal";
		}		
	}); 
	
 	new Ext.Viewport({
		layout:'border',
		items:[tabs]
	});
}

Ext.onReady(function(){
	ext_init();
})
</script>

</head>
<body >

</body>
</html>

