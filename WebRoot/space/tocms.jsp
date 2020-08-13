<%@ page language="java" import="java.util.*,java.text.*,zzvcom.util.secret.Vcom_3DES" contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<%!
//加密outkey
private static String enCodeUser(String outkey) {
	String fday=new SimpleDateFormat("yyyyMMddHHmm").format(new Date());
	String suffer="vcomManage_"+fday;
	System.out.println(suffer+outkey);
	
	Vcom_3DES vcom3DES = new Vcom_3DES();
	vcom3DES.setKeyStr("vcomnryyvcomnryyvcomnryy");
	vcom3DES.setIsEncrypt(1);
	vcom3DES.setMessage(suffer+outkey);
	String key = vcom3DES.Vcom3DESChiper();
	
	return key+fday.substring(fday.length()-4);
}
%>
<%

String ut=zzvcom.util.Interface.getCookie("ut",request);
if(ut==null || ut.trim().length()==0){
	//out.println("权限错误！！！");
	//return;
}

String outkey="tcnVshjc";
String cmsUrl="http://cms.czbanbantong.com:8080/cms";

String key=enCodeUser(outkey);
response.sendRedirect(cmsUrl+"/secLogin.action?key="+key);
%>