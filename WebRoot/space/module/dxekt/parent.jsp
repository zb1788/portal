<%@ page language="java" import="java.util.*,zzvcom.util.*,vcom.sso.pdgrant.*,vcom.sso.vo.*" pageEncoding="utf-8"%>
<%@ include file="../../screen_width.jsp" %><%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

Long rdata = Math.round(Math.random()*10000);
String dayStamp = new java.text.SimpleDateFormat("yyMMdd").format(new Date());//日期戳

School school = null;
VSysUser tuser = null;
SchoolClass tclass = null;
String mustudyStage = (String)session.getAttribute("studyStage");
String eduAndGrade = (String)session.getAttribute("eduAndGrade");

tuser = ((AuthResult)session.getAttribute("authResult")).getUser();
String regFlg = tuser.getRegFlg();
String usertype=tuser.getUsertype();
String username=tuser.getUsername();
String truename=tuser.getTruename();

if(username!=null){
	username=username.trim();
}

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
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>优教班班通-家长空间-首页</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <link rel="stylesheet" href="space/module/dxekt/css/public.css?r=<%=dayStamp %>" />
    <link rel="stylesheet" href="space/module/dxekt/css/index.css?r=<%=dayStamp %>" />
    <link rel="stylesheet" href="space/module/dxekt/css/font/iconfont.cssr=<%=dayStamp %>" />

	<script src="<%=path %>/script/jquery.js"></script>
	<script src="<%=path %>/script/jquery-migrate-ada.js"></script>
    <script src="space/module/dxekt/js/public.js"></script>
    <script src="space/module/dxekt/js/index.js"></script>
    <script src="space/module/dxekt/js/vsea-imglib.js"></script>
<script src="<%=path %>/space/script/artDialog.js?skin=default" type="text/javascript"></script>
<script src="<%=path %>/script/defaultUse.js" type="text/javascript"></script>
<script src="<%=path%>/script/util.js?r=<%=dayStamp %>" type="text/javascript"></script>
<script src="<%=path %>/script/userspace.js?r=<%=dayStamp %>" type="text/javascript"></script>
<script src="<%=path%>/common/config.jsp?r=<%=dayStamp %>&showip=1" type="text/javascript"></script>
<script src="<%=path%>/script/common.jsp?r=<%=dayStamp %>" type="text/javascript"></script>
<script>
<!--
<%
	if((request.getServerName()+"").indexOf(Common.getDomain())>=0){
		out.print("document.domain = \""+Common.getDomain()+"\";");
	}
%>
var noalert = <%=noalert%>;
var noalertCode = "<%=noalertCode%>";
var loginUsertype =util.getCookie("loginUsertype"); //登录角色
var inputname = util.unconfoundInputName(util.getCookie("inputname")); //登录号
var localAreaCode=portal_config.areacode;
var global_basePath="<%=basePath%>";
var path = "<%=path %>";
var username="<%=username%>";//用户名
var eduYears = "<%=school.getEduYears()%>";//学制
var gradeCode = "<%= (tuser.getGrade()!=null?tuser.getGrade().getGradeCode():"") %>";//年级 
var schoolStage="<%= mustudyStage %>";//学段
var truename = "<%=tuser.getTruename() %>";//真实姓名
var studentname="<%=student.getStudentNumber()%>";//学生名
var studyStageCode = "<%= ( (tuser.getStudyStage()!=null && tuser.getStudyStage().length>0 && tuser.getStudyStage()[0]!=null)?tuser.getStudyStage()[0].getStudyStageCode():"") %>";//学段
var classid="<%=(student.getSchoolClassId()!=null)?student.getSchoolClassId():""%>";//当前学生班级ID/家长学生班级ID
var className="<%=((tclass!=null && tclass.getClassName()!=null)?tclass.getClassName():"" )%>";//当前用户班级名-仅学生有效
var studentId = "<%= student.getStudentNumber() %>";//学生id
var usertype="<%=usertype %>";//用户类型
var userAreaId="<%=tuser.getArea().getAreaId() %>";//区域id
var areaName="<%= tuser.getArea().getFullname() %>";//全路径区域名
var schoolId="<%=school.getSchoolId() %>";//学校Id
var schoolName="<%=school.getSchoolName() %>";//学校名
var areaphonenumber="<%=Common.getAreaphonenumber()%>";
var appNoGrant="<%= appNoGrant %>";//鉴权串
var GrantTip = "<%=granttip %>";//鉴权原因
var GrantReasonUrl = "<%=reasonUrl %>";//鉴权说明地址

var defaultStage = schoolStage!=""?schoolStage.split(",")[0]:"";
//var areaCode = util.getCookie("localAreaCode").replaceAll("\"","");
var SchoolAreaCode = "<%= school.getAreaId() %>";
var telNumber = "<%= tuser.getLink() %>";
//var tel="<%= tuser.getLink() %>";
var regFlg = "<%=regFlg %>";
var lastVisitTime = util.getCookie("lastVisitTime");//上次登录时间
var screen_width_id =  util.getCookie("screen_width_id");//记录屏幕宽度cookie
var phoneNumber = util.getCookie("verifyCodePhone")=="\"\""?(username.length>11?username.substring(0,11)+'..':username):util.getCookie("verifyCodePhone");//手机号码
var zh = util.getCookie("verifyCodePhone")=="\"\""?username:util.getCookie("verifyCodePhone");//手机号码

var otherConfig = decodeURIComponent(decodeURIComponent(portal_config.otherConfig));
$('#id', window.parent.document)
//页面加载调用(暂未使用170927)
$(document).ready(function(){
	//$("#zh").html(phoneNumber);
	//$("#zh").attr("title",zh);
	//优教信使二维码
	//$(".code5").css("background-image","url(<%=Common.getInterfaceUrl(request.getServerName(),"CMS","CMS.PIC.CODE") %>)");
	//每日推荐
	var tjmodule='<li class="hover"><div class="img"><img src="" alt="" data-title="~text~" data-w="198" data-h="126" data-src="" ></div><div class="list-info"><div class="list-info-left"><a href="~url~" target="_blank"><h4 class="info-title">~text~</h4></a><div class="into-note"><p>~desc~</p></div></div><span class="list-info-time">~date~</span></div></li>';
	util.getCommonCMS("p_tuijian","CMS.JSON.A01074016002",2,0,tjmodule,true);
	//焦点图
	var loopindex=0;
	util.getCommonCMS("loop1","CMS.JSON.A01074015002003",6,0,'<li ~selcls~ ><a  target=\"~target~\" href="~url~"><img src="~img~" alt="~text~" ></a></li>',true,function(code,data){
		loopindex++;
		try{
		if(loopindex==1){
			code=code.replaceAll("~selcls~","class=\"on\"");
			$("#loop2").append('<li class="on"></li>');
		}else{
			code=code.replaceAll("~selcls~","class=\"\"");
			$("#loop2").append('<li></li>');
		}
		}catch(e){}
		bannerInit();
		return code;
	});
	//初始化及展示我的应用
	//showMyUse();
	//显示U币
	//userspace.showUbNum();
	//检查签到
	//userspace.checkSign();
	//未读消息个数
	setTimeout("userspace.getNotreadletterCount('"+username+"')",100);
	//搜索热词
	//userspace.showHotKey();
	//学习加油站---同老师推荐，角色不同
	//userspace.showStudentTuijian();
	//显示左侧专题推荐图片
	//userspace.showZTimg();
	//显示作业数量和班级圈红点
	//showMyAppNum();
	//站内通知
	//userspace.showNotice();
	
	if(!util.isBlank(util.getCookie("lastVisitTime")) && util.getCookie("lastVisitTime").length==14){
		var ltimes=util.getCookie("lastVisitTime");
		$(".info-body-time").html("上次登录时间："+ltimes.substring(0,4)+"-"+ltimes.substring(4,6)+"-"+ltimes.substring(6,8)+" "+ltimes.substring(8,10)+":"+ltimes.substring(10,12));
	}
});
//鉴权提示
function grantAlert(content){
	if(util.isBlank(content)){
		if(util.isBlank(GrantTip)){
			content="很遗憾，本业务您未订购或订购已过期！暂不能进行正常访问。";
		}else{
			content=GrantTip;
			if(!util.isBlank(GrantReasonUrl)){
				content=content+"<p align=\"right\" style='padding-right:50px'><a style='text-decoration:underline' target='_blank' href='"+GrantReasonUrl+"'>查看详情</a></p>";
			}
		}
	}
	art.dialog({
		top:'100px',
		icon:'face-sad',
		padding:5,
		title:'提示信息',
		width:500,
		left:'50%',
		//提示内容
		content: '<p>'+content+'</p>',
		//开启锁屏
		lock:true,
		//锁屏遮罩透明度
		opacity: 0.1,
		ok: function () {
	      return true;
	    },
	    okVal:'确定',
	    close:function(){
	      return true;
		}
	});
}
//-->
</script>
</head>
<body>
<body>
    <div class="body">
        <div class="banner">
            <!--  -->
            <div class="banner-body">
                <!-- 幻灯片 -->
                <div class="banner-img" id="barnnerImg">
                    <ul class="banner-img-content" id="loop1">

                    </ul>
                    <ul class="banner-img-sub" id="loop2">
                    
                    </ul>
                </div>
                <div class="banner-nav">
                    <!-- 左侧导航 -->
                    <div class="banner-info-left">
                        <h4 class="title">信息栏</h4>
                        <div class="banner-info-body">
                            <div class="info-body-list">
                                <div class="info-body-new">
                                    <span class="tab">新消息：</span>
                                    <a href="#" onclick="util.newPortalOpen('WEBMAIL.MSSAGE')"><span class="txt" id="letterCount">0</span></a>
                                </div>
                            </div>
                            <div class="info-body-list">
                                <div class="info-body-time">
                                    上次登录时间： 
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 右侧个人信息 -->
                    <div class="right">
                        <div class="user">
                            <a onClick="util.gotoIcode('TMS','TMS.CENTER');return false;" href="#">
							<% if(tuser.getHeadPhoto()!=null && tuser.getHeadPhoto().trim().length()>0){ %>
				            	<img src="<%= Common.getInterfaceUrl(request.getServerName(),"VFS","VFS.PHOTO")+tuser.getHeadPhoto()%>?r=<%=Math.round(Math.random()*10000) %>" />
							<% }else{ %>
				        		<img src="<%=path%>/space/images/default1.png"  />
							<% } %>
				            </a>
                            <div class="user-info">
                                <span>Hi，<a title="<%=truename %>" onClick="util.gotoIcode('TMS','TMS.CENTER');return false;" href="#"><%=truename %></a></span>
                                <span> 欢迎来到翼课堂!</span>
                            </div>
                        </div>
                        <div class="user-note">
                            <div class="user-ID">
                                <i class="t-ico t-ico-08"></i>
                                <span>家长</span>
                            </div>
                            <div class="user-txt"> <i class="t-ico t-ico-09"></i>
                                <span title="<%= school.getSchoolName() %>"><%= school.getSchoolName() %></span>
                            </div>

                        </div>
                        <a href="#" onclick="util.gotoIcode('TMS','TMS.CENTER');return false;" class="user-center">进入个人中心</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 主体 -->
        <div class="main-parantIndex w1200">
            <div class="my-app">
                <div class="main-title">
                    <h3>我的应用</h3>
                </div>
                <!-- <img src="../res/teacher/img/app_img.png" alt="" class="app-img"> -->
                <ul>
                    <li>
                        <a href="#"  onclick="userspace.changeChannel('22.12');return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="space/module/dxekt/img/papp01.jpg" alt="" />
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>同步辅学</h5>
                                <span>个性化辅导，提升孩子学习能力</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" onclick="util.gotoIcode('ILEARN','ILEARN.CLASSGROUP.PARENT');return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="space/module/dxekt/img/papp02.jpg" alt="" />
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>班级圈</h5>
                                <span>快乐互动，健康成长</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" onclick="util.gotoIcode('TMS','TMS.TIMETABLE.PARENT');return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="space/module/dxekt/img/papp03.jpg" alt="" />
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>课程表</h5>
                                <span>我孩子的课程表</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" onclick="util.gotoIcode('CMS','CMS.PAGE.A01074010002004');return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="space/module/dxekt/img/papp04.jpg" alt="" />
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>学习辅导</h5>
                                <span>做一个有智慧合格的家长</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" onclick="util.gotoIcode('CMS','CMS.PAGE.A01074010002003');return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="space/module/dxekt/img/papp05.jpg" alt="" />
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>亲子教育</h5>
                                <span>科学教育领导者</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" onclick="util.gotoIcode('CMS','CMS.PAGE.A01074010002005');return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="space/module/dxekt/img/papp06.jpg" alt="" />
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>名师指导</h5>
                                <span>名师坐镇，培养学生自主思维能力</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="my-list">
                <div class="main-title">
                    <h3>加油学习站</h3>
                </div>
                <div class="my-list-body">
                    <ul class="on" id="p_tuijian">

                    </ul>
                </div>
            </div>
        <!-- end my-list -->
        </div>

    </div>
<script>
<!--
var _type4OtherConfig="parent";
		eval(otherConfig);
//-->
</script>