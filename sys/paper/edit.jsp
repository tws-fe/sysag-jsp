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
					window.location="${ctx}/paper.do?method=list&unitId=${unitId}";
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

Ext.onReady(ext_init);

</script>
</head>
<body>

<div id="tab1">
	<form name="thisForm" id="thisForm" method="post" action="${ctx}/paper.do?method=save" class="autoHeightExtForm">
		<table border="0" cellspacing="0" class="editTable">
			<tr>
				<td class="editTitle"  colspan="2">文书模版管理</td>
			</tr>
										
			<tr>
				<th  >模版名称：<span class="mustSpan">[*]</span></th>
				<td >
					<input class="required" size="50" type="text" name="papname" id="papname"  value="${paper.papname}" >
				</td>
			</tr>
			<tr>
				<th  >模版文书：<span class="mustSpan">[*]</span></th>
				<td >
				   <input type="hidden" name="attachId" id="attachId" value="${paper.papid}" ext_type="attachFile" ext_filetype="xls|doc|docx|xlsx" 
				   maxAttach="1"  indexTable="papData" ext_callback="getFileType" buttonText="上传底稿" handler="CommonHandler"/>
				</td>
			</tr>
			<tr>
				<th >模版类型:</th>
				<td >
				  <input autoid="js:sys.paper.PaperTypeImpl" id="typeid" name="typeid" size="50" value="${paper.typeid}" />
				</td>
			</tr>
						
			<tr>
				<th >所属单位:</th>
				<td >
				  <input autoid="js:sys.unit.BasicCtlUnitImpl" listWidth="600" id="organId_" name="organId_" size="50" value="${paper.organId_}" multilevel=true listWidth="320" loadAll="false" readOnly/>
				</td>
			</tr>
			<tr>
				<th>备注：</th>
				<td>
					<textarea rows="10" cols="50" name="remark" id="remark">${paper.remark}</textarea>
				</td>
			</tr>				
		</table>
		<input name="editType" id="editType" type="hidden" value="${editType}">
		<input name="unitId" id="unitId" type="hidden" value="${unitId}">
		<input name="typename" id="typename" type="hidden" value="${paper.typename}">
		<input name="papid" id="papid" type="hidden" value="${paper.papid}">
	</form>
</div>

</body>

<script type="text/javascript">

function save(){
    
	$("#typename").val(Ext.getCmp("typeid").getRawValue());
	
	matech.formSummit('thisForm',"${ctx}/paper.do?method=list&unitId=${unitId}",function(){
		parent.refreshTree();
	});
	
}

//获取文件类型
function getFileType(obj){
	var result=obj[0].clientFileName;
	var i=result.lastIndexOf(".");
	result=result.substring(0,i);
	$("#papname").val(result);
}

</script>
</html>