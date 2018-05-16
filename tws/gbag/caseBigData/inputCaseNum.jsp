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
<title>获取案件</title>
<script type="text/javascript">

</script>
</head>

<body style="margin: 0px; padding: 0px;">
	<form name="msgForm" id="msgForm" method="post" target="_self">
	<div style='margin-top:30px'>
	  <table  cellpadding="8" cellspacing="0" align="center" class="data_tb" >
	  <div>
	  	<tr><th class="data_tb_alignright" align="right" colspan="2" >从大数据获取案件，请输入完整案件编号：</th></tr>
	  	<tr height=18>
			<td class="data_tb_alignright" align="right">
				<span class="mustSpan">案件编号：</span>
			</td>
			<td class="data_tb_content">
				<input type="text" size="50" name="casenum" id='casenum' style='height:28' id="casename" value="${casename }"  >
				<input type='button' style='height:28;color:#FF5151' value='立即获取' onclick='selectCase()'>
			</td>
		</tr>
		</div>
	</table>
	</div>
	<div style='margin-top:29px'>
	<table cellpadding="8" cellspacing="0" align="center" class="data_tb">
	 	<tr><th class="data_tb_alignright" align="right" colspan="2" >当前案件信息：</th></tr>
	 	<tr>
	 		<td class="data_tb_alignright" align="right">
	 			<span>案件名称</span>
	 		</td>
	 		<td class="data_tb_content">
	 			<input type='text' id='casename' size='50' readonly>
	 		</td>
	 	</tr>
	 	<tr>
	 		<td class="data_tb_alignright" align="right">
	 			<span>案件所属机构</span>
	 		</td>
	 		<td class="data_tb_content">
	 			<input type='text' id='organid' size='50' readonly>
	 		</td>
	 	</tr>
	 	<tr>
	 		<td class="data_tb_alignright" align="right">
	 			<span>案件状态</span>
	 		</td>
	 		<td class="data_tb_content">
	 			<input type='text' id='casestate' size='50' readonly>
	 		</td>
	 	</tr>
	 	<tr>
	 		<td class="data_tb_alignright" align="right">
	 			<span>简要案情</span>
	 		</td>
	 		<td class="data_tb_content">
	 			<textarea rows="3" cols="100" id='jyaq' readonly></textarea>
	 		</td>
	 	</tr>
	 	<tr></tr>
	</table>
	</div>		
	</form>
<script type="text/javascript">
Ext.onReady(function(){
	
	mt_init_form_Control();	

});

//传 案件编号
function selectCase(){
	var casenum=$('#casenum').val();
	if(casenum==""){
		return ;
	}
	if(casenum.length!=23){
		if(!confirm("您输入的案件编号位数不是23位，需要继续同步吗？")){
			return;
		}
	}
	$.ajax({
		type :"Post",
		async:true,
		url : "${pageContext.request.contextPath}/nowGetCase.do?method=toGetCases",
		data:{"casenumber":casenum},
		beforeSend:function(){  
			matech.showWaiting("100%","100%","查询中..."); 	
        },
		success : function(data) {
			matech.stopWaiting();
			result = unescape(data);
			result = Ext.util.JSON.decode(result);
			if(result[0].result==1){
				alert("本案件同步成功,"+result[0].info);
			}else if (result[0].result==0){
				alert("本次仍然没有同步到这个案件");
			}else if(result[0].result==-1){
				alert("出现了难以预料的错误");
			}			
		}
	});	
	
}

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
				alert("归还成功！");
				matech.closeWindow(parent);
			}
			
		},
		error: function(){
			alert("提交失败，稍后再重试吧~");
		}
	});

}
function closeThisWin(){
	var recipient=document.getElementById("recipient").value;
	if(recipient!=""){
		if(!confirm("已填写数据，确认取消吗")){
			return;
		}
	}
	matech.closeWindow(parent);
}

</script>
</body>
</html>