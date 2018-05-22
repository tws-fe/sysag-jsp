<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@page import="com.szk.framework.pub.sys.UTILSysProperty"%>
<%@page import="com.szk.framework.pub.util.StringTools"%>
<!-- <meta http-equiv="cache-control" content="no-cache" /> 
<meta http-equiv="expires" content="0" />  -->
<script>
	var MATECH_SYSTEM_WEB_ROOT = CONTEXTPATH = contextPath = "${pageContext.request.contextPath}/";
	var btnDenyRight = "${btnDenyRight}" ;
	var attachlimitupload = "" ;
	var SYSTEM_USE_OCX_OPEN_ATTACH="false";
	
	var SYSTEM_FILE_SIZE_MAX = "";
	if(SYSTEM_FILE_SIZE_MAX == ""){
		SYSTEM_FILE_SIZE_MAX = "400M";
	}else{
		var _max = (SYSTEM_FILE_SIZE_MAX * 1);
		if(_max/1024 > 1){
			if(_max/(1024*1024) > 1){
				SYSTEM_FILE_SIZE_MAX = (_max/(1024*1024)) + "M";
			}else{
				SYSTEM_FILE_SIZE_MAX = (_max/1024) + "K";	
			}
		}else{
			SYSTEM_FILE_SIZE_MAX = SYSTEM_FILE_SIZE_MAX + "B";
		}
	}
</script>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<link rel="stylesheet" type="text/css" href="${ctx}/share/css/ext/default/ext-all.css"/>
<link rel="stylesheet" type="text/css" href="${ctx}/share/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/share/css/same.css">
  
<link rel="stylesheet" type="text/css" href="${ctx}/share/css/ext/ext.css"/>
<link rel="stylesheet" type="text/css" href="${ctx}/share/css/ext/style.css"/>
    
<script type="text/javascript" src="${ctx}/share/js/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="${ctx}/share/js/bootstrap.min.js"></script>

<!-- base -->
<script type="text/javascript" src="${ctx}/share/js/ext/ext-base.js"></script>
<script type="text/javascript">
	Ext.BLANK_IMAGE_URL = "${ctx}/share/css/ext/default/img/s.gif" ;
	var btn_img_url = "/share/css/ext/default/btn/";
</script>
<script type="text/javascript" src="${ctx}/share/js/ext/ext-core.js"></script>

<!-- pkgs -->
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/ext-foundation.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/cmp-foundation.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/ext-dd.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/data-foundation.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/data-json.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/data-grouping.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/resizable.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/window.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/state.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/data-list-views.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/pkg-tabs.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/pkg-buttons.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/pkg-toolbars.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/pkg-tips.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/pkg-tree.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/pkg-menu.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/pkg-forms.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/pkg-grid-foundation.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/pkg-grid-editor.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/pkg-grid-property.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/pkgs/pkg-grid-grouping.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="${ctx}/share/js/ext/plugin/extpluginAll.js"></script>

<link rel="stylesheet" type="text/css" href="${ctx}/share/js/attach-ie8/css/Ext.ux.UploadDialog.css"/>
<script type="text/javascript" src="${ctx}/share/js/attach/swfupload.js" charset="UTF-8"></script>
<script type="text/javascript" src="${ctx}/share/js/attach/uploaderPanel.js" charset="UTF-8"></script>
<script type="text/javascript" src="${ctx}/share/js/attach-ie8/Ext.ux.UploadDialog.js?version=20160720" charset="UTF-8"></script>	

<script type="text/javascript" src="${ctx}/share/js/utils.js"></script>
<script type="text/javascript" src="${ctx}/share/js/tws/dom.js"></script>
<script type="text/javascript" src="${ctx}/share/js/tws/mt_ext_httpProvider.js"></script>
<script type="text/javascript" src="${ctx}/share/js/tws/mt_common.js"></script>
<script type="text/javascript" src="${ctx}/share/js/tws/mt_utils.js"></script>
<script type="text/javascript" src="${ctx}/share/js/tws/mt_ext_grid.js"></script>
<script type="text/javascript" src="${ctx}/share/js/tws/mt_ext_combox.js"></script>
<script type="text/javascript" src="${ctx}/share/js/tws/mt_ext_tree.js"></script>
<!--  
<script type="text/javascript" src="${ctx}/share/js/ext/treegrid/TreeGridAll.js"></script>
<script type="text/javascript" src="${ctx}/share/js/tws/mt_ext_treeGrid.js"></script>
-->
<script type="text/javascript" src="${ctx}/share/js/tws/mt_form.js"></script>
<script type="text/javascript" src="${ctx}/share/js/tws/mt_attach.js"></script>
<script type="text/javascript" src="${ctx}/share/js/tws/mt_validation.js"></script>
<script type="text/javascript" src="${ctx}/share/js/tws/timeUtil.js"></script>
<script type="text/javascript" src="${ctx}/share/js/tws/police.js"></script>

<link rel="stylesheet" type="text/css" href="${ctx}/share/js/date/css/jquery-ui-timepicker-addon.css" /> 
<link rel="stylesheet" type="text/css" href="${ctx}/share/js/date/css/jquery-ui.css" />
<script type="text/javascript" src="${ctx}/share/js/date/jquery-ui.min.js?version=20151224" charset="UTF-8"></script> 
<script type="text/javascript" src="${ctx}/share/js/date/jquery-ui-sliderAccess.js?version=20151224" charset="UTF-8"></script>
<script type="text/javascript" src="${ctx}/share/js/date/jquery-ui-timepicker-addon.js?version=20161208"  charset="UTF-8"></script>
<script type="text/javascript" src="${ctx}/share/js/date/jquery-ui-timepicker-zh-CN.js?version=20161202" charset="UTF-8"></script>

