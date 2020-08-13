<%@ page language="java" import="vcom.sso.vo.AuthResult,vcom.sso.util.*,net.sf.json.*,zzvcom.util.Common" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%><%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String usertype=request.getParameter("role");
if(usertype==null){
	usertype="";
}
String returnUrl=request.getParameter("returnUrl");
if(returnUrl==null){
	returnUrl="";
}
%>
<!DOCTYPE html>
<html>
<head>
<title>百度教育云授权-班班通</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<link href="public/style/common.css" rel="stylesheet" type="text/css" />

<link href="public/style/register.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" media="all" href="public/script/calendar/calendar-system.css" title="calendar-blue" />
<script type="text/javascript" src="baidu.js"></script>
<script src="public/script/jquery.js"></script>
<script src="public/script/artDialog.js?skin=default"></script>
<script type="text/javascript" src="public/script/calendar/calendar.js"></script>
<script type="text/javascript" src="public/script/calendar/calendar-setup.js"></script>
<script src="<%=basePath %>script/util.js" type="text/javascript"></script>
<script type="text/javascript" src="<%=basePath %>common/config.jsp"></script>
<script type="text/javascript" src="<%=basePath %>script/js_md5.js"></script>
<script type="text/javascript" src="blogin.js"></script>
<script type="text/javascript">
try{
setBaiDuUrl("<%=returnUrl %>");
}catch(e){}
var setp1url="http://jyk.yjt361.com/grant/";
var setp2url="<%=basePath%>/grant/";
if(window.location.href.indexOf("?")>-1){
	returnParam=window.location.href.substring(window.location.href.indexOf("?")+1);
	if("#"==returnParam.substring(returnParam.length-1)){
		returnParam=returnParam.substring(0,returnParam.length-1);
	}
	setp1url=setp1url+"?"+returnParam;
	setp2url=setp2url+"?"+returnParam;
}
var domain = portal_config.domain;
var areaname = portal_config.areaname;
var areacode = portal_config.areacode;
	function xz_pop(){
	art.dialog({
		padding: 0,
		title:'授权须知',
		width:710,
		content: document.getElementById('xuzhi_pop'),//获取id为dTree_5层里面的内容，dTree_5层在页面下方
		lock:true,
		opacity: 0.2,
		cancelVal: '关闭',
    	cancel: true //为true等价于function(){}
});
} 
function checkNull(str){
	if(str!=null && str!=""){
		return false;
	}
	return true;
}
var usertype="<%=usertype%>";
if(""==usertype){
	window.location.href=setp2url;
}
</script>
</head>

<body>
<div class="w1200">
  <div class="logo_login"> <span class="logo1"><a href="login.html" title="返回首页"><img src="public/images/login/logo.png" width="360" height="60"></a></span> </div>
  <div class="tel400 qk3">
    <li ><img src="public/images/login/tel.png"></li>
  </div>
  <div class="clearfix"></div>
</div>
<!--end block1-->

<div class="w1200">
  <div class="conCity_2">
    <div class="re_nav">
      <ul>
       <!-- <span><a href="#">返回首页</a></span>-->
        <li ><a id="setp1url" href="#"><span>1</span>选择区域</a></li>
        <li ><a id="setp2url" href="#"><span>2</span>选择角色</a></li>
        <li class="sel"><a  ><span>3</span>账号密码登录</a> </li>
      </ul>
      <div class="clearfix"></div>
    </div>
    <div class="reg_main">
      
      <form id="confirmForm" method="post" onsubmit="return false" >
        <table cellpadding="10" cellspacing="0" border="0" width="80%" >
          <tr>
            <td width="40%" style="text-align:right"><label><!--<font class="redxing">*</font>-->用户账号</label></td>
            <td width="34%" align="left" style="text-align:left;position: relative;"><input type="text" class="txt" id="inputname" name="inputname" title="请输入账号/手机号" value="请输入账号/手机号" onkeyup="getRoles()"; onclick="getRoles()" onfocus="if(this.value=='请输入账号/手机号'){this.value='';};login_1.className='tips_on'" onblur="if(this.value==''){this.value='请输入账号/手机号';login_1.className='tips_off'}"  />
            	<div id="roleDiv" phonenum="" class="nid-bd" style="display:none;" >
				<ul id="roleList" >
				  <li><a >加载中..</a></li>
				</ul>
			  	</div>
			</td>
            <td><div  id="login_1" class="tips_off" >请输入账号/手机号</div></td>
            <input type="hidden" value="" id="username" />  
          </tr>
          <td width="40%" style="text-align:right"><label><!--<font class="redxing">*</font>-->用户密码</label></td>
            <td width="34%"><input type="password" class="txt" id="pwd" name="pwd" title="请输入密码"  value=""  onfocus="this.style.color='#333333';login_2.className='tips_on';"  onblur="this.style.color='#999999';login_2.className='tips_off'" minLength="6"  maxLength="12" /></td>
            <td ><div  id="login_2" class="tips_off" >请输入6-12位密码，错误3次就会被锁定 </div></td>
          </tr>
          <tr>
            <td width="40%" style="text-align:right"><label><!--<font class="redxing">*</font>-->验证码</label></td>
            <td width="34%" align="left"><input type="text" class="txt_confirm txt"  value="请输入验证码" name="code" id="code" onfocus="this.value='';login_12.className='tips_on';"  onblur="if(this.value=='') {this.value='请输入验证码';this.style.color='#999999'};login_12.className='tips_off'" />
              <img id="yzm" src="" width="58" height="28"  alt="验证码" onclick="changeVCode()" />&nbsp;<a id="cyzm"  onclick="changeVCode()">看不清，换一个 </a></td>
            <td ><div  id="login_12" class="tips_off" >请输入验证码 </div></td>
          </tr>
          <tr>
            <td style="text-align:right"></td>
            <td align="center"><input id="savepass" type="checkbox"  />
              记住密码 &nbsp;&nbsp;&nbsp; <a class="blue"  id="getKey" href="javascript:void(0);"  >找回密码 </a> &nbsp;&nbsp;&nbsp;<a class="blue" href="javascript:void(0);" id="guide" >帮助 </a></td>
            <td></td>
          </tr>
          <tr>
          <td width="40%" style="text-align:right"></td>
            <td width="34%"><input type="button" class="sub" id="loginbtn" name="loginbtn"  value="授权并登录" onmouseover="this.style.backgroundColor='#0091CE'"onmouseout="this.style.backgroundColor='#0096d6'" onclick="login()"  /></td>
            <td ></td>
          </tr>
           <tr>
          <td width="40%" style="text-align:right"></td>
            <td width="34%">
            	<h3 class="btline"><strong>百度云平台</strong> &nbsp;&nbsp;&nbsp;&nbsp;您将获得以下权限</h3>
             	<p class="tin_2em mt20">读取您的用户名等基本信息</p>
             	<p class="tin_2em">读取您的学校名称、科目、版本等信息</p>
             	<p class="tin_2em">读取您的登录状态信息</p>
              <p class="tin_2em upline mt20">授权后表明您已同意 <a class="blue" href="javascript:void(0);"  onclick="xz_pop();">授权须知 </a></p></td>
            <td ></td>
          </tr>
        </table>
      </form>
      <br />
      <br />
    </div>
    
    <!--end citypop--> 
  </div>
</div>
<!--end w1200--> 

<!--页脚-->
<div class="footer mt0">
	<div class="w1200">
    <iframe style="min-width: 1000px;" id="footiframe" name="footiframe" src="http://cms.czbanbantong.com/A01/A01074/A01074017/A01074017001/list_1.html" width="100%" height="185" scrolling="no" frameborder="0"></iframe>
	</div>
  <!--end w980--> 
</div>
<!--end footer-->

<!--弹出层-->
<div id="xuzhi_pop" style="display:none;">
    <div class="popContent ">
       <div class="xz_con">
       <h2>授权须知</h2>
   
        <div class="popCon ">
      <h3> 尊敬的用户：</h3>
    　　<p>您即将通过本登录页面使用优教同步学习网和/或优教信使账号登录第三方站点或软件，如果您无法认同如下内容的，请您返回并拒绝授权：</p>
    　　<p>1、您完成授权后，即视为您同意并授权第三方站点或软件使用优教同步学习网和/或优教信使账号数据接口调用您优教同步学习网和/或优教信使账号的相关信息和数据。如您的授权内容涉及向第三方站点或软件提供您的用户名、学校名称、科目、课程版本等信基本信息，为了提升用户体验，即视为您同意将相关信息授权给第三方站点或软件。</p>
    　　　<p>2、第三方站点和软件的质量和品质由第三方独立负责，并承担全部责任。如因第三方站点或软件存在漏洞、瑕疵、故障、病毒等原因造成您相关权益受损的，您可以请优教同步学习网和/或优教信使协调，但您不应就登录和使用第三方站点或软件的后果要求优教同步学习网和/或优教信使承担任何责任。</p>
    　　　　<p>3、为了保障您的权益，优教同步学习网和/或优教信使将对第三方站点和软件进行定期检测和代码扫描，但您理解任何技术手段并非完全可靠。优教同步学习网和/或优教信使郑重提醒您启用杀毒软件和安全措施，以减轻病毒、恶意代码、漏洞等对您带来的不良影响。</p>
    　　　　　<p>4、网络欺诈往往会模仿、仿冒本登录页面的样式制作视觉感相似的页面引诱用户输入账号和密码等信息，优教同步学习网和/或优教信使提醒您防范网络风险，不要向非优教同步学习网和/或优教信使的站点或任何人士透露您的优教同步学习网和/或优教信使的账号、密码等相关信息。</p>
    　　　　　<p>5、如您发现第三方站点或软件侵犯您的合法权益的，或您不幸遭遇网络欺诈的，请您及时联系并通知优教同步学习网和/或优教信使。</p>
        </div>
        <!-- 
        <div class="text-center"><a href="javascript:void(0);" class="b_tj2">同   意</a><a href="javascript:void(0);" class="b_tj3" >拒   绝</a></div>
    	-->     
       </div>  
    </div>
    <!--end popContent--> 
</div>


</body>
</html>
<script src="public/script/common.js"></script>
<<script type="text/javascript">
<!--
$("#setp1url").attr("href",setp1url);
$("#setp2url").attr("href",setp2url);

var screen_width = window.screen.width;
var screen_width_id = "w980";
if(screen_width>=1280){
	screen_width_id = "w1200";
}else{
	screen_width_id = "w980";
}
util.saveCookie("screen_width_id",screen_width_id,1000,"",domain);
if(areacode!=""){
	util.saveCookie("localAreaCode",areacode,1000,"/",domain);
}
//找回密码
var getKey_url = "http://"+sysconfig.TMS+interface_config["TMS.803"]+"&portalUrl="+encodeURI(encodeURI(basePath));
$("#getKey").attr("href",getKey_url);
//登陆帮助链接
var guide="http://"+sysconfig.CMS+interface_config["CMS.PAGE.USEGUIDE"];
$("#guide").attr("href",guide);
//验证码
var yz_url = "http://"+sysconfig.SSO+interface_config["SSO.CODE"];
window.setTimeout(function(){$("#yzm").attr("src",yz_url+'?r='+Math.floor(Math.random()*10000))},300);
if(util.getCookie("loginUsertype")!='' && usertype==util.getCookie("loginUsertype")){
	if(util.getCookie("inputname")!=''){
	     $("#inputname").attr("value",decodeURI(util.getCookie("inputname")));
	     //初始化密码
	     if(util.getCookie("pwd")!=''){
	     	$("#pwd").attr("value",util.getCookie("pwd"));
	     	$("#savepass").attr("checked",true);
	     }
	}
	if("parent"==usertype){
		getRoles();
	}
}
function changeVCode(){
	$("#yzm").attr("src",yz_url+'?r='+Math.floor(Math.random()*10000));
}
//-->
</script>


