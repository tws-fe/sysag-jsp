/*
 * 列表GRID数据
 * 
 * com.tws.script.extGridJson.qgrk.QgrkListGridJson.js.js
 * 
 * request，userSession 为固定页面对象，可以直接使用
 * resultMap 为固定结果对象
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	sql1 = " SELECT T1.*,T2.mzmc AS mzmc  FROM tmp_qgrkxx_zh T1 left join ja_sys_dic_mzbm T2 on T1.mz=T2.mzbm  ORDER BY T1.uuid  ";

	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
