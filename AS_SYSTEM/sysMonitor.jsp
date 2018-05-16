<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.text.DecimalFormat"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="com.szk.framework.pub.db.DBConnect"%>
<%@page import="com.szk.framework.pub.db.DbUtil"%>
<%
	Connection conn = null;
	PreparedStatement ps = null;
	ResultSet rs = null;
	
	String mysqlMaxConn = "";
	
	String sql = "";
	try {
		
		sql = " select @@max_connections ";
		conn = new DBConnect().getConnect();
		
		ps = conn.prepareStatement(sql);
		rs = ps.executeQuery();
		
		if(rs.next()) {
			mysqlMaxConn = rs.getString(1);
		}
		
		DecimalFormat df = new DecimalFormat("0.00");
	
		double total = (Runtime.getRuntime().totalMemory()) / (1024.0 * 1024);
		double max = (Runtime.getRuntime().maxMemory()) / (1024.0 * 1024);
		double free = (Runtime.getRuntime().freeMemory()) / (1024.0 * 1024);

		
		String id = request.getParameter("id");

		if(id != null && !"".equals(id)) {
			try {
				sql = " kill " + id;
				ps = conn.prepareStatement(sql);
				ps.execute();
			} catch(Exception ex) {
				ex.printStackTrace();
			}
		}
%>
<html>

<head>
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
<a href="#系统监控">系统监控</a>&nbsp;
<a href="#MYSQL会话">MYSQL会话</a>&nbsp;
<a href="#MYSQL状态">MYSQL状态</a>&nbsp;
<a href="#MYSQL参数">MYSQL参数</a>&nbsp;
<a href="#常用数据库缓存">常用数据库缓存</a>&nbsp;
<br/><br/>
	<a name="系统监控">系统监控</a>
	<br/>
	<input type="button" value="JVM 内存回收" onclick="gc()"/>
	<table align="center" class="infoTable" cellpadding="3" cellspacing="1" border="0" >
		<tr>
			<td width="20%" nowrap="nowrap">数据库最大连接数：</td>
			<td width="80%"><%=mysqlMaxConn %></td>
		</tr>
		
		<tr>
			<td nowrap="nowrap">当前JVM的最大可用内存(maxMemory)：</td>
			<td><%=df.format(max) %> MB</td>
		</tr>
		
		<tr>
			<td nowrap="nowrap">当前JVM占用的内存总数(totalMemory)：</td>
			<td><%=df.format(total) %> MB</td>
		</tr>
		
		<tr>
			<td nowrap="nowrap">当前JVM空闲内存(freeMemory)：</td>
			<td><%=df.format(free) %> MB</td>
		</tr>
		
		<tr>
			<td nowrap="nowrap">
				JVM实际可用内存：
			</td>
			<td><%=df.format((max - total + free)) %> MB</td>
		</tr>
	</table>
	<script type="text/javascript">

		function gc() {
			jQuery.ajax({
				url : CONTEXTPATH + '/system.do?method=gc',
				type : 'POST',
				dataType : 'text',
				success : function(r) {
					console.log(r);			
					window.location.reload();
				}
			});
		}

	</script>
	
	
	<br/><br/>

	<hr/>
	<a name="MYSQL会话">MYSQL会话</a>
	<table align="center" class="infoTable" cellpadding="3" cellspacing="1" border="0">
		<tr>
			<th>id</th>
			<th>user</th>
			<th>host</th>
			<th>db</th>
			<th>command</th>
			<th>time</th>
			<th>state</th>
			<th>info</th>
			<th>kill</th>
		</tr>
		
	
<%
		sql = " show full processlist ";
		ps = conn.prepareStatement(sql);
		rs = ps.executeQuery();
		int connCount = 0;
		
		while(rs.next()) {
			connCount++;
			out.write("<tr>");
			out.write("<td>" + rs.getString("id") + "&nbsp;</td>");
			out.write("<td>" + rs.getString("user") + "&nbsp;</td>");
			out.write("<td>" + rs.getString("host") + "&nbsp;</td>");
			out.write("<td>" + rs.getString("db") + "&nbsp;</td>");
			out.write("<td>" + rs.getString("command") + "&nbsp;</td>");
			out.write("<td>" + rs.getString("time") + "&nbsp;</td>");
			out.write("<td>" + rs.getString("state") + "&nbsp;</td>");
			out.write("<td>" + rs.getString("info") + "&nbsp;</td>");
			out.write("<td><a href='?id=" + rs.getString("id") +"'>kill</a>&nbsp;</td>");
			out.write("</tr>");
		}


%>
	<tr>
		<th colspan="9" align="right">当前数据库连接数：<%=connCount %></th>
	</tr>
</table>

<br/><br/>
	<a name="MYSQL状态">MYSQL状态</a>
	<table align="center" class="infoTable" cellpadding="3" cellspacing="1" border="0">
		<tr>
			<th>name</th>
			<th>value</th>
		</tr>
		
	
<%
		sql = " show status ";
		ps = conn.prepareStatement(sql);
		rs = ps.executeQuery();
		while(rs.next()) {

			out.write("<tr>");
			out.write("<td width='20%' nowrap='nowrap'>" + rs.getString(1) + "</td>");
			out.write("<td width='80%'>" + rs.getString(2) + "</td>");
			out.write("</tr>");
		}
%>
</table>

<br/><br/>

<a name="MYSQL参数">MYSQL参数</a>

<table align="center" class="infoTable" cellpadding="3" cellspacing="1" border="0">
		<tr>
			<th>name</th>
			<th>value</th>
		</tr>
		
	
<%
		sql = " show variables ";
		ps = conn.prepareStatement(sql);
		rs = ps.executeQuery();
		while(rs.next()) {

			out.write("<tr>");
			out.write("<td width='20%' nowrap='nowrap'>" + rs.getString(1) + "</td>");
			out.write("<td width='80%'>" + rs.getString(2) + "</td>");
			out.write("</tr>");
		}
%>
</table>

<br/>
<hr/>



</body>
</html>
<%
	} catch(Exception e) {
		e.printStackTrace();
	} finally {
		DbUtil.close(rs);
		DbUtil.close(ps);
		DbUtil.close(conn);
	}

%>