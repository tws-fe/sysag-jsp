/*
 * 根据房间类型获取门禁信息
 * 
 * sys.room.DoorByType.js
 * 
 * 
 */
function getJsonData(){
	var sql1="";
	
	var refer=request.get("refer");
	var organId=request.get("refer1");
	
	if(refer=="民警审讯" || refer=="查询笔录" || refer=="审讯室"){
		sql1=" SELECT CONCAT(doorctlbh,'-',doorbh) AS id,roombh AS NAME "
	        +" FROM ja_system_env "
	        +" WHERE organId_='"+organId+"' and roomtype='审讯室' and doorctlbh IS NOT NULL AND doorctlbh<>'' "
	        +" ORDER BY roombh,doorbh ";		
	}else if(refer=="等候室"){
		sql1=" SELECT CONCAT(doorctlbh,'-',doorbh) AS id,roombh AS NAME "
	        +" FROM ja_system_env "
	        +" WHERE organId_='"+organId+"' and roomtype='等候室' and doorctlbh IS NOT NULL AND doorctlbh<>'' "
	        +" ORDER BY roombh,doorbh ";		
	}else if(refer=="开等候室"){
		sql1=" SELECT CONCAT(doorctlbh,'-',doorbh) AS id,roombh AS NAME "
        +" FROM ja_system_env "
        +" WHERE organId_='"+organId+"' and roomtype='等候室' and doorctlbh IS NOT NULL AND doorctlbh<>'' "
        +" ORDER BY roombh,doorbh ";		
	}else if(refer=="打扫卫生"){
		sql1=" SELECT CONCAT(doorctlbh,'-',doorbh) AS id,roombh AS NAME "
        +" FROM ja_system_env "
        +" WHERE organId_='"+organId+"' and roomtype in ('等候室','审讯室') and doorctlbh IS NOT NULL AND doorctlbh<>'' "
        +" ORDER BY roombh,doorbh ";		
	}else{
		sql1=" SELECT CONCAT(doorctlbh,'-',doorbh) AS id,roombh AS NAME "
        +" FROM ja_system_env "
        +" WHERE organId_='"+organId+"' and doorctlbh IS NOT NULL AND doorctlbh<>'' "
        +" ORDER BY roombh,doorbh ";		
	}

	var sql2=" SELECT CONCAT(doorctlbh,'-',doorbh) AS id,roombh AS NAME FROM ja_system_env WHERE 1=2 ";
	var sql3=" SELECT CONCAT(doorctlbh,'-',doorbh) AS id,roombh AS NAME FROM ja_system_env WHERE CONCAT(doorctlbh,'-',doorbh) in('$1') and organId_='"+organId+"'";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
