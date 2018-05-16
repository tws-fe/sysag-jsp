<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>报表配置详细</title>
<style type="text/css">
a{
float: right;
margin-right: 30px;
}

</style>
<script>
	function ext_init(){
		var _toolbar=new Ext.Toolbar({
			height:30,
			width:Ext.getBody().getWidth(),
			region:'north',
			items:[{ 
					text:'关闭',
					id:'refurbish',
					icon:'${ctx}/tws/css/img//close.gif',
		   		 	handler:function(){
		   		 		matech.closeTab(parent);
		   		 	}
				}
			]
		});
         

	  //内容
		var mypanel=new Ext.Panel({
	        id: 'contentPanel',
	        region:'center',
	        width:document.body.clientWidth,
	        height:document.body.clientHeight,
	        tbar:_toolbar,
	        autoScroll:true,
	        items:[
	   	        {contentEl: "content_div",id:"contentItem"}
	   	    ]
	    });	
	  
		new Ext.Viewport({
			layout:'border',
			items:[
				mypanel
			]
		});

    }
	Ext.onReady(ext_init);
    
	
</script>

</head>

<body>
<div id="divBtn" style="width: 100%"></div>

<div  id="content_div">
<table border="0" cellspacing="1" class="editTable" style="width: 90%;">
	<tr height="30">
		<th width="12%"><strong>报表英文别名：</strong></th>
		<td align="center"><b>${reportDetail.birtname}</b></td>
	</tr>
	<tr height="25">
		<th><strong>报表标题：</strong></th>
		<td id="Policy_company">${reportDetail.title}</td>
	</tr>
	<tr height="25">
		<th><strong>报表类型：</strong></th>
		<td id="Policy_code">${reportDetail.type}</td>
	</tr>
	<tr height="25">
		<th><strong>创建时间：</strong></th>
		<td id="Policy_code">${reportDetail.createTime}</td>
	</tr>
	<tr height="25">
		<th><strong>显示字段：</strong></th>
		<td id="Policy_company">${reportDetail.fieldId}</td>
	</tr>
	<tr height="25">
		<th><strong>显示字段中文名：</strong></th>
		<td id="Policy_code">${reportDetail.fieldName}</td>
	</tr>
	<tr height="25">
		<th><strong>汇总条件：</strong></th>
		<td id="Policy_code">${reportDetail.sumTerm}</td>
	</tr>
	<tr height="25">
		<th><strong>图表类型与条件：</strong></th>
		<td id="Policy_code">${reportDetail.iconTerms}</td>
	</tr>
	<tr height="300">
		<th height="80"><strong>生成sql：</strong></th>
		</td>
		<td id="Policy_code" >
			<textarea onscroll='this.rows++;'  style='width:400px;height: 300px;' onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  maxLength=100 readOnly >${reportDetail.createSql}</textarea>
		</td>
	</tr>

</table>

</div>

<br><br>

</body>
<script type="text/javascript"> 

$(document).ready(function(){

});
</script>
</html>
