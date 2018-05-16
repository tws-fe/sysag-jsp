/*
 * 用户列表GRID数据
 * 
 * com.tws.script.autoHitSelect.sys.user.UserListGridJson.js
 * 
 * request，userSession 为固定页面对象，可以直接使用
 * resultMap 为固定结果对象
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var unitId=request.get("unitId");
	
	var userRoleids=userSession.getUserRoleids();
	var isSysManager=StringUtil.getSubStrIndex(userRoleids,"1",",");
	
	if(isSysManager=="-1"){
		sql1 = " SELECT T.ID,T.NAME,T.LOGINID,T.SEX,T.SPECIALTY,T.DEPARTID,T2.DEPARTNAME,T2.STANDBYNAME,T.DEPARTMENTID,T1.DEPARTNAME AS DEPTNAME,T.MOBILEPHONE,T.STATE,CASE IFNULL(clientDogSysUi,'') WHEN '' THEN '' ELSE '已采集' END AS ISFINGER "
			   +" FROM K_USER T,K_DEPARTMENT T1,K_ORGAN T2 "
			   +" WHERE T.DEPARTID=T2.DEPARTID AND T.DEPARTMENTID=T1.AUTOID AND (T.DEPARTID='"+ unitId+"' OR T.DEPARTMENTID='"+ unitId+"') "
			   +" AND NOT EXISTS(SELECT 1 FROM k_userrole B1 WHERE T.ID=B1.userid AND rid='1' ) "
			   +" ORDER BY T1.ordercode,T.NAME ";		
	}else{
		sql1 = " SELECT T.ID,T.NAME,T.LOGINID,T.SEX,T.SPECIALTY,T.DEPARTID,T2.DEPARTNAME,T2.STANDBYNAME,T.DEPARTMENTID,T1.DEPARTNAME AS DEPTNAME,T.MOBILEPHONE,T.STATE,CASE IFNULL(clientDogSysUi,'') WHEN '' THEN '' ELSE '已采集' END AS ISFINGER "
			   +" FROM K_USER T,K_DEPARTMENT T1,K_ORGAN T2 "
			   +" WHERE T.DEPARTID=T2.DEPARTID AND T.DEPARTMENTID=T1.AUTOID AND (T.DEPARTID='"+ unitId+"' OR T.DEPARTMENTID='"+ unitId+"') "
			   +" ORDER BY T1.ordercode,T.NAME ";		
	}
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
