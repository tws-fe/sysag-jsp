<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript">

var _grid;
var _toolbar;
var parentid = "${parentid}";
var view="${view}";

//EXT初始化
function ext_init(){
	if(view=="true"){
		_toolbar=new Ext.Toolbar({
			height:30,
			width:Ext.getBody().getWidth(),
			region:'north',
			items:[{ 
				    id:'btn-04',
					text:'全文搜索',
					icon:'${ctx}/tws/css/img/query.png' ,
					handler:function(){
						var url = "${pageContext.request.contextPath}/tws/repository/law/lawSearch.jsp";
						matech.openTab(new UUID().createUUID(),"法律法规检索",url,false,parent);
					}
				}
			]
		});		
	}else{
		_toolbar=new Ext.Toolbar({
			height:30,
			width:Ext.getBody().getWidth(),
			region:'north',
			items:[
				{ 
				id:'btn-01',
				text:'新增',
				icon:'${ctx}/tws/css/img/add.gif',
				handler:function(){
					if(parentid == "" ){
						alert("请先选择分类！");
						return;
					} else {
						window.location="${ctx}/law.do?method=add&parentid=" + parentid+"&backId="+parentid;
					}
				 }
			},'-',{ 
				id:'btn-02',
				text:'修改',
				icon:'${ctx}/tws/css/img/edit.gif',
				handler:function(){
					edit();
				}
			},'-',{ 
				id:'btn-03',
				text:'删除',
				icon:'${ctx}/tws/css/img/delete.gif',
				handler:function(){
	           		remove();
	            }
			  },'-',{ 
				    id:'btn-04',
					text:'全文搜索',
					icon:'${ctx}/tws/css/img/query.png' ,
					handler:function(){
						var url = "${pageContext.request.contextPath}/tws/repository/law/lawSearch.jsp";
						matech.openTab(new UUID().createUUID(),"法律法规检索",url,false,parent);
					}
				}
			]
		});		
	}


	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_lawList",
		dataUrl:"${ctx}/law.do?method=getList",
		param:{parentid:'${param.parentid}'},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"LAWNAME",freequery:"LAWNAME",header:"法规名称",dataIndex:"LAWNAME",width:500,sortable:true,align:"left"},
					{id:"DEPARTMENT",freequery:"DEPARTMENT",header:"发文单位",dataIndex:"DEPARTMENT",width:200,sortable:true,align:"left"},
					{id:"LAWNO",freequery:"LAWNO",header:"发文编号",dataIndex:"LAWNO",width:140,sortable:true,align:"left"},
					{id:"VERSION",freequery:"VERSION",header:"版本号",dataIndex:"VERSION",width:140,sortable:true,align:"left"},
					{id:"USER_NAME",freequery:"USER_NAME",header:"创建人",dataIndex:"USER_NAME",width:140,sortable:true,align:"left"}
				],
		fields:["OBJECT_ID","LAWNAME","DEPARTMENT","LAWNO","USER_NAME","VERSION"],
		ondbclick:grid_dblclick,
		onclick:checkStatu,
		autoExpandColumn:'LAWNAME',
		region: 'center'
	});	
	
	new Ext.Viewport({
		layout:'border',
		items:[_toolbar,_grid]
	});

}

Ext.onReady(ext_init);
	
</script>
</head>
<body>
	<c:set var="parentid" value="${parentid }" scope="request"/>
</body>
<script type="text/javascript">

function edit(){
	var objectId = _grid.chooseValue("OBJECT_ID");
	if(objectId == ""){
	      alert("请选择要修改的记录！");
	   return;
	 } else {
	   window.location = "${pageContext.request.contextPath}/law.do?method=edit&objectId="
			+ objectId+"&parentid=" + parentid+"&backId="+parentid;
	}
}

//双击
function grid_dblclick() {
	var objectId = _grid.chooseValue("OBJECT_ID");
	
	if(objectId == ""){
		return ;
	}else {	
		var url = "${pageContext.request.contextPath}/law.do?method=view&objectId=" + objectId;
		
		matech.openTab("law","法律法规详细",url,false,parent);
		
	}
}
 
function checkStatu(){
	/*
	var name=_grid.chooseValue("USER_NAME");
	if(name=="${userSession.userName}"){
		matech.setExtBtnShow(['btn-02','btn-03'],true);
	}else{
		matech.setExtBtnShow(['btn-02','btn-03'],false);
	}*/
	
}


//删除
function remove() {
	var chooseValue =_grid.chooseValue("OBJECT_ID");
	if(chooseValue=="") {
		alert("请选择需要删除的法规");
	} else {	
		if(!confirm("确定要删除该法规？")) {
			return;
		}else{		
			matech.ajaxSumit("${ctx}/law.do?method=remove","parentid='"+parentid+"'&objectId="+chooseValue,false,function(){
				_grid.goSearch();
			});
		}
	}	
}


</script>

</html>