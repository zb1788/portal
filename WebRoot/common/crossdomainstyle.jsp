<%@ page language="java" import="java.util.*,java.util.regex.*,zzvcom.util.Common" pageEncoding="utf-8"%>
<%!
public static String getChannelStr(String str){
	if(str==null)return "";
	String temp=str.replaceAll("\\.","").replaceAll("_","");
	Pattern pattern = Pattern.compile("^\\d+$",Pattern.CASE_INSENSITIVE);
	Matcher matcher = pattern.matcher(temp);
	boolean noattack= matcher.matches();
	if(noattack){
		return str;
	}
	return "";
}
%><%
String path = request.getContextPath();
response.setHeader("Pragma","No-Cache");
response.setHeader("Cache-Control","No-Cache");
response.setDateHeader("Expires", 0);
String channelid = request.getParameter("channelid").replaceAll("\\.","_");
channelid=getChannelStr(channelid);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
 <HEAD>
  <TITLE> New Document </TITLE>
  <META NAME="Generator" CONTENT="EditPlus">
  <META NAME="Author" CONTENT="">
  <META NAME="Keywords" CONTENT="">
  <META NAME="Description" CONTENT="">
<script src="<%=path %>/script/jquery.js"></script>
<script src="<%=path %>/script/jquery-migrate-ada.js"></script>
  <script src="../script/base64.js" type="text/javascript"></script>
 </HEAD>

 <BODY>
  <SCRIPT LANGUAGE="JavaScript">
<!--
	try{
		<%
	if((request.getServerName()+"").indexOf(Common.getDomain())>=0){
		out.print("document.domain = \""+Common.getDomain()+"\";");
	}
%>
		var channelid="<%=channelid%>";
		if(channelid&&channelid!="null"){
			if(channelid!=null){
				parent.parent.changechannelstyle(channelid);
				//$("#____logo",parent.parent.document).html(channelid); 
			}
		}
	}catch(e){
	}
//-->
</SCRIPT>
 </BODY>
</HTML>
