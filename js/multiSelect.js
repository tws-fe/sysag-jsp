//上移
function moveUp(obj) {
	for(var i=1; i < obj.length; i++) {// 最上面的一个不需要移动，所以直接从i=1开始
		if(obj.options[i].selected) {
			if(!obj.options.item(i-1).selected) {
				var selText = obj.options[i].text;
				var selValue = obj.options[i].value;
				obj.options[i].text = obj.options[i-1].text;
				obj.options[i].value = obj.options[i-1].value;
				obj.options[i].selected = false;
				obj.options[i-1].text = selText;
				obj.options[i-1].value = selValue;
				obj.options[i-1].selected=true;
			}
			break;
		}
	}
	selectSynchronous(obj) ;
}

// 下移
function moveDown(obj) {
	for(var i = obj.length -2 ; i >= 0; i--) {// 向下移动，最后一个不需要处理，所以直接从倒数第二个开始
		if(obj.options[i].selected) {
			if(!obj.options[i+1].selected) {
				var selText = obj.options[i].text;
				var selValue = obj.options[i].value;
				obj.options[i].text = obj.options[i+1].text;
				obj.options[i].value = obj.options[i+1].value;
				obj.options[i].selected = false;
				obj.options[i+1].text = selText;
				obj.options[i+1].value = selValue;
				obj.options[i+1].selected = true;
			}
			break;
		}
	}
	selectSynchronous(obj) ;
}

// 移动
function moveOption(obj1, obj2) {
	for(var i = obj1.options.length - 1 ; i >= 0 ; i--) {
		if(obj1.options[i].selected) {
			var opt = new Option(obj1.options[i].text,obj1.options[i].value);
			opt.selected = true;
			obj2.options.add(opt);
			obj1.remove(i);
			break;
		}
	}
	selectSynchronous(obj) ;
}

// 置顶
function  moveTop(obj) { 
	var  opts = []; 
	for(var i =obj.options.length -1 ; i >= 0; i--) {
		if(obj.options[i].selected) {
			opts.push(obj.options[i]);
			obj.remove(i);
			break;
		}
	}
	
	var index = 0 ;
	for(var t = opts.length-1 ; t>=0 ; t--) {
		var opt = new Option(opts[t].text,opts[t].value);
		opt.selected = true;
		obj.options.add(opt, index++);
	}
	selectSynchronous(obj) ;
} 
			
// 置底
function  moveBottom(obj) { 
	var  opts = []; 
	for(var i =obj.options.length -1 ; i >= 0; i--) {
		if(obj.options[i].selected){
			opts.push(obj.options[i]);
			obj.remove(i);
			break;
		}
	}
	for(var t = opts.length-1 ; t>=0 ; t--) {
		var opt = new Option(opts[t].text,opts[t].value);
		opt.selected = true;
		obj.options.add(opt);
	}
	selectSynchronous(obj) ;
} 

//删除
function delSelectOption(obj){
	for(var i =obj.options.length -1 ; i >= 0; i--) {
		obj.remove(i);
	}
}
//删除一个
function delSelectOption1(obj){
	for(var i =obj.options.length -1 ; i >= 0; i--) {
		if(obj.options[i].selected) {
			obj.remove(i);
			break;
		}
	}
	selectSynchronous(obj) ;
	hadSelectUser();
}

//新增
function addSelectOption(obj,text,value,selected){
	var opt = new Option(text,value);
	obj.options.add(opt);
	if(selected){
		opt.selected = true;
	}
	
}
function selectSynchronous(obj){
	var multiSelect = obj;
	var userName = "";
	var userIds = ",";
	
	for(var i=0; i < multiSelect.length; i++) {
		userName=userName+ multiSelect.options[i].value+"~"+multiSelect.options[i].text+",";
		
		userIds = userIds + multiSelect.options[i].value+",";
	}
	
	try {
	document.getElementById("userNames").value=userName ;
	document.getElementById("Users").value=userIds;
	} catch (e){
		if (console || console.error) console.error(e);
	}
	
}





