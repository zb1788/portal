<%@ page language="java" import="java.util.*,java.io.*,java.util.regex.*,vcom.sso.*" pageEncoding="GB18030"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";


//单点登录服务路径
SsoServiceCfg ssoServiceCfg=(SsoServiceCfg)application.getAttribute(SsoServiceCfg.SSO_SERVICE_CFG);
String deployWay=ssoServiceCfg.getDeployWay();
String scheme=request.getScheme();
String serverName=ssoServiceCfg.getServerName();
String vpnServerName=ssoServiceCfg.getVpnServerName();		
//String serverPort=ssoServiceCfg.getServerPort();
String contextPath=ssoServiceCfg.getContextPath();

String reqSsoBasePath=null;
String domainRegular="^([\\w-]+\\.)+((com)|(net)|(org)|(gov\\.cn)|(info)|(cc)|(com\\.cn)|(net\\.cn)|(org\\.cn)|(name)|(biz)|(tv)|(cn)|(mobi)|(name)|(sh)|(ac)|(io)|(tw)|(com\\.tw)|(hk)|(com\\.hk)|(ws)|(travel)|(us)|(tm)|(la)|(me\\.uk)|(org\\.uk)|(ltd\\.uk)|(plc\\.uk)|(in)|(eu)|(it)|(jp))$";

Pattern domainPattern = Pattern.compile(domainRegular);
Matcher domainMatcher = domainPattern.matcher(request.getServerName());
boolean isDomain=domainMatcher.matches();

if(deployWay.equals(ssoServiceCfg.SINGLE_HOST))
{
	reqSsoBasePath = scheme+"://"+request.getServerName()+"/"+contextPath+"/";
}
else if(isDomain)
{
	reqSsoBasePath=scheme+"://"+serverName+"/"+contextPath+"/";
}
else if(deployWay.equals(ssoServiceCfg.MULTI_HOST))
{
	String[] clientIPStages=request.getServerName().split("\\.");

	if(serverName.startsWith(clientIPStages[0]+"."))
	{
		reqSsoBasePath=scheme+"://"+serverName+"/"+contextPath+"/";
	}
	if(vpnServerName!=null && !vpnServerName.trim().equals("") && vpnServerName.startsWith(clientIPStages[0]+"."))
	{
		reqSsoBasePath=scheme+"://"+vpnServerName+"/"+contextPath+"/";
	}	
}
String gjpt = request.getServerName().split("\\.")[0];
response.sendRedirect(reqSsoBasePath+"logout?gjpt="+gjpt);
%>
