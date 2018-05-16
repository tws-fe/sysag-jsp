/*
 * 我登记的来访列表
 * CaseMyReceiveVisitListGridJson.js
 * 
 * com.tws.script.extGridJson.gbag.casese.CaseMyReceiveVisitListGridJson.js
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
	
	sql1="SELECT t.*,t1.casenumber,t1.casename,t1.casetype,t1.`_user_auditdirector`,u.name auditdirector ,t2.name AS receivecopname ,k.name AS casenaturename,k2.name AS statenames FROM GA_VISIT t left JOIN ga_case t1 ON t.casenum=t1.uuid LEFT JOIN K_USER T2 ON t.receivecop=t2.id LEFT JOIN K_USER u ON t1.`_user_auditdirector`=u.id  LEFT JOIN k_dic k ON t1.casenature=k.value  LEFT JOIN k_dic k2 ON (t1.state=k2.value and k2.ctype='案件状态') WHERE t.ORGANID_='"+organId+"' and t.receivecop='"+userId+"' ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}