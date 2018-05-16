/*
 * 列表GRID数据
 * 系统接口/暂住证信息
 * com.tws.script.extGridJson.qgrk.ZzzListGridJson.js
 * 
 * request，userSession 为固定页面对象，可以直接使用
 * resultMap 为固定结果对象
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	//sql1= " SELECT T1.* FROM TMP_ZZZXX_ZH T1  ORDER BY T1.rkbm  ";
	//查询所有，用case when 替换性别代码，多表 替换民族代码
	sql1="select T1.rkbm,T1.czfwbh,T1.xm ,T1.gmsfhm,J1.mzmc mzdm,T1.csrq,T1.xjzdzqz_dzmc,T1.gajgjgdm,T1.zyscbzrq_rq,T1.jzzyxqjzrq_rqsj,T1.jzzyxqqsrq_rqsj,T1.jzzdqyxqqsrq_rqsj," +
			"case xbdm when 'm' then '男' else '女' end " +
			"as xbdm " +
			"from TMP_ZZZXX_ZH as T1 left join ja_sys_dic_mzbm J1 on T1.mzdm=J1.mzbm" ;
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}

function getList(){
	
}