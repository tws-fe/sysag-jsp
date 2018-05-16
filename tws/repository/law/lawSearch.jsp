<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ page import="com.szk.util.string.StringUtil"%>
<%@ page import="com.szk.framework.pub.db.DBConnect"%>
<%@ page import="com.szk.framework.listener.UserSession"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<%@ page import="java.sql.*"%>
<%@ page import="com.szk.util.db.DbUtil"%>
<%@ page import="com.szk.util.web.WebUtil"%>

<%  
	String searchArea = StringUtil.showNull(request.getParameter("searchArea"));
	
	UserSession userSession = (UserSession)request.getSession().getAttribute("userSession");
	String userId = userSession.getUserId();
	StringBuffer sql = new StringBuffer();
	
	String title = StringUtil.showNull(request.getParameter("title"));
	String content = StringUtil.showNull(request.getParameter("content"));
	String wordNum = StringUtil.showNull(request.getParameter("wordNum"));
	String sendDept = StringUtil.showNull(request.getParameter("sendDept"));
	
	 sql.append(" SELECT parentid, object_id, lawname, department, lawno, tiao, kuan, lawcontent ")
		.append(" FROM   mt_law_lawdetail ")
		.append(" where 1=2 ");
	 
	int totalCount = -1;
	int from = 0;
	int to = 0;
	
	StringBuffer resultHTML = new StringBuffer();
	StringBuffer pageInfo = new StringBuffer();
	
	String sqlWhere = "";
	String keyWordSqlWhere = "";
	if(!"".equals(searchArea)) {
		
		String[] keyWord = searchArea.split(" ");
		
		for (int i = 0; i < keyWord.length; i++) {
			if (keyWord[i] != null && !"".equals(keyWord[i].trim())){
				
				String word = keyWord[i];
				
				if(!"".equals(title)) {
					sql.append(" or lawname like '%" + word + "%' ");
				}
				
				if(!"".equals(content)) {
					sql.append(" or lawcontent like '%" + word + "%' ");
				}
				
				if(!"".equals(wordNum)) {
					sql.append(" or department like '%" + word + "%' ");
				}
				
				if(!"".equals(sendDept)) {
					sql.append(" or tiao like '%" + word + "%' ");
				}
			}
		}
		
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = new DBConnect().getConnect();
			ps = conn.prepareStatement("select count(*) ROWNUMS from ( " + sql.toString() + ") T ");
			rs = ps.executeQuery();
			if(rs.next()) {
				totalCount = rs.getInt(1);
			} else {
				totalCount = 0;
			}
			
			rs.close();
			ps.close(); 
			
			
			int pagesize = 10;//每页显示记录数
			int liststep = 9;//最多显示分页页数
			int pages = 1;//默认显示第一页
			if (request.getParameter("page") != null) {
				try {
					pages = Integer.parseInt(request.getParameter("page"));//分页页码变量
				} catch(Exception e) {
					pages = 1;
				}
			}
			int count = totalCount;//假设取出记录总数
			int pagescount = (int) Math.ceil((double) count / pagesize);//求总页数，ceil（num）取整不小于num
			if (pagescount < pages) {
				pages = pagescount;//如果分页变量大总页数，则将分页变量设计为总页数
			}
			if (pages < 1) {
				pages = 1;//如果分页变量小于１,则将分页变量设为１
			}
			int listbegin = (pages - (int) Math.ceil((double) liststep / 2));//从第几页开始显示分页信息
			if (listbegin < 1) {
				listbegin = 1;
			}
			int listend = pages + liststep / 2;//分页信息显示到第几页
			if (listend > pagescount) {
				listend = pagescount + 1;
			}

			//显示数据部分
			int recordbegin = (pages - 1) * pagesize;//起始记录
			int recordend = 0;
			recordend = recordbegin + pagesize;
			//最后一页记录显示处理
			if (pages == pagescount) {
				recordend = (int) (recordbegin + pagesize * (count % pagesize) * 0.1);
			}
			
			from = recordbegin + 1;
			to = from + pagesize -1;
			if(to>count) {
				to = count;
			}
			
			int beginrow=recordbegin+pagesize;
			if(beginrow<1){
				beginrow=pagesize;
			}
			
			/*
			String strSql="select * from ( "
						 + " select DATA_GRID_ROWNUM.*,rownum DATA_GRID_ROWNUM from ( " 
						 +		sql.toString() + " "
						 + ")DATA_GRID_ROWNUM  "
						 + " where rownum<=" + beginrow + ") DATA_GRID_ROWNUM "
						 + " where DATA_GRID_ROWNUM > " + recordbegin;
			ps = conn.prepareStatement(strSql.toString());
			*/
			
			String query=DbUtil.getLimitString(sql.toString(),"lawname",recordbegin, pagesize);
			
			ps = conn.prepareStatement(query.toString());
			rs = ps.executeQuery();
			
			String contentTemp = "";
			String policyType = "";
			String deptName = "";
			
			while(rs.next()) {
				String[] searchAreas = searchArea.replace(" ","~!").split("~!");
				
				deptName = rs.getString("department");
				policyType = rs.getString("tiao");
				contentTemp = ""+rs.getString("lawcontent"); 
				contentTemp = contentTemp.trim();
				//contentTemp = contentTemp.replaceAll(" ","");
				//contentTemp = contentTemp.replaceAll("&nbsp;","");
				//contentTemp = contentTemp.replaceAll("<br/>","");
				//contentTemp = contentTemp.replaceAll("<br>","");
				//contentTemp = contentTemp.replaceAll("</br>","");
				contentTemp = contentTemp.replaceAll("？","");
				contentTemp=WebUtil.replaceHTML(contentTemp);
				
				int _index=0;
				int _length=contentTemp.length();
				if( _length> 80) {
					for(int i = 0; i < searchAreas.length; i++){
						if(searchAreas[i]!=null && !"".equals(searchAreas[i])){		
							_index=contentTemp.indexOf(searchAreas[i]);
							if(_index>0){
								break;
							}
						}
					}	
					if(_index<=20){
						contentTemp = contentTemp.substring(0, 80);
					}else{
						if(_length>(_index+60)){
							contentTemp = contentTemp.substring(_index-20, _index+60);
						}else{
							contentTemp = contentTemp.substring(_index-20, _length);
						}
					}
					
				}
				
				String titleHTML = rs.getString("lawname");
				String contentHTML = contentTemp;
				
				
				
				for(int i = 0; i < searchAreas.length; i++){
					if(searchAreas[i]!=null && !"".equals(searchAreas[i])){
						titleHTML = titleHTML.replaceAll(searchAreas[i],"<font color='red'>"+searchAreas[i]+"</font>");
						contentHTML = contentHTML.replaceAll(searchAreas[i],"<font color='red'>"+searchAreas[i]+"</font>");
					}
				}
				
				resultHTML.append("<div style=\"margin-bottom:20px;margin-left: 10px;list-style: 150%; \" >");
				resultHTML.append("<span style=\"padding:5 0 5 0;\">");
				resultHTML.append("<a href=javascript:void(0); style=\"font-size:14px;text-decoration: underline;\" onclick=\"loadAll('"+rs.getString("object_id")+"')  ");
				resultHTML.append("\" ; >");
				resultHTML.append(titleHTML);
				resultHTML.append("</a>");
				//resultHTML.append(" <font color='#CCCCCC'>[" + deptName + "->" +LawService.getPolicyTypeFullNameById(policyType) + "]</font>");
				resultHTML.append("</span><br/>");
				resultHTML.append("<div style=\"font-size:13px;\">");
				resultHTML.append(contentHTML);
				resultHTML.append("</div>");
				resultHTML.append("</div><p>");
			}
			//System.out.print("\n"+resultHTML);
			pageInfo.append("<div style=\"font-size:14px;text-align:center;\">");
			if (pages > 1) {
				pageInfo.append("<a href=javascript:goTo(" + (pages - 1) + ")>上一页</a>");
				
			}//>显示上一页
			//<显示分页码
			for (int i = listbegin; i < listend; i++) {
				if (i != pages) {//如果i不等于当前页
					pageInfo.append(
					"<a href=javascript:goTo(" + i + ")>[" + i + "]</a>");
				} else {
					pageInfo.append("[" + i + "]");
				}
			}//显示分页码>
			//<显示下一页
			if (pages != pagescount) {
				pageInfo.append(
				"<a href=javascript:goTo(" + (pages + 1) + ")>下一页</a>");
			}//>显示下一页
			//>显示分页信息
			pageInfo.append("</div>");
			
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			DbUtil.close(rs);
			DbUtil.close(ps);
			DbUtil.close(conn);
		}
	}
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<title>法律法规全文搜索</title>
<style>

body {
	font-size: 12px;
	line-height: 150% !important;
}


td {
	font-size: 14px !important;
	line-height: 100% !important;
}

input {
	font-size: 12px !important;
	line-height: 100% !important;
}

a {
	font-size: 16px !important;
}

a font {
	font-size: 16px !important;
}
</style>
</head>

<body onload="setChecked();">
<form name="thisForm" id="thisForm" method="post" action="${pageContext.request.contextPath}/tws/repository/law/lawSearch.jsp" />
	<input type="hidden" name="id" id="id">
	<input type="hidden" name="parement" id="parement" value="loadAll">
	<div style="height: 20px"></div>
	<table width="97%" border="0" cellpadding="0" cellspacing="0">
		<tr height="10"> 
			<td  align="right">法律法规搜索条件：</td>
			<td  align="left">&nbsp; 
				<input style="border:1px solid #6595d6;" name="searchArea" type="text" size="40" maxlength="50" value="<%=searchArea%>" /> 
				<input name="searchB" type="button" class="flyBT" id="searchB" value="确定" onclick="search();" />
			</td>
			<td align="left" id="Policy_title" valign="top">
				包括：&nbsp;&nbsp; 
				<input type="checkbox" name="title" id="title" style="border:none" value="checkbox" <%="".equals(title)? "" : "checked" %>/> 
				法规文件名称&nbsp;&nbsp; 
				<input type="checkbox" name="content" id="content"  style="border:none" value="checkbox" <%="".equals(content)? "" : "checked" %> /> 
				法规内容&nbsp;&nbsp; 
				<input type="checkbox" name="wordNum" id="wordNum" style="border:none" value="checkbox" <%="".equals(wordNum)? "" : "checked" %>/> 
				发文编号&nbsp;&nbsp; 
				<input type="checkbox" name="sendDept" id="sendDept" style="border:none" value="checkbox" <%="".equals(sendDept)? "" : "checked" %>/>
				<input type="hidden" name="page" id="page" value="<%=page %>">
				发文单位
			</td>
		</tr>
	</table>
	<br/>  

<% if(totalCount!=-1){ %>
<table width="100%" style="border-top:1px solid #6595d6;border-collapse:collapse;height: 25px; ">
	<tr bgColor="#F0F7F9">
		<td align="right" style="padding-right: 20px;"> 
		约有<font color="red"><%=totalCount==-1?"0":totalCount %></font>项符合 <font color="red">
							<%=searchArea %></font> 的查询结果，以下是第<%=from%>到<%=to %>项
		</td>
	</tr>
</table>
<%} %>	

<%
	if(totalCount>0) {
%>
<div id="div_contenct" style="height:450px;overflow:auto; list-style: 150%;">

<%=resultHTML.toString() %>

</div>
<% if(totalCount!=-1){ %>
<table width="100%" style="border-bottom:1px solid #6595d6;border-collapse:collapse;height: 25px; ">
	<tr bgColor="#F0F7F9">
		<td align="right" style="padding-right: 20px;"> </td>
	</tr>
</table>
<%} %>	
<%=pageInfo.toString()  %>
<%
	} else if(totalCount == 0){
%>
<table width="100%" style="border-top:1px solid #6595d6;border-collapse:collapse;align:center">
	<tr bgColor="#F0F7F9" height="24px">
		<td align="center">搜索不到任何记录，请更改搜索条件重试！
		</td>
	</tr>
</table>
<br/>
<%
	}
%>
</form>

</body>

<script>

Ext.onReady(function(){
	$("#div_contenct").height($(window).height()-150);
	/*
	Ext.EventManager.onWindowResize(function(){
		window.location.reload();
	});*/
});


function loadAll(objectId){
	var param = "&objectId="+objectId+"&parement=loadAll";
	var url = "${pageContext.request.contextPath}/law.do?method=view" + param;
	
	matech.openTab(objectId,"法律法规详细",url,false,parent);
	
}

function search() {
	
	//处理 用户 录入的 内容 
	if(thisForm.searchArea.value==''){
		alert("请输入检索条件！");
		return false;
		 
	} else {
		
		var isCheck = false;
		
		if(thisForm.title.checked || thisForm.content.checked || thisForm.wordNum.checked || thisForm.sendDept.checked){
			isCheck = true;
		}
		 
		if(!isCheck){
			alert("请至少选择一个条件！");
			return false;
		}
		
		thisForm.submit();
		matech.showWaiting(); //等待动画
	}	
}

function setChecked() {
	if(!thisForm.title.checked && !thisForm.content.checked && !thisForm.wordNum.checked && !thisForm.sendDept.checked) {
		thisForm.title.checked = true;
		thisForm.content.checked = true;
	}
}

function goTo(page) {
	document.getElementById("page").value = page;
	search();
}
</script>
</html>
