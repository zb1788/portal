<%@page import="java.net.URLEncoder"%>
<%@ page language="java" import="java.util.*,java.util.regex.*,zzvcom.util.Common" pageEncoding="utf-8"%>
<%!
public String getIntStr(String str){
	if(str==null){
		return "";
	}
	Pattern pattern = Pattern.compile("^\\d+$",Pattern.CASE_INSENSITIVE);
	Matcher matcher = pattern.matcher(str);
	boolean noattack= matcher.matches();
	if(noattack){
		return str;
	}
	return "";
}
public String getBoolStr(String str){
	if(str!=null && str.trim().length()>2 && str.trim().length()<6){
		if("true".equals(str.trim()) || "false".equals(str.trim())){
			return str;
		}
	}
	return "";
}
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
String url=request.getParameter("url");
String staturl=request.getParameter("staturl");
//判断登陆后可传递
if(staturl!=null){
	staturl=URLEncoder.encode(staturl,"utf8");
	//staturl=staturl.replaceAll(";","&#59;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}
if(url!=null){
	//url=url.replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("\"","").replaceAll(";","&#59;");
	url=URLEncoder.encode(url,"utf8");
}
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
		var height=parseInt("<%=getIntStr(request.getParameter("height"))%>");
		var minhei = parseInt("<%=getIntStr(request.getParameter("minhei"))%>");
		var changeImg = "<%=getBoolStr(request.getParameter("changeImg"))%>";
		var opentype=parseInt("<%=getIntStr(request.getParameter("opentype"))%>")
		var url=decodeURIComponent("<%=url%>");
		var scrollto="<%=getIntStr(request.getParameter("scrollto"))%>";
		var staturl=decodeURIComponent("<%=staturl%>");
		var count="<%=getIntStr(request.getParameter("count"))%>";
		if(height&&height!="null"&& height!="NaN"){
			//如果传递有最小高度，则按最小高度来显示
			if(minhei!="NaN" && minhei != 0){
				if(height<minhei)height=minhei;
			}else{
				if(height<690)height=690;
			}
			if(opentype==1){top.scrollTo(0,0)}
			if(height!=null)$("#iframe01",parent.parent.document).css("height",height+"px"); 
		}
		//跳转顶层页面
		if(url&&url!="null"){
			var de=new Base64();
			url=de.decode(url);
			if(count==0)top.location=url;
			if(count==2)parent.parent.location=url;
			if(count==3)parent.parent.parent.location=url;
			if(count==4)parent.parent.parent.parent.location=url;
			if(count==5)parent.parent.parent.parent.parent.location=url;
		}
		//滚动
		if(scrollto&&scrollto!="null"){
			top.scrollTo(0,scrollto)
		}
		//统计
		if(staturl&&staturl!="null"){
			$("#_commoniframe",top.document.body).attr("src",decodeURIComponent(staturl));
		}
		//修改头像，直接更新
		if(changeImg !=null && changeImg.trim().length()>1 ){
			var imgobj=$("#userphoto",parent.parent.document);
			if(changeImg.indexOf("?")>1){
				changeImg+="&";
			}else{
				changeImg+="?";
			}
			changeImg=changeImg+"r="+Math.round(Math.random()*10000);
			imgobj.attr("src", changeImg);
		}
		
		//$("#logparent",parent.parent.document).show();
		//$("#logmessage",parent.parent.document).attr("value",height);
		//$("#waithtml",window.top.document).show();
		//$("#maskAllall",window.top.document).show();
	}catch(e){
	}
//-->
</SCRIPT>
 </BODY>
</HTML>
