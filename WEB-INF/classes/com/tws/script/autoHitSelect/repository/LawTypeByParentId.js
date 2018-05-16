/**
 * 
 * LawTypeByParentId
 * 
 * com.tws.script.autoHitSelect.repository.LawTypeByParentId.js
 * 
 */
function getJsonData(){
	
	var sql1=" select T.ID,T.CAPTION,T.PARENTID,T.ISSHOW,T.READONLY,T.NODETYPE,T.NODEMODIFY "
			+" from MT_LAW_LAWMAIN T "
			+" WHERE T.PARENTID='$2' "
			+" ORDER BY T.SORTFLAG ";
	var sql2=" select T.ID,T.CAPTION,T.PARENTID,T.ISSHOW,T.READONLY,T.NODETYPE,T.NODEMODIFY "
			+" from MT_LAW_LAWMAIN T "
			+" WHERE T.PARENTID='$1' "
			+" ORDER BY T.SORTFLAG ";
	var sql3="SELECT ID,CAPTION FROM MT_LAW_LAWMAIN WHERE ID IN ('$1') ";	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}