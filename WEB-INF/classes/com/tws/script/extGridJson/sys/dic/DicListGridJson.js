/*
 * 部门列表GRID数据
 * 
 * com.tws.script.autoHitSelect.sys.dic.DeptListGridJson
 * 
 * request，userSession 为固定页面对象，可以直接使用
 * resultMap 为固定结果对象
 * 
 */
function getJsonData(){
	
	var sql1="";
	var sql2="";
	var sql3="";	
	
	var ctype=request.get("ctype");
	
	if (ctype=="") {
		sql1 = " SELECT * FROM k_dic order by ctype,property";
	} else {
		sql1 = " SELECT * FROM k_dic WHERE ctype='"+ ctype+"' order by property";
	}

	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
