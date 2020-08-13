<%@ page language="java" import="java.util.*,java.text.SimpleDateFormat,java.util.Date,zzvcom.util.secret.DesPlus" pageEncoding="UTF-8"%>
<%!
public static String create(String username){
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH");//控制字符串只在一个小时内有效
	DesPlus des=null;
	try {
		des = new DesPlus("zzstxx_vcom");
		return des.encrypt(username+";"+sdf.format(new Date()));
	} catch (Exception e) {
		e.printStackTrace();
	}
	return "";
}
%>
<%
response.sendRedirect("http://iclass.zzedu.net.cn/event2-index.html?auth="+create("zzedu"));
%>