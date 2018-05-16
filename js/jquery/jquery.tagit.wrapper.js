function Tagit(o){
	this.init(o);
};			

/** 
 * 根据參數初始化控件 
 */
Tagit.prototype.init = function(o){
	if (!o || !o.renderTo){
		throw 'Tagit no target to render to';	
	}
	
	var $this = this;
	
	// tagit 默認參數
	if (typeof o.autocomplete == 'undefined') o.autocomplete = {};
	if (typeof o.allowDuplicates == 'undefined') o.allowDuplicates = false;
	if (typeof o.allowSpaces == 'undefined') o.allowSpaces = true;
	if (typeof o.caseSensitive == 'undefined') o.caseSensitive = false;
	if (typeof o.delay == 'undefined') o.delay = 100;
	if (typeof o.minLength == 'undefined') o.minLength = 1;
	if (typeof o.placeholderText == 'undefined') o.placeholderText = '';
	if (typeof o.readOnly == 'undefined') o.readOnly = false;
	
	// 封裝相關
	if (typeof o.wrapper == 'undefined') o.wrapper = {};	
	if (typeof o.wrapper.initHint == 'undefined') o.wrapper.initHint = false;
	if (typeof o.wrapper.foreignItem == 'undefined') o.wrapper.foreignItem = false;
	if (typeof o.wrapper.labelField == 'undefined') o.wrapper.labelField = 'label';
	if (typeof o.wrapper.valueField == 'undefined') o.wrapper.valueField = 'value';	
	
	// 不要 jquery ui autocomplete 控件的官方提示, css 那边已改成 display : none
	o.autocomplete.messages = {
        noResults: '',
        results: function() {}
    };
		
	// 提示方面的處理
	$this.doRefreshHint = true;
	if (typeof o.wrapper.hint == 'object' && typeof o.wrapper.hint.url == 'string') {		
		o.autocomplete.source = function(request, official_callback){
			if ($this.doRefreshHint == false) {				
				$this.render_autocomplete(request, official_callback, $this.tagcandi);
				return;
			} 			
			$this.fetch_autocomplete($this.hint.url, $this.hint.param, null, request, official_callback, $this.tagcandi);																						
		}
	}
	
	if (typeof o.wrapper.firstborn == 'object' && typeof o.wrapper.firstborn.url == 'string') {
				
	}
		
	// 封裝回調
	var callbacknames = [ 'beforeTagAdded', 'afterTagAdded', 'beforeTagRemoved', 'afterTagRemoved', 'onTagExists', 'onTagClicked', 'onTagLimitExceeded' ];	
	for(var i = 0 ; i < callbacknames.length; i++){
		var callback = o[callbacknames[i]];		
		o[callbacknames[i]] = (function($this, callback, callbackname) { // js closure 閉包, 造新的回調函數
			return function(event, ui) {	
				var label = ui.tagLabel;		// tag 的显示名字
				var data  = $this.tagcandi[label]; 	// 數据部份
				switch(callbackname) {
				case 'afterTagAdded': 
					// 把  jquery ui 加入 tags map
					if (!data) {
						data = { 
							label : label,
							__foreign__ : true // 不在原定範圍內的 tag
						};
					}
					data.jquery = ui; 
					$this.tags[label] = data;
					// 加 tag 后, 檢查是不是在容許範圍內的 tag, 不是的話变色
					if ($this.foreignItem == false){
						if (!$this.tagcandi[ui.tagLabel] && !ui.duringInitialization) {
							var dom = ui.tag[0];
							dom.className = dom.className + ' tagit-wrapper-foreign-item ';
							dom.style.color = $this.foreignItemColor || 'white';	
							dom.style.backgroundColor = $this.foreignItemBackgroundColor || 'rgb(255, 64, 64)';
						}
					}
					// 加一外額外的回調
					if (typeof $this.onTagForeign == 'function'){
						$this.onTagForeign.call($this, event, ui, label, data);
					}
					break;
				case 'afterTagRemoved':
					if (data) { // 把  jquery ui 从  tags map 移出
						delete data;
						$this.tags[label] = null;
					}
					break;
				}
				// 把封裝后的  tagit 对象作為回調的  this, 另外加上 label 和 label 对應數据 
				if (typeof callback == 'function') {
					callback.call($this, event, ui, label, data);
				}
			};
		})(this, callback, callbacknames[i]);		
	}
	
	this.tags = {};
	this.tagcandi = {};
	this.option = o;	
	
	for(var k in o.wrapper) {
		this[k] = o.wrapper[k];
	}
		
	var dorender = function() {		
		
		if (typeof $this.beforerender == 'function') {
			$this.beforerender.call($this);
		}
		
		jQuery('#' + o.renderTo).tagit(o);
		jQuery('#' + o.renderTo).data('wrapper', $this);
		
		$this.jquery = jQuery('#' + o.renderTo);
		$this.instance =  $this.jquery.data("ui-tagit");
		
		if (typeof $this.afterrender == 'function') {
			$this.afterrender.call($this, $this.jquery, $this.instance);
		}
	}
	
	if (this.initHint) {
		this.fetch_autocomplete(o.hint.url, o.hint.data, dorender);	
	} else {
		dorender();
	}
			
	return this;
};

/**
 * ajax 取得提示數据
 */
Tagit.prototype.fetch_autocomplete = function(url, param, fetch_callback, request, official_callback, target){
	var $this = this;	
	jQuery.ajax({
		url : url,
		type : 'post',
		dataType : 'text',
		data : param || {},
		async : typeof $this.async == 'undefind' ? true : $this.async,
		success : function(response, xhr) {				
			$this.doRefreshHint = false;
			
			
			if (typeof $this.hint.adapter == 'function') {
				$this.tagcandi = $this.hint.adapter.call($this, response, xhr);
			} else {
				$this.tagcandi = eval('(' + response + ')');
			}
			var labelField = $this.labelField || 'label';
			if ($this.tagcandi instanceof Array){
				var label;
				var labelmap = {};
				for(var i = 0; i < $this.tagcandi.length; i++){
					var candi = $this.tagcandi[i];
					if (typeof candi == 'string') {
						label = candi;
						candi = {};
						candi[labelField] = label;
					} else {
						label = candi[labelField];						
					}
					if (label) { 
						labelmap[label] = candi; 
					}
				}				
				$this.tagcandi = labelmap;
			}			
									
			if (typeof official_callback == 'function') {
				$this.render_autocomplete(request, official_callback, $this.tagcandi);
			}						
			
			if (typeof fetch_callback == 'function') {
				fetch_callback.call($this, request, official_callback, $this.tagcandi);
			}
			
		},
		error : function(xhr, errormsg, status) {
			if ($this.errorhandler) {
				$this.errorhandler.call($this, xhr, errormsg, status);
			} else if (typeof console != 'undefined' && typeof console.error != 'undefined'){
				console.error('[tag-it-wrapper] ' + errormsg);
			}
		}		
	});
}

/**
 * 將數据变成提示的 dom
 * @param official_callback 不能改变, 是官方 jquery ui autocomplete 傳入
 */
Tagit.prototype.render_autocomplete = function(request, official_callback, tagcandi) {			
	if (!official_callback || !tagcandi) {
		return;
	}
	var keyword = request.term;
	if (typeof keyword.trim == 'function'){
		keyword = keyword.trim();
	}
	if (keyword.length == 0){
		return;
	}
	
	var target = [];
	
	if (typeof this.hint.picker == 'function') {
		official_callback(this.picker.call(this, keyword, tagcandi)); 
		return this;
	}
	
	if (typeof this.hint.filter == 'function'){		 
		for(var label in tagcandi){		
			var r = this.filter.call(this, keyword, label, tagcandi[label]);
			if (!r) { continue; }			
			target.push(typeof r == 'string' ? r :  label);			
		}
	} else {		
		for(var label in tagcandi){			
			if (label.indexOf(keyword) >= 0){
				target.push(label);
			}
		}
	}
		
	official_callback(target);		
	return this;
};

Tagit.prototype.add = function(tag) {
	if (typeof tag == 'string'){
		tag = {
			label : tag
		}
	}	
	this.jquery.tagit("createTag", tag.label, tag.className || '');
	this.tags[tag.label] = tag;
	return this;
};

Tagit.prototype.remove = function(label) {
	this.jquery.tagit('removeTagByLabel', label);
	return this;
};

Tagit.prototype.removeAll = function() {
	this.tags.clear();
	this.jquery.tagit('removeAll');
	return this;
};

Tagit.prototype.hookAddTagCallback = function(callback) {
	var $this = this;
	this.jquery.tagit("preprocessTag", function(label) { 
		callback.call($this, label, $this.tags[label]);
	});
	return this;
}

Tagit.prototype.getAllLabels = function(){
	return this.jquery.tagit("assignedTags");
};

Tagit.prototype.getLabels  = function() {
	var labels = [];
	for(var label in this.tags) {		
		if (label && !this.tags[label].__foreign__) {
			labels.push(label);
		}
	}
	return labels;
};

Tagit.prototype.getValues = function() {
	var values = [];	
	var valueField = this.valueField || 'value';
	for(var label in this.tags) {		
		var data = this.tags[label];
		if (!data) continue;
		var value = data[valueField];
		if (value) {
			values.push(value);
		}
	}	
	return values;
};
