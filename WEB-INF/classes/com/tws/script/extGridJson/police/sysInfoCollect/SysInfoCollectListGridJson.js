/*
 * 列表GRID数据
 * 
 * com.tws.script.extGridJson.system.sysInfoCollect.SysInfoCollectListGridJson.js
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
	
	sql1 = " SELECT T1.*,T2.standbyname,T3.name AS sysmakername  "
		  +" FROM ja_sys_collect T1 "
		  +" LEFT JOIN k_organ T2 ON T1.organId_=T2.departid "
		  +" LEFT JOIN k_user T3 ON T1.sysmaker=T3.id "
		  +" WHERE T1.organid_='"+ unitId+"' "
		  +" ORDER BY t1.entertime desc ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
