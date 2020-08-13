<%@page language="java" contentType="application/javascript" pageEncoding="UTF-8" import="zzvcom.util.Common,java.net.URLEncoder,java.util.*"%><%
String path = request.getContextPath();
String basePath = Common.PROTOCOL+request.getServerName()+path+"/";
String severname = request.getServerName();
String d=request.getParameter("domain");
String showall = request.getParameter("showip");
String redirect = request.getParameter("redirect");
String key = request.getParameter("key");

if(d!=null && d.trim().length()>0){
	severname=d;
}
//判断来源，禁止直接访问
String referer=request.getHeader("Referer");
String domain=Common.getDomain();
//别名访问被阻，需要考虑别名支持
//if(referer==null || (referer.indexOf(domain)==-1 && referer.indexOf("dataconfigs")==-1)){
if(referer==null){
	//来源异常进入404
	//request.getRequestDispatcher("../common/error_404.jsp").forward(request,response);
	response.sendError(404);
	return;
}
if("localAreaCode".equals(key)){
	String localAreaCode=null;
	Map<String,String> configMap=(Map<String,String>)request.getAttribute("ConfigMap");
	if(configMap!=null){
		localAreaCode=configMap.get("areacode");//当前平台Id
	}
	if(null==localAreaCode || localAreaCode.trim().length()==0){
		out.println("{\"status\":\"-1\",\"localAreaCode\":null}");
	}else{
		out.println("{\"status\":\"1\",\"localAreaCode\":\""+localAreaCode+"\"}");
	}
	return;
}

out.println("var basePath = '"+basePath+"';");
out.println("var path = '"+basePath+"';");

//if("1".equals(showall)){
//	String allJson=Common.toJson(severname);
//	out.println("var portalconfigcode=\""+URLEncoder.encode(allJson,"UTF-8").replaceAll("%22%3A%22","#").replaceAll("a","@").replaceAll("r","^").replace("0","&")+"\"");
//}else{
	String allJson=Common.toJson(severname);
	//移除以_IP结束，且配置内容为ip(:port){0,1}的相关配置
	String removeIpConfigJson=allJson.replaceAll(",\"([A-Z]|[0-9]|\\_|\\.){1,25}_IP\":\"((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?):{0,1}\\d{0,4}\"", "");
	//移除ip(:port){0,1}内容,所有IP都滤掉，不管是不是IP配置，可能滤掉无域名的系统
	String removeIpJson=removeIpConfigJson.replaceAll("((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?):{0,1}\\d{0,4}", "");
	out.println("var portalconfigcode=\""+URLEncoder.encode(removeIpJson,"UTF-8").replaceAll("%22%3A%22","#").replaceAll("r","^").replaceAll("0","&").replaceAll("\\.","⊙")+"\"");
//}
%>

portalconfigcode=decodeURIComponent(portalconfigcode.replaceAll("#","%22%3A%22").replaceAll("&","0").replaceAll("^","r").replaceAll("+"," ").replaceAll("⊙","."));
eval(portalconfigcode);

var protocol="<%= Common.PROTOCOL%>";
var protocol_ip="<%= Common.PROTOCOL_IP%>";
<% if(!"false".equals(redirect)){ %>
if( ("http://"==protocol  || "https://"==protocol) && window.location.protocol+"//"!=protocol){
	var rurl=window.location.href.replace(window.location.protocol+"//",protocol);
	var loopcount=0;
	while( (rurl.indexOf('<')>-1 || rurl.indexOf('>')>-1 || rurl.indexOf(';')>-1) && loopcount<10){
		rurl=rurl.replace('<',"&lt;").replace(">","&gt;").replace(";","&#59;");
		loopcount++;
	}
	//域名匹配重定向，否则不重定向；20200610取消主域判断
	//if(window.location.href.indexOf(sysconfig.PORTAL)>0){
		window.location.href=rurl;
	//}
}
<% } %>
var ubName=portal_config.ubName;
if(null==ubName || ""==ubName){
ubName="优币";
}