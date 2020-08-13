<%@ page language="java" import="vcom.sso.vo.AuthResult,vcom.sso.util.*,net.sf.json.*,zzvcom.util.Common" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%><%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%><!DOCTYPE html>
<html>
<head>
<title>百度教育云授权-班班通</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<link href="public/style/common.css" rel="stylesheet" type="text/css" />
<link href="public/style/register.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" media="all" href="public/script/calendar/calendar-system.css" title="calendar-blue" />
<script src="public/script/jquery.js"></script>

<script src="public/script/artDialog.js?skin=default"></script>
<script type="text/javascript" src="public/script/calendar/calendar.js"></script>
<script type="text/javascript" src="public/script/calendar/calendar-setup.js"></script>
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
        <li ><a id='setp1url' href="#"><span>1</span>选择区域</a></li>
        <li class="sel"><a ><span>2</span>选择登录角色</a></li>
        <li><a ><span>3</span>账号密码登录</a> </li>
      </ul>
      <div class="clearfix"></div>
    </div>
    <div class="reg_main">
    
    	<div class="role">
    		<ul>
    			<li><img src="public/images/reg/te.png" width="100" height="100" alt=""/><span>教师</span><span><input type="radio" name="role" checked="checked" value="teacher"/></span></li>
    			<li><img src="public/images/reg/stu.png" width="100" height="100" alt=""/><span>学生</span><span><input type="radio"  name="role" value="student"/></span></li>
    			<li><img src="public/images/reg/jz.png" width="100" height="100" alt=""/><span>家长</span><span><input type="radio" name="role" value="parent"/></span></li>
    			<li><img src="public/images/reg/gl.png" width="100" height="100" alt=""/><span>管理员</span><span><input type="radio" name="role" value="manager"/></span></li>
    		</ul>
    		
   		  <p class="mt20 text-center"><input type="button" class="sub" id="user" name="user"  value="下一步" onmouseover="this.style.backgroundColor='#0091CE'"onmouseout="this.style.backgroundColor='#0096d6'"  onclick="gonext();"    /></p>
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

<div id="reg_pop" style="display:none;">
    <div class="popContent ">
    <div class="reg_cgts">
   	  <p>您已经成功注册优教通空间，地址：<a href="www.yjt361.com" target="_blank" class="blue">www.yjt361.com</a>,学生/家长账号为：<b>18638190633</b>，密码为：<b>12456</b>，请妥善保管，祝您使用愉快！</p>
      <p>为更好使用功能，请您登陆平台<a href="register_ws.html" target="_blank" class="blue">完善个人信息</a>，并扫描以下二维码，安装优教信使！</p>
     
     	<p class="reg_k">
        <img src="img/youxin.jpg" width="190" height="190"  alt=""/> <a href="#" class="reg_jinru">进入学生空间</a> </p>
     
     
     
       </div>
    </div>
    <!--end popContent--> 
</div>
</body>
</html>
<script type="text/javascript">
var returnParam="";
var setp1url="http://jyk.yjt361.com/grant/";
if(window.location.href.indexOf("?")>-1){
	returnParam=window.location.href.substring(window.location.href.indexOf("?")+1);
	if("#"==returnParam.substring(returnParam.length-1)){
		returnParam=returnParam.substring(0,returnParam.length-1);
	}
	setp1url=setp1url+"?"+returnParam;
}
$("#setp1url").attr("href",setp1url);
function gonext(){
   var roles=document.getElementsByName('role');
   var selrole = null;
	for(var i=0;i<roles.length;i++){
		var r=roles[i];
		if(r.checked){
			selrole=r.value;
			break;
		}
	}
	if(selrole!=null){
		window.location.href='step3.jsp?role='+selrole+"&"+returnParam;
	}else{
		alert("请选择一个登录角色!");
	}
}
</script>
<script src="public/script/common.js"></script>
<script type="text/javascript">
function reg_pop(){
	art.dialog({
		padding: 0,
		title:'成功提示',
		width:700,
		content: document.getElementById('reg_pop'),//获取id为dTree_5层里面的内容，dTree_5层在页面下方
		lock:true,
		opacity: 0.2,
		cancelVal: '关闭',
    	cancel: true //为true等价于function(){}
});
}


</script>
