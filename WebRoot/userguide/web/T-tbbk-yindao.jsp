<%@ page language="java" import="java.util.*,zzvcom.util.Common" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transition al.dtd">
<html>
<head>
<title>同步备课引导</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7"/>
<link href="../css/w1200/T-tbbk-yindao.css"  id="cssName" rel="stylesheet" type="text/css">
<script src="../jquery/jquery.js"></script>
<script type="text/javascript">
		<%
			if((request.getServerName()+"").indexOf(Common.getDomain())>=0){
				out.print("document.domain = \""+Common.getDomain()+"\";");
			}
		%>
	//当点击关闭按钮时,调用上层关闭引导层div方法
	function closeDiv(){
		parent.document.getElementById("common_dhzz").style.display = "none";
	}
</script>
</head>

<body>
<div class="bjbox">
   <a href="#" onclick="closeDiv();"><img class="turn-off" src="../images/w1200/tun-off.png"></a>
   <div class="ydbox">
      <a class="btn" href="#" onclick="closeDiv();"></a>
   </div>
</div>
</body>
</html>
<script>
$(document).ready(function(){
	var clienW =($(window).width()); 
	if (clienW >= 1280) {
		$("#cssName").attr("href","../css/w1200/T-tbbk-yindao.css");
	}else{
		$("#cssName").attr("href","../css/w980/T-tbbk-yindao.css");
		}
	
	
});
function resizeWidth(){
	var clienW =($(window).width()); 
	if (clienW >= 1280) {
		$("#cssName").attr("href","../css/w1200/T-tbbk-yindao.css");
	}else{
		$("#cssName").attr("href","../css/w980/T-tbbk-yindao.css");
		}
	}

$(window).resize(function(){
	setTimeout(resizeWidth,500);
	
})
</script>

