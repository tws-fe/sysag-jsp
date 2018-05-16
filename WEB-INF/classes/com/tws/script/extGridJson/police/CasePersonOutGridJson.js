/*
 * CasePersonOutGridJson.js
 * 
 * com.tws.script.extGridJson.police.CasePersonOutGridJson.js
 * 
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var formType=request.get("formType");
	
	var organId=userSession.getUserOrganId();
	var userId=userSession.getUserId();
	
	if(formType=="out"){
		sql1=" SELECT t.*,t.isout as DSTATUSNAME FROM vw_ja_caseperson t WHERE t.organId_='"+organId+"' AND t.status=2 and t.isfinish=0 and t.isout=0 order by casenumber desc";
	}else if(formType=="back"){
		sql1=" SELECT t.*,t.isout as DSTATUSNAME FROM vw_ja_caseperson t WHERE t.organId_='"+organId+"' AND t.status=2 and t.isfinish=0 and t.isout=1 order by casenumber desc";
	}
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
