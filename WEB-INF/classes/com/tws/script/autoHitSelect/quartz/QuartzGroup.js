/**
 * 
 * 调度器组信息
 * 
 * com.tws.script.autoHitSelect.quartz.QuartzGroup.js
 * 
 */
function getJsonData(){
	var sql1="";
	var sql2="";
	var sql3="";
	

	sql1=" SELECT DISTINCT TRIGGER_GROUP,CASE TRIGGER_GROUP WHEN 'etlGroup' THEN '业务数据采集组' WHEN 'sysGroup' THEN '调度任务组' WHEN 'REGULATORY' THEN '监督任务组' ELSE TRIGGER_GROUP END AS GROUP_NAME "
		+" FROM QRTZ_TRIGGERS "
	    +" ORDER BY TRIGGER_GROUP ";
	sql2=" SELECT TRIGGER_GROUP,TRIGGER_GROUP AS GROUP_NAME FROM  QRTZ_TRIGGERS WHERE 1=2 ";
	sql3=" SELECT TRIGGER_GROUP,TRIGGER_GROUP AS GROUP_NAME FROM  QRTZ_TRIGGERS WHERE 1=2 ";	

	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}