<%@page language="java" contentType="text/html; charset=utf-8" 
pageEncoding="utf-8" %>

function firstOpen(){
	try {

		try{
			AuditReport =  new ActiveXObject("AuditReportPoject.AuditReport");
		}catch(e){					
			alert('无法创建底稿控件，请重新安装Audit.exe');
			return false;
		}
		
		//新模式下检查有没有打开该底稿
		var myFilename='<%=request.getParameter("attachId") %>.<%=request.getParameter("attachType") %>';
		//alert(myFilename);
		
			
		try{
			var result=AuditReport.funCheckHasOpen(myFilename);
			if (result>""){
				alert("名为["+myFilename+"]的文档已经打开,全路径为："+result+"!\n"
					+"Office不能支持同时打开同名文件，无论它们是否在同一个文件夹中。\n"
					+"要打开第二份文档，请先关闭已经打开的文档。");
				return;
			}
		}catch(e){
			//老控件，不支持新检查方法
		}

	
		AuditReport.pFileName = myFilename;
		AuditReport.pOpenUrl="http:\/\/"+window.location.host +"<%= request.getContextPath() %>/common.do?method=attachDownload&attachId=<%=request.getParameter("attachId") %>";
		//alert(AuditReport.pOpenUrl);
		AuditReport.pSaveUrl='http:\/\/'+window.location.host + '<%= request.getContextPath() %>/common.do?method=attachUpload&attachId=<%=request.getParameter("attachId") %>' + '&indexTable=<%=request.getParameter("indexTable") %>' + "&indexId=<%=request.getParameter("indexId") %>"+"&userId=<%=request.getParameter("userId") %>"+"&flag=ocx";
		//alert(AuditReport.pSaveUrl);
		
		var UrlParameter='ZipByClient=false';
		AuditReport.pUrlParameter="http:\/\/"+window.location.host + "|" + UrlParameter;

		AuditReport.pUTF8=true;
		AuditReport.pZipByClient=false;
		AuditReport.pOpenMode=1;
		
		
		
		var _ManuWorkDir="c:\\manu\\";
		AuditReport.pFileDir=_ManuWorkDir;
		
		//alert(AuditReport.pFileDir);
		AuditReport.funOpenUrlFile(1);
		

		
		try{
			AuditReport.subBeforeTerminate();
		}catch(e){}
		
	}catch(e){
		alert("打开底稿出错了："+e);
	}
}
firstOpen();
