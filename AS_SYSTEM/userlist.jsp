<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<%@ page import="java.util.* " %>
<%@ page import="com.szk.framework.listener.* " %>
<%
	UserSession userSession = null;
	List userList = OnlineListListener.getList();
	
	int t=0;
	try{
		t=userList.size();
	}catch(Exception e){}
	request.setAttribute("userList",userList);

%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>在线人员列表</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/tws/js/utils.js"></script>
<script>

	function ext_init(){
        
	    var tbar = new Ext.Toolbar({
	   		renderTo: "divBtn",
	   		defaults: {autoHeight: true,autoWidth:true},
            items:[{
	            text:'刷新',
	            cls:'x-btn-text-icon',
	            icon:contextPath + btn_img_url + 'refresh.png',
	            handler:function(){
	           		 window.location.reload();
				}  
       		},'-',{
	            text:'给所有在线用户发消息',
	            cls:'x-btn-text-icon',
	            icon:contextPath + btn_img_url + 'mytask.png',
	            handler:function(){
					sendMessage('00A00');
				}
       		},'->'
			]
        });
        
    }
    Ext.onReady(function(){
		ext_init();
	})
</script>
</head>
<body>
<div id="divBtn"></div>
<div style="height:expression(document.body.clientHeight-27);overflow:auto;width: 100%;padding: 5px;">
<fieldset  style="width:100%">
	<legend>基本信息(共<%= t %>人)</legend>
	<div style="OVERFLOW: auto">
	 <table id="DataGridTable" cellSpacing="1" cellPadding="3" width="100%" bgColor="#6595d6" border="0">
	     <tr class="DGtd" style="height: 24px;">
	       <td noWrap align="middle" bgColor="#DDE9F9" >序号</td>
	       <td noWrap align="middle" bgColor="#DDE9F9">在线用户</td>
	       <td noWrap align="middle" bgColor="#DDE9F9">登录名</td>
           <td noWrap align="middle" bgColor="#DDE9F9">所在部门</td>
	       <td noWrap align="middle" bgColor="#DDE9F9">终端IP地址</td>
	       <td noWrap align="middle" bgColor="#DDE9F9">登陆时间</td>
	       
	       <td noWrap align="middle" bgColor="#DDE9F9">操作</td>
	     </tr>
		<% int onlineCount = 0; //在线人数 %>
	    <c:forEach items="${userList}" var="us"  varStatus="var">
			<tr onmouseover="this.bgColor='#E4E8EF';" onmouseout="this.bgColor='#ffffff';" style="${userSession.userSessionId == us.userSessionId ? 'font-weight:bold;color:blue;' : ''}" bgColor="#ffffff" >
				<td align="center"><%  onlineCount ++; %> <%=onlineCount%></td>
				<td>${us.userName} </td>
				<td>${us.userLoginId}</td>
				<td>${us.userDepartmentName}</td>
				<td>${us.userIp}</td>
				<td>${us.userLoginTime}</td>
				
				<td align="center">
					<input type="button" value="发送消息"  class="flyBT" onclick="sendMessage('${us.userId }');" />
					<input type="button" value="强制退出"  class="flyBT" onclick="kickUser('${us.userSessionId }','${us.userLoginId }');" />
				</td>
			</tr>
		</c:forEach>
	  </table>
	  <div style="margin-top: 10px;">在线人数为：<font color="red" style="font-weight:900;font-size: 15px;"><%= onlineCount %></font>人！</div>
	  
	</div>
</fieldset>



<fieldset  style="width:100%">
	<legend>并发处理</legend>
	<div style="OVERFLOW: auto">
	 <table id="DataGridTable" cellSpacing="1" cellPadding="3" width="100%" bgColor="#6595d6" border="0">
	     <tr class="DGtd" style="height: 22px;">
	       <td noWrap align="middle" bgColor="#DDE9F9">用户</td>
	       <td noWrap align="middle" bgColor="#DDE9F9">处理事项</td>
	       <td noWrap align="middle" bgColor="#DDE9F9">处理时间</td>
	     </tr>

	    <c:forEach items="${lockList}" var="lockinfo"  varStatus="var">
			<tr onmouseover="this.bgColor='#E4E8EF';" onmouseout="this.bgColor='#ffffff';" style="height: 22px; ${userSession.userSessionId == us.userSessionId ? 'font-weight:bold;color:blue;' : ''}" bgColor="#ffffff" >
				<td>${lockinfo.strUserid}</td>
				<td>${lockinfo.strKey}</td>
				<td>${lockinfo.strWorktime}</td>
			</tr>
		</c:forEach>
	  </table>
	</div>
</fieldset>
</div>
</body>
<script language="javaScript">
//----------------------------------
// 踢出在线用户
//----------------------------------
function kickUser(sessionId,user) {
	var _CUR_USER_LOGINID="${sessionScope.userSession.userLoginId}";
	
	if(_CUR_USER_LOGINID !="admin"){
		alert('对不起,你没有权限执行该操作!');
		return;		
	}
	
	if(user == 'admin') {
		alert('对不起,你不能强制退出管理员!');
		return;
	}
	if(sessionId == '')
		alert('对不起,系统错误,失败!');
	else {
		if(confirm("确定要强制退出该用户？")) {
			
			
			var onlineXmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			onlineXmlHttp.open("POST","${pageContext.request.contextPath}/onlineUser.do?method=kickUser&sessionId=" + sessionId,false);
			onlineXmlHttp.send();

			window.location.reload();
			
		}
	}
}

function sendMessage(userId) {

	if(userId == '') {
		alert("对不起,系统错误,发送失败");
	} else {
		var url = MATECH_SYSTEM_WEB_ROOT + "/AS_SYSTEM/sendMessage.jsp?userId=" + userId;
		matech.openWindow("发送消息",url,600,450,parent,function(){
		});			
	}

	/*
	
	if(userId == '') {
		alert("对不起,系统错误,发送失败");
	} else {
		var left = ( screen.availWidth - 500 ) / 2;
		var top = ( screen.availHeight - 400 ) / 2;
		window.open('${pageContext.request.contextPath}/AS_SYSTEM/sendMessage.jsp?userId=' + userId,'','left=' + left +',top=' + top + ',width=500,height=400,toolbar=no,menubar=no,scrollbars=yes,resizable=no, location=no,status=no');
	}*/

}




function showOrHide(sessionId) {
	var tbodyObj = document.getElementById("tbody" + sessionId);
	var imgObj = document.getElementById("img" + sessionId);
	if(tbodyObj.style.display == "") {
		tbodyObj.style.display = "none";
		imgObj.src = "${pageContext.request.contextPath}/images/plus.jpg";
	} else {
		tbodyObj.style.display = "";
		imgObj.src = "${pageContext.request.contextPath}/images/nofollow.jpg";
	}
}
</script>
</html>