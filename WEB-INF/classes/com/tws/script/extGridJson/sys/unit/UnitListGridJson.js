/*
 * 单位列表GRID数据
 * 
 * com.tws.script.autoHitSelect.sys.unit.UnitListGridJson
 * 
 * request，userSession 为固定页面对象，可以直接使用
 * resultMap 为固定结果对象
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var departId=request.get("departId");
	var ctlUnitInnerCode=userSession.getCtlUnitInnerCode();
	var ctlUnitId=userSession.getCtlUnitId();
	
	if (!departId || departId=="" || departId.startsWith("root")) {
		sql1 = " SELECT T1.* FROM k_organ T1 WHERE T1.departid='"+ctlUnitId+"' ORDER BY T1.departcode";
	} else {
		sql1 = " SELECT T1.* FROM k_organ T1 WHERE T1.parentdepartid='"+ departId+"' ORDER BY T1.departcode";
	}		

	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
