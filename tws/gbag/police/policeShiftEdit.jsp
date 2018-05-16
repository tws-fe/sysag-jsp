<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>文件目录</title>

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
				saveForm("");
			}  
		},'-',{
			text:'返回',
			cls:'x-btn-text-icon',
			icon:contextPath + btn_img_url + 'back.png',
			handler:function(){
				var url = MATECH_SYSTEM_WEB_ROOT + "/police.do?method=policeShiftList&flag=all";
				window.location = url;	
			}  
		},'-',{
			text:'关闭',
			cls:'x-btn-text-icon',
			icon:contextPath + btn_img_url + 'close.png',
			handler:function(){
				closeTab(parent.tab);
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
function saveForm(flag){

	if (!formSubmitCheck('thisForm')) return;

	// 等待页面
	showWaiting();
	document.thisForm.action="police.do?method=policeShiftSave&flag=" + flag;	
	document.thisForm.submit();
	stopWaiting();
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
	<input type="hidden" name="editType" id="editType" value="${editType}">
	<input type="hidden" name="userid" id="userid" value="${userid}">
	<table  cellpadding="8" cellspacing="0" align="center" class="data_tb" >
	<tr>
		<th class="x-panel-header" colspan="100" style="text-align: center;">探案组人员设置</th>
	</tr>
	<tr>
		<td class="data_tb_alignright"  width="40%" align="right"><span class="mustSpan">探案组名称：</span></td>
		<td class="data_tb_content" colspan="3" >
			<input name="shiftname" type="text" id="shiftname"  maxlength="20" 
			value="${shift.shiftname}" size="25" class="required" title="请输入，不得为空">
		</td>
	</tr>
	<tr>	
		<td class="data_tb_alignright"  width="40%" align="right"><span class="mustSpan">探长：</span></td>
		<td class="data_tb_content" colspan="3" >
			<input type="text" id="user_leader" name="user_leader"  size=25 autoid="js:gbag.AuditdirectorType" class="required" value="${shift.user_leader}">
		</td>	
	</tr>
	<tr>	
		<td class="data_tb_alignright"  width="40%" align="right"><span class="mustSpan">组员：</span></td>
		<td class="data_tb_content" colspan="3" >
			<input type="text" id="user_name" name="user_name"  size=25 readonly="readonly" value="${shift.user_name}" >
			<input type="hidden" id="userid" name="userid"  value="${shift.userid}"> 
			<input onclicK="getDealWin()" style="width: 100px" type="button" value="选班组成员" />
		</td>	
	</tr>	
	</table>
<br><br><br>

</form>
</div>


<div id="dealDiv" style="display:none">
	<form name="selectFrom" method="post" action="" id="selectForm" >
		 <table>	 
			<c:forEach var="user" items="${list}" varStatus="status">
			   <c:if test="${status.index%10==0}">
			      <tr>
			   </c:if>
			   <c:if test="${status.index%10==0}">
			      </tr>
			   </c:if>
			   <td style="width:130px;">
			   		<!--  <input id="seluserId" name="seluserId" type="checkbox" value="${user.id}" <c:if test="${user.ischecked ne '0'}">checked="checked"</c:if>/>-->
			   		<input id="seluserId" name="seluserId" type="checkbox" <c:if test="${fn:contains(shift.user_name,user.name)}">checked="checked"</c:if> value="${user.id}" />
			   		<span id="span_${user.id}">${user.name}</span>
			   </td>
			 </c:forEach>                                                             
		 </table>	 
	 </form>
	
</div>

</body>
<script type="text/javascript">


//开始处理
var setDealWin;
function getDealWin(){
	
	if(!setDealWin) { 
		setDealWin = new Ext.Window({
			id:'setDealWin',
	     	width: 800,
	     	height:400,
	     	autoScroll:true,
	     	title:'组别人员',
	     	closable:true,
        	closeAction:'hide',
        	contentEl:'dealDiv',
			modal:true,
       	    listeners : {
	         	'hide':{
	         		fn: function () {	         			
	         			setDealWin.hide();
					}
				},'show':{
	         		fn: function () {
	         		$("#dealDiv").removeAttr("style");//去掉div隐藏的属性
	         
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
	            		
	            		$("#userid").val(hideUserId);
	            		$("#user_name").val(showName);
	            		
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
</html>