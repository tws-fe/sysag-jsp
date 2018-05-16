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
			/*
			,'-',
			    { 
				id:'btn-4',
				text:'菜单权限',
				icon:'${pageContext.request.contextPath}/img/menu/user.png',
				handler:function(){
					var roleId = _grid.chooseValue("UUID");
					var loginIp= _grid.chooseValue("LOGINIP");
					if(roleId=="") {
						alert("请选择登入loginIP！");
						return;
					}
				
					var url="${pageContext.request.contextPath}/visitIp.do?method=loginIPPopedom&uuid="+roleId;
					
					matech.openTab(roleId,"菜单权限【"+loginIp+"】",url,true,parent);
				}
			}*/
			,'-',{ 
				id:'btn-5',
				text:'启用',
				icon:'${ctx}/tws/css/img/edit.gif',
				handler:function(){
					updateState(1);
				}
			},'-',{ 
				id:'btn-6',
				text:'禁用',
				icon:'${ctx}/tws/css/img/edit.gif',
				handler:function(){
					updateState(0);
				}
			}
		]
	});
	
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:sys.visitIp.VisitIpListGridJson",
		param:{unitId:"${unitId}"},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"UUID",header:"ID",dataIndex:"UUID",width:120,sortable:true,align:"left",hidden:true},
		        {id:"LOGINIP",header:"IP地址",dataIndex:"LOGINIP",width:260,sortable:true,align:"left"},
 				{id:"STATE",header:"是否允许",dataIndex:"STATE",width:120,sortable:true,align:"left"},
 				{id:"STANDBYNAME",header:"所属单位",dataIndex:"STANDBYNAME",width:220,sortable:true,align:"left"}
 				],
 		fields:["UUID","LOGINIP","STATE","STANDBYNAME","ORGANID_"],
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
	    
		window.location = "${ctx}/visitIp.do?method=edit&editType=add&unitId=${unitId}";
	}
 
	//修改
	function edit() {
		
	 	var uuid = _grid.chooseValue("UUID");

	   	if(uuid==""){
			alert("请选择要修改的对象！");
			return;
	   	}

	   	window.location = "${ctx}/visitIp.do?method=edit&editType=update&unitId=${unitId}&uuid="+uuid;
		
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
				matech.ajaxSumit("${ctx}/visitIp.do?method=delete","unitId=${unitId}&uuid="+uuid,true,function(){
						_grid.goSearch();
				});
			}
		}
	}
	//更新状态
	function updateState(state) {
		var  uuid= _grid.chooseValue("UUID");
		if(uuid=="") {
			alert("请选择需要更新的对象！");
		} else {
			matech.ajaxSumit("${ctx}/visitIp.do?method=updateState","uuid="+uuid+"&state="+state,true,function(){
					_grid.goSearch();
			});
		}
	}	

</script>
</html>