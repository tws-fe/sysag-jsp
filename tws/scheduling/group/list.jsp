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
		id:"gridId_sheduleGroupList",
		autoid:"js:schedule.ScheduleGroupListGridJson",
		param:{unitId:"${unitId}"},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"UUID",header:"ID",dataIndex:"UUID",width:120,sortable:true,align:"left",hidden:true},
		         {id:"GROUPNAME",header:"班组名称",dataIndex:"GROUPNAME",width:120,sortable:true,align:"left"},
		         {id:"TEAMGROUPMEMBER",header:"班组成员",dataIndex:"TEAMGROUPMEMBER",width:350,sortable:true,align:"left"},
 				 {id:"SHIFTNAME",header:"班次",dataIndex:"SHIFTNAME",width:120,sortable:true,align:"left"},
 				 {id:"GROUP_SHIFTDAYS",header:"星期几值班",dataIndex:"GROUP_SHIFTDAYS",width:180,sortable:true,align:"left"},
 				 {id:"GROUP_ISFESTIVALREST",header:"是否节假日休息",dataIndex:"GROUP_ISFESTIVALREST",width:220,sortable:true,align:"left"}
 				],
 		fields:["UUID","GROUPNAME","TEAMGROUPMEMBERID","TEAMGROUPMEMBER","SHIFTNAME","STARTTIME","ENDTIME","GROUP_SHIFTDAYS","GROUP_ISFESTIVALREST"],
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


function add(){
	window.location="${ctx}/scheduling.do?method=groupAdd&editType=add";
}


function edit() {
	var value =_grid.chooseValue("UUID");
	if (value == "") {
		alert('请选择要修改的数据!');
		return;
	}
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/scheduling.do?method=groupEdit&editType=update&uuid=" + value;
	
	window.location.href = url;
}

function remove() {
	var value =_grid.chooseValue("UUID");
	if(value=="") {
		alert('请选择要删除的班组信息!');
	} else {	
		if(!confirm("确定要删除班组信息？")) {
			return;
		}else{		
			matech.ajaxSumit("${ctx}/scheduling.do?method=groupRemove","uuid="+value,false,function(){
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