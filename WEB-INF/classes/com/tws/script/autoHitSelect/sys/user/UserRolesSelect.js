/*
 * 用户角色下拉
 * 
 * com.tws.script.autoHitSelect.sys.user.UserRolesSelect.js
 * 
 * 
 */
function getJsonData(){

	var userRoleids=userSession.getUserRoleids();
	var isSysManager=StringUtil.getSubStrIndex(userRoleids,"1",",");
	
	var sql1=" SELECT ID,ROLENAME FROM K_ROLE WHERE 1=1 ORDER BY PROPERTY ";
	if(isSysManager=="-1"){
		sql1=" SELECT ID,ROLENAME FROM K_ROLE WHERE ID<>'1' ORDER BY PROPERTY ";
	}
	
	var sql2=" SELECT ID,ROLENAME FROM K_ROLE WHERE 1=2 ";
	var sql3=" SELECT ID,ROLENAME FROM K_ROLE WHERE ID IN ('$1') ";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
