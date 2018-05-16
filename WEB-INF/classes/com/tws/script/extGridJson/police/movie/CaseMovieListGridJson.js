/*
 * 列表GRID数据
 * 
 * com.tws.script.extGridJson.system.movie.CaseMovieListGridJson.js
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

	sql1 = "SELECT t1.uuid UUID," +
			"t1.caseid CA_UUID," +
			"t1.mainformid mf_uuid," +
			"t1.ordernum ORDERNUM," +
			"t1.location LOCATION," +
			"t1.qiaoghao QIAOGHAO," +
			"t3.casetype TYPE," +
			"t3.casenumber NUMBER," +
			"t3.cause REMARK," +
			"T1.begintime BEGINTIME," +
			"t1.endTime ENDTIME," +
			"t2.suspectsname SU_NAME," +
			"t2.identitynumber su_card," +
			"t1.roombh ROOMBH," +
			"t1.roomtype ROOMTYPE " +
			"FROM ja_case_movie t1 INNER JOIN ja_caseperson t2 ON t1.mainformid=t2.uuid INNER JOIN ja_case t3 ON t1.caseid=t3.uuid " +
			"WHERE t1.organid_='"+unitId+"' order by t1.ordernum ";
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}