/*
 * 列表GRID数据
 *系统接口/案件信息
 * com.tws.script.extGridJson.caseinfo.CaseInfoListGridJson.js
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

/*	sql1= " SELECT T1.*,T2.lbmc FROM zh_bigdata_case T1 LEFT JOIN 	zh_bigdata_case_ajlb T2 on T1.ajlb=T2.lbbh WHERE T1.ssjg='"+ unitId+"' ORDER BY T1.bjsj desc ";*/
	sql1= " SELECT T1.* FROM zh_bigdata_case T1  WHERE T1.ssjg='"+ unitId+"' ORDER BY T1.bjsj desc ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}

function getList(){
	
}