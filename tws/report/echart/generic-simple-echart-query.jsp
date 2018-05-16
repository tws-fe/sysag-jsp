<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>${title}</title>	
</head>
<body>
	
	<form id="thisForm" name="thisForm" method="post"  >
		<input type="hidden" id="reportparam" name="reportparam"  />
	</form>
	<div id="div-window-query">
	</div>
</body>

<script>

var window_query;

var title = '${title}';
var reportid = '${reportid}'
var birtname = '${birtname}';

var paramformid = '${paramformid}';
var reporthtml = '${reporthtml}';
var propert = '${property}';


function window_query_show(){
	isSave = false;
	if(!window_query) { 
	    window_query_init();
    }
 	window_query.show(); 
};

function window_query_init(){
	var url = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=formView&formId=${paramformid}&formTypeId=${paramformtypeid}&tabCount=0&uuid=${formuuid}&act=add&show=false&rand=" + Math.random();
	
	var d_size = DomUtil.init().getDocumentSize();
	
	
	window_query = new Ext.Window({
     	renderTo : 'div-window-query',
     	width: d_size.width * 0.75,
     	id : 'window_query',
     	height : d_size.height * 0.75,
     	x : d_size.width * 0.125,
     	y : d_size.height * 0.125,
     	title : title,
     	closable : 'false',
    	closeAction : 'hide',
       	html:'<iframe name="iframe-window-query" id="iframe-window-query" scrolling="auto" frameborder="0" width="100%" height="100%" src="' + url + '"></iframe>',
    	layout:'fit',
    	buttons:[{
        	text:'确定',
      		handler:function(){
           		var iframe = window.frames['iframe-window-query'];  
           		serialize_window_param(iframe);
           		
           		/* var url = "${pageContext.request.contextPath}/report.do?method=birt&uuid=" + document.getElementById("uuid").value;
           		url += "&w=${width}&h=${height}"; */
           		
           		var url = MATECH_SYSTEM_WEB_ROOT + "/echart.do?method=generic_echart&reportid=" + reportid + "&birtname=" + birtname ;
           		/* window.location.href = url; */
           		document.thisForm.action = url;
				document.thisForm.submit();
        	}
      		
    	}]
    });
};

function serialize_window_param(frame){
	var inputs = frame.document.getElementsByTagName('input');
	var selects = frame.document.getElementsByTagName('select');
	var textareas = frame.document.getElementsByTagName('textarea');
	
	var element, e, params = "";
	var id, value;
	for(element in selects) {
		if (element == 'length') continue;
		inputs[element] = selects[element];
	}
	for(element in textareas) {
		if (element == 'length') continue;
		inputs[element] = textareas[element];
	}
	for(element in inputs){
		e = inputs[element];
		if ((e.style && e.style.display == 'none'))
			continue;
		id = e.id;
		//var selectCmp = Ext.getCmp(id) ;
	/* 	var a = document.getElementById(id).value;
		alert(a); */
		value = e.value;
		//alert(e);
		if (!id) 
			continue;
		if (id.indexOf("ext-gen") >= 0){
			id = e.inputId;
			if (value.indexOf('请选择') >= 0){
				value = '';	
			}
		}
		value = value ? value : '';
		//value = encodeURIComponent(value);
		params = params + '&' + id + '=' + value;
	}
	document.getElementById("reportparam").value = params;
}

Ext.onReady(function(){
	window_query_show();
});
</script>
</html>