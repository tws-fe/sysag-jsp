<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>快捷方式</title>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>

<script type="text/javascript" src="${pageContext.request.contextPath}/tws/gbag/shortCut/DataViewTransition.js"></script> 
<script type="text/javascript" src="${pageContext.request.contextPath}/tws/gbag/shortCut/mt_ext_dataView.js"></script> 
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/tws/gbag/shortCut/animated-dataview.css" />

<script type="text/javascript">

function extinit(){
	var dPanel;
	
	var ftype="${param.ftype}";
	if(ftype==""){
		ftype="${ftype}";
	}
	var autoid="police.json";
	if(ftype=="manage"){
		autoid="manage.json";
	}else if(ftype=="policeLeader"){
		autoid="policeLeader.json";
	}else if(ftype=="leader"){
		autoid="leader.json";
	}
	
    var dataview = new Ext.matech.DataView({
    	autoid:autoid,
    	fields  : ['MENU_CODE','MENU_NAME','MENU_ACTION','ICON'],
    	//imgsrc:'police/shortCut/img/menu/{ICON}',
    	imgsrc:'img/menu/{ICON}',
    	imgtitle:'{MENU_NAME}',
    	imgid:'{MENU_CODE}',
    	imgHeight:130,
    	imgWidth:130,
    	inHeight:70,
    	inWidth:70,
    	refer:'${sessionScope.userSession.userId}',
    	onclick:'openShortCutMenu({MENU_CODE},{MENU_NAME},{MENU_ACTION})'
    });
    
    dPanel=new Ext.Panel({
    	region:'center',
    	border:false,
        layout: 'fit',
        items : dataview
    });
    
	new Ext.Viewport({
		layout:'border',
		items:[dPanel]
	});

}

function openShortCutMenu(id,name,url){
	url="${pageContext.request.contextPath}/"+url;
	openTab(id, name, url, parent.parent);
	//matech.openTab(id,name,url,"否",parent);
	/*
	$("#10001724").html("8");
	$("#10001724").addClass("showicon");
	
	$("#101032").html("");
	$("#101032").removeClass("showicon");
	*/
	
}

Ext.onReady(extinit); 	
</script>
</head>
<body>

</body>
</html>