<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"
%><%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp"
%><%@ page import="java.util.*"
%><%@ page import="java.sql.Connection"
%><%@ page import="com.szk.framework.pub.db.DBConnect"
%><%@ page import="com.szk.framework.pub.db.DbUtil"
%><%@ page import="com.szk.framework.listener.UserSession"
%><%

	//检查密码是否已经修改
	Connection conn = null;
	try{
		conn = new DBConnect().getConnect();
		DbUtil db = new DbUtil(conn);

		UserSession userSession  = (UserSession)request.getSession().getAttribute("userSession");
		String sql="SELECT COUNT(1) AS hj FROM k_user WHERE id=? AND PASSWORD<>MD5('1')";
		String psw_str=String.valueOf(db.queryForInt(sql,new String[]{userSession.getUserId()}));
		System.out.println("----psw_str:"+psw_str);
		request.setAttribute("psw_str",psw_str);
		
	}catch(Exception e){
	}finally{
		DbUtil.close(conn);
	}

%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<script type="text/javascript" src="${pageContext.request.contextPath}/js/index.js"></script>
	<title>我的工作台</title>
     <style type="text/css">
			.ct{
			width:150px;
			display:inline-block ;
			height:auto;
			border-radius: 5px;
			left:10px;
			display:inline-block ;
			position:relative;
		}
		.ct a{
			color:black ;
			text-decoration:none ;
		}
		.ct a:hover{
			color:red ;
		}
		
		.ct1_1{
			text-align:center ;
			line-height:28px;
			height:30px;
			width:150px;
			font-size:14px;
		}
		.ct1_1 font{
			display:inline-block ;
			width:120px;
			height:26px; 
			
			color:white ;
		}
		
		.num{
			width: 20px;
			height: 20px;			
			border:1px solid red ;
			background-color:#E10005 ;
			border-radius:10px ;
			position:absolute;
			text-align: center;
			color: white;
			font-size:14;
			left:150px;
			top:5px;
		}
		
		.indexbg{
			position:fixed; 
			z-index:1; 
			overflow:hidden;
		}
		
		.indexbgie{   
       		_position: absolute;  
       		_clear: both;   
       		_top:expression(eval(document.compatMode &&   
               document.compatMode=='CSS1Compat') ?   
               documentElement.scrollTop   
               +(documentElement.clientHeight-this.clientHeight) - 1   
               : document.body.scrollTop   
               +(document.body.clientHeight-this.clientHeight) - 1); 
		}
		
		.indexbody{
			position: relative;
    		right: 0;
    		top: 0;
    		z-index: 9990;
    		height: auto;
		}
		
		#center{text-align: center;margin:0px auto;z-index: 9999;}
		#center tr{height:25% !important;}
    </style>
</head>

<body scroll=no>
<div id="indexbg" class="indexbg indexbgie">
	<img src="${pageContext.request.contextPath}/img/homePage/icon/bg/BGM.jpg" width="1920" height="800" id="bgimg" />
</div>
<div id="indexbody" class="indexbody">
	<table width="80%" height="100%" align="center" id="center">
		<tr style="margin-right:5%;">
			<c:forEach items="${menuList}" var="menu" varStatus="status">
				<td id="td-${menu.id}" menuname='${menu.name}' >
				<div class="ct" >
					<div class="ct1_2">
						<div class="num" id="num-${menu.id}" <c:if test="${menu.menucount == null}"> style="display:none" </c:if> >
							${menu.menucount}
						</div>
						<a href="javascript:void(0);" onclick="openTab('${menu.id}','${menu.name}','${pageContext.request.contextPath}/${menu.act}&menuid=${menu.id}',parent)">
							<img src="img/${menu.helpact}" width="120" height="120"/>
						</a>
					</div>
					<div class="ct1_1">
						<font face="微软雅黑" color="#000000"><h3 style="font-size:20px;">${menu.name}</h3></font>
					</div>
				</div>
				<c:if test="${(status.index + 1) % 5=='0'}">
					</td></tr><tr>
				</c:if>
				</td>
			</c:forEach>
		</tr>
	</table>

</div>


</body>

<script type="text/javascript">

   	$(".ct").hover(function(){
   		$(this).css({"border-color":"green"}) ;
		$(this).find(".ct1_2").css({"opacity":"0.5","-moz-opacity":"0.5"}) ;
   	
   	},function(){
		$(this).css({"border-color":"#4885BE"}) ;
		$(this).find(".ct1_2").css({"opacity":"1","-moz-opacity":"1"}) ;
	});
	
	var tt = "";
	function setMenuCount(){
		
		Ext.Ajax.request({
			method:'POST',
			url: MATECH_SYSTEM_WEB_ROOT+'info.do?method=mainCount',
			success:function (response,options) {
				var t = response.responseText ;
				var menuList = Ext.util.JSON.decode(t);
				for(var i = 0 ;i<menuList.length;i++){
					var menu = menuList[i];
					var tdObj = document.getElementById("td-" + menu.id);
					if(menu.menucount && menu.menucount != ''){
						document.getElementById("num-" + menu.id).innerText = menu.menucount;
						document.getElementById("num-" + menu.id).style.display = "";
						
						if(tt.indexOf(tdObj.getAttribute("menuname"))>-1){
							tdObj.style.display = "";
						}
					}else{
						document.getElementById("num-" + menu.id).innerText = "";
						document.getElementById("num-" + menu.id).style.display = "none";
						if(tt.indexOf(tdObj.getAttribute("menuname"))>-1){
							tdObj.style.display = "none";
						}
					}				
				}
			},
			failure:function (response,options) {
				return false ;
			}
		});		
	}
	
		
	function getTitleHint(){
		Ext.Ajax.request({
			method:'POST',
			url: MATECH_SYSTEM_WEB_ROOT+'info.do?method=getTitleHint',
			success:function (response,options) {
				var t = response.responseText ;
				
				document.getElementById("taskDivHint").innerHTML=t;

			},
			failure:function (response,options) {
				return false ;
			}
		});
	}

	function exit(){
	   if(event.clientX>document.body.clientWidth  && event.clientY<0||event.altKey){
			window.location="${pageContext.request.contextPath}/common.do?method=exitSystem";
	   }
	}
	
	function openUrl(url,name) {
		n = parent.parent.tab.add({    
			'title':name,  
			 closable:true,  //通过html载入目标页    
			 html:'<iframe scrolling="no" frameborder="0" width="100%" height="100%" src="' + url + '"></iframe>'   
		});    
		
		parent.parent.tab.setActiveTab(n);
	}
	
	var refreshPerSecond = '${refreshPerSecond}';
	var refreshTimer;
	function refreshMyDealList(){
		setMenuCount();
		clearTimeout(refreshTimer);
		refreshTimer = setTimeout(refreshMyDealList, refreshPerSecond * 1000);
	}
	
	Ext.onReady(function(){
		var docsize = DomUtil.init().getDocumentSize();
		var $index_body = $("#index-body");
		$index_body.css({
			height : (docsize.height - 15) + 'px'
		});
		refreshMyDealList();
	});
	
</script>


<script type="text/javascript">
function FullScreenBackground(theItem){
	var imageWidth=$(theItem).width();
	var domutil = DomUtil.init().getDocumentSize();
	var winWidth = domutil.width;
	var winHeight = domutil.height;
	var imageHeight=$(theItem).height();
	var picHeight = imageHeight / imageWidth;
	var picWidth = imageWidth / imageHeight;
	if ((winHeight / winWidth) < picHeight) {
		$(theItem).css("width",winWidth);
		$(theItem).css("height",picHeight*winWidth);
	} else {
		$(theItem).css("height",winHeight);
		$(theItem).css("width",picWidth*winHeight);
	};
	$(theItem).css("margin-left",winWidth / 2 - $(theItem).width() / 2);
	$(theItem).css("margin-top",winHeight / 2 - $(theItem).height() / 2);
}

window.onload = function () {
	FullScreenBackground("#indexbg");
	FullScreenBackground("#bgimg");
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
	if (isIE) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion<11){
        	$("#indexbg").css("margin-top", "0px");
        	//$("#indexbody").css("top", "35%");
        }
    }
}
$(window).resize(function() {
	FullScreenBackground("#indexbg");
    FullScreenBackground("#bgimg");
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
	if (isIE) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion<11){
        	$("#indexbg").css("margin-top", "0px");
        	//$("#indexbody").css("top", "35%");
        }
    }
});
</script>

</html>

