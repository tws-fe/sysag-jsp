<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>待办审批</title>
<script type="text/javascript">

var _grid1;
var _toolbar1;
var _grid2;
var _toolbar2;
var _grid3;
var _toolbar3;
var _grid4;
var _toolbar4;

var mytab;

Ext.onReady(function(){
	
	_toolbar1 = new Ext.Toolbar({
		height:30,
		width:Ext.getBody().getWidth(),
		region:'north',
   		height:30,
           items:[
             { 
               text:'同意',
               icon:contextPath + btn_img_url + 'start.png' ,
               handler:function(){
            	   dealApply(2);
   			   }
         	},'-',{ 
                text:'不同意',
                icon:contextPath + btn_img_url + 'start.png' ,
                handler:function(){
             	   dealApply(3);
    			}
          	},'-',{ 
                text:'查询',
                icon:contextPath + btn_img_url + 'query.png' ,
                handler:function(){
                	_grid1.customQryWinFun();
    			}
          	},'-',{ 
           	 	text:'关闭',
            	icon:contextPath + btn_img_url + 'close.png',
            	handler:function(){
            		closeTab(parent.tab);
				}
			}
			
		]
	});
    
	 _grid1= new Ext.matech.grid.GridPanel({
			id:"gridId_auditList",
			title:'待审批',
			autoid:"js:process.AuditInfoGridJson",
			param:{formType:"audit"},		
			currentPage:1,
			singleSelect:true,
			tbar:_toolbar1,
			autoExpandColumn:'PROCESSDESC',
			columns:[
					{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
			        {id:"PNAME",header:"流程名称",dataIndex:"PNAME",width:200,sortable:true,align:"left"},
			        {id:"PROCESSDESC",header:"流程信息",dataIndex:"PROCESSDESC",width:400,sortable:true,align:"left"},
			        {id:"APPLYUSERNAME",header:"申请人",dataIndex:"APPLYUSERNAME",width:100,sortable:true,align:"left"},
			        {id:"APPLYTIME",header:"申请时间",dataIndex:"APPLYTIME",width:150,sortable:true,align:"left"}
						],
			fields:["UUID","SUSPID","CASEID","NODEID","NODENAME","FOREIGNID","PNAME","PROCESSDESC","APPLYTIME","APPLYUSERNAME",
			        "DEALTIME","DEALUSERNAME","DEALVALUE","STATUS","STATUSNAME","DEALUSERPHONE","SMSSENDTIME","SMSSENSTATUSNAME","SMSDEALVALUE"],
			region: 'center',
			ondbclick:grid1_dbclick
		});	
	
	_toolbar2 = new Ext.Toolbar({
		height:30,
		width:Ext.getBody().getWidth(),
		region:'north',
   		height:30,
           items:[
               {   id:'btn2-1',
                   text:'同意',
                   icon:contextPath + btn_img_url + 'start.png' ,
                   handler:function(){
                	   reApply(2);
       				}
             },'-',{ 
                text:'查询',
                icon:contextPath + btn_img_url + 'query.png' ,
                handler:function(){
                	_grid2.customQryWinFun();
    			}
          	},'-',{ 
           	 	text:'关闭',
            	icon:contextPath + btn_img_url + 'close.png',
            	handler:function(){
            		closeTab(parent.tab);
				}
			}
			
		]
	});
	
	 _grid2= new Ext.matech.grid.GridPanel({
			id:"gridId_auditedList",
			title:'已审批',
			autoid:"js:process.AuditInfoGridJson",
			param:{formType:"audited"},		
			currentPage:1,
			singleSelect:true,
			tbar:_toolbar2,
			autoExpandColumn:'PROCESSDESC',
			columns:[
						{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
				        {id:"PNAME",header:"流程名称",dataIndex:"PNAME",width:200,sortable:true,align:"left"},
				        {id:"PROCESSDESC",header:"流程信息",dataIndex:"PROCESSDESC",width:400,sortable:true,align:"left"},
				        {id:"APPLYUSERNAME",header:"申请人",dataIndex:"APPLYUSERNAME",width:100,sortable:true,align:"left"},
				        {id:"APPLYTIME",header:"申请时间",dataIndex:"APPLYTIME",width:150,sortable:true,align:"left"},
				        {id:"DEALVALUE",header:"处理意见",dataIndex:"DEALVALUE",width:100,sortable:true,align:"left"},
				        {id:"DEALTIME",header:"处理时间",dataIndex:"DEALTIME",width:150,sortable:true,align:"left"},
				        {id:"DEALUSERNAME",header:"处理人",dataIndex:"DEALUSERNAME",width:150,sortable:true,align:"left"}
							],
				fields:["UUID","SUSPID","CASEID","NODEID","NODENAME","FOREIGNID","PNAME","PROCESSDESC","APPLYTIME","APPLYUSERNAME",
				        "DEALTIME","DEALUSERNAME","DEALVALUE","STATUS","STATUSNAME","DEALUSERPHONE","SMSSENDTIME","SMSSENSTATUSNAME","SMSDEALVALUE"],
			region: 'center',
			ondbclick:grid2_dbclick,
			onclick:grid2_click
		});	
	 
	 
	_toolbar3 = new Ext.Toolbar({
		height:30,
		width:Ext.getBody().getWidth(),
		region:'north',
   		height:30,
           items:[
             { 
                text:'查询',
                icon:contextPath + btn_img_url + 'query.png' ,
                handler:function(){
                	_grid3.customQryWinFun();
    			}
          	},'-',{ 
           	 	text:'关闭',
            	icon:contextPath + btn_img_url + 'close.png',
            	handler:function(){
            		closeTab(parent.tab);
				}
			}
			
		]
	});
    
	 _grid3= new Ext.matech.grid.GridPanel({
			id:"gridId_auditApplyList",
			title:'我的申请',
			autoid:"js:process.AuditInfoGridJson",
			param:{formType:"auditApply"},	
			currentPage:1,
			singleSelect:true,
			tbar:_toolbar3,
			autoExpandColumn:'PROCESSDESC',
			columns:[
					{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
			        {id:"PNAME",header:"流程名称",dataIndex:"PNAME",width:200,sortable:true,align:"left"},
			        {id:"PROCESSDESC",header:"流程信息",dataIndex:"PROCESSDESC",width:400,sortable:true,align:"left"},
			        {id:"APPLYUSERNAME",header:"申请人",dataIndex:"APPLYUSERNAME",width:100,sortable:true,align:"left"},
			        {id:"APPLYTIME",header:"申请时间",dataIndex:"APPLYTIME",width:150,sortable:true,align:"left"},
			        {id:"DEALVALUE",header:"处理意见",dataIndex:"DEALVALUE",width:100,sortable:true,align:"left"},
			        {id:"DEALTIME",header:"处理时间",dataIndex:"DEALTIME",width:150,sortable:true,align:"left"},
			        {id:"DEALUSERNAME",header:"处理人",dataIndex:"DEALUSERNAME",width:150,sortable:true,align:"left"}
						],
			fields:["UUID","SUSPID","CASEID","NODEID","NODENAME","FOREIGNID","PNAME","PROCESSDESC","APPLYTIME","APPLYUSERNAME",
			        "DEALTIME","DEALUSERNAME","DEALVALUE","STATUSNAME","DEALUSERPHONE","SMSSENDTIME","SMSSENSTATUSNAME","SMSDEALVALUE"],
			region: 'center',
			ondbclick:grid3_dbclick
		});		
	
	
	 _grid4= new Ext.matech.grid.GridPanel({
			id:"gridId_auditMsgList",
			title:'我的提醒',
			autoid:"js:process.AuditInfoGridJson",
			param:{formType:"auditMsg"},		
			currentPage:1,
			singleSelect:true,
			autoExpandColumn:'CONTENT',
			columns:[
					{id:"UUID",header:"UUID",dataIndex:"UUID",width:150,sortable:true,align:"left",hidden:true},
			        {id:"CREATEMODAL",header:"提醒类型",dataIndex:"CREATEMODAL",width:120,sortable:true,align:"left"},
			        {id:"PHONES",header:"手机号码",dataIndex:"PHONES",width:120,sortable:true,align:"left"},
			        {id:"CONTENT",header:"信息内容",dataIndex:"CONTENT",width:400,sortable:true,align:"left"},
			        {id:"CREATEDATETIME",header:"创建时间",dataIndex:"CREATEDATETIME",width:150,sortable:true,align:"left"},
			        {id:"SENDDATETIME",header:"短信发送时间",dataIndex:"SENDDATETIME",width:150,sortable:true,align:"left"}
						],
			fields:["UUID","CREATEMODAL","PHONES","CONTENT","CREATEDATETIME","SENDDATETIME"],
			region: 'center',
			ondbclick:grid4_dbclick
		});	
	 
	
	 mytab = new Ext.TabPanel({  
	        id: "tab",
	        region: 'center',
	        activeTab:0, 
	        layoutOnTabChange:true, 
	        forceLayout : true,
	        deferredRender:false,
	        height: document.body.clientHeight,
	        width : document.body.clientWidth,
	        items:[_grid1,_grid2,_grid3,_grid4]
	     
	    });
	    mytab.on("tabchange",function(tabpanel,tab) {
			goSearch();
	    }) ;
	
		new Ext.Viewport({
			layout:'border',
			items:[mytab]
		});	
});


function goSearch() {
	var tab = mytab.getActiveTab();
	if(tab.id == "gridId_auditList") {
		_grid1.goSearch();
	}else if(tab.id == "gridId_auditedList") {
		_grid2.goSearch();
	}else if(tab.id == "gridId_auditApplyList") {
		_grid3.goSearch();
	}else if(tab.id == "gridId_auditMsgList") {
		_grid4.goSearch();
	}
}

//双击
function grid1_dbclick(){
	grid_dblclick(_grid1);
}
function grid2_dbclick(){
	grid_dblclick(_grid2);
}
function grid3_dbclick(){
	grid_dblclick(_grid3);
}
function grid4_dbclick(){
	
}

function grid_dblclick(_grid) {
    var nodeid=_grid.chooseValue("NODEID");
    var nodename=_grid.chooseValue("NODENAME");
    var uuid=_grid.chooseValue("SUSPID");
    
    if(nodeid=="LQMISS"){
    	nodeid="AQCZ";
    }
    
	var url = contextPath + "/jingan.do?method=caseInfoMain&view=true&formType="+nodeid+"&editType=update&uuid=" + uuid;
	if(nodeid=="DLBAQ"){
		url = contextPath + "/jingan.do?method=casePersonOutEdit&view=true&formType="+nodeid+"&editType=update&uuid=" + uuid;
	}else if(nodeid=="DHBAQ"){
		url = contextPath + "/jingan.do?method=casePersonOutBackEdit&view=true&formType="+nodeid+"&editType=update&uuid=" + uuid;
	}else if(nodeid=="TSKMSQ"){
		uuid=_grid.chooseValue("FOREIGNID"); 
		url = contextPath + "/jingan.do?method=openDoorApplyEdit&view=true&formType="+nodeid+"&editType=update&uuid=" + uuid;
	}
	
	matech.openTab(nodeid, nodename,url,true,parent);
	
}	

//审批处理
function dealApply(value){
	
	var id = _grid1.chooseValue("UUID");
	if(id == ""){
		alert('请从待办 任务标签页中选择要审核记录！');
		return;
	}

	var advise="";
	if(value=="2"){
		advise="您确定要批准该申请吗？";
	}else{
		advise="您确定要否决该申请吗？";
	}
	
	
	if (confirm(advise)) {
		var url = contextPath + "/flowWork.do?method=caseAuditDeal&r=" + Math.random();
		var request = "&editType=audit&dealType="+value+"&uuid=" + id;
		var result = ajaxLoadPageSynch(url, request);
		if(result.indexOf("ok")>-1){
			alert("该申请已完成审批，请到【已经办理】确认！");
			_grid1.goSearch();
		}			
	}
	
}

//重新审批
function reApply(value){
	var id = _grid2.chooseValue("UUID");
	if(id == ""){
		alert('请从已审批标签页中选择需要重新审核记录！');
		return;
	}

	var advise="";
	if(value=="2"){
		advise="您确定要批准该申请吗？";
	}else{
		advise="您确定要否决该申请吗？";
	}
	
	if (confirm(advise)) {
		var url = contextPath + "/flowWork.do?method=caseAuditDeal&r=" + Math.random();
		var request = "&editType=audit&dealType="+value+"&uuid=" + id;
		var result = ajaxLoadPageSynch(url, request);
		if(result.indexOf("ok")>-1){
			alert("该申请已完成审批，请到【已经办理】确认！");
			_grid2.goSearch();
		}			
	}	
}

function grid2_click(){
	var status = _grid2.chooseValue("STATUS");
	if(status =="2"){
		matech.setExtBtnShow(['btn2-1'],false);
	}else{
		matech.setExtBtnShow(['btn2-1'],true);
	}
}
</script>
</head>
<body>
</body>
</html>