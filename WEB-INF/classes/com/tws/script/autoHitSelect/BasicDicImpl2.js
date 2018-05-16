/**
 * 
 * 字典表取数
 * 
 * BasicDicImpl2
 * 
 */
function getJsonData(){
	
	var sql1="SELECT VALUE,NAME FROM k_dic WHERE ctype='$2' ORDER BY property ";
	var sql2="SELECT VALUE,NAME FROM k_dic WHERE ctype='$2' AND (NAME LIKE '%$1%' OR VALUE LIKE '%$1%') ORDER BY property ";
	var sql3="SELECT VALUE,NAME FROM k_dic WHERE VALUE IN ('$1') AND ctype='$2' ";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}