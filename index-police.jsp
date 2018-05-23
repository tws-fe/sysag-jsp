<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/sInclude.jsp" %>
<%@ page import="com.szk.framework.pub.sys.UTILSysProperty"%>
<%
	
	String logo = "";
	String title = UTILSysProperty.getProp("系统名称");
	//登录时是否去掉用户名下拉;是：去掉下拉，否：有下拉
	if("".equals(title)){
		title="拱北分局案管系统";
	}
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title><%= title %></title>

<link rel="stylesheet" type="text/css" href="${ctx}/share/css/index.css" />
<script type="text/javascript" src="${ctx}/share/js/ext/plugin/TabCloseMenu.js"></script>
<script type="text/javascript" src="${ctx}/share/js/tws/mainFrame-beta-ext.js" charset="UTF-8"></script>

<script type="text/javascript">

var userRoleName="${sessionScope.userSession.userName}";
var userIndex = eval('([{"lproperty":"police.do?method=myHomePage","name":"首页","menuid":"myhomepage","property":"indexdefault","act":"police.do?method=myHomePage","helpact":"","mode":"u"}])');

var mainTab;
var tab;

Ext.onReady(function() {
	
	MainIndex.init();
	
	mainTab=tab=MainIndex.getMainTab();
	
	
	MainMenu.map['curUserName']="${sessionScope.userSession.userName}";
	MainMenu.init();
	
	initMenuEnvent();
	
});



</script>
<style>
	/* 2018.05.23 去掉头部标签下的蓝色线 */
.x-tab-panel-header {
	border: 0;
}
</style>

</head>

<body class="body">

    <!--导航-->
       <div class="indexnav">
            <div id="index-nav-box" class="container-fluid nav_box">
                  <div class="row">
                         <div class="col-xs-4 bt">
                              <div class="bt_box">
                                  <img src="${ctx}/share/images/index/sy-jh.png" />
                              </div>
                              <div class="bt_box bt_right">
                                  <div class="bt_txt" >${sessionScope.userSession.userOrganName}</div>
                                  <div style="margin-top:10px;">
                                     <img src="${ctx}/share/images/index/sy-xt.png" />
                                  </div>
                              </div>
                         </div>

                     <div class="col-xs-6 nav_bj">
                     
						<div id="menu" class="clearfix" style="float: left;"></div>
                      
                      
                      <div class="nav_bj_div clearfix">

                            <div class="nav_right">
                                  <div class="container-fluid" style="margin-top:10px;">
									<div class="sys-admin">${sessionScope.userSession.userName}</div>									
                                      <div class="col-xs-4  tisbox1" style="position:relative">
                                         <img  src="${ctx}/share/images/index/bz1.png"/>
										<a class="tis" href="javascript:MainIndex.openTab('showMyMessage','我的提醒','getMessage.do?method=toMyCaseMind');">我的提醒</a>
                                     
                                           <%-- <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                            
                                            <li style="position:relative"><a href="javascript:MainIndex.openTab('menuHelpDocument','帮助文档','${pageContext.request.contextPath}/tws/help/helpMain.jsp');">帮助文档</a>
                                             <div class="jiantou">
                                              <img src="${ctx}/share/images/index/867654318636691305.png">
                                            </div>
                                            </li>
                                            <li><a href="javascript:MainIndex.openTab('menuOcxDownload','控件下载','${ctx}/ocx/downLoadOcx.jsp');">控件下载</a></li>
                                            <li><a href="javascript:MainIndex.openTab('menuFileDownload','文件下载','${ctx}/tws/help/fileDownload.jsp');">文件下载</a></li>
                                        
                                          </ul> --%>

                                      </div>
                                      <div class="col-xs-4 tisbox" style="position:relative">
                                         <img  src="${ctx}/share/images/index/gr1.png"/>
                                         <a class="tis" href="javascript:MainIndex.openTab('personalInfo','个人讯息维护','userNew.do?method=personEdit&flag=1');">个人讯息</a>
                                      </div>
                                      <div class="col-xs-4 tisbox" style="position:relative">
                                         <img src="${ctx}/share/images/index/tc2.png"/>
                                         <a class="tis" href="javascript:void(0)" onclick="MainIndex.exitSystem();">离开系统</a>
                                      </div>
                                  </div>
                            </div>
                      </div>
                      
                   </div>

                  </div>
            </div>
       </div> 
    <!--导航结束-->

    <div class="container-fluid nav_bottom">
                 <div id="index-toolbar-clearfix"  class="clearfix">
                 
                     <div class="pull-left nt_left">
                     		<!--  
                           <a href="javascript:void(0)" onclick="MainIndex.activateUserIndex('home');">主页</a>
                           <a href="javascript:void(0)" onclick="MainIndex.activateUserIndex('xjda');">新建档案</a>
                           <a style="color:yellow" href="javascript:void(0)" onclick="MainIndex.activateUserIndex('curnode');">当前节点：<span id="index-curnode-name" menuid=""></span></a>
                           -->
                     </div>
                     
                     <div id="index-toolbar" class="pull-right nav_ul_parent">
                     
                     	  <div class="clearfix index_toolbar_container" >
	                          <ul id="index-toolbar-ul" class="clearfix nav_ul">
	                          </ul>
                          </div>
                          
                          <div id="index-toolbar-time" class="time" style="display:block;">

                          </div>
                          
                     </div>
            </div>   
	</div>
	
	<div style="width:100%;" id="homeIframe">
	  <div id="tabDiv" style="z-index: 0; position: relative;"></div>
   </div>				
		
   <div style="display: none">	
		<form name="thisForm" id="thisForm" method="post" action="" class="autoHeightExtForm">
			<div id="div_form_item"></div>
		</form>
   </div>
	 
</body>

<script type="text/javascript">

function initMenuEnvent(){
	
	var url = null;
	var title = null;
	var content = null;
	

    $(".navli_divone").parent().hover(function() {
       $(this).children().css("top","-45px")
    }, function() {
      
      $(this).children().css("top","-33px")
    });


   $(".tisbox").hover(function() {
     $(this).children().eq(0).hide();
     $(this).children().eq(1).show();
   }, function() {
     $(this).children().eq(0).show();
     $(this).children().eq(1).hide();
   });

   $(".tisbox1").mouseenter(function() {
     $(this).children().eq(1).show();
   });
   $(".tisbox1").mouseleave(function() {
     $(this).children().eq(1).hide();
   });
}

Ext.EventManager.onWindowResize(function(width, height) {
	
	
	var headHeight=84+25;
	
	var docsize = DomUtil.init().getDocumentSize();
	var docWidth=width||docsize.width;
	var docHeight=height||docsize.height;
	
	var $index_body = $("#homeIframe");
	var $index_body_width=docWidth;
	var $index_body_height=docsize.height-headHeight;
	
	$index_body_height=docsize.height-headHeight-56;

	$index_body.css({
		width:$index_body_width+'px',
		height:$index_body_height + 'px'
	});
	
	$(".indexnav").css({
		width:$index_body_width+'px'
	});
	
	mainTab.setWidth($index_body_width);
	mainTab.setHeight($index_body_height);
	
}); 


var _CUR_USER="${sessionScope.userSession.userId}";
   
var _WebOffice=true;
function getWebOffice(){
	
	var webOffice=document.getElementById('DownLoadControl');
	
	return webOffice;
}

var refreshTimer;
function refreshMyDealList(){
	showMyMsgInfo();
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
	
	var _html="";
	var isPostType=false;
	var _scrolling="auto";
	
	for(var paramID in param){
		if(paramID=="type"){
			if(param[paramID]=="post"){
				isPostType=true;
			}
		}else if(paramID=="scrolling"){
			if(param[paramID]!=""){
				_scrolling=param[paramID];
			}
		}else{
			_html+="<input name='"+paramID+"' id='"+paramID+"' type='hidden' value='"+param[paramID]+"'>";	
		}
		
	}
	
	MainIndex.wcache.id=param.id;
	
	if(isPostType){
		
		$("#div_form_item").html(_html);

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
	        html:'<iframe id="winFrame'+param.id+'" name="winFrame'+param.id+'" scrolling="'+_scrolling+'" frameborder="0" width="100%" height="100%" src=""></iframe>'
	    }).show();			
		
		var formObj=document.getElementById("thisForm");
		
		formObj.action=_url;
		formObj.target="winFrame"+param.id;
		formObj.submit();
		
	}else{
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
