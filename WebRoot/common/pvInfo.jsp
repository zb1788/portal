<%@page language="java" contentType="application/javascript" pageEncoding="UTF-8" import="zzvcom.util.Common,java.util.*,java.io.*,java.net.*"%><%
try{
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

String url = java.net.URLDecoder.decode(request.getParameter("url"),"UTF-8");
url = java.net.URLDecoder.decode(request.getParameter("url"));

String icode = request.getParameter("code");

String vfsurl=Common.getSysUrl(request.getServerName(), "VFS_IP");
String url_suf = Common.PROTOCOL_IP+vfsurl+"/upload/portal/data/";

String sysurl=null;

if(null!=icode){
	sysurl=Common.getSysUrl(request.getServerName(), icode+"_IP");
}

if(sysurl==null || sysurl.trim().length()==0){
	sysurl=url_suf;
}else{
	sysurl=Common.PROTOCOL_IP+sysurl.trim();
}

if(url!=null && url.length()>0){
	String pvJson = zzvcom.util.HttpUtil.readURLByCharset(sysurl+url,null,"utf-8",3000);
	if(pvJson!=null && pvJson.trim().length()>0){
    	out.print("var pvJson="+pvJson);
    }
}else{
	out.print("var pvJson=null;");
}
}catch(Exception e){
	out.print("var pvJson=null;//Exception:"+e.getMessage());
}
%>