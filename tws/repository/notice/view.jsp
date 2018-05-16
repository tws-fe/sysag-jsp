<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>公告通知详细</title>
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
		<th width="12%"><strong>标题：</strong></th>
		<td align="center"><b>${notice.title}</b></td>
	</tr>
	<tr height="25">
		<th><strong>发布人：</strong></th>
		<td id="publishuser">${notice.publishUser}</td>
	</tr>
	<tr height="25">
		<th><strong>发布单位：</strong></th>
		<td id="organId_">${notice.organId_}</td>
	</tr>
	<tr height="25">
		<th><strong>发布时间：</strong></th>
		<td id="releasedate">${notice.releaseDate}</td>
	</tr>
	<tr height="25">
		<th><strong>接收单位：</strong></th>
		<td id="Policy_code">${notice.releaseDate}</td>
	</tr>
	<tr height="25">
		<th><strong>是否已发布：</strong></th>
		<td id="ispublish">${notice.isPublish}</td>
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
		<th><strong>内容：</strong></th>
		<td id="content" style="line-height: 150%;">${notice.content}</td>
	</tr>
	<tr height="25">
		<th><strong>附件：</strong></th>
		<td >
		   <input type="hidden" name="attachId" id="attachId" value="${notice.uuid}" ext_type="attachFile" ext_filetype="xls|doc|docx|xlsx" 
		   maxAttach="1"  indexTable="notice" ext_callback="getFileType" buttonText="上传附件" handler="CommonHandler" readOnly/>
		</td>
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
