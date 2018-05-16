 /* 
  * k_user表人名和id的转换
  * kuserNameToId.js
  * 
 * com.tws.cmjt.script.autoHitSelect.gbag.kuserNameToId.js
 * 
 */
function getJsonData(){
	
	var ctlUnitId=userSession.getCtlUnitId(); 
	
	var sql1=" SELECT a.uuid AS VALUE,CONCAT(a.casename,'-',a.casenumber) AS NAME  FROM ga_case a WHERE a.organid_='"+ctlUnitId+"' ORDER BY casenumber DESC";
	var sql2=" SELECT a.uuid AS VALUE,CONCAT(a.casename,'-',a.casenumber) AS NAME "
		+"FROM ga_case a WHERE a.organid_='"+ctlUnitId+"' AND (a.casenumber LIKE '%$1%' OR a.casename LIKE '%$1%' )"
		+"UNION SELECT a.uuid AS VALUE,CONCAT(a.casename,'-',a.casenumber) AS NAME "
        +"FROM ga_case a,ga_case_victim tt "
        +"WHERE a.organid_='"+ctlUnitId+"'  AND a.uuid=tt.mainformid AND tt.VICTIMNAME LIKE '%$1%' ";
	var sql3=" SELECT uuid AS VALUE,casename AS NAME FROM `ga_case` where uuid in ('$1')";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){

}