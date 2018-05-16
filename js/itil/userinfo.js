
if (!Jax) {
	alert('user.js is dependent on the Class Jax');
}
if (!MATECH_SYSTEM_WEB_ROOT && !CONTEXTPATH) {
	alert('MATECH_SYSTEM_WEB_ROOT or CONTEXTPATH is not defined');
}

function UserInfo() {

};

UserInfo.init = function() {
	
	if (UserInfo.inited){
		return UserInfo;
	}

	UserInfo.entries = {
		"getUserSessionTo" : "/user.do?method=userSessionProperty",
		"getRightTreeTo" : "/user.do?method=popedom", // roleId
		"getRightTreeByRoleTo" : "/role.do?method=popedom", // roleId
		"getOneDaySchedule" : "/info.do?method=getOneDaySchedule", // workdate, userId, onlyMemo
		"saveMemo" : "info.do?method=schedularSave", // workdate, userId
		"saveMemoNew" : "clander.do?method=schedularSave", // workdate, userId
		"getShiftInfo" : "shift.do?method=getShiftInfo" // from, to, userid
	};

	for ( var key in UserInfo.entries) {
		UserInfo[key] = Jax.delegate(UserInfo.entries[key]);
	}

	/**
	 * 判斷用戶对某菜单是否有权限
	 */
	UserInfo.hasRight = function(rightTree, lineage, by_id) {
		if (typeof lineage == 'string') {
			lineage = lineage.split(',');
		}
		var children = rightTree instanceof Array ? rightTree[0].children
				: rightTree.children;
		by_id = by_id == undefined ? false : by_id;
		var equal = false;
		for (var i = 0; i < lineage.length; i++) {
			for (var c = 0; c < children.length; c++) {
				equal = by_id ? children[c].id == lineage[i]
						: children[c].name == lineage[i];
				if (equal) {
					if (children[c].checked == false)
						return false;
					if (i == lineage.length - 1) {
						return true;
					} else {
						children = children[c].children;
						break;
					}
				}
			}
		}
		return false;
	};

	UserInfo.inited = true;
	return UserInfo;
}
