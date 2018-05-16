function mt_process_viewImage(tableId) {
		
	var id = document.getElementById("chooseValue_"+tableId).value;
	
	if(id == "") {
		alert("请选择需要查看流程图的记录!") ;
		return ;
	}
	
	var trValue = document.getElementById("trValueId_"+id);
	
	var pdId = trValue.pdid ;
	var pId = trValue.pid ;
	var pkey = trValue.pkey ;
	
	if(pdId == "") {
		alert("流程尚未发布,不能显示流程图!") ;
		return ;
	}
	
	var url = MATECH_SYSTEM_WEB_ROOT+"/process.do?method=viewImageByPIdOrKey&key=" + pkey + "&id="+pId;
	
	var tab = parent.tab ;
    if(tab){
		n = tab.add({    
			'title':"流程图",    
			closable:true,  //通过html载入目标页    
			html:'<iframe name="imageFrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'   
		}); 
        tab.setActiveTab(n);
	}else {
		window.open(url);
	}	
	 
}

function mt_process_view(pId,pName,viewUuid){
	var url = MATECH_SYSTEM_WEB_ROOT+'/process.do?method=processTransfer&view=true&pId='+ pId + "&uuid=" + viewUuid ;
	var n = parent.tab.add({     
		'title':pName,  
		 closable:true,  //通过html载入目标页    
		 html:'<iframe scrolling="no" frameborder="0" width="100%" height="100%" src="' + url + '"></iframe>'   
	});    
	parent.tab.setActiveTab(n);  
}

//viewImageByIdOrKey
function mt_process_IdOrKey_view(pKey,pName,uuid,formId,p){
	//var url = MATECH_SYSTEM_WEB_ROOT+'/process.do?method=processTransfer&view=true&pId='+ pId + "&uuid=" + viewUuid ;
	if(formId == undefined) formId = '';
	var url = MATECH_SYSTEM_WEB_ROOT +'/formDefine.do?method=formTree&view=true&formId='+formId+'&pKey='+ pKey + "&uuid=" + uuid ;
	if(p == undefined){
		openTab(uuid,pName,url,parent);
	}else{
		openTab(uuid,pName,url,p);
	}
	
	
}

function startProByPkey(pKey,_openmode,iParam) {
	if(mt_form_saveUrl()){
		var formId = document.getElementById("formId").value;
		//alert(pKey);
		//alert(_openmode);
		//var url = MATECH_SYSTEM_WEB_ROOT + "/process.do?method=processTransfer&pKey=" + pKey;
		var url = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=formTree&pKey=" + pKey + "&formId=" + formId;
		if(iParam) url += iParam;
		
		if(_openmode=="newTab"){
        	openTab('t_'+Math.random(),'流程申请',url,parent);
        }else if(_openmode=="newWin"){
        	window.open(url,'_blank');
        } else {
       	 	window.location=url;
		}
	}
}

//编辑
function mt_process_edit(pKey) {
	var formId = document.getElementById("formId").value;
	var tableId = document.getElementById("tableId").value;
	
	var value= document.getElementById("chooseValue_" + tableId).value;
	if(value == ''){
		
		value = getChooseValue(tableId);
				
		if(value == "") {
			alert('请选择要修改的数据!');
			return;
		
		} else if(value.indexOf(",") > -1) {
			alert('请选择一条需要修改的数据!');
			return;
		}
	}
	
	//var url = MATECH_SYSTEM_WEB_ROOT + "/process.do?method=processTransfer&pKey=" + pKey + "&uuid="+value;
	var url = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=formTree&pKey=" + pKey + "&uuid="+value + "&formId=" + formId;
	window.location = url; 
}

//删除
function mt_process_del(tableId,pKey,uuid) {
	
	if(confirm("您确认要删除当前选中数据及相关的流程信息吗？")){
		//var url = MATECH_SYSTEM_WEB_ROOT + "/process.do?method=delFormData&uuid="+uuid + "&pkey="+pKey;
		var url = MATECH_SYSTEM_WEB_ROOT + "/process.do?method=delFormData";
		$.ajax({ 
			url: url,
			type : "post",
			data : {pKey : pKey,uuid : uuid},
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success:function(msg){
				if(msg.indexOf("ok")>-1) {
					eval('goSearch_' + tableId + '()');
				}else{
					alert(msg) ;
				}
			}
		});
		 
	} 
}


//检查状态
function mt_process_checkState(pKey,uuid) { 
	
	window.location = MATECH_SYSTEM_WEB_ROOT + "/process.do?method=processTransfer&pKey=" + pKey + "&uuid="+value; 
}

function getServerInfo(node,name,value){
	if(curNodeName == node){
		var field = Ext.getDom(name) ;												
		if(!field) {
			var selectCmp = Ext.getCmp(name) ;
			if(selectCmp.getValue() == "") selectCmp.setValue(value);
		}else{
			if(field.value == "") field.value = value;
		}
	}
}

/* ============================= 流程的历史 ========================= */

/**
	获取流程的历史，然後执行回调
	nodeHistory[index].activity_name_ 节点名
	nodeHistory[index].transition_ 经过的途径
	@param callback 参数
	@scope Javascript 作用域
	@arg 回调参数
*/
function getNodeHistoryTo(callback, scope, arg){
	var _uuid = document.getElementById('uuid');
	if (!_uuid) return;
	Ext.Ajax.request({
		method:'POST',
		params : { uuid : _uuid.value },
		url : MATECH_SYSTEM_WEB_ROOT + "/formcheck.do?method=getNodeHistory",  
        success: function (response,options) {            
			var json = response.responseText;			
			if (json != ""){
				var nodeHistory = null;
				try {
					nodeHistory = Ext.util.JSON.decode(json);
				} catch (e){
					alert('fail to get process history : ' + json);
					return;
				}
				if ((callback instanceof Array) == false){
					callback = [ callback ];
				}
				for(var i = 0; i < callback.length; i++){
					callback[i].call(scope || this, nodeHistory, arg);
				}
			} else {
				alert("cannot find uuid : " + _uuid);
			}
		},
		failure: function (response,options) {
			alert("cannot connect to server, please try to refresh");
		}
	});
} // getNodeHistoryTo(callback, scope, arg)

/** 若干步前是不是某个节点 
	@param nodeHistory 节点历史数组
	@param index 往前算几步
	@param nodeName 节点名 
*/
function prevNodeIs(nodeHistory, index, nodeName){
	return nodeHistory[index] && nodeHistory[index].activity_name_ == nodeName;
} // prevNodeIs(nodeHistory, index, nodeName)

/**
 * 
 * @param nodeNames
 * @param method (method == and, !method == or)
 */
function containsNode(nodeHistory, nodeNames, method){ 
	if ((nodeNames instanceof Array) == false){
		nodeNames = [ nodeNames ];
	}
	var count = 0;
	for(var n = 0; n < nodeHistory.length; n++){
		for(var i = 0; i < nodeNames.length; i++){
			if (nodeHistory[n].activity_name_ == nodeNames[i]){
				if (!method) {
					return true;
				} else {
					count++;
				}
			}
		}
	}
	if (method){
		return count == nodeNames.length;
	} else {
		return false;
	}
}

/**
 * 返回由开始至现在节点所经的单一路径，去掉所有返回路径的记录
 * @param nodeHistory 流程的历史
 * @returns {Array} 单一路径
 */
function getSinglePath(nodeHistory){
	var n, rn, i;
	var nonrepeat = new Array(nodeHistory.length); // 有效无效的 flag 数组，0 无效 1 有效，若要省略初始化，可以用 undefined 作为有效
	for(i = 0; i < nodeHistory.length; i++)
		nonrepeat[i] = 1;
	for(n = nodeHistory.length - 1; n >= 0; n--){ // n 从开始一端减减 (因为 0 是当前节点, 1 是上一个节点等等)
		if (nonrepeat[n] == 0) continue;
		for(rn = 0; rn < n; rn++){ // rn 从当前节点一端加加
			if (nodeHistory[n].activity_name_ == nodeHistory[rn].activity_name_){ // 若果第 n 步前和第 rn 步前节点相同，则在 rn 步前实行了回退，
				for(i = n; i > rn; i--) nonrepeat[i] = 0; // 有效路径从「开始」至 n - 1，再由 rn 至「当前」计
				break; // 则将 n 步至 rn 步间的历史都作为无效路径
			}
		}
	}
	var singlePath = new Array();
	for(i = 0; i < nodeHistory.length; i++){
		if (nonrepeat[i] == 1) singlePath.push(nodeHistory[i]); // 只纳入有效的路径, 1 1 0 0 0 0 1 1 1 1
	}
	return singlePath;
} // getSinglePath(nodeHistory)

/* ============================== 元素操作 =========================== */
/** 隐藏或显示以某一个 id 前缀的元素
	@param id_prefix : 
		id 前缀，如传入 tr-审核，会由 tr-审核-0 往上找至 undefined (找不到)
		也可以传入 tr-审核.5，会由 tr-审核-5 往上找至 undefined (找不到)
		也可以传入 tr-审核.2.11，，会由 tr-审核-2 往上找至 tr-审核-11
		可传入 Array
	@param diplay : css style, 如 none, table-row, inherit, block 等
*/
function change_display_by_idprefix(id_prefix, display){
	if((id_prefix instanceof Array) == false){
		id_prefix = [id_prefix];
	}
	for(var n = 0; n < id_prefix.length; n++){
		var begin = 0, end = 64;
		var arg = id_prefix[n].split('.'); // begin end
		switch(arg.length){
		case 3:
			end = arg[2] * 1.0;
		case 2:
			begin = arg[1] * 1.0;
		}
		id_prefix[n] = arg[0];
		for(var i = begin; i <= end; i++){
			var tr = document.getElementById(id_prefix[n] + '-' + i);
			if (!tr) break;
			tr.style.display = display;
		}

	}
} // change_display_by_idprefix(id_prefix, display)



/** 
  通用　ajax，_url 地址，_data　数据，callback 回调, _async　是否异步，_errormsg　错误讯息
 */
function ajaxTo(_url, _data, callback, _async, _onerror){
	var returnVal;
	_async = _async == undefined ? true : _async;
	jQuery.ajax({
		type : 'post',
		url : _url,
		async : _async,
		data : _data,
		dataType : 'text',
		success : function (response, xhr){
			if (callback){
				returnVal = callback(response, xhr);
			} else {
				returnVal = response;
			}
		},
		error : function(xhr, errormsg, status){
			if (_onerror){
				if (_onerror instanceof String){
					alert(_onerror);
				} else {
					_onerror(xhr, errormsg, status);
				}
			}
		}
	});
	return returnVal;
}

/** 
 * 	拿到或设置用户 userSession 中的 property 讯息
	若传入参数则是设置, 没有参数默认拿讯息
 * @param _data, 传入参数 (无则为拿讯息) 
 * @param callback, 回调
 * @param _async, 是否异步 
 * @returns json 格式
 */
function userSessionTo(_data, callback, _async, _onerror){
	var _url = MATECH_SYSTEM_WEB_ROOT + "/formcheck.do?method=userSessionProperty";
	return ajaxTo(_url, _data, callback, _async, _onerror);
}

/** 
 * 	拿到 mt_jbpm_processform 讯息，传入参数用 and {field} = ? 连接
 */
function processPropertyTo(_data, callback, _async, _onerror){
	var _url = MATECH_SYSTEM_WEB_ROOT + "/formcheck.do?method=processProperty";
	return ajaxTo(_url, _data, callback, _async, _onerror);
}

/** 
 * 	拿到 mt_jbpm_processform 讯息，传入参数用 
 */
function genericProcessPropertyTo(_data, callback, _async, _onerror){
	var _url = MATECH_SYSTEM_WEB_ROOT + "/formcheck.do?method=genericProcessProperty";
	return ajaxTo(_url, _data, callback, _async, _onerror);
}

/**
 * 拿到讯息流程会签，要传入 formentityid
 * 可以设 nodename
 */
function getCounterSignTo(_data, callback, _async, _onerror){
	var _url = MATECH_SYSTEM_WEB_ROOT + "/formcheck.do?method=getCounterSign";
	return ajaxTo(_url, _data, callback, _async, _onerror);
}

/**
 * @param uuid
 * @param tablename
 * @param worknumbername
 * @param titlename
 * @returns
 */
function getRelatedProcessesTo(_data, callback, _async, _onerror) {
	var _url = MATECH_SYSTEM_WEB_ROOT + "/formcheck.do?method=getRelatedProcessCurrent";
	return ajaxTo(_url, _data, callback, _async, _onerror);
}

//流程增加级联审批选人窗口
var _cascadeWin = null;
function process_cascade_audit_win(inputId1,inputId){
	//inputId1 = 显示在表单中的字段，inputId = 隐藏字段选择人的ID
	
	var html = "<table border=\"0\" cellpadding=\"5\" cellspacing=\"10\" width=\"100%\" align=\"center\">";
	html += "<tr><td align=\"right\">级联审批人员 </td><td>";
	html += "<input type=\"text\" id=\"__cascadeSignUser1\" name=\"__cascadeSignUser1\" onclick=\"show_selectUser('__cascadeSignUser1','__cascadeSignUser');setTimeout('__setMultiSelect()',1000);\" size=\"35\" />";
	html += "<input type=\"hidden\" id=\"__cascadeSignUser\" name=\"__cascadeSignUser\"  />";
	
	html += "<input type=\"button\" value=\"选人\" onclick=\"show_selectUser('__cascadeSignUser1','__cascadeSignUser');setTimeout('__setMultiSelect()',1000);\"  />";
	
	html += "</td></tr><tr><td align=\"right\">人员顺序</td>";
	html += "<td align=\"left\"><table align=\"left\" ><tr><td align=\"right\">";
	html += "<select multiple name=\"__multiSelect\" id=\"__multiSelect\" size=\"7\" style='width:200;' ></select>";
	html += "</td><td align=\"left\">";
	html += "<img alt=\"置顶\" class=\"multiImg\" src=\""+MATECH_SYSTEM_WEB_ROOT+"/img/menu/top.png\" onclick=\"moveTop(document.getElementById('__multiSelect'));\"><br/>";
	html += "<img alt=\"上移\" class=\"multiImg\" src=\""+MATECH_SYSTEM_WEB_ROOT+"/img/menu/up.png\" onclick=\"moveUp(document.getElementById('__multiSelect'));\"><br/>";
	html += "<img alt=\"下移\" class=\"multiImg\" src=\""+MATECH_SYSTEM_WEB_ROOT+"/img/menu/down.png\" onclick=\"moveDown(document.getElementById('__multiSelect'));\"><br/>";
	html += "<img alt=\"置底\" class=\"multiImg\" src=\""+MATECH_SYSTEM_WEB_ROOT+"/img/menu/bottom.png\" onclick=\"moveBottom(document.getElementById('__multiSelect'));\"><br/>";
	html += "</td></tr></table></td></tr></table>";
	
	if(_cascadeWin == null) { 
	    _cascadeWin = new Ext.Window({
			title: '级联审批',
			width: 400,
			height:300, 
			html:html,
	        closeAction:'hide',
	        modal:true,
	        layout:'fit',
		    buttons:[{
	            text:'确定',
	            icon:contextPath + btn_img_url + 'check.png',
	          	handler:function() {
	          		var multiSelect = document.getElementById("__multiSelect");
	          		if(multiSelect.length > 20){
	          			alert("审批人数不能超过20人，请重新选！")
	          			return;
	          		}
					var signUser = "";
					var signUser1 = "";
					for(var i=0; i < multiSelect.length; i++) {
						signUser += "," + multiSelect.options[i].value;
						signUser1 += "," + multiSelect.options[i].text;
					}
					if(signUser != ""){
						signUser = signUser.substring(1);
						signUser1 = signUser1.substring(1);
					}
					try{
						document.getElementById(inputId).value = signUser;
						document.getElementById(inputId1).value = signUser1;
					}catch(e){}
					_cascadeWin.hide();
	          	}
	        },{
	            text:'取消',
	            icon:contextPath + btn_img_url + 'close.png',
	            handler:function(){
	            	_cascadeWin.hide();
	            }
	        }]
	    });
	}
	_cascadeWin.show();	
}

//设置【人员顺序】
var _preValue='';
var _bHandle=false;
function __setMultiSelect(){
	
	if (_bHandle){
		setTimeout('__setMultiSelect()',1000);
		return;
	}

	try{
		var multiSelect = document.getElementById("__multiSelect");
		
		var obj=document.getElementById("__cascadeSignUser1");
		if(_preValue!=obj.value){
			_preValue=obj.value;
			
			_bHandle=true;
			
			//为空，清空顺序列表
			delSelectOption(multiSelect);

			if (obj.value != ""){ 
				var cascadeSignUser = document.getElementById("__cascadeSignUser").value;
				var sIds = cascadeSignUser.split(",");
				var sNames = obj.value.split(",");
				for(var i=0;i<sIds.length;i++){
					if(sIds[i] != ""){
						addSelectOption(multiSelect,sNames[i],sIds[i]);
					}
				}
			}
			
			_bHandle=false;
		}else{
			setTimeout('__setMultiSelect()',1000);
		}
	}catch(e){
		_bHandle=false;
		alert(e);
	}
}

//知识检索后，打开流程表单
function process_select_win(title,pKey,formId,uuid,parent){
	var url = MATECH_SYSTEM_WEB_ROOT + "/process.do?method=processTransfer&pKey=" + pKey + "&formId=" + formId + "&uuid=" + uuid + "&act=edit&view=true&copy=true" ;
	openTab("t_" + Math.random(), title, url, parent);
}
