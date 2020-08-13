<%@ page language="java" import="vcom.sso.vo.AuthResult,vcom.sso.util.*,net.sf.json.*,zzvcom.util.Common" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%><%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String ut=null;
Cookie[] cks=request.getCookies();
for(int i = 0;cks != null && i < cks.length;i++){  
	Cookie ck = cks[i];   
    if(ck.getName().equals("ut"))
    {
    	ut=ck.getValue();
    }
}
AuthResult authResult=null;
if(ut!=null && ut.trim().length()>0){
	String authUrl="http://"+Common.getSysUrl(request.getServerName(),"SSO_IP")+"/sso/ssoGrant?appFlg=PORTAL&isPortal=0&ut="+ut;
	String authResultJson=null;
	//logger.info("authUrl："+authUrl);
	try
	{
		authResultJson=new HttpClientUtil().get(authUrl);
	}catch(Exception e){
		e.printStackTrace();
	}
	//logger.info("业务系统得到校验信息："+authResultJson);
	JSONObject js = JSONObject.fromObject(authResultJson);
	authResult = (AuthResult) js.toBean(js, AuthResult.class);
}
if(authResult==null || authResult.getAuthFlg()==null || (!authResult.getAuthFlg().equals("1")) || authResult.getUser()==null){
	//response.sendRedirect("step2.html");
	request.getRequestDispatcher("step2.jsp").forward(request, response); 
	return;
}
String callname="";
if("2".equals(authResult.getUser().getUsertype()) || "3".equals(authResult.getUser().getUsertype())){
	callname="老师";
}else if("4".equals(authResult.getUser().getUsertype())){
	callname="同学";
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
<script type="text/javascript" src="<%=basePath %>common/config.jsp"></script>
<link href="public/style/register.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" media="all" href="public/script/calendar/calendar-system.css" title="calendar-blue" />
<script type="text/javascript" src="baidu.js"></script>
<script src="public/script/jquery.js"></script>
<script src="public/script/artDialog.js?skin=default"></script>
<script type="text/javascript" src="public/script/calendar/calendar.js"></script>
<script type="text/javascript" src="public/script/calendar/calendar-setup.js"></script>
<script type="text/javascript">
try{
setBaiDuUrl("<%=returnUrl %>");
}catch(e){}
var setp1url="http://jyk.yjt361.com/grant/";
var setp2url="<%=basePath%>/grant/step2.jsp";
if(window.location.href.indexOf("?")>-1){
	returnParam=window.location.href.substring(window.location.href.indexOf("?")+1);
	if("#"==returnParam.substring(returnParam.length-1)){
		returnParam=returnParam.substring(0,returnParam.length-1);
	}
	setp1url=setp1url+"?"+returnParam;
	setp2url=setp2url+"?"+returnParam;
}
function grant(){
var openurl=null;
if(baidu_url.indexOf("?")==-1){
	openurl=baidu_url+"?sso="+sysconfig["SSO"]+"&ut=<%=ut%>";
}else{
	openurl=baidu_url+"&sso="+sysconfig["SSO"]+"&ut=<%=ut%>";
}
window.location.href=openurl;
}
function resel(){
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
  <div class="reg_main">
      <div class="logged">
      		<h4 class="text-center">检测您已经登录优教同步学习网，可以直接进行授权！</h4>
      		<div class="lg-user">
      			<h2><img src="public/images/reg/te.png" width="100" height="100" alt=""/></h2>
      			<p><a class="blue" href="#"><%= authResult.getUser().getTruename() %></a><%=callname %><a href="javascript:resel();"  class="blue">切换</a></p>
      			<p><small><%= authResult.getUser().getSchool().getSchoolName() %></small></p>
      		</div>
      		<p class="text-center"><input type="button" class="sub" id=loginbtn name="loginbtn"  value="授权并登录" onmouseover="this.style.backgroundColor='#0091CE'"onmouseout="this.style.backgroundColor='#0096d6'"   onclick="grant()" /></p>
      		<div class="xuzhi">
      			<h3 class="btline"><strong>百度云平台</strong> &nbsp;&nbsp;&nbsp;&nbsp;您将获得以下权限</h3>
             	<p class="tin_2em mt20">读取您的用户名等基本信息</p>
             	<p class="tin_2em">读取您的学校名称、科目、版本等信息</p>
             	<p class="tin_2em">读取您的登录状态信息</p>
              <p class="tin_2em upline mt20">授权后表明您已同意 <a class="blue" href="javascript:void(0);"  onclick="xz_pop();">授权须知 </a></p>
      		</div>
      </div>
     
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
<script>
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
	</script>

<script language="javascript">
function pop_close(num){
	switch (num) 
	   { 
	   case 1:
	   $('#pop_1').hide();   
	   break
	   
	   case 2:
	   $('#pop_2').hide();   
	   break
	  }
	}
function pop_open(num){
	switch (num) 
	   { 
	   case 1:
	   $('#pop_2').hide();
	   $('#pop_1').fadeIn(300);   
	   break
	   
	   case 2:
	   $('#pop_1').hide();
	   $('#pop_2').fadeIn(300);   
	   break
	  }
	}
	
$('.school_list > li > a').bind('click', function(){
		var item=$(this);
		//var school = item.attr('school-id');
		//更新选择大学文本框中的值
		$('#school-name').val(item.text());

		//关闭弹窗
		pop_close(1);
	});


function cloPop() {
	    $('#pop').fadeOut(100);	
		$('#mask').hide();
		}
function openPop() {
	    $('#pop').fadeIn(300);	
		$("#mask").show();
		}
function show_phone(){
	$(".phone").slideDown("400");
	}
function hide_phone(){
	$(".phone").slideUp("400");
	}
</script>