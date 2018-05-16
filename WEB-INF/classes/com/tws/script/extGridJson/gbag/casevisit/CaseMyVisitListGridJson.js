/*
 * 我的来访列表
 * CaseMyVisitListGridJson.js
 * 
 * com.tws.script.extGridJson.gbag.casese.CaseMyVisitListGridJson.js
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
	
	/*sql1="SELECT t.*,t1.casenumber,t1.casename,t1.casetype,t1.`_user_auditdirector`,u.name auditdirector ,t2.name AS receivecopname FROM GA_VISIT t left JOIN ga_case t1 ON t.casenum=t1.uuid LEFT JOIN K_USER T2 ON t.receivecop=t2.id LEFT JOIN K_USER u ON t1.`_user_auditdirector`=u.id WHERE t.ORGANID_='"+organId+"' ";
*/
	sql1="SELECT k.* ,T.`casenumber`,T.`casename`,T.`casenature`,T.casetype ,T.casedetails,T2.fname AS casenaturename,t3.name AS statenames,TT.VISITNUMS FROM ga_visit k "
    +"LEFT JOIN ga_case T ON  k.casenum =T.`casenumber`"
    +" LEFT JOIN GA_CASE_NATURE T2 ON T.casenature=T2.fbm "
    +"LEFT JOIN ( "
	 +"SELECT casenum,COUNT(*)  AS VISITNUMS FROM GA_VISIT GROUP BY casenum" 
	 +" ) TT ON T.UUID=TT.casenum "
	 
	 +" LEFT JOIN k_dic T3 ON T.state=T3.value AND T3.ctype='案件状态' "
	 +" WHERE k.ORGANID_='"+organId+"' AND k.auditdirectors='"+userId+"' ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}