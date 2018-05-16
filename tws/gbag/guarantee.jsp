
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<title>guarantee</title>
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
			<a href="" id="eventrecord1" ></a>
			<p>今日已处理</p>
		</div>
		<div class="circle">
			<a href=""  id="eventrecord2" ></a>
			<p>今日未处理</p>
		</div>
		<div class="circle">
			<a href="" id="eventrecord3" ></a>
			<p class="dayterm">三天未处理</p>
		</div>
		<div class="circle">
			<a href="" id="eventrecord4" style="color:red ;" ></a>
			<p class="dayterm">三天以上未处理</p>
		</div>
	</div>

</div>


</body>
</html>


<script type="text/javascript">

var jsonobj ="" ;
var obj = "" ;
obj = obj.split("`") ;
function guaranteeinit(){
	$.post("${pageContext.request.contextPath}/view.do?method=guarantee",function(data){
		jsonobj = eval("["+data+"]") ;
		obj = jsonobj[0].where.split("`") ;
		document.getElementById("eventrecord1").innerHTML=jsonobj[0].eventrecord1 ;
		document.getElementById("eventrecord2").innerHTML=jsonobj[0].eventrecord2 ;
		document.getElementById("eventrecord3").innerHTML=jsonobj[0].eventrecord3 ;
		document.getElementById("eventrecord4").innerHTML=jsonobj[0].eventrecord4 ;
		
		$(".dayterm")[0].innerText = jsonobj[0].strday+"天未处理" ;
		$(".dayterm")[1].innerText = jsonobj[0].strday+"天以上未处理" ;
	})


}
$(function(){
	guaranteeinit() ;
})
function asynrefresh(){
	document.getElementById("eventrecord1").innerHTML="<font size='6'>加载中...</font>" ;
	document.getElementById("eventrecord2").innerHTML="<font size='6'>加载中...</font>" ;
	document.getElementById("eventrecord3").innerHTML="<font size='6'>加载中...</font>" ;
	document.getElementById("eventrecord4").innerHTML="<font size='6'>加载中...</font>" ;
	guaranteeinit() ;
}
</script>