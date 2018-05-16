Ext.namespace("Ext.matech.jpdl");  
var attrWin ;
var init = function() {
    Ext.QuickTips.init();

    var attrDiv = document.getElementById("attrDiv") ;
    attrDiv.style.display = "" ;
    var jpdl = createJpdl();
    
    attrPanel = new Ext.Panel({
		region:'west',
		id:'west-panel',
		split:true,
		width: 280,
		margins:'0 0 0 0',
		layout:'accordion',
		autoScroll:true,
		title:"属性面板",
		lines:false,
		collapsible :true,
		contentEl:'attrDiv', 
		bodyStyle : 'background:#dfe8f6',
		layoutConfig:{
			animate:false
		},
		buttons:[{
		            text:'保存属性',
		          	handler:function() {
		          		
		          		
		          		var nodeName = document.getElementById("nodeName").value ;
		          		var form = document.getElementById("form").value ;
		          		var handlerClass = document.getElementById("handlerClass").value ;
		          		var rightType = document.getElementById("rightType").value ;
		          		var decisionType = document.getElementById("decisionType").value ;
		          		var decisionExp = document.getElementById("decisionExp").value ;
		          		var decisionClass = document.getElementById("decisionClass").value ;
		          		var subProcessKey = document.getElementById("sub-process-key").value ;
		          		var buttonPopedom = document.getElementById("buttonPopedom").value ;
		          		
		          		var isSignNode = document.getElementById("isSignNode"); //是否会签节点
		          		if(isSignNode.value !="" ){
		          			if(buttonPopedom == ""){
		          				buttonPopedom = isSignNode.value;//"会签节点";
		          			}else{
		          				buttonPopedom = isSignNode.value + "," + buttonPopedom;//"会签节点" + "," + buttonPopedom;
		          			}
		          		}
		          		
		          		var level = document.getElementById("level") ;
		          		var selectUserChecked = document.getElementById("isSelectUser").checked ;
		          		
		          		//信息提醒
		          		var sLetter = document.getElementById("sLetter") ;
		          		var sMsg = document.getElementById("sMsg") ;
		          		var sTemplet = document.getElementById("sTemplet") ; //消息模板
		          		//var dLetter = document.getElementById("dLetter") ;
		          		//var dMsg = document.getElementById("dMsg") ;
		          		var dTemplet = document.getElementById("dTemplet") ; //消息模板
		          		
		          		var dProcess = document.getElementById("dProcess").value ;
		          		
		          		//获得当前选中节点
		          		var select = Jpdl.model.selections[0]; 
		          		select.name = nodeName ; 
		          		if(select.nodeName != "decision") {
		          			Jpdl.cmd.CommandService.execute(new Jpdl.cmd.UpdateNodeNameCmd(select,nodeName));
		          		}
		          		select.form = form ; 
		          		select.handlerClass = handlerClass ; 
		          		select.rightType = rightType ; 
		          		select.decisionExp = decisionExp ;
		          		select.decisionClass = decisionClass ;
		          		select.subProcessKey = subProcessKey ;
		          		select.decisionType = decisionType ; 
		          		select.buttonPopedom = buttonPopedom;
		          		
		          		clearOther() ;
		          		var department = document.getElementById("department").value ;
		          		var role = document.getElementById("role").value ;
		          		var user = document.getElementById("user").value ;
		          		var strategy = document.getElementById("strategy").value ;
		          		var candidateExp = document.getElementById("candidateExp").value ;
		          		var assignee = document.getElementById("assignee").value ;
		          		var rightClass = document.getElementById("rightClass").value ;
		          		
		          		
		          		select.department = department ;
		          		select.role = role ;
		          		select.user = user ; 
		          		select.strategy = strategy;
		          		select.candidateExp = candidateExp ; 
		          		select.assignee = assignee ; 
		          		select.rightClass = rightClass ; 
		          		
		          		//attrWin.hide();
		          		
		          		if(selectUserChecked){
		          			select.selectUser = "是" ;
		          		}else {
		          			select.selectUser = "否" ;
		          		}
		          		
		          		//保存信息提醒设置
		          		select.sLetter = sLetter.checked ;
		          		select.sMsg = sMsg.checked ;
		          		select.sTemplet = sTemplet.value;
		          		
		          		//select.dLetter = dLetter.checked ;
		          		//select.dMsg = dMsg.checked ;
		          		select.dTemplet = dTemplet.value;
		          		select.dLetter = (dProcess.indexOf("Letter")>-1);
		          		select.dMsg = (dProcess.indexOf("Msg")>-1);
		          		select.dWx = (dProcess.indexOf("Wx")>-1);
		          		select.dEmail = (dProcess.indexOf("Email")>-1);
		          		select.dAE = (dProcess.indexOf("AE")>-1);
						
		          		select.level = level.value;
		          	}
		        }]
	}) ;
    
    
    var viewPort = new Ext.Viewport({
        layout: 'border',
        items: [attrPanel,jpdl]
    });

} ;

var createJpdl = function() {
    Jpdl.ActivityMap.activityBasePath = MATECH_SYSTEM_WEB_ROOT + '/img/activities/48/';

    var p = new Ext.Panel({
        id: 'jpdl',
        region:'center',
        tbar: new Ext.Toolbar([
            {
                text: '暂存',
                icon:contextPath + btn_img_url + 'save.png',
                handler: function() {
                	save("");
                }
            },'-',
            {
                text: '保存并发布',
                icon:contextPath + btn_img_url + 'start.png',
                handler: function() {
                	save(true) ;
                }
            },'-',{
                text: '关闭',
                icon:contextPath + btn_img_url + 'close.png',
                handler: function() {
                	closeTab(parent.tab);
                }
            },'->'
        ]),
        layout: 'border',
        items: [{
            region: 'center',
            xtype: 'jpdlpanel'
        }]
    });
    return p;
};

Ext.onReady(init);
