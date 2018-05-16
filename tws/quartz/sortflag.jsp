<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript">

function ext_init(){
    var treeTbar=new Ext.Toolbar({
		items:[{ 
				text:'返回',
				icon:'${ctx}/tws/css/img/back.gif',
				handler:function(){
						window.location = "${ctx}/quartz.do?method=cronList";
				}
			}]
	});
	
	//加载树
	var tree = new Ext.matech.TreePanel({
		id:'sortCronTree',
		rootId:'root',
		rootText:'规则排序',
		rootVisible:true,
		defaultExpLevel:2,
		region : 'west',
		height:document.body.clientHeight-60,
		sortUrl:'${ctx}/quartz.do?method=updateNodeIndex',
		autoid:'js:quartz.CronSortTree',
		multilevel:false,
		enableDD:true
	});
	
    new Ext.Viewport({
		layout:'border',//布局类型
		items:[{
			region:'center',
			margins:'0 0 0 0',
			cmargins:'0 0 0 0',
			autoScroll:true,
			containerScroll: true, 
	        lines:false,
	        items:[treeTbar,tree]
		}]
    });	
    
}  

Ext.onReady(ext_init);

</script>


</head>
<body>
 
</body>
</html>