 /* 
  * 嫌疑人
  * 
 * com.tws.cmjt.script.autoHitSelect.gbag.res.registerResSuspectList.js
 * 
 */
function getJsonData(){

	var casenumber=request.get("refer");
	var sql1=" SELECT T.UUID,CONCAT(T.NAME,'(',T.IDCARD,')') AS SUSPECTNAME FROM GA_SUSPECT T WHERE T.MAINFORMID='"+casenumber+"' ORDER BY T.NAME ";
	var sql2=" SELECT T.UUID,CONCAT(T.NAME,'(',T.IDCARD,')') AS SUSPECTNAME FROM GA_SUSPECT T WHERE T.MAINFORMID='"+casenumber+"' AND (T.NAME LIKE '%$1%' OR T.IDCARD LIKE '%$1%') ORDER BY T.NAME ";
	var sql3=" SELECT T.UUID,CONCAT(T.NAME,'(',T.IDCARD,')') AS SUSPECTNAME FROM GA_SUSPECT T WHERE T.MAINFORMID='"+casenumber+"' AND T.UUID IN ('$1') ORDER BY T.NAME ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){

}