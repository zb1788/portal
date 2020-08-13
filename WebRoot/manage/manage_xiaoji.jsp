<%@ page language="java" import="java.util.*,vcom.sso.vo.*,vcom.sso.pdgrant.*" pageEncoding="utf-8"%>
<%@page import="vcom.sso.vo.AuthResult"%>
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
String schoolTypeName=null;
if(tuser.getArea()!=null){
	areaId=tuser.getArea().getAreaId();
	areaName=tuser.getArea().getFullname();
}
if(tuser.getSchool()!=null){
	schoolId=tuser.getSchool().getSchoolId();
	schoolName=tuser.getSchool().getSchoolName();
	try{
		switch(Integer.parseInt(tuser.getSchool().getSchoolType())){
			case 11: schoolTypeName="小学";break;
			case 21: schoolTypeName="完全中学";break;
			case 22: schoolTypeName="高级中学";break;
			case 23: schoolTypeName="初级中学";break;
			case 24: schoolTypeName="一贯制学校";break;
			case 25: schoolTypeName="幼儿园";break;
			default: schoolTypeName="一贯制学校九年";break;
		}
	}catch(Exception e){
		
	}
}
String statid = areaId.substring(0,areaId.lastIndexOf(".")+1).replaceAll("\\.","_");
String statport=":8080/";
if("https://".equals(Common.PROTOCOL)){
	statport=":8081/";
}
String tjtp_src = Common.PROTOCOL+Common.getSysUrl(request.getServerName(),"VFS")+"/upload/portal/data/"+statid+"/"+schoolId;
%>
<!DOCTYPE html>
<html>
  <head>
    <title>优教班班通-校级管理员空间-首页</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <link href="<%=path %>/manage/style/common.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path %>/manage/style/manage.css" rel="stylesheet" type="text/css" />
	<link href="<%=path %>/manage/style/guanli.css" rel="stylesheet" type="text/css"/>
	<script src="<%=path %>/js/lib/jquery.js" type="text/javascript"></script>
	<script src="<%=path %>/script/util.js"></script>
	<script src="<%=path%>/common/config.jsp?showip=1" type="text/javascript"></script>
	<script src="<%=path %>/manage/script/userspace.js"></script>
	<script src="//<%= Common.getSysUrl(request.getServerName(),"PORTAL")%>/script/common.jsp" type="text/javascript"></script>	
    <script type="text/javascript">
    	<!--
    	var areaId = "<%=areaId%>";//区域id
    	var userAreaId = "<%=areaId%>";//区域id--统一变量名
    	var path = "<%=path %>";
    	var s = areaId.substring(0,areaId.lastIndexOf(".")+1).replace(/\./g,"_");
    	var tjurl = protocol_ip+sysconfig["STAT_IP"]+":8080/";
    	var schoolid =  "<%=schoolId %>";
    	var userActionJson = "<%=zzvcom.util.StringUtil.getStrFromNull((String)session.getAttribute("userActionJson")) %>";
    	$(document).ready(function(){  
  			//校本资源待审核数
  			userspace.getXbzyRms();
  			//录直播待审核数
  			userspace.getLzbRms();
  			//用户管理type（0-校管理员  1-区管理员）
  			userspace.getUserManage("0");
    		//活跃用户图表
    		userspace.getActivePvJson();
    		//教师使用情况一览图表
    		userspace.getUsagePvJson();
    	});

    	//-->
    </script>
  </head>
  
  <body>
    <div class="<%=screenWidthId%>">
		<div class="con_manage">
			<div class="left_m">
		    	<div class="school_mc">
		        	<img src="images/manage/schoolphoto.png" width="190px;">
		            <ul>
		            	<li>学校名称：<%=schoolName %></li>
		                <li>所属区域：<%=areaName %></li>
		                <li>学校性质：<%=schoolTypeName %></li>
		            </ul>
		        </div>
		        <div class="sh_tx" style="width:100%;">
		        	<h1 style="margin-left:10px;">审核提醒</h1>
					<ul>
		                <li class="school"><a  href="<%=Common.getInterfaceUrl(request.getServerName(),"PLS","PLS.BDZY") %>">校本资源：<span id="xbzy">无</span></a></li>
		                <li class="video"><a id="lzb_url"  href="<%=Common.getInterfaceUrl(request.getServerName(),"RLMS","RLMS.LZB") %>">录直播课程：<span id="lzb">无</span></a></li>
		            </ul>
		        <div class="clearfix"></div>
		        </div>
		    </div>
		    <div class="right_m">
		        <div class="yh_gl" style="width:100%;">
		        	<h1>用户管理</h1>
					   <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_2 qk2">
		                  <tr class="tit2">
		                  	<td width="20%">类型</td>
		                    <td width="20%">班级</td>
		                    <td width="20%">教师</td>
		                    <td width="20%">学生</td>
		                  </tr>
		                  <tr>
		                    <td>注册数量</td>
		                    <td id="schoolClassCount">暂无数据</td>
		                    <td id="teacherCount">暂无数据</td>
		                    <td id="studentCount">暂无数据</td>
		                  </tr>
		              </table>
		        <div class="clearfix"></div>
		        </div>
		        <!--用户管理结束-->
		    </div>
		    <div class="right_m">
		         <div class="intro_sch">
		            <h2 class="bt2 nobor">活跃用户一览表</h2>
		                <div class="table_1">
		                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_2 qk2">
		                  <tr class="tit2">
		                    <td rowspan="2">活跃用户</td>
		                    <td colspan="2">上期数据<span id="user_sq_date">暂无数据</span></td>
		                    <td colspan="2">本期数据<span id="user_bq_date">暂无数据</span></td>
		                  </tr>
		                  <tr class="tit2">
		                    <td bgcolor="#f0f9ff">使用人数</td>
		                    <td bgcolor="#f0f9ff">活跃用户占比</td>
		                    <td bgcolor="#f0f9ff">使用人数</td>
		                    <td bgcolor="#f0f9ff">活跃用户占比</td>
		                  </tr>
		                  <tr>
		                    <td>教师</td>
		                    <td id="js_sq_rs">暂无数据</td>
		                    <td id="js_sq_bl">暂无数据</td>
		                    <td id="js_bq_rs">暂无数据</td>
		                    <td id="js_bq_bl">暂无数据</td>
		                  </tr>
		                  <tr>
		                    <td>学生</td>
		                    <td id="xs_sq_rs">暂无数据</td>
		                    <td id="xs_sq_bl">暂无数据</td>
		                    <td id="xs_bq_rs">暂无数据</td>
		                    <td id="xs_bq_bl">暂无数据</td>
		                  </tr>
		                </table>
		                <div class="juyou mt10"><img src="<%=path %>/manage/images/manage/tips3.png" width="16" height="16" />&nbsp;活跃用户是根据本校使用人数的登录情况综合统计得出。</div>
		    </div>
		                <div class="tubiao"><img id="user_tubiao" src="<%=tjtp_src%>_active.png" width="700" height="364" onerror="javascript:this.src='<%=path %>/manage/images/manage/tubiao.jpg';"/></div>
		          </div>
		        <!--活跃用户一览表end-->  
		         <div class="intro_sch pb20">
		            <h2 class="bt2 nobor">教师使用情况一览表</h2>
		                <div class="tab_data">
		                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_2 qk2">
		                  <tr class="tit2">
		                    <td width="207" rowspan="2">时间</td>
		                    <td width="122" rowspan="2">资源</td>
		                    <td colspan="2">作业</td>
		                    <td width="119" rowspan="2">短信</td>
		                    <td width="156" rowspan="2">导学案</td>
		                    <td colspan="3">登录</td>
		                  </tr>
		                  <tr class="tit2">
		                    <td width="180" bgcolor="#f0f9ff">在线</td>
		                    <td width="178" bgcolor="#f0f9ff">离线</td>
		                    <td width="156" bgcolor="#f0f9ff">授课端</td>
		                    <td width="156" bgcolor="#f0f9ff">备课端</td>
		                    <td width="143" bgcolor="#f0f9ff">优信</td>
		                  </tr>
		                  <tr>
		                    <td>上期数据<br />
		                    <span id="sq_date">暂无数据</span></td>
		                    <td id="sq_res">暂无数据</td>
		                    <td id="sq_zx">暂无数据</td>
		                    <td id="sq_lx">暂无数据</td>
		                    <td id="sq_dx">暂无数据</td>
		                    <td id="sq_dxa">暂无数据</td>
		                    <td id="sq_sk">暂无数据</td>
		                    <td id="sq_bk">暂无数据</td>
		                    <td id="sq_yx">暂无数据</td> 
		                  </tr>
		                  <tr>
		                    <td>本期数据<br />
		                    <span id="bq_date">暂无数据</span></td>
		                    <td id="bq_res">暂无数据</td>
		                    <td id="bq_zx">暂无数据</td>
		                    <td id="bq_lx">暂无数据</td>
		                    <td id="bq_dx">暂无数据</td>
		                    <td id="bq_dxa">暂无数据</td>
		                    <td id="bq_sk">暂无数据</td>
		                    <td id="bq_bk">暂无数据</td>
		                    <td id="bq_yx">暂无数据</td>
		                  </tr>
		                </table>
		                </div>
		                <div class="tubiao"><img id="teacher_tubiao" src="<%=tjtp_src%>_usage.png" width="700" height="364" onerror="javascript:this.src='<%=path %>/manage/images/manage/tubiao.jpg';"  /></div>
		          </div>  
		    </div>
		    <div class="clearfix"></div>
		</div>
		</div>
<script type="text/javascript">
<!--
//可配置js代码段
var _type4OtherConfig="manage_xiao";
try{
	var otherConfig = decodeURIComponent(decodeURIComponent(portal_config.otherConfig));
	eval(otherConfig);
}catch(e){}
//-->
</script>
  </body>
</html>
