/*
 * CasePersonCabinetDoorGridJson.js
 * 
 * com.tws.script.extGridJson.police.CasePersonCabinetDoorGridJson.js
 * 
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	
	var organId=userSession.getUserOrganId();
	var userId=userSession.getUserId();
	
	sql1=" SELECT t.* FROM vw_ja_caseperson t WHERE t.organId_='"+organId+"' AND exists(select 1 from ja_opencabinet t1 where t.uuid=t1.ajuuid) order by casenumber desc";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
