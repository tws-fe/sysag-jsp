/*
 * CaseInfoGridJson.js
 * 
 * com.tws.script.extGridJson.police.CaseInfoGridJson.js
 * 
 * 
 */
function getJsonData(){
	
	var sql1="";;
	var sql2="";
	var sql3="";	
	
	var formType=request.get("formType");
	
	var organId=userSession.getUserOrganId();
	
	if(formType=="RYDA"){
		sql1=" SELECT T1.uuid,T1.mainformid,T.curuserid,t.curusername,T.curleader,t.curleadername,T.curuserids_assist,t.curuserids_assistname,T.casenumber,t.suspectfrom, "
	       +" t.casetype,t.cause,t.status AS casestatus,t.statusname AS casestatusname,t1.identitynumber,t1.suspectsname,t1.gender,t1.birth,t1.nation, "
	       +" t1.register_site,t1.now_site,t1.telephone,t1.wordcode,t1.entertime,t1.sdate1,t1.status,t1.statusname,t1.statusname as dstatusname,t1.applytime,t1.isfinish, "
	       +" CASE t1.isfinish WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS finishname,t1.isout, "
	       +" CASE t1.hasout WHEN '1' THEN CONVERT('是' USING gbk) ELSE CONVERT('否' USING gbk) END AS hasout, "
	       +" t1.isurine,t1.isurineitem,t1.iscollect,t1.isawaitdoor,t1.isquestiondoor,t1.isdispose, "
	       +" t1.remark,t1.oper_user_id_,t1.oper_time_,t1.update_user_id_,t1.update_time_,t1.organId_ "
	       +" FROM ja_case T,ja_caseperson T1 "
	       +" WHERE T.uuid=T1.mainformid and t1.organId_='"+organId+"' and t1.isfinish=0"
	       +" order by t.casenumber desc ";
	
		//sql1=" SELECT t.*,t.statusname as dstatusname  FROM vw_ja_caseperson t WHERE t.organId_='"+organId+"' AND t.casestatus=0 and t.isfinish=0 order by casenumber desc";
	}else if(formType=="RSJC"){
		sql1=" SELECT T1.uuid,T1.mainformid,T.curuserid,t.curusername,T.curleader,t.curleadername,T.curuserids_assist,t.curuserids_assistname,T.casenumber,t.suspectfrom, "
		       +" t.casetype,t.cause,t.status AS casestatus,t.statusname AS casestatusname,t1.identitynumber,t1.suspectsname,t1.gender,t1.birth,t1.nation, "
		       +" t1.register_site,t1.now_site,t1.telephone,t1.wordcode,t1.entertime,t1.sdate1,t1.status,t1.statusname,t1.applytime,t1.isfinish, "
		       +" CASE t1.isfinish WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS finishname,t1.isout, "
		       +" CASE t1.hasout WHEN '1' THEN CONVERT('是' USING gbk) ELSE CONVERT('否' USING gbk) END AS hasout, "
		       +" CASE t1.isurine WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS dstatusname, "
		       +" t1.isurine,t1.isurineitem,t1.iscollect,t1.isawaitdoor,t1.isquestiondoor,t1.isdispose, "
		       +" t1.remark,t1.oper_user_id_,t1.oper_time_,t1.update_user_id_,t1.update_time_,t1.organId_ "
		       +" FROM ja_case T,ja_caseperson T1 "
		       +" WHERE T.uuid=T1.mainformid and t1.organId_='"+organId+"' and t1.isfinish=0"
		       +" order by t.casenumber desc ";
		
		//sql1=" SELECT t.*,CASE t.isurine WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS dstatusname FROM vw_ja_caseperson t "
		//    +" WHERE t.organId_='"+organId+"' and t.isfinish=0 "
		//    +" order by casenumber desc ";
	}else if(formType=="XXCJ"){
		sql1=" SELECT T1.uuid,T1.mainformid,T.curuserid,t.curusername,T.curleader,t.curleadername,T.curuserids_assist,t.curuserids_assistname,T.casenumber,t.suspectfrom, "
		       +" t.casetype,t.cause,t.status AS casestatus,t.statusname AS casestatusname,t1.identitynumber,t1.suspectsname,t1.gender,t1.birth,t1.nation, "
		       +" t1.register_site,t1.now_site,t1.telephone,t1.wordcode,t1.entertime,t1.sdate1,t1.status,t1.statusname,t1.applytime,t1.isfinish, "
		       +" CASE t1.isfinish WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS finishname,t1.isout, "
		       +" CASE t1.hasout WHEN '1' THEN CONVERT('是' USING gbk) ELSE CONVERT('否' USING gbk) END AS hasout, "
		       +" CASE t1.iscollect WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS dstatusname,"
		       +" t1.isurine,t1.isurineitem,t1.iscollect,t1.isawaitdoor,t1.isquestiondoor,t1.isdispose, "
		       +" t1.remark,t1.oper_user_id_,t1.oper_time_,t1.update_user_id_,t1.update_time_,t1.organId_ "
		       +" FROM ja_case T,ja_caseperson T1 "
		       +" WHERE T.uuid=T1.mainformid and t1.organId_='"+organId+"' and t1.isfinish=0"
		       +" order by t.casenumber desc ";
		
		//sql1=" SELECT t.*,CASE t.iscollect WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS dstatusname FROM vw_ja_caseperson t  "
		//	+" WHERE t.organId_='"+organId+"' AND t.isfinish=0 "
		//	+" order by casenumber desc ";
	}else if(formType=="AQCZ"){
		
		sql1=" SELECT T1.uuid,T1.mainformid,T.curuserid,t.curusername,T.curleader,t.curleadername,T.curuserids_assist,t.curuserids_assistname,T.casenumber,t.suspectfrom, "
		       +" t.casetype,t.cause,t.status AS casestatus,t.statusname AS casestatusname,t1.identitynumber,t1.suspectsname,t1.gender,t1.birth,t1.nation, "
		       +" t1.register_site,t1.now_site,t1.telephone,t1.wordcode,t1.entertime,t1.sdate1,t1.status,t1.statusname,t1.applytime,t1.isfinish, "
		       +" CASE t1.isfinish WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS finishname,t1.isout, "
		       +" CASE t1.hasout WHEN '1' THEN CONVERT('是' USING gbk) ELSE CONVERT('否' USING gbk) END AS hasout, "
		       +" CASE t1.isdispose WHEN '1' THEN CONVERT('未结束' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS dstatusname,"
		       +" t1.isurine,t1.isurineitem,t1.iscollect,t1.isawaitdoor,t1.isquestiondoor,t1.isdispose, "
		       +" t1.remark,t1.oper_user_id_,t1.oper_time_,t1.update_user_id_,t1.update_time_,t1.organId_ "
		       +" FROM ja_case T,ja_caseperson T1 "
		       +" WHERE T.uuid=T1.mainformid and t1.organId_='"+organId+"' AND t1.status=2 and t1.isfinish=0"
		       +" order by t.casenumber desc ";
		
		//sql1=" SELECT t.*,CASE t.isdispose WHEN '1' THEN CONVERT('未结束' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS dstatusname FROM vw_ja_caseperson t "
		//	+" WHERE t.organId_='"+organId+"' AND t.status=2 and t.isfinish=0 "
		//	+" order by casenumber desc ";
	}else if(formType=="DHS"){
		
		sql1=" SELECT T1.uuid,T1.mainformid,T.curuserid,t.curusername,T.curleader,t.curleadername,T.curuserids_assist,t.curuserids_assistname,T.casenumber,t.suspectfrom, "
		       +" t.casetype,t.cause,t.status AS casestatus,t.statusname AS casestatusname,t1.identitynumber,t1.suspectsname,t1.gender,t1.birth,t1.nation, "
		       +" t1.register_site,t1.now_site,t1.telephone,t1.wordcode,t1.entertime,t1.sdate1,t1.status,t1.statusname,t1.applytime,t1.isfinish, "
		       +" CASE t1.isfinish WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS finishname,t1.isout, "
		       +" CASE t1.hasout WHEN '1' THEN CONVERT('是' USING gbk) ELSE CONVERT('否' USING gbk) END AS hasout, "
		       +" CASE t1.isawaitdoor WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS dstatusname,"
		       +" t1.isurine,t1.isurineitem,t1.iscollect,t1.isawaitdoor,t1.isquestiondoor,t1.isdispose, "
		       +" t1.remark,t1.oper_user_id_,t1.oper_time_,t1.update_user_id_,t1.update_time_,t1.organId_ "
		       +" FROM ja_case T,ja_caseperson T1 "
		       +" WHERE T.uuid=T1.mainformid and t1.organId_='"+organId+"' AND t1.status=2 and t1.isfinish=0"
		       +" order by t.casenumber desc ";
		
		//sql1=" SELECT t.*,CASE t.isawaitdoor WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS dstatusname FROM vw_ja_caseperson t "
		//	+" WHERE t.organId_='"+organId+"' AND t.status=2 and t.isfinish=0 "
		//	+" order by casenumber desc ";
	}else if(formType=="SXS"){
		
		sql1=" SELECT T1.uuid,T1.mainformid,T.curuserid,t.curusername,T.curleader,t.curleadername,T.curuserids_assist,t.curuserids_assistname,T.casenumber,t.suspectfrom, "
		       +" t.casetype,t.cause,t.status AS casestatus,t.statusname AS casestatusname,t1.identitynumber,t1.suspectsname,t1.gender,t1.birth,t1.nation, "
		       +" t1.register_site,t1.now_site,t1.telephone,t1.wordcode,t1.entertime,t1.sdate1,t1.status,t1.statusname,t1.applytime,t1.isfinish, "
		       +" CASE t1.isfinish WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS finishname,t1.isout, "
		       +" CASE t1.hasout WHEN '1' THEN CONVERT('是' USING gbk) ELSE CONVERT('否' USING gbk) END AS hasout, "
		       +" CASE t1.isquestiondoor WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS dstatusname,"
		       +" t1.isurine,t1.isurineitem,t1.iscollect,t1.isawaitdoor,t1.isquestiondoor,t1.isdispose, "
		       +" t1.remark,t1.oper_user_id_,t1.oper_time_,t1.update_user_id_,t1.update_time_,t1.organId_ "
		       +" FROM ja_case T,ja_caseperson T1 "
		       +" WHERE T.uuid=T1.mainformid and t1.organId_='"+organId+"' AND t1.status=2  and t1.isfinish=0"
		       +" order by t.casenumber desc ";
		
		//sql1=" SELECT t.*,CASE t.isquestiondoor WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS dstatusname FROM vw_ja_caseperson t "
		//	+" WHERE t.organId_='"+organId+"' AND t.status=2 and t.isfinish=0 "
		//	+" order by casenumber desc ";
	}else if(formType=="DLBAQ" ){
		
		sql1=" SELECT T1.uuid,T1.mainformid,T.curuserid,t.curusername,T.curleader,t.curleadername,T.curuserids_assist,t.curuserids_assistname,T.casenumber,t.suspectfrom, "
		       +" t.casetype,t.cause,t.status AS casestatus,t.statusname AS casestatusname,t1.identitynumber,t1.suspectsname,t1.gender,t1.birth,t1.nation, "
		       +" t1.register_site,t1.now_site,t1.telephone,t1.wordcode,t1.entertime,t1.sdate1,t1.status,t1.statusname,t1.statusname as dstatusname,t1.applytime,t1.isfinish, "
		       +" CASE t1.isfinish WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS finishname,t1.isout, "
		       +" CASE t1.hasout WHEN '1' THEN CONVERT('是' USING gbk) ELSE CONVERT('否' USING gbk) END AS hasout, "
		       +" t1.isurine,t1.isurineitem,t1.iscollect,t1.isawaitdoor,t1.isquestiondoor,t1.isdispose, "
		       +" t1.remark,t1.oper_user_id_,t1.oper_time_,t1.update_user_id_,t1.update_time_,t1.organId_ "
		       +" FROM ja_case T,ja_caseperson T1 "
		       +" WHERE T.uuid=T1.mainformid and t1.organId_='"+organId+"' and t1.isfinish=0"
		       +" order by t.casenumber desc ";
		
		//sql1=" SELECT t.*,t.statusname as dstatusname  FROM vw_ja_caseperson t WHERE t.organId_='"+organId+"' and t.isfinish=0 order by casenumber desc ";
	}else if(formType=="QUERY" || formType=="ZFSP"){
		sql1=" SELECT T1.uuid,T1.mainformid,T.curuserid,t.curusername,T.curleader,t.curleadername,T.curuserids_assist,t.curuserids_assistname,T.casenumber,t.suspectfrom, "
		       +" t.casetype,t.cause,t.status AS casestatus,t.statusname AS casestatusname,t1.identitynumber,t1.suspectsname,t1.gender,t1.birth,t1.nation, "
		       +" t1.register_site,t1.now_site,t1.telephone,t1.wordcode,t1.entertime,t1.sdate1,t1.status,t1.statusname,t1.applytime,t1.isfinish, "
		       +" CASE t1.isfinish WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS finishname,t1.isout, "
		       +" CASE t1.isfinish WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS dstatusname,"
		       +" CASE t1.hasout WHEN '1' THEN CONVERT('是' USING gbk) ELSE CONVERT('否' USING gbk) END AS hasout, "
		       +" t1.isurine,t1.isurineitem,t1.iscollect,t1.isawaitdoor,t1.isquestiondoor,t1.isdispose,T2.DISPOSE,"
		       +" t1.remark,t1.oper_user_id_,t1.oper_time_,t1.update_user_id_,t1.update_time_,t1.organId_ "
		       +" FROM ja_case T "
		       +" INNER JOIN ja_caseperson T1 ON T.uuid=T1.mainformid "
		       +" LEFT JOIN ja_caseperson_dispose T2 ON T1.uuid=T2.mainformid "
		       +" WHERE  t1.organId_='"+organId+"' "
		       +" order by t.casenumber desc ";
		
		//sql1=" SELECT t.*,t.finishname as dstatusname  FROM vw_ja_caseperson t WHERE t.organId_='"+organId+"' order by casenumber desc ";
	}else if(formType=="BANR" ){
		sql1=" SELECT T1.uuid,T1.mainformid,T.curuserid,t.curusername,T.curleader,t.curleadername,T.curuserids_assist,t.curuserids_assistname,T.casenumber,t.suspectfrom, "
		       +" t.casetype,t.cause,t.status AS casestatus,t.statusname AS casestatusname,t1.identitynumber,t1.suspectsname,t1.gender,t1.birth,t1.nation, "
		       +" t1.register_site,t1.now_site,t1.telephone,t1.wordcode,t1.entertime,t1.sdate1,t1.status,t1.statusname,t1.statusname as dstatusname,t1.applytime,t1.isfinish, "
		       +" CASE t1.isfinish WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS finishname,t1.isout, "
		       +" CASE t1.hasout WHEN '1' THEN CONVERT('是' USING gbk) ELSE CONVERT('否' USING gbk) END AS hasout, "
		       +" t1.isurine,t1.isurineitem,t1.iscollect,t1.isawaitdoor,t1.isquestiondoor,t1.isdispose, "
		       +" t1.remark,t1.oper_user_id_,t1.oper_time_,t1.update_user_id_,t1.update_time_,t1.organId_ "
		       +" FROM ja_case T,ja_caseperson T1 "
		       +" WHERE T.uuid=T1.mainformid and t1.organId_='"+organId+"' and t1.isfinish=0"
		       +" order by t.casenumber desc ";
		
		//sql1=" SELECT t.*,t.statusname as dstatusname  FROM vw_ja_caseperson t WHERE t.organId_='"+organId+"' AND t.casestatus=0 and t.isfinish=0 order by casenumber desc ";
	}else if(formType=="NIAOJ" ){
		sql1=" SELECT T1.uuid,T1.mainformid,T.curuserid,t.curusername,T.curleader,t.curleadername,T.curuserids_assist,t.curuserids_assistname,T.casenumber,t.suspectfrom, "
		       +" t.casetype,t.cause,t.status AS casestatus,t.statusname AS casestatusname,t1.identitynumber,t1.suspectsname,t1.gender,t1.birth,t1.nation, "
		       +" t1.register_site,t1.now_site,t1.telephone,t1.wordcode,t1.entertime,t1.sdate1,t1.status,t1.statusname,t1.applytime,t1.isfinish, "
		       +" CASE t1.isfinish WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS finishname,t1.isout, "
		       +" CASE t1.hasout WHEN '1' THEN CONVERT('是' USING gbk) ELSE CONVERT('否' USING gbk) END AS hasout, "
		       +" CASE t1.isurineitem WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS dstatusname,"
		       +" t1.isurine,t1.isurineitem,t1.iscollect,t1.isawaitdoor,t1.isquestiondoor,t1.isdispose, "
		       +" t1.remark,t1.oper_user_id_,t1.oper_time_,t1.update_user_id_,t1.update_time_,t1.organId_ "
		       +" FROM ja_case T,ja_caseperson T1 "
		       +" WHERE T.uuid=T1.mainformid and t1.organId_='"+organId+"' and t1.isfinish=0"
		       +" order by t.casenumber desc ";
		
		//sql1=" SELECT t.*,CASE t.isurineitem WHEN '1' THEN CONVERT('完成' USING gbk) ELSE CONVERT('未完成' USING gbk) END AS dstatusname FROM vw_ja_caseperson t "
		//    +" WHERE t.organId_='"+organId+"' and t.isfinish=0  order by casenumber desc ";
	}	
	
	resultMap.put("sql1",sql1);
	resultMap.put("sql2",sql2);
	resultMap.put("sql3",sql3);
	
	return resultMap;
}
function getList(){
	
}
