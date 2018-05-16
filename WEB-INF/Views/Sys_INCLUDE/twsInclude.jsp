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
<meta http-equiv="cache-control" content="no-cache" /> 
<meta http-equiv="expires" content="0" /> 
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
	
	var themeval = "<%=usertheme%>";

	if(themeval==null || themeval=='' || themeval=='null'){
		themeval="default";
	}

	var btn_img_url = "/css/theme/"+themeval+"/btn/";
	
</script>
<c:set var="ctx" value="${pageContext.request.contextPath}/"/>

<link rel="stylesheet" type="text/css" href="${ctx}/tws/css/style.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/theme/default/style.css" charset="UTF-8"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/theme/default/ext-all-tws.css" charset="GBK"/>
<link rel="stylesheet" type="text/css" href="${ctx}/tws/css/ext.css" />

<!-- base -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/ext-base.js?version=20170209"></script>
<script type="text/javascript">
	Ext.BLANK_IMAGE_URL = "${pageContext.request.contextPath}/img/default/s.gif" ;
</script>
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


<script type="text/javascript" src="${ctx}/tws/js/plugin/extpluginAll.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/treegrid/TreeGridAll.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/utils.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/jquery-1.4.4.min.js"></script>
<!--ext itil -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/itil/dom.js?version=20161102" charset="UTF-8"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/itil/util.js?version=20161102" charset="UTF-8"></script>
<script type="text/javascript" src="${ctx}/js/common.js?version=20161207" charset="UTF-8"></script>

<!--ext matech -->
<script type="text/javascript" src="${ctx}/tws/js/matech/mt_common.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/matech/mt_utils.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/matech/mt_validation.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/matech/mt_ext_combox.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/matech/mt_ext_httpProvider.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/matech/mt_ext_grid.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/matech/mt_ext_tree.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/matech/mt_ext_fileUpload.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/matech/mt_excel.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/matech/mt_string.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/matech/mt_ext_calendar.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/matech/mt_ext_htmlEditor.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/getPy.js"></script>
<script type="text/javascript" src="${ctx}/tws/js/police.js"></script>