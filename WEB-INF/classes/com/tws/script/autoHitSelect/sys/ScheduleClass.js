 /* 
  * 
  * ScheduleClass.js
  * 
 * com.tws.cmjt.script.autoHitSelect.sys.ScheduleClass.js
 * 
 */
function getJsonData(){
	var sql1=" SELECT uuid as value ,shiftname as name FROM i_shift_manage order by shiftname ";
	var sql2=" SELECT uuid as value ,shiftname as name FROM i_shift_manage where 1=2 order by shiftname ";
	var sql3=" SELECT uuid as value ,shiftname as name FROM i_shift_manage where uuid in ('$1') order by shiftname ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){

}