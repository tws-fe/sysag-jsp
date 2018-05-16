<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" errorPage="../hasNoRight.jsp"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
	<title>流程审批</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<style type="text/css">
	
	.depart-authorize {
		color : rgb(24, 160, 224);
		background-color : white;
		cursor: pointer;
		border: none;
	}
	
	.depart-authorized {
		color : orange;
		background-color : white;
		cursor: pointer;
		border: none;
	}
	
	</style>
</head>
<body >

<form name="thisForm" method="post" action="" id="thisForm" >

	<input name="roleId" type="text" id="roleId" value="${roleId}" >
	<input name="menuIds" type="text" id="menuIds" value="${menuIds}" >

	<div id="div_win_depart">
		<div id="div_tree_depart" style=""></div>
	</div>	
</form>


<script type="text/javascript">
var tree_right;
var root_right;

var bContinue = true;

// 权限节点对应，在展开时逐一加上
var nodemap = {};

function ext_init() {
	var Tree = Ext.tree;
	
	var popedemTreeLoader = new Tree.TreeLoader({
        dataUrl:'${pageContext.request.contextPath}/roleNew.do?method=popedom&roleId=${roleId}'
    });
	
	
	
    tree_right = new Tree.TreePanel({
       	width: '100%',
        region:'center',	
        rootVisible:false,
        
        border:false,
        autoScroll:true,
     	height:document.body.clientHeight-33,
		loader: popedemTreeLoader
    });
    
    /*
    // 每加一个节点，将这一个节点加到权限节点对应表，再改其显示文本
    tree_right.on('append', function(tree, node){
    	var children = node.childNodes;
    	for(var i = 0; i < children.length; i++){
    		var child = children[i];
    		if (!nodemap[child.id] && child.leaf){
    			nodemap[child.id] = child;
    			child.text_ori = child.text;
    			child.setText(child.text + '&nbsp;&nbsp;&nbsp;<input type="button" class="depart-authorize" onclick="win_depart_show(\'' + child.id + '\')" value="部门授权"/>' );
    		}
    	}
    });*/
    
   	tree_right.on('checkchange', function(node, checked) {   
   		if (!bContinue)
   			return;
   		
   		//关上开关，避免重复执行		
		bContinue = false;
		
		//node.expand();   
		if(node.disabled == false){
			node.attributes.checked = checked;
		} 
		
		//选中上级节点,由于 bContinue=false 所以不会重复执行
		var root = tree_right.getRootNode();
		
		if(node.text.indexOf('-按钮') >=0 && !checked){
			//按钮取消状态不要 去联动去掉上级在勾选
		} else {
			//不是按钮，或者是按钮但是在选中状态，就要勾选
			for(var pNode = node.parentNode; pNode.id!=root.id; pNode = pNode.parentNode){
				//先判断上级节点（根据其下一级节点选中没选中）是否选中或没选中；
				var parentChecked=checkChildChecked(pNode);
			
				//设置上级节点状态
				if(pNode.disabled == false){
					pNode.ui.toggleCheck(parentChecked);   
					pNode.attributes.checked = parentChecked;
				}   
			}
		}
		
		//把下级节点都选中
		toggleCheck(node, checked);
		
		//打开开关
		bContinue = true;
		
		
	}, tree_right); 
    
     
     root_right = new Tree.AsyncTreeNode({
         text: '菜单树',
         draggable:false,
         id:'0',
         parentId:'00'
     });
     
     tree_right.setRootNode(root_right);
     tree_right.expandAll();
     
     
     
     var treeTbar = new Ext.Toolbar({
 		items:[{ 
 			text:'保存',
 			icon:contextPath + btn_img_url + 'save.png' ,
 			handler:function(){
 				
 				if("${sessionScope.userSession.userLoginId}" !="admin"){
 					alert("你没有权限执行此操作！");
 					return;
 				}
 				
 				 var selects = tree_right.getChecked();
 				 var menuIds = "";
 				 
 				 for(var i=0;i<selects.length;i++){
 				 	if(selects[i].id.indexOf('s_')==-1){
 				 		menuIds += "." + selects[i].id;
 				 	}
 				 }
 				 if(menuIds != "") menuIds += ".";
 				 //alert(menuIds); return;
 				 
 				 document.getElementById("menuIds").value = menuIds;
 				 document.thisForm.action="${pageContext.request.contextPath}/roleNew.do?method=popedomSave";	
				 document.thisForm.submit();

 			}
 		},'-',{ 
 			text:'关闭',
 			icon:contextPath + btn_img_url + 'close.png' ,
 			handler:function(){
 				closeTab(parent.tab);
 			}
 		},'-','<div style="margin-left:50px;color:#ff6600;">角色名称：${roleName}</div>'
 		
 		]
 	});
     
    var layout = new Ext.Viewport({
		layout:'border',
		items:[{
			region:'center',
			margins:'0 0 0 0',
			split:true,
			cmargins:'0 0 0 0',
			width: 230,
			collapsible: true,
			containerScroll: true, 
        	split:true,
        	collapseMode:'mini',
        	hideCollapseTool : true,
	        lines:false,
	        items:[treeTbar,tree_right]
		}]
    });
}


Ext.onReady(function(){

	ext_init();
});



</script>
<script type="text/javascript">
//递归让所有下级节点都选中或不选中
var toggleCheck = function(node, checked){

	if(node.disabled == false){
		node.attributes.checked = checked; 
		node.ui.toggleCheck(checked);
	}
	  
	var childNodes = node.childNodes;
	if(childNodes || childNodes.length>0){
    	for(var i=0;i<childNodes.length;i++){
    		if(childNodes[i].text.indexOf('-按钮')>=0 && checked){
    			//选中在时候，不要递归到按钮
    		}else{
    			//取消选中在时候，按钮和下级菜单都要递归
    			toggleCheck(childNodes[i],checked);
    		}
		}
	}
	
}

//检查所有下一级节点（不需要检查下下级节点，也就是说不需要递归）是否选中还是没选中，只要有一个节点被选中，就是true,否则是false)
var checkChildChecked=function(node){
	//没选中就递归
	var childNodes = node.childNodes;
	if(childNodes || childNodes.length>0){
    	for(var i=0;i<childNodes.length;i++){
    		//下级节点选中立刻返回
    		if(childNodes[i].attributes.checked){
    			return true;
    			break;
    		}
		}
	}
	return false;
}
</script>
<script type="text/javascript">

var win_depart;

var tree_depart;
var root_depart;

var node_menu_current;

function win_depart_init(){
	win_depart = new Ext.Window({
		title: '部门授权',
		width : 350,
		height : 450,
		contentEl:'div_win_depart', 
        closeAction:'hide',
        listeners:{
			'hide':{fn: function () {
				 win_depart.hide();
			}}
		},
        layout:'fit',
	    buttons:[{
            text:'保存',
          	handler:function() {
          		var nodes = tree_depart.getChecked();
          		var departmentid = "";
          		for(var i = 0; i<nodes.length; i++){
        			if (nodes[i].attributes.departid){
        				departmentid += nodes[i].attributes.departid + ",";	
        			}
        		}
				jQuery.ajax({
					url : MATECH_SYSTEM_WEB_ROOT + '/roleNew.do?method=popedomOfDepartmentSave',
					type : 'POST',
					data : {
						menuid : node_menu_current.id,
						user_or_role_id : document.getElementById('roleId').value,
						departmentid : departmentid,
						property : 'role'
					},
					dataType : 'text',
					success : function(response){
						response = eval('(' + response + ')');
						if (typeof response.exception == 'exception'){
							alert('保存失败, 异常原因: ' + response.exception);
							return;
						} 
						if (response.success == 0){
							alert('保存失败, 数据没有被持久化');
							return;
						}
						node_menu_current.setText(node_menu_current.text_ori + '&nbsp;&nbsp;&nbsp;<input type="button" class="depart-authorized" onclick="win_depart_show(\'' + node_menu_current.id + '\')" value="部门授权"/>' );
						win_depart.hide();
					},
					error : function(response){
						alert('与服务器连接异常');
					}
				}); // jQuery.ajax({...})
          	} // button handler
        },{
            text:'返回',
            handler:function(){
            	win_depart.hide();
            }
        }]
    });
}

function win_depart_show(nodeid){
	if (!win_depart){
		win_depart_init();
	}
	win_depart.show();
	
	var node = nodemap[nodeid];
	win_depart.setTitle(node.text_ori);
	tree_depart_init(node);
}

function tree_depart_init(node_menu){
	
	var Tree = Ext.tree;
	document.getElementById("div_tree_depart").innerHTML = "";
	
	node_menu_current = node_menu;

	var data = new Ext.tree.TreeLoader({
		url:'${pageContext.request.contextPath}/department.do?method=getVisibleDepartmentTree&userbool=true&user_or_role=role'
	});
	
	tree_depart = new Tree.TreePanel({
		useArrows : true,
	    animate : true, 
	    autoScroll : true,
	    containerScroll : true,
	    loader : data,
	    border : false,
	    width : 320,
        height : 400,
	    rootVisible : false,
	    dropConfig : { appendOnly : true }
	    
	}); 
	
	var menuid = node_menu_current.id;
	data.on('beforeload',function(treeLoader,node){
		this.baseParams.id = node.id,
		this.baseParams.menuid = menuid, // TODO
		this.baseParams.roleid = document.getElementById("roleId").value,
		this.baseParams.checked = "false";		
	},data);
	
	
	tree_depart.on('checkchange', function(node, checked) {   
		/*
		node.expand();   
		node.attributes.checked = checked; 
		node.eachChild(function(child) {  
			//child.ui.toggleCheck(checked);   
			//child.attributes.checked = checked;   
			child.fireEvent('checkchange', child, checked);   
		});
		*/
		   
		if (!bContinue)
   			return;
   		
   		//关上开关，避免重复执行		
		bContinue = false;
		
		//node.expand();   
		if (node.disabled == false){
			node.attributes.checked = checked;
		} 
		
		//选中上级节点,由于 bContinue=false 所以不会重复执行
		var root = tree_depart.getRootNode();
		var pNode = node.parentNode;
		if (pNode){
			for(; pNode.id!=root.id; pNode = pNode.parentNode){
				//先判断上级节点（根据其下一级节点选中没选中）是否选中或没选中；
				var parentChecked = checkChildChecked(pNode);
			
				//设置上级节点状态
				if(pNode.disabled == false){
					pNode.ui.toggleCheck(parentChecked);   
					pNode.attributes.checked = parentChecked;
				}   
			} // for pNode
		}
		
		//把下级节点都选中
		toggleCheck(node, checked);
		
		//打开开关
		bContinue = true;
	}, tree_depart); 
	
	
	root_depart = new Ext.tree.AsyncTreeNode({
		id:'d`01`555555',
		text : '显示全部',
		checked : 'false'
	});
	tree_depart.setRootNode(root_depart);

	
	
	tree_depart_render('div_tree_depart');
}

function tree_depart_render(target_div){
	if (target_div){
		tree_depart.render(target_div);	
	}
	// tree.expandAll();
	root_depart.expand();
	
	var children = root_depart.childNodes;
	
	if (children.length == 0){
		setTimeout(function(){
			tree_depart_render();
		}, 300);
		return;
	} 
	for(var i = 0; i < children.length; i++){
		if (!children[i].leaf){
			children[i].expand();
		}
	} // for 1st
}

</script>


</body>
</html>


