 /* 
  * 扣押物品状态
  * resStateShow.js
  * 
 * com.tws.cmjt.script.autoHitSelect.gbag.res.resStateShow.js
 * 
 */
function getJsonData(){
	
	var sql1;
	var sql2;
	var sql3;
	var organId=request.get("unitId");

	
	sql1=" SELECT T.* FROM VW_GA_STORE T WHERE T.ORGANID_='"+organId+"' AND T.STATE='1' AND EXISTS(SELECT 1 FROM GA_STORE_DEAL T1 WHERE T.UUID=T1.mainformId AND T1.STATE='0') ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){

}