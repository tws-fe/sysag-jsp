/*
 * 单位是否有子单位
 * 
 * unit.UnitHasChildren
 * 
 * 
 */
function getValidateRule(){
	
	var vsql=" SELECT DEPARTID,DEPARTNAME FROM K_ORGAN WHERE PARENTDEPARTID='$1' ";
	
	resultMap.put("vsql",vsql);
	resultMap.put("tips","单位【${DEPARTNAME}】有下级单位，不允许删除");
	resultMap.put("expr","");
	
	return resultMap;
}