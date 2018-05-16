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
					remove();ni
				}
			}
		]
	});
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:repository.stock.OutputStockListGridJson",
		param:{unitId:"${unitId}"},
		currentPage:1,
		singleSelect:true,
	
		columns:[{id:"OUTPUTDATE",header:"出库日期",dataIndex:"OUTPUTDATE",width:120,sortable:true,align:"left"},
	        	{id:"OUTPUTTYPE",header:"出库类型",dataIndex:"OUTPUTTYPE",width:330,sortable:true,align:"left"},
					{id:"PRODUCTNUMBER",header:"产品编号",dataIndex:"PRODUCTNUMBER",width:120,sortable:true,align:"left"},
					{id:"NUMBER",header:"数量",dataIndex:"NUMBER",width:120,sortable:true,align:"left"},
					{id:"RECEIVEPERSON",header:"领用人",dataIndex:"RECEIVEPERSON",width:120,sortable:true,align:"left"},
					{id:"REGISTRANT",header:"登记人",dataIndex:"REGISTRANT",width:120,sortable:true,align:"left"},
					{id:"REASON",header:"事由",dataIndex:"REASON",width:120,sortable:true,align:"left"},
					{id:"ORGANID_",header:"所属机构",dataIndex:"ORGANID_",width:120,sortable:true,align:"left"}
					],
		fields:["UUID","OUTPUTDATE","OUTPUTTYPE","PRODUCTNUMBER","NUMBER","RECEIVEPERSON","REGISTRANT","REASON","ORGANID_"],
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
	window.location = "${ctx}/outputStock.do?method=edit&editType=add&unitId=${unitId}";
}

//修改
function edit() {
	
 	var stockId = _grid.chooseValue("UUID");
   	if(stockId==""){
		alert("请选择要修改的对象！");
		return;
   	}

   	//window.location = "${ctx}/inputStock.do?method=edit&editType=update&inputStockId=9fdd61d2-545b-4829-bb53-3b4142bb1a8b&unitId=${unitId}";
   	window.location = "${ctx}/outputStock.do?method=edit&editType=update&stockId="+stockId+"&unitId=${unitId}";
   	
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
				matech.ajaxSumit("${ctx}/outputStock.do?method=delete","unitId=${unitId}&stockId="+stockId,true,function(){
						_grid.goSearch();
				});
			}
		}
	}
}
</script>
</html>
