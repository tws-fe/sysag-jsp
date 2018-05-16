<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>我的首页</title>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
  <style type="text/css">
      html, body {
          font: normal 11px verdana;
      }
      .x-panel-header SPAN{
      	margin-left:5px;
      	font-size:14px;
      }
      .x-panel-header{
      	text-align:left;
      }
  </style>
<script type="text/javascript">

function extinit(){
	
	var bodyWidth =Ext.getBody().getWidth();
	var bodyHeight = Ext.getBody().getHeight();
	
	/*
    var html = "<table><tr>";
    html += '<td>案卷编号：</td>'; 
    html += '<td><input type="text" id="casenumber" name="casenumber"  size=60 autoid="1583" ext_select="1583" ext_type="singleSelect"></td>'; 
    html += '</tr></table>';
    
	var tbar = new Ext.Toolbar({
		height:30,
		border:false,
		width:bodyWidth,
        items:[html]
	});			
	*/
	
	var ftype="${ftype}";
	
	//ftype="police";
	
	if(ftype=="leader"){
	    new Ext.Panel({
	         id:'main-panel',
	         baseCls:'x-plain',
	         renderTo: Ext.getBody(),
	         layout:'table',
	         border:false,
	         layoutConfig: {columns:2},
	         defaults: {frame:false,width:bodyWidth/2,height:bodyHeight/2},
	         items:[new Ext.Panel({
	             title:'快捷方式',
	       		 margins:'0 0 0 0',
	       		 html:'<iframe name="listframe1" id="listframe1"  scrolling="auto" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/tws/gbag/shortCut/shortCutMenu.jsp?&ftype=leader"></iframe>'
	         }),/* {
	             title:'档案归档情况',
	       		 margins:'0 0 0 0',
	       		 html:'<iframe name="listframe2" id="listframe2"  scrolling="auto" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/tws/gbag/filearchiving.jsp"></iframe>'
	         }
	         , *//* new Ext.Panel({
	             title:'办案任务催办',
	       		 margins:'0 0 0 0',
	       		 html:'<iframe name="listframe2" id="listframe2"  scrolling="auto" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/police.do?method=caseTaskSuper&flag=all&ftype=leader"></iframe>'
	         }) , */
	         /* {
	             title:'案件催单',
	       		 margins:'0 0 0 0',
	       		 html:'<iframe name="listframe2" id="listframe2"  scrolling="auto" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/tws/gbag/casetask.jsp?pkey=db5ca9b9ec844cac87600d98eb4c5271"></iframe>'

	         } , */
	         {
	             title:'当月交案',
	       		 margins:'0 0 0 0',
	       		 html:'<iframe name="listframe2" id="listframe2"  scrolling="auto" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/tws/gbag/samemonthmassesishandover.jsp"></iframe>'

	         },{
	             title:'当月群众来访',
	       		 margins:'0 0 0 0',
	       		 html:'<iframe name="listframe2" id="listframe2"  scrolling="auto" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/tws/gbag/samemonthmassesvisit.jsp"></iframe>'

	         },{
	        	 title:'当月案件',
	       		 margins:'0 0 0 0',
	       		 html:'<iframe name="listframe1" id="listframe1"  scrolling="auto" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/tws/gbag/samemonthcase.jsp"></iframe>'
         }]
	     });		
	}else if(ftype=="policeLeader"){
	    new Ext.Panel({
	         id:'main-panel',
	         baseCls:'x-plain',
	         renderTo: Ext.getBody(),
	         layout:'table',
	         border:false,
	         layoutConfig: {columns:1},
	         defaults: {frame:false,width:bodyWidth,height:bodyHeight/2},
	         items:[new Ext.Panel({
	             title:'快捷方式',
	       		 margins:'0 0 0 0',
	       		 html:'<iframe name="listframe1" id="listframe1"  scrolling="auto" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/tws/gbag/shortCut/shortCutMenu.jsp?&ftype=policeLeader"></iframe>'
	         }),new Ext.Panel({
	             title:'案件催办',
	       		 margins:'0 0 0 0',
	       		 html:'<iframe name="listframe2" id="listframe2"  scrolling="auto" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/case.do?method=casePressList&flag=all&ftype=policeLeader"></iframe>'
	         })
	        /*  ,new Ext.Panel({
	             title:'任务督办',
	       		 margins:'0 0 0 0',
	       		 html:'<iframe name="listframe2" id="listframe2"  scrolling="auto" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/police.do?method=caseTaskSuper&flag=all&ftype=policeLeader"></iframe>'
	         }) */
	         ]
	     });		
	}else if(ftype=="manage"){
	    new Ext.Panel({
	         id:'main-panel',
	         baseCls:'x-plain',
	         renderTo: Ext.getBody(),
	         layout:'table',
	         border:false,
	         layoutConfig: {columns:1},
	         defaults: {frame:false,width:bodyWidth,height:bodyHeight/2},
	         items:[new Ext.Panel({
	             title:'快捷方式',
	       		 margins:'0 0 0 0',
	       		 html:'<iframe name="listframe1" id="listframe1"  scrolling="auto" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/tws/gbag/shortCut/shortCutMenu.jsp?&ftype=manage"></iframe>'
	         }),{
	             title:'待入库物品',
	       		 margins:'0 0 0 0',
	       		 html:'<iframe name="listframe2" id="listframe2"  scrolling="auto" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/seizeRes.do?method=storageAffirm"></iframe>'
	         }]
	     });			
	}else{
	    new Ext.Panel({
	         id:'main-panel',
	         baseCls:'x-plain',
	         renderTo: Ext.getBody(),
	         layout:'table',
	         border:false,
	         layoutConfig: {columns:1},
	         defaults: {frame:false,width:bodyWidth,height:bodyHeight/2},
	         items:[new Ext.Panel({
	             title:'快捷方式',
	       		 margins:'0 0 0 0',
	       		 html:'<iframe name="listframe1" id="listframe1"  scrolling="auto" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/tws/gbag/shortCut/shortCutMenu.jsp?&ftype=police"></iframe>'
	         }),{
	             title:'我的案件',
	       		 margins:'0 0 0 0',
	       		 html:'<iframe name="listframe2" id="listframe2"  scrolling="auto" frameborder="0" width="100%" height="100%" src="${pageContext.request.contextPath}/case.do?method=casePressList&flag=police&win=true"></iframe>'
	         }]
	     });		
	}
	
     //initCombox("casenumber");
}

Ext.onReady(extinit); 	
</script>

</head>
<body>

</body>
</html>