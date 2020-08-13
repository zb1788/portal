<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="screen_width.jsp" %>
<%@page import="zzvcom.util.Common"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Long rdata = Math.round(Math.random()*10000);
String usertype=((vcom.sso.vo.AuthResult)session.getAttribute("authResult")).getUser().getUsertype();
String username=((vcom.sso.vo.AuthResult)session.getAttribute("authResult")).getUser().getUsername();

String noalert = "false";
String noalertCode = Common.noAlertCode(username,usertype);
String requestAlertCode = request.getParameter("na");
if(requestAlertCode!=null && requestAlertCode.length()==(noalertCode.length()+3) && requestAlertCode.startsWith(noalertCode)){
	noalert = "true";
}
noalertCode=noalertCode+ Math.round(Math.random()*9);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>优教班班通-家长空间-首页</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<link href="<%=path %>/space/style/common.css" rel="stylesheet" type="text/css" />
<link href="<%=path %>/space/style/home.css" rel="stylesheet" type="text/css" />
<link href="<%=path %>/space/style/lrtk.css" rel="stylesheet" type="text/css" />
<script src="<%=path %>/script/jquery.js"></script>
<script src="<%=path %>/script/jquery-migrate-ada.js"></script>
<script src="<%=path %>/script/koala.min.1.5.js" type="text/javascript"></script>
<script src="<%=path %>/script/userspace.js"></script>
<script src="<%=path%>/common/config.jsp" type="text/javascript"></script>
<script src="<%=path%>/script/common.jsp" type="text/javascript"></script>
<script type="text/javascript">
<!--
<%
	if((request.getServerName()+"").indexOf(Common.getDomain())>=0){
		out.print("document.domain = \""+Common.getDomain()+"\";");
	}
%>
var noalertCode = "<%=noalertCode%>";
var path = "<%=path %>";
var username = "<s:property value="#session.authResult.user.username"/>";//用户名
var usertype = util.getCookie("usertype");//用户类型
var localAreaCode = util.getCookie("localAreaCode").replaceAll("\"","");//地区
var gradeCode = "<s:property value="#session.authResult.user.grade.gradeCode"/>";//年级 
var schoolStage = "<s:property value="#session.authResult.user.studyStage[0].studyStageCode"/>";//学段
var classid = "<s:property value="#session.student.schoolClassId"/>";//班级id

var lastVisitTime = util.getCookie("lastVisitTime"); //上次登录时间
var screen_width_id =  util.getCookie("screen_width_id");//记录屏幕宽度cookie
var tel="<s:property value="#session.authResult.user.link" />";
var phoneNumber = util.getCookie("verifyCodePhone")=="\"\""?(username.length>11?username.substring(0,11)+'..':username):util.getCookie("verifyCodePhone");//手机号码
var zh = util.getCookie("verifyCodePhone")=="\"\""?username:util.getCookie("verifyCodePhone");//手机号码
var otherConfig = decodeURIComponent(decodeURIComponent(portal_config.otherConfig));
//页面加载调用
$(document).ready(function(){
	$("#zh").html(phoneNumber);
	$("#zh").attr("title",zh);
	$(".code5").css("background-image","url(<%=Common.getInterfaceUrl(request.getServerName(),"CMS","CMS.PIC.CODE") %>)");
	//焦点图
	userspace.showFocusImg("D1pic1","CMS.JSON.A01074015002003",4,"<div class=\"fcon\" style=\"display: none;\"> <a href=\"~url~\" target=\"~target~\"><img src=\"~img~\" style=\"opacity: 1; \"></a></div>");
	//每日推荐
	userspace.showParentMeirituijian();
});
//-->
</script>
</head>
<body>
<div class="<%=screenWidthId%>">
  <div class="home_first">
    <div class="home_l">
      <!-- 身份卡 -->
      <div class="myInfo2Parent">
        <dl>
          <dt>
            <s:if test="#session.authResult.user.headPhoto==''"> <img src="<%=path%>/space/images/default1.png" />&nbsp; </s:if>
            <s:else> <img src="<%= Common.getInterfaceUrl(request.getServerName(),"VFS","VFS.PHOTO")%><s:property value="#session.authResult.user.headPhoto" />?r=<%=rdata %>" /> </s:else>
          </dt>
          <dd>
            <label>姓名：</label>
            <span class="tit1" title="<s:property value="#session.authResult.user.truename" />">
            <s:if test="%{#session.authResult.user.truename.length()>6}">
              <s:property value="#session.authResult.user.truename.substring(0,6)+'..'"/>
            </s:if >
            <s:else>
              <s:property value="#session.authResult.user.truename" />
            </s:else>
            </span> 
            <span class="revise">
            	<a href="http://<%=Common.getSysUrl(request.getServerName(),"TMS") %>/tms/ucUser/modifyUserInfo.do" class="blue">修改></a>
            </span>
            </dd>
          <dd>
            <label>班级：</label>
            <span title="<s:property value="#session.authResult.user.schoolClasses[0].className" />">
            <s:if test="%{#session.authResult.user.schoolClasses[0].className.length()>7}">
              <s:property value="#session.authResult.user.schoolClasses[0].className.substring(0,7)+'..'"/>
            </s:if >
            <s:else>
              <s:property value="#session.authResult.user.schoolClasses[0].className" />
            </s:else>
            </span>
          </dd>
          <dd>
            <label>账号：</label>
            <span id="zh"></span> </dd>
          <dd>
            <label>学校：</label>
            <span title="<s:property value="#session.authResult.user.school.schoolName" />">
            <s:if test="%{#session.authResult.user.school.schoolName.length()>6}">
              <s:property value="#session.authResult.user.school.schoolName.substring(0,6)+'..'"/>
            </s:if >
            <s:else>
              <s:property value="#session.authResult.user.school.schoolName" />
            </s:else>
            </span>
          </dd>
        </dl>
        <ol>
          <label>新消息：</label>
          <a href="http://<%=Common.getSysUrl(request.getServerName(),"WEBMAIL") %>/src/msgInterFace.php?command=boxIndex&username=<s:property value="#session.authResult.user.username"/>&usertype=<s:property value="#session.authResult.user.usertype"/>" class="yellow" id="letterCount"></a>&nbsp;&nbsp;
          
          <br>
          <label>累计优币：</label>
          <a href="http://<%=Common.getSysUrl(request.getServerName(),"TMS") %>/tms/uc/parent/index_jf.jsp" class="yellow" id="all_point"></a>&nbsp;&nbsp;
					<label>可用优币：</label>
					<a href="http://<%=Common.getSysUrl(request.getServerName(),"TMS") %>/tms/uc/parent/index_jf.jsp" class="yellow" id="use_point"></a>
					<br>
          <label>上次登录时间：</label>
          <span id="lastVisitTime"></span>
        </ol>
      </div>
      <div class="jifen parent">
      	<span class="code5"></span>
      </div>
    </div>
    <div class="home_r">
      <!--焦点图-->
      <div class="focus_h">
        <!-- 代码 开始 -->
        <div id="fsD1" class="focus" >
          <div id="D1pic1" class="fPic"> </div>
          <div class="fbg">
            <div class="D1fBt" id="D1fBt"></div>
          </div>
          <span class="prev"></span> <span class="next"></span> </div>
        <!-- 代码 结束 -->
      </div>
      <!--end focus_h-->
      <!-- 每日推荐 -->
      <div class="today_tj parent">
        <h2 class="tjBt"><font>每日推荐</font><span class="arrow6"></span></h2>
        <dl id="tuijian_l" class="tuijian_l">
        </dl>
        <dl id="tuijian_r" class="tuijian_r">
        </dl>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</div>
<iframe id="iframe01" name="iframe01"
		src="http://<%=Common.getSysUrl(request.getServerName(),"ILEARN") %>/p_home_view.action"
		width="100%" height="400" scrolling="no" frameborder="0" style="min-width:1000px;"></iframe>
</body>
</html>
<script src="<%=path %>/script/common.js"></script>
<<script type="text/javascript">
<!--
//每日推荐特效
function tuijian_yx(){
	$(".tuijian_l > dt > a").hover(function(){
		$(this).children("span").animate( { height: "95%"}, 400);
	},function(){
		$(this).children("span").animate( { height: "22px"}, 400);
	});
	$(".tuijian_r > dt > a").hover(function(){
		$(this).children("span").animate( { height: "95%"}, 400);
	},function(){
		$(this).children("span").animate( { height: "22px"}, 400);
	});
}
/*
160531屏蔽
//从父页面获取有效期
function getExpiryDate(){
	var val=parent.expDate;
	if(val && val!=null && val!=""){
		document.getElementById("expiry_date").innerHTML=val;
	}else{
		setTimeout(getExpiryDate,1000);
	}
}
getExpiryDate();
*/
//-->
</script>
<script>
<!--
var _type4OtherConfig="parent";
		eval(otherConfig);
//-->
</script>