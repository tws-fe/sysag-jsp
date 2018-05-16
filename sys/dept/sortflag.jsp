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
						window.location = "${ctx}/dept.do?method=list&unitId=${param.unitId}";
				}
			}]
	});
	
	//加载树
	var tree = new Ext.matech.TreePanel({
		id:'sortUnitTree',
		rootId:'root',
		rootText:'部门排序',
		rootVisible:true,
		defaultExpLevel:2,
		region : 'west',
		height:document.body.clientHeight-30,
		sortUrl:'${ctx}/dept.do?method=updateSort',
		autoid:'js:sys.dept.DeptByUnitId',
		refer:"${param.unitId}",
		multilevel:false,
		enableDD:true
	});
	
    new Ext.Viewport({
		layout:'border',//布局类型
		items:[{
			region:'center',
			margins:'0 0 0 0',
			split:true,
			cmargins:'0 0 0 0',
			autoScroll:true,
			containerScroll: true, 
        	collapseMode:'mini',//是面板折叠时出现一个小箭头
        	hideCollapseTool : true,//设置是否隐藏面板的“展开收缩”按钮,true为隐藏，false表示显示,默认为fasle.和Collapsible属性相对，如果该属性设置为true，则Collapsible失效
	        lines:false,
	        items:[treeTbar,tree]//显示树状菜单
		}]
    });	
    
}  

Ext.onReady(ext_init);

</script>


</head>
<body>
 
</body>
</html>