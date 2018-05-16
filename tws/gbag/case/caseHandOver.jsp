<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<html>
<head>
<title>案件信息</title>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<script type="text/javascript">

function ext_init() {

	var caseUnHandOverPanel = new Ext.Panel({
		id:'caseUnHandOverPanel',
		title : '未交案',
		layout:'fit',
		region:'center',
		border:true,
		margins:'0 0 0 0',
		html:'<iframe name="caseUnHandOver" id="caseUnHandOver" scrolling="no" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/case.do?method=caseUnHandOverList&flag=${flag}"></iframe>'
	});
	
	
	var caseHandOverConfirmPanel = new Ext.Panel({
		id:'caseHandOverConfirmPanel',
		//title : '案管已确认',
		title : '已交案',
		layout:'fit',
		region:'center',
		border:true,
		margins:'0 0 0 0',
		html:'<iframe name="caseHandOverConfirm" id="caseHandOverConfirm" scrolling="no" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/case.do?method=caseHandOverConfirmList&flag=${flag}"></iframe>'
	});

	var tabs = new Ext.TabPanel({
		id:"tab",
 	   	region:'center',
 	    activeTab: 0,
 	    deferredRender:false,
 	   	autoScroll:true,
 	    items: [caseUnHandOverPanel,caseHandOverConfirmPanel]
 	});
	
	var flag=true;
	var flag2=true;
	tabs.on('tabchange',function(tabTanel,activeTab){
		var id=activeTab.id;
		if(id=="caseUnHandOverPanel"){
			if(flag){
				var doc = Ext.get("caseUnHandOver");
				doc.dom.src ="${pageContext.request.contextPath}/case.do?method=caseUnHandOverList&flag=${flag}";	
				flag=false;
			}
		}
		if(id=="caseHandOverConfirmPanel"){
			if(flag2){
				var doc = Ext.get("caseHandOverConfirm");
				doc.dom.src ="${pageContext.request.contextPath}/case.do?method=caseHandOverConfirmList&flag=${flag}";
				flag2=false;
			}
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

