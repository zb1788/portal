<%@ page language="java" import="java.util.* , zzvcom.util.HttpUtil ,zzvcom.util.Common ,vcom.sso.vo.AuthResult" pageEncoding="GBK"%><%
String code = request.getParameter("code");
String encode = request.getParameter("encode");
String url = null;
if(encode==null || encode.trim().length()==0){
	encode="UTF-8";
}
if(code==null || code.trim().length()==0){
	out.print("{message:\"code is Null!\"}");
	return;
}
url=null;
Map map=new HashMap();
AuthResult authResult=(AuthResult)session.getAttribute("authResult");
if(authResult==null || authResult.getUser()==null){
	out.print("{message:\"authUser is Null!\"}");
	return;
}
if(code.equals("UB.SIGNIN")){
	if(authResult.getUser().getArea()==null || authResult.getUser().getArea().getAreaId()==null){
		out.print("{message:\"authUser Area or AreaId is Null!\"}");
		return;
	}
	url=Common.getInterfaceUrl(request.getServerName(),"UB_SIP","UB.SIGNIN");
	map.put("username",authResult.getUser().getUsername());
	map.put("usertype",authResult.getUser().getUsertype());
	map.put("areacode",authResult.getUser().getArea().getAreaId());
	String param="";
	Set<String> set = map.keySet();
	for (String key : set){
		if(param.trim().length()>0) param+= "&"; 
		param= param + key + "=" + java.net.URLEncoder.encode((String)map.get(key),encode);
	}
	if(url.indexOf("?")>-1){
		url=url+"&"+param;
	}else{
		url=url+"?"+param;
	}
	map.clear();
}else{
	if(code!=null && code.indexOf(".")>0){
		String sys=code.substring(0,code.indexOf("."))+"_IP";
		String tempurl=Common.getInterfaceUrl(request.getServerName(),sys,code);
		if(tempurl!=null && !"#".equals(tempurl)){
			url=tempurl;
		}
	}
}
String rout=null;
if(url!=null){
	rout=HttpUtil.readURLByCharset(url, map, encode, 4000);
}
if(rout==null){
	rout="{message:\"get result is NULL!\"}";
}
if(rout.trim().length()==0){
	rout="{message:\"net access error!\",url:'"+url+"'}";
}
out.print(rout);
%>