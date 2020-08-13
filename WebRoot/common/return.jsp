<%@ page language="java" import="java.util.*,zzvcom.util.Common" pageEncoding="UTF-8"%>
<%@page import="java.net.URLDecoder"%>
<%
String path = request.getContextPath();
String basePath = request.getParameter("urlpath");
if(request.getSession().getAttribute(Common.usersessionname)==null){
	response.sendRedirect(URLDecoder.decode(basePath));
}
%>
