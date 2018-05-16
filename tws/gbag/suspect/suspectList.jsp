<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>探案组</title>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<script type="text/javascript">

var _grid;
var _toolbar;

Ext.onReady(function(){
	
	_toolbar = new Ext.Toolbar({
		height:30,
		width:Ext.getBody().getWidth(),
		region:'north',
		items:[   	
		      	/* {
					text:'新增',
					cls:'x-btn-text-icon', 
					icon:contextPath + btn_img_url + 'add.png',
					handler:function () {	
						add();
					}
				},'-',
		      	{
					text:'修改',
					cls:'x-btn-text-icon', 
					icon:contextPath + btn_img_url + 'edit.png',
					handler:function () {	
						edit();
					}
				},'-',
		      	{
					text:'删除',
					cls:'x-btn-text-icon', 
					icon:contextPath + btn_img_url + 'delete.png',
					handler:function () {	
						remove();
					}
				},'-', */		
				{
					text:'查询',
					cls:'x-btn-text-icon',
					icon:contextPath + btn_img_url + 'query.png',
					handler:function () {	
						_grid.customQryWinFun();
					}
				},'-',
		  		{
					text:'关闭',
					cls:'x-btn-text-icon',
					icon:contextPath + btn_img_url + 'close.png',
					handler:function () {	
						closeTab(parent.tab);
					}
				}]
			});		 		
	 _grid= new Ext.matech.grid.GridPanel({
			id:"gridId_suspectList",
			autoid:"js:gbag.suspect.SuspectGridJson",
			param:{},		
			currentPage:1,
			singleSelect:true,
			columns:[
					{id:"UUID",header:"UUID",dataIndex:"UUID",width:80,sortable:true,align:"left",hidden:true},
					{id:"CASENAME",header:"案件名称",dataIndex:"CASENAME",width:160,sortable:true,align:"left"},
			        {id:"NAME",header:"姓名",dataIndex:"NAME",width:160,sortable:true,align:"left"},
			        {id:"SEX",header:"性别",dataIndex:"SEX",width:80,sortable:true,align:"left"},
			        {id:"AGE",header:"年龄",dataIndex:"AGE",width:80,sortable:true,align:"left"},
			        {id:"NATIONAL",header:"民族",dataIndex:"NATIONAL",width:80,sortable:true,align:"left"},
			        {id:"EDUCATIONLEV",header:"文化程度",dataIndex:"EDUCATIONLEV",width:80,sortable:true,align:"left"},
			        {id:"CENSUSREGISER",header:"户籍所在地",dataIndex:"CENSUSREGISER",width:220,sortable:true,align:"left"},
			        {id:"IDCARD",header:"身份证编号",dataIndex:"IDCARD",width:160,sortable:true,align:"left"},
			        {id:"BIRTHDATE",header:"出生日期",dataIndex:"BIRTHDATE",width:220,sortable:true,align:"left"},
			        {id:"ADDRESS",header:"现住址",dataIndex:"ADDRESS",width:300,sortable:true,align:"left"},
			        {id:"WORKUNIT",header:"工作单位",dataIndex:"WORKUNIT",width:160,sortable:true,align:"left"},
			        {id:"MARK",header:"违法犯罪记录",dataIndex:"MARK",width:220,sortable:true,align:"left"}
			        ],
			fields:["UUID","CASENAME","NAME","SEX","AGE","NATIONAL","EDUCATIONLEV","CENSUSREGISER","IDCARD","BIRTHDATE","ADDRESS","WORKUNIT","MARK","ORGANID_"],
			region: 'center'	
		});

		new Ext.Viewport({
			layout:'border',
			items:[
				_toolbar,
				_grid
			]
		});			
});

/* function add(){
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=suspectEdit&flag=all&editType=add";
	window.location = url;
}
//编辑
function edit() {
	
	var value =_grid.chooseValue("UUID");//根据uuid修改
	if (value == "") {
		alert('请选择要修改的数据!');
		return;

	}

	var url = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=suspectEdit&editType=update&uuid="+value;
	
	window.location.href = url;
}
//删除
function remove() {
	
	var value =_grid.chooseValue("UUID");//根据uuid删除
	if (value == "") {
		alert('请选择要删除的数据!');
		return;

	}
	if (confirm("您确认要将删除当前选中的记录吗？")) {
		var url = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=suspectSave&flag=all&editType=remove&uuid="+value;
		window.location.href = url;	
	}

} */

</script>
</head>
<body>
</body>
</html>