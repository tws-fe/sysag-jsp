<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<html>
<head>
<title>案件任务</title>


<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<script type="text/javascript">

function ext_init() {

	var undealTaskPanel = new Ext.Panel({
		id:'undealTaskPanel',
		title : '未完成',
		layout:'fit',
		region:'center',
		border:true,
		margins:'0 0 0 0',
		html:'<iframe name="undealTask" id="undealTask" scrolling="no" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/case.do?method=caseTaskUnDeal&ismyCase=${ismyCase}&flag=${flag} "></iframe>'
	});
	
	var dealTaskPanel = new Ext.Panel({
		id:'dealTaskPanel',
		title : '已完成',
		layout:'fit',
		region:'center',
		border:true,
		margins:'0 0 0 0',
		html:'<iframe name="dealTask" id="dealTask" scrolling="no" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/case.do?method=caseTaskDeal&ismyCase=${ismyCase}&flag=${flag}"></iframe>'
	});
	
	
	var tabs = new Ext.TabPanel({
		id:"tab",
 	   	region:'center',
 	    activeTab: 0,
 	    deferredRender:false,
 	   	autoScroll:true,
 	    items: [undealTaskPanel,dealTaskPanel]
 	});
	
	tabs.on('tabchange',function(tabTanel,activeTab){
		var id=activeTab.id;
		if(id=="undealTaskPanel"){
			var doc = Ext.get("undealTask");
			doc.dom.src ="${pageContext.request.contextPath}/case.do?method=caseTaskUnDeal&ismyCase=${ismyCase}&flag=${flag}";
		}
		if(id=="dealTaskPanel"){
			var doc = Ext.get("dealTask");
			doc.dom.src ="${pageContext.request.contextPath}/case.do?method=caseTaskDeal&ismyCase=${ismyCase}&flag=${flag}";
		}	
	}); 
	
 	new Ext.Viewport({
		layout:'border',
		items:[tabs]
	});
}

Ext.onReady(function(){
	ext_init();
});
</script>

</head>
<body >

</body>
</html>

