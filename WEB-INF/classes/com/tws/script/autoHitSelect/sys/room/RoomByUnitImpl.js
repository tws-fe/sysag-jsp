/*
 * 
 * 类型
 * 
 * com.tws.script.autoHitSelect.sys.room.RoomByUnitImpl.js
 * 
 */
function getJsonData(){
	var refer=request.get("refer");
	
	var sql1=" SELECT uuid AS id,roombh AS NAME FROM ja_system_env WHERE organId_='"+refer+"' order by roombh ";
	var sql2=" SELECT uuid AS id,roombh AS NAME FROM ja_system_env WHERE 1=2 ";
	var sql3=" SELECT uuid AS id,roombh AS NAME FROM ja_system_env WHERE uuid in('$1') ";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;	
}
function getList(){

}