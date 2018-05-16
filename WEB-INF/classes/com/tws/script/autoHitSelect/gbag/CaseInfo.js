/**
 * 
 * 全所主办民警
 * 
 * autoHitSelect.gbag.ToReloAuditdirectorType.js
 * 
 */
function getJsonData(){
	
	var ctlUnitId=userSession.getCtlUnitId(); 
	
	
	var sql1="SELECT UUID,casenumber,casename,casetype,suspectname,victimname,visitname,bjsj,state,k.name as statename, _user_auditdirector,auditdirector,casenaturename,CONCAT('【受害报案人】:',victiminfo,'\n','【案情信息】:',casedetails,'\n','【嫌疑人信息】:',suspectinfo,'\n','【主办民警】:',auditdirector,'\n','【立案时间】:',recorddate,'\n') AS caseinfo "
             +"FROM vw_ga_case_info  left join k_dic k  on (state=k.value and ctype='案件状态')"
             +"WHERE UUID='$1'";
	var sql2="SELECT UUID,casenumber,casename,casetype,suspectname,victimname,visitname,bjsj,state,k.name as statename, _user_auditdirector,auditdirector,casenaturename,CONCAT('【受害报案人】:',victiminfo,'\n','【案情信息】:',casedetails,'\n','【嫌疑人信息】:',suspectinfo,'\n','【主办民警】:',auditdirector,'\n','【立案时间】:',recorddate,'\n') AS caseinfo "
        +"FROM vw_ga_case_info  left join k_dic k  on (state=k.value and ctype='案件状态')"
        +"WHERE UUID='$1'";
	var sql3="SELECT UUID,casenumber,casename,casetype,suspectname,victimname,visitname,bjsj,state,k.name as statename, _user_auditdirector,auditdirector,casenaturename,CONCAT('【受害报案人】:',victiminfo,'\n','【案情信息】:',casedetails,'\n','【嫌疑人信息】:',suspectinfo,'\n','【主办民警】:',auditdirector,'\n','【立案时间】:',recorddate,'\n') AS caseinfo "
        +"FROM vw_ga_case_info  left join k_dic k  on (state=k.value and ctype='案件状态')"
        +"WHERE UUID='$1'";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){

}