<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"
%><%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp"
%><%@ page import="java.util.*"
%><%
	Random random=new Random();
	request.setAttribute("random",random.nextFloat());
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>视频截图</title>

<script type="text/javascript">

Ext.onReady(function(){
	matech.showWaiting("100%","100%","正在截图，请稍后...");
	setTimeout(refreshPhoto, 6 * 1000);
});

function refreshPhoto(){
	
	matech.stopWaiting();
	
	$("#div_photo").css("display","");
	
	$("#capturePhoto_0").attr('src', src="${movieUrl}${path}/${file0}?random=" + Math.random()); //显示图片
	$("#capturePhoto_1").attr('src', src="${movieUrl}${path}/${file1}?random=" + Math.random()); //显示图片
	$("#capturePhoto_2").attr('src', src="${movieUrl}${path}/${file2}?random=" + Math.random()); //显示图片
	$("#capturePhoto_3").attr('src', src="${movieUrl}${path}/${file3}?random=" + Math.random()); //显示图片
	
}
</script>
<body>
<div id="div_photo" style="display:none">
<table align="center" border="1" cellspacing="0" >
	<tr>
		<td>
			<table align="center" border="1" cellspacing="0" >
				<tr>
					<td>
						<img id="capturePhoto_0" name="capturePhoto" src="" />
					</td>
				</tr>
				<tr>
					<td align="center">
						<input type="button" value="下载图片" class="flyBT" style="height:26px;line-height:20px;" onclick="myPhotowDown('0');"/>
						<input type="button" value="重新加载" class="flyBT" style="height:26px;line-height:20px;" onclick="recapture('0');"/>
					</td>
				</tr>
			</table>
		</td>			
		
		<td>
			<table align="center" border="1" cellspacing="0" >
				<tr>
					<td>
						<img id="capturePhoto_1" name="capturePhoto" src="" />
					</td>
				</tr>
				<tr>
					<td align="center">
						<input type="button" value="下载图片" class="flyBT" style="height:26px;line-height:20px;" onclick="myPhotowDown('1');"/>
						<input type="button" value="重新加载" class="flyBT" style="height:26px;line-height:20px;" onclick="recapture('0');"/>
					</td>
				</tr>
			</table>
		</td>			
	</tr>

	<tr>
		<td>
			<table align="center" border="1" cellspacing="0" >
				<tr>
					<td>
						<img id="capturePhoto_2" name="capturePhoto" src="" />
					</td>
				</tr>
				<tr>
					<td align="center">
						<input type="button" value="下载图片" class="flyBT" style="height:26px;line-height:20px;" onclick="myPhotowDown('2');"/>
						<input type="button" value="重新加载" class="flyBT" style="height:26px;line-height:20px;" onclick="recapture('0');"/>
					</td>
				</tr>
			</table>
		</td>			
		
		<td>
			<table align="center" border="1" cellspacing="0" >
				<tr>
					<td>
						<img id="capturePhoto_3" name="capturePhoto" src="" />
					</td>
				</tr>
				<tr>
					<td align="center">
						<input type="button" value="下载图片" class="flyBT" style="height:26px;line-height:20px;" onclick="myPhotowDown('3');"/>
						<input type="button" value="重新加载" class="flyBT" style="height:26px;line-height:20px;" onclick="recapture('0');"/>
					</td>
				</tr>
			</table>
		</td>			
	</tr>
	<tr>
		<td colspan="2">
			<form name="thisForm" method="post" action="" id="thisForm" >
				<table  cellpadding="0" cellspacing="0" align="center" class="data_tb" style="width:100%;">
					<tr>
						<td class="data_tb_alignright" width="100">视频开始时间：</td>
						<td class="data_tb_content" width="180">【${timeStart}】</td>
						<td class="data_tb_alignright" width="100">视频结束时间：</td>
						<td class="data_tb_content" width="180">【${timeEnd}】</td>
						<td class="data_tb_alignright" width="100">视频持续时间（秒）：</td>
						<td class="data_tb_content" width="50">【${maxSeconds}】</td>	
						<td class="data_tb_alignright" width="100">起始偏移量（秒）：</td>
						<td class="data_tb_content" width="50">【${seekSeconds}】</td>					
					</tr>
					<tr>
						<td class="data_tb_alignright" colspan="2">
							自定义截图起始时间（秒）：
						</td>
						<td class="data_tb_content" colspan="6">
							<input name="startSecond" type="text" id="startSecond" size="20"  maxlength="20" class="required validate-number" />
							<input type="button" value="重新截取" class="flyBT" style="height:26px;line-height:20px;" onclick="capPhoto();"/>
							【备注：截图实际时间=起始偏移量（秒）+自定义截图起始时间（秒）】
						</td>
					</tr>
				</table>
				<input name="uuid" type="hidden" id="uuid" value="${uuid}">
				<input name="muuid" type="hidden" id="muuid" value="${muuid}">
				<input name="seekSeconds" type="hidden" id="seekSeconds" value="${seekSeconds}">
				<input name="recapture" type="hidden" id="recapture" value="1">
			</form>
		</td>
	</tr>
</table>
<br>
</div>
</body>

<script type="text/javascript">
function capPhoto(){
	recapture(1);
}

function recapture(ftype) {
	
	var svalue=$("#startSecond").val();
	
	if(ftype=="0" || svalue==""){
		var curSecond="${startSecond}";
		var nextSecond = parseInt(curSecond)+100;
		$("#startSecond").val(nextSecond);
	}
	
	if (!formSubmitCheck('thisForm')) return;

	document.thisForm.action="${pageContext.request.contextPath}/policeCommon.do?method=moviePhotoList";	
	document.thisForm.submit();

}

function myPhotowDown(obj){
	var t=$("#capturePhoto_"+obj)[0].src;
	DownLoadReportIMG(t);
}


function DownLoadReportIMG(imgPathURL) {  
//如果隐藏IFRAME不存在，则添加  
if (!document.getElementById("IframeReportImg"))  
     $('<iframe style="display:none;" id="IframeReportImg" name="IframeReportImg" onload="DoSaveAsIMG();" width="0" height="0" src="about:blank"></iframe>').appendTo("body");  
	if (document.all.IframeReportImg.src != imgPathURL) {  
	    //加载图片  
	  document.all.IframeReportImg.src = imgPathURL;  
	}else {  
	 //图片直接另存为  
	 DoSaveAsIMG();  
	}  
}  

function DoSaveAsIMG() {  
	if (document.all.IframeReportImg.src != "about:blank"){
		window.frames["IframeReportImg"].document.execCommand("SaveAs");  
	}  
} 
</script>

</html>