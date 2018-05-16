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
			}
		]
	});
	
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:sys.paper.PaperListGridJson",
		param:{unitId:"${unitId}"},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"PAPID",header:"底稿ID",dataIndex:"PAPID",width:120,sortable:true,align:"left",hidden:true},
		        {id:"PAPNAME",header:"底稿名称",dataIndex:"PAPNAME",width:160,sortable:true,align:"left"},
 				{id:"TYPEID",header:"类型ID",dataIndex:"TYPEID",width:120,sortable:true,align:"left"},
 				{id:"TYPENAME",header:"类型名称",dataIndex:"TYPENAME",width:160,sortable:true,align:"left"},
 				{id:"REMARK",header:"备注",dataIndex:"REMARK",width:220,sortable:true,align:"left"},
 				{id:"STANDBYNAME",header:"所属单位",dataIndex:"STANDBYNAME",width:220,sortable:true,align:"left"}
 				],
 		fields:["PAPID","PAPNAME","TYPEID","TYPENAME","REMARK","STANDBYNAME"],
		ondbclick:edit,
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

	//新增下级
	function add() {
	 
	    var unitId="${unitId}";
	    if(unitId==""){
	    	alert("请先选择左边的单位");
	    	return false;
	    }
		window.location = "${ctx}/paper.do?method=edit&editType=add&unitId=${unitId}";
	}
 
	//修改
	function edit() {
		
	 	var papId = _grid.chooseValue("PAPID");

	   	if(papId==""){
			alert("请选择要修改的对象！");
			return;
	   	}

	   	window.location = "${ctx}/paper.do?method=edit&editType=update&papId="+papId+"&unitId=${unitId}";
		
	}
 
	//删除
	function remove() {
		var papId = _grid.chooseValue("PAPID");
		if(papId=="") {
			alert("请选择需要删除的对象！");
		} else {
			if(!confirm("确定要删除该对象？")) {
				return;
			}else{
				matech.ajaxSumit("${ctx}/paper.do?method=delete","unitId=${unitId}&papId="+papId,true,function(){
						_grid.goSearch();
				});
			}
		}
	}
	

</script>
</html>