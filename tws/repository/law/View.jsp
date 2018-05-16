<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>法律法规详细</title>
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
		<th width="12%"><strong>法规文件名称：</strong></th>
		<td align="center"><b>${lawDetail.lawName}</b></td>
	</tr>
	<tr height="25">
		<th><strong>发文单位：</strong></th>
		<td id="Policy_company">${lawDetail.department}</td>
	</tr>
	<tr height="25">
		<th><strong>发文编号：</strong></th>
		<td id="Policy_code">${lawDetail.lawNo}</td>
	</tr>
	<!-- <tr height="25">
		<th><strong>条：</strong></th>
		<td id="Policy_code">${lawDetail.tiao}</td>
	</tr>
	<tr height="25">
		<th><strong>款：</strong></th>
		<td id="Policy_code">${lawDetail.kuan}</td>
	</tr> -->
	<tr>
		<th><strong>法规内容内容：</strong></th>
		<td id="content" style="line-height: 150%;">${lawDetail.lawContent}</td>
	</tr>

</table>

</div>

<br><br>

</body>
<script type="text/javascript"> 

$(document).ready(function(){
	/*
	$(document).bind("contextmenu",function(e){
		return false;
	 });
	
	$(document).keydown(function(){
		 return key(arguments[0])
	 });
	 
	 function key(e){  
		    var keynum;  
		    if(window.event){  
		    keynum = e.keyCode; // IE  
		    }else if(e.which){  
		    keynum = e.which; // Netscape/Firefox/Opera  
		    }  
		    if(keynum == 17){  
		    alert("禁止复制内容！");  
		    return false;  
		    }  
	 }*/
});
</script>
</html>
