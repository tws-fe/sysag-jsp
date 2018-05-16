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
					goAdd();
				}
			}
			,'-',{ 
				id:'btn-2',
				text:'修改',
				icon:'${ctx}/tws/css/img/edit.gif',
				handler:function(){
					goEdit();
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
		autoid:"js:sys.sysMenuManger.SysMenuMangerListGridJson",
		param:{sysId:"${sysId}"},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"ID",header:"ID",dataIndex:"ID",width:120,sortable:true,align:"left",hidden:true},
		         {id:"SYSID",header:"系统编号",dataIndex:"SYSID",width:220,sortable:true,align:"left"},
		         {id:"MENU_ID",header:"菜单编号",dataIndex:"MENU_ID",width:80,sortable:true,align:"left"},
		        {id:"PARENTID",header:"父菜单编号",dataIndex:"PARENTID",width:80,sortable:true,align:"left"},
 				{id:"DEPTH",header:"深度",dataIndex:"DEPTH",width:50,sortable:true,align:"left"},
 				{id:"CTYPE",header:"类型",dataIndex:"CTYPE",width:80,sortable:true,align:"left"},
 				{id:"NAME",header:"名称",dataIndex:"NAME",width:220,sortable:true,align:"left"},
 				{id:"ACT",header:"行为",dataIndex:"ACT",width:500,sortable:true,align:"left"},
  				{id:"HELPACT",header:"帮助行为",dataIndex:"HELPACT",width:300,sortable:true,align:"left"},
 				{id:"TARGET",header:"目标",dataIndex:"TARGET",width:120,sortable:true,align:"left"}
 				],
 		fields:["ID","SYSID","MENU_ID","PARENTID","DEPTH","CTYPE","NAME","ACT","HELPACT","TARGET"],
		ondbclick:goEdit,
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

//新增
function goAdd()
{
	var value="add";
	window.location="${pageContext.request.contextPath}/sysMenuManger.do?method=edit&sysId=${sysId}&&act="+value;
}

//修改  ondbclick goedit 与之对应
function goEdit()
{
	var svalue=_grid.chooseValue("ID");
	if(svalue=="") {
		alert('请选择要修改的一项!');
	} 
	else
	{
	    var value="update";
		window.location="sysMenuManger.do?method=edit&&sysId=${sysId}&&chooseValue="+svalue+"&&act="+value;
	}
} 


//删除
function remove() {
	var value =_grid.chooseValue("ID");
	if(value=="") {
		alert('请选择要删除的菜单选项!');
	} else {	
		if(!confirm("确定要删除菜单信息？")) {
			return;
		}else{		
			matech.ajaxSumit("${ctx}/sysMenuManger.do?method=sysMenuMangerRemove","id="+value,false,function(){
				_grid.goSearch();
			});
		}
	}	
}


</script>
</head>

<body>

</body>

</html>