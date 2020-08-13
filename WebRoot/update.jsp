<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>升级公告</title>
<style>
<!--
* {padding:0;margin:0;}
body {background:#efefef;}
.tips {width:800px;height:400px;position:absolute;top:50%;left:50%;margin-top:-200px;margin-left:-400px;}
-->
</style>
</head>

<body>
<div class="tips"><img src="tips.jpg" width="800" height="400" />
<div style="float:right;position:absolute;top:10%;left:40%;margin-top:25px;margin-left:0px;font-size:12px;width:400px;line-height:20px;">
	尊敬的用户： <br/>
      您好！ <br/><br/>
     &nbsp;&nbsp;&nbsp;&nbsp;<%= zzvcom.util.Common.getUpdateinfo() %>
	<br/><br/><br/>
    <div style="text-align:right;padding-right:10px;" >特此通告。</div>
    <% if("2".equals(zzvcom.util.Common.getShowupdate())){ %>
    <br/>
    <div style="text-align:right;padding-right:10px;" ><i><span id="totalSecond">10</span></i>&nbsp;秒后进入 &nbsp;&nbsp;&nbsp;&nbsp;<b><a id="loginlink" href="index.action" >立即登陆</a></b></div>
    <% } %>
</div>
</div>
<script type="text/javascript">
var sec=Number(document.getElementById("totalSecond").innerText);
function countTime(){
	if(sec==0 || sec<0){
		document.getElementById("loginlink").click();
	}
	document.getElementById("totalSecond").innerText=sec--;
}
setInterval("countTime()", 1000);
</script>
</body>
</html>
