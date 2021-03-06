<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="zzvcom.util.Common"%>
<%@page import="zzvcom.util.RCode"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="vcom.sso.vo.AuthResult" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
AuthResult authResult=Common.getSessiongUser(request);
String username = authResult.getUser().getUsername();
String usertype = authResult.getUser().getUsertype();
String gradeCode = null;
if("4".equals(usertype)){
    gradeCode = authResult.getUser().getSchoolClasses()[0].getGradeCode();
}

String data=request.getParameter("data");
if(data==null)data="";
data=data.replaceAll("'","\\\\'");
String showguide = Common.getShowguide();
String teachUrl = Common.getTeachUrl();
String parentUrl = Common.getParentUrl();
String pupilUrl = Common.getPupilUrl();
String seniorUrl = Common.getSeniorUrl();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>登录中</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0"> 
		<script src="<%=path %>/script/jquery.js"></script>
		<script src="<%=path %>/script/jquery-migrate-ada.js"></script>
		<script type="text/javascript" src="<%=path%>/script/util.js"></script>
  </head>
  <body>
    <script type="text/javascript">
		//根据当前角色和学段判断跳入那个引导区
		//var username = "username";
		//var usertype = "usertype";
		//var schoolStage="mustudyStage";//学段
		//var gradeCode ="gradeCode"; //年级
		<%
		if((request.getServerName()+"").indexOf(Common.getDomain())>=0){
			out.print("document.domain = \""+Common.getDomain()+"\";");
		}
		%>
		var username = "<%=username%>";
		var usertype = "<%=usertype%>";
		var gradeCode = "<%=gradeCode%>";

		var path = "<%=basePath%>";
		var showguide = "<%=showguide%>";
		//userguide/web/T-index.html?param=1
		var teachUrl = "<%=teachUrl%>"; 
		//userguide/web/P-index.html?param=1
		var parentUrl = "<%=parentUrl%>"; 
		//userguide/web/S-index.html?param=1
		var pupilUrl = "<%=pupilUrl%>"; 
		 //userguide/web/students-index.html?param=1
		var seniorUrl = "<%=seniorUrl%>";
		//IE版本低的直接回老版本
		if(util.browser.msie && util.browser.version<9){
			top.location='<%=basePath%>/manage/owebindex.action?data=<%=data%>';
			return;
		}
		if(showguide != ""  && showguide == "1"){ //开启引导
			//读取引导cookie值,判断是否已经做过引导了,若未做过引导,弹出相应引导,否则直接跳转登录
			var sfyyd = util.getCookie("sfyyd");
			if(sfyyd.indexOf(username)==-1 && teachUrl != "" && parentUrl != "" && pupilUrl != "" && seniorUrl != ""){
				//将该栏目本次显示引导写入cookie中,以便下次再点击该栏目的时候不用再弹出引导
				sfyyd = sfyyd +"," +username;
				util.saveCookie("sfyyd",sfyyd,1000);
				if(usertype == 2 || usertype == 3 ){  //代表教师
					var spliteStr="?";
					if(teachUrl.indexOf("?")>-1){
						spliteStr="&";
					}
					//top.location = path+ teachUrl +"&path=" + path;
					top.location = teachUrl +spliteStr+"path=" + path;
				}else if(usertype == 0){  //代表家长
					var spliteStr="?";
					if(parentUrl.indexOf("?")>-1){
						spliteStr="&";
					}
					top.location =  parentUrl +spliteStr+"path=" + path;
				}else if(usertype == 4){  //代表学生
					var spliteStr="?";
					if(gradeCode == "0001" || gradeCode =="0002" || gradeCode =="0003"|| gradeCode =="0004"|| gradeCode =="0005" || gradeCode =="0006"){ //小学学段或6年级用小学生的引导
						if(pupilUrl.indexOf("?")>-1){
							spliteStr="&";
						}
						top.location =  pupilUrl +spliteStr+"path=" + path;
					}else{
						if(seniorUrl.indexOf("?")>-1){
							spliteStr="&";
						}
						top.location =  seniorUrl +spliteStr+"path=" + path;
					}
				}
			}else{
				top.location='<%=basePath%>webindex.action?data=<%=data%>';
			}
		}else{
			top.location='<%=basePath%>webindex.action?data=<%=data%>';
		}
</script>
  </body>
</html>
