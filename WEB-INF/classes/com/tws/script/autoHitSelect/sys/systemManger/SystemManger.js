 /* 
  * 系统名称
  * SystemManger.js
  * 
 * com.tws.cmjt.script.autoHitSelect.sys.systemManger.SystemManger.js
 * 
 */
function getJsonData(){
	

	var sql1=" SELECT sysid ,sysname FROM s_system  order by sysname ";
	var sql2=" SELECT sysid ,sysname FROM s_system where 1=2 order by sysname ";
	var sql3=" SELECT sysid ,sysname FROM s_system where sysid in ('$1') order by sysname ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){

}