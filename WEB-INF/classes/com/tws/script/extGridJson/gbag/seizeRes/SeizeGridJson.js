/*
 * SeizeGridJson.js
 * 
 * com.tws.script.extGridJson.gbag.seizeRes.SeizeGridJson.js
 * 入库确认列表
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var organId=userSession.getUserOrganId();
	var userId=userSession.getUserId();
	
	sql1="SELECT T4.uuid,T4.casenumber,T4.suspect,CONCAT(T4.casenumber,'(',T2.casename,')') AS casename," +
			"T2.`casetype`,CONCAT(T3.name,'(',t3.idcard,')') AS susname," +
			"t4.`itemname` res,k3.name witness,K1.name username, t4.detentiontime,T5.name state FROM `ga_detention` T1 " +
			"LEFT JOIN `ga_case` T2 ON T1.`casenumber`=T2.`casenumber` LEFT JOIN `ga_detention_task` T4 ON T4.`casenumber`=T2.`casenumber` " +
			"LEFT JOIN `ga_suspect` T3 ON T4.`suspect`=T3.`uuid` LEFT JOIN k_dic T5 ON T5.`ctype`='扣押物品状态' AND t4.`state`=t5.`Value` " +
			"LEFT JOIN k_user K3 ON t4.witness = K3.id " +
			"LEFT JOIN k_user K1 ON t4.detectioner = K1.id " +
			"WHERE t4.state='1' and t1.organId_ = '"+organId+"' GROUP BY T4.`uuid`";
	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
