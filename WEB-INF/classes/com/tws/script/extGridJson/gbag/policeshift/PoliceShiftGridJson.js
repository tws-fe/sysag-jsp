/*
 * PoliceShiftGridJson.js
 * 
 * com.tws.script.extGridJson.gbag.policeshift.PoliceShiftGridJson.js
 * 
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var organId=userSession.getUserOrganId();
	var userId=userSession.getUserId();
	
	
	sql1=" SELECT t.uuid, t.SHIFTNAME,GROUP_CONCAT(distinct t.USER_LEADER) AS USER_LEADER,GROUP_CONCAT(distinct t1.name) AS USER_LEADER_NAME,"
		  +"       GROUP_CONCAT(t.USERID) AS USERID,GROUP_CONCAT(t2.name) AS USER_NAME "
		  +" FROM GA_POLICE_SHIFT T "
		  +" INNER JOIN K_USER T1 ON T.USER_LEADER=T1.loginID "
		  +"	INNER JOIN K_USER T2 ON T.USERID=T2.loginID "
		  +" WHERE T.ORGANID_='"+organId+"' "
		  +" GROUP BY t.SHIFTNAME";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
