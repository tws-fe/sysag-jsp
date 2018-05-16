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
						window.location="${ctx}/reportConfig.do?method=add&parentid=" + parentid+"&backId="+parentid;
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
					text:'运行',
					icon:'${ctx}/tws/css/img/play.png' ,
					handler:function(){
						runit();
					}
				}
			  /* ,'-',{ 
				    id:'btn-05',
					text:'分类管理',
					icon:'${ctx}/tws/css/img/setting.png' ,
					handler:function(){
						getDealWin();
						//window.location="${ctx}/reportConfig.do?method=reportTypeLists";
					}
				} */
			]
		});		

		
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_reportList",
		dataUrl:"${ctx}/reportConfig.do?method=getList",
		param:{parentid:'${param.parentid}',birtname:'${param.birtname}'},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"BIRTNAME",freequery:"BIRTNAME",header:"英文别名",dataIndex:"BIRTNAME",width:200,sortable:true,align:"left"},
					{id:"TITLE",freequery:"TITLE",header:"报表标题",dataIndex:"TITLE",width:200,sortable:true,align:"left"},
					{id:"TYPE",freequery:"TYPE",header:"报表类型",dataIndex:"TYPE",width:140,sortable:true,align:"left"},
					{id:"CREATETIME",freequery:"CREATETIME",header:"创建时间",dataIndex:"CREATETIME",width:140,sortable:true,align:"left"},
					/* {id:"TABLENAME",freequery:"TABLENAME",header:"报表模块",dataIndex:"TABLENAME",width:200,sortable:true,align:"left"}, 
					{id:"TABLEID",freequery:"TABLEID",header:"表名",dataIndex:"TABLEID",width:140,sortable:true,align:"left"},
					{id:"TABLENAME",freequery:"TABLENAME",header:"表中文名",dataIndex:"TABLENAME",width:200,sortable:true,align:"left"}, 
					{id:"PARMFORMID",freequery:"PARMFORMID",header:"报表参数",dataIndex:"PARMFORMID",width:200,sortable:true,align:"left"}, */
					{id:"FIELDID",freequery:"FIELDID",header:"显示字段",dataIndex:"FIELDID",width:140,sortable:true,align:"left"},
					{id:"FIELDNAME",freequery:"FIELDNAME",header:"显示字段中文名",dataIndex:"FIELDNAME",width:140,sortable:true,align:"left"},
					{id:"SUMTERM",freequery:"SUMTERM",header:"汇总条件",dataIndex:"SUMTERM",width:200,sortable:true,align:"left"},
					{id:"ICONTERMS",freequery:"ICONTERMS",header:"图表类型与条件",dataIndex:"ICONTERMS",width:140,sortable:true,align:"left"},
					{id:"CREATESQL",freequery:"CREATESQL",header:"生成的SQL",dataIndex:"CREATESQL",width:200,sortable:true,align:"left"}
					
				],	
				
		fields:["UUID","BIRTNAME","TITLE","TYPE","TEMPLET","TABLEID","TABLENAME","CREATETIME","FIELDID","FIELDNAME","SUMTERM","ICONTERMS","CREATESQL","PARMFORMID"],
		ondbclick:grid_dblclick,
		onclick:checkStatu,
		//autoExpandColumn:'CREATESQL',
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
	var objectId = _grid.chooseValue("UUID");
	
	if(objectId == ""){
	      alert("请选择要修改的记录！");
	   return;
	 } else {
	   window.location = "${pageContext.request.contextPath}/reportConfig.do?method=edit&objectId="
			+ objectId+"&parentid=" + parentid+"&backId="+parentid;
	}
}

//双击
function grid_dblclick() {
	var objectId = _grid.chooseValue("UUID");
	
	if(objectId == ""){
		return ;
	}else {	
		var url = "${pageContext.request.contextPath}/reportConfig.do?method=view&objectId=" + objectId;
		
		matech.openTab("report","报表详细",url,false,parent);
		
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
	var chooseValue =_grid.chooseValue("UUID");
	if(chooseValue=="") {
		alert("请选择需要删除的法规");
	} else {	
		if(!confirm("确定要删除该报表配置信息？")) {
			return;
		}else{		
			matech.ajaxSumit("${ctx}/reportConfig.do?method=remove","parentid='"+parentid+"'&objectId="+chooseValue,false,function(){
				_grid.goSearch();
			});
		}
	}	
}

//运行报表
function runit(){

 
var value =_grid.chooseValue("UUID");
var birtname =_grid.chooseValue("BIRTNAME");


if(value == ''){
	
	value = _grid.chooseValue("UUID");
			
	if(value == "") {
		alert('请选择要运行的报表!');
		return;
	
	} else if(value.indexOf(",") > -1) {
		alert('请选择一条需要运行的报表!');
		return;
	}
}

//echart.do?method=generic_echart&birtname=jingan-case-type&timetoken=1&startdate=$m0.1&enddate=$m0.31&menuid=10001562
//echart.do?method=generic_echart&birtname=jingan-urine-test-by-month&timetoken=1&startdate=$m-12.1&enddate=$m0.31&menuid=10001565
var url;

if(birtname=='jingan-urine-test-by-month'){
	url = "echart.do?method=generic_echart&timetoken=1&startdate=$m-12.1&enddate=$m0.31&reportid="+value ;
}else{
	url = "echart.do?method=generic_echart&timetoken=1&startdate=$m0.1&enddate=$m0.31&reportid="+value ;
}

   openTab(value,"运行报表",url,parent);

}


</script>

</html>