<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta> 
<title>案件信息表</title>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/JingAn/allstyle.css"/>

 <!--[if lt IE 9]>
<style type="text/css">
 /* 针对IE6定义的样式 */
 .tabul{
	margin-left: -10px;
	margin-top: -7px;
 }
 .tabul li{
	width:65px;
 }
 .tabdiv{
	margin-top:-4px;
 }
</style>
<![endif]-->
	
<script type="text/javascript">  

var layout;
function extInit(){	
	
	
	
    var north = new Ext.Panel({
    	id:'northPanel',
    	region:'north',
    	border:false,
    	split:false,
        collapsible: false,
        margins:'0 0 0 0',
        cmargins:'0 0 0 0',
        lines:false,
        collapseMode:'mini',
        hideCollapseTool : true,
        height:42,
        contentEl:'_viewhead'
	});
	
	var center = new Ext.Panel({
		layout:'fit',
		region:'center',
		border:false,
		autoScroll:true,
		margins:'0 0 0 0',
		contentEl:'_viewbody'
		
	});
    	
	new ExtButtonPanel({
		renderTo:'sbtBtn',
		columns:1,
		items:[
		       /*  {
            text: '保存',
            icon:'${pageContext.request.contextPath}/css/theme/default/btn/save.png' ,
            scale: 'medium',
            handler:function(){
            	saveFormDiv();
			 }
            }, */
		    { 
            text: '关闭',
            icon:'${pageContext.request.contextPath}/css/theme/default/btn/close.png' ,
            scale: 'medium',
            handler:function(){
            	closetabthree();
			}
		   }]  
	});			
	
    var south = new Ext.Panel({
    	id:'southPanel',
    	region:'south',
    	border:false,
    	split:false,
        collapsible: false,
        margins:'0 0 0 0',
        cmargins:'0 0 0 0',
        lines:false,
        collapseMode:'mini',
        hideCollapseTool : true,
        height:70,
        contentEl:'_viewsouth'
	});
	
	layout=new Ext.Viewport({
		layout:'border',
		items:[
			north,center,south
		]
	});
	
}


function saveFormDiv(){
	
	if (!formSubmitCheck('thisForm')) {
		return;
	}
	
	//保存
	var url = "${pageContext.request.contextPath}/case.do?method=caseSave";
	thisForm.action = url;
	thisForm.submit();
	
}

function closetabthree(){
	if(parent.tab){
		parent.minview();
		closeTab(parent.tab);		
	}else if(parent.parent.tab){
		parent.parent.minview();
		closeTab(parent.parent.tab);
	}else if(parent.window){
		parent.window.minview();
		parent.window.close();
	}else{
		window.close();
	}
}

function backList(){
	
	var url = "${pageContext.request.contextPath}/case.do?method=cases&flag=${flag}";
	
	window.location = url;	
}

function fixDisable(){	
	var form_obj = document.all; 
	//form的值
	for (var i=0; i < form_obj.length; i++ ) {
		e=form_obj[i];
		if (e.tagName=='INPUT' || e.tagName=='TEXTAREA') {
			e.readOnly = false ;			
			e.disabled = false;
		}
		if(e.tagName=='SELECT'){
			e.disabled= false;
		}
		if(e.tagName == 'A'){
			e.disabled = false;
		}
		if(e.tagName == "IMG"){
			e.disabled = false;
		}
	}
		
	return true;
}

Ext.onReady(function(){
	
	/* initCombox("#target");//初始化下拉框 */
	mt_init_form_Control();
	
	extInit();
	
});

</script> 


 
</head>  
  
<body style="margin:0">  
 
<div id="_viewhead" class="threeviewhead" >
	<table id="tabInfo_tbl" cellspacing="0" cellpadding="0" border="0" width="100%">  
		<tr valign="center">  
			<td>
				<img class="newtabimg" src="${pageContext.request.contextPath}/css/btn/table.png"/>
			</td>
			<td> 
				<div class="threetabdiv">
					<span class="title">案件信息表</span>
					
					<span class="nownode"></span>
					
				</div> 
				<ul class="tabul">
					<li>
						<table cellspacing="0" cellpadding="0" border="0" height="100%" width="100%">  
						   <tr>  
							   <td nowrap id="tabInfotd0" align="center" class="tabInfoSelT" height="22px" >  
										表单信息
							   </td>  
						   </tr>  
					   </table> 
					</li>
				</ul>
			</td>   
			<td nowrap style="font-size: 2px; cursor: default; border-width: 0px 0px 1px 0px;   
			  border-color: #949878; border-style: Solid; width: 90%;"> 
				<ul class="tabultwo">
					<li>
						<img class="newtabimg2" src="${pageContext.request.contextPath}/css/btn/close.png" style="cursor:pointer" onclick="closetabthree()" title="关闭" />
					</li>
				</ul> 
			</td>  
		</tr>  
	</table>  
	
</div>	
 	
	 			
<div id="_viewbody" style="border-width:0px 1px 1px 1px;border:0;  
          border-style:Solid;background-color:#FEFCFD;padding:3px 0px 0px 0px;height:100%;width:99.9%;">
          
	<form name="thisForm" id="thisForm" class="formular" autocomplete="off" method="post" action=""> 
		<input type="hidden" id="editType" name="editType"  value="${editType}"> 
		<input type="hidden" id="flag" name="flag"  value="${flag}"> 
		<input type="hidden" id="uuid" name="uuid"  value="${case.uuid}"> 
	
		<div style="text-align: center">			
			<table align="center" border="0" class="polic_style" style="width:99%;">
				<tbody>
					<tr>
						<th class="form_title_th" colspan="6">
							<div class="form_title_div">
								&nbsp;</div>
							<span class="form_title_span1">基本情况</span></th>
					</tr>
					<tr>
						<td>
							<label for="casenumber">案件编号：</label></td>
						<td colspan="3">
							<input style="width: 99%; height: 31px" id="casenumber"  name="casenumber"  value="${case.casenumber}"  maxLength=100  readonly=true  noinput=true  type="text"  />
						</td>
					</tr>
					<tr>
						<td>
							<label for="casenature">案件性质：</label>
						</td>
						<td>
							<input style="width: 160px; height: 24px" id="casenature"  name="casenature"  maxLength=100  type="text" valuemustexist=true  type="text"  autoid="js:BasicDicImpl"  refer="案件性质"   value = "${case.casenature}"  /></td>
						<td>
							<label for="casetype">案件类别：</label>
						</td>
						<td>
							<input style="width: 98%; height: 24px"  id="casetype" name="casetype" maxLength=100  type="text"  value = "${case.casetype}"  /></td>
						<td>
							<label for="state">案件状态：</label>
						</td>
						<td>
							<input style="width: 160px; height: 24px" id="state"  name="state" maxLength=100  type="text" valuemustexist=true  type="text"  autoid="js:BasicDicImpl"  refer="案件状态"  value = "${case.state}"  />
						</td>
					</tr>
					<tr>
						<td>
							<label for="casename">案件名称：</label>
						</td>
						<td colspan="3">
							<input style="width: 99%; height: 24px" id="casename"  name="casename"  maxLength=100  type="text"  value = "${case.casename}"  />
						</td>
					</tr>
					<tr>
						<td>
							<label for="casedetails">简要案情：</label>
						</td>
						<td colspan="5">
							<textarea onscroll="this.rows++;" style="overflow-y:visible; width: 98%; height: 80px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="casedetails"  name="casedetails" maxLength=100 >${case.casedetails}</textarea>
						</td>
					</tr>
					<tr>
						<td>
							<label for="districtaddress">详细地址：</label>
						</td>
						<td colspan="5">
							<input style="width: 98%; height: 24px" id="districtaddress"  name="districtaddress"  maxLength=100  ext_type="text"  type="text"  value = "${case.districtaddress}"  />
						</td>
					</tr>
					<tr>
						<td>
							<label for="opportunity">时机：</label>
						</td>
						<td>
							<input style="width: 160px; height: 24px" id="opportunity"  name="opportunity"  maxLength=100  type="text" ext_type="singleSelect"  valuemustexist=true autoid="js:BasicDicImpl"  refer="时机"  value = "${case.opportunity}"  />
						</td>
						<td>
							<label for="Place">处所：</label>
						</td>
						<td>
							<input style="width: 160px; height: 24px" id="place"  name="place"  maxLength=100  ext_type="text"  type="text"  value = "${case.place}"  />
						</td>
						<td>
							<label for="position">部位：</label>
						</td>
						<td>
							<input style="width: 160px; height: 24px" id="position"  name="position"  maxLength=100  type="text"  value = "${case.position}"  />
						</td>
					</tr>
					<tr>
						<td>
							<label for="Toolscrime">作案工具：</label>
						</td>
						<td>
							<input style="width: 160px; height: 24px" id="toolscrime"  name="toolscrime"  maxLength=100  ext_type="text"  type="text"  value = "${case.toolscrime}"  />
						</td>
						<td>
							<label for="means">手段特点：</label>
						</td>
						<td>
							<input style="width: 160px; height: 24px"  id="means"  name="means"  maxLength=100  type="text"  value = "${case.means}"  />
						</td>
						<td>
							<label for="target">对象：</label>
						</td>
						<td>
							<input style="width: 160px; height: 24px" id="target"  name="target"  maxLength=100  type="text"  ext_type="singleSelect"  valuemustexist=true  autoid="js:BasicDicImpl"  refer="对象"  value = "${case.target}"  />
						</td>
					</tr>
					<tr>
						<td>
							<label for="crimesnumber">作案人数：</label>
						</td>
						<td>
							<input style="width: 160px; height: 24px" id="crimesnumber"  name="crimesnumber"  maxLength=100  type="text"  value = "${case.crimesnumber}"  />
						</td>
						<td>
							<label for="deathtoll">死亡人数：</label>
						</td>
						<td>
							<input style="width: 160px; height: 24px" id="deathtoll"  name="deathtoll"  maxLength=100  ext_type="text"  type="text"  value = "${case.deathtoll}"  />
						</td>
						<td>
							<label for="injuriesnumber">受伤人数：</label>
						</td>
						<td>
							<input style="width: 160px; height: 24px" id="injuriesnumber"  name="injuriesnumber"  maxLength=100  type="text"  value = "${case.injuriesnumber}"  />
						</td>
					</tr>
					<tr>
						<td>
							<label for="losscash">损失折款：</label>
						</td>
						<td>
							<input style="width: 160px; height: 24px" id="losscash"  name="losscash"  value="${case.losscash}"  maxLength=100  ext_type="text"  type="text"  class="validate-number"  />
						</td>
						<td>
							<label for="valueinvolved">涉案价值：</label>
						</td>
						<td>
							<input style="width: 160px; height: 24px" id="valueinvolved"  name="valueinvolved"  value="${case.valueinvolved}"  maxLength=100  type="text"  class="validate-number"  />
						</td>
						<td>
							<label for="salvagevalue">挽回损失价值：</label></td>
						<td>
							<input style="width: 160px; height: 24px" id="salvagevalue"  name="salvagevalue"  value="${case.salvagevalue}"  maxLength=100  type="text"  class="validate-number"  />
						</td>
					</tr>


					<tr>
						<th class="form_title_th" colspan="6">
							<div class="form_title_div">
								&nbsp;</div>
							<span class="form_title_span1">报案人-受害人信息</span></th>
					</tr>
					<tr>
						<td colspan="6">
							<table style='text-align:center ;' align='center' cellspacing='1' cellpadding='3' border='0' class='listTable'  id = 'ga_case_victim_table'> 
								<caption>报案人-受害人明细记录</caption> 
								<tr>
									<th>
									</th>
									<th rowspan=1 colspan=1  align='center' style='width: 20%'>姓名 </th>
									<th rowspan=1 colspan=1  align='center' style='width: 30%'>身份证</th>
									<th rowspan=1 colspan=1  align='center' style='width: 10%'>电话</th>
									<th rowspan=1 colspan=1  align='center' style='width: 30%'>工作单位</th>
									<th rowspan=1 colspan=1  align='center' style='width: 10%'>人员类型</th>
								</tr>
								<tbody id = 'ga_case_victim' >		
									<c:forEach items="${caseVictims}" var="field" varStatus="rows" >
									<tr id="ga_case_victim_row${rows.index}">
										<td>
											<input type="hidden" id="uuid_row${rows.index}" name="uuid"  value="${field.uuid}">
										</td>
										<td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 165px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="victimname_row${rows.index}" name="victimname" maxLength=500 readOnly>${field.victimname}</textarea>
										</td>											
										<td>
											<input style="height: 24px; width:165px" id="victimidcard_row${rows.index}" name="victimidcard"  maxLength=100  type="text" value="${field.victimidcard}"  readOnly/>
										</td>	
										<td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 135px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="victimphone_row${rows.index}" name="victimphone" maxLength=500 readOnly>${field.victimphone}</textarea>
										</td>	
										<td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 165px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="victimunit_row${rows.index}" name="victimunit" maxLength=500 readOnly>${field.victimunit}</textarea>
										</td>	
										<td>
											<input style="height: 24px; width: 165px" id="ctype_row${rows.index}" name="ctype"  maxLength=100  type="text"  value = "${field.ctype}"  readOnly/>
										</td>	
									</tr>	
									</c:forEach>		
								</tbody>
							</table>
						</td>
					</tr>	
					
					<tr>
						<th class="form_title_th" colspan="6">
							<div class="form_title_div">
								&nbsp;</div>
							<span class="form_title_span1">嫌疑人信息</span></th>
					</tr>
					<tr>
						<td colspan="6">
							<table style='text-align:center ;' align='center' cellspacing='1' cellpadding='3' border='0' class='listTable'  id = 'ga_suspect_table'> 
								<caption>嫌疑人明细记录</caption> 
								<tr>
									<th>
									</th>
									<th rowspan=1 colspan=1  align='center' style='width: 20%'>姓名 </th>
									<th rowspan=1 colspan=1  align='center' style='width: 20%'>身份证</th>
									<th rowspan=1 colspan=1  align='center' style='width: 10%'>性别</th>
									<th rowspan=1 colspan=1  align='center' style='width: 10%'>出生日期</th>
									<th rowspan=1 colspan=1  align='center' style='width: 40%'>户籍所在地</th>
								</tr>
								<tbody id = 'ga_suspect_victim' >		
									<c:forEach items="${caseSuspects}" var="field" varStatus="rows" >
									<tr id="ga_suspect_row${rows.index}">
										<td>
											<input type="hidden" id="uuid_row${rows.index}" name="uuid"  value="${field.uuid}">
										</td>
										<td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 165px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="name_row${rows.index}" name="name" maxLength=500 readOnly>${field.name}</textarea>
										</td>											
										<td>
											<input style="height: 24px; width:165px" id="idcard_row${rows.index}" name="idcard"  maxLength=100  type="text" value="${field.idcard}"  readOnly/>
										</td>	
										<td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 135px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="sex_row${rows.index}" name="sex" maxLength=500 readOnly>${field.sex}</textarea>
										</td>	
										<td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 165px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="birthdate_row${rows.index}" name="birthdate" maxLength=500 readOnly>${field.birthdate}</textarea>
										</td>
										<td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 300px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="address_row${rows.index}" name="address" maxLength=500 readOnly>${field.address}</textarea>
										</td>	
									</tr>	
									</c:forEach>		
								</tbody>
							</table>
						</td>
					</tr>	
					
					<tr>
						<th class="form_title_th" colspan="6">
							<div class="form_title_div">
								&nbsp;</div>
							<span class="form_title_span1">办案任务</span></th>
					</tr>
					<tr>
						<td>
							<label for="_user_auditdirector">主办民警：</label></td>
						<td>
							<%-- <input style="width: 160px; height: 24px" id="_user_auditdirector"  name="_user_auditdirector"  maxLength=100  type="text"  autoid="1507"  value = "${case._user_auditdirector}"  /> --%>
						<c:if test="${flag eq 'policeLeader'}">
						<input name="_user_auditdirector" size=23 type="text" id="_user_auditdirector"   autoid="js:gbag.AuditdirectorPliceLeaderType" refer='${case._user_auditdirector}' value = "${case._user_auditdirector}"  >
					   </c:if>
					   <c:if test="${flag ne 'policeLeader'}">
						<input name="_user_auditdirector" size=23 type="text" id="_user_auditdirector"      autoid="js:gbag.AuditdirectorType" value = "${case._user_auditdirector}"  >
					   </c:if>	
						</td>
						<td>
							<label for="assisting">协办民警：</label></td>
						<td>
							<input type='text' style="width: 160px; height: 24px" id='assisting' name='assisting' value='${case.assisting}' />
						</td>
					</tr>
					<tr>
						<td colspan="6">
							<table style='text-align:center ;' align='center' cellspacing='1' cellpadding='3' border='0' class='listTable'  id = 'ga_case_task_table'> 
								<caption>办案任务明细记录</caption> 
								<tr>
									<th>
									</th>
									<th rowspan=1 colspan=1  align='center' style='width: 30%'>任务内容 </th>
									<!-- <th rowspan=1 colspan=1  align='center' style='width: 20%'>完成时限</th> -->
									<!-- <th rowspan=1 colspan=1  align='center' style='width: 20%'>成果要求</th> -->
									<th rowspan=1 colspan=1  align='center' style='width: 30%'>处理结果</th>
									<th rowspan=1 colspan=1  align='center' style='width: 20%'>办理人</th>
									<th rowspan=1 colspan=1  align='center' style='width: 20%'>办理时间</th>
								</tr>
								<tbody id = 'ga_case_task' >		
									<c:forEach items="${caseTasks}" var="field" varStatus="rows" >
									<tr id="ga_case_task_row${rows.index}">
										<td>
											<input type="hidden" id="uuid_row${rows.index}" name="uuid"  value="${field.uuid}">
										</td>
									   <td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 135px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="taskcontent_row${rows.index}" name="taskcontent" maxLength=500 readOnly>${field.taskcontent}</textarea>
										</td>
										
										<%-- <td>
											<input class="required" style="height: 24px; width: 180px" id="taskcontent_row${rows.index}" name="taskcontent"  maxLength=100 type="text" valuemustexist=true 
											autoid="700"  refer="任务内容"     value = "${field.taskcontent}" readOnly/>
										</td> --%>											
										<%-- <td>
											<input style="height: 24px; width:145px" id="tasktimelimit_row${rows.index}" name="tasktimelimit"  maxLength=100  type="text" value="${field.tasktimelimit}"  readOnly/>
										</td> --%>	
										<%-- <td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 135px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="istakedown_row${rows.index}" name="istakedown" maxLength=500 readOnly>${field.istakedown}</textarea>
										</td> --%>	
										<td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 135px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="taskresult_row${rows.index}" name="taskresult" maxLength=500 readOnly>${field.taskresult}</textarea>
										</td>	
										<td>
											<input style="height: 24px; width: 165px" id="handleperson_row${rows.index}" name="handleperson"  maxLength=100  type="text"  value = "${field.handleperson}"  readOnly/>
										</td>
										<td>
											<input style="height: 24px; width: 165px" id="handletime_row${rows.index}" name="handletime"  maxLength=100  type="text"  value = "${field.handletime}"  readOnly/>
										</td>	
									</tr>	
									</c:forEach>		
								</tbody>
							</table>
						</td>
					</tr>
																		
					<tr>
						<th class="form_title_th" colspan="6">
							<div class="form_title_div">
								&nbsp;</div>
							<span class="form_title_span1">案件阶段时间</span></th>
					</tr>
					<tr>
						<td>
							<label for="bjsj">报警时间：</label></td>
						<td>
							<input style="width: 160px; height: 24px" id="bjsj"  name="bjsj" maxLength=100  type="text"  value = "${case.bjsj}"  />
						</td>
						<td>
							<label for="slsj">受理时间：</label>
						</td>
						<td>
							<input style="width: 160px; height: 24px" id="slsj" name="slsj"  maxLength=100  type="text"  value = "${case.slsj}"  />
						</td>
					</tr>
					<tr>
						<td>
							<label for="detectdate">破案时间：</label></td>
						<td>
							<input style="width: 160px; height: 24px" id="detectdate"  name="detectdate"  maxLength=100  type="text"  value = "${case.detectdate}"  />
						</td>
						<td>
							<label for="casedate">结案时间：</label></td>
						<td>
							<input style="width: 160px; height: 24px" id="casedate"  name="casedate"  maxLength=100  type="text"  value = "${case.casedate}"  />
						</td>
					</tr>
					<tr>
						<th class="form_title_th" colspan="6">
							<div class="form_title_div">
								&nbsp;</div>
							<span class="form_title_span1">案件指派信息</span></th>
					</tr>
					<tr>
						<td colspan="6">
							<table style='text-align:center ;' align='center' cellspacing='1' cellpadding='3' border='0' class='listTable'  id = 'ga_case_assign_table'> 
								<caption>案件指派记录</caption> 
								<tr>
								    <th>
									</th>
									<th rowspan=1 colspan=1  align='center' style='width: 30%'>指派人</th>
									<th rowspan=1 colspan=1  align='center' style='width: 40%'>指派时间</th>
									<th rowspan=1 colspan=1  align='center' style='width: 30%'>被指派人</th>
								</tr>
								<tbody id = 'ga_case_assign' >		
									<c:forEach items="${caseAssign}" var="field" varStatus="rows" >
									<tr id="ga_case_assign_row${rows.index}">
										<td>
											<input type="hidden" id="uuid_row${rows.index}" name="uuid"  value="${field.uuid}">
										</td>
									   <td>
									     <input name="assigntor" size=23 type="text" id="assigntor_row${rows.index}"  ext_type="singleSelect"    autoid="js:gbag.kuserNameToId" refer="${field.assigntor}" value = "${field.assigntor}" readOnly /> 
											<!--  <textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 165px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="assigntor_row${rows.index}" name="assigntor" maxLength=500 readOnly>${field.assigntor}</textarea>
										    -->
										</td>
											
										<td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 165px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="assigntime_row${rows.index}" name="assigntime" maxLength=500 readOnly>${field.assigntime}</textarea>
										</td>
										<td>
										    <input name="auditdirector" size=23 type="text" id="auditdirector_row${rows.index}"  autoid="js:gbag.kuserNameToId" refer="${field.auditdirector}" value = "${field.auditdirector}" readOnly /> 
										</td>	
											
									</tr>	
									</c:forEach>		
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
			<br/>
		</div>
	</form>
</div>
<div id="_viewsouth"><center> <div id='sbtBtn'></div></center></div>

<script type="text/javascript">

</script>

</body>  
</html>  