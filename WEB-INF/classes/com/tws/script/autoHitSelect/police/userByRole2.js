/**
 * 
 * 根据角色下拉用户信息
 * 
 * com.tws.script.autoHitSelect.police.userByRole2.js
 * 
 */
function getJsonData(){
	var sql1="";
	var sql2="";
	var sql3="";

	var organId=userSession.getUserOrganId();
	
	sql1=" SELECT T.id as value,CONCAT(T.loginid,IFNULL(T.Specialty,''))AS NAME "
		+" FROM k_user T,k_userrole t1,k_role t2 "
		+" WHERE T.DepartID='"+organId+"' AND t1.rid =t2.id AND T.ID=t1.userid and t2.rolename = '$2'  and T.state='0' "
		+" ORDER BY T.loginid ";
	sql2=" SELECT id as value,CONCAT(loginid,IFNULL(Specialty,''))AS NAME FROM k_user WHERE 1=2 ";
	sql3=" SELECT id as value,CONCAT(loginid,IFNULL(Specialty,''))AS NAME FROM k_user WHERE id IN ('$1') ";	

	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}