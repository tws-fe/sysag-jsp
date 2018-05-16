/**
 * 
 * 案件分派规则组信息
 * 
 * com.tws.script.autoHitSelect.sys.AssignRuleGroup.js
 * 
 */
function getJsonData(){
	var sql1="";
	var sql2="";
	var sql3="";
	var unitId=request.get("unitId");
	
	/*sql1=" SELECT DepartID,DepartName"
		+" FROM  k_organ "
	    +" ORDER BY DepartID ";
	sql2="SELECT DepartID,DepartName  FROM  k_organ  where 1=2 ";
	sql3="SELECT DepartID,DepartName  FROM  k_organ  where DepartID in ('$1') ";*/	
	sql1="SELECT * FROM ga_police_assignrule WHERE organid_='"+unitId+"' ";

	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}