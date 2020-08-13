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
<html lang="en" class="bg-white">
<head>
<title>教师空间</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

<script src="<%=path %>/script/jquery.js"></script>
<script src="<%=path %>/script/jquery-migrate-ada.js"></script>

<link href="<%=path %>/space/module/ydqt/css/global.css" rel="stylesheet" type="text/css"/>
<link href="<%=path %>/space/module/ydqt/css/top_foot.css" rel="stylesheet" type="text/css"/>
<link href="<%=path %>/space/module/ydqt/css/qtong.css" rel="stylesheet" type="text/css"/>
<link href="<%=path %>/space/module/ydqt/style/font_quan.css" rel="stylesheet" type="text/css"/>

<script src="<%=path %>/space/script/common.js?r=<%=dayStamp %>" type="text/javascript"></script>

<script src="<%=path %>/space/script/artDialog.js?skin=default" type="text/javascript"></script>

<script src="<%=path%>/script/util.js?r=<%=dayStamp %>" type="text/javascript"></script>
<script src="<%=path %>/script/userspace.js?r=<%=dayStamp %>" type="text/javascript"></script>
<script src="<%=path%>/common/config.jsp?r=<%=dayStamp %>&showip=1" type="text/javascript"></script>
<script src="<%=path%>/script/common.jsp?r=<%=dayStamp %>&setHeight=1500" type="text/javascript"></script>
<script type="text/javascript" src="<%=path %>/space/module/ydqt/js/koala.min.1.5.js"></script>
<script type="text/javascript" src="<%=path %>/space/module/ydqt/js/html5shiv.min.js"></script>
<script type="text/javascript" src="<%=path %>/space/module/ydqt/js/tab.js"></script>
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
	//userspace.showFocusImg("D1pic1","D1fBt","CMS.JSON.A01074015002001",6,"<div class=\"fcon\" style=\"display: none;\"> <a href=\"~url~\" target=\"~target~\"><img src=\"~img~\" style=\"opacity: 1; \"></a><span class=\"shadow\"><a target=\"~target~\" href=\"~url~\">~text~</a></span></div>");
	
	//每日推荐
	//userspace.showTeacherMeirituijian("tuijian","CMS.JSON.A01074016003",3,1,"<li><a href=\"~url~\" target=\"~target~\">~text~</a></li>");
	//初始化及展示我的应用
	//showMyUse();
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
	 
	var tjmodule='<li><a href="~url~" target="_blank" >~text~</a><time>~date~</time></li>';// class="mode-blue"
	util.getCommonCMS("xiaoxue_tj_ul","CMS.JSON.A01045001004001",6,0,tjmodule,true);
	util.getCommonCMS("chuzhong_tj_ul","CMS.JSON.A01045001004002",6,0,tjmodule,true);
	util.getCommonCMS("gaozhong_tj_ul","CMS.JSON.A01045001004003",6,0,tjmodule,true);
	
	//焦点图
	var loopindex=0;
	util.getCommonCMS("D1pic1","CMS.JSON.A01074015002001",6,0,'<div class="fcon" style="display: none;"><a target="_blank" href="~url~"><img src="~img~" style="opacity: 1; "></a><span class="shadow"><a target="_blank" href="~url~">~text~</a></span></div>',true,function(code,data){
		loopindex++;
		try{
			$("#D1fBt").append('<a href="javascript:void(0)" hidefocus="true" target="_self" class=""><i>'+loopindex+'</i></a>');
		}catch(e){}
		bannerInit();
		return code;
	});
	//左侧栏目加载
	//showLeft();
	//显示左侧专题推荐图片
	//userspace.showZTimg();
	//班级空间红点
	//userspace.classMessage();
	//站内通知
	//userspace.showNotice();
	
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
<body class="bg-white">
<div class="w1200">
  <div id="fsD1" class="focus qtong H-sy">
        <div id="D1pic1" class="fPic">
            <div class="fcon" style="display: none;">
                <a target="_blank" href="#"><img src="../img/qtong/tempSliderImg1.jpg" style="opacity: 1; "></a>
                <span class="shadow"><a target="_blank" href="#">数据加载</a>
            </span>
            </div>
        </div>
        <div class="fbg">
            <div class="D1fBt" id="D1fBt"><!-- a href="javascript:void(0)" hidefocus="true" target="_self" class="current"><i>3</i></a  -->
            </div>
        </div>
        <span class="prev"></span>
        <span class="next"></span>
    </div>

    <!-- 代码 结束 -->


    <div class="clearfix"></div>
    <div class="clBox">
        <article class="clFunBox">
            <h3>我的应用<span></span></h3>
            <div class="clearfix"></div>
            <div class="clFunList">
                <a href="#"  onclick="util.gotoIcode('PLS','PLS.TEACHER.APP_6');return false;">
                    <figure>
                        <img src="<%=path %>/space/module/ydqt/images/qtong/jasj_icon.png" alt="">
                        <figcaption>教案设计</figcaption>
                    </figure>
                </a>
                <a href="#"  onclick="util.gotoIcode('PLS','PLS.TEACHER.APP_1');return false;">
                    <figure>
                        <img src="<%=path %>/space/module/ydqt/images/qtong/kqyx_icon.png" alt="">
                        <figcaption>课前预习</figcaption>
                    </figure>
                </a>
                <a href="#"  onclick="util.gotoIcode('PLS','PLS.TEACHER.APP_2');return false;">
                    <figure>
                        <img src="<%=path %>/space/module/ydqt/images/qtong/ktjx_icon.png" alt="">
                        <figcaption>课堂教学</figcaption>
                    </figure>
                </a>
                <a href="#" onclick="util.gotoIcode('QBMS','QBMS.TEACHER.APP_3');return false;" >
                    <figure>
                        <img src="<%=path %>/space/module/ydqt/images/qtong/stlx_icon.png" alt="">
                        <figcaption>随堂训练</figcaption>
                    </figure>
                </a>
                <a href="#" onclick="util.gotoIcode('QBMS','QBMS.TEACHER.APP_4');return false;" >
                    <figure>
                        <img src="<%=path %>/space/module/ydqt/images/qtong/khzy_icon.png" alt="">
                        <figcaption>课后作业</figcaption>
                    </figure>
                </a>
                <a href="#" onclick="util.gotoIcode('PLS','PLS.TEACHER.APP_5');return false;" >
                    <figure>
                        <img src="<%=path %>/space/module/ydqt/images/qtong/jxyp_icon.png" alt="">
                        <figcaption>教学云盘</figcaption>
                    </figure>
                </a>
            </div>
        </article>
    </div>
    <div class="clBox">
        <div class="clBox_con fl">
            <h3>我的班级<span></span></h3>
            <div class="clbox_con_school">

                <div class="kuang">
                    <a href="#" onclick="util.newPortalOpen('ILEARN.CLASSGROUP.TEACHER');return false;">
                        <p>班级空间</p>
                        <p><i class="fa fa-long-arrow-right" aria-hidden="true"></i></p>
                    </a>
                </div>

                <img src="<%=path %>/space/module/ydqt/images/qtong/h-bj.png" width="352" height="240" alt=""/></div>
        </div>
        <div class="clBox_con fr">
            <h3>家校互动<span></span></h3>
            <div class="cl_ico_wrap">
                <ul>
                    <li><a href="#" onclick="util.newPortalOpen('WEBMAIL.SENDMSSAGE');return false;">
                    <img src="<%=path %>/space/module/ydqt/images/qtong/jx-ico-1.png" alt="">
                        <p>收发消息</p>
                    </a></li>
                    <li><a href="#" onclick="util.newPortalOpen('WEBMAIL.MSSAGE')">
                    <img src="<%=path %>/space/module/ydqt/images/qtong/jx-ico-2.png" alt="">
                        <p>未读消息</p>
                    </a></li>
                    <li><a href="#" onclick="util.newPortalOpen('CJGL.SCOREMANAGE')">
                    <img src="<%=path %>/space/module/ydqt/images/qtong/jx-ico-3.png" alt="">
                        <p>成绩管理</p>
                    </a></li>
                    <li><a href="#" onclick="util.newPortalOpen('WEBMAIL.001')">
                    <img src="<%=path %>/space/module/ydqt/images/qtong/jx-ico-4.png" alt="">
                        <p>请假审批</p>
                    </a></li>
                    <li><a href="#" onclick="util.newPortalOpen('QBMS.OFFLINE')">
                    <img src="<%=path %>/space/module/ydqt/images/qtong/jx-ico-5.png" alt="">
                        <p>离线作业</p>
                    </a></li>
                </ul>
            </div>

        </div>
    </div>
    <div class="clearfix"></div>
    <div class="clBox" id="clRecommendList">
        <ul class="clTabTitleBox">
            <li class="active">小学推荐<span></span></li>
            <li>初中推荐<span></span></li>
            <li>高中推荐<span></span></li>
        </ul>
        <div class="clTabContentBox">
            <ul id="xiaoxue_tj_ul">
                <li class="mode-blue"><a href="#">数据加载中...</a>
                    <time>...</time>
                </li>
            </ul>
            <ul id="chuzhong_tj_ul">
				<li class="mode-blue"><a href="#">数据加载中...</a>
                    <time>...</time>
                </li>
            </ul>
            <ul id="gaozhong_tj_ul">
                <li class="mode-blue"><a href="#">数据加载中...</a>
                    <time>...</time>
                </li>
            </ul>
        </div>


    </div>
    <div class="clearfix"></div>
</div>

<script>
	var bannerInitCount =0;
	function bannerInit(){
		if(bannerInitCount==0){
			setTimeout(bannerFlash,300);
			bannerInitCount=1;
		}
	}
	/*幻灯片，开始*/
	function bannerFlash(){
	    //幻灯片
	    Qfast.add('widgets', {path: "<%=path %>/space/module/ydqt/js/terminator2.2.min.js", type: "js", requires: ['fx']});
	    Qfast(false, 'widgets', function () {
	        K.tabs({
	            id: 'fsD1',   //焦点图包裹id
	            conId: "D1pic1",  //** 大图域包裹id
	            tabId: "D1fBt",
	            tabTn: "a",
	            conCn: '.fcon', //** 大图域配置class
	            auto: 1,   //自动播放 1或0
	            effect: 'fade',   //效果配置
	            eType: 'click', //** 鼠标事件
	            pageBt: true,//是否有按钮切换页码
	            bns: ['.prev', '.next'],//** 前后按钮配置class
	            interval: 3000  //** 停顿时间
	        })
	    })
    }

</script>
<script>
    new tab('clRecommendList', 'clTabTitleBox', 'clTabContentBox').init('onmouseover');
</script>
</body>
</html>
<script type="text/javascript" >
<!--
	//可配置js代码段
var _type4OtherConfig="teacher";
eval(otherConfig);
loadPV(username,"<%=RCode.getRCode()%>","22.00","","");
//-->
</script>