/*
 * 列表GRID数据
 * 
 * com.tws.script.extGridJson.schedule.ScheduleConfigListGridJson.js
 * 
 * request，userSession 为固定页面对象，可以直接使用
 * resultMap 为固定结果对象
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var unitId=request.get("unitId");
	
	sql1 = " SELECT T.uuid,t.groupname,t.teamgroupmemberid,t.teamgroupmember,t1.shiftname,t1.starttime,t1.endtime,t.GROUP_SHIFTDAYS,t.group_isfestivalrest "
		  +" FROM i_shift_group_manage T,i_shift_manage T1 "
		  +" WHERE t.shiftid=t1.uuid AND T.organId_='"+unitId+"'  "
		  +" ORDER BY t.groupname ";

	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
