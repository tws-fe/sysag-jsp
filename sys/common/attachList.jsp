<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<html>
<head>
<title>附件上传</title>


<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<script type="text/javascript">


function ext_init() {
	
	var isShowBtn = true;
	if("${view}" == "true") {
		isShowBtn = false ;	
	}
	
	if(isShowBtn) {
		new Ext.Toolbar({
			renderTo:'gridDiv_${attachGridId}',
	           items:[{
	            text:'添加附件',
	            cls:'x-btn-text-icon',
	            icon:contextPath + btn_img_url + 'add.png',
	            handler:function(){
	            	attachUpload('_attachId','grid','${attachGridId}');
				}
	      	}]
		});
	}
}

function grid_dblclick(obj, tableId) {
	//打开文件
	var attachId = obj.getAttribute("attachId");
	var fileext = obj.getAttribute("fileext");	
	openWin(attachId,fileext,"view");
}

function openWin(attachId,curFileNameExt,mode){	
	if (('xls'==curFileNameExt
			||'xlsm'==curFileNameExt
			||'xlsx'==curFileNameExt
			||'doc'==curFileNameExt
			||'docm'==curFileNameExt
			||'docx'==curFileNameExt
			)
			){
		//直接打开excel等office
		var param='attachId='+attachId
					+'&attachType='+curFileNameExt
					+'&mode='+mode
					+'&indexTable=${indexTable}'
					+'&indexId=${indexId}'
					+'&userId=${userSession.userId}';
		var result=ajaxLoadPageSynch(MATECH_SYSTEM_WEB_ROOT + "sys/common/attachOpen.jsp",param);
		try{
			eval(result);
		}catch(e){alert(e);}
	}else{
		if(mode=="edit"){
			//重新上传附件
			attachUpdate(attachId,'_attachId','grid','${attachGridId}');
		}else{
			alert("文件不是EXCEL、WORD文档，暂不支持打开与修改！");
		}
	}
	/*
	var url = "";
	if('pdf'==curFileNameExt){
		//直接打开PDF
		url = MATECH_SYSTEM_WEB_ROOT + "sys/common/attachPdf.jsp";
	}else if (('xls'==curFileNameExt
			||'xlsm'==curFileNameExt
			||'xlsx'==curFileNameExt
			||'doc'==curFileNameExt
			||'docm'==curFileNameExt
			||'docx'==curFileNameExt
			)
			){
		//直接打开excel等office
		url = MATECH_SYSTEM_WEB_ROOT + "sys/common/attachOffice.jsp";
	}
	
	document.getElementById("attachId").value = attachId;
	document.getElementById("attachType").value = curFileNameExt;
	document.getElementById("mode").value = mode;
	
	if(url != ""){
		document.thisForm.action = url;
		document.thisForm.target = "_blank";
		document.thisForm.submit();
	}else{
		alert("文件不是PDF、EXCEL、WORD文档，暂不支持打开与修改！");
	}
	*/
	
}

Ext.onReady(function(){
	ext_init();
	//attachGridInit("_attachId","${attachGridId}");
});
</script>

</head>
<body >
<form name="thisForm" id="thisForm" method="post" >
<div id="iDiv">
<input   name="_attachId"  id="_attachId" type="hidden" indexTable="${indexTable}"  value = "${indexId}"  />
</div>
<!-- 流程步骤gird区域DIV -->
<div id="gridDiv" style="height:expression(document.body.clientHeight-30);width:100%;">
	<mt:DataGridPrintByBean name="${attachGridId}"/>
</div>


<input   name="indexTable"  id="indexTable" type="hidden" value='${indexTable}' />
<input   name="indexId"  id="indexId" type="hidden" value='${indexId}'   />
<input   name="attachId"  id="attachId" type="hidden"  />
<input   name="attachType"  id="attachType" type="hidden"   />
<input   name="mode"  id="mode" type="hidden"   />


</form>

</body>
</html>

