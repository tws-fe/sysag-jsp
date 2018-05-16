<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="${pageContext.request.contextPath}/police/LodopFuncs.js" charset="UTF-8"></script>
<title>打印二维码</title>
</head>

<script type="text/javascript">

var LODOP; //声明为全局变量     
var pwidth=80;
var pheight=58;
var psf=80;
var ptop=40;
var pleft=0;

function print(){
	
	
	var i;
	for(i=0;i<${imgSize};i++){
		var strHtml=document.getElementById("print_area"+i).innerHTML;
		
		if(i==0){
			LODOP=getLodop();  
			LODOP.PRINT_INIT("打印档案条形码");
			LODOP.SET_PRINT_PAGESIZE(1,pwidth*10,pheight *10,"");
			LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT",psf+"%");
		}else{
			LODOP.NEWPAGE();
		}
		LODOP.ADD_PRINT_TABLE(ptop,pleft,pwidth*10,pheight*10,strHtml);

	}
	
	LODOP.PRINT();
	closeTab(parent.parent.tab);
}
</script>

<body style="margin: 0px;" onload="print();">

<c:forEach items="${imgs}" var="img"  varStatus="var">
<div name="print_area"  id="print_area${var.index}">
	<table border="0" class="x-window-mc" style="margin: 0px 0px;width: 385px">
	<tbody>
	<tr>
	<td align='left' style="width: 80px ;" rowspan=3>
		<img src='${pageContext.request.contextPath}/${path}/${img.ciId}.jpg'></img>		
	</td>
	<td>编号：${img.casenumber}</td>
	</tr>
	<tr><td>名称：${img.casename}</td></tr>
	<tr><td>民警：${img.uname}</td></tr>
	<c:if test="${flag eq '1'}">
		<tr><td colspan=2 >档案编号：${img.filesnumber}</td></tr>
		<tr><td colspan=2 >档案名称：${img.itemname}</td></tr>	
	</c:if>
	<c:if test="${flag eq '2' || flag eq '3'}">
		<tr><td colspan=2 >物品编号：${img.filesnumber}</td></tr>
		<tr><td colspan=2 >物品名称：${img.itemname}</td></tr>	
	</c:if>
	<tr><td colspan=2 >打印时间：${currentTime}</td></tr>
	</tbody>
	</table>
</div>
</c:forEach>


</body>
</html>

