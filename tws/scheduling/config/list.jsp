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
		id:"gridId_sheduleConfigList",
		autoid:"js:schedule.ScheduleConfigListGridJson",
		currentPage:1,
		singleSelect:true,
		columns:[{id:"UUID",header:"ID",dataIndex:"UUID",width:120,sortable:true,align:"left",hidden:true},
		         {id:"SHIFTNAME",header:"班次名称",dataIndex:"SHIFTNAME",width:120,sortable:true,align:"left"},
		        {id:"STARTTIME",header:"开始时间",dataIndex:"STARTTIME",width:350,sortable:true,align:"left"},
 				{id:"ENDTIME",header:"结束时间",dataIndex:"ENDTIME",width:350,sortable:true,align:"left"},
 				{id:"SHIFTDAYS",header:"星期几值班",dataIndex:"SHIFTDAYS",width:350,sortable:true,align:"left"},
 				{id:"ISFESTIVALREST",header:"是否节假日休息",dataIndex:"ISFESTIVALREST",width:220,sortable:true,align:"left"},
 				{id:"SHIFTORDER",header:"显示排序",dataIndex:"SHIFTORDER",width:350,sortable:true,align:"left"}
 				],
 		fields:["UUID","ID","SHIFTNAME","STARTTIME","ENDTIME","SHIFTDAYS","ISFESTIVALREST","SHIFTORDER","ORGANID_"],
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
	window.location="${ctx}/scheduleConfig.do?method=add&editType=add";
}

//编辑
function edit() {
	var value =_grid.chooseValue("UUID");
	if (value == "") {
		alert('请选择要修改的数据!');
		return;

	}
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/scheduleConfig.do?method=edit&editType=update&uuid=" + value;
	
	window.location.href = url;
}



//删除
function remove() {
	var value =_grid.chooseValue("UUID");
	if(value=="") {
		alert('请选择要删除的班组配置选项!');
	} else {	
		if(!confirm("确定要删除班组配置信息？")) {
			return;
		}else{		
			matech.ajaxSumit("${ctx}/scheduleConfig.do?method=remove","uuid="+value,false,function(){
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