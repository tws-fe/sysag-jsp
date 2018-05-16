/**
 * 
 * 规则表达式
 * 
 * com.tws.script.autoHitSelect.quartz.CronSortTree.js
 * 
 */
function getJsonData(){
	
	var sql1="SELECT UUID,CRONNAME FROM QRTZ_MT_CRON_CONFIG ORDER BY SORTFLAG ";;
	var sql2="SELECT UUID,CRONNAME FROM QRTZ_MT_CRON_CONFIG WHERE 1=2 ";
	var sql3="SELECT UUID,CRONNAME FROM QRTZ_MT_CRON_CONFIG WHERE UUID IN('$1')";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}