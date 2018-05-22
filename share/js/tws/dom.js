
function DomUtil() {

};

DomUtil.init = function() {
	
	if (DomUtil.inited){
		return DomUtil;
	}

	DomUtil.objectToDom = function(object) {
		var dom = document.createElement(object.tagName);
		for ( var attr in object) {
			if (attr == 'tagName') {
				continue;
			}
			dom[attr] = object[attr];
		}
		return dom;
	};

	DomUtil.htmlToObject = function(html, quote) {
		html = html.trim();
		html = html.replace(/ = /g, "=");
		if (!quote) {
			quote = '\"';
		}
		var attrs = html.split(' ');
		var object = {};
		var i = 0;
		if (attrs.length <= 1) {
			i = 1;
		}
		object.tagName = attrs[i++].substring(1).toUpperCase();
		var ch, key, value;
		for (; i < attrs.length; i++) {
			if (attrs[i].length <= 3) {
				continue;
			}
			var pair = attrs[i].split('=');
			if (pair.length == 1) {
				object[pair[0]] = pair[0];
				continue;
			}
			key = pair[0];
			value = pair[1].replace(/"/g,"");
			ch = value[0];
			if (ch == '\'' || ch == '\"') {
				value = value.substring(1);
			}
			ch = value[value.length - 1];
			if (ch == '\'' || ch == '\"') {
				value = value.substring(0, value.length - 1);
			}
			object[key] = value;
		}
		return object;
	};

	DomUtil.objectToHtml = function(object, quote, mode) {
		if (!quote) {
			quote = '\"';
		}
		if (!mode) {
			mode = 'single';
		}
		var html = '<' + object.tagName;

		for ( var key in object) {
			if (key == 'tagName') {
				continue;
			}
			var key1 = key;
			if(key == "className"){
				key1 = "class";
			}
			html += ' ' + key1 + '=' + quote + object[key] + quote;
		}
		html += mode == 'single' ? '/>' : '>' + '</' + object.tagName + ">";
		return html;
	};

	DomUtil.getDocumentSize = function(radio) {
		var width, height;
		if (self.innerHeight) { // WEBKIT
			width = self.innerWidth;
			height = self.innerHeight;
		} else if (document.documentElement
				&& document.documentElement.clientHeight) { // IE standards 模式
			width = document.documentElement.clientWidth,
					height = document.documentElement.clientHeight
		} else if (document.body) { // IE quirks 模式
			width = document.body.clientWidth,
					height = document.body.clientHeight
		}
		if (!radio) {
			radio = 1;
		}
		return {
			width : width * radio,
			height : height * radio
		};
	}; // DomUtil.getDocumentSize
	

	DomUtil.resizeLayout = function(layout) {
		var document_size = DomUtil.getDocumentSize();
		var width = document_size.width;
		var height = document_size.height;
		for ( var id in layout) {
			var e = document.getElementById(id);
			if (!e || e.length == 0) {
				continue;
			}
			var $w = layout[id][0];
			var $h = layout[id][1];
			if ($w > 0) {
				e.style.width = Math.round(width * $w - 22) + 'px';
			}
			if ($h > 0) {
				e.style.height = Math.round(height * $h - 16) + 'px';
			}
		}
	}; // DomUtil.resize

	/** 将 url 的 ? 後面参数全转成 map (object) */
	DomUtil.urlParamToMap = function(url) {
		if (!url) {
			url = window.location.href;
		}
		if (decodeURIComponent) {
			url = decodeURIComponent(url);
		} else {
			url = decodeURI(url);
		}
		var query = url.substring(url.lastIndexOf('?') + 1);
		var params = query.split('&');
		var map = {};
		for (var i = 0; i < params.length; i++) {
			var equalIndex = params[i].indexOf('=');
			var key = params[i].substring(0, equalIndex);
			var value = params[i].substring(equalIndex + 1);
			map[key] = value;
		}
		return map;
	};
	
	/** 判断是否为父子关系 */
	DomUtil.contains = function(parentNode, childNode) {
		try {
			if (parentNode.contains) {
				return parentNode != childNode && parentNode.contains(childNode);
			} else {
				return !!(parentNode.compareDocumentPosition(childNode) & 16);
			}
		} catch (e){}
		
	};

	/** 用作防止 mouseover, mouseout 中事件冒泡子元素多次触发父元素事件, 事件触发只能从父向子 */
	DomUtil.checkHover = function(event, target){
		event = event || window.event;
		var relatedTarget;
		if (event.type == 'mouseover') {
			relatedTarget = event.relatedTarget || event.fromElement;
		} else {
			relatedTarget = event.relatedTarget || event.toElement;
		}
		return relatedTarget != target && !DomUtil.contains(target, relatedTarget);
	};
	
	/** 和 checkHover 功能一样, 但为 jQuery 版本 */
	DomUtil.$checkHover = function($event){
		return $event.relatedTarget != $event.currentTarget && !DomUtil.contains($event.currentTarget, $event.relatedTarget);
	}
	
	
	DomUtil.launchFullscreen = function(element) {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	};
	
	DomUtil.exitFullscreen = function() {
		  if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	};
	
	DomUtil.getParentObj = function(objname, param){
		param = param || {};
		var depthLimit = param.depthLimit || 24;
		var parentName = param.parentName || 'parent';
		var depth;
		for(depth = 1; depth <= depthLimit; depth++){
			var obj = eval(parentName + '.' + objname);
			if (obj){
				param.obj = obj;
				param.window = eval(parentName);
				param.parentName = parentName;
				param.depth = depth;
				return obj;
			}
			parentName = parentName + '.parent';
		}
		return null;
	};
	
	DomUtil.getParentDom = function(o){
		if (!o || !o.filter){
			throw "[DomUtil.getParentDom] !o || !o.filter";
		}
		var w = o.window || window;
		var d = w.frameElement;
		if (!d){
			return null;
		}
		var dep = o.depth;
		if (!dep || dep <= 0){
			dep = 10000;
		}
		if (o.filter.call(o.context || window, d, o)){
			o.target = {
				dom : d,
				window : w,
				depth : dep				
			};
			return d;
		}		
		while(dep > 0){
			d = d.parentElement;
			if (!d){
				w = w.parent;
				if (!w){
					return null;
				}
				d = w.frameElement;
				if (!d){
					return null;
				}
			}
			
			if (o.filter.call(o.context || window, d, w, o) == true){
				o.target = {
					dom : d,
					window : w,
					depth : dep				
				};
				return d;
			}		
			dep--;
		}	
		return null;
	};
	
	DomUtil.getFrameObjs = function(objname, param, depth, retmap){
		if (depth == undefined){
			depth = 6;
		} else if (depth == 0){
			return retmap;
		}
		param = param || {};
		retmap = retmap || {};
		context = param.context || window;
		var frames = context.frames;
		for(var i = 0; i < frames.length; i++){
			var frame_window = frames[i].window;
			var obj = eval('frame_window.' + objname);
			if (obj){
				var key = frames[i].id || objname;
				retmap[key] = obj;
			}
			DomUtil.getFrameObjs(objname, frame_window, depth - 1, retmap);
		}
		return retmap;
	};
	
	DomUtil.getFrameObjsById = function(id, param, depth, retmap){
		if (depth == undefined){
			depth = 6;
		} else if (depth == 0){
			return retmap;
		}
		retmap = retmap || {};
		param = param || {}
		context = param.context || window;
		var frames = context.frames;
		for(var i = 0; i < frames.length; i++){
			var frame_window = frames[i].window;
			var obj = frame_window.document.getElementById(id);
			if (obj){
				var key = frames[i].id || id;
				retmap[key] = obj;
				retmap['result'] = obj;
			}
			DomUtil.getFrameObjsById(id, { id : param.id, context : frame_window }, depth - 1, retmap);
		}
		return retmap;
	};
	
	
	DomUtil.inited = true;
	return DomUtil;
}

