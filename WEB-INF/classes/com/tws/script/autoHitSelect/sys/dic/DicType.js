/**
 * 
 * DicType.js
 * 
 * com.tws.script.autoHitSelect.sys.dic.DicType.js
 * 
 */
function getJsonData(){
	
	var sql1=" SELECT DISTINCT ctype AS id,ctype AS NAME FROM `k_dic` WHERE ctype IS NOT NULL ORDER BY ctype ";
	var sql2=" SELECT DISTINCT ctype AS id,ctype AS NAME FROM `k_dic` WHERE 1=2 ";
	var sql3="SELECT DISTINCT ctype AS id,ctype AS NAME FROM `k_dic` WHERE ctype='$1' ORDER BY ctype";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}