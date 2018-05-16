/**
 * 
 * 尿检项目信息
 * 
 * com.tws.script.autoHitSelect.police.urineItems.js
 * 
 */
function getJsonData(){
	var sql1="";
	var sql2="";
	var sql3="";
	

	sql1=" select concat(b.name,'-',a.name) as name,concat(b.value,'-',a.value) as value "
		+" from k_dic a, k_dic b "
		+" where a.ctype = '尿检结果' and b.ctype = '尿检项目' and '$2' like concat('%',b.name,'%') "
		+" order by b.name,a.name ";
	sql2=" select concat(b.name,'-',a.name) as name,concat(b.value,'-',a.value) as value "
		+" from k_dic a, k_dic b "
		+" where a.ctype = '尿检结果' and b.ctype = '尿检项目' and '$2' like concat('%',b.name,'%') "
		+" order by b.name,a.name ";
	sql3=" select concat(b.name,'-',a.name) as name,concat(b.value,'-',a.value) as value "
		+" from k_dic a, k_dic b "
		+" where a.ctype = '尿检结果' and b.ctype = '尿检项目' and '$2' like concat('%',b.name,'%') and concat(b.name,'-',a.name) in ('$1') "
		+" order by b.name,a.name ";	

	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}