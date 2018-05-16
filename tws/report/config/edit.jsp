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
					window.location="${ctx}/reportConfig.do?method=list&parentid=${backId}";
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
		<form action="${ctx}/reportConfig.do?method=save" method="post" name="thisForm" id="thisForm">
			<input type="hidden" name="objectId" id="objectId" value="${reportDetail.uuid}">
			<input type="hidden" name="parentid" id="parentid" value="${parentid}">
			<input type="hidden" name="add" id="add" value="${add}">
			
			<table border="0" cellspacing="0" class="editTable" style="width:80%;" >
				<tr>
					<td class="editTitle" colspan="2">报表管理</td>
				</tr>
				<tr>
					<th style="word-break : break-all;word-wrap: break-word;">报表标题：<span class="mustSpan">[*]</span></th>
					<td>
					<input name="title" id="title" size="50" class="required" maxlength="100" value="${reportDetail.title}" title="请输入报表名称，不能为空！">
					</td>
				</tr>
				<tr>
					<th style="word-break : break-all;word-wrap: break-word;">英文别名：<span class="mustSpan">[*]</span></th>
					<td>
					<input name="birtname" id="birtname" size="50" class="required" maxlength="100" value="${reportDetail.birtname}" >
					</td>
				</tr>
				<tr>
					<th style="word-break : break-all;word-wrap: break-word;">报表类型：<span class="mustSpan">[*]</span></th>
					<td>
					<input name="type" id="type" size="50" class="required" maxlength="100" value="${reportDetail.type}" >
					</td>
				</tr>
				<tr>
					<th width="300px">所属分类：<span class="mustSpan">[*]</span></th>
					<td>
					<input autoid="js:report.reportType" id="hParentid" name="hParentid" class="required"  value="${parentid }"	multilevel=true  size="50" />
					</td>
				</tr>
				<tr>
					<th>创建时间：<span class="mustSpan">[*]</span></th>
					<td >
					<input name="createTime" id="createTime" size="50" class="required"  value="${curDateTime}" readOnly />
					</td>
				</tr>
				
				<tr>
					<th style="word-break : break-all;word-wrap: break-word;">显示字段：<span class="mustSpan">[*]</span></th>
					<td>
					<input name="fieldId" id="fieldId" size="50" class="required" maxlength="100" value="${reportDetail.fieldId}" >
					</td>
				</tr>
				<tr>
					<th style="word-break : break-all;word-wrap: break-word;">显示字段中文名：<span class="mustSpan">[*]</span></th>
					<td>
					<input name="fieldName" id="fieldName" size="50" class="required" maxlength="100" value="${reportDetail.fieldName}" >
					</td>
				</tr>
				<tr>
					<th style="word-break : break-all;word-wrap: break-word;">汇总条件：<span class="mustSpan">[*]</span></th>
					<td>
					<input name="sumTerm" id="sumTerm" size="50" class="required" maxlength="100" value="${reportDetail.sumTerm}" >
					</td>
				</tr>
				<tr>
					<th style="word-break : break-all;word-wrap: break-word;">图表类型与条件：<span class="mustSpan">[*]</span></th>
					<td>
					<input name="iconTerms" id="iconTerms" size="50" class="required" maxlength="100" value="${reportDetail.iconTerms}" >
					</td>
				</tr>
				
				<tr>
					<th width="300px">生成sql：<span class="mustSpan">[*]</span></th>
					<td colspan="500">
							<textarea onscroll='this.rows++;'  style='width:400px;height: 300px;' onpropertychange='autoHeight(this);' oninput='autoHeight(this)'  name="createSQL" id="createSQL" maxLength=100 >${createSql}</textarea>
					</td>
				</tr>
			</table>
		</form>
</div>

</body>
<script type="text/javascript">
Ext.onReady(function(){
	new Ext.matech.HTMLEditor({
		applyTo:'reportContent',
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

	if($("#reportContent").val()==""){
		alert("请填写正文！");
		return;
	}
	var url="${ctx}/reportConfig.do?method=list&parentid=${backId}";
	matech.formSummit("thisForm",url);
	//document.thisForm.submit();
}
</script>
</html>
