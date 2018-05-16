/**
 * 改变班组排班顺序的 Javascript，
   为了避开 iframe 的作用域问题，和 html 分开
 */

var UpdateSeq;
Ext.onReady(function(){
	UpdateSeq = (function(){
		/* ======================================== Data ============================================ */
		this.groups = null;
		this.groupmap = null;
		this.users = null;
		this.igroup = null;
		this.isLoaded = false;
		this.isChanged = false;
		this.doChanged = function(_isChanged){
			var msg = null;
			if (_isChanged){
				isChanged = true;
				msg = '已更改';
			} else {
				isChanged = false;
				msg = '&nbsp;';
			}
			Ext.fly('td-update-group-sequence-msg').dom.innerHTML = msg;
		};
		this.load_groups_method = null;
		
		this.member_ids = null;
		this.member_names = null;
		
		this.save_operation = null;
		this.save_operation_arg = null;
		
		this.load_groups_by_ajax = function(_groupids, _async){
			_groupids = _groupids || '';
			_async = _async == undefined ? true : _async;
			$.ajax({
				url : MATECH_SYSTEM_WEB_ROOT + 'shift.do?method=getGroups',
				data : { groupids : _groupids },
				async : _async,
				type : 'POST',
				dataType : 'text',
				beforeSend : function() {},
				success : function(responseMap, options) {
					responseMap = eval('(' + responseMap + ')');
					if (responseMap.exception){
						alert('获取分组失败 : ' + responseMap.exception);
						return;
					}
					UpdateSeq.groups = responseMap.groups;
				},
				error : function(){
					alert('与服务器连接异常，请尝试刷新页面或检查连接');	
				}
			}); // $.ajax({...});
		}; // this.load_groups_by_ajax(_groupids, _async)
		
		this.load_groups_by_memory = function(data){
			UpdateSeq.groups = data;
		}; // this.load_groups_by_memory(data)
		
		this.updateGroupSequence = function(_groupid, _sequence, _async){
			if (!_groupid || !_sequence) {
				alert('缺乏更新所需数据');
				return;
			}
			_async = _async == undefined ? true : _async;
			var sync_return_value = 0;
			$.ajax({
				url : MATECH_SYSTEM_WEB_ROOT + 'shift.do?method=updateGroupSequence',
				data : { 
					groupid : _groupid,
					sequence : _sequence
				},
				async : _async,
				type : 'POST',
				dataType : 'text',
				beforeSend : function() {},
				success : function(responseMap, options) {	
					responseMap = eval('(' + responseMap + ')');
					if (responseMap.exception){
						alert('更新分组失败 : ' + responseMap.exception);
						sync_return_value = -1;
						return;
					}
					UpdateSeq.doChanged(false);
					var _group = UpdateSeq.groupmap[UpdateSeq.igroup];
					_group.teamgroupmemberid = UpdateSeq.member_ids;
					_group.teamgroupmember = UpdateSeq.member_names;
					_group.sequence = _group.teamgroupmemberid.split(',');
					Ext.fly('td-update-group-sequence-msg').dom.innerHTML = '已保存对 ' + _group.groupname  + ' 的修改';
					// Ext.MessageBox.alert('已保存', '已保存对 ' + UpdateSeq.groupmap[UpdateSeq.igroup].groupname  + ' 的修改');
					sync_return_value = 0;
				},
				error : function(){
					alert('与服务器连接异常，请尝试刷新页面或检查连接');
					sync_return_value = -1;
				}
			}); // $.ajax({...});
			return sync_return_value;
		}; // this.updateGroupSequence();
		
		this.get_member_ids_names = function(){
			var select = document.getElementById("select-group-sequence");
			if (!UpdateSeq.igroup || select.options.length <= 1) 
				return -1;
			
			var ids = select.options[0].value;
			var names = UpdateSeq.users[select.options[0].value];
			for(var i = 1; i < select.options.length; i++){
				ids = ids + ',' + select.options[i].value;
				names = names + ',' + UpdateSeq.users[select.options[i].value];
			}
			UpdateSeq.member_ids = ids;
			UpdateSeq.member_names = names;
			return 0;
		};
		
		
		
		/* ========================================= UI =========================================== */
		/* */
		this.window_update_group_sequence = new Ext.Window({
			contentEl : 'window_update_group_sequence',
			title : '更改组内排班顺序',
			scope : UpdateSeq,
			layout : 'fit',
			width : 275,
			height : 325,
			style : 'opacity: 0.9; filter: alpha(opacity= 90);',
			closeAction : 'hide',
			closable : false,
			modal : true,
			plain : true,
			resizable : false,
			buttonAlign : 'center',
			defaultButton : 0,
			buttons : [ {
				text : '保存',
				handler : function() {
					UpdateSeq.save()
				}
			}, {
				text : '保存並返回',
				handler : function() {
					if (UpdateSeq.save() >= 0){
						UpdateSeq.doChanged(false);
						UpdateSeq.window_update_group_sequence.hide();
					}
				}
			}, {
				text : '返回',
				handler : function() {
					UpdateSeq.doChanged(false);
					UpdateSeq.window_update_group_sequence.hide();
				}
			} ]
		}); //this.window_update_group_sequence = new Ext.Window({...})
		
		
		/* */
		this.groupname_onclick = function(){
		}; // this.groupname_onclick
		
		/* */
		this.groupname_onchange = function(){
			var select = document.getElementById('select-groupname');
			if (!select) return;
			UpdateSeq.doChanged(false);
			UpdateSeq.igroup = select.value;
			UpdateSeq.render_groupsequence();
		}; // this.groupname_onchange()
		
		/* */
		this.mapdata = function(){
			this.groupmap = new Object();
			this.users = new Object();
			var sequence, cur_seq, names, seq_str, name_str;
			for(var i = 0; i < this.groups.length; i++){
				seq_str = this.groups[i].teamgroupmemberid;
				if (!seq_str || seq_str == '') {
					sequence = []; names = [];
				} else {
					sequence = seq_str.split(',');
					name_str = this.groups[i].teamgroupmember;
					names = name_str.split(',');
					for(var k = 0; k < sequence.length; k++){
						this.users[sequence[k]] = names[k];
					}
				}
				
				this.groups[i].sequence = sequence;				
				this.groupmap[this.groups[i].uuid] = this.groups[i];
			}
		} // this.mapdata();
		
		/* */
		this.render_groupname = function(){
			var select_groupname = document.getElementById("select-groupname");
			if (this.isLoaded == false) {
				for(var i = 0 ; i < groups.length; i++){
					var option = document.createElement("option");	
					option.innerHTML= groups[i].groupname;
					option.value = groups[i].uuid;
					select_groupname.appendChild(option);
				}	
			}
			for(var i = 0; i < select_groupname.options.length; i++){
				if (select_groupname.options[i].value == igroup){
					select_groupname.options[i].selected = true;
					return;
				}
			}
			select_groupname.options[0].selected = true;
		}; // this.render_groupname();
		
		/* */
		this.render_groupsequence = function(){
			var select = document.getElementById('select-group-sequence');
			select.innerHTML = '';
			var igroup = UpdateSeq.igroup;
			if (!igroup){
				return;
			}
			var groupmap = UpdateSeq.groupmap;
			var users = UpdateSeq.users;
			var sequence = groupmap[igroup].sequence;
			if (!sequence)
				return;
			for(var i = 0; i < sequence.length; i++){
				var option = document.createElement('option');
				option.innerHTML= users[sequence[i]];
				option.value = sequence[i];
				select.appendChild(option);
			}
		}; // this.render_groupsequence
		
		
		/* 显示更新排班顺序窗口 */
		this.show = function(load_groups_method, arg, refresh, groupid){
			refresh = refresh == undefined ? false : refresh;
			this.load_groups_method = load_groups_method;
			if (refresh || isLoaded == false){
				if ('memory' == load_groups_method){
					this.load_groups_by_memory(arg);	
				} else {
					this.load_groups_by_ajax(arg, false);
				}
				this.mapdata();
				this.igroup = this.groups.length > 0 ? this.groups[0].uuid : '';
			}
			if (groupid){
				this.igroup = groupid;
			}
			this.render_groupname();
			this.render_groupsequence();
			this.isLoaded = true;
			this.window_update_group_sequence.show();
		}; // this.show(load_groups_method, arg, refresh)
		
	
		
		this.save = function(save_operation , save_operation_arg){
			var returnVal = 0;
			if (UpdateSeq.isChanged){
				if(UpdateSeq.get_member_ids_names() < 0){
					alert('分组成员不足两人, 或没有选择分组');
					return -1;
				}
				if ('ajax' == UpdateSeq.load_groups_method){
					returnVal = UpdateSeq.updateGroupSequence(UpdateSeq.igroup, UpdateSeq.member_ids, false);
				} else {
					if (this.save_operation){
						returnVal = this.save_operation.call(UpdateSeq, save_operation_arg);
					}
					// returnVal = UpdateSeq.save_operation.call(UpdateSeq, UpdateSeq.save_operation_arg);
				}
				returnVal = returnVal == undefined ? 0 : returnVal;
			} 
			return returnVal;
		};
		
		this._moveTop = function(){
			moveTop(document.getElementById('select-group-sequence'))
			UpdateSeq.doChanged(true);
		};
		this._moveUp = function(){
			moveUp(document.getElementById('select-group-sequence'))
			UpdateSeq.doChanged(true);
		};
		this._moveDown = function(){
			moveDown(document.getElementById('select-group-sequence'))
			UpdateSeq.doChanged(true);
		};
		this._moveBottom = function(){
			moveBottom(document.getElementById('select-group-sequence'))
			UpdateSeq.doChanged(true);
		}; // this.moveBottom();
		
		return this;
	})(); // UpdateSeq = (function(){... return this; })();
}); // Ext.onReady({...});
