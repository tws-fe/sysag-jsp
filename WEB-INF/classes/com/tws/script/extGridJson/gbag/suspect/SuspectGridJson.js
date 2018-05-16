/*
 * SuspectGridJson.js
 * 
 * com.tws.script.extGridJson.gbag.suspect.SuspectGridJson.js
 * 
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var organId=userSession.getUserOrganId();
	var userId=userSession.getUserId();
	
	
	sql1=" SELECT T.*,k.casename FROM ga_suspect T LEFT JOIN ga_case k  ON T.mainformid=k.uuid  WHERE T.ORGANID_='"+organId+"' ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
