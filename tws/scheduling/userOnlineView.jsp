<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/Views/Sys_INCLUDE/include.jsp" %>
<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<title>部门排班人员状态一览</title>
	
	<style type="text/css">

	

	
	
	.table {
		width: 99%;
	}
	
	.table td {
		border-color: rgb(224,224,224);
		border-width: 1px;
		border-style: solid;
		padding-top: 2px;
		padding-bottom: 2px;
		vertical-align: center;
		text-align: center;
	}
	
	.table td div{
		padding-bottom: 1px;
		cursor : pointer;
	}

	
	
	ul {
		text-align: center;
	}
	
	li {
		cursor: pointer;
		text-align: center;
		padding-top: 2px;
		font-size: 14px;
	}
	

	
	

	.mine {background-color: rgb(255,165,0); color: rgb(0,0,0); font-size: 13px; }
	

	/* .weekday{ background-color: rgb(196, 24, 144); color: white; font-size: 13px;}
	.today { background-color: orange; color: white;  font-size: 13px;}
	.holiday { background-color: rgb(196, 196, 196); color: white; font-size: 13px; } */
	.festival { background-color: rgb(255, 32, 32);	color: white; font-size: 13px;}
	
	.holiday-genra { background-color: rgb(251, 251, 251); }
	.festival-genra { background-color: rgb(255, 245, 245); }
	.today-genra {background-color: rgb(255, 255, 200); }
	
	.clicked {background-color: rgb(255, 165, 0); };
	

	.cell-white {
		background-color: white;
	}

	
	


	.floating {
		font-size : 28px;
		position: absolute;
		top : -1024px;
		left : -1024px;	
		background-color: rgb(255, 255, 255);
		opacity: 0.93;
		border-color: black;
		border-width: 3px;
		border-style: solid;
		padding: 6px;
		vertical-align: center;
		text-align: center;
	}
	
	.piece { font-size : 10px; font-color : rgb(32, 32, 32); }
	
	.location { color: rgb(96, 96, 96); }

	.on-duty {
		background-color: rgb(80, 180, 180);
		color: rgb(48, 96, 96);
		font-size: 13px;
		
	}
	
	.on-leave {
		background-color: rgb(240, 240, 0);
		color:  rgb(96,96,0);
		font-size: 13px;
	}
	
	.on-vacation {
		background-color: rgb(255, 108, 108);
		color:  rgb(96,48,48);
		font-size: 13px;
	}
	
	.on-none {
		
	}
	
	.banished {
		display : none;
	}
	
</style>	
</head>

<body>

<%--工具栏 --%>
<div id="div-toolbar" ></div>


<%--表 --%>

<div id="div-year-month">

</div>


<div id="div-table" style="overflow: auto; text-align: center; margin:0 auto; ">
				
</div>




<%--修改每格的彈出窗口 --%>
<div id="div-floating" class="floating">
	hello world
</div>

<%-- --%>

<div id="div-window-of-day" style="display: none">
	
	<div style="overflow:auto; margin:0 auto; height: 130px; text-align: center; " class="banished">
	<table id="table-form-list" class="table banished" cellspacing="1" cellpadding="3" width="100%">
		<thead class="banished">
		<tr>
			<td class="table-header week">查看</td>
			<td class="table-header week">工单编号</td>
			<td class="table-header week">标题</td>
			<td class="table-header week">当前节点</td>
			<td class="table-header week">工单类型</td>    
		</tr>
		</thead>
		<tbody id="tbody-form-list" class="banished">
		</tbody>
	</table>
	</div>
	<br/>
	<div id="div-message-big" class="week banished" style="text-align: center; border-color: black; border-width: 1px; border-style: solid; padding: 2px;">工作日志</div>
	<div id="div-workmemo" class="banished">
		<textarea id='workmemo' name='workmemo' rows='6' cols='125'></textarea>
	</div>
	<div id="div-message" class="" style="text-align: center; border-color: black; border-width: 0px; border-style: solid; padding: 2px; color: rgb(64,128,196); font-weight: bold;">工作状态</div>
	<div>
		<span id='span-on-duty' style="display:inline">
			<input type='radio' name='status' value='在岗'> <span>在岗</span>
		</span>
		<span  style="display:inline">
			<input type='radio' name='status' value='请假'> <span>请假</span>
		</span>
		<span  style="display:inline">
			<input type='radio' name='status' value='外出'> <span>外出</span>
		</span>
		<span id='span-on-none'  style="display:inline">
			<input type='radio' name='status' value=''> <span>清空</span>
		</span>
	</div>
</div>


<script type="text/javascript">


/* ====================== Data ===================== */

var Data = {
	today : ${today},
	time : {
		year : ${year},
		month : ${month},
		year_cur : ${year},
		month_cur : ${month}
	},
	department : {
		id : '${departmentId}',
		json : ${departments},
		array : []
	},
	me : {
		userId : '${userSession.userId}',			
		userLoginId : '${userSession.userLoginId}',  
		userName : '${userSession.userName}',		
		userPopedom : '${userSession.userPopedom}',
		hasRightToView : false,
		hasRightToModify : false
	},
	rightOfView : ['资源管理','排班管理','人员状态一览','查看工作日志-按钮'],
	rightOfModify : ['资源管理','排班管理','人员状态一览','修改工作状态-按钮'],
	rightTree : null, 
	current : {
		user : null,
		day : null,
		date : null, 
		cell : null
	},
	previous : {
		cell : null
	}
};

for(var i = 0; i < Data.department.json.length; i++){
	var array = [];
	array.push(Data.department.json[i].autoid);
	array.push(Data.department.json[i].departname);
	Data.department.array.push(array);
}

Data.today.date = 
	Data.today.year + '-' + 
	(Data.today.month < 10 ? '0' + Data.today.month : Data.today.month) + '-' +
	(Data.today.day_of_month < 10 ? '0' + Data.today.day_of_month : Data.today.day_of_month);
Data.today.time = new Date();
Data.today.time.setYear(Data.today.year);
Data.today.time.setMonth(Data.today.month - 1);
Data.today.time.setDate(Data.today.day_of_month);

Data.department.simplestore = new Ext.data.SimpleStore({
	fields : ['autoid','departname'],
	data : Data.department.array
});

/* ====================== Doc ===================== */

var Doc = {
	floating : document.getElementById('div-floating'),
	floating_handle : null, 
	floating_timer : null, 
	current_query_cell_id : null
};

/* ====================== Enum ===================== */

var Enum = {
	weekday : [ '日', '一', '二', '三', '四', '五', '六', '日' ],
	chinese_num : ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
	monthname : [ '', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
	day_milli : 1000 * 60 * 60 * 24,
	status_map : {
		'在岗' : 'on-duty',
		'外出' : 'on-leave',
		'请假' : 'on-vacation',
		'' : 'on-none'
	}
};

/* ====================== Enum ===================== */
  
var Util = {
	intervalOfNow : function(year, month, day){
		var that_day = new Date();
		that_day.setYear(year);
		that_day.setMonth(month - 1);
		that_day.setDate(day);
		return Math.round((that_day.getTime() - Data.today.time.getTime()) / Enum.day_milli);
	}
};
 

/* ====================== Util ===================== */




</script>

<script type="text/javascript">
function UserRecord(record, index){
	this.id = record.id;
	this.name = record.name;
	this.loginid = record.loginid;
	this.groupname = record.groupname;
	this.days = new Array(Data.time.daycount + 1);
	this.index = index;
}



UserRecord.prototype.push = function(record){
	var workday = record.workday;
	if (!workday){
		return false;
	}
	var index = workday.split('-')[2] * 1.0;
	var day = this.days[index]; 
	if (!day){
		day = this.days[index] = [];
	}
	var new_record = true;
	if (!record.groupname){
		for(var i = 0; i < day.length; i++){
			if (!day[i].groupname){
				if (!day[0].record) day[0].record = record.record;
				if (!day[0].status) day[0].status = record.status;
				new_record = false;
				break;
			}	
		}
	} else {
		/*
		for(var i = 0; i < day.length; i++){
			if (!day[i].groupname){
				day[i].groupname = record.groupname;
				day[i].shiftname = record.shiftname;
				if (record.record) day[i].record = record.record;
				if (record.status) day[i].status = record.status;
				new_record = false;
				break;
			}
		}
		*/
	}
	if (new_record){
		day.push({
			shiftname : record.shiftname,
			groupname : record.groupname,
			record : record.record,
			status : record.status
		});	
	}
		
	return true;
};

UserRecord.prototype.render = function(icell){
	var cls, div;
	var td = [];
	var div_location, div_status;
	var cell_id = 'c-' + icell + '-';
	var isMe = this.id == Data.me.userId;

	cls = 'table-header ';
	cls =+ isMe ? 'mine' : 'name';
	td.push({ tag : 'td', id : 'user-' + this.id , html : this.name, cls : cls });
	for(var i = 1; i <= Data.time.daycount; i++){
		if (this.days[i]){
			div = [];
			var shiftcount = this.days[i].length;
			for(var n = 0; n < shiftcount; n++){
				div.push({tag : 'div', html : this.days[i][n].groupname , cls : 'piece'});
				div.push({tag : 'div', html : this.days[i][n].shiftname , cls : 'piece'});
				var details = this.days[i][n].record;
				var status = this.days[i][n].status;
				if (details){
					details = details.split('|');
					var index = details[1].indexOf('登录地点:');
					if (index >= 0){
						div_location = {tag : 'div', html : details[1].substring(index + 5), cls : 'piece location'};
					}
				}
				if (!status && Util.intervalOfNow(Data.time.year, Data.time.month, i) <= 0){
					status = '在岗';	
				}
				 
				if (status){ 
					var status_class = Enum.status_map[status];
					div_status = {tag : 'div', id : 'div-status-' + this.index + '-' + i, html : status, cls : 'piece ' + status_class};
					if (status != '在岗'){
						div.clear();
					}
				}
				
			}
		} 
		
		var onclick = '', onmouseenter = '', onmouseout = '';
		if (Data.me.hasRightToModify || Data.me.hasRightToView || isMe){
			onclick = isMe ? 'View.click_cell(this, true)' : 'View.click_cell(this)';
			onmouseenter = 'View.enter_cell(this)';
			onmouseout = 'View.leave_cell(this)';
		}
		
		var td_class = '';
		switch(Data.time.workdays[i - 1].type * 1.0){
		case 1:
			td_class += 'holiday-genra'; break;
		case 2:
			td_class += 'festival-genra'; break;
		}
		if (Data.time.month == Data.time.month_cur && Data.time.year == Data.time.year_cur && i == Data.today.day_of_month){
			td_class += 'today-genra';
		}
		
		var one_td;
		if (div){
			if (div_location){
				div.push(div_location);
				div_location = null;
			}
			if (div_status){
				div.push(div_status);
				div_status = null;
			}
			one_td = { 
				tag : 'td', 
				id : cell_id + i, 
				children : div, 
				onclick : onclick,
				onmouseenter : onmouseenter, 
				onmouseout : onmouseout
			};
		} else {
			one_td = { 
				tag : 'td', 
				id : cell_id + i,
				html : '&nbsp;<br/><br/>', 
				onclick : onclick,
				onmouseenter : onmouseenter, 
				onmouseout : onmouseout
			};	
		}
		one_td['class'] = td_class;
		td.push(one_td);
		div = null;
		
	} // for
	return td;
}

UserRecord.getInfo = function(srcid){
	var indexes = srcid.split('-');
	if (Doc.current_query_cell_id != srcid){
		return '';
	}
	var r = Data.table.users[indexes[1] * 1.0];
	var day = indexes[2] * 1.0;
	var weekday = Enum.weekday[(day + Data.time.firstday - 1) % 7];
	var html = '<div>' + r.name + '</div><div>' + Data.time.year + '-' + Data.time.month + '-' + day + '&nbsp;' +  weekday  + '</div>';
	var cell = r.days[day];
	if (!cell){
		return '';
	}
	var status;
	for(var i = 0; i < cell.length; i++){
		html += '<div style="margin-top: 7px;">' + cell[i].groupname + ' ' + cell[i].shiftname + '</div>';
		var status = cell[i].status;
		if (cell[i].record){
			html += '<div class="piece group">' + cell[i].record + '</div>';
			if (!status){
				status = '在岗';
			}
		}
		if (status){
			var status_class = Enum.status_map[status];
			status = '<div class="piece ' + status_class + '">' + status + '</div>';	
		}
	}
	
	if (status){
		html += status;
	}
    return html;
}; // Table.getCellInfo = function(){...}

</script>

<script type="text/javascript">

var Table = {
	
};

Table.getDepartmentFramework = function(year, month, departmentId){
	
	jQuery.ajax({
		type : 'post',
		url : MATECH_SYSTEM_WEB_ROOT + '/scheduling.do?method=getDepartmentFramework',
		async : false,
		data : {
			year : year,
			month : month, 
			departmentId : departmentId
		},
		dataType : 'text',
		success : function (response, xhr){
			var json = eval('(' + response +')');
			Data.table = {
				raw : json.table
			};
			Data.time.daycount = json.daycount;
			Data.time.firstday = json.firstday;
			Data.time.workdays = json.workdays;
		},
		error : function(xhr, errormsg, status){
			alert('查询异常，请尝试刷新页面或重新登入: ' + errormsg);
		}
	});
	
}; // Table.getDepartmentFramework = funcion(){...}

Table.adapt = function(){
	Data.table.users = [];
	Data.table.groups = {};
	if (Data.table.raw.length == 0)
		return;
	var user_index = 0;
	var user_cur, user_prev = Data.table.raw[0].id;
	var userrecord = new UserRecord(Data.table.raw[0], user_index++);
	Data.table.users.push(userrecord);	
	for(var i = 0; i < Data.table.raw.length; i++){
		user_cur = Data.table.raw[i].id;
		if (user_cur != user_prev){
			userrecord = new UserRecord(Data.table.raw[i], user_index++);
			Data.table.users.push(userrecord);
		} 
		userrecord.push(Data.table.raw[i]);
		user_prev = user_cur;
	}

	var group_cur, group_prev = '';
	for(var i = 0; i < Data.table.users.length; i++){
		group_cur = Data.table.users[i].groupname || '未排班';
		if (group_cur != group_prev){
			Data.table.groups[group_cur] = [];
		}
		Data.table.groups[group_cur].push(userrecord);
		group_prev = group_cur;
	}
}; // Table.adapt = function(){...}

Table.renderHeader = function(){
	var headerName = Data.time.year + '-' + Data.time.month;
	if (Table.headers && Table.headerName == headerName){
		Ext.DomHelper.append('tbody', Table.headers[0]); 
		Ext.DomHelper.append('tbody', Table.headers[1]); 
		return;
	}
	Table.headers = [];
	Table.headerName = Data.time.year + '-' + Data.time.month;
	var tr, td;
	
	
	for(var row = 0; row <= 1; row++){
		td = [];
		if (row == 0){
			td.push({ tag : 'td', id : '' , html : '人员', cls : '', colspan : 1, rowspan : 2, style : 'font-weight: bold'});	
		}
				
		
		for(var col = 1; col <= Data.time.daycount; col++){
			html = (row == 0) ? col : Enum.weekday[(Data.time.firstday + col - 1) % 7];
			cls = 'table-header weekday ';
			switch(Data.time.workdays[col - 1].type * 1.0){
			case 1:
				cls += 'holiday'; break;
			case 2:
				cls += 'festival'; break;
			}
			if (Data.time.month == Data.time.month_cur && Data.time.year == Data.time.year_cur && col == Data.today.day_of_month){
				cls += ' today';
			}
			td.push({ tag : 'td', id : '' , html : html, cls : cls });
		} // td
		
		Table.headers[row] = { tag : 'tr', children : td }; // 行
		Ext.DomHelper.append('tbody', Table.headers[row]); 
	} // tr
} // Table.renderHeader = function(){...}

Table.render = function(){	
	var tr, td;
	var html, cls;
	var table = {
		id : 'table',
		tag : 'table',
		cls : 'table',
		cellspacing : 0,
		cellpadding : 0,
		children : [ { id : 'tbody', tag : 'tbody'} ]
	};

	if (Ext.isChrome) table.align = 'center';
	document.getElementById('div-table').innerHTML = '';
	Ext.DomHelper.append('div-table', table);

	
	// Table.renderHeader();
	var grouptd, group_cur, group_prev = '';
	// var firsttd = [{ tag : 'td', html : '&nbsp;', rowspan : Data.table.users.length, cls : 'table-header group'}];
	Table.renderHeader();
	for(var i = 0; i < Data.table.users.length; i++){
		td =  Data.table.users[i].render(i);
		/*
		if (i == 0){
			td = firsttd.concat(td);
		}
		*/
		tr = { tag : 'tr', children : td};
		Ext.DomHelper.append('tbody', tr); 
	}
	// Table.renderHeader();
	

	var div_year_month = document.getElementById('div-year-month');
	div_year_month.innerHTML = Data.time.year + ' 年 ' + Data.time.month + ' 月 ';
}; // Table.render = function(){...}



Table.load = function(){
	Table.getDepartmentFramework(Data.time.year, Data.time.month, Data.department.id);
	Table.adapt();
	Table.render();
}; // Table.load = function(){...}

Table.saveMemo = function(){
	var workmemo = document.getElementById('workmemo');
	var theStatus = document.getElementsByName('status');
	var status = '';
	var not_on_duty = false;
	for(var i = 0; i < theStatus.length; i++){
		if (theStatus[i].checked){
			status = theStatus[i].value;
			if (i == 1 || i == 2){
				not_on_duty = true;
			}
			break;
		}
	}
	/*
	if (Data.me.hasRightToModify){ // 有修改状态权限的不在此限
		not_on_duty = false;
	}
	*/
	var $ret = UserInfo.init().getShiftInfo({
		from : Data.current.date,
		to : Data.current.date, 
		userId : Data.current.user.id
	}, function(shifts){
		shifts = eval('(' + shifts + ')');
		if (not_on_duty && shifts.length > 0){
			var msg = Data.current.user.name + ' 在 ' + Data.current.date + ' 当天有如下值班讯息:  ';
			for(var i = 0; i < shifts.length; i++){
				msg += shifts[i].groupname  + shifts[i].shiftname + ' (' + shifts[i].starttime + '~' + shifts[i].endtime + '),  ';
			}
			msg += '请通知排班管理员先更改排班，再修改工作状态。';
			alert(msg);
			for(var i = 0; i < theStatus.length; i++){
				theStatus[i].checked = false;
			}
			return false;
		} else {
			// i am banished ~.~
			/*
			if (not_on_duty && !workmemo.value.trim()){
				alert('请填写外出或请假相关讯息');
				return false;
			}
			*/
			var $userId = Data.me.hasRightToModify ? Data.current.user.id : Data.me.userId;
			return UserInfo.init().saveMemo({
				workmemo : workmemo.value, 
				status : status,
				userId : $userId, 
				workdate : Data.current.date
			}, function(responseMap){
				responseMap = eval('(' + responseMap + ')');
				if (responseMap.exception){
					alert('出现异常 ' + responseMap.exception);
					return false;
				}
				// alert('已保存 ' + Data.current.date + ' 工作日志.');
				View.set_cell_status(status);
				return true;
			}, false); // inner UserInfo.saveMemo({...}, function(){...})		
		} 
	}, false ); // UserInfo.getShiftInfo({...}, function(){...})
	return $ret;
}; // Table.saveMemo



</script>

<script type="text/javascript">
/* ========================================= @ExtControl ================================================ */
/** View 负责控制各个 Ext 控件 */



var View = {
	img_menu_plain	: contextPath + btn_img_url ,
	//img_menu_plain : "${pageContext.request.contextPath}/img/menu/plain/",
	refresh_timer : null
};

/* 小图标地址 */

//工具栏按钮
View.toolbar_items = [{  
    text : '上月',
    cls	 : 'x-btn-text-icon',
    icon :  View.img_menu_plain + "left.png",
   	handler: function(){
   		var year = Data.time.year;
    	var month = Data.time.month - 1;
        if (month <= 0){
        	month = 12;
        	year = year - 1;
        } 
        Data.time.month = month;
        Data.time.year = year;
    	Table.load();
	}
},'-', {
    text : '当月',
    cls  : 'x-btn-text-icon',
    icon : View.img_menu_plain + "home.png",
    handler : function(){
    	Data.time.year = Data.time.year_cur;
    	Data.time.month = Data.time.month_cur;
    	Table.load();
	}
},'-', {
    text : '下月',
    cls  : 'x-btn-text-icon',
    icon : View.img_menu_plain + "right.png",
    handler : function(){
    	var year = Data.time.year;
    	var month = Data.time.month + 1;
        if (month > 12){
        	month = 1;
        	year = year + 1;
        } 
        Data.time.month = month;
        Data.time.year = year;
    	Table.load();
	}
}, '-' , {
	text : '刷新',
	cls	 : 'x-btn-text-icon',
	icon : View.img_menu_plain + "refresh.png",
	handler:function(){
		Table.load();
	}
}, '-', {
	xtype : 'combo',  
	name : 'departments',
	hiddenName : 'departments',
	id : 'combobox_departments',
	mode : 'local',
	readOnly : false,
	editable : false,
	selectOnFocus : true,
	triggerAction : 'all',
	emptyText : '请选择部门',
	blankText : '请选择部门',
	valueField : 'autoid',
	displayField : 'departname',
	store : Data.department.simplestore,
	listeners : {
		beforerender : function(combobox){
			combobox.value = Data.department.id;
		},
		select : function(combobox, record, index){
			if (Data.department.id == combobox.value){
				return;
			}
			Data.department.id = combobox.value;
			Table.load();
		}
	}
}]; // View.toolbar_items

View.toolbar_items = View.toolbar_items.concat([
	'<span id="span-msg" style="font-weight: bold; font-size: 12px; color: #668CB3"></span>',
	'->',
	'<span id="span-hint"></span>',
	'<span id="span-weekday" class="weekday borderize">工作日</span>',   
	'<span id="span-today" class="today borderize">今天</span>',
	'<span id="span-holiday" class="holiday borderize">六日</span>',
	'<span id="span-festival" class="festival borderize">节日</span>'
]);

/* ----------- window of day --------------- */

View.window_of_day = new Ext.Window({
		title: '工作日志',
		width: 275,
		height : 150,
		modal : false,
		contentEl : 'div-window-of-day', 
		closeAction : 'hide',
		listeners : {
			'hide': {fn : function () {
			}
		}
	},
	layout:'fit',
	buttons : [
	{
		id : 'button-save',
		text : '保存',
		handler:function() {
			Table.saveMemo();
		}
	},
	{
		id : 'button-save-close',
		text : '保存并关闭',
		handler:function() {
			if (!Table.saveMemo()){
				return;
			}
			View.window_of_day.hide();
		}	
	},
	{
		id : 'button-close',
		text : '关闭',
		handler:function() {
			View.window_of_day.hide();
		}
	}]
}); // View.window_log = new Ext.Window({...})

View.render_form_list = function(forms){
	var tbody = document.getElementById("tbody-form-list");
	var rowcount = tbody.rows.length;
	for(var i = 0; i < rowcount; i++){
		tbody.deleteRow(0);
	}
	var tr, td;
	for(var i = 0; i < forms.length; i++){
		
		var tr = tbody.insertRow();
		
		//操作
		td = tr.insertCell();
		if(forms[i].taskid>''){
			td.className = 'cell-white';
			td.innerHTML = 
				"<img src='img/menu/plain/query.png' style='cursor:pointer'" + 
				"onclick=\"View.viewForm('" + forms[i].pkey + "','" + forms[i].foreignid + "','" + forms[i].pname + "','" + forms[i].numunid + "')\"/>";
		}
		td = tr.insertCell(); td.className = 'cell-white'; td.innerHTML = forms[i].numunid;
		td = tr.insertCell(); td.className = 'cell-white'; td.innerHTML = forms[i].processdesc;
		td = tr.insertCell(); td.className = 'cell-white'; td.innerHTML = forms[i]._activename;
		td = tr.insertCell(); td.className = 'cell-white'; td.innerHTML = forms[i].pname;
	}
};

View.viewForm = function(key,uuid,pName,_numUnid){
	var caption = _numUnid ? _numUnid : pName;
	View.openUrl('${pageContext.request.contextPath}/formDefine.do?method=formTree&view=true&uuid=' + uuid + '&pKey=' + key, caption) ;
};

View.openUrl = function(url, title){
	View.tab = parent.parent.tab.add({    
		'title' : title,  
		 closable : true,  //通过html载入目标页    
		 html:'<iframe scrolling="no" frameborder="0" width="100%" height="100%" src="' + url + '"></iframe>'   
	});    
	parent.parent.tab.setActiveTab(View.tab);
}


/* ----------- cell --------------- */

View.enter_cell = function(src){

	Doc.current_query_cell_id = src.id;
	var info = UserRecord.getInfo(src.id);
	if (!info){
		Doc.floating.style.display = 'none';
		return;
	}
	Doc.floating.innerHTML = info;
	
	var x, y;
	try {
		x = event.clientX + 20;
		y = event.clientY + 20;
	} catch(ex) {
		var offset = jQuery('#' + src.id).offset();
		x = offset.left + 50;
		y = offset.top + 50;
	}
	
	var winWidth = document.body.clientWidth;
	var winHeight = document.body.clientHeight;
	if (x + 200 >= winWidth){
		x = winWidth - 200 ;
	}
	if (y + 120 >= winHeight){
		y = winHeight - 120;
	}

	Doc.floating.style.left = x + 'px';
	Doc.floating.style.top = y + 'px';	
	

	// src.className = src.className + ' hovering';

	
	Doc.floating.style.display = 'block';
};

View.leave_cell = function(src){
	// src.className = src.className.replace(' hovering', '');
	// src.style.backgroundColor = 'white';
	if (Doc.floating_timer){
		clearTimeout(Doc.floating_timer);
	}
	Doc.floating_timer = setTimeout(function(){
		View.floatingGone();
	}, 8000);
};

View.click_cell = function(src, isMe){
	
	var indexes = src.id.split('-');
	var r = Data.table.users[indexes[1] * 1.0];
	var day = indexes[2] * 1.0;
	var weekday = Enum.weekday[(day + Data.time.firstday - 1) % 7];
	var date = Data.time.year + '-' + (Data.time.month < 10 ? '0' + Data.time.month : Data.time.month) + '-' + (day < 10 ? '0' + day : day);
	var title = r.name + ' ' + date + ' ' + weekday;
	var status = '';
	var i_am_blank_cell = true;
	if (r.days[day] && r.days[day][0]){
		status = r.days[day][0].status;
		i_am_blank_cell = false;
	}
	
	// data
	var one_day_info = UserInfo.init().getOneDaySchedule({workdate : date, userId : r.id }, null, false);
	one_day_info = one_day_info.split('`');

	// elements
	var workmemo = document.getElementById('workmemo');
	var button_save = Ext.getCmp('button-save');
	var button_save_close = Ext.getCmp('button-save-close');
	var theStatus = document.getElementsByName('status');
	var span_on_duty = document.getElementById('span-on-duty');
	var span_on_none = document.getElementById('span-on-none');
	var div_message = document.getElementById('div-message');
	
	// logic
	var has_right_to_save = false;
	var message = '工作状态';
	var messageColor = 'rgb(64, 128, 196)';
	var interval_of_now = Util.intervalOfNow(Data.time.year, Data.time.month, day);
	if (isMe || Data.me.hasRightToModify){
		has_right_to_save = interval_of_now >= 0;
		if (!has_right_to_save){
			message = date + ' 小于当前日期, 无法修改. ';
			messageColor = 'rgb(255, 96, 0)';
		}
	}
	span_on_none.style.display = interval_of_now > 0 ? 'inline' : 'none';
	
	
	div_message.innerHTML = message;
	div_message.style.color = messageColor;
	
	// set view
	
	if (Data.previous.cell){
		Data.previous.cell.className = Data.previous.cell.className.replace(' clicked', ''); 
	}
	src.className = src.className + ' clicked';
	Data.previous.cell = src;
	
	button_save.setVisible(has_right_to_save);
	button_save_close.setVisible(has_right_to_save);		

	workmemo.disabled = !has_right_to_save;
	for(var i = 0; i < theStatus.length; i++){
		theStatus[i].disabled = !has_right_to_save;
	}
	workmemo.value = one_day_info[1];
	View.render_form_list(eval('(' + one_day_info[0] + ')'));
	View.set_window_status(one_day_info[2], day);

	document.getElementById('div-window-of-day').style.display = 'block';
	

	Data.current.user = r;
	Data.current.day = day;
	Data.current.date = date;
	
	

	View.window_of_day.setTitle(title);
	View.window_of_day.show();
};

View.set_window_status = function(status, day){
	var theStatus = document.getElementsByName('status');
	for(var i = 0; i < theStatus.length; i++){
		theStatus[i].checked = theStatus[i].value == status;
	}
};

View.set_cell_status = function(status){
	if (!status)
		status = '';
	var row = Data.current.user.index;
	var col = Data.current.day;
	var div_status = 'div-status-' + row + '-' + col;
	var cell = 'c-' + row + '-' + col;
	var status_class = Enum.status_map[status];
	div_status = document.getElementById(div_status);
	cell = document.getElementById(cell);
	if (cell.innerHTML.indexOf('<br') >= 0 || cell.innerHTML.indexOf('<BR') >= 0){
		cell.innerHTML = '';
	}
	if (div_status){
		div_status.innerHTML = status;
		div_status.className = 'piece ' + status_class;
	} else {
		var cell = document.getElementById('c-' + row + '-' + col);
		cell.innerHTML = cell.innerHTML + 
			'<div id="div-status-' + row + '-' + col + '" class="piece ' + status_class + '">' + status + '</div>';
	} 
	if (Data.current.user.days[col]){
		for(var i = 0; i < Data.current.user.days[col].length; i++){
			Data.current.user.days[col][i].status = status;
		}	
	}
}



View.floatingGone = function(){
	Doc.floating.style.display = 'none';
	Doc.floating_timer = null;
};



window.onresize = function(){
	Ext.fly('div-table').setStyle("height", (document.body.clientHeight - 50) + "px");	
};


</script>

<script type="text/javascript">

window.onresize();

/* 工具栏 */
View.toolbar = new Ext.Toolbar({
	renderTo : 'div-toolbar',
    items : View.toolbar_items
}); // View.toolbar = new Ext.ToolBar({...})

// 初始加载
UserInfo.init().getRightTreeTo({userId : '${userSession.userId}'}, function(response){
	Data.rightTree = eval('(' + response + ')');
	Data.me.hasRightToView = UserInfo.init().hasRight(Data.rightTree, Data.rightOfView);
	Data.me.hasRightToModify = UserInfo.init().hasRight(Data.rightTree, Data.rightOfModify);
	Table.load();
});



</script>




</body>
</html>