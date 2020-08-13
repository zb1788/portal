<%@page language="java" 
import="java.util.*,zzvcom.util.secret.*,zzvcom.util.*,vcom.sso.vo.*,vcom.sso.pdgrant.*,zzvcom.entity.TreeForm,net.sf.json.JSONObject,java.text.SimpleDateFormat,javax.servlet.http.HttpServletRequest" 
pageEncoding="utf-8"%><%!
public boolean checkAreaLeavl(TreeForm tf,int al){
	boolean alr=true;
	if(al>0 && tf.getC4()!=null && tf.getC4().indexOf("areaLeavl")>-1){
		JSONObject c4Json = JSONObject.fromObject(tf.getC4());
		try{
			if((Integer)c4Json.get("areaLeavl")!=al)alr=false;
		}catch(Exception e){}
	}
	return alr;
}
%><%@ include file="../space/screen_width.jsp" %><%
response.setHeader("Pragma", "No-Cache");
response.setHeader("Cache-Control", "No-Cache");
response.setDateHeader("Expires", 0);
String path = request.getContextPath();
String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
String ip = request.getHeader("x-forwarded-for"); 
if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {   
    ip = request.getHeader("Proxy-Client-IP");
}   
if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {   
    ip = request.getHeader("WL-Proxy-Client-IP");
}
if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {   
    ip = request.getRemoteAddr();
} 
String date = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date());
Long rdata = Math.round(Math.random()*10000);
String dayStamp = new java.text.SimpleDateFormat("yyMMddHHmmss").format(new Date());//日期戳
//4学生，0家长
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
String showname=truename;
if(truename.length()>6){
	showname=truename.substring(0,6)+"..";
}
school = tuser.getSchool();
if(tuser.getSchoolClasses()!=null && tuser.getSchoolClasses().length>0){
	tclass = tuser.getSchoolClasses()[0];
}
Student student = ((Student)session.getAttribute("student"));
String seokey=((Map<String,String>)request.getAttribute("ConfigMap")).get("seokey");//搜索关键词
String icoimg=((Map<String,String>)request.getAttribute("ConfigMap")).get("icoimg");//当前域页面图标
if(icoimg==null || icoimg.trim().length()==0){
	icoimg="";
}else{
	icoimg=Common.PROTOCOL+Common.getSysUrl(request.getServerName(),"PORTAL")+"/ico/"+icoimg;
}
if(seokey==null || seokey.trim().length()==0){
	seokey=Common.DEFAULT_SEO_KEY;
}
String noalert = "false";
String noalertCode = Common.noAlertCode(username,usertype);
String requestAlertCode = request.getParameter("na");
if(requestAlertCode!=null && requestAlertCode.length()==(noalertCode.length()+3) && requestAlertCode.startsWith(noalertCode)){
	noalert = "true";
}
noalertCode=noalertCode+ Math.round(Math.random()*9);
String login_data=request.getParameter("data");
if("".equals(login_data)){
	login_data="\"\"";
}
//检查非法
try {
	if(null!=login_data){
		login_data=login_data.replaceAll("<","").replaceAll(">","").replaceAll("script","");
	    JSONObject.fromObject(login_data);
	}
} catch (Exception e) {
	login_data = "\"\"";
}
	
ProductGrantUtil pdGrantUtil=new ProductGrantUtil();
ProductGrantRtn grantObj=pdGrantUtil.getProductGrant(request);
String granttip = grantObj.getTip();
String reasonUrl = grantObj.getReasonUrl();
String appNoGrant=null;
if(grantObj!=null){
	List<String> noGrantarr=grantObj.getAppNumbersNoGrant();
	appNoGrant=StringUtil.listToString(noGrantarr);
}
//地区层级
int areaLeavl=0;
try{
areaLeavl=tuser.getArea().getAreaId().split("\\.").length;
}catch(Exception e){
}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="shortcut" href="<%=icoimg %>" type="image/x-icon"/>
<link rel="icon" href="<%=icoimg %>" type="image/x-icon"/>
<link rel="bookmark"  href="<%=icoimg %>" type="image/x-icon" />
<title><%=seokey %>-管理员空间</title>
<link href="<%=path %>/manage/style/common.css" rel="stylesheet" type="text/css" />
<link href="<%=path %>/manage/style/guanli.css" rel="stylesheet" type="text/css"/>
<link rel="stylesheet" type="text/css" href="<%=path%>/login/default/style/jquery.autocomplete.css" />
<script src="<%=path %>/js/lib/jquery.js"></script>
<script src="<%=path %>/manage/script/artDialog.js?skin=default"></script>
<script type='text/javascript' src="<%=path %>/script/base64.js?r=<%=dayStamp %>"></script>
<script src="<%=path %>/script/util.js"></script>
<script src="<%=path %>/common/config.jsp?showip=1" type="text/javascript"></script>
<script type="text/javascript" src="<%=path%>/script/ajax_common.js"></script>
<script src="<%=path %>/script/spaceindex.js"></script>
<script src="<%=path %>/manage/script/userspace.js" ></script>
<script src="<%=path %>/manage/script/channels.js"></script>
<script charset="utf-8" src="<%=path%>/script/loginobj.js?r=<%=dayStamp %>"></script>
<style type="text/css">
.ac_results{width:230px}
</style>
<script>
<%
	if((request.getServerName()+"").indexOf(Common.getDomain())>=0){
		out.print("document.domain = \""+Common.getDomain()+"\";");
	}
%>
var statip="<%=Common.getStatip(request)%>";//统计地址
var SSO = "<%= Common.getInterfaceUrl(request.getServerName(),"SSO","SSO.CHANGEUSE")%>"; //sso地址
var plsUrl=protocol+sysconfig.PLS;//资源应用地址
var global_basePath="<%=basePath%>";
var ip="<%=ip%>";
var noalert = <%=noalert%>;
var noalertCode = "<%=noalertCode%>";
var loginUsertype =util.getCookie("loginUsertype"); //登录角色
var defalutselect=<%=login_data%>;
var inputname = util.unconfoundInputName(util.getCookie("inputname")); //登录号
var localAreaCode=portal_config.areacode;
var username="<%=username%>";//用户名
var usertype="<%=usertype %>";
var usercode="<%=tuser.getAccount() %>";
var studentId = "<%= student.getStudentNumber() %>";//学生id
var eduYears = "<%=(school!=null)?school.getEduYears():""%>";//学制
var gradeCode = "<%= (tuser.getGrade()!=null?tuser.getGrade().getGradeCode():"") %>";//年级 
var studentname="<%=student.getStudentNumber()%>";//学生名
var studyStageCode = "<%= ( (tuser.getStudyStage()!=null && tuser.getStudyStage().length>0 && tuser.getStudyStage()[0]!=null)?tuser.getStudyStage()[0].getStudyStageCode():"") %>";//学段
var classid="<%=(student.getSchoolClassId()!=null)?student.getSchoolClassId():""%>";//当前学生班级ID/家长学生班级ID
var className="<%= ((tclass!=null && tclass.getClassName()!=null)?tclass.getClassName():"" )%>";//当前用户班级名-仅学生有效
var truename = "<%=tuser.getTruename() %>";
var userAreaId="<%=tuser.getArea().getAreaId() %>";//区域id
var areaName="<%= tuser.getArea().getFullname() %>";//全路径区域名
var schoolId="<%=(school!=null)?school.getSchoolId():"" %>";//学校Id
var schoolStage="<%= mustudyStage %>";//学段
var schoolName="<%=(school!=null)?school.getSchoolName():"" %>";
var vcom3dsusername="<%= tuser.getNickname() %>";
var boundphone="<%=Common.getBoundphone()%>";//是否需要下发验证码
var phoneusertype="<%=Common.getPhoneusertype()%>";//需要下方验证码角色
var phoneActiveState="<%=tuser.getPhoneActiveState()%>";//是否绑定
var vsms_day="<%=Common.getVsms_day()%>";//验证码多少天下发一次
var __date="<%=date%>";//当前系统日志
var repeatCheckTime="<%=Common.getRepeatCheckTime()%>";//检查重复登录时间
var notcheckuser="<%=Common.getNotcheckuser()%>";//不需要验证的用户
var areaphonenumber="<%=Common.getAreaphonenumber()%>";
var alerttype=<%=Common.getAlerttype()%>;
var repeatUsertype=<%=Common.getRepeatUsertype()%>;
var cookieid="<%=RCode.getRCode()%>";
var channelid="";//request获取id参数，替换_为.暂时移除此逻辑
var ___icode="<%=request.getSession().getAttribute("vicode")%>";
var mychidrenjson=null;
var codeType = "";//验证码获取类型："temp":临时,"phone":短信
var noCheckCountUsed = 0;//已验证次数
var tempCodeCount=<%=Common.getTempCodeCount()%>;//系统设置的每月获取临时验证码的次数
var phoneNumber = util.getCookie("verifyCodePhone");//手机号码
var paytype= <%=Common.getPaytype()%>;//1，在线支付，2订购支付，3，匹配运营商在线支付。
//读取cookie中 phoneBuyAble=true 手机订购 =false支付订购
var phoneBuyAble = util.getCookie("phoneBuyAble");
var screen_width_id =  util.getCookie("screen_width_id");//记录屏幕宽度cookie
var otherConfig = decodeURIComponent(decodeURIComponent(portal_config.otherConfig));
var indexlogo =  (portal_config.indexlogo!=""&&portal_config.indexlogo!="undefined")?portal_config.indexlogo:"logo.png";
//订购提醒信息
var areamessage={};
try{
	areamessage=<%= (Common.getAreamessage()==null || Common.getAreamessage().trim().length()==0)?"{}":Common.getAreamessage() %>;
}catch(e){}
var getHost = function(url) {
	var host = "null";
  if (typeof url == "undefined"
          || null == url)
      url = window.location.href;
  var regex = /.*\:\/\/([^\/|:]*).*/;
  var match = url.match(regex);
  if (typeof match != "undefined"
          && null != match) {
      host = match[1];
  }
  if (typeof host != "undefined"
          && null != host) {
      var strAry = host.split(".");
       host=strAry[0];
  }
  return host;
}
//页面初始化事件
$(function(){
	$("#gjpt").attr("value",getHost());
	var servename = "<%=request.getServerName()%>";
	$("#indexlogo").attr("src","../space/images/logo/"+indexlogo);
	$("#footiframe").attr("src","//"+sysconfig.CMS+interface_config["CMS.PAGE.A01022"]);
	//1、初始化用户类型
	$("#loginUsertype").attr("value",loginUsertype);
	$(".tab_login a").each(function(){
			 $(this).siblings().removeClass();
	 	 });
	 $("#"+loginUsertype).addClass("cur_5");
	 //2、只有校管理员可以切换教师
	if(usertype=="3"){
		var url = "//"+sysconfig.PORTAL+"/webindex.action?data=";
		$("#blo_2 > ul").prepend("<a href=\""+url+"\">教师空间</a>");
	}
});
function openSpace(type){
	if(1==type){
		window.open(protocol+sysconfig.SPACE+"/zone/?stype=1&sid="+schoolId);
	}else{
		window.open(protocol+sysconfig.SPACE+"/zone/?stype=2&sid="+userAreaId);
	}
}
</script>
</head>
<body>
	<!-- 顶部条 -->
	<div class="header noBg">
		<div class="<%=screenWidthId%>">
		<div class="logo" style="background:none;text-indent:none"><img src="" id="indexlogo" />
			<span>管理员空间</span>
		</div>
		<div class="myInfo">
    	<dl>
    		<dd class="grayFon youqi">
    				 <% if(!"3".equals(usertype)){ %><!-- <a href='#' onclick="openSpace(2);return false;" >地区空间</a> /  --><% } %><a href="//<%=Common.getSysUrl(request.getServerName(),"CMS") %>/A01/A01050/A01050014/list_1.html" target="_blank" onclick="changeLm();">帮助</a>
					 / <a href="/ssoLoginFail.jsp">退出</a>
       </dd>
        <dd class="posRe">
        	<a style="text-decoration: none;" class="tit1" title="<%= truename %>">
            <%= truename %>
        	</a>&nbsp;&nbsp;&nbsp;<a href="javascript:;" id="user" class="user">切换用户<i class="bottomdirection"></i></a>
            <!--弹出层-->
            <div class="login_con" id="login_con">
        			<div class="login_content">
            	<div class="close_2"><a href="javascript:;">×</a></div>
                <div id="blo_1" style="display:none;">
                    <!-- 登录开始 -->
                 		<form id="loginForm" name="loginForm" action="<%=Common.PROTOCOL+Common.getSysUrl(request.getServerName(),"SSO") %>/sso/ssoAuth" method="get" target="">
                      <input type="hidden" id="loginUsertype" name="loginUsertype"/>
                      <input type="hidden" id="gjpt" name="gjpt" />
                      <div class="tab_login gl">
                      	<a href="javascript:;" class="cur_5" id="teacher">教师</a>
                      	<a href="javascript:;" id="parent">家长</a>
                      	<a href="javascript:;" id="student">学生</a>
                      	<a href="javascript:;" id="manager">管理员</a>
                      </div>
                      <ul>
                          <li class="usr">
                          <div class="posRe">
                          <!-- 多账号选择层 -->
                          <div id="roleDiv" phonenum="" class="ac_results" style="top:40px;display:none;position:absolute" >
														  <ul id="roleList" >
														  </ul>
													</div>
					    						<div>
                          	<input id="inputname" name="inputname" type="text" class="login_input" value="" onfocus="clearusername();" onkeyup="clearusername();" onchange="clearusername();"  />
													</div>
													</div>
                          	<input type="hidden" name="username" id="username"/>
                          <br /></li>
                          <li class="pwd">
					    						<div style="background:#fff url(manage/images/pwd.png) no-repeat 97% center;width:100%;">
                          	<input id="inpwd" name="inpwd" type="password" class="login_input" value="" />
                          	<input id="pwd" name="pwd" type="hidden" value="" />
													</div>
                          	<input id="isPortalisPortal" name="isPortal" type="hidden" value="1" />
          									<input id="data" name="data" type="hidden" value="" />
                          <br /></li>
                          <li class="check">
													<div style="background:#fff url(manage/images/chk.png) no-repeat 97% center; width:140px; display:block; float:left;">
                          	<input name="validateCode" id="validateCode" type="text"  class="login_input" style="width:80px;" maxlength="4" value=""/>
													</div>
													<span class="yanzeng">
                          	<img src="<%= Common.getInterfaceUrl(request.getServerName(),"SSO","SSO.CODE")%>" onclick="this.src='<%= Common.getInterfaceUrl(request.getServerName(),"SSO","SSO.CODE")%>?r='+new Date().getSeconds()" width="78" height="28" />
                              </span>
                          <br /></li>	                               
                          <li><input type="submit" class="logBtn" value="确定" onClick="return login_check();" id="loginbuttion" />
                          <br /></li>
                      </ul>
                    </form>
                    <!-- 登录结束 -->	
                </div>
                
                <div id="blo_2">
                    <center><h2>请选择</h2></center>
                    <ul class="jiaz_list" >
                        <a href="javascript:;" onClick="showLogin();">其他</a>
                    </ul>
                </div>
            </div><!--end login_content-->
          	<div class="login_con_bg"><span class="angle1"></span></div><!--end login_con_bg-->
        </div><!--end login_con-->
       </dd>
     </dl>
    </div><!--end myInfo-->
		<div class="clearfix"></div>
	</div>
	<!-- logo等信息结束 -->
	<!-- 一级栏目开始 -->
  	<div class="nav guanli">
			<div class="<%=screenWidthId%>" id="menu">
				<ul class="nav_con">
<%
	List<TreeForm> menauthority= (List)request.getAttribute("menauthority");
	for(int st=0;(menauthority!=null && st<menauthority.size());st++){
		TreeForm tf = menauthority.get(st);
		if("28".equals(tf.getParentid()) && checkAreaLeavl(tf,areaLeavl)){//门户菜单且地区层级匹配通过
			out.println("<li >");
			if(st==0){
				out.println("<a href=\"manageindex.action\" onclick='menuclick(this)' id='"+tf.getId()+"' lmid='"+tf.getId()+"' opentype='"+tf.getOpentype()+"' target='iframe01' class=\"sel\">"+tf.getText()+"</a>");
			}else if("2".equals(usertype) || "3".equals(usertype) || tf.getC2()==null || tf.getC2().trim().length()==0 || tf.getC2().indexOf(eduAndGrade)>-1){
				if(tf.getHref()!=null || tf.getHref().trim().length()==0){
					if("4".equals(tf.getOpentype())){
						//新开页打开moduleurl配置连接
						out.println("<a onclick='menuclick(this)' id='"+tf.getId()+"' lmid='"+tf.getId()+"' opentype='"+tf.getOpentype()+"' href='"+tf.getHref()+"' target='_blank'>"+tf.getText()+"</a>");
					}else if("2".equals(tf.getOpentype())){
						//新开页打开c3系统moduleurl配置相对地址连接加入channelid,regflag,cookieid参数
						String thischannelid=tf.getId().replaceAll("_",".");
						out.println("<a onclick='menuclick(this)' id='"+tf.getId()+"' lmid='"+tf.getId()+"' opentype='"+tf.getOpentype()+"' href='"+tf.getHref()+"&channelid="+thischannelid+"&cookieid="+RCode.getRCode()+"&regFlg="+regFlg+"' target='_blank' >"+tf.getText()+"</a>");
					}else if("3".equals(tf.getOpentype())){
						//在框架内打开moduleurl配置连接
						out.println("<a onclick='menuclick(this)' id='"+tf.getId()+"' lmid='"+tf.getId()+"' opentype='"+tf.getOpentype()+"' href='"+tf.getHref()+"' target='iframe01' >"+tf.getText()+"</a>");
					}else if("5".equals(tf.getOpentype())){
						//以js方式调用moduleurl配置js方法,js执行vimnumber值
						out.println("<a onclick='menuclick(this)' id='"+tf.getId()+"' lmid='"+tf.getId()+"' opentype='"+tf.getOpentype()+"' href='javascript:void(0)' >"+tf.getText()+"</a>");
					}else{
						//1在框架内打开c3系统moduleurl配置相对地址连接加入channelid,regflag,cookieid参数
						String thischannelid=tf.getId().replaceAll("_",".");
						out.println("<a onclick='menuclick(this)' id='"+tf.getId()+"' lmid='"+tf.getId()+"' opentype='"+tf.getOpentype()+"' href='"+tf.getHref()+"&channelid="+thischannelid+"&cookieid="+RCode.getRCode()+"&regFlg="+regFlg+"' target='iframe01' >"+tf.getText()+"</a>");
					}
				}
			}
			//嵌套二级栏目层
			if(tf.getChildren()!=null && tf.getChildren().size()>0){
				out.println("<div class=\"subnav\"><dl>");
		    	for(TreeForm sttree:(List<TreeForm>)tf.getChildren()){
		         	if(checkAreaLeavl(tf,areaLeavl)){//地区层级匹配
			    		out.println("<dt>");
						if("4".equals(sttree.getOpentype())){
							//新开页打开moduleurl配置连接
							out.println("<a onclick='menuclick(this)' id='"+sttree.getId()+"' lmid='"+sttree.getId()+"' href='"+sttree.getHref()+"' opentype='"+sttree.getOpentype()+"' bg='"+sttree.getIcon()+"' target='_blank' ><span>"+sttree.getText()+"</span></a>");
						}else if("2".equals(sttree.getOpentype())){
							//新开页打开c3系统moduleurl配置相对地址连接加入channelid,regflag,cookieid参数
							String thischannelid=sttree.getId().replaceAll("_",".");
							out.println("<a onclick='menuclick(this)' id='"+sttree.getId()+"' lmid='"+sttree.getId()+"' href='"+sttree.getHref()+"' opentype='"+sttree.getOpentype()+"' bg='"+sttree.getIcon()+"' target='_blank' ><span>"+sttree.getText()+"</span></a>");
						}else if("3".equals(sttree.getOpentype())){
							//在框架内打开moduleurl配置连接
							out.println("<a onclick='menuclick(this)' id='"+sttree.getId()+"' lmid='"+sttree.getId()+"' href='"+sttree.getHref()+"' opentype='"+sttree.getOpentype()+"' bg='"+sttree.getIcon()+"' target='iframe01' ><span>"+sttree.getText()+"</span></a>");
						}else if("5".equals(sttree.getOpentype())){
							//以js方式调用moduleurl配置js方法,js执行vimnumber值
							out.println("<a onclick='menuclick(this)' id='"+sttree.getId()+"' lmid='"+sttree.getId()+"' onclick='"+sttree.getHref()+"' opentype='"+sttree.getOpentype()+"' bg='"+sttree.getIcon()+"'  ><span>"+sttree.getText()+"</span></a>");
						}else{
							//1在框架内打开c3系统moduleurl配置相对地址连接加入channelid,regflag,cookieid参数
							String thischannelid=sttree.getId().replaceAll("_",".");
							out.println("<a onclick='menuclick(this)' id='"+sttree.getId()+"' lmid='"+sttree.getId()+"' href='"+sttree.getHref()+"' opentype='"+sttree.getOpentype()+"' bg='"+sttree.getIcon()+"' target='iframe01' ><span>"+sttree.getText()+"</span></a>");
						}
			    		out.println("</dt>");
					}
				}
				out.println("</dl></div>");
			}
			out.println("</li>");
		}
	}
%>
					<div class="clearfix"></div>
				</ul>
			</div>
			<div class="clea"></div>
		</div>
	<!-- 一级栏目结束 -->
  </div><!--end header--> 
	<div class="<%=screenWidthId%>">
  <div class="iframe">
		<iframe id="iframe01" name="iframe01" src="manageindex.action"
			width="100%" height="1565" scrolling="no" frameborder="0" style="min-width:1000px;"></iframe>
  </div>
  </div>
	<!--页脚开始-->
	<iframe style="min-width: 1000px;" id="footiframe" name="footiframe" src="" width="100%" height="190" scrolling="no" frameborder="0"></iframe>
</body>
</html>
<script src="<%=path %>/script/common.js"></script>

<script>
<!--
	//可配置js代码段
	var _type4OtherConfig="manage_index";
	
	//自动进入栏目
	try{
	if(defalutselect.channel){
		//判断打开的栏目
		var targetObject=$("[lmid="+defalutselect.channel.replace(/\./g,"_")+"]");
		if(targetObject){
			targetObject.click();
		}
	}
	}catch(e){}
	
	/*切换角色弹出层*/
	$("a.user").bind("click", function(){
		if($(".login_con").css("display") == "none"){
			$(".login_con").fadeIn(500);
			if(usertype == 4){ //学生则直接显示输入框
				$("#blo_1").show();
				$("#blo_2").hide();
				getRoles();
			}else{ //若没有绑定多个家长账号，则直接显示输入框
				if($("#blo_2 a").size()!=1){ //判断blo_2中存在账号可选择
					$(".login_con_bg").css("min-height",280+(parseInt($("#blo_2 a").size())-4)*50);
					$("#blo_2").show();
					$("#blo_1").hide();
				}else{
					$("#blo_1").show();
					$("#blo_2").hide();
					getRoles();
				}
			}
		}else{
			$(".login_con").hide(300);$("#roleDiv").hide();
		}
		//刷新验证码
		$(".yanzeng").find("img").eq(0).click();
	});
	//显示其他
	function showLogin(){
		$("#blo_2").hide();
		$(".login_con_bg").css("min-height",280);
		$("#blo_1").fadeIn(500);
		getRoles();
	}
	//选择角色点击事件
	$(".tab_login a").click(function(){
		$(this).addClass("cur_5");
		$(this).siblings().removeClass();
		//登录角色
		$("#loginUsertype").attr("value",$(this).attr("id"));
		//调用选择账号接口
		$("#roleDiv").attr("phonenum","");
		getRoles();
		//刷新验证码
		$(".yanzeng").find("img").eq(0).click();
	});
	//登录框检测js
	function login_check(){
		if ($("#inputname").val() == '' || $("#inpwd").val() == '' || $("#validateCode").val() == ''){
			$(".usr").addClass("err");
			$(".pwd").addClass("err");
			$(".check").addClass("err");
			shock();	
			return false;
		}else{
			$(".usr").removeClass("err");
			$(".pwd").removeClass("err");
			$(".check").removeClass("err");
			$("#pwd").val($("#inpwd").val());
			if($("#loginUsertype").val().replace(/\s+/g,"")==""){ //默认老师
		     $("#loginUsertype").attr("value","teacher");
		    }
			if($("#username").val()==""){
				//若用户输入的是手机号，但是没有多个账号选择，则调用接口获取用户的账号，以供下方使用
				util.getCharsetRemoteJson("SSO","SSO.203","q="+$("#inputname").val().replace(/\s+/g,"")+"&timestamp="+Math.floor(Math.random()*10000),"gbk",function(result){
					var j = 0;
					if(result){
					  for(var i = 0;i<result.length;i++){
						  if(result[i].userType == $("#loginUsertype").val() ){
							  j++;
						   	$("#username").attr("value",result[i].username);
						  }
					  }
					 }
					if(j>1){ //表明该用户没有选择账号
						art.dialog({
			       //设置内容与边界距离
			       top:'50%',
			       icon:'face-sad',
			       padding:5,
			       title:'提示信息',
			       width:500,
			       left:'60%',
			       //提示内容
			       content: "请选择您需要切换的账号信息，再确认！",
			       //开启锁屏
			       lock:true,
			       //锁屏遮罩透明度
			       opacity: 0.1,
			       ok: function () {
								$("#username").attr("value","");
			            return true;
			          },
			          okVal:'确定',
			          close:function(){
			        	  $("#username").attr("value","");
			            return true;
			       }
			      });
						return false;
					}
					if($("#username").val()=="")$("#username").attr("value",$("#inputname").val().replace(/\s+/g,""));
					loginYz();
				});
			}else{
				loginYz();
			}
			return false;
		}
	}
	//登录验证
	function loginYz(){
		var username= $("#username").val().replace(/\s+/g,"");
   		var pwd = $("#pwd").val().replace(/\s+/g,"");
			$.get("<%=basePath%>changeCode.action?username="+username+"&pwd="+pwd,"",function(data){
				var strs = data.split(",");
				var userN = strs[0];
				var pwD = strs[1];
				var param = "appFlg=portal&pwd="+pwD+"&username="+userN+"&loginUsertype="+$("#loginUsertype").val()+"&rand="+$("#validateCode").val()+"&authType=onlyCheck&validateCodeEn=1";
				//调用用户中心认证接口，判断用户输入信息是否正确，若不正确则给出返回的认证提示，否则进行登录  
				util.getRemoteJson("SSO","SSO.202",param,function(result){
		      if(result.authFlg != 0){ //认证失败
		       art.dialog({
		       //设置内容与边界距离
		       top:'50%',
		       icon:'face-sad',
		       padding:5,
		       title:'提示信息',
		       width:500,
		       left:'60%',
		       //提示内容
		       content: result.authInfo,
		       //开启锁屏
		       lock:true,
		       //锁屏遮罩透明度
		       opacity: 0.1,
		       ok: function () {
		    	   		//刷新验证码
								$(".yanzeng").find("img").eq(0).click();
		            return true;
		          },
		          okVal:'确定',
		          close:function(){
		        	  //刷新验证码
								$(".yanzeng").find("img").eq(0).click();
		            return true;
		       }
		      });
		      }else{ //认证成功进行登录
		       //登录
		      tologin();
		      }
			   });
			});
	}
	$(".close_2 > a").click(function(){
		$(".login_con").hide();	
	})
	//登录层晃动js
	function shock(){
		for (i = 1; i < 7; i++)	{
			$('.login_con').animate({
				'right': '-=15'
			}, 3, function() {
			    $(this).animate({
					'right': '+=30'
				}, 3, function() {
					$(this).animate({
						'right': '-=15'
					}, 3, function() {
						$(this).animate({
							'right': 0
						}, 3, function() {
							
						});
					});
				});
			});
		}	
	}
	//当输入为手机号的时候，调用选择用户多账号接口，显示该手机号角色绑定的多个账号
	function clearusername(){
		if($("#inputname").attr("value").length!=11){
			$("#roleDiv").css("display","none"); //隐藏角色框
		}else{
			getRoles(); //调用选择账号接口
		}
		$("#username").attr("value","");
		$("#changename").html("");
	}
	//多账号时选择账号
	function getRoles(flag){
		try{
		//自适应宽度及高度
		//document.body.clientWidth
		var phoneNum=$("#inputname").attr("value");
		if(phoneNum.length!=11){
			$("#roleDiv").hide();
			return;
		}
		var allwidth = document.body.clientWidth;
		if(allwidth>1024){
			var wn = (allwidth-1014)/2+800;
			//$("#roleDiv").css("left",wn+"px");
		}else if(allwidth>970){
			var wn = 798-(1014-allwidth)/2;
			//$("#roleDiv").css("left",wn+"px");
		}else{
			//$("#roleDiv").css("left","780px");
		}
		var Xp = $('#inputname').offset().top;
		if(Xp && Xp>100 && Xp<300){
			Xp=Xp+20;
		}
		//$("#roleDiv").css("top",Xp+"px");
		}catch(e){}
		var loginUsertype = "";
		if($("#loginUsertype").val().replace(/\s+/g,"")==""){ //默认老师
			$("#loginUsertype").attr("value","teacher");
			loginUsertype = "teacher";
		}else{
			loginUsertype = $("#loginUsertype").val();
		}
		if(phoneNum!=$("#roleDiv").attr("phonenum")){
			util.getCharsetRemoteJson("SSO","SSO.203","q="+phoneNum+"&timestamp="+Math.floor(Math.random()*10000)+"&loginUsertype="+loginUsertype,"gbk",function(result){
				if(phoneNum!=$("#roleDiv").attr("phonenum") || $("#roleList li").length==0){
					if(phoneNum!=$("#roleDiv").attr("phonenum") || $("#roleList li").length==0){
						$("#roleList").html("");
						if(result){
							for(var num=0;num<result.length;num++){
								if(num%2==0){
									$("#roleList").append('<li class="ac_even" style="height:22px;line-height:22px;margin-bottom:0px;"  onmouseover="this.className=\'ac_over\'" onmouseout="this.className=\'ac_even\'" roleid="'+result[num].username+'" onclick="selRole(this)" >'+result[num].role+'</li>');
								}else{
									$("#roleList").append('<li class="ac_odd" style="height:22px;line-height:22px;margin-bottom:0px;" onmouseover="this.className=\'ac_over\'" onmouseout="this.className=\'ac_odd\'" roleid="'+result[num].username+'" onclick="selRole(this)" >'+result[num].role+'</li>');
								}
							}
							if(result.length>0){
								if($("#roleList li").length>0){
									$("#roleList").attr("height",(result.length * 22));
									$("#roleDiv").css("display","block");
								}else{
									$("#roleDiv").css("display","none");
								}
							}else{
								$("#roleDiv").css("display","none");
								alertNoRole(flag);
							}
						}
						$("#roleDiv").attr("phonenum",phoneNum);
					}
				}
			});
		}else{
			if($("#roleList li").length>0){
				$("#roleList").attr("height",($("#roleList li").length * 22));
				$("#roleDiv").css("display","block");
			}else{
				$("#roleDiv").css("display","none");
				alertNoRole(flag);
			}
		}
	}
	function selRole(sobj){
		try{
		$("#username").attr("value",$(sobj).attr("roleid"));
		$("#changename").html($(sobj).text());
		$("#roleDiv").css("display","none");
		$(document).unbind("click");
		}catch(e){alert(e);}
	}
	//提示无角色可选择
	function alertNoRole(flag){
		if(flag){
			$("#getrolemsg").show();
			window.setTimeout("$('#getrolemsg').hide(200);",1000);
		}
	}
//-->
</script>
<script type="text/javascript" src="<%=path %>/common/otherConfig.jsp" ></script>
<script language="javascript" type="text/javascript">
   	jQuery(".nav_con li").bind("mouseover", function () {
        jQuery(this).find(".subnav").show();
    });
    jQuery(".nav_con li").bind("mouseleave", function () {
        jQuery(this).find(".subnav").hide();
    });
</script>