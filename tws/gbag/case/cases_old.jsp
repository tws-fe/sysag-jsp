<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<html>
<head>
<title>案件信息</title>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<script type="text/javascript">

function ext_init() {

	var dealTaskPanel = new Ext.Panel({
		id:'caseUnSummitPanel',
		title : '未呈案',
		layout:'fit',
		region:'center',
		border:true,
		margins:'0 0 0 0',
		html:'<iframe name="caseUnSummit" id="caseUnSummit" scrolling="no" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/case.do?method=caseUnSummitList&flag=${flag}&ismyCase=${ismyCase}"></iframe>'
	});
	
	var undealTaskPanel = new Ext.Panel({
		id:'caseSummitPanel',
		title : '呈案',
		layout:'fit',
		region:'center',
		border:true,
		margins:'0 0 0 0',
		html:'<iframe name="caseSummit" id="caseSummit" scrolling="no" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/case.do?method=caseSummitList&ismyCase=${ismyCase}"></iframe>'
	});
	var alldealTaskPanel = new Ext.Panel({
		id:'allCasePanel',
		title : '所有案件',
		layout:'fit',
		region:'center',
		border:true,
		margins:'0 0 0 0',
		html:'<iframe name="allCase" id="allCase" scrolling="no" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/case.do?method=allCaseList&ismyCase=${ismyCase}"></iframe>'
	});
	
	
	
	
	var tabs = new Ext.TabPanel({
		id:"tab",
 	   	region:'center',
 	    activeTab: 0,
 	    deferredRender:false,
 	   	autoScroll:true,
 	    items: [dealTaskPanel,undealTaskPanel,alldealTaskPanel]
 	});
	
	var flag=true;
	var flag1=true;
	var flag2=true;
	tabs.on('tabchange',function(tabTanel,activeTab){
		var id=activeTab.id;
		if(id=="caseSummitPanel"){
			if(flag){
				var doc = Ext.get("caseSummit");
				doc.dom.src ="${pageContext.request.contextPath}/case.do?method=caseSummitList&flag=${flag}&ismyCase=${ismyCase}";	
				flag=false;
			}
		}
		if(id=="caseUnSummitPanel"){
			if(flag1){
				var doc = Ext.get("caseUnSummit");
				doc.dom.src ="${pageContext.request.contextPath}/case.do?method=caseUnSummitList&flag=${flag}&ismyCase=${ismyCase}";
				flag1=false;
			}
		}
		if(id=="allCasePanel"){
			if(flag2){
				var doc = Ext.get("allCase");
				doc.dom.src ="${pageContext.request.contextPath}/case.do?method=allCaseList&flag=${flag}&ismyCase=${ismyCase}";
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

