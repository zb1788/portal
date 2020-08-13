<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String usertype = request.getParameter("usertype");
String zc = null;
if("student".equals(usertype)){
    zc = "http://jyk.yjt361.com/index_st.jsp";
}else if("teacher".equals(usertype)){
    zc = "http://jyk.yjt361.com/index_te.jsp";
}
if(zc!=null){
    response.sendRedirect(zc);
}else{
    out.println("跳转注册页面地址不存在！");
}
%>
