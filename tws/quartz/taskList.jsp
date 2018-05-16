<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript">
var _grid;	
var _grid1;
function ext_init(){
	
	var toolbar=new Ext.Toolbar({
		height:30,
		width:Ext.getBody().getWidth(),
		region:'north',
		items:[{ 
				text:'新增', 
				iconCls:'form-btn-add',
				icon:'${ctx}/tws/css/img/add.gif',
				handler:function(){
					add();
				}
			},'-',{ 
				text:'修改',
				icon:'${ctx}/tws/css/img/edit.gif',
				handler:function(){
					edit();
				}
			},'-',
			    { 
				text:'删除',
				icon:'${ctx}/tws/css/img/delete.gif',
				handler:function(){
					remove();
				}
			},'-',{
				text:'立即执行',
				cls:'x-btn-text-icon',
				icon:'${ctx}/tws/css/img/start.png',
				handler:execute
			}
		]
	});	

	var toolbar2=new Ext.Toolbar({
		height:30,
		width:Ext.getBody().getWidth(),
		region:'north',
		items:[
			{ 
				text:'移除调度任务',
				icon:'${ctx}/tws/css/img/delete.gif',
				handler:function()
				{
					removeTrigger();
				}
			},'-',
			{ 
				text:'重启触发器',
				icon:'${ctx}/tws/css/img/start.png',
				handler:function()
				{
					resumeTrigger();
				}
			},'-',{ 
				text:'暂停触发器',
				icon:'${ctx}/tws/css/img/zanting.gif',
				handler:function()
				{
					pauseTrigger();
				}
			}
		]
	});
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_quartzTaskList",
		dataUrl:"${ctx}/quartz.do?method=getAllTaskGridJson",
		param:{typeName:"${typeName}"},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"UUID",header:"数据ID",dataIndex:"UUID",width:300,sortable:true,align:"left",hidden:true},
 				{id:"TASKNAME",header:"任务名称",dataIndex:"TASKNAME",width:200,sortable:true,align:"left"},
 				{id:"CLASSNAME",header:"调用接口",dataIndex:"CLASSNAME",width:300,sortable:true,align:"left",hidden:true},
 				{id:"TASKPARAM",header:"任务参数",dataIndex:"TASKPARAM",width:200,sortable:true,align:"left"},
 				{id:"CRONNAME",header:"执行规则",dataIndex:"CRONNAME",width:200,sortable:true,align:"left"},
 				{id:"STATE",header:"是否启用",dataIndex:"STATE",width:80,sortable:true,align:"left"},
 				{id:"SORTFLAG",header:"排序",dataIndex:"SORTFLAG",width:60,sortable:true,align:"left"},
 				{id:"CREATEBY",header:"操作人",dataIndex:"CREATEBY",width:100,sortable:true,align:"left"}, 				
 				{id:"CREATEDATE",header:"操作时间",dataIndex:"CREATEDATE",width:100,sortable:true,align:"left"}
 				],				
 		fields:["UUID","CLASSNAME","TASKNAME","TASKPARAM","CRONNAME","STATE","SORTFLAG","CREATEBY","CREATEDATE"],
 		tbar:toolbar,
		ondbclick:edit,
		region: 'center'
	});	

	var mypanel1=new Ext.Panel({
		title:'所有任务',
        border:false,
        layout:'fit',
        items:[_grid]
    });	
	
	_grid1= new Ext.matech.grid.GridPanel({
		id:"gridId_quartzTaskQYList",
		dataUrl:"${ctx}/quartz.do?method=getQuartTaskGridJson",
		param:{typeName:"${typeName}"},
		currentPage:1,
		tbar:toolbar2,
		singleSelect:true,
		ctxmenu:{doubts:true},
		columns:[{id:"UUID",header:"数据ID",dataIndex:"UUID",width:300,sortable:true,align:"left",hidden:true,hideable:false},
		         {id:"TRIGGER_STATE",header:"状态",dataIndex:"TRIGGER_STATE",width:100,sortable:true,align:"left"},
 				 {id:"TASKNAME",header:"采集任务",dataIndex:"TASKNAME",width:200,sortable:true,align:"left"},
 				 {id:"CRONNAME",header:"执行规则",dataIndex:"CRONNAME",width:200,sortable:true,align:"left"},
 				 {id:"PREV_FIRE_TIME",header:"上一次执行时间",dataIndex:"PREV_FIRE_TIME",width:150,sortable:true,align:"left"},
 				 {id:"NEXT_FIRE_TIME",header:"下一次执行时间",dataIndex:"NEXT_FIRE_TIME",width:150,sortable:true,align:"left"}
 				],				
 		fields:["UUID","TASKNAME","CRONNAME","PREV_FIRE_TIME","NEXT_FIRE_TIME","TRIGGER_STATE"]
	});
	
	var mypane22=new Ext.Panel({
		title:'我的任务',
        border:false,
        layout:'fit',
        items:[_grid1]
    });	
	
	
	var tab = new Ext.TabPanel({
        id: "tab",
        region:'center',
        activeTab: 0, 
       	autoScroll:true,
       	deferredRender:false,
        frame: true,
        items:[mypanel1,mypane22]
       });
	
	new Ext.Viewport({
		layout:'border',
		items:[tab]
	});
}

Ext.onReady(ext_init);

</script>
</head>

<body>

</body>

<script type="text/javascript">
function add() {
	window.location = "${ctx}/quartz.do?method=taskEdit&editType=add";
}
function edit() {
		var uuid=_grid.chooseValue("UUID");
	   	if(uuid=="" || uuid==null){
			alert("请选择要修改的对象");
			return;
	   	}else{
	   		window.location = "${ctx}/quartz.do?method=taskEdit&editType=update&uuid="+uuid;
		}
}
function remove() {
	var uuid=_grid.chooseValue("UUID");
   	if(uuid=="" || uuid==null){
		alert("请选择要修改的对象");
		return;
   	}else {
		if(!confirm("确定要删除该对象?")) {
			return;
		}
		matech.ajaxSumit("${ctx}/quartz.do?method=taskDelete","uuid="+uuid,false,function(){
			_grid.goSearch();
			parent.refreshTree();
    	});
	}
}

function execute(){

	var taskId =_grid.chooseValue("UUID");
	if(taskId == ""){
		alert("请选择要执行的任务！");
	} else{
		var urlCheck = "${ctx}/general.do?method=isSysGlobalLocked";	//URL
		var param = "&key="+taskId;		//传参数,支持中文
		
		var hasLock = ajaxLoadPageSynch(urlCheck,param);
		
		if(hasLock == "Y"){
			alert("该任务正在执行，请稍后...");
		}else{
			matech.showWaiting("100%","100%");
			var url = "${ctx}/quartz.do?method=execute";
			var requestString ={taskId:taskId};
			ajaxExecuteEtl(url, requestString);
		}
	}
}

function ajaxExecuteEtl(url,request) {
	Ext.Ajax.timeout=300000;
	Ext.Ajax.request({
        url: url,
        params:request,
        success: function(request) {
			matech.stopWaiting();
        	result = request.responseText;
        	alert(result);
        },
        failure:function(request){
        	matech.stopWaiting();
        	alert("执行失败..");
        }
    });
}

//移除触发器
function removeTrigger() {
	var chooseValue =  _grid1.chooseValue("UUID");
	if(chooseValue=="") {
		alert("请选择需要删除的调度任务");
	} else {
		if(!confirm("确定要删除该调度任务？")) {
			return;
		}else{
			matech.ajaxSumit("${ctx}/quartz.do?method=remove","taskId="+ chooseValue+"_sysGroup",false,function(){
				window.location.reload();
			});	
		}
	}	
}
//重启触发器
function resumeTrigger(){
	var chooseValue = _grid1.chooseValue("UUID");
	if(chooseValue=="") {
		alert("请选择调度任务");
	} else {
		matech.ajaxSumit("${ctx}/quartz.do?method=resumeTrigger","taskId="+ chooseValue+"_sysGroup",false,function(){
			_grid1.goSearch();
		});	
	}		
}
//暂停触发器
function pauseTrigger(){
	var chooseValue = _grid1.chooseValue("UUID");
	if(chooseValue=="") {
		alert("请选择调度任务");
	} else {
		matech.ajaxSumit("${ctx}/quartz.do?method=pauseTrigger","taskId="+ chooseValue+"_sysGroup",false,function(){
			_grid1.goSearch();
		});	
	}	
}

</script>
</html>
