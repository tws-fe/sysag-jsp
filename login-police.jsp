<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<%@ page import="com.szk.framework.pub.sys.UTILSysProperty"%>
<!DOCTYPE html>
<html>
<head>

    <%
    
        String logo = "";
        String title = UTILSysProperty.getProp("系统名称");
        //登录时是否去掉用户名下拉;是：去掉下拉，否：有下拉
        if ("".equals(title)) {
            title = "ITIL";
        }

        String workarea = UTILSysProperty.getProp("是否启用工作地点汇报");
        request.setAttribute("workarea", workarea);
        String isvcode = UTILSysProperty.getProp("是否启用登录验证码");
        request.setAttribute("isvcode", isvcode);

    %>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="robots" Content="none">
    <title><%= title %>
    </title>

    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <%--<link rel="stylesheet" href="${pageContext.request.contextPath }/css/login/supersized.css" type="text/css"/>--%>
    <link rel="stylesheet" href="${pageContext.request.contextPath }/css/login/login.css" type="text/css"/>

	<script type="text/javascript">
	//缩放浏览器时自动刷新页面
	window.onresize = function(){
		location.reload();
	}
	</script>
    <script type="text/javascript">
        $(document).ready(function(){
			var doc = DomUtil.init().getDocumentSize();
            var imgIndex = 0;
            var bannerBox = $('#login-banner-box');
            var docWidth = doc.width;
            var docHeight = doc.height;

            addLastNode();
            resize();
            //startAnimate();

            $(window).resize(function() {
                resize();
            });

            function addLastNode(){
                var li = document.createElement("li");
                li.innerHTML = $('#login-banner-box li').first().html();
                bannerBox.append(li);
            }

            function resize(){
                var boxHeight = docHeight-130;
                var boxWidth = docWidth;
				$('#login-banner').height(boxHeight);
                $('#login-banner-box li').height(boxHeight).width(boxWidth);

                var img = $('#login-banner-box li img')[0];
                var imgHeight = img.height;
                var imgWidth = img.width;
                if(imgHeight/imgWidth>boxHeight/boxWidth) {
                    $('#login-banner-box li img').width(boxWidth).css('margin-left',-boxWidth/2+'px');
                }else {
                    $('#login-banner-box li img').css('margin-left',-imgWidth/2+'px');
                }

                var _lo_height=$("#lo").height();
                var _lo_width=$("#lo").width();
                
                var _lo_top=(boxHeight-_lo_height-150)/2;
                var _lo_left=(boxWidth-_lo_width)/2;
                	
                $("#lo").css('top',_lo_top+'px');
                $("#lo").css('left',_lo_left+'px');
                
            }
	
            function startAnimate(){
                var imgCount =  $('#login-banner-box li').length;
                setInterval(function(){
                    imgIndex++;
                    bannerBox.animate({left:-imgIndex*docWidth},500,function(){
                        if(imgIndex+1 >= imgCount) {
                            imgIndex = 0;
                            bannerBox.css('left',0);
                        }
                    });
                },6000);
            }
        });



    </script>


    <style type="text/css">
        #full-body {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        #login-top {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 80px;
        }

        #login-main {
            position: absolute;
            left: 0;
            right: 0;
            top: 80px;
            bottom: 30px;
            overflow: hidden;
			background:#000;
			_zoom:1;
        }

        #login-bottom {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 50px;
            overflow: hidden;
        }


        #login-banner {
            position:relative;
			width:100%;
			height:100%;
            overflow: hidden;
        }

        #login-banner-box {
            width: 100000px;
            height: 100%;
            position: absolute;
            top:0;
            bottom:0;
            left:0;
        }
        #login-banner-box li {
            position: relative;
            float: left;
            overflow: hidden;
        }
        #login-banner-box li img{
            height:100%;
            left: 50%;
            position: absolute;
            margin-left: -860px;
            top:0;
            bottom:0;
            right:0;
        }
    </style>

</head>

<!--[if lt IE 7 ]>
<body class="ie ie6" id="full-body"> <![endif]-->
<!--[if IE 7 ]>
<body class="ie ie7" id="full-body"> <![endif]-->
<!--[if IE 8 ]>
<body class="ie ie8" id="full-body"> <![endif]-->
<!--[if IE 9 ]>
<body class="ie ie9" id="full-body"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<body id="full-body">
<!--<![endif]-->

<div id="login-top" class = "lhead">
    <div class="one span6" style="float:left;margin-left: 2%;">
        <div style = "float:left">
            <img alt="logo" src="${pageContext.request.contextPath }/img/homePage/logo/logo-login.png" style="float:left;height: 55px; width:370px;margin: 15px 0px 0px 0px;">
        </div>
       	<!--  
        <div style = "float:left">
            <ul class="inline">
                <li class="sb">
                    <span><%= title %></span>
                </li>
            </ul>
        </div>
        -->
    </div>
    <div class="two span5" style="float:right; ">
        <ul id="xmul" class="inline" style="margin: 20px 0px 0px 0px;">
        </ul>
    </div>

    <%
        String list = UTILSysProperty.getProp("登录页菜单"); //获得这个数据！
    %>


    <script type="text/javascript">
        var str = <%=list %>;
        $.each(str, function (key, value) {
            //alert(key+"--"+value);
            $("#xmul").append(
                    "<li><a href='" + value + "'>" + key + "</a></li>"
            );
        });
    </script>


</div>

<div id="login-main">
    <div id="login-banner">
        <ul id="login-banner-box">
            <li><img src="${pageContext.request.contextPath }/img/login/1.png" alt=""></li>
            <li><img src="${pageContext.request.contextPath }/img/login/2.png" alt=""></li>
            <li><img src="${pageContext.request.contextPath }/img/login/3.png" alt=""></li>
            <li><img src="${pageContext.request.contextPath }/img/login/4.png" alt=""></li>
        </ul>
    </div>
    <div class="span5 login" id="lo">
        <div class="lcont_head">
            <span>用户登录</span>
        </div>
        <div class="lcont_body">
            <dl style="margin-top: 30px;">
                <dd style="width:100%;margin-left:0">
                    <form action="${pageContext.request.contextPath}/login.do" method="post" name="thisForm">
                        <table style="text-align:left;margin: auto;">
                            <tr>
                                <td><span>登录账号 : </span></td>
                                <td><input tabindex="1" type="text" value="${cookiesValue}"
                                           onkeydown="if(event.keyCode==13){ document.getElementById('AS_psw').focus(); return false;}"
                                           id="AS_usr" name="AS_usr" placeholder="输入账号"></td>
                            </tr>
                            <tr>
                                <td><span>登录密码 : </span></td>
                                <td>
                                    <input tabindex="2" type="password" id="AS_psw" name="AS_psw" placeholder="输入密码">

                                    <input name="AS_dog"
                                           type="hidden"
                                           id="AS_dog"
                                           value=""
                                           style="height:18px;width:100px"
                                           tabindex="3">

                                    <input name="userScreen"
                                           type="hidden"
                                           id="userScreen"
                                           value=""/>

                                    <input name="psw_str"
                                           type="hidden"
                                           id="psw_str"
                                           value=""/>
                                    <input name="initheight" id="initheight" type="hidden">
                                	<input name="initwidth" id="initwidth" type="hidden">
                                </td>
                            </tr>
                            <c:if test="${ workarea eq '是' }">
                                <tr>
                                    <td><span>登录地点 : </span></td>
                                    <td>
                                        <input name="workarea"
                                               id="workarea"
                                               type="text"
                                               value=""
                                               size="10"
                                               tabindex="3"
                                               autoid='700'
                                               refer='登录地点'
                                               listWidth='180px'
                                        >
                                    </td>
                                </tr>
                            </c:if>
                            <c:if test="${isvcode eq '是' || (isvcode eq '是1' && serverinfo ne '') }">
                                <tr>
                                    <td><span>校验码 : </span></td>
                                    <td>
                                        <input name="AS_code"
                                               type="text"
                                               id="AS_code"
                                               value=""
                                               style="width:30%"
                                               tabindex="2"
                                               onfocus="vcodefocus()"
                                               placeholder="输入验证码">
                                        <img id="codeimg"
                                             src="login.do?method=service"
                                             style="margin-top: -10px;"
                                             onclick="reimg();">
                                    </td>
                                </tr>
                            </c:if>
                            <tr>
                                <td></td>
                                <td>
                                    <div style="width:200px;color:red;"><font id="msg"></font></div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <input
                                            type="submit"
                                            value="登 录"
                                            tabindex="4"
                                            onclick="return loginChk();"
                                            style="background-color:#006699;border: 0px; color: #ffffff; font-size: 14px; width: 89px; height: 30px; margin-bottom:20px"/>
                                </td>
                            </tr>
                        </table>
                    </form>
                </dd>
            </dl>
        </div>
    </div>
</div>


<div id="login-bottom" class="navbar-fixed-bottom lbfoot">
    <div class="lbfoot_left">
        <ul id="xmult">
            <script type="text/javascript">
                var str = <%=list %>;
                //alert(str.公司oa系统);
                $.each(str, function (key, value) {
                    //alert(key+"--"+value);
                    $("#xmult").append(
                            "<li><a href='" + value + "'>" + key + "</a></li>"
                    );
                });
            </script>
        </ul>
    </div>
    <div class="lbfoot_right" style="float:right">
        <font style="line-height: 50px;margin-right: 18px;">开发及维护支持:珠海泰维思信息科技有限公司</font>
    </div>
</div>

<script type="text/javascript">

    //获取验证码和更换验证码图片
    var code = "";
    $.post("login.do?method=getcode", function (data) {
        code = data;
    });
    function vcodefocus() {
        $.post("login.do?method=getcode", function (data) {
            code = data;
        });
    }
    function reimg() {
        var t = Math.random();
        document.getElementById("codeimg").src = "login.do?method=service&r=" + t;
    }
    //获取主机地址
    function getlocationhost() {
        return "http:\/\/" + window.location.host;
    }

    function checkUserOnline() {
        var userLoginId = document.getElementById("AS_usr").value;
        var password = document.getElementById("AS_psw").value;

        var query_String = "&userLoginId=" + userLoginId
                + "&password=" + password;

        var url = "${pageContext.request.contextPath}/onlineUser.do?method=checkUserOnline";

        return ajaxLoadPageSynch(url, query_String);
    }


    var browseName;
    var browsess;

    ${cookiesValue1}


    function loginChk() {

        if (thisForm.AS_usr.value == "") {
            alert("用户名不能为空！");
            thisForm.AS_usr.focus();
            return false;
        }
        if (thisForm.AS_psw.value == "") {
            alert("密码不能为空！");
            thisForm.AS_psw.focus();
            return false;
        }

        <c:if test="${ workarea eq '是' }">
        if (thisForm.workarea.value == "") {
            alert("登录地点不能为空！");
            thisForm.workarea.focus();
            return false;
        }
        </c:if>
        //如果需要输入验证码,则验证
        if (document.getElementById("AS_code")) {
            if (code.toLowerCase() == document.getElementById("AS_code").value.trim().toLowerCase()) {

            } else {
                alert("验证码错误");
                return false;
            }
        }
        //密码强度判断
        chkpwdStrong(document.getElementById("AS_psw"), document.getElementById("psw_str"));


        document.getElementById("userScreen").value = window.screen.width;

        if (window.localStorage) {
            window.localStorage.setItem('AS_usr', thisForm.AS_usr.value);
            window.localStorage.setItem('workarea', thisForm.workarea ? thisForm.workarea.value : '');
        }

        try {
            var result = checkUserOnline();
            //alert(result);
            if (result != 'offLine' && result != 'noUser') {
                //如果用户在线
                if (confirm("该用户已经登录,如果您继续登录的话,将会导致已登录的该用户强行退出!")) {
                    try {
                        var query_String = "&loginId=" + result;
                        var url = "${pageContext.request.contextPath}/onlineUser.do?method=kickUser";
                        ajaxLoadPageSynch(url, query_String);
                    } catch (e) {
                        console.log(e);
                    }
                    return true;
                } else {
                    //用户离线或者用户名密码错误
                    return false;
                }
                alert(321);
            }
        } catch (e) {
            console.log(e);
        }

    }

    function next() {
        var src = event.srcElement;
        if (event.keyCode != 13)
            return;

        if (src.type == "text") {
            document.getElementById("AS_psw").focus();
            return false;
        }

        if (src.type == "password") {
            //thisForm.submit();
            return true;
        }
    }


    function init() {
        var fulls = "left=0,screenX=0,top=0,screenY=0,scrollbars=1,location=0,status=1,";    //定义弹出窗口的参数

        if (window.screen) {
            var ah = screen.availHeight - 30;
            var aw = screen.availWidth - 10;
            fulls += ",height=" + ah;
            fulls += ",innerHeight=" + ah;
            fulls += ",width=" + aw;
            fulls += ",innerWidth=" + aw;
            fulls += ",resizable"
        } else {
            fulls += ",resizable"; // 对于不支持screen属性的浏览器，可以手工进行最大化。
        }

        var win = window.open("login.do?init=true", "", fulls);
        alert(win);
        if (!win) {
            alert('对不起,系统弹出窗口给您的浏览器阻止了\n请【关闭弹窗口阻止程序】或【点击】浏览器上方黄色提示框,选择：总是允许来自此站点的弹出窗口');
        } else {
            //去掉关闭窗口的提示
            window.opener = null;
            window.open('', '_self');
            window.close();
        }
    }

    if ("${param.init}" != "true") {
        //init();
    }


    try {

        setTimeout("document.getElementById('AS_usr').focus();", 200);

        if (top.location != self.location)top.location = self.location;


        var result = '${serverinfo}';
        if (result != '') {
            myHint('AS_usr', result, true);
        }

    } catch (e) {
    }

</script>
<script>
    /* function on_resize(){
     var table_bg = jQuery("#table-bg");
     var table_bg_left = table_bg.position().left;
     var table_bg_width = table_bg.width();

     var $state2 = jQuery('#state2');
     $state2[0].style.left = table_bg_left + 100;

     var $div_title = jQuery('#div-title');
     $div_title[0].style.left = table_bg_left + 100;
     }
     on_resize();
     window.onresize = on_resize; */


    Ext.onReady(function () {
        if (!window.localStorage) {
            return;
        }
        var AS_usr = window.localStorage.getItem('AS_usr');
        if (AS_usr) {
            thisForm.AS_usr.value = AS_usr;
        }
        var workarea = Ext.getCmp('workarea');
        if (workarea) {
            workarea.doQuery();
            setDefaultArea()
        }
        var doc = DomUtil.init().getDocumentSize();
    	$("#initheight").val(doc.height-55-33-60) ;
    	$("#initwidth").val(doc.width) ;
    });
</script>
<c:if test="${ workarea eq '是' }">
    <script>

        var retry_time = 0;
        // 因为中文 cookie 返回时有点问题，使用 index
        function setDefaultArea() {
            if (!window.localStorage) {
                return;
            }
            var workarea = Ext.getCmp('workarea');
            var items = workarea.getStore().data.items;
            if (!items || items.length == 0) {
                if (retry_time > 10) {
                    return;
                }
                setTimeout(setDefaultArea, 500);
                retry_time++;
                return;
            }
            // var text = items[lastLoginPlaceIndex].json.text;
            // var value = items[lastLoginPlaceIndex].json.value;
            var workarea_value = window.localStorage.getItem('workarea');
            if (workarea_value) {
                workarea.setValue(workarea_value);
            }
            // workarea.setRawValue(text);
        }


    </script>
</c:if>

</body>
</html>
