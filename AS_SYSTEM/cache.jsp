<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@page import="java.lang.reflect.Field"%>
<%@page import="java.util.Map"%>
<%@page import="com.szk.system.service.cache.Cache"%>
<!DOCTYPE html ">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>数据库缓存</title>
	<style>
	* {
		font-size: 14px;
	}
	
	a {
		font-weight: bold;
	}
	
	.infoTable {
		width:95%;
		background-color: #CCCCCC;
	}
	
	.infoTable th {
		font-weight:normal;
		background-color: #EEEEEE;
	}
	
	.infoTable td {
		background-color: #FFFFFF;
	}
	</style>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.9.1.js"></script> 
	<script type="text/javascript">
		var CONTEXTPATH = '${pageContext.request.contextPath}/';
	</script>
</head>
<body>
<a name="常用数据库缓存">常用数据库缓存</a>
<br/>
<input type="button" value="清空缓存" onclick="cache_clear()"/>
<input type="button" value="加载缓存" onclick="cache_reload()"/>
<table align="center" class="infoTable" cellpadding="3" cellspacing="1" border="0">
		<%
			Map<Field, Object> cacheinfo = Cache.info();
		%>
		<tr>
			<th>缓存名字</th>
			<th>缓存数量及缓存类型</th>
		</tr>
		<%
			for(Map.Entry<Field, Object> e : cacheinfo.entrySet()){
				out.write("<tr>");
				out.write("<td width='20%' nowrap='nowrap'>" + e.getKey().getName() + "</td>");
				out.write("<td width='80%'>" + e.getValue() + "</td>");
				out.write("</tr>");
			}
		%>
</table>

<script type="text/javascript">
function cache_clear(){
	jQuery.ajax({
		url : CONTEXTPATH + '/system.do?method=clear',
		type : 'POST',
		dataType : 'text',
		success : function(r){
			console.log(r);			
			window.location.reload();
		}
	});
}

function cache_reload(){
	jQuery.ajax({
		url : CONTEXTPATH + '/system.do?method=load',
		type : 'POST',
		dataType : 'text',
		success : function(r){
			console.log(r);			
			window.location.reload();		
		}
	});
}
</script>
</body>
</html>