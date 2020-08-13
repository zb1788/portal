//基于老版登录logoinpage,屏蔽滚动图，优教家族，变化vcode,logo
var param = new Object(); 
param = util.getRequestParams();
var loginCheck = param["loginCheck"];
var data = param["data"];
var tips = param["tip"];//用户中心返回提示信息
var usertype="";//用户类型
var showRegedit=portal_config.show_reg;//是否显示注册
var domain = portal_config.domain;//当前主域
var areaname = portal_config.areaname;//当前地区名
var appdown="";
var upIe="";
try{
	appdown=protocol+sysconfig.CMS+interface_config["CMS.SETUPFILE"];
}catch(e){}
try{
	upIe=protocol+sysconfig.CMS+interface_config["CMS.PAGE.IEUPDATE"];
}catch(e){}
//支持传递替换logo处理
if(param["logo"]!=undefined){
	logo = param["logo"];
}
var areacode = portal_config.areacode;
var localAreaCode = portal_config.areacode;
//切换到某角色登陆状态
function loginClick(loginUserType){
	$("#"+loginUserType).click();
}
//页面加载初始化
$(function(){
/*
页面显示，链接，cookie初始化
*/
	//加入页面宽度cookie
	var screen_width = window.screen.width;
	var screen_width_id = "w1200";
	if(screen_width>=1280){
		screen_width_id = "w1200";
	}else{
		screen_width_id = "w980";
	}
	util.saveCookie("screen_width_id",screen_width_id,1000,"",domain);
	if(areacode!=""){
		util.saveCookie("localAreaCode",areacode,1000,"/",domain);
	}
	//针对别名支持写入cookie
	util.getRemoteJson("PORTAL","PORTAL.COOKIER","screen_width_id="+screen_width_id+"&localAreaCode="+areacode,function(r){});
	
	//给用户中心传的共建前缀参数
	$("#gjpt").attr("value",loginutil.getHost(sysconfig.PORTAL));
	util.saveCookie("gjpt",loginutil.getHost(sysconfig.PORTAL),1000,"/",domain);
	
	var logo = (portal_config.logo!=""&&portal_config.logo!=undefined)?portal_config.logo:defaultlogo;//当前地区logo图
	//logo
	$("#logoimg").attr("src","login/logo/"+logo);
	$("#appdown").attr("href",appdown);
	//当前城市名
	$(".city").html(areaname);
	//切换城市链接
	var balanceUrl = portal_config.balanceUrl;
	var swap_city_href = null;
	if(balanceUrl != null && balanceUrl.indexOf("?") == -1){
		swap_city_href = balanceUrl + "?areaCode=" + areacode;
	}else{
		swap_city_href = balanceUrl + "&areaCode=" + areacode;
	}
	if(param["logo"]!=undefined){
		swap_city_href=swap_city_href+"&logo="+param["logo"];
	}
	$(".swap_city").find("a").eq(0).attr("href",swap_city_href);
	
	//页脚链接
	var foot_src = protocol+sysconfig.CMS+interface_config["CMS.PAGE.A01022"];
	$("#footiframe").attr("src",foot_src);
	$("#data").attr("value",data);
	 
	//找回密码
	var getKey_url = protocol+sysconfig.TMS+interface_config["PORTAL.TMS.803"]+"&portalUrl="+encodeURI(encodeURI(basePath));
	$("#getKey").attr("href",getKey_url);
	
	//登陆帮助链接
	var guide=protocol+sysconfig.CMS+interface_config["CMS.PAGE.USEGUIDE"];
	$(".getKey").find("a").eq(1).attr("href",guide);
    $("#helplink").attr("href",guide);
    
	//各角色链接
	var par_url = protocol+sysconfig.CMS+"/A01/lib/defaultstyle/portalWJ/login/parent.html?path="+basePath;
	$("#par").attr("href",par_url);
	var tea_url = protocol+sysconfig.CMS+"/A01/lib/defaultstyle/portalWJ/login/teacher.html?path="+basePath;
	$("#tea").attr("href",tea_url);
	var stu_url = protocol+sysconfig.CMS+"/A01/lib/defaultstyle/portalWJ/login/student.html?path="+basePath;
	$("#stu").attr("href",stu_url);
	
	//展示登陆页焦点图
	//getLoginfocusImg("CMS.JSON.A01074015001");
	//加载优教家族代码
	//var yjjz_rul = protocol+ sysconfig.CMS+interface_config["CMS.PIC.YJJZ"];
	//$.getScript(yjjz_rul,function(){
	//	$("#yjjz").html(yjjz);
	//});
	//顶部插件及浏览器提示
	if(util.browser.msie){
		if(util.browser.version<9){
			if(util.userSys.winXP){
				$('#tips').html("<font class='redfon2'>温馨提示：</font>检测到您的系统版本过低，WindowsXP系统及IE8浏览器已不再提供服务支持，为了您的正常使用，请升级操作系统并使用IE10以上浏览器。");//<a target='_blank' href='"+upIe+"'>点这里查看升级方法</a>
				$('#tips').show();
			}else{
				$('#tips').html("<font class='redfon2'>温馨提示：</font>检测到您的浏览器版本过低，IE8浏览器已不再提供服务支持，为了您的正常使用，请升级到IE10以上浏览器版本。");//<a target='_blank' href='"+upIe+"'>点这里查看升级方法</a>
				$('#tips').show();
			}
		}else if(util.browser.version==9){
			$('#tips').html("<font class='redfon2'>温馨提示：</font>检测到您的浏览器版本过低，为了获得更好的使用体验，请升级浏览器到IE10或IE11。");//<a target='_blank' href='"+upIe+"'>点这里查看升级方法</a>
			$('#tips').show();
		}else if("undefined"==typeof(ocx.GetVersion)){
			$('#tips').html("<font class='redfon2'>温馨提示：</font>为确保更好体验平台资源及应用，请您下载并安装优教助手。只需轻松操作，后续畅享无忧！<a target='_blank' href='"+appdown+"'>点击这里下载</a>，安装后，点击优教助手图标访问优教通。");
			$('#tips').show();
		}
	}else if(util.browser.se360){
		$('#tips').html("<font class='redfon2'>温馨提示：</font>本系统暂不支持360安全浏览器访问，为了您的正常使用，请使用360急速浏览器或者IE10以上浏览器访问。");
		$('#tips').show();
	}else if(screen.width<1024){
		$('#tips').html("<font class='redfon2'>温馨提示：</font>为了保证您流畅观看网站内容，建议您将屏幕分辨率调至1024×768及以上。");
		$('#tips').show();
	}
	
/*
错误提示
*/
	loginutil.showLoginMessage(loginCheck);
	
/*
验证码点击，角色切换点击初始化
*/
	var yz_url = protocol+sysconfig.SSO+interface_config["SSO.CODE"];
	$("#codeimg").attr("onclick","this.src='"+yz_url+"?r='+Math.floor(Math.random()*10000)");
	
/*
cookie默认值处理
*/
	//初始化账号
	if(util.getCookie("inputname")!=''){
		$("#inputname").attr("value",util.unconfoundInputName(util.getCookie("inputname")));
	}
	//初始化密码
	if(util.getCookie("pwd")!=''){
		$("#inpwd").attr("value",util.unconfoundInputName(util.getCookie("pwd")));
		$("#savepass").attr("checked",true);
	}
	 //初始化角色选择
	var selUserType="teacher";
	//初始化用户角色选中,选中任意角色都会加载验证码
	if(util.getCookie("loginUsertype")!=''){
		selUserType=util.getCookie("loginUsertype");
	}
	$("#"+selUserType).click();	
	
	window.setTimeout('$("#codeimg").click()',200);
});