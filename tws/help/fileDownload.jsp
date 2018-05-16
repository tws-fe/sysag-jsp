<%-- <%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%> --%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>文档下载</title>
<%-- <%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %> --%>

<style>

.editTable {
	margin: 20px;
	width:35%;
	padding: 10px;
	border: 0px;
}

.editTable tr {
	height: 30px;
	background-color: #FFFFFF;
}

.editTable th {
	text-align: right;
	padding: 5px;
	white-space：nowrap;
}

.editTable td {
	text-align: left;
	padding: 5px;
}

.fieldTable {
	background-color: #99BBE8;
}

.fieldTable th {
	background-color: #D9E8FB;
	text-align: center;
}

.fieldTable td {
	height: 20px;
	text-align: center;
}

</style>


<script type="text/javascript">

</script>
</head>
<body leftmargin="0" topmargin="0">

<div style="width:20px;">
	<form id="thisForm" name="thisForm" action="${ctx}/uploadFile.do?method=saveUpload"  method="post" class="autoHeightExtForm">		
		<table class="editTable" cellspacing="0"  border="0" align="center">
		   
		    <tr id="btnShow" style="display:none;">
				<td>
				   <input type="button" name="attachId" id="attachId" value="上传文件" style="width:100px;height:30px;" onclick="uploadFile();"/>
				</td>
			</tr>
			
			<tr>
				<td >
					<div id="selectFieldDiv" style="width:20px;">
						<table id="fieldTable" class="fieldTable" cellspacing="1" width="20px;" align="center">
							<tr>
							   <th></th>
								<th>文件名称</th>
								<th>文件大小</th>
								<th>修改时间</th>
								<th>下载</th>
							</tr>
							<tbody id="tbodyFieldList">
							</tbody>
						</table>
					</div>
				</td>
			</tr>
			
		</table>
		<input name="indexTable" id="indexTable" type="hidden" value="UploadData">
	</form>
	<input type="hidden" id="fieldNameId" name="fieldNameId">
</div>


</body>

<script type="text/javascript">
  
var fieldSelectOptionHTML = "";
 
	selechen();
	function selechen(){
          
		try{
			  var filePath ="${pageContext.request.contextPath}/tws/help/docDownload";
			  var url = "${pageContext.request.contextPath}/policeCommon.do?method=getComputerFile"; 
			  
			  var requestString = "&filePath="+filePath;	//传参数,支持中文
			  var result = ajaxLoadPageSynch(url, requestString);	
			   
			  //处理Json
			  var jsonObj = eval("("+result+")"); 
			   
			  var htmlStr = "" ;
			  var tbody = document.getElementById("tbodyFieldList");
			  var rowCount=0;
			  for(var i=0;i<jsonObj.length;i++) {
			  
			  	var fileName = jsonObj[i].fileName;
			  	var fileEditTime = jsonObj[i].fileEditTime;
			  	var fileSize = jsonObj[i].fileSize;
			   
			  	var tr = tbody.insertRow();
			  	
		        document.getElementById("fieldNameId").value+=fileName+"#";
		        
				tr.id = "fieldTr_" + rowCount;
				
				var optTd  = tr.insertCell();
				
				//字段		
				var fieldIdTd = tr.insertCell();
				fieldIdTd.id = "fieldIdTd_" + rowCount;
				fieldIdTd.innerHTML = "<input name='field_Id'  size='60' onkeypress='return false'  id='field_Name_" + rowCount + "' value='"+fileName+"' rowCount='" + rowCount + "'>" + fieldSelectOptionHTML + "</>";
				 
				//字段值			
				var fieldValueTd = tr.insertCell();
				fieldValueTd.id = "fieldValueTd_"  + rowCount;
				fieldValueTd.innerHTML = "<input type='text'   name='field_value' onkeypress='return false'   size='15' id='field_size_" + rowCount + "'  value='"+fileSize+"'/>";
				
				//字段值			
				var fieldValueTd = tr.insertCell();
				fieldValueTd.id = "fieldValueTd_"  + rowCount;
				fieldValueTd.innerHTML = "<input type='text' name='field_value' onkeypress='return false'   size='50' id='field_pach_" + rowCount + "'  value='"+fileEditTime+"'/>";
				 
				 //字段值			
				var fieldValueTd = tr.insertCell();
				fieldValueTd.id = "fieldValueTd_"  + rowCount;
		        fieldValueTd.innerHTML = "<input type='button' name='field_value'onkeypress='return false'  style='width:80px;height:30px;' onclick='docDownload("+i+")' id='field_buton" + rowCount + "' value='下载'/>";
				
			  }			
		} catch(e){
			
		}
	}

	 //下载文档
	function docDownload(sizeLength){
	       var fieldNames=new Array();  
		   var fileNameStr=document.getElementById("fieldNameId").value;
		   fieldNames=fileNameStr.split("#");  
	   
		  for(var i=0; i<fieldNames.length;i++){
		    if(sizeLength-i==0){
		      window.location ="${pageContext.request.contextPath}/policeCommon.do?method=downloadDoc&docName=" +encodeURI(encodeURI(fieldNames[i]));
		    }
		  }
	}
	 

	 function uploadFile(){
			var url="${ctx}/tws/help/fileUpload.jsp?&uuid="+getUUID();
			matech.openWindow("上传文件",url,700,400,parent,function(){
				window.location.reload();
			});		 
	 }
		
	 //是否显示的
	function isshow(){
		 var _CUR_USER_ROLEIDS="${sessionScope.userSession.userRoleids}";
		 var strs= new Array(); //定义一数组 
		 strs=_CUR_USER_ROLEIDS.split(","); //字符分割 
		 for (var i=0;i<strs.length ;i++ ) 
		 { 
			 if(strs[i]=='1'){
				 $("#btnShow").css("display","");
				 return;
			 }else{
				 
			 }
		 } 
	 
	 }
	 
	Ext.onReady(isshow);
	 
</script>
</html>