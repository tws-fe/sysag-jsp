/*
 * 
 * 年度下拉
 * 
 * com.tws.script.autoHitSelect.DataYearImpl.js
 * 
 */
function getJsonData(){
	
}
function getList(){
	
	var refer2 = StringUtil.showNull(request.get("refer2"));
	var startYear=2000;
	
	if(refer2!=""){
		startYear=refer2;	
	}

	var curYear = DateUtil.getCurrentYear();
	for (var i = curYear; i >= startYear; i--) {
		resultMap.put(StringUtil.showNull(i),StringUtil.showNull(i) + "年");
	}
	
	return resultMap;
	
}