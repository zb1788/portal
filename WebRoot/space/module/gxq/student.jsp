<%@ page language="java" import="java.util.*,zzvcom.util.*,vcom.sso.pdgrant.*,vcom.sso.vo.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path + "/";

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
<title>优教班班通-学生空间-首页</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

<link href="<%=path %>/space/module/gxq/css/global.css" rel="stylesheet" type="text/css"/>
<link href="<%=path %>/space/module/gxq/css/top_foot.css" rel="stylesheet" type="text/css"/>
<link href="<%=path %>/space/module/gxq/css/room.css" rel="stylesheet" type="text/css"/>
<link href="<%=path %>/space/module/gxq/css/gxin.css" rel="stylesheet" type="text/css"/>
<link href="<%=path %>/space/css/font_quan.css?r=<%=dayStamp %>" rel="stylesheet" type="text/css" />
<link href="<%=path %>/space/css/lrtk.css?r=<%=dayStamp %>" rel="stylesheet" type="text/css" />
<link href="<%=path %>/space/css/qiandao.css?r=<%=dayStamp %>" rel="stylesheet" type="text/css" />

<script src="<%=path %>/script/jquery.js"></script>
<script src="<%=path %>/script/jquery-migrate-ada.js"></script>
<!-- 与script目录下样式不同，不可共用 -->
<script src="<%=path %>/space/script/artDialog.js?skin=default" type="text/javascript"></script>

<script src="<%=path %>/space/script/common.js?r=<%=dayStamp %>" type="text/javascript"></script>

<script src="<%=path %>/script/koala.min.1.5.js" type="text/javascript"></script>
<script src="<%=path %>/script/jquery.easing.1.3.js" type="text/javascript"></script>
<script src="<%=path %>/script/pic_scrollplugin.0717.js" type="text/javascript"></script>
<script src="<%=path %>/script/defaultUse.js" type="text/javascript"></script>
<script type='text/javascript' src="<%=path %>/script/base64.js?r=<%=dayStamp %>"></script>
<script src="<%=path%>/script/util.js?r=<%=dayStamp %>" type="text/javascript"></script>
<script src="<%=path %>/space/module/gxq/script/userspace.js?r=<%=dayStamp %>" type="text/javascript"></script>
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
	//焦点图
	//userspace.showFocusImg("D1pic1","D1fBt","CMS.JSON.A01074015002002",6,"<div class=\"fcon\" style=\"display: none;\"> <a href=\"~url~\" target=\"~target~\"><img src=\"~img~\" style=\"opacity: 1; \"></a><span class=\"shadow\"><a target=\"~target~\" href=\"~url~\">~text~</a></span></div>");
    userspace.showFocusImgNew("flashimg","flashpoint","CMS.JSON.A01076002",6);
	//每日推荐
	//userspace.showTeacherMeirituijian("tuijian","CMS.JSON.A01074016003",3,1,"<li><a href=\"~url~\" target=\"~target~\">~text~</a></li>");
	//初始化及展示我的应用
	//showMyUse();
	//显示U币
	userspace.showUbNum();
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
	//优币攻略
	//userspace.showUbActive();
	//我的应用切换处理
	// $('.bk-r a').mouseover(function(){
	// 	$(this).stop().animate({"top":"-140px"}, 200);
	// })
	// $('.bk-r a').mouseout(function(){
	// 	$(this).stop().animate({"top":"0"}, 200);
	// })
	// //六年级以下屏蔽联考名卷，显示课堂报告
	// if(Number(gradeCode)<5){
	// 	$("#lkmj").hide();
	// 	$("#ktbg").show();
	// }

  try {
    if (truename.length > 17) {
      $("#truename").html(truename.substring(0, 16) + "..");
    } else {
      $("#truename").html(truename);
    }
    if (schoolName.length > 18) {
      $("#showSchool").html(schoolName.substring(0, 17) + "..");
    } else {
      $("#showSchool").html(schoolName);
    }
  } catch (e) {
  }


  //优质课件
  userspace.getResFromPlsByStu('RT004','mstj','kjlist');
  //教学视频
  userspace.getResFromPlsByStu('RT105','tzts','splist');
  //精品试卷
  userspace.getResFromWkByStu('zxwk','sjlist');

  //云盘容量
  userspace.getYunpanPercent();

  if(Number(gradeCode)<5){
    $("#mxmj").hide();
    $("#ktbg").show();
  }

  userspace.getStudentZt();
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
// function HomeworkCounter(){
// 	this.num=0;
// 	this.urlflag=null;
// }
// var workcounter = new HomeworkCounter();
// HomeworkCounter.prototype.count=function(){
// 	var reternnum=0;
// 	try{
// 		setTimeout('workcounter.show',3500);//容错，3.5秒后如果有接口依然没有返回，则直接显示
// 	}catch(e){}
// 	//预习作业
// 	util.getRemoteJson("PLS","PLS.HOMEWORK_NUM","",function(r){
// 		if(typeof(r.count)!="undefined" && r.count!=null ){
// 			workcounter.num+=Number(r.count);
// 			if(Number(r.count)>0){
// 				workcounter.urlflag=1;
// 			}
// 		}
// 		reternnum++;
// 		if(5==reternnum){
// 			workcounter.show();
// 		}
// 	});
// 	//在线作业
// 	util.getRemoteJson("QBMS","QBMS.HOMEWORK_NUM","",function(r){
// 		if(typeof(r.num)!="undefined" && r.num!=null ){
// 			workcounter.num+=Number(r.num);
// 			if(Number(r.num)>0 && (workcounter.urlflag==null || workcounter.urlflag>2)){
// 				workcounter.urlflag=2;
// 			}
// 		}
// 		reternnum++;
// 		if(5==reternnum){
// 			workcounter.show();
// 		}
// 	});
// 	//离线作业
// 	util.getRemoteJson("WEBMAIL","WEBMAIL.HOMEWORK_NUM","",function(r){
// 		if("1"==r.result && typeof(r.num)!="undefined" && r.num!=null ){
// 			workcounter.num+=Number(r.num);
// 			if(Number(r.num)>0 && (workcounter.urlflag==null || workcounter.urlflag>3)){
// 				workcounter.urlflag=3;
// 			}
// 		}
// 		reternnum++;
// 		if(5==reternnum){
// 			workcounter.show();
// 		}
// 	});
// 	//拓展作业
// 	util.getRemoteJson("WEBMAIL","WEBMAIL.EXPANDWORK_NUM","",function(r){
// 		if("1"==r.result && typeof(r.num)!="undefined" && r.num!=null ){
// 			workcounter.num+=Number(r.num);
// 			if(Number(r.num)>0 && (workcounter.urlflag==null || workcounter.urlflag>4)){
// 				workcounter.urlflag=4;
// 			}
// 		}
// 		reternnum++;
// 		if(5==reternnum){
// 			workcounter.show();
// 		}
// 	});
// 	//微课作业
// 	util.getRemoteJson("MICRO","MICRO.HOMEWORK_NUM","",function(r){
// 		if(typeof(r.num)!="undefined" && r.num!=null ){
// 			workcounter.num+=Number(r.num);
// 			if(Number(r.num)>0 && workcounter.urlflag==null){
// 				workcounter.urlflag=5;
// 			}
// 		}
// 		reternnum++;
// 		if(5==reternnum){
// 			workcounter.show();
// 		}
// 	});
// }
// HomeworkCounter.prototype.show=function(){
// 	if(workcounter.num>0){
// 		//$("#hwnum").html(workcounter.num);
// 		$("#hwnum").show();
// 	}
// }
// //根据第一个有数据的作业打开作业页面
// function openZY(){
// 	if(null==workcounter.urlflag || 1==workcounter.urlflag){
// 		util.gotoIcode('PLS','PLS.STUDENT.APP_1_1');
// 	}else if(2==workcounter.urlflag){
// 		util.gotoIcode('ILEARN','ILEARN.STUDENT.APP_1_2');
// 	}else if(3==workcounter.urlflag){
// 		util.gotoIcode('ILEARN','ILEARN.STUDENT.APP_1_3');
// 	}else if(4==workcounter.urlflag){
// 		util.gotoIcode('PLS','PLS.STUDENT.APP_1_4');
// 	}else if(5==workcounter.urlflag){
// 		util.gotoIcode('ILEARN','ILEARN.STUDENT.APP_1_5');
// 	}
// }
// function showMyAppNum(){
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
    // workcounter.count();
// 	userspace.classMessage();
// }
//-->
</script>

<style type="text/css">

</style>
</head>
<body style="padding:0px;" >
<div id="flash">
  <div class="w1200">
    <div class="posRe">
      <div class="mask_login"></div>
      <!--黑色遮罩-->
      <div class="t_inputBox stu">
        <h3 id="truename"></h3>
        <p class="ti_desc" id="showSchool"></p>
        <p class="ti_desc" style="display:none;">三年级 数学</p>
        <p class="ti_btn"><a href="javascript:userspace.handleParentDom('persioncenter');" class="blue_bor mr8">个人中心</a><a href="javascript:userspace.handleParentDom('changerole');" class="blue_btn mr8">更换角色</a><a href="javascript:void(0);" class="blue_bor" onclick="userspace.handleParentDom('logoutwindow');">退出登录</a></p>
        <div class="clearfix"></div>
        <div class="ti_my">
          <p><span class="fr"><a href="javascript:util.newPortalOpen('ILEARN.TEACHERMESSAGE');" class="blueFon">进入消息中心</a></span>我的消息 <span class="redFon" id="letterCount">0</span>条</p>
          <div class="ti_pan" style="display:none;"><span class="fr"><a href="javascript:window.parent.channelUtil.specialNetDisk();"  class="blueFon">进入云盘</a></span>教学云盘<div class="progress-wrap">
            <div class="progress">
              <div id="percentsize" class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 30%;">
                <span id="yunpanpercent">30%</span> </div>
            </div>
          </div>
          </div>
          <p><span class="fr"><a href="#" onclick="util.newPortalOpen('TMS.SHOWPOINT.TEACHER');" class="blueFon">优币折扣兑换</a></span>我的优币 <span class="jia_cu" id="use_point"></span></p>
        </div>
      </div>
      <!--会员信息结束-->

    </div>
    <!--end posRe-->
  </div>
  <!--end w1200-->

  <ul id="flashimg">

  </ul>
  <div class="w1200">
    <div class="flash_bar" id="flashpoint">

    </div>
  </div>

  <script>
    var currentindex = 1;
    var totalimg;

    function changeflash(i) {
      currentindex = i;
      for (j = 1; j <= totalimg; j++) {
        if (j == i) {
          $("#flash" + j).fadeIn("normal");
          $("#flash" + j).css("display", "block");
          $("#f" + j).removeClass();
          $("#f" + j).addClass("dq");
        } else {
          $("#flash" + j).css("display", "none");
          $("#f" + j).removeClass();
          $("#f" + j).addClass("no");
        }
      }
    }

    function startAm() {
      timerID = setInterval("timer_tick()", 8000);
    }

    function stopAm() {
      clearInterval(timerID);
    }

    function timer_tick() {
      currentindex = currentindex >= totalimg ? 1 : currentindex + 1;
      changeflash(currentindex);
    }
  </script>
  <!--Flash end-->

</div>
<div class="w1200">
  <div class="tese">
    <h2 class="navtit"><span></span>特色应用<span></span></h2>
    <div class="tese">
      <ul>
        <li><a href="javascript:userspace.changeChannel('22.09.01');" class="tebg zuoye"><span class="tit">作业</span><span class="con">在这里查看、完成老师布置的作业</span></a><span
                class="desc">老师布置的作业实时通知、在线完成，平台自动批改并推送给老师</span></li>
        <li><a href="javascript:userspace.changeChannel('22.09.02');" class="tebg tbkt"><span class="tit">同步课堂</span><span class="con">这里为每一节课，提供了优质的学习资料</span></a><span
                class="desc">与老师的授课安排完全一致，为每一堂课提供配套的预习探究、名师课程、在线练习、复习提升等资料</span></li>
        <li class="mr0"><a href="javascript:userspace.changeChannel('22.75.02');" class="tebg xqfx"><span class="tit">学情分析</span><span class="con">想知道哪里可能让自己在考试中被扣分吗？</span></a><span
                class="desc">优教独家测评技巧，帮您轻松发现自己的知识薄弱点，并科学提供最佳的提升方案</span></li>
        <li><a href="javascript:userspace.changeChannel('22.06');" class="tebg mswk"><span class="tit">名师微课</span><span class="con">来自名校名师的微课教程</span></a><span
                class="desc">优教特邀名师，为各科的课堂教学、重点难点、中高考复习等，录制精品微课教程并实时更新</span></li>
        <li id="mxmj"><a href="javascript:userspace.changeChannel('22.14');" class="tebg mxmj"><span class="tit">名校名卷</span><span class="con">中考、高考命题组成员亲自组卷</span></a><span
              class="desc">一线命题专家倾心命制，考点命中率高，全方位指导中高考备考，办完名校师生实测参与</span></li>
        <li id="ktbg" style="display:none;"><a href="javascript:userspace.changeChannel('22.09.03');" class="tebg mxmj"><span class="tit">课堂报告</span><span class="con">中考、高考命题组成员亲自组卷</span></a><span
              class="desc">课堂报告描述</span></li>
        <li class="mr0"><a href="javascript:util.openIcode('QBMS.STUDENT.APP_6');" class="tebg ctb"><span class="tit">错题本</span><span class="con">自动汇总，名师讲解，让错题成为得分项</span></a><span
                class="desc">课堂练习、课后作业、日常做题、课堂测验，每一个错题都为您自动汇总与管理，并提供科学的提升技巧</span></li>
      </ul>
    </div>

  </div>
  <div class="clearfix"></div>
  <!-- neirongtj -->
  <div class="news_jian stu">
    <h2 class="navtit"><span></span>精彩内容推荐<span></span></h2>
    <div class="row">
      <div class="zcol-4">
        <div class="con_wrap">
          <h3><em class="fr"><a href="javascript:userspace.changeChannel('22.09.02');">更多</a></em> <span class="line"></span>名师套卷</h3>
          <dl id="mstj">

          </dl>
          <div class="clearfix"></div>
          <div class="news_lm">
            <ul id="kjlist">

            </ul>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
      <div class="zcol-4">
        <div class="con_wrap">
          <h3><em class="fr"><a href="javascript:userspace.changeChannel('22.09.02');">更多</a></em> <span class="line"></span>拓展提升</h3>
          <dl id="tzts">

          </dl>
          <div class="clearfix"></div>
          <div class="news_lm">
            <ul id="splist">

            </ul>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
      <div class="zcol-4">
        <div class="con_wrap">
          <h3><em class="fr"><a href="javascript:userspace.changeChannel('22.06.01');">更多</a></em> <span class="line"></span>最新微课</h3>
          <dl id="zxwk">

          </dl>
          <div class="clearfix"></div>
          <div class="news_lm">
            <ul id="sjlist">

            </ul>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="write_bg">
  <h2 class="navtit"><span></span>精彩专题推荐<span></span></h2>
  <div class="w1200">
    <div class="tulist2" id="4s_0">
      <ul id="ztlist">
      </ul>
    </div>
  </div>
</div>
<div class="clearfix"></div>
</body>
</html>
<script type="text/javascript" >
<!--
//可配置js代码段
var _type4OtherConfig="student";
loadPV(username,"<%=RCode.getRCode()%>","22.00","","");
//-->
</script>
<script src="<%=path%>/common/otherConfig.jsp?r=<%=dayStamp %>" type="text/javascript"></script>