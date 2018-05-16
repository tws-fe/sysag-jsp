/*
 * archiveItemsXZListGridJson.js
 * 
 * com.tws.script.extGridJson.gbag.archive.archiveItemsXZListGridJson.js
 * 
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var flag=request.get("flag");//获取用户角色
	var organId=userSession.getUserOrganId();
	var userId=userSession.getUserId();
	var casenumber=request.get("casenumber");//获取案件编号
	
	sql1 = "SELECT T.*,t6.name As deliverstatename FROM VW_GA_FILES_TASK T LEFT JOIN `k_dic` `t6` ON (`T`.`deliverstate` = `t6`.`value` AND `t6`.`ctype` ='移交状态') WHERE T.ORGANID_='"+organId+"' AND T.casetype='行政案件' ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}