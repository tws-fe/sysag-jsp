/*
 * ManageUnGridJson.js
 * 
 * com.tws.script.extGridJson.gbag.seizeRes.ManageUnGridJson.js
 * 未处置列表
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var organId=userSession.getUserOrganId();
	
	
	sql1="SELECT T4.uuid,T4.casenumber,T4.suspect,CONCAT(T2.casenumber,'(',T2.casename,')') AS casename,T2.`casetype`,T2.`means` datatype," +
			"CONCAT(T3.name,'(',t3.idcard,')') AS suspectname,T4.`ordernumber` FILESNUMBER,t4.`itemname` FILESNAME," +
			"T4.amount FILECOUNT,t4.`characteristic` FILESDESCRIBE,T4.`remarks` remarks," +
			"K1.`name` AUDITUSERNAME,T5.name STATENAME " +
			"FROM `ga_detention` T1 LEFT JOIN `ga_case` T2 ON T1.`casenumber`=T2.`casenumber` " +
			"LEFT JOIN `ga_detention_task` T4 ON T1.`casenumber`=T2.`casenumber` " +
			"LEFT JOIN `k_user` K1 ON T2.`_user_auditdirector` = K1.`id` " +
			"LEFT JOIN `ga_suspect` T3 ON T4.`suspect`=T3.`uuid` " +		
			"LEFT JOIN k_dic T5 ON T5.`ctype`='扣押物品状态' AND t4.`state`=t5.`Value` " +
			"WHERE t4.state='2' AND T1.organid_='"+organId+"' GROUP BY T4.`uuid`";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
