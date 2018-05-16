/**
 * 控制单位权限数据
 * 
 * sys.unit.BasicCtlUnitHasDeptImpl.js
 * 
 */
function getJsonData(){
	
	var ctlUnitInnerCode=userSession.getCtlUnitInnerCode();
	var ctlUnitId=userSession.getCtlUnitId();
	
	var sql1="SELECT departid,standbyname FROM k_organ WHERE departid='"+ctlUnitId+"' and ishasdept='1' ORDER BY departcode ";
	var sql2="SELECT departid,standbyname FROM k_organ WHERE parentdepartid='$1' and ishasdept='1' ORDER BY departcode";
	var sql3="SELECT departid,standbyname FROM k_organ WHERE departid in('$1')";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}