//新增
function mt_formList_add() {
	var formId = document.getElementById("formId").value;
	var layoutId = document.getElementById("layoutId").value;
	window.location = MATECH_SYSTEM_WEB_ROOT + "/formQuery.do?method=formEditView&formId=" + formId+"&layoutId="+layoutId;
}

//编辑
function mt_formList_edit() {
	//var formId = document.getElementById("formId").value;
	var tableId = document.getElementById("tableId").value;
	
	var value= document.getElementById("chooseValue_" + tableId).value;
	if(value == ''){
		
		value = getChooseValue(tableId);
				
		if(value == "") {
			alert('请选择要修改的数据!');
			return;
		
		} else if(value.indexOf(",") > -1) {
			alert('请选择一条需要修改的数据!');
			return;
		}
	}
	
	document.getElementById("uuid").value = value;
	document.getElementById("thisForm").submit();
	//window.location = MATECH_SYSTEM_WEB_ROOT + "/formQuery.do?method=formEditView&formId=" + formId + "&uuid="+value; 
}

//删除
function mt_formList_remove() {
	var formId = document.getElementById("formId").value;
	var tableId = document.getElementById("tableId").value;
	var layoutId = document.getElementById("layoutId").value;
	
	var value = document.getElementById("chooseValue_" + tableId).value;
	if(value == ""){
		
		value = getChooseValue(tableId);
		
		if(value == "") {
			alert('请选择要删除的数据!');
			return;
		}
	} 
	
	if(confirm("您确认要删除当前选中数据吗？")){
		window.location = MATECH_SYSTEM_WEB_ROOT + "/formQuery.do?method=removeFormData&layoutId="+layoutId+"&formId=" + formId + "&uuid="+value; 
	} else {
		return;
	}
}

//查看
function mt_formList_view(formId, dataUuid) {
	
	var srcFormId = "";
	if(!formId) {
		formId = document.getElementById("formId").value;
	} else {
		srcFormId = document.getElementById("formId").value;
	}
	var layoutId = document.getElementById("layoutId").value;
	
	var value = "";
	
	if(!dataUuid) {
		var tableId = document.getElementById("tableId").value;
		
		var value = document.getElementById("chooseValue_" + tableId).value;
		
		if(value == ''){
			
			value = getChooseValue(tableId);
					
			if(value == "") {
				alert('请选择要查看的数据!');
				return;
			
			} else if(value.indexOf(",") > -1) {
				alert('请选择一条需要查看的数据!');
				return;
			}
		}
	} else {
		value = dataUuid;
	}
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/formQuery.do?method=formEditView&view=true&formId=" + formId+"&layoutId="+layoutId + "&uuid=" + value + "&srcFormId=" + srcFormId;
	
	var tab = parent.mainTab ;
	if(!tab){
		tab=parent.parent.mainTab;
	}
	if(!tab){
		tab=parent.parent.parent.mainTab;
	}
	
    if(tab){
    	var n = tab.getComponent(value); 
    	if (!n) { //判断是否已经打开该面板  
			n = tab.add({    
				'title':"查看详细信息",  
				id:value,
				closable:true,  //通过html载入目标页    
				html:'<iframe id="view_' + value + '" scrolling="no" frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'   
			}); 
    	}
        tab.setActiveTab(n);
	}else {
		window.open(url);
	}	
}


//查看
function mt_subForm_view(formId, field, fieldValue,srcElement) {
	
	if(!formId) {
		alert("formId参数为空,不允许查看") ;
		return ;
	}
	
	if(!field) {
		alert("field参数为空,不允许查看") ;
		return ;
	}
	
	if(!fieldValue) {
		alert("fieldValue参数为空,不允许查看") ;
		return ;
	}
	
	if(fieldValue.indexOf("$") > -1) {
		
		fieldValue = fieldValue.replaceAll("\\$","") ;
		var trObj = srcElement.parentNode.parentNode ;
		var trElement = Ext.fly(trObj) ;
		var curRowObj = trElement.child('input[name='+fieldValue+']',true) ;
		
		if(!curRowObj) {
			alert("找不到fieldValue对应的列的值,不允许查看") ;
			return ;
		}
		
		if(!curRowObj.value) {
			alert("fieldValue对应的列的值为空,不允许查看") ;
			return ;
		}
		
		fieldValue = curRowObj.value ;
	}
	
	mt_subForm_openView(formId, field, fieldValue);
	
}

function mt_subForm_openView(formId, field, fieldValue) {
	fieldValue = encodeURIComponent(encodeURIComponent(fieldValue)) ;
	var url = MATECH_SYSTEM_WEB_ROOT + "/formQuery.do?method=formEditView&view=true&formId=" + formId + "&field=" + field + "&fieldValue=" + fieldValue;
	var tab = parent.mainTab ;
	if(!tab){
		tab=parent.parent.mainTab;
	}
	if(!tab){
		tab=parent.parent.parent.mainTab;
	}
    if(tab){
		n = tab.add({    
			'title':"查看详细信息",  
			closable:true,  //通过html载入目标页    
			html:'<iframe scrolling="no" frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'   
		}); 
        tab.setActiveTab(n);
	}else {
		window.open(url);
	}	
}

function mt_form_initView(){
	var form_obj = document.all; 
	
	//form的值
	for (var i=0; i < form_obj.length; i++ ) {
		e=form_obj[i];
		if (e.tagName=='INPUT' || e.tagName=='TEXTAREA') {
			e.readOnly = true ;
			e.className = "readonly";
			//e.disabled = true;
			e.backgroundImage = "none";
			e.value = e.value.replaceAll("请选择或输入...","") ;
			e.value = e.value.replaceAll("请选择...","") ;
		}
		if(e.tagName=='SELECT'){
			//e.disabled= true;
			e.readOnly = true ;
			e.className = "readonly";
		}
		if(e.tagName == 'A'){
			e.style.display = "none";
			e.disabled = true;
		}
		if(e.tagName == "IMG"){
			if(e.id.indexOf("_viewImg") == -1) {
				e.style.display = "none";
				e.disabled = true;
			}
			
		}
	}
}

//返回
function mt_formList_back() {
	window.history.back(); 
}

//关闭按钮
function mt_formList_close() {
	matech.closeTab(parent);
}

function mt_form_getRowValues() {
	var tableId = document.getElementById("tableId").value;
	
	var uuid = document.getElementById("chooseValue_" + tableId).value;
	
	if(uuid == "") {
		uuid = getChooseValue(tableId);
		if(uuid == "") {
			alert('请选择要操作的数据!');
			return;
		}
	} 
	
	var json = "[";
	
	var uuids = uuid.split(",");
	
	for(var i=0; i < uuids.length; i++) {
		
		var divObj = document.getElementById("trValueId_" + uuids[i]);
		var oAttribs = divObj.attributes;
		
		json += " {";
		
		var data = "";
		
		for (var j = 0; j < oAttribs.length; j++){
			if(oAttribs[j].specified == true){
				data += "'" + oAttribs[j].nodeName + "':'" + oAttribs[j].nodeValue + "',";
			}
		}
		
		if(data != "") {
			data = data.substring(0, data.length -1);
		}
		
		json += data + "}";
		
		if(i != uuids.length-1) {
			json += ",";
		}
	}
	
	json += "]";

	return eval(json);
}

//列表按钮接口
function mt_form_listBtn_callJava(tableId, btnId,params) {
	//alert(tableId);
	
	var uuid = document.getElementById("chooseValue_" + tableId).value;
	
	if(uuid == "") {
		uuid = getChooseValue(tableId);
		if(uuid == "") {
			alert('请选择要操作的数据!');
			return;
		}
	}
	
	var requestString = "";
	
	var uuids = uuid.split(",");
	
	for(var i=0; i < uuids.length; i++) {
		
		var divObj = document.getElementById("trValueId_" + uuids[i]);
		var oAttribs = divObj.attributes;
		
		for (var j = 0; j < oAttribs.length; j++){
			if(oAttribs[j].specified == true){
				requestString += "&" + oAttribs[j].nodeName + "=" + oAttribs[j].nodeValue;
			}
		}
	}
	if(params){
		requestString +=params;
	}
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/formQueryConfig.do?method=buttonExtHandle&btnId=" + btnId;
	
	ajaxLoadPageCallBack(url, requestString, "goSearch_" + tableId + "(2)");
	
}

//表单按钮接口
function mt_form_formBtn_CallJava(btnId) {
	//alert(tableId);
	
	var uuid = document.getElementById("uuid").value;
	
	var requestString = "&uuid=" + uuid;
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/formQueryConfig.do?method=buttonExtHandle&btnId=" + btnId;
	
	var result = ajaxLoadPageSynch(url, requestString);
	
	alert(result);
}

//创建行
function mt_createRow(tableId,rows,cells){
	var rs,cs;
	
	if(rows == ""){
		rs = 0;
	} else {
		rs = rows;
	}
	
	if(cells == ""){
		cs = 0; 
	} else {
		cs = cells;
	}
	
	var table = document.getElementById(tableId);
	for(var i=0; i<rs; i++){
		//添加一行
        var newTr = table.insertRow();
		for(var j = 0; j < cs; j++){
	       //添加列
			var newTd = newTr.insertCell();
		}
	}
}

//删除
function mt_remove(t){
	
	if(confirm("您确定要删除吗?")){
		if(matech.funExists("before_mt_remove")){
			before_mt_remove(t);
		}
		t.parentNode.parentNode.removeNode(true);
		
		if(t.group) { 
			//删除同组的记录
			var imgs = Ext.query("img[group="+t.group+"]") ;
			Ext.each(imgs,function(img){
				img.parentNode.parentNode.removeNode(true);
			}) ;
			
		}
	}
	
	mt_form_total();
}

//删除所有行
function mt_remove_all(table) {
	
    var tableObj = document.getElementById(table);
    
    for(var i=tableObj.rows.length-1; i >= 0 ; i--) {
    	tableObj.deleteRow(i);
    }
}

//返回html
function mt_addRow(table,length,viewEvent,json){
	
	var randomId = Math.round(Math.random() * 10000);
	
	var mt_slist = eval('(' + document.getElementById("mt_slist_" + table).value + ')');
	
	var rowHtml = "<tr>" ;
	
	var slistLength = mt_slist.length ;
	
	var tbField = document.getElementById(table);
	
	var html = "<img id='"+table+"_delImg_"+randomId+"' flag="+table+ "_del style='cursor:hand;' alt='删除本行' onclick='mt_remove(this)' src='" + MATECH_SYSTEM_WEB_ROOT + "/img/close.gif' >"
	 		+ "<input type='hidden' name='" + table + "_subformuuid' id='" + table + "_subformuuid_" + randomId + "' value='' />";
	
	if(viewEvent) {
		viewEvent = viewEvent.replace(new RegExp("`","gm"),"'"); 
		viewEvent = viewEvent.replace(new RegExp("，","gm"),","); 
		html += "  <img id='" + table + "_viewImg' style='cursor:hand;' alt='点击查看明细' onclick=\"" + viewEvent + "\" src='" + MATECH_SYSTEM_WEB_ROOT + "/img/view.png' >" ;
	}
	
	rowHtml += "<td noWrap=noWrap>" + html + "</td>" ;
	
	var colCount = 0;
	
	for(var i = 1; i <= slistLength; i++){
		
		if(mt_slist[i-1].indexOf("type=[a]") > -1){
			
			rowHtml += "<td align=center>" + mt_slist[i-1] + "</td>" ;
			colCount++;
			
		}else {
			
			var tdHtml = "" ;
			var inputHtml = mt_slist[i-1] ;
			var inputObj = document.createElement(mt_slist[i-1]) ;
			
			
			if(inputObj.id.indexOf("hidden_") < 0) {
				colCount++;
			}
			
			inputHtml = inputHtml.replace(inputObj.id,inputObj.id + '_' + randomId);
			
			inputHtml = inputHtml.replace("_\$rowIndex", "_" + randomId);
			
			var readOnly = inputObj.readOnly ;
			
			var attribute = "" ;
			if(readOnly){
				attribute += " class=x-subform-td " ;
				//cell.className = "x-subform-td" ;
			}else {
				attribute += " inputName='" + inputObj.name + "' " ;
				attribute += " onclick=mt_form_combox_tdClick(this,this.inputName,'"+randomId+"') " ;
			}
			
			inputHtml = inputHtml.replace("/>", " style=\"display:none\" />");
				
			
			var spanText = "" ;
			for(var field in json) {
				var fieldId = field.toLowerCase().replace("hidden_","");
				
				
				if(fieldId == "select_group") {
					rowHtml = rowHtml.replace(table+"_del",table+"_del group="+json[field]); 
				}
				
				fieldId = table + "_" + fieldId ;
				if(inputObj.id == fieldId) {
					inputHtml = inputHtml.replace("value=\"\"","value=\""+json[field]+"\"");
					spanText = json[field] ;
				}
				 
				if(fieldId == (inputObj.id + "_rawvalue")) {
					inputHtml = inputHtml.replace("/>","rawValue=\""+json[field]+"\"/>");
					spanText = json[field] ;
				}
			}
			
			var spanHtml = "<span name='"+inputObj.name+"_span'>"+spanText+"</span>" ;
			
			if(inputObj.type != "hidden") {
				tdHtml += "<td " + attribute + ">" + inputHtml + spanHtml +"</td>" ;
			}else {
				tdHtml +=  inputHtml ;
			}
			
			
			rowHtml += tdHtml ;
		}
	}
	alert("111:"+rowHtml);
	return rowHtml;
}


//新增一行
function mt_add(table,length,viewEvent){
	
	if(matech.funExists("mt_beforeRowAdd")) {
		var suc = mt_beforeRowAdd(table);
		if(!suc) return ;
	}
	
	var randomId = Math.round(Math.random() * 10000);
	
	
	var mt_slist = eval('(' + document.getElementById("mt_slist_" + table).value + ')');
	mt_createRow(table,1,length);
	
	var slistLength = mt_slist.length ;
	
	var tbField = document.getElementById(table);
	
	var html = "<img id='"+table+"_delImg_"+randomId+"' flag="+table+ "_del style='cursor:hand;' alt='删除本行' onclick='mt_remove(this)' src='" + MATECH_SYSTEM_WEB_ROOT + "/img/close.gif' >"
	 		+ "<input type='hidden' name='" + table + "_subformuuid' id='" + table + "_subformuuid_" + randomId + "' value='' />";
	
	if(viewEvent) {
		viewEvent = viewEvent.replace(new RegExp("`","gm"),"'"); 
		viewEvent = viewEvent.replace(new RegExp("，","gm"),","); 
		html += "  <img id='" + table + "_viewImg' style='cursor:hand;' alt='点击查看明细' onclick=\"" + viewEvent + "\" src='" + MATECH_SYSTEM_WEB_ROOT + "/img/view.png' >" ;
	}
	
	tbField.rows[tbField.rows.length-1].cells[0].innerHTML = html
	
	var colCount = 0;
	
	var cell = tbField.rows[tbField.rows.length-1].cells[0];
	
	cell.noWrap = true;
	
	for(var i = 1; i <= slistLength; i++){
		
		if(mt_slist[i-1].indexOf("type=[a]") > -1){
			
			cell = cell.nextSibling;
			if(cell) {
				cell.innerHTML = mt_slist[i-1] ;
			}
			cell.style.textAlign = "center" ;
			
		}else {
			var inputObj = document.createElement(mt_slist[i-1]) ;
			var readOnly = inputObj.readOnly ;
			
			if(inputObj.id.indexOf("hidden_") < 0) {
				colCount++;
			}
			
			inputObj.id = inputObj.id + '_' + randomId ;
			
			if(inputObj.refer) {
				//$2, 替换成本行的ID
				inputObj.refer = inputObj.refer.replace("_\$rowIndex", "_" + randomId);
			}
			
			if(inputObj.refer1) {
				//$3, 替换成本行的ID
				inputObj.refer1 = inputObj.refer1.replace("_\$rowIndex", "_" + randomId);
			}
			
			if(inputObj.refer2) {
				//$4, 替换成本行的ID
				inputObj.refer2 = inputObj.refer2.replace("_\$rowIndex", "_" + randomId);
			}
			
		
			if(inputObj.type != "hidden") {
				cell = cell.nextSibling;
			}
			if(cell) {
				
				if(readOnly){
					cell.className = "x-subform-td" ;
				}else {
					cell.inputName = inputObj.name ;
					cell.onclick = function (){
						mt_form_combox_tdClick(this,this.inputName,randomId);
					} ;
				}
				
				inputObj.style.width = cell.clientWidth -7 ; 
				
				var inputName = inputObj.name ;
				
				cell.appendChild(inputObj) ;
				
				var display = "" ;
				inputObj.isValid = true ;
				if(inputObj.readOnly){
					
					inputObj.style.display = "none" ;
				}else {
					if(inputObj.autoid) {
						initCombox(inputObj) ;
					}
					display = "display:none" ;
				}
				
				if(inputObj.type != "hidden") {
					Ext.DomHelper.append(cell, {tag:'span',name:inputName+"_span",html:inputObj.value,style:display});
				}
				
			}else {
				alert("列数设置超过表头定义列数,请检查配置!");
				return ;
			}
			
			/*
			if(inputObj.autoid) {
				initCombox(inputObj);
			}
			
			if(inputObj.ext_type == "date") {
				mt_form_initDateSelect(inputObj);
			}*/
		}
		
		
		
	}
	//隐藏列
	if(matech.funExists("mt_afterRowAdd")) {
		mt_afterRowAdd(table,randomId);
	}
	return randomId;
}

function mt_form_setFieldValue(fieldId,value){
	var fieldObj = document.getElementById(fieldId) ;
	
	var spanValue = "" ;
	if(fieldObj) {
		fieldObj.value = value ;
		var fieldCmp = Ext.getCmp(fieldId) ;
		if(!fieldCmp && fieldObj.autoid){
			var isHide = false ;
			if(fieldObj.style.display == "none") {
				fieldObj.style.width = 20;  //显示初始化下拉才不出错
				fieldObj.style.display = "" ;
				isHide = true ;
			}
			
			initCombox(fieldObj,function (combox){
				value = combox.getRawValue() ;
				var filedName = combox.hiddenName;
				var curfiledId = combox.id;
				var fieldObj = document.getElementById(curfiledId) ;
				
				var tdObj = fieldObj.parentNode ;
				var tdElement = Ext.fly(tdObj) ;
				
				if(isHide){
					combox.hide();
				}
				
				mt_form_setSpanText(combox.id,value) ;
				
			});
			
		}else if(fieldCmp){
			
			fieldCmp.setRealValue(value,function (combox){
				value = combox.getRawValue() ;
				mt_form_setSpanText(combox.id,value) ;
					
			});
			
		}else {
			var fieldIdObj=document.getElementById(fieldId);
			fieldIdObj.value = value;
			spanValue = value ; 
			var trElement=Ext.get(fieldId).parent();
			var spanObj = trElement.child('span[name='+fieldObj.name+'_span]',true) ;
			if(spanObj)
				spanObj.innerText = spanValue ;
		}
	}
}

function mt_form_setFieldReadonly(fieldId,readonly){
	
	var fieldObj = document.getElementById(fieldId) ;
	var fieldName = fieldObj.name ;
	var tdObj = fieldObj.parentNode ;
	while(true){
		if(tdObj.tagName != "TD"){
			tdObj = tdObj.parentNode ;
		}else {
			break ;
		}
	}
	
	if(readonly == true) {
		tdObj.className = "x-subform-td" ;
	}else {
		tdObj.className = "" ;
	}
	fieldObj.readOnly = true ;
		
}

//下拉GRID填充列表值
function mt_form_setRowValue(obj) {
	
	if(matech.funExists("mt_form_beforeSetRowValue")) {
		var suc = mt_form_beforeSetRowValue(tableName);
		if(!suc) return ;
	}

	var inputId = obj.inputId;
	var inputProperty = obj.property;
	var name = inputId.replace(inputProperty,"");
	
	var rowIndex = name.split("_")[1];
	var json = Ext.util.JSON.decode(obj.columns);
	
	for(var field in json) {
		var fieldId = field.toLowerCase().replace("hidden_","");
		
		fieldId = inputProperty + fieldId + "_" + rowIndex;
		mt_form_setFieldValue(fieldId,json[field]);
	}
	if(matech.funExists("mt_form_afterSetRowValue")) {
		mt_form_afterSetRowValue(tableName);
	}
}

function mt_form_setSpanText(fieldId,value){
	var fieldObj = document.getElementById(fieldId) ;
	var fieldName = fieldObj.name ;
	var tdObj = fieldObj.parentNode ;
	while(true){
		if(tdObj.tagName != "TD"){
			tdObj = tdObj.parentNode ;
		}else {
			break ;
		}
	}
	
	var tdElement = Ext.fly(tdObj) ;
	var spanObj = tdElement.child('span[name='+fieldName+'_span]',true) ; 
	
	if(spanObj)
		spanObj.innerText = value ;
}

//下拉GRID填充列表值
function mt_form_setRowValues(obj) {
	
	if(matech.funExists("mt_form_beforeSetRowValues")) {
		var suc = mt_form_beforeSetRowValues(tableName);
		if(!suc) return ;
	}
	var jsonArray = Ext.util.JSON.decode(obj.columns);

	var property = obj.property;
	var tableName = property.split("~`")[0];
	var colCount = property.split("~`")[1];
	var viewEvent = property.split("~`")[2];
	
	//mt_remove_all(tableName);
	
	var tableHTML = "" ;
	
	for(var i=0; i < jsonArray.length; i++) {
		var json = jsonArray[i];
		var rowHtml = mt_addRow(tableName, colCount,viewEvent,json);
		tableHTML += rowHtml ;
	}
	
	var orgHtml = document.getElementById("mt_title_"+tableName).value ;
	
	var html = "<table id='listTable_"+tableName+"' cellspacing='1' cellpadding='3' border='0' class='listTable'>" ;
	html += orgHtml  ;
	html +=  "<tbody id = '" + tableName + "' >" ;
	html +=  tableHTML + "</tbody></table>" ;
	var orgDiv = document.getElementById("listTable_"+tableName+"_div") ;
	//赋值
	var selectValue = document.getElementById("gridSeletList_"+tableName).value ;
	var gridSelectList = Ext.getCmp("gridSeletList_"+tableName) ;
	
	if(gridSelectList) {
		gridSelectList.destroy();
	}   
	
	orgDiv.innerHTML = html ;
	
	var selectObj = document.getElementById("gridSeletList_"+tableName) ;
	selectObj.value = selectValue;  
	
	
	mt_form_initDateSelect() ;
	initCombox() ;
	mt_form_total();
	
	if(matech.funExists("mt_form_afterSetRowValues")) {
		mt_form_afterSetRowValues(tableName);
	}
	
}

//下拉GRID填充表单值
function mt_form_setValue(obj) {
	
	if(matech.funExists("mt_form_beforeSetValue")) {
		var suc = mt_form_beforeSetValue(tableName);
		if(!suc) return ;
	}

	var json = Ext.util.JSON.decode(obj.columns);
	
	for(var field in json) {
		var fieldId = field.toLowerCase().replace("hidden_","");
		
		var fieldObj = document.getElementById(fieldId) ;
		var value = "" ;
		if(fieldObj) {
			var fieldCmp = Ext.getCmp(fieldId) ;
			if(!fieldCmp && fieldObj.autoid){
				var isHide = false ;
				if(fieldObj.style.display == "none") {
					fieldObj.style.width = 5;  //显示初始化下拉才不出错
					fieldObj.style.display = "" ;
					isHide = true ;
				}
				initCombox(fieldId);
				fieldCmp = Ext.getCmp(fieldId) ;
				fieldCmp.setRealValue(json[field]);
				value = fieldCmp.getRawValue() ;
				
				if(isHide){
					fieldCmp.hide();
				}
			}else if(fieldCmp){
				fieldCmp.setRealValue(json[field]);
				value = fieldCmp.getRawValue() ;
			}else {
				document.getElementById(fieldId).value = json[field];
				value = json[field] ;
			}
		}
	}
	
	if(matech.funExists("mt_form_afterSetValue")) {
		mt_form_afterSetValue(tableName);
	}
	
}

//初始化附件上传控件
function mt_form_initAttachFile(param) {
	var inputArray ;
	
	if(param) {
		if(typeof(param) == "string") {
			inputArray = Ext.query("#"+param) ;
		}else {
			var arr = new Array();
			arr.push(param) ;
			inputArray = arr ;
		}
	} else {
		inputArray = Ext.query("input[ext_type=attachFile]") ;
	}
	
	 
	Ext.each(inputArray,function(input){
		matech.attachInit(input.id);
	});

}

//初始化extjs日期控件
function mt_form_initDateSelect(param) {
	var inputArray ;

	if(param) {
		if(typeof(param) == "string") {
			inputArray = Ext.query("#"+param) ;
		}else {
			var arr = new Array();
			arr.push(param) ;
			inputArray = arr ;
		}
	} else {
		inputArray = Ext.query("input[ext_type=date]") ;
	}
	
	var plugins = "";
	var format = "Y-m-d";
	

	Ext.each(inputArray,function(input){
		
		if(!input.readOnly) {
			if(input.ext_format) {
				if(input.ext_format == "yyyy-MM-dd") {
					plugins = "";
					format = "Y-m-d";
				} else if(input.ext_format == "yyyy-MM") {
					plugins = "monthPickerPlugin";
					format = "Y-m";
				} 
			}
			
			new Ext.form.DateField({
				applyTo:input.id,
				width:130,  
				plugins: plugins,  
				format: format,  
				editable: false
			});
		}
	});
}


//初始化只读
function mt_form_initReadonly() {
	var inputArray = Ext.query("input[ext_readonly]") ;
	
	Ext.each(inputArray,function(input){
			input.className = "readonly";
	});
}

function mt_form_total(obj) {
	
	var formulaArray = Ext.query("input[formula]") ;
	
	Ext.each(formulaArray,function(input){
		
		var formula = input.formula ;
		formula = formula.replace(new RegExp("sum\\(","gm"),"mt_form_sum("); 
		formula = formula.replace(new RegExp("value\\(","gm"),"mt_form_value("); 
		formula = formula.replace(new RegExp("sumif\\(","gm"),"mt_form_sumif("); 
		formula = formula.replace(new RegExp("rowValue\\(","gm"),"mt_form_rowValue("); 
		formula = formula.replace(new RegExp("`","gm"),"'"); 
		formula = formula.replace(new RegExp("，","gm"),","); 
		formula = formula.replace(new RegExp("《","gm"),"<"); 
		formula = formula.replace(new RegExp("》","gm"),">"); 
		
		if(obj) {
			//只执行相关的
			var objName = obj.name ;
			//alert(formula + " " + obj.name + formula.indexOf(objName))
			if(formula.indexOf(objName) > -1) {
				if(formula) {
	 				var formulaValue = eval(formula) ;
	 				mt_form_setFieldValue(input.id,formulaValue);
	 				//input.value = formulaValue ;
	 				//alert(input.id + " " +obj.id);
	 				if(input != obj) {
	 					input.fireEvent("onchange") ;
	 				}
	 				
	 			}
			}
		}else {
			//执行全部
			if(formula) {
 				var formulaValue = eval(formula) ;
 				mt_form_setFieldValue(input.id,formulaValue);
 				if(input != obj) {
 					input.fireEvent("onchange") ;
 				}
 			}
		}
		
			
	});
}

function mt_form_sum(name){
	var sum = 0.00;
	var sumArray = document.getElementsByName(name) ;
	for(var i = 0;i<sumArray.length;i++){
		var sumValue = sumArray[i].value ;
		sumValue = sumValue.replace(new RegExp(",","gm"),""); 
		if(sumValue) {
			sum += parseFloat(sumValue);
		}
	}
	
	sum = Math.round(sum *100)/100;
	sum = sum.toMoney(2) ;
	return sum ;
}
	
function mt_form_value(name){
		
	var sum = 0.00;
	var sumArray = document.getElementsByName(name) ;
	if(sumArray) {
		var sumValue = sumArray[0].value ;
		if(sumValue) {
			sumValue = sumValue.replace(new RegExp(",","gm"),""); 
			sum += parseFloat(sumValue);
		}
			
	}
	sum = Math.round(sum *100)/100;
	return sum ;
}
	
function mt_form_sumif(condition,name1,name2){
	
	var name1Arr = document.getElementsByName(name1) ;
	var name2Arr = document.getElementsByName(name2) ; 
	var forName = name1Arr ;
	if(name1Arr.length < 1) {
		forName = name2Arr ;
	}
	
	var sumValue = 0.00 ;
	for(var i = 0;i<forName.length;i++){
		var curCondition = condition.replace(new RegExp("\\\$rowObj","gm"),"curObj"); 
		var curObj = forName[i] ;
		var conditionResult ; 
		try {
			conditionResult = eval(curCondition);
		}catch(e) {
			alert("条件【" + condition + "】出现语法错误,错误原因："+e+"请联系管理员检查!") ;
			return ;
		}
		if(conditionResult) {
			if(name1Arr[i]) {
				var name1Value = name1Arr[i].value ;
				name1Value = name1Value.replace(new RegExp(",","gm"),""); 
				if(isNaN(name1Value)) {
					name1Value = 0 ;
				}
				sumValue += parseFloat(name1Value ? name1Value : 0) ;
			}
		}else {
			if(name2Arr[i]) {
				var name2Value = name2Arr[i].value ;
				name2Value = name2Value.replace(new RegExp(",","gm"),"");
				if(isNaN(name2Value)) {
					names2Value = 0 ;
				}
				sumValue += parseFloat(name2Value ? name2Value : 0) ;
			}
		}
	}
	sumValue = Math.round(sumValue*100)/100;
	sumValue = sumValue.toMoney(2) ;
	return sumValue ;
}

function mt_form_rowValue(name,obj){
	if(!obj) return ; 
	var srcElement = obj ;  
	
	var trObj = srcElement.parentNode.parentNode ;
	var trElement = Ext.fly(trObj) ;
	var curRowObj = trElement.child('input[name='+name+']',true) ;
	var value = "0.00";
	if(curRowObj) {
		value = curRowObj.value ;
	}
	value = value.replace(new RegExp(",","gm"),""); 
	if(!value) value = 0.00;
	return Math.round(parseFloat(value)*100)/100;
}


function mt_form_initSubmit() {
	var formArray = Ext.query("form") ;
	
	Ext.each(formArray,function(form){
		form.tempSubmit = form.submit ;
		form.submit = function (){
			matech.showWaiting();
			form.tempSubmit();
		};	 
	});
}

function mt_form_checkState(stateField) {
	var data = mt_form_getRowValues();
	if(!data) {
		return false;
	}

	for(var i=0; i < data.length; i++) {
		var state = eval("data[" + i + "]." + stateField);
		if(state != '草稿' && state != '退件') {
			alert("该数据状态为[" + state  + "],不允许操作该数据!!");
			return false;
		} 
	}
   
	return true;
}

//检查数据
function mt_form_checkData(dataField, dataValue, errMsg) {
	
	if(dataField == "" || dataValue == "") {
		alert("参数错误:dataField=" + dataField + ",dataValue=" + dataValue);
	}
	
	var tableId = document.getElementById("tableId").value;
	var formId = document.getElementById("formId").value;
	var uuid = document.getElementById("chooseValue_" + tableId).value;
	
	if(uuid == "") {
		uuid = getChooseValue(tableId);
		if(uuid == "") {
			alert('请选择要操作的数据!');
			return;  
		}
	} 
	
	var requestString = "&formId=" + formId 
					  + "&uuid=" + uuid 
					  + "&dataField=" + dataField 
					  + "&dataValue=" + dataValue;
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=checkData";
	
	var result = ajaxLoadPageSynch(url, requestString);
	if(result != "ok") {
		if(errMsg == "") {
			errMsg = "该数据无法操作，请重新选择!!!";
		}
		
		alert(errMsg);
		return false;
	}
   
	return true;
}

function mt_form_checkFieldIsOnly(field) {
	var data = mt_form_getRowValues();
	if(!data) {
		return false;
	}
	var filedValue ;
	for(var i=0; i < data.length; i++) {
		
		var value = eval("data[" + i + "]." + field);
		if(!filedValue) {
			filedValue = value ;
		}
		if(filedValue != value) {
			return false;
		} 
	}
   
	return true;
}

var mt_form_curCell ;
var mt_form_curInput ;
function mt_form_combox_tdClick(obj,inputId,rowIndex){
	event.cancelBubble = true;
	
	//点input就不触发这个事件了
	mt_form_curCell = obj ;
	mt_form_curInput = inputId ;
	if(event.srcElement.tagName == "INPUT") return false;
	var srcElement = obj ;  
	
	mt_form_clear_edit();
	
	var trObj = srcElement.parentNode ;
	var trElement = Ext.fly(trObj) ;
	
	var curRowObj = trElement.child('input[name='+inputId+']',true) ;
	mt_form_curCell = obj ;
	mt_form_curInput = inputId ;
	if(curRowObj.readOnly) return false ;
	
	var width = obj.clientWidth ;
	

	
	//设置输入框的宽度  
	curRowObj.style.width = width - 10 ;
	curRowObj.style.display = "" ;
	
	var inputCmp = Ext.getCmp(curRowObj.id);
	if(!inputCmp && curRowObj.autoid){
		initCombox(curRowObj) ;
	}else if(inputCmp){
		inputCmp.setHideTrigger(false) ;
		inputCmp.setWidth(width - 10) ; 
	}
	
	var spanObj = trElement.child('span[name='+inputId+'_span]',true) ;
	if(spanObj)
		spanObj.style.display = "none" ;
	//obj.onclick="return false" ;
}


function mt_form_clear_edit(){
	
	if(mt_form_curCell){
		var trObj = mt_form_curCell.parentNode ;
		var trElement = Ext.fly(trObj) ;
		var curRowObj = trElement.child('input[name='+mt_form_curInput+']',true) ;
		if(curRowObj.readOnly) return false; 
		
		var value = "" ;
		var inputCmp = Ext.getCmp(curRowObj.id);
		if(inputCmp){
			value = inputCmp.getRawValue();
			//inputCmp.setVisible(false);
			inputCmp.setHideTrigger(true) ;
			inputCmp.setWidth(0) ;
			
		}else {
			value = curRowObj.value ;
			curRowObj.style.display = "none" ; 
		}
		
		//隐藏input 显示span
		var spanObj = trElement.child('span[name='+mt_form_curInput+'_span]',true) ;
		if(spanObj){
			spanObj.innerText = value ;
			spanObj.style.display = "" ;
		}
	}
}

function mt_form_check_transfer(obj){
	var uuid = obj.value ;
	if(matech.funExists("mt_form_grid_check")) { 
		mt_form_grid_check(uuid,obj);
	}
}

//验证子表是否有数据
function validate_sub_table_has_data(sub_table_name){
	var message="";
	var has_data=true;
   	if(sub_table_name!=""){
  			var sub_table_name_array =sub_table_name.split(",");
  			for(var c=0;c<sub_table_name_array.length;++c){
  				if((matech.funExists("validate_sub_table")&&!validate_sub_table(sub_table_name_array[c]))){
  					continue;
  				}
  				var sub_table_id_ext=Ext.get(sub_table_name_array[c]);
	  			if(sub_table_id_ext){
	  				if(sub_table_id_ext.child("tr")==null){
	  					var caption=sub_table_id_ext.parent("table").child("caption"); //找到表头
	  					if(caption){
	  						message+="【"+caption.dom.innerHTML+"】";
	  					}
	  					message+="子表至少需要有一条数据 \n";
	  					has_data=false;
	  				}
	  			}
  			}
   	}
   	if(!has_data){
   		alert(message);
   	}
	return has_data;
}

document.onclick = function (){
	mt_form_clear_edit();
};

Ext.onReady(function(){
	mt_form_initReadonly();
	mt_form_initSubmit();
});