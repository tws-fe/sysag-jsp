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
					window.location="${ctx}/notice.do?method=list&unitId=${unitId}";
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
        items:[{contentEl: "tab1",id:"p1",title:""}]
        });
	
	
	htmled = new Ext.matech.HTMLEditor({
		applyTo:'content',
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
	
 	var layout = new Ext.Viewport({
		layout:'border',
		items:[{
				region:'center',
	    		id:'center-panel',
	    		margins:'0 0 0 0',
	    		layout:'border',
	    		lines:true,
	    		items:[mypanel,htmled]
			}
		 ]
	});
 	layout.doLayout();
}

Ext.onReady(ext_init);

</script>
</head>
<body>

<div id="tab1" style="text-align: center;">
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/notice.do?method=save" class="autoHeightExtForm">
	<table border="0" cellspacing="0" class="editTable">
		<tbody>
			<tr>
				<td class="editTitle"  colspan="2">公告通知</td>
			</tr>
			<tr>
				<th>
					<label for="title">标题：</label>
				</th>
				<td>
					<input id="title" name="title" size="20" style="width: 417px; height: 30px;" type="text" value="${notice.title}"/></td>
			</tr>
			
			<tr>
				<th>
					<label for="userId">发布人：</label>
				</th>
				<td>${userSession.userName} (${userSession.userLoginId})</td>
			</tr>
			
			<tr>
				<th>
					<label for="publishOrgan">发布单位：</label>
				</th>

				<td>
					<input autoid="js:sys.unit.BasicCtlUnitImpl" listWidth="600" id="organId_" name="organId_" size="50" value="${notice.organId_}" multilevel=true listWidth="320" loadAll="false" readOnly/>
			</tr>
			
			<tr>
				<th>
					<label for="publishDate">发布时间：</label>
				</th>
				<td>${Date}</td>
			</tr>
			
			
			<tr>
				<th>
					<label for="publishOrgan">接收单位：</label>
				</th>
				<td>
					<input autoid="js:sys.unit.BasicCtlUnitImpl" listWidth="600" id="receiver" name="receiver" size="50" value="${receiver}" multilevel=true listWidth="320" loadAll="false"/>
			</tr>
			
			<tr>
				<th>
					<label for="publishOrgan">是否已发布：</label>
				</th>
				<td>${isPublish}</td>
			</tr>
			
			<tr>
				<th>
					<label for="content">内容：</label>
				</th>
					<td>
						<textarea id="content" name="content" rows="26" class="required" cols="90" >${notice.content}</textarea>
					</td>
			</tr>
			<tr>
				<th>
					<label for="fileName">附件：</label>
				</th>
				<td >
				   <input type="hidden" name="attachId" id="attachId" value="${uuid}" ext_type="attachFile" ext_filetype="xls|doc|docx|xlsx" 
				   maxAttach="1"  indexTable="notice" ext_callback="getFileType" buttonText="上传附件" handler="CommonHandler"/>
				</td>
			</tr>
		</tbody>
	</table>
	<input name="uuid" id="uuid" type="hidden" value="${uuid}">
	<input name="editType" id="editType" type="hidden" value="${editType}">
	<input name="unitId" id="unitId" type="hidden" value="${unitId}">
	<input name="releaseDate" id="releaseDate" type="hidden" value="${Date}">
	<input name="publishuser" id="publishuser" type="hidden" value="${userSession.userName} (${userSession.userLoginId})">
	</form>
</div>

</body>

<script type="text/javascript">

function save(){

	matech.formSummit('thisForm',"${ctx}/notice.do?method=list&unitId=${unitId}",function(){
		parent.refreshTree();
	});
	
}

</script>
</html>