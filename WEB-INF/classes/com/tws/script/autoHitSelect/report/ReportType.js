/**
 * 
 * ReportType.js
 * 
 * com.tws.script.autoHitSelect.report.ReportType.js
 * 
 */
function getJsonData(){
	
	var sql1=" SELECT UUID,type_name,parentid FROM MT_COM_REPORT_TYPE WHERE parentid='0' ORDER BY cast(property as SIGNED INTEGER)  ";
	var sql2=" SELECT UUID,type_name,parentid FROM MT_COM_REPORT_TYPE WHERE parentid='$1' ORDER BY cast(property as SIGNED INTEGER) ";
	var sql3=" SELECT UUID,type_name,parentid FROM MT_COM_REPORT_TYPE WHERE UUID='$1' ";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}