<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<%@page import="com.szk.framework.pub.sys.UTILSysProperty"%>
<%@page import="com.szk.framework.pub.util.StringTools"%>
<%@page import="com.szk.framework.listener.UserSession"%>

<%		
	String fileSizeMax = "";
	String bUseOcxOpenAttach= "";
	try{
		bUseOcxOpenAttach=StringTools.checkNull(UTILSysProperty.getProp("UseOcxOpenAttach"));
		//System.out.println("-------------bUseOcxOpenAttach="+bUseOcxOpenAttach);
		fileSizeMax=StringTools.checkNull(UTILSysProperty.getProp("FILESIZEMAX"));
	}catch(Exception e){}
%>
<%	
		String usertheme;
		UserSession loginguserSession = (UserSession)session.getAttribute("userSession") ;
		if(loginguserSession==null){
			usertheme = "default";
		}else{
			usertheme = loginguserSession.getSystem_theme();
			
		}
%>
<!-- <meta http-equiv="cache-control" content="no-cache" /> 
<meta http-equiv="expires" content="0" />  -->
<script>
	var MATECH_SYSTEM_WEB_ROOT = CONTEXTPATH = contextPath = "${pageContext.request.contextPath}/";
	var btnDenyRight = "${btnDenyRight}" ;
	var attachlimitupload = "" ;
	var SYSTEM_USE_OCX_OPEN_ATTACH="<%=bUseOcxOpenAttach%>";
	
	var SYSTEM_FILE_SIZE_MAX = "<%=fileSizeMax%>";
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
<c:set var="ctx" value="${pageContext.request.contextPath}/"/>

<!-- other -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/prototype.js"  charset="GBK"></script>


<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery/jquery-1.11.3.min.js"></script> 

<script type="text/javascript" src="${pageContext.request.contextPath}/js/itil/dom.js?version=20161102" charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/itil/util.js?version=20161102" charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/itil/process.js?version=20151224" charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/itil/userinfo.js?version=20151224" charset="UTF-8"></script>



<!-- ============================EXT JS====================== -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/fileuploadfield.css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/GridSummary.css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/eventstyle.css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/grid.css"/>
<!-- base -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/ext-base.js?version=20170209"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/ext-core.js?version=20170209"></script>

<!-- pkgs -->

<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/ext-foundation.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/cmp-foundation.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/ext-dd.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/data-foundation.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/data-json.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/data-grouping.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/resizable.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/window.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/state.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/data-list-views.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/pkg-tabs.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/pkg-buttons.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/pkg-toolbars.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/pkg-tips.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/pkg-tree.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/pkg-menu.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/pkg-forms.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/pkg-grid-foundation.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/pkg-grid-editor.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/pkg-grid-property.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pkgs/pkg-grid-grouping.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/ext-lang-zh_CN.js"></script>

<!-- EXT plug -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/GroupHeaderPlugin.css" charset="GBK"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/TreeGrid.css" charset="GBK"/>  
<script type="text/javascript" src="${pageContext.request.contextPath}/js/GroupHeaderPlugin.js?version=20151224" charset="UTF-8"></script>
<script type='text/javascript' src='${pageContext.request.contextPath}/js/RowExpander.js?version=20151224'></script>
<script type='text/javascript' src='${pageContext.request.contextPath}/js/TreeGrid.js?version=20151224'></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/MultiCellSelectionModel.js?version=20151224"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/BufferView.js?version=20151224"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/Ext.ButtonPanel.js?version=20151224"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/FileUploadField.js?version=20151224"></script>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/GridSummary.js?version=20151224"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/extjs/plugin/localstorage-provider.js?version=20151224"></script>

<script type="text/javascript">
	Ext.BLANK_IMAGE_URL = "${pageContext.request.contextPath}/img/default/s.gif" ;
</script>

<!-- 多附件上传 -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/attach/swfupload.js?version=20170119" charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/attach/uploaderPanel.js?version=20170119" charset="UTF-8"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/attach-ie8/css/Ext.ux.UploadDialog.css" charset="GBK"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/attach-ie8/Ext.ux.UploadDialog.js?version=20160720"  charset="UTF-8"></script>	
	
<!-- our own js -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/form.js?version=20161111" charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common.js?version=20161207" charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/score.js?version=20151224" charset="UTF-8"></script>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/echart/adapter/echart-adapter.js?version=20160416" ></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/echart/adapter/echart-adapter-itil.js?version=20160416" ></script>

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/tooltips.css" /> 
<script type="text/javascript" src="${pageContext.request.contextPath}/js/mt_validation.js?version=20161208" charset="UTF-8"></script>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/copy_paste.js?version=20151224" charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/columns.js?version=20151224" charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/grid.js?version=20160805" charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/process.js?version=20151224"  charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/mt_combox.js?version=20161012" charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/fireinnerText.js?version=20151224" charset="GBK"></script>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/sys/theme.js?version=20160224" charset="UTF-8"></script>



<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/date/jquery-ui-timepicker-addon.css" /> 
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/date/jquery-ui.css" />
<script type="text/javascript" src="${pageContext.request.contextPath}/js/date/jquery-ui.min.js?version=20151224" charset="UTF-8"></script> 
<script type="text/javascript" src="${pageContext.request.contextPath}/js/date/jquery-ui-sliderAccess.js?version=20151224" charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/date/jquery-ui-timepicker-addon.js?version=20161208"  charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/date/jquery-ui-timepicker-zh-CN.js?version=20161202" charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/multiSelect.js?version=20160720" charset="GBK"></script>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/scrollbar/scrollbar.js?version=20160315"  charset="UTF-8"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/scrollbar/scrollbar.css" />

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/combox.tagit.css" /> 
<script type="text/javascript" src="${pageContext.request.contextPath}/js/mt_combox.tagit.js?version=20161012" charset="UTF-8"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/comment.css"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/form.comment.js?version=20160830" charset="UTF-8"></script>

<script type="text/javascript">
var themeval = "<%=usertheme%>";

if(themeval==null || themeval=='' || themeval=='null'){
	themeval="default";
}

var btn_img_url = "/css/theme/"+themeval+"/btn/";

</script>

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/theme/default/style.css" charset="UTF-8"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/theme/default/combox.css" charset="UTF-8"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/theme/default/ext-all.css" charset="GBK"/>
<script type="text/javascript">

ThemeUtil.loadTheme({
	theme_src : { 
		'css' : ['style.css', 'combox.css', 'ext-all.css']
	}
});

</script>
<script type="text/javascript" src="${pageContext.request.contextPath}/tws/js/matech/mt_utils.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/tws/js/police.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/GridHeaderFilters.js?version=112233"></script>

