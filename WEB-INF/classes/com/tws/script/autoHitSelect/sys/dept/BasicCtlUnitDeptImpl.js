/**
 * 控制单位权限数据
 * 
 * sys.dept.BasicCtlUnitDeptImpl.js
 * 
 */
function getJsonData(){
	
	var ctlUnitInnerCode=userSession.getCtlUnitInnerCode();
	var ctlUnitId=userSession.getCtlUnitId();
	
	var sql1=" SELECT departid,standbyname FROM k_organ "
		    +" WHERE ishasdept='1' AND departid='"+ctlUnitId+"' "
		    +" ORDER BY departcode ";
	var sql2=" SELECT departid,standbyname FROM "
	    +" (SELECT departid,standbyname,parentdepartid,departcode FROM k_organ WHERE ishasdept='1' and parentdepartid='$1' "
	    +"  UNION ALL "
	    +"  SELECT autoid,departname,organId_,ordercode  FROM k_department where organId_='$1') T "
	    +" WHERE 1=1 "
	    +" ORDER BY departcode ";
	var sql3=" SELECT departid,standbyname FROM "
	    +" (SELECT departid,standbyname,parentdepartid,departcode FROM k_organ WHERE ishasdept='1' and parentdepartid in ('$1') "
	    +"  UNION ALL "
	    +"  SELECT autoid,departname,organId_,ordercode  FROM k_department where organId_ in ('$1')) T "
	    +" WHERE 1=1 ";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}