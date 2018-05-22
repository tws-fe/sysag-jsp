Ext.namespace("Ext.matech.form");

Ext.matech.form.Validator = function (className,tips,test) {
	this.className = className;
	this.test = test ? test : function(){return true;};
	this.tips = tips ? tips : '请输入有效的值';
};

Ext.matech.form.Validation = function (config){
	config = config || {}  ;
	
	isIdentityCode=function(code){ 
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass= true;
        
        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
            tip = "身份证号格式错误";
            pass = false;
        }
        
       else if(!city[code.substr(0,2)]){
            tip = "地址编码错误";
            pass = false;
        }
        else{
            //18位身份证需要验证最后一位校验位
            if(code.length == 18){
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                //校验位
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if(parity[sum % 11] != code[17]){
                    tip = "校验位错误";
                    pass =false;
                }
            }
        }
        //if(!pass) alert(tip);
        return pass;
    };
    
	isEmpty = function(v) {
		return ((v == null) || (v.length == 0) || /^\s+$/.test(v));
	} ;
	
	initRefer = function(referElm,separator){
		
		var param = new Array();
		if(separator) {
			var refer = referElm ;
			if(refer) {
				var referArr = refer.split(separator) ;
				for(var i=0;i<referArr.length;i++) {
					var referValue = referArr[i] ;
					var referObj = document.getElementById(referValue) ;
					
					if(referObj) {
						var referObjValue = referObj.value ;
						var referElm = Ext.get(referObj) ;
						if(referElm.hasClass("validate-currency")) {
							referObjValue = referObjValue.replace(new RegExp(",","gm"),""); 
						}
				  		param.push(referObjValue); 
				  	}else {
				  		param.push(referValue || ""); 
				  	}
				}
			}
			
		}else {
			var refer = referElm.refer;
		  	var refer1 = referElm.refer1;
		  	var refer2 = referElm.refer2;
		  	
		  	var referObj = document.getElementById(refer) ;
		  	var refer1Obj = document.getElementById(refer1) ;
		  	var refer2Obj = document.getElementById(refer2) ;
		  	
		  	if(referObj) {
		  		param.push(referObj.value); 
		  	}else {
		  		param.push(refer || ""); 
		  	}
		  	
		  	if(refer1Obj) {
		  		param.push(refer1Obj.value) ; 
		  	}else {
		  		param.push(refer1 || ""); 
		  	}
		  	
		  	if(refer2Obj) {
		  		param.push(refer2Obj.value) ; 
		  	}else {
		  		param.push(refer2 || ""); 
		  	} 
		}
		
		return param ;
	} ;
	
	var rules = [
	    ['required', '请输入有效值.', function(v) {
				return !isEmpty(v);
			}
	    ], 
		['checkexist-wheninputed', '请输入有效值.', function(v) {
		    		if (v==null || v==""){
		    			return true;
		    		}else{
						return !isEmpty(v);
					}
				}
		],
		
		['validate-number', '请输入数字.', function(v) {
					return isEmpty(v) || !isNaN(v);
				}
		],

		['validate-digits', '请输入整数.', function(v) {
					return isEmpty(v) ||  !/[^\d*$]/.test(v);
				}
		],
		
		['validate-positiveInt', '请输入大于0的整数.', function(v) {
					return isEmpty(v) || /^[0-9]*[1-9][0-9]*$/.test(v);
				}
		],
		
		['validate-alpha', '请输入a-z之间的字母.', function (v) {
					return isEmpty(v) ||  /^[a-zA-Z]+$/.test(v) ;
				}
		],
		
		['validate-alphanum', '请输入a-z之间的字母或0-9之间的数字,不允许输入空格或其它字符', function(v) {
					return isEmpty(v) ||  !/\W/.test(v) ;
				}
		],
		
		['validate-date', '请输入有效的日期.', function(v) {
					try{
						var test = new Date(v);
						return isEmpty(v) || !isNaN(test);
					}catch(e){}
				}
		],
		
		['validate-email', '请输入有效邮箱. 例如 username@domain.com .', function (v) {
					return isEmpty(v) || /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(v) ;
				}
		],
		
		['validate-currency', '请输入有效货币.例如100.00 .', function(v) {
					return isEmpty(v) ||  /^([1-9,-]{1}[0-9,-]{0,2}(\,[0-9,-]{3})*(\.[0-9,-]{0,2})?|[1-9,-]{1}\d*(\.[0-9,-]{0,2})?|0(\.[0-9,-]{0,2})?|(\.[0-9,-]{1,2})?)$/.test(v) ;
				}
		],
	
		['validate-date-cn','请使用日期格式: yyyy-mm-dd. 例如 2006-03-17', function(v){
	    		if (v==null || v==""){
	    			return true;
	    		}
	     		if(!/^(?:([0-9]{4}-(?:(?:0?[1,3-9]|1[0-2])-(?:29|30)|((?:0?[13578]|1[02])-31)))|([0-9]{4}-(?:0?[1-9]|1[0-2])-(?:0?[1-9]|1\d|2[0-8]))|(((?:(\d\d(?:0[48]|[2468][048]|[13579][26]))|(?:0[48]00|[2468][048]00|[13579][26]00))-0?2-29)))$/.test(v))
	     		{
	      			return false;
	     		}
	     		return true;
			}
		],
		['validate-handPhone', '手机号输入不合法', function(v){
			
	        	if(!isEmpty(v) && !/^1[3-9]\d{9}$/.test(v)){
	      			return false;
	     		}
	     		return true;
	    	}
		],
		['phonenumber-mobile', '手机号输入不合法', function(v){
	            if (v==null || v==""){
	              return true;
	            }else{
	     		   var len = v.length;
	    		   if(v.substr(0, 1)=="1"){
	    			   if(len==11){
			            	if(!(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(v))){
			            		return false;
				            }else{
				            	return true;
				            }	
	    			   }else{
	    				   return false;
	    			   }
	    		   }else{
	                   if(!/^[+]{0,1}((\d)|[ ])+([-－]?((\d)|[ ]))+$/.test(v))
	                   {
	                   return false;
	                   }
	                   return true;	    				   
	    		   }
		        }
			}
		],		
		['validate-phonenumber', '电话号码可以用+开头，只能输入数字,-符号 例如020-12345678', function(v){
			
	        	if(!isEmpty(v) && !/^[+]{0,1}(\d){1,3}[ ]?([-－]?((\d)|[ ]){1,12})+$/.test(v)){
	      			return false;
	     		}
	     		return true;
	    	}
		],
	
		['phonenumber-wheninputed', '电话号码可以用+开头，只能输入数字,-符号 例如020-12345678', function(v){
                if (v==null || v==""){
                  return true;
                }else{
                  if(!/^[+]{0,1}(\d){1,3}[ ]?([-－]?((\d)|[ ]){1,12})+$/.test(v))
                  {
                  return false;
                  }
                  return true;
                }
	    	}
		],
		
		['year-wheninputed', '年份是由四个数字组成。', function(v){
                if (v==null || v==""){
                  return true;
                }else{
                  if(!/^\d{4}$/.test(v))
                  {
                  return false;
                  }
                  return true;
                }
	    	}
		],
		
		['month-wheninputed', '月份是由两个数字组成。', function(v){
                if (v==null || v==""){
                  return true;
                }else{
                  if(!/^\d{2}$/.test(v))
                  {
                  return false;
                  }
                  return true;
                }
	    	}
		],
		
		['alphanum-wheninputed', '请输入数字，字母，下划线，或 - 。', function(v){
                if (v==null || v==""){
                  return true;
                }else{
                  if(!/^[\w-]{1,}[\w-]*$/.test(v))
                  {
                  return false;
                  }
                  return true;
                }
	    	}
		],
		
		['filename-wheninputed', '文件名不能包含\\/:*?"<>|', function(v){
                if (v==null || v==""){
                  return true;
                }else{
                  if(/[\\\/\*\?"<>|]+/.test(v))
                  {
                  return false;
                  }
                  return true;
                }
	    	}
		],
		
		['0-100-wheninputed', '请输入0－100的数字', function(v) {
					return (isEmpty(v) || !isNaN(v))&&parseFloat(v)<100&&parseFloat(v)>0;
				}
		],	
		
		['ip-wheninputed', '请输入ip或者网址', function(v) {
					return (isEmpty(v) || isIP(v)); 
				}
		],
		
		['validate-fax', '请输入正确的传真号', function(v) {
				if (v==null || v==""){
                  return true;
                }else{
                  if(!/^\d+(-\d+)?$/.test(v))
                  {
                  return false;
                  }
                  return true;
                }
			}
		],
		
		['validate-positive-number', '请输入有效的正数', function(v) {
				if (v==null || v==""){
                  return true;
                }else{
                  if(Number(v)=="0" ||!/^\d+(\.\d+)?$/.test(v))
                  {
                  return false;
                  }
                  return true;
                }
			}
		],
		['validate-positive-currency', '请输入大于0的货币.例如100.00 .', function(v) {
					var num_value=v.replace(new RegExp(",","gm"),"");
					return isEmpty(v) || (/^\d+(\.\d+)?$/.test(num_value)&&Number(num_value)>0);
				}
		],
		['validate-not-negative-currency', '请输入大于等于0的货币.例如100.00 .', function(v) {
					var num_value=v.replace(new RegExp(",","gm"),"");
					return isEmpty(v) || (/^\d+(\.\d+)?$/.test(num_value));
				}
		],
		['validate-identity', '请输入有效身份证号', function(v) {
			return isEmpty(v) ||isIdentityCode(v);
			}
		],
		['validate-filename', '请输入有效文件名', function(v) {
				var reg= new RegExp("/^[^/\\:\*\?,\",<>\|]+$/ig"); 
				return isEmpty(v) || reg.test(v);
			}
		]
	] ;
	
	return {
		formId : config.formId,
		validators : {},
		validate : function (){
			this.initRule(rules) ;
			var elements = this.getAllElm() ;
			var allPass = true ;
			
			var valid = this ; 
			Ext.each(elements,function(element){ 
				var isPass = true ;
				var classNames=Ext.get(element).dom.className;
				if(classNames.indexOf('visible')>-1){
					isPass = valid.check(element);
					allPass = allPass && isPass ;  
				}else{
					if(valid.isVisible(element) || element.isValid) {
					isPass = valid.check(element);
					allPass = allPass && isPass ;   
				}
				}
				
				if(isPass) {
					//进行后台验证
				}
					
			}) ;
			return allPass ;
		},
		
		initRule : function (rules) {
			var valid = this ;
			Ext.each(rules,function(rule){
				var className = rule[0] ;
				valid.validators[className] = new Ext.matech.form.Validator(rule[0],rule[1],rule[2]) ;
			}) ;
		} ,
		
		check : function (elm){
			var element = Ext.get(elm) ;
			var classNames = element.getAttribute("className") ;
			var classArray = classNames.split(" ") ;
			var value = this.trim(element.getValue()) ;
			value = value.replace("请选择...","") ;
			value = value.replace("请选择或输入...","") ;
			
			//先清除样式再验证
			element.removeClass('validation-failed');
			element.removeClass('validation-passed');
			
			var valid = this ;
			
			var isPass = true ;
			var isSelectValidtate = false ;   //检查有没有进行下拉第三句sql验证,兼容旧的下拉
			Ext.each(classArray,function(className){
				
				if(className.toLowerCase() == "valuemustexist") {
					
					isSelectValidtate = true ;
					//后台验证
					if(value) {
						var backValid = valid.selectValidate(elm) ;
						if(!backValid) {
							var error = "输入的值不存在" ;
							valid.showErrorMsg(error, elm) ;
							isPass = false ;
							return false ;
						}else {
							valid.hideErrorMsg(elm) ;
						}
					}
					
				}else if(className.toLowerCase() == "ajaxvalidate") {
					if(value) {
						var returnValue = valid.ajaxValidate(elm,0) ;
						
						if(returnValue == "ok") {
							valid.hideErrorMsg(elm) ;
						}else {
							valid.showErrorMsg(returnValue, elm) ;
							isPass = false ;
							return false ;
						}
					}
				}else if(className.toLowerCase() == "ajaxexistval") {
					if(value) {
						var returnValue = valid.ajaxValidate(elm,1) ;
						
						if(returnValue == "ok") {
							valid.hideErrorMsg(elm) ;
						}else {
							valid.showErrorMsg(returnValue, elm) ;
							isPass = false ;
							return false ;
						}
					}
				}else if(className.toLowerCase() == "maxword") {
					if(value) {
						
						var _maxword=Ext.get(element).dom.maxword;
						
						if(value.length<_maxword){
							valid.hideErrorMsg(elm) ;
						}else{
							valid.showErrorMsg("当前字符数"+value.length+",超过最大字符数"+_maxword, elm) ;
							isPass = false ;
							return false ;							
						};						
					}
				}else {
					var validator = valid.validators[className] ;
					if(validator) {
						if(!validator.test.call(this,value)) {
							valid.showErrorMsg(element.getAttribute("title") || validator.tips,elm) ;
							isPass = false ;
							return false ;
						}else {
							valid.hideErrorMsg(elm) ;
						}
					}
				}
				
			}) ;			
			
			return isPass ;
		},
		
		getAllElm : function (){
			var form = Ext.get(config.formId) ;
			
			var inputElms = form.query("input[class]") ;
			
			
			var textAreaElms = form.query("textarea[class]") ;
			
			var selectElms = form.query("select[class]") ;
			
			return inputElms.concat(textAreaElms,selectElms) ;
		},
		
		trim : function (strSource){
			var t="";
			try{
				t=strSource.replace(/^\s*/,'').replace(/\s*$/,'');
			}catch(e){}
			return t;
		},
		
		isVisible : function(elm) {
			while(elm.tagName != 'BODY') {
				try{
				     if(!Ext.get(elm).isVisible())
					 return false;
				}catch(err){
					return true;
				}
				elm = elm.parentNode;
			}
			return true; 
		},
		
		showErrorMsg : function (tips,elm) {
			
			var element = Ext.get(elm) ;
			element.addClass('validation-failed');
			
			var tipType = config.tipType ;
			
			if(!tipType) tipType = "adivce" ;
			
			if(tipType == "advice") {
				this.showAdvice(tips, elm) ;
			}else if(tipType == "tip") {
				this.showToolTip(tips,elm);
			}else if(tipType == "alert") {
				//alert(tips);
			}
			
		},
		
		hideErrorMsg : function (elm) {
			
			var element = Ext.get(elm) ;
			element.addClass('validation-passed');
			
			var tipType = config.tipType ;
			
			if(!tipType) tipType = "adivce" ;
			
			if(tipType == "advice") {
				this.hideAdvice(elm) ;
			}else if(tipType == "tip") {
				this.hideToolTip(elm) ;
			}else if(tipType == "alert") {
				
			}
			
		},
		
		showToolTip : function(tips,elm) {
			
			var toolTip = Ext.get(elm.id+'tip') ;
			var box = Ext.get(elm.id+'box') ;
			
			if(toolTip) {
				//已经存在则直接更新内容 显示
				var content = Ext.get(elm.id+'content') ;
				content.update(tips);
				toolTip.dom.style.display = "";
				box.dom.style.display = "";
			}else {
				
				tooltip = Ext.DomHelper.append(document.body,{
					id: elm.id+'tip',
					cls: 'validate_tip',
					tag: 'div',
					html:"<span style='vertical-align:middle'>" 
						 +"<img src='" + MATECH_SYSTEM_WEB_ROOT + "/share/img/warn.png'></span>" 
						 + "&nbsp;<span id='"+elm.id+"content'>" + tips + "</span>" 
				}) ;
				 
				box = Ext.DomHelper.append(document.body,{
					id: elm.id+'box',
					cls: 'validate_box',
					tag: 'div'
				}) ;
			}
			
			var element = Ext.get(elm) ;
			var x = element.getX() ;
			var y = element.getY() ;
			
			//alert("x:"+x+" y:"+y + " left:"+element.getLeft())
			
			var tipElm = Ext.get(tooltip) ;
			if(tipElm.getWidth() > 150)
				tipElm.setWidth(150) ;
			
			if(tipElm.getWidth() < 100)
				tipElm.setWidth(100) ;
			
			var boxElm = Ext.get(box) ;
			
			var y = y - boxElm.getHeight() - tipElm.getHeight() + 10 ;
			//y = y < 0 ? 0 : y ;
			tipElm.setLeftTop(x+element.getWidth() - 40,y) ;
			boxElm.setLeftTop(x+element.getWidth() -20,y + tipElm.getHeight()) ;
			
			tipElm.on("click",function(){
				//tipElm.setOpacity(0.0,{duration:0.5,easing:'easeNone'});  
				//boxElm.setOpacity(0.0,{duration:0.5,easing:'easeNone'});  
				
				tipElm.dom.style.display = "none";
				boxElm.dom.style.display = "none";
				
				element.focus();
			}) ;
			
			var parent = element.parent("table") ;
			while(true) {
				parent = parent.parent() ;
				if(parent && 
				   ((parent.dom.tagName == "DIV" && parent.dom.style.overflow == "auto") 
				   || parent.dom.tagName == "BODY")) {
					break ;
				}
			}
			
			var curScrollTop = parent.getScroll().top ;
			var curScrollLeft = parent.getScroll().left ;
			var tipX = tipElm.getX() + curScrollLeft ;
			var tipY = tipElm.getY() + curScrollTop ;
			var boxX = boxElm.getX() + curScrollLeft ;
			var boxY = boxElm.getY() + curScrollTop ;
			
			if(parent.dom.tagName == "DIV") {
				parent.on("scroll",function(event,elm,obj){
					//重算位置
					//alert(parent.getScroll().top)
					var scrollTop = parent.getScroll().top ;
					var scrollLeft = parent.getScroll().left ;
					
					tipElm.setLeftTop(tipX - scrollLeft,tipY - scrollTop) ;
					boxElm.setLeftTop(boxX - scrollLeft ,boxY - scrollTop) ;
				});
			}
			
			
		},
		
		hideToolTip : function(elm) {
			var toolTip = Ext.get(elm.id+'tip') ;
			var box = Ext.get(elm.id+'box') ;
			
			if(toolTip) {
				toolTip.dom.style.display = "none";
				box.dom.style.display = "none";
			}
			
		},
		
		showAdvice : function(tips,elm) {
			var advice = Ext.get(elm.id+'tip') ;
			
			if(advice) {
				//已经存在则直接更新内容 显示
				var content = Ext.get(elm.id+'content') ;
				content.update(tips);
				advice.show();
				return ;
			}
			
			var autoid = elm.autoid ;
			if(!autoid) {
				//可能是新下拉，从ext对象中找autoid
				var inputId = elm.inputId ;
				if(inputId) {
					var selectCmp = Ext.getCmp(inputId) ;
					if(selectCmp)
						autoid = selectCmp.autoid ;
				}
			}
			var nextElm = elm ;
			var space = "" ;
			if(autoid) {
				nextElm = elm.nextSibling ;
				space = "&nbsp;&nbsp;&nbsp;" ;
			}
			var tooltip = Ext.DomHelper.insertAfter(nextElm,{
				id: elm.id+'tip',
				cls: 'validation-advice',
				tag: 'span',
				html:"<span style='vertical-align:middle'>" + space
					 +"<img src='" + MATECH_SYSTEM_WEB_ROOT + "/share/img/warn.png'></span>" 
					 + "&nbsp;<span id='"+elm.id+"content'>" + tips + "</span>" 
			}) ;
			
		},
		
		hideAdvice : function(elm) {
			var advice = Ext.get(elm.id+'tip') ;
			if(advice) {
				advice.hide();
				advice.dom.style.display = "none";
			}
		},
		
		selectValidate : function(elm) {
			var autoid = elm.autoid ;
			var value = elm.value;
			var refer ;
			
			if(!autoid) {
				//可能是新下拉，从ext对象中找autoid
				var inputId = elm.inputId ;
				if(!inputId) return true;
				
				var selectCmp = Ext.getCmp(inputId) ;
				if(!selectCmp) return true ;
				
				autoid = selectCmp.autoid ;
				value = selectCmp.getValue() || selectCmp.getRawValue();
				
				 var reg3=new RegExp(",","g");    //替换英文,为','
				 value = (value+"").replace(reg3,"','");
				
				refer = selectCmp.initReferParam(elm) ;
			}else {
				refer = initRefer(elm) ;
			}
			
			if(!autoid) return true;

			if($.ajax){
				$.ajax({
					type :"Post",
					async:false,
					url : MATECH_SYSTEM_WEB_ROOT+"/general.do?method=combox&checkmode=1&autoid="+autoid,
					data:{checkmode:1,autoid:autoid,pk1:value,refer:refer[0],refer1:refer[1],refer2:refer[2]},
					success : function(data) {
						strResult=unescape(data);
					}
				});				
			}else{
				jQuery.ajax({
					type :"Post",
					async:false,
					url : MATECH_SYSTEM_WEB_ROOT+"/general.do?method=combox&checkmode=1&autoid="+autoid,
					data:{checkmode:1,autoid:autoid,pk1:value,refer:refer[0],refer1:refer[1],refer2:refer[2]},
					success : function(data) {
						strResult=unescape(data);
					}
				});
			}


			if(strResult == "[]"){
				return false ;
			}
			
			return true ;
		},
		
		ajaxValidate : function(elm,_type) {
			
			var validateId = elm.getAttribute("validateId") ;
			
			var value ;
			var refer ;
			if(!validateId) {
				//可能是新下拉，从ext对象中找autoid
				var inputId = elm.inputId ;
				if(!inputId) return true;
				
				var selectCmp = Ext.getCmp(inputId) ;
				if(!selectCmp) return true ;
				
				validateId = selectCmp.validateId ;
				value = selectCmp.getValue();
				refer = selectCmp.validRefer ;
			}else {
				refer = elm.getAttribute("validRefer");
				value = elm.value;
			}
			if(Ext.get(elm)){
				var element = Ext.get(elm) ;
				if(element.hasClass("validate-currency")) {
					value = value.replace(new RegExp(",","gm"),""); 
				}
			}else {
				value = value.replace(new RegExp(",","gm"),""); 
			}
			
			if(!validateId) return true ;
			
			var referArr = initRefer(refer,"|") ;
			var referStr = "" ;
			if(referArr.length > 0) {
				referStr = referArr.join("|") ;
			}
			
			var url = MATECH_SYSTEM_WEB_ROOT+"/general.do?method=validate&validateId="+validateId ;
			var uuid = "" ;
			if(document.getElementById("uuid")) uuid = document.getElementById("uuid").value ;
			var param = "&type="+_type+"&refer="+referStr+"&value="+value + "&uuid=" + uuid;
			
			var strResult = ajaxLoadPageSynch(url,param) ;
			return strResult ;
		}
		
		
	} ;
} ;

/*
 * 阻止input按钮在disabled和readOnly时按backspace返回前一个页面
 * 
 * 监控页面keydown事件
 */
Ext.EventManager.on(Ext.getBody(),"keydown",function(e, t) {   
    if (e.getKey() == e.BACKSPACE &&(t.disabled || t.readOnly)) {   
        e.stopEvent();   
    }
});

//提交表单前的通用检查
function formSubmitCheck(formid){
	var vd = new Ext.matech.form.Validation({formId:formid,tipType:"advice"});
	var result=vd.validate();
	return  result; 
}
