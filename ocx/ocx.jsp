<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp"%>
<html>
<body>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/mainFrame-beta.js?version=20161103" charset="UTF-8"></script>

<script type="text/javascript">


function myOpen(){
      try{
	var o=document.getElementById('ScreenControl');
	if (o){
		o.pAutoSave=true;
		o.funCapture();
	}
     }catch(e){
	         var result = "您的系统未安装截图控件，请重新下载安装或刷新后测试"
             document.getElementById('ocxresult').innerHTML=result;
        }
}


//最大化|最小化
function minormaxview(){
	var aa = DomUtil.init().getParentObj('mtb');
	if(aa=="1"){
		if(parent.tab){
			parent.minview();	
		}else if(parent.parent.tab){
			parent.parent.minview();
		}else if(parent.window){
			parent.window.minview();
		}else{
			minview();
		}
	}else{
		if(parent.tab){
			parent.maxview();
		}else if(parent.parent.tab){
			parent.parent.maxview();
		}else if(parent.window){
			maxview();
		}else{
			maxview();
		}
		
	}	
}


</script>

<div style="display: none;">
	<object classid="CLSID:8755D778-0714-4E39-AB4C-6F5361BAD661" height="1" id="ScreenControl" width="1"></object>
</div>

<div class="qrblk" align="left">
		
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
              <p align="left">4.安装成功后，请点击<input type="button" value="测试" class="flyBT" onclick="myOpen();"/>看能否加载！</li>
            <li>
              <p align="left">无论是网络安装，还是本地安装，本操作都只需要进行一次，</li>
           <li>
              <p align="left">如果您始终看到本界面，请与系统管理员或者寻求技术支持。</li>
          </ul>
       
       <p align="center">
		<input name="init" type="button" class="flyBT" value="返  回" onclick="minormaxview();"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       	<input name="init" type="button" class="flyBT" value="刷  新" onclick="window.location=window.location;">
       	</p>
          </fieldset>

</div>


</body>
</html>