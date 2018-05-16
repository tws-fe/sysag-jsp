/*
 * UsResGridJson.js
 * 
 *com.tws.script.extGridJson.gbag.seizeRes.UsResGridJson.js
 * 
 * 扣押物品 台账 详情
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var organId=userSession.getUserOrganId();
	var uuid=request.get("uuid");
	
	sql1=" SELECT T.* FROM VW_GA_DETENTION_ACCOUNTS T WHERE T.ORGANID_='"+organId+"' AND t.uuid='"+uuid+"' ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
