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
					var uuid = _grid.chooseValue("SYSID");
					var sysname = _grid.chooseValue("SYSNAME");
					if(uuid=="") {
						alert("请选择系统！");
						return;
					}
					var url="${pageContext.request.contextPath}/systemManger.do?method=sysPopedom&uuid="+uuid;
					matech.openTab(uuid,"系统权限【"+sysname+"】",url,true,parent);
					
				}
			}
		]
	});
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_SystemMangerList",
		autoid:"js:sys.systemManger.systemMangerListGridJson",
		currentPage:1,
		singleSelect:true,
		columns:[{id:"SYSID",header:"系统编号",dataIndex:"SYSID",width:120,sortable:true,align:"left"},
		         {id:"SYSNAME",freequery:"SYSNAME",header:"系统名称",dataIndex:"SYSNAME",width:200,sortable:true,align:"left"},
		         {id:"REMARK",freequery:"REMARK",header:"备注",dataIndex:"REMARK",width:200,sortable:true,align:"left"}
				],	
		fields:["SYSID","SYSNAME","REMARK"],
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
		matech.setExtBtnShow(['btn-1','btn-2','btn-3','btn-3'],false);
	}	
}

Ext.onReady(ext_init);


function add(){
	window.location="${ctx}/systemManger.do?method=add&editType=add";
}

//编辑
function edit() {
	var value =_grid.chooseValue("SYSID");
	if (value == "") {
		alert('请选择要修改的数据!');
		return;

	}
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/systemManger.do?method=edit&editType=update&sysId=" + value;
	
	window.location.href = url;
}



//删除系统名称
function remove() {
	var value =_grid.chooseValue("SYSID");
	if(value=="") {
		alert('请选择要删除的系统名称信息!');
	} else {	
		if(confirm("确认要删除该记录吗?")){
			var url = "${ctx}/systemManger.do?method=delSystem";
			var request = "&sysId="+value;
			var result = ajaxLoadPageSynch(url,request);
			var count = Ext.util.JSON.decode(result);
			if(count[0].count==0){
				matech.ajaxSumit("${ctx}/systemManger.do?method=remove","sysId="+value,false,function(){
					_grid.goSearch();
				});
			}else{
				alert("请先将系统下所有的菜单先删除！");
			} 
			 
		}
	}	
}


</script>
</head>

<body>

</body>

</html>