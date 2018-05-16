/*
 * CaseSummitGridJson.js
 * 
 * com.tws.script.extGridJson.gbag.casese.CaseSummitGridJson.js
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
	
	
	
   sql1=" SELECT T.*,k.name as statenames ,(finishsum*100/allsum) as taskschedule FROM VW_GA_CASE T left join k_dic k  on (T.state=k.value and ctype='案件状态')  WHERE T.ORGANID_='"+organId+"' AND EXISTS(SELECT 1 FROM GA_CASE_CONCERN TT1 WHERE T.UUID=TT1.mainformId AND TT1.CONCERNUSER='"+userId+"') group by T.uuid  ";				

	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
