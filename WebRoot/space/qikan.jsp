<%@ page language="java" import="java.util.*,java.net.URLEncoder,zzvcom.util.secret.*,zzvcom.util.Common" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>进入期刊</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<script type="text/javascript">
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
//初始化配置
Common.initProperties(request.getServerName());
//期刊对接
/*
转向栏目参数
http://bbtrrt.vip.qikan.com/Module/MentalHealthbbt/Index.aspx   心理健康
http://bbtrrt.vip.qikan.com/Module/eBookbbt/index.aspx          电子图书
http://bbtrrtxs.vip.qikan.com/Text/Text.aspx                     学生阅览室
http://bbtrrtjs.vip.qikan.com/Text/Text.aspx                     数字阅览室
时间 = 当前时间减8小时,格式:yyyyMMddhh
接口密钥加密串：MD5(随机数+youjiaotongyuelanshi+时间)
地址：
http://bbtrrt.vip.qikan.com/content/auth.aspx?sitetype=web&account=6位随机数&username=6位随机数&Signkey=接口密钥加密串&RedirectUrl=http://bbtrrt.vip.qikan.com/Module/MentalHealthbbt/Index.aspx&LoginUrl=班班通平台首页&LogoutUrl=班班通平台首页
*/
String gotourl=null;
String authurl=null;
String protocol="http://";
String lmtype=request.getParameter("lmtype");


String requrl=request.getParameter("gotourl");


if(zzvcom.util.Interface.getCookie("ut",request)==null || zzvcom.util.Interface.getCookie("ut",request).trim().length()==0){
	lmtype=null;
}
if("xljk".equals(lmtype)){
	gotourl=protocol+"bbtrrt.vip.qikan.com/Module/MentalHealthbbt/Index.aspx";
	authurl=protocol+"bbtrrt.vip.qikan.com";
}else if("dzts".equals(lmtype)){
	gotourl=protocol+"bbtrrt.vip.qikan.com/Module/eBookbbt/index.aspx";
	authurl=protocol+"bbtrrt.vip.qikan.com";
}else if("xszy".equals(lmtype)){
	gotourl=protocol+"bbtrrtxs.vip.qikan.com/Text/Text.aspx";
	authurl=protocol+"bbtrrtxs.vip.qikan.com";
}else if("jszy".equals(lmtype)){
	gotourl=protocol+"bbtrrtjs.vip.qikan.com/Text/Text.aspx";
	authurl=protocol+"bbtrrtjs.vip.qikan.com";
}


if (requrl != null && requrl.trim().length()>0)
{
	gotourl=requrl.replaceAll("\\*\\*","?").replaceAll("@@","&");
	gotourl=URLEncoder.encode(gotourl,"GBK");
}
if(gotourl!=null){
	long ri = Math.round(Math.random()*999999);
	Calendar cal= Calendar.getInstance();
	cal.setTime(new Date());
	cal.add(Calendar.HOUR_OF_DAY, -8);
	String timestamp = new java.text.SimpleDateFormat("yyyyMMddHH").format(cal.getTime());
	String key=new MD5().getMD5ofStr(ri+"youjiaotongyuelanshi"+timestamp);
	out.println("window.location.href='"+authurl+"/content/auth.aspx?sitetype=web&account="+ri+"&username="+ri+"&Signkey="+key+"&RedirectUrl="+gotourl+"&LoginUrl="+basePath+"&LogoutUrl="+basePath+"';");
}else{
	out.println("document.write('访问错误！栏目不正确或者尚未登录！');");
}
%>
</script> 
</head>
<body>
</body>
</html>
