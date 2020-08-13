<%@ page language="java"  pageEncoding="GB18030"%>
<%
Cookie utCookie=new Cookie("ut",null);
utCookie.setPath("/");
utCookie.setMaxAge(0);
response.addCookie(utCookie);  
%>

