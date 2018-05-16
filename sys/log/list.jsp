<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>日志列表</title>

<script type="text/javascript">
var _grid;
var _tbar;
var _cmb;

function ext_init(){
	
	_cmb=new Ext.matech.form.mtCombox({
		id:'unitId',
		hiddenId:'unitId',
		transform:'unitId',
		autoid:'js:sys.unit.BasicCtlUnitHasDeptImpl',
		width: 310,
		className:'required',
		listWidth:310,
		multilevel:true,
		onclick:treeClick
	});
	_cmb.setRealValue("${sessionScope.userSession.userOrganId}");
	
	_tbar=new Ext.Toolbar({
		region:'north',
		height:30,
		items:[
		        /*
				{
				id:'remove',
				text:'删除',
				icon:'${ctx}/tws/css/img/delete.gif',
				handler:function(){
					del();
				}
				}
				,'-',*/
				{
				id:'query',
				text:'查看',
				icon:'${ctx}/tws/css/img/query.gif',
				handler:function(){
					goQuery();
				}
				}
				,'-',{
					id:'download',
					text:'下载',
					icon:'${ctx}/tws/css/img/download.gif',
					handler:function(){
						down();
					}
			},'-','所属单位:',_cmb
		]	
	});
	
	var typeId="${typeId}";//typeId:1.调度日志2.登录日志3.操作日志,4.运行日志,5.采集日志
	if(typeId=="1"){
		//列值格式化可以用renderer属性，返回格式化后的值或html语句
		_grid= new Ext.matech.grid.GridPanel({
			id:"gridId_logList",
			dataUrl:"${ctx}/sysLog.do?method=getGridJson",
			param:{type:"${typeId}",organid:"${sessionScope.userSession.userOrganId}"},	
			currentPage:1,
			singleSelect:false,
			columns:[
			        {id:"LOGID",freequery:"LOGID",header:"编号",dataIndex:"LOGID",width:100,sortable:true,align:"left",hidden:true},
			        {id:"JOBNAME",freequery:"JOBNAME",header:"JOBNAME",dataIndex:"JOBNAME",width:100,sortable:true,align:"left"},
					{id:"JOBGROUP",freequery:"JOBGROUP",header:"JOBGROUP",dataIndex:"JOBGROUP",width:100,sortable:true,align:"left"},
					{id:"TRIGGERNAME",freequery:"TRIGGERNAME",header:"TRIGGERNAME",dataIndex:"TRIGGERNAME",width:180,sortable:true,align:"left"},
					{id:"TRIGGERGROUP",freequery:"TRIGGERGROUP",header:"TRIGGERGROUP",dataIndex:"TRIGGERGROUP",width:100,sortable:true,align:"left"},
					{id:"LOGCONTENT",freequery:"LOGCONTENT",header:"日志内容",dataIndex:"LOGCONTENT",width:280,sortable:true,align:"left"},
					{id:"JOBDATAMAP",freequery:"JOBDATAMAP",header:"JOBDATAMAP",dataIndex:"JOBDATAMAP",width:100,sortable:true,align:"left"},
					{id:"LOGTIME",freequery:"LOGTIME",header:"操作时间",dataIndex:"LOGTIME",width:180,sortable:true,align:"left"},
					{id:"PREFIRETIME",freequery:"PREFIRETIME",header:"PREFIRETIME",dataIndex:"PREFIRETIME",width:180,sortable:true,align:"left"},
					{id:"NEXTFIRETIME",freequery:"NEXTFIRETIME",header:"NEXTFIRETIME",dataIndex:"NEXTFIRETIME",width:180,sortable:true,align:"left"}
					],
			fields:["LOGID","JOBNAME","JOBGROUP","TRIGGERNAME","TRIGGERGROUP","LOGCONTENT","JOBDATAMAP","LOGTIME","PREFIRETIME","PREFIRETIME","NEXTFIRETIME"],
			region: 'center'
		});	
	}else if(typeId=="2"){
		//列值格式化可以用renderer属性，返回格式化后的值或html语句
		_grid= new Ext.matech.grid.GridPanel({
			id:"gridId_logList",
			dataUrl:"${ctx}/sysLog.do?method=getGridJson",
			param:{type:"${typeId}",organid:"${sessionScope.userSession.userOrganId}"},			
			currentPage:1,
			singleSelect:false,
			columns:[
			        {id:"LOGID",freequery:"LOGID",header:"编号",dataIndex:"LOGID",width:100,sortable:true,align:"left",hidden:true},
			        {id:"USERNAME",freequery:"USERNAME",header:"用户名",dataIndex:"USERNAME",width:100,sortable:true,align:"left"},
					{id:"USERLOGINID",freequery:"USERLOGINID",header:"登录名",dataIndex:"USERLOGINID",width:100,sortable:true,align:"left"},
					{id:"USERUNITNAME",freequery:"USERUNITNAME",header:"所属单位",dataIndex:"USERUNITNAME",width:280,sortable:true,align:"left"},
					{id:"USERDEPTNAME",freequery:"USERDEPTNAME",header:"所属部门",dataIndex:"USERDEPTNAME",width:100,sortable:true,align:"left"},
					//{id:"OPTFUN",freequery:"OPTFUN",header:"所属模块",dataIndex:"OPTFUN",width:100,sortable:true,align:"left"},
					//{id:"LOGCONTENT",freequery:"LOGCONTENT",header:"日志内容",dataIndex:"LOGCONTENT",width:280,sortable:true,align:"left"},
					//{id:"OPTSQL",freequery:"OPTSQL",header:"操作语句",dataIndex:"OPTSQL",width:300,sortable:true,align:"left"},
					{id:"LOGINTIME",freequery:"LOGINTIME",header:"时间",dataIndex:"LOGINTIME",width:180,sortable:true,align:"left"},
					{id:"LASTOPTTIME",freequery:"LASTOPTTIME",header:"最后操作时间",dataIndex:"LASTOPTTIME",width:180,sortable:true,align:"left"},
					{id:"LOGOUTTIME",freequery:"LOGOUTTIME",header:"登出时间",dataIndex:"LOGOUTTIME",width:180,sortable:true,align:"left"},
					{id:"USERIP",freequery:"USERIP",header:"用户IP",dataIndex:"USERIP",width:80,sortable:true,align:"left"}
					],
			fields:["LOGID","USERNAME","USERLOGINID","USERUNITNAME","USERDEPTNAME","LOGINTIME","LASTOPTTIME","LOGOUTTIME","USERIP"],
			region: 'center'
		});	
	}else if(typeId=="3"||typeId=="4"){
		//列值格式化可以用renderer属性，返回格式化后的值或html语句
		_grid= new Ext.matech.grid.GridPanel({
			id:"gridId_logList",
			dataUrl:"${ctx}/sysLog.do?method=getGridJson",
			param:{type:"${typeId}",organid:"${sessionScope.userSession.userOrganId}"},	
			currentPage:1,
			singleSelect:false,
			columns:[
			        {id:"LOGID",freequery:"LOGID",header:"编号",dataIndex:"LOGID",width:100,sortable:true,align:"left",hidden:true},
			        {id:"USERNAME",freequery:"USERNAME",header:"用户名",dataIndex:"USERNAME",width:100,sortable:true,align:"left"},
					{id:"USERLOGINID",freequery:"USERLOGINID",header:"登录名",dataIndex:"USERLOGINID",width:100,sortable:true,align:"left"},
					{id:"USERUNITNAME",freequery:"USERUNITNAME",header:"所属单位",dataIndex:"USERUNITNAME",width:280,sortable:true,align:"left"},
					{id:"USERDEPTNAME",freequery:"USERDEPTNAME",header:"所属部门",dataIndex:"USERDEPTNAME",width:100,sortable:true,align:"left"},
					{id:"OPTFUN",freequery:"OPTFUN",header:"所属模块",dataIndex:"OPTFUN",width:100,sortable:true,align:"left"},
					{id:"LOGCONTENT",freequery:"LOGCONTENT",header:"日志内容",dataIndex:"LOGCONTENT",width:280,sortable:true,align:"left"},
					{id:"OPTSQL",freequery:"OPTSQL",header:"操作语句",dataIndex:"OPTSQL",width:300,sortable:true,align:"left"},
					{id:"LOGTIME",freequery:"LOGTIME",header:"操作时间",dataIndex:"LOGTIME",width:180,sortable:true,align:"left"},
					{id:"USERIP",freequery:"USERIP",header:"用户IP",dataIndex:"USERIP",width:80,sortable:true,align:"left"}
					],
			fields:["LOGID","USERNAME","USERLOGINID","USERUNITNAME","USERDEPTNAME","OPTFUN","LOGCONTENT","OPTSQL","LOGTIME","USERIP"],
			region: 'center'
		});	
	}else if(typeId=="5"){
		_grid= new Ext.matech.grid.GridPanel({
			id:"gridId_logList2",
			dataUrl:"${ctx}/sysLog.do?method=getGridJsonToFile",
			currentPage:1,
			singleSelect:true,
			columns:[{id:"FILENAME",freequery:"FILENAME",header:"文件名",dataIndex:"FILENAME",width:600,sortable:true,align:"left"},
			        {id:"PATH",freequery:"PATH",header:"文件路径",dataIndex:"PATH",width:300,sortable:true,align:"left",hidden:true},
			        {id:"FILEABSOLUTEPATH",freequery:"FILEABSOLUTEPATH",header:"文件绝对路径",dataIndex:"FILEABSOLUTEPATH",width:300,sortable:true,align:"left",hidden:true}
					],
			fields:["FILENAME","PATH","FILEABSOLUTEPATH"],
			region: 'center'
		});	
	}else{
		_grid= new Ext.matech.grid.GridPanel({
			id:"gridId_gatherLogList",
			dataUrl:"${ctx}/sysLog.do?method=getGatherLog",
			currentPage:1,
			singleSelect:true,
			columns:[{id:"FILENAME",freequery:"FILENAME",header:"文件名",dataIndex:"FILENAME",width:600,sortable:true,align:"left"},
			        {id:"PATH",freequery:"PATH",header:"文件路径",dataIndex:"PATH",width:300,sortable:true,align:"left",hidden:true},
			        {id:"FILEABSOLUTEPATH",freequery:"FILEABSOLUTEPATH",header:"文件绝对路径",dataIndex:"FILEABSOLUTEPATH",width:300,sortable:true,align:"left",hidden:true}
					],
			fields:["FILENAME","PATH","FILEABSOLUTEPATH"],
			region: 'center'
		});
	}
	
	new Ext.Viewport({
		layout:'border',
		items:[
			_tbar,
			_grid
		]
	});
	
	var query=Ext.getCmp("query");
	var remove=Ext.getCmp("remove");
	var download=Ext.getCmp("download");
	
	if(typeId=="1"||typeId=="2"||typeId=="3"||typeId=="4"){
		query.disable();
		//remove.enable();
		download.disable();
	}else{
		query.enable();
		//remove.disable();
		download.enable();
	}
	
}

function treeClick(){
	var node=_cmb.getValue();
	var param={type:"${typeId}",organid:node};	
	
	_grid.goSearch(param);
	
}

Ext.onReady(ext_init);
</script>
</head>
<body>
<iframe name="attachHidden_frame" id="attachHidden_frame" style='display:none'></iframe>
	<form name="downForm" method="post" action="" id="downForm" target="attachHidden_frame">
		<input type="hidden" id="filePath" name="filePath">
		<input type="hidden" id="fileName" name="fileName">
	</form>
</body>
<script type="text/javascript">
//删除日志
function del(){
	var logId=_grid.chooseValue("LOGID");
	if(logId==""){
		alert("请选择要删除的记录!");
		return;
	}else{
		if(confirm("确定要删除该记录吗?")){
			matech.ajaxSumit("${ctx}/sysLog.do?method=del&type=${typeId}","logId="+logId,false,function(){
				_grid.goSearch();
	    	});
		}
	}
}

//查看文件日志
function goQuery(){
	var fileAbsolutePath=_grid.chooseValue("FILEABSOLUTEPATH");
	
	if(fileAbsolutePath==""){
		alert("请选择要查看的记录!");
		return;
	}
	window.location.href="${ctx}/sysLog.do?method=goViewLog&typeId=${typeId}&fileAbsolutePath="+fileAbsolutePath;
}

//下载日志
function down(){
	var fileAbsolutePath=_grid.chooseValue("FILEABSOLUTEPATH");
	
	if(fileAbsolutePath==""){
		alert("请选择要下载的记录!");
		return;
	}
	var fileName=_grid.chooseValue("FILENAME");
	document.getElementById("filePath").value = fileAbsolutePath;
	document.getElementById("fileName").value = fileName;
	document.downForm.action = "${pageContext.request.contextPath}/sysLog.do?method=download";
	document.downForm.submit();
}
</script>
</html>