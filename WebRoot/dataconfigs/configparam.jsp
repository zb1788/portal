<%@page import="java.io.Console"%>
<%@ page language="java" import="java.util.*,zzvcom.util.*" pageEncoding="utf-8"%>
<%
response.setHeader("Pragma","No-cache");
response.setHeader("Cache-Control","no-cache");
response.setDateHeader("Expires", 0);
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String severname = request.getServerName();//.replaceAll(".","_");
Common.reload();
request.setCharacterEncoding("UTF-8");
String checkCode = (String)session.getAttribute("checkCode");
String vCode = request.getParameter("vCode");
boolean validate = false;
if(checkCode!=null && checkCode.equals(vCode)){
	validate = true;
}
String configTail= ((Map<String,String>)request.getAttribute("ConfigMap")).get("tail_param");
if(configTail==null || !configTail.equals(request.getParameter("tail")) || !validate){
	//request.getRequestDispatcher("/common/error_404.jsp").forward(request, response); 
	return;
}
String[] picarr1=Common.getWebFileNameList("login/logo/");
String[] picarr2=Common.getWebFileNameList("space/images/logo/");
String[] icoarr=Common.getWebFileNameList("ico/");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<script src="<%=path %>/script/jquery.js"></script>
<script src="<%=path %>/script/jquery-migrate-ada.js"></script>
<script type="text/javascript" src="<%=path %>/script/artDialog/artDialog.source.js?skin=blue"></script>
<script type="text/javascript" src="<%=path %>/script/artDialog/plugins/iframeTools.source.js"></script>
<script type="text/javascript" src="<%=path %>/script/util.js"></script>
<script type="text/javascript" src="<%=path %>/script/base64.js"></script>
<script type="text/javascript" src="configparam.js?r=<%=new Date().getDay()+""+new Date().getDate() %>"></script>
<script type="text/javascript" src="<%=path %>/common/config.jsp?domain=default&redirect=false"></script>
<script type="text/javascript">
//保存共建平台配置
function save(){
	//保存主域模板
	var module = document.getElementById("dc.module");
	module.innerHTML = $("#moban").val();
	var de  = new Base64();
	//将共建平台配置列表的配置组合成json形式保存
	var pz = "{";
	$("input[name='pz']").each(function(num){
		if(num==0){
			pz+=de.decode($(this).val());
		}else{
			pz+=","+de.decode($(this).val());
		}
	});
	pz +="}";
	var h = document.getElementById("dc.gjptpz");
	h.innerHTML = pz;
	form.submit();
}
//添加或修改共建平台配置项
function addGjpt(){
	art.dialog.data('test', "|");
	//打开共建平台配置弹窗
	art.dialog.open('coBuild.html',{title: '共建平台配置', width: 950, height: 630}, false);
}
//修改共建平台配置项
function editGjpt(){
	var count = 0;
	$("input[name='pz']:checked").each(function(){
		count++;
	});
	if(count==0){
		alert("请选择一条配置项！");
		return false;
	}else{
		//传入参数1、若是修改则传入待修改的共建平台配置json 2、若为修改则传入带修改的共建平台配置项id
		art.dialog.data('test', $("input[name='pz']:checked").val()+"|"+$("input[name='pz']:checked").attr("id"));
		//打开共建平台配置弹窗
		art.dialog.open('coBuild.html',{title: '共建平台配置', width:950, height: 650}, false);
	}
}
//按共建平台配置项id删除共建平台配置项
function delGjpt(){
	var count = 0;
	$("input[name='pz']:checked").each(function(){
		count++;
	});
	if(count==0){
		alert("请选择一条配置项！");
		return false;
	}else{
		$("tr[id='"+$("input[name='pz']:checked").attr("id")+"_tr']").remove();
	}
}
//预览
function yl(obj){
	if($("#moban").val()!=""){
		var url ="http://"+sysconfig.PORTAL+"/index.action?module="+$("#moban").val();
		window.open(url);
	}else{
		alert("请先选择模板后在预览！");
	}
}
</script>
<style type="text/css">
	body,table{
		font-size:12px;
	}
	table{
		table-layout:fixed;
		empty-cells:show; 
		border-collapse: collapse;
		margin:0 auto;
	}
	h1{
		font-size:14px;
		margin:0;
		padding:0;
	}
	.title{
	background: #FFF;
	border: 1px solid #9DB3C5;
	padding: 1px; 
	width:90%;
	margin:1px auto; 
	}
	.title h1 {
	line-height: 31px; 
	text-align:center; 
	background: #2F589C url(<%=path%>/dataconfigs/pic/th_bg2.gif); 
	background-repeat: repeat-x;
	background-position: 0 0;
	}
	.title th, .title td {
	border: 1px solid #CAD9EA; 
	padding: 5px;
	font-weight:bold
	}
	table.t2{
	border:1px solid #9db3c5;
	color:#666;
	}
	table.t2 th{
	background:#2F589C  url(<%=path%>/dataconfigs/pic/th_bg2.gif);
	height:25px;
	background-repeat:repeat-x;
	}
	table.t2 td{
	border:1px dotted #cad9ea;
	padding:0 2px 0;
	}
	table.t2 tr.a1{
	background-color:#e8f3fd;
	}
	table.t2 td.h{
	font-weight:bold;
	}
	table.t2 td.h font{
	padding-left:3px;font-weight:normal;
	}
</style>
</head>
<body>
  	<form name="form" action="<%=path%>/dataconfigs/editconfiginfo.action" method="post">
  	<input type="hidden" name="tail" value="<%=request.getParameter("tail") %>" >
  	<input type="hidden" name="vCode" value="<%=request.getParameter("vCode") %>" >
  	<div class="title">
  		<h1>门户管理系统</h1>
   </div>
   <div style="color:red;font-weight:bold">
		注意：&nbsp;此配置修改仅对当前服务器有效，如果为多台集群请逐个修改各个服务器配置，不支持通过共建域名进入修改配置。由于安全问题，登陆页面所使用配置不允许出现IP！<font color="red" >*</font>为必填内容
   </div>
	<table width="90%" id="mytab" border="1" class="t2">
		<thead>
			<th width="40%" >
			参数
			</th>
			<th width="60%" >
			值
			</th>
	</thead>
  <tr class="a1" style="display:none">
  	<td width="40%" class="h" >bbs编号</td>
  	<td width="60%" ><input name="dc.bbsid" value="<%=Common.getBbsid() %>"  maxlength="100" style="width:100%" /></td>
  </tr>
  <!-- tr class="a1" >
  	<td width="40%" class="h" >访问协议(http://或者https://)<font color="red" >*&nbsp;[将强制重定向不匹配协议的页面访问]</font></td>
  	<td width="60%" ><input name="dc.protocol" value="<%=Common.PROTOCOL %>"  maxlength="100" style="width:100%" /></td>
  </tr -->
  <tr class="a1">
  	<td class="h" >3D加密密码<font color="red" >*</font></td>
  	<td><input name="dc.vcom3dskey" value="<%=Common.getVcom3dskey() %>"  style="width:100%" /></td>
  </tr>
  <tr class="a1" title="(0关闭;1开启)目前默认非0则开启" >
  	<td class="h" >是否开启欠费/免费期提醒<font color="red" >*</font></td>
  	<td><input  type="radio" name="dc.payalert"   value="1"   <% if("1".equals(Common.getPayalert())) out.print("checked") ;    %> />是
	  	<input  type="radio" name="dc.payalert"   value="0"   <% if("0".equals(Common.getPayalert())) out.print("checked")  ;   %>/>否
	</td>
  </tr>
  <tr class="a1">
  	<td class="h" >短信平台网关用户<font color="red" >*</font></td>
  	<td><input name="dc.vsms_platUser" value="<%=Common.getVsms_platUser() %>" style="width:100%" /></td>
  </tr>
  <tr class="a1">
  	<td class="h" >短信平台网关密码<font color="red" >*</font></td>
  	<td><input name="dc.vsms_platPwd" value="<%=Common.getVsms_platPwd() %>" style="width:100%" /></td>
  </tr>
  <tr class="a1" title="(0家长;2,3教师;4学生)前后用英文逗号分隔-例如：,0,2,3,4,">
  	<td class="h"  >需要短信验证的角色</td>
  	<td>
  		<textarea rows="2" style="width:100%" name="dc.phoneusertype"><%=Common.getPhoneusertype() %></textarea>
  </tr>
  <tr class="a1">
  	<td class="h" >短信平台验证内容模板<font color="red" >*</font></td>
  	<td><textarea rows="3" style="width:100%" name="dc.vsms_content"><%=Common.getVsms_content() %></textarea>
  </tr>
  <tr class="a1">
  	<td class="h" >短信验证时长(天/次)(0表示每次登陆均验证)</td>
  	<td><input name="dc.vsms_day" value="<%=Common.getVsms_day() %>" style="width:100%" /></td>
  </tr>
  <tr class="a1">
  	<td class="h" >是否启用短信验证</td>
  	<td><input  type="radio" name="dc.boundphone"   value="1"   <% if("1".equals(Common.getBoundphone())) out.print("checked") ;    %> />短信平台发送验证
  		<input  type="radio" name="dc.boundphone"   value="2"   <% if("2".equals(Common.getBoundphone())) out.print("checked")  ;   %>/>阿里短信发送验证
	  	<input  type="radio" name="dc.boundphone"   value="0"   <% if("0".equals(Common.getBoundphone())) out.print("checked")  ;   %>/>否
	</td>
  </tr>
  <tr class="a1">
  	<td class="h" >临时验证码使用次数(次/月)</td>
  	<td><input name="dc.tempCodeCount" value="<%=Common.getTempCodeCount() %>" style="width:100%" /></td>
  </tr>
  <tr class="a1">
  	<td class="h" >是否开启未绑定手机号提醒</td>
  	<td><input name="dc.alerttype" type="radio" value="1" <% if("1".equals(Common.getAlerttype())) out.print("checked") ;%>/>是
		<input name="dc.alerttype" type="radio" value="0" <% if("0".equals(Common.getAlerttype())) out.print("checked"); %> />否
	</td>
  </tr>
  <tr class="a1">
  	<td class="h" >是否检测账号多人在线</td>
  	<td><input name="dc.repeatUsertype" type="radio" value="1" <% if("1".equals(Common.getRepeatUsertype())) out.print("checked") ;%>/>是
		<input name="dc.repeatUsertype" type="radio" value="0" <% if("0".equals(Common.getRepeatUsertype())) out.print("checked"); %> />否
	</td>
  </tr>
  <tr class="a1">
  	<td class="h" >检查账号多人在线时间(毫秒)<font color="red" >*</font></td>
  	<td><input name="dc.repeatCheckTime" value="<%=Common.getRepeatCheckTime() %>" style="width:100%" /></td>
  </tr>
  <tr class="a1">
  	<td class="h" >订购短信发送目标号码</td>
  	<td><input name="dc.areaphonenumber" value="<%=Common.getAreaphonenumber() %>" style="width:100%" /></td>
  </tr>
  <tr class="a1" title='格式:{type用户类型码:提示信息(前后加引号,可选用标签$LastDay$定位时间说明),type第二个用户类型码:提示信息}' >
  	<td class="h" colspan=2 >订购提示(js对象方式配置，配置错误将导致页面异常!如不配置则采用默认提示信息)</td>
  </tr>
  <tr class="a1" title='格式"{type用户类型码:提示信息(前后加引号,可选用标签$LastDay$定位时间说明),type第二个用户类型码:提示信息}' >
  <td colspan=2 ><textarea name="dc.areamessage" rows="5" style="width:100%"><%=Common.getAreamessage() %></textarea>
  </tr>
  <tr class="a1">
  	<td class="h" >处理(首页/data)默认选中</td>
  	<td><input  type="radio" name="dc.showindex"   value="1"   <% if(!"0".equals(Common.getDefaultShowIndex())) out.print("checked") ;    %> />是
	  	<input  type="radio" name="dc.showindex"   value="0"   <% if("0".equals(Common.getDefaultShowIndex())) out.print("checked")  ;   %>/>否</td>
  </tr>
  <tr class="a1">
  	<td class="h" >允许注册</td>
  	<td><input  type="radio" name="dc.showreg"   value="1"   <% if("1".equals(Common.getShowRegedit())) out.print("checked") ;    %> />是
	  	<input  type="radio" name="dc.showreg"   value="0"   <% if("0".equals(Common.getShowRegedit())) out.print("checked")  ;   %>/>否</td>
  </tr>
  <tr class="a1" title="第三项为根据通讯运营商来判断是否能在线支付，如联通用户不用显示在线支付，那么这里配置为3，系统会判断用户手机号类型，从而决定是否显示在线支付。">
  	<td class="h" >支付类型(1-在线支付，2-订购，3-匹配运营商类型在线支付)<font color="red" >*</font></td>
  	<td><input name="dc.paytype" value="<%=Common.getPaytype() %>" style="width:100%"/></td>
  </tr>
  <tr class="a1">
  	<td class="h" >主域区域名字(与全国负载一致)</td>
  	<td><input name="dc.areaname" value="<%=Common.getDefaultAreaname() %>"  style="width:100%" /></td>
  </tr>
  <tr class="a1">
  	<td class="h" >主域区域代码(与全国负载一致)<font color="red" >*</font></td>
  	<td><input name="dc.areacode" value="<%=Common.getDefaultAreacode() %>"  style="width:100%"/></td>
  </tr>
  <tr class="a1" title="图片路径默认为login/logo/,输入框中直接录入图片文件名">
  	<td class="h" >主域登陆logo图标</td>
  	<td>
  		<input id="loginlogo" name="dc.logo" value="<%=Common.getDefaultLogo() %>"  style="width:200px;margin-right:20px" />
  		<select id="loginlogo_sel" onchange="if($(this).val()!=''){$('#loginlogoreview').attr('src','<%=path%>/login/logo/'+$(this).val());$('#loginlogoreview').show();}else{$('#loginlogoreview').hide();}$('#loginlogo').val($(this).val());" >
		<option value="">默认</option>
  		<%
  		for(int pi1=0;picarr1!=null && pi1<picarr1.length;pi1++){
  			%><option value="<%=picarr1[pi1]%>"><%=picarr1[pi1]%></option><%
  		}
		%>
  		</select><img height="30" id="loginlogoreview" src="<%=path%>/login/logo/logo.png" />
  	</td>
  </tr>
  <tr class="a1" title="图片放于space/images/logo/路径下，输入框中直接录入图片文件名">
  	<td class="h" >主域空间logo图标</td>
  	<td><input id="indexlogo" name="dc.indexlogo" value="<%=Common.getDefaultIndexlogo() %>" style="width:200px;margin-right:20px" />
  		<select id="indexlogo_sel" onchange="if($(this).val()!=''){$('#indexlogoreview').attr('src','<%=path%>/space/images/logo/'+$(this).val());$('#indexlogoreview').show();}else{$('#indexlogoreview').hide();}$('#indexlogo').val($(this).val());" >
		<option value="">默认</option>
  		<%
  		for(int pi2=0;picarr2!=null && pi2<picarr2.length;pi2++){
  			%><option value="<%=picarr2[pi2]%>"><%=picarr2[pi2]%></option><%
  		}
		%>
  		</select><img height="30" id="indexlogoreview" src="<%=path%>/space/images/logo/logo.png" />
  	</td>
  </tr>
  <tr class="a1" title="图片放于ico/路径下，输入框中直接录入图片文件名">
  	<td class="h" >主域页面ico图标</td>
  	<td>
  	<input id="ico" name="dc.icoimg" value="<%=Common.getDefaultIcoimg() %>" style="width:200px;margin-right:20px" />
  	<select id="ico_sel" onchange="$('#ico').val($(this).val())" >
		<option value="">默认</option>
  		<%
  		for(int i3=0;icoarr!=null && i3<icoarr.length;i3++){
  			%><option value="<%=icoarr[i3]%>"><%=icoarr[i3]%></option><%
  		}
		%>
  		</select>
  	</td>
  </tr>
  <tr class="a1">
  	<td class="h" >主域登陆页模板</td>
  	<td>
  		<textarea id="dc.module" name="dc.module" rows="2" style="display:none;width:100%"><%=Common.getDefaultModule() %></textarea>
  		<select id="moban" style="width:158px">
          <option value="" selected="selected">无</option>
      </select>
      <input type="button" value="预览" onClick="return yl();" />
  	</td>
  </tr>
  <tr class="a1">
  	<td class="h" title='space目录下对应文件夹，包含index.jsp,teacher.jsp及相应样式图片等' >主域空间首页模板</td>
  	<td>
  		<select id="dc.spacedir" name="dc.spacedir" style="width:158px">
          <option value="" selected="selected">联通</option>
      </select>
      <!-- input type="button" value="预览" onClick=" "  -->
  	</td>
  </tr>
  <tr class="a1"  title='用于title,keyword,及页面平台名'>
  	<td class="h" >主域页面平台名关键词</td>
  	<td><input name="dc.seokey"   value="<%=Common.getSeoKey() %>" style="width:100%" /></td>
  </tr>
  <tr class="a1"  title='默认优币'>
  	<td class="h" >主域优币名称</td>
  	<td><input name="dc.ubName"   value="<%= StringUtil.getStrFromNull(Common.getDefaultUbName()) %>" style="width:100%" /></td>
  </tr>
  <tr class="a1">
  	<td class="h" >全国负载地址</td>
  	<td><input name="dc.balanceUrl" value="<%=Common.getBalanceUrl() %>" style="width:100%"/></td>
  </tr>
  <tr class="a1">
  	<td class="h" >是否开启升级提示(0关闭；1开启并禁止登陆；2开启但允许登陆)<font color="red" >*</font></td>
  	<td><input name="dc.showupdate"  value="<%=Common.getShowupdate() %>" style="width:100%"/></td>
  </tr>
  <tr class="a1">
  	<td class="h" >升级提示内容</td>
  	<td><textarea name="dc.updateinfo"  rows="2" style="width:100%"><%=Common.getUpdateinfo() %></textarea></td>
  </tr>
  <tr class="a1">
  	<td class="h" >所属域名<font color="red" >*</font></td>
  	<td><input name="dc.domain"  value="<%=Common.getDomain() %>" style="width:100%"/></td>
  </tr>
  <tr class="a1">
  	<td class="h" >是否引导</td>
  	<td><input  type="radio" name="dc.showguide"   value="1"     <% if("1".equals(Common.getShowguide())) out.print("checked") ;    %> />是
	  	<input  type="radio" name="dc.showguide"   value="0"    <% if("0".equals(Common.getShowguide())) out.print("checked")  ;   %>/>否</td>
  </tr>
  	<tr class="a1" name="yindao">
	  	<td class="h" >教师引导地址</td>
	  	<td><input name="dc.teachUrl"  value="<%=Common.getTeachUrl() %>" style="width:100%"/></td>
	  </tr>
	  <tr class="a1" name="yindao">
	  	<td class="h" >家长引导地址</td>
	  	<td><input name="dc.parentUrl"  value="<%=Common.getParentUrl() %>" style="width:100%"/></td>
	  </tr>
	  <tr class="a1" name="yindao">
	  	<td class="h" >小学生引导地址</td>
	  	<td><input name="dc.pupilUrl"  value="<%=Common.getPupilUrl() %>" style="width:100%"/></td>
	  </tr>
	  <tr class="a1" name="yindao">
	  	<td class="h" >初高中生引导地址</td>
	  	<td><input name="dc.seniorUrl"  value="<%=Common.getSeniorUrl() %>" style="width:100%"/></td>
	  </tr>
	  <tr class="a1" title='格式-以英文逗号分隔及结束：vcom11223,username2,' >
	  	<td class="h" >允许重复登录的用户</td>
	  	<td><textarea name="dc.notcheckuser" rows="2" style="width:100%"><%=Common.getNotcheckuser() %></textarea>
	  </tr>
	  <tr class="a1">
	  	<td class="h" >是否开启授课升级提示(0-关闭，1-开启不能登录，2-开启可以登录)</td>
	  	<td>
	  		<input name="dc.showSkUpdate"  value="<%=Common.getShowSkUpdate() %>" style="width:100%"/>
			</td>
	  </tr>
	  <tr class="a1">
	  	<td class="h" >授课升级提示信息</td>
	  	<td>
	  		<input name="dc.skTip" value="<%=Common.getSkTip() %>" style="width:100%"/>
			</td>
	  </tr>
	  <tr class="a1">
	  	<td class="h" title="若存在共建平台则进行设置，不存在不要设置">共建平台设置</td>
	  	<td>
	  		<input type="button" onClick="addGjpt()" value="添加共建平台设置"/>
	  		<textarea id="dc.gjptpz" name="dc.gjptpz" rows="2" style="display:none;width:100%"><%=Common.getGjptpz() %></textarea>
			</td>
	  </tr>
   <tr class="a1">
        <td colspan=2 >
        	<div>
            <table  border="1" class="t2"  id="ptpz" width="100%">
                <tr class="a1">
                    <td class="h" width="2%"></td>
                    <td class="h" width="10%">共建平台域名</td>
                    <td class="h" width="6%">域名别名</td>
                    <td class="h" width="4%">默认页</td>
                    <td class="h" width="12%">登陆页模板</td> 
                    <td class="h" width="8%">空间首页模板</td>  
                    <td class="h" width="10%">登陆页logo</td>
                    <td class="h" width="10%">主页logo</td>
                    <td class="h" width="7%">区域名称</td> 
                    <td class="h" width="4%">地区id</td>
                    <td class="h" width="6%">优币名</td>
                </tr>
            </table>
        	</div>
            <input type='button' onclick='editGjpt()' value='修改' /><input type='button' onclick='delGjpt()' value='删除' />
        </td>
    </tr>
  <tr class="a1" title="页面判断可通过_type4OtherConfig:login,index,teacher,student,manage_index,manage_xiao,manage_qu" >
  	<td colspan=2 class="h" >主域扩展脚本配置(配置错误将导致页面异常)</td>
  </tr>
  <tr class="a1" >
  <td colspan=2 ><textarea name="dc.otherConfig" rows="10" style="width:100%"><%=Common.getDefaultOtherConfig() %></textarea>
  </tr>
  <tr class="a1" title="接口配置覆盖yjt_inteface.properties中的配置" >
  	<td colspan=2 class="h" >主域接口定制配置</td>
  </tr>
  <tr class="a1" >
  <td colspan=2 ><textarea name="dc.interfaceConfigstr" rows="10" style="width:100%"><%=Common.getDefaultInterfaceConfig() %></textarea>
  </tr>
  <tr>
  	<td colspan="2" align="center">	<input type="button" onClick="return save();" value="提交" ></td>
  </tr>
  </table>
 </form>
<%
if("1".equals((String)request.getParameter("resultflag"))){
	%>
	<script type="text/javascript">
		$.get("<%=path%>/manage/dataconfigs/reload.jsp?key=true<%=new java.text.SimpleDateFormat("yyMMddHH").format(new Date())%>");
		alert("修改成功！");
	</script>
	<%
}else if("0".equals((String)request.getParameter("resultflag"))){
	%>
	<script type="text/javascript">
		alert("修改失败！");
	</script>
	<%
}
%>
  </body>
  <script type="text/javascript">
  //初始化共建平台配置
$(document).ready(function(){
	//若共建平台配置有值，则将配置文件中共建平台配置铺至页面中共建平台配置列表
	var gjptpz = document.getElementById("dc.gjptpz").innerHTML;
	showGjpt(gjptpz);
	
	//初始化共建平台模板选择项
	for(var module in moduleconfig){
		$("#moban").append("<option value="+moduleconfig[module]+">"+module+"</option>");
	}
	$("#moban").val(document.getElementById("dc.module").innerHTML);
	//初始化空间模板目录
	var spacedirobj=$(document.getElementById("dc.spacedir"));
	spacedirobj.html("");
	for(var sindex=0;sindex<spacedirlist.length;sindex++){
		var asp=spacedirlist[sindex];
		spacedirobj.append("<option value="+asp.key+">"+asp.name+"</option>");
	}
	spacedirobj.val("<%=Common.getDefaultSpaceDir() %>");
	$("#loginlogo_sel").val($("#loginlogo").val());
	$("#loginlogo_sel").change();
	$("#indexlogo_sel").val($("#indexlogo").val());
	$("#indexlogo_sel").change();
	$("#ico_sel").val($("#ico").val());
});
  
function showGjpt(gjptpz){
	 if(gjptpz!=null || gjptpz!=""){
		try{
			gjptpz = $.parseJSON(gjptpz);
			var json = "";var tr = "";var val = "";
			for(var pz in gjptpz){
				json = gjptpz[pz][0];
				if("undefined"==typeof(json.icoimg)){json.icoimg="";}
				if("undefined"==typeof(json.seokey)){json.seokey="";}
				if("undefined"==typeof(json.showindex)){json.showindex="1";}
				if("undefined"==typeof(json.ubName)){json.ubName="";}
				var val ="\""+ pz+"\":[{\"module\":\""+json.module+"\",\"alias\":\""+json.alias+"\",\"logo\":\""+json.logo+"\",\"indexlogo\":\""+json.indexlogo+"\",\"areaname\":\""+json.areaname+"\",\"areacode\":\""+json.areacode+"\",\"seokey\":\""+json.seokey+"\",\"icoimg\":\""+json.icoimg+"\",\"sysConfigs\":\""+json.sysConfigs+"\",\"interfaceConfigs\":\""+json.interfaceConfigs+"\",\"otherConfigs\":\""+json.otherConfigs+"\",\"showindex\":\""+json.showindex+"\",\"ubName\":\""+json.ubName+"\"}]";
				var de  = new Base64();
				val = de.encode(val);
				var tr = new Array();
				tr.push("<tr id='"+pz+"_tr' >");
				tr.push("<td><input id='"+pz+"' name='pz' value='"+val+"' type='radio'/></td>");
				tr.push("<td id='"+pz+"_gjpt'>"+pz.replaceAll("_",".")+"</td>");
				tr.push("<td id='"+pz+"_alias'>"+json.alias+"</td>");
				tr.push("<td id='"+pz+"_showindex' >"+json.showindex+"</td>");
				tr.push("<td id='"+pz+"_module'>"+json.module+"</td>");
				tr.push("<td id='"+pz+"_spacedir'>"+getSpaceDirName(json.spacedir)+"</td>");
				tr.push("<td id='"+pz+"_logo' >"+json.logo+"</td>");
				tr.push("<td id='"+pz+"_indexlogo' >"+json.indexlogo+"</td>");
				tr.push("<td id='"+pz+"_areaname' >"+json.areaname+"</td>");
				tr.push("<td id='"+pz+"_areacode' >"+json.areacode+"</td>");
				if(util.isBlank(json.ubName)){
					tr.push("<td id='"+pz+"_ubName' >&nbsp;</td>");
				}else{
					tr.push("<td id='"+pz+"_ubName' >"+json.ubName+"</td>");
				}
				tr.push("</tr>");
				$("#ptpz").append(tr.join(""));
			}
		}catch(e){}
	}
}
  </script>
</html>
