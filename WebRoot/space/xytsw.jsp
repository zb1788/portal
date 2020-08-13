<%@ page language="java" import="java.util.*,zzvcom.util.*" pageEncoding="UTF-8"%>
<%@page import="vcom.sso.vo.AuthResult"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String account = zzvcom.util.Interface.getCookie("username",request);
//String realname = zzvcom.util.Interface.getCookie("truename",request);
AuthResult authResult=Common.getSessiongUser(request);
String realname = authResult.getUser().getTruename();
if(account!=null && account.trim().length()>0){
	if(realname!=null){
		realname=java.net.URLDecoder.decode(java.net.URLDecoder.decode(realname,"UTF-8"),"UTF-8");
	}else{
		realname="优教通用户";
	}
}else{
	account="";
}

String timestr = new java.text.SimpleDateFormat("yyyyMMdd").format(new Date());
String encodestr = zzvcom.util.secret.SecretUtil.SHA1(account+"TsWtOWkM-!"+timestr);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>淘师湾</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0"> 
  </head>
  
  <body>
  
    <form id="transform" action="http://api.51taoshi.com/remote/sso.action" method="post" >
    <input type="hidden" name="userName" value="<%=account %>" />
    <input type="hidden" name="realName" value="<%=realname %>" />
    <input type="hidden" name="data" value="<%= encodestr %>" />
    </form>
    <script type="text/javascript">
    document.getElementById("transform").submit();
    </script>
  </body>
</html>
