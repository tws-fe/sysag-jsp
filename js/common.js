var BlockDiv = function() {
	this.show = function(text) {
		
		var blockDiv = document.getElementById("divBlock");

		if (blockDiv) {
			blockDiv.style.display = "";
		} else {
			var div = document.createElement("div");
			document.body.appendChild(div);
			div.id = "divBlock";
			div.style.cssText = "position:absolute;width:100%;height:100%; top:0px; left:0px; z-index:1; padding:0px; margin:0px; background:rgba(96,96,96,0.5);filter:alpha(opacity=30); text-align:center; ";
		}
		if(text && text != "") {
			div.innerHTML = "<span style='margin-top:200px;'><img src='" + MATECH_SYSTEM_WEB_ROOT + "/img/menu/loading.gif'>&nbsp;<font color='#ffffff'><strong>" + text + "</strong><font></span>";
		} else {
			div.innerHTML = "";
		}
	};

	this.hidden = function() { 
		var blockDiv = document.getElementById("divBlock");
		if (blockDiv) {
			try {
				blockDiv.style.display = "none";
				document.body.removeChild(blockDiv);
			}catch(e){}
		}
	};
	
};

// strUrl:要访问的网页的绝对路径，但不带http://127.0.0.1:5199；但自己要带/开头！！！
function myOpenUrl(strUrl){

	try{
	
		// 获得当前窗口的地址和端口先
		// alert("http:\/\/"+window.location.host +strUrl);
		var t,t1;
		
		// 找到主操作界面
		t = window.opener;
		
		if(!t)// 如果是框架页则找它的父窗口
			t = window.parent;
		if (t){
			// alert('被新开窗口');
			t1 = t.window.opener;
			
			if(!t1)// 如果是框架页则找它的父窗口
				t1 = t.window.parent;	
			while (t1){
				t = t1;
				t1 = t.window.opener;
				// alert(t1)
				if(!t1){// 如果是框架页则找它的父窗口
					t1 = t.window.parent;
					if(t1.bottomFrame){
						break;
					}
				}	
			}
		}else{
			// alert('没有被新开窗口');
			t = window;	
		}
		
		// 在主操作界面中找到最上面的那个WINDOW
		t1 = t.parent;
		while (t1 && t1 != t){
			t = t1;
			t1 = t.window.parent;
		}
		
		// 找到最后的那个URL
		if (t){
			t.bottomFrame.myOpenUrl("http:\/\/"+window.location.host + strUrl);
			// t.open(strUrl);
		}
	}catch(e){
		window.open(strUrl);
	}	
	// oframe.OpenURLEx('http://127.0.0.1:5199/AuditSystem/taskCommon.do?method=fileOpen&UNID=239950844228867565&isBack=no&random=0.26142378553784257');
	// parent.bottomFrame.statu.value="exitSystem";
}

function myOpenUrlByWindowOpen(url, target, param) {

	var targetTemp = "_blank";
	var paramTemp = "channelmode=1, resizable=yes,toolbar=no,menubar=no,titlebar=no,scrollbars=yes";

	if (target != "") {
		targetTemp = target;
	}

	if (param != "") {
		paramTemp = param;
	}
	window.open(url, targetTemp, paramTemp);
}

function showWaiting(hight,wight,msg){
  var ShowDialog=1;
	if(msg==null||msg=="") {
		msg = "处理中，请稍等……";
		ShowDialog=0;
	}
  var obj=document.getElementById("waiting");
  if(!obj){
    var oBody = document.body;
  	oBody.insertAdjacentHTML("beforeEnd", "<div id='waiting' onselectstart='return false' ></div>");
    obj=document.getElementById("waiting");
  }

  if(hight==null||hight==""){
    hight="100%";
  }
  if(wight==null||wight==""){
    wight="100%";
  }
  
   var strTalk="";
  if (ShowDialog==0){
  	strTalk="<div id=bxDlg_bg1 oncontextmenu='return false' onselectstart='return false' style=\"position:absolute; width:100%;height:100%; top:expression(this.offsetParent.scrollTop); z-index:9999; padding:10px; background:#ffffff;filter:alpha(opacity=50); text-align:center;\"> </div>"
  			+ "<div style=\"position:absolute;width:230px;height:60px; z-index:2;left:expression((document.body.clientWidth-200)/2);top:expression(this.offsetParent.scrollTop + 130); border:1px solid #666666; padding:20px 40px 20px 40px; background:#E4E4E4; \"> "
    		+ "<img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/img/loading.gif\">"
    		+ msg + "</div>";
  }else{
	  strTalk="<span id=bxDlg_bg align=center oncontextmenu='return false'"
	    +" onselectstart='return false' style='width:"+wight+";height:"+hight+";position:absolute;left:0;top:0'>"
	    +"<div id=bxDlg_bg1 style=height:100%;background:white;filter:alpha(opacity=50)> </div></span>"
	    +"<span  style='background:#E4E4E4;POSITION:absolute;padding:20px 40px 20px 40px;left:150.5;top:164.5;"
	    +" width:400px; height:200px;  border:1px solid #666666;'>"
	    + msg + "</span>";
  }
  obj.innerHTML=strTalk;
  obj.style.display = "" ;
}

function stopWaiting(){
	var obj =  document.getElementById("waiting") ;
	if(obj) {
	    obj.innerHTML="";
	    obj.style.display = "none" ;
    }
}
// -----------------------------------
// 把表单内的input拼成url字符串返回
// -----------------------------------
function formToRequestString(form_obj) {
	var query_string='';
	var and='';
	// alert(form_obj.length);
	for (var i=0;i<form_obj.length ;i++ ) {
		e=form_obj[i];
		if ((e.tagName=='INPUT' || e.tagName=='SELECT' || e.tagName=='TEXTAREA') && e.name!='') {
			if (e.type=='select-one') {
				element_value=e.options[e.selectedIndex].value;
			} else if (e.type=='checkbox' || e.type=='radio') {
				if (e.checked==false) {
					// break;
					continue;
				}
				element_value=e.value;
			} else {
				element_value=e.value;
			}
			query_string+=and+e.name+'='+element_value.replace(/\&/g,"%26");
			and="&";
		}

	}
	return query_string;
}


//创建ajax 请求 (兼容 IE 及非 IE)
function createRequest() {
	var request;
	try {
		request = new XMLHttpRequest();
	} catch (trymicrosoft) {
		try {
			request = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (othermicrosoft) {
			try {
				request = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (failed) {
				request = false;				
			}
		}
	}
	if (!request)
		alert("Error initializing XMLHttpRequest!");
	return request;
}

// 异步
function ajaxLoadPage(url,request,container) {
	var loading_msg='正在加载数据,请稍候...';
	var loader = createRequest();
	loader.open("POST",url,true);
	loader.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	loader.onreadystatechange = function(){
		if (loader.readyState == 1) {
			container.innerHTML=loading_msg;
			try {
				showWaiting("100%","100%");
			} catch(e) {
				alert(e);
			}
		}

		if (loader.readyState == 4) {
			container.innerHTML=loader.responseText;
			try {
				stopWaiting();
			} catch(e) {
				alert(e);
			}
		}
	};

	loader.send(request);
}

//同步
function ajaxLoadPageSynch(url,request) {
	var loader = createRequest();
	loader.open("POST", url, false);
	loader.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	loader.send(request);
	return unescape(loader.responseText);
}


// 页面显示进度
var timer;   
function initMessage(key,time) {
	// 创建一个显示消息的等待框
	var msgBar = document.getElementById("msgBarDiv") ;
	if(!msgBar){
		msgBar = document.createElement("DIV") ;
		msgBar.className = "" ;
		msgBar.id = "msgBarDiv" ;
		msgBar.innerHTML = "<div class=\"msg_background_div\" id=\"bgDiv\"></div><div class=\"msg_info_div\" id=\"infoDiv\"><div class=\"msg_center_div\" id=\"_centerDiv\"><strong>提示：</strong><p>请等待...</p></div></div>" ;
		document.body.appendChild(msgBar) ;
	}else{
		msgBar.style.display = "" ;
	}
	timer = window.setTimeout("startMessageListener('"+key+"','"+time+"')",time); 
}   

//关闭提示
function clearMessage(){
	var msgBarDiv = document.getElementById("msgBarDiv");
	if(msgBarDiv) {
		msgBarDiv.style.display = "none" ;
	}    			   
	window.clearTimeout(timer);
}

var oXmlhttp;   
function startMessageListener(key,time){
	
	if(!oXmlhttp) { 
	    oXmlhttp = createRequest();
	}
	
    oXmlhttp.open("post",MATECH_SYSTEM_WEB_ROOT + "frontProcess.do?method=getMessage&key="+key+"&random="+Math.random(),true);   
     oXmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
     oXmlhttp.onreadystatechange = function(){
        if(oXmlhttp.readyState == 4){   
            if(oXmlhttp.status == 200){
            var msgCenter = document.getElementById("_centerDiv") ;
            var temp = oXmlhttp.responseText.indexOf("end");
            if (  temp > -1 ){
       			var msgBarDiv = document.getElementById("msgBarDiv");
       			if(msgBarDiv) {
       				msgBarDiv.style.display = "none" ;
       			}    			   
            	window.clearTimeout(timer);   
            }else{
            	 msgCenter.innerHTML = ""; 
           		 msgCenter.innerHTML = "<strong>提示：</strong><p>"+oXmlhttp.responseText+"</p>";
            	timer = window.setTimeout("startMessageListener('"+key+"')",time);   
            }   
            }   
        }   
    }
    oXmlhttp.send(null);   
}

// 表单提交post到另外一个新的标签页
function tabSubmit(form,url,tabTitle,parent) {
	var randStr = Math.random();
	try{
		var n = parent.tab.getComponent(id);    
		if (!n) { //判断是否已经打开该面板    
			n = parent.tab.add({    				   
				 title:tabTitle,  
				 closable:true,  //通过html载入目标页    
				 html:'<iframe name="newTab_' + randStr + '" scrolling="auto" frameborder="0" width="100%" height="100%" src=""></iframe>'      
			});    
		} 	
		
		parent.tab.setActiveTab(n);
		
		form.action = url;
		form.target = "newTab_" + randStr;
		form.submit();
	
	}catch(e){
		
		form.action = url;
		form.target = "_blank";
		form.submit();
		//window.open(url);
	}
		
	

}


// 提交表单前的通用检查
function formSubmitCheck(formid){
	var vd = new Ext.matech.form.Validation({formId:formid,tipType:"advice"});
	return vd.validate() ; 
}

// 在TAB里面打开新页面
function openTab(id, title, url, parent, flag, mode) {
	
	var pairs = url.split("&");
	url = pairs[0]; //第一个rl,其它是参数
	
	var myForm = document.createElement("form");
	myForm.action = url ;
	myForm.method="post";
		
	for(var i = 1; i < pairs.length; i++) {	
		var pos = pairs[i].indexOf('='); // 查找 "name=value" 对 
		if (pos == -1) continue; // 若不成对，则跳出循环继续下一对
		var argname = pairs[i].substring(0,pos); // 取参数名 
		var value = pairs[i].substring(pos+1); // 取参数值 
		
		var inputObj = document.createElement("INPUT");
		inputObj.type = "hidden" ;
		inputObj.id = argname ;
		inputObj.name = argname ;
		inputObj.value = value ;
		myForm.appendChild(inputObj);	 
	}
	
	document.body.appendChild(myForm);

	MainIndex = DomUtil.init().getParentObj('MainIndex'); // 找到首頁对象
	if (flag){//直接提交
		myForm.submit();
	} else {
		if(id == "") id = Math.random();
		var randStr = id;//Math.random();
		var n;
		try{	
			n = parent.tab.getComponent(id);    
			if (!n) { //判断是否已经打开该面板    
				n = parent.tab.add({    
					 id: id,    
					 title: title,  
					 closable: true,  //通过html载入目标页    
					 html:'<iframe name="frame' + randStr + '" id="frame'+randStr+'"  frameborder="0" width="100%" height="99%" ></iframe>'      
				});
				n.show();
				
				MainIndex.__window__.jQuery('.x-tab-strip-inner').css('width','auto');	
					
				parent.tab.setActiveTab(n);
				myForm.target = "frame" + randStr; 
				myForm.submit();
				if (mode == undefined || mode == 'close-same-title'){
					var tabitems = parent.tab.items.items;
					for(var i = 1; i < tabitems.length; i++){
						if (tabitems[i].title == title && tabitems[i].id != id){
							parent.tab.remove(i);
						}
					}
				}
				
			}else{
				parent.tab.setActiveTab(n);
			} 	
			
		}catch(e){
			if(n){
				parent.tab.setActiveTab(n);
				myForm.target = "frame" + randStr; 
				myForm.submit();	
			}else{
				myForm.target = "_blank";
				myForm.submit();
			}
			throw e;
		}
	}
}

function openTab2(id,title,url,parent){
	
}

// 检查目录名合法性
function checkFileName(strFile){
	var reg= new RegExp("/^[^/\\:\*\?,\",<>\|]+$/ig"); 

	if(!reg.test(strFile)){
		return " ";
	}else{
		return strFile;
	}
}

// 关闭让前台设置
function notifyManuClose(contextPath,taskId,curProjectId){
	try {
		var oBao = createRequest();
		oBao.open("POST",contextPath+"/taskCommon.do?method=fileClose&taskId=" + taskId+ "&projectId=" + curProjectId, true);
		oBao.send();
	} catch(e) {
		alert(e);
	}
}

// 关闭标签页的方法
var closeTab = function(tab) {
	if(tab && tab.id == "mainFrameTab") {
		tab.remove(tab.getActiveTab()); 
	}else {
		window.close();
	}
}

function openFullWindow(url,target,oldUrl, localUrl) {
	var x = window.open(url,target,'top=0,left=0,width=' + (window.screen.availWidth-8) + ',height=' + (window.screen.availHeight-50) + ',resizable=no,menubar=no,toolbar=no,scrollbars=yes,status=no,location=no');
	try {
		if(!x) {
			alert('对不起,系统的弹出窗口给您的浏览器阻止了\n请【关闭弹窗口阻止程序】或【点击】浏览器上方黄色提示框,选择：总是允许来自此站点的弹出窗口'); 
			if(oldUrl || oldUrl != '') {
				window.location = oldUrl;
			}
			
		} else {
			window.location = localUrl;
		}
	} catch(e) {
		// alert(e);
	}
}

// 检查名称是否唯一
function checkQueryResultName(menuId, queryResultName) {
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=checkQueryResultName";
	var requestString = "menuId=" + menuId
					  + "&queryResultName=" + queryResultName;
					 
	var result = ajaxLoadPageSynch(url, requestString);
	// alert(requestString + "," + result);
	
	if(result == "false") {
		alert("该名称已经存在，请重新输入!!");
		return false;
	} else {
		return true;
	}
}

var queryResultSaveWin = null;
// 保存查询结果
function saveQueryResult(menuId, gridId, formId) {
	var html = "<div style=\"padding:5px;\">"
			 + "查询结果名称：<span class=\"mustSpan\">[*]</span>"
			 + " <input type=\"text\" name=\"queryResultName\" id=\"queryResultName\" class=\"required\" />"
			 + "</div> ";
	
	if(queryResultSaveWin == null) { 
	    queryResultSaveWin = new Ext.Window({
			title: '保存查询结果',
			width: 300,
			height:100, 
			html:html,
	        closeAction:'hide',
	        modal:true,
	        layout:'fit',
		    buttons:[{
	            text:'确定',
	            icon:MATECH_SYSTEM_WEB_ROOT + btn_img_url + 'check.png',
	          	handler:function() {
	          		var queryResultName = document.getElementById("queryResultName").value;
	          		
	          		// 检查名称是否唯一
	          		if(!checkQueryResultName(menuId, queryResultName)) {
	          			return;
	          		}
	          	
	          		if(queryResultName == "") {
	          			alert("请输入查询结果的名称");
	          			return;
	          		} else {
	          			
	          			
	          			var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=saveQueryResult";
						var requestString = "menuId=" + menuId
										  + "&gridId=" + gridId
										  + "&formId=" + formId
										  + "&queryResultName=" + queryResultName;
										 
						var result = ajaxLoadPageSynch(url, requestString);
						
						if(result == "ok") {
							// alert("保存查询结果成功!!");
						} 
						
						queryResultSaveWin.hide();
	          		}
	          	}
	        },{
	            text:'取消',
	            icon:MATECH_SYSTEM_WEB_ROOT + btn_img_url + 'close.png',
	            handler:function(){
	            	queryResultSaveWin.hide();
	            }
	        }]
	    });
	}
	queryResultSaveWin.show();
	
}

// 获取查询结果
function getQueryResult(paramString) {
	var params = paramString.split(",");
	for(var i=0; i < params.length; i++) {
		var keyValue = params[i].split("=");
		
		if(keyValue[1]) {
			document.getElementById(keyValue[0]).value = keyValue[1];
		}
	}
}

// -----------------------------------
// 重置标签里面的所有文本框、复选框、单选框等
// -----------------------------------
function reset(objId) {
	var obj = document.getElementById(objId);
	
	for (i = 0; i < obj.length; i++ ) {
		e = obj[i];
		if ((e.tagName=='INPUT' || e.tagName=='SELECT' || e.tagName=='TEXTAREA') && e.name!='') {
		
			if (e.type=='text') {
				e.value = "";
			}else if (e.type=='select-one') {
				e.value = "";
			} else if (e.type=='checkbox' || e.type=='radio') {
				e.checked = false;
			} else {
				try{
					Ext.getCmp(e.id).clear();
				} catch(e) {
					e.value = "";
				}
			}
		}
	}
}

// 初始化图形
function createChart(url, chartType , chartId, height, width) {
	var chartDiv = document.getElementById("chartDiv_" + chartId);
	var chartXML = document.getElementById("chartXML_" + chartId);
	var chartURL = document.getElementById("chartURL_" + chartId);
	var chartTypeObj = document.getElementById("chartType_" + chartId);

	if(!chartDiv) {
		document.write("<div id=\"chartDiv_" + chartId + "\" align=\"center\"></div>");
		chartDiv = document.getElementById("chartDiv_" + chartId);
	}
	
	if(!chartXML) {
		document.write("<input type=\"hidden\" id=\"chartXML_" + chartId + "\" value=\"\"> ");
		chartXML = document.getElementById("chartXML_" + chartId);
	}
	
	if(!chartURL) {
		document.write("<input type=\"hidden\" id=\"chartURL_" + chartId + "\" value=\"\"> ");
		chartURL = document.getElementById("chartURL_" + chartId);
	}
	
	if(!chartTypeObj) {
		document.write("<input type=\"hidden\" id=\"chartType_" + chartId + "\" value=\"\"> ");
		chartTypeObj = document.getElementById("chartType_" + chartId);
	}
	
	var request = "&chartType=" + chartType;
	strXML = ajaxLoadPageSynch(url, request);
	
	chartURL.value = url;
	chartXML.value = strXML;
   	chartTypeObj.value = chartType;
    
    changeChart(chartType, chartId, height, width);

} 

// 改变图形类型
function changeChart(chartType, chartId, height, width) {
	var chartXML = document.getElementById("chartXML_" + chartId).value;
	var height = height || (document.body.clientHeight-54)/2;
	var width = width || document.body.clientWidth;
	var chart = new FusionCharts(MATECH_SYSTEM_WEB_ROOT + "/charts/" + chartType + ".swf", chartId, width, height);
    chart.addParam("wmode","Opaque");
    chart.setDataXML(chartXML);
    chart.render("chartDiv_" + chartId);
}

// 更新图形数据
function updateChart(url, param, chartId){
	var chartType = document.getElementById("chartType_" + chartId);
	var request = "&chartType=" + chartType + param;
	strXML = ajaxLoadPageSynch(url, request);
	document.getElementById("chartXML_" + chartId).value = strXML;

	updateChartXML(chartId, strXML); 
}

function getUUID() {
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=getUUID";
	var result = ajaxLoadPageSynch(url, null);
	
	if(result == "") {
		result = Math.random();
	}
	
	return result;
}

var attachUploadWin = null;
var attachUploadForm = null;
// 上传附件
function attachUpload(inputId, mode, imgId, param) {

	count=1;
	var inputObj = document.getElementById(inputId);
	
	var indexTable = inputObj.getAttribute("indexTable");
	var indexId = inputObj.value;
	var uploadExtType= inputObj.getAttribute("ext_filetype")||"";
	var foreignid ="";
	try{
		foreignid = document.getElementById("uuid").value ;
	} catch (e){
		foreignid = "" ;
	}
	
	foreignid = foreignid || "" ;
	mode = mode || "";
	param = param || {};
	param.window = window;
	param.inputId = inputId;
	param.mode = mode || "";
	param.imgId = imgId || "";
	param.notify_interval = param.notify_interval || 750;
	if(!checkMaxAttach(inputId)) {
		return;
	}
	
	var url = MATECH_SYSTEM_WEB_ROOT + '/common.do?method=attachUpload&foreignid='+foreignid+'&indexTable=' + indexTable + "&indexId=" + indexId + "&mode=" + mode + "&policy=" + param.policy;

	if(!Ext.isIE6 && !Ext.isIE7 && !Ext.isIE8){
		var testval = "0";
		if(param.onupdated=="undefined" || param.onupdated=='' || param.onupdated==null){
			testval = "1";
		}		
		var _fileTypes="*.*";
		if(uploadExtType!=""){
			extTypes=uploadExtType.split("|");
			for(var _index=0;_index<extTypes.length;_index++){
				if(_index==0){
					_fileTypes="*."+extTypes[_index];
				}else{
					_fileTypes=_fileTypes+";*."+extTypes[_index];
				}
			}
		}
		attachUploadWin = new Ext.Window({
			width : 500,
			title : '文件上传',
			height : 300,
			layout : 'fit',
			items : [
				{
					xtype:'uploadPanel',
					border : false,
					uploadUrl : url,
					postParams : {
						'inputId' : inputId,
						'mode' : mode || "",
						'imgId' : imgId || "",
						'xmparam' : testval
					},
					flashUrl : MATECH_SYSTEM_WEB_ROOT + '/js/attach/swfupload.swf',			
					//filePostName : 'file', //后台接收参数
					fileTypes :_fileTypes//可上传文件类型
					//postParams : {savePath:'upload\\'} //上传文件存放目录
				}
			]
		}).show();;
	}else{
		//IE6|IE7|IE8
		
		var _fileTypes=[];
		if(uploadExtType!=""){
			_fileTypes=uploadExtType.split("|");
		}
		
		attachUploadWin = new Ext.ux.UploadDialog.Dialog({ 
			title: '文件上传' , 
			url:url , //这里我用struts2做后台处理
			post_var_name: param,//这里是自己定义的，默认的名字叫file
			width : 450, 
			height : 300, 
			minWidth : 450, 
			minHeight : 300, 
			draggable : true , 
			resizable : true , 
			//autoCreate: true,    
			constraintoviewport: true , 
			permitted_extensions:_fileTypes,    //[ 'JPG' , 'jpg' , 'jpeg' , 'JPEG' , 'GIF' , 'gif' , 'png' , 'PNG' ]
			modal: true , 
			reset_on_hide: false , 
			allow_close_on_upload: false ,    //关闭上传窗口是否仍然上传文件 
			//           upload_autostart: true     //是否自动上传文件 
			upload_autostart: false
		}); 

		attachUploadWin.show(); //'show-button' 
		//attachUploadWin.on( 'uploadsuccess' , onUploadSuccess); //定义上传成功回调函数
		//attachUploadWin.on( 'uploadfailed' , onUploadFailed); //定义上传失败回调函数
		//attachUploadWin.on( 'uploaderror' , onUploadFailed); //定义上传出错回调函数
		attachUploadWin.on( 'uploadcomplete' , onUploadComplete); //定义上传完成回调函数
	}
}

//=======================================================================================================
//文件上传完成后的回调函数
onUploadComplete = function(dialog){
	var param = dialog.post_var_name;
	var inputId = param["inputId"]; 
	var mode = param["mode"] || ""; 
	var imgId = param["imgId"] || ""; 
	
	try{
		var inputObj = document.getElementById(inputId);
		var oncallback=inputObj.getAttribute("ext_oncallback");
		var oncallbackstatus=0;
		if(oncallback && oncallback!=""){
			eval("oncallbackstatus="+oncallback+"('"+inputId+"')");
			if(oncallbackstatus=="1"){
				//关闭窗口		
				try{attachUploadWin.close();}catch(e){}	
				return;
			}
		}
	}catch(e){}
	
	
	if(mode == "single"){
		attachImageInit(inputId,imgId);	//刷新图片
	}else if(mode == "grid"){
		eval("goSearch_"+imgId+"()");
		eval("try{refreshTree();}catch(e){}");
		eval("try{parent.refreshTree();}catch(e){}");
	}else{
		attachInit(inputId,param.onupdated);
	}
	//关闭窗口		
	try{attachUploadWin.close();}catch(e){}			
			
}
//=======================================================================================================
	
// 格式化数字
function formatDecimal(x,maxLength) {
   var f_x = parseFloat(x);
   if (isNaN(f_x)) {
      return x;
   }
   var f_x = Math.round(x*100)/100;
   var s_x = f_x.toString();
   var pos_decimal = s_x.indexOf('.');
   if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += '.';
   }
   while (s_x.length <= pos_decimal + maxLength) {
      s_x += '0';
   }
   return s_x;
}

// 截取字符最大长度
function maxString(str) {
	if(str.length > 25) {
		str = str.substring(0,22) + "...";
	} 
	
	return str;
}

//获取文件后缀名
function getFileExt(filepath) {
	if (filepath != "") {
		var pos = filepath.replace(/.+\./, "").toLowerCase();
		return pos;
	}
}


// 检查最大附件数
function checkMaxAttach(inputId) {
	var inputObj = document.getElementById(inputId);
	var maxAttach = inputObj.getAttribute("maxAttach") || 0;
	
	if(maxAttach != 0 && getAttachCount(inputId) >= maxAttach) {
		alert("对不起，只允许上传" + maxAttach + "个文件,请先删除后再上传!");
		return false;
	} else {
		return true;
	}
}

// 获取附件数量
function getAttachCount(inputId) {
	var inputObj = document.getElementById(inputId);
	var prefix = inputObj.id;
	var attachUlId = "attachUl_" + prefix; 
	
	return document.getElementById(attachUlId).children.length;
}

//显示附件图片
var setBigImageWin = null;
function attachBigImage(attachId){
		
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachDownload&attachId=" + attachId;
	
	if(!setBigImageWin) { 
	    setBigImageWin = new Ext.Window({
	     	renderTo : Ext.getBody(),
	     	width: 700,
	     	id:'setBigImageWin',
	     	height:500,
	     	title:'图形',
	     	closable:'false',
	     	autoScroll:true,
        	closeAction:'hide',
        	maximizable: true,
       	    listeners : {
	         	'hide':{
	         		fn: function () {
	         			new BlockDiv().hidden();
						setBigImageWin.hide();
					}
				}
	        },
	       	html:"<p style='text-align:center'><img id='_bigImage'  src ='"+url+"' width='100%' height='100%'/></p>",
        	layout:'fit'
	    });
    } else {
    	document.getElementById("_bigImage").src = url;
    }
	
	new BlockDiv().show();
 	setBigImageWin.show(); 
 			
}

//多内容输入框
var setInputBoxWin = null;
var inputObj ;
var __setInputBoxInitMap__ = {}; // 記錄輸入框值是否被打开保存过
function setInputBox(obj,userName){
	inputObj = obj;
	var obj1 = document.getElementById("_" + inputObj.id + "_1"); //用于保存输入框的值
	var obj2 = document.getElementById("_" + inputObj.id + "_2"); //用于保存增加的内容
	var _temp_advice = document.getElementById("_temp_advice");
	//document.getElementById("_temp_advice").focus();//光标
	if (!__setInputBoxInitMap__[inputObj.id]){
		__setInputBoxInitMap__[inputObj.id] = obj1;
		obj1.value = inputObj.value;
	}
	
	var content = inputObj.value;
	var arraycontent = content.split("\n----------------------");
	var end = "";
	var editcontent = "";
	if(arraycontent.length>1){
		end = arraycontent[arraycontent.length-2];
		
	}
		var contenttitle;
		var edituser ;
		if(end.length>0){	
			contenttitle = end.split("][");
		
			if(contenttitle.length>0){
				
				edituser = contenttitle[0].replace("[","");
				edituser = edituser.replace("\n","");
			}
			
			if(edituser.indexOf(userName)!=-1){
				contenttitle = contenttitle[1].split("]");
				editcontent = contenttitle[1];
				
				var oldcontent="";
				for(var i=0;i<arraycontent.length-2;i++){
					oldcontent =oldcontent+ arraycontent[i]+"\n----------------------";
					
				}
				obj1.value = oldcontent;
				obj2.value =editcontent
				
			}
		}
	

	if(!setInputBoxWin) { 
	    setInputBoxWin = new Ext.Window({
	     	renderTo : Ext.getBody(),
	     	width: 400,
	     	id:'setInputBoxWin',
	     	height:230,
	     	title:'多内容输入框',
	     	closable:'false',
	     	autoScroll:true,
        	closeAction:'hide',
       	    listeners : {
	         	'hide':{
	         		fn: function () {
	         			new BlockDiv().hidden();
						setInputBoxWin.hide();
					}
				},
				 "show": function() {
					 setInterval("document.getElementById('_temp_advice').focus()",100);//聚焦
					 //alert(123);
				 }
	    
	        },
	       	html:'<textarea id="_temp_advice" autofocus="autofocus" name="_temp_advice" cols="60" rows="8"></textarea>',
        	layout:'fit',
			buttons: [{
	            text: '确定',
	            icon:MATECH_SYSTEM_WEB_ROOT + btn_img_url + 'check.png',
	            handler:  function(){
	            		var _temp_advice = document.getElementById("_temp_advice");
		                var obj1 = document.getElementById("_" + inputObj.id + "_1");
		                var obj2 = document.getElementById("_" + inputObj.id + "_2");
		                var time = TimeUtil.init().format_date(new Date());
		                
		                obj2.value = _temp_advice.value;
		                	                
		                var txt = "["+userName+"]["+time+"]\n";
		                txt += _temp_advice.value + "\n";
		                txt += "----------------------\n";
		                if(_temp_advice.value!=""){
			                if (/*inputObj.value == "" */obj1.value == ""){
			                	inputObj.value = txt;
			                }else{	 	
			                	inputObj.value = obj1.value + "\n" + txt;
			                	//inputObj.value = inputObj.value +"\n" + txt;
			                } 
		                }else{
		                	inputObj.value = obj1.value ;
		                }
		                setInputBoxWin.hide();	
		                
		                autoHeight(inputObj);
		                if (funExists("setInputBox_after")) {
		                	setInputBox_after(inputObj);
		            	}
	                }
	            
	        },{
	            text: '重置',
	            icon:MATECH_SYSTEM_WEB_ROOT + btn_img_url + 'refresh.png',
	            handler: function(){
	                document.getElementById("_temp_advice").value = "";
	            }
	       	},{
	       		text: '取消',
	       		icon:MATECH_SYSTEM_WEB_ROOT + btn_img_url + 'close.png',
	       		handler: function(){
	       			setInputBoxWin.hide();
	       		}
	       	}]
       	        	
	    });
    }
    
    var obj2 = document.getElementById("_" + inputObj.id + "_2");
    obj2.value = editcontent;
	document.getElementById("_temp_advice").value = obj2.value;
	new BlockDiv().show();
 	setInputBoxWin.show(); 	
}

//多内容输入框如果当前人为最后填写的输入多内容输入框，则默认加载输入的值，document.getElementById("_" + inputObj.id + "_2");

function setLastInput(obj,userName){
	inputObj = obj;
	var content = inputObj.value;
	var arraycontent = content.split("\n----------------------");
	var end = "";
	var editcontent = "";
	if(arraycontent.length>1){
		end = arraycontent[arraycontent.length-2];
		
	}
		var contenttitle;
		var edituser ;
		if(end.length>0){	
			contenttitle = end.split("][");
		
			if(contenttitle.length>0){
				
				edituser = contenttitle[0].replace("[","");
				edituser = edituser.replace("\n","");
			}
			
			if(edituser.indexOf(userName)!=-1){
				contenttitle = contenttitle[1].split("]");
				editcontent = contenttitle[1];
				
				
				
			}
			
			
		}
		var obj2 = document.getElementById("_" + inputObj.id + "_2");
	    obj2.value = editcontent;
	
}

/*
function attachImageInit(inputId) {
	var inputObj = document.getElementById(inputId);
	//alert(imgId);
	// 按钮文字,默认为添加附件
	var buttonText = inputObj.getAttribute("buttonText") || "添加图片";
	
	var showButton = true;
	var remove = true;
	
	if(inputObj.readOnly) {
		showButton = false;
		remove = false;
	}
	
	width = inputObj.getAttribute("imgWidth");
	height = inputObj.getAttribute("imgHeight");
	if(!width || width == "") width = 100;
	if(!height || height == "") height = 100;
	
	//不再单独控制，通过只读来设置
	//
	// 是否显示上传按钮,默认为true
	//var showButton = inputObj.showButton == false ? false : true;
	// 是否允许删除,默认为true
	//var remove = inputObj.remove == false ? false : true;
	
	var indexTable = inputObj.getAttribute("indexTable")||inputObj.getAttribute("indextable");
	
	if(inputObj.value == "") {
		inputObj.value = getUUID();
	}
	
	var indexId = inputObj.value;
	var prefix = inputObj.id;
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=getAttachList";
	var request = "indexTable=" + indexTable + "&indexId=" + indexId;
	
	var result = ajaxLoadPageSynch(url, request);
	//alert(result);
	var attachList = Ext.util.JSON.decode(result);
	
	var html = "";
	var src = "";
	if(attachList.length>0){
		src = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachDownload&attachId=" + attachList[0].attachId;
		//document.getElementById(imgId).src=src;
	}

	var attachUlId = "attachUl_" + prefix; 
	var attachButtonId = "attachButton_" + prefix;
	var attachDivId = "attachDiv_" + prefix;
	
	var ul = document.getElementById(attachUlId);
	if(ul == null || !ul) {
		
		var divObj = mycreateElement("<div id=\"" + attachDivId + "\"></div>","div",attachDivId);
					
		divObj = inputObj.parentElement.insertBefore(divObj, inputObj);
		
		
	//	var buttonDiv = mycreateElement("<div id=\"" + attachButtonId +"\"></div>","div",attachButtonId);
	//	ul = mycreateElement("<img id=\"" + attachUlId + "\"  ></img>","img",attachUlId);
	//	ul.onload = function(){
	//		AutoResizeImage(width, height , this);
	//	};
		
	//	divObj.appendChild(buttonDiv);
	//	divObj.appendChild(ul);
		
		$("<div id=\"" + attachButtonId +"\"></div>").appendTo(divObj);
		$("<img id=\"" + attachUlId + "\" src=\"" + src + "\" onload=\"AutoResizeImage('"+width+"','"+height+"',this);\"></img>").appendTo(divObj);
		
	}else{
		ul.src=src;
	}
	
	// 是否显示按钮
	if(showButton) {
		var attachButton = document.getElementById(attachButtonId);
		if(inputObj.readOnly==true){
			attachButton.innerHTML = "<input type=\"button\" class=\"flyBT\" value=\"" + buttonText + "\" onclick=\"attachUpload('" + inputId + "','single','"+attachUlId+"')\"  disabled=\"disabled\" ><br/><br/>";
		}else{
			attachButton.innerHTML = "<input type=\"button\" class=\"flyBT\" value=\"" + buttonText + "\" onclick=\"attachUpload('" + inputId + "','single','"+attachUlId+"')\" ><br/><br/>";
		}
		
	}
}
*/

function attachImageInit(inputId) {
	var inputObj = document.getElementById(inputId);
	var buttonText = inputObj.getAttribute("buttonText") || "添加图片";
	var showButton = true;
	var remove = true;
	var showDownload=true;
	
	var onclick=inputObj.getAttribute("ext_onclick");
	
	if(inputObj.readOnly) {
		showButton = false;
		remove = false;
		showDownload=false;
	}
	var isdownload=inputObj.getAttribute("showDownload");
	if(isdownload){
		showDownload=true;
	}
	
	width = inputObj.getAttribute("imgWidth");
	height = inputObj.getAttribute("imgHeight");
	if(!width || width == "") width = 100;
	if(!height || height == "") height = 100;
	var indexTable = inputObj.getAttribute("indexTable")||inputObj.getAttribute("indextable");
	
	if(inputObj.value == "") {
		inputObj.value = getUUID();
	}
	var indexId = inputObj.value;
	var prefix = inputObj.id;
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=getAttachList";
	var request = "indexTable=" + indexTable + "&indexId=" + indexId;
	
	var result = ajaxLoadPageSynch(url, request);
	
	var attachList = Ext.util.JSON.decode(result);	
		
	var attachUlId = "attachUl_" + prefix; 
	var attachButtonId = "attachButton_" + prefix;
	var attachDivId = "attachDiv_" + prefix;
	
	var html = "";

	for(var i=0; i < attachList.length; i++) {
		var attach = attachList[i];	
		
		if(onclick){
			html += "<li style='float:left'>"
				  + "<span>"   
				  + "<img src= " + MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachDownload&attachId=" + attach.attachId + " onclick="+onclick+"('"+prefix+"'); onload=AutoResizeImage('"+width+"','"+height+"',this); style='width:"+width+"px;height:"+height+"px;'></img>"
				  + "</span>&nbsp;&nbsp;&nbsp;&nbsp;<br/>";				
		}else{
			html += "<li style='float:left'>"
				  + "<span>"   
				  + "<img src= " + MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachDownload&attachId=" + attach.attachId + " onclick=attachBigImage('"+attach.attachId+"'); onload=AutoResizeImage('"+width+"','"+height+"',this); style='width:"+width+"px;height:"+height+"px;'></img>"
				  + "</span>&nbsp;&nbsp;&nbsp;&nbsp;<br/>";				
		}
		if(showDownload){
			html += "<a href=\"" + MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachDownload&attachId=" + attach.attachId + "\" title=\"下载：" + attach.attachName + "\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/img/menu/download16.png\"></a>";
		}
		
		if(remove) {
			html += "<a href=\"#\" id=\""+inputId+"-del"+i+"\" name=\""+inputId+"-del\"  onclick=\"attachRemove('" + attach.attachId + "','" + inputId + "','single');\" title=\"删除\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/img/menu/delete.png\"></a>";
		}
		
		html += "</li>";
	}

	var ul = document.getElementById(attachUlId);
	if(ul == null || !ul) {
		
		var divObj = mycreateElement("<div id=\"" + attachDivId + "\"></div>","div",attachDivId);			
		divObj = inputObj.parentElement.insertBefore(divObj, inputObj);
		
		var buttonDiv = mycreateElement("<div id=\"" + attachButtonId +"\"></div>","div",attachButtonId);
		ul = mycreateElement("<ul id=\"" + attachUlId + "\"></ul>","ul",attachUlId);
		
		divObj.appendChild(buttonDiv);
		divObj.appendChild(ul);
	}	
	ul.innerHTML = html;
	// 是否显示按钮
	if(showButton) {
		var attachButton = document.getElementById(attachButtonId);
		if(inputObj.readOnly==true){
			attachButton.innerHTML = "<input type=\"button\" class=\"flyBT\" value=\"" + buttonText + "\" onclick=\"attachUpload('" + inputId + "','single','"+attachUlId+"')\"  disabled=\"disabled\" ><br/>";
		}else{
			attachButton.innerHTML = "<input type=\"button\" class=\"flyBT\" value=\"" + buttonText + "\" onclick=\"attachUpload('" + inputId + "','single','"+attachUlId+"')\" ><br/>";
		}
		
	}
}

//增加图标
var _setIconWin = null;
var iconObj;
function setIconInit(inputId) {
	var inputObj = document.getElementById(inputId);
	iconObj = inputObj;
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=iconJson";
	var request = "";
	var result = ajaxLoadPageSynch(url, request);
	var iconList = Ext.util.JSON.decode(result);	
	
	var html = '<div id="menuImg1" icon="icon-save" title="图标" style="padding:2px;width:650px;height:400px;">';
	for(var i = 0;i<iconList.length;i++){
		var icon = iconList[i];
		var checked = "";
		if(inputObj && inputObj.value == icon.value){
			checked = "checked";
		}
		html += '<div style="width:70px;height:40px;float:left">';
		html += '<input type="radio" id="'+icon.id+'" name="_icons" value="'+icon.value+'" path="'+icon.path+'" '+checked+' class="hand" />';
		html += '<img style="margin-right:10px;vertical-align:middle" src="'+MATECH_SYSTEM_WEB_ROOT + icon.path + icon.value + '"/ >';
		html += '</div>';
	}
	html += '</div>';
	
	if(!_setIconWin) { 
		_setIconWin = new Ext.Window({
	     	renderTo : Ext.getBody(),
	     	width: 650,
	     	id:'_setIconWin',
	     	height:400,
	     	title:'图标',
	     	closable:'false',
	     	autoScroll:true,
        	closeAction:'hide',
        	modal:true,
       	    listeners : {
	         	'hide':{
	         		fn: function () {	         			
	         			_setIconWin.hide();
					}
				}
	        },
	       	html:html,
        	layout:'fit',
			buttons: [{
	            text: '确定',
	            icon:MATECH_SYSTEM_WEB_ROOT + btn_img_url + 'check.png',
	            handler:  function(){
	            	var _icons = document.getElementsByName("_icons");
	            	var v ='', p = '';
	            	for(var i=0;i<_icons.length;i++){
	            		if(_icons[i].checked){
	            			v = _icons[i].value; 
	            			p = _icons[i].getAttribute("path");
	            			break;
	            		}
	            	}

	            	if(iconObj){
	            		iconObj.value = v;	
						var imgObj = document.getElementById("_"+iconObj.id);
						imgObj.src = MATECH_SYSTEM_WEB_ROOT +"/img/menuIcon/s_" + v;
						_setIconWin.hide();
	            	}
	            }
	        },{
	       		text: '取消',
	       		icon:MATECH_SYSTEM_WEB_ROOT + btn_img_url + 'close.png',
	       		handler: function(){
	       			_setIconWin.hide();
	       		}
	       	}]
       	        	
	    });
	}
	
	_setIconWin.show(); 	   	
}

if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment)
{
     Range.prototype.createContextualFragment = function(html)
     {
         var frag = document.createDocumentFragment(),  
         div = document.createElement("div");
         frag.appendChild(div);
         div.outerHTML = html;
         return frag;
     };
}


function mycreateElement(html,objtype,id){
	try{  
		return document.createElement(html);
	}catch(e){
		//ie9以上版本
		var new_name_item = document.createElement(objtype);  
        new_name_item.id = id;  
		return new_name_item;
	}
	
	
}

//绑定在Grid上的上传附件
function attachGridInit(inputId,gridId) {
	
	var inputObj = document.getElementById(inputId);
	//alert(imgId);
	// 按钮文字,默认为添加附件
	var buttonText = inputObj.getAttribute("buttonText") || "添加附件";
	
	var showButton = true;
	var remove = true;
	
	if(inputObj.readOnly) {
		alert("inputObj.readOnly:"+inputObj.readOnly);
		showButton = false;
		remove = false;
	}
	if(inputObj["attachFile"]=="true"){
		alert("inputObj:true");
		showButton = true;
		remove = true;
	}
	
	
	var indexTable = inputObj.getAttribute("indexTable")||inputObj.getAttribute("indextable");
	
	if(inputObj.value == "") {
		inputObj.value = getUUID();
	}
	
	var indexId = inputObj.value;
	var prefix = inputObj.id;
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=getAttachList";
	var request = "indexTable=" + indexTable + "&indexId=" + indexId;
	
	var result = ajaxLoadPageSynch(url, request);
	//alert(result);
	var attachList = Ext.util.JSON.decode(result);
	alert("Ext.util.JSON.decode");
	if(attachList.length>0){
		//刷新grid
		eval("goSearch_"+gridId+"();");
		eval("try{parent.refreshTree();}catch(e){}");
		alert("attachList.length>0");
	}
		
	var attachButtonId = "attachButton_" + prefix;
	var attachDivId = "attachDiv_" + prefix;
	
	var buttonDiv = document.getElementById(attachButtonId);
	if(buttonDiv == null || !buttonDiv) {
		var divObj = document.createElement("<div id=\"" + attachDivId + "\"></div>");
					
		divObj = inputObj.parentElement.insertBefore(divObj);
		
		buttonDiv = document.createElement("<div id=\"" + attachButtonId +"\"></div>");
		
		divObj.appendChild(buttonDiv);
	}

	
	// 是否显示按钮
	if(showButton) {
		var attachButton = document.getElementById(attachButtonId);
		attachButton.innerHTML = "<input type=\"button\" class=\"flyBT\" value=\"" + buttonText + "\" onclick=\"attachUpload('" + inputId + "','grid','"+gridId+"')\" ><br/><br/>";
	}	
}

//修改附件按钮的属性
function updateAttachProperty(inputId) {
	var inputObj = document.getElementById(inputId);	
	var inputDels = document.getElementsByName(inputId + "-del");
	var inputEdit = document.getElementsByName(inputId + "-edit");
	var inputBtn = document.getElementById(inputId + "-btn");	
	if(inputObj.readOnly) {
		inputBtn.disabled = true;
		inputBtn.style.display = "none";
		for(var i=0;i<inputDels.length;i++){
			inputDels[i].style.display = "none";
			inputEdit[i].style.display = "none";
		}
	}else{
		inputBtn.disabled = false;
		inputBtn.style.display = "";
		for(var i=0;i<inputDels.length;i++){
			inputDels[i].style.display = "";
			inputEdit[i].style.display = "";
		}				
	}
}

function attachInit(inputId, param) {
	param = param || {};
	var inputObj = document.getElementById(inputId);
	// 按钮文字,默认为添加附件
	var buttonText = inputObj.getAttribute("buttonText") || inputObj.getAttribute("buttontext");
	buttonText = buttonText || "添加附件";
	var bshowButton = inputObj.getAttribute("showButton");
	var bshowEdit = inputObj.getAttribute("showEdit");
	var showButton = true;
	var remove = true;
	var _edit=true;
	
	if(bshowButton){
		showButton = (bshowButton == "true");
	}
	if(bshowEdit){
		_edit = (bshowEdit == "true");
	}
	
	if(inputObj.readOnly) {
		showButton = false;
		remove = false;
		_edit=false;
	}
	
	
	//showDataGrid = true;
	/*
	if(inputObj["attachFile"]=="true"){
		showButton = true;
		remove = true;
	}
	*/
	
	//不再单独控制，通过只读来设置
	//
	// 是否显示上传按钮,默认为true
	//var showButton = inputObj.showButton == false ? false : true;
	// 是否允许删除,默认为true
	//var remove = inputObj.remove == false ? false : true;
	
	var indexTable = inputObj.getAttribute("indexTable") || inputObj.getAttribute("indextable");
	if (!indexTable){
		indexTable = "";
	}
	
	if (inputObj.value == "") {
		inputObj.value = getUUID();
	}
	var indexId = inputObj.value;
	var prefix = inputObj.id;
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=getAttachList";
	var request = "indexTable=" + indexTable + "&indexId=" + indexId;
	
	var result = ajaxLoadPageSynch(url, request);
	var attachList = Ext.util.JSON.decode(result);
	var html = "";
	html = "<input type=hidden id='attachListLength_"+prefix+"' name='attachListLength_"+prefix+"' value='"+attachList.length+"' />";
	
	for(var i=0; i < attachList.length; i++) {
		var attach = attachList[i];
		
		var curFileNameExt=getFileExt(attach.attachName);
	
		//alert(SYSTEM_USE_OCX_OPEN_ATTACH);
		//SYSTEM_USE_OCX_OPEN_ATTACH 定制在include.jsp中，取值源自 s_config表；
		if('pdf'==curFileNameExt && SYSTEM_USE_OCX_OPEN_ATTACH && SYSTEM_USE_OCX_OPEN_ATTACH=='true'){
			//直接打开PDF
			html += "<li>"
			  + "<span>"
			  + "<a class='aAtt' href=\"#\" onclick=\"window.open('" + MATECH_SYSTEM_WEB_ROOT + "sys/common/attachPdf.jsp?attachId=" + attach.attachId + "');\" title=\"在线打开：" + attach.attachName + "\">" + maxString(attach.attachName) + "</a>"
			  + "&nbsp;<font style=\"color:#AAAAAA;\">" + formatDecimal((attach.fileSize/1024),2) + " KB</font>"
			  + "</span>";
		}else if (('xls'==curFileNameExt
				||'xlsm'==curFileNameExt
				||'xlsx'==curFileNameExt
				||'doc'==curFileNameExt
				||'docm'==curFileNameExt
				||'docx'==curFileNameExt
				) && SYSTEM_USE_OCX_OPEN_ATTACH && SYSTEM_USE_OCX_OPEN_ATTACH=='true'
				){
			//直接打开excel等office
			
			//这个是在网页里面嵌入打开
			html += "<li>"
			  + "<span>"
			  + "<a class='aAtt' href=\"#\" onclick=\"window.open('" + MATECH_SYSTEM_WEB_ROOT + "sys/common/attachOffice.jsp?attachId=" + attach.attachId + "&attachType=" + curFileNameExt + "');\" title=\"在线打开：" + attach.attachName + "\">" + maxString(attach.attachName) + "</a>"
			  + "&nbsp;<font style=\"color:#AAAAAA;\">" + formatDecimal((attach.fileSize/1024),2) + " KB</font>"
			  + "</span>";
			
			/*
			//这个是点击以后直接打开OFFICE
			html += "<li>"
			  + "<span>"
			  + "<a class='aAtt' href=\"#\" onclick=\"attachOpen('" + attach.attachId + "','" + curFileNameExt + "');\" title=\"在线打开：" + attach.attachName + "\">" + maxString(attach.attachName) + "</a>"
			  + "&nbsp;<font style=\"color:#AAAAAA;\">" + formatDecimal((attach.fileSize/1024),2) + " KB</font>"
			  + "</span>";
			*/
			
		}else{
			html += "<li>"
			  + "<span>"
			  + "<a class='aAtt' href=\"" + MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachDownload&attachId=" + attach.attachId + "\" title=\"下载：" + attach.attachName + "\">" + maxString(attach.attachName) + "</a>"
			  + "&nbsp;<font style=\"color:#AAAAAA;\">" + formatDecimal((attach.fileSize/1024),2) + " KB</font>"
			  + "</span>";
		}
		
		//有权下载才下载
		var oo=false;
		try{
			var referdownload=inputObj.getAttribute("referdownload");
			if (referdownload && referdownload>''){
				if(document.getElementById(referdownload).value>0){
					oo=true;
				}
			}
		}catch(e){};
		if(!inputObj.readOnly || oo ){
			html += "&nbsp;<a href=\"" + MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachDownload&attachId=" + attach.attachId + "\" title=\"下载：" + attach.attachName + "\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/img/menu/download16.png\"></a>";
			if(_edit){
				html += "&nbsp;<a href=\"#\" id=\""+inputId+"-edit"+i+"\" name=\""+inputId+"-edit\"  onclick=\"attachUpdate('" + attach.attachId + "','" + inputId + "');\" title=\"修改\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/img/menu/edit.png\"></a>";		
			}
		}
		
		if(remove) {
			html += "&nbsp;<a href=\"#\" id=\""+inputId+"-del"+i+"\" name=\""+inputId+"-del\"  onclick=\"attachRemove('" + attach.attachId + "','" + inputId + "','','"+attach.attachName+"');\" title=\"删除\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/img/menu/delete.png\"></a>";
		}
		
		html += "</li>";
		
		
		try{
			param(attach);			
		}catch(e){}
	}
	var attachUlId = "attachUl_" + prefix; 
	var attachButtonId = "attachButton_" + prefix;
	var attachDivId = "attachDiv_" + prefix;
	
	var ul = document.getElementById(attachUlId);
	if(ul == null || !ul) {
		var divObj = mycreateElement("<div id=\"" + attachDivId + "\"></div>","div",attachDivId);
					
		divObj = inputObj.parentElement.insertBefore(divObj, inputObj);
		
		var buttonDiv = mycreateElement("<div id=\"" + attachButtonId +"\"></div>","div",attachButtonId);
		ul = mycreateElement("<ul id=\"" + attachUlId + "\"></ul>","ul",attachUlId);
		
		divObj.appendChild(buttonDiv);
		divObj.appendChild(ul);
	}

	ul.innerHTML = html;
	// 是否显示按钮
	if(showButton && $('#' + attachButtonId).find('.flyBT').length == 0) {
		// var attachButton = document.getElementById(attachButtonId);
		var buttonHtml = '';
		if(inputObj.readOnly == true){
			// buttonHtml = "<input type=\"button\" id=\""+inputId+"-btn\" class=\"flyBT\" value=\"" + buttonText + "\" onclick=\"attachUpload('" + inputId + "')\" disabled=\"disabled\" /><br/><br/>";
			buttonHtml = "<input type=\"button\" id=\""+inputId+"-btn\" class=\"flyBT\" value=\"" + buttonText + "\"  disabled=\"disabled\" /><br/><br/>";
		}else{
			// buttonHtml = "<input type=\"button\" id=\""+inputId+"-btn\" class=\"flyBT\" value=\"" + buttonText + "\" onclick=\"attachUpload('" + inputId + "')\"  /><br/><br/>";
			buttonHtml = "<input type=\"button\" id=\""+inputId+"-btn\" class=\"flyBT\" value=\"" + buttonText + "\"   /><br/><br/>";
		}
		// attachButton.innerHTML = buttonHtml;
		var attachButton = $(buttonHtml).appendTo('#' + attachButtonId);
		attachButton[0].onclick = function(){
			attachUpload.call(param, inputId, param.mode, param.imgId, param);
		};
	}
}

function attachOpen(attachId,curFileNameExt){
		
	var ocxresult = ajaxLoadPageSynch(MATECH_SYSTEM_WEB_ROOT + "sys/common/attachOfficeOut.jsp", "attachId=" + attachId + "&attachType=" + curFileNameExt);	
	eval(ocxresult);
	
}

// 删除附件
function attachRemove(attachId, inputId,single,attachName) {
	var str = "";
	if(attachName){
		str = "是否确认要删除【"+attachName+"】附件？";								
	}else{
		str = "是否确认要删除该附件？";	
	}
	if(!confirm(str,"提示")){
		return;
	}
		
	var inputObj = document.getElementById(inputId);
	var mode = inputObj.getAttribute("mode"); //mode=true 去掉【是否由上传人修改或删除附件】
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachRemove";
	var request = "attachId=" + attachId + "&mode=" + mode;
	var result = ajaxLoadPageSynch(url, request);
	
	if(result == "success") {
		if("single" == single){
			attachImageInit(inputId); //当为图片附件上传时，则调用图片附件的初始化
		}else{
		   attachInit(inputId);
		}
	}else{
		alert(result);
	}
}
// 修改附件
var attachUpdateForm=null;
var attachUpdateWin=null;
function attachUpdate(attachId, inputId, mode, imgId){
	//mode, imgId, param
	var inputObj = document.getElementById(inputId);
	
	var indexTable = inputObj.getAttribute("indexTable");
	var indexId = inputObj.value;
	var mode1 = inputObj.getAttribute("mode"); //mode=true 去掉【是否由上传人修改或删除附件】
	
	var foreignid ="";
	try{
		foreignid = document.getElementById("uuid").value ;
	} catch (e){
		foreignid = "" ;
	}
	
	foreignid = foreignid || "" ;
	var mode = mode || "";
	var param = param || {};
	param.window = window;
	param.inputId = inputId;
	param.mode = mode;	
	param.notify_interval = param.notify_interval || 750;
	if(!checkMaxAttach(inputId)) {
		return;
	}
	
	//判断【是否由上传人删除附件】
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachState";
	var request = "attachId=" + attachId + "&mode=" + mode1;
	var result = ajaxLoadPageSynch(url, request);	
	if(result != "success") {		
		alert(result);
		return;
	}
	
	attachUpdateForm = new Ext.FormPanel({
		url: "",
		id:'attachUpdate',
		xtype:'attachUpdate',
		border:false,
        fileUpload: true,
        autoHeight: true,
        autoWidth: true,
        frame: true,
		bodyStyle: 'padding: 5px;',
        labelWidth: 1,
        closeAction: 'close',
        defaults: {
            anchor: '95%',
            allowBlank: false,
            msgTarget: 'side'
        },
        items: [{
            xtype: 'fileuploadfield',
            id: 'form-file',
            emptyText: '请选择需要上传的文件(限制单个文件不能大于'+SYSTEM_FILE_SIZE_MAX+')',
            name: 'attachPath',
            buttonText: '',
            buttonCfg: {
            	text:'选择文件'
            }
        }]
    });
	//每次重置表单url地址
	var url = MATECH_SYSTEM_WEB_ROOT + '/common.do?method=attachUpload&attachId='+attachId+'&foreignid='+foreignid+'&indexTable=' + indexTable + "&indexId=" + indexId + "&mode=" + mode + "&policy=" + param.policy;

	attachUpdateForm.form.url = url;
	//改为每次创建新窗口
    attachUpdateWin = new Ext.Window({
		title: '文件上传',
		width: 500,
		height:106,
        modal:true,
        resizable:false,
		layout:'fit',
		closeAction:'close',
		items: attachUpdateForm,
		buttons: [{
            text: '确定',
            icon:MATECH_SYSTEM_WEB_ROOT + btn_img_url + 'check.png',
            handler: function(){
				//检查文件类型是否符合要求：qwh
				var attachTypes = (inputObj.getAttribute('attachTypes') || '').toLowerCase();
				var curFileName = getFileExt(document.getElementById('form-file').value);
				if(attachTypes > '' && (',' + attachTypes + ',').indexOf(',' + curFileName + ',') < 0){
					alert('必须上传'+attachTypes+'后缀的文件名，您上传的'+curFileName+'文件类型非法！');
					return false;
				}
				if(attachUpdateForm.getForm().isValid()){
                	// 显示进度条
                	Ext.MessageBox.show({ 
					    title: '上传文件', 
					    width:240, 
					    progress:true, 
					    closable:false
					}); 
					// 提交表单
	                attachUpdateForm.getForm().submit();
	                param.i = 0;
				    var timer = setInterval(function(){
						// 请求事例
						Ext.Ajax.request({
							url: MATECH_SYSTEM_WEB_ROOT + '/common.do?method=attachUploadProcess&rand=' + Math.random(),
							method: 'post',
							// 处理ajax的返回数据
							success: function(response, options){
								status = response.responseText + " " + param.i++;
								var obj = null;
								try {
									obj = Ext.util.JSON.decode(response.responseText);
								} catch (e){ console.log(e); }
								try {
									if (param.onnotify && param.onnotify.call(param, obj, response) == false){
										return;
									}
								} catch (e){ console.log(e); }
								
								//prompt("",response.responseText);
								if(obj.success != false){
									if(obj.finished){
										clearInterval(timer);	
										// status = response.responseText;
										Ext.MessageBox.updateProgress(1, 'finished', 'finished');
										Ext.MessageBox.hide();
										attachUpdateWin.close();
										try {
											if (param.onfinished && param.onfinished.call(param, obj, response) == false){ // 失敗回調
												return;
											}
										} catch (e){ console.log(e); }
										if(mode == "single"){
											try {
												if (param.onupdated && param.onupdated.call(param, obj, response) == false){ // 失敗回
													return;
												}	
											} catch (e) { console.log(e);} 
											attachImageInit(inputId,imgId);	//刷新图片
										}else if(mode == "grid"){
											try {
												if (param.onupdated && param.onupdated.call(param, obj, response) == false){ // 失敗回
													return;
												}	
											} catch (e) { console.log(e);} 
											eval("goSearch_"+imgId+"()");
											eval("try{parent.refreshTree();}catch(e){}");
											//attachGridInit(inputId,imgId); //刷新grid
										}else{
											var update = inputObj.getAttribute("update");
											if(update){
												var field = Ext.getDom(update) ;												
												if(!field) {
													var selectCmp = Ext.getCmp(update) ;
													if(selectCmp.getValue() == "") selectCmp.setValue("参见附件");
												}else{
													if(field.value == "") field.value = "参见附件";
												}	
											}
											try {
												if (param.onupdated && param.onupdated.call(param, obj, response) == false){ // 失敗回
													return;
												}	
											} catch (e) { console.log(e);} 
											attachInit(inputId);
										}
									} else {
										try {
											if (param.onprogress && param.onprogress.call(param, obj, response) == false){ // 失敗回
												return;
											}	
										} catch (e) { console.log(e);} 
										Ext.MessageBox.updateProgress(obj.percentage, obj.msg);	
									}
								} else {
									clearInterval(timer);
									try {
										if (param.onexception && param.onexception.call(param, obj, response) == false){ // 異常回調
											return;
										}
									} catch (e){ console.log(e); }
									Ext.Msg.alert('错误', obj.msg);
								}
							},
							failure: function(e){
								clearInterval(timer);
								if (param.onerror && param.onerror.call(param, e) == false){ // 失敗回調
									return;
								}
								Ext.Msg.alert('错误', '上传文件出错。');
							} 
						});
				    }, param.notify_interval);
                }
            }
        },{
            text: '重置',
            icon:MATECH_SYSTEM_WEB_ROOT + btn_img_url + 'refresh.png',
            handler: function(){
                attachUpdateForm.getForm().reset();
            }
       	},{
       		text: '取消',
       		icon:MATECH_SYSTEM_WEB_ROOT + btn_img_url + 'close.png',
       		handler: function(){
       			attachUpdateWin.close();
       		}
       	}]
    });
	attachUpdateWin.show();
	//var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachUpdate";
	/*var request = "attachId=" + attachId;
	var result = ajaxLoadPageSynch(url, request);
	
	if(result == "success") {
		if("single" == single){
			attachImageInit(inputId); //当为图片附件上传时，则调用图片附件的初始化
		}else{
		   attachInit(inputId);
		}
	}*/
}
function attachGridRemove(attachId, gridId) {
	var str = "是否确认要删除该附件？";						
	if(!confirm(str,"提示")){
		return;
	}
				
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachRemove";
	var request = "attachId=" + attachId;
	var result = ajaxLoadPageSynch(url, request);
	
	if(result == "success") {
		eval("goSearch_"+gridId+"()");
		eval("try{parent.refreshTree();}catch(e){}");
	}
}


// 检查开始年份和结束年份 startYear endYear

function chkYear(){
	var startYear = document.getElementById("startYear").value;
	var endYear = document.getElementById("endYear").value;

	if(startYear != "" && endYear ==""){
		alert("请同时选择结束年份！");
		document.getElementById("endYear").foucs();
		return false;
	}
	if(startYear == "" && endYear !=""){
		alert("请同时选择开始年份！");
		document.getElementById("startYear").foucs();
		return false;
	}
	if(startYear != "" && endYear !=""){
		if(endYear <= startYear){
			alert("结束年份必须大于开始年份！");
			return false;
		}
	}
	return true;
}





// 调整gird框无法适应浏览器resize
// 针对将grid框放到TabPanel中的情况
//_fromObj:grid框所属容器，该容器会随着浏览器变动而自动调整高度与长度
//_toObj:为需要根据_fromObj进行手工调整的gird的ID字符串，如：gridId_myDealList,gridId_myApplyList
//_adjSize[长度，高度]:需要减去的长度与高度，微调使用
//添加日期：2012-3-16
function resizeGridPanel(_fromObj,_toObj,_adjSize){
	var _resizeInterval;//计时器
	//监听浏览器变动
	Ext.EventManager.onWindowResize (function(){
		_resizeInterval=setInterval(GridPanelResize,500);
	});
	//调整页面gridpanel长度和宽度
	function GridPanelResize(){
		var realWidth=Ext.getCmp(_fromObj).getWidth();
		var realHeight=Ext.getCmp(_fromObj).getHeight();
		var gridPanels=_toObj.split(",");
		for(var i=0;i<gridPanels.length;i++){			
			Ext.getCmp(gridPanels[i]).setWidth(realWidth-_adjSize[i][0]);
			Ext.getCmp(gridPanels[i]).setHeight(realHeight-_adjSize[i][1]);
		}
		clearInterval(_resizeInterval);
	}	
}
//针对单个grid放到页面的情况
function resizeSingleGridPanel(_toObj,_adjWidth,_adjHeigh){
	var _resizeInterval;//计时器
	//监听浏览器变动
	Ext.EventManager.onWindowResize (function(){
		_resizeInterval=setInterval(GridPanelResize,500);
	});
	//调整页面gridpanel长度和宽度
	function GridPanelResize(){
		var realWidth=Ext.getBody().getWidth()-_adjWidth;
		var realHeight=Ext.getBody().getHeight()-_adjHeigh;
		
		Ext.getCmp(_toObj).setWidth(realWidth);
		Ext.getCmp(_toObj).setHeight(realHeight);
		
		clearInterval(_resizeInterval);
	}	
}
//隐藏grid框的刷新按钮
function hideMyExtGridComponent(itemContainer,itemIndex){
	var _hideExtComponentInterval;
	_hideExtComponentInterval=setInterval(hideComponent,500);
	function hideComponent(){
		if(Ext.getCmp(itemContainer)){
			Ext.getCmp(itemContainer).get(itemIndex-1).setVisible(false);
			Ext.getCmp(itemContainer).get(itemIndex).setVisible(false);
			clearInterval(_hideExtComponentInterval);	
		}
	}
}
//权限判断函数
function optPriviligeJudge(curPrivilige,sysPrivilige){
	if(sysPrivilige.indexOf(curPrivilige)>=0){
		return true;
	}else{
		Ext.MessageBox.alert("提示信息","没有操作权限！");
		return false;
	}
}
//阻止input按钮在disabled和readOnly时按backspace返回前一个页面
Ext.EventManager.on(Ext.getBody(),"keydown",function(e, t) {   
    if (e.getKey() == e.BACKSPACE &&(t.disabled || t.readOnly)) {   
        e.stopEvent();   
    }
});


//判断JS函数是否存在
function funExists(funName){ 
	try{  
		if(typeof eval(funName)=="undefined"){
			return false;
		} 
		if(typeof eval(funName)=="function"){
			return true;
		}
	} catch(e){
		return false;
	}
}

//js 小写人民币转化为大写人民币
function RMBToCapital(num) { //转成人民币大写金额形式
    var str1 = '零壹贰叁肆伍陆柒捌玖'; //0-9所对应的汉字
    var str2 = '万仟佰拾亿仟佰拾万仟佰拾元角分'; //数字位所对应的汉字
    var str3; //从原num值中取出的值
    var str4; //数字的字符串形式
    var str5 = ''; //人民币大写金额形式
    var i; //循环变量
    var j; //num的值乘以100的字符串长度
    var ch1; //数字的汉语读法
    var ch2; //数字位的汉字读法
    var nzero = 0; //用来计算连续的零值是几个
    num = Math.abs(num).toFixed(2); //将num取绝对值并四舍五入取2位小数
    str4 = (num * 100).toFixed(0).toString(); //将num乘100并转换成字符串形式
    j = str4.length; //找出最高位
    if (j > 15) {
        return '溢出';
    }
    str2 = str2.substr(15 - j); //取出对应位数的str2的值。如：200.55,j为5所以str2=佰拾元角分
    //循环取出每一位需要转换的值
    for (i = 0; i < j; i++) {
        str3 = str4.substr(i, 1); //取出需转换的某一位的值
        if (i != (j - 3) && i != (j - 7) && i != (j - 11) && i != (j - 15)) { //当所取位数不为元、万、亿、万亿上的数字时
            if (str3 == '0') {
                ch1 = '';
                ch2 = '';
                nzero = nzero + 1;
            }
            else {
                if (str3 != '0' && nzero != 0) {
                    ch1 = '零' + str1.substr(str3 * 1, 1);
                    ch2 = str2.substr(i, 1);
                    nzero = 0;
                }
                else {
                    ch1 = str1.substr(str3 * 1, 1);
                    ch2 = str2.substr(i, 1);
                    nzero = 0;
                }
            }
        }
        else { //该位是万亿，亿，万，元位等关键位
            if (str3 != '0' && nzero != 0) {
                ch1 = "零" + str1.substr(str3 * 1, 1);
                ch2 = str2.substr(i, 1);
                nzero = 0;
            }
            else {
                if (str3 != '0' && nzero == 0) {
                    ch1 = str1.substr(str3 * 1, 1);
                    ch2 = str2.substr(i, 1);
                    nzero = 0;
                }
                else {
                    if (str3 == '0' && nzero >= 3) {
                        ch1 = '';
                        ch2 = '';
                        nzero = nzero + 1;
                    }
                    else {
                        if (j >= 11) {
                            ch1 = '';
                            nzero = nzero + 1;
                        }
                        else {
                            ch1 = '';
                            ch2 = str2.substr(i, 1);
                            nzero = nzero + 1;
                        }
                    }
                }
            }
        }
        if (i == (j - 11) || i == (j - 3)) { //如果该位是亿位或元位，则必须写上
            ch2 = str2.substr(i, 1);
        }
        str5 = str5 + ch1 + ch2;

        if (i == j - 1 && str3 == '0') { //最后一位（分）为0时，加上"整"
            str5 = str5 + '整';
        }
    }
    if (num == 0) {
        str5 = '零元整';
    }
    return str5;
}

//把2012改成贰零壹贰，转为票据打印使用
function DateToCapital(rq){
   if (rq){
   		rq=replaceAll(rq,'0','零');
   		rq=replaceAll(rq,'1','壹');
		rq=replaceAll(rq,'2','贰');
   		rq=replaceAll(rq,'3','叁');
   		rq=replaceAll(rq,'4','肆');
   		rq=replaceAll(rq,'5','伍');
   		rq=replaceAll(rq,'6','陆');
   		rq=replaceAll(rq,'7','柒');
   		rq=replaceAll(rq,'8','捌');
   		rq=replaceAll(rq,'9','玖');
   		return rq;
   }else{
   		return '';
   } 
}


function setObjDisabled(name){
	var oElem=document.getElementById(name);
		var sTag=oElem.tagName.toUpperCase();
		switch(sTag)
		{
		case	"BUTTON":
			oElem.disabled=true;
			break;
		case	"SELECT":
		case	"TEXTAREA":
			oElem.readOnly=true;
			break;
		case	"INPUT":
			{
			var sType=oElem.type.toUpperCase();

			if(sType=="TEXT")oElem.readOnly=true;
			if(sType=="BUTTON"||sType=="IMAGE")oElem.disabled=true;
			if(sType=="CHECKBOX")oElem.disabled=true;
			if(sType=="RADIO")oElem.disabled=true;
			}
			break;
		default:
			oElem.disabled=true;
			break;
		}
	//set style
	oElem.style.backgroundColor="#eeeeee";
}

function setObjEnabled(name){
	var oElem=document.getElementById(name);
		var sTag=oElem.tagName.toUpperCase();
		switch(sTag)
		{
		case	"BUTTON":
			oElem.disabled=false;
			break;
		case	"SELECT":
		case	"TEXTAREA":
			oElem.readOnly=false;
			break;
		case	"INPUT":
			{
			var sType=oElem.type.toUpperCase();

			if(sType=="TEXT")oElem.readOnly=false;
			if(sType=="BUTTON"||sType=="IMAGE")oElem.disabled=false;
			if(sType=="CHECKBOX")oElem.disabled=false;
			if(sType=="RADIO")oElem.disabled=false;
			}
			break;
		default:
			oElem.disabled=false;
			break;
		}
	//set style
	oElem.style.backgroundColor="#FFFFFF";
}

//替换所有字符
function replaceAll(str,oldStr,newStr) {
	return str.replace(new RegExp(oldStr,"gm"),newStr); 
}

//通用选人
var _cascadeWinext=null ;
function show_selectUser(objName, hideUserId, mode,choice,useOrgan){
	/*
	var objParameter = new Object();
	objParameter.userName = objName;
	objParameter.userId = hideUserId;
	objParameter.parentWindowObj = window;
	*/
	
	//window.showModalDialog(CONTEXTPATH + "sys/user/selectUser.jsp?mode="+mode, objParameter, "dialogHeight:500px;dialogWidth:500px;resizable:false;dialogHide:no;status:no;location=no;");
	
	var url = MATECH_SYSTEM_WEB_ROOT+"/sys/user/selectUser.jsp?mode="+mode+"&userId="+hideUserId+"&userName="+objName+"&choice="+choice+"&useOrgan="+useOrgan;
	//ext.window弹出框
	var html = "<iframe id=\"selectshow\" src=\""+url+"\" name=\"selectshow\" scrolling=\"auto\" frameborder=\"0\" width=\"100%\" height=\"100%\" >";
	if(_cascadeWinext == null) { 
	    _cascadeWinext = new Ext.Window({
			title: '选人',
			width: 700,
			height:480, 
			html:html,
	        closeAction:'hide',
	        modal:true,
	        layout:'fit',
			listeners : { 
	        	'hide':function() {
					try{
	        		if (funExists("select_user_after")) {
						select_user_after(); //选人之后
					}
					}catch(e){}
	        	}
	        }
	    });
	}else{
		document.getElementById("selectshow").src = url;
	}
	_cascadeWinext.show();
	//网页弹出框
	/*
	mode = mode || "";
    
    var param = '&userId=' + hideUserId + '&userName=' + objName;
    var open_param = 'depended=1,location=no, height=500, width=800, screenX=100, screenY=100';
    window.open(CONTEXTPATH + "sys/user/selectUser.jsp?mode=" + mode + param, 'selectUser', open_param);
    */
    
}

//加一个CI配置项的方法，用window.showModalDialog打开一配置项查询页面
function show_selectCi(objId,objName){
	/*
	var objParameter = new Object();
	objParameter.CiId = objId;
	objParameter.CiName = objName;
	objParameter.isWin = true;
	objParameter.parentWindowObj = window;
	*/
	
	var param = 'CiId=' + objId + '&CiName=' + objName + '&isWin=true';
    var open_param = 'depended=1,location=no, height=500, width=1024, screenX=100, screenY=100';
    window.open(CONTEXTPATH + "cmdb.do?method=treeList&" + param, 'selectCi', open_param);
	// window.showModalDialog(MATECH_SYSTEM_WEB_ROOT + "cmdb.do?method=treeList", objParameter, "dialogHeight:500px;dialogWidth:850px;resizable:yes;status:no;location=no;");
}	


function show_selectknowledge(obj,viewtype){

	var param = "knowledgeId=" + obj.id +"&viewtype="+viewtype;
	var open_param = 'depended=1,location=no, height=500, width=1024, screenX=100, screenY=100';
	
	window.open(CONTEXTPATH + "knowledge.do?method=show&mode=2&isWin=true&" + param, 'selectKnowledge' , open_param);
	
}

function show_selectJob(idFieldName,idFieldId,type){
	var objParameter = new Object();
	objParameter.idFieldName = idFieldName;
	objParameter.idFieldId = idFieldId;
	objParameter.partentWindowObj = window;
    type=type||"";
    if (navigator.userAgent.indexOf('WebKit') >= 0){
    	window.open(MATECH_SYSTEM_WEB_ROOT+"hr/selectJob.jsp?type="+type, objParameter, "height=500px, width=500px, menubar=yes, scrollbars=yes, toolbar=yes, status=yes, location=no");
    } else {
    	window.showModalDialog(MATECH_SYSTEM_WEB_ROOT+"hr/selectJob.jsp?type="+type, objParameter, "dialogHeight:600px;dialogWidth:750px;resizable:false;dialogHide:no;status:no;location=no;");
    }
	
}

function createNewWord(tempUrl,newUrl){
	var openDocObj = new ActiveXObject("SharePoint.OpenDocuments.2"); 
	openDocObj.CreateNewDocument(tempUrl, newUrl);
}

function editWord(url){
	var openDocObj = new ActiveXObject("SharePoint.OpenDocuments.2"); 
    openDocObj.EditDocument(url);
}

function viewWord(url){
	var openDocObj = new ActiveXObject("SharePoint.OpenDocuments.2"); 
	openDocObj.ViewDocument(url);
}

Array.prototype.contains = function (element) { 
	for (var i = 0; i < this.length; i++) { 
		if (this[i] == element) { 
			return true; 
		} 
	} 
	return false; 
}


function getParamObject(__param) { 
	var args = new Object( ); //声明一个空对象 
	var query ;
	
	if(__param){
		//提交参数就切参数
		query=__param;
	}else{	
		//没提交参数就切URL
		query= window.location.search.substring(1); // 取查询字符串，如从 http://www.snowpeak.org/testjs.htm?a1=v1&a2=&a3=v3#anchor 中截出 a1=v1&a2=&a3=v3。
	} 
	var pairs = query.split("&"); // 以 & 符分开成数组 
	for(var i = 0; i < pairs.length; i++) { 
		var pos = pairs[i].indexOf('='); // 查找 "name=value" 对 
		if (pos == -1) continue; // 若不成对，则跳出循环继续下一对 
		var argname = pairs[i].substring(0,pos); // 取参数名 
		var value = pairs[i].substring(pos+1); // 取参数值 
		value = decodeURIComponent(value); // 若需要，则解码 
		args[argname] = value; // 存成对象的一个属性 
    } 
	return args; // 返回此对象 
} 

function doUpdateSubsetID(){
	   var row=mt_form_getRowValues()[0];
	   var uuid=row.uuid;
	   var id=row.id;
	   var formid=getParamObject()["uuid"];
	   var url="employment.do";
	   
	   Ext.MessageBox.prompt("修改子集编号","请输入新的子集编号，必须为数字",function(e,text){
	       if(e!="ok")return;
	       var param={method:"doUpdateSubsetID",formid:formid,uuid:uuid,newID:text};
	       $.post(url,param,function(str){
	         alert(str);
	         window.location.reload();
	      });
	   });
	}


//身份证验证
function validateIdCard(obj)
{
 var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
  var iSum = 0;
 //var info = "";
 var strIDno = obj;
 var idCardLength = strIDno.length;
 if(!/^\d{17}(\d|x)$/i.test(strIDno)&&!/^\d{15}$/i.test(strIDno))
        return 1; //非法身份证号

 if(aCity[parseInt(strIDno.substr(0,2))]==null)
 return 2;// 非法地区

  // 15位身份证转换为18位
 if (idCardLength==15)
 {
    sBirthday = "19" + strIDno.substr(6,2) + "-" + Number(strIDno.substr(8,2)) + "-" + Number(strIDno.substr(10,2));
  var d = new Date(sBirthday.replace(/-/g,"/"))
  var dd = d.getFullYear().toString() + "-" + (d.getMonth()+1) + "-" + d.getDate();
  if(sBirthday != dd)
                return 3; //非法生日
              strIDno=strIDno.substring(0,6)+"19"+strIDno.substring(6,15);
              strIDno=strIDno+GetVerifyBit(strIDno);
 }

       // 判断是否大于2078年，小于1900年
       var year =strIDno.substring(6,10);
       if (year<1900 || year>2078 )
           return 3;//非法生日

    //18位身份证处理

   //在后面的运算中x相当于数字10,所以转换成a
    strIDno = strIDno.replace(/x$/i,"a");

  sBirthday=strIDno.substr(6,4)+"-"+Number(strIDno.substr(10,2))+"-"+Number(strIDno.substr(12,2));
  var d = new Date(sBirthday.replace(/-/g,"/"))
  if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))
                return 3; //非法生日
    // 身份证编码规范验证
  for(var i = 17;i>=0;i --)
   iSum += (Math.pow(2,i) % 11) * parseInt(strIDno.charAt(17 - i),11);
  if(iSum%11!=1)
                return 1;// 非法身份证号

   // 判断是否屏蔽身份证
    var words = new Array();
    words = new Array("11111119111111111","12121219121212121");

    for(var k=0;k<words.length;k++){
        if (strIDno.indexOf(words[k])!=-1){
            return 1;
        }
    }

 return 0;
}


function viewCadet(){
	   var row=mt_form_getRowValues()[0];
	   var uuid=row.uuid;
	   var url="cadet.do?method=view&mode=view&uuid="+uuid;
	   window.showModalDialog(url,{},"dialogWidth:800px;dialogHeight:500px;status=no;location=no;resizable=yes");

	
}


function mt_open(url,title,width,height){
	window.open(url);
	//window.open(url,title,'height='+height+', width='+width+', toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
	
}



//通用加提示
//id:要添加提示的对象
//msg:要添加提示的内容
//anchorToTarget：true立刻显示 false鼠标移上去再显示
function myHintow(id,msg,anchorToTarget,tableid){

	var element = Ext.get(id) ;
	var eid = id;
	var selectCmp = Ext.getCmp(id) ;
	if(selectCmp){//下拉
		eid = selectCmp.el.dom.id ;		
	}
	
	// openTab(id, title, url, parent, flag, mode) 
	//overflow: hidden;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;
	var htmlval = "<div style='height: auto;width: 288px;'>"+msg+"</div>"
				+"<br><button style='padding:2px 5px;margin-left: 86px;' onclick=openTab('"+id+"','历史记录','process/formHistoryList.jsp?fieldname="+id+"&tableid="+tableid+"',parent.parent);>查看更多历史数据</button>";
	if(!element._myToolTip){                              
		//没定义对象就追加提示对象
		element._myToolTip=new Ext.ToolTip({
			target: eid,
			anchor: 'bottom',
			trackMouse: !anchorToTarget,
			anchorToTarget:anchorToTarget,
			autoHide:false,
			html: htmlval
			//contentEl: 'tipContent'
			
		});
		
		//定位到元素的上级，看看有没有滚动
		var parent = element.parent("table") ;
		while(true) {
			parent = parent.parent() ;
			if(parent && 
			   ((parent.dom.tagName == "DIV" && parent.dom.style.overflow == "auto") 
			   || parent.dom.tagName == "BODY")) {
				break ;
			}
		}
		
		//在滚动事件中重新刷新显示
		/*if(parent.dom.tagName == "DIV") {
			parent.on("scroll",function(event,elm,obj){
				element._myToolTip.show();
			});
		}*/
				
	}else{
		element._myToolTip.html=msg;
	}
	
	element._myToolTip.show();
	
}

function myHint(id,msg,anchorToTarget){
	
	var element = Ext.get(id) ;
	var eid = id;
	var selectCmp = Ext.getCmp(id) ;
	if(selectCmp){//下拉
		eid = selectCmp.el.dom.id ;		
	}
	
	if(!element._myToolTip){
		//没定义对象就追加提示对象
		element._myToolTip=new Ext.ToolTip({
			target: eid,
			anchor: 'right',
			trackMouse: !anchorToTarget,
			anchorToTarget:anchorToTarget,
			autoHide:false,
			html: msg
		});
		
		//定位到元素的上级，看看有没有滚动
		var parent = element.parent("table") ;
		while(true) {
			parent = parent.parent() ;
			if(parent && 
			   ((parent.dom.tagName == "DIV" && parent.dom.style.overflow == "auto") 
			   || parent.dom.tagName == "BODY")) {
				break ;
			}
		}
		
		//在滚动事件中重新刷新显示
		if(parent.dom.tagName == "DIV") {
			parent.on("scroll",function(event,elm,obj){
				element._myToolTip.show();
			});
		}
				
	}else{
		element._myToolTip.html=msg;
	}
	
	element._myToolTip.show();
	
}

//用于表单之间的转换
function myTransform(_uuid,_type, formId,pKey, tabTitle,parent){
	//_uuid,_type,formId 不能为空
	//_uuid = 源表的uuid[支持多个uuid，以","分隔]
	//_type = 转换类型
	//formId = 目标的表单formId
	//pKey = 目标的表单的流程key	
	//tabTitle = 新开标签页的名字
	//parent = 系统的父窗口
	
	if(_uuid == ""){
		alert('原表的UUID不能为空！');
		return;
	}
	if(_type == ""){
		alert('转换类型不能为空！');
		return;
	}
	if(formId == ""){
		alert('目标的表单的ID不能为空！');
		return;
	}
		
	var pk = "";
	if(pKey != undefined && pKey != null && pKey != "") {
		pk = "&pKey=" + pKey;
	}
	
	if(tabTitle == undefined || tabTitle == ""){
		tabTitle = "转换标签";
	}
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=formTree&formId=" + formId + pk;
	
	var myForm = document.createElement("form");
	myForm.action = url ;
	myForm.method="post";
	
	var inputObj = document.createElement("INPUT");
	inputObj.type = "hidden" ;
	inputObj.id = "_uuid" ;
	inputObj.name = "_uuid" ;
	inputObj.value = _uuid ;
	myForm.appendChild(inputObj);
	
	var inputObj1 = document.createElement("INPUT");
	inputObj1.type = "hidden" ;
	inputObj1.id = "_type" ;
	inputObj1.name = "_type" ;
	inputObj1.value = _type ;
	myForm.appendChild(inputObj1);
	
	document.body.appendChild(myForm);
	
	//用提交方式打开看看页面
	tabSubmit(myForm,url,tabTitle,parent);		
	
			
}

//表单通用批量导入EXCEL
//batchImport('标签名','系统的父窗口','表名','主键[中文]','必填中文字段','必填英文字段','可选中文字段','可选英文字段','缺省值字段[英文]','缺省值字段值','表字段,外表名,外关键字段,替换字段|...','接口实现类') 
function batchImport(tabTitle,parent,
	tableId,pk,
	requiredChinese,requiredEnglish,
	optionalChinese,optionalEnglish,
	defaultField,defaultValue,
	foreignKey,classPath
	){
	if(tableId == ""){
		alert('表名不驼为空！');
		return;
	}
	if(pk == ""){
		alert('主键不驼为空！');
		return;
	}
	if(requiredChinese == ""){
		alert('必填中文字段不驼为空！');
		return;
	}
	if(requiredEnglish == ""){
		alert('必填英文字段不驼为空！');
		return;
	}	
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=batchImport";
	
	var myForm = document.createElement("form");
	myForm.action = url ;
	myForm.method="post";
	
	var inputObj1 = document.createElement("INPUT");
	inputObj1.type = "hidden" ;
	inputObj1.id = "tableId" ;
	inputObj1.name = "tableId" ;
	inputObj1.value = tableId ;
	myForm.appendChild(inputObj1);

	var inputObj2 = document.createElement("INPUT");
	inputObj2.type = "hidden" ;
	inputObj2.id = "pkId" ;
	inputObj2.name = "pkId" ;
	inputObj2.value = pk ;
	myForm.appendChild(inputObj2);
	
	var inputObj3 = document.createElement("INPUT");
	inputObj3.type = "hidden" ;
	inputObj3.id = "requiredChinese" ;
	inputObj3.name = "requiredChinese" ;
	inputObj3.value = requiredChinese ;
	myForm.appendChild(inputObj3);
	
	var inputObj4 = document.createElement("INPUT");
	inputObj4.type = "hidden" ;
	inputObj4.id = "requiredEnglish" ;
	inputObj4.name = "requiredEnglish" ;
	inputObj4.value = requiredEnglish ;
	myForm.appendChild(inputObj4);
	
	if(optionalChinese != undefined && optionalChinese != ""){
		var inputObj5 = document.createElement("INPUT");
		inputObj5.type = "hidden" ;
		inputObj5.id = "optionalChinese" ;
		inputObj5.name = "optionalChinese" ;
		inputObj5.value = optionalChinese ;
		myForm.appendChild(inputObj5);
	}	
	
	if(optionalEnglish != undefined && optionalEnglish != ""){	
		var inputObj6 = document.createElement("INPUT");
		inputObj6.type = "hidden" ;
		inputObj6.id = "optionalEnglish" ;
		inputObj6.name = "optionalEnglish" ;
		inputObj6.value = optionalEnglish ;
		myForm.appendChild(inputObj6);
	}
	
	if(defaultField != undefined && defaultField != ""){
		var inputObj7 = document.createElement("INPUT");
		inputObj7.type = "hidden" ;
		inputObj7.id = "defaultField" ;
		inputObj7.name = "defaultField" ;
		inputObj7.value = defaultField ;
		myForm.appendChild(inputObj7);
	}
	
	if(defaultValue != undefined && defaultValue != ""){
		var inputObj8 = document.createElement("INPUT");
		inputObj8.type = "hidden" ;
		inputObj8.id = "defaultValue" ;
		inputObj8.name = "defaultValue" ;
		inputObj8.value = defaultValue ;
		myForm.appendChild(inputObj8);
	}
	
	if(foreignKey != undefined && foreignKey != ""){
		var inputObj9 = document.createElement("INPUT");
		inputObj9.type = "hidden" ;
		inputObj9.id = "foreignKey" ;
		inputObj9.name = "foreignKey" ;
		inputObj9.value = foreignKey ;
		myForm.appendChild(inputObj9);
	}
		
	if(classPath != undefined && classPath != ""){
		var inputObj10 = document.createElement("INPUT");
		inputObj10.type = "hidden" ;
		inputObj10.id = "classPath" ;
		inputObj10.name = "classPath" ;
		inputObj10.value = classPath ;
		myForm.appendChild(inputObj10);
	}
		
	document.body.appendChild(myForm);
	
	//用提交方式打开看看页面
	tabSubmit(myForm,url,tabTitle,parent);		
			
}


/* =========================================== time / date ===========================================*/
function format00(num){
	return num < 10 ? '0' + num : num;
}

function format_date(date){
	var sdate = date.getFullYear() + '-' + format00(date.getMonth() + 1) + '-' + format00(date.getDate()) + ' ';
	sdate = sdate + format00(date.getHours()) + ':' +format00(date.getMinutes()) + ':' + format00(date.getSeconds());
	return sdate;
}

function getServerTimeTo(callback, _async){
	var returnVal;
	_async = _async == undefined ? true : _async;
	jQuery.ajax({
		type : 'post',
		url : MATECH_SYSTEM_WEB_ROOT+"/formcheck.do?method=getTime",
		async : _async,
		data : {},
		dataType : 'text',
		success : function (response, xhr){
			if (callback){
				returnVal = callback(response, xhr);
			} else {
				returnVal = response;
			}
		},
		error : function(){
			alert('unable to get server time');
		}
	});
	return returnVal;
}

function dateField(field){
	new Ext.form.DateField({
		applyTo : field,
		width: 133,
		format: 'Y-m-d'
	});
}

//通过ButtonPopedom的json数组，判断按钮是否有权限显示出来
function setButtonPopedom(jsonButtonPopedom){
	var buttonPopedom = eval(jsonButtonPopedom) ;
	for(var i = 0; i<buttonPopedom.length; i++){
		var extId = buttonPopedom[i].extId;
		var show = buttonPopedom[i].show; 
		var obj = Ext.getCmp(extId);
		if(show == "true"){
			obj.enable();
		}else{
			obj.disable();
		}		
	}
	
}

   // 缩放图片，imgSrc用户延迟加载图片url
    function AutoResizeImage(maxWidth,maxHeight,objImg,imgSrc){
        var img = new Image();
        img.src = imgSrc || objImg.src;
        var hRatio;
        var wRatio;
        var Ratio = 1;
        var w = img.width;
        var h = img.height;
        wRatio = maxWidth / w;
        hRatio = maxHeight / h;
        if (maxWidth ==0 && maxHeight==0){
        Ratio = 1;
        }else if (maxWidth==0){
        if (hRatio<1) Ratio = hRatio;
        }else if (maxHeight==0){
        if (wRatio<1) Ratio = wRatio;
        }else if (wRatio<1 || hRatio<1){
        Ratio = (wRatio<=hRatio?wRatio:hRatio);
        }
        if (Ratio<1){
        w = w * Ratio;
        h = h * Ratio;
        }
        objImg.style.height = Math.round(h) + "px";
        objImg.style.width = Math.round(w) + "px";
        
        if(h < maxHeight) { // 纵向有空余空间
            objImg.style.marginTop = Math.round((maxHeight - h) / 2) + "px";
        }
        if(w < maxWidth) { // 横向有空余空间
            objImg.style.marginLeft = Math.round((maxWidth - w) / 2) + "px";
        }
        if(!!!objImg.src)
            objImg.src = imgSrc;
    }
    
   //通用WORD模板导出:table=导出的内容,uuid=记录UUID，以","分隔,field=导出文件名前缀字段,word=导出的模板,多个模板以","倾巢分隔,多条记录以"|"分隔
   //只支持word2007的 docx文档
   //例：table="k_user", uuid="19,123...", word="1.docx,2.docx|3.docx...";
  function extWordPrint(formids,uuid,field,word,src){
   	//打印
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=expWord&rand=" + Math.random();
	if(src) url = src;
	
	var myForm = document.createElement("form");
	myForm.action = url ;
	myForm.method="post";

	var inputObj1 = document.createElement("INPUT");
	inputObj1.type = "hidden" ;
	inputObj1.id = "formids" ;
	inputObj1.name = "formids" ;
	inputObj1.value = formids;
	myForm.appendChild(inputObj1);

	var inputObj2 = document.createElement("INPUT");
	inputObj2.type = "hidden" ;
	inputObj2.id = "uuid" ;
	inputObj2.name = "uuid" ;
	inputObj2.value = uuid;
	myForm.appendChild(inputObj2);
	
	var inputObj3 = document.createElement("INPUT");
	inputObj3.type = "hidden" ;
	inputObj3.id = "word" ;
	inputObj3.name = "word" ;
	inputObj3.value = word ;
	myForm.appendChild(inputObj3);

	var inputObj4 = document.createElement("INPUT");
	inputObj4.type = "hidden" ;
	inputObj4.id = "field" ;
	inputObj4.name = "field" ;
	inputObj4.value = field;
	myForm.appendChild(inputObj4);
	
	document.body.appendChild(myForm);
	
	//用提交方式打开看看页面
	myForm.submit();
   } 
   

//============================================================================================================
//表单、流程、报表等导入
//============================================================================================================   
var recoveryUploadWin = null;
var recoveryUploadForm = null;
//导入表单:上传附件
function recoveryTable(iParam,gridId) {

	if(recoveryUploadForm == null) {
		recoveryUploadForm = new Ext.FormPanel({
			url: "",
			border:false,
	        fileUpload: true,
	        autoHeight: true,
	        autoWidth: true,
	        frame: true,
			bodyStyle: 'padding: 5px;',
	        labelWidth: 1,
	        defaults: {
	            anchor: '95%',
	            allowBlank: false,
	            msgTarget: 'side'
	        },
	        items: [{
	            xtype: 'fileuploadfield',
	            id: 'form-file',
	            emptyText: '请选择需要上传的文件',
	            name: 'recoveryPath',
	            buttonText: '',
	            buttonCfg: {
	            	text:'选择文件'
	            }
	        }]
	    });
	} else {
		recoveryUploadForm.getForm().reset();
	}
	
	//每次重置表单url地址	
	var url = MATECH_SYSTEM_WEB_ROOT + '/common.do?method=recovery';
	if(iParam){
		url += iParam;
	}
	
	recoveryUploadForm.form.url = url;
	//改为每次创建新窗口
    recoveryUploadWin = new Ext.Window({
		title: '文件上传',
		width: 500,
		height:116,
        modal:true,
        resizable:false,
		layout:'fit',
		closeAction:'hide',
		items: recoveryUploadForm,
		buttons: [{
            text: '确定',
            icon:MATECH_SYSTEM_WEB_ROOT + btn_img_url + 'check.png',
            handler: function(){
                if(recoveryUploadForm.getForm().isValid()){
                	// 显示进度条
                	Ext.MessageBox.show({ 
					    title: '上传文件', 
					    width:240, 
					    progress:true, 
					    closable:false
					}); 
				
					// 提交表单
	                recoveryUploadForm.getForm().submit();
	                
	                var i = 0;
				    var timer = setInterval(function(){
						// 请求事例
						Ext.Ajax.request({
							url: MATECH_SYSTEM_WEB_ROOT + '/common.do?method=attachUploadProcess&rand=' + Math.random(),
							method: 'post',
							// 处理ajax的返回数据
							success: function(response, options){
								status = response.responseText + " " + i++;
								
								var obj = Ext.util.JSON.decode(response.responseText);
								
								if(obj.success!=false){
									if(obj.finished){
										clearInterval(timer);	
										// status = response.responseText;
										alert(obj.msg);
										Ext.MessageBox.updateProgress(1, 'finished', 'finished');
										Ext.MessageBox.hide();
										recoveryUploadWin.hide();										
										
										eval("goSearch_"+gridId+"()");
										
									} else {
										Ext.MessageBox.updateProgress(obj.percentage, obj.msg);	
									}
								}else{
									clearInterval(timer);
									Ext.Msg.alert('错误', obj.msg);
								}
							},
							failure: function(){
								clearInterval(timer);
								Ext.Msg.alert('错误', '上传文件出错。');
							} 
						});
				    }, 500);
                }
            }
        },{
            text: '重置',
            icon:MATECH_SYSTEM_WEB_ROOT + btn_img_url + 'refresh.png',
            handler: function(){
                recoveryUploadForm.getForm().reset();
            }
       	},{
       		text: '取消',
       		icon:MATECH_SYSTEM_WEB_ROOT + btn_img_url + 'close.png',
       		handler: function(){
       			recoveryUploadWin.hide();
       		}
       	}]
    });
	recoveryUploadWin.show();
}


//流程-窗帘JS打开
//1=窗帘名称，2=窗帘URL，3=知识库检索内容字段id，4=是否显示(默认显示)，5=是否展开(默认展开)
function showFormFlowt(titie,url,keyworlds,bShow,bOpen){

	if(!bShow) bShow = true;
	if(!bOpen) bOpen = true;
	//如果是在工单页面检索知识就传当前formid和tabuuid过去
	var param = "" ;
	try{
		if(url.indexOf("?")>-1){
			param = "&formid="+document.getElementById("mt_formid").value ;
		}else{
			param = "?formid="+document.getElementById("mt_formid").value ;
		}
		param+="&tabuuid="+document.getElementById("uuid").value ;
		if(keyworlds){
			param+="&keyworlds="+keyworlds ;
		}
	}catch(e){
		param="" ;
	}
	document.getElementById("__track-txt").innerText = titie;
	document.getElementById('iframe_quick_submit').src = url+param;
	var o = $("#__track");
	
	var __trackCount = o.attr("__trackCount");
	if(bShow && __trackCount == 0){
		o.toggle(); //隐藏与显示
	}
	if(bOpen){
		o.click(); //展开
	}
	__trackCount++;
	o.attr("__trackCount",__trackCount);
	
}


//密码强度检测函数
function chkpwdStrong(obj,resultobj){
	var password = obj.value;
	var t=obj.value;
	var id=chkpwdStrongResult(t);

	//定义对应的消息提示
	var msg=new Array(4);
	msg[0]="初始密码";				
	msg[1]="低级密码强度";
	msg[2]="中级密码强度";
	msg[3]="高级密码强度";


	var col=new Array(4);
	col[0]="gray";
	col[1]="red";
	col[2]="#ff6600";
	col[3]="Green";

	//设置显示效果
	if(resultobj){
		if(resultobj.tagName=='LABEL'){
			resultobj.style.color=col[id];
			resultobj.innerHTML=msg[id];
		}else{
			//INPUT
			resultobj.value=id;
		}
	}
	return id;
}

//定义检测函数,返回0/1/2/3分别代表无效/差/一般/强
function chkpwdStrongResult(s){
	if(s == 1) {
		return 0 ;
	}
	
	if (s.match(/[0-9]/ig) && s.match(/[a-z]/ig) && s.length >=6){
		//密码大于6位，且包含数字和字母，判断为高级强度密码
		return 3;
	}
	if(s.length >=6) {
		//密码大于6位，判断为中级强度密码
		return 2;
	}
	return 1 ;     //其它则为低级强度密码
}

document.onkeyup = function keyUp(e) {
		var currKey=0,e=e||event;
    　  	currKey=e.keyCode||e.which||e.charCode;
    　　	var keyName = String.fromCharCode(currKey);
		if(currKey=="27"){
			var ptitle = window.parent.document.title;
			if(ptitle=="看板"){
				window.parent.Ext.Msg.confirm("确认框", "您确定要退出看板？", function (btn) {
					if(btn=="yes"){
						window.parent.close();
					}
				});
			}
		} 
};

function getToken(strSet,tokenName){
	if(!strSet) return "";
	var i=strSet.indexOf('<'+tokenName+'>');
	var j=strSet.indexOf('</'+tokenName+'>');
	if(i>=0 && j>i){
		return strSet.substring(i+tokenName.length+2,j);
	}else{
		return "";
	}
}

function setToken(strSet,tokenName,tokenValue){
	if(!strSet) return "";
	var i=strSet.indexOf('<'+tokenName+'>');
	var j=strSet.indexOf('</'+tokenName+'>');
	if(i>=0 && j>i){
		var str = strSet.substring(1,i)+'<'+tokenName+'>'+tokenValue+strSet.substring(j);
		return strSet.substring(1,i)+'<'+tokenName+'>'+tokenValue+strSet.substring(j);
	}else{
		return "";
	}
}

(function(window){
	var LS;
	(function(){
	
		var o = document.getElementsByTagName("head")[0],
			n = window.location.hostname || "localStorage",
			d = new Date(),doc,agent;
		//typeof o.addBehavior 在IE6下是object，在IE10下是function，因此这里直接用!判断
		if(!o.addBehavior)return;//防止有些浏览器默认禁用localStorage，这里优先考虑userData本地存储
		try{ //尝试创建iframe代理
			agent = new ActiveXObject('htmlfile');
			agent.open();
			agent.write('<s' + 'cript>document.w=window;</s' + 'cript><iframe src="/favicon.ico"></frame>');
			agent.close();
			doc = agent.w.frames[0].document;
		}catch(e){doc = document;}
		o = doc.createElement('head');//这里通过代理document创建head，可以使存储数据垮目录访问
		doc.appendChild(o);
		d.setDate(d.getDate() + 36500);
		o.addBehavior("#default#userData");
		o.expires = d.toUTCString();
		o.load(n);

		var root = o.XMLDocument.documentElement,
			attrs = root.attributes,
			prefix = "prefix_____hack__",
			reg1 = /^[-\d]/,
			reg2 = new RegExp("^"+prefix),
			encode = function(key){
				return reg1.test(key) ? prefix + key : key;
			},
			decode = function(key){
				return key.replace(reg2,"");
			};

		LS= {
			length: attrs.length,
			notNativeCode: true,
			getItem: function(key){
				return (attrs.getNamedItem( encode(key) ) || {nodeValue: null}).nodeValue||root.getAttribute(encode(key)); //IE9中 通过o.getAttribute(name);取不到值，所以才用了下面比较复杂的方法。（也许你会诧异IE9不是有原生的localStorage吗，是的，但是用户可以关闭DOM存储，所以为了保险一些还是考虑IE9可能会使用到#userData吧。）
			},
			setItem: function(key, value){
				root.setAttribute( encode(key), value); //IE9中无法通过 o.setAttribute(name, value); 设置#userData值，而用下面的方法却可以。
				try{o.save(n);}catch(e){}
				this.length = attrs.length;
			},
			removeItem: function(key){
				root.removeAttribute( encode(key) ); //IE9中无法通过 o.removeAttribute(name); 删除#userData值，而用下面的方法却可以。
				try{o.save(n);}catch(e){}
				this.length = attrs.length;
			},
			clear: function(){
				while(attrs.length){
					this.removeItem( attrs[0].nodeName );
				}
				this.length = 0;
			},
			key: function(i){
				return attrs[i] ? decode(attrs[i].nodeName) : undefined;
			}
		};
	})();

	(function(w,localStorage){//封装LS，对外提供接口
		var f = function(){return null;};
		w.LS = localStorage?{
			set : function(key, value){
				//fixed iPhone/iPad 'QUOTA_EXCEEDED_ERR' bug
				if( this.get(key) !== undefined )
					this.remove(key);
				localStorage.setItem(key, value);
			},
			//查询不存在的key时，有的浏览器返回null，这里统一返回undefined
			get : function(key){
				var v = localStorage.getItem(key);
				return v === null ? undefined : v;
			},
			remove : function(key){ localStorage.removeItem(key); },
			clear : function(){ localStorage.clear(); },
			each : function(callback){
				var list = this.obj(), fn = callback || function(){}, key;
				for(key in list)
					if( fn.call(this, key, this.get(key)) === false )
						break;
			},
			obj : function(){
				var list={}, i=0, n, key;
				if( localStorage.isVirtualObject ){
					list = localStorage.key(-1);
				}else{
					n = localStorage.length;
					for(; i<n; i++){
						key = localStorage.key(i);
						list[key] = this.get(key);
					}
				}
				return list;
			}
		}:{set:f,get:f,remove:f,clear:f,each:f,obj:f};//如果都不支持则所有方法返回null
	})(window,LS||window.localStorage);//这里优先使用自定义的LS
})(window);