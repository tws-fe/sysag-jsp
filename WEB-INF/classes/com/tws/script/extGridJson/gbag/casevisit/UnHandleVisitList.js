/*
 * UnHandleVisitList.js
 * 
 *com.tws.script.extGridJson.gbag.casevisit.UnHandleVisitList.js
 * 
 * 扣押物品查询
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var organId=userSession.getUserOrganId();
	
	
	sql1="SELECT CONCAT(DATEDIFF(NOW(),g.oper_time_),'天') AS DiffDate," +
			"CONCAT(g1.casename,'-',g1.casenumber) AS casenames," +
			"T2.fname AS casenaturename," +
			"t3.name AS statenames," +
			"T1.NAME as _USERNAME_AUDITDIRECTOR," +
			"g1.bjsj bjsj," +
			"g1.casedetails," +
			"g.* " +
			"FROM ga_visit g " +
			"LEFT JOIN ga_case g1 ON g.casenum=g1.casenumber " +
			"LEFT JOIN GA_CASE_NATURE T2 ON g1.casenature=T2.fbm " +
			"LEFT JOIN k_dic T3 ON G1.state=T3.value AND T3.ctype='案件状态'" +
			"LEFT JOIN K_USER T1 ON g1._user_auditdirector=T1.id " +
			"WHERE g.organid_='"+organId+"' AND result='需跟进' " +
			"order by diffdate desc  ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
