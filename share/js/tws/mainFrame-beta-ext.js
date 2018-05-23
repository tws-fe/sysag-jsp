var iframequanju;//iframe全局
var tab;
var MainIndexWindow = window;
var MainMenu = {
	ani_duration : 300,
	timer : {},
	init : function() {
		MainMenu.buildLayout();
		MainMenu.title = MainIndexWindow.document.title;	
	}, // init()
	hiddenHover : function() {}, 
	map : {}
};

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
		
		MainIndex.showToolbar(1);
		MainIndex.buildLayout();
		MainIndex.Layout();
		
		MainIndex.showTime();
		var refreshTimer;
		function refreshTime(){
			MainIndex.showTime();
			clearTimeout(refreshTimer);
			refreshTimer = setTimeout(refreshTime,60*1000);
		}
		refreshTime();
	
		/*
		var refreshTipTimer;
		function refreshTip(){
			clearTimeout(refreshTipTimer);
			MainIndex.refreshTip();
			refreshTipTimer = setTimeout(refreshTip,60*1000);
		}
		
		refreshTip();
		*/
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

/*
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
*/

MainIndex.Layout=function(_width,_height){
	
	var headHeight=84+45;
	
	var docsize = DomUtil.init().getDocumentSize();
	var docWidth=_width||docsize.width;
	var docHeight=_height||docsize.height;
	
	var $index_body = $("#homeIframe");
	var $index_body_width=docWidth;
	var $index_body_height=docsize.height-headHeight;
	
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
	
	Ext.QuickTips.init();
	
	var center;
	
	MainIndex.tab = tab = new Ext.TabPanel({
		id : 'mainFrameTab',
		region : 'center',
		renderTo : 'tabDiv',
		deferredRender : false,
		activeTab : 0,
		resizeTabs : true, // turn on tab resizing
		minTabWidth : 100,
		tabWidth : $index_body_width,
		height : $index_body_height,
		enableTabScroll : true,
		plugins : new Ext.ux.TabCloseMenu()
	});
	
	MainIndex.tab.on('beforeremove', function(tabpanel, item) {		
		var ret = true;
		var handler = MainIndex.tab_remove_handlers[item.id];		
		if (handler){
			try {
				ret = handler.call(tabpanel, tabpanel, item);
				if (typeof ret == 'undefined'){
					ret = true;
				}
				if (false != ret){
					MainIndex.tab_remove_handlers[item.id] = null;
					delete handler;
				}
			} catch (ex){
				if (window["console"]){
				     console.log(ex);
				   }
			}
		}
		
		return ret;
	});
	
	var iframeheight;//iframe的高度
	var IsOnresize;
	MainIndex.tab.on("tabchange", function(tabpanel, item) {

		iframequanju="frame"+item.id;
		var tabid="frame"+item.id;
		var iframe = document.getElementById(tabid);
		//判断iframe的高度跟之前的记录的高度一不一样，高度不一样证明浏览器的大小发生了变化，则刷新页面
		if(tabid.indexOf("frameext-comp")<0){
			//兼容浏览器缩放后，点击列表，对列表进行刷新
			if(IsOnresize){
				$('#'+tabid).attr('src', $('#'+tabid).attr('src'));
			}
		}
		var handler = MainIndex.tab_activated_handlers[item.id];
		try {
			if (handler){
				var src = $('#'+tabid).attr('src');
				if(!src){
					//当第一次加载的其他标签url为空的时候重新赋值
					$('#'+tabid).attr('src', $('#'+tabid).attr('datasrc'));
				}
				handler.call(tabpanel, tabpanel, item);
				delete MainIndex.tab_activated_handlers[item.id];
			}		
			handler = MainIndex.tab_change_handlers[item.id];
			if (handler){
				handler.call(tabpanel, tabpanel, item);
			}
		} catch (ex){
			if (window["console"]){
					console.log(ex);
			    }
		}
		
		jQuery('.x-tab-strip-inner').css('width','auto');
		
		console.log("tabchange:"+tabpanel.getId());
	});
	
	MainIndex.toolbarLayout();
	
	MainIndex.activateUserIndex();
	
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

	if(userRoleName.indexOf("所领导")>=0||userRoleName.indexOf("系统管理员")>=0){
		var ajjgTool=new MainToolbar("ajjg","案件监管");
		ajjgTool.setMenuId("10001625");
		ajjgTool.setIcon(CONTEXTPATH+"share/homeImg/ajjg.png");
		ajjgTool.setUrl(CONTEXTPATH+"getCase.do?method=toCaseSupervise");
		ajjgTool.setIsSysBar(true);
		MainIndex.toolsMap["ajjg"]=ajjgTool;
		MainIndex.toolsMap2["10001625"]=ajjgTool;
		MainIndex.addToolbar(ajjgTool);
		
		var wdgzTool=new MainToolbar("wdgz","我的关注");
		wdgzTool.setMenuId("10001626");
		wdgzTool.setIcon(CONTEXTPATH+"share/homeImg/wdgz.png");
		wdgzTool.setUrl(CONTEXTPATH+"getCase.do?method=toSeeMyFollow");
		wdgzTool.setIsSysBar(true);
		MainIndex.toolsMap["wdgz"]=wdgzTool;
		MainIndex.toolsMap2["10001626"]=wdgzTool;
		MainIndex.addToolbar(wdgzTool);
		
		var ajqrbTool=new MainToolbar("ajqrb","案件确认表");
		ajqrbTool.setMenuId("10001630");
		ajqrbTool.setIcon(CONTEXTPATH+"share/homeImg/ajqrb.png");
		ajqrbTool.setUrl(CONTEXTPATH+"getCase.do?method=toCaseConfirm");
		ajqrbTool.setIsSysBar(true);
		MainIndex.toolsMap["ajqrb"]=ajqrbTool;
		MainIndex.toolsMap2["10001630"]=ajqrbTool;		
		MainIndex.addToolbar(ajqrbTool);

	}else if(userRoleName.indexOf("探长")>=0){
		var ajjgTool=new MainToolbar("ajjg","案件监管");
		ajjgTool.setMenuId("10001625");
		ajjgTool.setIcon(CONTEXTPATH+"share/homeImg/ajjg.png");
		ajjgTool.setUrl(CONTEXTPATH+"getCase.do?method=toCaseSupervise");
		ajjgTool.setIsSysBar(true);
		MainIndex.toolsMap["ajjg"]=ajjgTool;
		MainIndex.toolsMap2["10001625"]=ajjgTool;
		MainIndex.addToolbar(ajjgTool);
		
		var wdgzTool=new MainToolbar("wdgz","我的关注");
		wdgzTool.setMenuId("10001626");
		wdgzTool.setIcon(CONTEXTPATH+"share/homeImg/wdgz.png");
		wdgzTool.setUrl(CONTEXTPATH+"getCase.do?method=toSeeMyFollow");
		wdgzTool.setIsSysBar(true);
		MainIndex.toolsMap["wdgz"]=wdgzTool;
		MainIndex.toolsMap2["10001626"]=wdgzTool;
		MainIndex.addToolbar(wdgzTool);
		
		var wdajTool=new MainToolbar("wdaj","我的案件");
		wdajTool.setMenuId("10001627");
		wdajTool.setIcon(CONTEXTPATH+"share/homeImg/wdaj.png");
		wdajTool.setUrl(CONTEXTPATH+"getCase.do?method=toMyCaseList");
		wdajTool.setIsSysBar(true);
		MainIndex.toolsMap["wdaj"]=wdajTool;
		MainIndex.toolsMap2["10001627"]=wdajTool;
		MainIndex.addToolbar(wdajTool);
		
		var wdjfTool=new MainToolbar("wdjf","我的接访");
		wdjfTool.setMenuId("10001628");
		wdjfTool.setIcon(CONTEXTPATH+"share/homeImg/wdjf.png");
		wdjfTool.setUrl(CONTEXTPATH+"getCaseVisit.do?method=toVisitEdit");
		wdjfTool.setIsSysBar(true);
		MainIndex.toolsMap["wdjf"]=wdjfTool;
		MainIndex.toolsMap2["10001628"]=wdjfTool;
		MainIndex.addToolbar(wdjfTool);
		
		var wdlfTool=new MainToolbar("wdlf","我的来访");
		wdlfTool.setMenuId("10001629");
		wdlfTool.setIcon(CONTEXTPATH+"share/homeImg/wdlf.png");
		wdlfTool.setUrl(CONTEXTPATH+"getCaseVisit.do?method=toMyCaseVisit");
		wdlfTool.setIsSysBar(true);
		MainIndex.toolsMap["wdlf"]=wdlfTool;
		MainIndex.toolsMap2["10001629"]=wdlfTool;
		MainIndex.addToolbar(wdlfTool);
		
		var ajqrbTool=new MainToolbar("ajqrb","案件确认表");
		ajqrbTool.setMenuId("10001630");
		ajqrbTool.setIcon(CONTEXTPATH+"share/homeImg/ajqrb.png");
		ajqrbTool.setUrl(CONTEXTPATH+"getCase.do?method=toCaseConfirm");
		ajqrbTool.setIsSysBar(true);
		MainIndex.toolsMap["ajqrb"]=ajqrbTool;
		MainIndex.toolsMap2["10001630"]=ajqrbTool;		
		MainIndex.addToolbar(ajqrbTool);
		
		/*var kywpTool=new MainToolbar("kywp","扣押物品");
		kywpTool.setMenuId("10001631");
		kywpTool.setIcon(CONTEXTPATH+"share/homeImg/kywp.png");
		kywpTool.setUrl(CONTEXTPATH+"jingan.do?method=caseInfoList&formType=ZFSP");
		kywpTool.setIsSysBar(true);
		MainIndex.toolsMap["kywp"]=kywpTool;
		MainIndex.toolsMap2["10001631"]=kywpTool;		
		MainIndex.addToolbar(kywpTool);*/
		
	} else if(userRoleName.indexOf("案管专员")>=0){
		var xzjaTool=new MainToolbar("xzja","行政交案确认");
		xzjaTool.setMenuId("10001620");
		xzjaTool.setIcon(CONTEXTPATH+"share/homeImg/xzja.png");
		xzjaTool.setUrl(CONTEXTPATH+"getCase.do?method=toXZHandCase");
		xzjaTool.setIsSysBar(true);
		MainIndex.toolsMap["xzja"]=xzjaTool;
		MainIndex.toolsMap2["10001620"]=xzjaTool;
		MainIndex.addToolbar(xzjaTool);
		
		var xzclTool=new MainToolbar("xzcl","行政材料");
		xzclTool.setMenuId("10001621");
		xzclTool.setIcon(CONTEXTPATH+"share/homeImg/xzcl.png");
		xzclTool.setUrl(CONTEXTPATH+"getCase.do?method=toMyCaseList");
		xzclTool.setIsSysBar(true);
		MainIndex.toolsMap["xzcl"]=xzclTool;
		MainIndex.toolsMap2["10001621"]=xzclTool;
		MainIndex.addToolbar(xzclTool);
		
		var xsclTool=new MainToolbar("xscl","刑事材料");
		xsclTool.setMenuId("10001622");
		xsclTool.setIcon(CONTEXTPATH+"share/homeImg/xscl.png");
		xsclTool.setUrl(CONTEXTPATH+"getCase.do?method=toMyCaseList");
		xsclTool.setIsSysBar(true);
		MainIndex.toolsMap["xscl"]=xsclTool;
		MainIndex.toolsMap2["10001622"]=xsclTool;
		MainIndex.addToolbar(xsclTool);
		
		var qtTool=new MainToolbar("qt","其它");
		qtTool.setMenuId("10001623");
		qtTool.setIcon(CONTEXTPATH+"share/homeImg/qt.png");
		qtTool.setUrl(CONTEXTPATH+"getCase.do?method=toMyCaseList");
		qtTool.setIsSysBar(true);
		MainIndex.toolsMap["qt"]=qtTool;
		MainIndex.toolsMap2["10001623"]=qtTool;
		MainIndex.addToolbar(qtTool);
		
		var zkdaTool=new MainToolbar("zkda","在库档案查询");
		zkdaTool.setMenuId("10001624");
		zkdaTool.setIcon(CONTEXTPATH+"share/homeImg/zkda.png");
		zkdaTool.setUrl(CONTEXTPATH+"getCase.do?method=toMyCaseList");
		zkdaTool.setIsSysBar(true);
		MainIndex.toolsMap["zkda"]=zkdaTool;
		MainIndex.toolsMap2["10001624"]=zkdaTool;
		MainIndex.addToolbar(zkdaTool);
		
		/*var kywpTool=new MainToolbar("kywp","扣押物品");
		kywpTool.setMenuId("10001625");
		kywpTool.setIcon(CONTEXTPATH+"share/homeImg/kywp.png");
		kywpTool.setUrl(CONTEXTPATH+"getCase.do?method=toMyCaseList");
		kywpTool.setIsSysBar(true);
		MainIndex.toolsMap["kywp"]=kywpTool;
		MainIndex.toolsMap2["10001625"]=kywpTool;
		MainIndex.addToolbar(kywpTool);*/
		
		var ajjdTool=new MainToolbar("ajjd","案件监督");
		ajjdTool.setMenuId("10001626");
		ajjdTool.setIcon(CONTEXTPATH+"share/homeImg/ajjg.png");
		ajjdTool.setUrl(CONTEXTPATH+"getCase.do?method=toCaseSupervise");
		ajjdTool.setIsSysBar(true);
		MainIndex.toolsMap["ajjd"]=ajjdTool;
		MainIndex.toolsMap2["10001626"]=ajjdTool;
		MainIndex.addToolbar(ajjdTool);

	}else if(userRoleName.indexOf("案审")>=0){
		var asrwTool=new MainToolbar("asrw","案审任务");
		asrwTool.setMenuId("10001630");
		asrwTool.setIcon(CONTEXTPATH+"share/homeImg/ajqrb.png");
		asrwTool.setUrl(CONTEXTPATH+"getCase.do?method=toCaseReview");
		asrwTool.setIsSysBar(true);
		MainIndex.toolsMap["asrw"]=asrwTool;
		MainIndex.toolsMap2["10001630"]=asrwTool;		
		MainIndex.addToolbar(asrwTool);
		
	}else if(userRoleName.indexOf("民警")>=0){
		var wdajTool=new MainToolbar("wdaj","我的案件");
		wdajTool.setMenuId("10001627");
		wdajTool.setIcon(CONTEXTPATH+"share/homeImg/wdaj.png");
		wdajTool.setUrl(CONTEXTPATH+"getCase.do?method=toMyCaseList");
		wdajTool.setIsSysBar(true);
		MainIndex.toolsMap["wdaj"]=wdajTool;
		MainIndex.toolsMap2["10001627"]=wdajTool;
		MainIndex.addToolbar(wdajTool);
		
		var wdjfTool=new MainToolbar("wdjf","我的接访");
		wdjfTool.setMenuId("10001628");
		wdjfTool.setIcon(CONTEXTPATH+"share/homeImg/wdjf.png");
		wdjfTool.setUrl(CONTEXTPATH+"getCaseVisit.do?method=toVisitEdit");
		wdjfTool.setIsSysBar(true);
		MainIndex.toolsMap["wdjf"]=wdjfTool;
		MainIndex.toolsMap2["10001628"]=wdjfTool;
		MainIndex.addToolbar(wdjfTool);
		
		var wdlfTool=new MainToolbar("wdlf","我的来访");
		wdlfTool.setMenuId("10001629");
		wdlfTool.setIcon(CONTEXTPATH+"share/homeImg/wdlf.png");
		wdlfTool.setUrl(CONTEXTPATH+"getCaseVisit.do?method=toMyCaseVisit");
		wdlfTool.setIsSysBar(true);
		MainIndex.toolsMap["wdlf"]=wdlfTool;
		MainIndex.toolsMap2["10001629"]=wdlfTool;
		MainIndex.addToolbar(wdlfTool);
		
		var ajqrbTool=new MainToolbar("ajqrb","案件确认表");
		ajqrbTool.setMenuId("10001630");
		ajqrbTool.setIcon(CONTEXTPATH+"share/homeImg/ajqrb.png");
		ajqrbTool.setUrl(CONTEXTPATH+"getCase.do?method=toCaseConfirm");
		ajqrbTool.setIsSysBar(true);
		MainIndex.toolsMap["ajqrb"]=ajqrbTool;
		MainIndex.toolsMap2["10001630"]=ajqrbTool;		
		MainIndex.addToolbar(ajqrbTool);
		
		/*var kywpTool=new MainToolbar("kywp","扣押物品");
		kywpTool.setMenuId("10001631");
		kywpTool.setIcon(CONTEXTPATH+"share/homeImg/kywp.png");
		kywpTool.setUrl(CONTEXTPATH+"jingan.do?method=caseInfoList&formType=ZFSP");
		kywpTool.setIsSysBar(true);
		MainIndex.toolsMap["kywp"]=kywpTool;
		MainIndex.toolsMap2["10001631"]=kywpTool;		
		MainIndex.addToolbar(kywpTool);*/

	}else{//内勤
		console.log(6);
	}
	
	
	MainIndex.showSysToolbar();
	
	
	
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
		//MainIndex.refreshTip();
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
	return _MainTab;
}

/** 打开用户的默认页面 */
MainIndex.activateUserIndex = function(){

	var ui = userIndex;

	//可以显示多个首页
	for (var i=0;ui!=""&&i<ui.length ;i++) {
		console.log(ui[i].name+"||"+ui[i].act);
		if(i>0){
			//第一次加载的时候，只加载第一个页面，其他页面都不加载
			MainIndex.openTab2(ui[i].name, ui[i].name, ui[i].act, null, null, null);		
		}else{
			MainIndex.openTab(ui[i].name, ui[i].name, ui[i].act, null, null, null);		
		}
		
		if (i > 0){
			MainIndex.addTabActivatedHandler(ui[i].name, (function(tabid){
				return function(){
					setTimeout(function(){
						var frame = window.frames['frame' + tabid];
						
						if (frame.src){
							frame.src = frame.src + ' ';
							
						} else {
							frame.window.location.href = frame.window.location.href + ' ';
							
						}
					}, 300);
				};
			})(ui[i].name));
		}		
	}
	
	MainIndex.tab.setActiveTab(0);
	
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

	var menuId = id;
	
	if (target == 'newWin'){
		window.open(url, name);
		return;
	}
	
	try {
		var n = tab.getComponent(id);
		if (target == 'newTab' && n){
			tab.setActiveTab(n);
			return;
		}
		if (target == 'evernewTab'){
			 if(IsMaxView =="是"){	
				 maxview();
			}
			id += Math.random();
			/*setTimeout( function(){
				var doc = DomUtil.init().getDocumentSize();
				var domutil = DomUtil.init();
				var heightval = doc.height-55+"px";
				var a = domutil.getFrameObjsById('_viewbody').result;
				if (a){
					$(a).css("height",heightval);
				}
				id = id + Math.random();
			},500 );*/
			
		}
		n = tab.add({
			id : id,
			_menuId : menuId,
			title : name,
			closable : closable, // 通过html载入目标页
			html : '<iframe id="frame' + id + '" ' //+ 'name="frame' + id + '" ' +
				+ ' frameborder="0" width="100%" height="99%" src="' + url + '"></iframe>'
		}).show();
		
		/*setTimeout(function(){*/
			// '#mainFrameTab__' + id + 
			jQuery('.x-tab-strip-inner').css('width','auto');
			tab.setActiveTab(n);
			
			if (mode == undefined || mode == 'close-same-title'){
				if (target != 'evernewTab'){
					var tabitems = tab.items.items;
					for(var i = 0; i < tabitems.length; i++){
						if (tabitems[i].title == name && tabitems[i].id != id){
							parent.tab.remove(i);						
						}
					}				
				}
			}
		/*}, 100);*/
		
	} catch (e){
		// window.open(url, '');
	}

}; 

MainIndex.openTab2 = function(id, name, url, target, post, closable, mode) {
	if (typeof closable == 'undefined'){
		closable = true; 
	}
	var menuId = id;
	if (target == 'newWin'){
		window.open(url, name);
		return;
	}
	try {
		var n = tab.getComponent(id);
		if (target == 'newTab' && n){
			tab.setActiveTab(n);
			return;
		}
		if (target == 'evernewTab'){
			 if(IsMaxView =="是"){	
				 maxview();
			}
			id += Math.random();
		}
		n = tab.add({
			id : id,
			_menuId : menuId,
			title : name,
			closable : closable, // 通过html载入目标页
			html : '<iframe id="frame' + id + '" ' //+ 'name="frame' + id + '" ' +
				+ ' frameborder="0" width="100%" height="99%" datasrc="' + url + '"></iframe>'
		}).show();
		
		jQuery('.x-tab-strip-inner').css('width','auto');
		tab.setActiveTab(n);
		
		if (mode == undefined || mode == 'close-same-title'){
			if (target != 'evernewTab'){
				var tabitems = tab.items.items;
				for(var i = 0; i < tabitems.length; i++){
					if (tabitems[i].title == name && tabitems[i].id != id){
						parent.tab.remove(i);						
					}
				}				
			}
		}
	} catch (e){
	}
};

