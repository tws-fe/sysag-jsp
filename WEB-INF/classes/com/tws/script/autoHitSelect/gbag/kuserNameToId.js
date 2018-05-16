 /* 
  * k_user表人名和id的转换
  * kuserNameToId.js
  * 
 * com.tws.cmjt.script.autoHitSelect.gbag.kuserNameToId.js
 * 
 */
function getJsonData(){
	
	var ctlUnitId=userSession.getCtlUnitId(); 
	
	var sql1=" SELECT id,name FROM k_user WHERE id = '$1' ";
	var sql2=" SELECT id,name FROM k_user WHERE id = '$1' ";
	var sql3=" SELECT id,name FROM k_user WHERE id = '$1' ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){

}