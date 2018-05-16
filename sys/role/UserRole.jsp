<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript">

var tree;
var root;

function ext_init(){
	var toolbar=new Ext.Toolbar({
		region : 'north',
		height:30,
		items:[
			{ 
				text:'保存',
				icon:'${ctx}/tws/css/img/save.gif',
				handler:function(){
					  save();
				}
			},'-'
		]
	});
	
	root=new Ext.tree.AsyncTreeNode({
		id:'root',
		text: '所有用户',
		expanded:true
	});
	
	tree = new Ext.matech.TreePanel({
		id:'popeTree',
		region : 'center',
		autoid:'js:sys.user.UserRoleByUnitId',
		multilevel:'true',//是否多级展开树
		checked:'true',//是否显示选择框
		refer:'${unitId}',
		refer1:'${roleId}',
		cascadeParent:false,
		loadAll:'true',
		cascadeParent:false,
		cascadeChildren:false,
		loadEvent:stopWaiting,
		checkSelect:false,
		refresh:refresh,
		tbar:toolbar,
		root:root
	});

	matech.cascadeInit(true,true);
	
	tree.expandAll();

    var center = new Ext.Panel({
    	id:'leftPanel',
    	region:'center',
    	split:true,
        containerScroll: true, 
        collapsible: true,
        margins:'0 0 0 0',
        cmargins:'0 0 0 0',
        lines:false,
        collapseMode:'mini',
        hideCollapseTool : true,
		items:[tree],
		listeners:{resize:function(){
			//左面板随窗口变化时要同时调整树容器
			if(Ext.getCmp('leftPanel')){
				tree.setWidth(Ext.getCmp('leftPanel').getWidth()-2);
				tree.setHeight(Ext.getCmp('leftPanel').getHeight()-3);
			}
		}}
	});

	new Ext.Viewport({
		layout:'border',
		items:[
			center
		]
	});
}

function stopWaiting(){
	matech.stopWaiting();
}

function refresh(){
	tree.root.reload();
	tree.expandAll();
}

Ext.onReady(ext_init);

</script>
</head>

<body>
	
</body>
<script type="text/javascript">
function save(){
	matech.showWaiting("100%","100%");
	
	var pope=tree.getLeafCheckedNoteStr();
	
	var url = "${pageContext.request.contextPath}/roleNew.do?method=userRoleSave";	 
	$.ajax({
		cache: false,
		type: "POST",
		url:url,
		data:{roleId:"${roleId}",unitId:"${unitId}",pope:pope},
		async:true,
		error: function(request) {
			alert("授权失败，请重试");
			matech.stopWaiting();
		},
		success: function(data) {
			result=unescape(data);
			if(result == "ok"){
				alert("授权成功");
				refresh();
				matech.stopWaiting();
			}else{
				alert("授权失败，请重试");
				matech.stopWaiting();
			}
		}
	});	

}
</script>
</html>