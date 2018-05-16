<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp"%>
<html>
<body>
<div style="display: none">
		<object classid="CLSID:7CF3E9B9-2A03-4270-9017-B427FE717939" 
		height="130" id="DownLoadControl" width="290"></object>
</div>
<script type="text/javascript">


function myOpen(url){

	var o=document.getElementById('DownLoadControl');
	
	var datetime = TimeUtil.init().format_date(new Date()) ;
	var dateone = "${param.Date}" ? datetime.substring(0,10) : "${param.Date}" ;
	var timeone = "${param.Time}" ? datetime.substring(11,19) : "${param.Time}" ;
	
	url = url+"&Date="+dateone+"&Time="+timeone ;
	
	try{
		if (o){
			var fileName=Math.random()+'.xls';
			var dir='c:\\temp';
			var t=o.funMakeDir(dir);
			if(!t){
				alert('无法创建临时目录:'+dir);
				return false;
			}

			t=o.funDownloadFile(url,dir+'\\'+fileName);
			if(t>''){
				//下载失败
				alert('下载失败：'+t);
				return;
			}else{
				//打开
				o.funMyOpenFile(dir+'\\'+fileName);
			}
		}else{
			alert('初始化控件失败：'+e);
			setupdiv.style.display = "";
			document.getElementById('ocxresult').innerHTML="您的系统未安装下载控件，请重新下载安装或刷新后测试";
			location.href=url ;
		}
	}catch(e){
		alert(e);
		setupdiv.style.display = "";
		document.getElementById('ocxresult').innerHTML="您的系统未安装下载控件，请重新下载安装或刷新后测试";
		location.href=url ;
	}
}
myOpen("http://127.0.0.1:1086/Excel.aom?Name=%E6%B5%8B%E8%AF%95%E6%8A%A5%E8%A1%A8f") ;

</script>



<div style="display: none" id="setupdiv" align="left">
		<input type="button" value="测试" class="flyBT" onclick="myOpen('http://127.0.0.1:5199/itil/ocx/20160617180324.xls');"/>

		
		<br><br><br>
            <span id='ocxresult'  style="color:red"></span>
		<br>
		
        <fieldset  style="width:75%" >
            <legend>插件安装向导</legend>
            <p align="center"><b>在线安装</b></p>
          <ul>
            <li>
              <p align="left">您的环境由于缺乏必要的插件而无法正常运行。需要重新安装。
            <li>
              <p align="left">1.点击下载 [<a href="./Setup.exe">本地安装程序</a>]，您将会得到一个  可执行文件，请另存到本地并执行一次。
            <li>
              <p align="left">2.如果您本机安装了安全卫士等软件，有可能会屏蔽系统注册，请选择全部允许！</li>
            <li>
              <p align="left">3.请把本网页设置为本地信任域！</li>
            <li>
              <p align="left">4.安装成功后，请点击看能否加载！</li>
            <li>
              <p align="left">无论是网络安装，还是本地安装，本操作都只需要进行一次，</li>
           <li>
              <p align="left">如果您始终看到本界面，请与系统管理员或者寻求技术支持。</li>
          </ul>
       
       	<p align="center">
       	<input name="init" type="button" class="flyBT" value="刷新" onclick="window.location=window.location;">
       	</p>
          </fieldset>

</div>


</body>
</html>