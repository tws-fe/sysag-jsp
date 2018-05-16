/*
 * 单位取数
 * 
 * sys.unit.UnitByParentId.js
 * 
 * 单位下拉，id为FID，初始化需要传递一个初始单位参数，初始时会拿到该单位下级的所有单位
 * 
 */
function getJsonData(){
	
	var refer=request.get("refer");
	var ctlUnitInnerCode=userSession.getCtlUnitInnerCode();
	var ctlUnitId=userSession.getCtlUnitId();
	
	var sql1="SELECT departid,standbyname FROM k_organ WHERE parentdepartid='$2' ORDER BY departcode ";
	if(refer=="" || refer.indexOf("root")>=0){
		sql1="SELECT departid,standbyname FROM k_organ WHERE departid='"+ctlUnitId+"' ORDER BY departcode ";
	}
	var sql2="SELECT departid,standbyname FROM k_organ WHERE parentdepartid='$1' ORDER BY departcode";
	var sql3="SELECT departid,standbyname FROM k_organ WHERE departid in('$1')";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
