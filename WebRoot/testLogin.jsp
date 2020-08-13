<%@ page language="java" import="java.util.*,java.io.*,vcom.sso.*" pageEncoding="GB18030"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

//客户端IP
String clientIp = request.getHeader("x-forwarded-for");   
if(clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {   
	clientIp = request.getHeader("Proxy-Client-IP");   
}   
if(clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {   
	clientIp = request.getHeader("WL-Proxy-Client-IP");   
}   
if(clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {   
	clientIp = request.getRemoteAddr();   
}  

//单点登录服务路径
SsoServiceCfg ssoServiceCfg=(SsoServiceCfg)application.getAttribute(SsoServiceCfg.SSO_SERVICE_CFG);
String deployWay=ssoServiceCfg.getDeployWay();
String scheme=ssoServiceCfg.getScheme();
String serverName=ssoServiceCfg.getServerName();
String vpnServerName=ssoServiceCfg.getVpnServerName();		
String serverPort=ssoServiceCfg.getServerPort();
String contextPath=ssoServiceCfg.getContextPath();

String reqSsoBasePath=null;

if(deployWay.equals(ssoServiceCfg.SINGLE_HOST))
{
	reqSsoBasePath = scheme+"://"+request.getServerName()+":"+serverPort+"/"+contextPath+"/";
}
else if(deployWay.equals(ssoServiceCfg.MULTI_HOST))
{
	String[] clientIPStages=clientIp.split("\\.");

	if(serverName.startsWith(clientIPStages[0]+"."))
	{
		reqSsoBasePath=scheme+"://"+serverName+":"+serverPort+"/"+contextPath+"/";
	}
	if(vpnServerName!=null && !vpnServerName.trim().equals("") && vpnServerName.startsWith(clientIPStages[0]+"."))
	{
		reqSsoBasePath=scheme+"://"+vpnServerName+":"+serverPort+"/"+contextPath+"/";
	}	
}

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'login.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script type="text/javascript" src="js/lib/jquery.js"></script>
	<script type="text/javascript" src="js/lib/jquery.cookie.js"></script>
	
  </head>
  
  <body>
    <script type="text/javascript">
    	alert($.cookie('lastUrl'))
    </script>
  </body>
</html>
