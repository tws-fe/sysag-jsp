/*
 * 列表GRID数据
 *系统接口/警情信息
 *  com.tws.script.extGridJson.userinfo.UserInfoListGridJson.js
 * 
 * request，userSession 为固定页面对象，可以直接使用
 * resultMap 为固定结果对象
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";
	
    var unitId=request.get("unitId");

	sql1= " SELECT T1.*,T2.JGDM FROM zh_bigdata_user T1  left join zh_bigdata_userorgrel T2 on T1.YHID=T2.YHID  WHERE T2.JGDM='"+ unitId+"' ORDER BY T1.XM  ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}

function getList(){
	
}