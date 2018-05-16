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
		autoid:"js:repository.stock.StockListGridJson",
		param:{unitId:"${unitId}"},
		currentPage:1,
		singleSelect:true,
	
		columns:[{id:"PRODUCTNUMBER",header:"产品编号",dataIndex:"PRODUCTNUMBER",width:120,sortable:true,align:"left"},
	        	{id:"PRODUCTNAME",header:"名称",dataIndex:"PRODUCTNAME",width:330,sortable:true,align:"left"},
					{id:"PRODUCTTYPE",header:"产品类型",dataIndex:"PRODUCTTYPE",width:120,sortable:true,align:"left"},
					{id:"NUMBER",header:"数量",dataIndex:"NUMBER",width:120,sortable:true,align:"left"},
					{id:"OLDPROVIDER",header:"原厂商",dataIndex:"OLDPROVIDER",width:120,sortable:true,align:"left"}
					],
		fields:["UUID","PRODUCTNUMBER","PRODUCTNAME","PRODUCTTYPE","NUMBER","OLDPROVIDER","ORGANID_"],
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

<Script>
//新增下级
function add() {
 
    var unitId="${unitId}";
    if(unitId==""){
    	alert("请先选择左边的单位");
    	return false;
    }
	window.location = "${ctx}/stock.do?method=edit&editType=add&unitId=${unitId}";
}

//修改
function edit() {
	
 	var stockId = _grid.chooseValue("UUID");

   	if(stockId==""){
		alert("请选择要修改的对象！");
		return;
   	}

   	window.location = "${ctx}/stock.do?method=edit&editType=update&stockId="+stockId+"&unitId=${unitId}";
	
}

//删除
function remove() {
	var stockId = _grid.chooseValue("UUID");
	//var stockId = "1";
	if(stockId=="") {
		alert("请选择需要删除的对象！");
	} else {
		if(matech.checkIsExist("js:dept.DeptHasUser",stockId,true)) {
			alert("当前部门存在用户，请清空数据后进行删除！");
			return false;
		}else{
			if(!confirm("确定要删除该对象？")) {
				return;
			}else{
				matech.ajaxSumit("${ctx}/stock.do?method=delete","unitId=${unitId}&stockId="+stockId,true,function(){
						_grid.goSearch();
				});
			}
		}
	}
}
</script>
</html>
