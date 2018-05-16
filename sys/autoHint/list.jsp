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
		id:"gridId_unitList",//控件id
		autoid:"js:sys.autoHint.AutoHintListGridJson",
		currentPage:1,
		singleSelect:true,
		columns:[{id:"UUID",header:"ID",dataIndex:"UUID",width:120,sortable:true,align:"left",hidden:true},
		         {id:"ID",header:"下拉id",dataIndex:"ID",width:120,sortable:true,align:"left"},
		        {id:"STRINITSQL",header:"初始化sql",dataIndex:"STRINITSQL",width:350,sortable:true,align:"left"},
 				{id:"STRSQL",header:"改变sql",dataIndex:"STRSQL",width:350,sortable:true,align:"left"},
 				{id:"STRCHECKSQL",header:"校验sql",dataIndex:"STRCHECKSQL",width:350,sortable:true,align:"left"},
 				{id:"MEMO",header:"备注信息",dataIndex:"MEMO",width:220,sortable:true,align:"left"}
 				],
 		fields:["UUID","ID","STRINITSQL","STRSQL","STRCHECKSQL","MEMO","ORGANID_"],
 		
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


function add(){
	window.location="${ctx}/autoHint.do?method=add&editType=add";
}

//编辑
function edit() {
	var value =_grid.chooseValue("UUID");
	if (value == "") {
		alert('请选择要修改的数据!');
		return;

	}
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/autoHint.do?method=edit&editType=update&uuid=" + value;
	
	window.location.href = url;
}



//删除
function remove() {
	var value =_grid.chooseValue("UUID");
	if(value=="") {
		alert('请选择要删除的下拉配置选项!');
	} else {	
		if(!confirm("确定要删除下拉配置信息？")) {
			return;
		}else{		
			matech.ajaxSumit("${ctx}/autoHint.do?method=autoHintRemove","uuid="+value,false,function(){
				_grid.goSearch();
			});
		}
	}	
}


</script>
</head>

<body>

</body>

</html>