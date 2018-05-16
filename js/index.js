var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);    //每月天数
var today = "";    //今日对象
var year = "";      //当前显示的年份
var month = "";    //当前显示的月份


var thisdate = "" ;  //实际时间
var userid = "" ;
//今日对象
function Today(str) {
	str = str.replace(/-/g,"/");
    this.now = new Date(str);
    this.year = this.now.getFullYear();
    this.month =this.now.getMonth();
    this.day = parseInt(Appendzero(this.now.getDate()));
    
}

function Appendzero(obj){
	 if(obj<10)
		 return "0" +""+ obj;
	 else 
		 return obj;
}


//根据当前年月填充每日单元格
function fillBox(detail) {
	updateDateInfo();                   //更新年月提示
    $("td.calBox").empty();             //清空每日单元格

    var dayCounter = 1;                 //设置天数计数器并初始化为1
    var cal = new Date(year, month, 1); //以当前年月第一天为参数创建日期对象
    var startDay = cal.getDay();        //计算填充开始位置
    //计算填充结束位置
    var endDay = startDay + getDays(cal.getMonth(), cal.getFullYear()) - 1;

    //如果显示的是今日所在月份的日程，设置day变量为今日日期
    var day = -1;
    if (today.year == year && today.month == month) {
        day = today.day;
    }

    //从startDay开始到endDay结束，在每日单元格内填入日期信息
    for (var i=startDay; i<=endDay; i++) {
    	var id=year + "-" +  Appendzero(parseInt(month) + 1) + "-" +  Appendzero(dayCounter);
        if (dayCounter==day) {
            $("#calBox" + i).html("<div class='date today' id='" + id + "' onclick='editTask(\""+id+"\")'>" + dayCounter + "</div>");
        } else {
			$("#calBox" + i).html("<div class='date' id='" + id + "' onclick='editTask(\""+id+"\")'>" + dayCounter + "</div>");
        }
        dayCounter++;
    }
    getTasks(detail);                         //从服务器获取任务信息
    mselected() ; //选中月份
    
}

//从服务器获取任务信息
function getTasks(detail) {
	
	var yearMonth='';
	if ((parseInt(month)+1)<10){
		yearMonth=year + "-0" + (parseInt(month) + 1);
	}else{
		yearMonth=year + "-" + (parseInt(month) + 1);
	}
    Ext.Ajax.request({
		method:'POST',
		url:MATECH_SYSTEM_WEB_ROOT+'clander.do?method=getSchedule&yearMonth='+yearMonth+'&userId='+userid,
		success:function (response,options) {
			var json = response.responseText ;
			var jsons = json.split("`") ;
			if(jsons.length==5){
				$("#uname").html(jsons[1]) ;
				if(jsons[2]!="")
					$("#uphone").html("手机-"+jsons[2]) ;
				else if(jsons[3]!="")
					$("#uphone").html("电话-"+jsons[3]) ;
				else if(jsons[4]!="")
					$("#uphone").html("email-"+jsons[4]) ;
				else
					$("#uphone").html("暂无联系方式") ;
			}
			jsons[0] = jsons[0].replace(/\n/g, '123n321');
			jsons[0] = jsons[0].replace(/\r/g, '123r321');
			var jsonObj = eval(jsons[0]);
			var dd=new Date(thisdate);
			var today=dd.format("Y-m-d");
			dd.setDate(dd.getDate()-1);
			var yestoday=dd.format("Y-m-d");
			for(var i=0;i<jsonObj.length;i++) { 
					//taskReport
					//按简略模式显示--首页用
					if(jsonObj[i].workmemo >''){
						jsonObj[i].workmemo=jsonObj[i].workmemo.replace(/123n321/g,'\n');
						jsonObj[i].workmemo=jsonObj[i].workmemo.replace(/123r321/g,'\r');
						//写了工作日志,用蓝色标记
						buildTask(jsonObj[i].workdate,"taskReport",jsonObj[i].hj,"日志："+jsonObj[i].workmemo.substring(0,35)+"...","日志："+jsonObj[i].workmemo);
					}else if(jsonObj[i].numunids >''){
						//没写工作日志,用红色标记
						buildTask(jsonObj[i].workdate,"taskSchedule",jsonObj[i].hj,"&nbsp;","工单："+jsonObj[i].numunids);
					}else{
						buildTask(jsonObj[i].workdate,"taskBlank","","&nbsp;","当前无工单");
					}
				
			}
			findsign() ;
		},
		failure:function (response,options) {
			return false ;
		}
	});
    
}

//阻止冒泡的方法
function stopPP(e){
     var evt = e|| window.event;
     //IE用cancelBubble=true来阻止而FF下需要用stopPropagation方法
     evt.stopPropagation ?evt.stopPropagation() : (evt.cancelBubble=true);
}

function loginOrOut(workdate,logtype){
	/*var dd = new Date(thisdate);
	var today=dd.format("Y-m-d");*/
	if(userid==""){
		if (confirm('每天只能做一次签到和签退，是否继续？')){
			Ext.Ajax.request({
				method:'POST',
				url:MATECH_SYSTEM_WEB_ROOT+'clander.do?method=loginOrOut&workdate='+workdate+'&logtype='+logtype+'&userId='+userid,
				success:function (response,options) {
					var result = response.responseText ;
					
					//报告结果
					alert(result);
					signre(workdate) ;
					//更新界面
					fillBox('detail');
						
				},
				failure:function (response,options) {
					return false ;
				}
			});
			
		}
	}else{
		alert("只有本人才能签到和签退哦！") ;
	}
	return false;
}
function findsign(){
	var yearMonth='';
	if ((parseInt(month)+1)<10){
		yearMonth=year + "-0" + (parseInt(month) + 1);
	}else{
		yearMonth=year + "-" + (parseInt(month) + 1);
	}
	Ext.Ajax.request({
		method:'POST',
		url:MATECH_SYSTEM_WEB_ROOT+'clander.do?method=getTimesLogin&yearMonth='+yearMonth+'&userId='+userid,
		success:function (response,options) {
			var json = response.responseText ;
			
			var jsonObj = eval(json);
		var dd = new Date(thisdate);
			var today=dd.format("Y-m-d");
			

			
			for(var i=0;i<jsonObj.length;i++) { 
				if(jsonObj[i].workdate<=today){
					if(jsonObj[i].workdate==today){
						if(jsonObj[i].userid=='')
							$("#" + jsonObj[i].workdate).parent().append("<div class='nosign' onclick='loginOrOut("+today+",1);' title='没有签到'>未签到,点击签到</div>");
						else
							if(jsonObj[i].logtype.indexOf("签到")>=0)
								$("#" + jsonObj[i].workdate).parent().append("<div class='hassign' onclick='loginOrOut("+today+",0);' title='已经签到'>已签到,点击签退</div>");
							else
								$("#" + jsonObj[i].workdate).parent().append("<div class='hassign' title='已经签退'>您今天已经签退</div>");	
						break ;
					}
					if(jsonObj[i].userid==''){
						//没有签到
						$("#" + jsonObj[i].workdate).parent().append("<div class='nosign'  title='没有签到'>未签到</div>");
					}else{
						//已经签到
						$("#" + jsonObj[i].workdate).parent().append("<div class='hassign'  title='已经签到'>已签到</div>");
					}
				}
			}
		},
		failure:function (response,options) {
			return false ;
		}
	});
}
//根据日期、任务编号、任务内容在页面上创建任务节点
function buildTask(buildDate, className, num, taskInfo,title) {

	if(num!=""&&num>0){
		num="工单："+num+";" ;
	}
	
	
	title=title.replace(/123n321/g,'\n');
	title=title.replace(/123r321/g,'\r');
	if(taskInfo)
    $("#" + buildDate).parent().append("<div class='"+className+"' onMouseover='buttonOver();' onMouseOut='buttonOut();' workdate='"+buildDate+"' title='"+title+"' onclick='editTask(\""+buildDate+"\")'>" +num+"\n"+ taskInfo + "</div>");
	
}

//判断是否闰年返回每月天数
function getDays(month, year) {
    if (1 == month) {
        if (((0 == year % 4) && (0 != (year % 100))) || (0 == year % 400)) {
            return 29;
        } else {
            return 28;
        }
    } else {
        return daysInMonth[month];
    }
}

//显示上月日程
function prevMonth(detail) {
    if ((month - 1) < 0) {
        month = 11;
        year--;
    } else {
        month--;
    }
    fillBox(detail);              //填充每日单元格
}

//显示下月日程
function nextMonth(detail) {
    if((month + 1) > 11) {
        month = 0;
        year++;
    } else {
        month++;
    }
    fillBox(detail);              //填充每日单元格
}

//显示本月日程
function thisMonth(detail) {
    year = today.year;
    month = today.month;
    fillBox(detail);              //填充每日单元格
}

//更新年月提示
function updateDateInfo() {
    $("#dateInfo").html(year + "年" + (parseInt(month) + 1) + "月");
}

//打开编辑任务box
function editTask(workdate) {
//    $("#taskId").val(src.id.substr(4));             //对任务编号隐藏域赋值
//    $("#editTaskInfo").val(src.innerHTML);          //设置编辑内容
//    var left = getLeft(src) + 15;                   //设置左边距
//    var top = getTop(src) + 15;                     //设置顶边距
//    $("#editBox").left(left).top(top).slideDown();  //显示编辑任务box
	queryWinFun(workdate);
	//$("#editBox").left(left).top(top).slideDown();  //显示编辑任务box
	
	/*
	if(src.workdate == "" || src.workdate == null){
		parent.openTab("mySchedule","行程表","schedule/list.jsp?method=10000509&matechSpilt=true");
	}else{
		parent.openTab("mySchedule","行程表","schedule/list.jsp?method=10000509&matechSpilt=true");
	}
	*/
}



//更新任务信息
function updateTask() {
    var taskId = $("#taskId").val();                //任务编号
    var taskInfo = $("#editTaskInfo").val();        //任务内容
    //检查任务信息是否为空
    if ($.trim(taskInfo)=="") {
        alert("请输入任务信息。");
    } else {
        $.post("calendar.jsp",                      //服务器页面地址
            {
                action: "updateTask",               //action参数
                taskId: taskId,                     //年月参数
                taskInfo: taskInfo                  //任务信息参数
            },
            function() {                            //回调函数
                $("#task" + taskId).html(taskInfo); //更新页面任务内容
                closeEditBox();                     //关闭编辑box
            }
        );
    }
}

//关闭编辑box
function closeEditBox() {
    $("#editBox").slideUp();
}

function buttonOver(){
 var obj = window.event.srcElement;
 obj.style.backgroundColor = "orange";
}

 

function buttonOut(){
 var obj = window.event.srcElement;
 window.setTimeout(function(){
	 obj.style.backgroundColor = "";
 },100);
}





