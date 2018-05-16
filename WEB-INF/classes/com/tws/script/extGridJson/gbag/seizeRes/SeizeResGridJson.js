/*
 * SeizeResGridJson.js
 * 
 *com.tws.script.extGridJson.gbag.seizeRes.SeizeResGridJson.js
 * 
 * 扣押物品查询
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var organId=userSession.getUserOrganId();
	var userId=userSession.getUserId();
	
	
	sql1="	SELECT T3.UUID UUID," +
			"T.CASENUMBER," +
			"T.SUSPECT," +
			"T.DETECTIONER," +
			"T5.NAME AS DETECTIONERS," +
			"T.DETENTIONTIME," +
			"T6.name as witness,T.ORGANID_,CONCAT(T1.CASENUMBER,'-',T1.CASENAME) AS CASENAME," +
			"T1.CASETYPE,CONCAT(T2.NAME,'(',T2.IDCARD,')') AS SUSPECTNAME," +
			"T3.ORDERNUMBER," +
			"T3.ITEMNAME," +
			"T3.AMOUNT," +
			"T3.CHARACTERISTIC," +
			"T3.REMARKS," +
			"T4.NAME AS STATENAME "
		+" FROM GA_DETENTION T "
		+"LEFT JOIN GA_CASE T1 ON T.CASENUMBER=T1.UUID "
		+"LEFT JOIN GA_SUSPECT T2 ON T2.MAINFORMID=T.CASENUMBER AND T2.UUID=T.SUSPECT "
		+"INNER JOIN GA_DETENTION_TASK T3 ON T3.MAINFORMID=T.UUID "
		+"LEFT JOIN K_DIC T4 ON T3.STATE=T4.VALUE AND T4.CTYPE='扣押物品状态' "
		+"LEFT JOIN K_USER T5 ON T.DETECTIONER=T5.ID  "
		+"LEFT JOIN K_USER T6 ON T3.witness=T6.ID  "
		+"WHERE T.ORGANID_='"+organId+"' ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
