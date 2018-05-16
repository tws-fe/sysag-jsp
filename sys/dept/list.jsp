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
			    	window.location = "${ctx}/sys/dept/sortflag.jsp?unitId=${unitId}";
				}
			},'-',{ 
				id:'btn-5',
				text:'初始化',
				icon:'${ctx}/tws/css/img/edit.gif',
				handler:function(){
					updateHasUser();
				}
			}
		]
	});
	
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:sys.dept.DeptListGridJson",
		param:{unitId:"${unitId}"},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"AUTOID",header:"部门ID",dataIndex:"AUTOID",width:120,sortable:true,align:"left"},
		        {id:"DEPARTNAME",header:"单位名称",dataIndex:"DEPARTNAME",width:330,sortable:true,align:"left"},
 				{id:"ORGANID_",header:"所属单位",dataIndex:"ORGANID_",width:120,sortable:true,align:"left"},
 				{id:"ISHASUSER",header:"是否有用户",dataIndex:"ISHASUSER",width:120,sortable:true,align:"left"}
 				],
 		fields:["AUTOID","DEPARTNAME","PARENTID","ORGANID_","ISHASUSER"],
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
		window.location = "${ctx}/dept.do?method=edit&editType=add&unitId=${unitId}";
	}
 
	//修改
	function edit() {
		
	 	var departId = _grid.chooseValue("AUTOID");

	   	if(departId==""){
			alert("请选择要修改的对象！");
			return;
	   	}

	   	window.location = "${ctx}/dept.do?method=edit&editType=update&departId="+departId+"&unitId=${unitId}";
		
	}
 
	//删除
	function remove() {
		var departId = _grid.chooseValue("AUTOID");
		if(departId=="") {
			alert("请选择需要删除的对象！");
		} else {
			if(matech.checkIsExist("js:dept.DeptHasUser",departId,true)) {
				alert("当前部门存在用户，请清空数据后进行删除！");
				return false;
			}else{
				if(!confirm("确定要删除该对象？")) {
					return;
				}else{
					matech.ajaxSumit("${ctx}/dept.do?method=delete","unitId=${unitId}&autoid="+departId,true,function(){
							_grid.goSearch();
					});
				}
			}
		}
	}
	
	function updateHasUser(){
		matech.ajaxSumit("${ctx}/dept.do?method=updateHasUser","",true,function(){
			_grid.goSearch();
		});		
	}
</script>
</html>