/*
 * 部门是否有用户
 * 
 * dept.DeptHasUser
 * 
 * 
 */
function getValidateRule(){
	
	var vsql=" SELECT ID,NAME FROM K_USER WHERE departmentid='$1' ";
	
	resultMap.put("vsql",vsql);
	resultMap.put("tips","该部门下有用户，不允许删除");
	resultMap.put("expr","");
	
	return resultMap;
}