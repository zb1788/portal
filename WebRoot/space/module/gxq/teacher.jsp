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
<title>优教班班通-教师空间-首页</title>
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
<script src="<%=path %>/script/defaultUse.js?r=<%=dayStamp %>" type="text/javascript"></script>
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
var gradename = "<%=(tuser.getGrade()!=null?tuser.getGrade().getGradeName():"")%>";//年级名称
var schoolStage="<%= mustudyStage %>";//学段
var truename = "<%=tuser.getTruename() %>";//真实姓名
var studentname="<%=student.getStudentNumber()%>";//学生名
var studyStageCode = "<%= ( (tuser.getStudyStage()!=null && tuser.getStudyStage().length>0 && tuser.getStudyStage()[0]!=null)?tuser.getStudyStage()[0].getStudyStageCode():"") %>";//学段
var studyStageArr = [];
<% for(int i=0;i<tuser.getStudyStage().length;i++){ %>
studyStageArr[<%=i%>] = "<%=tuser.getStudyStage()[i].getStudyStageName()%>"
<% } %>
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

var xiaoxueCmsZt = [];
var chuzhongCmsZt = [];
var gaozhongCmsZt = [];

var otherConfig = decodeURIComponent(decodeURIComponent(portal_config.otherConfig));
//页面加载调用
$(document).ready(function(){
	//$("#zh").html(phoneNumber);
	//$("#zh").attr("title",zh);
	//优教信使二维码
	//$(".code5").css("background-image","url(<%=Common.getInterfaceUrl(request.getServerName(),"CMS","CMS.PIC.CODE") %>)");
	//焦点图
	//userspace.showFocusImg("D1pic1","D1fBt","CMS.JSON.A01074015002001",6,"<div class=\"fcon\" style=\"display: none;\"> <a href=\"~url~\" target=\"~target~\"><img src=\"~img~\" style=\"opacity: 1; \"></a><span class=\"shadow\"><a target=\"~target~\" href=\"~url~\">~text~</a></span></div>");
    userspace.showFocusImgNew("flashimg","flashpoint","CMS.JSON.A01076001",6);
	//每日推荐
	//userspace.showTeacherMeirituijian("tuijian","CMS.JSON.A01074016003",3,1,"<li><a href=\"~url~\" target=\"~target~\">~text~</a></li>");
	//初始化及展示我的应用
	//showMyUse();
	//显示U币
	userspace.showUbNum();
	//检查签到
	// userspace.checkSign();
	//未读消息个数
     userspace.getNotreadletterCount(username);
	//搜索热词
	//userspace.showHotKey();
	//每日推荐  小初高 ，按教师具有学段显示，过滤角色
	// userspace.showTeacherTuijian();
	//左侧栏目加载
	// showLeft();
	//显示左侧专题推荐图片
	// userspace.showZTimg();
	//班级空间红点
	// userspace.classMessage();
	//站内通知
	// userspace.showNotice();
	//优币攻略
	// userspace.showUbActive();

    //显示学校名班级名
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
      $("#gradename").html(gradename);
    } catch (e) {
    }

    //优质课件
    userspace.getResFromPls(1,'yzkj','kjlist',username);
    //教学视频
    userspace.getResFromPls(2,'jxsp','splist',username);
    //精品试卷
    userspace.getResFromPls(3,'jpsj','sjlist',username);

    //云盘容量
    userspace.getYunpanPercent();

    //获取老师学科
    userspace.getTeacherSubject(username);
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
/*应用管理*/
/*
function app_more(){
	art.dialog({
		padding:0,
		title:'应用管理',
		top:'100px',
		width:800,
		content: document.getElementById('appMana'),//获取id为dTree_4层里面的内容，dTree_4层在页面下方
		lock:true,
		opacity: 0.2,
		ok: function () {
		  art.dialog({content: '选择成功!',width:380,top:'10%', padding:5, time: 1.5, lock:true, opacity: 0.2, icon: 'succeed'});
		  saveMyUse();
        return true;
    },
		cancelVal: '关闭',
    cancel: function(){
    	showMyUse();
    	return true;
    }
	});
}
*/
//-->

</script>
</head>
<body style="padding:0px;" >
<!--end w1200-->
<div id="flash">
  <div class="w1200">
    <div class="posRe">
      <div class="mask_login"></div>
      <!--黑色遮罩-->
      <div class="t_inputBox">
        <h3 id="truename"></h3>
        <p class="ti_desc" id="showSchool"></p>
        <p class="ti_desc" style="display:none;">三年级 数学</p>
        <p class="ti_btn"><a href="javascript:userspace.handleParentDom('persioncenter');" class="blue_bor mr8">个人中心</a><a href="javascript:userspace.handleParentDom('changerole');" class="blue_btn mr8">更换角色</a><a href=""
                                                                                                              class="blue_bor" onclick="userspace.handleParentDom('logoutwindow');">退出登录</a></p>
        <div class="clearfix"></div>
        <div class="ti_my">
          <p><span class="fr"><a href="javascript:util.newPortalOpen('WEBMAIL.MSSAGE');" class="blueFon">进入消息中心</a></span>我的消息 <span class="redFon" id="letterCount">0</span>条</p>
          <div class="ti_pan"><span class="fr"><a href="javascript:window.parent.channelUtil.specialNetDisk();"  class="blueFon">进入云盘</a></span>教学云盘<div class="progress-wrap">
            <div class="progress">
              <div id="percentsize" class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                <span id="yunpanpercent">0%</span> </div>
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
        <li><a href="javascript:userspace.changeChannel('22.01');" class="tebg zxbk"><span class="tit">在线备课</span><span class="con">海量精选资源 同步至每一课时 备授一体</span></a><span
                class="desc">优教资源、区域资源和我的资源自由组合<br />
								精心备好每一节课</span></li>
        <li><a href="javascript:userspace.changeChannel('22.01.05');" class="tebg zygl"><span class="newzy" style="display:none;">有新交作业</span><span class="tit">作业管理</span><span class="con">布置作业，作业批改，结果统计</span></a><span
                class="desc">老师一键发布作业，家长与学生实时接收并在线完成<br />
								平台自动完成批改和结果统计</span></li>
        <li class="mr0"><a href="javascript:userspace.changeChannel('22.14.05');" class="tebg zjzx"><span class="tit">组卷中心</span><span class="con">海量的精选试题，便捷多样的组卷模式</span></a><span
                class="desc">课堂上的小练习，阶段教学的小测试，期中期末的小冲刺<br />
								中考高考的大摸底</span></li>
        <li><a href="javascript:userspace.changeChannel('22.01.10');" class="tebg ktbg"><span class="tit">课堂报告</span><span class="con">记录课堂点滴，让您的教学成果一目了然</span></a><span
                class="desc">每一堂课的练习结果、学生表现、教学成果 <br />
								每天为您准时推送</span></li>
        <li><a href="javascript:userspace.changeChannel('22.72');" class="tebg wljy"><span class="tit">网络教研</span><span class="con">分享您的教育理念，共建优质授课方案</span></a><span
                class="desc">参加集体备课、教师评课、学科教研、精品课/赛课<br />
								分享我的教学理念，学习最新教学方法</span></li>
        <li class="mr0"><a href="javascript:userspace.changeChannel('22.71');" class="tebg ztzy"><span class="tit">专题资源</span><span class="con">各学科、全方向的备课与授课资源宝库</span></a><span
                class="desc">名师精选的各学科专题，最新的教学期刊杂志，海量的课
								外阅读资料，都是您教学上的优质宝藏</span></li>
      </ul>
    </div>

  </div>
  <div class="clearfix"></div>
  <!-- neirongtj -->
  <div class="news_jian">
    <h2 class="navtit"><span></span>精彩内容推荐<span></span></h2>
    <div class="row">
      <div class="zcol-4">
        <div class="con_wrap">
          <h3><em class="fr"><a href="javascript:userspace.changeChannel('22.01.03');">更多</a></em> <span class="line"></span>优质课件</h3>
          <dl id="yzkj">

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
          <h3><em class="fr"><a href="javascript:userspace.changeChannel('22.01.03');">更多</a></em> <span class="line"></span>教学视频</h3>
          <dl id="jxsp">

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
          <h3><em class="fr"><a href="javascript:userspace.changeChannel('22.01.03');">更多</a></em> <span class="line"></span>精品试卷</h3>
          <dl id="jpsj">

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
    <div class="tab_news_wrap">
      <ul class="tab_news" id="subjectlist">

      </ul>
    </div>
    <div class="tulist2" id="4s_0">
      <ul id="ztlist">
      </ul>
    </div>
  </div>
</div>
<div class="clearfix"></div>
<script>
  var newsTimer = null;
  var newslen = 1;
  var newsHeight = 51;
  var newsindex = 1;

  var ifstop=0;

  function newsDown() {
    ifstop=1;
    showNews(newsindex, newsHeight);
    newsindex++;
    if (newsindex >= newslen) {
      newsindex = 0;
    };
  }
  function newsUp() {
    ifstop=1;
    newsindex=newsindex-2;
    if (newsindex >= newslen) {
      newsindex = 0;
    };
    if (newsindex < 0) {
      newsindex = newslen + newsindex;
    };
    showNews(newsindex, newsHeight);
    newsindex++;
    if (newsindex >= newslen) {
      newsindex = 0;
    };
  }
  function showNews(newsindex, newsHeight) {
    var nowTop = -newsindex * newsHeight;
    $(".news_scroll ul").stop(true, true).animate({ "top": nowTop }, 500);
  }
  function _newsScroll() {
    newslen = $('.news_scroll li').length;
    showNews(newsindex, newsHeight);
    newsindex++;
    if (newsindex >= newslen) {
      newsindex = 0;
    };
  };
  $(document).ready(function () {
    newsTimer = setInterval(_newsScroll, 3000);
  });
</script>
</body>
</html>
<script type="text/javascript" >
<!--
	//可配置js代码段
var _type4OtherConfig="teacher";
loadPV(username,"<%=RCode.getRCode()%>","22.00","","");
//-->
</script>
<script src="<%=path%>/common/otherConfig.jsp?r=<%=dayStamp %>" type="text/javascript"></script>