Ext.namespace("Ext.matech.form");

Ext.matech.form.Validator = function (className,tips,test) {
	this.className = className;
	this.test = test ? test : function(){return true;};
	this.tips = tips ? tips : '请输入有效的值';
};
var arr = [];// 创建数组
var __curUnValidaObj=null;
Ext.matech.form.Validation = function (config){
	config = config || {}  ;
	

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
				  		param.push(referObj.value); 
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
	    ['required', '<label style="color:red">请输入有效值</label>', function(v) {
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
						//var test = new Date(v);
						//alert("|"+v+"|"+test+"|");
						//return isEmpty(v) || !isNaN(test);
						var reg =/\d{4}-\d{2}-\d{2}/ ;
						return isEmpty(v) || reg.test(v);
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
		
		['validate-phonenumber', '电话号码可以用+开头，只能输入数字,-符号 例如020-12345678', function(v){
			
	        	if(!/^[+]{0,1}(\d){1,3}[ ]?([-－]?((\d)|[ ]){1,12})+$/.test(v)){
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
			__curUnValidaObj=null;
			Ext.each(elements,function(element){
				var isPass = true ;
				
				if(valid.isVisible(element)) {
					isPass = valid.check(element);
					allPass = allPass && isPass ;   
				}
				
				if(isPass) {
					//进行后台验证
				}
				
			}) ;
			if(__curUnValidaObj){
				var selectCmp = Ext.getCmp(__curUnValidaObj.id) ;
				if( selectCmp ) {
					//EXT下拉
					selectCmp.focus(false,200);
				}else if(__curUnValidaObj.type.toUpperCase()=='HIDDEN'){
					var ext_validate = __curUnValidaObj.getAttribute("ext_validate");
					//是评分控件
					if(ext_validate=="score"){
						//__curUnValidaObj.focus();
					 var scroll_offset = $(__curUnValidaObj).offset();  //得到pos这个div层的offset，包含两个值，top和left
					  $("body,html").animate({
					   scrollTop:scroll_offset.top  //让body的scrollTop等于pos的top，就实现了滚动
					   },0);
					}else{
						//是checkbox
						var t=document.getElementsByName('_'+__curUnValidaObj.id);
						if(t){
							t[0].focus();
						}
					}
					
					
				}else{
					__curUnValidaObj.focus();
				}
				
			}
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
					
					var backValid = valid.selectValidate(elm) ;
					if(!backValid) { 
						var error = "输入的值不存在" ;
						valid.showErrorMsg(error, elm) ;
						isPass = false ;
						return false ;
					}else {
						valid.hideErrorMsg(elm) ;
					}
					
				}else if(className.toLowerCase() == "ajaxvalidate") {
					var returnValue = valid.ajaxValidate(elm) ;
					
					if(returnValue == "ok") {
						valid.hideErrorMsg(elm) ;
					}else {
						valid.showErrorMsg(returnValue, elm) ;
						isPass = false ;
						return false ;
					}
					
				}else {
					var extType = element.getAttribute("ext_type"); //表单类型
					var ext_validate = element.getAttribute("ext_validate");
					if(extType == "attachFile" && className == 'required'){
						//检查附件是否已上传
						var aObj = document.getElementById("attachListLength_" + element.id);
						if(!aObj || aObj.value == 0){
							var elm1 = Ext.getDom(element.id + "-btn");
							valid.showErrorMsg("请先上传附件",elm1) ;
							isPass = false ;
							return false ;
						}
					}else if(ext_validate == "score" && className == 'required') {
						var val = element.getAttribute("value");
						if(val=='0' || val=='' || val==null){
							var elm1 = Ext.getDom(element.id);
							valid.showErrorMsg("<label style='color:red;'>请评分</label>",elm1) ;
							isPass = false ;
							return false ;
						}
					}else{
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
				}
				
			}) ;
			
			if(isPass && !isSelectValidtate && elm.valuemustexist && elm.valuemustexist=="true") {
				//如果前台验证通过了,并且没进行后台验证,就先进行后台验证
				var backValid = this.selectValidate(elm) ;
				if(!backValid) {
					var error = "输入的值不存在" ;
					this.showErrorMsg(error, elm) ;
					isPass = false ;
				}
			}
			
			return isPass ;
		},
		
		getAllElm : function (){
			var form = Ext.get(config.formId) ;
			if (!form){
				form = Ext.get(window[config.formId]);
			}
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
				     //if(!Ext.get(elm).isVisible())	--这个在兼容模式下 下拉会被视为不可见，导致下拉必填控制失效
					 if(!Ext.getCmp(elm.id).isVisible())
					 return false;
				}catch(err){
					return true;
				}
				elm = elm.parentNode;
			}
			return true; 
		},
		
		showErrorMsg : function (tips,elm) {
			
			if(!__curUnValidaObj){
				//聚焦第一个不OK的节点
				__curUnValidaObj=elm;
			}
			
			var element = Ext.get(elm) ;
			element.addClass('validation-failed');
			
			var tipType = config.tipType ;
			
			if(!tipType) tipType = "tip" ;
			
			tipType="tip";
			
			if(tipType == "advice") {
				this.showAdvice(tips, elm) ;
			}else if(tipType == "tip") {
				this.showToolTip(tips,elm);
			}else if(tipType == "alert") {
				alert(tips);
			}
			
		},
		
		showErrorMsgt : function (tips,elm) {
			
			if(!__curUnValidaObj){
				//聚焦第一个不OK的节点
				__curUnValidaObj=elm;
			}
			
			var element = Ext.get(elm) ;
			element.addClass('validation-failed');
			
			var tipType = config.tipType ;
			
			if(!tipType) tipType = "tip" ;
			
			tipType="tip";
			
			if(tipType == "advice") {
				this.showAdvice(tips, elm) ;
			}else if(tipType == "tip") {
				this.showToolTip1(tips,elm);
			}else if(tipType == "alert") {
				alert(tips);
			}
			
		},
		
		hideErrorMsg : function (elm) {
			
			var element = Ext.get(elm) ;
			element.addClass('validation-passed');
			
			var tipType = config.tipType ;
			
			if(!tipType) tipType = "adivce" ;
			
			tipType="tip";
			
			if(tipType == "advice") {
				this.hideAdvice(elm) ;
			}else if(tipType == "tip") {
				this.hideToolTip(elm) ;
			}else if(tipType == "alert") {
				
			}
			
		},
		
		//显示在上方
		showToolTip1 : function(tips,elm) {
			
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
						 +"<img src='" + MATECH_SYSTEM_WEB_ROOT + "/img/warn.png'></span>" 
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
		
		//显示在左边
		showToolTip : function(tips,elm) {
		
			
			var element = Ext.get(elm) ;
			
			var id=elm.id;
			//alert('1:'+id);
			
			
			//可能是新下拉，从ext对象中找autoid
			var selectCmp = Ext.getCmp(id) ;
			if(selectCmp){
				//下拉
				id = selectCmp.el.dom.id ;
				//alert('2:'+id);
			}else if(elm.type.toUpperCase()=='HIDDEN'){
				//是checkbox
				
				var ext_validate = elm.getAttribute("ext_validate");
				
				if(ext_validate=="score"){
					var ulobj = elm.previousSibling;
					id = ulobj;
				}else{
					var t=document.getElementsByName('_'+elm.id);
					if(t){
						id=t[0].id;
					}
				}
				
				
			}
			
			
			if(!element._myToolTip){
				element._myToolTip=new Ext.ToolTip({
					target: id,
					anchor: 'left',
					trackMouse: false,
					anchorToTarget:true,
					autoHide:false,
					html: tips
				});
				
				
				var parent = element.parent("table") ;
				while(true) {
					parent = parent.parent() ;
					if(parent && 
					   ((parent.dom.tagName == "DIV" && parent.dom.style.overflow == "auto") 
					   || parent.dom.tagName == "BODY")) {
						break ;
					}
				}
				
				if(parent.dom.tagName == "DIV") {
					parent.on("scroll",function(event,elm,obj){
						element._myToolTip.show();
					});
				}
				
			}
			
			element._myToolTip.show();
			arr.push(element); // 添加到最后
			
			element._myToolTip.show();
			
			var scrollFunc=function(e){ 
				for (var i=0;i<arr.length;i++){
					  var al=arr[i];
					  al._myToolTip.hide();
				}
			}   
			/*注册事件*/     
			if(document.addEventListener){ document.addEventListener('DOMMouseScroll',scrollFunc,false);}  
			window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome  
			
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
					 +"<img src='" + MATECH_SYSTEM_WEB_ROOT + "/img/warn.png'></span>" 
					 + "&nbsp;<span id='"+elm.id+"content'>" + tips + "</span>" 
			}) ;
			
		},
		
		hideAdvice : function(elm) {
			var advice = Ext.get(elm.id+'tip') ;
			if(advice) {
				advice.hide();
			}
		},
		
		selectValidate : function(elm) {
			var autoid = elm.autoid ;
			var value ;
			var refer ;
			if(!autoid) {
				//可能是新下拉，从ext对象中找autoid
				var inputId = elm.inputId ;
				if(!inputId) return true;
				
				var selectCmp = Ext.getCmp(inputId) ;
				if(!selectCmp) return true ;
				
				autoid = selectCmp.autoid ;
				value = selectCmp.getValue();
				refer = selectCmp.initReferParam(elm) ;
			}else {
				refer = initRefer(elm) ;
			}
			
			if(!autoid) return true;
			if(value == '') return true;

			var url = MATECH_SYSTEM_WEB_ROOT+"/hint.do?method=combox&checkmode=1&autoid="+autoid+"&pk1="+value;
			var param = "&refer=" + refer[0] + "&refer1="+ refer[1] + "&refer2="+ refer[2] ;
			
			var strResult = ajaxLoadPageSynch(url,param) ;
			if(strResult == ""){
				return false ;
			}
			
			return true ;
		},
		
		ajaxValidate : function(elm) {
			
			var validateId = elm.validateId ;
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
				refer = elm.validRefer ;
				value = elm.value ;
			}
			
			if(!validateId) return true ;
			
			var referArr = initRefer(refer,"|") ;
			var referStr = "" ;
			if(referArr.length > 0) {
				referStr = referArr.join("|") ;
			}
			
			var url = MATECH_SYSTEM_WEB_ROOT+"/hint.do?method=validate&validateId="+validateId ;
			var param = "&refer="+referStr+"&value="+value + "&uuid=" + document.getElementById("uuid").value;
			
			var strResult = ajaxLoadPageSynch(url,param) ;
			
			return strResult ;
		}
		
		
	} ;
	
	
	
	
} ;