<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript">
var _grid;
var _toolbar;

function ext_init(){
	_toolbar=new Ext.Toolbar({
		height:30,
		width:Ext.getBody().getWidth(),
		region:'north',
		items:[{ 
			    id:'btn-1',
				text:'新增', 
				icon:'${ctx}/tws/css/img/add.gif',
				handler:function(){
					add();
				}
			}
			,'-',{ 
				id:'btn-2',
				text:'修改',
				icon:'${ctx}/tws/css/img/edit.gif',
				handler:function(){
					edit();
				}
			},'-',
			    { 
				id:'btn-3',
				text:'删除',
				icon:'${ctx}/tws/css/img/delete.gif',
				handler:function(){
					remove();
				}
			},'-',{ 
				id:'btn-4',
				text:'排序',
				icon:'${ctx}/tws/css/img/transfer1.png',
				handler:function(){
			    	window.location = "${ctx}/tws/quartz/sortflag.jsp?rand="+Math.random();
				}
			}
		]
	});
	
	 _grid= new Ext.matech.grid.GridPanel({
		id:"gridId_cronList",
		dataUrl:"${ctx}/quartz.do?method=getCronGridJson",
		singleSelect:true,
		columns:[
		        {id:"CRONNAME",header:"规则名称",dataIndex:"CRONNAME",width:300,sortable:true,align:"left"},
		        {id:"CRONSTR",header:"规则表达式",dataIndex:"CRONSTR",width:250,sortable:true,align:"left"},
		        {id:"REMARK",header:"备注",dataIndex:"REMARK",width:200,sortable:true,align:"left"},
		        {id:"UPDATENAME",header:"操作人",dataIndex:"UPDATENAME",width:110,sortable:true,align:"left"},
		        {id:"UPDATEDATE",header:"更新时间",dataIndex:"UPDATEDATE",width:250,sortable:true,align:"left"}
				],
		fields:["UUID","CRONNAME","CRONSTR","REMARK","UPDATENAME","UPDATEDATE"],
		ondbclick:edit,
		region: 'center'
	});
	 
	new Ext.Viewport({
		layout:'border',
		items:[_toolbar,_grid]
	});
	
}

Ext.onReady(ext_init);

</script>
</head>

<body>

</body>

<script type="text/javascript">

function add(){
	window.location = "${ctx}/quartz.do?method=cronEdit&editType=add";
} 

function edit(){
	var uuid=_grid.chooseValue("UUID");
	
	if(uuid==""){
		alert("请选择需要修改的记录！");
		return;
	}
	
	window.location = "${ctx}/quartz.do?method=cronEdit&editType=update&uuid="+uuid;
}

function remove(){
	var uuid=_grid.chooseValue("UUID");
	
	if(uuid==""){
		alert("请选择需要删除的记录！");
		return;
	}
	
	if(!confirm("确定要删除该对象？")) {
		return;
	}else{
		matech.ajaxSumit("${ctx}/quartz.do?method=cronDelete","uuid="+uuid,true,function(){
			_grid.goSearch();
		});
	}	
}


</script>

</html>