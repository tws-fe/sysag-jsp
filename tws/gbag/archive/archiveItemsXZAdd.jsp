<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>案件材料登记</title>

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
}
//保存|打印|缺失提醒
function saveForm(savestyle){
	if (!formSubmitCheck('thisForm')) return;
	
	var orderid = document.getElementsByName("orderid");
	if(!orderid || orderid.length == 0){
		alert("请先增加档案材料！");
		return;
	}

  	/* var objs=document.getElementsByName("casenumber");
	
 	for(var index=0;index<objs.length;index++){
		var objId=objs[index].id;
		var rowid=objId.split("_")[1];
		$('#casenumber_'+rowid).val(Ext.getCmp('casenumber_'+rowid).getRawValue());
		
	} */	
		
	// 等待页面
	showWaiting();
	document.thisForm.action="police.do?method=archiveItemsSave&savestyle=" + savestyle;	
	document.thisForm.submit();
	stopWaiting();
}

//获取简要案情页面
function select_case(obj){
	var inputObj = document.getElementById(obj.inputId);
	var objId=$('#'+obj.id).prev().attr("id");
	var rowid=objId.split("_")[1];
	if(inputObj.value != ""){            
		var DEFAULT_REFRESHURL = MATECH_SYSTEM_WEB_ROOT + "/caseVist.do?method=getCaseInfo";
		var request = "&casenumber="+obj.value ;
		var result = ajaxLoadPageSynch(DEFAULT_REFRESHURL, request);
		var lst = Ext.util.JSON.decode(result);
		if(lst){		
			var objs =lst[0];
			$('#bjsj_'+rowid).val(objs.bjsj);
			$('#suspectname_'+rowid).val(objs.suspectname);
			$('#victimname_'+rowid).val(objs.victimname);
			$('#casename_'+rowid).val(objs.casename);
			$('#casestyle_'+rowid).val(objs.casenaturename);
			$('#casestatename_'+rowid).val(objs.statename);
			$('#auditdirector_'+rowid).val(objs.auditdirector);
			$('#casenumber_'+rowid).val(objs.casenumber);
			Ext.getCmp('casenumber_'+rowid).setValue(objs.casenumber);
			Ext.getCmp('casenumber_'+rowid).setRawValue(objs.casenumber);
		}
	 } 
 }

//加行后
function mt_subform_after_add(table, rowId,pObj){	
	//顺序号(全部重算)
	retry_orderid();
}

//删行后
function mt_subform_after_del(){
	//顺序号(全部重算)
	retry_orderid();
}

//顺序号(全部重算)
function retry_orderid(){
	var o = document.getElementsByName("orderid");	
	for(var i=0;i<o.length;i++){
		o[i].value = i+1;
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
<input id='flag'  name='flag'  type='hidden' value="${flag}" />
<table  cellpadding="8" cellspacing="0" style='width:100%' align="center" class="data_tb" >
	<tr>
		<th class="x-panel-header" colspan="100" style="text-align: center;">档案材料</th>
	</tr>
    <tr>
    	<td width="100" class="data_tb_alignright" align="right" >案件性质：</td>
		<td class="data_tb_content" >
				<input type="text" id="casetype"  name="casetype"  class="required"  value="行政案件" readOnly/>	
		</td>
		<td width="100" class="data_tb_alignright" align="right" >接收人：</td>
		<td class="data_tb_content" >
			<input type="text" id="receiver"  name="receiver"  class="required" autoid="js:gbag.AuditdirectorType"  value="${userSession.userId}" />
		</td>
		<td class="data_tb_alignright" width="100" align="right">接收时间：</td>
		<td class="data_tb_content" >
			<input type="text" id="receiverTime"  name="receiverTime"  class="required" value="${shiftDate}" />
		</td>
    </tr>    

	<tr>
		<td colspan="6">
			<table style='text-align:center ;width:100%;' align='center'  cellspacing='1' cellpadding='3' border='0' class='listTable'  id = 'ga_files_task' > 
				<tr>
					<th align='center' style='width: 5%' class="data_tb_alignright" ><img style='cursor:hand;' alt='新增一行' onclick="mt_add('ga_files_task','13',null);" src='${pageContext.request.contextPath}/img/menu/add.png'></th>
					<th align='center' class="data_tb_alignright" style='width: 2%' >序号</th>
					<th align='center' class="data_tb_alignright" style='width: 15%' >案件编号</th>
					<th align='center' class="data_tb_alignright" style='width: 10%' >案件名称</th>
					<th align='center' class="data_tb_alignright" style='width: 15%'>报警时间</th>
					<th align='center' class="data_tb_alignright" style='width: 8%'>受害人（事主）</th>
					<th align='center' class="data_tb_alignright" style='width: 8%'>嫌疑人</th>
					<th align='center' class="data_tb_alignright" style='width: 8%'>案件类别</th>
					<th align='center' class="data_tb_alignright" style='width: 5%'>主办民警</th>
					<th align='center' class="data_tb_alignright" style='width: 5%'>案件状态</th>
					<th align='center' class="data_tb_alignright" style='width: 10%'>移交日期</th>		
					<th align='center' class="data_tb_alignright" style='width: 8%'>移交人</th>
					<th align='center' class="data_tb_alignright" style='width: 10%'>备注</th>
				</tr>			
			</table>
		
			<textarea style="display:none;" id="mt_slist_ga_files_task" name="mt_slist_ga_files_task">[	
				"<input id='orderid'  name='orderid'  ext_type='text'  type='text' size=5 />",
				"<input id='casenumber'  name='casenumber' style='width:95%' listwidth='400' ext_type='singleSelect' ext_select='1590' refer='casetype' autoid='js:gbag.CaseNameAndCasenumber' onselect='select_case(this)' checkinput='false'  ext_validate='required'  class='required'/>",
				"<input id='casename'  name='casename'  style='width:100%' ext_type='text'  type='text' />",
				"<input id='bjsj'  name='bjsj'  style='width:100%' type='text' ext_type='datetime' />",
				"<input id='victimname'  name='victimname'  style='width:100%' ext_type='text'  type='text' />",
				"<input id='suspectname'  name='suspectname'  style='width:100%' ext_type='text'  type='text' />",
				"<input id='casestyle'  name='casestyle' style='width:100%' ext_type='text'  type='text' ext_validate='required'  class='required' />",
				"<input id='auditdirector'  name='auditdirector'  style='width:100%' ext_type='text'  type='text' />",
				"<input id='casestatename'  name='casestatename'  style='width:100%' ext_type='text'  type='text' />",
				"<input id='filedate'  name='filedate'  ext_type='date'  type='text' size=10 value='${shiftDate}' ext_validate='required'  class='required'/>",
				"<input id='autor'  name='autor' size=15  ext_type='singleSelect' ext_select='1507' autoid='js:gbag.AuditdirectorType'/>",
				"<input id='remark'  name='remark'  style='width:100%' ext_type='text'  type='text' />"
			]</textarea>	
		</td>
	</tr>
</table>
<br><br><br>

</form>
</div>
</body>

</html>