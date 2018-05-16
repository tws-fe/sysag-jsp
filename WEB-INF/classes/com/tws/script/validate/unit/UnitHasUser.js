/*
 * 单位是否有用户
 * 
 * unit.UnitHasUser
 * 
 * 
 */
function getValidateRule(){
	
	var vsql=" SELECT ID,NAME FROM K_USER WHERE DEPARTID='$1' ";
	
	resultMap.put("vsql",vsql);
	resultMap.put("tips","该单位下有用户，不允许删除");
	resultMap.put("expr","");
	
	return resultMap;
}