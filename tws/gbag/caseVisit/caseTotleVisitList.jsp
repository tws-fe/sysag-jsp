<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>案件来访统计情况表</title>

<script type="text/javascript">

var _grid;
var _toolbar;

Ext.onReady(function(){
		_toolbar = new Ext.Toolbar({
			height:30,
			width:Ext.getBody().getWidth(),
			region:'north',
			items:[    	
					{
						text:'查询',
						cls:'x-btn-text-icon',
						icon:contextPath + btn_img_url + 'query.png',
						handler:function () {	
							_grid.customQryWinFun();
						}
					},'-',	
					{
						text:'案件关注',
						cls:'x-btn-text-icon', 
						icon:contextPath + btn_img_url + 'edit.png',
						handler:function () {	
							dealCase("2");
						}
					},'-',				
			  		{
						text:'关闭',
						cls:'x-btn-text-icon',
						icon:contextPath + btn_img_url + 'close.png',
						handler:function () {	
							closeTab(parent.tab);
						}
					}]
			});
	 		
	
	 _grid= new Ext.matech.grid.GridPanel({
			id:"gridId_caseTotleVisitList",
			autoid:"js:gbag.casevisit.CaseTotleVisitListGridJson",
			param:{flag:"${flag}"},		
			currentPage:1,
			singleSelect:true,
			columns:[
					{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
			        {id:"ISCONCERN",header:"是否关注",dataIndex:"ISCONCERN",width:220,sortable:true,align:"left"},
			        {id:"VISITNUMS",header:"来访次数",dataIndex:"VISITNUMS",width:100,sortable:true,align:"left"},
			        {id:"CASENUMBER",header:"案件编号",dataIndex:"CASENUMBER",width:220,sortable:true,align:"left"},
			        {id:"CASETYPE",header:"案件类型",dataIndex:"CASETYPE",width:100,sortable:true,align:"left"},
			        {id:"CASENATURENAME",header:"案件性质",dataIndex:"CASENATURENAME",width:180,sortable:true,align:"left"},
			        {id:"CASENAME",header:"案件名称",dataIndex:"CASENAME",width:180,sortable:true,align:"left"},
					{id:"STATENAMES",header:"案件状态",dataIndex:"STATENAMES",width:100,sortable:true,align:"left"},
					{id:"_USERNAME_AUDITDIRECTOR",header:"主办民警",dataIndex:"_USERNAME_AUDITDIRECTOR",width:80,sortable:true,align:"left"},
					{id:"BJSJ",header:"报警时间",dataIndex:"BJSJ",width:300,sortable:true,align:"left"},
					{id:"CASEDETAILS",header:"简要案情",dataIndex:"CASEDETAILS",width:220,sortable:true,align:"left"}
						],
			fields:["UUID","ISCONCERN","VISITNUMS","CASENUMBER","CASETYPE","CASENATURENAME","CASENAME","STATENAMES","_USERNAME_AUDITDIRECTOR","BJSJ",
			        "CASEDETAILS","ORGANID_"],
			region: 'center'
		});
		 	
		new Ext.Viewport({
			layout:'border',
			items:[
				_toolbar,
				_grid
			]
		});	
		
		
});

//案件关注处理
function dealCase(dealType){
	    var value =_grid.chooseValue("UUID");
		if (value == "") {
			alert('请选择案件!');
			return;
		} else{
			if(dealType=="2"){
				if (confirm("您确认要关注当前案件吗？")) {
					var url = contextPath + "/case.do?method=caseDeal&r=" + Math.random();
					var request = "&editType=deal&dealType="+dealType+"&uuid=" + value;
					var result = ajaxLoadPageSynch(url, request);
					if(result.indexOf("ok")>-1){
						alert("该案件已关注，请到【我的关注】确认！");
						window.location.reload();
					}			
				}
			}
		}
}


</script>
</head>
<body>
</body>
<script language="javascript">
$(".autoheight").css("height",document.body.clientHeight-85+"px");
</script>
</html>