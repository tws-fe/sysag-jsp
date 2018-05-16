
//页面打开时，初始化表单控件
function mt_init_form_Control(){
	initCombox();
	mt_form_initDateSelect();
	mt_form_initAttachFile();
	mt_form_initDateTimeSelect();		
	mt_form_initAttachImg();	
	mt_form_initRadioCheckbox();
	mt_form_initscrollbar()
	score();
	mt_form_initTagit();
	mt_form_initComment();
}


//通用的根据必填设置LABEL的样式
function mt_formSetFieldRequiredStyle() {

	var form_obj = document.getElementsByTagName('label');
	for (var i = 0; i < form_obj.length; i++) {

		var e = form_obj[i];
		if (e.getAttribute("for")) {
			var obj = document.getElementById(e.getAttribute("for"));
			if (obj != null) {
				var cls = obj.className;
				if (cls.indexOf("required") > -1) {
					e.className = "mustSpan";
				} else {
					// 是EXT的下拉
					var obj = Ext.getCmp(e.getAttribute("for"));

					// if(obj.parentNode.innerHTML.indexOf("required")>-1){
					if (obj && obj.el.dom.className.indexOf("required") > -1) {
						e.className = "mustSpan";
					}
				}
			} else {
				obj = Ext.getCmp(e.getAttribute("for"));
				if (obj && obj.el.dom.className.indexOf("required") > -1) {
					e.className = "mustSpan";
				}
			}
		}
	}
}

// 设置某个字段的样式为必填或去掉必填,不支持子表单的修改
// id = 表单的ID
// b=true[必填] ,b=false[去掉必填] ooo
function mt_SetFieldRequired(id, b) {
	var field = Ext.getDom(id);
	if (field) {

		/*
		 * 有兼容性错误 var cls = field.className; if(b){ cls += "required"; }else{
		 * cls = cls.replace("required",""); } field.className = cls;
		 * 
		 * var form_obj=document.getElementsByTagName('label'); for (var i=0; i <
		 * form_obj.length; i++ ) { var e=form_obj[i]; if(e.getAttribute("for") &&
		 * e.getAttribute("for") == id){ cls = e.className; if(b){ cls =
		 * "mustSpan"; }else{ cls = cls.replace("mustSpan",""); } e.className =
		 * cls; } }
		 */
		if (!b) {
			// 刈除样式
			if ($("#" + id).hasClass("required")) {
				$("#" + id).removeClass("required");
				$("label[for=" + id + "]").removeClass("mustSpan");
			}
		} else {
			// 增加样式
			if (!$("#" + id).hasClass("required")) {
				$("#" + id).addClass("required");
				$("label[for=" + id + "]").addClass("mustSpan");
			}
		}
	}
}

// 新增
function mt_formList_add(_param) {

	var __mode = document.getElementById("__mode");
	var formId = document.getElementById("formId").value;
	// var url = MATECH_SYSTEM_WEB_ROOT +
	// "/formDefine.do?method=formView&formId=" + formId;
	var url = "";
	if(__mode && __mode.value == "true"){
		url = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=formView&formId="	+ formId + "&__mode=" + __mode.value + "&afterAdd=toEdit&afterEdit=toEdit";
	}else{
		url = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=formTree&formId="	+ formId;
	}
	var param = getParamObject();

	for ( var key in param) {
		if (key == 'method' || key == "uuid")
			continue;

		// 因为新加入的参数有可能原来的URL中已经有了，这个时候就要不能追加。
		if (!_param
				|| (_param && ('&' + _param).indexOf('&' + key + '=') == -1)) {
			url += "&" + key + "=" + param[key];
		}
	}

	if (_param) {
		url += "&" + _param;
	}

	/*
	 * _param=_param||{}; for(var key in _param){ url+="&"+key+"="+_param[key]; }
	 */
	if(__mode && __mode.value == "true"){
		try{
			parent.showWinFun(url);
		}catch(e){}
	}else{
		window.location = url;	 
	}
	
	
	
}

//修改
function mt_formList_edit1(formId, tableId, value, _param) {
	var __mode = document.getElementById("__mode");
	
	// var url = MATECH_SYSTEM_WEB_ROOT +
	// "/formDefine.do?method=formView&formId=" + formId + "&uuid="+value;
	var url = "";
	if(__mode && __mode.value == "true"){
		url = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=formView&formId="	+ formId + "&uuid=" + value + "&__mode=" + __mode.value + "&afterAdd=toEdit&afterEdit=toEdit";
	}else{
		url = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=formTree&formId="+ formId + "&uuid=" + value;
	}
	
	var param = getParamObject();
	for ( var key in param) {
		if (key == 'method' || key == "uuid")
			continue;

		// 因为新加入的参数有可能原来的URL中已经有了，这个时候就要不能追加。
		if (!_param
				|| (_param && ('&' + _param).indexOf('&' + key + '=') == -1)) {
			url += "&" + key + "=" + param[key];
		}

	}

	/*
	 * _param=_param||{}; for(var key in _param){ url+="&"+key+"="+_param[key]; }
	 */

	if (_param) {
		url += "&" + _param;
	}
	if(__mode && __mode.value == "true"){
		try{
			parent.showWinFun(url);
		}catch(e){}
	}else{
		window.location.href = url;
	}
}

//查看
function mt_formList_view1(formId, tableId, value, _param) {
	// var url = MATECH_SYSTEM_WEB_ROOT +
	// "/formDefine.do?method=formView&formId=" + formId + "&uuid="+value;
	var url = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=formTree&formId="
			+ formId + "&uuid=" + value +"&view=true";
	var param = getParamObject();
	for ( var key in param) {
		if (key == 'method' || key == "uuid")
			continue;

		// 因为新加入的参数有可能原来的URL中已经有了，这个时候就要不能追加。
		if (!_param
				|| (_param && ('&' + _param).indexOf('&' + key + '=') == -1)) {
			url += "&" + key + "=" + param[key];
		}

	}

	/*
	 * _param=_param||{}; for(var key in _param){ url+="&"+key+"="+_param[key]; }
	 */

	if (_param) {
		url += "&" + _param;
	}

	//window.location.href = url;
	//openTab(new Date().getTime(), '查看知识',  url, parent.parent);
	var tab = parent.parent.tab;
	if(tab){
		n = tab.add({    
	        title:"查看",    
	        closable:true,  //通过html载入目标页    
	        html:'<iframe name="designFrm" scrolling="no" frameborder="0" width="100%" height="100%" src="' + url + '"></iframe>'   
		    }); 
		 tab.setActiveTab(n);
	    }else {
		window.open(url);
	   }
}


// 编辑
function mt_formList_edit(_param) {
	var formId = document.getElementById("formId").value;
	var tableId = document.getElementById("tableId").value;

	var value = document.getElementById("chooseValue_" + tableId).value;
	if (value == '') {

		value = getChooseValue(tableId);

		if (value == "") {
			alert('请选择要修改的数据!');
			return;

		} else if (value.indexOf(",") > -1) {
			alert('请选择一条需要修改的数据!');
			return;
		}
	}

	mt_formList_edit1(formId, tableId, value, _param);
}

// 预约
function mt_formList_addOrEdit() {
	var formId = document.getElementById("formId").value;
	var tableId = document.getElementById("tableId").value;
	var value = document.getElementById("chooseValue_" + tableId).value;
	if (value == '') {
		value = getChooseValue(tableId);
		if (value == "") {
			window.location = MATECH_SYSTEM_WEB_ROOT
					+ "/formDefine.do?method=formView&formId=" + formId;
			return;

		} else if (value.indexOf(",") > -1) {
			alert('请选择一条需要修改的数据!');
			return;
		}
	}

	window.location = MATECH_SYSTEM_WEB_ROOT
			+ "/formDefine.do?method=formView&formId=" + formId + "&uuid="
			+ value;
}

// 删除
function mt_formList_remove() {
	var formId = document.getElementById("formId").value;
	var tableId = document.getElementById("tableId").value;

	var value = document.getElementById("chooseValue_" + tableId).value;
	if (value == "") {

		value = getChooseValue(tableId);

		if (value == "") {
			alert('请选择要删除的数据!');
			return;
		}
	}

	if (confirm("您确认要删除当前选中数据吗？")) {
		var param = getParamObject();

		var url = MATECH_SYSTEM_WEB_ROOT
				+ "/formDefine.do?method=removeFormData&formId=" + formId
				+ "&uuid=" + value;

		for ( var key in param) {
			if (key == 'method' || key == "uuid")
				continue;
			url += "&" + key + "=" + param[key];
		}
		window.location = url;
	} else {
		return;
	}
}

// 假删除
function mt_formList_remove_noreal() {
	var formId = document.getElementById("formId").value;
	var tableId = document.getElementById("tableId").value;

	var value = document.getElementById("chooseValue_" + tableId).value;
	if (value == "") {

		value = getChooseValue(tableId);

		if (value == "") {
			alert('请选择要删除的数据!');
			return;
		}
	}

	if (confirm("您确认要删除当前选中数据吗？")) {
		var param = getParamObject();

		var url = MATECH_SYSTEM_WEB_ROOT
				+ "/formDefine.do?method=removeFormDataNotReal&formId="
				+ formId + "&uuid=" + value;

		for ( var key in param) {
			if (key == 'method' || key == "uuid")
				continue;
			url += "&" + key + "=" + param[key];
		}
		window.location = url;
	} else {
		return;
	}
}

// 查看
function mt_formList_view(formId) {

	var srcFormId = "";
	if (!formId) {
		formId = document.getElementById("formId").value;
	} else {
		srcFormId = document.getElementById("formId").value;
	}

	var tableId = document.getElementById("tableId").value;

	var value = document.getElementById("chooseValue_" + tableId).value;

	if (value == '') {

		value = getChooseValue(tableId);

		if (value == "") {
			alert('请选择要查看的数据!');
			return;

		} else if (value.indexOf(",") > -1) {
			alert('请选择一条需要查看的数据!');
			return;
		}
	}

	var __mode = document.getElementById("__mode");
	var url = "";
	if(__mode && __mode.value == "true"){
		url = MATECH_SYSTEM_WEB_ROOT
			+ "/formDefine.do?method=formView&view=true&formId=" + formId
			+ "&uuid=" + value + "&srcFormId=" + srcFormId + "&__mode=" + __mode.value;
	}else{
		url = MATECH_SYSTEM_WEB_ROOT
			+ "/formDefine.do?method=formTree&view=true&formId=" + formId
			+ "&uuid=" + value + "&srcFormId=" + srcFormId;		
	}
	var param = getParamObject();
	for ( var key in param) {
		if (key == 'method' || key == "uuid")
			continue;
		url += "&" + key + "=" + param[key];
	}
	
	if(__mode && __mode.value == "true"){
		try{
			parent.showWinFun(url);
		}catch(e){}
	}else{
		window.location.href = url;	
	}
	
}

// 流程查看
function mt_formList_process_view(pKey) {
	var formId = "";
	formId = document.getElementById("formId").value;

	var tableId = document.getElementById("tableId").value;
	var value = document.getElementById("chooseValue_" + tableId).value;

	if (value == '') {
		value = getChooseValue(tableId);
		if (value == "") {
			alert('请选择要查看的数据!');
			return;

		} else if (value.indexOf(",") > -1) {
			alert('请选择一条需要查看的数据!');
			return;
		}
	}

	var url = MATECH_SYSTEM_WEB_ROOT
			+ "/formDefine.do?method=formTree&view=true&pKey=" + pKey
			+ "&formId=" + formId + "&uuid=" + value;
	var param = getParamObject();
	for ( var key in param) {
		if (key == 'method' || key == "uuid")
			continue;
		url += "&" + key + "=" + param[key];
	}

	openTab(value, "查看", url, parent);

}

// 返回
function mt_formList_back() {
	window.history.back();
}

// 关闭按钮
function mt_formList_close() {
	// closeTab(parent.parent.mainTab);
	closeTab(parent.parent.tab);

}

function mt_form_getRowValues() {
	var tableId = document.getElementById("tableId").value;

	var uuid = document.getElementById("chooseValue_" + tableId).value;

	if (uuid == "") {
		uuid = getChooseValue(tableId);
		if (uuid == "") {
			alert('请选择要操作的数据!');
			return;
		}
	}

	var json = "[";

	var uuids = uuid.split(",");

	for (var i = 0; i < uuids.length; i++) {

		var divObj = document.getElementById("trValueId_" + uuids[i]);
		var oAttribs = divObj.attributes;

		json += " {";

		var data = "";

		for (var j = 0; j < oAttribs.length; j++) {
			if (oAttribs[j].specified == true) {
				data += "'" + oAttribs[j].nodeName + "':'"
						+ oAttribs[j].nodeValue + "',";
			}
		}

		if (data != "") {
			data = data.substring(0, data.length - 1);
		}

		json += data + "}";

		if (i != uuids.length - 1) {
			json += ",";
		}
	}

	json += "]";

	return eval(json);
}

// 列表按钮接口
function mt_form_listBtn_callJava(tableId, btnId) {
	// alert(tableId);

	var uuid = document.getElementById("chooseValue_" + tableId).value;

	if (uuid == "") {
		uuid = getChooseValue(tableId);
		/*
		if (uuid == "") {
			alert('请选择要操作的数据!');
			return;
		}
		*/
	}

	var requestString = "";

	if(uuid!=""){
	var uuids = uuid.split(",");

	for (var i = 0; i < uuids.length; i++) {

		var divObj = document.getElementById("trValueId_" + uuids[i]);
		var oAttribs = divObj.attributes;

		for (var j = 0; j < oAttribs.length; j++) {
			if (oAttribs[j].specified == true) {
				requestString += "&" + oAttribs[j].nodeName + "="
						+ oAttribs[j].nodeValue;
			}
		}
	}}

	

	var url = MATECH_SYSTEM_WEB_ROOT
			+ "/formQueryConfig.do?method=buttonExtHandle&btnId=" + btnId;
	// alert(url);
	// alert(requestString);
	var result = ajaxLoadPageSynch(url, requestString);

	var t=result.split('`');
	if(t.length>=2){
		//协议模式
		
		if(t[0]=='ng'){
			//失败
			alert(t[1]);
		}
		if(t[0]=='edit'){
			//新开标签页的编辑模式
		//	alert("ggogoggoog");
			var url = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=formTree&formId=" + t[1] + "&uuid=" + t[2];
			window.location.href = url;
			//openTab(t[2], t[3], url, null);
			//alert(222);
		}
	}else{
		//刷新模式
		
		//弹出保存成功之类的提示，并刷新；
		alert(result);
		try {
			var method = "goSearch_" + tableId + "(2)";
			eval(method);
		} catch (e) {
			alert(e);
		}
	}

	
}

// 表单按钮接口
function mt_form_formBtn_CallJava(btnId) {
	// alert(tableId);

	var uuid = document.getElementById("uuid").value;

	var requestString = "&uuid=" + uuid;

	var url = MATECH_SYSTEM_WEB_ROOT
			+ "/formQueryConfig.do?method=buttonExtHandle&btnId=" + btnId;

	var result = ajaxLoadPageSynch(url, requestString);

	alert(result);
}

// 创建行
function mt_createRow(tableId, rows, cells,rowIndex) {
	var rs, cs;

	if (rows == "") {
		rs = 0;
	} else {
		rs = rows;
	}

	if (cells == "") {
		cs = 0;
	} else {
		cs = cells;
	}

	var table = document.getElementById(tableId);
	var r = table.rows.length;	
	if(rowIndex) r = rowIndex;	
	for (var i = 0; i < rs; i++) {
		// 添加一行
		var newTr = table.insertRow(r);
		for (var j = 0; j < cs; j++) {
			// 添加列
			var newTd = newTr.insertCell();
		}
	}
}

// 删除
function mt_remove(img) {

	if (confirm("您确定要删除吗?")) {
		if (img.group) {
			// 删除同组的记录
			var imgs = Ext.query("img[group=" + img.group + "]");
			Ext.each(imgs, function(img) {
				img.parentNode.parentNode.removeChild(img.parentNode);
			});

		}

		img.parentNode.parentNode.parentNode
				.removeChild(img.parentNode.parentNode);

	}

	mt_form_total();

	// 隐藏列
	if (funExists("mt_subform_after_del")) {
		mt_subform_after_del();
	}
}

//检查子表单的列是否已存在，存在就不新增
function mt_check_row_exist(table,jsonArray,fId){
	var jsonObj = [];
	//CI_TYPE_ATTR_attr_id
	var fieldObj = document.getElementsByName(table + "_" + fId);
	
	for (var i = 0; i < jsonArray.length; i++) {
		var json = jsonArray[i];		
		for ( var field in jsonArray[i]) {
			var fieldId = field.toLowerCase().replace("hidden_", "");			
			var value = json[field];			
			if(fId == fieldId){
				var b = false;
				for(var j = 0; j < fieldObj.length; j++){					
					if(fieldObj[j].value == value){
						b = true;
						break;
					}
				}
				if(!b){					
					//不存在
					jsonObj.push(json);
					b = false;
					break;
				}
			}			
		}
	}
	return jsonObj;
}

// 删除所有行
function mt_remove_all(table) {

	var tableObj = document.getElementById(table);

	for (var i = tableObj.rows.length - 1; i >= 1; i--) {
		tableObj.deleteRow(i);
	}
}

// 新增一行
function mt_add(table, length,pObj,importval,rid) {

	var rowId; // Math.round(Math.random() * 10000);
	if (!window.mtRowIdMap) {
		window.mtRowIdMap = {};
	}
	rowId = window.mtRowIdMap[table] = !window.mtRowIdMap[table] ? 1000
			: window.mtRowIdMap[table] + 1;

	var mt_slist = eval('('
			+ document.getElementById("mt_slist_" + table).innerText + ')');
	mt_createRow(table, 1, length,rid);

	var slistLength = mt_slist.length;

	var tbField = document.getElementById(table);
	var r = tbField.rows.length - 1;
	if(rid) r = rid;
	tbField.rows[r].cells[0].align = 'center';
	tbField.rows[r].cells[0].innerHTML = "<img id='"
			+ table
			+ "_delImg_"
			+ rowId
			+ "' flag="
			+ table
			+ "_del style='cursor:hand;' alt='删除本行' onclick='mt_remove(this)' src='"
			+ contextPath + btn_img_url + "close.png' >";

	var colCount = 0;

	var cell = tbField.rows[r].cells[0];

	var userAgent = navigator.userAgent;
	var iamIE = userAgent.indexOf('MSIE') >= 0;
	for (var i = 1; i <= slistLength; i++) {

		if(cell.nextSibling != null){
			cell = cell.nextSibling;
		}
		if(cell){
			cell.innerHTML =mt_slist[i - 1]+cell.innerHTML ;
			
			var list = cell.childNodes;
			
			if(list.length==1){
				var inputObj=list[0];
				//纯粹在HIDDEN，不是附件和图片
				if (inputObj.type == "hidden" 
					&& inputObj.getAttribute("ext_type") != "attachFile" 
					&& inputObj.getAttribute("ext_type") != "img"
					&& inputObj.getAttribute("ext_type") != "radio"
					&& inputObj.getAttribute("ext_type") != "checkbox"				
				) {
					cell = cell.previousSibling;
				}
			}
			
			for(var j=0;j<list.length;j++) {
				var inputObj=list[j];
				//alert(inputObj.tagName);
				
				if(!inputObj.id){
					//连ID都没有的，就跳过去
					continue;
				}
				if(importval && importval[$(inputObj).attr("field")]){
					inputObj.value=importval[$(inputObj).attr("field")] ;
				}
				if (inputObj.id.indexOf('_' + rowId)>0){
					//已经改过ID，说明后面的都处理了
					break;
				}
				
				//==============改ID等属性
				inputObj.id = inputObj.id + '_' + rowId;
				
				if(inputObj.tagName.toLowerCase()=='input' && (inputObj.type.toLowerCase()=='radio' ||inputObj.type.toLowerCase()=='checkbox' )){
					//radio 连名字都要换
					inputObj.name = inputObj.name + '_' + rowId;
					inputObj.setAttribute("field", inputObj.getAttribute("field") + '_' + rowId);
					
				}
				
				if(inputObj.getAttribute("ext_default") 
					&& inputObj.getAttribute("ext_default") != null 
					&& inputObj.getAttribute("ext_default") != ""){
					inputObj.value = inputObj.getAttribute("ext_default");
				}
				
				if (inputObj.getAttribute("refer")) {
					// $2, 替换成本行的ID
					inputObj.setAttribute("refer", inputObj.getAttribute("refer").replace("_\$rowIndex", "_" + rowId));
				}
		
				if (inputObj.getAttribute("refer1")) {
					// $3, 替换成本行的ID
					inputObj.setAttribute("refer1", inputObj.getAttribute("refer1").replace("_\$rowIndex", "_"+ rowId));
				}
		
				if (inputObj.getAttribute("refer2")) {
					// $4, 替换成本行的ID
					inputObj.setAttribute("refer2", inputObj.getAttribute("refer2").replace("_\$rowIndex", "_"+ rowId));
				}
				
				//================变成其他控件形式
				if (inputObj.getAttribute("autoid")) {
					initCombox(inputObj);
				}
		
				if (inputObj.getAttribute("ext_type") == "date") {
					mt_form_initDateSelect(inputObj);
				}
				
				if (inputObj.getAttribute("ext_type") == "time") {
					mt_form_initTimeSelect(inputObj);
				}
				
				if (inputObj.getAttribute("ext_type") == "datetime") {
					mt_form_initDateTimeSelect(inputObj);
				}
				
				if (inputObj.getAttribute("ext_type") == "attachFile") {
					mt_form_initAttachFile(inputObj);
				}
				if (inputObj.getAttribute("ext_type") == "img") {
					mt_form_initAttachImg(inputObj);
				}
				if (inputObj.getAttribute("ext_type") == "radio" || inputObj.getAttribute("ext_type") == "checkbox" ) {
					mt_form_initRadioCheckbox(inputObj);
				}
				if (inputObj.getAttribute("ext_type") == "scrollbar" ) {
					mt_form_initscrollbar(inputObj);
				}
				//初始化评分控件
				if (inputObj.getAttribute("ext_validate") == "score") {
					score(inputObj);
				}

				if (inputObj.getAttribute("ext_type") == "tagit" ) {
					mt_form_initTagit(inputObj);
				}
				
			}
			
		}
		
	}
	// 隐藏列
	if (funExists("mt_subform_after_add")) {
		mt_subform_after_add(table, rowId,pObj);
	}
	return rowId;
}


//新增一行
function mt_add_template(table, length,pObj,mode,importval) {

	var rowId; // Math.round(Math.random() * 10000);
	if (!window.mtRowIdMap) {
		window.mtRowIdMap = {};
	}
	rowId = window.mtRowIdMap[table] = !window.mtRowIdMap[table] ? 1000
			: window.mtRowIdMap[table] + 1;

	var mt_slist = eval('('
			+ document.getElementById("mt_slist_" + table).innerText + ')');
	mt_createRow(table, 1, 2);

	var slistLength = mt_slist.length;

	var tbField = document.getElementById(table);
	tbField.rows[tbField.rows.length - 1].cells[0].align = 'center';
	tbField.rows[tbField.rows.length - 1].cells[0].innerHTML = "<img id='"
			+ table
			+ "_delImg_"
			+ rowId
			+ "' flag="
			+ table
			+ "_del style='cursor:hand;' alt='删除本行' onclick='mt_remove(this)' src='"
			+ contextPath + btn_img_url + "close.png' >";

	var colCount = 0;

	var cell = tbField.rows[tbField.rows.length - 1].cells[0];
	
	var userAgent = navigator.userAgent;
	var iamIE = userAgent.indexOf('MSIE') >= 0;
	var templatehtml = $("#mt_templatehtml_"+table).val() ;
	var inputhtml = "" ;
	var j=0 ;
	
	
	
	for (var i = 1; i <= slistLength; i++) {
		if(mt_slist[j].indexOf("ext_type=\"hidden\"")>0 
				&& mt_slist[j].indexOf("ext_type=\"attachFile\"")<0 
				&& mt_slist[j].indexOf("ext_type=\"img\"")<0
				&& mt_slist[j].indexOf("ext_type=\"radio\"")<0
				&& mt_slist[j].indexOf("ext_type=\"checkbox\"")<0){
			inputhtml+=mt_slist[j] ;
			i-- ;
			slistLength-- ;
		}else{
			templatehtml = templatehtml.replace("${"+i+"}",mt_slist[j]) ;
		}
		j++ ;
	}
	if(inputhtml!=""){
		templatehtml+="<div style='display:none'>"+inputhtml+"</div>" ;
	}
	if(cell.nextSibling != null){
		cell = cell.nextSibling;
	}
	if(cell){
		cell.innerHTML =templatehtml+cell.innerHTML ;
		
		var list = $(cell).find("[id*="+table+"]") ;
		
			for(var j=0;j<list.length;j++) {
				var inputObj=list[j];
				//alert(inputObj.tagName);
				
				if(!inputObj.id){
					//连ID都没有的，就跳过去
					continue;
				}
				if(importval && importval[$(inputObj).attr("field")]){
					inputObj.value=importval[$(inputObj).attr("field")] ;
				}
				
				if (inputObj.id.indexOf('_' + rowId)>0){
					//已经改过ID，说明后面的都处理了
					break;
				}
				
				//==============改ID等属性
				inputObj.id = inputObj.id + '_' + rowId;
				
				if(inputObj.tagName.toLowerCase()=='input' && (inputObj.type.toLowerCase()=='radio' ||inputObj.type.toLowerCase()=='checkbox' )){
					//radio 连名字都要换
					inputObj.name = inputObj.name + '_' + rowId;
					inputObj.setAttribute("field", inputObj.getAttribute("field") + '_' + rowId);
					
				}
				
				if(inputObj.getAttribute("ext_default") 
					&& inputObj.getAttribute("ext_default") != null 
					&& inputObj.getAttribute("ext_default") != ""){
					inputObj.value = inputObj.getAttribute("ext_default");
				}
				
				if (inputObj.getAttribute("refer")) {
					// $2, 替换成本行的ID
					inputObj.setAttribute("refer", inputObj.getAttribute("refer").replace("_\$rowIndex", "_" + rowId));
				}
		
				if (inputObj.getAttribute("refer1")) {
					// $3, 替换成本行的ID
					inputObj.setAttribute("refer1", inputObj.getAttribute("refer1").replace("_\$rowIndex", "_"+ rowId));
				}
		
				if (inputObj.getAttribute("refer2")) {
					// $4, 替换成本行的ID
					inputObj.setAttribute("refer2", inputObj.getAttribute("refer2").replace("_\$rowIndex", "_"+ rowId));
				}
				
				//================变成其他控件形式
				if (inputObj.getAttribute("autoid")) {
					initCombox(inputObj);
				}
		
				if (inputObj.getAttribute("ext_type") == "date") {
					mt_form_initDateSelect(inputObj);
				}
				
				if (inputObj.getAttribute("ext_type") == "time") {
					mt_form_initTimeSelect(inputObj);
				}
				
				if (inputObj.getAttribute("ext_type") == "datetime") {
					mt_form_initDateTimeSelect(inputObj);
				}
				
				if (inputObj.getAttribute("ext_type") == "attachFile") {
					mt_form_initAttachFile(inputObj);
				}
				if (inputObj.getAttribute("ext_type") == "img") {
					mt_form_initAttachImg(inputObj);
				}
				if (inputObj.getAttribute("ext_type") == "radio" || inputObj.getAttribute("ext_type") == "checkbox" ) {
					mt_form_initRadioCheckbox(inputObj);
				}
				if (inputObj.getAttribute("ext_type") == "scrollbar" ) {
					mt_form_initscrollbar(inputObj);
				}
				//初始化评分控件
				if (inputObj.getAttribute("ext_validate") == "score") {
					score(inputObj);
				}
				if (inputObj.getAttribute("ext_type") == "tagit" ) {
					mt_form_initTagit(inputObj);
				}
			}
	}
	// 隐藏列
	if (funExists("mt_subform_after_add")) {
		mt_subform_after_add(table, rowId,pObj);
	}
	if(mode==1){
		newwindow(cell,table) ;
		$(cell).on("click",function(){newwindow(this,table) ;})
	}
	return rowId;
}

//子表导入
var showImportsubformWin =new Ext.Window({
	title:'子表单批量导入EXCEL',
	width:400,
	height:240,
	closeAction:'hide',
	plain:true,
	layout:'form',
	html:"<iframe name='openwin' id='openwin' src='"+MATECH_SYSTEM_WEB_ROOT+"form/subformImport.jsp' scrolling='auto' style='width:100%;height:100%;margin:0;padding:0'></iframe>",
	buttonAlign:'right',
	closeAction:'hide',
	buttons:[{
		text:'关闭',
		handler:function(){
			showImportsubformWin.hide() ;
			//loadtable() ;
			
		}
	}]
});
var mt_value_sub ="" ;//导入列字段名
var mt_slist_sub = "" ;//每列的input控件
var mt_value_chsub = "" ;//导入字段名中文
var mt_list_autoid = "" ;//字段对应的下拉编号后台来匹配
var mt_subtable_name = ""
function showImportsubform(subtable) {
	if(document.getElementById(subtable+"_readonly")){
		return false;
	}
	mt_subtable_name = subtable ;
	//根据传过来的字表名称来获取列名称，
	mt_slist_sub = eval('('
			+ document.getElementById("mt_slist_" + subtable).innerText + ')');

	mt_value_sub ="" ;
	mt_value_chsub = "" ;
	mt_list_autoid = "" ;
	var s1 = (document.getElementById("mt_value_" + subtable).innerText).split("`") ; 
	var s2 = (document.getElementById("mt_value_ch_" + subtable).innerText).split("`")  ;
	//隐藏字段不需要导入
	for(var i=1;i<mt_slist_sub.length;i++){
		if(mt_slist_sub[i].indexOf("ext_type=\"hidden\"")>0 
				&& mt_slist_sub[i].indexOf("ext_type=\"attachFile\"")<0 
				&& mt_slist_sub[i].indexOf("ext_type=\"img\"")<0
				&& mt_slist_sub[i].indexOf("ext_type=\"radio\"")<0
				&& mt_slist_sub[i].indexOf("ext_type=\"checkbox\"")<0){
			
		}else{
			//构造列名
			if(mt_slist_sub[i].indexOf("autoid=\"")>0){
				var t = mt_slist_sub[i].substring(mt_slist_sub[i].indexOf("ext_select=\"")+12,mt_slist_sub[i].length) ;
				var autoid = t.substring(0,t.indexOf("\"")) ;
				mt_list_autoid+=s1[i]+"`"+autoid+"," ;
			}
			mt_value_sub+=s1[i]+"," ;
			mt_value_chsub+=s2[i]+"," ;
		}
	}
	
	if(mt_value_sub!=""){
		mt_value_sub= mt_value_sub.substring(0,mt_value_sub.length-1) ;
		mt_value_chsub= mt_value_chsub.substring(0,mt_value_chsub.length-1) ;
	}
	if(mt_list_autoid!=""){
		mt_list_autoid= mt_list_autoid.substring(0,mt_list_autoid.length-1) ;
	}
	//alert(mt_value_sub+"/n-------/n"+mt_value_chsub+"/n--------/n"+mt_list_autoid) ;
	showImportsubformWin.show() ;
}
function mt_add_import(sublists){
	var templatehtml = $("#mt_templatehtml_"+mt_subtable_name).val() ;
	for(var i=0;i<sublists.length;i++){
		if(templatehtml){
			mt_add_template(mt_subtable_name,mt_slist_sub.length,"","",sublists[i]) ;
		}else{
			mt_add(mt_subtable_name,mt_slist_sub.length,"",sublists[i]) ;	
		}
		
	}
	
}
//字表单弹出显示
var querySelect = null;
var inputobj = "" ;
function newwindow(obj,table){
	
	
	if (typeof (obj) == "string") {
		obj = $("tr[keyvalue="+obj+"]") ;
	}
	
	inputobj = obj ;
	if(!document.getElementById("newwindow")){
		$("body").append("<div  id='newwindow'></div>") ;
	}else{
		document.getElementById("newwindow").style.display = "";
		document.getElementById("newwindow").innerHTML="" ;
	}
	var mt_slist = eval('('
			+ document.getElementById("mt_slist_" + table).innerText + ')');
	

	
	
	
	var slistLength = mt_slist.length;
	var rowId = "9999" ;
	var tablehtml = "<table align='center' style='background-color:transparent ;' cellspacing=\"1\" cellpadding=\"3\" border=\"0\" class='listTable' id='table1'><tr>" ;
	for(var i=0;i<slistLength;i++){
		var a = ("id=\""+table+"_") ;
		var str = mt_slist[i].substring(mt_slist[i].indexOf(a)+a.length,mt_slist[i].length) ;
		
		
		if(i!=0&&mt_slist[i].indexOf("ext_type=\"hidden\"")>0 
				&& mt_slist[i].indexOf("ext_type=\"attachFile\"")<0 
				&& mt_slist[i].indexOf("ext_type=\"img\"")<0
				&& mt_slist[i].indexOf("ext_type=\"radio\"")<0
				&& mt_slist[i].indexOf("ext_type=\"checkbox\"")<0){
			tablehtml +="<th>"+str.substring(0,str.indexOf("\""))  +"</th>" ;
			tablehtml +="<td >"+mt_slist[i].replace("ext_type=\"hidden\"").replace("type=\"hidden\"") +"</td>" ;
			
		}else if(i==0&&mt_slist[i].indexOf("ext_type=\"hidden\"")>0 
				&& mt_slist[i].indexOf("ext_type=\"attachFile\"")<0 
				&& mt_slist[i].indexOf("ext_type=\"img\"")<0
				&& mt_slist[i].indexOf("ext_type=\"radio\"")<0
				&& mt_slist[i].indexOf("ext_type=\"checkbox\"")<0){
			
		}else{
			tablehtml +="<th>"+str.substring(0,str.indexOf("\""))  +"</th>" ;
			tablehtml +="<td>"+mt_slist[i]+"</td>" ;
		}
		
		if(i!=0&&i%2==0)
		 tablehtml += "<tr></tr>" ;
	}
	tablehtml += "</tr></table>" ;
	document.getElementById("newwindow").innerHTML = tablehtml ;
	

	var list = $("#table1").find("[id*="+table+"]") ;
	
	for(var j=0;j<list.length;j++) {
		var inputObj=list[j];
		//alert(inputObj.tagName);
		
		if(!inputObj.id){
			//连ID都没有的，就跳过去
			continue;
		}
		
		if (inputObj.id.indexOf('_' + rowId)>0){
			//已经改过ID，说明后面的都处理了
			break;
		}
		
		//==============改ID等属性
		inputObj.id = inputObj.id + '_' + rowId;
		
		if(inputObj.tagName.toLowerCase()=='input' && (inputObj.type.toLowerCase()=='radio' ||inputObj.type.toLowerCase()=='checkbox' )){
			//radio 连名字都要换
			inputObj.name = inputObj.name + '_' + rowId;
			inputObj.setAttribute("field", inputObj.getAttribute("field") + '_' + rowId);
			
		}
		
		if(inputObj.getAttribute("ext_default") 
			&& inputObj.getAttribute("ext_default") != null 
			&& inputObj.getAttribute("ext_default") != ""){
			inputObj.value = inputObj.getAttribute("ext_default");
		}
		
		if (inputObj.getAttribute("refer")) {
			// $2, 替换成本行的ID
			inputObj.setAttribute("refer", inputObj.getAttribute("refer").replace("_\$rowIndex", "_" + rowId));
		}

		if (inputObj.getAttribute("refer1")) {
			// $3, 替换成本行的ID
			inputObj.setAttribute("refer1", inputObj.getAttribute("refer1").replace("_\$rowIndex", "_"+ rowId));
		}

		if (inputObj.getAttribute("refer2")) {
			// $4, 替换成本行的ID
			inputObj.setAttribute("refer2", inputObj.getAttribute("refer2").replace("_\$rowIndex", "_"+ rowId));
		}
		
		//================变成其他控件形式
		if (inputObj.getAttribute("autoid")) {
			initCombox(inputObj);
		}

		if (inputObj.getAttribute("ext_type") == "date") {
			mt_form_initDateSelect(inputObj);
		}
		
		if (inputObj.getAttribute("ext_type") == "time") {
			mt_form_initTimeSelect(inputObj);
		}
		
		if (inputObj.getAttribute("ext_type") == "datetime") {
			mt_form_initDateTimeSelect(inputObj);
		}
		
		if (inputObj.getAttribute("ext_type") == "attachFile") {
			mt_form_initAttachFile(inputObj);
		}
		if (inputObj.getAttribute("ext_type") == "img") {
			mt_form_initAttachImg(inputObj);
		}
		if (inputObj.getAttribute("ext_type") == "radio" || inputObj.getAttribute("ext_type") == "checkbox" ) {
			mt_form_initRadioCheckbox(inputObj);
		}
		if (inputObj.getAttribute("ext_type") == "scrollbar" ) {
			mt_form_initscrollbar(inputObj);
		}
		//初始化评分控件
		if (inputObj.getAttribute("ext_validate") == "score") {
			score(inputObj);
		}
		
	}
	
	
	replaceinput(obj,$("#table1")) ;
	
	
	if(querySelect==null){
		querySelect= new Ext.Window({
			title: '编辑子表单',
			width: 600,
			height:400,
			autoScroll:true,
			modal:true,
			contentEl:'newwindow', 
	        closeAction:'hide',
	        buttons:[
				        {
			            text:'确定',
			          	handler:function() {
			          		//隐藏窗口
			          		querySelect.hide();
			          		//替换 
			          		replaceinput($("#table1"),inputobj) ;
			          		}
			        	}
				    
				    ]
		});
	}
	querySelect.show() ;
}



function replaceinput(obj,obj1){
	var inputlist = $(obj).find("input") ;
	var inputlist1 = $(obj1).find("input") ;
	var textlist = $(obj).find("textarea") ;
	var textlist1 = $(obj1).find("textarea") ;

	for(var i=0;i<inputlist.length;i++){
		
		
		for(var j=0;j<inputlist1.length;j++){
			if($(inputlist1[j]).attr("name")&&$(inputlist1[j]).attr("name") == $(inputlist[i]).attr("name")){
				
				inputlist1[j].value = inputlist[i].value ;
				if($(inputlist[i]).next("input").length>0){
					$(inputlist1[j]).next("input").val($(inputlist[i]).next("input").val()) ;
				}
				if($(inputlist1[j]).attr("ext_type")=="attachFile"){
					mt_form_initAttachFile(inputlist1[j]) ;	
				}
			}
		}
	}
	for(var i=0;i<textlist.length;i++){
		
		for(var j=0;j<textlist1.length;j++){
			if($(textlist1[j]).attr("name")&&$(textlist1[j]).attr("name") == $(textlist[i]).attr("name")){
				
				textlist1[j].value = textlist[i].value ;
			}
		}
	}

	
}






// 下拉GRID填充列表值
function mt_form_setRowValue(obj) {

	var inputId = obj.inputId;
	var inputProperty = obj.property;
	var name = inputId.replace(inputProperty, "");

	var rowIndex = name.split("_")[1];
	var json = Ext.util.JSON.decode(obj.columns);

	for ( var field in json) {
		var fieldId = field.toLowerCase().replace("hidden_", "");
		fieldId = inputProperty + fieldId + "_" + rowIndex;
		if (document.getElementById(fieldId)) {
			document.getElementById(fieldId).value = json[field];

			if (Ext.getCmp(fieldId)) {
				Ext.getCmp(fieldId).setRealValue(json[field]);
			}
		}
	}
}

// 下拉GRID填充列表值
function mt_form_setRowValues(obj) {
	var jsonArray = Ext.util.JSON.decode(obj.columns);

	var fId = obj.fieldId;
	var property = obj.property;
	var tableName = property.split("~`")[0];
	var colCount = property.split("~`")[1];
	
	if(fId){
		jsonArray = mt_check_row_exist(tableName,jsonArray,fId);//判断一下填充列是否已存在，存在就不新增
	}else{
		mt_remove_all(tableName); //删除所有行
	}	

	for (var i = 0; i < jsonArray.length; i++) {
		var json = jsonArray[i];
		var rowIndex = mt_add(tableName, colCount);
		for ( var field in jsonArray[i]) {
			var fieldId = field.toLowerCase().replace("hidden_", "");

			if (fieldId == "select_group") {
				document.getElementById(tableName + "_delImg_" + rowIndex).group = json[field];
			}
			fieldId = tableName + "_" + fieldId + "_" + rowIndex;
			if (document.getElementById(fieldId)) {
				document.getElementById(fieldId).value = json[field];

				if (Ext.getCmp(fieldId)) {
					Ext.getCmp(fieldId).setRealValue(json[field]);
				}
			}
		}
	}
}

// 下拉GRID填充表单值
function mt_form_setValue(obj) {

	var json = Ext.util.JSON.decode(obj.columns);

	for ( var field in json) {
		var fieldId = field.toLowerCase().replace("hidden_", "");
		if (document.getElementById(fieldId)) {
			document.getElementById(fieldId).value = json[field];

			if (Ext.getCmp(fieldId)) {
				Ext.getCmp(fieldId).setRealValue(json[field]);
			}
			// Ext.getCmp(fieldId).setRawValue
			// initCombox(document.getElementById(fieldId));
		}
	}
}

// 初始化附件上传控件
function mt_form_initAttachFile(param) {
	var inputArray;

	if (param) {
		if (typeof (param) == "string") {
			inputArray = Ext.query("#" + param);
		} else {
			var arr = new Array();
			arr.push(param);
			inputArray = arr;
		}
	} else {
		inputArray = Ext.query("input[ext_type=attachFile]");
	}

	Ext.each(inputArray, function(input) {
		attachInit(input.id);
	});

}

//上传是图片
function mt_form_initAttachImg(param) {
	var inputArray;

	if (param) {
		if (typeof (param) == "string") {	
			//alert(document.getElementById(param));	
			//inputArray = Ext.query("#" + param);
			var arr = new Array();
			arr.push(document.getElementById(param));
			inputArray = arr;
		} else {
			var arr = new Array();
			arr.push(param);
			inputArray = arr;
		}
	} else {
		inputArray = Ext.query("input[ext_type=img]");
	}

	Ext.each(inputArray, function(input) {
		attachImageInit(input.id);
	});

}

// 初始化extjs日期控件
function mt_form_initDateSelect(param) {
	var inputArray;

	if (param) {
		if (typeof (param) == "string") {
			inputArray = Ext.query("#" + param);
		} else {
			var arr = new Array();
			arr.push(param);
			inputArray = arr;
		}
	} else {
		inputArray = Ext.query("input[ext_type=date]");

	}

	var plugins = "";
	var format = "Y-m-d";

	Ext.each(inputArray, function(input) {

		if (!input.readOnly) {
			if (input.ext_format) {

				if (input.ext_format == "yyyy-MM-dd") {
					plugins = "";
					format = "Y-m-d";
				} else if (input.ext_format == "yyyy-MM") {
					plugins = "monthPickerPlugin";
					format = "Y-m";
				}
			}

			/*new Ext.form.DateField({
				id : input.id + '-date',
				applyTo : input.id,
				width : 100,
				plugins : plugins,
				format : format,
				editable : false,
				cls : "inline"
			});*/
			var myid = "#"+input.id;
			$(myid).datepicker({
				//$.datepicker.regional['es']
				controlType: 'select',
				changeMonth: true,
				changeYear: true
			});			
			$(myid).blur(function(){
				//验证时间格式
				if(!($(myid).val()=='' || $(myid).val()==null)){
					var re =/^(\d{4})\-(\d{2})\-(\d{2})$/;
					var r = (re).test($(myid).val());//与输入的日期进行匹配
			        if(!r)
			        {
			        	alert('对不起，您输入的日期格式不正确!'); 
			        	$(myid).val('');
			        } 
				}
				 
			});
		}

	});
}

//初始化时间控件
function mt_form_initTimeSelect(param) {
	var inputArray;

	if (param) {
		if (typeof (param) == "string") {
			inputArray = Ext.query("#" + param);
		} else {
			var arr = new Array();
			arr.push(param);
			inputArray = arr;
		}
	} else {
		inputArray = Ext.query("input[ext_type=time]");

	}

	Ext.each(inputArray, function(input) {

		if (!input.readOnly) {
			var myid = "#"+input.id;
			//alert("2" + myid);
			$(myid).timepicker({
				//changeMonth: true,
				//changeYear: true
			});
		}

	});
}

// 初始化[日期时间控件]
function mt_form_initDateTimeSelect(param) {
	var inputArray;
	if (param) {
		if (typeof (param) == "string") {
			try {
				inputArray = Ext.query("#" + param);
			} catch (e) {
				var input = document.getElementById(param);
				var arr = new Array();
				arr.push(input);
				inputArray = arr;
			}
		} else {
			var arr = new Array();
			arr.push(param);
			inputArray = arr;
		}
	} else {
		inputArray = Ext.query("input[ext_type=datetime]");
	}

	var plugins = "";
	var format = "Y-m-d H:i:s";

	Ext.each(inputArray, function(input) {

		if (!input.readOnly) {
			/*new Ext.ux.form.DateTimeField({
				id : input.id + '-date',
				applyTo : input.id,
				width : 200,
				plugins : plugins,
				format : format,
				cls : "inline"
			});*/
			var id = "#" + input.id;
			$(id).datetimepicker({
				changeMonth: true, 
			    changeYear: true, 
				stepMinute: 1,
				stepSecond: 1,
				controlType :'select',
				showButtonPanel: true,  
			    beforeShow: function( input ) {  
			        setTimeout(function() {  
			          var buttonPane = $( input )  
			            .datepicker( "widget" )  
			            .find( ".ui-datepicker-buttonpane" );  
			            
			          $( "<button>", {  
			            text: "清空", 
			            "class": "ui-state-default",
			            style:"border-radius: 4px;font-weight: 700;",
			            click: function() {  
			              $.datepicker._clearDate( input );  
			            }  
			          }).appendTo( buttonPane );  
			        }, 1 );  
			    } 
			});
			
			$(id).blur(function(){
				//验证时间格式
				if(!($(id).val()=='' || $(id).val()==null)){
					var re =/^(\d{2}|\d{4})(?:\-)?([0]{1}\d{1}|[1]{1}[0-2]{1})(?:\-)?([0-2]{1}\d{1}|[3]{1}[0-1]{1})(?:\s)?([0-1]{1}\d{1}|[2]{1}[0-3]{1})(?::)?([0-5]{1}\d{1})(?::)?([0-5]{1}\d{1})?$/;
					var r = (re).test($(id).val());//与输入的日期进行匹配
			        if(!r)
			        {
			        	alert('您输入的日期时间格式不正确!'); 
			        	$(id).val('');
			        	$('#edit_time').val('');
			        } 
				}
			});
			
		}

	});
}

//初始化=【单选框、多选框】
function mt_form_initRadioCheckbox(param) {
	var inputArray;
	if (param) {
		if (typeof (param) == "string") {
			try {
				inputArray = Ext.query("#" + param);
			} catch (e) {
				var input = document.getElementById(param);
				var arr = new Array();
				arr.push(input);
				inputArray = arr;
			}
		} else {
			var arr = new Array();
			arr.push(param);
			inputArray = arr;
		}
	} else {
	
		inputArray = Ext.query("input[ext_type=radio]");
		inputArray = inputArray.concat(Ext.query("input[ext_type=checkbox]"));
	}
	
	var DEFAULT_REFRESHURL = MATECH_SYSTEM_WEB_ROOT + "/hint.do?method=combox";
	
	Ext.each(inputArray, function(input) {
		
		var ext_id = input.id;
		var ext_value = input.value;
		var ext_type = input.getAttribute("ext_type");
		var ext_select = input.getAttribute("ext_select");
		var ext_onselect = input.getAttribute("ext_onselect");
		var ext_onclick = input.getAttribute("ext_onclick");
		var ext_cols = input.getAttribute("ext_cols");
		var ext_rows = input.getAttribute("ext_rows");
		var turn = input.getAttribute("turn"); //转工单
		var ext_class = input.className;		
		
		var objs = [];
		var selects = ext_select.split("|");
		//1、ext_select=0|男|女 [这是固定的分组]   
		//2、ext_select=700|性别 [这是通过下拉表的动态分组，id:值,name:显示]
		if(selects[0] != "0"){
			var request = "&autoid=" + selects[0] +"&refer=" + selects[1];
			//为了实现翻译下拉;
			var __mt_formid=document.getElementById("mt_formid");
			var __uuid=document.getElementById("uuid");
			if(__mt_formid){
				request+="&__mt_formid="+__mt_formid.value;
			}
			if(__uuid){
				request+="&__uuid="+__uuid.value;
			}
			var result = ajaxLoadPageSynch(DEFAULT_REFRESHURL, request);			
			var lst = Ext.util.JSON.decode(result);
			objs = lst.data;
		}else{
			for(var i = 1;i<selects.length;i++){
				var obj = {};		
				obj["id"] = selects[i];
				obj["text"] = selects[i];
				obj["value"] = selects[i];
				objs.push(obj);
			}
		}
			
		var inputHtml = "",inputClick = "",inputTurn = "";
		if(ext_onselect && ext_onselect != "") inputClick += ext_onselect + ";";
		if(ext_onclick && ext_onclick != "") inputClick += ext_onclick + ";";
		if(turn && turn == "true") inputTurn = " ext_turn=true ";
		if(ext_class && ext_class == "readonly") inputTurn += " disabled ";
		
		//如果length<5就使用自动width
		var tablewidth="100%" ;
		var autobr = input.getAttribute("ext_autobr");
		if(!autobr || isNaN(autobr)) autobr = 5;    //可自行设定几个复选框自动换行，默认值为5个自动换行
		if(objs.length<autobr){
			tablewidth="auto" ;
		}
		inputHtml = '<table border="0" style="width: '+tablewidth+'; border-collapse:separate;border-spacing:0px;" align="left"><tr>'
		for(var i=0;i<objs.length;i++){		
			var check = "";	
			if((","+ext_value+",").indexOf(","+objs[i]["value"]+",")>-1) check = "checked";
			
			inputHtml += '<td>';
			inputHtml += "<input " + inputTurn + " class='"+ext_class+"' type='"+ext_type+"' id='" + ext_id + "_" + i +"' name='_" + ext_id +"' ntext='"+objs[i]["text"]+"' value='"+objs[i]["value"]+"' field='" + ext_id +"' "+check+" onclick='setHiddenValue(this);"+inputClick+"' />" ;
			if(input.getAttribute("ext_oneview")){
				inputHtml += objs[i]["text"] ;//+ "&nbsp;&nbsp;";
			}else{
				if(objs.length>1){
					inputHtml += objs[i]["text"] ;//+ "&nbsp;&nbsp;";			
				}	
			}
						
			inputHtml += "</td>"
			if(ext_cols != null && ext_cols=="true") {
				inputHtml += "</tr><tr>";
			}else{
				if(ext_rows != "true"){
					if(i>0 && (i+1)%autobr==0){
						inputHtml += "</tr><tr>";
					}
				}
			}
		}
		inputHtml += "</tr></table>";
		
		var divObj = mycreateElement("<div id=\"__div" + ext_id + "\" ></div>","div","__div" + ext_id); //style='text-align:left'
		divObj = input.parentElement.insertBefore(divObj, input);
		divObj.innerHTML=inputHtml;
		
		//兜底方法,哪天DIV不好就换回来
		//input.parentElement.innerHTML=input.outerHTML+inputHtml;
		
	});
	
	
}

//初始化进度滚动条
function mt_form_initscrollbar(param){
	var inputArray;

	if (param) {
		if (typeof (param) == "string") {
			inputArray = Ext.query("#" + param);
		} else {
			var arr = new Array();
			arr.push(param);
			inputArray = arr;
		}
	} else {
		inputArray = Ext.query("input[ext_type=scrollbar]");

	}


	Ext.each(inputArray, function(input) {
		
			var myid = "#"+input.id;
			//alert("2" + myid);
			var ext_size = input.getAttribute("ext_size");
			if(!ext_size) ext_size = 150;
			$(myid).jRange({
				from: 0,//最小值
				to: 100,//最大值
				step: 1,//刻度
				//scale: [0,25,50,75,100],
				//disable: true, //是否禁用
				format: '%s',
				inputid:$(myid),//给当前文本赋值
				width: ext_size,//文本宽度
				showLabels: true,//是否显示值
				showScale: true //是否显示 scale属性
				
			});						

	});
	
	
	
}


// 初始化只读
function mt_form_initReadonly() {
	var inputArray = Ext.query("input[ext_readonly]");

	Ext.each(inputArray, function(input) {
		input.className = "readonly";
	});
}

function mt_form_total(obj) {

	var formulaArray = Ext.query("input[formula]");

	Ext.each(formulaArray, function(input) {

		var formula = input.formula;
		formula = formula.replace(new RegExp("sum\\(", "gm"), "mt_form_sum(");
		formula = formula.replace(new RegExp("value\\(", "gm"),
				"mt_form_value(");
		formula = formula.replace(new RegExp("sumif\\(", "gm"),
				"mt_form_sumif(");
		formula = formula.replace(new RegExp("rowValue\\(", "gm"),
				"mt_form_rowValue(");
		formula = formula.replace(new RegExp("`", "gm"), "'");
		formula = formula.replace(new RegExp("，", "gm"), ",");
		formula = formula.replace(new RegExp("《", "gm"), "<");
		formula = formula.replace(new RegExp("》", "gm"), ">");

		if (obj) {
			// 只执行相关的
			var objName = obj.name;
			if (formula.indexOf(objName) > -1) {

				if (formula) {
					var formulaValue = eval(formula);
					input.value = formulaValue;
					input.fireEvent("onchange");
				}
			}
		} else {
			// 执行全部
			if (formula) {
				var formulaValue = eval(formula);
				input.value = formulaValue;
				input.fireEvent("onchange");
			}
		}

	});
}

function mt_form_sum(name) {
	var sum = 0.00;
	var sumArray = document.getElementsByName(name);
	for (var i = 0; i < sumArray.length; i++) {
		var sumValue = sumArray[i].value;

		if (sumValue) {
			sum += parseFloat(sumValue);
		}
	}
	return sum;
}

function mt_form_value(name) {

	var sum = 0.00;
	var sumArray = document.getElementsByName(name);
	if (sumArray) {
		if (sumArray[0].value)
			sum += parseFloat(sumArray[0].value);
	}
	return sum;
}

function mt_form_sumif(condition, name1, name2) {

	var name1Arr = document.getElementsByName(name1);
	var name2Arr = document.getElementsByName(name2);
	var forName = name1Arr;
	if (name1Arr.length < 1) {
		forName = name2Arr;
	}

	var sumValue = 0.00;
	for (var i = 0; i < forName.length; i++) {
		var curCondition = condition.replace(new RegExp("\\\$rowObj", "gm"),
				"curObj");
		var curObj = forName[i];
		var conditionResult;

		try {
			conditionResult = eval(curCondition);
		} catch (e) {
			alert("条件【" + condition + "】出现语法错误,错误原因：" + e + "请联系管理员检查!");
			return;
		}
		if (conditionResult) {
			if (name1Arr[i]) {
				sumValue += parseFloat(name1Arr[i].value ? name1Arr[i].value
						: 0);
			}
		} else {
			if (name2Arr[i]) {
				sumValue += parseFloat(name2Arr[i].value ? name2Arr[i].value
						: 0);
			}
		}
	}
	return sumValue;
}

function mt_form_rowValue(name, obj) {
	if (!obj)
		return;
	var srcElement = obj;

	var trObj = srcElement.parentNode.parentNode;
	var trElement = Ext.fly(trObj);
	var curRowObj = trElement.child('input[name=' + name + ']', true);
	var value = 0.00;
	if (curRowObj) {
		value = curRowObj.value;
	}
	if (!value)
		value = 0.00;
	return parseFloat(value);
}

function mt_form_initSubmit() {

	/*
	 * var formArray = Ext.query("form") ;
	 * 
	 * Ext.each(formArray,function(form){ form.tempSubmit = form.submit ;
	 * form.submit = function (){ showWaiting(); form.tempSubmit(); }; });
	 */
}

function mt_form_checkState(stateField) {
	var data = mt_form_getRowValues();
	if (!data) {
		return false;
	}

	for (var i = 0; i < data.length; i++) {
		var state = eval("data[" + i + "]." + stateField);
		if (state != '草稿' && state != '退件') {
			alert("该数据状态为[" + state + "],不允许操作该数据!!");
			return false;
		}
	}

	return true;
}

function mt_form_saveUrl() {

	Ext.Ajax.request({
		url : 'formDefine.do',
		method : 'post',
		params : {
			method : 'saveUrl',
			url : window.location.href
		}

		,
		success : function(response, options) {
		}
	});
	return true;
}

// textarea自动换行
function autoHeight(obj) {
	var p = "14"; // 每行的高度

	var height = obj.style.height;
	//解决IE兼容模式下，多行输入框宽度会乱变的问题
	var w = obj.style.width;
	
	height = (height.replace("px", "")) * 1;
	var scrollHeight = obj.scrollHeight * 1;
	
	if (height == 0) {
		height = obj.rows * p;
	}
	var mb = myBrowser();
	if("IE" == mb||"Opera" == mb||"FF" == mb){
		if (scrollHeight >= height) {
			obj.style.height = obj.scrollHeight + 'px';
		}
	}else{
		while(obj.scrollTop>0){
			height += obj.scrollTop;
			obj.style.height = height+'px';
		}
	}
	obj.style.width = w;
}
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
  return "Chrome";
 }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}
//页面加载完后页面所有的textarea自动换行
function loadautoHeight() {
	var p = "14"; // 每行的高度
	var obj = $("textarea") ;
	for(var i=0;i<obj.length;i++){
		var height = obj[i].style.height;
		height = (height.replace("px", "")) * 1;
		var scrollHeight = obj[i].scrollHeight * 1;

		if (height == 0) {
			height = obj[i].rows * p;
		}
		if (scrollHeight >= height) {
			obj[i].style.height = obj[i].scrollHeight + 7 + 'px';
		}
	}
}

function setHiddenValue(obj) {
	// 用于设置表单中单选或多选选中的值
	var field = obj['field'];
	if (!field) {
		field = obj.getAttribute('field');
	}

	var fieldValue = "";
	var _fieldObj = document.getElementsByName("_" + field);
	for (var i = 0; i < _fieldObj.length; i++) {
		var o = _fieldObj[i];
		if (o.checked) {
			fieldValue += "," + _fieldObj[i].value;
		}
	}
	if (fieldValue != "")
		fieldValue = fieldValue.substring(1);
	document.getElementById(field).value = fieldValue;

	// 隐藏列
	if (funExists("mt_radio_checkbox_after")) {
		mt_radio_checkbox_after(obj);
	}
	
}

function initEditor(obj) {
	/*try {
		obj = (typeof obj == "string") ? document.getElementById(obj) : obj;
		CKEDITOR.replace(obj.id, {
			customConfig : MATECH_SYSTEM_WEB_ROOT + '/js/ckeditor/config.js'
		});
	} catch (e) {

	}*/
	try {
		obj = (typeof obj == "string") ? document.getElementById(obj) : obj;
		CKEDITOR.replace(obj.id);
	} catch (e) {

	}
}

function mt_form_initStyle() {
	$('label').each(function() {
		$(this).parent().css('text-align', 'right');
	});
}

//根据表单的值，更新对应字段
/*
 *  obj = 当前输入框的对象
 *	autoId = 下拉表的autoId,如果有参数，多个以"|"分隔 ，例:700|XXX
 *	fields = 下拉表SQL的字段，多个以","分隔
 *	forms  = 表单字段，多个以","分隔，与下拉字段一一对应
 */
function commHintSelect(obj,autoId){
	var value = obj.value;
	var aId = autoId.split("|"); 
	var DEFAULT_REFRESHURL = MATECH_SYSTEM_WEB_ROOT + "/hint.do?method=combox";
	var request = "&autoid=" + aId[0] +"&pk1=" + value;
	for(var i = 1;i<aId.length;i++){
		var v = "";
		var pp = Ext.getDom(aId[i]) ;												
		if(!pp) {
			var p1 = Ext.getCmp(aId[i]) ;
			if(p1){
				v = p1.getValue();
			}else{
				v = aId[i];
			}
		}else{
			v = pp.value;
		}	
		if(i-1 == 0){
			request += "&refer=" + v;
		}else{
			request += "&refer" + (i-1) + "=" + v;
		} 
	}
	var result = ajaxLoadPageSynch(DEFAULT_REFRESHURL, request);
	var lst = Ext.util.JSON.decode(result);
	return lst;
} 

function commBackQuery(obj,autoId,fields,forms){

	var value = obj.value;
	if(value == "" || autoId == "" || fields == "" || forms == "") return; //这4个字段为空，不赋值
	
	var lst = commHintSelect(obj,autoId);
	var objs = lst.data[0];	
	
	var field = fields.split(",");
	var name = forms.split(",");
	for(var p in objs){
		for(var i = 0;i<field.length;i++){
			if(p == "__" + field[i]){				
				var p1 = Ext.getCmp(name[i])
				if(p1){
					p1.setValue(objs[p]);
				}else{
					var pp = Ext.getDom(name[i]) ;
					pp.value = objs[p];	
				}
			} 
		}
	}
}

function comconcheck(sql,uid) {
	
	var formId = document.getElementById("formId").value;
	var tableId = document.getElementById("tableId").value;
	var value = document.getElementById("chooseValue_" + tableId).value;
	if(uid){
		value=uid ;
	}
	if (value == '') {
		value = getChooseValue(tableId);
		
		if (value == "") {
			alert('请选择要修改的数据!');
			return false ;

		} else if (value.indexOf(",") > -1) {
			alert('请选择一条需要修改的数据!');
			return false ;
		}
	}
	
	url=MATECH_SYSTEM_WEB_ROOT + "/common.do?method=comconcheck" ;
	var b= false ;
	$.ajax({  
        type : "post",  
        url : url,  
        data : "formId="+formId+"&uuid="+value+"&sql="+sql,  
        async : false,  
        success : function(data){  
        	if(data==""){
        		b= true ;
        	}else{
        		alert(data) ;
        		b= false ;
        	}
        }  
    });
	return b ;
}
Ext.onReady(function() {
	mt_form_initReadonly();
	mt_form_initSubmit();
	mt_form_initStyle();
	//页面加载完后页面所有的textarea自动换行
	//var isIE = !-[1,] ;
	//if(!isIE)
		loadautoHeight();
});
/**
 * 单选，如果没有选择下拉匹配的，直接清空隐藏域
 * @param param 对象
 */
function checkinputuser(param){
    var result =  Ext.getCmp(""+param.id);
    if(result.lastSelectionText==''){
        $('#'+param.id).val("");
    }
    
}

//新版人员下拉
var tagits = [];
function mt_form_initTagit(param){
	var inputArray;
	if (param) {
		if (typeof (param) == "string") {
			try {
				inputArray = Ext.query("#" + param);
			} catch (e) {
				var input = document.getElementById(param);
				var arr = new Array();
				arr.push(input);
				inputArray = arr;
			}
		} else {
			var arr = new Array();
			arr.push(param);
			inputArray = arr;
		}
	} else {
		inputArray = Ext.query("input[ext_type=tagit]");
	}
	
	Ext.each(inputArray, function(input) {
		var id = input.id;
		var value = input.value;
		var width = input.width || input.style.width || 500;
		var tid = input.getAttribute("tid"); 
		var refer = input.getAttribute("refer"); 
		var refer1 = input.getAttribute("refer1"); 
		var refer2 = input.getAttribute("refer2"); 	

		tagits[id] = new Tagit({			
			tagitId : id,				
			initValue : value,
			autoid : tid,
			refer : refer,
			refer1 : refer1,
			refer2 : refer2,			
			width:width
		});
	});
}

//清空选择
function mt_form_initTagit_clearAll(tid){
	var o = tagits[tid];		
	o.clearAll();
}


//评论
var commentList = {};
//动态设置只读属性
//commentList['pl1'].setReadOnly(true);
function mt_form_initComment(param){

    for(var key in commentList) {
        commentList[key].clear();
        commentList[key] = undefined;
    }

    var inputArray;
    if (param) {
        if (typeof (param) == "string") {
            try {
                inputArray = Ext.query("#" + param);
            } catch (e) {
                var input = document.getElementById(param);
                var arr = new Array();
                arr.push(input);
                inputArray = arr;
            }
        } else {
            var arr = new Array();
            arr.push(param);
            inputArray = arr;
        }
    } else {
        inputArray = Ext.query("input[ext_type=comment]");
    }
    
    Ext.each(inputArray, function(input) {
        var id = input.id;
        var value = input.value;
        
        var comment = new Comment({           
            id: id,             
            value : value
        });
        commentList[id] = comment;
    });
}