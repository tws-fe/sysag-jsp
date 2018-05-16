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
				text:'入 库', 
				icon:'${ctx}/tws/css/img/top.gif',
				handler:function(){
					affirmOrOther();
				}
			}
			,'-',{ 
				id:'btn-2',
				text:'登记',
				icon:'${ctx}/tws/css/img/add.gif',
				handler:function(){
					add();
				}
			},'-',
			    { 
				id:'btn-3',
				text:'修改',
				icon:'${ctx}/tws/css/img/edit.gif',
				handler:function(){
					edit();
				}
			},'-',
			    { 
				id:'btn-4',
				text:'打印二维码',
				icon:'${ctx}/tws/css/img/print.gif',
				handler:function(){
					printImg();

				}
			},'-',
			    { 
				id:'btn-5',
				text:'打印文书',
				icon:'${ctx}/tws/css/img/print.gif',
				handler:function(){
					var casenumber = _grid.chooseValue("CASENUMBER");
					var suspect = _grid.chooseValue("SUSPECT");
					var casetype = _grid.chooseValue("CASETYPE");
					if(casenumber == ""){
						alert("请选择要打印文书的物品记录");
						return;
					}
					printWord(casenumber,suspect,casetype);
				}
			} ,'-',
			    { 
				id:'btn-6',
				text:'查询',
				icon:'${ctx}/tws/css/img/query.gif',
				handler:function(){
					_grid.customQryWinFun();
				}
			},'-',
			    { 
				id:'btn-7',
				text:'关闭',
				icon:'${ctx}/tws/css/img/delete.gif',
				handler:function(){
					matech.closeTab(parent);
				}
			}
		]
	});
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:gbag.seizeRes.SeizeGridJson",
		param:{unitId:"${unitId}"},
		currentPage:1,
		singleSelect:false,
		columns:[{id:"UUID",header:"UUID",dataIndex:"UUID",width:50,sortable:true,align:"left",hidden:true},
		         {id:"SUSPECT",header:"SUSPECT",dataIndex:"SUSPECT",width:50,sortable:true,align:"left",hidden:true},
		         {id:"CASENUMBER",header:"CASENUBMER",dataIndex:"CASENUMBER",width:100,sortable:true,align:"left",hidden:true},
		        {id:"CASENAME",header:"案件名称",dataIndex:"CASENAME",width:400,sortable:true,align:"left"},
 				{id:"CASETYPE",header:"案件类型",dataIndex:"CASETYPE",width:90,sortable:true,align:"left"},
 				{id:"SUSNAME",header:"嫌疑人",dataIndex:"SUSNAME",width:260,sortable:true,align:"left"},
 				{id:"RES",header:"物品",dataIndex:"RES",width:180,sortable:true,align:"left"},
 				{id:"USERNAME",header:"扣押人",dataIndex:"USERNAME",width:100,sortable:true,align:"left"},
 				{id:"DETENTIONTIME",header:"扣押时间",dataIndex:"DETENTIONTIME",width:180,sortable:true,align:"left"},
 				{id:"WITNESS",header:"见证人",dataIndex:"WITNESS",width:100,sortable:true,align:"left"},
 				{id:"STATE",header:"状态",dataIndex:"STATE",width:100,sortable:true,align:"left"}
 				
 				],
 		fields:["UUID","SUSPECT","CASENUMBER","CASENAME","CASETYPE","SUSNAME","RES","USERNAME","DETENTIONTIME","WITNESS","STATE"],
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
<div style="display:none">
	<object classid="CLSID:57DB8C48-E4A2-4115-9A7C-177614724BFF" height="500" id="DownLoadControl" width="1000"></object>
</div>

</body>

<script type="text/javascript">
	//入库
	function affirmOrOther(){
		Ext.MessageBox.show({
			msg: "<span style=\"font-size:18px;color: black\">确定将当前物品入库</span>",
			buttons:{"ok":"确定","cancel":"关闭"},  
			fn:function(e){
				if(e=="ok"){
					var uuid = _grid.chooseValue("UUID");
					$.ajax({
			   			type :"Post",
			   			async:true,
			   			url : "${pageContext.request.contextPath}/seizeRes.do?method=goToAffirm",
			   			data:{"uuid":uuid},
			   			success : function(datas) {
			   				resul = unescape(datas);
			   				resul = Ext.util.JSON.decode(resul);
			   				if(resul[0].result==1){
			   					alert("成功");
			   				}
			   				else if(resul[0].result==0){
			   					alert("失败");
			   				}
			   				else if(resul[0].result==-1){
								alert("异常");
							}else{
								alert("未知");
							}
			   				_grid.goSearch();
			   			}
			   		});
				}
			},
            width: 1000,  
            height:1000,  
            modal:false,  
            icon:Ext.Msg.INFO,
            closable: true
		})
	}

	//新增
	function add() {
	    
		window.location = "${pageContext.request.contextPath}/seizeRes.do?method=goToAdd";
	}
 
	//修改
	function edit() {
		
	 	var casenumber = _grid.chooseValue("CASENUMBER");
	 	var suspect = _grid.chooseValue("SUSPECT");

	   	if(suspect==""||casenumber==""){
			alert("请选择要修改的对象！");
			return;
	   	}

	   	window.location = "${pageContext.request.contextPath}/seizeRes.do?method=goToAdd&casenumber="+casenumber+"&suspect="+suspect;
		
	}
	//打印二维码
	function printImg(){
		var casenumber = _grid.chooseValue("CASENUMBER");
		var suspect = _grid.chooseValue("SUSPECT");
		if(casenumber == ""){
			alert("请选择要打印二维码的物品记录");
			return;
		}
		var vals;
		$.ajax({
   			type :"Post",
   			async:true,
   			url : "${pageContext.request.contextPath}/seizeRes.do?method=getSuspects",
   			data:{"suspect":suspect,"casenumber":casenumber},
   			beforeSend:function(){  
   				matech.showWaiting("100%","100%","请稍后,数据正在提交..."); 	
   	        },
   			success : function(datas) {
   				resul = unescape(datas);
   				resul = Ext.util.JSON.decode(resul);
   				matech.stopWaiting();
   				if(resul[0].result==1){
   					vals=resul[0].sus.uuid;
   					var url = contextPath + "/police.do?method=print&flag=2&vals=" +vals;				
   					window.open(url);
   					retrun;
   				}else{
   					alert("参数获取失败！请5秒后重试");
   				}
   			}
   		});		
	}
 //打印文书
 function printWord(casenumber,suspect,caseType){
	//获取一下uuid
	$.ajax({
			type :"Post",
			async:true,
			url : "${pageContext.request.contextPath}/seizeRes.do?method=getSuspects",
			data:{"suspect":suspect,"casenumber":casenumber},
			beforeSend:function(){  
				matech.showWaiting("100%","100%","请稍后,正在准备重要参数..."); 	
	        },
			success : function(datas) {
				resul = unescape(datas);
				resul = Ext.util.JSON.decode(resul);
				matech.stopWaiting();
				if(resul[0].result==1){
					var uuid=resul[0].sus.uuid;
					if(caseType=="刑事案件"){
						extWordPrint('&tables=vw_ga_detention`single`uuid|ga_detention_task`list`mainformid`ordernumber&uuid='+uuid+'&word=police003,police004',uuid);
					}else{
						extWordPrint('&tables=vw_ga_detention`single`uuid|ga_detention_task`list`mainformid`ordernumber&uuid='+uuid+'&word=police001',uuid);
					} 
				}else{
					alert("参数获取失败！请5秒后重试");
				}
			}
		});		
}
 function extWordPrint(param,uuid){
   	//打印
	var url =contextPath+ "/case.do?method=expWord&"+param;
	$.ajax({ 
		async: true, 
		type : "POST", 
		url : url,
    	cache:false,    
		success : function(data) { 
			alert("成功");
			var t=data;
			try{ 
				downloadOpen(t,uuid);
			}catch(e){alert(e);}
		} 
 	}); 
}

 function downloadOpen(path,_key){
	var o=police.getWebOffice();
	if (o){
		var uuid=_key;
		var url = police.getlocationhost() +"/"+ path;
		var t=o.funDownloadZipFileAndOpen(url,uuid);
	}	
}

	

</script>
</html>