/*
 * CaseConfirmListGridJson.js
 * 
 * com.tws.script.extGridJson.gbag.casese.CaseConfirmListGridJson.js
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
			
	sql1=" SELECT T.*,k.name as statenames FROM VW_GA_CASE T left join k_dic k  on (T.state=k.value and ctype='案件状态')  WHERE T.ORGANID_='"+organId+"' AND T.state IN ('01','02','61','03','08','60') group by T.uuid order by T.bjsj desc ";

	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
