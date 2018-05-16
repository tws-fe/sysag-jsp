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
			},'-',{ 
				id:'btn-4',
				text:'排序',
				icon:'${ctx}/tws/css/img/transfer1.png',
				handler:function(){
			    	window.location = "${ctx}/sys/unit/sortflag.jsp?departId=${departId}";
				}
			},'-',{ 
				id:'btn-5',
				text:'初始化',
				icon:'${ctx}/tws/css/img/edit.gif',
				handler:function(){
					initUnit();
				}
			}
		]
	});
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:sys.unit.UnitListGridJson",
		param:{departId:"${departId}",parentId:"${parentId}"},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"DEPARTID",header:"单位ID",dataIndex:"DEPARTID",width:120,sortable:true,align:"left"},
		        {id:"DEPARTNAME",header:"单位名称",dataIndex:"DEPARTNAME",width:330,sortable:true,align:"left"},
 				{id:"STANDBYNAME",header:"单位简称",dataIndex:"STANDBYNAME",width:150,sortable:true,align:"left"},
 				{id:"DEPARTENNAME",header:"单位缩写",dataIndex:"DEPARTENNAME",width:80,sortable:true,align:"left"},
 				{id:"PARENTDEPARTID",header:"上级单位",dataIndex:"PARENTDEPARTID",width:120,sortable:true,align:"left"},
 				{id:"LINKMAN",header:"联系人",dataIndex:"LINKMAN",width:120,sortable:true,align:"left"},
 				{id:"PHONE",header:"联系电话",dataIndex:"PHONE",width:120,sortable:true,align:"left"},
 				{id:"ADDRESS",header:"单位地址",dataIndex:"ADDRESS",width:200,sortable:true,align:"left"},
 				{id:"CTLDEPARTID",header:"数据权限",dataIndex:"CTLDEPARTID",width:120,sortable:true,align:"left"}
 				],
 		fields:["DEPARTID","DEPARTNAME","STANDBYNAME","PARENTDEPARTID","REMARK","ADDRESS","LINKMAN","PHONE","CTLDEPARTID","DEPARTENNAME"],
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

<script type="text/javascript">

	//新增下级
	function add() {
	 
	    var departId="${departId}";
	    if(departId==""){
	    	alert("请先选择左边的单位");
	    	return false;
	    }
		window.location = "${ctx}/unit.do?method=edit&editType=add&parentId=${parentId}";
	}
 
	//修改
	function edit() {
		
	 	var departId = _grid.chooseValue("DEPARTID");

	   	if(departId==""){
			alert("请选择要修改的对象！");
			return;
	   	}

	   	window.location = "${ctx}/unit.do?method=edit&editType=update&departId="+departId+"&parentId=${parentId}";
		
	}
 
	//删除
	function remove() {
		var departId = _grid.chooseValue("DEPARTID");
		if(departId=="") {
			alert("请选择需要删除的对象！");
		} else {
			if(matech.checkIsExist("js:unit.UnitHasChildren",departId,true)){
				alert("当前单位存在子单位，请清空数据后进行删除！");
				return false;
			}else if(matech.checkIsExist("js:unit.UnitHasUser",departId,true)) {
				alert("当前单位存在用户，请清空数据后进行删除！");
				return false;
			}else{
				if(!confirm("确定要删除该对象？")) {
					return;
				}else{
					matech.ajaxSumit("${ctx}/unit.do?method=delete","parentId=${parentId}&departId="+departId,true,function(){
							_grid.goSearch();
							parent.refreshTree();
					});
				}
			}
		}
	}
	
	function initUnit(){
		matech.ajaxSumit("${ctx}/unit.do?method=initParam","",true,function(){
			_grid.goSearch();
		});				
	}
</script>
</html>