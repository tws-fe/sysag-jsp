Ext.namespace("Ext.matech.webOffice");

Ext.matech.webOffice = function (config){
	var AuditReport=null;
	//var userWorkPath="c:\\manu\\test\\";
	var _ManuWorkDir="";
	var _isTrackChange=false;
	var _isTrackRev=false;
	var _isRefresh = false;
	
	
	return {
		setHandler:function(Handler){
			this.Handler=Handler;
		},
		setFileName:function(FileName){
			this.FileName=FileName;
		},
		getFileName:function(){
			return this.FileName;
		},
		setOpenUrl:function(OpenUrl){
			this.OpenUrl=OpenUrl;
		},
		setOpenUrlParameter:function(OpenUrlParameter){
			this.OpenUrlParameter=OpenUrlParameter;
		},
		getOpenUrlParameter:function(){
			return this.OpenUrlParameter;
		},
		setSaveUrl:function(SaveUrl){
			this.SaveUrl=SaveUrl;
		},
		setSaveUrlParameter:function(SaveUrlParameter){
			this.SaveUrlParameter=SaveUrlParameter;
		},		
		getSaveUrlParameter:function(){
			return this.SaveUrlParameter;
		},
		setOpenMode:function(OpenMode){
			this.OpenMode=OpenMode;		
		},		
		getOpenMode:function(){
			return this.OpenMode;
		},
		setIsReadOnly:function(isReadOnly){
			this.isReadOnly=isReadOnly;
		},		
		getIsReadOnly:function(){
			return this.isReadOnly;
		},
		setFileState:function(FileState){
			this.isReadOnly=FileState;
		},		
		getFileState:function(){
			return this.FileState;
		},
		setUserId:function(UserId){
			this.UserId=UserId;
			if(AuditReport){
				AuditReport.subRegWorkPath(this.UserId,_ManuWorkDir +"`" + this.CanSaveAs);
			}
		},		
		getUserId:function(){
			return this.UserId;
			
		},
		setUserName:function(UserName){
			this.UserName=UserName;
			if(AuditReport){
				AuditReport.pUserName=this.UserName;
			}
		},		
		getUserName:function(){
			return this.UserName;
		},
		setCanSaveAs:function(CanSaveAs){
			this.CanSaveAs=CanSaveAs;
			if(AuditReport){
				AuditReport.subRegWorkPath(this.UserId,_ManuWorkDir +"`" + this.CanSaveAs);
			}
		},		
		getCanSaveAs:function(){
			return this.CanSaveAs;
		},
		setUrlParameter:function(UrlParameter){
			this.UrlParameter=UrlParameter;
		},
		getUrlParameter:function(){
			return this.UrlParameter;
		},
		//初始化控件
		init:function(){
			config = config || {}  ;
			Ext.apply(this,config);

			if(!this.OpenMode){
				this.OpenMode=1;
			}

			if(!this.UserId){
				alert("无法获取到操作用户..");
				return;
			}
			if(!this.OpenUrl){
				this.OpenUrl="/general.do?method=attachDownload";
			}
			if(!this.SaveUrl){
				this.SaveUrl="/general.do?method=attachUpload";
			}	
			var ocxDom=document.getElementById("oframe");
			
			if(!ocxDom){

				if(this.OpenMode=="1"){
					ocxHtml='<br>'+
					'<object classid="clsid:C20572B8-6104-45B8-A3EE-303B42C26ABF" id="oframe" width="0%" height="0%" >'+
					'<param name="BorderStyle" value="1">'+
					'<param name="SideBarVisible" value="0">'+
					'<param name="Titlebar" value="0">'+
					'<param name="Menubar" value="1">'+
					'</object>';
				}else{
					ocxHtml='<br>'+
					'<object classid="clsid:C20572B8-6104-45B8-A3EE-303B42C26ABF" id="oframe" width="100%" height="100%" >'+
					'<param name="BorderStyle" value="1">'+
					'<param name="SideBarVisible" value="0">'+
					'<param name="Titlebar" value="0">'+
					'<param name="Menubar" value="1">'+
					'</object>';					
				}
				Ext.DomHelper.append(Ext.getBody(),ocxHtml,true);
			}else{
				if(this.OpenMode=="1"){
					document.getElementById("oframe").width="0%";
					document.getElementById("oframe").height="0%";
				}else{
					document.getElementById("oframe").width="100%";
					document.getElementById("oframe").height="100%";
				}
			}
			if(!AuditReport){
				AuditReport =  new ActiveXObject("AuditReportPoject.AuditReport");
			}			
			if(!AuditReport){
				alert("无法初始化webOffice控件!");
				return;
			}

			/*
			_ManuWorkDir=AuditReport.funGetTempDir()+this.UserName+"\\";
			if (userWorkPath!="E审通工作目录" && AuditReport.funMakeDir(userWorkPath)){
				//自定义目录存在且成功
				_ManuWorkDir=userWorkPath;
			}else{
				//默认目录
				_ManuWorkDir="c:\\manu\\"+this.UserName+"\\";
			}*/
			_ManuWorkDir="c:\\manu\\"+this.UserName+"\\";
			var bCanSaveAs=true;
			
			AuditReport.subRegWorkPath(this.UserId,_ManuWorkDir +"`" + bCanSaveAs);
			AuditReport.pUserName=this.UserName;
			AuditReport.pAppUser=this.UserName;
			AuditReport.pWebRoot=MATECH_SYSTEM_WEB_ROOT;
			AuditReport.pPrintRev = false;
			AuditReport.pShowRev = false; //查看终稿:用false,查看修改痕迹true
			AuditReport.pTrackRev=false;  //修改痕迹	
			
			return AuditReport;
			
		},
		setTrackRev:function(isOpen){
			AuditReport.pShowRev = isOpen;	//查看终稿:用false,查看修改痕迹true
			AuditReport.pTrackRev=isOpen;	//修改痕迹
			
			if(_isTrackRev==isOpen){
				_isTrackChange=false;
			}else{
				_isTrackChange=true;
				_isTrackRev=isOpen;
				AuditReport.SetUserEnv();
			}
		},
		setRefresh:function(isRefresh){
			_isRefresh=isRefresh;
		},
		OpenFileDefault:function(attachId,type){

			this.setOpenUrl("/general.do?method=attachDownload");
			this.setSaveUrl("/general.do?method=attachUpload");
			
			if(!this.Handler){
				this.Handler="CommonHandler";
			}
			
			var url = MATECH_SYSTEM_WEB_ROOT+"/general.do?method=getAttachList";
			var request = "&handler="+this.Handler;	

			if(type=="attachId"){
				request =request+ "&attachId=" + attachId;	
			}else{
				request =request+ "&indexId=" + attachId;	
			}
			
			var result = ajaxLoadPageSynch(url, request);
			var attachList=Ext.util.JSON.decode(result);
			if(attachList.length>0){
				var attach=attachList[0];

				this.setFileName(attach.attachName);
				if(!this.OpenUrlParameter){
					this.setOpenUrlParameter("attachId="+attach.attachId);
				}else{
					this.setOpenUrlParameter("attachId="+attach.attachId+"&"+this.OpenUrlParameter);
				}
				if(!this.SaveUrlParameter){
					this.setSaveUrlParameter("attachId="+attach.attachId);
				}else{
					this.setSaveUrlParameter("attachId="+attach.attachId+"&"+this.SaveUrlParameter);
				}
				this.OpenUrlFile();
			}else{
				alert("没有对应对应的底稿文件！");
			}			
		},
		//打开文件
		OpenUrlFile:function(){
			
			if(!this.UrlParameter){
				this.UrlParameter="";
			}
			if(!this.FileName){
				return;
			}
			if(!this.FileState){
				this.FileState="";
			}
			if(!this.Handler){
				this.Handler="CommonHandler";
			}
			
			AuditReport.pFileName =this.FileName;
			AuditReport.pFileDir=_ManuWorkDir+this.FileName;
		    AuditReport.pOpenUrl = matech.getlocationhost() + MATECH_SYSTEM_WEB_ROOT+this.OpenUrl+"&handler="+this.Handler+"&"+this.OpenUrlParameter;
		    AuditReport.pSaveUrl=matech.getlocationhost() + MATECH_SYSTEM_WEB_ROOT+this.SaveUrl+"&OpenMode="+this.OpenMode+"&handler="+this.Handler+"&userId="+this.UserId+"&"+this.SaveUrlParameter; 
			AuditReport.pUrlParameter=matech.getlocationhost()+"|root="+MATECH_SYSTEM_WEB_ROOT+"|&readonly="+this.isReadOnly+"&handler="+this.Handler+ this.UrlParameter;
		    AuditReport.pDSOFramer=oframe;
		    
		    
		    if(this.OpenMode=="1"){
			    AuditReport.pUTF8=true;
			    //AuditReport.pZipByClient=true;
			    AuditReport.pOpenMode=1;
			    
				try{
					var result=AuditReport.funCheckHasOpen(this.FileName);
					if (result>""){
						alert("名为"+this.FileName+"的文档已经打开,全路径为："+result+"!\n"
							+"EAudit Office不能支持同时打开同名文件，无论它们是否在同一个文件夹中。\n"
							+"要打开第二份文档，请先关闭已经打开的文档。");		
						return;
					}
				}catch(e){
					//老控件，不支持新检查方法
				}
				
				//alert(11);
			    //打开网络文件
			    AuditReport.funOpenUrlFile(2);	

			    if(_isTrackRev){
			    	AuditReport.SetUserEnv();
			    }
			    
			    if(_isRefresh){
			    	AuditReport.subRefreshData();
			    }
			    
			    //AuditReport.SetUserEnv();
			    //alert(222);
			    //AuditReport.subRefreshData();
			    /*
				try{
					AuditReport.subSetPageDirection(1);
					AuditReport.subDefaultExcelPageSet();
					AuditReport.subAddManuInfo();
				}catch(e){}
				//AuditReport.subChangeSheetName("sheet1","33333");
				
				AuditReport.subSetExcelScreenUpdating(false);
				
				
			  	AuditReport.subExcelPageSetTitleAndFooters("11111","","","","","","","");
		
				try{
				   //修复不能打印的BUG；
				   AuditReport.subRepairExcelPrintBug();
					//刷新图形
					AuditReport.subRefreshExcelData(2);
				 }catch(e){}
		
				AuditReport.subSetExcelScreenUpdating(true);
				*/
				
				AuditReport.funSetDocProtectState(this.isReadOnly);
				AuditReport.subShowOfficeStatus(this.FileState);
				
				try{
					AuditReport.subBeforeTerminate();
				}catch(e){}		
				
		    }else{
		    	AuditReport.funOpenUrlFile(1);
		    }
	
		},
		//判断文件是否打开
		FileIsOpene:function(){
			if (AuditReport.pFileOpened){
				return true;
			}else{
				return false;
			}
		},
		//关闭文件
		CloseFile:function(){
			if (AuditReport.pFileOpened){
				if (AuditReport.pHasModified>0){
					if (!confirm('是否确定关闭？')){
						return ;
					}
				}
				AuditReport.funCloseFile();
			}
		},
		//保存文件
		SaveUrlFile:function(){
			if (AuditReport.pFileOpened){
				if (AuditReport.pHasModified>0){
					AuditReport.funSaveUrlFile();		
					AuditReport.subSaveLocal();
				}
			}			
		},
		//查看公式
		RestoreFormula:function(){
			if (AuditReport.pFileOpened){
				AuditReport.RestoreFormula();
			}
		},
		//清理公式
		RestoreToTemplate:function(){
			if (AuditReport.pFileOpened){
				AuditReport.funRestoreToTemplate();
			}
		},
		//清理子索引
		DropSubCode:function(){
			if (AuditReport.pFileOpened){
				AuditReport.subDropSubCode();
			}
		},
		//修改引用公式
		ChangeRefer:function(){
			if (AuditReport.pFileOpened){
				AuditReport.funChangeRefer();
			}
		},
		//删除E审通帐套公式
		DeleteAccFormula:function(){
			if (AuditReport.pFileOpened){
				AuditReport.funDeleteAccFormula();
			}
		},
		//移除单元格公式
		RemoveExcelFormula:function(){
			if (AuditReport.pFileOpened){
		      AuditReport.subRemoveExcelFormula();
			}				
		},
		//单表刷新
		RefreshSingle:function(){
			if (AuditReport.pFileOpened){
				if(AuditReport.funGetSelectInfo("底稿类型")=="EXCEL"){
					//EXCEL
				  	if (window.confirm("是否单独刷新表页："+AuditReport.funGetSelectInfo("表页名称")+" ？"))   {
						AuditReport.subSingleRefreshData();
					}
				}else{
					//word
					var result=AuditReport.funSelectWordRange();
					if (result==""){
						if (window.confirm("是否确认重新计算下列WORD选中区域 ？"))   {
							AuditReport.subSingleRefreshData();
						}
					}else{
						alert(result);
					}
				}
			}			
		},
		//全部刷新
		RefreshAll:function(){
			if (AuditReport.pFileOpened){
		   		if(window.confirm("是否确认全表刷新 ？"))   {
					AuditReport.subRefreshData();
				}
			}			
		},
		//打印
		Print:function(){
		    if (AuditReport.pFileOpened){
		    	AuditReport.funPrint();
		    }	
		},
		//打印预览
		PrintPreview:function(){
		    if (AuditReport.pFileOpened){
		    	AuditReport.funPrintPreview();
		    }		
		},
		IsUpdate:function(){
			if (AuditReport.pFileOpened){
				if (AuditReport.pHasModified>0){
					return true;
				}else{			
					return false;
				}
			}
		}
	};
};