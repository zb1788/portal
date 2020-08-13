<%@ page language="java" import="java.util.*,java.io.*,java.util.regex.*,vcom.sso.*,zzvcom.util.Common" pageEncoding="GB18030"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
System.out.println("ssoLogin.jsp:ssoLogin");
response.setHeader("P3P","CP=CAO PSA OUR");
String ut=request.getParameter("ut");
String isPortal=request.getParameter("isPortal");
String sso_login_flag=request.getParameter("sso_login_flag");
String lastPath=(String)session.getAttribute("lastUrl");
if(lastPath==null)
{
	lastPath="";
}
String enLastPath=lastPath.replaceAll("'","\"");
String lastUrl=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+enLastPath;

boolean getCkNeed=true;
if(ut!=null && isPortal!=null && sso_login_flag!=null)
{
	Cookie utCk=new Cookie("ut",ut);
	utCk.setPath("/");
	response.addCookie(utCk);
	
	Cookie isPortalCk=new Cookie("isPortal",isPortal);
	isPortalCk.setPath("/");
	response.addCookie(isPortalCk);
	
	
	Cookie sso_login_flagCk=new Cookie("sso_login_flag",sso_login_flag);
	sso_login_flagCk.setPath("/");
	response.addCookie(sso_login_flagCk);
	
	getCkNeed=false;
}


//单点登录服务路径
SsoServiceCfg ssoServiceCfg=(SsoServiceCfg)application.getAttribute(SsoServiceCfg.SSO_SERVICE_CFG);
String deployWay=ssoServiceCfg.getDeployWay();
String scheme=Common.PROTOCOL.replace("://","");
String serverName=ssoServiceCfg.getServerName();
String vpnServerName=ssoServiceCfg.getVpnServerName();		
String serverPort="";
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

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title></title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    

	<%
	if(getCkNeed)
	{
	%>
	<script type="text/javascript" src="js/lib/jquery.js"></script>
	<script type="text/javascript" src="js/lib/jquery.cookie.js"></script>
	<script type="text/javascript">

	function getUt()
	{
		var myurl="<%=reqSsoBasePath%>interface/checkUt?action=getcookie";
		//alert(myurl);
		$.getJSON(myurl+"&jsoncallback=?",function(data){
		var utoJson=data.utoJson;
		//alert(utoJson);
		//alert(utoJson=='null');
		//未登录
		if(utoJson=='null')
		{
			//转到登录页面
			//alert('未登录，转到登录页面');
			top.location="<%=basePath%>ssoLoginFail.jsp";
		}
		//已登录
		else
		{
			//写认证信息
			//alert('已登录，写认证信息');
			var uto=eval('('+utoJson+')');
			
			$.cookie('ut',uto.ut,{path:'/'});
			$.cookie('isPortal',uto.isPortal);
			$.cookie('sso_login_flag','1');
			
			/*
			
			var lastUrl=$.cookie('lastUrl');
			if(lastUrl!=null)
			{
				//alert('返回上次访问的url:'+lastUrl);
				//alert($.cookie('lastUrl'));
				var startIndex=-1;
				var endIndex=-1;
				startIndex=lastUrl.indexOf('"');
				endIndex=lastUrl.lastIndexOf('"');
				//alert(startIndex+":"+endIndex);
				if(startIndex!=-1 && endIndex!=-1)
				{
				lastUrl=lastUrl.substring(startIndex+1,endIndex);
				}
				//$.cookie('lastUrl',null);
				window.location=lastUrl;
				
			}
			*/
			//setTimeout('goLastUrl()',500);
			//window.location='<%=basePath%>ssoGoLastUrl.jsp?ut='+uto.ut+'&isPortal='+uto.isPortal+'&sso_login_flag=1';
			window.location='<%=lastUrl%>';
		}
		/*
		var utoJson=data.utoJson;
		var uto=eval('('+utoJson+')');
		$.cookie('ut',uto.ut);
		$.cookie('isPortal',uto.isPortal);
		$.cookie('sso_login_flag','1');
		alert(uto.ut);
		//alert($.cookie('ut'));
		*/
		});
	}

</script>
	<%
	}
	%>
  </head>
  
  <body>
  	<%
	if(getCkNeed)
	{
	%>
	<script type="text/javascript">
	getUt();
	</script>
	<%
	}
	%>
    <!-- This is getUt JSP page. <br> -->
  </body>
</html>
