<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ page import="java.util.*"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<%@page import="com.szk.framework.pub.util.StringTools"%>

<%
	
	String	menuDetail = StringTools.checkNull((String)request.getAttribute("string"));
	
	Vector vector=(Vector)request.getAttribute("vector");
%>


<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<style>

.before{
	border: 0px;
	background-color: #FFFFFF !important;
}

</style>
<script type="text/javascript">
var mytab;

function ext_init(){

    var tbar = new Ext.Toolbar({
   		renderTo: "divBtn",
   		defaults: {autoHeight: true,autoWidth:true},
           items:[{
           	id:'btn-1',
            text:'保存',
            cls:'x-btn-text-icon',
            icon:contextPath + btn_img_url + 'save.png',
            handler:function(){
            	goAdEd();
			}
      		},'-',{
      			id:'btn-2',
            text:'返回',
            cls:'x-btn-text-icon',
            icon:contextPath + btn_img_url + 'back.png',
            handler:function(){
            	window.self.location='${pageContext.request.contextPath}/sysMenuManger.do?method=newlist&sysId=${sysId}';
			}
      		},'->'
		]
       });

	   
	if("${sessionScope.userSession.userLoginId}" !="admin"){
		matech.setExtBtnShow(['btn-1'],false);
	}	
	
}
    
Ext.onReady(function(){
	ext_init();
})


</script>
<title></title>

</head>

<body leftmargin="0" topmargin="0">
<div id="divBtn"></div>
<form name="thisForm" method="post" action="">
<div style="height:expression(document.body.clientHeight-30);overflow: auto;" >

<span class="formTitle" >菜单管理<br/><br/> </span>

<table id="tb2" cellpadding="8" cellspacing="0" align="center" class="data_tb" >
<tr>
  <td class="data_tb_alignright" align="center" colspan="4">菜单属性</td>
</tr>
<tr>
  <td class="data_tb_alignright"  width="15%" align="right"><span class="mustSpan">编 号：</span></td>
  <td  class="data_tb_content" ><input name="menu_id" type="text" id="menu_id" value="${menu.menu_id}" class="required validate-digits"  title="请输入数字！"></td>
  <td class="data_tb_alignright"  width="15%" align="right"><span class="mustSpan">类 型：</span></td>
  <td  class="data_tb_content" >
  		<select name="ctype" id="ctype">
          <option value="000" >==请选择==</option>
          <option value="01" selected="selected">菜单项</option>
          <option value="02">按钮</option>
        </select>
  </td>
</tr>
<tr>
  <td class="data_tb_alignright"  width="15%" align="right"><span class="mustSpan">名 字：</span></td>
  <td  class="data_tb_content" ><input name="name" type="text" id="name" class="required"  title="请输入名字！" value="${menu.name}" ></td>
  <td class="data_tb_alignright"  width="15%" align="right"><span class="mustSpan">所属菜单：</span></td>
  <td  class="data_tb_content" >
  		<select name="parentid" id="parentid">
          <option value="000" selected="selected">==请选择==</option>
		  <option value="00">00</option>
		<%	if(vector!=null){
				for(int i=0;i<vector.size();i++){
					out.print("<option value=\""+vector.elementAt(i).toString().split("--")[0]+"\">"+vector.elementAt(i)+"</option>");
				}
				vector.clear();
			}
		 %>
        </select>
  </td>
</tr>
<tr>
  <td class="data_tb_alignright"  width="15%" align="right">目标：</td>
  <td  class="data_tb_content" >
  		<select name="target" id="target" onChange="changval(this);">
          	<option value="newTab"  selected="selected">==请选择==</option>
          	<option value="evernewTab">永远新标签</option>        
          	<option value="newTab">新标签</option>
         	<option value="newWin">新窗口</option>
         	<option value="homePage">首页</option>
         	<option value="myscript">脚本</option>
        </select>
  </td>
  <td class="data_tb_alignright"  width="15%" align="right"><span class="mustSpan">是否有子菜单：</span></td>
  <td  class="data_tb_content" >
  		<select name="depth" id="depth">
          <option value="000" selected="selected">==请选择==</option>
          <option value="1">有</option>
          <option value="0" >无</option>
          <option value="2" >有按钮</option>
          <option value="-1" >执行脚本</option>
        </select>
  </td>
</tr>
<tr style="display: none;">
  <td class="data_tb_alignright"  width="15%" align="right">是否支持控件：</td>
  <td  class="data_tb_content" >
  		<select name="Amethod" id="Amethod" onchange="return showAmethod();">
          <option value="" >==请选择==</option>
          <option value="1">是</option>
          <option value="0" selected>否</option>
        </select>
  </td>
  <td class="data_tb_alignright"  width="15%" align="right">调用控件方法：</td>
  <td  class="data_tb_content" ><input type="text" id="activex_method" name="activex_method" value="${menu.activex_method}" size="30"/></td>
</tr>
<tr style="display: none;">
  <td class="data_tb_alignright"  width="15%" align="right">加密狗类型：</td>
  <td  class="data_tb_content">
		<input type=hidden name="dogversion" id="dogversion" value="${dogVersion}" />		
  </td>
  <td class="data_tb_alignright"  width="15%" align="right">二次登录角色：</td>
  <td  class="data_tb_content"><input name="isvalidate" id="isvalidate" type="text" size="30" value="${menu.isvalidate}" multiselect="true"  title="请输入，不得为空" onKeyDown="onKeyDownEvent();" onKeyUp="onKeyUpEvent();"  onClick="onPopDivClick(this);" valuemustexist=true autoid=178></td>
  
</tr>
<tr>
  <td class="data_tb_alignright"  width="15%" align="right">行 为：</td>
  <td  class="data_tb_content" colspan="3"  >
  	<input name="act" type="text" id="act" size="64" value="${menu.act}">
  </td>
</tr>
<tr>
  <td class="data_tb_alignright"  width="15%" align="right">帮助行为：</td>
  <td  class="data_tb_content" colspan="3"  ><input name="helpact" type="text" id="helpact" size="64" maxlength="100" value="${menu.helpact}" ></td>
</tr>

<tr>
  <td class="data_tb_alignright"  width="15%" align="right">权限级别：</td>
  <td  class="data_tb_content" colspan="3"  ><input name="property" id="property" type="text" size="30" value="${menu.property}" ></td>
</tr>
<tr>
  <td class="data_tb_alignright"  width="15%" align="right">所属系统：</td>
  <td  class="data_tb_content" colspan="3"  >
  	<input style="height: 24px; width: 230px" id="sysid" name="sysid" type="text" valuemustexist=true  autoid="js:sys.systemManger.SystemManger"  value="${sysId}"  />
  </td>
</tr>
<tr>
  <td class="data_tb_alignright"  width="15%" align="right">首页提醒SQL：</td>
  <td  class="data_tb_content" colspan="3"  >
  <textarea name="menusql" id="menusql" rows="5" cols="100" style="overflow-y:hidden; " onpropertychange='autoHeight(this);' oninput='autoHeight(this)' >${menu.menusql}</textarea>
  </td>
</tr>
<tr style="display:none;">
	<td class="data_tb_alignright" align="center" colspan="4">字段属性</td>
</tr>
<tr style="display:none;">
  <td width="100%" colspan="4">
		<table align="center" border="0" class="data_tb" style="width: 100%;">
		<tr>
		  <td class="data_tb_alignright" align="center" style="width: 10px"><img style='cursor:hand;' alt='新增一行' onclick='f_add()' src='${pageContext.request.contextPath}/css/theme/${userSession.system_theme}/btn/add.png' ></td>
		  <td class="data_tb_alignright" align="center" style="width: 25%">中文</td>
		  <td class="data_tb_alignright" align="center" style="width: 25%">输入域名称</td>
		  <td class="data_tb_alignright" align="center" style="width: 20%">表字段名称</td>
		  <td class="data_tb_alignright" align="center" style="width: 30%">属性</td>				
		</tr>
		<tbody id="tbField" >
		<c:forEach items="${fieldList}" var="field" varStatus="status">
		<tr>
    		<td class="data_tb_alignright"><center><img style='cursor:hand;' alt='删除本行' onclick='f_remove(this)' src=contextPath + btn_img_url + 'close.png' ></center></td>
    		<td class="data_tb_content"><input value = '${field.fieldname}' class='required' type='text' id='fieldname${status.index}' name='fieldname' style='width:100%;text-align: center;'  ></td>
    		<td class="data_tb_content"><input value = '${field.fieldvalue}' class='required' type='text' id='fieldvalue${status.index}' name='fieldvalue' style='width:100%;text-align: center;' ></td>
    		<td class="data_tb_content"><input value = '${field.fieldid}' class='required' type='text' id='fieldid${status.index}' name='fieldid' style='width:100%;text-align: center;' ></td>
    		<td class="data_tb_content"><input value = '${field.fieldattribute}' type='text' id='fieldattribute${status.index}' name='fieldattribute' style='width:100%;text-align: center;' ></td>
		</tr>	
		</c:forEach>		
		</tbody>
		</table>

  </td>
</tr>
</table>


  <input name="submitStr" type="hidden" id="submitStr">
  <input name="id" type="hidden" id="id" value="${menu.id}" />
  <input name="adored" type="hidden" id="adored" value="ad">
  </div>
</form>
</body>
</html>
<script>

function changval(){
	//alert($("#target").val());
	if($("#target").val()=="myscript"){
		$("#act").val("请写入函数名");
		$("#menusql").val("请写入函数执行代码");
	}else{
		$("#act").val("${menu.act}");
		$("#menusql").val("${menu.menusql}");
	}
	
}

if('${menu.id}' != ''){
	document.getElementById("ctype").value = '${menu.ctype}';
	document.getElementById("parentid").value = '${menu.parentid}';
	document.getElementById("target").value = '${menu.target}';
	document.getElementById("depth").value = '${menu.depth}';	
}


function goAdEd(){

	document.thisForm.action="${pageContext.request.contextPath}/sysMenuManger.do?method=save";
	document.thisForm.submit();
}


function showAmethod() {
	if("1"==document.getElementById("Amethod").value) {
		document.getElementById("showAmethod").style.display="";
	} else {
		document.getElementById("ActiveX_method").value="";
		document.getElementById("showAmethod").style.display="none";
		
	}
}

//新增一行
function f_add(){
	// 创建行
	f_createRow("tbField",1,5);
    var tbField = document.getElementById("tbField");
    
    var randomId = Math.round(Math.random() * 10000);
    
    //设置列内容和属性
    tbField.rows[tbField.rows.length-1].cells[0].innerHTML = "<center><img style='cursor:hand;' alt='删除本行' onclick='f_remove(this)' src='"+contextPath + btn_img_url + "close.png' ></center>";
    tbField.rows[tbField.rows.length-1].cells[1].innerHTML = "<input class='required' type='text' id='fieldname"+randomId+"' name='fieldname' style='width:100%;text-align: center;'  >";
    tbField.rows[tbField.rows.length-1].cells[2].innerHTML = "<input class='required' type='text' id='fieldvalue"+randomId+"' name='fieldvalue' style='width:100%;text-align: center;' >";
    tbField.rows[tbField.rows.length-1].cells[3].innerHTML = "<input class='required' type='text' id='fieldid"+randomId+"' name='fieldid' style='width:100%;text-align: center;' > ";
    tbField.rows[tbField.rows.length-1].cells[4].innerHTML = "<input type='text' id='fieldattribute"+randomId+"' name='fieldattribute' style='width:100%;text-align: center;' >";

}

//创建行
function f_createRow(tableId,rows,cells){
	var rs,cs;
	if(rows==""){
		rs = 0;
	}else{
		rs = rows;
	}
	if(cs==""){
		cs = 0; 
	}else{
		cs = cells;
	}
	
	var table = document.getElementById(tableId);
       
	for(var i=0;i<rs;i++){
		//添加一行
        var newTr = table.insertRow();
		for(var j=0;j<cs;j++){
	       //添加列
			var newTd = newTr.insertCell();
	       	if(j==0){
	       		newTd.className = "data_tb_alignright";
	       	}else{
	       		newTd.className = "data_tb_content";	
	       	}
			
		}
	}
}


//删除
function f_remove(t){
	if(confirm("您确定要删除吗?")){
		t.parentNode.parentNode.parentNode.removeNode(true);
	}
}

</script>
