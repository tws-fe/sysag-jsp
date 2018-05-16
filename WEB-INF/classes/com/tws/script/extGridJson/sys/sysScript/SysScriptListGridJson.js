/*
 * 列表GRID数据
 * 
 * com.tws.script.extGridJson.sys.sysScript.SysScriptListGridJson.js
 * 
 * request，userSession 为固定页面对象，可以直接使用
 * resultMap 为固定结果对象
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var scriptId=request.get("scriptId");
	if (scriptId=="0") {
	sql1 = " SELECT  T1.* FROM ja_sys_script T1 WHERE T1.fname LIKE '%.js%'  ORDER BY T1.id ";
	}else{
		sql1 = " SELECT  T1.* FROM ja_sys_script T1 WHERE T1.fname LIKE '%.js%' and pid='"+scriptId+"' ORDER BY T1.id ";
	}
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
