<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="vcom.sso.util.WebPayGrant,vcom.sso.vo.AuthResult,vcom.sso.vo.Student,zzvcom.util.Common,net.sf.json.*"%>
<%
/*
WebPayGrant webpay=new WebPayGrant(request,response);
webpay.setLoginAreaCode(request.getParameter("loginAreaCode"));
webpay.setLoginClientCode(request.getParameter("loginClientCode"));
webpay.setLoginClientType(request.getParameter("loginClientType"));
webpay.setOrderAreaCode(request.getParameter("orderAreaCode"));
webpay.setOrderClientCode(request.getParameter("orderClientCode"));
webpay.setOrderClientType(request.getParameter("orderClientType"));
webpay.setProductFreeTime(request.getParameter("productFreeTime"));
webpay.setOrderClientStage(request.getParameter("studyStageCode"));
webpay.setOrderClientGrade(request.getParameter("gradeCode"));
*/
AuthResult authResult=(AuthResult)request.getSession().getAttribute(Common.usersessionname);
String usertype= authResult.getUser().getUsertype();
String studentNum="";
if("0".equals(usertype)){
	Student student =(Student)request.getSession().getAttribute("student");
	if(student!=null){
		studentNum=student.getStudentNumber();
	}else{
		String back=zzvcom.util.Interface.getMyChildren(request.getServerName(),authResult);
		if(back!=null){
			JSONObject js = JSONObject.fromObject(back);
			JSONArray jsarray = JSONArray.fromObject(js.get("rtnArray"));
			if(jsarray.size()>0){
				JSONObject chidren = JSONObject.fromObject(jsarray.get(0));
				JSONObject chidrens = JSONObject.fromObject(chidren.get("student"));
				JSONObject studyStagejson = JSONObject.fromObject(chidren.get("studyStage"));
				Student tstu=(Student)chidrens.toBean(chidrens,Student.class);
				request.setAttribute("student",tstu);
				studentNum = tstu.getStudentNumber();
			}
		}
	}
}
	Map<String, String> map = Common.initProperties(request.getServerName());
	String sys = map.get("ZHIFU");
	String inter = map.get("ZHIFU.ORDER");
    if(sys!=null && inter!=null && sys.trim().length()>0 && inter.trim().length()>0){
    	String defaultPortalUrl=Common.getConfigMap().get("default").get("map_sys").get("PORTAL");
    	//支付强制http协议
    	response.sendRedirect("http://"+sys+inter+"&username="+authResult.getUser().getUsername()+"&studentNumber="+studentNum+"&portalurl="+defaultPortalUrl);
    }
//System.out.println(interutl+"PAY.ORDER&data={'username':'"+authResult.getUser().getUsername()+"','interurll':'"+interutl.replace("http://", "")+"'}");

%>
