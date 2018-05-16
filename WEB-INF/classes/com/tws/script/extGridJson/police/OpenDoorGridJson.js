/*
 * OpenDoorGridJson.js
 * 
 * com.tws.script.extGridJson.police.OpenDoorGridJson.js
 * 
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var organId=userSession.getUserOrganId();
	var userId=userSession.getUserId();
	
	sql1=" SELECT t.* FROM ja_opendoor t WHERE t.organId_='"+organId+"' AND t.oper_user_id_='"+userId+"' order by sdate desc";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
