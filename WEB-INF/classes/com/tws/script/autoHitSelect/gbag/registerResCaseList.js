 /* 
  * 案件列表下拉
  * registerResCaseList.js
  * 
 * com.tws.cmjt.script.autoHitSelect.gbag.res.registerResCaseList.js
 * 
 */
function getJsonData(){
	
	var ctlUnitId=userSession.getCtlUnitId(); 
	
	var sql1=" SELECT DISTINCT a.uuid AS VALUE,CONCAT(a.casename,'-',a.casenumber) AS NAME FROM ga_case a  WHERE a.organid_='"+ctlUnitId+"'  ORDER BY casenumber DESC";
	var sql2=" SELECT casenumber,casename FROM ga_case where 1=2 order by casenumber ";
	var sql3=" SELECT casenumber,casename FROM ga_case where uuid in ('$1') order by casenumber ";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){

}