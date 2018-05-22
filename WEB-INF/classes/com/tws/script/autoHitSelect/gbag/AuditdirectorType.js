/**
 * 
 * 全所主办民警
 * 
 * autoHitSelect.gbag.AuditdirectorType.js
 * 
 */
function getJsonData(){
	
	var ctlUnitId=userSession.getCtlUnitId(); 
	
	
	var sql1="SELECT DISTINCT  loginid AS loginid,NAME FROM k_user WHERE departid='"+ctlUnitId+"' " ;
	var sql2="SELECT DISTINCT  loginid AS loginid,NAME FROM k_user WHERE departid='"+ctlUnitId+"' and (loginid like '%$1%'  or NAME like '%$1%' )";
	var sql3="SELECT DISTINCT  loginid AS loginid,NAME FROM k_user WHERE loginid in ('$1')";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){

}