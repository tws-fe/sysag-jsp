/**
 * 
 * ReportTypeByParentId
 * 
 * com.tws.script.autoHitSelect.repository.ReportTypeByParentId.js
 * 
 */
function getJsonData(){
	
	var refer=request.get("refer");
	var sql1="";
	if(refer=="root"){
		
		sql1=" SELECT UUID,type_name,parentid FROM MT_COM_REPORT_TYPE WHERE parentid is null or parentid='0' ORDER BY  cast(property as SIGNED INTEGER) ";
	}else{
		sql1=" SELECT UUID,type_name,parentid FROM MT_COM_REPORT_TYPE WHERE parentid='$2' ORDER BY cast(property as SIGNED INTEGER) ";
	}
	
	//cast(property as SIGNED INTEGER) 在sql 中varchar 转int 
	var sql2=" SELECT UUID,type_name,parentid FROM MT_COM_REPORT_TYPE WHERE 1=2 ORDER BY cast(property as SIGNED INTEGER) ";
	var sql3=" SELECT UUID,type_name,parentid FROM MT_COM_REPORT_TYPE WHERE UUID='$1' ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}