var FingerPrint = (function(){
    
	var PersonFingers=new Array();
	
	//构造方法
	//参数：参数对象
	var Person = function(personId,personKey,personFNum,personValue){
	  this.personId=personId;
	  this.personKey=personKey;
	  this.personValue=personValue;
	  this.personFNum=personFNum;
	}
	
	var Finger=function(){
		this.fdata=new Array();
		this.fimage=new Array();
		this.mdata="";
	}

	
  //私有方法，外面将访问不到
  //控件回调函数
  //参数：设备状态，设备数据
  //返回值：无
  var _fingerprintCallback=function(state, data) {
	    
	    var result={};
	    result.person=null;
	    result.finger=null;
	    
	    var that=this;  
	  
		var _tip="";
		var _data="";
		var _image="";

		if (state == 10) {
			that.setHdbState(1);
			_tip='设备打开成功';
		}else if(state == 11){
			that.setHdbState(1);
			_tip='设备已打开，无需重复的打开';
		}else  if (state == 20) {
			
			var currentData=eval('('+data+')');			
			_data=currentData.template;
			_image=currentData.image;
			
			_tip='采集到一枚指纹';
			
			if(that.getHdbCurOpt()==1){
				
				var _figer=that.getFinger();
				
				
				var regNum=_figer.fdata.length;
				
				if(regNum==0){
					_figer.fdata[0]=_data;
					_figer.fimage[0]=_image;
					_tip="开始第2次采集指纹...";	
				}else if(regNum==1){
					
			        var ret = twsdevice.fingerprint.DBCacheCompareFinger(that.getHdbHandle(),_figer.fdata[0],_data);
			        
			        if(ret<70){
						_figer.fdata[0]=_data;
						_figer.fimage[0]=_image;
						_tip="第二次指纹和第一次指纹不一致，请重新采集！";
			        }else{
						_figer.fdata[1]=_data;
						_figer.fimage[1]=_image;
						_tip="开始第3次采集指纹...";				        	
			        }
				}else if(regNum==2){
			        var ret = twsdevice.fingerprint.DBCacheCompareFinger(that.getHdbHandle(),_figer.fdata[1],_data);
			        if(ret<70){
			        	_tip="第三次指纹和第二次指纹不一致，请重新采集！";
			        }else{
			        	
						_figer.fdata[2]=_data;
						_figer.fimage[2]=_image;
			        	
			        	var ret=twsdevice.fingerprint.DBCacheMergeTemplate(that.getHdbHandle(),_figer.fdata[0],_figer.fdata[1],_figer.fdata[2]);
			            if(ret.status==1){
			            	_figer.mdata=ret.data;
			            	result.finger=_figer;
							_tip="成功采集指纹...";	
			            }else{
			            	result.finger=null;
			            	_tip="无法合并指纹,请重新采集...";	
			            }
			        }					
				}
			}

			if(that.getHdbCurOpt()==2){
				
		        var ret = twsdevice.fingerprint.DBCacheFindByTemplate(that.getHdbHandle(),_data);
		        if(ret.status==1){
		        	result.person=PersonFingers[ret.fid-1];
		        	//_tip="指纹检索成功，fid="+ret.fid+", score="+ret.score+",personId="+result.person.personId+",personKey="+result.person.personKey;
		        	_tip="指纹检索成功";
		        }else{
		        	result.person=null;
		        	_tip="没有检索到指纹";
		        }
		        
			}
			
		}else  if (state == 30) {
			that.setHdbState(2);
			_tip='设备已关闭';
		}else if(state == -10){
			that.setHdbState(2);
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
		
		that.setHdbData(_data);
		that.setHdbImage(_image);		
		that.setHdbTip(_tip);
		that.dolayout();
		
		result.state=state;
		result.data=_data;
		result.image=_image;
		result.tip=_tip;
		
		
		if(that.onstatechange && $.isFunction(that.onstatechange)){
			that.onstatechange(result);
		}
		
  };
  
  //方法绑定
  //参数：对象实例
  //返回值：无
  var _bind = function(that){
	$(window).on("unload", function(e) {
		_DBCacheFree(that);
		if(that.getHdbState()==1){
			twsdevice.fingerprint.close();
		}
	});
  };
  //私有方法，外面将访问不到
  //创建指纹库
  //参数：对象实例
  //返回值：无
  var _DBCacheCreate=function(that){
	  var result=1;
	  
      if(that.getHdbHandle()==0){
          var ret = twsdevice.fingerprint.DBCacheCreate();
          if(ret.status==1){
        	  that.setHdbHandle(ret.dbHandle);
        	  _TransMsg(this,"创建指纹库成功！");
          }else{
        	  result=0;
        	  _TransMsg(this,"创建指纹库失败！");
          }
      }
      return result;
  };
  //释放指纹库
  //参数：对象实例
  //返回值：无
  var _DBCacheFree=function(that){
	  var result=1;
	  
      if(that.getHdbHandle()!=0){
	      try{
	    	  twsdevice.fingerprint.DBCacheFree();
	    	  that.setHdbHandle(0);
	    	  _TransMsg(this,"释放指纹库成功！");
	      }catch(e){
	    	  result=0;
	    	  _TransMsg(this,"关闭指纹库失败！");
	      }
      }  
      
      return result;
  };
  
  //清除状态信息
  //参数：无
  //返回值：无  
  var _InitFinger = function(thisObj) {
	  
	  if(thisObj.getHdbState()!=1){
		  twsdevice.fingerprint.open(thisObj,_fingerprintCallback); 
	  }
	  
	  if(thisObj.getHdbHandle()==0){
		  _DBCacheCreate(thisObj);
	  }
	
	  thisObj.setHdbData("");
	  thisObj.setHdbTip("");
	  thisObj.setHdbImage("");
	  
  };  
  
  
  //注册指纹
  //参数：无
  //返回值：无  
  var _DBCacheAdd = function(thisObj,_personId,_personValue) {

	  if(thisObj.getHdbHandle()==0){
		  _DBCacheCreate(thisObj);
	  }
	
	  //console.log(thisObj.getHdbHandle()+"||"+_personId+"||"+_personValue);
	  
	  var ret=twsdevice.fingerprint.DBCacheAdd(thisObj.getHdbHandle(),_personId,_personValue);
	  
      if(ret!=0){
    	  
    	  thisObj.setHdbTip("无法注册指纹，失败码="+ret);
		  thisObj.dolayout();
		  
		  throw "无法注册指纹，失败码="+ret;
      }
      
      return ret;
  };  
  
  
  //指纹验证初始化
  //参数：无
  //返回值：无  
  var _InitDBCache = function(thisObj) {
	  
	  thisObj.setDbCacheState(1);
	  
	  var curPersonCount=PersonFingers.length;
	  
	  if(curPersonCount<=0){
		  
		var _url=thisObj.dataUrl;
		if(_url==""){
			  return;
		}
		var _param=thisObj.param||{};
		  
		$.ajax({
			cache: false,
			type: "get",
			url:_url, 
			data:_param,
			async: true,
			error: function(request) {
				thisObj.setDbCacheState(3);
				_TransMsg(this,"发送请求失败,请检查网络连接！");
			},
			success: function(data) {
				var result=unescape(data);
				
				thisObj.setDbCacheState(1);
				
				try{
					var persons=result.split("\r\n");
					
					var curPersonKey;
					var curPersonValue;
					var curPersonFNum;
					var curCount=0;
					
					for(var index=0;index<persons.length;index++){
						var singlePersons=persons[index].split("`");
						if(singlePersons.length>=2){
							
							curPersonKey=singlePersons[0];
							
							for(var sindex=1;sindex<singlePersons.length;sindex++){
								var singlePerson=singlePersons[sindex];
								var personData=singlePerson.split("~");
								if(personData.length==3){
									
									curPersonFNum=personData[0];
									curPersonValue=personData[2];
									curCount=curCount+1;

									PersonFingers.push(new Person(curCount,curPersonKey,curPersonFNum,curPersonValue));
									
									_DBCacheAdd(thisObj,curCount,curPersonValue);
									
								}
							}						
						}
					}		
					
					thisObj.setDbCacheState(2);
					thisObj.setHdbTip("初始化指纹库完成...");
					thisObj.dolayout();
					 
					_TransMsg(this,"初始化指纹库完成...");
					
				}catch(e){
					thisObj.setDbCacheState(3);
					thisObj.setHdbTip("初始化指纹库出错..."+e);
					thisObj.dolayout();
					
					_TransMsg(this,"初始化指纹库出错..."+e);
				}
			}
		 });		  
	  }
  };
  
  
  //回传消息
  var _TransMsg = function(thisObj,_tip) {
		var result={};
		result.tip=_tip;
		if(thisObj.onstatechange && $.isFunction(thisObj.onstatechange)){
			thisObj.onstatechange(result);
		}
  };  
  
  //构造方法
  //参数：参数对象
  var FingerPrintFun = function(config){
	  //系统调试状态
	  this._hdDebug=false;
	  
	  config=config||{};
	  
	  for(var _obj in config){
		this[_obj]=config[_obj];
	  }

	  //指纹库状态
	  var _hdbHandle=0;
	  this.setHdbHandle=function(obj){
		  _hdbHandle=obj;
	  };
	  this.getHdbHandle=function(){
		  return _hdbHandle;
	  }
	  
	  //设备状态值 
	  var _hdbState=0;	   // 0：未初始化，1:设备打开，2.设备关闭，3.设备崩溃 4.未知错误
	  this.setHdbState=function(obj){
		  _hdbState=obj;
	  };
	  this.getHdbState=function(){
		  return _hdbState;
	  }	
	  
	  //指纹确认状态
	  var _dbCacheState=0;//0：未初始化,1：正在初始化,2：初始化完成,3:未知错误
	  this.setDbCacheState=function(obj){
		  _dbCacheState=obj;
	  };	  
	  this.getDbCacheState=function(){
		  return _dbCacheState;
	  };
	  
	  //指纹数据
	  var _hdbData="";	  
	  this.setHdbData=function(obj){
		  _hdbData=obj;
	  };
	  this.getHdbData=function(){
		  return _hdbData;
	  };
	  //指纹图片
	  var _hdbImage="";	  
	  this.setHdbImage=function(obj){
		  _hdbImage=obj;
	  };
	  this.getHdbImage=function(){
		  return _hdbImage;
	  }	  
	  //提示信息
	  var _hdbTip="";	  
	  this.setHdbTip=function(obj){
		  _hdbTip=obj;
	  };
	  this.getHdbTip=function(){
		  return _hdbTip;
	  };	
	  //当前操作
	  var _hdbCurOpt=0;//0：无操作; 1:指纹采集；2:指纹确认；
	  this.setHdbCurOpt=function(obj){
		  _hdbCurOpt=obj;
	  };	  
	  this.getHdbCurOpt=function(){
		  return _hdbCurOpt;
	  }		  
	  
	  var _finger=new Finger();  
	  this.getFinger=function(){
		  return _finger;
	  }		  	  
	  
	  try{
		  if(!twsdevice){
			  _TransMsg(this,"找不到指纹控件！");
			  this.disable=true;
		  }else{
			  this.disable=false;
		  }
	  }catch(e){
		  _TransMsg(this,"找不到指纹控件！");
		  this.disable=true;
	  }
	  
	  //初始化指纹库
	  if(this.initdbcache){
		  _InitDBCache(this);
	  }

	  //事件绑定
	  _bind(this);
  }
  
  //原型方法：打开指纹
  //参数：无
  //返回值：无
  FingerPrintFun.prototype.openfinger = function() {
	  if(this.disable){
		  _TransMsg(this,"找不到指纹控件！");
		  return;
	  }
	  _InitFinger(this);
  };
  //原型方法：关闭指纹
  //参数：无
  //返回值：无  
  FingerPrintFun.prototype.closefinger = function() {
	  if(this.disable){
		  _TransMsg(this,"找不到指纹控件！");
		  return;
	  }
	  if(this.getHdbState()==1){
		  twsdevice.fingerprint.close();
	  }
	  _DBCacheFree(this);
  };
  
  //原型方法：重新初始化指纹库
  //参数：无
  //返回值：无  
  FingerPrintFun.prototype.reInitDBCache = function() {
	  
	  this.setDbCacheState(1);
	  
	  PersonFingers=new Array();
	  
	  _InitDBCache(this);
	  
  };  
  
  //原型方法：指纹确认
  //参数：无
  //返回值：无  
  FingerPrintFun.prototype.checkfinger = function() {
	  
	  if(this.disable){
		  _TransMsg(this,"找不到指纹控件！");
		  return;
	  }
	  
	  this.setHdbCurOpt(2);
	  
	  this.setHdbTip("开始指纹验证...");
	  this.dolayout();	
	  
	  _TransMsg(this,"开始指纹验证...");
  };  
  
  //原型方法：采集指纹
  //参数：无
  //返回值：无  
  FingerPrintFun.prototype.registfinger = function() {

	  if(this.disable){
		  _TransMsg(this,"找不到指纹控件！");
		  return;
	  }
	  
	  this.setHdbCurOpt(1);
	  
	  var _figer=this.getFinger();
	  
	  _figer.fdata=new Array();
	  _figer.fimage=new Array();
	  _figer.mdata="";

	  this.setHdbTip("开始第1次采集指纹...");
	  this.dolayout();

	  _TransMsg(this,"开始第1次采集指纹...");
  };  
  
  //原型方法：页面渲染
  //参数：无
  //返回值：无   
  FingerPrintFun.prototype.render = function() {
	  var thisObj=this;	  
	  
	  if(thisObj.renderto && thisObj._hdDebug){

		  var html='';
		  
		  html+='<div style="width: 50%;" id="'+thisObj.renderto+'_state">empty</div>';
		  html+='<div>指纹图像:<img  id="'+thisObj.renderto+'_image"/></div>';
		  html+='<div>指纹数据:<div style="width: 100%; word-wrap:break-word" id="'+thisObj.renderto+'_data"></div></div>';
		  html+='';
		  html+='';
		  
		  $("#"+thisObj.renderto).html(html);		  
	  }
	  
  };
  //原型方法：页面重新渲染
  //参数：无
  //返回值：无    
  FingerPrintFun.prototype.dolayout = function() {
	  var thisObj=this;	  
	  
	  if(thisObj.renderto && thisObj._hdDebug){
	      $('#'+thisObj.renderto+'_state').text(thisObj.getHdbTip());
	      $('#'+thisObj.renderto+'_data').text(thisObj.getHdbData());
	      if(thisObj.getHdbImage() && thisObj.getHdbImage()!=""){
	    	  $('#'+thisObj.renderto+'_image').attr('src','data:image/jpeg;base64,'+thisObj.getHdbImage());		  
	      }else{
	    	  $('#'+thisObj.renderto+'_image').attr('src','');	
	      }
	  }
	  
  };
  

  //返回构造函数
  return FingerPrintFun;

})();
