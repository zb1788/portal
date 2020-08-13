<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
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
  <script src="<%=basePath %>/script/base64.js" type="text/javascript"></script>
 </HEAD>

 <BODY>
  <SCRIPT LANGUAGE="JavaScript">
<!--
	try{
		var height="<%=request.getParameter("height")%>";
		var opentype="<%=request.getParameter("opentype")%>"
		var url="<%=request.getParameter("url")%>";
		var scrollto="<%=request.getParameter("scrollto")%>";
		var staturl="<%=request.getParameter("staturl")%>";
		var count="<%=request.getParameter("count")%>";
		if(height&&height!="null"){
			if(height<768)height=768;
			if(opentype==1){top.scrollTo(0,0)}
			if(height!=null)$("#iframe01",parent.parent.document).css("height",height+"px"); 
		}
		if(url&&url!="null"){
			var de=new Base64();
			url=de.decode(url);
			if(count==0)top.location=url;
			if(count==2)parent.parent.location=url;
			if(count==3)parent.parent.parent.location=url;
			if(count==4)parent.parent.parent.parent.location=url;
			if(count==5)parent.parent.parent.parent.parent.location=url;
		}
		if(scrollto&&scrollto!="null"){
			top.scrollTo(0,scrollto)
		}
		if(staturl&&staturl!="null"){
			$("#_commoniframe",top.document.body).attr("src",decodeURIComponent(staturl));
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
