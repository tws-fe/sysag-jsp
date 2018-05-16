/**
 * 
 * 全所主办民警
 * 
 * autoHitSelect.gbag.AuditdirectorPliceLeaderType.js
 * 
 */
function getJsonData(){
	
	var ctlUnitId=userSession.getCtlUnitId(); 
	
	
	var sql1="SELECT DISTINCT  T.id AS id,T.NAME FROM k_user T,ga_police_shift T1 WHERE T.id=T1.USERID AND T1.USER_LEADER='$2' AND T.departid='"+ctlUnitId+"' ";
	var sql2="SELECT DISTINCT  T.id AS id,T.NAME FROM k_user T,ga_police_shift T1 WHERE T.id=T1.USERID AND T1.USER_LEADER='$2' AND T.departid='"+ctlUnitId+"' ";
	var sql3="SELECT DISTINCT  T.id AS id,T.NAME FROM k_user T,ga_police_shift T1 WHERE T.id=T1.USERID AND T1.USERID='$1' AND T.departid='"+ctlUnitId+"' ";	
		
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){

}