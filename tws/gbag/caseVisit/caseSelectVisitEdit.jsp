<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta> 
<title>来访登记表</title>
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
			id:'buttonPanel',
			columns:1,
			items:[{
		            text: '返回',
		            icon:'${pageContext.request.contextPath}/css/theme/default/btn/close.png' ,
		            scale: 'medium',
		            handler:function(){
		            	backList();
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
	
  showMybutton();

}


function saveFormDiv(){
	
	if (!formSubmitCheck('thisForm')) {
		return;
	}
	if (confirm("您确认要提交吗？")) {
		//保存
		var url = "${pageContext.request.contextPath}/caseVist.do?method=caseVisitSave";
		thisForm.action = url;
		thisForm.submit();	
	}
	
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
	
	url = "${pageContext.request.contextPath}/caseVist.do?method=caseSelectVisitList";//来访登记列表（接访民警是本人）

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


function showMyMsgInfo(){
	
	var value = $("#casenum").val();
	$.ajax({
		type :"Post",
		async:true,
		url : "${pageContext.request.contextPath}/caseVist.do?method=getHistroyInfo&uuids="+value,
		data:{},
		success : function(data) {
			result=unescape(data);
			result=Ext.util.JSON.decode(result);
			table_add(result);
		}
	});	
	
}

function table_add(obj){
	
	$("#ga_visit").empty();//先清空旧数据
	
	for(var index=0;index<obj.length;index++){
		
		var item=obj[index];
		var curRowId="row0";
		var lastTrId=$("#ga_visit_ tr:last").attr("id");
		if(lastTrId){
			var rowId = lastTrId.substring(lastTrId.lastIndexOf('_') + 1);
			curRowId=parseInt(rowId.replace("row",""))+1;
			curRowId="row"+parseInt(rowId.replace("row",""))+1;
		}

		var html="";
		html=html+"<tr id=\"ga_visit_"+curRowId+"\">";
		html=html+"<td>";
		html=html+"	<input type=\"hidden\" id=\"uuid_"+curRowId+"\" name=\"uuid\"  value=\"\">";
		html=html+"</td>";
		html=html+"<td>";
		html=html+"	<textarea  onscroll=\"this.rows++;\" style=\"overflow-y:visible; height: 24px; width: 135px\" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id=\"name_"+curRowId+"\" name=\"hname\" maxLength=500 readOnly>"+item.name+"</textarea>";
		html=html+"</td>";
		html=html+"<td>";
		html=html+"	<textarea  onscroll=\"this.rows++;\" style=\"overflow-y:visible; height: 24px; width: 135px\" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id=\"telnum_"+curRowId+"\" name=\"htelnum\" maxLength=500 readOnly>"+item.telnum+"</textarea>";
		html=html+"</td>";
		html=html+"<td>";
		html=html+"	<textarea  onscroll=\"this.rows++;\" style=\"overflow-y:visible; height: 24px; width: 300px\" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id=\"visitfor_"+curRowId+"\" name=\"hvisitfor\" maxLength=500 readOnly>"+item.visitfor+"</textarea>";
		html=html+"</td>";
		html=html+"<td>";
		html=html+"	<textarea  onscroll=\"this.rows++;\" style=\"overflow-y:visible; height: 24px; width: 165px\" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id=\"visittime_"+curRowId+"\" name=\"hvisittime\" maxLength=500 readOnly>"+item.visittime+"</textarea>";
		html=html+"</td>";
		html=html+"<td>";
		html=html+"	<textarea  onscroll=\"this.rows++;\" style=\"overflow-y:visible; height: 24px; width: 300px\" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id=\"reply_"+curRowId+"\" name=\"hreply\" maxLength=500 readOnly>"+item.reply+"</textarea>";
		html=html+"</td>";
		html=html+"</tr>";
		
		$("#ga_visit").append(html);
		
	    //initCombox("state_"+curRowId);//初始化下拉框		
	}
	
	layout.doLayout();

}


Ext.onReady(function(){
	
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
					<span class="title">来访情况登记表</span>
					
					<span class="nownode">当前节点:[来访登记]</span>
					
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
						<img id="_saveul" class="newtabimg2" src="${pageContext.request.contextPath}/css/btn/save.png" style="cursor:pointer" onclick="saveFormDiv();" title="保存"/>
					</li>					
					<li>
						<img class="newtabimg2" src="${pageContext.request.contextPath}/css/btn/close.png" style="cursor:pointer" onclick="backList()" title="返回" />
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
		<input type="hidden" id="formType" name="formType"  value="${formType}">
		<input type="hidden" id="flag" name="flag"  value="${flag}">  
		<input type="hidden" id="uuid" name="uuid"  value="${caseVisit.uuid}">
		<input type="hidden" id="mainformid" name="mainformid"  value="${caseBean.uuid}">
		<input type="hidden" id="pKey" name="pKey"  value="${pKey}">
		<input type="hidden" id="pfl" name="pfl"  value="${pfl}">
		<input type="hidden" id="select" name="select"  value="${select}">  		
			 
		<div style="text-align: center">			
			<table align="center" border="0" class="polic_style">
				<tbody id="tbodyFieldList">
					<tr>
						<th class="form_title_th" colspan="6">
							<div class="form_title_div">
								&nbsp;</div>
							<span class="form_title_span1">案件信息</span></th>
					</tr>
					
					<tr>
						<td>
							<label>案件编号：</label>
						</td>
						<td>
							<input style="height: 24px; width: 300px" id="casenum"  name="casenum"  maxLength=100  ext_select="1583"  autoid="js:gbag.CaseNameAndCasenumber"  ext_onselect="show_caseinfo(this)"  onselect=show_caseinfo(this)  type="text"   value="${caseVisit.casenum}" />
						</td>
					</tr>
					<tr>
						<td><label>案情简介：</label>
						</td>
						<td colspan="6">
							<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 90px; width: 1800px;" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="caseinfo"  name="caseinfo"  maxLength=500  >${caseVisit.caseinfo}</textarea>
						</td>
					</tr>
					
					<tr>
						<th class="form_title_th" colspan="6">
							<div class="form_title_div">
								&nbsp;</div>
							<span class="form_title_span1">历史来访信息</span></th>
					</tr>
					<tr>
						<td colspan="6">
							<table style='text-align:center ;' align='center' cellspacing='1' cellpadding='3' border='0' class='listTable'  id = 'ga_visit_table'> 
								<caption>历史来访记录</caption> 
								<tr>
									<th>
									</th>
									<th rowspan=1 colspan=1  align='center' style='width: 10%'>来访人姓名 </th>
									<th rowspan=1 colspan=1  align='center' style='width: 10%'>联系电话</th>
									<th rowspan=1 colspan=1  align='center' style='width: 30%'>来访事由</th>
									<th rowspan=1 colspan=1  align='center' style='width: 20%'>来访时间</th>
									<th rowspan=1 colspan=1  align='center' style='width: 30%'>答复内容</th>
								</tr>
								<tbody id = 'ga_visit' >		
									<c:forEach items="${visitList}" var="field" varStatus="rows" >
									<tr id="ga_visit_row${rows.index}">
										<td>
											<input type="hidden" id="uuid_row${rows.index}" name="uuid"  value="${field.uuid}">
										</td>
										<td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 135px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="name_row${rows.index}" name="hname" maxLength=500 readOnly>${field.name}</textarea>
										</td>												
										<td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 135px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="telnum_row${rows.index}" name="htelnum" maxLength=500 readOnly>${field.telnum}</textarea>
										</td>	
										<td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 300px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="visitfor_row${rows.index}" name="hvisitfor" maxLength=500 readOnly>${field.visitfor}</textarea>
										</td>
										<td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 165px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="visittime_row${rows.index}" name="hvisittime" maxLength=500 readOnly>${field.visittime}</textarea>
										</td>
										<td>
											<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 300px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="reply_row${rows.index}" name="heply" maxLength=500 readOnly>${field.reply}</textarea>
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
							<span class="form_title_span1">来访人员信息</span></th>
					</tr>
					<tr>
					    <td><label><span class="mustSpan">姓名：</span></label>
						<td>
							<input style="height: 24px; width: 165px" id="name"  name="name"  maxLength=100  type="text" class="required" value = "${caseVisit.name}"/>
						</td>
						<td><label><span class="mustSpan">身份证号码：</span></label>
						</td>
						<td><span>
							<input style="height: 24px; width: 165px" id="identitynumber_1"  name="idcardnum"  maxLength=100  type="text"  class="required"  onblur="isIdCardNo(this.value,1)" value = "${caseVisit.idcardnum}"  /> 
							<input id="identity1" name="identity1" onclick="getIdentity(1);" size="38" style="height:24px;line-height:20px;width:100px;" type="button" value="读取身份证" />
							</span> 
						</td>
						<td><label>年龄：</label>
						<td>
							<input style="height: 24px; width: 160px" id="age"  name="age"  maxLength=100  type="text"  value = "${caseVisit.age}"/>
						</td>
						
					</tr>
					<tr>
						<td><label><span class="mustSpan">性别：</span></label></td>
						<td>	
							<input style="height: 24px; width: 165px" id="gender_1"  name="sex" maxLength=100  ext_select="0|男|女"  valuemustexist=true  type="hidden"  ext_type="radio"  class="required" select="0|男|女" value = "${caseVisit.sex}"/>
						</td>
						<td><label><span class="mustSpan">联系电话：</span></label></td>
						<td>
							<input style="height: 24px; width: 165px" id="telnum" name="telnum"  maxLength=100 type="text" class="required" onblur="checkMobile(this.value)" value = "${caseVisit.telnum}"  />
						</td>
						<td><label>来访时间：</label></td>
						<td>
							<input style="height: 24px; width: 160px" id="visittime" name="visittime"  maxLength=100   type="text"  value = "${curDateTime}"  />
						</td>
					</tr>
					
					
					<tr>
						<td><label>工作单位：</label></td>
						<td colspan="5">
							<input style="height: 24px; width: 99%" id="workunit"  name="workunit"  maxLength=100  type="text"  value = "${caseVisit.workunit}"  />
						</td>
					</tr>
					<tr>
						<td><label>住址：</label></td>
						<td colspan="5">
							<input style="height: 24px; width: 99%" id="address" name="address"  maxLength=100  type="text"  value = "${caseVisit.address}"  />
						</td>
						
					</tr>
					<tr>
						<td><label><span class="mustSpan">来访事由：</span></label>
						</td>
						<td colspan="6">
							<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 90px; width: 99%"   id="visitfor"  name="visitfor"  maxLength=500 class="required">${caseVisit.visitfor}</textarea>
						</td>
					</tr>
					
					<tr>
						<th class="form_title_th" colspan="6">
							<div class="form_title_div">
								&nbsp;</div>
							<span class="form_title_span1">接访信息</span></th>
					</tr>
				    <tr>
					    <td>
							<label><span class="mustSpan">接访民警：</span></label>
						</td>
						<td>
							<%-- <input style="height: 24px; width: 99%" id="receivecop" name="receivecop"  maxLength=100 type="text" autoid="1507"  value="${userSession.userId}"/> --%>
							 
							<input style="height: 24px; width: 165px" id="receivecop" name="receivecop"  maxLength=100  type="text" valuemustexist=true  autoid="js:gbag.AuditdirectorType"  refer="民警"   value="${caseVisit.receivecop}" readOnly />
						</td>
						<td><label>主办民警：</label></td>
						
						<td >
			                <input name="auditdirectors" size=23 type="text" id="auditdirectors"       autoid="js:gbag.ToReloAuditdirectorType" refer="主办民警" value = "${caseVisit.auditdirectors}" <c:if test="${flag ne 'nq'}">readOnly </c:if> /> 
		            		<input id="auditdirectorname" name="auditdirectorname" type="hidden"  value="${caseVisit.auditdirectorname}" />
		                </td>
		               	
					</tr>
					<tr>
						<td><label>前台答复：</label>
						</td>
						<td colspan="6">
							<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 90px; width: 99%"   id="receivereply"  name="receivereply"  maxLength=500   >${caseVisit.receivereply}</textarea>
						</td>
					</tr>
					<tr>
						<td><label>答复内容：</label>
						</td>
						<td colspan="6">
							<textarea onscroll="this.rows++;" style="overflow-y:visible; height: 90px; width: 99%"   id="reply"  name="reply"  maxLength=500   >${caseVisit.reply}</textarea>
						</td>
					</tr>
					<tr>
						<td>
						
							<label ><span class="mustSpan">接访结果：</span></label>
						</td>
						<td>
							<input style="width: 160px; height: 24px;" ext_id="result"  id="result"  ext_name="result"  name="result"  ext_field="result"  field=result  ext_maxLength="100"  maxLength=100  ext_type="radio"  type="hidden"  ext_validate="required"  class="required"  ext_select="0|需跟进|已解决"  select="0|需跟进|已解决"  value = "${caseVisit.result}"  /></td>
			       </tr>
										
				</tbody>
			</table>
			<br/>
		</div>
	</form>
</div>
<div id="_viewsouth"><center> <div id='sbtBtn'></div></center></div>

<script type="text/javascript">
/* ========= util ========== */

function setServerTime(timegetter){
	if (typeof timegetter == 'string'){
		timegetter = document.getElementById(timegetter);
	}
	if (timegetter.value.length > 0){
		return timegetter;
	}
	
	TimeUtil.init().getServerTimeTo(function(time){
		timegetter.value = time;
	});
		
	return timegetter;
}

function setUsername(namegetter){
	if (typeof namegetter == 'string'){
		namegetter = document.getElementById(namegetter);
	}
	if (namegetter.value.length > 0){
		return namegetter;
	}
	namegetter.value = '系统管理员';
	return namegetter;
}

//扫描身份证
var idenWin = null;
function getIdentity(rowid){
	var result=window.showModalDialog(MATECH_SYSTEM_WEB_ROOT + "/ocx/card.htm?rand=" + Math.random(),null,"dialogWidth=880px;dialogHeight=480px");
	setCardTxt(result,rowid);
	return;
	
}

//扫描后赋值
function setCardTxt(obj,rowid){
	
	var card = {'identitynumber':'pCardId','suspectsname':'pCardName','gender':'pCardSex','nation':'pCardNation','birth':'pCardBirthday','register_site':'pCardAddress'};			
	for(var p in card){
		document.getElementById(p+"_"+rowid).value = obj[card[p]];
	}

}

//获取简要案情页面
function show_caseinfo(obj){
	var inputObj = document.getElementById(obj.inputId);
	var casenumber=Ext.getCmp("casenum").getValue();
	if(inputObj.value != ""){            
		var DEFAULT_REFRESHURL = MATECH_SYSTEM_WEB_ROOT + "/caseVist.do?method=getCaseInfo";
		var request = "&casenumber="+casenumber ;
		var result = ajaxLoadPageSynch(DEFAULT_REFRESHURL, request);
		var lst = Ext.util.JSON.decode(result);
		if(lst){
			$("#caseinfo").val(lst[0].caseinfo);
			Ext.getCmp("auditdirectors").setRawValue(lst[0].auditdirector);   //用ext 给下拉赋值（显示值：显示主办民警名称）
			Ext.getCmp("auditdirectors").setValue(lst[0]._user_auditdirector);//用ext 给下拉赋值  （显示值：显示主办民警id）
			
   			$("#auditdirectors").val(lst[0]._user_auditdirector);
   			$("#auditdirectorname").val(lst[0].auditdirector);
			}
			
		}
	showMyMsgInfo();//调用方法
 }



</script>

<script type="text/javascript">

function isIdCardNo(num,rowid) { 
	var card = document.getElementById("identitynumber_"+rowid);//身份证
	var gender = document.getElementById("gender_"+rowid);//性别

	num = num.toUpperCase(); //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。         
    
	if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {      
        alert("身份证号码非法，请检查确认；如无法获取可以填写[无身份证]，事后通过[重新修改人员信息]环节补充");
        return false;          
    }   
    //验证前2位，省份符合  
    var aCity={
    	11:"北京",12:"天津",13:"河北",14:"山西",
    	15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",
    	31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",
    	36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",
    	44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",
    	52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
    	63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",
    	82:"澳门",91:"国外"
    };

	
    if(aCity[parseInt(num.substr(0,2))]==null){  
        alert('身份证号不正确或不符合规定！');
        return false;  
    }  
 	    //下面分别分析出生日期和校验位  
 	    var len, re; len = num.length;   
	if (len == 15) {  
		 checkFifTeen(num,rowid);
	}  
	if (len == 18) {  
	      checkEightTeen(num,rowid);
	}
	return false;
}  
	
/**
 * 检查日期是否正确
 * @param  y1  当前年份
 * @param  m1  当前月份
 * @param  d1  当前日期
 * @param  y2  身份证上的年份
 * @param  m2  身份证上的月份
 * @param  d2  身份证上的日期
 */
function checkDate(y1,m1,d1,y2,m2,d2){
	
	if(y2<y1){//判断是否小于当前年
		return true ;
	}else if(y2==y1){
		if(m2<m1){
			return true ;	
		}else if(m2==m1){
			if(d2<=d1){
				return true ;
			}else{
				return false ;
			}
		}else{
			return false ;
		}
	}else{
		return false ;
	}
}


function checkSex(sex,rowid){
	var gender = document.getElementById("gender_"+rowid);//性别
	if(sex%2==0){
		gender.value="女";
	}else{
		gender.value="男";
	}
}
	
// 15 位身份证验证
function checkFifTeen(num,rowid){
	var card = document.getElementById("identitynumber_"+rowid);//身份证
	var gender = document.getElementById("gender_"+rowid);//性别
	
	re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);  
	var arrSplit = num.match(re);  //检查生日日期是否正确
	var yearOfCard = Number(arrSplit[2]);//获取身份证的年份
	var monthOfCard = Number(arrSplit[3]);//获取身份证的月份
	var dayOfCard = Number(arrSplit[4]);//获取身份证的日期
			
	var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
	
	bGoodDay = (dtmBirth.getYear()==yearOfCard)&&((dtmBirth.getMonth()+1)==monthOfCard)&&(dtmBirth.getDate()==dayOfCard);
	if (!bGoodDay) {          
		alert("身份证号码非法，请检查确认；如无法获取可以填写[无身份证]，事后通过[重新修改人员信息]环节补充");
	    return false;  
	} else { //将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。         
		var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);          
		var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');       
		var nTemp = 0, i ,valnum;             
		num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
		for(i = 0; i < 17; i ++) {
		    nTemp += num.substr(i, 1) * arrInt[i];
		}  
		
		num += arrCh[nTemp % 11];  
		valnum = arrCh[nTemp % 11];
		if(valnum!=num.substr(17,1)){
			alert("检验码不正确");
			return false ;
		}
		var sex = num.substr(16,1);
		checkSex(sex,rowid);
        if(monthOfCard<10)monthOfCard="0"+monthOfCard ;
        if(dayOfCard<10)dayOfCard="0"+dayOfCard ;
		birthday.value='19'+yearOfCard+monthOfCard+dayOfCard;
	    return true;  
	} 
}
	
// 18位身份证 验证
function checkEightTeen(num,rowid){
	var card = document.getElementById("identitynumber_"+rowid);//身份证
	var birthday = document.getElementById("birth_"+rowid);//出生年月
	var gender = document.getElementById("gender_"+rowid);//性别
	
	re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);  
	var arrSplit = num.match(re);  //检查生日日期是否正确  
	var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
	var bGoodDay;
	
	var now = new Date();
    var yearOfNow = now.getFullYear();//获取当前的年份
    var monthOfNow = now.getMonth()+1;//获取当前证的年份
    var dayOfNow=now.getDate();//获取当前的日期
	
	
	var yearOfCard = Number(arrSplit[2]);//获取身份证的年份
	var monthOfCard = Number(arrSplit[3]);//获取身份证的月份
	var dayOfCard = Number(arrSplit[4]);//获取身份证的日期
	
	
	bGoodDay=(dtmBirth.getFullYear()==yearOfCard) && ((dtmBirth.getMonth() + 1)==monthOfCard) && (dtmBirth.getDate()==dayOfCard);
	if (!bGoodDay) {  
		alert("身份证号码非法，请检查确认；如无法获取可以填写[无身份证]，事后通过[重新修改人员信息]环节补充");
	    return false;  
	}else { //检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。  
	    var reg = checkDate(yearOfNow,monthOfNow,dayOfNow,yearOfCard,monthOfCard,dayOfCard);
	    if(reg){
	    	   var valnum;  
			   var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);  
			   var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');  
			   var nTemp = 0, i;  
			   for(i = 0; i < 17; i ++) {  
			       nTemp += num.substr(i, 1) * arrInt[i];
			   }  
			   valnum = arrCh[nTemp % 11];  
			   if (valnum != num.substr(17, 1)) {
			   	    alert("身份证的验证码不正确");
			        return false;  
			   }
			   var sex = num.substr(16,1);
			   checkSex(sex,rowid);
			   if(monthOfCard<10)monthOfCard="0"+monthOfCard ;
			   if(dayOfCard<10)dayOfCard="0"+dayOfCard ;

		       birthday.value=''+yearOfCard+monthOfCard+dayOfCard;
			   return true;
	     }else{
	     	alert("身份证上的日期大于当前日期");
			return false ;
	     }
    }
}
	

function checkMobile(opt){
   var number=$("#telnum").val();
  // var number = opt.value;
   var len = number.length;
   var partten = "/^1[3,5,8]\d{9}$/";
   if(len==11){
	     
	   if(!(partten.test(number)))
	   {
	        alert("您输入的不是手机号码");
	        return false;
	   }
	} else{
     
      alert("您输入的手机号码不是11位的");
      //opt.value="";
      return false;
   }

}

 </script>
 
  </body>
  
</html>
