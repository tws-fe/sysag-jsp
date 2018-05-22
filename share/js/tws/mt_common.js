/*
 * String对象增加replaceAll方法
 * 
 * 参数1：需要替换的字符串
 * 参数2：替换字符串
 * 
 */
String.prototype.replaceAll  = function(s1,s2){    
	return this.replace(new RegExp(s1,"gm"),s2);    
};
/*
 * Number对象增加toMoney方法
 * 
 * 参数1：
 * 参数2：
 * 参数3：
 * 
 */
Number.prototype.toMoney = function(decimals, decimal_sep, thousands_sep){ 
   var n = this,
   c = isNaN(decimals) ? 2 : Math.abs(decimals), 
   d = decimal_sep || '.', 
   t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, 
  sign = (n < 0) ? '-' : '',
 i = parseInt(n = Math.abs(n).toFixed(c)) + '', 
  j = ((j = i.length) > 3) ? j % 3 : 0; 
   return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : ''); 
};
/*
 * Array对象增加contains方法
 * 
 * 参数1：元素
 * 
 */
Array.prototype.contains = function (element) { 
	for (var i = 0; i < this.length; i++) { 
		if (this[i] == element) { 
			return true; 
		} 
	} 
	return false; 
};
/*
 * 
 * 创建XMLHttpRequest请求对象
 * 
 */
function createRequest() {
	var request;
	  try {
	    request = new XMLHttpRequest();
	  } catch (trymicrosoft) {
	    try {
	      request = new ActiveXObject("Msxml2.XMLHTTP");
	    } catch (othermicrosoft) {
	      try {
	        request = new ActiveXObject("Microsoft.XMLHTTP");
	      } catch (failed) {
	        request = false;
	      }
	    }
	  }
	  if (!request)
	    alert("Error initializing XMLHttpRequest!");
	  
	  return request;
}
/*
 * 
 * 异步回调函数
 * 
 * 参数1：URL
 * 参数2：请求参数
 * 参数3：回调函数
 * 
 */
function ajaxLoadPageCallBack(url,request,callback) {
	var loader=createRequest();
	loader.open("POST",url,true);
	loader.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	loader.onreadystatechange = function(){
		if (loader.readyState==1) {
			matech.showWaiting();
		}
		if (loader.readyState==4) {

			if(callback) {
				try{
					if(typeof callback=="function"){
						callback();
					}else{
						eval(callback);
					}
					
				}catch(e){
					//alert(e);
				}
			}
			matech.stopWaiting();
		}
	};

	loader.send(request);
}
/*
 * 
 * 同步执行函数
 * 
 * 参数1：URL
 * 参数2：请求参数
 * 
 */
function ajaxLoadPageSynch(url,request) {
    
	var loader=createRequest();
	
	loader.open("POST",url,false);
	loader.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	loader.send(request);
	
	return unescape(loader.responseText);
}
/*
 * 
 * 异步执行函数
 * 
 * 参数1：URL
 * 参数2：请求参数
 * 参数3：成功回调函数
 * 参数4：失败回调函数
 * 
 */
function ajaxExecuteAsync(url,request,success,failure) {
	var loader = createRequest();

	loader.open("POST",url,true);
	loader.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	loader.onreadystatechange = function(){
		if (loader.readyState == 4){
		    if (loader.status == 200){
		    	var result = loader.responseText;
		    	success(result);
		    }else{
		    	failure("请求无法正常返回！");
		    }
		    matech.stopWaiting();
	 	};
	};
	loader.send(request);	
}
/*
 * 
 * 重置标签里面的所有文本框、复选框、单选框等
 * 
 * 参数1：标签ID
 * 
 */
function reset(objId) {
	var obj = document.getElementById(objId);
	for (i = 0; i < obj.length; i++ ) {
		e = obj[i];
		if ((e.tagName=='INPUT' || e.tagName=='SELECT' || e.tagName=='TEXTAREA') && e.name!='') {
			if (e.type=='text') {
				e.value = "";
			}else if (e.type=='select-one') {
				e.value = "";
			} else if (e.type=='checkbox' || e.type=='radio') {
				e.checked = false;
			} else {
				try{
					Ext.getCmp(e.id).clear();
				} catch(e) {
					e.value = "";
				}
			}
		}
	}
}
/*
 * 
 * 格式化数字
 * 
 * 参数1：数值
 * 参数2：最大长度
 * 
 */
function formatDecimal(x,maxLength) {
   var f_x = parseFloat(x);
   if (isNaN(f_x)) {
      return x;
   }
   var f_x = Math.round(x*100)/100;
   var s_x = f_x.toString();
   var pos_decimal = s_x.indexOf('.');
   if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += '.';
   }
   while (s_x.length <= pos_decimal + maxLength) {
      s_x += '0';
   }
   return s_x;
}
/*
 * 
 * 截取字符最大长度，超过25则用...展示
 * 
 * 参数1：字符串
 * 
 */
function maxString(str) {
	if(str.length > 25) {
		str = str.substring(0,22) + "...";
	} 
	return str;
}
/*
 * 
 * 判断是否为IE浏览器
 * 
 */
function isIE(){
	 var Ka=navigator.userAgent.toLowerCase();
	 var rt=Ka.indexOf("opera")!=-1; 
	 var r=Ka.indexOf("msie")!=-1&&(document.all&&!rt);return r;
		
}
/*
 * 
 * 小写人民币转化为大写人民币
 * 
 * 参数1：数值
 */
function RMBToCapital(num) { //转成人民币大写金额形式
    var str1 = '零壹贰叁肆伍陆柒捌玖'; //0-9所对应的汉字
    var str2 = '万仟佰拾亿仟佰拾万仟佰拾元角分'; //数字位所对应的汉字
    var str3; //从原num值中取出的值
    var str4; //数字的字符串形式
    var str5 = ''; //人民币大写金额形式
    var i; //循环变量
    var j; //num的值乘以100的字符串长度
    var ch1; //数字的汉语读法
    var ch2; //数字位的汉字读法
    var nzero = 0; //用来计算连续的零值是几个
    num = num+"" ;
    num = num.replace(new RegExp(",","gm"),""); //去掉,号
    num = parseFloat(num) ;
    num = Math.abs(num).toFixed(2); //将num取绝对值并四舍五入取2位小数
    str4 = (num * 100).toFixed(0).toString(); //将num乘100并转换成字符串形式
    j = str4.length; //找出最高位
    if (j > 15) {
        return '溢出';
    }
    str2 = str2.substr(15 - j); //取出对应位数的str2的值。如：200.55,j为5所以str2=佰拾元角分
    //循环取出每一位需要转换的值
    for (i = 0; i < j; i++) {
        str3 = str4.substr(i, 1); //取出需转换的某一位的值
        if (i != (j - 3) && i != (j - 7) && i != (j - 11) && i != (j - 15)) { //当所取位数不为元、万、亿、万亿上的数字时
            if (str3 == '0') {
                ch1 = '';
                ch2 = '';
                nzero = nzero + 1;
            }
            else {
                if (str3 != '0' && nzero != 0) {
                    ch1 = '零' + str1.substr(str3 * 1, 1);
                    ch2 = str2.substr(i, 1);
                    nzero = 0;
                }
                else {
                    ch1 = str1.substr(str3 * 1, 1);
                    ch2 = str2.substr(i, 1);
                    nzero = 0;
                }
            }
        }
        else { //该位是万亿，亿，万，元位等关键位
            if (str3 != '0' && nzero != 0) {
                ch1 = "零" + str1.substr(str3 * 1, 1);
                ch2 = str2.substr(i, 1);
                nzero = 0;
            }
            else {
                if (str3 != '0' && nzero == 0) {
                    ch1 = str1.substr(str3 * 1, 1);
                    ch2 = str2.substr(i, 1);
                    nzero = 0;
                }
                else {
                    if (str3 == '0' && nzero >= 3) {
                        ch1 = '';
                        ch2 = '';
                        nzero = nzero + 1;
                    }
                    else {
                        if (j >= 11) {
                            ch1 = '';
                            nzero = nzero + 1;
                        }
                        else {
                            ch1 = '';
                            ch2 = str2.substr(i, 1);
                            nzero = nzero + 1;
                        }
                    }
                }
            }
        }
        if (i == (j - 11) || i == (j - 3)) { //如果该位是亿位或元位，则必须写上
            ch2 = str2.substr(i, 1);
        }
        str5 = str5 + ch1 + ch2;

        if (i == j - 1 && str3 == '0') { //最后一位（分）为0时，加上"整"
            str5 = str5 + '整';
        }
    }
    if (num == 0) {
        str5 = '零元整';
    }
    return str5;
}
/*
 * 
 * 将表单标签对象设置成不可编辑状态
 * 
 * 参数：对象ID
 * 
 */
function setObjDisabled(name){
	var oElem=document.getElementById(name);
	var sTag=oElem.tagName.toUpperCase();
	switch(sTag){
		case	"BUTTON":
			oElem.disabled=true;
			break;
		case	"SELECT":
		case	"TEXTAREA":
			oElem.readOnly=true;
			break;
		case	"INPUT":
			{
			var sType=oElem.type.toUpperCase();

			if(sType=="TEXT")oElem.readOnly=true;
			if(sType=="BUTTON"||sType=="IMAGE")oElem.disabled=true;
			if(sType=="CHECKBOX")oElem.disabled=true;
			if(sType=="RADIO")oElem.disabled=true;
			}
			break;
		default:
			oElem.disabled=true;
			break;
	}
	oElem.style.backgroundColor="#eeeeee";
}
/*
 * 
 * 将表单标签对象设置成不可编辑状态
 * 
 * 参数：对象ID
 * 
 */
function setObjEnabled(name){
	var oElem=document.getElementById(name);
	var sTag=oElem.tagName.toUpperCase();
	switch(sTag){
		case	"BUTTON":
			oElem.disabled=false;
			break;
		case	"SELECT":
		case	"TEXTAREA":
			oElem.readOnly=false;
			break;
		case	"INPUT":
			{
			var sType=oElem.type.toUpperCase();

			if(sType=="TEXT")oElem.readOnly=false;
			if(sType=="BUTTON"||sType=="IMAGE")oElem.disabled=false;
			if(sType=="CHECKBOX")oElem.disabled=false;
			if(sType=="RADIO")oElem.disabled=false;
			}
			break;
		default:
			oElem.disabled=false;
			break;
	}
	oElem.style.backgroundColor="#FFFFFF";
}
/*
 * 
 * 将对象转换成Decimal
 * 
 * 参数：对象
 * 
 */
function changeTwoDecimal(x) {
	var f_x = parseFloat(x);
	if (isNaN(f_x)) {
		return x;   
	}
	f_x = Math.round(f_x * 100) / 100;
	var s_x = f_x.toString();
	var pos_decimal = s_x.indexOf('.');
	if (pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while (s_x.length <= pos_decimal + 2) {
		s_x += '0';
	}
	return s_x;
}
/*
 * 
 * 将数值格式化成金额格式
 * 
 * 参数：数值
 * 
 */
function formatMoney(number) {
	var re=/(\d{1,3})(?=(\d{3})+(?:$|\.))/g;  
	number=number.replace(re,"$1,");  
	return number ;
}


function myHint(id,msg,anchorToTarget){
	
	var element = Ext.get(id) ;
	var eid = id;
	var selectCmp = Ext.getCmp(id) ;
	if(selectCmp){//下拉
		eid = selectCmp.el.dom.id ;		
	}
	
	if(!element._myToolTip){
		//没定义对象就追加提示对象
		element._myToolTip=new Ext.ToolTip({
			target: eid,
			anchor: 'right',
			trackMouse: !anchorToTarget,
			anchorToTarget:anchorToTarget,
			autoHide:false,
			html: msg
		});
		
		//定位到元素的上级，看看有没有滚动
		var parent = element.parent("table") ;
		while(true) {
			parent = parent.parent() ;
			if(parent && 
			   ((parent.dom.tagName == "DIV" && parent.dom.style.overflow == "auto") 
			   || parent.dom.tagName == "BODY")) {
				break ;
			}
		}
		
		//在滚动事件中重新刷新显示
		if(parent.dom.tagName == "DIV") {
			parent.on("scroll",function(event,elm,obj){
				element._myToolTip.show();
			});
		}
				
	}else{
		element._myToolTip.html=msg;
	}
	
	element._myToolTip.show();
	
}

//创建节点
function mycreateElement(html,objtype,id){
	try{  
		return document.createElement(html);
	}catch(e){
		//ie9以上版本
		var new_name_item = document.createElement(objtype);  
        new_name_item.id = id;  
		return new_name_item;
	}	
}

function getUUID() {
	var url = MATECH_SYSTEM_WEB_ROOT + "/common.do?method=getUUID";
	var result = ajaxLoadPageSynch(url, null);
	
	if(result == "") {
		result = Math.random();
	}
	
	return result;
}

var BlockDiv = function() {
	this.show = function(text) {
		
		var blockDiv = document.getElementById("divBlock");

		if (blockDiv) {
			blockDiv.style.display = "";
		} else {
			var div = document.createElement("div");
			document.body.appendChild(div);
			div.id = "divBlock";
			div.style.cssText = "position:absolute;width:100%;height:100%; top:0px; left:0px; z-index:1; padding:0px; margin:0px; background:rgba(96,96,96,0.5);filter:alpha(opacity=30); text-align:center; ";
		}
		
		/*
		if(text && text != "") {
			div.innerHTML = "<span style='margin-top:200px;'><img src='" + MATECH_SYSTEM_WEB_ROOT + "/share/img/loading.gif'>&nbsp;<font color='#ffffff'><strong>" + text + "</strong><font></span>";
		} else {
			div.innerHTML = "";
		}*/
		
		if(text && text != "") {
			$(div).html("<span style='margin-top:200px;'><img src='" + MATECH_SYSTEM_WEB_ROOT + "/share/img/loading.gif'>&nbsp;<font color='#ffffff'><strong>" + text + "</strong><font></span>");
		} else {
			$(div).html("");
		}		
	};

	this.hidden = function() { 
		var blockDiv = document.getElementById("divBlock");
		if (blockDiv) {
			try {
				blockDiv.style.display = "none";
				document.body.removeChild(blockDiv);
			}catch(e){}
		}
	};
	
};

//判断JS函数是否存在
function funExists(funName){ 
	try{  
		if(typeof eval(funName)=="undefined"){
			return false;
		} 
		if(typeof eval(funName)=="function"){
			return true;
		}
	} catch(e){
		return false;
	}
}

//格式化数字
function formatDecimal(x,maxLength) {
   var f_x = parseFloat(x);
   if (isNaN(f_x)) {
      return x;
   }
   var f_x = Math.round(x*100)/100;
   var s_x = f_x.toString();
   var pos_decimal = s_x.indexOf('.');
   if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += '.';
   }
   while (s_x.length <= pos_decimal + maxLength) {
      s_x += '0';
   }
   return s_x;
}

//截取字符最大长度
function maxString(str) {
	if(str.length > 25) {
		str = str.substring(0,22) + "...";
	} 
	
	return str;
}
