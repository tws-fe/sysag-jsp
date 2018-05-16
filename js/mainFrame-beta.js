var iframequanju;//iframe全局
var tab;
var maxview;
var minview;
var mtb="2";
var MainIndexWindow = window;
var MainMenu = {
	ani_duration : 300,
	timer : {},
	init : function() {
		MainMenu.buildLayout();
		MainMenu.title = MainIndexWindow.document.title;
	}, // init()
	hiddenHover : function() {
		for (var i = 0;; i++) {
			var hover_cont = MainIndexWindow.document.getElementById('hover_cont_' + i);
			if (!hover_cont) {
				break;
			}
			hover_cont.style.display = 'none';
			MainIndexWindow.document.getElementById('hover_cont_left').style.display = 'none';
			MainIndexWindow.document.getElementById('hover_cont_right').style.display = 'none';
		}
	}, // hiddenHover()

	map : {}
};


var findpor = function(id,heightval){

};

maxview = function(){
	
};

minview = function(){
	
	var threedoc = DomUtil.init().getDocumentSize();
	
	$("#index-head #tabtable").css({"z-index":"9999","position":"relative"});
	$("#index-head #tabDiv").css({"z-index":"9910","width":threedoc.width,"position":"relative"});
	$("#mainFrameTab .x-tab-panel-header").css({"position":"relative"});
	
	var tabPanelHei=threedoc.height-105;

	$(".x-tab-panel-bwrap .x-tab-panel-body").css({"height":tabPanelHei,"width":threedoc.width});
	$(".x-tab-panel-bwrap .x-tab-panel-body .x-panel").css({"width":threedoc.width});
	$(".x-tab-panel-bwrap .x-tab-panel-body .x-panel .x-panel-body").css({"width":threedoc.width,"height":tabPanelHei});

	
	/*
	var domutil = DomUtil.init();
	var a = domutil.getFrameObjsById('_viewbody').result;
	var minviewheight = threedoc.height-55-35-55;//最小化时要减的值
	if (a){
		$(a).find('div').each(function(index,newobj){ 
			if($(newobj).attr("specialDiv")=="true"){
				$(this).css("height",minviewheight+"px");
			} 
		}); 
	}

	var threecontainer = domutil.getFrameObjsById('threecontainer').result;
	if(threecontainer){
		$(threecontainer).css("height",minviewheight-85+"px");
	}*/
};

MainMenu.createMenu = function(store, records) {

	MainMenu.menuCount = records.length;

	// 构造菜单HTML
	var menuHtml = "<div class='nav' id='mainNav'><ul class='ul-menu'>";
	for (var i = 0; i < records.length; i++) {

		var id = records[i].data.id;
		var act = records[i].data.act;
		var title = records[i].data.title;	
        var menusql = records[i].data.menusql;
        var target = records[i].data.target;
    
        records[i].data.level = 1; 
        MainMenu.map['submenu_'+id]=records[i].data;
        
		// 一级菜单
		menuHtml += "<li id='ul-menu-li-" + i + "' class='ul-menu-li'>";
		menuHtml += "<div class='div-cover twin-cover' style='overflow:hidden;white-space: nowrap;text-overflow: ellipsis;'> <font style='font-size:18px' id = 'submenu_" + id + "' onclick = MainIndex.evalJs.call(this);>" + title + "</font></div>";
		menuHtml += "<div class='div-uncover twin-cover'> <font style='font-size:18px' id = 'submenu_" + id + "' onclick = MainIndex.evalJs.call(this);>" + title + "</font></div>";
		menuHtml += "<div class='div-background'>&nbsp;</div>";

		var childHtml = "";
		var noChildHtml = "";
		var bHasnoChild = false;// 标记是否有没有下级菜单的二级菜单

		// 取二三级菜单
		var url = CONTEXTPATH + 'extMenu?op=2&centerId=' + centerId
				+ '&menuid=' + id;
		var oBao = $.ajax({
			url : url,
			async : false
		});
		var resText = oBao.responseText;

		var childRecords = Ext.util.JSON.decode(resText);

		if (childRecords.length == 0)
			continue;

		menuHtml += "<div id='hover_cont_" + i
				+ "' class='hover_cont'><div class='nav_cont'>";

		// 没有儿子的二级菜单
		noChildHtml += "<div class='nav_li'><div class='nav_li_l'>其他</div><div class='nav_li_r'>";
		for (var k = 0; k < childRecords.length; k++) {

			var id = childRecords[k].id;
			var text = childRecords[k].text;
			var act = childRecords[k].href;

			var children = childRecords[k].children;
			var dogid = childRecords[k].dogid;
			var target = childRecords[k].target; // 用于判断是每次是否打开【新窗口、新标签、其它】
			
			childRecords[k].level = 2;
			MainMenu.map['submenu_'+childRecords[k].id] = childRecords[k];

			childHtml += "<div class='nav_li'><div class='nav_li_l'> <font style = 'font-size:13px' id = 'submenu_"+id+"' onclick=MainIndex.evalJs.call(this);>" + text
					+ "</font></div><div class='nav_li_r'>";
			

			if (children == null || children.length == 0) {
				
				noChildHtml += "<span class='link' href='#' id = 'submenu_" + id +"' onclick=MainIndex.evalJs.call(this);>" + text + "</a>";
				if (k < childRecords.length - 1){
					noChildHtml += '．';
				}
				bHasnoChild = true;
			} else {
				// 遍历下级
				for (var j = 0; j < children.length; j++) {
					children[j].level = 3;
					MainMenu.map['submenu_'+children[j].id] = children[j]; 
			
					childHtml += "<span class='link' href='#' id = 'submenu_" + children[j].id +"' onclick=MainIndex.evalJs.call(this);>"
								+ children[j].text + "</span>";
					if (j < children.length - 1){
						childHtml += '．';
					}
				}
			}
			childHtml += "</div></div>";
		}
		noChildHtml += "</div></div>";

		menuHtml += childHtml;
		if (bHasnoChild) {
			menuHtml += noChildHtml
		}

		menuHtml += "</div></div></li>";

	}// 一级菜单循环完
	menuHtml += "</ul></div>"

	MainIndexWindow.document.getElementById("menu").innerHTML = menuHtml;

	MainMenu.hookMenuEvent();
};

MainMenu.hookMenuEvent = function() {
	var docsize = DomUtil.init().getDocumentSize();
	var userAgent = navigator.userAgent;
	var iamIE = userAgent.indexOf('MSIE') >= 0;

	var logo_width = $("#logo").width();
	var logo_height = $("#logo").height();
	
	if (logo_height < 30){
		logo_height = 55;
	}

	$("#tr-logo").css({
		height : logo_height + 'px'
	});
	$(".ul-menu").css({
		height : logo_height + 'px'
	});
	$(".ul-icon").css({
		height : (logo_height) + 'px'
	});
	
	
	
	$(".ul-icon li .top-icon").css( iamIE ? {
		width: '25px',
		height: '25px',
		marginTop : ((logo_height - 30) / 2) + 'px'
	} : {
		marginTop : ((logo_height - 30) / 2) + 'px'
	});
	
	$(".ul-icon li span").css({
		marginTop : ((logo_height - 30) / 2 + 5) + 'px'
	});
	
	

	$("#td-menu").css({
		width : (docsize.width - 200 - 250) + 'px'
	});
	
	

	var first_offset = $($('.ul-menu-li')[0]).offset().left;
	var hover_cont_length = $($('.hover_cont')[0]).width();
	var ul_menu_li_width = 100 / MainMenu.menuCount - 0.35;
	if (ul_menu_li_width > 30){
		ul_menu_li_width = 30;
	}

	var $ul_menu_li = $('.ul-menu-li');
	var $ul_icon_li = $('.ul-icon li');
	var $hover_cont_left = $("#hover_cont_left");
	var $hover_cont_right = $("#hover_cont_right");
	
	$('.ul-menu-li:eq(0)').addClass('ul-menu-li-first');

	// 主菜单布局排位初始化
	$ul_menu_li.css({
		height : logo_height + 'px',
		width : ul_menu_li_width + '%',
		lineHeight : logo_height + 'px'
	});

	$hover_cont_left.css({
		left : '0px',
		top : logo_height + 'px'
	});
	$hover_cont_right.css({
		top : logo_height + 'px'
	});

	$ul_menu_li.each(function(i, u) {
		var $this = $(u);
		var $div_cover = $this.find('.div-cover');
		var $div_uncover = $this.find('.div-uncover');
		var $hover_cont = $this.find('.hover_cont');

		var $this_left = $this.offset().left;
		$div_cover.css({
			width : $this.width() + 'px',
			left : ($this_left - first_offset) + 'px',
			lineHeight : logo_height + 'px' 
		});
		$div_uncover.css({
			width : $this.width() + 'px',
			left : ($this_left - first_offset) + 'px',
			lineHeight : logo_height + 'px'
		});

		if ($this_left + hover_cont_length > docsize.width) {
			$hover_cont.width(docsize.width - $this_left);
		}
		
		$hover_cont.css({
			left : ($this_left - first_offset) + 'px',
			top : logo_height + 'px'
		});
	});

	
	// 主菜单事件
	function $ul_menu_li_appear(e) {
	
		MainMenu.hiddenHover();
		
		if (MainMenu.timer[e.currentTarget.id]){
			clearTimeout(MainMenu.timer[e.currentTarget.id]);
			MainMenu.timer[e.currentTarget.id] = null;
		}
		
		var $this = $(e.currentTarget);
		var $div_cover = $this.find('.div-cover');
		var $div_uncover = $this.find('.div-uncover');
		var $hover_cont = $this.find('.hover_cont');
		var $div_background = $this.find('.div-background');

		var this_left = $this.offset().left;

		var hover_cont_width = $hover_cont.width();
		var hover_cont_height = $hover_cont.height();

		$hover_cont.css({
			display : 'block'
		});
		try {
			var hover_cont_top = $hover_cont.offset().top;
			$hover_cont_left.css({
				display : 'none',
				width : (this_left + 1) + 'px',
				height : hover_cont_height,
				top : hover_cont_top + 'px'
			});
			$hover_cont_right.css({
				display : 'none',
				width : (docsize.width - hover_cont_width - this_left) + 'px',
				height : hover_cont_height + 'px',
				left : (this_left + hover_cont_width - 1) + 'px',
				top : hover_cont_top + 'px'
			});
		} catch (e){
		}

		$div_uncover.css({
			display : 'block'
		});

		$div_uncover.animate({
			top : '0px',
			opacity : 1
		}, {
			queue : false , 
			duration : MainMenu.ani_duration
		});
		$div_background.animate({
			opacity : 1
		}, {queue : false , duration : MainMenu.ani_duration});
		
	}
	;

	
	function $ul_menu_li_disappear(e) {
		
		
		MainMenu.hiddenHover();
		
		
		var $this = $(e.currentTarget);
		var $div_cover = $this.find('.div-cover');
		var $div_uncover = $this.find('.div-uncover');
		var $div_background = $this.find('.div-background');
		var $hover_cont = $this.find('.hover_cont');

		var display_none = {
			display : 'none'
		};
		$hover_cont.css(display_none);
		$hover_cont_left.css(display_none);
		$hover_cont_right.css(display_none);

		
		$div_uncover.animate({
			top : (logo_height - 16) + 'px',
			opacity : 0
		}, {
			queue : false , 
			duration : MainMenu.ani_duration
		});
		
		$div_background.animate({
			opacity : 0
		}, {queue : false , duration : MainMenu.ani_duration});
		
		if (!MainMenu.timer[e.currentTarget.id]){
			
			MainMenu.timer[e.currentTarget.id] = setTimeout(function(){
				$div_uncover.css({ display : 'none' });
				MainMenu.timer[e.currentTarget.id] = null;
			}, MainMenu.ani_duration);
			
		}
		
	} // $ul_menu_li_disappear

	$ul_menu_li.on('mouseover', function(e) {
		//如果系统变量为2的话就是点击弹出菜单
		if(menu_on=="2")return ;
		if (!DomUtil.init().$checkHover(e)) {
			return;
		}
		$ul_menu_li_appear(e);
		
	});

	$ul_menu_li.on('mouseout', function(e) {
		if (!DomUtil.init().$checkHover(e)) {
			return;
		}
		$ul_menu_li_disappear(e);
	});

	$ul_menu_li.on('click', function(e) {
		if (e.target.tagName.toLowerCase() == 'a') {
			MainMenu.hiddenHover();
		} else {
			$ul_menu_li_appear(e);
		}
	});

	$ul_icon_li.on('mouseover', function(e) {
		var $this = $(this);
		$this.find('.top-icon').css({
			display : 'none'
		});
		$this.find('span').css({
			display : 'block'
		});
	});

	$ul_icon_li.on('mouseout', function(e) {
		var $this = $(this);
		$this.find('.top-icon').css({
			display : ''
		});
		$this.find('span').css({
			display : 'none'
		});
	});

	// 叶菜单改变颜色
	var $a = $('.link');
	$a.on('mouseover', function(e) {
		$(this).addClass('link-visited');
	});
	$a.on('mouseout', function(e) {
		$(this).removeClass('link-visited');
	});

	// 用户角色
	var $li_userrole = $("#li-userrole");
	var $div_userrole = $('#div-userrole');
	$div_userrole.css({
		top : logo_height + 'px',
		left : $li_userrole.offset().left + 'px'
	});
	$li_userrole.on('mouseover', function(e) {
		if (!DomUtil.init().$checkHover(e)) {
			return;
		}
		$div_userrole.css({
			display : 'block'
		});
	});

	$li_userrole.on('mouseout', function(e) {
		if (!DomUtil.init().$checkHover(e)) {
			return;
		}
		$div_userrole.css({
			display : 'none'
		});
	});

}; // MainMenu.hookMenuEvent()

var __refresh = true;

MainMenu.buildLayout = function() {

	Ext.QuickTips.init();

	var center;
	
	
	// 右键菜单
	/*
	Ext.ux.TabCloseMenu = function() {
		var tabs, menu, ctxItem;
		this.init = function(tp) {
			tabs = tp;
			tabs.on('contextmenu', onContextMenu);
		};

		function onContextMenu(ts, item, e) {
			if (!menu) {
				menu = new Ext.menu.Menu([
						{
							id : tabs.id + '-close',
							text : '关闭当前标签',
							iconCls : 'btnno',
							icon : contextPath + btn_img_url + 'close.png',
							handler : function() {
								if (ctxItem.closable) {
									tabs.remove(ctxItem.id);
								}
							}
						},
						{
							id : tabs.id + '4-close-others',
							text : '关闭其他标签',
							iconCls : 'btnno',
							icon : contextPath + btn_img_url + 'close.png',
							handler : function() {
								tabs.items.each(function(item) {
									if (item.closable && ctxItem.id != item.id) {
										tabs.remove(item.id);
									}
								});
							}
						},
						{
							id : tabs.id + '5-close-all',
							text : '关闭所有标签',
							iconCls : 'btnno',
							icon : contextPath + btn_img_url + 'close.png',
							handler : function() {
								tabs.items.each(function(item) {
									if (item.closable) {
										tabs.remove(item.id);
									}
								});
							}
						}]);

			}
			ctxItem = item;

			try {
				var url = CONTEXTPATH
						+ '/info.do?method=isLoginMenu&menuId='
						+ ctxItem._menuId + "&tt=" + Math.random();
				var oBao = $.ajax({
					url : url,
					async : false
				});
				var txt = oBao.responseText;
				Ext.getCmp(tabs.id + '6-save').setChecked((txt == "true"));
			} catch (ex) {
			}

			var items = menu.items;
			var disableOthers = true;
			tabs.items.each(function() {
				if (this != item && this.closable) {
					disableOthers = false;
					return false;
				}
			});
			menu.showAt(e.getPoint());

			var disableAll = true;
			tabs.items.each(function() {
				if (this.closable) {
					disableAll = false;
					return false;
				}
			});
			menu.showAt(e.getPoint());
		}
	}; 
	*/
	
	
	MainIndex.window = window;
	MainIndex.__window__ = window;
	var hei = document.body.clientHeight - 85;
	// 标签页
	MainIndex.tab = tab = new Ext.TabPanel({
		id : 'mainFrameTab',
		region : 'center',
		renderTo : 'tabDiv',
		deferredRender : false,
		activeTab : 0,
		resizeTabs : true, // turn on tab resizing
		minTabWidth : 100,
		tabWidth : 135,
		height : hei,
		enableTabScroll : true,
		plugins : new Ext.ux.TabCloseMenu()
	});
	

	center = new Ext.Panel({
		region : 'center',
		contentEl : 'index-head',
		bodyBorder : false
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
	});

	var index_bbar = new Ext.ux.StatusBar({
		region:'south',
		defaultText: "<a style='font-size:15;' href='javascript:void();'>欢迎登陆系统!</a>",
		cls:'background:#d9e7f8;',
		id: 'indexBbar',
		statusAlign: 'right',
		items:[]
	});
	MainIndex.index_bbar=index_bbar;
	
	// 布局
	var layout = new Ext.Viewport({
		layout : 'border',
		items : [ center,index_bbar ]
	});

	new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : CONTEXTPATH + 'extMenu?op=1&centerId=' + centerId
		}),
		reader : new Ext.data.JsonReader({}, [ 'id', 'title', 'act','target','menusql']),
		autoLoad : true
	}).on('load', MainMenu.createMenu);

	layout.doLayout();

	var docsize = DomUtil.init().getDocumentSize();
	var $index_head = $("#index-head");
	var $index_body = $("#index-body");


	$index_head.css({
		width : docsize.width + 'px',
		height : docsize.height + 'px'
	});

	$index_body.css({
		width : docsize.width+ 'px'
	});

}; // MainMenu.createMenu()

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
	blink : {
		prefix : '您有新消息．',
		hasPrefix : false,
		timer : null
	}
};

/** 打开用户的默认页面 */
MainIndex.activateUserIndex = function(){
	var ui = userIndex;
	//可以显示多个首页
	for (var i=0;ui!=""&&i<ui.length ;i++) {
		
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

MainIndex.blinkTitle = function(){
	if (MainIndex.blink.timer){
		clearTimeout(MainIndex.blink.timer);
	}
	if (MainIndex.blink.hasPrefix){
		MainIndexWindow.document.title = MainIndexWindow.document.title.substring(MainIndex.blink.prefix.length);
	} else {
		MainIndexWindow.document.title = MainIndex.blink.prefix + MainIndexWindow.document.title;
	}
	MainIndex.blink.hasPrefix = !MainIndex.blink.hasPrefix;
	MainIndex.blink.timer = setTimeout(MainIndex.blinkTitle, 2000);
};

MainIndex.msgSignRead = function(myids){

}
/** 短 feed */
MainIndex.feed = function() {

}; // MainIndex.feed()

/** 長 feed */
MainIndex.feed_long = function(){

}; 

MainIndex.showWinmsg = function() {
}; 
function zfadeOut(){
	$("#div-innermsg").fadeOut(5000);
}
$("#div-innermsg").mouseover(function(){
  $("#div-innermsg").stop();
  $("#div-innermsg").fadeIn(10);
});
$("#div-innermsg").mouseout(function(){
	setTimeout("zfadeOut()",5000);
});
MainIndex.addTabRemoveHandler = function(tab_id, callback){
	if (!tab_id){
		tab_id = MainIndex.tab.getActiveTab().id; 
	}
	MainIndex.tab_remove_handlers[tab_id] = callback;
};

MainIndex.addTabChangeHandler = function(tab_id, callback){
	if (!tab_id){
		tab_id = MainIndex.tab.getActiveTab().id; 
	}
	MainIndex.tab_change_handlers[tab_id] = callback;
};

MainIndex.addTabActivatedHandler = function(tab_id, callback){
	
	if (!tab_id){
		tab_id = MainIndex.tab.getActiveTab().id; 
	}
	
	MainIndex.tab_activated_handlers[tab_id] = callback;
}

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

