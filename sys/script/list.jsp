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
				text:'文件上传', 
				icon:'${ctx}/tws/css/img/add.gif',
				handler:function(){
					uploadFile();
				}
			},'-',{ 
			    id:'btn-5',
				text:'重新生成树', 
				icon:'${ctx}/tws/css/img/add.gif',
				handler:function(){
					resetTree();
				}
			}
			
		]
	});
	
	
	_grid= new Ext.matech.grid.GridPanel({
		id:"gridId_unitList",
		autoid:"js:sys.sysScript.SysScriptListGridJson",
		param:{scriptId:"${scriptId}"},
		currentPage:1,
		singleSelect:true,
		columns:[{id:"ID",header:"ID",dataIndex:"ID",width:120,sortable:true,align:"left",hidden:true},
		         {id:"FNAME",header:"文件名称",dataIndex:"FNAME",width:220,sortable:true,align:"left"},
		         {id:"CPATH",header:"文件路径",dataIndex:"CPATH",width:360,sortable:true,align:"left"},
 				 {id:"PATH",header:"文件父路径",dataIndex:"PATH",width:120,sortable:true,align:"left"},
 				 {id:"PID",header:"父id",dataIndex:"PID",width:260,sortable:true,align:"left"}
 				],
 		fields:["ID","CPATH","PATH","PID","FNAME"],
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

 
	//修改
	function edit() {
		
	 	var id = _grid.chooseValue("ID");
	 	var  s= _grid.chooseValue("PID");
        
	   	if(id==""){
			alert("请选择要修改的对象！");
			return;
	   	}
	   	window.location = "${ctx}/sysScript.do?method=edit&editType=update&scriptId="+s+"&id="+id;
		
	}
 
	//删除
	function remove() {
		var  id= _grid.chooseValue("ID");
		if(id=="") {
			alert("请选择需要删除的对象！");
		} 
		else{
			
			if(!confirm("确定要删除该对象？")) {
				return;
			}else{
				matech.ajaxSumit("${ctx}/sysScript.do?method=delete","scriptId=${scriptId}&id="+id,true,function(){
						_grid.goSearch();
						parent.refreshTree();//刷新整棵树
				});
			}
		}
	}
	//文件上传
	function uploadFile(){
		
		var scriptId="${scriptId}";
		if(scriptId==""){
			alert("请选择要上传的对象！");
			return;
	   	}
		var url="${ctx}/sys/script/fileUpload.jsp?&editType=add&scriptId="+scriptId+"&id="+getUUID();
		matech.openWindow("上传文件",url,700,400,parent,function(){
			window.location.reload();//重新加载页面
			parent.refreshTree();//关闭后刷新整棵树
		});		 
	}
	
	//重新生成树
	function resetTree(){
		matech.ajaxSumit("${ctx}/sysScript.do?method=resetTree","scriptId=${scriptId}&id="+id,true,function(){
			window.location.reload();//重新加载页面
			parent.refreshTree();//刷新整棵树
	    });
 
	}

</script>
</html>