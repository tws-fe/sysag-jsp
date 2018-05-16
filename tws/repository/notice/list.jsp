<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript">

var _grid;
var _toolbar;
var view="${view}";

function ext_init(){
	_toolbar=new Ext.Toolbar({
		height:30,
		width:Ext.getBody().getWidth(),
		region:'north',
		items:[{ 
			    id:'btn-1',
				text:'新增', 
				icon:'${ctx}/tws/css/img/add.gif',
				handler:function(){
					add();
				}
			}
			,'-',{ 
				id:'btn-2',
				text:'修改',
				icon:'${ctx}/tws/css/img/edit.gif',
				handler:function(){
					edit();
				}
			},'-',
			    { 
				id:'btn-3',
				text:'删除',
				icon:'${ctx}/tws/css/img/delete.gif',
				handler:function(){
					remove();
				}
			},'-',{
				text:'发布',
				icon:'${ctx}/tws/css/img/back.gif',
				handler:function(){
					publish();
				}
			},'-',{
				text:'撤回',
				icon:'${ctx}/tws/css/img/back.gif',
				handler:function(){
					revoke();
				}
			}
		]
	});
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:repository.notice.NoticeListGridJson",
		param:{unitId:"${unitId}"},
		currentPage:1,
		singleSelect:true,
	
		columns:[{id:"TITLE",header:"标题",dataIndex:"TITLE",width:120,sortable:true,align:"left"},
	        	{id:"PUBLISHUSER",header:"发布人",dataIndex:"PUBLISHUSER",width:330,sortable:true,align:"left"},
					{id:"DEPARTNAME",header:"发布单位",dataIndex:"DEPARTNAME",width:120,sortable:true,align:"left"},
					{id:"RELEASEDATE",header:"发布日期",dataIndex:"RELEASEDATE",width:120,sortable:true,align:"left"},
					{id:"ISPUBLISH",header:"是否已发布",dataIndex:"ISPUBLISH",width:120,sortable:true,align:"left",renderer:function(value, cellmeta, record){
						var ispublish = record.get("ISPUBLISH");
						if(ispublish=="0"){
							return "否";
						} else if(ispublish=="1"){
							return '<span style="color: red">是</span>';
						}else{
							return "";
						}
					}}
					],
		fields:["UUID","TITLE","PUBLISHUSER","ORGANID_","RELEASEDATE","ISPUBLISH","DEPARTNAME"],
		ondbclick:grid_dblclick,
		region: 'center'
	});	
	if (view=="true") {
		new Ext.Viewport({
			layout:'border',
			items:[
				_grid
			]
		});
	} else {
		new Ext.Viewport({
			layout:'border',
			items:[
				_toolbar,
				_grid
			]
		});
	}
}

Ext.onReady(ext_init);

</script>
</head>

<body>

</body>

<Script>
//新增下级
function add() {
 
    var unitId="${unitId}";
    if(unitId==""){
    	alert("请先选择左边的单位");
    	return false;
    }
	window.location = "${ctx}/notice.do?method=edit&editType=add&unitId=${unitId}";
}

//双击
function grid_dblclick() {
	var uuid = _grid.chooseValue("UUID");
	if(uuid == ""){
		return ;
	}else {	
		var url = "${ctx}/notice.do?method=view&uuid=" + uuid;
		matech.openTab("notice","公告通知详细",url,false,parent);
		//var url = "${pageContext.request.contextPath}/law.do?method=view&objectId=" + objectId;
		//matech.openTab("law","法律法规详细",url,false,parent);
	}
}

//修改
function edit() {
	var ispublish = _grid.chooseValue("ISPUBLISH");
	if (ispublish == "1"){
		alert("该公告已发布，需撤回后才能进行修改！");
	} else {
		var uuid = _grid.chooseValue("UUID");

	   	if(uuid==""){
			alert("请选择要修改的对象！");
			return;
	   	}

	   	window.location = "${ctx}/notice.do?method=edit&editType=update&uuid="+uuid+"&unitId=${unitId}";
	}
}

//删除
function remove() {
	var ispublish = _grid.chooseValue("ISPUBLISH");
	if (ispublish == "1"){
		alert("该公告已发布，需撤回后才能进行修改！");
	} else {
		var uuid = _grid.chooseValue("UUID");
		if(uuid=="") {
			alert("请选择需要删除的对象！");
		} else {
			if(!confirm("确定要删除该对象？")) {
				return;
			}else{
				matech.ajaxSumit("${ctx}/notice.do?method=delete","unitId=${unitId}&uuid="+uuid,true,function(){
						_grid.goSearch();
				});
			}
		}
	}
}

function publish() {
	var uuid = _grid.chooseValue("UUID");
	if (uuid == "") {
		alert("请选择需要发布的对象！");
	} else {
		if(!confirm("确定要发布该对象？")) {
			return;
		}else{
			matech.ajaxSumit("${ctx}/notice.do?method=publish","unitId=${unitId}&uuid="+uuid+"&publish=1",true,function(){
					_grid.goSearch();
			});
		}
	}
}

function revoke() {
	var uuid = _grid.chooseValue("UUID");
	if (uuid == "") {
		alert("请选择需要撤回的对象！");
	} else {
		if(!confirm("确定要撤回该对象？")) {
			return;
		}else{
			matech.ajaxSumit("${ctx}/notice.do?method=publish","unitId=${unitId}&uuid="+uuid+"&publish=0",true,function(){
					_grid.goSearch();
			});
		}	
	}
}

</script>
</html>
