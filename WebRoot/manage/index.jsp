<%@page language="java" 
import="java.util.*,zzvcom.util.secret.*,zzvcom.util.*,vcom.sso.vo.*,vcom.sso.pdgrant.*,zzvcom.entity.TreeForm,net.sf.json.JSONObject,java.text.SimpleDateFormat,javax.servlet.http.HttpServletRequest" 
pageEncoding="utf-8"%><%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
response.setHeader("Pragma", "No-Cache");
response.setHeader("Cache-Control", "No-Cache");
response.setDateHeader("Expires", 0);
String seokey=((Map<String,String>)request.getAttribute("ConfigMap")).get("seokey");//搜索关键词
String icoimg=((Map<String,String>)request.getAttribute("ConfigMap")).get("icoimg");//当前域页面图标

//验证用户
VSysUser tuser = ((AuthResult)session.getAttribute("authResult")).getUser();
if(tuser==null){
	response.sendRedirect("/");
}else if( !"".equals(tuser.getUsertype()) && !"3".equals(tuser.getUsertype())){
	response.sendRedirect("/");
}

if(icoimg==null || icoimg.trim().length()==0){
	icoimg="";
}else{
	icoimg=path+"/ico/"+icoimg;
}
if(seokey==null || seokey.trim().length()==0){
	seokey=Common.DEFAULT_SEO_KEY;
}
String dayStamp = new java.text.SimpleDateFormat("yyMMdd").format(new Date());//日期戳
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<% if(icoimg!=null && icoimg.trim().length()>0){ %>
	<link rel="shortcut" href="<%=icoimg %>" type="image/x-icon"/>
	<link rel="icon" href="<%=icoimg %>" type="image/x-icon"/>
	<link rel="bookmark"  href="<%=icoimg %>" type="image/x-icon" />
	<% } %>
	<title><%=seokey %>-管理员空间</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<link rel="stylesheet" href="layuiadmin/layui/css/layui.css?r=<%=dayStamp %>" media="all">
	<link rel="stylesheet" href="layuiadmin/layui/css/modules/layer/default/layer.css?v=3.1.1" media="all">
	<link rel="stylesheet" href="layuiadmin/style/admin.css?r=<%=dayStamp %>" media="all">
	<link rel="stylesheet" href="layuiadmin/style/login.css?r=<%=dayStamp %>" media="all">
	<link rel="stylesheet" href="layuiadmin//font/iconfont.css?r=<%=dayStamp %>" media="all">
	<link rel="stylesheet" href="layuiadmin/style/style.css?r=<%=dayStamp %>" media="all">
    <link href="<%=path %>/common/style/checkuser.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="<%=path%>/login/default/style/jquery.autocomplete.css" />
	<script type='text/javascript' src="<%=path %>/js/lib/jquery.js?r=<%=dayStamp %>"></script>
	<script type='text/javascript' src="<%=path %>/script/base64.js?r=<%=dayStamp %>"></script>
	<script type='text/javascript' src="<%=path %>/script/js_md5.js?r=<%=dayStamp %>"></script>
	<script type='text/javascript' src="<%=path %>/script/js_rsa.js?r=<%=dayStamp %>"></script>
	<script src="<%=path %>/manage/script/artDialog.js?skin=default"></script>
	<script src="<%=path %>/script/util.js?r=<%=dayStamp %>"></script>
	<script src="<%=path %>/common/config.jsp?showip=1&r=<%=dayStamp %>" type="text/javascript"></script>
	<script type="text/javascript" src="<%=path%>/script/ajax_common.js?r=<%=dayStamp %>"></script>
	<!-- 
	<script src="<%=path%>/script/loginobj.js"></script>
	-->
	<script src="<%=path %>/script/spaceindex.js?r=<%=dayStamp %>"></script>
	<script src="<%=path %>/manage/script/userspace.js?r=<%=dayStamp %>" ></script>
	<script src="<%=path %>/manage/script/channels.js?r=<%=dayStamp %>"></script>
	<script src="<%=path %>/manage/userinfo.jsp?r=<%=dayStamp %>"></script>
	<script src="<%=path %>/manage/channelgeter.jsp?r=<%=dayStamp %>"></script>
	<script src="<%=path %>/interface/channelGrant.jsp?r=<%= (dayStamp+Math.round(Math.random()*1000)) %>"></script>
	<style type="text/css">
	#LAY-system-side-menu a{cursor:pointer}
	.layui-tab-title a{cursor:pointer}
	.hide{display:none};
	</style>
<script type="text/javascript">
var dataparam="";
if(!util.isBlank(util.getRequestParam("data"))){
	dataparam="?data="+util.getRequestParam("data");
}
//地区管理员上线，移除此判断
//if("3"==usertype){
	if( (util.browser.msie && util.browser.version<9) || !(window.localStorage) ){
		alertExport=true;
		showguide="";
		pagePath="manage/owebindex.action";
		window.location.href="owebindex.action"+dataparam;
	}
//}else{
	//地区管理员进入老版
//	window.location.href="owebindex.action"+dataparam;
//}
</script>
</head>
<body class="layui-layout-body" layadmin-themealias="ocean" >
  
  <div id="LAY_app" class="layadmin-tabspage-none" >
    <div class="layui-layout layui-layout-admin">
      <div class="layui-header">
        <!-- 头部区域 -->
        <ul class="layui-nav layui-layout-left">
          <li class="layui-nav-item layadmin-flexible" lay-unselect>
            <a href="javascript:;" layadmin-event="flexible" title="侧边伸缩" onclick="menuToggle()" >
              <i class="layui-icon layui-icon-shrink-right" id="LAY_app_flexible"></i>
            </a>
          </li>
          <li class="layui-nav-item" lay-unselect>
            <a href="javascript:;" class="fontmax">
              管理空间
            </a>
          </li>
        </ul>
        <ul class="layui-nav layui-layout-right" lay-filter="layadmin-layout-right">
          <li class="layui-nav-item layui-hide-xs" lay-unselect>
            <a  id="welcomeDiv" >
            	老师，欢迎您！
            </a>
          </li>
          <li class="layui-nav-item" lay-unselect="">
            <a href="javascript:;" class="switchMenu" onclick="changeRole()" >
            	  切换用户
            <span class="layui-nav-more"></span></a>
            <dl id="changeRoleDl" class="layui-nav-child layui-anim layui-anim-upbit">
              <dd><center><a style="color:#FFA500" onclick="showLogin(1)" lay-href="#">[切换用户]</a></center></dd>
            </dl>
          </li>
          <li class="layui-nav-item layui-hide-xs" lay-unselect>
            <a id="helplink" target="_blank" href="javascript:;">帮助</a>
          </li>
          <li class="layui-nav-item layui-hide-xs" lay-unselect>
            <a href="/ssoLoginFail.jsp">退出</a>
          </li>
          
        </ul>
      </div>
      
      <!-- 侧边菜单 -->
      <div class="layui-side layui-side-menu">
        <div class="layui-side-scroll">
          <div class="layui-logo" >
            <div class="logo"><img id="indexlogo" src="../space/images/logo/logo.png"></div>
            <span id="spaceName" ></span>
          </div>
          
          <ul class="layui-nav layui-nav-tree" lay-shrink="all" id="LAY-system-side-menu" lay-filter="layadmin-system-side-menu">
            <li data-name="home" class="layui-nav-item">
              <a href="" target="mainframe" >
                <i class="layui-icon layui-icon-home"></i>
                <cite>首页</cite>
              </a>
            </li>   
          </ul>
        </div>
      </div>

      <!-- 页面标签 -->
      <div class="layadmin-pagetabs" id="LAY_app_tabs">
        
        <div class="layui-tab" style="" id="tabsArea" lay-filter="layadmin-layout-tabs">

          <div class="layui-row" id="school_tobeShow" style="" >
            <div style="float:left;width:50%" >
              <div class="grid-demo tac" style="cursor:pointer" onclick="$('#lm05_05_01').click()" ><i class="layui-icon layui-icon-home"></i> 录直播课程审核：<span id="lzb">0</span>节</div>
            </div>
            <div style="float:left;width:50%" >
              <div class="grid-demo tac" style="cursor:pointer" onclick="$('#lm05_04_04').click()" ><i class="layui-icon layui-icon-home"></i> 校本资源审核：<span id="xbzy">0</span>条</div>
            </div>
            <!-- div class="layui-col-xs4 layui-col-sm12 layui-col-md4" style="display:none">
              <div class="grid-demo tac"><i class="layui-icon layui-icon-home"></i> 新用户审核：5条</div>
            </div>
             -->
          </div>

          <div class="layui-row" id="area_tobeShow" style="" >
            <div style="float:left;width:50%" >
              <div class="grid-demo tac" style="cursor:pointer" onclick="$('#lm25_03').click()" ><i class="layui-icon layui-icon-home"></i> 区本资源审核：<span id="qbzy">0</span>条</div>
            </div>
          </div>
          <!-- 栏目TAB例子 
          <ul class="layui-tab-title" id="tabArea" >
            <li class="layui-this"><span>学校信息</span></li>
            <li>学校机构</li>
            <li>教研组</li>
          </ul>
          -->
          
        </div>
      </div>
      
      
      <!-- 主体内容 -->
      <div class="layui-body" id="LAY_app_body">
        <div class="layadmin-tabsbody-item layui-show" style="margin-top:40px" >
          <iframe src="" id="manageframe" name="mainframe" frameborder="0" class="layadmin-iframe"></iframe>
        </div>
      </div>
      
      <!-- 辅助元素，一般用于移动设备下遮罩 -->
      <div class="layadmin-body-shade" layadmin-event="shade"></div>
      <!-- 底部版权
      <div class="layui-footer">
	        <iframe style="min-width: 1000px;" id="footiframe" name="footiframe" src="" scrolling="no" width="100%" height="190" frameborder="0"></iframe>
      </div>
       -->
    </div>
  </div>

    <!-- 切换用户 -->
    <div id="loginDiv" class="layui-layer layui-layer-page layui-layer-tab layui-tab layui-tab-card hide" style="position: absolute; z-index:999; width:320px;top: 50.5px; left: 100%; margin-left: -415px;">
      <ul class="layui-tab-title tab-juese">
        <li class="layui-this"  id="teacher">教师</li>
        <li id="parent">家长</li>
        <li id="student">学生</li>
        <li id="manager">管理员</li>
      </ul>
      <div class="layui-tab-content" style=" background-color:#fff;">
        <div class="layui-tab-item layui-show">
          <div class="layadmin-user-login-box layadmin-user-login-body layui-form">
          <div class="layui-form-item">
            <label class="layadmin-user-login-icon layui-icon layui-icon-username" for="LAY-user-login-username"></label>
            
<form id="loginForm" name="loginForm" action="" method="get" target="">
<input type="hidden" id="loginUsertype" name="loginUsertype"/>
<input id="pwd" name="pwd" type="hidden"  value="" />
<input type="hidden" id="gjpt" name="gjpt" value="" />
<input type="hidden" id="sfp" name="sfp" value="" />
<input type="hidden" name="username" id="username" value="" />
<input id="isPortalisPortal" name="isPortal" type="hidden" value="1" />
<input id="data" name="data" type="hidden" value="" />
<input name="validateCode" id="validateCode" type="hidden" value=""/>
            <input type="text" name="inputname"  autocomplete="off" id="LAY-user-login-username" lay-verify="required" placeholder="用户名"  class="layui-input">
            
</form>
      <!-- 多账号选择层 -->
<div class="username"  id="roleDiv" phonenum="" >
	<span id="roleList" >
	</span>
</div>
          </div>
          <div class="layui-form-item">
            <label class="layadmin-user-login-icon layui-icon layui-icon-password" for="LAY-user-login-password"></label>
            <input type="password" name="password"  autocomplete="new-password" id="LAY-user-login-password" lay-verify="required" placeholder="密码" class="layui-input">
          </div>
          <div class="layui-form-item">
            <div class="layui-row">
              <div class="layui-col-xs7">
                <label class="layadmin-user-login-icon layui-icon layui-icon-vercode" for="LAY-user-login-vercode"></label>
                <input type="text" name="vercode"  autocomplete="off" id="LAY-user-login-vercode" lay-verify="required" placeholder="图形验证码"  class="layui-input"  maxlength="4">
              </div>
              <div class="layui-col-xs5">
                <div style="margin-left: 10px;">
                  <img src="https://www.oschina.net/action/user/captcha" class="layadmin-user-login-codeimg" id="LAY-user-get-vercode">
                </div>
              </div>
            </div>
          </div>
          <div class="layui-form-item">
            <button  onClick="return login_check();" id="loginbuttion" class="layui-btn layui-btn-fluid layui-btn-normal" lay-submit lay-filter="LAY-user-login-submit">登 录</button>
          </div>

        </div>  

      </div>
      <div class="layui-tab-item">2</div>
      </div>
      <span class="layui-layer-setwin"><a onclick="showLogin(0)" class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a></span>
    </div>

<script type="text/javascript">
//边栏展合折叠支持
function menuToggle(open){
	//open强制展开
	if(1==open || $("#LAY_app").hasClass('layadmin-side-shrink')){
		$("#LAY_app").removeClass('layadmin-side-shrink');
		$("#LAY_app_flexible").removeClass('layui-icon-spread-left').addClass('layui-icon-shrink-right');
		//显示当前展开二级
		$(".layui-nav-itemed").show();
	}else{
		$("#LAY_app").addClass('layadmin-side-shrink');
		$("#LAY_app_flexible").removeClass('layui-icon-shrink-right').addClass('layui-icon-spread-left');
		//隐藏当前展开二级
		$(".layui-nav-itemed").hide();
	}
}

//===========栏目==============
//二级栏目
function secondChannelCode(pchannelcode,childlist){
	if(childlist!=null && childlist.length>0){
		childlist=childlist.sort(channelComparer);
		var tempcode=new Array();
		tempcode.push('<dl class="layui-nav-child" id="snd_'+pchannelcode+'" >');
		for(var ti=0;ti<childlist.length;ti++){
			var temp = childlist[ti];
			if(!channelFilter(temp)){
				continue;
			}
			var haschild = true;
			if(util.isBlank(temp.children) || null==temp.children || temp.children.length==0){
				haschild=false;
			}
			tempcode.push('<dd><a id="lm'+temp.code+'" lmid="'+temp.code+'" levels="2" murl="'+temp.url+'" syscode="'+temp.system+'" opentype="'+temp.type+'" stype="'+temp.protocol+'" haschild="'+haschild+'" onclick="channelclick(this)" >'+temp.name+'</a></dd>');
			//下级
			if(haschild){
				var childrencode=thirdChannelCode(temp.code,temp.children);
				$("#tabsArea").append(childrencode);
			}
		}
		tempcode.push('</dl>');
		return tempcode.join("");
	}else{
		return "";
	}
}
//三级栏目
function thirdChannelCode(pchannelcode,childlist){
	if(childlist!=null && childlist.length>0){
		childlist=childlist.sort(channelComparer);
		var tempcode=new Array();
		tempcode.push('<ul class="layui-tab-title" id="trd_'+pchannelcode+'" style="display:none" >');
		for(var ti=0;ti<childlist.length;ti++){
			var temp = childlist[ti];
			if(!channelFilter(temp)){
				continue;
			}
			tempcode.push('<li><a id="lm'+temp.code+'" lmid="'+temp.code+'" levels="3" murl="'+temp.url+'" syscode="'+temp.system+'" opentype="'+temp.type+'" stype="'+temp.protocol+'" onclick="channelclick(this)" >'+temp.name+'</a></li>');
		}
		tempcode.push('</ul>');
		return tempcode.join("");
	}else{
		return "";
	}
}
function mainPageDo(){
	if("3"==usertype){
		$("#school_tobeShow").show();
	}else{
		$("#area_tobeShow").show();
	}
}
function checkMainId(lid){
	return "01"==lid || "21"==lid;
}
//栏目点击
function channelclick(lmobj){
	menuToggle(1);
	//alert(lmobj.levels);
	//var thisobj=$(lmobj);
	var thisobj=$("#"+lmobj.id);
	var lmid=thisobj.attr("lmid");
	var lmidArr=lmid.split("_");
	var url=thisobj.attr("murl");
	//当是首页时
	if(checkMainId(thisobj.attr("lmid"))){
		$("#tabsArea .layui-tab-title").hide();
		mainPageDo();
		url=getChannelUrl(url);
		//执行处理则切换样式
		channelChangeStyle(lmid,true);
		$("#manageframe").attr("src",url);
	}else{
		//有子栏目的一级不处理，仅展开
		if(1==lmidArr.length && "true"==thisobj.attr("haschild")){
			if(thisobj.parent().hasClass("layui-nav-itemed")){
				thisobj.parent().removeClass("layui-nav-itemed");
			}else{
				thisobj.parent().addClass("layui-nav-itemed");
			}
			//$("#snd_"+lmid).toggle();
			return;
		}

		$("#tabsArea .layui-tab-title").hide();
		$("#trd_"+lmidArr[0]+"_"+lmidArr[1]).show();
		$("#school_tobeShow").hide();
		$("#area_tobeShow").hide();

		//除了上部一级展开,其他记录点击数
		saveChannelClick(lmid);
		
		//默认下级处理
		if(thisobj.attr("opentype")=="6"){
			lmchild=null;
			//只可能是2级下选3级
			lmchild=$("#trd_"+lmid+" li a")
			//找下级栏目
			if(lmchild && lmchild.size()>0){
				for(var cli=0;cli<lmchild.length;cli++){
					var tlm=$(lmchild[cli]);
					if(tlm.attr("opentype")=="6" || tlm.attr("opentype")=="1" || tlm.attr("opentype")=="3"){
						tlm.click();
						return;
					}
				}
			}
		}
		
		//参数替换符处理
		url=getChannelUrl(url);
		
		if(thisobj.attr("opentype")=="5"){
			//js动态加载栏目
			eval($(thisobj).attr("data"));
		}
		
		if(thisobj.attr("opentype")=="1" || thisobj.attr("opentype")=="2"){
			var p=protocol;
			if("http"==thisobj.attr("stype")){
				p="http://"
			}else if("https"==thisobj.attr("stype")){
				p="https://"
			}
			if(util.isBlank(sysconfig[thisobj.attr("syscode")])){
				url="#";
			}else{
				url=p+sysconfig[thisobj.attr("syscode")]+url;
			}
		}
		
		//处理不同类型打开
		if(thisobj.attr("opentype")=="2" || thisobj.attr("opentype")=="4"){
			if(util.grantChecker("channel",lmid)){
				grantAlert();
			}else{
				window.open(url);
			}
		}else if(thisobj.attr("opentype")!="5"){
			//channelGrantCheck(lmid,url);
			$("#manageframe").attr("src",url);
			//执行处理则切换样式
			channelChangeStyle(lmid,true);
		}
	}
}
//当选中某个栏目时，处理各层选中   ifclear-是否先秦清除所有选中
function channelChangeStyle(lmid,ifclear){
	if("undefined"==typeof(lmid) || lmid==null){
		return;
	}
	if(ifclear){
		//取消一级选中
		$(".layui-nav-item").removeClass("layui-this");
		//取消二级选中
		$(".layui-nav-child dd").removeClass("layui-this");
		//折合已展开的二级
		$(".layui-nav-itemed").removeClass("layui-nav-itemed");
		//取消三级选中
		$(".layui-tab-title li").removeClass("layui-this");
	}
	var lmidArr=lmid.split("_");
	if(lmidArr.length==1){
		$("#lm"+lmidArr[0]).parent().addClass("layui-this");
	}
	if(lmidArr.length>1){
		$("#lm"+lmidArr[0]).parent().addClass("layui-nav-itemed");
		$("#lm"+lmidArr[0]+"_"+lmidArr[1]).parent().addClass("layui-this");
	}
	if(lmidArr.length>2){
		$("trd_"+lmidArr[0]+lmidArr[1]).show();
		$("#lm"+lmidArr[0]+"_"+lmidArr[1]+"_"+lmidArr[2]).parent().addClass("layui-this");
	}
}
//栏目过滤定制，权限
function channelFilter(achannel){
	if("1"==achannel.isuse && achannel.role.indexOf(usertype)>-1){
		var bresult=true;
		//地区管理员，role配置5
		var nowrole=usertype;
		if(""==nowrole){
			nowrole="5";
		}
		//角色过滤
		if(achannel.role.indexOf(nowrole)==-1){
			bresult = false; 
		}
		//新产品权限验证，通过c1字段
		try{
			if(bresult && "undefined" != typeof(achannel.c1) && achannel.c1!="" && "undefined" != typeof(channelGrantJson) && "undefined" != typeof(channelGrantJson.rtnArray)){
				if("0"==channelGrantJson.rtnArray[0][achannel.c1]){
					return false;
				}
			}
		}catch(e){
			
		}
		//过滤条件检查
		if(bresult &&  !util.isBlank(achannel.filter) && achannel.filter.startWith("{") && achannel.filter.endWith("}")){	
			var filterWords=JSON.parse(achannel.filter);
			if(bresult && !util.isBlank(filterWords["schoolstage"])){//若当前角色包含多学段且扩展字段c4中维护的有学段
	        	if(util.isBlank(schoolStage)){
	        		bresult = false;
	        	}else if(schoolStage.length>filterWords["schoolstage"].length){
                    if((","+schoolStage+",").indexOf(","+filterWords["schoolstage"]+",")==-1){
                        bresult = false;
                    }
                }else if((","+filterWords["schoolstage"]+",").indexOf(","+schoolStage+",")==-1){
                        bresult = false;
                }
	        }
	        if(bresult && !util.isBlank(filterWords["noschoolstage"])){ //若当前角色包含多学段且扩展字段c4中维护的有学段
                if(schoolStage.length>filterWords["noschoolstage"].length){
                    if((","+schoolStage+",").indexOf(","+filterWords["noschoolstage"]+",")!=-1){
                        bresult = false;
                    }
                }else{
                    if((","+filterWords["noschoolstage"]+",").indexOf(","+schoolStage+",")!=-1){
                        bresult = false;
                    }
                }
            }
	        //等于地区
	        if(bresult && !util.isBlank(filterWords["areaid"])){
	        	if(userAreaId!=null && userAreaId.length>0){
                    if((","+filterWords["areaid"]+",").indexOf(","+userAreaId+",")==-1){
                        bresult = false;
                    }
	        	}
	        }
	        //不等于地区
	        if(bresult && !util.isBlank(filterWords["noareaid"])){//维护不显示地区的则不显示该栏目
	        	if(userAreaId!=null && userAreaId.length>0){
                    if((","+filterWords["noareaid"]+",").indexOf(","+userAreaId+",")!=-1){
                        bresult = false;
                    }
	        	}
	        }
	        //包含在地区中
	        if(bresult && !util.isBlank(filterWords["inareaid"])){
	            if(userAreaId.length>0 && filterWords["inareaid"]!=null && filterWords["inareaid"].length>0){
	            	//检查是否包含
	            	if(!checkAreaIdContains(filterWords["inareaid"],userAreaId)){
	            		bresult = false;
	            	}
                }
	        }
	        //不包含在某地区下
	        if(bresult && !util.isBlank(filterWords["noinareaid"])){
	            if(userAreaId.length>0 && filterWords["noinareaid"]!=null && filterWords["noinareaid"].length>0){
	            	//检查是否包含
	            	if(checkAreaIdContains(filterWords["noinareaid"],userAreaId)){
	            		bresult = false;
	            	}
                }
	        }
	        //某学校显示
	        if(bresult && !util.isBlank(filterWords["schoolId"])){
	            if(schoolId.length>0 && filterWords["schoolId"]!=null && filterWords["schoolId"].length>0){
	            	//不包含不显示
	            	if((","+filterWords["schoolId"]+",").indexOf(","+schoolId+",")==-1){
	            		bresult = false;
	            	}
                }
	        }
	        //某学校之外显示
	        if(bresult && !util.isBlank(filterWords["noschoolId"])){
	            if(schoolId.length>0 && filterWords["noschoolId"]!=null && filterWords["noschoolId"].length>0){
	            	//检查是否包含
	            	if((","+filterWords["noschoolId"]+",").indexOf(","+schoolId+",")!=-1){
	            		bresult = false;
	            	}
                }
	        }
		}
		//检查用户中心权限是否可显示
		if(bresult && !util.isBlank(appNoGrant)){
	        var xzfw = ","+appNoGrant+",".indexOf(",portalmenu_"+achannel.code.replaceAll("\\.", "_")+",");
	        if(xzfw>-1){
	            bresult = false;
	        }
	    }
		return bresult;
	}
	return false;
}
//比较地区content是否包含key
function checkAreaIdContains(key,content){
	if(util.isBlank(content) || util.isBlank(key)){
		return false;
	}
	if(key.indexOf(",")>0){
		var keys=key.split(",");
		for(var ki=0;ki<keys.length;ki++){
			if(content.substring(0,keys[ki].length)==keys[ki]){
				return true;
			}
		}
		return false;
	}else{
		if(content.length<key.length){
			return false;
		}
		if(content.substring(0,key.length)==key){
			return true;
		}
	}
}
function getChannelUrl(url){
	url=url.replaceAll("$username$",username)
	.replaceAll("$trueName$",truename)
	.replaceAll("$usertype$",usertype)
	.replaceAll("$studentId$",studentId)
	.replaceAll("$classId$",classid)
	.replaceAll("$gradeCode$",gradeCode)
	.replaceAll("$schoolId$",schoolId)
	.replaceAll("$schoolStage$",schoolStage)
	.replaceAll("$areaCode$",localAreaCode)
	.replaceAll("$userAreaId$",userAreaId)
	.replaceAll("$telNumber$",phoneNumber)
	.replaceAll("$defaultStage$","")
	.replaceAll("$SchoolAreaCode$","")
	.replaceAll("$ut$",util.getCookie("ut"));
	
	var rclimit=10;//防死循环
	while(url.indexOf("$yjtURL.")>-1 && rclimit>0){
		rclimit--;
		var is = url.indexOf("$yjtURL.")+8;
		var ie = url.indexOf("$",is)
		if(ie>is){
			var temp=url.substring(is,ie);
			if(!util.isBlank(sysconfig[temp])){
				url=url.replaceAll("$yjtURL."+temp+"$",sysconfig[temp]);
			}else{
				url=url.replaceAll("$yjtURL."+temp+"$","");
			}
		}
	}
	return url;
}

//栏目排序函数比较器
function channelComparer(a,b){
	try{
		return Number(a.order)-Number(b.order);
	}catch(e){
		return 0;
	}
}

//栏目展示开始方法
function menuShowStart(){
	if(managechannel && managechannel.length>0){
		managechannel=managechannel.sort(channelComparer);
		var sbf=new Array();
		for(var ci=0;ci<managechannel.length;ci++){
			if("1"==managechannel[ci].isuse){
				var nchannel=managechannel[ci];
				if(!channelFilter(nchannel)){
					continue;
				}
				var url = nchannel.url;
				if(nchannel.system && !util.isBlank(nchannel.system)){
					
				}
				var haschild = true;
				if(util.isBlank(nchannel.children) || null==nchannel.children || nchannel.children.length==0){
					haschild=false;
				}
				var cssname="layui-icon-component";
				if(util.isBlank(nchannel.className)){
					if("01"==nchannel.code){
						//首页处理
						cssname="layui-icon-home";
						
					}
				}else{
					cssname=nchannel.className;
				}
				sbf.push('<li class="layui-nav-item">');
				sbf.push('<a id="lm'+nchannel.code+'" lmid="'+nchannel.code+'" levels="1" murl="'+nchannel.url+'" syscode="'+nchannel.system+'" opentype="'+nchannel.type+'" stype="'+nchannel.protocol+'" haschild="'+haschild+'" onclick="channelclick(this)"  >');
				sbf.push('<i class="layui-icon '+cssname+'"></i>');
				sbf.push('<cite>'+nchannel.name+'</cite>');
				if(haschild){
					sbf.push('<span class="layui-nav-more"></span>');
				}
				sbf.push('</a>');
				//下级
				sbf.push(secondChannelCode(nchannel.code,nchannel.children));
				sbf.push('</li>');
			}
		}
		$("#LAY-system-side-menu").html(sbf.join(""));
	}
	//根据传递data打开默认栏目或页面，默认打开第一个栏目
	openDefaultChannel();
}
//data首页控制默认打开处理
function openDefaultChannel(){
		var defalutselect=null;
		var changeDefaultPage=false;
		var mainLm=$("#lm01");
		if(usertype==""){
			mainLm=$("#lm21");
		}
		if(window.location.href.indexOf("data={")>1){
			defalutselect=$.parseJSON(util.getRequestParam("data"));
		}
		if(window.location.href.indexOf("data=%7B")>1){
			defalutselect=$.parseJSON(decodeURIComponent(util.getRequestParam("data")));
		}
		//自动进入栏目
		try{
		if(defalutselect!=null && !util.isBlank(defalutselect.channel)){
			//判断打开的栏目
			var targetObject=$("#lm"+defalutselect.channel.replace(/\./g,"_"));
			if(targetObject){
				targetObject.click();
				changeDefaultPage=true;
			}
		}
		}catch(e){
			if(console && console.log){
				console.log("data.channel处理异常："+e.message);
				console.log(e);
			}
		}

		try{
		if(defalutselect!=null && !util.isBlank(defalutselect.icode)){
			var turl = util.makeUrl( defalutselect.icode.substring(0,defalutselect.icode.indexOf(".")) , defalutselect.icode );
			if( typeof(turl)!="undefined" && turl!=null && ""!=turl && "#"!=turl){
				var param = defalutselect.p;
				if( !util.isBlank(param) ){
					//参数是否base64加密编码
					if(typeof(defalutselect.sencode)!="undefined" && defalutselect.sencode!=null && defalutselect.sencode=="true" ){
						param=new Base64().decode(param);
					}
					//param=param.replaceAll('|||','&');//转义&以传递URL参数，不过作base64就没必要转义了
					if(turl.indexOf("?")>-1){
						turl+="&"+param;
					}else{
						turl+="?"+param;
					}
				}
				$("#manageframe").attr("src",turl);
				changeDefaultPage=true;
			}
		}
		}catch(e){
			if(console && console.log){
				console.log("data.icode处理异常："+e.message);
				console.log(e);
			}
		}
		
		try{
		if(defalutselect!=null && !util.isBlank(defalutselect.setmain) && mainLm.length>0){
			var turl = util.makeUrl( defalutselect.setmain.substring(0,defalutselect.setmain.indexOf(".")) , defalutselect.setmain );
			if( typeof(turl)!="undefined" && turl!=null && ""!=turl && "#"!=turl){
				mainLm.attr("murl",turl);
			}
		}
		}catch(e){
			if(console && console.log){
				console.log("data.setmain处理异常："+e.message);
				console.log(e);
			}
		}

		if(!changeDefaultPage){
			mainLm.click();
		}
}
//处理栏目数据展示
menuShowStart();

//栏目点击时间保存localStorage处理
function saveChannelClick(channelid){
	var channelkey="channelCount";
	var cdata=util.getLocalData(channelkey);
	if(cdata==null || cdata.indexOf("{")==-1){
		cdata="{}";
	}
	if(!util.isBlank(cdata)){
		cdata=JSON.parse(cdata);
		/*
		if(cdata["lm"+channelid]){
			cdata["lm"+channelid]=Number(cdata["lm"+channelid])+1;
		}else{
			cdata["lm"+channelid]=new Date().getTime();
		}
		*/
		cdata["lm"+channelid]=new Date().getTime();
		cdata=JSON.stringify(cdata);
		util.setLocalData(channelkey,cdata);
	}else{
		//cdata=JSON.stringify(new Array()[channelid]=1);
		cdata="{\"lm"+channelid+"\":"+new Date().getTime()+"}";
		util.setLocalData(channelkey,cdata);
	}
}

if("3"==usertype){
	$("#area_tobeShow").hide();
	$("#school_tobeShow").show();
	//校本资源待审核数
	util.getRemoteJson("PLS","PLS.BDZYSHS","resState=0&listType=0&schoolCode="+schoolId,function(result){
		$("#xbzy").html(result.ResInfo);
	});
	//录直播待审核数
	var url = interface_config["RLMS.LZBSHS"]+"&schoolId="+schoolId;
	$.getScript(path+"/common/pvInfo.jsp?code=RLMS&url="+encodeURIComponent(encodeURIComponent(url)),function(){
		if(typeof pvJson != "undefined"){
			var result = pvJson;
			if(pvJson==null || result.length == 0){
				return false;
			}else{
				$("#lzb").html(result.count);
			}
		}
	});
}else{
	$("#school_tobeShow").hide();
	$("#area_tobeShow").show();
	util.getRemoteJson("PLS","PLS.AREA_BDZYSHS",null,function(result){
		$("#qbzy").html(result.ResInfo);
	});
}
</script>

</body>
</html>


<script type="text/javascript">
<!--
//可配置js代码段
var _type4OtherConfig="manage_index";

var indexlogo =  (portal_config.indexlogo!=""&&portal_config.indexlogo!="undefined")?portal_config.indexlogo:"logo.png";
//页面初始化事件
$(function(){
    //判断用户类型，如果不对退出登录页
    if(usertype == '0'||usertype == '2'||usertype == '4'){
        window.location.href='/ssoLoginFail.jsp';
    }
	//教师名显示
	$("#welcomeDiv").html(truename+"老师，欢迎您！");
	if("3"==usertype){
		//学校名显示
		$("#spaceName").html(schoolName);
	}else if(!util.isBlank(areaName)){
		var showAreaName=areaName.replaceAll(".","");
		$("#spaceName").html(showAreaName);
	}
	truename;
	//单校上云校门户入口
	schoolProtalLink();
	
	//帮助
	$("#helplink").attr("href",protocol+sysconfig.CMS+interface_config["CMS.PAGE.USEGUIDE"]);
	//logo定制
	$("#indexlogo").attr("src","../space/images/logo/"+indexlogo);
	//版权底部增加page=manager压缩高度为60px
	/*
	var footurl="//"+sysconfig.CMS+interface_config["CMS.PAGE.A01022"];
	if(footurl.indexOf("?")>1){
		footurl=footurl+"&";
	}else{
		footurl=footurl+"?";
	}
	footurl=footurl+"page=manager";
	$("#footiframe").attr("src",footurl);
	*/
	//$("#footiframe").attr("src","http://cms.czbanbantong.com/A01/A01074/A01074017/A01074017001/list_1.html?pram=1&page=manager");
	//登录用户类型
	$("#loginUsertype").attr("value",loginUsertype);
	//登录共建域名
	$("#gjpt").attr("value",getHost());
	//登录验证码
	$("#LAY-user-get-vercode").click(function(){this.src=protocol+sysconfig.SSO+interface_config["SSO.CODE"]+'?r='+new Date().getSeconds();});

	//角色切换加载
	getMulteRole("<dd><a href=\"~url~\">~role~</a></dd>","changeRoleDl","manage");

});

//=============角色切换及登陆处理=============

var inputnameid="#LAY-user-login-username";
var inputpwdid="#LAY-user-login-password";
var inputvcodeid="#LAY-user-login-vercode";

//登陆框选择角色点击事件
$(".tab-juese li").click(function(){
	$(this).addClass("layui-this");
	$(this).siblings().removeClass("layui-this");
	//登录角色
	$("#loginUsertype").attr("value",$(this).attr("id"));
	//登录角色
	$("#username").attr("value","");
	//调用选择账号接口
	$("#roleDiv").attr("phonenum","");
	//getRoles();
	//刷新验证码
	$("#LAY-user-get-vercode").click();
});

//手机多用户选择
//$(inputnameid).keyup(function(){getRoles();});
//$(inputnameid).click(function(){getRoles();});

	function changeRole(){
		if(usertype == 4){ //学生则直接显示输入框
			showLogin();
		}else{ //若没有绑定多个家长账号，则直接显示输入框
			if($("#changeRoleDl dd").size()>1){ //判断存在多账号可选择
				showLogin(0);
				if($("#changeRoleDl").hasClass("layui-show")){
					$("#changeRoleDl").removeClass("layui-show");
				}else{
					$("#changeRoleDl").addClass("layui-show");
				}
			}else{
				showLogin();
			}
		}
	}
	//显示登陆框
	function showLogin(show){
		//show 1强制打开，0强制关闭，默认 切换开合
		if(1==show){
			//隐藏角色选择
			$("#changeRoleDl").removeClass("layui-show");
			$("#LAY-user-get-vercode").click();
			$("#loginDiv").removeClass("hide");
			$("#loginDiv #teacher").click();
		}else if(0==show){
			$("#loginDiv").addClass("hide");
		}else{
			if($("#loginDiv").hasClass("hide")){
				//隐藏角色选择
				$("#changeRoleDl").removeClass("layui-show");
				$("#LAY-user-get-vercode").click();
				$("#loginDiv").removeClass("hide");
				$("#loginDiv #teacher").click();
			}else{
				$("#loginDiv").addClass("hide");
			}
		}
	}
	
	//登录框检测js
	function login_check(){
		if ($(inputnameid).val() == '' || $(inputpwdid).val() == '' || $(inputvcodeid).val() == ''){
			
			return false;
		}else{
			if($("#loginUsertype").val().replace(/\s+/g,"")==""){ //默认老师
		     	$("#loginUsertype").attr("value","teacher");
		    }

            //调用是否有多账号接口，判断用户名密码是否正确
            var modulus="10001";
            var publicExponent="ca56aa9d90e438b659c4d8da8d586687eabe1ba7bd90463981ea5397aab90020387e0a541020eddaa746f982a30115c54b04d5d1f823345f8d16ebffe647c986be3692158fc08413854ab3123b48c9ff486b12905ab21dd2dcfbbab9a2afac89953d86582bd13392c8fbbba0795fb00ebfffe3b0eb6a9cc372ee84635984807f";
            var pubkey = new RSAUtils.getKeyPair(modulus,"",publicExponent);
            RSAUtils.setMaxDigits(130);
            var phoneNumRSA = RSAUtils.encryptedString(pubkey,$(inputnameid).val());
            var pwdRSA = RSAUtils.encryptedString(pubkey,$(inputpwdid).val());
            var validateCode = $(inputvcodeid).val();
            util.getCharsetRemoteJson("SSO","SSO.203","q="+phoneNumRSA+"&pwdRsa="+pwdRSA+"&validateCode="+validateCode+"&timestamp="+Math.floor(Math.random()*10000)+"&loginUsertype="+$('#loginUsertype').val(),"gbk",function(result){
                if(result){
                    //如果密码错误，弹窗提示,密码正确且有多账号就展示
                    if(result.code != '200'){
                        $('#LAY-user-get-vercode').click();
                        $(inputvcodeid).val('');
                        art.dialog({
                            //设置内容与边界距离
                            top:'50%',
                            icon:'warning',
                            padding:5,
                            title:'提示信息',
                            width:500,
                            left:'50%',
                            //提示内容
                            content: result.msg,
                            //开启锁屏
                            lock:true,
                            //锁屏遮罩透明度
                            opacity: 0.1,
                            ok: function () {
                                return true;
                            },
                            okVal:'确定',
                            close:function(){
                                return true;
                            }
                        });
                    }else{
                        if(result.data && result.data.length > 1){
                            var html = "<div style='margin:0 20%;'>";
                            for(var num=0;num<result.data.length;num++){
                                if(num == 0){
                                    html += '<div class="checkuserradio"><input type="radio" id="cradio'+num+'" checked value="'+result.data[num].username+'" name="usercheckradio"><label class="radio-label" for="cradio'+num+'">'+result.data[num].role+'</label></div>';
                                }else{
                                    html += '<div class="checkuserradio"><input type="radio" id="cradio'+num+'" value="'+result.data[num].username+'" name="usercheckradio"><label class="radio-label" for="cradio'+num+'">'+result.data[num].role+'</label></div>';
                                }
                            }
                            html += '</div>';

                            art.dialog({
                                //设置内容与边界距离
                                top:'50%',
                                padding:5,
                                title:'选择用户',
                                width:387,
                                left:'50%',
                                //提示内容
                                content: html,
                                //开启锁屏
                                lock:true,
                                //锁屏遮罩透明度
                                opacity: 0.1,
                                cancel: false,
                                ok: function () {
                                    var checked = $("input[name='usercheckradio']:checked").val();
                                    var checkedName = $("input[type='radio']:checked")[0].nextSibling.data;
                                    if(typeof checked == 'undefined'){

                                        return false;
                                    }else{
                                        $("#username").attr("value",checked);
                                        $("#changename").html(checkedName);
                                        tologin();
                                        return true;
                                    }
                                },
                                okVal:'确定'
                            });
                        }else{
                            //没有多账号，直接登录
                            $("#username").attr("value",result.data[0].username);
                            $("#changename").html(result.data[0].role);
                            tologin();
                        }
                    }
                }
            });

			// if($("#username").val()==""){
			// 	//若用户输入的是手机号，但是没有多个账号选择，则调用接口获取用户的账号，以供下方使用
			// 	util.getCharsetRemoteJson("SSO","SSO.203","q="+$(inputnameid).val().replace(/\s+/g,"")+"&timestamp="+Math.floor(Math.random()*10000),"gbk",function(result){
			// 		var j = 0;
			// 		if(result){
			// 		  for(var i = 0;i<result.length;i++){
			// 			  if(result[i].userType == $("#loginUsertype").val() ){
			// 				  j++;
			// 			   	$("#username").attr("value",result[i].username);
			// 			  }
			// 		  }
			// 		 }
			// 		if(j>1){ //表明该用户没有选择账号
			// 			art.dialog({
			//        //设置内容与边界距离
			//        top:'50%',
			//        icon:'face-sad',
			//        padding:5,
			//        title:'提示信息',
			//        width:500,
			//        left:'60%',
			//        //提示内容
			//        content: "请选择您需要切换的账号信息，再确认！",
			//        //开启锁屏
			//        lock:true,
			//        //锁屏遮罩透明度
			//        opacity: 0.1,
			//        ok: function () {
			// 					$("#username").attr("value","");
			//             return true;
			//           },
			//           okVal:'确定',
			//           close:function(){
			//         	  $("#username").attr("value","");
			//             return true;
			//        }
			//       });
			// 			return false;
			// 		}
			//
			// 		if($("#username").val()=="")$("#username").attr("value",$(inputnameid).val().replace(/\s+/g,""));
			// 		loginYz();
			// 	});
			// }else{
			// 	loginYz();
			// }
			return false;
		}
	}
	//登录验证
	function loginYz(){
		var username= $("#username").val().replace(/\s+/g,"");
   		var pwd = $(inputpwdid).val().replace(/\s+/g,"");
   		$("#pwd").val(pwd);
	$.get("<%=basePath%>changeCode.action?username="+username+"&pwd="+pwd,"",function(data){
		var strs = data.split(",");
		var userN = strs[0];
		var pwD = strs[1];
		var param = "appFlg=portal&pwd="+pwD+"&username="+userN+"&loginUsertype="+$("#loginUsertype").val()+"&rand="+$(inputvcodeid).val()+"&authType=onlyCheck&validateCodeEn=1";
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
						$("#LAY-user-get-vercode").click();
						return true;
					},
				    okVal:'确定',
				    close:function(){
						//刷新验证码
						$("#LAY-user-get-vercode").click();
						return true;
					}
				});
			}else{ //认证成功进行登录
				//登录
				tologin();
			}
		});
	},"text");
}

//多账号时选择账号
function getRoles(){
	//检查角色列表与
	try{
	//自适应宽度及高度
	//document.body.clientWidth
	var phoneNum=$(inputnameid).val();
	if(phoneNum.length!=11){
		$("#roleDiv").hide();
		$("#username").val("");
		return;
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
			if(phoneNum!=$("#roleDiv").attr("phonenum") || $("#roleList a").length==0){
				if(phoneNum!=$("#roleDiv").attr("phonenum") || $("#roleList a").length==0){
					$("#roleList").html("");
					
					if(result){
						for(var num=0;num<result.length;num++){
							if(num%2==0){
								$("#roleList").append('<a  roleid="'+result[num].username+'" onclick="selRole(this)" >'+result[num].role+'</li>');
							}else{
								$("#roleList").append('<a  roleid="'+result[num].username+'" onclick="selRole(this)" >'+result[num].role+'</li>');
							}
						}
						if(result.length>0){
							if($("#roleList a").length>0){
								//$("#roleList").attr("height",(result.length * 22));
								$("#roleDiv").css("display","block");
							}else{
								$("#roleDiv").css("display","none");
							}
						}else{
							$("#roleDiv").css("display","none");
							//alertNoRole(flag);
						}
					}
					$("#roleDiv").attr("phonenum",phoneNum);
				}
			}
		});
	}else{
		if($("#roleList a").length>0){
			//$("#roleList").attr("height",($("#roleList li").length * 22));
			$("#roleDiv").css("display","block");
		}else{
			$("#roleDiv").css("display","none");
			//alertNoRole(flag);
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
//登录
function tologin(){
	if($(inputnameid).val().replace(/\s+/g,"")=="请输入账号/手机号" || $(inputnameid).val().replace(/\s+/g,"")==""){
		art.dialog({
				//设置内容与边界距离
				top:'50%',
				icon:'warning',
				padding:5,
				title:'提示信息',
				width:500,
				left:'50%',
				//提示内容
				content: '用户名不能为空，请输入您的用户名！',
				//开启锁屏
				lock:true,
				//锁屏遮罩透明度
				opacity: 0.1,
				ok: function () {
			      return true;
			    },
			    okVal:'确定',
			    close:function(){
			      window.setTimeout(function(){ $("#inputname").focus();},80);
			      return true;
				}
		});
		return;
	}else if($(inputpwdid).val().replace(/\s+/g,"")==""){
		art.dialog({
				//设置内容与边界距离
				top:'50%',
				icon:'warning',
				padding:5,
				title:'提示信息',
				width:500,
				left:'50%',
				//提示内容
				content: '密码不能为空，请输入您的密码！',
				//开启锁屏
				lock:true,
				//锁屏遮罩透明度
				opacity: 0.1,
				ok: function () {
				  window.setTimeout(function(){ $("#inpwd").focus();},80);
			      return true;
			    },
			    okVal:'确定',
			    close:function(){
			      return true;
				}
				});
		return;
	}else if($(inputvcodeid).val().replace(/\s+/g,"")=="" || $(inputvcodeid).val().replace(/\s+/g,"") == "验证码"){
		art.dialog({
				//设置内容与边界距离
				top:'50%',
				icon:'warning',
				padding:5,
				title:'提示信息',
				width:500,
				left:'50%',
				//提示内容
				content: '验证码不能为空，请输入您的验证码！',
				//开启锁屏
				lock:true,
				//锁屏遮罩透明度
				opacity: 0.1,
				ok: function () {
				  window.setTimeout(function(){  $("#validateCode").focus();},80);
			      return true;
			    },
			    okVal:'确定',
			    close:function(){
			      return true;
				}
				});
		return;
	}
	//登录置为不可用
	$("#loginbuttion").attr("disabled","disabled");
	$("#validateCode").val($(inputvcodeid).val());
	$(inputnameid).attr("value",$(inputnameid).val().replace(/\s+/g,""));
	if($("#username").val()=="")$("#username").attr("value",$("#inputname").val());
	util.saveCookie("inputname",util.confoundInputName(escape($(inputnameid).val().replace(/\s+/g,""))),1000,"/");
	util.saveCookie("username",escape(encodeURI($("#username").val().replace(/\s+/g,""))),1000,"/");
	if($("#loginUsertype").val().replace(/\s+/g,"")==""){ //默认老师
		$("#loginUsertype").attr("value","teacher");
		util.saveCookie("loginUsertype",$("#loginUsertype").val().replace(/\s+/g,""),1000);
	}else{
		util.saveCookie("loginUsertype",$("#loginUsertype").val().replace(/\s+/g,""),1000);
	}
	$("#loginForm").attr("action",protocol+sysconfig.SSO+"/sso/ssoAuth");
	//密码加密
	var secpwd = document.getElementById("sfp");
	/*
	//MD5加密方式
	if(secpwd && hex_md5){
		$("#pwd").val(hex_md5($("#inpwd").val()));
		$("#inpwd").val("");
		secpwd.value="1";
	}*/
	//RSA加密
	if(secpwd && RSAUtils ){
		var modulus="10001";
	    var publicExponent="ca56aa9d90e438b659c4d8da8d586687eabe1ba7bd90463981ea5397aab90020387e0a541020eddaa746f982a30115c54b04d5d1f823345f8d16ebffe647c986be3692158fc08413854ab3123b48c9ff486b12905ab21dd2dcfbbab9a2afac89953d86582bd13392c8fbbba0795fb00ebfffe3b0eb6a9cc372ee84635984807f";
	    var pubkey = new RSAUtils.getKeyPair(modulus,"",publicExponent);
		RSAUtils.setMaxDigits(130);
		var pwdRSA = RSAUtils.encryptedString(pubkey,$(inputpwdid).val());
		$("#pwd").val(pwdRSA);
		$(inputpwdid).val("");
		secpwd.value="2";
	}
	$("#loginForm").submit();
}
//-->
</script>
<script type="text/javascript" src="<%=path %>/common/otherConfig.jsp" ></script>