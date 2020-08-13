<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*,zzvcom.util.secret.*,zzvcom.util.*,vcom.sso.vo.*,vcom.sso.pdgrant.*,zzvcom.entity.TreeForm,net.sf.json.JSONObject,java.text.SimpleDateFormat,javax.servlet.http.HttpServletRequest"%>
<%!
public boolean checkAreaLeavl(TreeForm tf,int al){
	boolean alr=true;
	if(al>0 && tf.getC4()!=null && tf.getC4().indexOf("areaLeavl")>-1){
		JSONObject c4Json = JSONObject.fromObject(tf.getC4());
		try{
			if((Integer)c4Json.get("areaLeavl")!=al)alr=false;
		}catch(Exception e){}
	}
	return alr;
}
%><%
response.setHeader("Pragma", "No-Cache");
response.setHeader("Cache-Control", "No-Cache");
response.setDateHeader("Expires", 0);
String path = request.getContextPath();
String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
String ip = request.getHeader("x-forwarded-for"); 
if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {   
    ip = request.getHeader("Proxy-Client-IP");
}   
if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {   
    ip = request.getHeader("WL-Proxy-Client-IP");   
}
if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {   
    ip = request.getRemoteAddr();
}
String date = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date());
Long rdata = Math.round(Math.random()*10000);
String dayStamp = new java.text.SimpleDateFormat("yyMMddHHmmss").format(new Date());//日期戳
//4学生，0家长
School school = null;
VSysUser tuser = null;
SchoolClass tclass = null;
String mustudyStage = (String)session.getAttribute("studyStage");
if(mustudyStage==null){
	mustudyStage="";
}
String eduAndGrade = (String)session.getAttribute("eduAndGrade");

tuser = ((AuthResult)session.getAttribute("authResult")).getUser();
String regFlg = tuser.getRegFlg();
String usertype=tuser.getUsertype();
String username=tuser.getUsername();
String truename=tuser.getTruename();
school = tuser.getSchool();
if(tuser.getSchoolClasses()!=null && tuser.getSchoolClasses().length>0){
	tclass = tuser.getSchoolClasses()[0];
}
Student student = ((Student)session.getAttribute("student"));
String noalert = "false";
String noalertCode = Common.noAlertCode(username,usertype);
String requestAlertCode = request.getParameter("na");
if(requestAlertCode!=null && requestAlertCode.length()==(noalertCode.length()+3) && requestAlertCode.startsWith(noalertCode)){
	noalert = "true";
}
noalertCode=noalertCode+ Math.round(Math.random()*9);


ProductGrantUtil pdGrantUtil=new ProductGrantUtil();
ProductGrantRtn grantObj=pdGrantUtil.getProductGrant(request);
String granttip = grantObj.getTip();
String reasonUrl = grantObj.getReasonUrl();
String appNoGrant=null;
if(grantObj!=null){
	List<String> noGrantarr=grantObj.getAppNumbersNoGrant();
	appNoGrant=StringUtil.listToString(noGrantarr);
	if(appNoGrant!=null){
		appNoGrant=appNoGrant.replaceAll("\\r","").replaceAll("\\n","");
	}
}
//地区层级
int areaLeavl=0;
try{
areaLeavl=tuser.getArea().getAreaId().split("\\.").length;
}catch(Exception e){
}
%><%
		if((request.getServerName()+"").indexOf(Common.getDomain())>=0){
			out.print("document.domain = \""+Common.getDomain()+"\";");
		}
	%>
	var global_basePath="<%=basePath%>";
	var ip="<%=ip%>";
	var noalert = <%=noalert%>;
	var noalertCode = "<%=noalertCode%>";
	var loginUsertype =util.getCookie("loginUsertype"); //登录角色
	var inputname = util.unconfoundInputName(util.getCookie("inputname")); //登录号
	var localAreaCode=portal_config.areacode;//平台
	var username="<%=username%>";//帐户名
	var usertype="<%=usertype %>";
	var usercode="<%=tuser.getAccount() %>";
	var studentId = "<%= student.getStudentNumber()!=null?student.getStudentNumber():"" %>";//学生id
	var eduYears = "<%=(school!=null)?school.getEduYears():""%>";//学制
	var gradeCode = "<%= (tuser.getGrade()!=null?tuser.getGrade().getGradeCode():"") %>";//年级 
	var studentname="<%=student.getStudentNumber()%>";//学生名
	var studyStageCode = "<%= ( (tuser.getStudyStage()!=null && tuser.getStudyStage().length>0 && tuser.getStudyStage()[0]!=null)?tuser.getStudyStage()[0].getStudyStageCode():"") %>";//学段
	var classid="<%=(student.getSchoolClassId()!=null)?student.getSchoolClassId():""%>";//当前学生班级ID/家长学生班级ID
	var className="<%= ((tclass!=null && tclass.getClassName()!=null)?tclass.getClassName():"" )%>";//当前用户班级名-仅学生有效
	var truename = "<%=tuser.getTruename() %>";
	var userAreaId="<%=tuser.getArea().getAreaId() %>";//区域id
	var areaName="<%= tuser.getArea().getFullname() %>";//全路径区域名
	var schoolId="<%=(school!=null)?school.getSchoolId():"" %>";//学校Id
	var schoolStage="<%= mustudyStage %>";//学段
	var schoolName="<%=(school!=null)?school.getSchoolName():"" %>";
	var vcom3dsusername="<%= tuser.getNickname() %>";
	var boundphone="<%=Common.getBoundphone()%>";//是否需要下发验证码
	var phoneusertype="<%=Common.getPhoneusertype()%>";//需要下方验证码角色
	var phoneActiveState="<%=tuser.getPhoneActiveState()%>";//是否绑定
	var vsms_day="<%=Common.getVsms_day()%>";//验证码多少天下发一次
	var __date="<%=date%>";//当前系统日志
	var repeatCheckTime="<%=Common.getRepeatCheckTime()%>";//检查重复登录时间
	var notcheckuser="<%=Common.getNotcheckuser()%>";//不需要验证的用户
	var areaphonenumber="<%=Common.getAreaphonenumber()%>";
	var alerttype=<%=Common.getAlerttype()%>;
	var repeatUsertype=<%=Common.getRepeatUsertype()%>;
	var cookieid="<%=RCode.getRCode()%>";
	var channelid="";//request获取id参数，替换_为.暂时移除此逻辑
	var ___icode="<%=request.getSession().getAttribute("vicode")%>";
	var mychidrenjson=null;
	var codeType = "";//验证码获取类型："temp":临时,"phone":短信
	var noCheckCountUsed = 0;//已验证次数
	var tempCodeCount=<%=Common.getTempCodeCount()%>;//系统设置的每月获取临时验证码的次数
	var phoneNumber = util.getCookie("verifyCodePhone");//手机号码
	var paytype= <%=Common.getPaytype()%>;//1，在线支付，2订购支付，3，匹配运营商在线支付。
	//读取cookie中 phoneBuyAble=true 手机订购 =false支付订购
	var phoneBuyAble = util.getCookie("phoneBuyAble");
	var screen_width_id =  util.getCookie("screen_width_id");//记录屏幕宽度cookie
	var otherConfig = decodeURIComponent(decodeURIComponent(portal_config.otherConfig));
	var indexlogo =  (portal_config.indexlogo!=""&&portal_config.indexlogo!="undefined")?portal_config.indexlogo:"logo.png";
	var appNoGrant= "<%=appNoGrant %>";
	//订购提醒信息
	var areamessage={};
	try{
		areamessage=<%= (Common.getAreamessage()==null || Common.getAreamessage().trim().length()==0)?"{}":Common.getAreamessage() %>;
	}catch(e){}
	var getHost = function(url) {
		var host = "null";
	  if (typeof url == "undefined"
	          || null == url)
	      url = window.location.href;
	  var regex = /.*\:\/\/([^\/|:]*).*/;
	  var match = url.match(regex);
	  if (typeof match != "undefined"
	          && null != match) {
	      host = match[1];
	  }
	  if (typeof host != "undefined"
	          && null != host) {
	      var strAry = host.split(".");
	       host=strAry[0];
	  }
	  return host;
	}
	//页面初始化事件
	$(function(){
		$("#gjpt").attr("value",getHost());
		var servename = "<%=request.getServerName()%>";
		$("#indexlogo").attr("src","//"+sysconfig.PORTAL+"/space/images/logo/"+indexlogo);
		$("#footiframe").attr("src","//"+sysconfig.CMS+interface_config["CMS.PAGE.A01022"]);
		//1、初始化用户类型
		$("#loginUsertype").attr("value",loginUsertype);
		$(".tab_login a").each(function(){
				 $(this).siblings().removeClass();
		 	 });
		 $("#"+loginUsertype).addClass("cur_5");
		 //2、只有校管理员可以切换教师
		if(usertype=="3"){
			var url = "//"+sysconfig.PORTAL+"/webindex.action?data=";
			$("#blo_2 > ul").prepend("<a href=\""+url+"\">教师空间</a>");
		}
	});
	function openSpace(type){
		if(1==type){
			window.open(protocol+sysconfig.SPACE+"/zone/?stype=1&sid="+schoolId);
		}else{
			window.open(protocol+sysconfig.SPACE+"/zone/?stype=2&sid="+userAreaId);
		}
	}