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
			},'-',{ 
				id:'btn-2',
				text:'修改',
				icon:'${ctx}/tws/css/img/edit.gif',
				handler:function(){
					edit();
				}
			},'-',{ 
				id:'btn-3',
				text:'删除',
				icon:'${ctx}/tws/css/img/delete.gif',
				handler:function(){
					remove();
				}
			},'-',{ 
				id:'btn-4',
				text:'禁用',
				icon:'${pageContext.request.contextPath}/img/menu/flow.png',
				handler:function(){
					updateStates("1");
				}
			},'-',{ 
				id:'btn-5',
				text:'启用',
				icon:'${pageContext.request.contextPath}/img/menu/flow.png',
				handler:function(){
					updateStates("0");
				}
			}
			/*
			,'-',{ 
				id:'btn-6',
				text:'菜单权限',
				icon:'${pageContext.request.contextPath}/img/menu/department.png',
				handler:function(){
					goEditPopedom();
				}
			}*/
			,'-',{ 
				id:'btn-7',
				text:'批量导入',
				icon:'${pageContext.request.contextPath}/img/menu/im2.png',
				handler:function(){
					userBachImport();
				}
			},'-',{ 
				id:'btn-8',
				text:'采集指纹',
				icon:'${pageContext.request.contextPath}/img/menu/flow.png',
				handler:function(){
					setRegisterFinger();
				}
			},'-',{ 
				id:'btn-9',
				text:'同步指纹',
				icon:'${pageContext.request.contextPath}/img/menu/flow.png',
				handler:function(){
					reRegisterFinger();
				}
			}
		]
	});
	
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:sys.user.UserListGridJson",
		param:{unitId:"${unitId}"},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"ID",header:"部门ID",dataIndex:"ID",width:120,sortable:true,align:"left",hidden:true},
		        {id:"NAME",header:"用户名称",dataIndex:"NAME",width:120,sortable:true,align:"left"},
 				{id:"LOGINID",header:"登录名",dataIndex:"LOGINID",width:120,sortable:true,align:"left"},
 				{id:"DEPTNAME",header:"所属部门",dataIndex:"DEPTNAME",width:140,sortable:true,align:"left"},
 				{id:"STANDBYNAME",header:"所属单位",dataIndex:"STANDBYNAME",width:160,sortable:true,align:"left"},
 				{id:"MOBILEPHONE",header:"手机号码",dataIndex:"MOBILEPHONE",width:120,sortable:true,align:"left"},
 				{id:"SEX",header:"性别",dataIndex:"SEX",width:100,sortable:true,align:"left",renderer:function(value, cellmeta, record){
					var sex = record.get("SEX");
					if(sex=="M"){
						return "男";
					} else if(sex=="F"){
						return '<span style="color: red">女</span>';
					}else{
						return "";
					}
				}},
 				{id:"STATE",header:"状态",dataIndex:"STATE",width:100,sortable:true,align:"left",renderer:function(value, cellmeta, record){
					var status = record.get("STATE");
					if(status=="0"){
						return "启用";
					}else{
						return '<span style="color: red">禁用</span>';
					}
				}},
				{id:"ISFINGER",header:"指纹",dataIndex:"ISFINGER",width:100,sortable:true,align:"left"}
 				],
 		fields:["ID","NAME","LOGINID","SEX","SPECIALTY","DEPARTID","DEPARTNAME","STANDBYNAME","DEPARTMENTID","DEPTNAME","MOBILEPHONE","STATE","ISFINGER"],
		ondbclick:edit,
		region: 'center'
	});	
	
	if("${view}"=="true"){
		new Ext.Viewport({
			layout:'border',
			items:[
				_grid
			]
		});		
	}else{
		new Ext.Viewport({
			layout:'border',
			items:[
				_toolbar,
				_grid
			]
		});		
	}

}

Ext.onReady(ext_init);

</script>
</head>

<body>

</body>

<script type="text/javascript">
/* ========= util ========== */
function getWebOffice(){
	var webOffice=parent._WebOffice;
	if(!webOffice){
		webOffice=parent.parent._WebOffice;
		if(!webOffice){
			webOffice=parent.parent.parent._WebOffice;
			if(!webOffice){
				alert('控件环境初始化失败！');
				return null;
			}else{
				webOffice=parent.parent.parent.getWebOffice();
			}
		}else{
			webOffice=parent.parent.getWebOffice();
		}
	}else{
		webOffice=parent.getWebOffice();
	}
	
	return webOffice;
	
}
	//新增下级
	function add() {
	 
	    var unitId="${unitId}";
	    if(unitId==""){
	    	alert("请先选择左边的单位");
	    	return false;
	    }
		window.location = "${ctx}/userNew.do?method=edit&editType=add&unitId=${unitId}";
	}
 
	//修改
	function edit() {
		
		if("${view}"=="true"){
			return;
		}
		
	 	var userId = _grid.chooseValue("ID");

	   	if(userId==""){
			alert("请选择要修改的对象！");
			return;
	   	}

	   	window.location = "${ctx}/userNew.do?method=edit&editType=update&userId="+userId+"&unitId=${unitId}";
		
	}
 
	//删除
	function remove() {
		var userId = _grid.chooseValue("ID");
		if(userId=="") {
			alert("请选择需要删除的对象！");
			return;
		} 
		
		if(!confirm("确定要删除该对象？")) {
			return;
		}else{
			matech.ajaxSumit("${ctx}/userNew.do?method=delete","unitId=${unitId}&id="+userId,true,function(){
					_grid.goSearch();
			});
		}
		
	}

	function setRegisterFinger(){
		var userId = _grid.chooseValue("ID");
		if(userId=="") {
			alert("请选择用户！");
			return;
		}
		//显示验证界面
		matech.showWaiting("100%","100%","正在进行指纹采集....");
		var webOffice = getWebOffice();	
		if(webOffice){
			var t=webOffice.funFingerReg(userId);
			if(t!=''){
				
				var url = MATECH_SYSTEM_WEB_ROOT + "/userNew.do?method=setFingerRead&rand=" + Math.random();								
				$.ajax({
					url : url,
					type : "POST", 
					data : {pPersonId : userId,pFingerKey : t},
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					async : false,
					success:function(msg){
						alert(msg);
						_grid.goSearch();
					}
				});	
				
			}
		}
		matech.stopWaiting();
	}
	
	function reRegisterFinger(){
		
		if(!confirm("确定要重新更新本机构所有人员的指纹到门禁设备？")) {
			return;
		}
		if(confirm("【同步人员及指纹】到门禁设备，选择【确定】;【同步人员】到门禁设备，选择【取消】！")) {
			matech.ajaxSumit("${ctx}/userNew.do?method=retFingerRead","unitId=${unitId}&ftype=0",true,function(){
				_grid.goSearch();
			});
		}else{
			matech.ajaxSumit("${ctx}/userNew.do?method=retFingerRead","unitId=${unitId}&ftype=1",true,function(){
				_grid.goSearch();
			});			
		}	

	}
	
	/*菜单权限*/
	function goEditPopedom(){
		
		var userId = _grid.chooseValue("ID");
		var userName = _grid.chooseValue("NAME");
		if(userId=="") {
			alert("请选择用户！");
			return;
		}
		
		var url="${pageContext.request.contextPath}/userNew.do?method=userPopedom&id="+userId;
		
		matech.openTab(userId,"菜单权限【"+userName+"】",url,true,parent);
	}
	
	function userBachImport(){
		var url="${ctx}/sys/user/batchImport.jsp?&unitId=${unitId}";
		matech.openWindow("批量导入人员",url,700,400,parent,function(){
			_grid.goSearch();
		});
	}
	
	function updateStates(obj){
		var userId = _grid.chooseValue("ID");
		if(userId=="") {
			alert("请选择需要禁用的用户！");
			return;
		} 
		
		if(!confirm("确定要禁用该用户？")) {
			return;
		}else{
			matech.ajaxSumit("${ctx}/userNew.do?method=updateState","unitId=${unitId}&state="+obj+"&userId="+userId,true,function(){
					_grid.goSearch();
			});
		}		
	}
	
</script>
</html>