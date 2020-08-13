<%@ page language="java" import="java.util.*" pageEncoding="utf-8" import="zzvcom.util.Common,net.sf.json.JSONObject,org.apache.commons.lang.StringUtils"%>
<%@page import="java.text.SimpleDateFormat"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String defmodule = "login/main/login.html";
Common.getConfigMap().get("default").get("map_module").get("default");
String moban = request.getParameter("module");//待预览模板参数
String nowmodule=((Map<String,String>)request.getAttribute("ConfigMap")).get("module");//当前域模板
String seokey=((Map<String,String>)request.getAttribute("ConfigMap")).get("seokey");//当前域关键词
String icoimg=((Map<String,String>)request.getAttribute("ConfigMap")).get("icoimg");//当前域页面图标
//随机数
String randomStr=Math.round(Math.random()*100)+""+Math.round(Math.random()*100);
//日期戳
String daystamp = new SimpleDateFormat("yyMMdd").format(new Date());
if(StringUtils.isBlank(icoimg)){
	//icoimg="yjt.ico";
	icoimg="";
}else{
	icoimg=request.getContextPath()+"/ico/"+icoimg;
}
if(seokey==null || seokey.trim().length()==0){
	seokey=Common.DEFAULT_SEO_KEY;
}
if(!StringUtils.isBlank(moban)){//模板预览
    nowmodule=moban;
}
if(StringUtils.isBlank(nowmodule)){//判空
    nowmodule=defmodule;
}
String code = Common.LOGIN_TEMPLET.get(nowmodule);
if(code==null){//判空
	code = Common.LOGIN_TEMPLET.get(defmodule);
}

String protocol=((Map<String,String>)request.getAttribute("ConfigMap")).get("LOCAL_PROTOCOL");//当前域模板

//安全修复--浏览器检查跨站攻击
response.addHeader("X-XSS-protection","1");
//安全修复--仅允许本域 iframe
response.addHeader("X-Frame-Options","SAMEORIGIN"); 
//安全修复--要求Https访问
if("https".equals(protocol) && "https".equals(request.getScheme())) {
	response.setHeader("Strict-Transport-Security" ,"max-age=86400" );
}

response.setContentType("text/html;charset=UTF-8");

out.print(code.replaceAll("[{]SEOKEY[}]",seokey).replaceAll("[{]ICOIMG[}]",icoimg).replaceAll("[{]RANDOM[}]",randomStr).replaceAll("[{]DAYSTAMP[}]",daystamp));
/*
if(!StringUtils.isBlank(nowmodule)){//模板预览
    request.getRequestDispatcher(nowmodule).forward(request,response);
}else{
    request.getRequestDispatcher(defmodule).forward(request,response);
}
*/
//out.clear();
//out = pageContext.pushBody();
%>
