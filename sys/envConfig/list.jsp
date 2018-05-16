<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript">

var _grid;
var _toolbar;
var _grid1;
var _toolbar1;
function ext_init(){  
	_toolbar=new Ext.Toolbar({
		height:30,
		width:Ext.getBody().getWidth(),
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
				text:'重新加载系统配置',
				icon:'${ctx}/tws/css/img/restart.gif',
				handler:function(){
					reloadConfig();
				}
			}
		]
	});
	
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_configList",
		autoid:"js:sys.envConifg.EnvConfigListGridJson",
		currentPage:1,
		singleSelect:true,
		tbar:_toolbar,
		columns:[{id:"AUTOID",header:"ID",dataIndex:"AUTOID",width:120,sortable:true,align:"left",hidden:true},
		        {id:"SNAME",header:"参数名",dataIndex:"SNAME",width:220,sortable:true,align:"left"},
 				{id:"SVALUE",header:"参数值",dataIndex:"SVALUE",width:220,sortable:true,align:"left"},			
 				{id:"SMEMO",header:"参数说明",dataIndex:"SMEMO",width:160,sortable:true,align:"left"},
 				{id:"UPUSER",header:"更新人",dataIndex:"UPUSER",width:120,sortable:true,align:"left"},
 				{id:"UPTIME",header:"更新时间",dataIndex:"UPTIME",width:150,sortable:true,align:"left"}
 				],
 		fields:["AUTOID","SNAME","SVALUE","SMEMO","MULTISELECT","SAUTOID","UPUSER","UPTIME"],
		ondbclick:edit,
		region: 'center'
	});	

	_toolbar1=new Ext.Toolbar({
		height:30,
		width:Ext.getBody().getWidth(),
		items:[{ 
			    id:'btn-4',
				text:'新增', 
				icon:'${ctx}/tws/css/img/add.gif',
				handler:function(){
					childAdd();
				}
			}
			,'-',{ 
				id:'btn-5',
				text:'修改',
				icon:'${ctx}/tws/css/img/edit.gif',
				handler:function(){
					childEdit();
				}
			},'-',
			    { 
				id:'btn-6',
				text:'删除',
				icon:'${ctx}/tws/css/img/delete.gif',
				handler:function(){
					childRemove();
				}
			}
		]
	});
	
	
	_grid1= new Ext.matech.grid.GridPanel({
		id:"gridId_configChildList",
		autoid:"js:sys.envConifg.EnvConfigChildListGridJson",
		param:{unitId:"${unitId}"},
		currentPage:1,
		singleSelect:true,
		height:300,
		tbar:_toolbar1,
		columns:[{id:"UUID",header:"ID",dataIndex:"UUID",width:120,sortable:true,align:"left",hidden:true},
		        {id:"SNAME",header:"参数名",dataIndex:"SNAME",width:220,sortable:true,align:"left"},
 				{id:"SVALUE",header:"参数值",dataIndex:"SVALUE",width:220,sortable:true,align:"left"},			
 				{id:"SMEMO",header:"参数说明",dataIndex:"SMEMO",width:160,sortable:true,align:"left"},
 				{id:"STANDBYNAME",header:"所属单位",dataIndex:"STANDBYNAME",width:220,sortable:true,align:"left"},
 				{id:"UPDATE_USER_NAME_",header:"更新人",dataIndex:"UPDATE_USER_NAME_",width:120,sortable:true,align:"left"},
 				{id:"UPDATE_TIME_",header:"更新时间",dataIndex:"UPDATE_TIME_",width:150,sortable:true,align:"left"}
 				],
 		fields:["UUID","SNAME","SVALUE","SMEMO","ORGANID_","STANDBYNAME","UPDATE_USER_NAME_","UPDATE_TIME_"],
		ondbclick:childEdit,
		region: 'south'
	});	
	
	new Ext.Viewport({
		layout:'border',
		items:[
			_grid,_grid1
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

	//新增
	function add() {
	 
	    var unitId="${unitId}";
	    if(unitId==""){
	    	alert("请先选择左边的单位");
	    	return false;
	    }
		window.location = "${ctx}/envConfig.do?method=edit&editType=add&unitId=${unitId}";
	}
 
	//修改
	function edit() {
		
	 	var uuid = _grid.chooseValue("AUTOID");

	   	if(uuid==""){
			alert("请选择要修改的对象！");
			return;
	   	}

	   	window.location = "${ctx}/envConfig.do?method=edit&editType=update&uuid="+uuid+"&unitId=${unitId}";
		
	}
 
	//删除
	function remove() {
		var  uuid= _grid.chooseValue("AUTOID");
		if(uuid=="") {
			alert("请选择需要删除的对象！");
		} else {
			if(!confirm("确定要删除该对象？")) {
				return;
			}else{
				matech.ajaxSumit("${ctx}/envConfig.do?method=delete","unitId=${unitId}&uuid="+uuid,true,function(){
						_grid.goSearch();
				});
			}
		}
	}
	//重新加载系统配置
	function reloadConfig(){
		matech.ajaxSumit("${ctx}/envConfig.do?method=reloadConfig","",false);
	}	
	//新增
	function childAdd() {
	 
	    var unitId="${unitId}";
	    if(unitId==""){
	    	alert("请先选择左边的单位");
	    	return false;
	    }
		window.location = "${ctx}/envConfig.do?method=childEdit&editType=add&unitId=${unitId}";
	}
 
	//修改
	function childEdit() {
		
	 	var uuid = _grid1.chooseValue("UUID");

	   	if(uuid==""){
			alert("请选择要修改的对象！");
			return;
	   	}

	   	window.location = "${ctx}/envConfig.do?method=childEdit&editType=update&uuid="+uuid+"&unitId=${unitId}";
		
	}
 
	//删除
	function childRemove() {
		var  uuid= _grid1.chooseValue("UUID");
		if(uuid=="") {
			alert("请选择需要删除的对象！");
		} else {
			if(!confirm("确定要删除该对象？")) {
				return;
			}else{
				matech.ajaxSumit("${ctx}/envConfig.do?method=childDelete","unitId=${unitId}&uuid="+uuid,true,function(){
					_grid1.goSearch();
				});
			}
		}
	}
</script>
</html>