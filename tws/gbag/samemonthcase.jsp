
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<title>当月案件</title>
<style type="text/css">
body{
	background-color:rgb(243,243,243);
}
.div_one{
	width:100%;
	margin:auto;
	min-width:510px;
	text-align:center ;
	height:100%;
  	display: table;
}
.div_two{
	width:100%;
	margin:0px auto ;
	text-align:center ;
	display: table-cell;
 	vertical-align: middle;
 	margin-top:10%;
 	margin-left:20%;
}
.div_three{
	width:100%;
	margin-top:30px;
	text-align:center ;
}
.circle{
	width: 100px;
	height: 100px;
	text-align: center;
	line-height: 60px;
	display:inline-block;
	margin:10px;
	margin-right:26px;
	margin-top:10px;
	float:left;
}
.circle a{
	font-size:35px;
	color: rgb(162,162,162);
	display:block;
	width:80px;
	height:70px;
	padding-top:10px;
	border-radius: 40px;
	-webkit-border-radius: 40px;
	-moz-border-radius: 40px;
	border:3px rgb(25,169,146) solid;
	cursor:pointer;
}
.circle a:hover{
	color:rgb(190,190,190)  ;
	background:#FFF;
	border:3px rgb(25,169,146) solid;
}
.circle p{
	margin-top: -10px;
    font-size: 14px;
    white-space: nowrap;
    font-weight: 700;
    height:30px;
    margin-right:26px;
}  
.tfont {
	font-size:17px;
	color:rgb(123,123,123);
	font-weight: 700;
}
.tbody tr th{
	padding:5px 12px 5px 12px;
	font-weight: 700;
	font-size:14px;
}
 .tbody tr td{
	padding:5px 12px 5px 12px;
	color:rgb(120,120,120);
}
 .tbody{
	text-align:center;
}

 .tbody .tcont td div{
	width:20px;
	height:20px;
	text-align:center;
	color:rgb(255,255,255);
	background-color:rgb(212,180,1);
	border-radius: 35px;
	-webkit-border-radius: 35px;
	-moz-border-radius: 35px;
}

.tbody tr:nth-child(even)  {
    background-color: rgb(228,228,228);
}

</style>
</head>  
<body>
<div class="div_one">
	<div class="div_two">
		<div class="circle">
			<a  id="eventrecord1" ></a>
			<p>在办</p>
		</div>
		<div class="circle">
			<a id="eventrecord2"  ></a>
			<p>呈案</p>
		</div>
		<div class="circle">
			<a  id="eventrecord3" ></a>
			<!-- <p class="dayterm">已破未结</p> -->
			<p class="dayterm">未呈案</p>
			
		</div>
		<div class="circle">
			<a  id="eventrecord4" ></a>
			<p>结案</p>
		</div>
	<!-- 	<div class="circle">
			<a href="" id="eventrecord4" style="color:red ;" onclick="news1(3);return false;"></a>
			<p class="dayterm">超期未结</p>
		</div> -->
	</div>
</div>


</body>
</html>


<script type="text/javascript">
$("eventrecord4").mouseover(function(){
	  
	});

/* function casese(value){
	var name="案件监督";
	var url="${pageContext.request.contextPath}/case.do?method=cases&flag=all";
	if(value==2){//呈案
		url="${pageContext.request.contextPath}/case.do?method=caseSummitList&flag=all";
		name="已呈案";
	}else if(value==3){//未呈案
		url="${pageContext.request.contextPath}/case.do?method=caseUnSummitList&flag=all";
		name="未呈案";
	}else if(value==4){//结案
		url="${pageContext.request.contextPath}/case.do?method=caseHandOverList&flag=all";
		name="已结案";
	}else{
		url="${pageContext.request.contextPath}/case.do?method=cases&flag=all";
	}
	
	matech.openTab("casese",name, url, true,parent);
} */

var jsonobj ="" ;
var obj = "" ;
obj = obj.split("`") ;
function guaranteeinit(){
	$.post("${pageContext.request.contextPath}/view.do?method=samemonthcase",function(data){
		jsonobj = eval("["+data+"]") ;
		obj = jsonobj[0].where.split("`") ;
		document.getElementById("eventrecord1").innerHTML=jsonobj[0].eventrecord1.length ;
		document.getElementById("eventrecord2").innerHTML=jsonobj[0].eventrecord2.length ;
		document.getElementById("eventrecord3").innerHTML=jsonobj[0].eventrecord3.length ;
		document.getElementById("eventrecord4").innerHTML=jsonobj[0].eventrecord4.length ;

	});


}
$(function(){
	guaranteeinit() ;
});
function asynrefresh(){
	document.getElementById("eventrecord1").innerHTML="<font size='6'>加载中...</font>" ;
	document.getElementById("eventrecord2").innerHTML="<font size='6'>加载中...</font>" ;
	document.getElementById("eventrecord3").innerHTML="<font size='6'>加载中...</font>" ;
	document.getElementById("eventrecord4").innerHTML="<font size='6'>加载中...</font>" ;
	guaranteeinit() ;
}
</script>