<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<html>
<head>
<title>附件上传</title>


<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<script type="text/javascript">


function ext_init() {
	
	new Ext.Toolbar({
		renderTo:'gridDiv_${tableId1}',
		   items:[{
			text:'查询',
			cls:'x-btn-text-icon',
			icon:contextPath + btn_img_url + 'query.png',
			handler:function(){
				var tableId = '${tableId1}';
				customQryWinFun(tableId);
			}
		},'-',{ 
		    text:'关闭',
		    icon:contextPath + btn_img_url + 'close.png',
		    handler:function(){
		    	closeTab(parent.parent.tab); 
			}
		}]
	});
	
	
}

function grid_rowclick(tr,tableId,grid,rowIndex,e){
	//alert(tr + "|"+tableId + "|" + grid + "|" + rowIndex + "|" + e);
	if(tableId == '${tableId1}'){
		var fileId = tr.getAttribute("fileId");
		document.getElementById('fileId').value = fileId;
		goSearch_${tableId2}();
	}
	
	return true;
}

function attach_remove(attachId, gridId, tableId) {
	
	var str = "是否确认要删除该附件？";					
	if(!confirm(str,"提示")) return;
					
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachRemove&r=" + Math.random();
	var request = "&attachId=" + attachId ;
	if(tableId){
		request += "&tableId=" + tableId;
	}
	var result = ajaxLoadPageSynch(url, request);
	
	if(result == "success") {
		eval("goSearch_"+gridId+"()");
		eval("try{parent.refreshTree();}catch(e){}");
	}
}

function update_new_attach(attachId,tableId1,tableId2){
	var str = "是否把该版本附件设为最新版本？";					
	if(!confirm(str,"提示")) return;
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=attachUpdate&r=" + Math.random();
	var request = "&attachId=" + attachId ;
	var result = ajaxLoadPageSynch(url, request);
	
	if(result == "success") {
		eval("goSearch_"+tableId1+"()");	
		eval("goSearch_"+tableId2+"()");		
	}
}

Ext.onReady(function(){
	ext_init();	
});
</script>

</head>
<body >

<input   name="fileId"  id="fileId" type="hidden" value = "${fileId}"  />

<div id="gridDiv1" style="height:60%;width:100%;">
	<mt:DataGridPrintByBean name="${tableId1}"/>
</div>
<div id="gridDiv2" style="height:35%;width:100%;">
	<mt:DataGridPrintByBean name="${tableId2}"/>
</div>

</body>
</html>

