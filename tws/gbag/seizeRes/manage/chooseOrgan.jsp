<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<%
      //解决post/get 请求中文乱码的方法
      request.setCharacterEncoding("UTF-8");
      response.setCharacterEncoding("UTF-8");
%> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>确认接收机构</title>
</head>

<body style="margin: 0px; padding: 0px;">
	<form name="msgForm" id="msgForm" method="post" target="_self">
	  <table  cellpadding="8" cellspacing="0" align="center" class="data_tb" >
	  
	  	<tr><th class="data_tb_alignright" align="right" colspan="2" >请填写：</th></tr>
	  	<tr height=18>
			<td class="data_tb_alignright" align="right">
				<span class="mustSpan">案件编号：</span>
			</td>
			<td class="data_tb_content">
				<input type="text" size="50" name="casename" id="casename" value="${casename }"  readonly>
			</td>
		</tr>
		<tr height=18>
			<td class="data_tb_alignright" align="right">
				<span class="mustSpan">当前物品：</span>
			</td>
			<td class="data_tb_content">
				<input type="text" size="50" name="name" id="name" value="${name }"  readonly>
			</td>
		</tr>
		<tr height=18>
			<td class="data_tb_alignright" align="right" >
				<span class="mustSpan">接收时间：</span>
			</td>
			<td class="data_tb_content">
				<input type="text" size="50" name="time" id="time"  value="${time }" readonly/>	
			</td>
		</tr>
		<tr height=18>
			<td class="data_tb_alignright" align="right" >
				<span class="mustSpan">接收机构：</span>
			</td>
			<td class="data_tb_content">
				<input type='text' name="organId" id="organId" size="50"   title="快选一个机构吧~"></textarea>	
			</td>
		</tr>
		
		<tr>
			<td class="data_tb_alignright" align="center" colspan="2">
				<input type="hidden" name="uuid" id="uuid" value='${uuid}'>		
				<input type="hidden" name="editType" id="uuid" value='4'>			
				<input type="button" value="确  定" onclick="toSubmit()" class="flyBT">&nbsp;&nbsp;&nbsp;&nbsp;
				<input type="button" value="取  消" onclick='closeThisWin()' class="flyBT">&nbsp;&nbsp;&nbsp;&nbsp;
			</td>
		</tr>
	</table>		
	</form>
<script type="text/javascript">
Ext.onReady(function(){
	
	mt_init_form_Control();	

});

function toSubmit(){
	$.ajax({
		type :"Post",
		async:true,
		url : "${pageContext.request.contextPath}/seizeRes.do?method=turnOnDeal",
		data:$("#msgForm").serialize(),
		success : function(data){
			var result=unescape(data);
			result=Ext.util.JSON.decode(result);
			result=result[0].result;
			if(result==-1){
				alert("警告");
			}
			if(result==0){
				alert("失败了，待会儿再试吧~");
			}
			if(result==1){
				alert("移交成功");
				matech.closeWindow(parent);
			}
			
		},
		error: function(){
			alert("提交失败，稍后再重试吧~");
		}
	});

}
function closeThisWin(){
	var organId=document.getElementById("organId").value;
	if(organId!=""){
		if(!confirm("已填写数据，确认取消吗")){
			return;
		}
	}
	matech.closeWindow(parent);
}

</script>
</body>
</html>