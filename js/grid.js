var _selectArray = new Object(); //用于datagrid checkbox 翻页选中
function _setSelectArray(obj){ //datagrid 用于记录已选中的checkbox
	try {
		var caller_args = arguments.callee.caller.arguments;
		for(var i = 0; i < caller_args.length; i++){
			var event = caller_args[i];
			if (event.stopPropagation){
				event.stopPropagation();
			}
		}
	} catch (e){
		if (console && console.error) console.error(e);
	}
	
	var tableId = obj.getAttribute("tableId");
	if(tableId == null) return;
	var selectString = "," + _selectArray[tableId].join(",") + ",";
	if(selectString.indexOf("," + obj.value + ",")>-1){
		//存在
		if(!obj.checked){ //去掉选中，删除数组中的值
			for (var i = 0; i < _selectArray[tableId].length; i++) {                
				if (_selectArray[tableId][i] == obj.value) {
					_selectArray[tableId].splice(i, 1); //删除
				}            
			}
		}
	}else{
		//不存在
		if(obj.checked){ //选中加入数组
			_selectArray[tableId].push(obj.value);
		}
	}
	var ev = this.event || window.event;
	if (ev){
		if (typeof ev.cancelBubble != 'undefined') ev.cancelBubble = true;
		if (typeof ev.stopPropagation != 'undefined') ev.stopPropagation();
	}
}

//还原多选
function _restoreSelectCheck(tableId){
	try{
		var chooseValue = document.getElementsByName("choose_"+tableId) ;
		var selectString = "," + _selectArray[tableId].join(",") + ",";
		//alert(selectString + "|" + chooseValue.length);
		for(var i=0;i<chooseValue.length;i++) {
			if(selectString.indexOf("," + chooseValue[i].value + ",")>-1){
				chooseValue[i].checked = true;
			}
		}
	}catch(e){}
}

function extDatagridSearch(tableId, limitValue)
{
  var sv='';
  for(var i=0;i<eval('sqlWhereVariables_'+tableId).length;i++){
   	var oTT=document.getElementById(eval('sqlWhereVariables_'+tableId)[i]);
  		if(!oTT)continue;
  		if(oTT.tagName && oTT.tagName=='INPUT' && oTT.type && oTT.type=='checkbox') {
  			if(oTT.checked){
  				sv=sv+"<"+eval('sqlWhereVariables_'+tableId)[i]+">"+oTT.value+"</"+eval('sqlWhereVariables_'+tableId)[i]+">";	
  			}
  		}else{
  			sv=sv+"<"+eval('sqlWhereVariables_'+tableId)[i]+">"+oTT.value+"</"+eval('sqlWhereVariables_'+tableId)[i]+">";
  		}
   		
  }
  var b = setToken(document.getElementById("page_xml_"+tableId).value,"pageSize_CH",limitValue);
  document.getElementById("page_xml_"+tableId).value= b;
  var a = getToken(document.getElementById("page_xml_"+tableId).value,'pageSize_CH');
  eval("getData_"+tableId+"(sv,document.getElementById(\"page_xml_\"+tableId).value,0,"+a+")") ;
}

function expExcel(tableId) {
	window.open(MATECH_SYSTEM_WEB_ROOT + '/common.do?method=expExcel&tableId='+tableId);
}

function extMoneyFormat(val) {

	if(val < 0){
		val = '<span style="color:red" onselectstart="return false">' + Ext.util.Format.number(val,'0,000.00') + "</span>";
	} else {
		val =  Ext.util.Format.number(val,'0,000.00');
	}
	
	return val;
}


function getPrintData(tableId,action) {
	
	var printContainer = Ext.get("printContainer_"+tableId).dom ;
	Ext.Ajax.request({
		method:'POST',
		url:MATECH_SYSTEM_WEB_ROOT + '/extGridPrint?tableId='+tableId ,
		success:function (response,options) {
			printContainer.innerHTML = "";
			printContainer.innerHTML = response.responseText;
		},
		failure:function (response,options) {
			//alert("打印参数设置错误");
		}
	});
}

function getPrintParam(tableId) {
	var queryString = "";
	queryString += "&printTitleRows=" + document.getElementById("printTitleRows_" + tableId).value;
	queryString += "&printSql=" + document.getElementById("printSql_" + tableId).value;
	queryString += "&printDisplayColName=" + document.getElementById("printDisplayColName_" + tableId).value;
	queryString += "&printAction=" + document.getElementById("printAction_" + tableId).value;
	queryString += "&printTitle=" + document.getElementById("printTitle_" + tableId).value;
	queryString += "&printCharColumn=" + document.getElementById("printCharColumn_" + tableId).value;
	queryString += "&printColumnWidth=" + document.getElementById("printColumnWidth_" + tableId).value;
	queryString += "&printVerTical=" + document.getElementById("printVerTical_" + tableId).value;
	queryString += "&printCustomerId=" + document.getElementById("printCustomerId_" + tableId).value;
	queryString += "&printColName=" + document.getElementById("printColName_" + tableId).value;
	queryString += "&printTableHead=" + document.getElementById("printTableHead_" + tableId).value;
	queryString += "&printAllCount=" + document.getElementById("printAllCount_" + tableId).value;
	queryString += "&printGroupName=" + document.getElementById("printGroupName_" + tableId).value;
	queryString += "&printPoms=" + document.getElementById("printPoms_" + tableId).value;
	queryString += "&printAttatchmsg=" + document.getElementById("printAttatchmsg_" + tableId).value;
	
	queryString += "&printChartType=" + document.getElementById("printChartType_" + tableId).value;
	queryString += "&printXAxis=" + document.getElementById("printXAxis_" + tableId).value;
	queryString += "&printYAxis=" + document.getElementById("printYAxis_" + tableId).value;
	
	//alert(queryString);	
	return encodeURI(queryString);
}

//行单选
function setChooseValue(obj,tableId) {
	var chooseValue = document.getElementById("chooseValue_"+tableId) ;
	chooseValue.value = obj.value ;
	
	_selectArray[tableId] = []; //清空
	_selectArray[tableId].push(obj.value); //单选也加入数组
	var ev = this.event || window.event;
	if (ev){
		if (typeof ev.cancelBubble != 'undefined') ev.cancelBubble = true;
		if (typeof ev.stopPropagation != 'undefined') ev.stopPropagation();
	}
}

//多选
function getChooseValue(tableId) {
	//直接读数组中的值
	var selectString = _selectArray[tableId].join(",");
	return selectString;
	
	/*
	var chooseValue = document.getElementsByName("choose_"+tableId) ;
	var str = "";
	for(var i=0;i<chooseValue.length;i++) {
		if(chooseValue[i].checked && chooseValue[i].value != "") {
			str += chooseValue[i].value + "," ;
		}	
	}
	
	if(str != "") {
		str = str.substr(0,str.length-1);
	}
	return str ;
	*/
}

function selectAllChooseValue(obj,tableId) {
	var chooseValue = document.getElementsByName("choose_"+tableId) ;
	for(var i=0;i<chooseValue.length;i++) {
		if(!chooseValue[i].disabled) {
			chooseValue[i].checked = obj.checked ;	
			_setSelectArray(chooseValue[i]);
		}
	}
}

//创建计算器
var calWin = null;
function createcalculater(tableId) {
 	
 	var divObj = document.getElementById("calculater");
 	if(!divObj) {
 		divObj = document.createElement("<DIV id=\"calculater\" style=\"position:absolute;width:expression(document.body.clientWidth);height:20;left:0;bottom:45;padding:10 0 10 0;\"></div>") ;
 		document.body.insertBefore(divObj,document.body.firstChild);
 		
		if(!calWin) {
		    calWin = new Ext.Window({
		     title: '计算器',
		     renderTo :'calculater',
		     width: document.body.clientWidth,
			 x:0,
		     height:20,
		        closeAction:'hide',
		        listeners   : {
		        	'hide':{fn: function () {
						calWin.hide();	         	
		        	}}
		        },
		      layout:'fit',
			  html:'<input type="<input type="text" size="120" id="sText" onpropertychange="calculateValue()" value="" /> = <input type="text" size="30" id="sValue" value="" />'
			  		+'<button onclick="calculatorReset(\''+tableId+'\')" >重置</button>'
		    });
	   }
	  
 	}
 	 calWin.show();
 }
 
String.prototype.replaceAll  = function(s1,s2){    
	return this.replace(new RegExp(s1,"gm"),s2);    
}


function calculateValue() {
	var sTextValue = sText.value;
	try {
		sTextValue =  eval(sTextValue.replaceAll(",",""));
		sValue.value = Ext.util.Format.number(sTextValue,'0,000.00') ;
	}catch(e){}
}

function calculatorReset(tableId) {
		sText.value='';
		sValue.value='';
		Ext.getCmp("gridId_"+tableId).getSelectionModel().clearSelections();
		
		Ext.getCmp("gridId_"+tableId).getSelectionModel().selectedArea='';
	}


//自定义查询
function customQryWinFun(tableId) {
	var customQryWin = this["customQryWin_"+tableId] ;
	document.getElementById("customQry_"+tableId).style.display = "";
	
	if(customQryWin == null) { 
		customQryWin = new Ext.Window({
			title: '自定义查询条件',
			width: 600,
			height:400,
			contentEl:'customQry_'+tableId, 
	        closeAction:'hide',
	        autoScroll:true,
	        modal:true,
	        listeners:{
				'hide':{fn: function () {
					 document.getElementById("customQry_"+tableId).style.display = "none";
				}}
			},
	        layout:'fit',
		    buttons:[
			'<input  type=radio name=_radioView value=0 checked tableId="'+tableId+'" onclick="_radioViewQry(this)" ><font color=white >简单查询</font>',
			'-','-','-','-',
			'<input type=radio name=_radioView value=1 tableId="'+tableId+'" onclick="_radioViewQry(this)" ><font color=white >复合查询</font>'
			, '-','-','-','-','-',{
	            text:'查询',
	          	handler:function() {
	          		var qryWhere = createQryWhere(tableId);
	          		if(qryWhere == false) return ;
	          		var strArr = ['create','insert','update','select','alter table','delete'];
					for(var i=0;i<strArr.length;i++){
						if(qryWhere.indexOf(strArr[i])>=0){
							alert('条件存在特殊字符串');
							return;
						}
					}
	          		document.getElementById("qryWhere_"+tableId).value = qryWhere ;
	          		eval("goSearch_"+tableId+"();");
	          		customQryWin.hide();
	          	}
	        },{
	            text:'清除',
	          	handler:function() {
	          		document.getElementById("qryWhere_"+tableId).value = ""; 
	          		eval("goSearch_"+tableId+"();");
	          		customQryWin.hide();
	          	}
	        },{
	            text:'取消',
	            handler:function(){
	            	customQryWin.hide();
	            }
	        }]
	    }); 
		this["customQryWin_"+tableId] = customQryWin ;
		addQuery(tableId,true);
		
		//显示字段查询
		document.getElementById("qryTable_" + tableId).style.display = "none";
		viewQuery(tableId);
	}
	customQryWin.show();
}

function _radioViewQry(o){
	//var tableId = o["tableId"];	
	var tableId = o.getAttribute("tableId");//o.attributes.tableid.value;
	var obj1 = document.getElementById("viewQry_" + tableId);
	var obj2 = document.getElementById("qryTable_" + tableId);
	if(o.value == "1"){
		obj1.style.display = "none";
		obj2.style.display = "";
	}else{
		obj1.style.display = "";
		obj2.style.display = "none";		
	}
}

var _date_input_obj = [];
function _onQueryOptionSelectChange(obj,tableId,rowid,op){
	if(rowid==0&&op=='_div_'){
	   var textid =  "_div_query_condition_" + tableId + "_0";
	   $("#"+textid).val("");
	}
	
	var _opTxt = "";
	if(op) _opTxt = op;
	
	var _text = obj.options[obj.selectedIndex].text;
	var _format=obj.options[obj.selectedIndex].getAttribute('_format');	
	if(_format == "" && (_text.indexOf("时间")>-1 || _text.indexOf("日期")>-1)){
		_format = "date";
	}
	
	var id= _opTxt + 'query_condition_'+ tableId + '_' + rowid ;
	var oid = id+"_" + _format;
	
	if(!_date_input_obj[rowid]){
		_date_input_obj[rowid] = [];
	}
	for(var i=0;i<_date_input_obj[rowid].length;i++){
		_date_input_obj[rowid][i].hide();
	}
	
	if(_format == ""){
		$("#"+id).show();
		return;
	}
	
	if($("#"+oid).val()){
		$("#"+id).hide();
		$("#"+oid).show();
	}else{
		var html="<input id='" + oid + "' size='30' onchange='$(\"#"+id+"\").val(this.value);'>";
		$("#"+id).after(html);
		$("#"+id).hide();
		
		var input=document.getElementById(oid);
		//input.setAttribute('ext_type',_format);
		//input.setAttribute('_showdate','true');
		if(_format=='date'){
			//格式化日期
			mt_form_initDateSelect(input);
		}else if(_format=='time'){
			//格式化时间输入框
			mt_form_initTimeSelect(input);
		}else if(_format=='datetime'){
			//格式化日期时间输入框
			mt_form_initDateTimeSelect(input);
		}		
		
		_date_input_obj[rowid].push($("#"+oid));
	}

}

var _queryInputCount=0;
function addQuery(tableId,first) {
	var trObj ;
	var tdObj ;
	
	var grid = Ext.getCmp("gridId_"+tableId);
	var columns = grid.getColumnModel().columns;
	
	var tbody = document.getElementById("queryTBody_"+tableId);
	trObj = tbody.insertRow();
	trObj.id = "queryTr_" + tableId;
	
	//连接
	tdObj = trObj.insertCell();
	tdObj.align = "center";
	
	var display = "" ;
	if(first) {
		display = "display:none;" ;
	}
	tdObj.innerHTML = "<div class=selectDiv style=\"width:80px;"+display+"\">"
					+ "<select class=mySelect style=\"width:80px;\" name='query_logic_"+tableId+"' id='query_logic_" + tableId + "'>"
					+ "		<option value='and'>并且(and)</option>"
					+ "		<option value='or'>或者(or)</option>"
					+ "</select>"
					+ "</div>" ;
	
	//列名
	tdObj = trObj.insertCell();
	tdObj.align = "center";
	
	var columnHtml = "<div class=selectDiv style=\"width:120px;\">"
					+ "	<select class=mySelect style=\"width:120px;\" name='query_column_" + tableId + "' id='query_column_" + tableId +"_" + _queryInputCount+ "' onchange='_onQueryOptionSelectChange(this,\""+tableId+"\","+_queryInputCount+")'>" ;
					
	for(var i=0;i<columns.length;i++) {
		var id = columns[i].freequery || columns[i].id ;
		var header = columns[i].header ;
		//var hidden = columns[i].hidden ;
		 
		if(header != "选" && id != "numberer" && header != "trValue" && id != "chooseValue") {
			var _format = (columns[i]._format) ? columns[i]._format : "" ; 
			columnHtml += "<option value='" + id + "'   _format='" + _format + "'> " + header + " </option>" ;
		}  
	}

	columnHtml += " </select>";
	columnHtml += " </div>";
	tdObj.innerHTML = columnHtml ;
	
	
	//运算符
	tdObj = trObj.insertCell();
	tdObj.align = "center";
	
	tdObj.innerHTML = "<div class=selectDiv style=\"width:80px;\">"
	+ "	<select class=mySelect style=\"width:80px;\" name='query_operator_" + tableId + "' id='query_operator_" + tableId + "'>"
	+ "		<option value='='> 等于(=) </option> "
	+ "		<option value='!='> 不等于(!=) </option> "
	+ "		<option value='>'> 大于(&gt;) </option> "
	+ "		<option value='<'> 小于(&lt;) </option> "
	+ "		<option value='>='> 大于等于(&gt;=) </option> "
	+ "		<option value='<='> 小于等于(&lt;=) </option> "
	+ "		<option value='like' selected> 包含 </option> "
	+ "		<option value='not like'> 不包含 </option> "
	+ "		<option value='null'> 为空 </option> "
	+ "		<option value='not null'> 不为空 </option> "
	+ " </select>";
	+ " </div>";
	
	//内容
	tdObj = trObj.insertCell();
	tdObj.align = "center";

	tdObj.innerHTML = "<input type=text id='query_condition_" + tableId + "_" + _queryInputCount + "' name='query_condition_" + tableId + "'  size='30'>";
	
	//初始化第一条记录
	var o = document.getElementById("query_column_" + tableId +"_" + _queryInputCount);
	_onQueryOptionSelectChange(o,tableId,_queryInputCount);
		
	_queryInputCount++;	
	
	//操作
	tdObj = trObj.insertCell();
	tdObj.align = "center";
	if(!first) {
		tdObj.innerHTML = "<a href='javascript:;' onclick='removeQuery(this);' ><img src=" + MATECH_SYSTEM_WEB_ROOT + "img/menu/delete.gif></a>" ;
	}
	
}


function removeQuery(obj) {
	var tbody = obj.parentElement.parentElement.parentElement ;
	var trObj = obj.parentElement.parentElement ;
	if(trObj) {
		tbody.removeChild(trObj);
	}
}


function createQryWhere(tableId) {
	
	var b = false;
	var obj1 = document.getElementById("viewQry_" + tableId); //简单查询
	var obj2 = document.getElementById("qryTable_" + tableId); //复合查询
	if(obj2.style.display == 'none'){
		b = true;
	}

	var qryWhere = "" ;
	if(b){
		var o = obj1.getElementsByTagName("input");
		for(var i=0;i<o.length;i++){
			//var _fieldId = o[i]["_fieldId"];
			var _fieldId= o[i].attributes["_fieldId"].value;
			var _format = o[i].attributes["_format"].value;
			if(o[i].value != ""){
				var condition = "'%" + o[i].value + "%'" ;
				if((_format=='date' || _format=='time' || _format=='datetime') && b){
					qryWhere += " and DATE_FORMAT(" + _fieldId + ",'%Y-%m-%d') like " + condition ;	
				}else{
					qryWhere += " and " + _fieldId + " like " + condition ;	
				}
			}
		}

	}else{

		var query_logic = document.getElementsByName("query_logic_"+tableId) ;
		var query_column = document.getElementsByName("query_column_"+tableId) ;
		var query_operator = document.getElementsByName("query_operator_"+tableId) ;
		var query_condition = document.getElementsByName("query_condition_"+tableId) ;
		
		for(var i=0;i<query_logic.length;i++) {
			var logic = query_logic[i].value ;
			var column = query_column[i].value ;
			var operator = query_operator[i].value ;
			var condition = query_condition[i].value ;
			var b = true;
			var _text = query_column[i].options[query_column[i].selectedIndex].text;
			var _format = query_column[i].options[query_column[i].selectedIndex].getAttribute('_format');	
			if(_format == "" && (_text.indexOf("时间")>-1 || _text.indexOf("日期")>-1)){
				_format = "date";
			}
			
			if(column == "") {
				alert("请选择列名,列名不得为空!") ;
				return false ;
			}
			if(condition == "" && operator.indexOf("null") == -1) continue;
			if(operator.indexOf("like") > -1) {
				if(condition != "") {
					condition = "'%" + condition + "%'" ;
				}
			}else if(operator.indexOf("not null") > -1) { //不为空
				operator = "<>";
				condition = "'" + condition + "'";		
				column = "IFNULL("+column+",'')";
				b = false;	
			}else if(operator.indexOf("null") > -1) { //为空
				operator = "=";
				condition = "'" + condition + "'";		
				column = "IFNULL("+column+",'')";
				b = false;	
			}else if(isNaN(condition) || condition == "") {
				condition = "'" + condition + "'" ;
			}
			if((_format=='date' || _format=='time' || _format=='datetime') && b){
				qryWhere += " " + logic + " DATE_FORMAT(" + column + ",'%Y-%m-%d') " + operator + " " + condition ;	
			}else{
				qryWhere += " " + logic + " " + column + " " + operator + " " + condition ;	
			}		
		}
		
	}
	return qryWhere ; 
}

//绑定工具条，显示字段查询

function binding_div(tableId,divId){
	//工具条	
	var toolbar_renderto = '#' + divId;
	var toolbar_obj = jQuery(toolbar_renderto).children()[0];
	var toolbar;
	if(toolbar_obj.className.indexOf('x-toolbar') == -1){
		//没有工具条，新增一个
		var toolbarDivId = divId + '_toolbar';
		jQuery('#' + divId).prepend('<div id="' + toolbarDivId + '"></div>');
		toolbar = new Ext.Toolbar({
			renderTo: toolbarDivId ,   		
			height:30
		});
	}else{
		var toolbar_extid = toolbar_obj.id;
		toolbar = Ext.getCmp(toolbar_extid);
	}
	
	var grid = Ext.getCmp("gridId_"+tableId);
	var columns = grid.getColumnModel().columns;
	
	//onchange='_onQueryOptionSelectChange(this,\""+tableId+"\","+_queryInputCount+")'	
	var columnHtml = "	<select class=mySelect style=\"width:120px;\" name='_div_query_column_" + tableId + "' id='_div_query_column_" + tableId + "_0' onchange='_onQueryOptionSelectChange(this,\""+tableId+"\",0,\"_div_\")' >" ;					
	columnHtml += "<option value='所有列'   _format=''>--所有列--</option>" ;
	for(var i=0;i<columns.length;i++) {
		var id = columns[i].freequery || columns[i].id ;
		var header = columns[i].header ;
		//var hidden = columns[i].hidden ;
		 
		if(header != "选" && id != "numberer" && header != "trValue" && id != "chooseValue") {
			var _format = (columns[i]._format) ? columns[i]._format : "" ; 
			columnHtml += "<option value='" + id + "'   _format='" + _format + "'> " + header + " </option>" ;
		}  
	}

	columnHtml += " </select>";
	
	columnHtml += "<input type=text id='_div_query_condition_" + tableId + "_0' name='_div_query_condition_" + tableId + "' >";
	
	toolbar.add(
		'->',columnHtml	,{ 			
			icon:contextPath + btn_img_url + 'query.png' ,
			handler:function(){
				binding_div_query(tableId);
			}
		},'-'
	) ;	
	
	toolbar.doLayout();
	
	$("#_div_query_condition_"+tableId + "_0").keyup(function(key){
		if(key.keyCode == 13) {
			binding_div_query(tableId);
		}
	});
}

function binding_div_query(tableId){
	document.getElementById("qryWhere_"+tableId).value = "";
	var _column = document.getElementById("_div_query_column_"+tableId + "_0") ;		
	var _condition = document.getElementById("_div_query_condition_"+tableId + "_0").value ;
	var qryWhere = "" ;
	if(_condition == "") {
		document.getElementById("qryWhere_"+tableId).value = qryWhere ;
		eval("goSearch_"+tableId+"();");	
		return;
	}
	
	var _columnValue = _column.value;
	var _operator = "like";
	if(_condition == "空") {
		_condition = "";
		_columnValue = "IFNULL("+_columnValue+",'')";
		_operator = "=";
	}	
	
	var _condition1 = _condition;
	
	if(_columnValue.indexOf("所有列")>-1){					
		for(var i=1;i<_column.options.length;i++){
			var _text = _column.options[i].text;
			var _format=_column.options[i].getAttribute('_format');	
			_columnValue = _column.options[i].value;
			if(_condition == "") {
				_columnValue = "IFNULL("+_column.options[i].value+",'')";
				_operator = "=";
			}
			if(_format == "" && (_text.indexOf("时间")>-1 || _text.indexOf("日期")>-1)){
				_format = "date";
			}
			if(_operator == "like"){
				_condition = "%" + _condition1 + "%";
			}
			
			if((_format=='date' || _format=='time' || _format=='datetime') && _operator == "like"){
				qryWhere += "or DATE_FORMAT(" + _columnValue + ",'%Y-%m-%d') "+_operator+" '"+_condition+"' ";
			}else{
				qryWhere += "or " + _columnValue + " "+_operator+" '"+_condition+"' ";
			}
		}					
		if(qryWhere != ""){
			qryWhere = " and (" + qryWhere.substring(2) + ") ";
		}
	}else{
		var _text = _column.options[_column.selectedIndex].text;
		var _format=_column.options[_column.selectedIndex].getAttribute('_format');	
		if(_format == "" && (_text.indexOf("时间")>-1 || _text.indexOf("日期")>-1)){
			_format = "date";
		}
		if(_operator == "like"){
			_condition = "%" + _condition + "%";
		}
		if((_format=='date' || _format=='time' || _format=='datetime') && _operator == "like"){
			qryWhere = " and DATE_FORMAT(" + _columnValue + ",'%Y-%m-%d') "+_operator+" '"+_condition+"' ";
		}else{
			qryWhere = " and " + _columnValue + " "+_operator+" '"+_condition+"' ";	
		}					
	}
	
	document.getElementById("qryWhere_"+tableId).value = qryWhere ;
	eval("goSearch_"+tableId+"();");
}

function viewQuery(tableId){
	var grid = Ext.getCmp("gridId_"+tableId);
	var columns = grid.getColumnModel().columns;
	
	var viewHtml = "<table  cellpadding=8 cellspacing=0 align=center class='data_tb' ><tr>";		
	var ii = 1;
	for(var i=0;i<columns.length;i++) {
		var id = columns[i].freequery || columns[i].id ;
		var header = columns[i].header ;
		//var hidden = columns[i].hidden ;
		 
		if(header != "选" && id != "numberer" && header != "trValue" && id != "chooseValue") {				
			var _format = (columns[i]._format) ? columns[i]._format : "" ; 		
			viewHtml += "<td class='data_tb_alignright' align=right>"+header+"：</td><td class='data_tb_content'><input type=text id='"+tableId + "_" +id+"' name='"+tableId + "_" +id+"' _fieldId='"+id+"' _format='" + _format + "' ></td>";							
			if(ii%2 == 0){
				viewHtml += "</tr><tr>";
			}
			ii++;
		}  
	}		
	viewHtml += "</table>";
	document.getElementById("viewQry_"+tableId).innerHTML = viewHtml;
	
	for(var i=0;i<columns.length;i++) {
		var id = columns[i].freequery || columns[i].id ;
		var header = columns[i].header ;
		if(header != "选" && id != "numberer" && header != "trValue" && id != "chooseValue") {				
			var _format = (columns[i]._format) ? columns[i]._format : "" ; 		
			if(_format=='date'){
				//格式化日期
				mt_form_initDateSelect(tableId + "_" +id);
			}else if(_format=='time'){
				//格式化时间输入框
				mt_form_initTimeSelect(tableId + "_" +id);
			}else if(_format=='datetime'){
				//格式化日期时间输入框
				mt_form_initDateTimeSelect(tableId + "_" +id);
			}
		}  
	}
	
	
}