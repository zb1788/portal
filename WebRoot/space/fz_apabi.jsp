<%@ page language="java" import="java.util.*,zzvcom.util.DateUtil,zzvcom.util.secret.DESBase64" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
java.util.Calendar cal = java.util.Calendar.getInstance();
int zoneOffset = cal.get(java.util.Calendar.ZONE_OFFSET);
int dstOffset = cal.get(java.util.Calendar.DST_OFFSET);
cal.add(java.util.Calendar.MILLISECOND, -(zoneOffset + dstOffset));
String UTCstr = new java.text.SimpleDateFormat("yyyyMMddHH:mm").format(cal.getTime());
String username = request.getParameter("username");
String url=null;
String pwdStr="E10ADC3949BA59ABBE56E057F20F883E";//123456做32位MD5加密
if(username!=null){
	//des加密
	String code=new DESBase64().encode(username+"$apabi_vcom$"+UTCstr);
	url="http://fzqkxc.czbanbantong.com/Usp/?pid=sso&uid="+username+"&pwd="+pwdStr+"&sign="+code+"&errorurl=www.czbanbantong.com&autoreg=1";
}
if(url!=null){
	//response.sendRedirect(url);
	out.print("<script  type='text/javascript' >window.location.href='"+url+"';</script>");
}else{
	out.print("<center>处理异常。。。</center>");
}
//
%>
