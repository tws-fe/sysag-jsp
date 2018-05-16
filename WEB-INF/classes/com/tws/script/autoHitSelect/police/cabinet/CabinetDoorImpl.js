/*
 * 
 * door
 * 
 * com.tws.script.autoHitSelect.police.cabinet.CabinetDoorImpl.js
 * 
 */
function getJsonData(){
	
}
function getList(){
	
	var refer = StringUtil.showNull(request.get("refer"));
	var refer1 = StringUtil.showNull(request.get("refer1"));
	
	if(!refer || refer==""){
		refer=1;
	}
	if(!refer1 || refer1==""){
		refer1=18;
	}
	
	for (var i = refer; i <= refer1; i++) {
		resultMap.put(StringUtil.showNull(i),StringUtil.showNull(i)+"号门");
	}
	
	return resultMap;
	
}