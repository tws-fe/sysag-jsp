/*
 * 来访统计列表
 * CaseTotleVisitListGridJson.js
 * 
 * com.tws.script.extGridJson.gbag.casese.CaseTotleVisitListGridJson.js
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
	
	sql1="SELECT T.*,T1.NAME AS _userNAME_auditdirector,T2.fname AS casenaturename,t3.name AS statenames,TT.VISITNUMS,CASE IFNULL(TT1.mainformId,'') WHEN '' THEN '' ELSE CONVERT('已关注' USING gbk) END AS isconcern "
					  +" FROM GA_CASE T  "
					  +"	INNER JOIN ( "
					  +"      SELECT casenum,COUNT(*)  AS VISITNUMS FROM GA_VISIT GROUP BY casenum "
					  +"	) TT ON T.UUID=TT.casenum "
					  +"   LEFT JOIN K_USER T1 ON T._user_auditdirector=T1.id "
					  +"	LEFT JOIN GA_CASE_NATURE T2 ON T.casenature=T2.fbm  "
					  +"	LEFT JOIN k_dic T3 ON T.state=T3.value AND T3.ctype='案件状态' "
					  +" LEFT JOIN GA_CASE_CONCERN TT1 ON T.uuid=TT1.mainformId AND TT1.CONCERNUSER='"+userId+"' "
					  +" WHERE T.ORGANID_='"+organId+"' ";
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}