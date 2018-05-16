/*
 * 列表GRID数据
 * 
 * com.tws.script.autoHitSelect.system.sign.SignListGridJson.js
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

	sql1 = " SELECT T1.* FROM ja_sign T1  WHERE T1.organId_='"+ unitId+"' ORDER BY T1.stime desc ";

	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
