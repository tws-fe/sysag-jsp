 /* 
  * 
  * ScheduleShift.js
  * 
 * com.tws.cmjt.script.autoHitSelect.sys.ScheduleShift.js
 * 
 */
function getJsonData(){
	var sql1=" SELECT '根据班次' AS VALUE, '根据班次' AS NAME "
			+" UNION "
			+" SELECT VALUE,NAME FROM k_dic WHERE ctype = '星期与数字对应' ";
	var sql2=" SELECT VALUE,NAME FROM k_dic WHERE 1=2 and ctype = '星期与数字对应' ";
	var sql3=" SELECT VALUE,NAME FROM "
		    +" (SELECT '根据班次' AS VALUE, '根据班次' AS NAME "
			+" UNION "
			+" SELECT VALUE,NAME FROM k_dic WHERE ctype = '星期与数字对应') T "
			+" WHERE T.VALUE IN ('$1') ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){

}