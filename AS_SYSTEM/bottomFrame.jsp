<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<%@page import="java.util.Map"%>
<%@include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@page import="com.szk.framework.pub.sys.UTILSysProperty"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script src="${pageContext.request.contextPath}/js/waitingDemo.js" type="text/javascript" charset="GBK"></script>
<title></title>

<style>
body {
	 font-size: 12px;
	 margin: 0px;
	 padding: 0px;
	 color:#333333;
}

a:link{/*链接效果*/
	color: red;/*blue;*/
	text-decoration: none;
}
a:visited{
    text-decoration: none;
    color: red;/*blue;*/
}
a:hover{
	color: red;/*#0000ff;*/
	text-decoration: none;
	position: relative;
	left: 1px;
	top: 1px;
}
</style>


</head>
<%
	
	String sysCo = "" ;
	String sysC2 = "" ;
	String sysCn = "" ;
	
	String qqNum = UTILSysProperty.getProp("在线客服QQ") ;
	
	if(qqNum == null || "".equals(qqNum)) {
		qqNum = "253877967" ;
	}
%>
<body onload="doStart();setTimeout('isDogUser()', 10000);">

	<bgsound id="bgs" src="" loop="1">

	<input name="loginDogInfo" value="${clientDogInfo }" type="hidden" >
	<input name="statu" id="statu" value="close" type="hidden" >
	<input name="serverDogSysCo" id="serverDogSysCo" type="hidden" value="<%=sysCo %>">
	<input name="serverDogSysC2" id="serverDogSysC2" type="hidden" value="<%=sysC2 %>">
	<input name="serverDogSysCn" id="serverDogSysCn" type="hidden" value="<%=sysCn %>">
	<table width="100%" cellpadding="0" cellspacing="1" bgcolor="#dfe8f6">
		<tr>
			<td id="message" height="20" align="center" bgcolor="#dfe8f6">

			</td>
			
			<td id="userInfo" height="20" align="center" bgcolor="#dfe8f6" style=" font-size: 12px;"></td>

			<td class="nav" width="50" bgcolor="#dfe8f6" align="center">
			<img src="${pageContext.request.contextPath}/img/gonggao.gif" onclick="showMessage();addMessageTab();" id="gonggao" >
			</td>
  		</tr>
	</table>


<script type="text/javascript">


function goAdEd() {
	parent.frames["MiddleFrame"].frames["leftFrame"].location="${pageContext.request.contextPath}/AS_SYSTEM/getExtraMenu.jsp?flag=selfDefine";
    //window.location = "${pageContext.request.contextPath}/?method=getMenu";
     //alert(this.parent.MiddleFrame.leftFrame.location);
    this.parent.MiddleFrame.bar.on();
}

function goProject() {
    window.open("${pageContext.request.contextPath}/project/projectList.jsp?nav=1",null);
}

function goQQ(){
	var callQQBtn = document.getElementById("callQQBtn");
	var btnValue_CALLING = '连接中...';
	var btnValue_OK = '在线客服';
	var callQQXmlHTTP;
	var url = "http://wpa.qq.com/msgrd?V=1&uin=<%=qqNum%>";

	try{
		var result=oframe.CanInternet(url);

		// 0: 未知错误; 1: 未安装 QQ; 2: 不能连接互联网; 3: QQ 在线; 4: QQ 不在线
		if (result==0){
			alert('未知错误');
		}else if (result==1){
			alert('远程客服需要腾讯QQ软件支持，请先安装QQ！');
		}else {
			if (result==4){
				alert('您好，铭太客服人员暂时不在，请您先在qq中留言!');
			}
			window.open(url);
		}
	}catch(e){
	}

	/*
	var url2 = "/AuditSystem/AS_SYSTEM/Version.jsp";

	try {
		callQQXmlHTTP = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			callQQXmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e2) {
			callQQXmlHTTP = false;
		}
	}

	callQQXmlHTTP.open("POST",url2,true);

	callQQXmlHTTP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	callQQXmlHTTP.onreadystatechange = function(){
		if (callQQXmlHTTP.readyState==1) {
			callQQBtn.value = btnValue_CALLING;
			callQQBtn.disabled = true;
		}

		if (callQQXmlHTTP.readyState==4) {
			if(callQQXmlHTTP.status == 200) {
				callQQBtn.value=btnValue_OK;
				callQQBtn.disabled = false;

				window.open(url);
			} else {
				alert("对不起,网络没有连通,请检查本地网络...");
			}
		}
	}

	callQQXmlHTTP.send(null);
	*/
}

//供其他网页调用控件打开新窗口的函数
function myOpenUrl(t){
	try{
		if (t){
			if (oframe){
				oframe.OpenURLEx(t);
			}else{
				window.open(t);
			}
		}
	}catch(e){
		window.open(t);
	}
}



var oMarquee = document.getElementById("mq"); 	//滚动对象
var iLineHeight = 28; 							//单行高度，像素
var iLineCount = 0; 							//实际行数
var iScrollAmount = 1; 							//每次滚动高度，像素
var count=1;
var count1=0;
var iLineCount1=0;
var timeout=0;
var flyingwin=0;
//-------------------------------------------
// 滚动条
//-------------------------------------------
function run() {

	oMarquee.scrollTop += iScrollAmount;
	if ( oMarquee.scrollTop == iLineCount * iLineHeight )
		oMarquee.scrollTop = 0;
	if ( oMarquee.scrollTop % iLineHeight == 0 ) {
		window.setTimeout( "run()", 2500 );
	} else {
		window.setTimeout( "run()", 50 );
	}
}

//-------------------------------------------
// 喇叭闪动
//-------------------------------------------
function Scintillation() {
	if( count1 % 2 == 0){
		document.getElementById("gonggao").src="${pageContext.request.contextPath}/img/gonggao.gif";
		count1++;
	}else{
		document.getElementById("gonggao").src="${pageContext.request.contextPath}/img/gonggao1.gif";
		count1++;
	}

	timeout=setTimeout("Scintillation()", 500);
}

//-------------------------------------------
// 在 Microsoft 浏览器上创建 XMLHttpRequest 对象
//-------------------------------------------
function createXmlHttp() {
	try {
		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e2) {
			xmlHttp = false;
		}
	}
}


//-----------------
//判断用户是否有狗
//-----------------
var bHasAlerted=false;
function isDogUser() {
	//设置180秒的刷新间隔
	setTimeout("isDogUser()", 30000);
	var loginDogInfo = document.getElementById("loginDogInfo").value;

	

	//检查用户IE状态
	if (!window.navigator.onLine){
		if (bHasAlerted==false){
			bHasAlerted=true;
			var bHaveError=false;
			try{
				if (oframe){
					oframe.SetGlobalOffline(0);

  					//oframe.RefreshAllIE();            // 刷新所有IE内核的窗口
				}
				//alert("您的IE已被设成\"脱机工作\",这可能是由于您拔掉网线造成的，系统已经自动将访问本系统的IE恢复成了连线工作！");
			}catch(e){
				//alert("您的IE已被设成\"脱机工作\",这可能是由于您拔掉网线造成的，请去掉IE菜单栏中\"文件(F)\"->\"脱机工作(W)\"前的钩后再点击登录! ");
			}
		}
	}
}

//-----------------
//启动定时刷新的方法
//-----------------
function doStart() {
	createXmlHttp();
	var url = "${pageContext.request.contextPath}/info.do?method=user&random=" + Math.random();
	xmlHttp.open("GET", url , true);
	xmlHttp.onreadystatechange = updatePage;
	xmlHttp.send(null);
}

//----------------
//检查状态并返回结果
//----------------
function updatePage() {
	if(xmlHttp.readyState == 4) {
		if(xmlHttp.status == 200) {


			if(document.getElementById("statu").value!="exitSystem"){
				setTimeout("doStart()", 6000);
			}

			result = unescape(xmlHttp.responseText);

			//alert(result);

			if(result.indexOf("|||") > -1) {
				var strResult = result.split("|||");

				iLineCount = strResult[0].split("<br /><br />").length;

				if(strResult[0].indexOf('无新消息<br /><br />无新消息<br /><br />') >= 0) {
					document.getElementById("bgs").src="";
					clearTimeout(timeout);
					document.getElementById("gonggao").src="${pageContext.request.contextPath}/img/gonggao.gif"

				} else {
					if(iLineCount1 != iLineCount){
						clearTimeout(timeout);
						Scintillation();

						setTimeout("document.getElementById('bgs').src='bg.wav';", 5000);
						document.getElementById("bgs").src="";
						showMessage();
						count++;
					}
				}

				iLineCount1 = iLineCount;
				userInfo.innerHTML = strResult[1];

			} else {

				try{
					document.getElementById('statu').value="exitSystem";
					parent.topLogoFrame.myexitSystemAsk=0;
				}catch(e){}

				if(document.getElementById("statu").value!="exitSystem"){
			 		alert("因为服务器重启,本次登陆已经失效,请重新登陆!");
			 	}

				window.location = "${pageContext.request.contextPath}/login.do?method=list";

			}

		}
	}
}

//-------------------------
//刷新狗的信息
//-------------------------
function getDogInfo() {
	xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	xmlHttp.open("POST","${pageContext.request.contextPath}/info.do?method=dog&random=" + Math.random(),false);
	xmlHttp.send();
	var strResult = unescape(xmlHttp.responseText);

	//alert(strResult);

	if(strResult.indexOf('ok') < 0) {
		alert(strResult);
	} else {
		//alert("更新加密狗成功!!");	//去掉空格

		try {
			window.parent.topMenuFrame.location.reload();
		} catch(e) {

		}
	}

	window.location.reload();
}

//-------------------------
//消息提示
//-------------------------

var flyingwin;
function showMessage(){
	parent.messageWinFun(); 
}

function addMessageTab() {
	
	var url = "${pageContext.request.contextPath}/message.do?method=placardView";
	openTab("tt_"+Math.random(),'系统公告',url,parent);
	return;

}

function movewindow() {
 if(flyingwin!=null){
		flyingwin.close();
	}
}

//---------------------
//
//---------------------
function show(){
	window.open("${pageContext.request.contextPath}/message.do?method=placardView");
	if(flyingwin!=null){
		flyingwin.close();
	}
}


function exitSystem() {
	try{
		document.getElementById('statu').value="exitSystem";
		parent.topLogoFrame.myexitSystemAsk=0;
	}catch(e){}
	
	top.location = "${pageContext.request.contextPath}/common.do?method=exitSystem";
}

</script>


</body>
</html>