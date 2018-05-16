<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>office在线阅读器</title>
</head>
<body leftmargin="0" topmargin="0" onbeforeunload="opCloseFile()" >
<div style="display:none">
<OBJECT ID="DjWebOffice" CLASSID="CLSID:E77E049B-23FC-4DB8-B756-60529A35FAD5"></OBJECT>
</div>
<div id="ocxdiv">
<OBJECT ID="JgWebOffice" CLASSID="CLSID:23739A7E-2000-4D1C-88D5-D50B18F7C347" width="100%" height="100%"></OBJECT>
</div>

<div id="setupdiv" style="display:none">
 您的浏览器无法加载OFFICE在线阅读控件。<BR>
 1.如果您是第一次运行，请点击<a href="ItilOcx.exe">下载</a>安装控件后再重新打开本网页；<BR>
 2.如果您已经安装了控件但还是无法访问，请尝试按以下步骤解决：<BR>
 a.确认您当前使用的是IE或IE内核浏览器；对于双内核浏览器，请检查当前使用的是IE内核而不是其他内核；<Br>
 b.如果浏览器问您是否启用控件，选择"是";<Br>
 c.把当前网址加入到信任域；方法是点击IE菜单->工具->INTERNET选项->安全标签页->本地intranet->站点->高级->添加->关闭;<Br>
 d.如果还不能解决问题，请尝试重置IE；方法是：点击IE菜单->工具->INTERNET选项->高级标签页->重置->确定;然后关闭全部IE，再次打开IE重试<br>
 e.如果以上还不能解决问题，请咨询系统管理员。<br>
</div>
</body>
</html>
<script type="text/javascript">

function showSetupDiv(){
	var ocxdiv=document.getElementById('ocxdiv');	//点聚
	var setupdiv=document.getElementById('setupdiv');	//点聚
	try{
		ocxdiv.style.display="none";
		setupdiv.style.display="";
	}catch(e){}
}


//随机文件名
var tempfile="d:/"+Math.random()+".<%= request.getParameter("attachType") %>"; 
window.onload = function (){
	var DjWebOffice=document.getElementById('DjWebOffice');	//点聚
	var JgWebOffice=document.getElementById('JgWebOffice');	//金格
	if(!DjWebOffice){
		alert('请先安装点聚WEBOFFICE控件');
		showSetupDiv();
		return false;
	}
	if(!JgWebOffice){
		alert('请先安装金格iWEBOFFICE控件');
		showSetupDiv();
		return false;
	}
	
	try{
		tempfile=DjWebOffice.GetTempFilePath();
	}catch(e){
		alert('请先安装金格iWEBOFFICE控件');
		showSetupDiv();
		return false;
	}
	
	/*
	//新建目录，唉，一堆坑，点聚的目录不存在不会自己建立
	JgWebOffice.WebMkDirectory(tempfile);
	alert(tempfile);
	tempfile+="/"+Math.random()+".<%= request.getParameter("attachType") %>"; 
	*/
	tempfile+="/../"+Math.random()+".<%= request.getParameter("attachType") %>"; 
	
	alert(tempflie);
	
	//先用点聚的下载
	//DownLoadFile("http://127.0.0.1/itil/common.do?method=attachDownload&attachId=de91cd772f2d41d896955f5374a7ede5", "d:\"+tempfile, "", "")
	var t=DjWebOffice.DownLoadFile("http:\/\/"+window.location.host +"${pageContext.request.contextPath}/common.do?method=attachDownload&attachId=<%=request.getParameter("attachId") %>", tempfile, "", "");
	
	alert(t);
	
	//再用金格的打开
	try{
		JgWebOffice.ShowMenu = "0";
		//JgWebOffice.EditType = "-1,1,0,0,0,0,0,0";
		JgWebOffice.WebOpenLocalFile(tempfile);	
	}catch(e){
		alert(e);
		alert('请先安装金格WEBOFFICE控件');
		showSetupDiv();
		return false;
	}
	
	/*
	//这是点聚的方法，可惜这家伙不稳定，唉
	//bToolBar_New_onclick
	WebOffice1.HideMenuItem(0x01 + 0x8000); //Hide it

	//bToolBar_Open_onclick
	WebOffice1.HideMenuItem(0x02 + 0x8000); //Hide it

	bToolBar_Save_onclick
	WebOffice1.HideMenuItem(0x04 + 0x8000); //Hide it

	//下载
	var tempfliename='Math.random()'
	
	
	//打开
	WebOffice1.WebOpenUrlFile("http:\/\/"+window.location.host +"${pageContext.request.contextPath}/common.do?method=attachDownload&attachId=<%=request.getParameter("attachId") %>");

	WebOffice1.SetWindowText("珠海泰维思信息科技有限公司通用附件阅读", 0);
	WebOffice1.OptionFlag |= 128;

	//hideSaveItem-2003
	WebOffice1.SetToolBarButton2("Standard",1,0);

	//hideOpenItem-2003
	WebOffice1.SetToolBarButton2("Standard",2,0);

	//hideNewItem-2003
	WebOffice1.SetToolBarButton2("Standard",1,0);

	//hideAll('hideall','','','')-2007
	WebOffice1.HideMenuArea('hideall','','','');
	*/
};


//关闭文件
function opCloseFile(){
	//关闭打开的对象
	var JgWebOffice=document.getElementById('JgWebOffice');
	if(JgWebOffice){
		//DjWebOffice.WebClose(0); 
		JgWebOffice.WebClose();
	}
	
	//删除临时文件
	var DjWebOffice=document.getElementById('DjWebOffice');
	if(DjWebOffice){
		DjWebOffice.DelLocalFile(tempfile);
	}
	
		
	
}


</script>
