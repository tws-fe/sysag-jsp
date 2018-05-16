<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<title>报表配置信息及分类</title>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<script type="text/javascript">

function ext_init() {

	var reportConfigPanel = new Ext.Panel({
		id:'reportConfig',
		title : '配置管理',
		layout:'fit',
		region:'center',
		border:true,
		margins:'0 0 0 0',
		html:'<iframe name="reportConfig" id="reportConfig" scrolling="no" frameborder="0" width="100%" height="100%" src="${ctx}/reportConfig.do?method=main&flag=${flag}"></iframe>'
	});
	
	var reportTypePanel = new Ext.Panel({
		id:'reportType',
		title : '类别管理',
		layout:'fit',
		region:'center',
		border:true,
		margins:'0 0 0 0',
		html:'<iframe name="reportType" id="reportType" scrolling="no" frameborder="0" width="100%" height="100%" src="${ctx}/reportConfig.do?method=reportTypeLists&flag=${flag}"></iframe>'
	});

	var tabs = new Ext.TabPanel({
		id:"tab",
 	   	region:'center',
 	    activeTab: 0,
 	    deferredRender:false,
 	   	autoScroll:true,
 	    items: [reportConfigPanel,reportTypePanel]
 	});
	
	var flag=true;
	var flag2=true;
	tabs.on('tabchange',function(tabTanel,activeTab){
		var id=activeTab.id;
		if(id=="reportConfigPanel"){
			if(flag){
				var doc = Ext.get("reportConfig");
				doc.dom.src ="${ctx}/reportConfig.do?method=main&flag=${flag}";	
				flag=false;
				reportConfigPanel.doLayout(); 
				
			}
		}
		if(id=="reportTypePanel"){
			if(flag2){
				var doc = Ext.get("reportType");
				doc.dom.src ="${ctx}/reportConfig.do?method=reportTypeLists&flag=${flag}";
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

