function newcreateRequest() {
	var request;
	try {
		request = new XMLHttpRequest();
	} catch (trymicrosoft) {
		try {
			request = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (othermicrosoft) {
			try {
				request = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (failed) {
				request = false;				
			}
		}
	}
	if (!request)
		alert("Error initializing XMLHttpRequest!");
	return request;
}
function newajaxLoadPageSynch(url,request) {
	var loader = newcreateRequest();
	loader.open("POST", url, false);
	loader.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	loader.send(request);
	return unescape(loader.responseText);
}

var ThemeUtil = {
	theme_storage_name : '$$SYSTEM_THEME',
	theme_dir : 'theme',
	theme_src : {
		'css' : ['ext-all.css', 'style.css', 'combox.css' ]
	},
	theme_list : [
		["default", "default"],
		["pink", "pink"],
		["roma", "roma"],
		["black","black"],
		["orange","orange"],
		["info","info"],
		["sea","sea"],
		["villega","villega"]
	]
};
ThemeUtil.resolve_url_fixpath = CONTEXTPATH + '/css/' + ThemeUtil.theme_dir;

ThemeUtil.loadTheme = function(a){
	a = a || {};
	 
	
	a.theme_storage_name = a.theme_storage_name || ThemeUtil.theme_storage_name;
	a.theme_dir = a.theme_dir || ThemeUtil.theme_dir;
	a.theme_src = a.theme_src || ThemeUtil.theme_src,
	a.theme_list = a.theme_list || ThemeUtil.theme_list;
	
	if (!a.theme){
		if (window.localStorage){
			a.theme = "default";
		}
	}
	if (!a.theme){
		a.theme = ThemeUtil.theme_list[0][0];
	}
	var css = [];
	
	for(var dir in a.theme_src){
		var files = a.theme_src[dir];
		for(var i = 0; i < files.length; i++){
			css.push('/' + dir + '/' + a.theme_dir + '/' + a.theme + '/' + files[i]);	
		}
	}
	Jax.loadCSS(css)
	return;
};

ThemeUtil.url = ThemeUtil.resolve = function(relativePath) {

	themeval = "default";
	
	var protocol_index = relativePath.indexOf('://'); // 帶協議当成絕对路徑, 直接返回
	if (protocol_index >=0 && protocol_index <= 5){
		return relativePath;
	}
	var theme;
	if (window.localStorage){
		theme = themeval;
	}
	
	theme = themeval;
	return ThemeUtil.resolve_url_fixpath + '/' + theme + '/' + relativePath;		
}; 
