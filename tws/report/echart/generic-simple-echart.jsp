<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>${title}</title>
</head>
<body>

<div style="width:100%">
	<div style="width:100%">
		<div id="top" style="overflow:auto;margin:auto;text-align:center;font-weight:bold;font-size:23px;">${title}</div>
	</div>
	<div style="width:100%;height: 480px;overflow: auto;">
		<div id="left" style="width: 90% !important;margin: auto;"></div>
		<div id="right" style="width: 90% !important;margin: auto;"></div>
        <div id="bottom" style="width: 90% !important;margin: auto;"></div>
		<div id="center" style="width: 90% !important;margin: auto;"><div id="div-msg" style="color : rgb(64, 140, 172); font-family: '微软雅黑', 'Arial', 'Verdana', 'sans-serif';"> 正在加载请稍等 </div></div>
	</div>
</div>

</body>

<link href="${pageContext.request.contextPath}/css/echart/echart.css?update=20160315" rel="stylesheet" type="text/css"/>

<script src="${pageContext.request.contextPath}/js/jquery/jquery-1.11.3.min.js?update=20160401"></script>

<script src="${pageContext.request.contextPath}/js/echart/echarts-all.js?update=20160416"></script>
<script src="${pageContext.request.contextPath}/js/echart/adapter/echart-adapter.js?update=20160416"></script>
<script src="${pageContext.request.contextPath}/js/echart/adapter/echart-adapter-itil.js?update=20160909A"></script>

<script src="${pageContext.request.contextPath}/js/itil/util.js?update=20160909"></script>
<script src="${pageContext.request.contextPath}/js/itil/dom.js?update=20160401"></script>


<script>
	var CONTEXTPATH = '${pageContext.request.contextPath}/';
	try {
		var data = '${data}';
		// 换行回车符都先在后台转为其他字符，在 jsp 中的 js 再转回来
		if (data.indexOf('142n857') >= 0){
			data = data.replace(/142n857/g,'\n');
		}
		if (data.indexOf('142r857') >= 0){
			data = data.replace(/142r857/g,'\r');
		}
		if(data.indexOf('\\') >= 0){  //反斜杠转义
			 data = data.replace(/\\/g, '\\\\');
		}
		
		data = Common.init().eval(data);
		//data = Common.eval(data);
		if (data.exception){
			alert("後台异常 " + data.exception + ", " + data.cause);
			throw "後台异常 " + data.exception + ", " + data.cause;
		}
	} catch (e){
		alert("数据获取异常, 有可能数据格式无效");
		throw e;
	}
</script>
<script type="text/javascript">
${reporthtml}
</script>
<script src="${pageContext.request.contextPath}/tws/report/echart/generic-simple-echart.js?update=20160909"></script>
</html>