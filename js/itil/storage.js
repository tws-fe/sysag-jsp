function StorageUtil(){
	
};

StorageUtil.init = function($){
	if (StorageUtil.inited){
		return StorageUtil;
	}
	if (!$){
		$ = window.jQuery;
	}
	
	/* ancient cookie */
	
	StorageUtil.setCookie = function(key, value, expiredays){
		var co = escape(key) + '=' + escape(value);
		if (expiredays){
			var date = new Date();
			date.setDate(date.getDate() + expiredays);
			co += ';expires=' + date.toGMTString();
		}
		document.cookie = co;
		return StorageUtil;
	};
	
	StorageUtil.getCookie = function(key){
		var co = document.cookie;
		if (co.length <= 0){
			return "";
		}
		key = escape(key);
		var c_start = co.indexOf(key + "=");									
		if (c_start >= 0){ 
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf(";" , c_start);
			if (c_end < 0){
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start,c_end));
		}
		return "";
	};
	
	
	if (!window.sessionStorage || !window.localStorage){
		StorageUtil.inited = true;
		return StorageUtil;
	}
	
	StorageUtil.defaultStorage = window.localStorage;
	StorageUtil.defaultDepthLimit = 3;
	StorageUtil.defaultQuote = '"';
	
	StorageUtil.setItem = function(key, value, storage){
		storage = storage || StorageUtil.defaultStorage;
		storage.setItem(key, value);
		return StorageUtil;
	};
	
	StorageUtil.getItem = function(key, storage){
		storage = storage || StorageUtil.defaultStorage;
		return storage.getItem(key);
	};
	
	StorageUtil.setItemToJson = function(key, map, storage){
		storage = storage || StorageUtil.defaultStorage;
		storage.setItem(key, Common.init().toJson(map, StorageUtil.defaultQuote, StorageUtil.defaultDepthLimit));
		return StorageUtil;
	};
	
	StorageUtil.getItemFromJson = function(key, storage){
		storage = storage || StorageUtil.defaultStorage;
		var value = storage.getItem(key);
		return value ? eval('(' + value + ')') : null;
	};
	
	
	
	StorageUtil.getItemValue = function(item, key, storage){
		storage = storage || StorageUtil.defaultStorage;
		var obj = StorageUtil.getItemFromJson(item, storage);
		return obj ? obj[key] : null;
	};
	
	StorageUtil.setItemValue = function(item, map, storage, q, depthlimit){
		storage = storage || StorageUtil.defaultStorage;
		var obj = StorageUtil.getItemFromJson(item, storage);
		if (!obj){
			obj = {};
		}
		for(var k in map){
			obj[k] = map[k];
		}
		storage.setItem(item, Common.init().toJson(obj, StorageUtil.defaultQuote, StorageUtil.defaultDepthLimit));
		return StorageUtil;
	};
	
	StorageUtil.clearItem = function(item, storage){
		storage = storage || StorageUtil.defaultStorage;
		var value = storage.getItem(item);
		if (!value){
			return StorageUtil;
		}
		if (value.charAt(0) == '['){
			storage.setItem(item,  '[]');
		} else if (value.charAt(0) == '{'){
			storage.setItem(item,  '{}');
		} else  {
			storage.setItem(item,  '');
		}
		return StorageUtil;
	};
	
	StorageUtil.removeItem = function(key, storage){
		storage = storage || StorageUtil.defaultStorage;
		return storage.removeItem(key);
	};
	
	StorageUtil.clear = function(storage){
		storage = storage || StorageUtil.defaultStorage;
		storage.clear();
		return StorageUtil;
	};
	
	StorageUtil.getKeys = function(param, storage){
		storage = storage || StorageUtil.defaultStorage;
		param = param || {};
		
		var keys = [];
		var prefix = param.prefix;
		var suffix = param.suffix;
		var filter = param.filter;
		var exclude = param.exclude;
		if (param.include && param.include instanceof Array){
			keys = keys.concat(param.include)
		}
		for(var k in storage){
			if (exclude && exclude[k]){
				continue;
			}
			if (prefix && k.indexOf(prefix) != 0){
				continue;
			}
			if (suffix && k.indexOf(suffix) != (k.length - suffix.length)){
				continue;
			}
			if (filter && !filter()){
				continue;
			}
			keys.push(k);
		}
		return keys;
	};
	
	StorageUtil.toMap = function(param, storage){
		storage = storage || StorageUtil.defaultStorage;
		var keys = StorageUtil.getKeys(param, storage);
		var map = {};
		for(var i = 0; i < keys.length; i++){
			map[keys[i]] = storage.getItem(keys[i]);
		}
		return map;
	};
	
	StorageUtil.removeKeys = function(param, storage){
		storage = storage || StorageUtil.defaultStorage;
		var keys = StorageUtil.getKeys(param, storage);
		for(var i = 0; i < keys.length; i++){
			storage.removeItem(keys[i]);
		}
		return keys;
	};
	
	StorageUtil.addLocalStorageCallback = function(handle_storage){
		if(window.addEventListener){ 	
			window.addEventListener("storage",handle_storage,false); 
		} else if(window.attachEvent){ 	
			window.attachEvent("onstorage",handle_storage); 
		} 
		return StorageUtil;
	};
	
	StorageUtil.inited = true;
	return StorageUtil;
}