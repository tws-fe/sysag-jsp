<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/twsInclude.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script type="text/javascript">
var toolBar; 
var tree;

//EXT初始化
function ext_init(){
	toolBar = new Ext.Toolbar({
		height:30,
		region:'north',
		width:Ext.getBody().getWidth(),
		items:[{
				text:'新增同级',
				icon:'${ctx}/tws/css/img/add.gif' ,
				handler:function(){
					addTong();				   					 
				}
			}
			,'-',{ 
				text:'新增下级',
				icon:'${ctx}/tws/css/img/add.gif' ,
				handler:function(){
					addSub();
	    		}
			} 
			,'-',{ 
				text:'修改',
				icon:'${ctx}/tws/css/img/edit.gif' ,
				handler:function(){
					edit();
				}
			},'-',{ 
				text:'删除',
				icon:'${ctx}/tws/css/img/delete.gif' ,
				handler:function(){
					var reportId=$("#nodeId").val();
					if(reportId==""){
						alert("您还没有选择要删除的记录!");
						return;
					}
					var isLeaf=$("#isLeaf").val();
					if(isLeaf == "false"){
						if(confirm("该记录下有子记录,请先删除子记录！")){
							return false;
						}
					}else{
						if(confirm("确认要删除该记录吗?")){
							
							var url = "${ctx}/reportConfig.do?method=delValidateReportType";
							var request = "opt=del&reportId="+reportId;
							var result = ajaxLoadPageSynch(url,request);
							var count = Ext.util.JSON.decode(result);
							if(count[0].count==0){
								var url = "${ctx}/reportConfig.do?method=delReportType";
								var request = "opt=del&reportId="+reportId;
								ajaxLoadPageSynch(url,request);
								tree.removeNode();
								refreshTree();
								return true;
							}else{
								alert("请先将该类型下的详细内容删除之后在来删该类型！");
							}
						}
					}
				}
			},'-',{ 
   				text:'排序设置',
   				icon:'${ctx}/tws/css/img/transfer1.png' ,
   				handler:function(){
   					var nodeId=document.getElementById("nodeId").value;
   					window.location = "${ctx}/tws/report/config/sort.jsp?&parentId="+nodeId;
   				}
   			}
		]
	});
	
	var root = new Ext.tree.AsyncTreeNode({
		id : 'root',
		text : '报表分类信息',
		expanded : true
	});

	//加载树
	tree = new Ext.matech.TreePanel({
		id:'reportTypeTree',
		region : 'center',
		width:Ext.getBody().getWidth(),
		autoid:'js:report.ReportType',
		rowData:'false',
		multilevel:'true',
		rootVisible:true,
		onclick:treeClick,
		root:root
	});
	
   new Ext.Viewport({
		layout:'border',
		items:[toolBar,tree]
   });
} 

function treeClick(node){
	if (!node.isLeaf()){}  	
	var nodeId=node.attributes.id;
	document.getElementById("nodeId").value=nodeId;
	
	$("#isLeaf").val(node.leaf);
	
}

Ext.onReady(ext_init);
</script>

</head>
<body >

<div id="hidDiv" style="display: none;" >

  <input id=nodeId name="nodeId" type="hidden">
  <input type="hidden" id="isLeaf" name="isLeaf" value="">
  <input type="hidden" id="uuid" name="uuid" value="">
  <input type = "hidden" id = "parentid" name = "parentid" value = "" />
  <input type = "hidden" id = "hLeaf" name = "hLeaf" value = "" />
  <input type = "hidden" id = "sortName" name = "sortName" value = "" />
  
</div>	

</body>
<script type="text/javascript">
//新增同级
function addTong(){
	var reportId=$("#nodeId").val();
	var url="${ctx}/reportConfig.do?method=addReportType&reportId="+reportId+"&opt=addTong";
	matech.openWindow("新增同级",url,800,500,parent,refreshTree);
	
}

function refreshTree(){
	tree.refresh();
}


function addSub(){
	var reportId=$("#nodeId").val();
	if(reportId==""){
		alert("请选择一个类型!");
		return;
	}
	var url="${ctx}/reportConfig.do?method=addReportType&opt=addSub&reportId="+reportId;
	matech.openWindow("新增下级",url,800,500,parent,refreshTree);	
	
}

//修改
function edit(){
	var reportId=$("#nodeId").val();
	if(reportId==""){
		alert("请选择一个类型!");
		return;
	}
	var url="${ctx}/reportConfig.do?method=editReportType&opt=update&reportId="+reportId;
	matech.openWindow("报表类型",url,800,500,parent,refreshTree);	

}
</script>
</html>