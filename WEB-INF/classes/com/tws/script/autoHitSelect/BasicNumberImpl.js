/**
 * 
 * 数字下拉
 * 
 * BasicNumberImpl.js
 * 
 */
function getJsonData(){
	
}
function getList(){
	var refer = StringUtil.showNull(request.get("refer"));
	var refer1 = StringUtil.showNull(request.get("refer1"));
	
	if(!refer || refer==""){
		refer=0;
	}
	if(!refer1 || refer1==""){
		refer1=10;
	}

	for (var i = refer; i <= refer1; i++) {
		resultMap.put(StringUtil.showNull(i),StringUtil.showNull(i));
	}
	
	return resultMap;
}