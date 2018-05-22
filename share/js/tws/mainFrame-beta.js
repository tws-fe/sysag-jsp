var MainIndexWindow = window;
var MainMenu = {
	ani_duration : 300,
	timer : {},
	init : function() {
		MainMenu.buildLayout();
		MainMenu.title = MainIndexWindow.document.title;	
	}, // init()
	hiddenHover : function() {}, 
	map : {},
	homeMenuHtml:"",
	homeMenuMap:{}
};

MainMenu.createHomeMenu= function(store, records) {
	
	var menuHtml = "";
	for (var i = 0; i < records.length; i++) {
		
		var id = records[i].data.id;
		var act = records[i].data.act;
		var title = records[i].data.title;	
        var menusql = records[i].data.menusql;
        var target = records[i].data.target;
        var helpact = records[i].data.helpact;
        
        
        MainMenu.map['submenu_'+id]=records[i].data;
        MainMenu.homeMenuMap[id]=records[i].data;
        
		//MainMenu.map['homemenu_'+id]=records[i].data;
		if(i==0){
			menuHtml+="<div class='clearfix' style='display:flex;justify-content:center'>";
		}
	
		menuHtml+="<div id='div-"+id+"' class='index_box' data-title='"+title+"' style='width:15%' >";
		menuHtml+="<div class='indexbox_top'>";
		menuHtml+="<div>";
		menuHtml+="<a href=\"javascript:void(0);\" onclick=\"MainIndex.openTab('"+id+"','"+title+"','"+CONTEXTPATH+act+"&menuid="+id+"','');\">";
		menuHtml+="<img src=\""+CONTEXTPATH+"share/images/"+helpact+"\" />";
		menuHtml+="</a></div></div>";
		menuHtml+="<div>"+title+"</div>";
		menuHtml+="<div class=\"tishi\" id=\"num-"+id+"\" style=\"display:none\" >";
		menuHtml+="</div></div>";
	
	    if((i+1) % 5==0){
	    	menuHtml+="</div><div style='display:flex;justify-content:center'>";
	    }
	    
	    if(i==(records.length-1) && (i+1) % 5!=0){
	    	if(i>5){
		    	var _ii=(i+1) % 5;
		    	
		    	for(var _kk=5;_kk>_ii;_kk--){
		    		
		    		menuHtml+="<div class='index_box' data-title='' style='width:15%' >";
		    		menuHtml+="<div class='indexbox_top'><div></div><div class=\"imgbox\"></div></div>";
		    		menuHtml+="<div></div><div class=\"tishi\" style=\"display:none\" ></div></div>";
		    		
		    	}
	    	}
	    	
	    	menuHtml+="</div>";
	    }
		
	}
	
	MainMenu.homeMenuHtml=menuHtml;
	
	MainIndex.activateUserIndex();
	
}

MainMenu.createMenu = function(store, records) {

	MainMenu.menuCount = records.length;

	// 构造菜单HTML
	var menuHtml = "<ul>";
	for (var i = 0; i < records.length; i++) {

		var id = records[i].data.id;
		var act = records[i].data.act;
		var title = records[i].data.title;	
        var menusql = records[i].data.menusql;
        var target = records[i].data.target;
    
        records[i].data.level = 1; 
        MainMenu.map['submenu_'+id]=records[i].data;
        
		// 一级菜单
		menuHtml += "<li class='nextnav'>"+ title;

		var childHtml = "";
		var noChildHtml = "";
		var bHasnoChild = false;// 标记是否有没有下级菜单的二级菜单

		// 取二三级菜单
		var url = CONTEXTPATH + 'extMenu?op=2&menuid=' + id;
		var oBao = $.ajax({
			url : url,
			async : false
		});
		var resText = oBao.responseText;

		var childRecords = Ext.util.JSON.decode(resText);

		if (childRecords.length == 0)
			continue;

		menuHtml += "<div class='lcbox_parent'>";
		menuHtml += "<div class='lcbox_img'><img  src='"+CONTEXTPATH+"share/images/index/867654318636691305.png' /></div>";
		
		menuHtml += "<div class='lcbox' style='display:block'>";

		for (var k = 0; k < childRecords.length; k++) {

			var id = childRecords[k].id;
			var text = childRecords[k].text;
			var act = childRecords[k].href;

			var children = childRecords[k].children;
			var dogid = childRecords[k].dogid;
			var target = childRecords[k].target; // 用于判断是每次是否打开【新窗口、新标签、其它】
			
			childRecords[k].level = 2;
			MainMenu.map['submenu_'+childRecords[k].id] = childRecords[k];

			//second menu
			childHtml += "<div>" + text+ "</div><div class='lcbox_a'>";
			

			if (children == null || children.length == 0) {
				childHtml+="";
			} else {
				// 遍历下级
				for (var j = 0; j < children.length; j++) {
					children[j].level = 3;
					MainMenu.map['submenu_'+children[j].id] = children[j]; 
			
					//third menu
					childHtml += "<a href='javascript:void(0)' id = 'submenu_" + children[j].id +"' onclick='MainIndex.evalJs.call(this);'>"
								+ children[j].text + "</a>";
					if (j < children.length - 1){
						childHtml += "&nbsp;&nbsp;|";
					}else{
						childHtml +="&nbsp;&nbsp;";
					}
				}
			}
			childHtml += "</div>";
		}
		menuHtml += childHtml;
		menuHtml += "</div></div></li>";
		
		if(i <(records.length-1)){
			menuHtml +="<li>|</li>";
		}
		
	}// 一级菜单循环完
	
	//menuHtml +="<li>"+MainMenu.map['curUserName']+"</li>";
	
	menuHtml += "</ul>"
	
	MainIndexWindow.document.getElementById("menu").innerHTML = menuHtml;

	MainMenu.hookMenuEvent();
	
	MainIndex.Layout();
};


MainMenu.hookMenuEvent = function() {
	
    $(".nextnav").mouseenter(function() {
        $(this).children('.lcbox_parent').show();
   });
   $(".nextnav").mouseleave(function() {
        $(this).children('.lcbox_parent').hide();
   });

   $(".nav_ul li").hover(function() {
       $(this).children().eq(0).addClass('top1');
       $(this).children().eq(1).addClass('show1');
       $(this).children().eq(2).addClass('show1');
   }, function() {
       $(this).children().eq(0).removeClass('top1');
       $(this).children().eq(1).removeClass('show1');
       $(this).children().eq(2).removeClass('show1');
   });

   $(".nav_ul li").click(function(){
      var index = $(this).index();
      var len = $(".nav_ul li").length; 
      for(var i = 0; i<len;i++){
          if(i==index){
            $(".nav_ul li").eq(i).children().eq(0).addClass('top2');
            $(".nav_ul li").eq(i).children().eq(1).addClass('show2');
            $(".nav_ul li").eq(i).children().eq(2).addClass('show2');
          }else{
            $(".nav_ul li").eq(i).children().eq(0).removeClass('top2');
            $(".nav_ul li").eq(i).children().eq(1).removeClass('show2');
            $(".nav_ul li").eq(i).children().eq(2).removeClass('show2');
          }
      }
   });
   
	$index_nav_width=MainMenu.menuCount*95+300;
	
	$(".nav_bj").css({
		width:$index_nav_width+'px'
	});
	
	
}

MainMenu.buildLayout = function() {

	Ext.QuickTips.init();

	MainIndex.window = window;
	MainIndex.__window__ = window;
	
	new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : CONTEXTPATH + 'extMenu?op=1'
		}),
		reader : new Ext.data.JsonReader({}, [ 'id', 'title', 'act','target','menusql','helpact','property']),
		autoLoad : true
	}).on('load', MainMenu.createMenu);

	new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : CONTEXTPATH + 'extMenu?op=0'
		}),
		reader : new Ext.data.JsonReader({}, [ 'id', 'title', 'act','target','menusql','helpact','property']),
		autoLoad : true
	}).on('load', MainMenu.createHomeMenu);
}; 

/*
 * ======= MainIndex ========
 */

var MainIndex = {
	tab : null,
	tab_remove_handlers : {},
	tab_change_handlers : {},
	tab_activated_handlers : {},
	preMsg : "",
	windmsg : null,
	animateMap : {},
	init : function() {
		
		MainIndex.showToolbar(0);
		MainIndex.buildLayout();
		
		
		MainIndex.showTime();
		var refreshTimer;
		function refreshTime(){
			MainIndex.showTime();
			clearTimeout(refreshTimer);
			refreshTimer = setTimeout(refreshTime,60*1000);
		}
		refreshTime();
	
		
		var refreshTipTimer;
		function refreshTip(){
			clearTimeout(refreshTipTimer);
			MainIndex.refreshTip();
			refreshTipTimer = setTimeout(refreshTip,60*1000);
		}
		
		refreshTip();
		
	},
	blink : {
		prefix : '您有新消息．',
		hasPrefix : false,
		timer : null
	},
	isToolbarShow:false,
	toolbarStyle:'numTip',
	toolsMap : {},
	toolsMap2 : {},
	curToolsMap : {},
	MsgMap:{},
	wcache:{id:"",content:"",finger:"",person:""}
};


MainIndex.refreshTip=function(){
	
	if(MainIndex.toolbarStyle!="numTip"){
		return;
	}
	
	Ext.Ajax.request({
		method:'POST',
		url: MATECH_SYSTEM_WEB_ROOT+'info.do?method=mainCount',
		success:function (response,options) {
			var t = response.responseText ;
			var menuList = Ext.util.JSON.decode(t);
			for(var i = 0 ;i<menuList.length;i++){
				var menu = menuList[i];
				if(menu.menucount && menu.menucount != ''){
					MainIndex.MsgMap["num-"+menu.id]=menu.menucount;
				}else{
					MainIndex.MsgMap["num-"+menu.id]=0;
				}				
			}
			
			for(var _obj in MainIndex.toolsMap2){
				var _menuNum=MainIndex.MsgMap["num-"+_obj];
				if(_menuNum && parseInt(_menuNum)>0){
					MainIndex.showToolbarNumTip(_obj,_menuNum)	
				}else{
					MainIndex.showToolbarNumTip(_obj,0)	
				}
			}
			
		},
		failure:function (response,options) {
			return false ;
		}
	});	
	
}

MainIndex.Layout=function(_width,_height){
	
	var headHeight=84+30;
	
	var docsize = DomUtil.init().getDocumentSize();
	var docWidth=_width||docsize.width;
	var docHeight=_height||docsize.height;
	
	var $index_body = $("#homeIframe");
	var $index_body_width=docWidth;
	var $index_body_height=docsize.height-headHeight;
	
	console.log("docsize.height="+docsize.height);
	
	if(MainIndex.isToolbarShow){
		$index_body_height=docsize.height-headHeight-56;
	}
	
	$index_body.css({
		width:$index_body_width+'px',
		height:$index_body_height + 'px'
	});
	
	$(".indexnav").css({
		width:$index_body_width+'px'
	});
	
//	var $index_toolbar_width=$index_body_width-400-65-20;
//	$("#index-toolbar").css({
//		width:$index_toolbar_width+'px'
//	});
	
	MainIndex.toolbarLayout();
};

MainIndex.showTime=function(){
	$.ajax({
		cache: false,
		type: "POST",
		url:CONTEXTPATH+"/AS_SYSTEM/jinganDateTime.jsp?&rand="+Math.random(),
		async:true,
		error: function(request) {
		},
		success: function(data) {
			var result=unescape(data);
			var dates=result.split(" ");
			
			var week;
			var curDate=new Date(dates[0]);
			
			if(curDate.getDay()==0) week="周日"
			if(curDate.getDay()==1) week="周一"
			if(curDate.getDay()==2) week="周二"
			if(curDate.getDay()==3) week="周三"
			if(curDate.getDay()==4) week="周四"
			if(curDate.getDay()==5) week="周五"
			if(curDate.getDay()==6) week="周六"
				
			var html=" <div>"+dates[0]+"</div><div><span> "+week+"</span><span> "+dates[1].substr(0,5)+"</span></div>";
			
			$("#index-toolbar-time").html(html);
			
		}
	});
}

function MainToolbar(id,name){
	var toolbar=this;
	
	toolbar.menuId="";
	toolbar.id=id;
	toolbar.name=name;
	toolbar.title=name;
	toolbar.icon="";
	toolbar.display=false;
	toolbar.isSysBar=false;
	toolbar.url="";
	toolbar.width=98;
	toolbar.height=50;
	
	toolbar.setMenuId=function(menuId){
		toolbar.menuId=menuId;
	};	
	toolbar.setTitle=function(title){
		toolbar.title=title;
	};
	toolbar.setIcon=function(icon){
		toolbar.icon=icon;
	};
	toolbar.setDisplay=function(display){
		toolbar.display=display;
	};	
	toolbar.setIsSysBar=function(isSysBar){
		toolbar.isSysBar=isSysBar;
	};	
	toolbar.setUrl=function(url){
		toolbar.url=url;
	};
	
	toolbar.temple='<li id="li_${id}" class="pull-left" style="display:${display};" onclick="MainIndex.toolbarClick.call(this);" ><img src="${icon}" /><div class="nav_txt"><span>${title}</span></div><div id="tip_${id}" class="bacbox bac"></div><div id="ts_${id}" class="ts_num" style="display:none;"></div></li>';	
	
	toolbar.getHtml=function(){
		var tmp=toolbar.temple;
		
		tmp=tmp.replace(/\$\{id\}/g,toolbar.id);
		tmp=tmp.replace(/\$\{title\}/g,toolbar.title);
		tmp=tmp.replace(/\$\{icon\}/g,toolbar.icon);
		if(toolbar.display){
			tmp=tmp.replace(/\$\{display\}/g,"block");
		}else{
			tmp=tmp.replace(/\$\{display\}/g,"none");	
		}
		
		return tmp;
	};
	
	toolbar.jdom=function(){
		return $("#li_"+toolbar.id);
	};
	
	toolbar.show=function(){
		$("#li_"+toolbar.id).css("display","block");
		toolbar.display=true;
	};
	
	toolbar.hide=function(){
		$("#li_"+toolbar.id).css("display","none");
		toolbar.display=false;
	};	
	
	toolbar.showNumTip=function(_num){
		if(MainIndex.toolbarStyle!="numTip"){
			return;
		}
		if(parseInt(_num)>0){
			$("#ts_"+toolbar.id).html(_num);
			$("#ts_"+toolbar.id).css("display","block");
		}else{
			$("#ts_"+toolbar.id).html("");
			$("#ts_"+toolbar.id).css("display","none");			
		}
	};
	
	toolbar.showEndTip=function(_num){
		if(MainIndex.toolbarStyle!="endTip"){
			return;
		}		
		if(parseInt(_num)>0){
			$("#ts_"+toolbar.id).html("√");
			$("#ts_"+toolbar.id).css("display","block");
		}else{
			$("#ts_"+toolbar.id).html("");
			$("#ts_"+toolbar.id).css("display","none");			
		}
	};	
	
}

MainIndex.toolbarClick=function(){
	var id=this.id;
	var toolbarId=id.substr(3);
	
	var toolbar=MainIndex.toolsMap[toolbarId];
	var menuId=toolbar.menuId||toolbar.id;
    
	var _node={'ryxx':'RYDA','rsjc':'RSJC','sdnj':'NIAOJ','xxcj':'XXCJ','jdhs':'DHS','xunw':'SXS','lsdl':'DLBAQ','rycl':'AQCZ'};
	
	if(toolbar.url==""){
		
	}else{
		var curPersonId=MainIndex.animateMap["curPersonId"];
		if(curPersonId && _node[toolbarId]){
			MainIndex.animateMap["curToolbarId"]=_node[toolbarId];
		}else{
			MainIndex.openTab(menuId,toolbar.name,toolbar.url,"");
		}
	}
	
}

MainIndex.buildLayout = function() {

	var dbspTool=new MainToolbar("dbsp","待办审批");
	dbspTool.setMenuId("10001614");
	dbspTool.setIcon(CONTEXTPATH+"share/images/main/icon1.png");
	dbspTool.setIsSysBar(true);
	dbspTool.setUrl(CONTEXTPATH+"flowWork.do?method=caseAuditList");
	MainIndex.toolsMap["dbsp"]=dbspTool;
	MainIndex.toolsMap2["10001614"]=dbspTool;
	MainIndex.addToolbar(dbspTool);
	
	
	var xjdaTool=new MainToolbar("ryxx","人员信息");
	xjdaTool.setMenuId("10001615");
	xjdaTool.setIcon(CONTEXTPATH+"share/images/main/icon2.png");
	xjdaTool.setUrl(CONTEXTPATH+"jingan.do?method=caseInfoList&formType=RYDA");
	MainIndex.toolsMap["ryxx"]=xjdaTool;
	MainIndex.toolsMap2["10001615"]=xjdaTool;
	MainIndex.addToolbar(xjdaTool);
	
	var rsjcTool=new MainToolbar("rsjc","人身检查");
	rsjcTool.setMenuId("10001616");
	rsjcTool.setIcon(CONTEXTPATH+"share/images/main/icon3.png");
	rsjcTool.setUrl(CONTEXTPATH+"jingan.do?method=caseInfoList&formType=RSJC");
	MainIndex.toolsMap["rsjc"]=rsjcTool;
	MainIndex.toolsMap2["10001616"]=rsjcTool;
	MainIndex.addToolbar(rsjcTool);
	
	var sdnjTool=new MainToolbar("sdnj","涉毒尿检");
	sdnjTool.setMenuId("10001626");
	sdnjTool.setIcon(CONTEXTPATH+"share/images/main/icon4.png");
	sdnjTool.setUrl(CONTEXTPATH+"jingan.do?method=casePersonUrineItemList&formType=NIAOJ");
	MainIndex.toolsMap["sdnj"]=sdnjTool;
	MainIndex.toolsMap2["10001626"]=sdnjTool;
	MainIndex.addToolbar(sdnjTool);	
	
	var xxcjTool=new MainToolbar("xxcj","信息采集");
	xxcjTool.setMenuId("10001617");
	xxcjTool.setIcon(CONTEXTPATH+"share/images/main/icon5.png");
	xxcjTool.setUrl(CONTEXTPATH+"jingan.do?method=caseInfoList&formType=XXCJ");
	MainIndex.toolsMap["xxcj"]=xxcjTool;
	MainIndex.toolsMap2["10001617"]=xxcjTool;
	MainIndex.addToolbar(xxcjTool);	
	
	var jdhsTool=new MainToolbar("jdhs","进等候室");
	jdhsTool.setMenuId("10001622");
	jdhsTool.setIcon(CONTEXTPATH+"share/images/main/icon6.png");
	jdhsTool.setUrl(CONTEXTPATH+"jingan.do?method=caseInfoList&formType=DHS");
	MainIndex.toolsMap["jdhs"]=jdhsTool;
	MainIndex.toolsMap2["10001622"]=jdhsTool;
	MainIndex.addToolbar(jdhsTool);		
	
	var xunwTool=new MainToolbar("xunw","讯问询问");
	xunwTool.setMenuId("10001618");
	xunwTool.setIcon(CONTEXTPATH+"share/images/main/icon8.png");
	xunwTool.setUrl(CONTEXTPATH+"jingan.do?method=caseInfoList&formType=SXS");
	MainIndex.toolsMap["xunw"]=xunwTool;
	MainIndex.toolsMap2["10001618"]=xunwTool;
	MainIndex.addToolbar(xunwTool);
	
	var lsdlTool=new MainToolbar("lsdl","临时带离");
	lsdlTool.setMenuId("10001623");
	lsdlTool.setIcon(CONTEXTPATH+"share/images/main/icon9.png");
	lsdlTool.setUrl(CONTEXTPATH+"jingan.do?method=casePersonOutList&formType=DLBAQ");
	MainIndex.toolsMap["lsdl"]=lsdlTool;
	MainIndex.toolsMap2["10001623"]=lsdlTool;
	MainIndex.addToolbar(lsdlTool);
	
	var ryclTool=new MainToolbar("rycl","人员处理");
	ryclTool.setMenuId("10001619");
	ryclTool.setIcon(CONTEXTPATH+"share/images/main/icon10.png");
	ryclTool.setUrl(CONTEXTPATH+"jingan.do?method=caseInfoList&formType=AQCZ");
	MainIndex.toolsMap["rycl"]=ryclTool;
	MainIndex.toolsMap2["10001619"]=ryclTool;
	MainIndex.addToolbar(ryclTool);
	
	var zfspTool=new MainToolbar("zfsp","执法视频");
	zfspTool.setMenuId("10001627");
	zfspTool.setIcon(CONTEXTPATH+"share/images/main/icon11.png");
	zfspTool.setUrl(CONTEXTPATH+"jingan.do?method=caseInfoList&formType=ZFSP");
	zfspTool.setIsSysBar(true);
	MainIndex.toolsMap["zfsp"]=zfspTool;
	MainIndex.toolsMap2["10001627"]=zfspTool;
	MainIndex.addToolbar(zfspTool);

	var wsdyTool=new MainToolbar("wsdy","文书打印");
	wsdyTool.setMenuId("10001620");
	wsdyTool.setIcon(CONTEXTPATH+"share/images/main/icon12.png");
	wsdyTool.setUrl(CONTEXTPATH+"jingan.do?method=casePrintList&formType=PRINT");
	wsdyTool.setIsSysBar(true);
	MainIndex.toolsMap["wsdy"]=wsdyTool;
	MainIndex.toolsMap2["10001620"]=wsdyTool;
	MainIndex.addToolbar(wsdyTool);	

	var sjcxTool=new MainToolbar("sjcx","数据查询");
	sjcxTool.setMenuId("10001701");
	sjcxTool.setIcon(CONTEXTPATH+"share/images/main/icon13.png");
	sjcxTool.setUrl(CONTEXTPATH+"organizeReport.do?method=orgCaseMain");
	sjcxTool.setIsSysBar(true);
	MainIndex.toolsMap["sjcx"]=sjcxTool;
	MainIndex.toolsMap2["10001701"]=sjcxTool;
	MainIndex.addToolbar(sjcxTool);		
	
	var sdxxTool=new MainToolbar("sdxx","我的提醒");
	sdxxTool.setMenuId("10001675");
	sdxxTool.setIcon(CONTEXTPATH+"share/images/main/icon14.png");
	sdxxTool.setUrl(CONTEXTPATH+"flowWork.do?method=myRemindList");
	sdxxTool.setIsSysBar(true);
	MainIndex.toolsMap["sdxx"]=sdxxTool;
	MainIndex.toolsMap2["10001675"]=sdxxTool;
	MainIndex.addToolbar(sdxxTool);	
	
}; 

MainIndex.showToolbar= function(isShow){
	
	if(isShow == 0){
		$(".nav_bottom").hide();
		MainIndex.isToolbarShow=false;
	}else{
		$(".nav_bottom").show();
		MainIndex.isToolbarShow=true;
	}
}

MainIndex.showFlowToolbar = function() {
	
	MainIndex.showToolbar(1);
	
	MainIndex.curToolsMap={};
	
	var curToolbar;
	for(var obj in MainIndex.toolsMap){
		curToolbar=MainIndex.toolsMap[obj];
		
		if(curToolbar.isSysBar){
			curToolbar.hide();
		}else{
			curToolbar.show();
			MainIndex.curToolsMap[obj]=curToolbar;
		}			
	}
	
	MainIndex.toolbarLayout();
}

MainIndex.showSysToolbar = function() {
	MainIndex.showToolbar(1);
	
	MainIndex.curToolsMap={};
	
	var curToolbar;
	for(var obj in MainIndex.toolsMap){
		curToolbar=MainIndex.toolsMap[obj];
		
		if(curToolbar.isSysBar){
			curToolbar.show();
			MainIndex.curToolsMap[obj]=curToolbar;
		}else{
			curToolbar.hide();
		}			
	}	
	
	MainIndex.toolbarLayout();
}

MainIndex.showAllToolbar = function() {
	MainIndex.showToolbar(1);
	
	MainIndex.curToolsMap={};
	
	var curToolbar;
	for(var obj in MainIndex.toolsMap){
		curToolbar=MainIndex.toolsMap[obj];
		curToolbar.show();	
		MainIndex.curToolsMap[obj]=curToolbar;
	}	
	
	MainIndex.toolbarLayout();
}

MainIndex.hideAllToolbar = function() {
	MainIndex.showToolbar(1);
	
	MainIndex.curToolsMap={};
	
	var curToolbar;
	for(var obj in MainIndex.toolsMap){
		curToolbar=MainIndex.toolsMap[obj];
		curToolbar.hide();	
	}	

}

MainIndex.setToolbarStyle=function(_style){
	_style=_style||"numTip";
	
	MainIndex.toolbarStyle=_style;
	
	if(_style=="numTip"){
		for(var obj in MainIndex.toolsMap2){
			MainIndex.toolsMap2[obj].showNumTip(0);
		}		
		MainIndex.refreshTip();
	}
	
}

MainIndex.showToolbarNumTip = function(_id,_num) {
	
	var curToolbar=MainIndex.toolsMap2[_id];
	if(curToolbar){
		curToolbar.showNumTip(_num);
	}
}

MainIndex.showToolbarEndTip = function(_id,_num) {
	var curToolbar=MainIndex.toolsMap[_id];
	if(curToolbar){
		curToolbar.showEndTip(_num);
	}
}

MainIndex.toolbarLayout = function() {
	
	$toolbarWidth=parseInt($("#index-toolbar").css("width"));
	$toolbarMaxCount=parseInt($toolbarWidth/100);
	
	var toolbarCount=0;
	
	var curToolbar;
	for(var obj in MainIndex.curToolsMap){
		curToolbar=MainIndex.curToolsMap[obj];
		curToolbar.show();
		
		toolbarCount=toolbarCount+1;
		
		if(toolbarCount>$toolbarMaxCount){
			curToolbar.hide();			
		}
	}	
}

MainIndex.addToolbar = function(toolbar){
	var jdom=toolbar.jdom();
	if(jdom.length > 0){
		jdom.css("display","block");
	}else{
		$("#index-toolbar-ul").append(toolbar.getHtml());
	}	
}

MainIndex.getMainTab = function(){
	var _MainTab=MainIndex.tab;
	if(_MainTab==null){
		_MainTab=MainIndex.tab=Ext.get("homeIframe").dom;
	}
	return _MainTab;
}
/** 打开用户的默认页面 */
MainIndex.activateUserIndex = function(_ftype){
	var ftype=_ftype||"home";
	
	if(MainIndex.tab==null){
		MainIndex.tab=Ext.get("homeIframe").dom;
	}
	
	var id="homeIframe";
	var name="我的首页";
	var url=CONTEXTPATH+"info.do?method=home";
	var target="";
	
	if(ftype=="home"){
		$("#homeIframe").attr("menuid","homepage");
		MainIndex.openTab(id,name,url,target);
	}else if(ftype=="xjda"){
		id="10001615";
		name="新建档案";
		url=CONTEXTPATH+"jingan.do?method=casePersonEdit&editType=add";
		$("#homeIframe").attr("menuid","10001615");
		
		MainIndex.openTab(id,name,url,target);
		
	}else if(ftype=="curnode"){
		MainIndex.tab.src=MainIndex.tab.src+"&rand="+Math.random();
	}
	
};

MainIndex.setCurNode = function(menuid,menuname){
	
	$("#index-curnode-name").html(menuname);
	$("#index-curnode-name").attr("menuid",menuid);
	
	
	var toolbarType="other";
	if(menuid=="homeIframe"){
		toolbarType="none";
	}else{
		var menuData=MainMenu.map['submenu_'+menuid]
		if(menuData && menuData.property!=""){
			toolbarType=menuData.property
		}		
	}
	
	if(toolbarType=="none"){
		MainIndex.showToolbar(0);
	}else if(toolbarType=="sysbar"){
		MainIndex.showSysToolbar();
	}else if(toolbarType=="flowbar"){
		MainIndex.showFlowToolbar();
	}else if(toolbarType=="all"){
		MainIndex.showAllToolbar();
	}else{
		MainIndex.hideAllToolbar();
	}
	
	MainIndex.Layout();
};

MainIndex.exitSystem = function(forceExit) {
	if (forceExit == true){
		var async = navigator.userAgent.indexOf('Firefox') < 0; 
		jQuery.ajax({
			url : CONTEXTPATH + "login.do?method=exitSystem&random=" + Math.random(),
			type : 'POST',
			async : async,
			success : function(r) {
			
			}
		});
		 return; 
		
	} 
	if (window.confirm("是否退出系统？")) {
	    
		window.location.href = CONTEXTPATH + 'login.do?method=exitSystem';
		
	}
};

if (window.openTab){
	window.__openTab = window.openTab;
}


MainIndex.evalJs = function(){   //点击菜单执行脚本的函数

	var record = MainMenu.map[this.id];
	if(record.target == "myscript"){
		try{
			if(record.menusql !=undefined && record.menusql !=""){
				eval(record.menusql);
				}else{
					alert("没有可执行脚本！");
					return;
				}
		}catch(e){
			alert(e.name+":"+e.message);
		}
	}else{
		switch(record.level){
		case 1:
			if(record.act !=""){
				MainIndex.openTab(record.id,record.title,record.act,record.target);
			}else{
				return;
			}
            break;
		case 2:
		case 3:
			if(record.href !=""){
				MainIndex.openTab(record.id,record.text,record.href,record.target);
			}else{
				return;
			}
			break;
		default:
			  return;
		}
	}
};


function endWith(Str,endStr){
    var d=Str.length-endStr.length;
    return (d>=0&&Str.lastIndexOf(endStr)==d)
}


MainIndex.openTab = function(id, name, url, target, post, closable, mode) {

	if (typeof closable == 'undefined'){
		closable = true; 
	}
	
	MainIndex.animateMap["curPersonId"]="";
	
    var n = MainIndex.tab.getAttribute("menuid"); 
	var menuId = id;
	
	if (target == 'newWin'){
		window.open(url, name);
		return;
	}

	try {
	    if (n) {  
	    	
	    	if(endWith(url,".jsp")){
	    		MainIndex.tab.src=url+"?&random="+Math.random();
	    	}else{
	    		MainIndex.tab.src=url+"&random="+Math.random();
	    	}
	    	
	    	$("#homeIframe").attr("menuid",menuId);
	    	$("#homeIframe").attr("menuname",name);
	    	
	    	MainIndex.setCurNode(id,name);
	    	
	    	MainIndex.setToolbarStyle("numTip");

	    }  
	} catch (e){
		
	}

}; 

MainIndex.openTab2 = function(id, name, url, target, post, closable, mode) {
	
	MainIndex.openTab(id, name, url, target, post, closable, mode);

};


