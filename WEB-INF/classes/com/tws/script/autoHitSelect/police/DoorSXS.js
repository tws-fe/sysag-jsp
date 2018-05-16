/*
 * 取得当前可用的审讯室
 * 
 * com.tws.script.autoHitSelect.police.DoorSXS.js
 * 
 * 
 */
function getJsonData(){
	var sql1="";
	
	var organId=request.get("refer");
    var curDateTime=DateUtil.getCurrentDateTime();
	sql1=" SELECT CONCAT(t.doorctlbh,'-',t.doorbh) AS id,roombh AS NAME "
		+" FROM ja_system_env t "
		+" WHERE t.organId_='"+organId+"' AND t.roomtype='审讯室' AND t.doorctlbh IS NOT NULL AND t.doorctlbh<>'' "
        +"       AND NOT EXISTS(SELECT 1 FROM ja_caseperson_questiondoor t1 WHERE t1.organId_='"+organId+"' AND t1.planovertime>'"+curDateTime+"' AND (t1.overtime='' OR t1.overtime IS NULL) AND CONCAT(t.doorctlbh,'-',t.doorbh)=t1.questiondoor_number) "
        +" ORDER BY t.roombh,t.doorbh ";
	var sql2=" SELECT CONCAT(doorctlbh,'-',doorbh) AS id,roombh AS NAME FROM ja_system_env WHERE 1=2 ";
	var sql3=" SELECT CONCAT(doorctlbh,'-',doorbh) AS id,roombh AS NAME FROM ja_system_env WHERE CONCAT(doorctlbh,'-',doorbh) in('$1') and organId_='"+organId+"'";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
