<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript">

var _grid;
var _toolbar;

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
			}
		]
	});
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:sys.dic.DicListGridJson",
		param:{ctype:"${ctype}"},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"NAME",header:"名字",dataIndex:"NAME",width:120,sortable:true,align:"left"},
	        	{id:"VALUE",header:"值",dataIndex:"VALUE",width:330,sortable:true,align:"left"},
				{id:"CTYPE",header:"类型",dataIndex:"CTYPE",width:120,sortable:true,align:"left"},
				{id:"PROPERTY",header:"排序",dataIndex:"PROPERTY",width:120,sortable:true,align:"left"}
				],
		fields:["AUTOID","NAME","VALUE","CTYPE","PROPERTY"],
		ondbclick:edit,
		region: 'center'
	});	
	
	new Ext.Viewport({
		layout:'border',
		items:[
			_toolbar,
			_grid
		]
	});
	
}

Ext.onReady(ext_init);

</script>
</head>

<body>

</body>

<Script>
//新增下级
function add() {
	window.location = "${ctx}/dicNew.do?method=edit&editType=add&ctype="+encodeURI(encodeURI("${ctype}"));
}

//修改
function edit() {
	var autoId = _grid.chooseValue("AUTOID");
	var ctype = _grid.chooseValue("CTYPE");
	
   	if(autoId==""){
		alert("请选择要修改的对象！");
		return;
   	}

   	window.location = "${ctx}/dicNew.do?method=edit&editType=update&autoId="+autoId+"&ctype="+encodeURI(encodeURI(ctype));
}

//删除
function remove() {
	var autoId = _grid.chooseValue("AUTOID");
	if(autoId=="") {
		alert("请选择需要删除的对象！");
	} else {
		if(!confirm("确定要删除该对象？")) {
			return;
		}else{
			matech.ajaxSumit("${ctx}/dicNew.do?method=delete","&autoId="+autoId,true,function(){
					_grid.goSearch();
			});
		}
	}
}

</script>
</html>
