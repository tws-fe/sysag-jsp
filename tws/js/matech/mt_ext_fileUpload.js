/*****上传下载控件************************************/   
	var attachUploadForm = null;
	var attachUploadWin = null;
	//获取附件数量
	matech.getAttachCount=function (inputId) {
		var inputObj = document.getElementById(inputId);
		var prefix = inputObj.id;
		var attachUlId = "attachUl_" + prefix; 
		
		return document.getElementById(attachUlId).children.length;
	};
	//检查最大附件数
	matech.checkMaxAttach=function (inputId) {

		var inputObj = document.getElementById(inputId);
		var maxAttach = inputObj.maxAttach || 0;
		
		if(maxAttach != 0 && matech.getAttachCount(inputId) >= maxAttach) {
			alert("对不起，只允许上传" + maxAttach + "个文件,请先删除后再上传!");
			return false;
		} else {
			return true;
		}
	};	
	//上传附件
	matech.attachUpload=function (inputId) {
		
		var inputObj = document.getElementById(inputId);
		
		var indexTable = inputObj.getAttribute("indexTable");
		var indexId = inputObj.value;
		var callback = inputObj.getAttribute("ext_callback");
		var handler = inputObj.getAttribute("handler") || "CommonHandler";
		var saveToDB=inputObj.getAttribute("saveToDB") || "true";
		var uploadType=inputObj.getAttribute("refer");
		
		var infoText = "";
		/*
		if(handler=="PlanAttachHandler"){
			infoText = "<label style='color: red; height: 18px; width:300;'>"+"支持的文件类型doc、docx"+"</label>";
		}else if(handler=="DocumentHandler"){
			infoText = "<label style='color: red; height: 18px; width:300;'>"+"支持的文件类型doc、docx、xls、xlsx、jpg、pdf"+"</label>";
		}else if(handler=="TrainHandler"){
			infoText = "<label style='color: red; height: 18px; width:300;'>"+"请将课件压缩成rar或zip格式后导入"+"</label>";
		}else if(indexTable=="meeting"){
			infoText = "<label style='color: red; height: 18px; width:300;'>"+"支持的文件类型 doc、rar "+"</label>";
		}else{
			
		}*/
		
		if(uploadType){
			//对上传文书进行特殊处理：拍照导入
			if(indexTable=="prjPaper" && document.getElementById(uploadType).value=="3"){
				matech.callCamere(matech.parentObj,"PAPER"+indexId);
				matech.attachInit(inputId);
				return;
			}	
		}
		
		//文件类型选择
		var fileType = inputObj.getAttribute("ext_filetype");
		var fileTypeReg="";
		if(fileType){
			infoText="<label style='color: red; height: 18px; width:800;font-size:10pt;'>支持的文件类型:";
			var fileTypeArray=fileType.toLowerCase().split("|");
			Ext.each(fileTypeArray,function(_obj){
				if(fileTypeReg==""){
					fileTypeReg="fileTypeReg=/\\.("+_obj;
				}else{
					fileTypeReg=fileTypeReg+"|"+_obj;
				}
				fileTypeReg=fileTypeReg+"|"+_obj.toUpperCase();
				infoText=infoText+_obj+"、";
			});
			fileTypeReg=fileTypeReg+")$/";
			eval(fileTypeReg);
			
			infoText=infoText.substring(0, infoText.length-1)+"</label>";
			
		}else{
			fileTypeReg=/.*/;
			infoText="<label style='color: red; height: 18px; width:300;'>支持所有文件类型</label>";
		}
		
		if(!matech.checkMaxAttach(inputId)) {
			return;
		}
		
		var fileuploadField={
				            xtype: 'fileuploadfield',
				            id: 'form-file',
				            emptyText: '请选择需要上传的文件',
				            name: 'attachPath',
				            buttonText: '',
				            regex:fileTypeReg,
				            buttonCfg: {
				            	text:'选择文件'
				            }
				        };
		
		var infoTextField={
				        	id:"infoText",
				        	height: 15,
				        	fieldLabel:infoText
				          };
		
		if(attachUploadForm == null) {
			attachUploadForm = new Ext.FormPanel({
				url: "",
				border:false,
				height:80,
				width: 600,
		        fileUpload: true,
		        frame: true,
				bodyStyle: 'padding: 5px;',
		        labelWidth: 1,
		        defaults: {
		            anchor: '95%',
		            allowBlank: false,
		            msgTarget: 'side'
		        },
		        items: [fileuploadField,infoTextField]
		    });

		} else {
			attachUploadForm.removeAll();
			
			attachUploadForm.add(fileuploadField);
			attachUploadForm.add(infoTextField);
			
			attachUploadForm.getForm().reset();
		}

		//每次重置表单url地址
		attachUploadForm.form.url = MATECH_SYSTEM_WEB_ROOT + '/general.do?method=attachUpload&handler='+handler+'&indexTable=' + indexTable + "&indexId=" + indexId+"&saveToDB="+saveToDB;
		//改为每次创建新窗口
		attachUploadWin = new Ext.Window({
			title: '文件上传',
			width: 600,
			height:140,
			modal:true,
			resizable:false,
			layout:'fit',
			closeAction:'hide',
			items: attachUploadForm,
			buttons: [{
				text: '确定',
				icon:MATECH_SYSTEM_WEB_ROOT + '/tws/css/img/confirm.gif',
				handler: function(){
		             if(attachUploadForm.getForm().isValid()){
		             	// 显示进度条
		             	Ext.MessageBox.show({ 
							    title: '上传文件', 
							    width:240, 
							    progress:true, 
							    closable:false
							}); 
							
							var formUrl = MATECH_SYSTEM_WEB_ROOT + "/general.do?method=getAttachNumber";
							var formRequest = "&indexId=" + indexId+"&handler="+handler;
							var beforeLength = ajaxLoadPageSynch(formUrl, formRequest);
						
							// 提交表单
			                attachUploadForm.getForm().submit();
			                
			                var i = 0;
						    var timer = setInterval(function(){
								// 请求事例
								Ext.Ajax.request({
									url: MATECH_SYSTEM_WEB_ROOT + '/general.do?method=attachUploadProcess&rand=' + Math.random(),
									method: 'post',
									// 处理ajax的返回数据
									success: function(response, options){
										status = response.responseText + " " + i++;
										var obj = Ext.util.JSON.decode(response.responseText);
										if(obj.success!=false){
											
										var url = MATECH_SYSTEM_WEB_ROOT + "/general.do?method=getAttachNumber";
										var request = "&indexId=" + indexId+"&handler="+handler;
										var afterLengh = ajaxLoadPageSynch(url, request);
																			
										if(afterLengh>beforeLength){	
											if(obj.finished){
												clearInterval(timer);	
												// status = response.responseText;
												Ext.MessageBox.updateProgress(1, 'finished', 'finished');
												Ext.MessageBox.hide();
												attachUploadWin.hide();
												matech.attachInit(inputId);
												
												if(callback){
													eval(callback+"("+Ext.util.JSON.encode(obj.params)+")");
												}
											} else {
												Ext.MessageBox.updateProgress(obj.percentage, obj.msg);	
											}
										}else{
												Ext.MessageBox.updateProgress(obj.percentage, obj.msg);	
										}
										
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
	         icon:MATECH_SYSTEM_WEB_ROOT + '/tws/css/img/refresh.gif',
	         handler: function(){
	             attachUploadForm.getForm().reset();
	         }
	    	},{
	    		text: '取消',
	    		icon:MATECH_SYSTEM_WEB_ROOT + '/tws/css/img/close.gif',
	    		handler: function(){
	    			attachUploadWin.hide();
	    		}
	    	}]
	 });
		attachUploadWin.show();
	};

	matech.attachInit=function (inputId) {

		var inputObj = document.getElementById(inputId);
		
		// 按钮文字,默认为添加附件
		var buttonText = inputObj.getAttribute("buttonText") || "添加附件";
		var buttonClick = inputObj.getAttribute("buttonClick");
		var handler = inputObj.getAttribute("handler") || "CommonHandler";
		
		var showButton = true;
		var remove = true;
		
		if(inputObj.readOnly) {
			showButton = false;
			remove = false;
		}
		
		var _showButton=inputObj.getAttribute("showButton")||"";
		if(_showButton!=""){
			if(_showButton=="true"){
				showButton=true;
			}else{
				showButton=false;
			}			
		}
		
		var _showRemove=inputObj.getAttribute("showRemove")||"";

		if(_showRemove!=""){
			if(_showRemove=="true"){
				remove=true;
			}else{
				remove=false;
			}
		}
		
		//不再单独控制，通过只读来设置
		//
		// 是否显示上传按钮,默认为true
		//var showButton = inputObj.showButton == false ? false : true;
		// 是否允许删除,默认为true
		//var remove = inputObj.remove == false ? false : true;
		
		var indexTable = inputObj.getAttribute("indexTable");
		
		if(inputObj.value == "") {
			alert("上传附件控件初始值为空,无法初始化...");
			return;
			//inputObj.value = new UUID().createUUID();
		}
		
		var indexId = inputObj.value;
		var prefix = inputObj.id;
		
		var url = MATECH_SYSTEM_WEB_ROOT + "/general.do?method=getAttachList";
		var request = "handler="+handler+"&indexTable=" + indexTable + "&indexId=" + indexId;
		
		var result = ajaxLoadPageSynch(url, request);
		
		var attachList = Ext.util.JSON.decode(result);

		var html = "";
		for(var i=0; i < attachList.length; i++) {
			var attach = attachList[i];
			if(matech.parentObj){
				html += "<li>"
					  + "<span>"
					  + "<a href=\"#\" onclick=\"matech.openAttach('"+handler+"','" + attach.attachId + "');\" title=\"下载：" + attach.attachName + "\">" + maxString(attach.attachName) + "</a>"
					  + "&nbsp;<font style=\"color:#CCCCCC;\">" + formatDecimal((attach.fileSize/1024),2) + " KB</font>"
					  + "</span>"
					  + "&nbsp;<a href=\"" + MATECH_SYSTEM_WEB_ROOT + "/general.do?method=attachDownload&handler="+handler+"&attachId=" + attach.attachId + "\" title=\"下载：" + attach.attachName + "\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/tws/css/img/download.gif\"></a>";	
					  //+ "&nbsp;<a href=\"#\" onclick=\"matech.openAttach('"+handler+"','" + attach.attachId + "');\" title=\"下载：" + attach.attachName + "\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/tws/css/img/download.gif\"></a>";				
			}else{
				html += "<li>"
					  + "<span>"
					  + "<a href=\"" + MATECH_SYSTEM_WEB_ROOT + "/general.do?method=attachDownload&handler="+handler+"&attachId=" + attach.attachId + "\" title=\"下载：" + attach.attachName + "\">" + maxString(attach.attachName) + "</a>"
					  + "&nbsp;<font style=\"color:#CCCCCC;\">" + formatDecimal((attach.fileSize/1024),2) + " KB</font>"
					  + "</span>"
					  + "&nbsp;<a href=\"" + MATECH_SYSTEM_WEB_ROOT + "/general.do?method=attachDownload&handler="+handler+"&attachId=" + attach.attachId + "\" title=\"下载：" + attach.attachName + "\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/tws/css/img/download.gif\"></a>";			
			}
			if(remove) {
				html += "&nbsp;<a href=\"#\" onclick=\"matech.attachRemove('" + attach.attachId + "','" + inputId +"','" + handler + "');\" title=\"删除\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/tws/css/img/delete.gif\"></a>";
			}
			
			html += "</li>";
		}
		var attachUlId = "attachUl_" + prefix; 
		var attachButtonId = "attachButton_" + prefix;
		var attachDivId = "attachDiv_" + prefix;
		
		
		var ul = document.getElementById(attachUlId);
		if(ul == null || !ul) {
			var divObj = matech.mycreateElement("<div id=\"" + attachDivId + "\"></div>","div",attachDivId);
			divObj = inputObj.parentElement.insertBefore(divObj);
			
			var buttonDiv = matech.mycreateElement("<div id=\"" + attachButtonId +"\"></div>","div",attachButtonId);
			ul = matech.mycreateElement("<ul id=\"" + attachUlId + "\"></ul>","ul",attachUlId);
			
			divObj.appendChild(buttonDiv);
			divObj.appendChild(ul);
		}else{
			ul.innerHTML="";
		}

		ul.innerHTML = html;
		
		
		// 是否显示按钮
		if(showButton) {
			var attachButton = document.getElementById(attachButtonId);
			if(buttonClick){
				attachButton.innerHTML = "<input type=\"button\" class=\"flyBT\" value=\"" + buttonText + "\" onclick=\""+buttonClick+"('" + inputId + "')\" ><br/><br/>";
			}else{
				attachButton.innerHTML = "<input type=\"button\" class=\"flyBT\" value=\"" + buttonText + "\" onclick=\"matech.attachUpload('" + inputId + "')\" ><br/><br/>";
			}
		}
	};

	
	matech.attachInitHtml=function (indexTable,indexId,callback,handler) {
		handler = handler||"CommonHandler";
		
		var url = MATECH_SYSTEM_WEB_ROOT + "/general.do?method=getAttachList";
		var request = "handler="+handler+"&indexTable=" + indexTable + "&indexId=" + indexId;
		
		var result = ajaxLoadPageSynch(url, request);
		
		var attachList = Ext.util.JSON.decode(result);
		
		var html = "";
		for(var i=0; i < attachList.length; i++) {
			var attach = attachList[i];
			if(callback){
				html += "<li>"
					  + "<span>"
					  + "<a onclick=\""+callback+"('"+indexId+"')\" href=\"" + MATECH_SYSTEM_WEB_ROOT + "/general.do?method=attachDownload&handler="+handler+"&attachId=" + attach.attachId + "\" title=\"下载：" + attach.attachName + "\">" + maxString(attach.attachName) + "</a>"
					  + "&nbsp;<font style=\"color:#CCCCCC;\">" + formatDecimal((attach.fileSize/1024),2) + " KB</font>"
					  + "</span>"
					  + "&nbsp;<a onclick=\""+callback+"('"+indexId+"')\" href=\"" + MATECH_SYSTEM_WEB_ROOT + "/general.do?method=attachDownload&handler="+handler+"&attachId=" + attach.attachId + "\" title=\"下载：" + attach.attachName + "\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/tws/css/img/download.gif\"></a>";
				
				html += "</li>";							
			}else{
				html += "<li>"
					  + "<span>"
					  + "<a href=\"" + MATECH_SYSTEM_WEB_ROOT + "/general.do?method=attachDownload&handler="+handler+"&attachId=" + attach.attachId + "\" title=\"下载：" + attach.attachName + "\">" + maxString(attach.attachName) + "</a>"
					  + "&nbsp;<font style=\"color:#CCCCCC;\">" + formatDecimal((attach.fileSize/1024),2) + " KB</font>"
					  + "</span>"
					  + "&nbsp;<a href=\"" + MATECH_SYSTEM_WEB_ROOT + "/general.do?method=attachDownload&handler="+handler+"&attachId=" + attach.attachId + "\" title=\"下载：" + attach.attachName + "\"><img src=\"" + MATECH_SYSTEM_WEB_ROOT + "/tws/css/img/download.gif\"></a>";
				
				html += "</li>";				
			}
		}

		var divObj = "<div><ul>"+html+"</ul></div>";
		
		return divObj;
	};
	
	matech.gridAttachHtml=function(handler,indexId){
		var url = MATECH_SYSTEM_WEB_ROOT+"/general.do?method=getAttachList";
		var request = "&handler="+handler+"&indexId=" + indexId;	
		var text="";
		var result = ajaxLoadPageSynch(url, request);
		var attachList=Ext.util.JSON.decode(result);
		if(attachList.length>0){
			var attach=attachList[0];

			var attName=attach.attachName;
			var attId=attach.attachId;

			text="<div ><a href='#' style='color:#00F;' onclick='matech.openAttach(\""+handler+"\",\""+attId+"\");'>"+attName+"</a></div>";
		}
		return text;		
	};
	//删除附件
	matech.attachRemove=function (attachId,inputId,handler) {

		var url = MATECH_SYSTEM_WEB_ROOT + "/general.do?method=attachRemove";
		var request ="handler="+handler+"&attachId=" + attachId;
		var result = ajaxLoadPageSynch(url, request);
		
		if(result == "success") {
			matech.attachInit(inputId);
		}
	};	 
	
	//下载附件
	matech.attachDownload=function (handler,attachId) {

		var url = MATECH_SYSTEM_WEB_ROOT + "/general.do?method=attachDownload";
		var request ="handler="+handler+"&attachId=" + attachId;
		var result = ajaxLoadPageSynch(url, request);
		
		if(result == "success") {
			matech.attachInit(inputId);
		}
	};	
	
	matech.mycreateElement=function(html,objtype,id){
		try{  
			return document.createElement(html);
		}catch(e){
			//ie9以上版本
			var new_name_item = document.createElement(objtype);  
	        new_name_item.id = id;  
			return new_name_item;
		}
	};
	
	Ext.onReady(function (){
		var inputArray ;

		inputArray = Ext.query("input[ext_type=attachFile]") ;
		
		Ext.each(inputArray,function(input){
			matech.attachInit(input.id);
		});
		
	}) ;
	