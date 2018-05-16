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
		      	{
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
				},'-',		
				{
					text:'查询',
					cls:'x-btn-text-icon',
					icon:contextPath + btn_img_url + 'query.png',
					handler:function () {	
						//customQryWinFun('${tableId}');
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
			id:"gridId_policeShiftList",
			autoid:"js:gbag.policeshift.PoliceShiftGridJson",
			param:{},		
			currentPage:1,
			singleSelect:true,
			columns:[
					{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
			        {id:"SHIFTNAME",header:"所属探案组",dataIndex:"SHIFTNAME",width:160,sortable:true,align:"left"},
			        {id:"USER_LEADER_NAME",header:"探长",dataIndex:"USER_LEADER_NAME",width:220,sortable:true,align:"left"},
			        {id:"USER_NAME",header:"组员",dataIndex:"USER_NAME",width:220,sortable:true,align:"left"}
			        ],
			fields:["UUID","SHIFTNAME","USER_LEADER_NAME","USER_NAME","ORGANID_"],
			region: 'center',
			ondbclick:edit	
		});
		new Ext.Viewport({
			layout:'border',
			items:[
				_toolbar,
				_grid
			]
		});			
});

function add(){
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=policeShiftEdit&flag=all&editType=add";
	window.location = url;
}
//编辑
function edit() {
	
	var value =_grid.chooseValue("SHIFTNAME");//根据探案组的名字修改
	if (value == "") {
		alert('请选择要修改的数据!');
		return;

	}

	var url = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=policeShiftEdit&editType=update&shiftname=" + encodeURI(encodeURI(value));
	
	window.location.href = url;
}
//删除
function remove() {
	
	var value =_grid.chooseValue("SHIFTNAME");//根据探案组的名字删除
	if (value == "") {
		alert('请选择要删除的数据!');
		return;

	}
	if (confirm("您确认要将删除当前选中的记录吗？")) {
		var url = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=policeShiftSave&flag=all&editType=remove&uuid=" + encodeURI(encodeURI(value));
		window.location.href = url;	
	}

}


/* 
function grid_dblclick(obj) {	

	 var value = document.getElementById("chooseValue_" + tableId).value;

	var url = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=policeShiftEdit&editType=update&uuid=" + encodeURI(encodeURI(value));

	window.location.href = url; 
}	
*/

</script>
</head>
<body>
</body>
</html>