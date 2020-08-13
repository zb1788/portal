<%@ page language="java" import="zzvcom.util.Interface,java.util.regex.*" pageEncoding="UTF-8"%><%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
response.setContentType("application/json;charset=utf-8");

String referer=request.getHeader("Referer");
if(referer==null){
	//来源异常进入404
	response.sendError(404);
	return;
}

String w=request.getParameter("screen_width_id");
String a=request.getParameter("localAreaCode");
//参数校验及防攻击
if(w!=null && (w=w.trim()).length()>0 && w.trim().length()<7 && w.indexOf("w")>-1 && w.indexOf("0")>-1){
Interface.addCookie("screen_width_id", w ,response);
}
//参数校验及防攻击
if(a!=null && (a=a.trim()).length()>0 && a.trim().length()<4 && a.trim().indexOf(".")>-1){
Interface.addCookie("localAreaCode", a ,response);
}
String jsoncallback=request.getParameter("jsoncallback");
if(jsoncallback==null){
	jsoncallback="";
}
Pattern pattern = Pattern.compile("^\\w+$",Pattern.CASE_INSENSITIVE);
Matcher matcher = pattern.matcher(jsoncallback);
boolean noattack= matcher.matches();
if(!noattack){
	jsoncallback="";
}

out.print("/**/"+jsoncallback+"({r:1})");
%>
