/**
 * 
 * 字典表取数
 * 
 * BasicDicImpl
 * 
 */
function getJsonData(){
	
	var sql1=" SELECT mzbm,mzmc FROM ja_sys_dic_mzbm ORDER BY mzbm ";
	var sql2=" SELECT mzbm,mzmc FROM ja_sys_dic_mzbm ORDER BY mzbm where 1=2 order by mzmc ";
	var sql3=" SELECT mzbm,mzmc FROM ja_sys_dic_mzbm where mzbm in ('$1') order by mzmc";
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}