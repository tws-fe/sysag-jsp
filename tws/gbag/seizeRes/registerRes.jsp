<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/tws/css/allstyle.css"/>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 物品扣押 -->
<style type="text/css">
	.x-panel-body{border:0px;}
</style>
<script type="text/javascript" src="${pageContext.request.contextPath}/tws/js/utils.js"></script>
<script type="text/javascript">

var layout;
function extInit(){	
	
    var north = new Ext.Panel({
    	id:'northPanel',
    	region:'north',
    	border:false,
    	split:false,
        collapsible: false,
        margins:'0 0 0 0',
        cmargins:'0 0 0 0',
        lines:false,
        collapseMode:'mini',
        hideCollapseTool : true,
        height:42,
        contentEl:'_viewhead'
	});
	
	var center = new Ext.Panel({
		layout:'fit',
		region:'center',
		border:false,
		autoScroll:true,
		margins:'0 0 0 0',
		contentEl:'_viewbody'
		
	});
    	
	new ExtButtonPanel({
		renderTo:'sbtBtn',
		columns:3,
		items:[{
            text: '保存',
            icon:'${pageContext.request.contextPath}/css/theme/default/btn/save.png' ,
            scale: 'medium',
            handler:function(){
      			save();
			 }
			},{
            text: '关闭',
            icon:'${pageContext.request.contextPath}/css/theme/default/btn/close.png' ,
            scale: 'medium',
            handler:function(){
            	returnUs();
			}
		}]  
	});			
	
    var south = new Ext.Panel({
    	id:'southPanel',
    	region:'south',
    	border:false,
    	split:false,
        collapsible: false,
        margins:'0 0 0 0',
        cmargins:'0 0 0 0',
        lines:false,
        collapseMode:'mini',
        hideCollapseTool : true,
        height:70,
        contentEl:'_viewsouth'
	});
	
	layout=new Ext.Viewport({
		layout:'border',
		items:[
			north,center,south
		]
	});
	
}


Ext.onReady(function(){
	mt_init_form_Control();
	extInit();
	
});
</script>
</head>
<body style="margin:0" >
<div id="_viewhead" class="threeviewhead" >
	<table id="tabInfo_tbl" cellspacing="0" cellpadding="0" border="0" width="100%">  
		<tr valign="center">  
			<td>
				<img class="newtabimg" src="${pageContext.request.contextPath}/css/btn/table.png"/>
			</td>
			<td> 
				<div class="threetabdiv">
					<span class="title">扣押物品登记</span>
					
					<span class="nownode">当前节点:[物品扣押]</span>
					
				</div> 
				<ul class="tabul">
					<li>
						<table cellspacing="0" cellpadding="0" border="0" height="100%" width="100%">  
						   <tr>  
							   <td nowrap id="tabInfotd0" align="left" class="tabInfoSelT" height="22px" >  
										信息展示
							   </td>  
						   </tr>  
					   </table> 
					</li>
				</ul>
			</td>   
			<td nowrap style="font-size: 2px; cursor: default; border-width: 0px 0px 1px 0px;   
			  border-color: #949878; border-style: Solid; width: 90%;"> 
				<ul class="tabultwo">
					<li>
						<img id="_saveul" class="newtabimg2" src="${pageContext.request.contextPath}/css/theme/default/img/icon/help-white.png" style="cursor:pointer" onclick="police.openHelp('xjda','系统帮助【新建档案】');" title="帮助"/>
					</li>					
					<li>
						<img class="newtabimg2" src="${pageContext.request.contextPath}/css/btn/close.png" style="cursor:pointer" onclick="closetabthree()" title="关闭" />
					</li>
				</ul> 
			</td>  
		</tr>  
	</table>  
	
</div>	
<div id="_viewbody" style="border-width:0px 1px 1px 1px;border:0;  
          border-style:Solid;background-color:#FEFCFD;padding:3px 0px 0px 0px;width:99.9%;">
          
	<form name="thisForm" id="thisForm" class="formular" autocomplete="off" method="post" action="">  
		<div style="text-align: center;border:1" >			
			<table align="center" border="0" class="newstylethree" id="main-table" name="main-table">
		<tbody>
			<tr>
				<td>
					<label for="mainformid">案件编号：</label></td>
				<td>
					<input style="height: 24px; width: 100%" id="casenumber" name="casenumber" valuemustexist=true autoid="js:gbag.res.registerResCaseList" refer='${unitId}' maxLength=100 type="text" value="${sus.casenumber}"   class="required"  /></td>
			</tr>
			<tr>
				<td>
					<label for="suspect">嫌疑人：</label></td>
				<td>
					<input style="height: 24px; width: 100%" id="suspect" name="suspect" ext_type="multiSelect" valuemustexist=true  autoid="js:gbag.res.registerResSuspectList" refer='casenumber' maxLength=100 type="text" value="${sus.suspect }" class="required" onchange="selectUs()" /></td>
			</tr>
			<tr>
				<td>
					<label for="detentiontime">扣押时间：</label></td>
				<td>
				<c:if test="${not empty sus.detentiontime}">
					<input style="height: 24px; width: 100%" id="time" name="time"  maxLength=200 type="text" value='${sus.detentiontime }' readonly /></td>
				</c:if>
				<c:if test="${empty sus.detentiontime}">
					<input style="height: 24px; width: 100%" id="time" name="time"  maxLength=200 type="text" value='等待载入...' readonly /></td>
				</c:if>
					<td>
					<label for="detentioner">扣押执行人：</label></td>
				<td>
					<input style="height: 24px; width: 100%" id="detectioner" name="detectioner" value="${userId}" autoid="js:gbag.kuserNameToId" refer='${userId }' readonly maxLength=100 type="text" /></td>
				
			</tr>
			<tr>
				<td>
					<label for="witness">见 证 人：</label></td>
				<td>
					<input style="height: 24px; width: 100%" id="witness" name="witness" value="${sus.witness}" maxLength=200 type="text" /></td>
				<td>
					<label for="state">  状                态  ：  </label></td>
				<td>
					<input style="height: 24px; width: 100%" id="state" name="state" value="${sus.state }" maxLength=100 type="text" readonly />
					
				</td>
				
				
			</tr>
			<tr>&nbsp;</tr>
			</tbody>
			<tr class="tr_asset" >
				<td colspan="8">
					<table style='text-align:center ;' align='center' cellspacing='1' cellpadding='3' border='0' class='listTable'  id = 'ga_caseResTable'> 
						<caption>扣押物品添加：</caption> 						
						<tr>
							<th>						
							<img style='cursor:hand;' alt='新增一行' onclick=addTr() src='${pageContext.request.contextPath}/img/menu/add.png'>							
							</th>
							<th rowspan=1 colspan=1  align='center' style='width: 16%'>编号</th>
							<th rowspan=1 colspan=1  align='center' style='width: 20%'>物品名称</th>
							<th rowspan=1 colspan=1  align='center' style='width: 21%'>数量</th>
							<th rowspan=1 colspan=1  align='center' style='width: 20%'>特征</th>
							<th rowspan=1 colspan=1  align='center' style='width: 21%'>备注</th>
						</tr>
						<tbody id="ga_caseResTbody">														
							<c:forEach items="${list}" var="res" >
							<tr id="res.uuid">
								<input type="hidden" id="uuid" name="uuid" value="${res.uuid }"/>
								<td>
									<img style='cursor:hand;' alt='删除' onclick=deleteTr(this) src='${pageContext.request.contextPath}/img/menu/delete.png' >
								</td>
								<td>
									<input style="height: 24px; width: 185px"  name="ordernumber"   type="text"  maxLength=100  value = "${res.ordernumber}"   />
								</td>	
								<td>
									<input style="height: 24px; width: 185px" name="itemname"  maxLength=100  type="text"  value = "${res.itemname}"  />
								</td>	
								<td>
									<input style='height: 24px; width: 185px'  name='amount'  maxLength=100  type='text'  value = '${res.amount}'  />
								</td>
								<td>
									<input style="height: 24px; width: 185px" name="characteristic"  maxLength=100  type="text"  value = "${res.characteristic}"  />
								</td>
								<td>
									<input style="height: 24px; width: 185px" name="remarks"  maxLength=100  type="text"  value = "${res.remarks}"  />
								</td>																		
							</tr>	
							</c:forEach>
							</tbody>								
					</table>
				</td>
			</tr>	
		
	</table>

		</div>
	</form>
</div>
<div id="_viewsouth"><center> <div id='sbtBtn'></div></center></div>

</body>

<script type="text/javascript">

function addTr(obj){
	//判断当前节点是否有值,通过最后一行的物品名称来确认
	//如果tr的长度大于0.而且最后一行的元素为空就return掉
	var length=$("#ga_caseResTbody").children('tr').length;
	if(length>0){
		// tbody 判断最后一行的元素里  物品编号   名称  数量是否为空，为空就退出
		var first_tr_td_input=$("#ga_caseResTbody").children('tr').last().children('td:eq(1)').children('input').val();
		var seconds_tr_td_input=$("#ga_caseResTbody").children('tr').last().children('td:eq(2)').children('input').val();
		var third_tr_td_input=$("#ga_caseResTbody").children('tr').last().children('td:eq(3)').children('input').val();
		if(first_tr_td_input==""||seconds_tr_td_input==""||third_tr_td_input==""){
			Ext.MessageBox.show({
				msg: "<span style='font-size:16px;color: red;text-indent:2em;align=center'>请注意：物品编号、名称、数量为必填项</span>",
				buttons:{"ok":"我知道了"},  
				fn:function(e){
					if(e=="ok"){        
						
					}
				},
	            width: 600,  
	            height:200,  
	            modal:false,  
	            icon:Ext.Msg.INFO,
	            closable: true
	        }); 				
			return;
		}
	}
	var uuid=new UUID().createUUID();
	
	var html="<tr id='"+uuid+"'> "
	 	+"<input type='hidden' id='uuid' name='uuid' value='"+uuid+"'/>"  
   	    +"<td>"
    	+"<img style='cursor:hand;' alt='删除' onclick=deleteTr(this) src='${pageContext.request.contextPath}/img/menu/delete.png' > "
   		+"</td>  "
    	+"<td>"
    	+"<input style='height: 24px; width: 185px'  name='ordernumber'   type='text'  maxLength=100  value = ''   /> "
   		+"</td>  "
    	+"<td>"
    	+"<input style='height: 24px; width: 185px' name='itemname'  maxLength=100  type='text'  value = ''  /> "
    	+"</td>  "
    	+"<td>"
    	+"<input style='height: 24px; width: 185px'  name='amount'  maxLength=100  type='text'  value = ''  />  "
    	+"</td>  "
    	+"<td>"
    	+"<input style='height: 24px; width: 185px' name='characteristic'  maxLength=100  type='text'  value = ''  />"
    	+"</td>  "
    	+"<td>"
    	+"<input style='height: 24px; width: 185px' name='remarks'  maxLength=100  type='text'  value = ''  /> "
    	+"</td>  "
    	+"</tr>";	
	$("#ga_caseResTbody").append(html);
	

}
//删除扣押物品 节点
function deleteTr(obj){
	//获取父节点 tr id,也就是uuid
	if(!confirm("确认删除？")){
		return;
	}
	var father_Node=obj.parentNode.parentNode;

	var uuid=father_Node.id;
	//删除数据库中的
 	$.ajax({
			type :"Post",
			async:true,
			url : "${pageContext.request.contextPath}/seizeRes.do?method=delResCertain",
			data:{"uuid":uuid},
			beforeSend:function(){  
				matech.showWaiting("100%","100%","后台删除中"); 	
	        },
			success : function(data) {
				matech.stopWaiting();
				result = unescape(data);
				result = Ext.util.JSON.decode(result);
				if(result[0].result==1){
					//右下角弹窗
					new Ext.ux.ToastWindow({
						  title: '提示',
						  html: '该物品已删除',
						  iconCls: 'error'
					}).show(document);
				}
				//删除页面上的
				father_Node.parentNode.removeChild(father_Node);				
			}
		});	
}
Ext.namespace("Ext.ux");

Ext.ux.ToastWindowMgr = {
    positions: []
};

Ext.ux.ToastWindow = Ext.extend(Ext.Window, {
    initComponent: function(){
          Ext.apply(this, {
              iconCls: this.iconCls || 'information',
            width: 250,
            height: 150,
            autoScroll: true,
            autoDestroy: true,
            plain: false,
            shadow:false
          });
        this.task = new Ext.util.DelayedTask(this.hide, this);
        Ext.ux.ToastWindow.superclass.initComponent.call(this);
    },
    setMessage: function(msg){
        this.body.update(msg);
    },
    setTitle: function(title, iconCls){
        Ext.ux.ToastWindow.superclass.setTitle.call(this, title, iconCls||this.iconCls);
    },
    onRender:function(ct, position) {
        Ext.ux.ToastWindow.superclass.onRender.call(this, ct, position);
    },
    onDestroy: function(){
        Ext.ux.ToastWindowMgr.positions.remove(this.pos);
        Ext.ux.ToastWindow.superclass.onDestroy.call(this);
    },
    afterShow: function(){
        Ext.ux.ToastWindow.superclass.afterShow.call(this);
        this.on('move', function(){
               Ext.ux.ToastWindowMgr.positions.remove(this.pos);
            this.task.cancel();}
        , this);
        this.task.delay(4000);
    },
    animShow: function(){
        this.pos = 0;
        while(Ext.ux.ToastWindowMgr.positions.indexOf(this.pos)>-1)
            this.pos++;
        Ext.ux.ToastWindowMgr.positions.push(this.pos);
        this.setSize(250,150);
        this.el.alignTo(document, "br-br", [ -20, -20-((this.getSize().height+10)*this.pos) ]);
        this.el.slideIn('b', {
            duration: 2,
            callback: this.afterShow,
            scope: this
        });   
    },
    animHide: function(){
           Ext.ux.ToastWindowMgr.positions.remove(this.pos);
        this.el.ghost("b", {
            duration: 2,
            remove: true,
         scope: this,
         callback: this.destroy
        });   
    }
});  

function save(){
	if (!formSubmitCheck('thisForm')) return;
	//最后一行物品详情， 第一个第二个 第三个为必填项
	var first_tr_td_input=$("#ga_caseResTbody").children('tr').last().children('td:eq(1)').children('input').val();
	var seconds_tr_td_input=$("#ga_caseResTbody").children('tr').last().children('td:eq(2)').children('input').val();
	var third_tr_td_input=$("#ga_caseResTbody").children('tr').last().children('td:eq(3)').children('input').val();

	if(first_tr_td_input==""||seconds_tr_td_input==""||third_tr_td_input=="") return;
	
	var witness=$("#witness").val();
	if(witness=="无"){
		$("#witness").val("");
	}
	$.ajax({
		type :"Post",
		async:true,
		url : "${pageContext.request.contextPath}/seizeRes.do?method=saveResCertain",
		data:$('#thisForm').serialize(),
		beforeSend:function(){  
			matech.showWaiting("100%","100%","请稍后,数据正在提交..."); 	
        },
		success : function(data) {
			matech.stopWaiting();
			result = unescape(data);
			result = Ext.util.JSON.decode(result);
			if(result[0].result==1){
				//右下角弹窗
				new Ext.ux.ToastWindow({
					  title: '提示',
					  html: '已成功更改扣押物品',
					  iconCls: 'error'
				}).show(document);
			}		
		}
	});	
}
function returnUs(){
	matech.closeTab(parent);
}
//每当选择一个嫌疑人，就根据案件和嫌疑人 这两个条件获取扣押物品
function selectUs(){
	 $("#ga_caseResTbody").children('tr').remove();
	
	$("#witness").attr("value","无");
	$("#time").val("");
	$("#state").val("");
	$.ajax({
		type :"Post",
		async:true,
		url : "${pageContext.request.contextPath}/seizeRes.do?method=getResList",
		data:$('#thisForm').serialize(),
		beforeSend:function(){  
			matech.showWaiting("100%","100%","请稍后,开始查找..."); 	
        },
		success : function(data) {
			matech.stopWaiting();
			result = unescape(data);
			result = Ext.util.JSON.decode(result);
			if(result[0].sus==null||!result[0].list){

		   		$("#time").attr("value","待扣押");
				
			}
			if(result[0].result==1){				
				var aaa=result[0].list.length;
				//右下角弹窗
				new Ext.ux.ToastWindow({
					  title: '提示',
					  html: '已为您查找到'+aaa+'条扣押物品记录',
					  iconCls: 'error'
				}).show(document);
				var sus=result[0].sus;
				//设置几个标签的value			
				for ( var int = 0; int < aaa; int++) {
					var res=result[0].list[int];
					var uuid=res.uuid;
					var html="<tr id='"+uuid+"'> "
				   	 	+"<input type='hidden' id='uuid' name='uuid' value='"+uuid+"'/>"  
				   	    +"<td>"
				    	+"<img style='cursor:hand;' alt='删除' onclick=deleteTr(this) src='${pageContext.request.contextPath}/img/menu/delete.png' > "
				   		+"</td>  "
				    	+"<td>"
				    	+"<input style='height: 24px; width: 185px'  name='ordernumber'   type='text'  maxLength=100  value = '"+res.ordernumber+"'   /> "
				   		+"</td>  "
				    	+"<td>"
				    	+"<input style='height: 24px; width: 185px' name='itemname'  maxLength=100  type='text'  value = '"+res.itemname+"'  /> "
				    	+"</td>  "
				    	+"<td>"
				    	+"<input style='height: 24px; width: 185px'  name='amount'  maxLength=100  type='text'  value = '"+res.amount+"'  />  "
				    	+"</td>  "
				    	+"<td>"
				    	+"<input style='height: 24px; width: 185px' name='characteristic'  maxLength=100  type='text'  value = '"+res.characteristic+"'  />"
				    	+"</td>  "
				    	+"<td>"
				    	+"<input style='height: 24px; width: 185px' name='remarks'  maxLength=100  type='text'  value = '"+res.remarks+"'  /> "
				    	+"</td>  "
				    	+"</tr>";		
					$("#ga_caseResTbody").append(html);
				}
		   		$.ajax({
		   			type :"Post",
		   			async:true,
		   			url : "${pageContext.request.contextPath}/seizeRes.do?method=getState",
		   			data:{"stateid":sus.state},
		   			success : function(datas) {
		   				resul = unescape(datas);
		   				resul = Ext.util.JSON.decode(resul);
		   				document.getElementById("state").value=resul[0].stateName;
		   			}
		   		});
		   		
		   		$("#detectioner").attr("value",sus.detectioner);
		   		alert(sus.witness=="");
		   		if(sus.witness!=""){
		   		$("#witness").attr("value",sus.witness);
		   		};
		   		$("#time").attr("value",sus.detentiontime);
		   		
			}
			if(result[0].result==0){
				new Ext.ux.ToastWindow({
					  title: '提示',
					  html: '查找失败',
					  iconCls: 'error'
				}).show(document);
			}
		}
	});	 
}
</script>
</html>