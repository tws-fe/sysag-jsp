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
				text:'查询', 
				icon:contextPath + btn_img_url + 'query.png',
				handler:function(){
					_grid.customQryWinFun();
				}
			}
			,'-',
			    { 
				id:'btn-2',
				text:'打印二维码',
				icon:contextPath + btn_img_url + 'print.png',
				handler:function(){
					printImg();
				}
			},'-',
			    { 
				id:'btn-3',
				text:'关闭',
				icon:'${ctx}/tws/css/img/close.gif',
				handler:function(){
					matech.closeTab(parent);
				}
			}
		]
	});
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:gbag.seizeRes.SeizeResGridJson",
		param:{unitId:"${unitId}"},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"UUID",header:"ID",dataIndex:"UUID",width:50,sortable:true,align:"left",hidden:true},
		         {id:"CASENUMBER",header:"案件编号",dataIndex:"CASENUMBER",width:50,sortable:true,align:"left",hidden:true},
		         {id:"SUSPECT",header:"嫌疑人编号",dataIndex:"SUSPECT",width:100,sortable:true,align:"left",hidden:true},
		        {id:"DETECTIONERS",header:"扣押执行人",dataIndex:"DETECTIONERS",width:110,sortable:true,align:"left"},
 				{id:"DETENTIONTIME",header:"扣押时间",dataIndex:"DETENTIONTIME",width:160,sortable:true,align:"left"},
 				{id:"WITNESS",header:"见证人",dataIndex:"WITNESS",width:110,sortable:true,align:"left"},
 				{id:"CASENAME",header:"关联案件",dataIndex:"CASENAME",width:300,sortable:true,align:"left"},
 				{id:"CASETYPE",header:"案件类型",dataIndex:"CASETYPE",width:100,sortable:true,align:"left"},
 				{id:"SUSPECTNAME",header:"关联嫌疑人",dataIndex:"SUSPECTNAME",width:240,sortable:true,align:"left"},
 				{id:"ORDERNUMBER",header:"物品编号",dataIndex:"ORDERNUMBER",width:140,sortable:true,align:"left"},
 				{id:"ITEMNAME",header:"物品名称",dataIndex:"ITEMNAME",width:140,sortable:true,align:"left"},
 				{id:"AMOUNT",header:"数量",dataIndex:"AMOUNT",width:140,sortable:true,align:"left"},
 				{id:"CHARACTERISTIC",header:"特征",dataIndex:"CHARACTERISTIC",width:140,sortable:true,align:"left"},
 				{id:"REMARKS",header:"备注",dataIndex:"REMARKS",width:140,sortable:true,align:"left"},
 				{id:"STATENAME",header:"状态",dataIndex:"STATENAME",width:120,sortable:true,align:"left"}
 				],
 		fields:["UUID","CASENUMBER","SUSPECT","DETECTIONERS","DETENTIONTIME","WITNESS","CASENAME","CASETYPE","SUSPECTNAME","ORDERNUMBER","ITEMNAME","AMOUNT","CHARACTERISTIC","REMARKS","STATENAME"],
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


</script>
</html>