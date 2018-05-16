/**
 * 
 * EnvConfigImpl.js
 * 
 * com.tws.script.autoHitSelect.sys.envConifg.EnvConfigImpl.js
 * 
 */
function getJsonData(){
	
	var sql1="SELECT sname as id,sname as name FROM s_config ORDER BY sname ";
	var sql2="SELECT sname as id,sname as name FROM s_config where 1=2 ORDER BY sname ";
	var sql3="SELECT sname as id,sname as name FROM s_config where sname in ('$1') ORDER BY sname ";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}