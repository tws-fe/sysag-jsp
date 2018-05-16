Ext.namespace("Ext.matech");

matech.Calendar=new Object();
//上一个月
matech.Calendar.goPrevMonth=function (){
	var obj=Ext.getCmp("matechCalendar");
	obj.objDate =  new Date(obj.objYear,obj.objMonth-1,1);
	obj.objYear = obj.objDate.getFullYear();
	obj.objMonth = obj.objDate.getMonth();
	obj.objDay = obj.objDate.getDate();
	
	obj.makeCalendar();
};
//下一个月
matech.Calendar.goNextMonth=function(){
	var obj=Ext.getCmp("matechCalendar");
	obj.objDate =  new Date(obj.objYear,obj.objMonth+1,1);
	obj.objYear = obj.objDate.getFullYear();
	obj.objMonth = obj.objDate.getMonth();
	obj.objDay = obj.objDate.getDate();
	obj.makeCalendar();
	
};
//年度月度下拉框 
matech.Calendar.selChange=function(){
	var obj=Ext.getCmp("matechCalendar");
	obj.objDate = new Date($("#matech_div_calendar_head_innerselyear").val(),parseInt($("#matech_div_calendar_head_innerselmonth").val())-1,1);
	obj.objYear = obj.objDate.getFullYear();
	obj.objMonth = obj.objDate.getMonth();
	obj.objDay = obj.objDate.getDate();
	obj.makeCalendar();
};
matech.Calendar.chickToday=function(_id){
	Ext.getCmp("matechCalendar").chickToday();
};

Ext.matech.Calendar = Ext.extend(Ext.Window,{
	id : 'matechCalendar',
	width : 260,
	height : 260,
	modal : true,
	autoScroll:false,
	closeAction : 'hide',
	contentEl : 'matech_div_calendar',
	curDate:null,
	curYear:null,
	curMonth:null,
	curDay:null,
	objDate:null,
    objYear:null,
    objMonth:null,
	objDay:null,
	objVal:null,
	objTable:null,
	objTableValues:null,
	objTarget:"",
	objTriger:"",
	startYear:2012,
	maxYearNum:3,
	format:"Y-m-d",
	minValue:null,
	maxValue:null,
	
	
	getDateArray:function(_value){
		var result=new Array();
		if(!_value || _value==""){
			return result;
		}
		
		if(_value.indexOf("-")>0){
			result=_value.replace('年','').replace('月','');
			result=result.split('-');
		}else if(_value.indexOf("/")>0){
			result=_value.replace('年','').replace('月','');
			result=result.split('/');
		}else{
			result=_value.replace('年','-').replace('月','-');
			result=result.split('-');			
		}

		return result;
	},
	formatDate:function(_value){
		var self=this;
		if(!_value || _value==""){
			return "";
		}
		
		var t=self.getDateArray(_value);
	    var Year = t[0];
	    var Month =t[1];
	    var Day=t[2];

	    var result=self.format.replace('Y',Year).replace('m',Month).replace('d',Day);
	    
		return result;
	},
	setObjDate:function(_value){
		var self=this;
		
		if(!_value || _value==""){
			return;
		}

		var t=self.getDateArray(_value);
	    var Year = parseInt(t[0]);
	    var Month = parseInt(t[1]);
	    var Day= parseInt(t[2]);
	    if(isNaN(Year)){
	    	Year=self.curYear;
	    }
	    if(isNaN(Month)){
	    	Month=self.curMonth;
	    }
	    if(isNaN(Day)){
	    	Day=self.curDay;
	    }
	    
		self.objDate=new Date(Year,Month-1,Day);
		self.objYear=self.objDate.getFullYear();
		self.objMonth=self.objDate.getMonth();
		self.objDay=self.objDate.getDate();
		self.objVal=self.objDate.getDate();	
		
	},
	initComponent : function() {
		var self=this;
		
		if(!$("#matech_div_calendar").val()){
			var calHtml='<div id="matech_div_calendar" style="height:800px;width:100%;display:none;">'+
						'	<table id="matech_div_calendar_table" class="matech_cal_td_style" width="100%" border="0" cellpadding="0" cellspacing="3">'+
						'	<tr>'+
						'		<td>'+
						'			<table width="100%" height="22px" border="0" cellpadding="2" cellspacing="0">'+
						'		        <tr>'+
						'		            <td onClick="matech.Calendar.goPrevMonth();" width="22" align="center" title="前一个月"><img src="'+MATECH_SYSTEM_WEB_ROOT+'/images/prev_month.gif"></td>'+
						'		            <td class="matech_cal_td_style" align="center">'+
						'		                <div id="matech_div_calendar_head_yearmonth"></div>'+
						'		            </td>'+
						'		            <td onClick="matech.Calendar.goNextMonth();" width="22" align="center" title="后一个月"><img src="'+MATECH_SYSTEM_WEB_ROOT+'/images/next_month.gif"></td>'+
						'		        </tr>'+
						'		    </table>'+
						'		</td>'+
						'	</tr>'+
						'	<tr>'+
						'		<td>'+
						'		    <table width="100%" border="0" cellspacing="0" cellpadding="2" style="font-size:14px" >'+
						'		        <tr align="center">'+
						'		            <td class="matech_cal_td_style" style="color:red">日</td><td class="matech_cal_td_style">一</td><td class="matech_cal_td_style">二</td><td class="matech_cal_td_style">三</td><td class="matech_cal_td_style">四</td><td class="matech_cal_td_style">五</td><td class="matech_cal_td_style" style="color:red">六</td>'+
						'		        </tr>'+
						'		    </table>'+
						'		</td>'+
						'	<tr>'+
						'		<td>'+
						'			<div id="matech_div_calendar_body_day" style="height:400px;width:100%;font-size:14px;cursor:hand;padding:0;">'+
						'			</div>'+
						'		</td>'+
						'	</tr>'+
						'	</table>'+
						'	<input id="curYearMonth" name="curYearMonth" type="hidden">'+
						'</div>';
			
			Ext.DomHelper.append(Ext.getBody(),calHtml,true);		
			
		}

		self.curDate=new Date();
		self.curYear = self.curDate.getFullYear();
		self.curMonth = self.curDate.getMonth()+1;
		self.curDay = self.curDate.getDate();
		self.objDate=self.curDate;
		self.objYear=self.objDate.getFullYear();
		self.objMonth=self.objDate.getMonth();
		self.objDay=self.objDate.getDate();
		self.objVal=self.objDate.getDate();
		self.objTableValues=new Array();
		
		Ext.matech.Calendar.superclass.initComponent.call(self);
	},
	show:function(){
		var self=this;

		self.setObjDate($("#"+self.objTarget).val());
		
		$("#matech_div_calendar").css("display","");
				
		self.makeCalendar();
		
		Ext.matech.Calendar.superclass.show.call(self);
	},
	makeCalendar:function(year,month){
		var self=this;
		var index;
		var topDate = document.getElementById('matech_div_calendar_head_yearmonth');
		if(self.objTable){
			document.getElementById('matech_div_calendar_body_day').removeChild(self.objTable);	
		}
		
		if(!year){
			year=self.objYear;
		}
		if(!month){
			month=self.objMonth;
		}
		
		
		$("#curYearMonth").val(year+'年'+(month+1)+'月');
		
		var _htmlMonthSelect="<select id='matech_div_calendar_head_innerselmonth' class='matech_cal_head_style' onchange='matech.Calendar.selChange();'>";
		for(index=1;index<=12;index++){
			if((self.objMonth+1)==index){
				_htmlMonthSelect=_htmlMonthSelect+"<option value='"+index+"' selected>"+index+"月</option>";	
			}else{
				_htmlMonthSelect=_htmlMonthSelect+"<option value='"+index+"'>"+index+"月</option>";	
			}
			
		}
		_htmlMonthSelect=_htmlMonthSelect+"</select>";	
					
		var _htmlYearSelect="<select id='matech_div_calendar_head_innerselyear' class='matech_cal_head_style' onchange='matech.Calendar.selChange();'>";
		for(index=(self.curYear+self.maxYearNum);index>=self.startYear;index--){
			if(self.objYear==index){
				_htmlYearSelect=_htmlYearSelect+"<option value='"+index+"' selected>"+index+"年</option>";	
			}else{
				_htmlYearSelect=_htmlYearSelect+"<option value='"+index+"'>"+index+"年</option>";	
			}
		}
		
		_htmlYearSelect=_htmlYearSelect+"</select>";	
		
		
		topDate.innerHTML="<span id='curSelYear'>"+_htmlYearSelect+"</span><span id='curSelMonth'>"+_htmlMonthSelect+"</span>";
		
		var arr = new Array();
		var firstDay = new Date(year,month,1).getDay();
		var lastDate = new Date(year,month+1,0).getDate();
		
		var sum = 1;
		for(var i=0;i<42;i++){
			if(i<firstDay || sum>lastDate){
				arr[i] = '';
			}else{
				arr[i] = sum++;
			}
		}
		
		self.drawCalenda(arr);	
		
		var obj=document.getElementById(self.objTriger);
		
		var x = obj.offsetLeft;
		var y = obj.offsetTop;
		while(obj = obj.offsetParent){
		    x += obj.offsetLeft;
		    y += obj.offsetTop;
		}
		
		if(x && x>0 && y && y>0){
			var wHeigh=$(window).height();
			if(wHeigh && wHeigh<(y+self.height)){
				self.setPosition(x,wHeigh-self.height);
			}else{
				self.setPosition(x,y);
			}
		}
	},
	drawCalenda:function(arr){

		var self=this;
		
		var ind = 0;
		var k = 1;
		var div = document.getElementById('matech_div_calendar_body_day');
		self.objTable = self.createTable();
		var tbody=self.createTbody();
		var sum = 0;
		
		var yearMonth = $("#curYearMonth").val();
		yearMonthInt = parseInt(yearMonth);
		yearMonth = yearMonth.substring(yearMonth.indexOf("年")+1, yearMonth.length-3);

		var t=$("#curYearMonth").val();
		
		var selValue=$("#"+self.objTarget).val();

		var tValue=self.getDateArray(selValue);
	    var selYear = parseInt(tValue[0]);
	    var selMonth = parseInt(tValue[1]);
	    var selDay= parseInt(tValue[2]);
	    if(isNaN(selYear)){
	    	selYear=self.curYear;
	    }
	    if(isNaN(selMonth)){
	    	selMonth=self.curMonth;
	    }
	    if(isNaN(selDay)){
	    	selDay=self.curDay;
	    }

		for(var i = 0;i<6;i++){
			var tr = self.createTr();
			for(var j = 0;j<7;j++){
				var td = self.createTd();
				self.objTableValues[ind++]=td;
				var value = arr[sum++];
				sumDate=value;

				if(value!=''){
					td.id=self.getFormatDate(t,k);
					k++;
									
					td.onclick=matech.Calendar.chickToday;
					//td.onmouseover = moveTo;
					//td.onmouseout = outTo;
					td.className="matech_cal_td_style";
					
					
					if(self.minValue &&  Ext.isDate(self.minValue)){
						if(yearMonthInt<parseInt(self.minValue.getFullYear())){
							td.onclick=null;
							td.className='matech_cal_td_enable';
						}else if(yearMonthInt==parseInt(self.minValue.getFullYear())){
							if(yearMonth<(parseInt(self.minValue.getMonth())+1)){
								td.onclick=null;
								td.className='matech_cal_td_enable';
							}else if(yearMonth==(parseInt(self.minValue.getMonth())+1)){
								if(value<parseInt(self.minValue.getDate())){
									td.onclick=null;
									td.className='matech_cal_td_enable';									
								}
							}
						}
					}
					
					
					if(self.maxValue &&  Ext.isDate(self.maxValue)){
						if(yearMonthInt>parseInt(self.maxValue.getFullYear())){
							td.onclick=null;
							td.className='matech_cal_td_enable';
						}else if(yearMonthInt==parseInt(self.maxValue.getFullYear())){
							if(yearMonth>(parseInt(self.maxValue.getMonth())+1)){
								td.onclick=null;
								td.className='matech_cal_td_enable';
							}else if(yearMonth==(parseInt(self.maxValue.getMonth())+1)){
								if(value>parseInt(self.maxValue.getDate())){
									td.onclick=null;
									td.className='matech_cal_td_enable';									
								}
							}
						}
					}
					
					if(self.curYear==yearMonthInt && self.curMonth==yearMonth && self.curDay==value){
						td.className='matech_cal_td_today';
					}
					if(selYear==yearMonthInt && selMonth==yearMonth && selDay==value){
						td.className='matech_cal_td_select';
					}					
				}
				td.innerHTML=value;
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		
		self.objTable.appendChild(tbody);
		div.appendChild(self.objTable);
		
	},
	chickToday:function (){
		var self=this;

		for(var i=0;i<self.objTableValues.length;i++){
			var o = self.objTableValues[i];				
			if(self.curYear==self.objYear && self.curMonth==(self.objMonth+1) && o.innerHTML && self.curDay==parseInt(o.innerHTML)){
				o.className='matech_cal_td_today';
			}else{
				o.className="matech_cal_td_style";
			}
		}

		var target = window.event.srcElement;
		self.objVal = target.innerHTML;

		var yue=self.objMonth+1;
		if(yue<10){
			yue="0"+yue;
			
		}
		
		var ri=self.objVal;
		if(ri<10){
			ri="0"+ri;
		}
		
		var timeFlag=self.objYear+"-"+yue+"-"+ri;

		document.getElementById(timeFlag).className="matech_cal_td_select";
				
		$("#"+self.objTarget).val(self.formatDate(timeFlag));
		
		self.hide();
	},
	getFormatDate:function (time,k){
		var self=this;
		
		var t=self.getDateArray(time);
	    var Year = parseInt(t[0]);
	    var Month = parseInt(t[1]);
	    var Day =k;
	    var CurrentDate = "";
	    CurrentDate += Year;
	    if (Month >= 10 ){
	     CurrentDate +="-"+Month;
	    }else{
	     CurrentDate += "-0" + Month;
	    }
	    if (Day >= 10 ){
	     CurrentDate += "-"+Day ;
	    }else{
	     CurrentDate += "-0" + Day ;
	    }
	    
	    return CurrentDate;
	 },
	 createTable:function (){
		var table = document.createElement('table');
		table.width='100%';
		table.border='0px';
		table.cellspacing='0px';
		table.cellpadding='0px';
		return table;
	},
	createTr:function (){
		var tr = document.createElement('tr');
		tr.align="center";
		tr.style.height="25px";
		return tr;
	},
	createTd:function (){
		var td = document.createElement('td');
		td.align="center";
		td.style.size='14px';
		td.className='matech_cal_td_style';
		return td;
	},
	createTbody:function (){
		var tbody = document.createElement("tbody");
		return tbody;
	},
	getAbsPoint:function (){
		self=this;
		var obj=document.getElementById(selWin.objTriger);
		
		var x = obj.offsetLeft;
		var y = obj.offsetTop;
		while(obj = obj.offsetParent){
		    x += obj.offsetLeft;
		    y += obj.offsetTop;
		}
		return {"x": x, "y": y};
	}
});

Ext.matech.DateField = Ext.extend(Ext.form.DateField,{
	dateWin:null,

	initComponent : function() {
		var self=this;
		Ext.matech.DateField.superclass.initComponent.call(self);
	},
	onTriggerClick:function(){
		var self=this;
        if(self.dateWin){
            if(self.disabled){
                return;
            }
            self.onFocus();
            self.dateWin.minValue=self.minValue;
            self.dateWin.maxValue=self.maxValue;

            self.dateWin.format=self.format;
            self.dateWin.objTriger=self.el.dom.id,
            self.dateWin.objTarget=self.el.dom.id,
            self.dateWin.show();      	
        }else{
        	Ext.matech.DateField.superclass.onTriggerClick.call(self);
        }
	}
});

