<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp"%>
<%@page import="com.szk.framework.pub.sys.UTILSysProperty"%>
<%@page import="com.szk.framework.listener.UserSession"%>
<%@page import="com.szk.framework.pub.util.StringTools"%>
<%
	String title = StringTools.checkNull(UTILSysProperty.getProp("系统名称"));
	String menu_on = StringTools.checkNull(UTILSysProperty.getProp("菜单弹出方式"));
	String csalogin =  StringTools.checkNull(UTILSysProperty.getProp("启用cas单点登录控制"));
	request.setAttribute("csalogin", csalogin);
	
%>
<html>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/TabCloseMenu.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/StatusBar.js"></script>
<script type="text/javascript">
menu_on = "<%=menu_on%>" ;
var IsMaxView ="否";
var IsShowRight ="否";
</script>

<script type="text/javascript">
//缩放浏览器时自动刷新页面
window.onresize = function(){
	IsOnresize=true;
	var doc = DomUtil.init().getDocumentSize();   	
	var ulcount=$(".ul-menu-li").size();
	try{
		$("#index-head").css("width",doc.width+'px');
		$("#td-menu").css("width",(doc.width-367)+'px');
		
		var menLength=parseInt((doc.width-367)/ulcount);
		for(var index=0;index<ulcount;index++){
			$("#ul-menu-li-"+index+" .twin-cover").css("width",menLength+'px');
			$("#ul-menu-li-"+index+" .twin-cover").css("left",(menLength*index)+'px');
			$("#ul-menu-li-"+index+" .hover_cont").css("left",(menLength*index-3.5*index)+'px');				
		}
	}catch(e){}

   	minview();	
   	
	//var hei = doc.height - Ext.get('tabDiv').getTop();
	//MainIndex.tab.setHeight(hei);
	
	//解决页签条不能缩放的问题
	/*
   	tab.add({
		id : 'frameext-comp-cs',
		_menuId : '',
		title : '',
		closable : true,
		html : '<iframe id="frame5555" frameborder="0" width="100%" height="100%" src=""></iframe>'
	}).show();
	tab.remove('frameext-comp-cs');
	*/
	
}
//关闭浏览器时弹框提示
//$(window).bind('beforeunload',function(){
//    return '确定关闭浏览器吗？';
//});
</script>


<head>
	
	<title><%=title%></title>

	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/theme/default/mainFrame.css"/>
	
	<script type="text/javascript">
	
	
	ThemeUtil.loadTheme({
		theme_src : {
			'css' : [ 'mainFrame.css' ]
		}
	});
	

	</script>

</head>
<body>

	<div id="index-head" style="height: 100%; z-index: 712 ">
		<!-- 首页TOP -->
		<table id="tabtable" width="100%" border="0" cellspacing="0" cellpadding="0" style="z-index: 9999; position: relative;">

			<tr id="tr-mainmenu">
				<td id="td-logo" style="width: 167px; height: 55px;" class="logo" id="td-logo">
					<%-- <img id="logo" class="logo" style="cursor: pointer;" src="${pageContext.request.contextPath}/img/homePage/logo/logo-szk.png" onclick="MainIndex.tab.setActiveTab(0);"/> --%>
					<img id="logo" class="logo" style="cursor: pointer; height: 55px; width: 167px;" src="${pageContext.request.contextPath}/img/homePage/logo/logo.png" onclick="MainIndex.tab.setActiveTab(0);"/>
				</td>
				<td id="td-menu" >
					
					<div id="menu" style="width: 100%;">
							<!--=============================================================-->







							<!--=============================================================-->
					</div>
					
				</td>
				<td id="td-icon" >
					<ul class="ul-icon">
						<li id="li-userrole" >
							<div id="icon-userrole" class="top-icon"></div>
							
							<span>快捷方式</span>
							<div id="div-userrole">
								<span><a href="javascript:MainIndex.openTab('menuHelpDocument','帮助文档','${pageContext.request.contextPath}/tws/help/helpMain.jsp');" style="font-size:15;color:rgb(255, 255, 255)">帮助文档</a></span>
								<div><a href="javascript:MainIndex.openTab('menuOcxDownload','控件下载','${pageContext.request.contextPath}/ocx/downLoadOcx.jsp');" style="font-size:15;color:rgb(255, 255, 255)">控件下载</a></div>
								<div><a href="javascript:MainIndex.openTab('menuFileDownload','文件下载','${pageContext.request.contextPath}/tws/help/fileDownload.jsp');" style="font-size:15;color:rgb(255, 255, 255)">文件下载</a></div>
							</div>
						</li>
						<li id="li-userinfo" onclick="MainIndex.openTab('personalInfo','个人讯息维护','userNew.do?method=personEdit&flag=1');">
							<div id="icon-userinfo" class="top-icon"></div>
							
							<span>个人讯息</span>
						</li>
						<c:if test="${csalogin!='是' }">
						<li id="li-exitsystem" onclick="MainIndex.exitSystem();">
							<div id="icon-exitsystem" class="top-icon"></div>
							
							<span>离开系统</span>
						</li>
						</c:if>
					</ul>
				</td>

			</tr>
		</table>

		<div id="tabDiv" style="z-index: 0; position: relative;">
		
		</div>

	</div>

	<!-- 消息框 -->
	<div id="div-innermsg" style="position: absolute; right: 0; bottom: 20; width: 300px; height: 50px; z-index: 10024; display: none;">
	</div>
	
	<div id="hover_cont_left" class="hover_cont_wing">&nbsp;</div>
	<div id="hover_cont_right" class="hover_cont_wing">&nbsp;</div>
	

	<div id="div-info" style="width: 100%; height: 500px; z-index: 10048; position: aboslute; left:100px; top: 200px; display: none;">			
	</div>
	
	<div style="display: none">
		<object classid="CLSID:57DB8C48-E4A2-4115-9A7C-177614724BFF" codebase="KingWeb.CAB#version=1,0,0,0" height="500" id="DownLoadControl" width="1000"></object>
	</div>	
	
</body>
<script type="text/javascript">
	//获取菜单时使用
	var centerId = "${param.centerId}";
	if (!centerId) {
		centerId = "${centerId}";
	}
	
	var userName = '${userSession.userName}';
	var userRole = '${userSession.userRoleNames}';
	
	/* var userIndex = eval('([{"name":"首页","menuid":"001","power":"","parentid":"000","property":"indexdefault","act":"info.do?method=mainIndex_other","helpact":""}])'); */
    /* var userIndex = eval('(${userIndex})'); */
	var userIndex = eval('([{"lproperty":"police.do?method=myHomePage","name":"首页","menuid":"myhomepage","property":"indexdefault","act":"police.do?method=myHomePage","helpact":"","mode":"u"}])');
	
</script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/menu.css" />
<script type="text/javascript" src="${pageContext.request.contextPath}/js/itil/storage.js?version=20160420" charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/mainFrame-beta.js?version=20161121" charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/itil/msgqueue.js?version=20160420" charset="UTF-8"></script>
<script type="text/javascript">

	var mainTab;

	Ext.onReady(function() {
		MainMenu.init();
		
		MainIndex.activateUserIndex();
		
		MainIndex.feed();
		MainIndex.feedInterval = MainIndex.feedInterval || (100 * 1000);	
		MainIndex.feedTimer = setInterval(MainIndex.feed, MainIndex.feedInterval);
		
		MainIndex.feed_long();
		MainIndex.feedLongInterval = MainIndex.feedLongInterval || (5 * 60 * 1000); 
		MainIndex.feedLongTimer = setInterval(MainIndex.feed_long, MainIndex.feedLongInterval);
		
		mainTab=MainIndex.tab;
		
		EchartAdapterItil.renderToDoms();
		
		document.title= document.title + '．' + userName;
		
		var loginText="<a style='font-size:15;' href='javascript:void();'>欢迎登陆系统！${sessionScope.userSession.userDepartmentName}|${sessionScope.userSession.userName}【${sessionScope.userSession.userRoleNames}】</a>";
		
		MainIndex.index_bbar.setText(loginText);
		MainIndex.index_bbar.doLayout();
		
	});
	
	var beforeunload = function(){
		//MainIndex.exitSystem(true);
	};
	
	if (window.addEventListener){
		window.addEventListener('beforeunload', beforeunload);	
	} else {
		window.onbeforeunload = beforeunload;
	}

</script>


<!--修改密码框-->
<div id=editPwdWin style="position:absolute;left:expression((document.body.clientWidth-150)/2);top:expression(this.offsetParent.scrollTop +280); z-index: 2"></div>
<div id="editPwd" style="display:none;"></div>
<script type="text/javascript">
    var _CUR_USER="${sessionScope.userSession.userId}";
    
	var _WebOffice=true;
	function getWebOffice(){
		
		var webOffice=document.getElementById('DownLoadControl');
		
		return webOffice;
	}
	
	var refreshTimer;
	function refreshMyDealList(){
		showMyMsgInfo();
		showMyNotice();
		clearTimeout(refreshTimer);
		refreshTimer = setTimeout(refreshMyDealList, 5 * 1000);
	}
	function showMyMsgInfo(){
		
		$.ajax({
			type :"Post",
			async:true,
			url : "${pageContext.request.contextPath}/flowWork.do?method=getMsgInfo",
			data:{},
			success : function(data) {
				var resultData=unescape(data);
				resultData=Ext.util.JSON.decode(resultData);

				result=resultData[0].DATA;
				
				var msgInfo="";
				var msgId="";
				
				for(var index=0;index<result.length;index++){
					if(index==0){
						msgInfo="【"+(index+1)+"】"+result[index].content;
						msgId=result[index].uuid;
					}else{
						msgInfo=msgInfo+"<br>"+"【"+(index+1)+"】"+result[index].content;
						msgId=msgId+","+result[index].uuid;
					}
				}
				
				if(msgInfo!=""){
					Ext.MessageBox.show({
						msg: "<span style=\"font-size:16px;color: red\">"+msgInfo+"</span>",
						buttons:{"ok":"不再提醒","cancel":"关闭"},  
						fn:function(e){
							if(e=="ok"){
								$.ajax({
									type :"Post",
									async:true,
									url : "${pageContext.request.contextPath}/flowWork.do?method=setMsgStatus",
									data:{"uuid":msgId,"status":"4"},
									success : function(data) {}		
									});
								}
						},
			            width: 600,  
			            height:200,  
			            modal:false,  
			            icon:Ext.Msg.INFO,
			            closable: true
			        }); 					
				}
				
				//当前登录人
				var curUser=resultData[0].USER;
				if(_CUR_USER!=curUser.userId){
					window.location = "${pageContext.request.contextPath}/login.do?method=login&forseExit=true";
				}
			}
		});	
		
	}
function showMyNotice(){
		
		$.ajax({
			type :"Post",
			async:true,
			url : "${pageContext.request.contextPath}/onlineUser.do?method=isOkMessage",
			data:{},
			success : function(data) {
				var resultData=unescape(data);
				resultData=Ext.util.JSON.decode(resultData);
				if(resultData==''){
					return;
				}
				var arrInfo;

					result=resultData[0].msg;
					arrInfo=result.split("#B70C6hcA");

			    if(arrInfo!=""){
					Ext.MessageBox.show({
						msg: "<p align='center' style=\'font-size:18px;color:red'>"+arrInfo[0]+"</p><span style=\'font-size:18px;color: red\''>"+arrInfo[1]+"</span>",
						buttons:{"ok":"不再提醒","cancel":"关闭"},  
						fn:function(e){
							if(e=="ok"){
								$.ajax({
									type :"Post",
									async:true,
									url : "${pageContext.request.contextPath}/onlineUser.do?method=notReminding",
									data:{},
									success : function(data){}
									});
								}
						},
			            width: 600,  
			            height:200,  
			            modal:false,  
			            icon:Ext.Msg.INFO,
			            closable: true
			        }); 					
				}
			}
		});	
		
	}
	//打开新页签
	function openTab(id,name,url,menuType,scroll) {
		url=encodeURI(encodeURI(url));
	    var n = mainTab.getComponent(id); 
	    var scrolling = "" ;

	    if(scroll=="是"){
	    	scrolling = 'scrolling="auto"' ;
	    }else{
	    	scrolling = 'scrolling="no"' ;
	    }
	    
	    if(url.indexOf("javascript")==0){
	    	var _idx=url.indexOf("?");
	    	eval(url.substring(1, _idx));
	    	return;
	    }else if(url.indexOf("http://") == -1) {
	    	url = MATECH_SYSTEM_WEB_ROOT+"/"+url ;
	    }else{
	    	window.open(url);
	    	return;
	    }
	    if (!n) { //判断是否已经打开该面板    
	        n = mainTab.add({    
	           'id':id,      
	           'title':name,  
	            closable:true,  //通过html载入目标页    
	            html:'<iframe id="frame'+ id + '" '+scrolling+' frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'   
	        }).show();
	    }    
	    
	    mainTab.setActiveTab(n);
	}

	//打开新窗口
	var myWin;
	function openWin(jsonStr,_url){
		var param=jsonStr;
		if(typeof jsonStr=="string"){
			param=JSON.parse(jsonStr);
		}
		var _width=parseInt(param.width);
		var _height=parseInt(param.height);
		
		if(_width==0){
			_width=Ext.getBody().getWidth();
		}
		if(_height==0){
			_height=Ext.getBody().getHeight();
		}
		
		myWin=new Ext.Window({
				id:param.id,
				title: param.title,
				width: _width,
				height:_height,
		        modal:true,
		        layout:'fit',
		        listeners:{
		        	"close":function(){
		        		Ext.Ajax.request({      
		      		       url:'${pageContext.request.contextPath}/general.do?method=removeSysGlobalLocked',   
		      		       params:{
		      		    	   key:param.id   
		      		        } 
		         		});
		        	}
		        },
		        html:'<iframe id="winFrame'+param.id+'" scrolling="auto" frameborder="0" width="100%" height="100%" src="'+_url+'"></iframe>'
		    }).show();	
	}
	//关闭新窗口
	function closeWin(){
		if(myWin){
			myWin.close();
		}
	}
	
	
	Ext.onReady(function(){
		refreshMyDealList();
	});
	
</script>


</html>
