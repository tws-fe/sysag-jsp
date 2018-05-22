var IdCard = (function(){

	//构造方法
	//参数：参数对象
	var Person = function(){
	  this.name="";//姓名
	  this.sex="";//性别
	  this.nation="";//名族
	  this.birthday="";//出生
	  this.address="";//住址
	  this.idNum="";//身份证号码
	  this.issue="";//发证机关
	  this.effectedDate="";//办证日期	
	  this.expiredDate="";//失效日期
	  this.headImg="";//相片	
	}

  //私有方法，外面将访问不到
  //控件回调函数
  //参数：设备状态，设备数据
  //返回值：无
  var _IdCardFunCallback=function(state, data) {
	  
	    var result={};
	    result.person=null;
	    
	    var that=this;  
	    var _tip="";
	    
      if (state == 10) {
    	  that.setHdbState(1);
    	  _tip='设备打开成功';
      }else if(state == 11){
    	  that.setHdbState(1);
    	  _tip='设备已打开，无需重复的打开';
      }else  if (state == 20) {
    	  that.setHdbState(1);
    	  _tip='读取成功';
    	  
    	  try{
        	  var jsonData = eval('('+data+')');
        	  result.person=new Person();
        	  for(var _pItem in result.person){
        		  result.person[_pItem]=jsonData[_pItem];
        	  }  		  
    	  }catch(e){
    		  _tip='解析数据错误：'+e;
    	  }
      }else  if (state == 30) {
    	  that.setHdbState(2);
    	  _tip='设备已关闭';
      }else if(state == -10){
    	  that.setHdbState(4);
    	  _tip='设备打开失败，失败信息：'+data;
      }else if(state == -30){
    	  that.setHdbState(2);
    	  _tip='设备已关闭，不能重复关闭';
      }else if(state == -100){
    	  that.setHdbState(3);
    	  _tip='设备已崩溃，不能正常使用';
      }else{
    	  that.setHdbState(4);
    	  _tip='设备出现异常，错误码：'+state+', 错误信息：'+data;
      }	
      
      
	  result.state=state;
	  result.tip=_tip;
		
	  if(that.onstatechange && $.isFunction(that.onstatechange)){
			that.onstatechange(result);
	  }      
      
  }
  
  //回传消息
  var _TransMsg = function(thisObj,_tip) {
		var result={};
		result.tip=_tip;
		if(thisObj.onstatechange && $.isFunction(thisObj.onstatechange)){
			thisObj.onstatechange(result);
		}
  };  
  
  
  //方法绑定
  //参数：对象实例
  //返回值：无
  var _bind = function(that){
	$(window).on("unload", function(e) {
		if(that.getHdbState()==1){
			twsdevice.idcard.close();
		}
	});
  };
  

  var IdCardFun = function(config){
	  
	  config=config||{};
	  
	  for(var _obj in config){
		this[_obj]=config[_obj];
	  }
	  
	  //设备状态值 
	  var _hdbState=0;	   // 0：未初始化，1:设备打开，2.设备关闭，3.设备崩溃 4.未知错误
	  this.setHdbState=function(obj){
		  _hdbState=obj;
	  };
	  this.getHdbState=function(){
		  return _hdbState;
	  }	
	  
	  try{
		  if(!twsdevice){
			  _TransMsg(this,"找不到身份证读取控件！");
			  this.disable=true;
		  }else{
			  this.disable=false;
			  _TransMsg(this,"身份证读取控件正常！");
		  }
	  }catch(e){
		  _TransMsg(this,"找不到身份证读取控件！");
		  this.disable=true;
	  }
	  
	  //事件绑定
	  _bind(this);
  }

  IdCardFun.prototype.openIdcard = function() {
	  if(this.disable){
		  _TransMsg(this,"找不到身份证读取控件！");
		  return;
	  }
	  twsdevice.idcard.open(this, _IdCardFunCallback);
  };

  IdCardFun.prototype.closeIdcard = function() {
	  if(this.disable){
		  _TransMsg(this,"找不到身份证读取控件！");
		  return;
	  }
	  twsdevice.idcard.close();
  };
  
  //返回构造函数
  return IdCardFun;

})();