/*
 * 列表GRID数据
 * 
 * com.tws.script.autoHitSelect.sys.autoCode.AutoCodeChildListGridJson.js
 * 
 * request，userSession 为固定页面对象，可以直接使用
 * resultMap 为固定结果对象
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var unitId=request.get("unitId");

	sql1 = " SELECT T1.*,T2.standbyname FROM k_autocode_child T1,k_organ T2 WHERE T1.organid_='"+ unitId+"' AND T1.organId_=T2.departid ORDER BY t1.typename ";

	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
