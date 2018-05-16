<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>pdf在线阅读器</title>
<script type="text/javascript"> 
window.onload = function (){
	var PDFReader1=document.getElementById('oframe');
	if(PDFReader1){
		PDFReader1.PrintRight = 0;
		PDFReader1.ShowMenus = 0;
		PDFReader1.SaveRight = 0;
		//PDFReader1.WebOpenLocalFile "c:\金航线2015第四期.pdf"
		PDFReader1.WebOpenUrlFile("http:\/\/"+window.location.host +"${pageContext.request.contextPath}/common.do?method=attachDownload&attachId=<%=request.getParameter("attachId") %>");
	}else{
		alert('请先安装WEBPDF控件');
	}
};


//关闭文件
function opCloseFile(){
	var PDFReader1=document.getElementById('oframe');
	if(PDFReader1){
		PDFReader1.WebClose();
	}
}

</script> 
</head >
<body leftmargin="0" topmargin="0" onbeforeunload="opCloseFile()">
<object classid="clsid:39E08D82-C8AC-4934-BE07-F6E816FD47A1" id="oframe" width="100%" height="100%">
</object>
</html>




