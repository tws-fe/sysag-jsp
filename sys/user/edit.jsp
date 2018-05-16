<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<style type="text/css">
	.x-panel-body{border:0px;}
</style>

<script type="text/javascript">

var _tbar;
var mypanel;

function ext_init(){
	//工具栏
	_tbar=new Ext.Toolbar({
		height:30,
		items:[
			{ 
				id:'btn-1',
				text:'保存',
				icon:'${ctx}/tws/css/img/save.gif',
				handler:function(){
					save();
				}
			},'-',{
				text:'返回',
				icon:'${ctx}/tws/css/img/back.gif',
				handler:function(){
					window.location="${ctx}/userNew.do?method=list&unitId=${unitId}";
				}
			}
		]	
	});
	
	mypanel = new Ext.Panel({
        id: 'contentPanel',
        region:'center',
        width:document.body.clientWidth,
        height:document.body.clientHeight,
        tbar:_tbar,
        autoScroll:true,
        items:[{contentEl: "tab1",id:"p1",title:"基础信息"}]
        });
	
	
 	var layout = new Ext.Viewport({
		layout:'border',
		items:[{
				region:'center',
	    		id:'center-panel',
	    		margins:'0 0 0 0',
	    		layout:'border',
	    		lines:true,
	    		items:[mypanel]
			}
		 ]
	});
 	layout.doLayout();
}

Ext.onReady(ext_init);

</script>
</head>
<body>

<div id="tab1">
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/userNew.do?method=save" class="autoHeightExtForm">
		<table border="0" cellspacing="0" class="editTable">
			<tr>
				<td class="editTitle"  colspan="2">部门管理</td>
			</tr>
			
			<tr>
				<th>用户姓名：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="text" name="name" id="name"  value="${user.name}" >
				</td>
			</tr>
			<tr>
				<th >用户简称：</th>
				<td >
					<input size="50" type="text" name="specialty" id="specialty"  value="${user.specialty}" >
				</td>
			</tr>										
			<tr>
				<th >登录名：<span class="mustSpan">[*]</span></th>
				<td >
					<input size="50" type="text" name="loginid" id="loginid"  value="${user.loginid}" class="required alphanum-wheninputed ajaxvalidate" validateId="js:user.UserLoginIDExists" validRefer="${user.id}">
				</td>
			</tr>
			<tr>
				<th >登录密码：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="password" name="password" id="password" onfocus="clearPwd()" value="${user.password}" >
				</td>
			</tr>	
			<tr>
				<th >性别：<span class="mustSpan">[*]</span></th>
				<td >
				    <input type="radio" value="M" name="sex" id="sex" <c:if test='${user.sex eq "M"}'> checked="checked" </c:if> />男
				    <input type="radio" value="F" name="sex"  id="sex1" <c:if test='${user.sex eq "F"}'> checked="checked" </c:if> />女
				</td>
			</tr>	
			<tr>
				<th >手机号码：</th>
				<td >
					<input size="50" type="text" name="mobilephone" id="mobilephone"  value="${user.mobilephone}" >
				</td>
			</tr>	
			<tr>
				<th >权限角色:<span class="mustSpan">[*]</span></th>
				<td >
				  <input class="required" autoid="js:sys.user.UserRolesSelect" listWidth="600" id="roleId" name="roleId" size="50" value="${userRole}" multiselect=true listWidth="320" />
				</td>
			</tr>										
			<tr>
				<th >所属单位:<span class="mustSpan">[*]</span></th>
				<td >
				  <input class="required" autoid="js:sys.unit.BasicCtlUnitImpl" listWidth="600" id="departid" name="departid" size="50" value="${user.departid}" multilevel=true listWidth="320" loadAll="false" readOnly/>
				</td>
			</tr>
			<tr>
				<th >所属部门:<span class="mustSpan">[*]</span></th>
				<td >
				  <input class="required" autoid="js:sys.dept.DeptByUnitId" listWidth="600" id="departmentid" name="departmentid" size="50" value="${user.departmentid}" multilevel=true listWidth="320" loadAll="false" refer="departid"/>
				</td>
			</tr>
			<c:if test="${editType ne 'add'}">	
			<tr>
				<th>指纹采集：</th>
			    <td>
					<input id="identity2" name="identity2" onclick="getFinger(1);" size="41" style="height:24px;line-height:20px;width:110px;" type="button" value="采集指纹" /> 
					<input id="clientDogSysUi"  name="clientDogSysUi"  type="hidden"  value = "${user.clientDogSysUi}"  />
					<span id="finger_span">
					<c:if test="${empty user.clientDogSysUi}">
						<span style="font-size:10px;color: red">(*未采集)</span>
					</c:if>
					<c:if test="${!empty user.clientDogSysUi}">
						<span style="font-size:10px;color: red">(*已采集)</span>
					</c:if>							
					</span>	
				</td>
		   </tr>		
		   </c:if>	
			<tr>
				<th >状态：<span class="mustSpan">[*]</span></th>
				<td >
				    <input type="radio" value="0" name="state" id="state" <c:if test='${user.state eq "0"}'> checked="checked" </c:if> />启用
				    <input type="radio" value="1" name="state"  id="state1" <c:if test='${user.state eq "1"}'> checked="checked" </c:if> />禁用
				</td>
			</tr>		   		
		</table>
		<input name="editType" id="editType" type="hidden" value="${editType}">
		<input name="unitId" id="unitId" type="hidden" value="${unitId}">
		<input name="id" id="id" type="hidden" value="${user.id}">
		<input name="password" id="password" type="hidden" value="${user.password}">
		<input name="reFinger" id="reFinger" type="hidden" value="0">
	</form>
</div>

</body>

<script type="text/javascript">
/* ========= util ========== */
function getWebOffice(){
	var webOffice=parent._WebOffice;
	if(!webOffice){
		webOffice=parent.parent._WebOffice;
		if(!webOffice){
			webOffice=parent.parent.parent._WebOffice;
			if(!webOffice){
				alert('控件环境初始化失败！');
				return null;
			}else{
				webOffice=parent.parent.parent.getWebOffice();
			}
		}else{
			webOffice=parent.parent.getWebOffice();
		}
	}else{
		webOffice=parent.getWebOffice();
	}
	
	return webOffice;
	
}

function clearPwd(){
	if(!$("#password").attr("readOnly")){
		$("#password").val("");
	};
	
}

var _fingerWin = null;
var _pPersonId = "${user.id}";
function getFinger(){
	//显示验证界面
	matech.showWaiting("100%","100%","正在进行指纹采集....");
	var webOffice = getWebOffice();	
	if(webOffice){
		var t=webOffice.funFingerReg(_pPersonId);
		if(t!=''){
			document.getElementById("clientDogSysUi").value = t;
			document.getElementById("reFinger").value ="1";
			$("#finger_span").html("<span style=\"font-size:10px;color: red\">(*已采集,请保存)</span>");
		}
	}
	matech.stopWaiting();
}

function save(){

	matech.formSummit('thisForm',"${ctx}/userNew.do?method=list&unitId=${unitId}");
	
}

</script>
</html>