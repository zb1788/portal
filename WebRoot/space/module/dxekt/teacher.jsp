<%@ page language="java" import="java.util.*,zzvcom.util.*,vcom.sso.pdgrant.*,vcom.sso.vo.*" pageEncoding="utf-8"%>
<%@ include file="../../screen_width.jsp" %>
<%
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
<!DOCTYPE html>
<html lang="en" >

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>教师端首页</title>
    
    <link rel="stylesheet" href="space/module/dxekt/css/public.css?r=<%=dayStamp %>">
    <link rel="stylesheet" href="space/module/dxekt/css/index.css?r=<%=dayStamp %>">
    <link rel="stylesheet" href="space/module/dxekt/css/font/iconfont.css?r=<%=dayStamp %>">

	<script src="<%=path %>/script/jquery.js"></script>
	<script src="<%=path %>/script/jquery-migrate-ada.js"></script>
    <script src="<%=path %>/space/module/dxekt/js/public.js"></script>
    <script src="<%=path %>/space/module/dxekt/js/index.js"></script>
    <script src="<%=path %>/space/module/dxekt/js/vsea-imglib.js"></script>
    
<script src="<%=path %>/space/script/artDialog.js?skin=default" type="text/javascript"></script>
<script src="<%=path %>/script/defaultUse.js?r=<%=dayStamp %>" type="text/javascript"></script>
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
//页面加载调用
$(document).ready(function(){
	//$("#zh").html(phoneNumber);
	//$("#zh").attr("title",zh);
	//优教信使二维码
	//$(".code5").css("background-image","url(<%=Common.getInterfaceUrl(request.getServerName(),"CMS","CMS.PIC.CODE") %>)");
	//焦点图
	var loopindex=0;
	util.getCommonCMS("loop1","CMS.JSON.A01074015002001",6,0,'<li ~selcls~ ><a  target=\"~target~\" href="~url~"><img src="~img~" alt="~text~" ></a></li>',true,function(code,data){
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
	
	//显示U币
	//userspace.showUbNum();
	//检查签到
	//userspace.checkSign();
	//未读消息个数
	//userspace.getNotreadletterCount(username);
	//搜索热词
	//userspace.showHotKey();
	//每日推荐  小初高 ，按教师具有学段显示，过滤角色
	//userspace.showTeacherTuijian();
	var tjmodule='<li class="hover"><div class="img"><img src="" data-title="~text~" data-w="198" data-h="126" data-src="" ></div><div class="list-info"><div class="list-info-left"><a href="~url~" target="_blank" ><h4 class="info-title">~text~</h4></a><div class="into-note"><p>~desc~</p></div></div><span class="list-info-time">~date~</span></div></li>';
	util.getCommonCMS("xiaoxue_tj_ul","CMS.JSON.A01045001004001",4,0,tjmodule,true);
	util.getCommonCMS("chuzhong_tj_ul","CMS.JSON.A01045001004002",4,0,tjmodule,true);
	util.getCommonCMS("gaozhong_tj_ul","CMS.JSON.A01045001004003",4,0,tjmodule,true);
	//左侧栏目加载
	//showLeft();
	//显示左侧专题推荐图片
	//userspace.showZTimg();
	//班级空间红点
	//userspace.classMessage();
	//站内通知
	//userspace.showNotice();
	
	//我的应用切换处理
	$('.bk-r a').mouseover(function(){
		$(this).stop().animate({"top":"-140px"}, 200); 
	})
	$('.bk-r a').mouseout(function(){
		$(this).stop().animate({"top":"0"}, 200); 
	})
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
    <div class="body">
        <div class="banner">
            
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
                    <div class="left">
                        <ul>
                            <li>
                                <span>我的班级</span>
                                <ul>
                                    <li>
                                        <a href="#" onclick="util.newPortalOpen('ILEARN.CLASSGROUP.TEACHER');return false;">
                                            <i class="t-ico t-ico-01"></i>
                                            <span>班级空间</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <span>家校互动</span>
                                <ul>
                                    <li>
                                        <a href="#" onclick="util.newPortalOpen('WEBMAIL.SENDMSSAGE');return false;">
                                            <i class="iconfont">&#xe69b;</i>
                                            <span>收发信息</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onclick="util.newPortalOpen('WEBMAIL.MSSAGE')">
                                            <i class="iconfont">&#xe608;</i>
                                            <span>未读信息</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onclick="util.newPortalOpen('CJGL.SCOREMANAGE')">
                                            <i class="iconfont">&#xe624;</i>
                                            <span>成绩管理</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onclick="util.newPortalOpen('WEBMAIL.001')">
                                            <i class="iconfont">&#xe618;</i>
                                            <span>请假审批</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onclick="util.newPortalOpen('QBMS.OFFLINE')">
                                            <i class="iconfont">&#xe60d;</i>
                                            <span>离线作业</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>

                        </ul>
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
                                <span>  教师</span>
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
        <div class="main w1200">
            <div class="my-app">
                <div class="main-title">
                    <h3>我的应用</h3>
                </div>
                <!-- <img src="space/module/dxekt/teacher/img/app_img.png" alt="" class="app-img"> --> <ul>
                    <li>
                        <a href="#"  onclick="util.gotoIcode('PLS','PLS.TEACHER.APP_6');return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="<%=path%>/space/module/dxekt/img/tapp01_ico.png" alt="">
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>教案设计</h5>
                                <span>精选教案，为教师备课提供参考</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div class="app-top"  onclick="util.gotoIcode('PLS','PLS.TEACHER.APP_1');return false;">
                                <div class="img">
                                    <img src="<%=path%>/space/module/dxekt/img/tapp02_ico.png" alt="">
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>课前预习</h5>
                                <span>帮助老师有效、快速备课</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div class="app-top"  onclick="util.gotoIcode('PLS','PLS.TEACHER.APP_2');return false;">
                                <div class="img">
                                    <img src="<%=path%>/space/module/dxekt/img/tapp03_ico.png" alt="">
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>课堂教学</h5>
                                <span>精选课件，方便教师课堂授课</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#"  onclick="util.gotoIcode('QBMS','QBMS.TEACHER.APP_3');return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="<%=path%>/space/module/dxekt/img/tapp04_ico.png" alt="">
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>随堂训练</h5>
                                <span>巩固知识，学习更有效</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#"  onclick="util.gotoIcode('QBMS','QBMS.TEACHER.APP_4');return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="<%=path%>/space/module/dxekt/img/tapp05_ico.png" alt="">
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>课后作业</h5>
                                <span>轻松布置，大数据分析</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#"  onclick="util.gotoIcode('PLS','PLS.TEACHER.APP_5');return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="<%=path%>/space/module/dxekt/img/tapp06_ico.png" alt="">
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>教学云盘</h5>
                                <span>个性资源，多端共享</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="my-list" id='listEl'>
                <div class="main-title">
                    <h3>课堂推荐</h3>
                    <ul class="listIndex">
                        <li class="on">小学推荐</li>
                        <li>初中推荐</li>
                        <li>高中推荐</li>
                    </ul>
                </div>
                <div class="my-list-body listBody">
                    <!-- 小学 -->
                    <ul class="on" id="xiaoxue_tj_ul" >
                    <!--  <li class="hover">
                            <div class="img"> <img src="../res/public/tmp_img/list_cover.png" alt="" data-title="小学数学思维训练营（竞赛）【精品试卷】"></div>
                            <div class="list-info">
                                <div class="list-info-left">
                                    <a href="#">
                                        <h4 class="info-title">小学数学思维训练营（竞赛）【精品试卷】</h4>
                                    </a>
                                    <div class="into-note">
                                        <p> 随到随学 有效期 1080 天 | 总480课时 老师：刘喆,董翠玲,柳滕菲,姜文秀,陈佳祺,张军新 陈佳祺,张军新 </p>
                                    </div>
                                </div>
                                <span class="list-info-time">2017-11-13</span>
                            </div>
                        </li>
					 -->
                    </ul>
                    <!-- 初中 -->
                    <ul id="chuzhong_tj_ul">
                    </ul>
                    <!-- 高中 -->
                    <ul id="gaozhong_tj_ul">

                    </ul>
                </div>
            </div>
        </div>
    </div>
</body>
<script type="text/javascript" >
<!--
	//可配置js代码段
var _type4OtherConfig="teacher";
eval(otherConfig);
loadPV(username,"<%=RCode.getRCode()%>","22.00","","");
//-->
</script>

</html>