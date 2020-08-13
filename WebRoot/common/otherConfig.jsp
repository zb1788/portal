<%@page language="java" contentType="text/javascript" pageEncoding="UTF-8" import="zzvcom.util.Common,java.util.*"%><%
String path = request.getContextPath();
String basePath = Common.PROTOCOL+request.getServerName()+path+"/";
String severname = request.getServerName();
String otherConfig=((Map<String,String>)request.getAttribute("ConfigMap")).get("otherConfig");
String outConfigJs=otherConfig;

%>var otherConfigUtil={
	payAlertBeforeCutPoint:function(rdata,currentuser,alerttext){return;},
	classCostCut:function(rdata){}
};
<%= outConfigJs %>