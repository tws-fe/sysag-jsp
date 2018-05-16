/**
 * 
 * 全所主办民警
 * 
 * autoHitSelect.gbag.ToReloAuditdirectorType.js
 * 
 */
function getJsonData(){
	
	var ctlUnitId=userSession.getCtlUnitId(); 
	
	
	var sql1="SELECT id as value, NAME FROM k_user WHERE id IN (SELECT userid FROM k_userrole WHERE rid=(SELECT id FROM k_role WHERE rolename = '$2')) and departid='"+ctlUnitId+"'";
	var sql2="SELECT id as value, NAME FROM k_user WHERE id IN (SELECT userid FROM k_userrole WHERE rid=(SELECT id FROM k_role WHERE rolename = '$2')) and departid='"+ctlUnitId+"' ";
	var sql3="SELECT id as value, NAME FROM k_user WHERE id IN ('$1')";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){

}