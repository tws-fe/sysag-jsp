<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>案件分派规则列表页面</title>
<script type="text/javascript">
var _grid;
var _toolbar;

function ext_init(){
	_toolbar=new Ext.Toolbar({
		height:30,
		width:Ext.getBody().getWidth(),
		region:'north',
		items:[
				{ 
					text:'新增', 
					iconCls:'form-btn-add',
					icon:'${ctx}/tws/css/img/add.gif',
					handler:function(){
						add();
					}
				},'-',{ 
					text:'修改',
					icon:'${ctx}/tws/css/img/edit.gif',
					handler:function(){
						edit();
					}
				},'-',
				    { 
					text:'删除',
					icon:'${ctx}/tws/css/img/delete.gif',
					handler:function(){
						remove();
					}
				},'-',
				{ 
					text:'查询',
					icon:'${ctx}/tws/css/img/query.gif',
					handler:function(){
						_grid.customQryWinFun('${gridId_asignruleList}');
					}
				}
				]

	});
	
	 _grid= new Ext.matech.grid.GridPanel({
		id:"gridId_asignruleList",
		/* dataUrl:"${ctx}/assignrule.do?method=getGridJson", */
		autoid:"js:gbag.assignrule.AssignRuleGroup",
		param:{unitId:"${unitId}"},		
		currentPage:1,
		singleSelect:true,
		columns:[
				{id:"UUID",freequery:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
		        {id:"FTITLE",freequery:"FTITLE",header:"分派规则",dataIndex:"FTITLE",width:150,sortable:true,align:"left"},
		        {id:"RULECLASS",freequery:"RULECLASS",header:"分派规则所属的类",dataIndex:"RULECLASS",width:400,sortable:true,align:"left"},
		        {id:"ORGANID_",freequery:"ORGANID_",header:"机构ID",dataIndex:"ORGANID_",width:150,sortable:true,align:"left"},
		        {id:"NAME",freequery:"NAME",header:"所属机构",dataIndex:"NAME",width:150,sortable:true,align:"left"}

					],
		fields:["UUID","FTITLE","RULECLASS","ORGANID_","NAME"],
		region: 'center'
	});
	 
	new Ext.Viewport({
		layout:'border',
		items:[
			_toolbar,
			_grid
		]
	});
	
}

Ext.onReady(ext_init);

</script>
</head>

<body>

</body>

<script type="text/javascript">
//增加
 function add() {
	window.location = "${ctx}/assignrule.do?method=assignRuleEdit&editType=add&unitId=${unitId}";
}

 //修改
function edit() {
		var uuid=_grid.chooseValue("UUID");
	   	if(uuid=="" || uuid==null){
			alert("请选择要修改的对象");
			return;
	   	}else{
	   		window.location = "${ctx}/assignrule.do?method=assignRuleEdit&editType=update&unitId=${unitId}&uuid="+uuid;
		}
}
 //删除
function remove() {
	var uuid=_grid.chooseValue("UUID");
   	if(uuid=="" || uuid==null){
		alert("请选择要删除的对象");
		return;
   	}else {
		if(!confirm("确定要删除该对象?")) {
			return;
		}
		matech.ajaxSumit("${ctx}/assignrule.do?method=assignRuleDelete&unitId=${unitId}","uuid="+uuid,false,function(){
			_grid.goSearch();
			window.location.reload();
			/* parent.refreshTree(); */
    	});
	}
} 

</script>
</html>