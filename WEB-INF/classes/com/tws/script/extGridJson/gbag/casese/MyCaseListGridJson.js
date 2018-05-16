/*
 * CaseUnSummitGridJson.js
 * 
 * com.tws.script.extGridJson.gbag.casese.CaseUnSummitGridJson.js
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
			
	sql1=" SELECT T.*,k.name as statenames, (finishsum*100/allsum) as taskschedule FROM VW_GA_CASE T left join k_dic k  on (T.state=k.value and ctype='案件状态')  WHERE T.ORGANID_='"+organId+"' AND T.state IN ('03','08','60','01','02','61') AND T._USER_AUDITDIRECTOR= '"+userId+"' order by T.bjsj desc ";

	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
