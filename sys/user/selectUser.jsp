<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>选择人员</title>
<style type="text/css">
.page-button {
	border: 1px solid rgb(196,196,196);
	color : rgb(96, 96, 96);
	background-color: rgb(250, 250, 250);
	padding: 2px;	
	cursor: pointer;
	width: 100px;
  	border-radius: 10px;
}

.secherInput{
	width: 240px;
	height: 24px;
	line-height:18px;
	font-size: 15px; 
	border-right-width: 0px;
}

.departname {
	color: rgb(160, 160, 160);
	font-weight: bold;
}

.x-panel-body-noheader, .x-panel-mc .x-panel-body {
	border-top-color : rgb(172,172,172);
}

.x-panel-body {
	border-color: rgb(172,172,172);
}
.page-button:hover {
  background: rgb(229, 229, 229);
}
</style>
</head>
<body>
	<br/>
	<div align="left" style="margin-left:30px;">
		<table>
			<tr>
			<td>
				姓名模糊查询：<input id="keywords" name="keywords"  class="secherInput" maxlength="10" onkeydown="if(event.keyCode==13){goSerach()};" title='输入人员姓名或登录id后，回车或点击放大镜搜索'>
				&nbsp;<img src="${pageContext.request.contextPath}/css/theme/${userSession.system_theme}/btn/query.png" onclick="goSerach()" style="width: 18px; height:18px; cursor: pointer; ">
			</td>
			</tr>
		</table>
	</div>
	<br>
	<input type="hidden" id="Users" name="Users" /><!-- 这个是可查看人员树选中的人员id -->
	<input type="hidden" id="userNames" name="userNames" /><!-- 这个是可查看人员树选中的人员name -->
	<input type="hidden" id="mode" name="mode" /><!-- 这个通过URL传过来的人员参数 -->
	
	<span style="margin-left: 15px;">
		<input type="button" class="page-button" id="aslectType" onclick="show_hideDiv(this)" value="按角色选择">
		
		<span style="text-align: right;width: 80%;"><input type="button" onclick="hadSelectUser()" value="查看已选择人员" class="page-button" /> &nbsp;<input type="button" value="清空选择" onclick="goCleanUser();" class="page-button">
			<input type="button" value="全选" onclick="check('全选');" class="page-button">
			<input type="button" value="反选" onclick="check('反选');" class="page-button"></span>
	</span>
	<hr style="border:1px dotted rgb(224,224,224)"/>
	<table border="0" >
	        <tr>
	        	<td align="center"><h4><span id="treeTxt">部门下拉</span></h4></td>
	        	<td align="center"><h4>选人</h4></td>
	        	<td align="center"><h4>人员顺序</h4></td>
	        </tr>
			<tr>
				<td>
					<div id="departmentTree" style="display: block;height:260px;"></div>
					<div id="roleTreeDiv" style="display: none;height:260px;"></div>
				</td>
				<td>
				    
					<div id="playUser" style="padding-left: 10px;padding-top:5px;height:270px;margin-top: 5px;overflow: auto;width: 310px;"><div align="center">尚未选择人员!</div></div>
				</td>
				<td>
					<table border="0" cellpadding="5" cellspacing="10" height="100%"  width="100%" align="center">
					<tr>
					 <td align="left"><table align="left" ><tr><td align="right">
					 <select multiple name="__multiSelect" id="__multiSelect" size="7" style='height:260;width:120;' ></select>
					 </td><td align="left">
					 <img alt="置顶" class="multiImg" src="${pageContext.request.contextPath}/img/menu/top.png" onclick="moveTop(document.getElementById('__multiSelect'));"><br/>
					 <img alt="上移" class="multiImg" src="${pageContext.request.contextPath}/img/menu/up.png" onclick="moveUp(document.getElementById('__multiSelect'));"><br/>
					 <img alt="下移" class="multiImg" src="${pageContext.request.contextPath}/img/menu/down.png" onclick="moveDown(document.getElementById('__multiSelect'));"><br/>
					 <img alt="置底" class="multiImg" src="${pageContext.request.contextPath}/img/menu/bottom.png" onclick="moveBottom(document.getElementById('__multiSelect'));"><br/>
					 <img alt="删除" class="multiImg" src="${pageContext.request.contextPath}/img/menu/delete.png" onclick="delSelectOption1(document.getElementById('__multiSelect'));"><br/>
					 
					 </td></tr></table></td></tr></table>
				</td>
			</tr>
		</table>
		<div align="center">
			<input type="button" value="确定" onclick="sureAdd();" class="page-button">
			<input type="button" value="保存为自定义" onclick="doSaveFav();" class="page-button">
			<input type="button" value="关闭" onclick="extclose();" class="page-button">
		</div>
</body>

<script type="text/javascript">

var urlparam = DomUtil.init().urlParamToMap(window.location.href);

var parentList; //接收传参
var parentUserName;  //用来显示 人员名称(父)
var parentUserId;   //用来设置  隐藏的id (父)
var parentWindow; //父窗口window对象
var zidingyiname = "" ; //当前被选中的节点的名称
var nodechilds="" ;//记录自定义的所有子节点
var nownode="";
var parentMode = ""; //过滤条件
try {
	parentList = window.dialogArguments; 
	parentUserName = parentList.userName;  
	parentUserId = parentList.userId;   
	parentMode = parentList.mode;
	parentWindow = parentList.parentWindowObj; 	
} catch (e){
	parentUserId = urlparam['userId'];
	parentUserName = urlparam['userName'];
	parentMode = urlparam['mode'];
	try{
		parentWindow = window.opener.window;	
	}catch(e){
		parentWindow = parent;
	}
	
}

//alert("1="+parentMode + "|" + parentWindow.document.getElementById(parentMode).value);


var showName = ""; //设置人员
var hideUserId = ""; //隐藏的id
var root;
//创建input
function createInput(type,objId){
	try{
		var objInput = parentWindow.document.createElement("input");
		objInput.type = type; //设置类型
		objInput.name = objId; //设置名称
		objInput.id = objId;  //设置id
		objInput.readOnly = true;  //设置 readOnly=true; 
		parentWindow.document.body.appendChild(objInput);
	}catch(e){
		throw e; // alert("无法创建文本域,请手动创建!");
	}
}

//回写 人员(点击确定的时候调用)2
function setParentUser(){
	try{
		var domList = parentWindow.document.all;
		var multiSelect = document.getElementById("__multiSelect");
		var showName = "";
		var hideUserId = "";
		for(var i=0; i < multiSelect.length; i++) {
			showName += "," + multiSelect.options[i].text;
			hideUserId += "," + multiSelect.options[i].value;
		}
		if(showName != ""){
			showName = showName.substring(1);
			hideUserId = hideUserId.substring(1);
		}
		
		for(var j = 0;j <domList.length; j++){
			
			if(domList[j].id == parentUserName){ //回写名称
				domList[j].value = showName;
			}
			if(domList[j].id == parentUserId){ 
					domList[j].value = hideUserId;
			}
		}
		
		//回调完后执行afterselectUser()方法，留作扩展用
		try{
			parent.afterselectUser();
		}catch(e){
			
		}
		
	}catch(e){
		throw e; // alert("无法回写人员数据,请检测是否已连接服务器!");
	}
}

Ext.override(Ext.tree.TreeNode, {
	
    allChildExpand : function(animate,callback,scope){   
    	
      // 先展开本节点   
      var checked = this.attributes.checked ;
      var length = this.childNodes.length ;
      var expandCount = 0 ;
      
      this.expand(false, animate, function(){
          // 展开子节点   
          var childs = this.childNodes ;
          var curLength = childs.length ;
          for(var i = 0; i < curLength; i++) {   
          	
          	childs[i].ui.toggleCheck(checked);   
          	childs[i].attributes.checked = checked;  
          	
          	//最后一点节点并且没子节点
          	if(i == curLength -1) {
          		if(childs[i].childNodes.length <= 0) {
             		 	this.runCallback(callback, scope || this, [this]); 
                      return;   
          		}
          	}
          }   
          
      }, this);   
  }   
});

function init(){
	try{
		 //如果父窗口的id和name 都未创建， 我帮它创建
		 if(!parentWindow.document.getElementById(parentUserId) && !parentWindow.document.getElementById(parentUserName)){
			 createInput("text",parentUserName);
			 createInput("hidden",parentUserId);
		 }
		 hideUserId = parentWindow.document.getElementById(parentUserId).value;
		 if(hideUserId.substring(hideUserId.length-1,hideUserId.length) !=","){
			 hideUserId = hideUserId+",";
		 }
		 
		 var showId1 = parentWindow.document.getElementById(parentUserId).value;
		 var showName1 = parentWindow.document.getElementById(parentUserName).value;
		 var sId = showId1.split(",");
		 var sName = showName1.split(",");
		 for(var i=0; i<sId.length; i++){
		 	if(sId[i] != ""){
		 		showName += sId[i] + "~" + sName[i] + ",";
		 	}
		 }
		 
		document.getElementById("Users").value = hideUserId ;
		document.getElementById("userNames").value = showName;
		if(parentMode && parentMode != "undefined"){
			document.getElementById("mode").value = parentWindow.document.getElementById(parentMode).value;
		}
	}catch(e){
		throw e; // alert("初始化设置值出错!");
	}
}
var radiouids ="" ;
function seUserTree(deptIds){
	
	var Tree = Ext.tree;
			
	var data = new Tree.TreeLoader({
		 dataUrl:'${pageContext.request.contextPath}/user.do?method=departmentTree&hideAreaChecked=true&hideOrgan=true&commonlyUsed=true&onLineUser=true',	
		 baseParams:{joinUser:'${joinUser}',joinUserDepartmentId:'${joinUserDepartmentId}',deptIds:deptIds,useOrgan:"${param.useOrgan}"}
	});
	
	var tree = new Tree.TreePanel({
        el:'departmentTree',
        id:'userTree',
        autoScroll:true,
        animate:true,
        height:260, 
        width:180,
        rootVisible:false,
        containerScroll: true, 
        loader: data
    });
 
    data.on('beforeload',function(treeLoader,node){
		this.baseParams.departid = node.attributes.departid,
		this.baseParams.areaid = node.attributes.areaid,
		this.baseParams.departname = node.attributes.departname,
		this.baseParams.isSubject = node.attributes.isSubject
	},data);
    
	tree.on('click', function(node, checked) {   
		var attr=node.attributes;
		var uids=attr["fav_user_ids"];
		zidingyiname = node.text ;
		nownode = node;
		
		if((node.text).indexOf("自定义")>=0){
			nodechilds = "," ;
			for(var i=0;i<node.childNodes.length;i++){
				nodechilds += node.childNodes[i].text+"," ;	
			}
			//html="<font class='del' onclick='delFav();' style='width:20px;height:20px;color:red;'>X</font>" ;
			//if($(".del").length==0)
			//$(".x-tree-node-el:not(.folder,.x-tree-node-expanded,.x-tree-node-collapsed)").append(html);
		}else{
			if(node.parentNode.text.indexOf("自定义")>=0){
				nodechilds = "," ;
				
				for(var i=0;i<node.parentNode.childNodes.length;i++){
					nodechilds += node.parentNode.childNodes[i].text+"," ;	
				}
					
				
			}
		}
		if(uids){
			//如果url 中带参数choice = radio de的话就是单选
			if("${param.choice}"=="radio"){

				radiouids = uids.substring(1)  ;
			   
			   //throw e; // alert(uids);
			    var url="${pageContext.request.contextPath}/user.do?method=getUserTree";
				var request="&ids="+radiouids+"&rand="+Math.random();
				
				
				$.getJSON(url+request,{},function(jarr){
					
					candidatesToTables(jarr) ;
				});
			}else{
				document.getElementById("Users").value=attr["fav_user_ids"];
			    uids=uids.substring(1);
			   //throw e; // alert(uids);
			    var url="${pageContext.request.contextPath}/user.do?method=getUserTree";
				var request="&ids="+uids+"&rand="+Math.random();
				
				
				$.getJSON(url+request,{},function(jarr){
					var names = "";
					for(var i=0;i<jarr.length;i++){
						var val = jarr[i]["id"]+"~"+jarr[i]["name"];
						names += val+",";
					}
					document.getElementById("userNames").value=names;
					
					
					
				    // loadUserToDiv();
				    hadSelectUser();
				});
			    //seUserTree();
			    //createRoleTree();
			    //var url="${pageContext.request.contextPath}/user.do?method=getUserTree";
				//var request="&ids="+users+"&rand="+Math.random();
				//var result=ajaxLoadPageSynch(url,request);
				//var json=eval("("+result+")");
			    //loadUserToDiv();
			    //hadSelectUser();
				//return;
			}
		}
		node.expand();   
		addCon(node.attributes["departid"]);   //departid
		node.attributes.checked = checked; 
			node.eachChild(function(child) {  
				child.ui.toggleCheck(checked);   
				child.attributes.checked = checked;   
				child.fireEvent('checkchange', child, checked);   
			});
		
	}, tree);  
	 root=new Ext.tree.AsyncTreeNode({
		   id:'0',
		   draggable:false,
		   text:'显示全部'
		});
    tree.setRootNode(root);

    tree.render(); 
    
    document.getElementById('playUser').style.height = '260px';
    $("#departmentTree .x-panel-body-noheader").css("height",'260px') ;
}

var treeRoleRoot;

//角色树
function createRoleTree(rIds){
	var Tree = Ext.tree;
	var treeRoleData = new Tree.TreeLoader({
		 dataUrl:'${pageContext.request.contextPath}/user.do?method=getRoleTree&rand='+Math.random(),
		 baseParams:{roleId:'${joinRole}',rIds:rIds}
	});
	var treeRoleUser = new Tree.TreePanel({
      	el:'roleTreeDiv',
        id:'roleTree',
        autoScroll:true,
        animate:true,
        height: 260, 
        width : 180,
        rootVisible:false,
        containerScroll: true, 
        loader:treeRoleData
    });
	treeRoleUser.on('click', function(node, checked) {   
		node.expand();   
		addRoleUser(node.id);
		node.attributes.checked = checked; 
			node.eachChild(function(child) {  
				child.ui.toggleCheck(checked);   
				child.attributes.checked = checked;   
				child.fireEvent('checkchange', child, checked);   
			});
		
	}, treeRoleUser);
	
	treeRoleData.on('beforeload',function(treeLoader,node){
		//this.baseParams.departmentId = node.attributes.departmentId;
		this.baseParams.id = node.id;
	},treeRoleData);
	
    treeRoleUser.on('checkchange', function(node, checked) {   
		node.allChildExpand(false,function (){

		},this);
	}, treeRoleUser);  
    
     treeRoleRoot = new Tree.AsyncTreeNode({
        text: '角色列表',
        draggable:false,
        id:'0'
    });
    treeRoleUser.setRootNode(treeRoleRoot);
    treeRoleUser.render();
    
}
function show_hideDiv(obj){  
	if(obj.value.indexOf("角色")>-1){
		document.getElementById("departmentTree").style.display="none";
		document.getElementById("roleTreeDiv").style.display="block";
		obj.value = "按部门选择";
		document.getElementById("treeTxt").innerText = "角色下拉";
	}else{
		obj.value = "按角色选择";
		document.getElementById("roleTreeDiv").style.display="none";
		document.getElementById("departmentTree").style.display="block";
		document.getElementById("treeTxt").innerText = "部门下拉";
	}
}

</script>


<script type="text/javascript">
//初始化时 加载人员
function loadUserToDiv(){
	var users = document.getElementById("Users").value;
	
	if(users !=""){
		try{
			var url="${pageContext.request.contextPath}/user.do?method=getUserTree";
			var request="&ids="+users+"&rand="+Math.random();
			var result=ajaxLoadPageSynch(url,request);
			var candidates=eval("("+result+")");
			candidatesToTables(candidates);
		}catch(e){
			throw e; // alert("无法获取部门里的人员，可能服务器已断开!");
		}
	}
}

function loadUserToDiv2(){
	var users = document.getElementById("Users").value;
	
	if(users !=""){
		try{
			var url = "${pageContext.request.contextPath}/user.do?method=getUserTree";
			var request = "&ids="+users+"&rand="+Math.random();
			var result = ajaxLoadPageSynch(url,request);
			var candidates = eval("("+result+")");
			
			candidatesToTables(candidates);
			hadSelectUser();
		}catch(e){
			throw e; // alert("无法获取部门里的人员，可能服务器已断开!");
		}
	}
}

//查询部门里人员的数据
function getUserTreeById(autoid,keywords){
	try{
		var mode  = document.getElementById("mode");
		var url = "${pageContext.request.contextPath}/user.do?method=getUserTree";
		var request = "&autoid="+autoid+"&keywords="+keywords+"&rand="+Math.random()+"&mode="+mode.value;
		var result = ajaxLoadPageSynch(url,request);
		var json = eval("(" + result + ")");
		return json;
	}catch(e){
		throw e; // alert("无法获取部门里的人员，可能服务器已断开!");
	}
}

//创建div(用来显示人员)
function createObject(html){
	var myDiv;
	try{
		myDiv = document.createElement("div");
		if (html.indexOf("td") < 0){
			myDiv.innerHTML="<div align=\"center\">当前所选部门无人员!</div";	
		} else {
			myDiv.innerHTML = html;	
		}
		myDiv.id="playTreeUser";
		document.getElementById("playUser").innerHTML="";
		document.getElementById("playUser").appendChild(myDiv);
		__setMultiSelect() ;
	}catch(e){
		throw e; // alert("当前浏览器不支持或当前对象不存在!");
	}
}

//创建table 
function createTable(json , tableColor){
	if (!json){
		return "";
	}
	try{
		var conHtml = "<table style=\"border:rgb(224,224,224) 1px solid ;margin: 5px; " + tableColor + "\" >";
		var id, name, departName, departmentId;
		for (var i = 0; i < json.length; i++) {
			id = json[i].id;
			name = json[i].name;
			departName = json[i].departName;
			departmentId = json[i].departmentId;
			var check = "";
			if (document.getElementById("Users").value.indexOf(id + ",") > -1) {
				check = "checked='checked'";
			}
			var checkbox = "<input type='checkbox'  userId='" + id
					+ "'  id='userid" + id + "'  " + check
					+ " style='border:0px;'  title='" + departName + " - "
					+ name + "' onclick='addUsrs(this)'  userName='" + id
					+ "~" + name + "' departName='" + departName
					+ "' departmentId='" + departmentId
					+ "' name='userid' />&nbsp;" + name;
			if (i % 2 == 0) {
				conHtml = conHtml
						+ "<tr><td style='width:150;border-right:1px solid rgb(252,252,252);padding-left:10px;'>";
				conHtml = conHtml + checkbox + "</td>";
			}
			if (i % 2 != 0) {
				conHtml = conHtml
						+ "<td  style='width:150;padding-left:10px;'>"
						+ checkbox + "</td>";
				conHtml = conHtml + "</tr>";
			}
		}
		conHtml = conHtml + "</table>";
		return conHtml;
	} catch (e) {
		throw e; // alert("构建table失败!");
	}
}

	//点击角色
	function addRoleUser(roleId) {
		try {
			if (roleId == "") {
				return;
			}
			var url = "${pageContext.request.contextPath}/user.do?method=getUserTree";
			var request = "&roleId=" + roleId + "&rand=" + Math.random();
			var result = ajaxLoadPageSynch(url, request);
			var candidates = eval("(" + result + ")");
			candidatesToTables(candidates);
		} catch (e) {
			throw e; // alert("无法获取部门里的人员，可能服务器已断开!");
		}
	}
	
	function candidatesToTables(candidates){
		var html = [];
		if (candidates.length > 0) {
			var part = [ candidates[0] ];
			var cur_departid = candidates[0].departmentId;
			var cur_departname = candidates[0].departName;
			for (var i = 1; i < candidates.length; i++) {
				if (cur_departid != candidates[i].departmentId) {
					html.push('<span class="departname">' + cur_departname + '</span>');
					html.push(createTable(part, ""));
					part.clear();
				}
				part.push(candidates[i]);
				cur_departid = candidates[i].departmentId;
				cur_departname = candidates[i].departName;
			}
			html.push('<span class="departname">' + cur_departname + '</span>');
			html.push(createTable(part, ""));
		}
		createObject(html.join('<br/>')); //newTable
		checkedAdd();//检测选中
	}

	//点击树(左边的部门)用来加载部门里的人员
	function addCon(autoid) {
		var candidates;
		autoid = autoid.replace("depart_", "");
		candidates = getUserTreeById(autoid, "");
		candidatesToTables(candidates);
	}

	//点击复选框调用的函数
	function addUsrs(obj) {
		if (typeof obj == 'string'){
			obj = document.getElementById(obj);		
		}
		if (!obj){
			return;
		}
		var users = document.getElementById("Users").value;
		var userNames = document.getElementById("userNames").value;
		var addUser = obj.getAttribute('userId');
		var addUserName = obj.getAttribute('userName');
		if("${param.choice}"=="radio"){
			var checks = $("input[name=userid]:checked") ;
			for(var i=0;i<checks.length;i++){
				if(checks[i].id!=obj.id){
					$($("input[name=userid]:checked")[i]).attr("checked",false);
				}
			}
			if (obj.checked) {
			
					users = ","+addUser + ",";
					document.getElementById("Users").value = users;
					userNames = "," + addUserName + ",";
			} else {
					document.getElementById("Users").value = ",";
					userNames = ",";
			}
		}else{
			if (obj.checked) {
				if (users.indexOf(addUser + ",") < 0) { //不存在 再累加
					users = users + addUser + ",";
					document.getElementById("Users").value = users;
				}
				if (userNames.indexOf(addUserName + ",") < 0) {//不存在 再累加
					userNames = userNames + addUserName + ",";
				}
			} else {
				if (users.indexOf(addUser + ",") > -1) {
					document.getElementById("Users").value = users.replace(
							addUser + ",", "");
				}
				if (userNames.indexOf(addUserName + ",") > -1) {
					userNames = userNames.replace(addUserName + ",", "");
				}
			}
		}
		
		document.getElementById("userNames").value = userNames;
		__setMultiSelect();

	}

	//检测 如果有选中的，就添加到放到隐藏域
	function checkedAdd() {
		var listCheck = document.getElementsByName("userid");
		if (listCheck) {
			for (var i = 0; i < listCheck.length; i++) {
				if (listCheck[i].checked) {
					
				}
			}
		}
		__setMultiSelect();
	}

	//点击确定的时候 调用
	function sureAdd() {
		checkedAdd(); //检测 选中项
		setParentUser(); //回写人员
		//window.close();
		parentWindow._cascadeWinext.hide();
	}

	//查看已勾选人员
	function hadSelectUser() {
		try {
			var userJson = document.getElementById("userNames").value;
			
			if (userJson.substring(userJson.length - 1, userJson.length) == ",") {
				userJson = userJson.substring(0, userJson.length - 1);
			}
			//throw e; // alert("userjson:"+userJson);
			//创建已选择人员的table
			if (userJson != "") {
				var json = userJson.split(",");
				var id = "";
				var name = "";
				var conHtml = "<table style=\"border:#8db2e3 1px solid; BORDER-COLLAPSE: collapse;margin-right:10px;background: #CAE8EA  no-repeat; \" >";
				for (var i = 0; i < json.length; i++) {
					id = json[i].split("~")[0];
					name = json[i].split("~")[1];
					var check = "";
					var lsUser = document.getElementById("Users").value;
					if (lsUser.substring(lsUser.length - 1, lsUser.length) != ",") {
						document.getElementById("Users").value = document
								.getElementById("Users").value
								+ ",";
					}
					if (document.getElementById("Users").value
							.indexOf(id + ",") > -1) {
						check = "checked='checked'";
					}
					if (i % 2 == 0) {
						conHtml = conHtml
								+ "<tr><td style='width:150;border-right:1px solid rgb(252,252,252);padding-left:10px;'>";
						conHtml = conHtml
								+ "<input style=\"border:0px;\" onclick=\"addUsrs(this)\" "
								+ check + " type=\"checkbox\" id=\"userid" + i
								+ "\" userId=\"" + id
								+ "\" name=\"userid\" userName=\"" + id + "~"
								+ name + "\"/>&nbsp;" + name + "</td>";
					}
					if (i % 2 != 0) {
						conHtml = conHtml
								+ "<td style='width:150;padding-left:10px;'><input "
								+ check
								+ " style=\"border:0px;\"  onclick=\"addUsrs(this)\" type=\"checkbox\" id=\"userid"
								+ i + "\" userId=\"" + id + "\" userName=\""
								+ id + "~" + name
								+ "\" name=\"userid\" />&nbsp;" + name
								+ "</td>";
						conHtml = conHtml + "</tr>";
					}
				}
				conHtml = conHtml + "</table>";

				createObject(conHtml);
			} else {
				document.getElementById("playUser").innerHTML = "<div align=\"center\">尚未选择人员!</div>";
			}
		} catch (e) {
			throw e; // alert("无法查看已勾选人员，网络连接失败，失败原因"+e);
		}
	}

	//搜索所调用的函数
	function goSerach() {
		try {
			var keywords = document.getElementById("keywords").value;
			if (keywords == "") {
				return;
			}
			var candidates;
			candidates = getUserTreeById("", keywords);
			candidatesToTables(candidates);

		//	document.getElementById("playUser").innerHTML = "";
		//	document.getElementById("playUser").innerHTML = newTable;
		} catch (e) {
			throw e; // alert("查询失败，服务器连接故障!");
		}
	}

	//清空选择
	function goCleanUser() {
		try {
			document.getElementById("Users").value = "";
			document.getElementById("userNames").value = "";
			var listCheck = document.getElementsByName("userid");
			if (listCheck) {
				for (var i = 0; i < listCheck.length; i++) {
					if (listCheck[i].checked) {
						//document.getElementById("userid" + i).checked = false;
						listCheck[i].checked = false;
					}
				}
			}
			parentWindow.document.getElementById(parentUserId).value = ""; //清空 父窗口的id
			parentWindow.document.getElementById(parentUserName).value = ""; //情况 父窗口的名称
		} catch (e) {
			throw e; // alert("清空失败,当前对象不存在!");
		}
		__setMultiSelect();
	}

	//全选、反选 事件
	function check(obj) {
		try {
			var listCheck = document.getElementsByName("userid");

			if (listCheck) {

				if (obj == "全选") {
					for (var i = 0; i < listCheck.length; i++) {
						if (listCheck[i].checked == false) {
							listCheck[i].checked = true;
							addUsrs(document.getElementById(listCheck[i].id));
						}	
					}
				}

				if (obj == "反选") {
					for (var i = 0; i < listCheck.length; i++) {
						try {

							if (listCheck[i].checked) {
								listCheck[i].checked = false;
							} else {
								listCheck[i].checked = true;
							}
							
							addUsrs(document.getElementById(listCheck[i].id));
							
						} catch (e) {
							throw e; // alert("反选对象不存在！");
						}
					}
				}

				if (obj == "全不选") {
					for (var i = 0; i < listCheck.length; i++) {
						if (listCheck[i].checked) {
							listCheck[i].checked = false;
							addUsrs(document.getElementById(listCheck[i].id));
						}
					}
				}
			}
			__setMultiSelect();
		} catch (e) {
			throw e; // alert("无法访问对象,操作失败!");
		}

	}

	function doSaveFav() {
		try{
			if(nownode.parentNode.text.indexOf("自定义")>=0){			
				zidingyiname = zidingyiname.substring(0,zidingyiname.indexOf(".",","));
				//alert("ss "+zidingyiname);
			}else{
				zidingyiname = "";			
			}	
		}catch(e){
			zidingyiname = "";
		}
		Ext.MessageBox.prompt("保存自定义用户","请输入自定义类型名字",function(e, text) {
							if (e != 'ok' || text == '')
								return;
							var url = "${pageContext.request.contextPath}/user.do";
							var fav_user_ids = document.getElementById("Users").value;
								//fav_user_ids = ","+fav_user_ids;
								var firststr = fav_user_ids.substring(0,1);
								if(firststr !=","){
									fav_user_ids = "," + fav_user_ids;
								}
							$.post(url,{method : "doFindFav",name : text,fav_user_ids : fav_user_ids},function(data){
								//alert("data "+data);
								if(data=="have"&&!confirm("是否覆盖自定义用户")){
									return ;
								}
								$.post(url,{method : "doSaveFav",str : data,name : text,fav_user_ids : fav_user_ids},function(str) {
									document.getElementById("aslectType").value = "按角色选择";
									document.getElementById("roleTreeDiv").style.display = "none";
									document.getElementById("departmentTree").style.display = "block";
									alert(str);
									root.reload();
								});
							});
							
							
						},window,false,zidingyiname);
	}
	
	function deletelist(myid){
		//alert("del"+myid);
		if(true &&!confirm("确定删除当前自定义节点？")){
			return ;
		}
		var url = "${pageContext.request.contextPath}/user.do";
		var fav_user_ids = document.getElementById("Users").value;			
	
		$.post(url,{method : "doDelFav", myid : myid},function(str) {
			document.getElementById("aslectType").value = "按角色选择";
			document.getElementById("roleTreeDiv").style.display = "none";
			document.getElementById("departmentTree").style.display = "block";
			alert(str);
			root.reload();
		});
		
	}
	//将选中的放到下拉框中
	function __setMultiSelect(){		
		try{
			var multiSelect = document.getElementById("__multiSelect");
			var userNamelist = document.getElementById("userNames").value;
			var showName = "";
			var hideUserId = "";
			
			if(userNamelist !=""){
				if(userNamelist.substring(userNamelist.length-1,userNamelist.length) ==","){
					userNamelist = userNamelist.substring(0,userNamelist.length-1);
				 }
				json = userNamelist.split(",");
				for(var i=0;i<json.length;i++){
					 id=json[i].split("~")[0];
					 name=json[i].split("~")[1];
					 showName +=name+",";
					 hideUserId +=id+",";
				} 
				 if(showName.substring(showName.length-1,showName.length) ==","){
					 showName= showName.substring(0,showName.length-1);
					 hideUserId = hideUserId.substring(0,hideUserId.length-1);
				 }
			}
			//为空，清空顺序列表
			delSelectOption(multiSelect);
			showName = showName.split(",");
			hideUserId = hideUserId.split(",");
			for(var i=0;i<hideUserId.length;i++){
				if(hideUserId[i] != ""){
					addSelectOption(multiSelect,showName[i],hideUserId[i]);
				}
			}
		}catch(e){
			
			alert(e);
		}
	}
	//关闭窗口
	function extclose(){
		parentWindow._cascadeWinext.hide();
		//	window.close();
	}
	
	    			
	Ext.onReady(function() {
		init();
		document.getElementById('keywords').focus() ;
		
		var mode = document.getElementById("mode");
		var deptIds = "",rIds = "";
		if(mode.value != ""){
			var m = mode.value.split(";");			
			for(var i=0;i<m.length;i++){
				if(m[i].indexOf("role")>-1){
					r = m[i].split("=");
					rIds = r[1];
				}else if(m[i].indexOf("department")>-1){
					d = m[i].split("=");
					deptIds = d[1];
				}
			}
			deptIds = (deptIds=="" ? "-1" : deptIds); 
			rIds = (rIds=="" ? "-1" : rIds);
		}
		//alert(deptIds + "|" + rIds);
		seUserTree(deptIds); 
		createRoleTree(rIds);
		loadUserToDiv();
		
		if(deptIds == "-1"){
			var aslectType = document.getElementById("aslectType");
			show_hideDiv(aslectType);
			aslectType.style.display = "none";	
		}
		
	})
</script>
</html>