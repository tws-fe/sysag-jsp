/*
 * 检查LoginID是否唯一
 * 
 * 
 * com.tws.script.validate.user.UserLoginIDExists.js
 * 
 * 
 */
function getValidateRule(){
	
	var vsql=" SELECT id,NAME,loginid FROM k_user WHERE loginid='$1' AND id NOT IN ('$2') ";
	
	resultMap.put("vsql",vsql);
	resultMap.put("tips","该用户登录名【${loginid}】已经存在");
	resultMap.put("expr","");
	
	return resultMap;
}