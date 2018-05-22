//页面打开时，初始化表单控件
function mt_init_form_Control(){
	initCombox();
	mt_form_initDateSelect();
	mt_form_initAttachFile();
	mt_form_initDateTimeSelect();		
	mt_form_initAttachImg();	
	mt_form_initRadioCheckbox();
	//mt_form_initscrollbar()
	//score();
	//mt_form_initTagit();
	//mt_form_initComment();
	mt_form_initAudio();
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
		var ext_style = input.getAttribute("ext_style")||"";
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
		inputHtml = '<table border="0" style="width: '+tablewidth+'; border-collapse:separate;border-spacing:0px;font-size:14px;margin-bottom:10px;" align="left"><tr>'
		for(var i=0;i<objs.length;i++){		
			var check = "";	
			if((","+ext_value+",").indexOf(","+objs[i]["value"]+",")>-1) check = "checked";
			
			inputHtml += '<td style="border:none;">';
			inputHtml += "<input " + inputTurn + " class='"+ext_class+"' style='"+ext_style+"' type='"+ext_type+"' id='" + ext_id + "_" + i +"' name='_" + ext_id +"' ntext='"+objs[i]["text"]+"' value='"+objs[i]["value"]+"' field='" + ext_id +"' "+check+" onclick='setHiddenValue(this);"+inputClick+"' />" ;
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

//初始化附件上传控件
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


function mt_form_initAudio(param){
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
		inputArray = Ext.query("input[ext_type=audio]");
	}

	
	Ext.each(inputArray, function(input) {
		audioInit(input.id);
		$("audio[inputid='"+input.id+"']").audioPlayer();
	});	
	
}

//初始化[日期时间控件]
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
			
			var maxDateTime=null;
			var minDateTime=null;
			var element = Ext.get(input) ;
			var ext_maxDateTime = element.getAttribute("ext_maxDateTime") ;
			if(ext_maxDateTime){
				maxDateTime=TimeUtil.init().stringToDate(ext_maxDateTime);
			}else{
				maxDateTime=null;
			}
			var ext_minDateTime = element.getAttribute("ext_minDateTime") ;
			if(ext_minDateTime){
				minDateTime=TimeUtil.init().stringToDate(ext_minDateTime);
			}else{
				minDateTime=null;
			}
			
			var id = "#" + input.id;
			$(id).datetimepicker({
				changeMonth: true, 
			    changeYear: true, 
				stepMinute: 1,
				stepSecond: 1,
				controlType :'select',
				showButtonPanel: true,  
				minDateTime: minDateTime,
				maxDateTime: maxDateTime,				
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

//初始化extjs日期控件
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

//textarea自动换行
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
