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

	Connection conn = null;
	List<Map<String,String>> list = null;
	String sql="";
	try{
		conn = new DBConnect().getConnect();
		DbUtil db = new DbUtil(conn);
		
		if(organId.equals("")){
			list = db.getListBySql("select loginid,clientDogSysUi from k_user where clientDogSysUi>'' and state=0 AND sex='F' ");
		}else{
			list = db.getListBySql("select loginid,clientDogSysUi from k_user where clientDogSysUi>'' and state=0 AND sex='F' and DepartID='"+organId+"'");
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
