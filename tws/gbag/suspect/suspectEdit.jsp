<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<style type="text/css">
	.x-panel-body{border:0px;}
</style>

<script type="text/javascript">

var _tbar;
var mypanel;

function ext_init(){
	//工具栏
	_tbar=new Ext.Toolbar({
		height:30,
		items:[
			{ 
				id:'btn-1',
				text:'保存',
				icon:'${ctx}/tws/css/img/save.gif',
				handler:function(){
					save();
				}
			},'-',{
				text:'返回',
				icon:'${ctx}/tws/css/img/back.gif',
				handler:function(){
					window.location="${ctx}/sysCarKey.do?method=list&unitId=${unitId}";
				}
			}
		]	
	});
	
	mypanel = new Ext.Panel({
        id: 'contentPanel',
        region:'center',
        width:document.body.clientWidth,
        height:document.body.clientHeight,
        tbar:_tbar,
        autoScroll:true,
        items:[{contentEl: "tab1",id:"p1",title:"基础信息"}]
        });
	
	
 	var layout = new Ext.Viewport({
		layout:'border',
		items:[{
				region:'center',
	    		id:'center-panel',
	    		margins:'0 0 0 0',
	    		layout:'border',
	    		lines:true,
	    		items:[mypanel]
			}
		 ]
	});
 	layout.doLayout();
}

//Ext.onReady(ext_init);
Ext.onReady(function(){

    //初始化页面
    ext_init();

    //下拉控件初始化
    mt_init_form_Control();	
});

</script>
</head>
<body>

<div id="tab1">
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/sysCarKey.do?method=save" class="autoHeightExtForm">
		<table border="0" cellspacing="0" class="editTable">
			<tr>
				<td class="editTitle"  colspan="6">嫌疑人新增页面</td>
			</tr>
			
			<tr>
					<th style="word-break : break-all;word-wrap: break-word;">姓名：<span class="mustSpan">[*]</span></th>
					<td>
					<input name="name" id="name" size="50" class="required" maxlength="100" value = "" title="请输入姓名，不能为空！">
					</td>
			</tr>
			<tr>
					<th style="word-break : break-all;word-wrap: break-word;">案件编号：<span class="mustSpan">[*]</span></th>
					<td>
					<input name="casenumber" id=casenumber size="50" class="required" maxlength="100" value = "" autoid="js:gbag.registerResCaseList" >
					</td>
			</tr>
			<tr>
					<th style="word-break : break-all;word-wrap: break-word;">身份证号：<span class="mustSpan">[*]</span></th>
					<td>
					<input name="idcard" id="idcard" size="50" class="required" maxlength="100" value = "" onblur="isIdCardNo(this.value,1)" title="请输入身份证号，不能为空！">
					</td>
			</tr>
			<tr>
					<th style="word-break : break-all;word-wrap: break-word;">性别：<span class="mustSpan">[*]</span></th>
					<td>
					<input name="sex" id="sex" size="50" class="required" maxlength="100" value = "" >
					</td>
			</tr>
			<tr>
					<th style="word-break : break-all;word-wrap: break-word;">年龄：<span class="mustSpan">[*]</span></th>
					<td>
					<input name="age" id="age" size="50" class="required" maxlength="100" value = "" >
					</td>
			</tr>
			<tr>
					<th style="word-break : break-all;word-wrap: break-word;">生日：<span class="mustSpan">[*]</span></th>
					<td>
					<input name="birthdate" id="birthdate" size="50" class="required" maxlength="100" value = "" >
					</td>
			</tr>
		</table>
	</form>
</div>

</body>

<script type="text/javascript">

function save(){
	if(!formSubmitCheck('thisForm')){
		return;
	}
	$.ajax({
		type :"Post",
		async:true,
		url : "${pageContext.request.contextPath}/police.do?method=saveSuspect",
		data:$('#thisForm').serialize(),
		success : function(data){
			window.location.href='${pageContext.request.contextPath}/police.do?method=suspectList';
		},
		error: function(){
			alert("发送失败");
		}
		});
}
//根据身份证号获取信息
function isIdCardNo(num,rowid) { 

	num = num.toUpperCase(); //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。         
    
	if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {      
        alert("身份证号码非法，请检查确认；");
        return false;          
    }  
    //验证前2位，省份符合  
    var aCity={
    	11:"北京",12:"天津",13:"河北",14:"山西",
    	15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",
    	31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",
    	36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",
    	44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",
    	52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
    	63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",
    	82:"澳门",91:"国外"
    };


    if(aCity[parseInt(num.substr(0,2))]==null){  
        alert('身份证号不正确或不符合规定！');
        return false;  
    }  
 	    //下面分别分析出生日期和校验位  
 	    var len, re; len = num.length;   
	if (len == 15) {  
		 checkFifTeen(num,rowid);
	}  
	if (len == 18) {  
	      var birthday=num.substr(6,8);
	      birthday=birthday.substr(0,4)+"-"+birthday.substr(4,2)+"-"+birthday.substr(6,2);
	      $("#birthdate").val(birthday);
	      var age=new Date().getFullYear()-birthday.substr(0,4);
	      $("#age").val(age);
	      var sex=num.substr(16,1);
	      if(sex%2==1){
	    	  $("#sex").val("男性");
	      }else{
	    	  $("#sex").val("女性");
	      }
	}
	return false;
}  
</script>
</html>