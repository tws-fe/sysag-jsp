<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<%
	String peoplenumber = StringTools.checkNull(UTILSysProperty.getProp("排班人数"));
	request.setAttribute("number","1".equals(peoplenumber)?false:true);
%>
<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<title>分组排班</title>
	
	<style type="text/css">

	
	
	

	
</style>
	
</head>
<body>
<%-- @html --%>
<%--工具栏 --%>
<div id="div-toolbar"></div>



<%--排班表 --%>

<form id="form-timetable" method="post">
	<div id="div-header" class="xm-font">值班表</div>
	<div id="div-table" style="overflow: auto; text-align: center; margin:0 auto; ">
			
	
	</div>

</form>



<%--修改每格的彈出窗口 --%>
<div id="window_updatecell" class="x-hidden">
	<div id="panel_window_updatecell">
		<table style=" width : 100%; height: 100% ">
			<tr style="height: 26px">
				<td>馀下成员</td><td>值班成员</td>
			</tr>
			<tr>
				<td>
					<div style="overflow-y: auto; height: 175px;">
						<ul id="groupmember_rest" class="groupmember" ></ul>
					</div>
				</td>
				<td>
					<div style="overflow-y: auto; height: 175px;">
						<ul id="groupmember_selected" class="groupmember" style="color : #668CB3;"></ul>
					</div>
				</td>
			</tr>
			<tr>
				<td colspan="2"> 搜寻  <input type="text" id="search_name" style="width: 300px"/></td>
			</tr>
		</table>
	</div>
</div>





<script type="text/javascript">
	    var number = ${number};
		// 用戶 id, 登入名, 显示名
		var me = {
			userId : '${userSession.userId}',			
			userLoginId : '${userSession.userLoginId}',  
			userName : '${userSession.userName}',		 
			groupid : new Array(),
			groupname : new Array(),
			group : new Object()
		};
		var mode = '${requestScope.mode}'; // 模式 [view|setup]
		var curYear = ${year};
		var curMonth = ${month};
		var viewType ='${viewType}';
		var form_shift_change_id = '${requestScope.form_shift_change_id}'; // 用來用来跳转到调班页面 (表单)
		var process_shift_change_pkey = '${requestScope.process_shift_change_pkey}'; // 用來用来跳转到调班页面 (流程)
		
		if (mode == 'view'){

			//if (!form_shift_change_id || !process_shift_change_pkey) 
			//	alert('无法获得调班申请流程 url');	
		}else{

		}
		
		var ExtControl = null;
		var Timetable = null;
		
		/*  页面加载时执行，执行加载排班表架构，以及加载该月排班讯息，还有初始化 Ext 组件 */
		Ext.onReady(function() {
			ExtControl = new _ExtControl(); // 初始化 Ext 组件
			Timetable = new _Timetable(); 
			Timetable.getScheduleFramework(true); // 加载排班表架构以及该月排班讯息
			
			window.onresize = function(){
				Ext.fly('div-table').setStyle("height", (document.body.clientHeight - 55) + "px");
			};
            initCombox(Ext.getCmp("i_year"));
			window.onresize();
		}); // Ext.onReady(function(){...})

		/* ========================================= @Timetable ================================================ */
		/* 
			Timetable 负责对排班表各种的操作，包括加载丶保存丶自动更成等 
				getScheduleFramework() 加载排班架构及訊息
				generateSchedule() 生成排班表
				updateSchdule() 保存排班表
				clearSchduler() 清除
		*/
		function _Timetable() {

			var data;
			this.getData = function() { return data; };
			var shiftgroup;
			var workdays;
			var users, groups, names;
			this.getUsers = function() {return users; };
			this.getUser = function(id) { return users[id]; };
			this.getGroups = function() {return groups; };
			this.getMembers = function(id) { return groups[id]; };
			this.getNames = function() {return names; };
			this.getName = function(id) { return names[id]; };
			var today, daycount, firstday;
			
			var sche, sequenceinfo;
			this.getSche = function(){return sche;};

			var hasChange = false;
			this.setChanged = function(_hasChange) {
				var msg;
				if (_hasChange){
					hasChange = true;	
				} else {
					hasChange = false;
				}
				if ("setup" == mode){
					msg = hasChange ? ' [ 未保存 ] ' : ''; 	
					Ext.get('span-save').dom.innerHTML = msg;
				}
			};
			this.isChanged = function() { return hasChange; };

			
			var weekday = [ '日', '一', '二', '三', '四', '五', '六', '日' ];
			var chinese_num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
			var monthname = [ '', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ];

			function checkException(responseMap){
				if (responseMap && responseMap.exception){
					alert('异常 : ' + responseMap.exception);
					return true;
				}
				return false;
			}; // var checkException(responseMap)
			
			function onFailure(){
				alert('连接服务器异常，请尝试重新刷新页面或检查连接');
			} ;

			// 得到排班表架构讯息
			this.getScheduleFramework = function(_loadSchedule) {
				Ext.Ajax.request({
					method : 'POST',
					params : {
						year : curYear,
						month : curMonth,
						viewType :viewType
					},
					url : MATECH_SYSTEM_WEB_ROOT + 'scheduling.do?method=getScheduleFramework',
					success : function(response, options) {
						data = Ext.util.JSON.decode(response.responseText);
						if (checkException(data)) return;
						shiftgroup = data.shiftgroup;
						workdays = data.workdays;
						today = data.today;
						firstday = data.firstday;
						daycount = data.daycount;
						if (!workdays || workdays.length == 0){
							workdays = new Array(daycount);
							for(var i = 0; i < daycount; i++){
								workdays[i] = { workdate : curYear + '-' + (curMonth < 10 ? '0' + curMonth : curMonth) + '-' + (i + 1 < 10 ? "0" + (i + 1) : (i + 1))};
								workdays[i].type = (firstday + i + 1) % 7 == 0 || (firstday + i) % 7 == 0 ? 1 : 0;
							}
							data.workdays = workdays;
							alert('数据库缺少 ' + curYear + ' 年 ' + curMonth + ' 月的节假日数据');
						}
						
						users = new Array();   // 构建用户ID与名字对应，方便之後的页面操作
						groups = new Object(); // 创建分组 ID 与组员 ID 对应，分便之後更新操作
						names = new Object();  // 班次与分组名字对应
						for(var row = 0; row < shiftgroup.length; row++){
							var userids = shiftgroup[row].teamgroupmemberid.split(",");
							var usernames = shiftgroup[row].teamgroupmember.split(",");
							groups[shiftgroup[row].groupid] = userids;
							names[shiftgroup[row].groupid] = shiftgroup[row].groupname;
							names[shiftgroup[row].shiftid] = shiftgroup[row].shiftname;
							for(var i = 0; i < userids.length; i++){
								users[userids[i]] = usernames[i];
								if (userids[i] == me.userId){ // 查找登入用戶对应的分组
									me.groupid.push(shiftgroup[row].groupid);
									me.groupname.push(shiftgroup[row].groupname);
									me.group[shiftgroup[row].groupid] = shiftgroup[row].groupname;
								}
							}
						}
						
						// 生成架构
						Timetable.renderScheduleFramework("vertical");
						if (false != _loadSchedule) {
							Timetable.loadSchedule(); // 加载数据
						}
					},
					failure : onFailure
				});
			}; // getScheduleFramework(_month)
			
			
			this.select_cell; // 当前格子
			this.prev_select_cell; // 上次选的格子
			/* 格子单击事件 */
			this.cell_onclick = function(cellid) { // 用了 call 改变 this = Timetable
				this.select_cell = Ext.get(cellid);
				if (!this.select_cell) return;
				if ("view" == mode){
					this.select_cell.toggleClass('cellSelected'); // TODO
				} else if ("setup" == mode){
					this.select_cell.addClass('cellSelected');
					if (this.prev_select_cell && this.prev_select_cell != this.select_cell) {
						this.prev_select_cell.removeClass('cellSelected');	
					}	
				}
				this.prev_select_cell = this.select_cell;
			}; // cell_onclick(cellid)

			/* 格子双击事件 */
			this.cell_ondblclick = function(cellid) {
				if ("setup" == mode){
					if (!Timetable.allowModify())
						return;
					var today = Timetable.getData().today;
					if (curYear == today.year && curMonth == today.month){
						var curDate = cellid.split('_')[2];
						var curDay = curDate.split('-')[2] * 1.0;
						if (curDay < today.day_of_month){
							alert('不能修改当前日期之前的值班记录，当前日期为 ' + today.year + '-' + today.month + '-' + today.day_of_month);
							return;
						}
					}
					ExtControl.show_window_updatecell.call(ExtControl, cellid, null, null); // 用了 call 改变 this = ExtControl
				}
			}; // cell_ondblclick(row, day)
			
			/* 计算该班次内有多少分组 */
			function count_groups_in_shift(shiftid){
				var count = 0;
				for(var i = 0; i < shiftgroup.length; i++){
					if (shiftgroup[i].shiftid == shiftid) count++;					
				}
				return count;
			} // count_groups_in_shift(shiftid)
			
			/* 生成排班表架构，vertical 是按周垂直， horizontal 是水平整月 */
			this.renderScheduleFramework = function(type){
				Ext.fly("div-table").dom.innerHTML = "";
				if (type == undefined || type == "vertical"){
					Timetable.renderVertical();
				} else {
					// TODO
				}
			}; // this.renderScheduleFramework(type)
			
			
			/* 是按周垂直生成排班表架构 */
			this.renderVertical = function(){
				var weekcount = Math.floor((daycount + firstday - 1) / 7); // 周数
				weekcount = (daycount + firstday - 1) % 7 == 0 ? weekcount : weekcount + 1;
				var iweek, irow, icol, fday;
				var tr, td, _id, _html, _cls, _onclick, _ondblclick,ttd,ttr;
				var _shiftgroup, shiftid, groupid, day;
				var thismonth = curYear == today.year && curMonth == today.month;
				shiftid = '';
				fday = firstday == 1 ? 0 : -firstday + 1; // 本周第一日的日数，根据本月第一日是星期几来定
				table = {
						id : 'timetable',
						tag : 'table',
						cellspacing : 0,
						cellpadding : 0,
						children : [ /*{id : 'thead' ,tag : 'thead'},*/{ id : 'tbody', tag : 'tbody'} ]
					};
				if (Ext.isChrome) table.align = 'center';			
				
				Ext.DomHelper.append('div-table', table);
				/*
				ttd = { tag :'td',colspan : 10,html : '值班表', cls : 'xm-font'};				
				ttr = { tag : 'tr',children : ttd };
				Ext.DomHelper.append('thead', ttr);
				*/
				var html="";
				if(viewType=='1'){
					html = '机房环境'
				}else if(viewType ==2){
					html = '交易系统';
				}

				jQuery('#div-header').html(html+'值班表 (' + curYear + ' 年 ' + curMonth + ' 月)');
				for(iweek = 0; iweek < weekcount; iweek++){
					for(irow = 0; irow < shiftgroup.length + 3; irow++){
						td = new Array(); _html = '&nbsp;';
						switch(irow){
						case 0:
							shiftid = '';
						case 1:
							_html = irow == 0 ? curYear : monthname[curMonth];
							td.push({ tag : 'td', colspan : 3, html : _html, cls : 'table-header corner'}); //第 1 行是日数，第 2 行是星期几
							break;
						case 2:
							_html = '第' + chinese_num[iweek + 1] + '周';
							td.push({ tag : 'td', rowspan : shiftgroup.length + 1, html : _html, cls : 'table-header week'}); // 第 3 行是周数
							break;
						default:
							// 第 1 列是周数，第 2 列是班次，第 3 列是分组，其馀是值班名字
							_shiftgroup = shiftgroup[irow - 3]; // 班次与分组讯息
							if (shiftid != _shiftgroup.shiftid){ // 计算班次的跨行数
								shiftid = _shiftgroup.shiftid;
								_html = '<div>' + _shiftgroup.shiftname + '</div><div style="font-size:9px">' + _shiftgroup.starttime + '-' + _shiftgroup.endtime + '</div>';
								td.push({ tag : 'td', id : _shiftgroup.shiftid, rowspan : count_groups_in_shift(shiftid), cls : 'table-header shift', html : _html });	
							}
							groupid = _shiftgroup.groupid;
							_cls = me.group[groupid] ? 'us-group' : 'others-group';
							_html = "<div class='" + _cls + "'>" + _shiftgroup.groupname + "</div>"; 
							td.push({ tag : 'td', id : _shiftgroup.groupid , html : _html, cls : 'table-header group' });
							break;
						}
						if (irow != 2) {
							for(iday = 1; iday <= 7; iday++){
								day = fday + iday;
								_id = ''; _html = '&nbsp;'; _cls = 'xm-td'; _onclick = ''; _ondblclick = '';
								if (day >= 1 && day <= daycount){
									switch(irow){
									case 0: 
									case 1:
										_html = irow == 0 ? day : weekday[iday];
										_cls = 'table-header weekday';
										switch(workdays[day - 1].type * 1){
										case 1: _cls = _cls + ' holiday'; break;
										case 2: _cls = _cls + ' festival'; break;
										}
										if (thismonth && day == today.day_of_month) _cls = _cls + ' today';
										break;
									default:
										_id = shiftid + '_' + groupid + '_' + workdays[day - 1].workdate;
										if ("setup" == mode || ("view" == mode && me.group[groupid])){
											_onclick = "Timetable.cell_onclick.call(Timetable, '" + _id + "')";	
										}
										_ondblclick = "Timetable.cell_ondblclick.call(Timetable, '" + _id + "')";										
										break;
									}
								} else {
									_cls = day <= 0 ? 'blank-negative' : 'blank-positive';
								} 								
								td.push({ tag : 'td', id : _id, html : _html, cls : _cls, onclick : _onclick, ondblclick : _ondblclick}); // 值班格子
							} // iday
						}


                        tr = { tag : 'tr', children : td }; // 行
						Ext.DomHelper.append('tbody', tr); // 用 Ext 加入行到 tbody 中
					} // irow					
					fday = fday + 7; // 本周第一日的日数 + 7
				} // iweek
                tdfooter = new Array();
                tdfooter.push({ tag : 'td', colspan : 10, html : '',style:'height:20px;border:0'}); //第 1 行是日数，第 2 行是星期几

                tr = { tag : 'tr', children : tdfooter }; // 行
                Ext.DomHelper.append('tbody', tr); // 用 Ext 加入行到 tbody 中
				Ext.select('.corner').setStyle({
					borderWidth: "2px",
					borderTop: "none",
					borderBottom: "none",
					backgroundColor: 'rgb(237,237,237)'
				});
				Ext.select(".blank-negative").setStyle({
					borderLeft: "none",
					borderRight: "none",
					backgroundColor: 'rgb(249,249,249)'
				});
				Ext.select(".blank-positive").setStyle({
					border: "none"
				});
				Ext.select('.today').setStyle({
					backgroundColor: 'rgb(254,195,117)',
					color: 'rgb(118,118,116)'
				});
				Ext.select('.xm-td').setStyle({
					backgroundColor: 'rgb(249,249,249)'
					//color: 'rgb(118,118,116)'
				});
				if ('setup' == mode){
					var td_group = Ext.query('.group');
					if (!td_group) return;
					for(var i = 0; i < td_group.length; i++){
						td_group[i].ondblclick = (function(groupid){
							return function(){
								UpdateSeq.show.call(UpdateSeq, 'ajax', '', false, groupid);
							};
						})(td_group[i].id);
					}
					Ext.fly('span-hint').dom.innerHTML = '双击单格改变值班, 双击组名改变排班顺序';
				}
			}; // this.renderVertical()

			
			/* 自动排班请求，返回一个二维数组 */
			this.generateSchedule = function(option) {
				if (!Timetable.allowModify()){
					return;
				}
				
				Ext.Ajax.request({
					method : 'POST',
					params : {
						year : curYear,
						month : curMonth,
						policy : option ? option.policy : '',
						viewType:viewType
					},
					url : MATECH_SYSTEM_WEB_ROOT + 'scheduling.do?method=generateSchedule',
					success : function(response, options) {
						alert("生成成功！");
						if ("setup" == mode){
							ExtControl.confirm_save(Timetable.getScheduleFramework, '刷新之前');	
						} else {
							Timetable.getScheduleFramework();
						}
						/*
						var responseMap = Ext.util.JSON.decode(response.responseText);
						if (checkException(responseMap)) return;
						sche = new Array();
						sequenceinfo = responseMap.sequenceinfo;
						var startday = responseMap.startday;
						var _sche = responseMap.schedule;
						if (_sche.length != shiftgroup.length) window.location.reload(true);
						var _onduty;
						for(var row = 0; row < _sche.length; row++){
							for(var day = startday - 1; day < daycount; day++){
								_onduty = _sche[row][day];
								if (!_onduty) continue;
								sche.push({
									shiftid : shiftgroup[row].shiftid,
									groupid : shiftgroup[row].groupid,
									workday	: workdays[day].workdate,
									onduty  : _onduty,
									userids : _onduty.join(",")
								});
							}
						}
						Timetable.setChanged(true);
						Timetable.clearSchedule(startday);
						Timetable.renderSchedule(startday);*/
					},
					failure : onFailure
				});
			}; // generateSchedule()

			/* 加载当月排班讯息 */	
			this.loadSchedule = function() {
				Ext.Ajax.request({
					method : 'POST',
					params : {
						year : curYear,
						month : curMonth
					},
					url : MATECH_SYSTEM_WEB_ROOT + 'scheduling.do?method=loadSchedule',
					success : function(response, options) {
						var responseMap = Ext.util.JSON.decode(response.responseText);
						if (checkException(responseMap)) return;
						sche = responseMap.schedule;
						for(var row = 0; row < sche.length; row++){
							if (sche[row].userids) {
								sche[row].onduty = sche[row].userids.split(",");
								var ondutynames = sche[row].usernames.split(",");
								for(var n = 0; n < sche[row].onduty.length; n++){
									users[sche[row].onduty[n]] = ondutynames[n];
								}
							}
						}
						Timetable.renderSchedule();
						Timetable.setChanged(false);
					},
					failure : onFailure
				});
			}; // loadSchedule()

			/* 将排班讯息 (生成或加载) 渲染到排班表架构中 */
			this.renderSchedule = function(startday) {				
				var i, onduty, iuser; 
				var td_id, td, html;
				startday = !startday ? 1 : startday;
				for(i = 0; i < sche.length; i++){
					td_id = sche[i].shiftid + "_" + sche[i].groupid + "_" + sche[i].workday;
					td = Ext.fly(td_id);
					if (!td) {
						continue;
					}
					td = td.dom;
					html = 
						"&nbsp;<input type='hidden' name='ids' value='" + td_id + "'/>" +
						"<input type='hidden' name='userids' value='" + sche[i].userids + "'/>";
					onduty = sche[i].onduty;
					if (!onduty) continue;
					var name, cls;
					for(iuser = 0; iuser < onduty.length; iuser++){
						name = users[onduty[iuser]];
						cls = me.group[sche[i].groupid] ? 'us' : 'others';
						cls = name == me.userName ? cls + ' me' : cls; // 当前用户名变红加粗
						html = html + "<div class='" + cls + "'>" + name + "</div>";
					}
					td.innerHTML = html; 
				}
				// Ext.select('#timetable div[innerHTML=' + me.userName +']').setStyle({color : 'rgb(255,128,128)', fontWeight : bold}); 
			}; // renderScheduleData(state)

			
			/* 更新 (保存) 排班讯息, 先清除整月再插入，可以加状态值来代表需要不需要更新，来做到部份更新 */
			this.updateSchedule = function() {
				if (!Timetable.allowModify())
					return;
				var ids = Ext.query('input[name=ids]');
				var userids = Ext.query('input[name=userids]');
				if (!ids || !userids){
					alert('页面讯息错误，请重新刷新页面');
					return;
				}
				var targetYear = curYear;
				var targetMonth = curMonth;
				var ids_str = ids[0] ? ids[0].value : '';
				var userids_str = userids[0] ? userids[0].value : '';
				for(var i = 1; i < ids.length; i++){
					ids_str = ids_str + "@" + ids[i].value;
					userids_str = userids_str + "@" + userids[i].value;
					if(i==ids.length-1){
						if(userids[i].value==""){
							userids_str+=" ";
						}
					}
				}				
				Ext.Ajax.request({
					method : 'POST',
					params : {
						year : curYear,
						month : curMonth,
						ids : ids_str,
						userids : userids_str,
						sequenceinfo : sequenceinfo,
                        viewType:viewType

					},
					url : MATECH_SYSTEM_WEB_ROOT + 'scheduling.do?method=updateSchedule',
					success : function(response, options) {
						var responseMap = Ext.util.JSON.decode(response.responseText);
						if (checkException(responseMap)) return;
						Timetable.setChanged(false);
						var day = Timetable.presentYearMonth();
		            	day = day == 0 ? 1 : day;
		            	var yearmonth = curYear + " 年 " + curMonth + " 月 " + day + " 日 ";
						Ext.MessageBox.alert('已保存', '已保存自 ' + yearmonth + ' 的修改');
					},
					failure : onFailure
				});
			}; // updateSchedule()

			
			/* 清除该月排班讯息，需保存才生效 */
			this.clearSchedule = function(startday) {
				startday = startday ? startday : 1;
				if (curYear == data.today.year && curMonth == data.today.month){ // 若为当前月，只能清当前日及之後的排班
					startday = data.today.day_of_month;
				}
				var i, iday, id;
				for (i = 0; i < shiftgroup.length; i++) {
					for (iday = startday - 1; iday < daycount; iday++) {
						id = shiftgroup[i].shiftid + "_" + shiftgroup[i].groupid + "_" + workdays[iday].workdate;
						Ext.fly(id).dom.innerHTML = "&nbsp;";
					}
				}
				Timetable.setChanged(true);
			}; // this.clearSchedule()
			
			this.allowModify = function(){
				var data = Timetable.getData();
				if (curYear >= data.today.year && curMonth >= data.today.month){
					return true;
				}
				if(curYear > data.today.year){
				    return true;
				}
				alert('不能修改当前月之前的排班记录');
				return false;
			}

			/* 更新一格 */
			this.updateCell = function(cellid, userids) {
				var userid;
				var tdHtml = "&nbsp;";
				var onduty = new Array();
				var users = this.getUsers();
				var name, cls;
				for (var i = 0; i < userids.length; i++) {
					userid = userids[i];
					name = users[userid];
					cls = name == me.userName ? 'me' : '';
					tdHtml += "<div class='" + cls + "'>" + name + "</div>";
				}
				tdHtml += "<input type='hidden' name='ids' value='" + cellid + "'/>" +
						 "<input type='hidden' name='userids' value='" + userids.join(",") + "'/>&nbsp;";
				Timetable.setChanged(true);
				Ext.get(cellid).dom.innerHTML = tdHtml;
			}; // updateCell(groupmember_selected)
			
			this.presentYearMonth = function(){
				var data = Timetable.getData();
				if (data.today.year == curYear && data.today.month == curMonth){
					return data.today.day_of_month;
				} else {
					return 0;
				}
			};

			return this;
		}// _Timetable()

		
		/* ========================================= @ExtControl ================================================ */
		/*
			ExtControl 负责控制各个 Ext 控件
      			window_updatecell 为双击时弹出的更新格子窗口
      			toolbar 为工具栏
      			confirm_save() 弹出确认保存对话框
		*/
		// TODO
		function _ExtControl(){
			
			/* 小图标地址 */
			//var img_menu_plain = "${pageContext.request.contextPath}/img/menu/plain/";
			var img_menu_plain = contextPath + btn_img_url ;
			// 工具栏按钮，初始只有月份切换，根据是查询模式还是设译模式来追加按钮
			this.toolbar_items = [{ //@toolbar_items 
	            text : '上月',
	            cl	 : 'x-btn-text-icon',
	            icon : img_menu_plain + "left.png",
	            handler: function(){
	            	ExtControl.to_prev_month = ExtControl.to_prev_month || function(){ // 为 ExtControl 添加该方法
	            		var month = curMonth - 1;
		            	if (month < 1){
		            		month = 12;
		            		curYear = curYear - 1;
		            	}
		            	curMonth = month;
			           	Timetable.getScheduleFramework();
		            };
		            ExtControl.confirm_save(ExtControl.to_prev_month, null , null , "view" == mode); // 如果模式是 view, 不弹出对話框	            	
				}
	      	},'-', {
	            text : '当月',
	            cls  : 'x-btn-text-icon',
	            icon : img_menu_plain + "home.png",
	            handler : function(){
	            	ExtControl.to_this_month = ExtControl.to_this_month || function(){
	            		var year = Timetable.getData().today.year;
			           	var month = Timetable.getData().today.month;
			           	curYear = year;
			           	curMonth = month;	
			           	Timetable.getScheduleFramework();
		            };
		            ExtControl.confirm_save(ExtControl.to_this_month, null , null , "view" == mode); // 如果模式是 view, 不弹出对話框	
				}
	      	},'-', {
	            text : '下月',
	            cls  : 'x-btn-text-icon',
	            icon : img_menu_plain + "right.png",
	            handler:function(){
	            	ExtControl.to_next_month = ExtControl.to_next_month || function(){
	            		var month = curMonth + 1;
		            	if (month > 12){
		            		month = 1;
		            		curYear = curYear + 1;
		            	} 
		            	curMonth = month;
		            	Timetable.getScheduleFramework();	
	            	};
	            	ExtControl.confirm_save(ExtControl.to_next_month, null , null , "view" == mode); // 如果模式是 view, 不弹出对話框
				}
	      	}, '-' , {
	      		text : '刷新',
	      		cls	 : 'x-btn-text-icon',
				icon : img_menu_plain + "refresh.png", 
				handler:function(){
					if ("setup" == mode){
						ExtControl.confirm_save(Timetable.getScheduleFramework, '刷新之前');	
					} else {
						Timetable.getScheduleFramework();
					}
				}
			}, '-']; 
			
			if ("setup" == mode){ //@toolbar_items setup
				this.toolbar_items = this.toolbar_items.concat([{
					text:'保存',
		            cls:'x-btn-text-icon',
		            icon: img_menu_plain + "save.png",
		            handler:function(){
		            	if (!Timetable.allowModify()){
		            		return;
		            	}
		            	if (Timetable.isChanged()){
		            		Timetable.updateSchedule();
		            	}
					}
				}, '-', {
					text : '生成',
		            cls  : 'x-btn-text-icon',
		            icon : img_menu_plain + "4square.png",
		            handler:function(){
		            	ExtControl.confirm_save(Timetable.generateSchedule, '生成之前');            	
					}
				}, '-', {
					text : '清空',
		            cls  : 'x-btn-text-icon',
		            icon : img_menu_plain + "clear.png",
		            handler:function(){
		            	if (!Timetable.allowModify()){
		            		return;
		            	}
		            	var day = Timetable.presentYearMonth();
		            	day = day == 0 ? 1 : day;
		            	var yearmonth = curYear + " 年 " + curMonth + " 月 " + day + " 日 ";
		            	
		            	Ext.MessageBox.confirm("确认","是否清空自 " + yearmonth + " 的內容? ",function(button,text){
		            		if (button == "yes"){
		            			ExtControl.confirm_save(Timetable.clearSchedule, '清空之前');
		            		}
		        		});
					}
				}, '-', {
					text : '更改排班顺序',
		            cls  : 'x-btn-text-icon',
		            icon : img_menu_plain + "wheel.png",
		            handler:function(){
		            	UpdateSeq.show('ajax', '', false);
					}
				}, '-',
				'<span id="span-save" style=" font-size: 12px; color: #668CB3"></span>'
		      	]);
			} else if ("view" == mode){ // @toolbar_items mode

			} else {
				alert('查询模式异常，请尝试刷新页面或重新登入');
			}
			
			// @toolbar_items default
			this.toolbar_items = this.toolbar_items.concat([
				'<span id="span-msg" style=" font-size: 12px; color: #668CB3"></span>',
				'->',
				'<span id="span-hint"></span>',
		      	'<span id="span-weekday" class="weekday borderize">工作日</span>',   
		      	'<span id="span-today" class="today borderize">今天</span>',
		      	'<span id="span-holiday" class="holiday borderize">六日</span>',
		      	'<span id="span-festival" class="festival borderize">节日</span>'
			]);
			
	
			
			
			/* 工具栏 */
			this.toolbar = new Ext.Toolbar({
				renderTo:'div-toolbar',
		        items: this.toolbar_items
			}); // this.toolbar = new Ext.ToolBar({...})
			
			/* 弹出确认保存对话框 */
			this.confirm_save = function (operation, _msg, operation_args, run_anyway){
				if (run_anyway || Timetable.isChanged() == false){
					operation_args = operation_args || [];
					operation.apply(this, operation_args);
					return;
				}
				var day = Timetable.presentYearMonth();
            	day = day == 0 ? 1 : day;
            	var yearmonth = curYear + " 年 " + curMonth + " 月 " + day + " 日 ";
				_msg = _msg ? _msg + ", " : '';
				Ext.Msg.show({
					title : '确认保存修改',
					msg : _msg + '您想要保存自 ' + yearmonth + ' 的修改吗?',
					buttons : Ext.Msg.YESNOCANCEL,
					icon : Ext.MessageBox.QUESTION,
					fn : function(button) {
						if (button == "cancel") {
							return;
						}
						if (button == "yes") {
							Timetable.updateSchedule();
						}
						operation_args = operation_args || [];
						operation.apply(this, operation_args);
					}
				}); // Ext.Msg/Sh
			}; // this.confirm_save(operation, arg);

			/* 更改格子的窗口 */
			this.window_updatecell = new Ext.Window({
				contentEl : 'window_updatecell',
				layout : 'fit',
				width : 350,
				height : 325,
				style : 'opacity: 0.9; filter: alpha(opacity= 90);',
				closeAction : 'hide',
				modal : true,
				plain : true,
				resizable : false,
				buttonAlign : 'center',
				defaultButton : 0,
				buttons : [ {
					text : '确定',
					handler : function() {
						var li = ExtControl.groupmember_selected;
						var userids = new Array();
						for(var i = 0; i < li.length; i++){
							if (li[i]) userids.push(li[i].value);
						}
						Timetable.updateCell.call(Timetable, ExtControl.window_updatecell.cellid, userids);
						ExtControl.window_updatecell.hide();
					}
				}, {
					text : '取消',
					handler : function() {
						ExtControl.window_updatecell.hide();
					}
				} ]
			});
			
		
			this.groupmember_selected = null;   // 值班
			this.groupmember_rest = null;		// 不值班
			
			var search_name = document.getElementById('search_name');
			var search_name_input_callback = function(){
				var value = search_name.value.trim();
				var rest = jQuery('#groupmember_rest li');
				if (value.length == 0){
					for(var i = 0; i < rest.length; i++){					
						rest[i].style.display = '';
					}
					return;				
				}								
				for(var i = 0; i < rest.length; i++){
					var li = rest[i]; 
					if (li.innerHTML.indexOf(value) < 0){
						li.style.display = 'none';


					} else {
						li.style.display = '';
                        li.style.cursor='pointer';
					}
				}
				// console.log(value);
			};
			if (window.navigator.userAgent.indexOf('MSIE') >= 0 || !search_name.addEventListener){
				search_name.onpropertychange = search_name_input_callback;
			} else {
				search_name.addEventListener('input', search_name_input_callback);
			}
			
			
			/* 显示值班与不值班人员的窗口 */
			this.show_window_updatecell = function(cellid, x, y) {
				
				var ids = cellid.split("_");
				var shiftid = ids[0];
				var groupid = ids[1];
				var workday = ids[2];
				
				var groupmembers = Timetable.getMembers(groupid);
				var users = Timetable.getUsers();
				var names = Timetable.getNames();
				
				var onduty = Ext.query('#' + cellid + ' input[name=userids]');
				onduty = onduty.length == 0 ? onduty : onduty[0].value.split(",");
				
				this.groupmember_selected = new Array();
				this.groupmember_rest = new Array();

				var i, j;
				for (i = 0; i < onduty.length; i++) {
					if (onduty[i] == "") continue;
					onduty[i] = onduty[i] * 1;
					this.groupmember_selected.push({ tag : 'li', value : onduty[i], html : users[onduty[i]], onclick : 'ExtControl.groupmember_select_onclick.call(ExtControl, 1, this)',style:'cursor:pointer;'});
				}
				

				var validMember;
				for (i = 0; i < groupmembers.length; i++) {
					validMember = true;
					groupmembers[i] = groupmembers[i] * 1;
					for (j = 0; j < onduty.length; j++) {
						if (onduty[j] == groupmembers[i]) {
							validMember = false;
							break;
						}
					}
					if (validMember) {
						this.groupmember_rest.push({ tag : 'li', value : groupmembers[i], html : users[groupmembers[i]], onclick : 'ExtControl.groupmember_select_onclick.call(ExtControl, 0, this)',style:'cursor:pointer;'});
					}
				}
				groupmember_select_render.call(ExtControl);
				if (x && y){
					var point = ExtControl.in_the_browser(x, y, this.window_updatecell.width, this.window_updatecell.height);
					x = point.x;
					y = point.y;
				}
				this.window_updatecell.setTitle(Timetable.getName(shiftid) + " . " + Timetable.getName(groupid) + " . " + workday);
				this.window_updatecell.cellid = cellid;
				this.window_updatecell.show();
				// TODO
			};
			
			// 显示两边的人员 (值班与不值班)
			function groupmember_select_render() {
				Ext.fly("groupmember_rest").dom.innerHTML = "";
				Ext.fly("groupmember_selected").dom.innerHTML = "";
				Ext.DomHelper.append("groupmember_rest", this.groupmember_rest);
				Ext.DomHelper.append("groupmember_selected", this.groupmember_selected);
				
				search_name_input_callback();
			};
			
			// 点击一下换到另一边
			this.groupmember_select_onclick = function(group, element) {
				var value = element.value;
				if (!value || value == "") 
					return;
				value = value * 1;
				var popi = null;
				var select = null;
				if (group == 0){
				    if(!number) {
                        if (this.groupmember_selected.length > 0) {
                            select = clearUser(this.groupmember_selected);
                            select.onclick = 'ExtControl.groupmember_select_onclick.call(ExtControl, 0, this)';
                            this.groupmember_rest.push(select);
                        }
                    }
					popi = groupmember_select_pick(value, this.groupmember_rest);
					popi.onclick = 'ExtControl.groupmember_select_onclick.call(ExtControl, 1, this)';
					this.groupmember_selected.push(popi);

				} else {

					popi = groupmember_select_pick(value, this.groupmember_selected);
					popi.onclick = 'ExtControl.groupmember_select_onclick.call(ExtControl, 0, this)';
					this.groupmember_rest.push(popi);
				}
				groupmember_select_render.call(ExtControl);
			};

			// 选出被点击的人员
			function groupmember_select_pick(value, item) {
				var i;
				var target = null;
				for (i = 0; i < item.length; i++) {
					if (!item[i])
						continue;
					if (item[i].value == value) {
						target = item[i];
						item[i] = null;
						return target;
					}
				}
				return null;
			}; // groupmember_select_pick(value, item)

			function clearUser(item) {

                    var i;
                    var target = null;
                    for (i = 0; i < item.length; i++) {
                        if (!item[i])
                            continue;
                        if (item[i]) {
                            target = item[i];
                            item[i] = null;
                            return target;


                        }
                    }
                    return target;




            }


			this.in_the_browser = function(x, y, width, height){
				var browserX = document.body.clientWidth;
				var browserY = document.body.clientHeight;
				x = x + width > browserX ? browserX - width : x;
				x = x + width > browserX ? browserX - width : x;
				return {
					x : x,
					y : y
				};
			};
			return this;
		}; // _ExtControl()

</script>

<%--修改班组顺序的窗口 jstl c if --%>
 <c:if test="${requestScope.mode == 'setup'}">
	<div id="div-change_group_sequence.jsp">
		<%@ include file="change_group_sequence.jsp"%>
	</div>
</c:if>


</body>
</html>