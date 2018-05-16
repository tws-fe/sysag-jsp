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
				text:'角色权限',
				icon:'${pageContext.request.contextPath}/img/menu/user.png',
				handler:function(){
					var roleId = _grid.chooseValue("ID");
					var roleName = _grid.chooseValue("ROLENAME");
					if(roleId=="") {
						alert("请选择角色！");
						return;
					}
				
					var url="${pageContext.request.contextPath}/roleNew.do?method=rolePopedom&id="+roleId;
					
					matech.openTab(roleId,"菜单权限【"+roleName+"】",url,true,parent);
				}
			},'-',
			    { 
				id:'btn-5',
				text:'人员角色关系',
				icon:'${pageContext.request.contextPath}/img/menu/people.png',
				handler:function(){
					var roleId = _grid.chooseValue("ID");
					var roleName = _grid.chooseValue("ROLENAME");
					if(roleId=="") {
						alert("请选择角色！");
						return;
					}
					
					var url="${pageContext.request.contextPath}/roleNew.do?method=userRolemain&roleId="+roleId;
					
					matech.openTab(roleId+"user","人员角色关系【"+roleName+"】",url,true,parent);
					
				}
			}
		]
	});
	
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:sys.role.RoleListGridJson",
		currentPage:1,
		singleSelect:true,
		columns:[{id:"ID",header:"角色ID",dataIndex:"ID",width:100,sortable:true,align:"left"},
		        {id:"ROLENAME",header:"角色名称",dataIndex:"ROLENAME",width:200,sortable:true,align:"left"},
 				{id:"ROLEVALUE",header:"角色功能",dataIndex:"ROLEVALUE",width:200,sortable:true,align:"left"},
 				{id:"REMARK",header:"备注",dataIndex:"REMARK",width:300,sortable:true,align:"left"}
 				],
 		fields:["ID","ROLENAME","ROLEVALUE","PROPERTY","REMARK"],
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
	
	if("${sessionScope.userSession.userLoginId}" !="admin"){
		matech.setExtBtnShow(['btn-1','btn-2','btn-3'],false);
	}	
	
}

Ext.onReady(ext_init);

</script>
</head>

<body>

</body>

<script type="text/javascript">

	//新增下级
	function add() {
		window.location = "${ctx}/roleNew.do?method=edit&editType=add";
	}
 
	//修改
	function edit() {
		
	 	var roleId = _grid.chooseValue("ID");

	   	if(roleId==""){
			alert("请选择要修改的对象！");
			return;
	   	}

	   	window.location = "${ctx}/roleNew.do?method=edit&editType=update&roleId="+roleId;
		
	}
 
	//删除
	function remove() {
		var roleId = _grid.chooseValue("ID");
		if(roleId=="") {
			alert("请选择需要删除的对象！");
		} else {
			if(matech.checkIsExist("js:role.RoleHasUser",roleId,true)) {
				alert("当前角色存在用户，请清空数据后进行删除！");
				return false;
			}
			
			if(!confirm("确定要删除该对象？")) {
				return;
			}else{
				matech.ajaxSumit("${ctx}/roleNew.do?method=delete","roleId="+roleId,true,function(){
						_grid.goSearch();
				});
			}
		}
	}
	
</script>
</html>