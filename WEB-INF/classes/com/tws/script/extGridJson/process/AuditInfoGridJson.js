/*
 * AuditInfoGridJson.js
 * 
 * com.tws.script.extGridJson.process.AuditInfoGridJson.js
 * 
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var formType=request.get("formType");
	
	var organId=userSession.getUserOrganId();
	var userId=userSession.getUserId();
	
	if(formType=="audit"){
		sql1=" SELECT * FROM ja_process where dealuserid='"+userId+"' and status='1' and organId_='"+organId+"' order by applytime desc";
	}else if(formType=="audited"){
		sql1=" SELECT * FROM ja_process where dealuserid='"+userId+"' and (status='2' or status='3') and organId_='"+organId+"'  order by dealtime desc";
	}else if(formType=="auditApply"){
		sql1=" SELECT * FROM ja_process where applyuserid='"+userId+"' and organId_='"+organId+"' order by applytime desc";
	}else if(formType=="auditMsg"){
		sql1=" SELECT * FROM K_SMS where createuser='"+userId+"' order by createdatetime desc";
	}
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
