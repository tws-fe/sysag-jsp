function audioInit(inputId, param) {
	param = param || {};
	
	var inputObj = $("#"+inputId);

	var showDownload=inputObj.attr( 'showdownload' )||inputObj.attr( 'showDownload' )||"true";
	var showRemove=inputObj.attr( 'showremove' )||inputObj.attr( 'showRemove')||"true";

	if(showDownload=="false"){
		showRemove="false";
	}
	if(inputObj.attr("readOnly")) {
		showRemove = "false";
	}
	
	var indexTable = inputObj.attr("indextable")||inputObj.attr("indexTable");
	if (!indexTable){
		indexTable = "";
	}
	
	if (inputObj.val() == "") {
		inputObj.val(getUUID());
	}
	
	
	$("div[inputid='"+inputId+"']").remove();
	
	var indexId = inputObj.val();
	var prefix = inputId
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=getAttachList";
	var request = "indexTable=" + indexTable + "&indexId=" + indexId;
	
	var result = ajaxLoadPageSynch(url, request);
	var attachList = Ext.util.JSON.decode(result);
	var _html ="";
	for(var i=0; i < attachList.length; i++) {
		_html+='<audio id="audioplay_'+attachList[i].attachId+'" src="'+attachList[i].attachName+'" preload="none" controls showdownload="'+showDownload+'" showremove="'+showRemove+'" attachid="'+attachList[i].attachId+'" attachname="'+attachList[i].attachName+'" inputid="'+inputId+'"></audio> ';
	}

	if(_html!=""){
		inputObj.before(_html);
	}
	
}

function attachInit(inputId, param) {
	param = param || {};
	var inputObj = document.getElementById(inputId);
	// 按钮文字,默认为添加附件
	var buttonText = inputObj.getAttribute("buttontext")||inputObj.getAttribute("buttonText");
	buttonText = buttonText || "添加附件";
	var bshowButton = inputObj.getAttribute("showbutton")||inputObj.getAttribute("showButton");
	var buttonhide = inputObj.getAttribute("buttonhide")||"false";
	var bshowEdit =inputObj.getAttribute("showedit") || inputObj.getAttribute("showEdit");
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
			  + "<a class='aAtt' href=\"javascript:void(1);\" onclick=\"window.open('" + MATECH_SYSTEM_WEB_ROOT + "sys/common/attachPdf.jsp?attachId=" + attach.attachId + "');\" title=\"在线打开：" + attach.attachName + "\">" + maxString(attach.attachName) + "</a>"
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
			  + "<a class='aAtt' href=\"javascript:void(1);\" onclick=\"window.open('" + MATECH_SYSTEM_WEB_ROOT + "sys/common/attachOffice.jsp?attachId=" + attach.attachId + "&attachType=" + curFileNameExt + "');\" title=\"在线打开：" + attach.attachName + "\">" + maxString(attach.attachName) + "</a>"
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
			html += "&nbsp;<a href=\"" + MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachDownload&attachId=" + attach.attachId + "\" title=\"下载：" + attach.attachName + "\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/share/img/download16.png\"></a>";
			if(_edit){
				html += "&nbsp;<a href=\"javascript:void(1);\" id=\""+inputId+"-edit"+i+"\" name=\""+inputId+"-edit\"  onclick=\"attachUpdate('" + attach.attachId + "','" + inputId + "');\" title=\"修改\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/share/img/edit.png\"></a>";		
			}
		}
		
		if(remove) {
			html += "&nbsp;<a href=\"javascript:void(1);\" id=\""+inputId+"-del"+i+"\" name=\""+inputId+"-del\"  onclick=\"attachRemove('" + attach.attachId + "','" + inputId + "','','"+attach.attachName+"');\" title=\"删除\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/share/img/delete.png\"></a>";
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
		
		if(buttonhide=="true"){
			$('#' + attachButtonId).css("display","none");
		}
		
		attachButton[0].onclick = function(){
			attachUpload.call(param, inputId, param.mode, param.imgId, param);
		};
	}
}


var attachUploadWin = null;
var attachUploadForm = null;
// 上传附件
function attachUpload(inputId, mode, imgId, param) {

	count=1;
	var inputObj = document.getElementById(inputId);
	
	var indexTable = inputObj.getAttribute("indextable")||inputObj.getAttribute("indexTable");
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
	
	
	var isUseFlash=true;
	
	if(!Ext.isIE6 && !Ext.isIE7 && !Ext.isIE8){
		if(Ext.isIE){
			isUseFlash=true;
		}else{
			if(matech.flashChecker().f){
				isUseFlash=true;
			}else{
				isUseFlash=false;
			}
		}
	}else{
		isUseFlash=false;
	}
	
	if(isUseFlash){
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
					flashUrl : MATECH_SYSTEM_WEB_ROOT + '/share/js/attach/swfupload.swf',			
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


//删除附件
function attachRemove(attachId,inputId,single,attachName) {
	var str = "";
	if(attachName){
		if("single" == single){
			str = "是否确认要删除【"+attachName+"】图片？";		
		}else{
			str = "是否确认要删除【"+attachName+"】附件？";		
		}
	}else{
		if("single" == single){
			str = "是否确认要删除该图片？";		
		}else{
			str = "是否确认要删除该附件？";		
		}		
	}
	
	matech.confirm('提示信息',str,function(e){	
		if(e=="ok"){
			
	    	var inputObj = document.getElementById(inputId);
	    	var mode = inputObj.getAttribute("mode"); //mode=true 去掉【是否由上传人修改或删除附件】
	    	
	    	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachRemove";
	    	var request = "attachId=" + attachId + "&mode=" + mode;
	    	var result = ajaxLoadPageSynch(url, request);
	    	
	    	if(result == "success") {
	    		if("single" == single){
	    			attachImageInit(inputId); //当为图片附件上传时，则调用图片附件的初始化
	    		}else if(single=="audio"){
	    			$("#"+attachId).remove();
	    		}else{
	    		   attachInit(inputId);
	    		}
	    	}else{
	    		matech.alert(result);
	    	}	
		}
	
	});   
	
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
	        modal:true,
	        layout:'fit',        	
       	    listeners : {
	         	'hide':{
	         		fn: function () {
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
	
 	setBigImageWin.show(); 
 			
}


//缩放图片，imgSrc用户延迟加载图片url
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

function attachImageInit(inputId) {
	var inputObj = document.getElementById(inputId);
	var buttonText = inputObj.getAttribute("buttontext") || inputObj.getAttribute("buttonText") || "添加图片";
	var showButton = true;
	var remove = true;
	var showDownload=true;
	
	var onclick=inputObj.getAttribute("ext_onclick");
	
	if(inputObj.readOnly) {
		showButton = false;
		remove = false;
		showDownload=false;
	}
	var isdownload=inputObj.getAttribute("showdownload") || inputObj.getAttribute("showDownload");
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
			html += "<a href=\"" + MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachDownload&attachId=" + attach.attachId + "\" title=\"下载：" + attach.attachName + "\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/share/img/download16.png\"></a>";
		}
		
		if(remove) {
			html += "<a href=\"javascript:void(1);\" id=\""+inputId+"-del"+i+"\" name=\""+inputId+"-del\"  onclick=\"attachRemove('" + attach.attachId + "','" + inputId + "','single');\" title=\"删除\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/share/img/delete.png\"></a>";
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

//修改附件
var attachUpdateForm=null;
var attachUpdateWin=null;
function attachUpdate(attachId, inputId, mode, imgId){
	//mode, imgId, param
	var inputObj = document.getElementById(inputId);
	
	var indexTable = inputObj.getAttribute("indexTable")||inputObj.getAttribute("indextable");
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
				var attachTypes = (inputObj.getAttribute('attachtypes') ||inputObj.getAttribute('attachTypes') || '').toLowerCase();
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
								} catch (e){ 
									//console.log(e); 
								}
								try {
									if (param.onnotify && param.onnotify.call(param, obj, response) == false){
										return;
									}
								} catch (e){ 
									//console.log(e); 
								}
								
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
										} catch (e){ 
											//console.log(e); 
										}
										if(mode == "single"){
											try {
												if (param.onupdated && param.onupdated.call(param, obj, response) == false){ // 失敗回
													return;
												}	
											} catch (e) { 
												//console.log(e);
											} 
											attachImageInit(inputId,imgId);	//刷新图片
										}else if(mode == "grid"){
											try {
												if (param.onupdated && param.onupdated.call(param, obj, response) == false){ // 失敗回
													return;
												}	
											} catch (e) { 
												//console.log(e);
											} 
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
											} catch (e) { 
												//console.log(e);
											} 
											attachInit(inputId);
										}
									} else {
										try {
											if (param.onprogress && param.onprogress.call(param, obj, response) == false){ // 失敗回
												return;
											}	
										} catch (e) { 
											//console.log(e);
										} 
										Ext.MessageBox.updateProgress(obj.percentage, obj.msg);	
									}
								} else {
									clearInterval(timer);
									try {
										if (param.onexception && param.onexception.call(param, obj, response) == false){ // 異常回調
											return;
										}
									} catch (e){ 
										//console.log(e); 
									}
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

//获取文件后缀名
function getFileExt(filepath) {
	if (filepath != "") {
		var pos = filepath.replace(/.+\./, "").toLowerCase();
		return pos;
	}
}

//检查最大附件数
function checkMaxAttach(inputId) {
	var inputObj = document.getElementById(inputId);
	var maxAttach = inputObj.getAttribute("maxattach") || inputObj.getAttribute("maxAttach") || 0;
	
	if(maxAttach != 0 && getAttachCount(inputId) >= maxAttach) {
		alert("对不起，只允许上传" + maxAttach + "个文件,请先删除后再上传!");
		return false;
	} else {
		return true;
	}
}
