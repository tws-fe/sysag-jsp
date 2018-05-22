if (!this.police) {
    this.police = {};
}
(function () {
	police.getWebOffice=function(){
		var parent=police.parentObj;
		var webOffice=parent._WebOffice;
		if(!webOffice){
			webOffice=parent.parent._WebOffice;
			if(!webOffice){
				webOffice=parent.parent.parent._WebOffice;
				if(!webOffice){
					alert('控件环境初始化失败！');
					return null;
				}else{
					webOffice=parent.parent.parent.getWebOffice();
				}
			}else{
				webOffice=parent.parent.getWebOffice();
			}
		}else{
			webOffice=parent.getWebOffice();
		}
		
		return webOffice;
		
	};

	police.setServerTime=function(timegetter){
		if (typeof timegetter == 'string'){
			timegetter = document.getElementById(timegetter);
		}
		if (timegetter.value.length > 0){
			return timegetter;
		}
		
		TimeUtil.init().getServerTimeTo(function(time){
			timegetter.value = time;
		});
			
		return timegetter;
	};
	
	police.setUsername=function(namegetter){
		if (typeof namegetter == 'string'){
			namegetter = document.getElementById(namegetter);
		}
		if (namegetter.value.length > 0){
			return namegetter;
		}
		namegetter.value = '系统管理员';
		return namegetter;
	};
	
	police.copyField=function(to, from){
		if (typeof from == 'string'){
			from = document.getElementById(from);
		}
		if (typeof to == 'string'){
			to = document.getElementById(to);
		}
		if (to && from){
			to.value = from.value;	
		}
		return to;
	};
	
	police.getlocationhost=function (){
      return "http:\/\/"+window.location.host;
    };
    
	police.extWordPrint=function(param,key){
		
		var _key=key||getUUID();
		
	   	var url =MATECH_SYSTEM_WEB_ROOT+ "/general.do?method=expWord&"+param;
	   	$.ajax({ 
			async: true, 
			type : "POST", 
			url : url,  
	    	cache:false,    
			success : function(data) { 
				var t=data;
				try{ 
					downloadOpen(t,_key);
				}catch(e){alert(e);}
			} 
	 	}); 
	   	
	   	function downloadOpen(path,uuid){
	   		try{
	   			var url = police.getlocationhost() +"/"+ path;	   			
	   	        var t = twsdevice.oldComponents.invokeOcxMethod("KingWeb.DownLoadControl","funDownloadZipFileAndOpen",[url,uuid]);
	   		}catch(e){
		   		var o=police.getWebOffice();
		   		if (o){
		   			var url = police.getlocationhost() +"/"+ path;
		   			var t=o.funDownloadZipFileAndOpen(url,uuid);
		   		}	   			
	   		}
	   	}
	};
	
	
	/**
	 * 检查日期是否正确
	 * @param  y1  当前年份
	 * @param  m1  当前月份
	 * @param  d1  当前日期
	 * @param  y2  身份证上的年份
	 * @param  m2  身份证上的月份
	 * @param  d2  身份证上的日期
	 */
	police.checkDate=function(y1,m1,d1,y2,m2,d2){
		
		if(y2<y1){//判断是否小于当前年
			return true ;
		}else if(y2==y1){
			if(m2<m1){
				return true ;	
			}else if(m2==m1){
				if(d2<=d1){
					return true ;
				}else{
					return false ;
				}
			}else{
				return false ;
			}
		}else{
			return false ;
		}
	};
	
	police.checkMobile=function(opt){
		   var number = opt.value;
		   var len = number.length;
		   if(len==11){
		      if(!(/^1[3|4|5|8|9][0-9]\d{4,8}$/.test(number))){
		        alert("不是正确的手机号码的前七位");
		        opt.value="";
		        return false;
		      }
		   }else{
		      alert("您输入的手机号码不是11位的");
		      opt.value="";
		      return false;
		   }

	};
	
	// 15 位身份证验证
	police.checkFifTeen=function(num){
		
		var re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);  
		var arrSplit = num.match(re);  //检查生日日期是否正确
		var yearOfCard = Number(arrSplit[2]);//获取身份证的年份
		var monthOfCard = Number(arrSplit[3]);//获取身份证的月份
		var dayOfCard = Number(arrSplit[4]);//获取身份证的日期
				
		var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
		
		bGoodDay = (dtmBirth.getYear()==yearOfCard)&&((dtmBirth.getMonth()+1)==monthOfCard)&&(dtmBirth.getDate()==dayOfCard);
		if (!bGoodDay) {          
			alert("身份证号码非法，请检查确认！");
		    return false;  
		} else { //将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。         
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);          
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');       
			var nTemp = 0, i ,valnum;             
			num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
			for(i = 0; i < 17; i ++) {
			    nTemp += num.substr(i, 1) * arrInt[i];
			}  
			
			num += arrCh[nTemp % 11];  
			valnum = arrCh[nTemp % 11];
			if(valnum!=num.substr(17,1)){
				alert("检验码不正确");
				return false ;
			}
			
		    return true;  
		} 
	};

	// 18位身份证 验证
	police.checkEightTeen=function(num){
		
		var re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);  
		var arrSplit = num.match(re);  //检查生日日期是否正确  
		var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
		var bGoodDay;
		
		var now = new Date();
	    var yearOfNow = now.getFullYear();//获取当前的年份
	    var monthOfNow = now.getMonth()+1;//获取当前证的年份
	    var dayOfNow=now.getDate();//获取当前的日期
		
		
		var yearOfCard = Number(arrSplit[2]);//获取身份证的年份
		var monthOfCard = Number(arrSplit[3]);//获取身份证的月份
		var dayOfCard = Number(arrSplit[4]);//获取身份证的日期
		
		bGoodDay=(dtmBirth.getFullYear()==yearOfCard) && ((dtmBirth.getMonth() + 1)==monthOfCard) && (dtmBirth.getDate()==dayOfCard);
		if (!bGoodDay) {  
			alert("身份证号码非法，请检查确认！");
		    return false;  
		}else { //检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。  
		    var reg = police.checkDate(yearOfNow,monthOfNow,dayOfNow,yearOfCard,monthOfCard,dayOfCard);
		    if(reg){
		    	   var valnum;  
				   var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);  
				   var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');  
				   var nTemp = 0, i;  
				   for(i = 0; i < 17; i ++) {  
				       nTemp += num.substr(i, 1) * arrInt[i];
				   }  
				   valnum = arrCh[nTemp % 11];  
				   if (valnum != num.substr(17, 1)) {
				   	    alert("身份证的验证码不正确");
				        return false;  
				   }
				   
				   return true;
		     }else{
		     	alert("身份证上的日期大于当前日期");
				return false ;
		     }
	    }
	};
	police.isIdCardNoByType=function(num,idcardtype) { 
		if(idcardtype=="居民身份证"){
			return police.isIdCardNo(num);
		}else if(idcardtype=="其他"){
			return true;
		}else if(idcardtype=="回乡证"){
			if (num.length!=11 || !(/(H|M)(\d{10}$)/.test(num))) {   
				
				Ext.MessageBox.show({
					msg: "<span style=\"font-size:16px;\">回乡证号码非法，第一位为字母（H：香港 M：澳门），后十位为数字，请检查确认！</span>",
					buttons:{"ok":"确定"},  
					fn:function(e){
						if(e=="ok"){}
					},            
					animal:"id1",  
		            width: 600,  
		            height:200,  
		            modal:true,  
		            icon:Ext.Msg.INFO,
		            closable: true
		        });	
				
		        return false;          
		    }  
			return true;
		}else if(idcardtype=="港澳通行证"){
			if (num.length!=9 || !(/([A-Z])(\d{8}$)/.test(num))) {   
				
				Ext.MessageBox.show({
					msg: "<span style=\"font-size:16px;\">港澳通行证号码非法，第一位为大写字母，后八位为数字，请检查确认！</span>",
					buttons:{"ok":"确定"},  
					fn:function(e){
						if(e=="ok"){}
					},            
					animal:"id1",  
		            width: 600,  
		            height:200,  
		            modal:true,  
		            icon:Ext.Msg.INFO,
		            closable: true
		        });	
				
		        return false;          
		    }  
			return true;
		}else if(idcardtype=="护照"){
			if (num.length!=9 || !(/([A-Z])(\d{8}$)/.test(num))) {   
				
				Ext.MessageBox.show({
					msg: "<span style=\"font-size:16px;\">护照证号码非法，第一位为大写字母，后八位为数字，请检查确认！</span>",
					buttons:{"ok":"确定"},  
					fn:function(e){
						if(e=="ok"){}
					},            
					animal:"id1",  
		            width: 600,  
		            height:200,  
		            modal:true,  
		            icon:Ext.Msg.INFO,
		            closable: true
		        });	
				
		        return false;          
		    }  
			return true;
		}else if(idcardtype=="台胞证"){
			if (num.length!=8 || !(/\d{8}$/.test(num))) {   
				
				Ext.MessageBox.show({
					msg: "<span style=\"font-size:16px;\">台胞证号码非法，应该为《通行证》号码的前8位数字，请检查确认！</span>",
					buttons:{"ok":"确定"},  
					fn:function(e){
						if(e=="ok"){}
					},            
					animal:"id1",  
		            width: 600,  
		            height:200,  
		            modal:true,  
		            icon:Ext.Msg.INFO,
		            closable: true
		        });	
				
		        return false;          
		    }  
			return true;
		}
	};
	
	police.isIdCardNo=function(num) { 
		num = num.toUpperCase(); //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。         
	    
		if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {   
			
			Ext.MessageBox.show({
				msg: "<span style=\"font-size:16px;\">身份证号码非法，请检查确认！</span>",
				buttons:{"ok":"确定"},  
				fn:function(e){
					if(e=="ok"){}
				},            
				animal:"id1",  
	            width: 600,  
	            height:200,  
	            modal:true,  
	            icon:Ext.Msg.INFO,
	            closable: true
	        });	
			
	        return false;          
	    }   
	    //验证前2位，省份符合  
	    var aCity={
	    	11:"北京",12:"天津",13:"河北",14:"山西",
	    	15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",
	    	31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",
	    	36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",
	    	44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",
	    	52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
	    	63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",
	    	82:"澳门",91:"国外"
	    };

		
	    if(aCity[parseInt(num.substr(0,2))]==null){  
	        alert('身份证号不正确或不符合规定！');
	        return false;  
	    }
	    
	 	//下面分别分析出生日期和校验位  
	 	var len = num.length;   
		if (len == 15) {  
			return police.checkFifTeen(num);
		}  
		if (len == 18) {  
			return police.checkEightTeen(num);
		}
		
	};
	
	police.getIdCardBirthday=function(num) {
     	var len=num.length;   
     	var birthday="";
     	
    	if (len == 15) {  

    		var re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);  
    		var arrSplit = num.match(re);  //检查生日日期是否正确
    		var yearOfCard = Number(arrSplit[2]);//获取身份证的年份
    		var monthOfCard = Number(arrSplit[3]);//获取身份证的月份
    		var dayOfCard = Number(arrSplit[4]);//获取身份证的日期
    		
            if(monthOfCard<10)monthOfCard="0"+monthOfCard ;
            if(dayOfCard<10)dayOfCard="0"+dayOfCard ;
            birthday='19'+yearOfCard+monthOfCard+dayOfCard;
    		
    	}
    	
    	if (len == 18) {  

			var re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);  
			var arrSplit = num.match(re);  //检查生日日期是否正确  
			var yearOfCard = Number(arrSplit[2]);//获取身份证的年份
			var monthOfCard = Number(arrSplit[3]);//获取身份证的月份
			var dayOfCard = Number(arrSplit[4]);//获取身份证的日期
			
		   if(monthOfCard<10)monthOfCard="0"+monthOfCard ;
		   if(dayOfCard<10)dayOfCard="0"+dayOfCard ;

		   birthday=''+yearOfCard+monthOfCard+dayOfCard;
    	}
    	
    	return birthday;
	};
	
	police.openHelp=function(helpType,helpName) {
		var url=MATECH_SYSTEM_WEB_ROOT+"/tws/help/"+helpType+".jsp?&rand="+Math.random();
		matech.OpenUrlByWindowOpen(url);
	};
	
	police.funPostFile=function(filePath,uploadUrl) {
		var returnValue="";
		var url = police.getlocationhost() +"/"+ uploadUrl;	   
		var param="fileName="+filePath;
		try{
			returnValue = twsdevice.oldComponents.invokeOcxMethod("KingWeb.DownLoadControl","funPostFile",[filePath,url,param]);
   		}catch(e){
	   		var o=police.getWebOffice();
	   		if (o){
	   			returnValue = webOffice.funPostFile(t,url,param);
	   		}	   			
   		}
   		return returnValue;
	};
	
}());

police.parentObj=parent;