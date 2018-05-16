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
			},'-',
			    { 
				id:'btn-4',
				text:'菜单权限',
				icon:'${pageContext.request.contextPath}/img/menu/user.png',
				handler:function(){
					var uuid = _grid.chooseValue("UUID");
					var roomBH = _grid.chooseValue("ROOMBH");
					if(uuid=="") {
						alert("请选择房间！");
						return;
					}
					var url="${pageContext.request.contextPath}/room.do?method=roomPopedom&uuid="+uuid;
					matech.openTab(uuid,"房间权限【"+roomBH+"】",url,true,parent);
					
				}
			}
		]
	});
	
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:sys.room.RoomListGridJson",
		param:{unitId:"${unitId}"},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"UUID",header:"ID",dataIndex:"UUID",width:120,sortable:true,align:"left",hidden:true},
		        {id:"ROOMTYPE",header:"房间类型",dataIndex:"ROOMTYPE",width:160,sortable:true,align:"left"},
 				{id:"ROOMBH",header:"房间名称",dataIndex:"ROOMBH",width:120,sortable:true,align:"left"},
 				{id:"ROOMIP",header:"房间设备IP",dataIndex:"ROOMIP",width:120,sortable:true,align:"left"},
 				{id:"DOORCTLBH",header:"门禁控制器编号",dataIndex:"DOORCTLBH",width:120,sortable:true,align:"left"},
 				{id:"DOORBH",header:"门禁设备编号",dataIndex:"DOORBH",width:120,sortable:true,align:"left"}, 				
 				{id:"REMARK",header:"备注",dataIndex:"REMARK",width:160,sortable:true,align:"left"},
 				{id:"STANDBYNAME",header:"所属单位",dataIndex:"STANDBYNAME",width:220,sortable:true,align:"left"}
 				],
 		fields:["UUID","ROOMBH","ROOMTYPE","CAMERABH","CAMERAFILEBH","ROOMIP","REMARK","ORGANID_","STANDBYNAME","DOORCTLBH","DOORBH"],
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
		window.location = "${ctx}/room.do?method=edit&editType=add&unitId=${unitId}";
	}
 
	//修改
	function edit() {
		
	 	var uuid = _grid.chooseValue("UUID");

	   	if(uuid==""){
			alert("请选择要修改的对象！");
			return;
	   	}

	   	window.location = "${ctx}/room.do?method=edit&editType=update&uuid="+uuid+"&unitId=${unitId}";
		
	}
 
	//删除
	function remove() {
		var  uuid= _grid.chooseValue("UUID");
		if(uuid=="") {
			alert("请选择需要删除的对象！");
		} else {
			if(!confirm("确定要删除该对象？")) {
				return;
			}else{
				matech.ajaxSumit("${ctx}/room.do?method=delete","unitId=${unitId}&uuid="+uuid,true,function(){
						_grid.goSearch();
				});
			}
		}
	}
	

</script>
</html>