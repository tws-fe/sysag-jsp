/**
 * 控制脚本树形结构
 * 
 * sys.sysScript.SysScriptImpl.js
 * 
 */
function getJsonData(){
	
	/*var ctlUnitInnerCode=userSession.getCtlUnitInnerCode();
	var ctlUnitId=userSession.getCtlUnitId();*/
	
	var sql1="SELECT id,fname FROM ja_sys_script WHERE pid='0' ORDER BY pid ";
	var sql2="SELECT id,fname FROM ja_sys_script WHERE pid='$1' ORDER BY pid";//获取重复循环的
	var sql3="SELECT id,fname FROM ja_sys_script WHERE pid='$1'";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}