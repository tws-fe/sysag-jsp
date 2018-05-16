<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>行政档案材料登记页面</title>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/JingAn/allstyle.css"/>

<script Language=JavaScript>

function ext_init(){
	
	var tbar = new Ext.Toolbar({	   		
		height:30,
		region:'north',
		defaults: {autoHeight: true,autoWidth:true},
		items:[{
			text:'保存',
			cls:'x-btn-text-icon',
			icon:contextPath + btn_img_url + 'save.png',
			handler:function(){
				saveForm("XZ");
			}  
		},'-',{
			text:'返回',
			cls:'x-btn-text-icon',
			icon:contextPath + btn_img_url + 'back.png',
			handler:function(){
				var url = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=archiveItemsXZList&savestyle=XZ";							
				window.location = url;	
			}  
		}]
	});
	
	var layout = new Ext.Viewport({
		layout:'border',
		items:[tbar,new Ext.Panel({
				region:'center',
				contentEl: 'center',
				margins:'0 0 0 0',
				autoScroll:true, 
				lines:false
			})
		 ]
	});	
	layout.doLayout();		
	
	
	show_casenumber_dir();
	
}
//保存|打印|缺失提醒
function saveForm(savestyle){

	if (!formSubmitCheck('thisForm')) return;

	/* var objs=document.getElementsByName("casename");
	
	for(var index=0;index<objs.length;index++){
		var objId=objs[index].id;
		var rowid=objId.split("_")[1];
		
		$('#casename_'+rowid).val(Ext.getCmp('casenumber_'+rowid).getRawValue());	
		
	} */

	// 等待页面
	showWaiting();
	document.thisForm.action="police.do?method=archiveItemsSave&savestyle=" +savestyle;	
	document.thisForm.submit();
	stopWaiting();
} 

function show_casenumber_dir(){
	mt_remove_all('ga_files_task'); //删除所有行
	var obj=document.getElementById("uuids");
	var DEFAULT_REFRESHURL = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=getArchiveEditInfo";
	var request = "&uuid=" + (obj.value+"").replace(",","','");
	var result = ajaxLoadPageSynch(DEFAULT_REFRESHURL, request);
	var lst = Ext.util.JSON.decode(result);
	if(lst){
		for(var i=0; i < lst.length; i++){
			var objs = lst[i];
			var rowid=1000+i;//设置行的初始值默认为1000
			mt_add('ga_files_task','14',objs);
		    $('#bjsj_'+rowid).val(objs.bjsj);
		    $('#filesnumber_'+rowid).val(objs.filesnumber);
			$('#suspectname_'+rowid).val(objs.suspectname);
			$('#victimname_'+rowid).val(objs.victimname);
			$('#casename_'+rowid).val(objs.casename);
			$('#casestyle_'+rowid).val(objs.casestyle);
			$('#casestatename_'+rowid).val(objs.casestatename);
			$('#auditdirector_'+rowid).val(objs.auditdirector);
			$('#casenumber_'+rowid).val(objs.casenumber);
			$('#deliveryer_'+rowid).val(objs.deliveryer);
			$('#deliveryername_'+rowid).val(objs.deliveryername);
			$('#accepttime_'+rowid).val(objs.accepttime);
			Ext.getCmp('deliveryer_'+rowid).setValue(objs.deliveryer);
			Ext.getCmp('deliveryer_'+rowid).setRawValue(objs.deliveryername);
			Ext.getCmp('casenumber_'+rowid).setValue(objs.casenumber);
			Ext.getCmp('casenumber_'+rowid).setRawValue(objs.casenumber);
			
		 }
	}
	
}


//获取简要案情页面
function select_case(obj){
	var inputObj = document.getElementById(obj.inputId);
	var objId=$('#'+obj.id).prev().attr("id");
	var rowid=objId.split("_")[1];
	
	if(inputObj.value != ""){            
		var DEFAULT_REFRESHURL = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=getCaseInfo";
		var request = "&casenumber="+obj.value ;
		var result = ajaxLoadPageSynch(DEFAULT_REFRESHURL, request);
		var lst = Ext.util.JSON.decode(result);
		if(lst){		
			var objs =lst[0];
			$('#bjsj_'+rowid).val(objs.bjsj);
			$('#suspectname_'+rowid).val(objs.suspectname);
			$('#victimname_'+rowid).val(objs.victimname);
			$('#casename_'+rowid).val(objs.casename);
			$('#casestyle_'+rowid).val(objs.casestyle);
			$('#casestatename_'+rowid).val(objs.statename);
			$('#auditdirector_'+rowid).val(objs.auditdirector);
			$('#casenumber_'+rowid).val(objs.casenumber);
			$('#casenumber_'+rowid).val();
		}
	 } 
 }

//加行后
function mt_subform_after_add(table, rowId,pObj){
	
	if(pObj){
		for(var key in pObj){
			var k = key.substring(2);
			var o = document.getElementById(k + "_" + rowId);
			if(o){
				if(k == "casenumber"){
					Ext.getCmp(k + "_" + rowId).setValue(pObj[key]);
					Ext.getCmp(k + "_" + rowId).setRawValue(pObj["__casename"]);
					Ext.get(k + "_" + rowId).dom.value=pObj[key];
				}else if(k == "deliveryer"){
					Ext.getCmp(k + "_" + rowId).setValue(pObj[key]);
					Ext.getCmp(k + "_" + rowId).setRawValue(pObj["__deliveryername"]);
					Ext.get(k + "_" + rowId).dom.value=pObj[key];
				}else{
					o.value = pObj[key];
				}
			}
		}	
	}	
}

Ext.onReady(function(){
	ext_init();
	
	mt_init_form_Control();		
})
</script>

</head>

<body leftmargin="0" topmargin="0">
<div id="center">
<form name="thisForm" method="post" action="" id="thisForm" >
	<input type="hidden" name="uuids" id="uuids" value="${uuid}">
	<input type="hidden" name="editType" id="editType" value="update">
	<input id='flag'  name='flag'  type='hidden' value="${flag}" />
	<input type="hidden" id="casetype"  name="casetype"  value="行政案件"/>

	<table  cellpadding="8" cellspacing="0" style='width:100%' align="center" class="data_tb" >
		<tr>
			<th class="x-panel-header" colspan="100" style="text-align: center;">档案材料</th>
		</tr>
		<tr>
			<td colspan="4">
				<table style='text-align:center ;width:100%;' align='center'  cellspacing='1' cellpadding='3' border='0' class='listTable'  id = 'ga_files_task' > 
					<tr>
					    <th align='center' style='width: 0%' class="data_tb_alignright" ></th>
						<th align='center' class="data_tb_alignright" style='width: 0%' ></th>
						<th align='center' class="data_tb_alignright" style='width: 10%' >编号</th>
						<th align='center' class="data_tb_alignright" style='width: 13%' >案件编号</th>
						<th align='center' class="data_tb_alignright" style='width: 10%' >案件名称</th>
						<th align='center' class="data_tb_alignright" style='width: 10%'>报警时间</th>
						<th align='center' class="data_tb_alignright" style='width: 10%'>受害人（事主）</th>
						<th align='center' class="data_tb_alignright" style='width: 10%'>嫌疑人</th>
						<th align='center' class="data_tb_alignright" style='width: 12%'>案件类别</th>
						<th align='center' class="data_tb_alignright" style='width: 5%'>主办民警</th>
					    <th align='center' class="data_tb_alignright" style='width: 5%'>案件状态</th>
						<th align='center' class="data_tb_alignright" style='width: 10%'>移交日期</th>		
					    <th align='center' class="data_tb_alignright" style='width: 10%'>移交人</th>
						<th align='center' class="data_tb_alignright" style='width: 15%' >备注</th>	
					</tr>			
				</table>
			
				<textarea style="display:none;" id="mt_slist_ga_files_task" name="mt_slist_ga_files_task">[	
				    "<input id='uuid'  name='uuid'  ext_type='text'  type='text'  style='width:0%' readOnly/>",
					"<input id='filesnumber'  name='filesnumber'  ext_type='text'  type='text' style='width:100%' readOnly/>",
					"<input id='casenumber'  name='casenumber' style='width:95%'  ext_type='singleSelect' ext_select='1590' refer='casetype' autoid='js:gbag.CaseNameAndCasenumber' onselect='select_case(this)' ext_validate='required' class='required'/>",
					"<input id='casename'  name='casename'  style='width:100%' ext_type='text'  type='text' />",
					"<input id='bjsj'  name='bjsj'  style='width:100%' type='text' ext_type='datetime' />",
					"<input id='victimname'  name='victimname'  style='width:100%' ext_type='text'  type='text' />",
					"<input id='suspectname' name='suspectname'  style='width:100%' ext_type='text'  type='text' />",
					"<input id='casestyle'   name='casestyle' style='width:100%' ext_type='text'  type='text' ext_validate='required'  class='required' />",
					"<input id='auditdirector'  name='auditdirector'  style='width:100%' ext_type='text'  type='text' />",
				    "<input id='casestatename'  name='casestatename'  style='width:100%' ext_type='text'  type='text' />",
					"<input id='accepttime'  name='accepttime'  ext_type='date'  type='text' size=10  ext_validate='required'  class='required'/>",
					"<input id='deliveryername'  name='deliveryername' size=15  type='hidden' />",
					"<input id='deliveryer'  name='deliveryer' size=15  autoid='js:gbag.AuditdirectorType' />",
					"<input id='filesdescribe'  name='filesdescribe'  style='width:100%' ext_type='text'  type='text' />"
				]</textarea>	
			</td>
		</tr>
	</table>
<br><br><br>
</form>
</div>
</body>

</html>