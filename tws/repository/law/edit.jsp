<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<style type="text/css">.x-panel-body{border:0px;}</style>
<script type="text/javascript">
function ext_init(){	
	var _tbar=new Ext.Toolbar({
		items:[
			{ 
				text:'保存',
				icon:'${ctx}/tws/css/img/save.gif',
				handler:function(){
				    save();
				}
			},'-',{
				text:'返回',
				icon:'${ctx}/tws/css/img/back.gif',
				handler:function(){
					window.location="${ctx}/law.do?method=list&parentid=${backId}";
				}
			}
		]
	});
	
	
	//内容
	var mypanel=new Ext.Panel({
        id: 'contentPanel',
        region:'center',
        width:document.body.clientWidth,
        height:document.body.clientHeight,
        tbar:_tbar,
        autoScroll:true,
        items:[
   	        {contentEl: "content_div",id:"contentItem"}
   	    ]
    });	

 	var layout = new Ext.Viewport({
		layout:'border',
		items:[{
				region:'center',
	    		id:'center-panel',
	    		margins:'0 0 0 0',
	    		layout:'border',
	    		lines:true,
	    		items:[
					mypanel
	    		]
			}
		 ]
	});
 	layout.doLayout();
 	
	
}

Ext.onReady(ext_init);

</script>
<title></title>
</head>

<body>
	<div id="content_div">
		<form action="${ctx}/law.do?method=save" method="post" name="thisForm" id="thisForm">
			<input type="hidden" name="objectId" id="objectId" value="${lawDetail.object_id}">
			<input type="hidden" name="parentid" id="parentid" value="${parentid}">
			<input type="hidden" name="add" id="add" value="${add}">
			
			<table border="0" cellspacing="0" class="editTable" style="width:80%;" >
				<tr>
					<td class="editTitle" colspan="2">内容维护</td>
				</tr>
				<tr>
					<th style="word-break : break-all;word-wrap: break-word;">标题：<span class="mustSpan">[*]</span></th>
					<td>
					<input name="lawName" id="lawName" size="50" class="required" maxlength="100" value="${lawDetail.lawName}" title="请输入法规文件名称，不能为空！">
					</td>
				</tr>
				<tr>
					<th width="300px">分类：<span class="mustSpan">[*]</span></th>
					<td>
					<input autoid="js:repository.LawType" id="hParentid" name="hParentid" class="required"  value="${parentid }"	multilevel=true  size="50" />
					</td>
				</tr>
				<tr>
					<th>发文单位：<span class="mustSpan">[*]</span></th>
					<td >
					<input name="department" id="department" size="50" class="required"  value="${lawDetail.department}" >
					</td>
				</tr>
				<tr>
					<th>发文编号：</th>
					<td>
						 <input name="lawNo" id="lawNo" size="50" value="${lawDetail.lawNo}" title="请输入发文编号！">
						 <input name="backId" type="hidden" value="${backId}"/> 
					</td>
				</tr>
				<tr>
					<th>版本号：</th>
					<td>
					 	<input name="version" id="version" size="50" value="${lawDetail.version}" >
					</td>
				</tr>
				<tr>
					<th>法规内容：</th>
					<td >
						<textarea id="lawContent" name="lawContent" rows="26" class="required" cols="90" >${lawDetail.lawContent}</textarea>
					</td>
				</tr>
			</table>
		</form>
</div>

</body>
<script type="text/javascript">
Ext.onReady(function(){
	new Ext.matech.HTMLEditor({
		applyTo:'lawContent',
		width:800,
		height:500,
		enableAlignments:true,
		enableColors:true,
		enableFont:true,
		enableFontSize:true,
		enableFormat:true,
		enableLinks:true,
		enableLists:true,
		enbleSourceEdit:true 
	});
});		
//保存
function save() {
	if(!formSubmitCheck('thisForm')){
		return;
	}

	if($("#lawContent").val()==""){
		alert("请填写正文！");
		return;
	}
	var url="${ctx}/law.do?method=list&parentid=${backId}";
	matech.formSummit("thisForm",url);
	//document.thisForm.submit();
}
</script>
</html>
