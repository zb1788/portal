<%@ page language="java" import="java.util.*,vcom.sso.vo.*,vcom.sso.pdgrant.*" pageEncoding="utf-8"%>
<%@ include file="../space/screen_width.jsp" %>
<%@page import="zzvcom.util.Common"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
VSysUser tuser = ((AuthResult)session.getAttribute("authResult")).getUser();
String areaId=null;
String areaName=null;
String schoolId=null;
String schoolName=null;
if(tuser.getArea()!=null){
areaId=tuser.getArea().getAreaId();
areaName=tuser.getArea().getFullname();
}
if(tuser.getSchool()!=null){
schoolId=tuser.getSchool().getSchoolId();
schoolName=tuser.getSchool().getSchoolName();
}
%>
<!DOCTYPE html>
<html>
  <head>
    <title>优教班班通-地区管理员空间-首页</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <link href="<%=path %>/manage/style/common.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path %>/manage/style/manage.css" rel="stylesheet" type="text/css" />
		<link href="<%=path %>/manage/style/guanli.css" rel="stylesheet" type="text/css"/>
		<script src="<%=path %>/js/lib/jquery.js" type="text/javascript"></script>
		<script src="<%=path %>/script/util.js"></script>
		<script src="<%=path%>/common/config.jsp?showip=1" type="text/javascript"></script>
		<script src="<%=path %>/manage/script/userspace.js"></script>
		<script src="//<%=Common.getSysUrl(request.getServerName(),"PORTAL")%>/script/common.jsp" type="text/javascript"></script>
    <script type="text/javascript">
    	<!--
    	var areaId = "<%=areaId %>";//区域id
    	var path = "<%=path %>";
    	var s = areaId.substring(0,areaId.lastIndexOf(".")+1).replace(/\./g,"_");
    	var tjurl = protocol_ip+sysconfig["STAT_IP"]+":8080/";
    	var schoolid =  "<%=schoolId %>";
    	var userActionJson = "<%=zzvcom.util.StringUtil.getStrFromNull((String)session.getAttribute("userActionJson")) %>";
    	$(document).ready(function(){
    		var dqtime = new Date();
    		var month = parseInt(dqtime.getMonth());
    		if(month == 0)month="12";
    		$("#month").html(month);
  			//用户管理type（0-校管理员  1-区管理员）
  			userspace.getUserManage("1");
    		//使用排行
    		userspace.getRankPvJson();
    	});
    	//-->
    </script>
  </head>
  <body>
  <div class="<%=screenWidthId%>">
	<div class="con_manage yj_rangking">
    <div class="" style="width:100%; padding:20px 0px; background:#fff;">
        <!--审核提醒结束-->
        <div class="yh_tj" style="width:100%;">
        	<h1>用户统计</h1>
			   <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_q qkq">
                  <tr class="tit2">
                  	<td width="20%">类型</td>
                    <td width="20%">学校</td>
                    <td width="20%">班级</td>
                    <td width="20%">教师</td>
                    <td width="20%">学生</td> 
                  </tr>
                  <tr>
                  	<td>注册数量</td>
                    <td id="schoolCount">暂无数据</td>
                  	<td id="schoolClassCount">暂无数据</td>
                    <td id="teacherCount">暂无数据</td>
                  	<td id="studentCount">暂无数据</td>
                  </tr>
              </table>
        <div class="clearfix"></div>
        </div>
        <!--用户管理结束-->
       <div class="clearfix"></div>
        <div class="" >
        	 <h2 class="pai"><span id="month"></span>月份优教通使用排行榜</h2>
               	<div class="menu_m"  style="width:32%; float:left;">
            		<table id="login_rank" width="100%" border="0" cellspacing="0" cellpadding="0" class="table_3 qk3 ">
                  <tr>
                    <td width="20%" style="height:25px"></td>
                    <td width="45%" style="height:25px"></td>
                    <td width="35%" style="height:25px"></td>
                  </tr>
                  <tr class="hebing">
                  	<td colspan=3 class="ranking">用户登录排名</td>
                    <td ></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>学校名称</td>
                    <td>登录总次数</td>
                  </tr>
               </table>
         		</div>
         		<div class="menu_m"  style="width:32%; float:left; margin-left:20px;">
            	  <table id="jxhd_rank" width="100%" border="0" cellspacing="0" cellpadding="0" class="table_3 qk3 ">
                  <tr>
                    <td width="20%" style="height:25px"></td>
                    <td width="40%" style="height:25px"></td>
                    <td width="40%" style="height:25px"></td>
                  </tr>
                  <tr class="hebing">
                  	<td width="20%"colspan=3 class="ranking">家校互动使用排名</td>
                    <td width="30%"></td>
                    <td width="50%"></td>
                  </tr>
                   <tr >
                    <td></td>
                    <td>学校名称</td>
                    <td>发送次数</td>
                  </tr>
               </table>
                </div>
         		<div class="menu_m"  style="width:32%; float:right;">
            	<table id="fszy_rank" width="100%" border="0" cellspacing="0" cellpadding="0" class="table_3 qk3 ">
                  <tr  >
                    <td width="20%" style="height:25px"></td>
                    <td width="40%" style="height:25px"></td>
                    <td width="40%" style="height:25px"></td>
                  </tr>
                  <tr class="hebing">
                  	<td width="20%"colspan=3 class="ranking">发送作业排名</td>
                    <td width="30%"></td>
                    <td width="50%"></td>
                  </tr>
                   <tr >
                    <td></td>
                    <td>学校名称</td>
                    <td>发送次数</td>
                  </tr>
               </table>
         </div>
         		<div class="menu_m"  style="width:32%;">
            		<table id="bdzy_rank" width="100%" border="0" cellspacing="0" cellpadding="0" class="table_3 qk3 ">
                  <tr  >
                    <td width="20%" style="height:25px"></td>
                    <td width="40%" style="height:25px"></td>
                    <td width="40%" style="height:25px"></td>
                  </tr>
                  <tr class="hebing">
                  	<td colspan=3 class="ranking">本地资源排名</td>
                    <td ></td>
                    <td></td>
                  </tr>
                  <tr >
                    <td></td>
                    <td>学校名称</td>
                    <td>资源条数</td>
                  </tr>
               </table>
         		</div>
        </div>
    </div>
    <div class="clearfix"></div>
</div>
</div>
<script type="text/javascript">
<!--
//可配置js代码段
var _type4OtherConfig="manage_qu";
try{
	var otherConfig = decodeURIComponent(decodeURIComponent(portal_config.otherConfig));
	eval(otherConfig);
}catch(e){}
//-->
</script>
  </body>
</html>
