/*
 * FinishCaseGridJson.js
 * 已结案 刑事案件
 * com.tws.script.extGridJson.gbag.casese.FinishCaseGridJson.js
 * 
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var flag=request.get("flag");//获取用户角色
	var ismyCase=request.get("ismyCase");//是否为我的案件标记
	
	var organId=userSession.getUserOrganId();
	var userId=userSession.getUserId();
	
	if(ismyCase.equals("yes")){//判断是否是我的案件，yes 是，no 不是
		sql1="SELECT T.*,k.name as statenames,(finishsum*100/allsum) as taskschedule FROM VW_GA_CASE T left join k_dic k  on (T.state=k.value and ctype='案件状态')  WHERE T.ORGANID_='"+organId+"' AND T.state='04' AND T._USER_AUDITDIRECTOR= '"+userId+"' group by T.uuid  order by T.bjsj desc";
	}
	else{
		//领导
	    if(flag.equals("leader")||flag.equals("all")){
			
			sql1=" SELECT T.*,k.name as statenames,(finishsum*100/allsum) as taskschedule FROM VW_GA_CASE T left join k_dic k  on (T.state=k.value and ctype='案件状态')  WHERE T.ORGANID_='"+organId+"' AND T.state='04' and t.casetype='刑事案件'  group by T.uuid  order by T.bjsj desc";
			
		}//探长
	    if(flag.equals("policeLeader")){
	    	//var policeLeader=request.get("policeLeader");//获取用户角色
			sql1="SELECT T.*,k.name as statenames,(finishsum*100/allsum) as taskschedule FROM VW_GA_CASE T left join k_dic k  on (T.state=k.value and ctype='案件状态')  WHERE T.ORGANID_='"+organId+"' AND T.state='04' and t.casetype='刑事案件' AND (T._USER_AUDITDIRECTOR= '"+userId+"' or exists(select 1 from ga_police_shift tt where T._USER_AUDITDIRECTOR=tt.USERID and tt.USER_LEADER='"+userId+"') )  group by T.uuid order by T.bjsj desc";
		
		}//主办民警
	    if(flag.equals("police")){
			
			sql1=" SELECT T.*,k.name as statenames,(finishsum*100/allsum) as taskschedule FROM VW_GA_CASE T left join k_dic k  on (T.state=k.value and ctype='案件状态')  WHERE T.ORGANID_='"+organId+"' AND T.state='04' and t.casetype='刑事案件' AND T._USER_AUDITDIRECTOR= '"+userId+"'  group by T.uuid order by T.bjsj desc";
			
		}
   }
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
