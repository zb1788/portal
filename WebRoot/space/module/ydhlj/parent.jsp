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
<title>学生首页</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

<script src="<%=path %>/space/module/ydhlj/js/html5shiv.min.js"></script>

<script src="<%=path %>/space/module/ydhlj/js/public.js"></script>
<script src="<%=path %>/space/module/ydhlj/js/move.js"></script>
<script src="<%=path %>/space/module/ydhlj/js/slider.js"></script>
    
<link rel="stylesheet" href="<%=path %>/space/module/ydhlj/css/style.css?r=<%=dayStamp %>" />

<script src="<%=path %>/script/jquery-1.12.4.min.js"></script>
<script src="<%=path %>/script/jquery-migrate-ada.js"></script>


<script src="<%=path %>/space/script/common.js?r=<%=dayStamp %>" type="text/javascript"></script>
<script src="<%=path %>/space/script/artDialog.js?skin=default" type="text/javascript"></script>
<script src="<%=path %>/script/defaultUse.js" type="text/javascript"></script>
<script src="<%=path%>/script/util.js?r=<%=dayStamp %>" type="text/javascript"></script>
<script src="<%=path %>/script/userspace.js?r=<%=dayStamp %>" type="text/javascript"></script>
<script src="<%=path%>/common/config.jsp?r=<%=dayStamp %>&showip=1" type="text/javascript"></script>
<script src="<%=path%>/script/common.jsp?r=<%=dayStamp %>&setHeight=1100" type="text/javascript"></script>
<script type="text/javascript" >
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
	util.getCommonCMS("p_tuijian","CMS.JSON.A01074016002",6,0,'<li><a href="~url~" target="_blank">~text~</a><time>~date~</time></li>',true);
	//焦点图
	var loopindex=0;
	util.getCommonCMS("loop1","CMS.JSON.A01074015002003",6,0,'<li><a  target=\"~target~\" href="~url~\" ><img src="~img~" alt="~text~" /><p>~text~</p></a></li>',true,function(code,data){
		loopindex++;
		try{
		$("#loop2").append('<li></li>');
		}catch(e){}
		bannerInit();
		return code;
	});
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
//首页全局搜索
function researchKeyResource(searchTextValue){
	var researchKey=null;
	if(searchTextValue && searchTextValue!=null && searchTextValue!=""){
		researchKey=searchTextValue;
	}else{
   		//去掉两端空格
    	researchKey=$("#researchKey").val(); 
	}
	if( util.isBlank(researchKey) || researchKey=="搜索您感兴趣的内容") {
		alert("请输入搜索内容！");
		return false;
	}else{
	    researchKey = researchKey.trim().replaceAll("%","％");
	    researchKey = encodeURIComponent(encodeURIComponent(researchKey)).replace(/'/g,"\\'").replace(/\"/,"\"");
	    var paramData ="&areaCode="+localAreaCode+"&schoolStage="+schoolStage+"&schoolId="+schoolId+"&username="+username+"&classId="+classid+"&studentId="+studentId+"&gradeCode="+gradeCode+"&usertype="+usertype+"&title="+researchKey;
	    //隐藏二级栏目，调整页面头部高度
	    //changetopstyle("22.55");
	    //$("#iframe01").attr("src","http://"+sysconfig["PLS"]+interface_config["PLS.183"]+paramData);
	    window.location.href="http://"+sysconfig["PLS"]+interface_config["PLS.183"]+paramData;
	    try{
	    $.getScript(" http://"+sysconfig["STAT_PV"]+"/stat/a.html?c="+username+"&cookieid="+cookieid+"&channelid=22.00&rc=&mc=&so=c&act=a&con="+researchKey);
	    }catch(e){}
	}
}
//-->
</script>
</head>
<body>
<div id="clContentBox">
    <div id="clSlider">
        <ul id="loop1">
        </ul>
        <ol id="loop2">
        </ol>
    </div>
    <div class="clSearchBox">
        <input type="button" class="clSearchBtn" onclick="researchKeyResource($('#researchKey').val())" />
        <input type="text" class="clSearchTxt" placeholder="搜索您感兴趣的内容" id="researchKey" />
    </div>
    <div class="clBoxColWra">
        <aside class="clBoxCol2 clIcoList">
            <h3>互动消息</h3>
            <ul>
                <li>
                    <a class="clStudentMenuIco4" href="#" onclick="userspace.changeChannel('22.21');return false;">家校互动</a>
                </li>
                <li>
                    <a class="clStudentMenuIco3" href="#" onclick="userspace.changeChannel('22.21.02');return false;">亲子互动</a>
                </li>
                <li>
                    <a class="clStudentMenuIco5" href="#" onclick="userspace.changeChannel('22.21.03');return false;">请假</a>
                </li>
                
            </ul>
        </aside>
        <div class="clBoxCol8">
            <article class="clFunBox">
                <h3>精选应用</h3>
                <div class="clFunList">
                    <a href="#" onclick="userspace.changeChannel('22.12');return false;">
                        <figure>
                            <img src="space/module/ydhlj/images/clBigIco4.png" alt="" />
                            <figcaption>同步辅学</figcaption>
                        </figure>
                    </a>
                    <a href="#" onclick="util.gotoIcode('ILEARN','ILEARN.CLASSGROUP.PARENT');return false;">
                        <figure>
                            <img src="space/module/ydhlj/images/clBigIco5.png" alt="" />
                            <figcaption>班级圈</figcaption>
                        </figure>
                    </a>
                    <a href="#" onclick="util.gotoIcode('TMS','TMS.TIMETABLE.PARENT');return false;">
                        <figure>
                            <img src="space/module/ydhlj/images/clBigIco1.png" alt="" />
                            <figcaption>课程表</figcaption>
                        </figure>
                    </a>
                    <a href="#" onclick="util.gotoIcode('CMS','CMS.PAGE.A01074010002004');return false;">
                        <figure>
                            <img src="space/module/ydhlj/images/clBigIco3.png" alt="" />
                            <figcaption>学习辅导</figcaption>
                        </figure>
                    </a>
                    <a href="#" onclick="util.gotoIcode('CMS','CMS.PAGE.A01074010002003');return false;">
                        <figure>
                            <img src="space/module/ydhlj/images/clBigIco6.png" alt="" />
                            <figcaption>亲子教育</figcaption>
                        </figure>
                    </a>
                    <a href="#" onclick="util.gotoIcode('CMS','CMS.PAGE.A01074010002005');return false;">
                        <figure>
                            <img src="space/module/ydhlj/images/clBigIco2.png" alt="" />
                            <figcaption>名师指导</figcaption>
                        </figure>
                    </a>
                </div>
            </article>
            <article class="clListBox">
                <header>
                    <h3>学习加油站</h3>
                </header>
                <ul id="p_tuijian">
                </ul>
            </article>
        </div>
    </div>
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
    var oSlider=document.getElementById("clSlider");
    var oSliderUl=oSlider.getElementsByTagName("ul")[0];
    var oSliderOl=oSlider.getElementsByTagName("ol")[0];
    var aSliderImgList=oSliderUl.getElementsByTagName("li");
    fSlider(oSliderUl, aSliderImgList, oSliderOl, 5000);
    }
</script>
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