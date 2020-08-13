<%@ page language="java" import="zzvcom.util.Common" pageEncoding="UTF-8"%><%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String ut=null;
String toUrl=request.getParameter("url");
Cookie[] cks=request.getCookies();
for(int i = 0;cks != null && i < cks.length;i++){  
	Cookie ck = cks[i];   
    if(ck.getName().equals("ut"))
    {
    	ut=ck.getValue();
    }
}
if(ut!=null && ut.trim().length()>0 && toUrl!=null && toUrl.trim().length()>0){
	if(toUrl.indexOf("?")>0){
		toUrl=toUrl+"&ut="+ut;
	}else{
		toUrl=toUrl+"?ut="+ut;
	}
	toUrl=toUrl+"&sso="+Common.getSysUrl(request.getServerName(),"SSO")+"&portal="+java.net.URLEncoder.encode("http://"+Common.getSysUrl(request.getServerName(),"PORTAL"));
	response.sendRedirect(toUrl);
	return;
}
%>