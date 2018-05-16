<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"
%><%@ page import="java.util.*"
%><%@ page import="java.sql.Connection"
%><%@ page import="net.sf.json.JSONObject"
%><%@ page import="net.sf.json.JSONArray"
%><%@ page import="com.szk.util.date.DateUtils"
%><%@ page import="com.szk.framework.pub.db.DBConnect"
%><%@ page import="com.szk.framework.pub.db.DbUtil"
%><%@ page import="com.szk.framework.pub.util.StringTools"
%><%

	Connection conn = null;
	List<Map<String,String>> list = null;
	String sql="";
	try{
		conn = new DBConnect().getConnect();
		DbUtil db = new DbUtil(conn);
		String uuid=StringTools.checkNull(request.getParameter("uuid"));
		
		list = db.getListBySql("SELECT uuid,fingertxt FROM ja_niao_person ");
		
		for (int i = 0; i < list.size(); i++){
			Map<String,String> m=list.get(i);

			String identitynumber=m.get("uuid");
			String fingertxt=m.get("fingertxt");
						
			out.print(identitynumber+"`"+fingertxt+"\r\n");
		}
		
		String curDateTime=DateUtils.getCurrentDateTime();
		String DateTimeHour=DateUtils.getDateTime(curDateTime, "H", -48);
		
		list = db.getListBySql("SELECT uuid,fingertxt FROM ja_caseperson where entertime>='"+DateTimeHour+"' and isfinish='0' ");
		
		for (int i = 0; i < list.size(); i++){
			Map<String,String> m=list.get(i);

			String identitynumber=m.get("uuid");
			String fingertxt=m.get("fingertxt");
						
			out.print(identitynumber+"`"+fingertxt+"\r\n");
		}
		
		//out.write(l);
	}catch(Exception e){
		e.printStackTrace();
	}finally{
		DbUtil.close(conn);
	}
	
	//out.println("fail");
%>
