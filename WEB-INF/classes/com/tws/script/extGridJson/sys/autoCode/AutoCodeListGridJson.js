/*
 * 列表GRID数据
 * 
 * com.tws.script.autoHitSelect.sys.autoCode.AutoCodeListGridJson.js
 * 
 * request，userSession 为固定页面对象，可以直接使用
 * resultMap 为固定结果对象
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	

	sql1 = " SELECT * FROM k_autocode ORDER BY typename";

	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
