/*
 * 部门人员
 * 
 * sys.user.UserRoleByUnitId.js
 * 
 * 
 */
function getJsonData(){
	
	var refer=request.get("refer");
	var refer1=request.get("refer1");
	

	var sql1=" SELECT autoid,departname FROM k_department WHERE organId_='"+refer+"' ORDER BY ordercode ";
	var sql2="SELECT id,NAME FROM k_user WHERE departmentid='$1' and DepartID='"+refer+"' ORDER BY NAME";
	var sql3="SELECT userid,rid FROM k_userrole WHERE rid='"+refer1+"' and userid in('$1')";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
