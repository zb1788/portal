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
<!DOCTYPE html>
<html lang="en">
<head>
<title>优教班班通-学生空间-首页</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>学生首页</title>
    <link rel="stylesheet" href="space/module/dxekt/css/public.css?r=<%=dayStamp %>" />
    <link rel="stylesheet" href="space/module/dxekt/css/index.css?r=<%=dayStamp %>">
    
    <!-- <script src="space/module/dxekt/js/index.js"></script> -->
    
<script src="<%=path %>/script/jquery.js"></script>
<script src="<%=path %>/script/jquery-migrate-ada.js"></script>
    
    <script src="<%=path %>/space/module/dxekt/js/vsea-imglib.js"></script> 
    <script src="<%=path %>/space/module/dxekt/js/public.js"></script>

<script src="<%=path %>/space/script/common.js?r=<%=dayStamp %>" type="text/javascript"></script>

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

//页面加载调用(暂未使用170927)
$(document).ready(function(){
	//$("#zh").html(phoneNumber);
	//$("#zh").attr("title",zh);
	//优教信使二维码
	//$(".code5").css("background-image","url(<%=Common.getInterfaceUrl(request.getServerName(),"CMS","CMS.PIC.CODE") %>)");
	var tjmodule='<li class="hover"><div class="img"><img src="" alt="" data-title="~text~" data-w="198" data-h="126" data-src="" ></div><div class="list-info"><div class="list-info-left"><a href="~url~" target="_blank" ><h4 class="info-title">~text~</h4></a><div class="into-note"><p>~desc~</p></div></div><span class="list-info-time">~date~</span></div></li>';
	var tuijian_code=null;
	if(schoolStage=="0001"){
		tuijian_code="CMS.JSON.A01045001005001";
	}else if(schoolStage=="0002"){
		tuijian_code="CMS.JSON.A01045001005002";
	}else if(schoolStage=="0003"){
		tuijian_code="CMS.JSON.A01045001005003";
	}
	util.getCommonCMS("s_tuijian",tuijian_code,2,0,tjmodule,true);
	//焦点图
	var loopindex=0;
	util.getCommonCMS("loop1","CMS.JSON.A01074015002002",6,0,'<li ~selcls~ ><a  target=\"~target~\" href="~url~"><img src="~img~" alt="~text~" ></a></li>',true,function(code,data){
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
	//setTimeout("userspace.getNotreadletterCount('"+username+"')",100);
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
	/*
	//我的应用切换处理
	$('.bk-r a').mouseover(function(){
		$(this).stop().animate({"top":"-140px"}, 200); 
	})
	$('.bk-r a').mouseout(function(){
		$(this).stop().animate({"top":"0"}, 200); 
	})
	*/
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
function HomeworkCounter(){
	this.num=0;
	this.urlflag=null;
}
var workcounter = new HomeworkCounter();
HomeworkCounter.prototype.count=function(){
	var reternnum=0;
	try{
		setTimeout('workcounter.show',3500);//容错，3.5秒后如果有接口依然没有返回，则直接显示
	}catch(e){}
	//预习作业
	util.getRemoteJson("PLS","PLS.HOMEWORK_NUM","",function(r){
		if(typeof(r.count)!="undefined" && r.count!=null ){
			workcounter.num+=Number(r.count);
			if(Number(r.count)>0){
				workcounter.urlflag=1;
			}
		}
		reternnum++;
		if(5==reternnum){
			workcounter.show();
		}
	});
	//在线作业
	util.getRemoteJson("QBMS","QBMS.HOMEWORK_NUM","",function(r){
		if(typeof(r.num)!="undefined" && r.num!=null ){
			workcounter.num+=Number(r.num);
			if(Number(r.num)>0 && (workcounter.urlflag==null || workcounter.urlflag>2)){
				workcounter.urlflag=2;
			}
		}
		reternnum++;
		if(5==reternnum){
			workcounter.show();
		}
	});
	//离线作业
	util.getRemoteJson("WEBMAIL","WEBMAIL.HOMEWORK_NUM","",function(r){
		if("1"==r.result && typeof(r.num)!="undefined" && r.num!=null ){
			workcounter.num+=Number(r.num);
			if(Number(r.num)>0 && (workcounter.urlflag==null || workcounter.urlflag>3)){
				workcounter.urlflag=3;
			}
		}
		reternnum++;
		if(5==reternnum){
			workcounter.show();
		}
	});
	//拓展作业
	util.getRemoteJson("WEBMAIL","WEBMAIL.EXPANDWORK_NUM","",function(r){
		if("1"==r.result && typeof(r.num)!="undefined" && r.num!=null ){
			workcounter.num+=Number(r.num);
			if(Number(r.num)>0 && (workcounter.urlflag==null || workcounter.urlflag>4)){
				workcounter.urlflag=4;
			}
		}
		reternnum++;
		if(5==reternnum){
			workcounter.show();
		}
	});
	//微课作业
	util.getRemoteJson("MICRO","MICRO.HOMEWORK_NUM","",function(r){	
		if(typeof(r.num)!="undefined" && r.num!=null ){
			workcounter.num+=Number(r.num);
			if(Number(r.num)>0 && workcounter.urlflag==null){
				workcounter.urlflag=5;
			}
		}
		reternnum++;
		if(5==reternnum){
			workcounter.show();
		}
	});
}
HomeworkCounter.prototype.show=function(){
	if(workcounter.num>0){
		$("#hwnum").html(workcounter.num);
		$("#hwnum").show();
	}
}
//根据第一个有数据的作业打开作业页面
function openZY(){
	if(null==workcounter.urlflag || 1==workcounter.urlflag){
		util.gotoIcode('PLS','PLS.STUDENT.APP_1_1');
	}else if(2==workcounter.urlflag){
		util.gotoIcode('ILEARN','ILEARN.STUDENT.APP_1_2');
	}else if(3==workcounter.urlflag){
		util.gotoIcode('ILEARN','ILEARN.STUDENT.APP_1_3');
	}else if(4==workcounter.urlflag){
		util.gotoIcode('PLS','PLS.STUDENT.APP_1_4');
	}else if(5==workcounter.urlflag){
		util.gotoIcode('ILEARN','ILEARN.STUDENT.APP_1_5');
	}
}
function showMyAppNum(){
	/*
    if(gradeCode=="0001" || gradeCode=="0002" || gradeCode=="0003"){
    	//英语作文批改,暂时1-3年级显示快乐学习 , 4年级及以上显示同步提分的
    	
    }else{
    	//英语作文批改,暂时1-3年级显示快乐学习 , 4年级及以上显示同步提分的
    	$("#yjjp1").hide();
    	$("#tbtf1").show();
    	$("#yjjp2").hide();
    	$("#tbtf2").show();
    	
    }
    */
    workcounter.count();
	userspace.classMessage();
}
//-->
</script>
</head>
<body >
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
                    <div class="left">
                        <ul>
                            <li>
                                <span>互动学习</span>
                                <ul>
                                    <li>
                                        <a href="#" onclick="util.newPortalOpen('ILEARN.SCORE')">
                                            <i class="t-ico t-ico-01"></i>
                                            <span>成绩</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onclick="util.newPortalOpen('ILEARN.TEACHERMESSAGE')">
                                            <i class="t-ico t-ico-02"></i>
                                            <span>教师消息</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onclick="util.newPortalOpen('ILEARN.PARENTSAY')">
                                            <i class="t-ico t-ico-03"></i>
                                            <span>爸妈对我说</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onclick="util.newPortalOpen('ILEARN.STUDENTSAY')">
                                            <i class="t-ico t-ico-04"></i>
                                            <span>同学对我说</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onclick="util.newPortalOpen('ILEARN.OTHERSAY')">
                                            <i class="t-ico t-ico-05"></i>
                                            <span>我想对他说</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onclick="util.newPortalOpen('ILEARN.TEAMSTUDY')">
                                            <i class="t-ico t-ico-06"></i>
                                            <span>小组学习</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onclick="util.newPortalOpen('ILEARN.MYPRODUCT')">
                                            <i class="t-ico t-ico-07"></i>
                                            <span>作品展示</span>
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
                                <span> 学生</span>
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
                <!-- <img src="../res/student/img/app_img.png" alt="" class="app-img"> -->
                <ul>
                    <li>
                        <a href="#" onclick="openZY();return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="space/module/dxekt/img/sapp01.png" alt="">
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>作业</h5>
                                <span>贴合教学，作业更高效</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" onclick="util.gotoIcode('PLS','PLS.STUDENT.APP_2');return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="space/module/dxekt/img/sapp02.png" alt="">
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>同步学习</h5>
                                <span>打好基础知识，快速提高学习成绩</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" onclick="util.gotoIcode('MICRO','MICRO.STUDENT.APP_3');return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="space/module/dxekt/img/sapp03.png" alt="">
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>名师翼课</h5>
                                <span>经典课程，随时随学</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" onclick="userspace.changeChannel('22.29');return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="space/module/dxekt/img/sapp04.png" alt="">
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>慧学精品</h5>
                                <span>听读，轻松快乐学</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" onclick="util.gotoIcode('ILEARN','ILEARN.STUDENT.APP_5');return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="space/module/dxekt/img/sapp05.png" alt="">
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
                        <a href="#" onclick="window.open(util.makeUrl('QBMS','QBMS.STUDENT.APP_6'));return false;">
                            <div class="app-top">
                                <div class="img">
                                    <img src="space/module/dxekt/img/sapp06.png" alt="">
                                </div>
                                <div class="round"></div>
                            </div>
                            <div class="app-info">
                                <h5>错题本</h5>
                                <span>错过，就不会再错</span>
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
                    <ul class="on" id="s_tuijian">
                        <li class="hover">
                            <div class="img"> <img src="space/module/dxekt/tmp_img/list_cover.png" alt="" data-title="小学语文思维训练营（竞赛）【精品试卷】"></div>
                            <div class="list-info">
                                <div class="list-info-left">
                                    <a href="#">
                                        <h4 class="info-title">小学语文思维训练营（竞赛）【精品试卷】</h4>
                                    </a>
                                    <div class="into-note">
                                        <p> 随到随学 有效期 1080 天 | 总480课时 老师：刘喆,董翠玲,柳滕菲,姜文秀,陈佳祺,张军新 陈佳祺,张军新 </p>
                                    </div>
                                </div>
                                <span class="list-info-time">2017-11-13</span>
                            </div>
                        </li>
                        <li class="hover">
                            <div class="img"> <img src="space/module/dxekt/tmp_img/list_cover.png" alt="" data-title="小学语文思维训练营（竞赛）【精品试卷】"></div>
                            <div class="list-info">
                                <div class="list-info-left">
                                    <a href="#">
                                        <h4 class="info-title">小学语文思维训练营（竞赛）【精品试卷】</h4>
                                    </a>
                                    <div class="into-note">
                                        <p> 随到随学 有效期 1080 天 | 总480课时 老师：刘喆,董翠玲,柳滕菲,姜文秀,陈佳祺,张军新 陈佳祺,张军新 </p>
                                    </div>
                                </div>
                                <span class="list-info-time">2017-11-13</span>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        <!-- end my-list -->
        </div>
    </div>
</body>
</html>
<script type="text/javascript" >
<!--
//可配置js代码段
var _type4OtherConfig="student";
eval(otherConfig);
loadPV(username,"<%=RCode.getRCode()%>","22.00","","");
//-->
</script>