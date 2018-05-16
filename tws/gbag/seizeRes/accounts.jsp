<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>台账</title>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<script type="text/javascript">
Ext.onReady(function(){
	mt_init_form_Control();
    var html = "<table><tr>";
	    html += '<td>所属案件：</td>'; 
	    html += '<td><input style="height: 24px; width: 100%" id="casenumber" name="casenumber" valuemustexist=true autoid="js:gbag.res.registerResCaseList" refer="${unitId}" maxLength=100 type="text" value="${sus.casenumber}"   class="required"  /></td></td>'; 
	    html += '<td>物品名称：</td><td><input type="text" id="itemid" name="itemid"  size=30 autoid="1585" ext_select="1585" ext_type="singleSelect" value="${uuid}" refer="casenumber" refer1="物品" ></td>';
	    html += '</tr></table>';
    var target = document.getElementById('htmlHix');
    target.innerHTML = html;
	var tbar = new Ext.Toolbar({
		height:30,
		width:Ext.getBody().getWidth(),
		region:'north',
           items:[
         html, '-',  
 		{
 			text:'查询',
 			cls:'x-btn-text-icon',
 			icon:contextPath + btn_img_url + 'query.png',
 			handler:function () {	
 				selectUs("${uuid}");
 			}
 		},'-',   	
  		{
			text:'关闭',
			cls:'x-btn-text-icon',
			icon:contextPath + btn_img_url + 'close.png',
			handler:function () {	
				matech.closeTab(parent);
			}
		}]
	});			
	var layout=new Ext.Viewport({
		layout:'border',
		items:[
			html,tbar
		]
	});
	
		
});
function selectUs(uuid){
	
	var _grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:gbag.seizeRes.UsResGridJson",
		param:{unitId:"${unitId}",uuid:"${uuid}"},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"CASENUMBER",header:"案件编号",dataIndex:"CASENUMBER",width:50,sortable:true,align:"left",hidden:true},
		         {id:"SUSPECT",header:"嫌疑人编号",dataIndex:"SUSPECT",width:100,sortable:true,align:"left",hidden:true},
		        {id:"DEALTYPE",header:"操作",dataIndex:"DEALTYPE",width:110,sortable:true,align:"left"},
 				{id:"OPERUSERNAME",header:"操作人",dataIndex:"OPERUSERNAME",width:160,sortable:true,align:"left"},
 				{id:"DEALTIME",header:"操作时间",dataIndex:"DEALTIME",width:110,sortable:true,align:"left"},
 				{id:"ITEMNAME",header:"物品名称",dataIndex:"ITEMNAME",width:300,sortable:true,align:"left"},
 				{id:"AMOUNT",header:"数量",dataIndex:"AMOUNT",width:140,sortable:true,align:"left"},
 				{id:"CHARACTERISTIC",header:"特征",dataIndex:"CHARACTERISTIC",width:140,sortable:true,align:"left"},
 				{id:"REAMRKS",header:"备注",dataIndex:"REMARK",width:140,sortable:true,align:"left"},
 				{id:"SUSPECTNAME",header:"所属嫌疑人",dataIndex:"SUSPECTNAME",width:120,sortable:true,align:"left"}
 				],
 		fields:["CASENUMBER","SUSPECT","DEALTYPE","OPERUSERNAME","DEALTIME","ITEMNAME","AMOUNT","CHARACTERISTIC","REAMRKS","SUSPECTNAME"],
		region: 'center'
	});	
}
</script>
</head>


<body >
<form name="thisForm" method="post" action="" class="autoHeightDiv">
<div style="height:100%" id="htmlHix">
</div>
</form>
</body>
</html>