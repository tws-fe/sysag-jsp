Ext.namespace("matech.string");

matech.string = function (obj){
	obj = obj || "" ;
	return {
		startWith:function(str){
			var reg = new RegExp("^" + str);
			return reg.test(obj);			
		},
		removeHTMLTag:function(str){
			try{
			    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
			    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
			    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;    		
			}catch(e){
			}
		    return str;			
		},
		endWith:function(str){
			var reg = new RegExp(str + "$");
			return reg.test(obj);			
		},
		trim:function(){
			return obj.replace(/^\s+|\s+$/g, '');    
		},
		toFloat:function(){
			var result=parseFloat(obj);
			if(isNaN(result)){
				result=0;
			}
			return result;
		}
	};
};
                                                                                                        	                                                                                                            
matech.Map=function(){                                      
	var struct = function(key, value) {                   
		 this.key = key;                                      
		 this.value = value;                                  
	};                                                     
		                                                      
	var put = function(key, value){                       
		 for (var i = 0; i < this.arr.length; i++) {          
		  if ( this.arr[i].key === key ) {                    
		   this.arr[i].value = value;                         
		   return;                                            
		  }                                                   
		 }                                                    
		  this.arr[this.arr.length] = new struct(key, value); 
	};                                                     
		                                                      
	var get = function(key) {                             
		  for (var i = 0; i < this.arr.length; i++) {         
		   if ( this.arr[i].key === key ) {                   
		     return this.arr[i].value;                        
		   }                                                  
		  }                                                   
		  return null;                                        
	};                                                    
		                                                      
	var remove = function(key) {                         
		  var v;                                              
		  for (var i = 0; i < this.arr.length; i++) {         
		   v = this.arr.pop();                                
		   if ( v.key === key ) {                             
		    continue;                                         
		   }                                                  
		   this.arr.unshift(v);                               
		  }                                                   
	};                                                    
		                                                      
	var size = function() {                              
		  return this.arr.length;                             
	};                                                    
		                                                      
	var isEmpty = function() {                           
		 return this.arr.length <= 0;                        
	};                                                    
		                                                      
	var clear=function(){
	  var length=this.arr.length;
	  for (var i = 0;i <length; i++) {         
		   this.arr.shift();
	  }
	};
	
	var keySet=function(){
	  var keyAry = new Array(); 
	  for (var i = 0; i < this.arr.length; i++) {         
		  keyAry.push(this.arr[i].key);
	  }
	  return keyAry;
	};
	var valueSet=function(){
		  var valueAry = new Array(); 
		  for (var i = 0; i < this.arr.length; i++) {         
			  valueAry.push(this.arr[i].value);
		  }
		  return valueAry;
	};
	
	this.arr = new Array();                              
	this.get = get;                                      
	this.put = put;                                      
	this.remove = remove;                                
	this.size = size;                                    
	this.isEmpty = isEmpty;     
	this.clear=clear;
	this.keySet=keySet;
	this.valueSet=valueSet;
};                                                    
           
Date.prototype.Format = function(fmt){                                                                                                    
  var o = {                                                                                                            
    "M+" : this.getMonth()+1,                 //月份                                                                   
    "d+" : this.getDate(),                    //日                                                                     
    "h+" : this.getHours(),                   //小时                                                                   
    "m+" : this.getMinutes(),                 //分                                                                     
    "s+" : this.getSeconds(),                 //秒                                                                     
    "q+" : Math.floor((this.getMonth()+3)/3), //季度                                                                   
    "S"  : this.getMilliseconds()             //毫秒                                                                   
  };                                                                                                                   
  if(/(y+)/.test(fmt))                                                                                                 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));                                  
  for(var k in o)                                                                                                      
    if(new RegExp("("+ k +")").test(fmt))                                                                              
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));             
  return fmt;                                                                                                          
};                                                                                                                      

