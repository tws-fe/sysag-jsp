/*
 * 部门列表GRID数据
 * 
 * com.tws.script.autoHitSelect.repository.stock.StockListGridJson
 * 
 * request，userSession 为固定页面对象，可以直接使用
 * resultMap 为固定结果对象
 * 
 */
function getJsonData(){
	
	var sql1="";
	var sql2="";
	var sql3="";	
	
	var unitId=request.get("unitId");
	var curUnitId=userSession.getUserOrganId();
	
	if (!unitId || unitId=="" || unitId.startsWith("root")) {
		sql1 = " SELECT T1.* FROM ja_stock_input T1 WHERE T1.organId_='"+ curUnitId+"'";
//		system.out.println("jigoudaima_curUnitId"+curUnitId);
	} else {
//		system.out.println("jigoudaima_unitId"+unitId);
		sql1 = " SELECT T1.* FROM ja_stock_input T1 WHERE T1.organId_='"+ unitId+"'";
	}		

	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
