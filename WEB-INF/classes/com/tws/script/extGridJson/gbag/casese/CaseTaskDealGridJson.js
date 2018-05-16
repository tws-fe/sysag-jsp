/*
 * CaseTaskDealGridJson.js
 * 
 * com.tws.script.extGridJson.gbag.casese.CaseTaskDealGridJson.js
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
	
    if(flag.equals("leader") || flag.equals("all")){
		
    	//去掉签收功能： t.issign='1'已签收的状态
		sql1=" SELECT T.*,k.name as statenames FROM vw_ga_case_task T  left join k_dic k  on (T.casestate=k.value and ctype='案件状态')  WHERE T.ORGANID_='"+organId+"'  AND T.STATE IN ('1','2','3','4') ";
		
	}
    if(flag.equals("policeLeader")){
		sql1="SELECT T.*,k.name as statenames FROM vw_ga_case_task T  left join k_dic k  on (T.casestate=k.value and ctype='案件状态')  WHERE T.ORGANID_='"+organId+"' AND T.STATE IN ('1','2','3','4') AND (T._USER_AUDITDIRECTOR= '"+userId+"' or exists(select 1 from ga_police_shift tt where T._USER_AUDITDIRECTOR=tt.USERID and tt.USER_LEADER='"+userId+"') ) ";
	
	}
    if(flag.equals("police")){
		
		sql1=" SELECT T.*,k.name as statenames FROM vw_ga_case_task T  left join k_dic k  on (T.casestate=k.value and ctype='案件状态')   WHERE T.ORGANID_='"+organId+"' AND T._USER_AUDITDIRECTOR= '"+userId+"'  AND T.STATE IN ('1','2','3','4') ";
		
	}
   
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
