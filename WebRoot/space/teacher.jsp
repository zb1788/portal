	<%@ page language="java" import="java.util.*,zzvcom.util.*,vcom.sso.pdgrant.*,vcom.sso.vo.*" pageEncoding="utf-8"%>
<%@ include file="screen_width.jsp" %>
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

<link href="<%=path %>/space/css/global.css?r=<%=dayStamp %>" rel="stylesheet" type="text/css" />
<link href="<%=path %>/space/css/top_foot.css?r=<%=dayStamp %>" rel="stylesheet" type="text/css" />
<link href="<%=path %>/space/css/room.css?r=<%=dayStamp %>" rel="stylesheet" type="text/css" />
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
	userspace.showFocusImg("D1pic1","D1fBt","CMS.JSON.A01074015002001",6,"<div class=\"fcon\" style=\"display: none;\"> <a href=\"~url~\" target=\"~target~\"><img src=\"~img~\" style=\"opacity: 1; \"></a><span class=\"shadow\"><a target=\"~target~\" href=\"~url~\">~text~</a></span></div>");
	//每日推荐
	//userspace.showTeacherMeirituijian("tuijian","CMS.JSON.A01074016003",3,1,"<li><a href=\"~url~\" target=\"~target~\">~text~</a></li>");
	//初始化及展示我的应用
	//showMyUse();
	//显示U币
	userspace.showUbNum();
	//检查签到
	userspace.checkSign();
	//未读消息个数
	userspace.getNotreadletterCount(username);
	//搜索热词
	//userspace.showHotKey();
	//每日推荐  小初高 ，按教师具有学段显示，过滤角色
	userspace.showTeacherTuijian();
	//左侧栏目加载
	showLeft();
	//显示左侧专题推荐图片
	userspace.showZTimg();
	//班级空间红点
	userspace.classMessage();
	//站内通知
	userspace.showNotice();
	//优币攻略
	userspace.showUbActive();
	
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

function showLeft(){
    if("3"==usertype){
   		$("#noticeBom").show();
    }else{
    	$("#noticeBom").hide();
    }
}
</script>
</head>
<body style="padding:0px;" >
<div class="<%=screenWidthId%>">
  <div class="h_first">
    <div class="h_l fl">
      <div class="spaceCon">
			<div class="ybBtn"  id="ubActive" ><a >获取攻略</a></div>
			<p><span id="LoginUb"></span>&nbsp;&nbsp;<span style="cursor:pointer" onclick="util.newPortalOpen('TMS.SHOWPOINT.TEACHER');"   id="use_point" >可用优币：<strong>--</strong>个</span></p>
			<P><a href="#" onclick="util.newPortalOpen('ILEARN.CLASSGROUP.TEACHER');return false;" ><img src="space/images/classBtn.png"></a></P>
			<div class="erweima"><span class="yjxs" ></span></div>
      </div>
      <div style="z-index: 1;" class="row">
        <h1 class="hl_bt">家校互动</h1>
        <div class="jx_ico_wrap h240">
          <ul>
            <li><a onclick="util.newPortalOpen('QBMS.OFFLINE')">
              <p class="ico js_ico_6"></p>
              <p>离线作业</p>
              </a></li>
            <li><a onclick="util.newPortalOpen('WEBMAIL.SENDMSSAGE')">
              <p class="ico js_ico_1"></p>
              <p>收发信息</p>
              </a></li>
            <li><a onclick="util.newPortalOpen('WEBMAIL.MSSAGE')">
              <p class="ico js_ico_2"></p>
              <p>未读信息</p>
              </a><span class="sz" id="letterCount" style="display:none" >0</span></li>
            <li><a onclick="util.newPortalOpen('CJGL.SCOREMANAGE')">
              <p class="ico js_ico_3"></p>
              <p>成绩管理</p>
              </a></li>
            <li><a onclick="util.newPortalOpen('WEBMAIL.001')">
              <p class="ico js_ico_4"></p>
              <p>请假审批</p>
              </a></li>
            <li id="noticeBom" style="display:none" ><a onclick="util.newPortalOpen('WEBMAIL.NOTICE')">
              <p class="ico js_ico_5"></p>
              <p>通知公告</p>
              </a></li>
                <li><a onclick="util.newPortalOpen('TMS.TIMETABLE.TEACHER')">
              <p class="ico js_ico_7"></p>
              <p>我的课表</p>
              </a></li>
             <li><a onclick="util.newPortalOpen('POLL.POLLPAGE')" >
				  <p class="ico js_ico_dc"></p>
				  <p>问卷调查</p>
			</a></li>
             <li id="szpj_li" style="display:none" ><a onclick="window.open(util.makeUrl('SQES','SQES.SZPJ'));" >
				  <p class="ico js_ico_szpj"></p>
				  <p>素质评价</p>
			</a></li>
               <div class="clearfix"></div>
          </ul>
        </div>
        <div class="clearfix"></div>
        <div class="hl-adv " id="ztimgdiv" ><a href="#"><img alt="" src="<%=path %>/space/img/tu_r1_c1.png" width="292" height="130"></a><a href="#"><img alt="" src="<%=path %>/space/img/tu_r3_c1.png" width="292" height="130"></a></div>
      </div>
    </div>
    <!--end home_l-->
    
    <div class="h_r fr"> 
      <!--焦点图-->
      <div class="focus_h"> 
        <!-- 代码 开始 -->
        <div id="fsD1" class="focus">
          <div id="D1pic1" class="fPic">
          <!-- 
            <div style="display: block;" class="fcon"> <a href="#" target="_blank"><img style="filter: alpha(opacity=92); opacity: 1;" src="<%=path %>/space/img/focus1_h.jpg"></a>  </div>
            <div style="display: none;" class="fcon"> <a href="#" target="_blank"><img style="filter: alpha(opacity=100); opacity: 1;" src="<%=path %>/space/img/focus2.jpg"></a><span class="shadow"><a href="#" target="_blank">21岁超模</a></span>  </div>
             -->
          </div>
          <div class="fbg">
            <div id="D1fBt" class="D1fBt"> 
            <!-- 
            <a hideFocus="true" class="current" href="javascript:void(0)" target="_self"><i>1</i></a> <a hideFocus="true" href="javascript:void(0)" target="_self"><i>2</i></a> <a hideFocus="true" href="javascript:void(0)" target="_self"><i>3</i></a> <a hideFocus="true" href="javascript:void(0)" target="_self"><i>4</i></a>
             --> 
            </div>
          </div>
          <span class="prev"></span> <span class="next"></span> </div>
        <!-- 代码 结束 --> 
      </div>
      <!--end focus_h-->
      
    <!-- 滚动广播 start -->
    <div class="clearfix"></div>
    <div class="news"> <span class="news_qh">
       
      <p id="news_up" onclick="newsUp()" ></p>
      <p id="news_down" onclick="newsDown()" ></p>
       
      </span>
      <div class="news_tit"><i class="fa fa-bullhorn" aria-hidden="true"></i></div>
      <div class="news_scroll">
        <ul id="notice">
          <li>数据加载中...</li>
        </ul>
      </div>
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
    </div>
    <!-- 滚动广播 end -->
    
      <div class="clearfix"></div>
      <div class="row">
        <h1 class="hr_bt">教学平台</h1>
        <div class="clearfix"></div>
        <ul class=" bk_wrap new">
          <li>
            <div class="bk_wrap_con">
              <div class="bk-l  bk-bg5">
              	<a class="l_link" id="app1" href="#" onclick="userspace.changeChannel('22.01');return false;" >
                <p class="ico bk_ico_1"></p>
                <p>同步课堂</p>
                </a>
              </div>
                <div class="bk-r "> <a href="#"  onclick="$('#app1').click();return false;" target="_blank">
                <div class="toll_img"><img src="<%=path %>/space/img/bk/tbktang.jpg" /></div>
                <div class="toll_info stu-tbkt">
                  <p><span  class="bk_btn">进入应用</span></p>
                </div>
                </a></div>
            </div>
          </li>
          <li>
            <div class="bk_wrap_con">
              <div class="bk-l  bk-bg4">
              	<a class="l_link" id="app2" href="#" onclick="userspace.changeChannel('22.02');return false;" >
                <p class="ico bk_ico_2"></p>
                <p>学情分析</p>
                </a>
              </div>
              <div class="bk-r "> <a href="#"  onclick="$('#app2').click();return false;" target="_blank">
                <div class="toll_img"><img src="<%=path %>/space/img/bk/stu_r46.jpg" /></div>
                <div class="toll_info stu-bg46">
                  <p><span  class="bk_btn">进入应用</span></p>
                </div>
                </a></div>
            </div>
          </li>
          <li style="margin-right: 0;">
            <div class="bk_wrap_con">
              <div class="bk-l bk-bg3">
              	<a class="l_link" id="app3" href="#" onclick="userspace.changeChannel('22.05');return false;" >
                <p class="ico bk_ico_3"></p>
                <p>名师微课</p>
                </a>
              </div>
              <div class="bk-r "> <a href="#"  onclick="$('#app3').click();return false;" target="_blank">
                <div class="toll_img"><img src="<%=path %>/space/img/bk/stu_r1_c5.jpg" /></div>
                <div class="toll_info stu-bg3">
                  <p><span  class="bk_btn">进入应用</span></p>
                </div>
                </a></div>
            </div>
          </li>
          <li>
            <div class="bk_wrap_con">
              <div class="bk-l  bk-bg2">
              	<a class="l_link" id="app4" href="#" onclick="userspace.changeChannel('22.14');return false;" >
                <p class="ico bk_ico_4"></p>
                <p>联考名卷</p>
                </a>
              </div>
              <div class="bk-r "> <a href="#"  onclick="$('#app4').click();return false;" target="_blank">
                <div class="toll_img"><img src="<%=path %>/space/img/bk/juan.jpg" /></div>
                <div class="toll_info stu-bgjuan">
                  <p><span  class="bk_btn">进入应用</span></p>
                </div>
                </a></div>
            </div>
          </li>
          <li>
            <div class="bk_wrap_con">
              <div class="bk-l  s-bg2">
              	<a class="l_link" id="app5" href="#" onclick="userspace.changeChannel('22.15.02');return false;" >
                <p class="ico bk_ico_bd"></p>
                <p>学科教研</p>
                </a>
              </div>
              <div class="bk-r "> <a href="#"  onclick="$('#app5').click();return false;" target="_blank">
                <div class="toll_img"><img src="<%=path %>/space/img/bk/bendi.png" /></div>
                <div class="toll_info tu-bg5g">
                  <p><span  class="bk_btn">进入应用</span></p>
                </div>
                </a></div>
            </div>
          </li>
          <li style="margin-right: 0;">
            <div class="bk_wrap_con">
              <div class="bk-l  bk-bg1">
              	<a class="l_link" id="app6" href="#" onclick="userspace.changeChannel('22.01.10');return false;" >
                <p class="ico bk_ico_6"></p>
                <p>课堂报告</p>
                </a>
              </div>
               <div class="bk-r "> <a href=" #"  onclick="$('#app6').click();return false;" target="_blank">
                <div class="toll_img"><img src="<%=path %>/space/img/bk/bk_r1_c3.png" /></div>
                <div class="toll_info tu-bg2">
                  <p><span  class="bk_btn">进入应用</span></p>
                </div>
                </a></div>
            </div>
          </li>
        </ul>
      </div>
     
      <div class="clearfix"></div>
      <div class="news_tj_wrap">
				<h1><span class="fr"><a id="tj_more" stage="" class="sy-more" href="#" onclick="userspace.openTuijian(this);return false;">更多...</a></span><span style="display: table-cell;" class="tab_news ">
				<a id="13Tab_0" style="display: none;" class="cur_2" onclick="Show_Tab_List2(3,0,13);$('#tj_more').attr('stage','0001');" href="javascript:void(0);">小学推荐</a> 
				<a id="13Tab_1" style="display: none;" onclick="Show_Tab_List2(3,1,13);$('#tj_more').attr('stage','0002');" href="javascript:void(0);">初中推荐</a> 
				<a id="13Tab_2" style="display: none;" onclick="Show_Tab_List2(3,2,13);$('#tj_more').attr('stage','0003');" href="javascript:void(0);">高中推荐</a></span></h1>
					<div class="clearfix"></div>
        <div style="display: none;" id="13s_0">
          <div class="news_tj">
            <ul style="width: 95%;" id="xiaoxue_tj_ul" >
          <li><a href="#">数据加载中...</a></li>
            </ul>
            <div class="clearfix"></div>
          </div>
        </div>
        <div style="display: none;" id="13s_1">
          <div class="news_tj">
            <ul style="width: 95%;"id="chuzhong_tj_ul">
          <li><a href="#">数据加载中...</a></li>
            </ul>
            <div class="clearfix"></div>
          </div>
        </div>
        <div style="display: none;" id="13s_2">
          <div class="news_tj">
            <ul style="width: 95%;"id="gaozhong_tj_ul" >
          	<li>.h<a href="#">数据加载中...</a><br /><br /></li>
            </ul>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
  <!--end home_first--> 
 <div class="clearfix"></div>
</div>
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