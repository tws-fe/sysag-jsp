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
		items:[
			{ 
				text:'移除调度任务',
				icon:'${ctx}/tws/css/img/delete.gif',
				handler:function(){
					remove();
				}
			},'-',
			{ 
				text:'重启触发器',
				icon:'${ctx}/tws/css/img/start.png',
				handler:function(){
					resumeTrigger();
				}
			},'-',{ 
				text:'暂停触发器',
				icon:'${ctx}/tws/css/img/zanting.gif',
				handler:function(){
					pauseTrigger();
				}
			}
		]
	});
	
	 _grid= new Ext.matech.grid.GridPanel({
		id:"gridId_quartzList",
		dataUrl:"${ctx}/quartz.do?method=getGridJson",
		param:{nodeId:"${nodeId}"},		
		currentPage:1,
		singleSelect:true,
		columns:[
				{id:"ID",header:"ID",dataIndex:"ID",ID:150,sortable:true,align:"left",hidden:true},
		        {id:"TRIGGER_STATE",header:"触发器状态",dataIndex:"TRIGGER_STATE",ID:60,sortable:true,align:"left"},
		        {id:"TRIGGER_NAME",header:"触发器名称",dataIndex:"TRIGGER_NAME",width:250,sortable:true,align:"left"},
		        {id:"TRIGGER_GROUP",header:"触发器组名",dataIndex:"TRIGGER_GROUP",width:100,sortable:true,align:"left"},
		        {id:"JOB_NAME",header:"任务作业名",dataIndex:"JOB_NAME",width:110,sortable:true,align:"left"},
		        {id:"JOB_CLASS_NAME",header:"任务作业类",dataIndex:"JOB_CLASS_NAME",width:250,sortable:true,align:"left"},
				{id:"START_TIME",header:"开始时间",dataIndex:"START_TIME",width:150,sortable:true,align:"left"},
				{id:"PREV_FIRE_TIME",header:"上一次执行时间",dataIndex:"PREV_FIRE_TIME",width:150,sortable:true,align:"left"},
				{id:"NEXT_FIRE_TIME",header:"下一次执行时间",dataIndex:"NEXT_FIRE_TIME",width:150,sortable:true,align:"left"}
					],
		fields:["ID","TRIGGER_STATE","TRIGGER_NAME","TRIGGER_GROUP","JOB_NAME","JOB_CLASS_NAME","START_TIME","PREV_FIRE_TIME","NEXT_FIRE_TIME"],
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

//移除
function remove() {
	var chooseValue = _grid.chooseValue("ID");
	if(chooseValue=="") {
		alert("请选择需要删除的调度任务");
	} else {
		if(!confirm("确定要删除该调度任务？")) {
			return;
		}else{
			matech.ajaxSumit("${ctx}/quartz.do?method=remove","taskId="+ chooseValue,false,function(){
				_grid.goSearch();
			});	
		}
	}	
}

//重启触发器
function resumeTrigger(){
	var chooseValue = _grid.chooseValue("ID");
	if(chooseValue=="") {
		alert("请选择调度任务");
	} else {
		matech.ajaxSumit("${ctx}/quartz.do?method=resumeTrigger","taskId="+ chooseValue,false,function(){
			_grid.goSearch();
		});	
	}		
}

//暂停触发器
function pauseTrigger(){
	var chooseValue = _grid.chooseValue("ID");
	if(chooseValue=="") {
		alert("请选择调度任务");
	} else {
		matech.ajaxSumit("${ctx}/quartz.do?method=pauseTrigger","taskId="+ chooseValue,false,function(){
			_grid.goSearch();
		});	
	}	
}

</script>
</html>