<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta> 
<title>案件任务信息表</title>
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
        height:40,
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
		columns:4,
		width:320,
		items:[   
		       {
	            text: '确认完成',
	            icon:'${pageContext.request.contextPath}/css/theme/default/btn/save.png' ,
	            scale: 'medium',
	            handler:function(){
           		    if($("input[name='taskconfig']:checked").val()!=null){
           		    	saveFormDiv("confirm");
                    }else{
                    	alert('请选择案件要确认的案件任务!');
        		            return;
                    } 	
				}
			},
			{
            text: '退回任务',
            icon:'${pageContext.request.contextPath}/css/theme/default/btn/close.png' ,
            scale: 'medium',
            handler:function(){

            if($("input[name='taskconfig']:checked").val()!=null){
            	summitFormDiv();
            }else{
            	 alert('请选择案件要退回的案件任务!');
		            return;
            } 
     		       
			}
		},{
            
            text: '保存',
            icon:'${pageContext.request.contextPath}/css/theme/default/btn/save.png' ,
            scale: 'medium',
            handler:function(){
      			 saveFormDiv("save"); 

			 }
		 },{
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


function saveFormDiv(savestate){
	
	if (!formSubmitCheck('thisForm')) {
		
		return;
	}
	
	//保存
	var url = "${pageContext.request.contextPath}/case.do?method=sumcaseTaskSave&savestate="+savestate;
	thisForm.action = url;
	thisForm.submit();
	
}

//退回给民警
function summitFormDiv(){
	
	if (!formSubmitCheck('thisForm')) {
		return;
	}
	
	//保存
	var url = "${pageContext.request.contextPath}/case.do?method=sumcaseTaskSave&summit=TH ";
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
					<span class="title">案件任务信息表</span>
					
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
		<input type="hidden" id="caseid" name="caseid"  value="${case.uuid}"> 
	
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
							<input style="width: 160px; height: 24px" id="casenature"  name="casenature"  maxLength=100  type="text" valuemustexist=true  type="text"  autoid="700"  refer="案件性质"   value = "${case.casenature}"  /></td>
						<td>
							<label for="casetype">案件类别：</label>
						</td>
						<td>
							<input style="width: 98%; height: 24px"  id="casetype" name="casetype" maxLength=100  type="text"  value = "${case.casetype}"  /></td>
						<td>
							<label for="state">案件状态：</label>
						</td>
						<td>
							<input style="width: 160px; height: 24px" id="casestate"  name="casestate" maxLength=100  type="text" valuemustexist=true  type="text"  autoid="700"  refer="案件状态"  value = "${case.state}" noinput=true />
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
						<th class="form_title_th" colspan="6">
							<div class="form_title_div">
								&nbsp;</div>
							<span class="form_title_span1">办案任务</span></th>
					</tr>
					<tr>
						<td colspan="6">
							<table style='text-align:center ;' align='center' cellspacing='1' cellpadding='3' border='0' class='listTable'  id = 'ga_case_task_table'> 
								<caption>办案任务明细记录</caption> 
								<tr>
									<th align='center' >
										<!--<img style='cursor:hand;' alt='添加' onclick="getDealWin();" src='${pageContext.request.contextPath}/img/menu/casetask/addTask.png'>-->
										<img style='cursor:hand;' alt='添加' onclick="table_add('');" src='${pageContext.request.contextPath}/tws/gbag/img/casetask/addTask.png'>
										<!--<input  type="button" onclick="getDealWin();" style="cursor:hand; height: 24px; width: 135px;color:green" value="点击添加"/>-->
									</th>
									<!-- <th><input style=" width: 135px; height: 30px;bgbackground:green; border:   blue   1px   solid; color:blue" type="button" onclick="getDealWin();" value="添加任务" />
									</th> -->
									<th rowspan=1 colspan=1  align='center' style='width: 5%'>选择</th>
									<th rowspan=1 colspan=1  align='center' style='width: 22%'>任务内容 </th>
									<!-- <th rowspan=1 colspan=1  align='center' style='width: 20%'>成果要求</th> -->
									
									<th rowspan=1 colspan=1  align='center' style='width: 20%'>处理结果</th>
									<th rowspan=1 colspan=1  align='center' style='width: 8%'>办理人</th>
									<th rowspan=1 colspan=1  align='center' style='width: 15%'>办理时间</th>
									<th rowspan=1 colspan=1  align='center' style='width: 10%'>是否有材料</th>
									<th rowspan=1 colspan=1  align='center' style='width: 10%'>任务状态</th>
									<!--<c:if test="${flag ne 'police'}">
									<th rowspan=1 colspan=1  align='center' style='width: 10%'>任务确认</th>
									</c:if>-->
								</tr>
								<tbody id = 'ga_case_task' >		
									<c:forEach items="${caseTasks}" var="field" varStatus="rows" >
									<tr id="ga_case_task_row${rows.index}">
										<td>
											<c:if test="${flag eq 'policeLeader'}">
											<img style='cursor:hand; <c:if test="${field.state eq ('4')||field.state eq ('3')}">display:none</c:if>' alt='点击删除'  onclick="table_delete('ga_case_task_row${rows.index}');" src='${pageContext.request.contextPath}/img/menu/delete.png' >
											<!--<input <c:if test="${field.state eq ('4')}">type="hidden"</c:if> <c:if test="${field.state eq ('3')}">type="button"</c:if> onclick="table_delete('ga_case_task_row${rows.index}');"  value="点击删除"/>  -->
											</c:if>
											<input type="hidden" id="uuid_row${rows.index}" name="uuid"  value="${field.uuid}">
										</td>
									    <td>
											<input  style="height: 24px; width: 80px" id="taskconfig_row${rows.index}" name="taskconfig"  maxLength=50  type="checkbox" value="${field.uuid}"/>
										</td>
										<%-- <td>
											<textarea class="required" onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 240px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="taskcontent_row${rows.index}" name="taskcontent" maxLength=500 <c:if test="${field.state eq ('4')}">readOnly</c:if> >${field.taskcontent}</textarea>
										</td> --%>
										<td>
											<input class="required" style="height: 24px; width: 180px" id="taskcontent_row${rows.index}" name="taskcontent"  maxLength=100 type="text" valuemustexist=true 
											autoid="js:BasicDicImpl"  refer="任务内容"     value = "${field.taskcontent}" checkinput="false" <c:if test="${field.state eq ('3')||field.state eq ('4')}">readOnly</c:if> />
										</td>
																						
									    <%--<td>
											<textarea  onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 135px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="istakedown_row${rows.index}" name="istakedown" maxLength=500 <c:if test="${field.state eq ('4')}">readOnly</c:if> >${field.istakedown}</textarea>
										</td> --%>
											
										<td>
											<textarea  onscroll="this.rows++;" style="overflow-y:visible; height: 24px; width: 180px" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id="taskresult_row${rows.index}" name="taskresult" maxLength=500 <c:if test="${field.state eq ('4')}">readOnly</c:if> >${field.taskresult}</textarea>
										</td>	
										<td>
											<input class="required" style="height: 24px; width: 80px" id="handleperson_row${rows.index}" name="handleperson"  maxLength=100  type="text"  value = "${field.handleperson}"  readOnly/>
										</td>
										<td>
											<input class="required" style="height: 24px; width: 160px" id="handletime_row${rows.index}" name="handletime"  maxLength=100  type="text"  value = "${field.handletime}"  readOnly/>
										</td>
										<td>
											<input  style="height: 24px; width: 80px" id="ispaper_row${rows.index}" name="ispaper"  maxLength=100 type="text" valuemustexist=true autoid="js:BasicDicImpl"  refer="材料显示状态"  <c:if test="${field.state eq ('3')||field.state eq ('4')}">readOnly</c:if>  noinput="true"  value = "${field.ispaper}"/>
										</td>	
										<!--<c:if test="${flag eq 'police'}">
										<td>
											<input class="required" style="width: 160px; height: 24px" id="state_row${rows.index}"  name="state" maxLength=100  type="text" valuemustexist=true  type="text"  autoid="700"  refer="任务编制状态"  <c:if test="${flag ne 'police'}">readonly</c:if> value = "${field.state}" noinput=true />
										</td>
										</c:if>	-->
										
										<td>
											<input class="required" style="width: 135px; height: 24px" id="state_row${rows.index}"  name="state" maxLength=100  type="text" valuemustexist=true  type="text"  autoid="js:BasicDicImpl"  refer="任务显示状态"  readonly  value = "${field.state}" noinput=true />
										</td>
									
										<!--<c:if test="${flag ne 'police'}">									
										<td>
											<input style="width: 160px; height: 24px" id="state1_row${rows.index}"  name="state1" maxLength=100  type="text" valuemustexist=true  type="text"  autoid="700"  refer="任务确认状态"  value = "${field.state1}" noinput=true />
										</td>										
										</c:if>-->									
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

<div id="dealDiv" style="display:none">
	<form name="selectFrom" method="post" action="" id="selectForm" >
		 <table align="center" border="0" >
			<c:forEach var="user" items="${list}" varStatus="status">
			   <c:if test="${status.index%8==0}">
			   		<tr>
			   </c:if>
			   <c:if test="${status.index%8==0}">
			      </tr>
			   </c:if>
			   <td style="width:160px;">
			   		<input id="seluserId" name="seluserId" type="checkbox" value="${user.uuid}" />
			   		<span id="span_${user.uuid}">${user.task}</span>
			   </td> 

			 </c:forEach>   
			                                                           
		 </table>	 
	 </form>
	<div style=" position:absolute; bottom:35;left:6;color:red"><label>如需添加空白任务请直接点击确定</label></div>
</div>

<script type="text/javascript">

function table_add(obj){
	
	var items=obj.split(",");
	for(var index=0;index<items.length;index++){
		var item=items[index];
		
	    var curRowId="row0";
		var lastTrId=$("#ga_case_task tr:last").attr("id");
		if(lastTrId){
			var rowId = lastTrId.substring(lastTrId.lastIndexOf('_') + 1);
			curRowId=parseInt(rowId.replace("row",""))+1;
			curRowId="row"+parseInt(rowId.replace("row",""))+1;
		}
		
		var html="";
		html=html+"<tr id=\"ga_case_task_"+curRowId+"\">";
		html=html+"<td>";
		html=html+"<img style='cursor:hand;' alt='点击删除' onclick=\"table_delete('ga_case_task_"+curRowId+"');\" src='${pageContext.request.contextPath}/img/menu/delete.png' >";
		html=html+"	<input type=\"hidden\" id=\"uuid_"+curRowId+"\" name=\"uuid\"  value=\"\">";
		html=html+"</td>";
 		html=html+"<td>";
		html=html+"<input  style=\"height: 24px; width: 80px\" id=\"taskconfig_"+curRowId+"\" name=\"taskconfig\"  maxLength=50  type=\"checkbox\"/>";
		html=html+"</td>";
		/* html=html+"<td>";
		html=html+"	<textarea class=\"required\" onscroll=\"this.rows++;\" style=\"overflow-y:visible; height: 24px; width: 180px\" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id=\"taskcontent_"+curRowId+"\" name=\"taskcontent\" maxLength=500 >"+item+"</textarea>";
		html=html+"</td>"; */
		html=html+"<td>";
		html=html+"<input class=\"required\" style=\"width: 180px; height: 24px\" id=\"taskcontent_"+curRowId+"\"  name=\"taskcontent\" maxLength=100 checkinput=false  valuemustexist=true  type=\"text\"  autoid=\"700\"  refer=\"任务内容\" />";
		html=html+"</td>";
		/* html=html+"<td>";
		html=html+"	<textarea  onscroll=\"this.rows++;\" style=\"overflow-y:visible; height: 24px; width: 135px\" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id=\"istakedown_"+curRowId+"\" name=\"istakedown\" maxLength=500 ></textarea>";
		html=html+"</td>";	 */
		html=html+"<td>";
		html=html+"	<textarea  onscroll=\"this.rows++;\" style=\"overflow-y:visible; height: 24px; width: 180px\" onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  id=\"taskresult_"+curRowId+"\" name=\"taskresult\" maxLength=500 ></textarea>";
		html=html+"</td>";	
		html=html+"<td>";
		html=html+"	<input class=\"required\" style=\"height: 24px; width: 80px\" id=\"handleperson_"+curRowId+"\" name=\"handleperson\"  maxLength=100  type=\"text\"  value = \"${applyUser.name}\"  />";
		html=html+"</td>";
		html=html+"<td>";
		html=html+"	<input class=\"required\" style=\"height: 24px; width: 160px\" id=\"handletime_"+curRowId+"\" name=\"handletime\"  maxLength=100  type=\"text\"  value = \"${curDateTime}\"  />";
		html=html+"</td>";
		html=html+"<td>";
		html=html+"<input  style=\"height: 24px; width: 80px\" id=\"ispaper_"+curRowId+"\" name=\"ispaper\"  maxLength=100 valuemustexist=true  type=\"text\"  autoid=\"js:BasicDicImpl\"  refer=\"材料显示状态\"  value = \"1\"  noinput=true/>";
		html=html+"</td>";
		html=html+"<td>";
		html=html+"<input class=\"required\" style=\"width: 135px; height: 24px\" id=\"state_"+curRowId+"\"  name=\"state\" maxLength=100   valuemustexist=true  type=\"text\"  autoid=\"js:BasicDicImpl\"  refer=\"任务显示状态\"  value = \"0\" readOnly noinput=true/>";
		html=html+"</td>";
		
		html=html+"</tr>";	
		
		$("#ga_case_task").append(html);
		
		initCombox("ispaper_"+curRowId);
		initCombox("state_"+curRowId);
		initCombox("taskcontent_"+curRowId);
	}
	
	layout.doLayout();
}

function table_delete(obj){
	$("#"+obj).remove();
}

var setDealWin;
function getDealWin(){
	
	$("#dealDiv").css("display","");
	
	if(!setDealWin) { 
		setDealWin = new Ext.Window({
			id:'setDealWin',
	     	width: 600,
	     	height:220,
	     	title:'选择任务',
	     	closable:true,
        	closeAction:'hide',
        	contentEl:'dealDiv',
			modal:true,
       	    listeners : {
	         	'hide':{
	         		fn: function () {	         			
	         			setDealWin.hide();
					}
				}
	        },
        	layout:'fit',
			buttons:[{
	            text: '确定',
	            icon: contextPath + btn_img_url + 'check.png',
	            handler:function(){
	 
	            	try{	
	            		var showName = "";
	            		var hideUserId = ""; 

	            		$.each($("input[name='seluserId']:checked"),function(i,n){
	            			 var curUserid=$(n).attr("value");
	            			 if(hideUserId==""){
	            				 hideUserId=curUserid;
	            				 showName=$("#span_"+curUserid).text();
	            			 }else{
	            				 hideUserId=hideUserId+"," +curUserid;
	            				 showName=showName+"," +$("#span_"+curUserid).text();
	            			 }
	                    });
	            		table_add(showName);
	            		
	            	}catch(e){}
	            	
	            	setDealWin.hide();
	            }
	        },
	        {
	             text:"关闭",
	             icon: contextPath + btn_img_url + 'close.png',
	             handler:function(){
	            	 setDealWin.hide();
	             }
	        }]
	    });
    } 
	
	setDealWin.show(); 	
}
</script>

</body>  
</html>  