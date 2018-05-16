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
						text:'来访提醒',
						cls:'x-btn-text-icon',
						icon:contextPath + btn_img_url + 'close.png',
						handler:function () {	
							reminders();
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
			autoid:"js:gbag.casevisit.UnHandleVisitList",
			param:{flag:"${flag}"},		
			currentPage:1,
			singleSelect:true,
			columns:[
					{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
					{id:"AUDITDIRECTORS",header:"主办民警",dataIndex:"AUDITDIRECTORS",width:150,sortable:true,align:"left",hidden:true},
			        {id:"DIFFDATE",header:"处理延时",dataIndex:"DIFFDATE",width:80,sortable:true,align:"left"},
			        {id:"CASENAMES",header:"案件名称",dataIndex:"CASENAMES",width:300,sortable:true,align:"left"},
			        {id:"NAME",header:"来访人",dataIndex:"NAME",width:100,sortable:true,align:"left"},
			        {id:"IDCARDNUM",header:"来访人证件编号",dataIndex:"IDCARDNUM",width:180,sortable:true,align:"left"},
			        {id:"CASENATURENAME",header:"案件类型",dataIndex:"CASENATURENAME",width:80,sortable:true,align:"left"},
					{id:"STATENAMES",header:"案件状态",dataIndex:"STATENAMES",width:70,sortable:true,align:"left"},
					{id:"_USERNAME_AUDITDIRECTOR",header:"主办民警",dataIndex:"_USERNAME_AUDITDIRECTOR",width:80,sortable:true,align:"left"},
					{id:"BJSJ",header:"报警时间",dataIndex:"BJSJ",width:120,sortable:true,align:"left"},
					{id:"CASEDETAILS",header:"简要案情",dataIndex:"CASEDETAILS",width:400,sortable:true,align:"left"}
						],
			fields:["UUID","AUDITDIRECTORS","DIFFDATE","CASENAMES","NAME","IDCARDNUM","CASENATURENAME","STATENAMES","_USERNAME_AUDITDIRECTOR","BJSJ","CASEDETAILS"],
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

function reminders(){
	 var userid=_grid.chooseValue("AUDITDIRECTORS");
	 if(userid==""){
		 msg("快选一条记录吧");
		 return;
	 }
	 var username=_grid.chooseValue("_USERNAME_AUDITDIRECTOR");
	$.ajax({
  			type :"Post",
  			async:true,
  			url : "${pageContext.request.contextPath}/caseVist.do?method=rigthAwayReminders",
  			data:{"userid":userid},
  			success : function(datas) {
  				resul = unescape(datas);
  				resul = Ext.util.JSON.decode(resul);
  				if(resul[0].result==1){
  					msg("您已成功提醒主办民警"+username+",已通过短信及案管系统通知对方");
  				}
  				else if(resul[0].result==0){
  					mag("出现异常，五分钟之后再试一下吧~");
  				}else{
				msg("参数出错，催办失败");
			}
  				_grid.goSearch();
  			}
  		});

	 
}
function msg(value){
	Ext.MessageBox.show({
		msg: "<span style=\"font-size:18px;color: black\">"+value+"</span>",
		buttons:{"cancel":"关闭"},  
		fn:function(e){
			
		},
        width: 400,  
        height:300,  
        modal:false,  
        icon:Ext.Msg.INFO,
        closable: true
	})
}


</script>
</head>
<body>
</body>

</html>