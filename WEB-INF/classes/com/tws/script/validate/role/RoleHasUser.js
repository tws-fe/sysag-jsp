/*
 * 角色是否有用户
 * 
 * role.RoleHasUser.js
 * 
 * 
 */
function getValidateRule(){
	
	var vsql=" SELECT userid,rid FROM k_userrole WHERE rid='$1' ";
	
	resultMap.put("vsql",vsql);
	resultMap.put("tips","该角色下有用户，不允许删除");
	resultMap.put("expr","");
	
	return resultMap;
}