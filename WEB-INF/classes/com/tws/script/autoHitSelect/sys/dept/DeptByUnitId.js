/*
 * 部门取数
 * 
 * sys.dept.DeptByUnitId.js
 * 
 * 部门下拉，id为FID，初始化需要传递一个初始单位参数，初始时会拿到该单位下级的所有单位
 * 
 */
function getJsonData(){
	
	var refer=request.get("refer");
	
	var sql1="SELECT autoid,departname FROM k_department WHERE organId_='"+refer+"' ORDER BY ordercode ";
	var sql2="SELECT autoid,departname FROM k_department WHERE 1=2 and organId_='$2' ORDER BY ordercode";
	var sql3="SELECT autoid,departname FROM k_department WHERE autoid in('$1')";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
