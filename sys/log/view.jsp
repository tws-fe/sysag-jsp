<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>查看文件日志</title>

<script type="text/javascript">

var _tbar;
function ext_init(){
	_tbar=new Ext.Toolbar({
		region:'north',
		height:30,
		items:[{
					text:'返回',
					cls:'x-btn-text-icon',
					icon:'${pageContext.request.contextPath}/img/back.gif',
					handler:function(){
						window.location.href="${ctx}/sysLog.do?method=list&typeId=${typeId}";
					}
			}
		]	
	});
	
	
	//内容
	var mypanel=new Ext.Panel({
        id: 'contentPanel',
        region:'center',
        border:false,
        autoScroll:true,
        items:[
   	        {contentEl: "content_div",id:"contentItem"}
   	    ]
    });	
	
 	new Ext.Viewport({
		layout:'border',
		items:[_tbar,mypanel]
	});
	
	
}
Ext.onReady(ext_init);
</script>
</head>
<body>
<div id="content_div" style="margin:20 20 4 20;color: red;border:none;">
${str}
</div>

</body>
</html>