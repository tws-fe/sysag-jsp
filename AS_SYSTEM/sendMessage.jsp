<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>发送消息</title>
</head>

<body style="margin: 0px; padding: 0px;">
	<form name="msgForm" id="msgForm" method="post" target="_self">
	  <table  cellpadding="8" cellspacing="0" align="center" class="data_tb" >
	  
	  	<tr><th class="data_tb_alignright" align="right" colspan="2" >填写消息</th></tr>
	  	
		<tr height=18>
			<td class="data_tb_alignright" align="right">
				<span class="mustSpan">消息标题：</span>
			</td>
			<td class="data_tb_content">
				<input type="text" name="txtTitle" id="txtTitle">
			</td>
		</tr>
		<tr height=18>
			<td class="data_tb_alignright" align="right" >
				<span class="mustSpan">过期时间：</span>
			</td>
			<td class="data_tb_content">
				<input type="text" name="destroy_time" id="destroy_time"  class="required" ext_type="datetime"/>	
			</td>
		</tr>
		<tr height=18>
			<td class="data_tb_alignright" align="right" >
				<span class="mustSpan">消息内容：</span>
			</td>
			<td class="data_tb_content">
				<textarea name="txtMsg" id="txtMsg" cols="45" rows="6" title="请填写消息,不能为空！"></textarea>	
			</td>
		</tr>
		
		<tr>
			<td class="data_tb_alignright" align="center" colspan="2">
				<input type="hidden" name="userId" id="userId" value='${param["userId"]}'>
				
				<input type="button" value="确  定" onclick="toSubmit()" class="flyBT">&nbsp;&nbsp;&nbsp;&nbsp;
				<input type="reset" value="清  空" class="flyBT">&nbsp;&nbsp;&nbsp;&nbsp;
			</td>
		</tr>
	</table>		
	</form>
<script type="text/javascript">
Ext.onReady(function(){
	
	mt_init_form_Control();	

    var planOvertime="destroy_time";
    
	TimeUtil.init().getServerTimeTo(function(time){
		if(planOvertime){
			if($("#"+planOvertime).val()==""){
				$("#"+planOvertime).val(TimeUtil.init().add(time,60,'minute'));
			}			
		}
	});
	
	
});
function goCheck() {
	var d_time=document.getElementById("destroy_time").value;
	if(isDateNoBig(d_time)){
		alert('过期时间必须比现在的事件大');
		return false;
	}else if(d_time == ''||d_time==null){
		alert('请设置过期时间');
		return false;
	}else if(document.getElementById("txtTitle").value == '') {
		alert('消息标题不能为空');
		return false;
	} else if (document.getElementById("txtMsg").value == '') {
		alert("消息内容不能为空,请正确填写!");
		return false;
	} else {
		return true;		
	}
}
function isDateNoBig(rq1){
	var s0=rq1.split("-");
	var s1=s0[0];//年
	var s2=s0[1];//月
	var ss=s0[2];// 日 时 分
	var s3=ss.slice(0,2);
	var s4=ss.slice(3,5);
	var s5=ss.slice(6,8);
	var ds=new Date();
	//不然的话，就是比较rq1 和今天的时间
	var m1=ds.getFullYear();    //获取完整的年份(4位,1970-????)
	var m2=ds.getMonth()+1;       //获取当前月份(0-11,0代表1月)
	var m3=ds.getDate();		//获取当前天数(1-31)
	var m4=ds.getHours(); //小时  24小时制
	var m5=ds.getMinutes();//分钟  0-59
	if(s1>m1||(s1==m1&&s2>m2)||(s1==m1&&s2==m2&&s3>m3)){
		return false;
		
	}else if(s4>m4||(s4==m4&&s5>m5)){
		return false;
	}
		return true;
	
}
function toSubmit(){
	if(goCheck()){
		$.ajax({
			type :"Post",
			async:true,
			url : "${pageContext.request.contextPath}/onlineUser.do?method=sendMessage",
			data:$("#msgForm").serialize(),
			success : function(data){
				alert("发送成功");
				matech.closeWindow(parent);
			},
			error: function(){
				alert("发送失败");
			}
			});
	}	
}

</script>
</body>
</html>