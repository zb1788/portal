<%@ page language="java" import="java.util.*,java.util.regex.*,zzvcom.util.Common" pageEncoding="utf-8"%>
<%!
public String getSaveStr(String str){
	if(str==null){
		return "";
	}
	Pattern pattern = Pattern.compile("^\\w+$",Pattern.CASE_INSENSITIVE);
	Matcher matcher = pattern.matcher(str);
	boolean noattack= matcher.matches();
	if(noattack){
		return str;
	}
	return "";
}
%><%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
response.setHeader("Pragma","No-Cache");
response.setHeader("Cache-Control","No-Cache");
response.setDateHeader("Expires", 0);

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
	var methodName = "<%=getSaveStr(request.getParameter("methodName"))%>";
	if(methodName != "null"){
		eval("parent.parent."+methodName+"()");
	}
	}catch(e){}
//-->
</SCRIPT>
 </BODY>
</HTML>
