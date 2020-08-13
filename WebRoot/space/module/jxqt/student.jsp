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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>优教班班通-学生空间-首页</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

<%-- <link href="<%=path %>/space/css/global.css?r=<%=dayStamp %>" rel="stylesheet" type="text/css" />
<link href="<%=path %>/space/css/top_foot.css?r=<%=dayStamp %>" rel="stylesheet" type="text/css" />
<link href="<%=path %>/space/css/room.css?r=<%=dayStamp %>" rel="stylesheet" type="text/css" />
<link href="<%=path %>/space/css/font_quan.css?r=<%=dayStamp %>" rel="stylesheet" type="text/css" />
<link href="<%=path %>/space/css/lrtk.css?r=<%=dayStamp %>" rel="stylesheet" type="text/css" />
<link href="<%=path %>/space/css/qiandao.css?r=<%=dayStamp %>" rel="stylesheet" type="text/css" /> --%>

<link href="space/module/jxqt/css/jquery.autocomplete.css" rel="stylesheet" type="text/css"/>
<link href="space/module/jxqt/css/global.css" rel="stylesheet" type="text/css"/>
<link href="space/module/jxqt/css/lrtk.css" rel="stylesheet" type="text/css"/>
<link href="space/module/jxqt/css/room.css" rel="stylesheet" type="text/css"/>
<link href="space/module/jxqt/css/font_quan.css" rel="stylesheet" type="text/css"/>
<link href="space/module/jxqt/css/top_foot.css" rel="stylesheet" type="text/css"/>
<script src="<%=path %>/script/jquery.js"></script>
<script src="<%=path %>/script/jquery-migrate-ada.js"></script>

<script src="<%=path %>/space/script/common.js?r=<%=dayStamp %>" type="text/javascript"></script>

<script src="<%=path %>/script/koala.min.1.5.js" type="text/javascript"></script>
<script src="<%=path %>/space/script/jquery.easing.1.3.js" type="text/javascript"></script>
<script src="<%=path %>/space/script/pic_scrollplugin.0717.js" type="text/javascript"></script>
<script src="<%=path %>/space/script/artDialog.js?skin=default" type="text/javascript"></script>
<script src="<%=path %>/script/defaultUse.js" type="text/javascript"></script>
<script src="<%=path%>/script/util.js?r=<%=dayStamp %>" type="text/javascript"></script>
<script src="<%=path %>/script/userspace.js?r=<%=dayStamp %>" type="text/javascript"></script>
<script src="<%=path%>/common/config.jsp?r=<%=dayStamp %>&showip=1" type="text/javascript"></script>
<script src="<%=path%>/script/common.jsp?r=<%=dayStamp %>&setHeight=1015" type="text/javascript"></script>
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
	userspace.showFocusImg("D1pic1","D1fBt","CMS.JSON.A01074015002002",6,"<div class=\"fcon\" style=\"display: none;\"> <a href=\"~url~\" target=\"~target~\"><img src=\"~img~\" style=\"opacity: 1; \"></a><span class=\"shadow\"><a target=\"~target~\" href=\"~url~\">~text~</a></span></div>");
	//每日推荐
	//userspace.showTeacherMeirituijian("tuijian","CMS.JSON.A01074016003",3,1,"<li><a href=\"~url~\" target=\"~target~\">~text~</a></li>");
	//初始化及展示我的应用
	//showMyUse();
	//显示U币
	userspace.showUbNum();
	//检查签到
	userspace.checkSign();
	//未读消息个数
	setTimeout("userspace.getNotreadletterCount('"+username+"')",100);
	//搜索热词
	//userspace.showHotKey();
	//学习加油站---同老师推荐，角色不同
	userspace.showStudentTuijian();
	//显示左侧专题推荐图片
	userspace.showZTimg();
	//显示作业数量和班级圈红点
	showMyAppNum();
	//站内通知
	userspace.showNotice();
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
<body style="padding:0px;" >
<div class="<%=screenWidthId%>">
  
  <div class="h_first">
  	  <div class="" style="display: none; position: absolute;">
   <div class="aui_outer">
    <table class="aui_border">
     <tbody>
      <tr>
       <td class="aui_nw"></td>
       <td class="aui_n"></td>
       <td class="aui_ne"></td>
      </tr>
      <tr>
       <td class="aui_w"></td>
       <td class="aui_c">
        <div class="aui_inner">
         <table class="aui_dialog">
          <tbody>
           <tr>
            <td colspan="2" class="aui_header">
             <div class="aui_titleBar">
              <div class="aui_title" style="cursor: move; display: block;"></div>
              <a class="aui_close" href="javascript:/*artDialog*/;" style="display: block;">&times;</a>
             </div></td>
           </tr>
           <tr>
            <td class="aui_icon" style="display: none;">
             <div class="aui_iconBg" style="background: none;"></div></td>
            <td class="aui_main" style="width: auto; height: auto;">
             <div class="aui_content" style="padding: 20px 25px;"></div></td>
           </tr>
           <tr>
            <td colspan="2" class="aui_footer">
             <div class="aui_buttons" style="display: none;"></div></td>
           </tr>
          </tbody>
         </table>
        </div></td>
       <td class="aui_e"></td>
      </tr>
      <tr>
       <td class="aui_sw"></td>
       <td class="aui_s"></td>
       <td class="aui_se" style="cursor: se-resize;"></td>
      </tr>
     </tbody>
    </table>
   </div>
  </div> 
  <div class="bannerBox"> 
   <div id="fsD1" class="focus"> 
    <div id="D1pic1" class="fPic">
    </div> 
    <div class="fbg" style="display:none;"> 
     <div id="D1fBt" class="D1fBt">  
     </div> 
    </div> 
    <span class="prev"></span> 
    <span class="next"></span> 
   </div> 
   <!-- 代码 结束 --> 
  </div> 
  <div class="searchBox" style="display:block"> 
   <div class="ssou"> 
    <div class="ssou_k"> 
     <input id="researchKey" class="txt_ssou" placeholder="搜索您感兴趣的内容" type="text" onblur="if (value ==''){value='搜索您感兴趣的内容'}" onfocus="if (value =='搜索您感兴趣的内容'){value =''};" /> 
     <input type="submit" class="souBtn_white" value="搜索" onclick="parent.researchKeyResource($('#researchKey').val());" /> 
    </div> 
   </div> 
  </div> 
  <div class="w1200"> 
   <div class="h_first"> 
    <div class="h_l fl"> 
     <div style="z-index: 1;" class="row"> 
      <h1 class="hl_bt">互动学习</h1> 
      <div class="jx_ico_wrap stu h380"> 
       <ul> 
        <li><a onclick="util.newPortalOpen('ILEARN.SCORE')"> <img src="space/module/jxqt/img/bk/cj_icon.png" class="min_icon" /> <p>成绩</p> </a></li> 
        <li><a onclick="util.newPortalOpen('ILEARN.TEACHERMESSAGE')"> <img src="space/module/jxqt/img/bk/jsxx_icon.png" class="min_icon" /> <p>教师消息</p> </a><span class="sz" id="letterCount" style="display:none">0</span></li> 
        <li><a onclick="util.newPortalOpen('ILEARN.PARENTSAY')"> <img src="space/module/jxqt/img/bk/bmdws_icon.png" class="min_icon" /> <p>爸妈对我说</p> </a></li> 
        <li><a onclick="util.newPortalOpen('ILEARN.STUDENTSAY')"> <img src="space/module/jxqt/img/bk/txdws_icon.png" class="min_icon" /> <p>同学对我说</p> </a></li> 
        <li><a onclick="util.newPortalOpen('ILEARN.OTHERSAY')"> <img src="space/module/jxqt/img/bk/wxdns_icon.png" class="min_icon" /> <p>我想对他说</p> </a></li> 
        <li><a onclick="util.newPortalOpen('ILEARN.TEAMSTUDY')"> <img src="space/module/jxqt/img/bk/xzxx_icon.png" class="min_icon" /> <p>小组学习</p> </a></li> 
        <li><a onclick="util.newPortalOpen('ILEARN.MYPRODUCT')"> <img src="space/module/jxqt/img/bk/zpzs_icon.png" class="min_icon" /> <p>作品展示</p> </a></li> 
       </ul> 
      </div> 
     </div> 
    </div> 
    <!--end home_l--> 
    <div class="h_r fr"> 
     <!--焦点图--> 
     <div class="focus_h"> 
      <div class="clearfix"></div> 
      <div class="row"> 
       <h1 class="hr_bt">精选应用</h1> 
       <div class="clearfix"></div> 
       <ul class=" bk_wrap"> 
        <li> 
         <div class="bk_wrap_con"> 
          <div class="bk-l stu  s-bg1"> 
           <a class="l_link" href="#" onclick="openZY();return false;"> <img src="space/module/jxqt/img/bk/zy_icon.png" style="width: 100px;" /> <p>作业</p> </a> 
          </div> 
         </div> </li> 
        <li> 
         <div class="bk_wrap_con"> 
          <div class="bk-l  s-bg2"> 
           <a class="l_link" href="#" onclick="util.gotoIcode('PLS','PLS.STUDENT.APP_2');return false;"> <img src="space/module/jxqt/img/bk/tbxx_icon.png" style="width: 100px;" /> <p>同步学习</p> </a> 
          </div> 
         </div> </li> 
        <li> 
         <div class="bk_wrap_con"> 
          <div class="bk-l s-bg3"> 
           <a class="l_link" href="#" onclick="util.gotoIcode('MICRO','MICRO.STUDENT.APP_3');return false;"> <img src="space/module/jxqt/img/bk/mswk_icon.png" style="width: 100px;" /> <p>名师微课</p> </a> 
          </div> 
         </div> </li> 
        <li> 
         <div class="bk_wrap_con"> 
          <div class="bk-l  s-bg4" id="yjjp1"> 
           <a class="l_link" href="#" onclick="userspace.changeChannel('22.29');return false;"> <img src="space/module/jxqt/img/bk/zxzs_icon.png" style="width: 100px;" /> <p>慧学精品</p> </a> 
          </div> 
          <div class="bk-l  s-bg4" id="tbtf1" style="display:none"> 
           <a class="l_link" href="#" onclick="util.gotoIcode('QBMS','QBMS.STUDENT.APP_4');return false;"> <img src="space/module/jxqt/img/bk/tbxx_icon.png" style="width: 100px;" /> <p>同步提分</p> </a> 
          </div> 
         </div> </li> 
        <li> 
         <div class="bk_wrap_con"> 
          <div class="bk-l  s-bg5"> 
           <a class="l_link" href="#" onclick="util.gotoIcode('ILEARN','ILEARN.STUDENT.APP_5');return false;"> <img src="space/module/jxqt/img/bk/jbq_icon.png" style="width: 100px;" /> <p>班级圈</p> </a> 
          </div> 
         </div> </li> 
        <li style="margin-right: 0;"> 
         <div class="bk_wrap_con"> 
          <div class="bk-l  s-bg6"> 
           <a class="l_link" href="#" onclick="window.open(util.makeUrl('QBMS','QBMS.STUDENT.APP_6'));return false;"> <img src="space/module/jxqt/img/bk/ctb_icon.png" style="width: 100px;" /> <p>错题本</p> </a> 
          </div> 
         </div> </li> 
       </ul> 
      </div> 
      <div class="clearfix"></div> 
      <div class="news_tj_wrap"> 
       <h1> <span class="tab_news stu " style="display: table-cell"><a href="javascript:void(0);" class="cur_2">学习加油站</a> </span> </h1> 
       <div class="clearfix"></div> 
       <div class="news_tj"> 
          <ul style="width: 95%;" id="tuijian">
		  </ul>

        <div class="clearfix"></div> 
       </div> 
      </div> 
     </div> 
     <div class="clearfix"></div> 
    </div> 
    <!--end home_first--> 
    <div class="clearfix"></div> 
   </div> 
   <script>
<!--
	//可配置js代码段
	var _type4OtherConfig="student";
		eval(otherConfig);
//-->
</script>
  </div>
  <iframe id="crossdomainiframe" style="display:none;" src="http://hdkt.jxrrt.cn:80/common/crossdomain.jsp?height=1025&amp;minhei=0"></iframe>
  </div>
  <!--end home_first--> 
 <div class="clearfix"></div>
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