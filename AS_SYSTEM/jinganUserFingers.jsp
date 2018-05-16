<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"
%><%@ page import="java.util.*"
%><%@ page import="java.sql.Connection"
%><%@ page import="net.sf.json.JSONObject"
%><%@ page import="net.sf.json.JSONArray"
%><%@ page import="com.szk.framework.pub.db.DBConnect"
%><%@ page import="com.szk.framework.pub.db.DbUtil"
%><%@ page import="com.szk.framework.pub.util.StringTools"
%><%
	String organId=StringTools.checkNull(request.getParameter("organId"));
	String userIp=StringTools.checkNull(request.getParameter("userIp"));
	Connection conn = null;
	List<Map<String,String>> list = null;
	String sql="";
	try{
		conn = new DBConnect().getConnect();
		DbUtil db = new DbUtil(conn);
		
		if(organId.equals("")){
			if(userIp.equals("")){
				list = db.getListBySql("select loginid,clientDogSysUi from k_user where clientDogSysUi>'' and state=0");
			}else{
				list = db.getListBySql("SELECT t.loginid,t.clientDogSysUi FROM k_user t WHERE t.clientDogSysUi>'' AND t.state=0 AND EXISTS(SELECT 1 FROM oa_visitip t1 WHERE t.DepartID=t1.organId_ AND t1.loginIp='"+userIp+"')");
			}
		}else{
			list = db.getListBySql("select loginid,clientDogSysUi from k_user where clientDogSysUi>'' and state=0 and DepartID='"+organId+"'");
		}
		
		for (int i = 0; i < list.size(); i++){
			Map<String,String> m=list.get(i);

			String loginid=m.get("loginid");
			String clientDogSysUi=m.get("clientdogsysui");
			
			out.print(loginid+"`"+clientDogSysUi+"\r\n");
		}
		//out.write(l);
	}catch(Exception e){
		e.printStackTrace();
	}finally{
		DbUtil.close(conn);
	}
	
	//out.println("fail");
%>
