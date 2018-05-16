var SWFUOBJ;//当前操作的批量上传对象：一个页面只有一个这样的对象
//判断浏览器的类型
function getBrowserType() {  
   var browser = {};  
   var userAgent = navigator.userAgent.toLowerCase();  
   var s;  
   (s = userAgent.match(/msie ([\d.]+)/))  
           ? browser.ie = s[1]  
           : (s = userAgent.match(/firefox\/([\d.]+)/))  
                   ? browser.firefox = s[1]  
                   : (s = userAgent.match(/chrome\/([\d.]+)/))  
                            ? browser.chrome = s[1]  
                            : (s = userAgent.match(/opera.([\d.]+)/))  
                                    ? browser.opera = s[1]  
                                    : (s = userAgent  
                                            .match(/version\/([\d.]+).*safari/))  
                                            ? browser.safari = s[1]  
                                            : 0;  
    var oType = "";  
    if (browser.ie) {  
    	oType = "ie";
    } else if (browser.firefox) {  
    	oType = "firefox";
    } else if (browser.chrome) {  
    	oType = "chrome";
    } else if (browser.opera) {  
    	oType = "opera";
    } else if (browser.safari) {  
    	oType = "safari"; 
    } else {  
    	oType = '未知浏览器';  
    }  
    return oType;  
} 


function fileQueueError(file, errorCode, message) {
	
	try {
		var imageName = "<font color='red'>文件上传错误</font>";
		var errorName = "";
		if (errorCode === SWFUpload.errorCode_QUEUE_LIMIT_EXCEEDED) {
			errorName = "You have attempted to queue too many files.";
		}

		if (errorName !== "") {
			alert(errorName);
			return;
		}
		
		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			imageName = "<font color='red'>文件大小为0</font>";
			break;
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			imageName = "<font color='red'>文件大小超过"+SWFUOBJ.getSetting("file_size_limit")+"限制</font>";
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		default:
			if(parseInt(message)==0)
				alert("已达到一次上传限制，请先保存后再次添加！")
			else
				alert(message);
			break;
		}
		addReadyFileInfo(file.id,file.name,imageName,"无法上传");

	} catch (ex) {
		this.debug(ex);
	}
}

/**
 * 当文件选择对话框关闭消失时，如果选择的文件成功加入上传队列，
 * 那么针对每个成功加入的文件都会触发一次该事件（N个文件成功加入队列，就触发N次此事件）。
 * @param {} file
 * id : string,			    // SWFUpload控制的文件的id,通过指定该id可启动此文件的上传、退出上传等
 * index : number,			// 文件在选定文件队列（包括出错、退出、排队的文件）中的索引，getFile可使用此索引
 * name : string,			// 文件名，不包括文件的路径。
 * size : number,			// 文件字节数
 * type : string,			// 客户端操作系统设置的文件类型
 * creationdate : Date,		// 文件的创建时间
 * modificationdate : Date,	// 文件的最后修改时间
 * filestatus : number		// 文件的当前状态，对应的状态代码可查看SWFUpload.FILE_STATUS }
 */
function fileQueued(file){
	addReadyFileInfo(file.id,file.name,"加载成功");
	SWFUOBJ.startUpload();
}
function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
		if (numFilesQueued > 0) {
			document.getElementById('btnCancel').disabled = "";
			this.startUpload();
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadProgress(file, bytesLoaded) {

	try {
		var percent = Math.ceil((bytesLoaded / file.size) * 100);

		var progress = new FileProgress(file,  this.customSettings.upload_target);
		progress.setProgress(percent);
		if (percent === 100) {
			progress.setStatus("");//正在创建缩略图...
			progress.toggleCancel(false, this);
		} else {
			progress.setStatus("正在上传...");
			addFileInfo(file.id,"正在上传...");
			progress.toggleCancel(true, this);
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadSuccess(file, serverData) {
	try {
		new FileProgress(file,  this.customSettings.upload_target);
		addFileInfo(file.id,"文件上传完成");
		addFileId(file.id,serverData);
//		alert(serverData);
	} catch (ex) {
		this.debug(ex);
	}
}

function addFileId(fileId,id){
	var row = document.getElementById(fileId);
	row.cells[4].innerHTML = id;
//	alert(row.cells[4].innerHTML);
}
function addFileInfo(fileId,message){
	var row = document.getElementById(fileId);
	row.cells[2].innerHTML = "<font color='green'>"+message+"</font>";
}
function addReadyFileInfo(fileid,fileName,message,status){
	//用表格显示
	var prefix=SWFUOBJ.getSetting("prefix"); 
	var infoTable = document.getElementById("infoTable_"+prefix);
	$("#thumbnails").css("display","block");
	//获取浏览器的类型
	var oType = getBrowserType();
	var row;
	var col1;
	var col2;
	var col3;
	var col4;
	var col5;
	switch(oType){
	    case "ie":
	    	row = infoTable.insertRow();
	    	row.id = fileid;
	    	col1 = row.insertCell();
	    	col2 = row.insertCell();
	    	col3 = row.insertCell();
	    	col4 = row.insertCell();
	    	col5 = row.insertCell();
	        break;
	    case "firefox":
	    	row = infoTable.insertRow(-1);
	    	row.id = fileid;
	    	col1 = row.insertCell(-1);
	    	col2 = row.insertCell(-1);
	    	col3 = row.insertCell(-1);
	    	col4 = row.insertCell(-1);
	    	col5 = row.insertCell(-1);
	        break;
	    default:
	    	row = infoTable.insertRow();
	    	row.id = fileid;
	    	col1 = row.insertCell();
	    	col2 = row.insertCell();
	    	col3 = row.insertCell();
	    	col4 = row.insertCell();
	    	col5 = row.insertCell();
	        break;
	}
	col4.align = "right";
	col1.innerHTML = message+" : ";
	col2.innerHTML = fileName;
	if(status!=null&&status!=""){
		col3.innerHTML="<font color='red'>"+status+"</font>";
	}else{
		col3.innerHTML="";
	}
	col4.innerHTML = "<a href='javascript:deleteFile(\""+fileid+"\")'>删除</a>";
	col1.style.width="80";
	col2.style.width="180";
	col3.style.width="80";
	col4.style.width="50";
	col5.style.display="none";
}

function cancelUpload(){
	var prefix=SWFUOBJ.getSetting("prefix");
	var infoTable = document.getElementById("infoTable_"+prefix);
	var rows = infoTable.rows;
	var ids = new Array();

	if(rows==null){
		return false;
	}
	for(var i=0;i<rows.length;i++){
		ids[i] = rows[i].id;
	}	
	for(var i=0;i<ids.length;i++){
		deleteFile(ids[i]);
	}	
}
function deleteFile(fileId){
	//用表格显示
	var prefix=SWFUOBJ.getSetting("prefix");
	var infoTable = document.getElementById("infoTable_"+prefix);
	var row = document.getElementById(fileId);
	var filePath = row.cells[4].innerHTML;
	var _url=SWFUOBJ.getSetting("delete_url");
	var i=_url.indexOf("&");

	//删除上传成功的文件
	$.ajax({
		type : 'post',
		url : _url,
		data : 'filePath='+filePath+_url.substr(i),
		success : function(data) { // 判断是否成功
			//处理被删除的节点
			infoTable.deleteRow(row.rowIndex);
			SWFUOBJ.cancelUpload(fileId,false);
		},
		error:function(data){
			addFileInfo(fileId,"<font color='red'>删除文件夹出错</a>");
		}
	});
	
}

function uploadComplete(file) {
	try {
		/*  I want the next upload to continue automatically so I'll call startUpload here */
		if (this.getStats().files_queued > 0) {
			this.startUpload();
		} else {
			var progress = new FileProgress(file,  this.customSettings.upload_target);
			progress.setComplete();
			progress.setStatus("<font color='red'>所有文件上传完毕!</b></font>");
			progress.toggleCancel(false);
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadError(file, errorCode, message) {
	
	var imageName =  "<font color='red'>文件上传出错!</font>";
	var progress;
	try {
		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			try {
				progress = new FileProgress(file,  this.customSettings.upload_target);
				progress.setCancelled();
				progress.setStatus("<font color='red'>取消上传!</font>");
				progress.toggleCancel(false);
			}
			catch (ex1) {
				this.debug(ex1);
			}
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			try {
				progress = new FileProgress(file,  this.customSettings.upload_target);
				progress.setCancelled();
				progress.setStatus("<font color='red'>停止上传!</font>");
				progress.toggleCancel(true);
			}
			catch (ex2) {
				this.debug(ex2);
			}
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			imageName = "<font color='red'>文件大小超过限制!</font>";
			break;
		default:
			alert(message);
			break;
		}
		addFileInfo(file.id,imageName);
	} catch (ex3) {
		this.debug(ex3);
	}

}


function addImage(src) {
	var newImg = document.createElement("img");
	newImg.style.margin = "5px";

	document.getElementById("thumbnails").appendChild(newImg);
	if (newImg.filters) {
		try {
			newImg.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 0;
		} catch (e) {
			// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
			newImg.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + 0 + ')';
		}
	} else {
		newImg.style.opacity = 0;
	}

	newImg.onload = function () {
		fadeIn(newImg, 0);
	};
	newImg.src = src;
}

function fadeIn(element, opacity) {
	var reduceOpacityBy = 5;
	var rate = 30;	// 15 fps


	if (opacity < 100) {
		opacity += reduceOpacityBy;
		if (opacity > 100) {
			opacity = 100;
		}

		if (element.filters) {
			try {
				element.filters.item("DXImageTransform.Microsoft.Alpha").opacity = opacity;
			} catch (e) {
				// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
				element.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + opacity + ')';
			}
		} else {
			element.style.opacity = opacity / 100;
		}
	}

	if (opacity < 100) {
		setTimeout(function () {
			fadeIn(element, opacity);
		}, rate);
	}
}



/* ******************************************
 *	FileProgress Object
 *	Control object for displaying file info
 * ****************************************** */
/**
 * 此方法目前没用到，显示的层已经隐藏了。如果需要的话，只需要把divFileProgressContainer
 * 这个层的display设置为显示就行
 */
function FileProgress(file, targetID) {
	this.fileProgressID = "divFileProgress";

	this.fileProgressWrapper = document.getElementById(this.fileProgressID);
	if (!this.fileProgressWrapper) {
		this.fileProgressWrapper = document.createElement("div");
		this.fileProgressWrapper.className = "progressWrapper";
		this.fileProgressWrapper.id = this.fileProgressID;

		this.fileProgressElement = document.createElement("div");
		this.fileProgressElement.className = "progressContainer";

		var progressCancel = document.createElement("a");
		progressCancel.className = "progressCancel";
		progressCancel.href = "#";
		progressCancel.style.visibility = "hidden";
		progressCancel.appendChild(document.createTextNode(" "));

		var progressText = document.createElement("div");
		progressText.className = "progressName";
		progressText.appendChild(document.createTextNode("上传文件: "+file.name));

		var progressBar = document.createElement("div");
		progressBar.className = "progressBarInProgress";

		var progressStatus = document.createElement("div");
		progressStatus.className = "progressBarStatus";
		progressStatus.innerHTML = "&nbsp;";

		this.fileProgressElement.appendChild(progressCancel);
		this.fileProgressElement.appendChild(progressText);
		this.fileProgressElement.appendChild(progressStatus);
		this.fileProgressElement.appendChild(progressBar);

		this.fileProgressWrapper.appendChild(this.fileProgressElement);
		document.getElementById(targetID).style.height = "75px";
		document.getElementById(targetID).appendChild(this.fileProgressWrapper);
		fadeIn(this.fileProgressWrapper, 0);

	} else {
		this.fileProgressElement = this.fileProgressWrapper.firstChild;
		this.fileProgressElement.childNodes[1].firstChild.nodeValue = "上传文件: "+file.name;
	}

	this.height = this.fileProgressWrapper.offsetHeight;

}
FileProgress.prototype.setProgress = function (percentage) {
	this.fileProgressElement.className = "progressContainer green";
	this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
	this.fileProgressElement.childNodes[3].style.width = percentage + "%";
};
FileProgress.prototype.setComplete = function () {
	this.fileProgressElement.className = "progressContainer blue";
	this.fileProgressElement.childNodes[3].className = "progressBarComplete";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setError = function () {
	this.fileProgressElement.className = "progressContainer red";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setCancelled = function () {
	this.fileProgressElement.className = "progressContainer";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setStatus = function (status) {
	this.fileProgressElement.childNodes[2].innerHTML = status;
};

FileProgress.prototype.toggleCancel = function (show, swfuploadInstance) {
	this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
	if (swfuploadInstance) {
		var fileID = this.fileProgressID;
		this.fileProgressElement.childNodes[0].onclick = function () {
			swfuploadInstance.cancelUpload(fileID);
			return false;
		};
	}
};

//初始化批量上传标签
function mutiAttachInit(inputId){
	var inputObj = document.getElementById(inputId);
	
	var prefix=inputId;

	var html='<div style="text-align:left;">'+
			 '<span id="spanButtonPlaceholder_'+prefix+'"></span>'+
			 '<div id="divFileProgressContainer_'+prefix+'" style="width:200;display:none;"></div>'+
			 '<div id="thumbnails">'+
			 ' 	<table id="infoTable_'+prefix+'" border="0" width="90%" style="border: solid 1px #7FAAFF; background-color: #C5D9FF; padding: 2px;margin-top:8px;">'+
			 '</table></div></div>';
	var divObj = document.createElement("<div id=\"attachDiv_" + prefix + "\"></div>");
	divObj = inputObj.parentElement.insertBefore(divObj);
	divObj.innerHTML =html;
		
	SWFInit(inputObj);
}
//初始化批量上传对象
function SWFInit(inputObj) {

	var _prefix=inputObj.id;
	var _buttonText = inputObj.buttonText || "添加附件";
	var _handler = inputObj.handler || "CommonHandler";	
	var _indexTable = inputObj.indexTable||"";
	var _maxAttach = inputObj.maxAttach||"20";
	var _uploadurlparam = inputObj.uploadurlparam||"";
	var _deleteurlparam = inputObj.deleteurlparam||"";
	var _indexId = inputObj.value||"";
	var _file_size_limit = inputObj.fileSize||"10 MB";
	
	/*
	if(_indexId==""){
		alert("附件上传初始值为空,无法进行初始化...");
		return;
	}*/
	//文件类型选择
	var fileType = inputObj.ext_filetype;
	var fileTypeReg="";
	if(fileType){
		var fileTypeArray=fileType.toLowerCase().split("|");
		Ext.each(fileTypeArray,function(_obj){
			if(fileTypeReg==""){
				fileTypeReg="*."+_obj;
			}else{
				fileTypeReg=fileTypeReg+";*."+_obj;
			}
		});
	}else{
		fileTypeReg="*.*";
	}
	
	SWFUOBJ = new SWFUpload({
		prefix:_prefix,
		upload_url: "general.do?method=batchUpload&handler="+_handler+"&indexTable="+_indexTable+"&indexId=" + _indexId+_uploadurlparam,
		delete_url:"general.do?method=deleteFile&handler="+_handler+"&indexTable="+_indexTable+"&indexId="+ _indexId+_deleteurlparam,
		// File Upload Settings
		file_size_limit : _file_size_limit,	// 10MB
		file_types :fileTypeReg,//设置可上传的类型
		file_types_description : "所有文件",
		file_upload_limit :_maxAttach,
						
		file_queue_error_handler : fileQueueError,//选择文件后出错
		file_dialog_complete_handler : fileDialogComplete,//选择好文件后提交
		file_queued_handler : fileQueued,
		upload_progress_handler : uploadProgress,
		upload_error_handler : uploadError,
		upload_success_handler : uploadSuccess,
		upload_complete_handler : uploadComplete,

		// Button Settings
		button_image_url : MATECH_SYSTEM_WEB_ROOT+"/images/SmallSpyGlass.png",
		button_placeholder_id : "spanButtonPlaceholder_"+_prefix,
		button_width: 100,
		button_height: 18,
		button_text : '<span class="button">'+_buttonText+'</span>',
		button_text_style : '.button { font-family: Helvetica, Arial, sans-serif; font-size: 12pt; } .buttonSmall { font-size: 10pt; }',
		button_text_top_padding:0,
		button_text_left_padding: 18,
		button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
		button_cursor: SWFUpload.CURSOR.HAND,
		
		// Flash Settings
		flash_url : MATECH_SYSTEM_WEB_ROOT+"/js/swfupload/swfupload.swf",

		custom_settings : {
			upload_target : "divFileProgressContainer_"+_prefix
		},
		// Debug Settings
		debug: false  //是否显示调试窗口
	});
	
};

Ext.onReady(function (){
	var inputArray ;

	inputArray = Ext.query("input[ext_type=attachMutiFile]") ;
	
	Ext.each(inputArray,function(input){
		mutiAttachInit(input.id);
	});
}) ;

