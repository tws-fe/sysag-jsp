/*
 * archiveTaskItemsListGridJson.js
 * 
 * com.tws.script.extGridJson.gbag.archive.archiveTaskItemsListGridJson.js
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
	var casetype=request.get("casetype");//获取案件编号
	
	sql1="SELECT T.*,k.name as statenames FROM vw_ga_case_task T left join k_dic k on (T.casestate=k.value and k.ctype='案件状态') WHERE T.ORGANID_='"+organId+"' AND T.STATE='3' AND T.ispaper='1' AND T.casetype='"+casetype+"' "; //是否有任务材料。有材料就入库，没材料就不需要入库
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}