
if (!Jax) {
	alert('ProcessInfo.js is dependent on the Class Jax');
}
if (!MATECH_SYSTEM_WEB_ROOT) {
	alert('MATECH_SYSTEM_WEB_ROOT is not defined');
}

function ProcessInfo() {

};

ProcessInfo.init = function() {
	
	if (ProcessInfo.inited){
		return ProcessInfo;
	}

	ProcessInfo.reloadUrl = [ MATECH_SYSTEM_WEB_ROOT
			+ '/processinfo.do?method=reloadProcessInfoCache' ];

	ProcessInfo.entries = {
		"processPropertyTo" : "/processinfo.do?method=processProperty",
		"genericProcessPropertyTo" : "/processinfo.do?method=genericProcessProperty",
		"getCounterSignTo" : "/processinfo.do?method=getCounterSign", // roleId
		"getRelatedProcessesTo" : "/processinfo.do?method=getRelatedProcessCurrent", // roleId
		"getRelatedProcessInfoTo" : "/processinfo.do?method=getRelatedProcessInfo", // workdate,
																					// userId,
																					// onlyMemo
		"getNodeHistoryTo" : "/processinfo.do?method=getNodeHistory" // workdate,
																		// userId
	};

	for ( var key in ProcessInfo.entries) {
		ProcessInfo[key] = Jax.delegate(ProcessInfo.entries[key]);
	}

	ProcessInfo.reloadCache = function() {
		var callback, onerror;
		for (var i = 0; i < ProcessInfo.reloadUrl.length; i++) {
			var url = ProcessInfo.reloadUrl[i];
			callback = (function(url) {
				return function(response) {
					console.log('[loaded] ' + url);
				};
			})(url);
			onerror = (function(url) {
				return function(response) {
					console.log('[loading fail] ' + url);
					try {
						var exmsg = (response.exception || response.msg)
								|| response;
						console.log(exmsg);
					} catch (e) {
					}
				};
			})(url);
			Jax.to(url, {}, callback, true, onerror);
		}
	};

	ProcessInfo.prevNodeIs = function(nodeHistory, index, nodeName) {
		return nodeHistory[index]
				&& nodeHistory[index].activity_name_ == nodeName;
	};

	ProcessInfo.containsNode = function(nodeHistory, nodeNames, method) {
		if ((nodeNames instanceof Array) == false) {
			nodeNames = [ nodeNames ];
		}
		var count = 0;
		for (var n = 0; n < nodeHistory.length; n++) {
			for (var i = 0; i < nodeNames.length; i++) {
				if (nodeHistory[n].activity_name_ == nodeNames[i]) {
					if (!method) {
						return true;
					} else {
						count++;
					}
				}
			}
		}
		if (method) {
			return count == nodeNames.length;
		} else {
			return false;
		}
	} // ProcessInfo.containsNode = function(nodeHistory, nodeNames, method)

	ProcessInfo.getSinglePath = function(nodeHistory) {
		var n, rn, i;
		var nonrepeat = new Array(nodeHistory.length);
		for (i = 0; i < nodeHistory.length; i++)
			nonrepeat[i] = 1;
		for (n = nodeHistory.length - 1; n >= 0; n--) {
			if (nonrepeat[n] == 0)
				continue;
			for (rn = 0; rn < n; rn++) {
				if (nodeHistory[n].activity_name_ == nodeHistory[rn].activity_name_) {
					for (i = n; i > rn; i--)
						nonrepeat[i] = 0;
					break;
				}
			}
		}
		var singlePath = new Array();
		for (i = 0; i < nodeHistory.length; i++) {
			if (nonrepeat[i] == 1)
				singlePath.push(nodeHistory[i]);
		}
		return singlePath;
	} // ProcessInfo.getSinglePath = function(nodeHistory)
	
	ProcessInfo.inited = true;
	return ProcessInfo;
}
