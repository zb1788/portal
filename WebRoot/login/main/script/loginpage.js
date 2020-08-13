/**
head-body js css

footiframe


logo图片加入id
id="logoimg"
地区名加入id 
id="areaname"

{{icode:CMS.SETUPFILE}}
{{icode:CMS.PAGE.USEGUIDE}}

登陆框
加入form
id="pwdLogin"
id="codeLogin"
inputname
savepass
name="validateCode" id="validateCode" 
<input type="hidden" id="loginUsertype" name="loginUsertype"/>
          <input type="hidden" id="gjpt" name="gjpt" />
<input type="hidden" name="username" id="username"/>
                <input type="hidden" name="sfp" id="sfp" value="" />
<input type="hidden"  id="pwd" name="pwd" value="" />
              <input id="isPortalisPortal" name="isPortal" type="hidden" value="1" />
              <input id="data" name="data" type="hidden" value="" />
flash
 id="flashul"

**/
//Flash
/*
 fbind="stat" {{fdata:"方法获得参数对应属性"}}绑定方法-数据处理
 icodeurl='true' {{icode:"接口标志"}}绑定接口地址数据处理
*/

var param = util.getRequestParams();
var loginCheck = param["loginCheck"];
var data = param["data"];
var tips = param["tip"];//用户中心返回提示信息
var usertype="";//用户类型
var showRegedit=portal_config.show_reg;//是否显示注册
var domain = portal_config.domain;//当前主域
var areaname = portal_config.areaname;//当前地区名
var appdown="";
var upIe="";
var areacode = portal_config.areacode;
var localAreaCode = portal_config.areacode;


function loginStat(){
	
}
var loginstat=new loginStat();
loginStat.prototype.stat=function(tdata){
	var data=tdata[areacode];
	 
	if(typeof(data)!="undefined" && data!=null){
		fdataParse($("[fbind='stat']"),data);
		if("tbktlogin"==_type4OtherConfig){
			statchart(data);
		}
		if(_type4OtherConfig=="login"){
			var allnum=Number(data.SCHOOL_STAT[0].SCHOOL)+Number(data.SCHOOL_STAT[0].TEACHER)+Number(data.SCHOOL_STAT[0].STUDENT)+Number(data.SCHOOL_STAT[0].PARENT);
			$("#allSpaceNum").text(allnum);
		}
	}
}
//两种接口数据同在的情况？
loginStat.prototype.paper=function(tdata){
	//名校试卷展示
	if("mxmjlogin"==_type4OtherConfig){
		var ncode=new Array();
		var pd=tdata.PAPER_RANK;
		for(var i=0;i<pd.length;i++){
			var temp=pd[i];
			var playUrl=protocol+sysconfig.VFS+"/pic/generic/web/paper.html?mxlkUrl="+protocol+sysconfig.VFS+"/pic/generic/web/viewer.html?file="+protocol+sysconfig.VFS+"/pic/ruiya/"+temp.HTMLPAGE;			
			ncode.push('<li><a target="_blank" href="'+playUrl+'"> <span class="mjxx1">名校名卷</span> <span class="mjxx2">'+temp.SUBJECT+'</span> <span class="mjxx3">'+temp.PAPER_NAME+'</span> <span class="mjxx4">'+temp.TTYPE+'</span> </a></li>');
			//ncode.push('<li><a target="_blank" href="'+temp.HTMLPAGE+'"><div style="background:url(login/main/images/mjuan.png) no-repeat center center;width:159px;height:217px;float:left;margin-left:30px;margin-right:30px"><div style="padding-top:23px;margin-left:5px;margin-right:5px;font-size:16px;"><font color=red style="font-size:20px;padding-left:15px;"><b>'+temp.TTYPE+"</b></font><br/>"+temp.PAPER_NAME+'</div></div></a></li>');
		}
		$("#lianKaoShiJuan").html(ncode.join(""));
	}
	fdataParse($("[fbind='paper']"),tdata);
}
function fdataParse(jqselobj,tdata){
jqselobj.each(function(){
		var pagecode=$(this).html();
		var reg1=new RegExp("\{\{fdata:(\\w|\.)+?\}\}","g");
		var arr=reg1.exec(pagecode);
		var rcode=pagecode;
	    while(arr){
			var code=arr[0].substring(8,(arr[0].length-2));
			var rule=null;
	    	if(code.indexOf(",")>1){
	    		rule=code.split(",")[1];
	    		code=code.split(",")[0];
	    	}
			var tval=null;
			try{
				tval=eval("tdata."+code);
			}catch(e){
				//是否置为空字符串进行替换？
			}
			if(!util.isBlank(tval)){
				if(null!=rule){
					if("out:"==rule.substring(0,4)){
						tval=rule.substring(4).replaceAll("$value$",tval).replaceAll("&quot;",'"').replaceAll("&lt;",'<').replaceAll("&gt;",'>');
						rcode=rcode.replaceAll(arr[0],tval);
					}
				}
				rcode=rcode.replaceAll(arr[0],tval);
			}else{
				//无值写空白
				rcode=rcode.replaceAll(arr[0],"");
			}
			arr=reg1.exec(pagecode);
	    }
	    if(pagecode!=rcode){
	    	$(this).html(rcode);
	    }
	    $(this).show();
    }
    );
}
var flash_currentindex=1;
var flash_allsize=5;
function changeflash(i) {
	flash_currentindex=i;
	for (j=0;j<flash_allsize;j++){
		if (j==flash_currentindex-1){
			$("#flashul li").eq(j).fadeIn("normal");
			$("#flashul li").eq(j).css("display","block");
			$(".flash_bar div").eq(j).removeClass();
			$(".flash_bar div").eq(j).addClass("dq");
		}else{
			$("#flashul li").eq(j).css("display","none");
			$(".flash_bar div").eq(j).removeClass();
			$(".flash_bar div").eq(j).addClass("no");
		}
	}
}
function startAm(){
timerID = setInterval("timer_tick()",8000);
}
function stopAm(){
clearInterval(timerID);
}
function timer_tick() {
	flash_currentindex=flash_currentindex>=flash_allsize?1:flash_currentindex+1;
	changeflash(flash_currentindex);
}
function falshStart(){
	flash_allsize=$("#flashul li").length;
	changeflash(1);
	$(".flash_bar div").mouseover(function(){stopAm();}).mouseout(function(){startAm();});
	startAm();
}
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

//切换到某角色登陆状态
function loginClick(loginUserType){
	$("#"+loginUserType).click();
}
function icodeTag(pagecode){
	var reg1=new RegExp("\{\{icode:(\\w|\.)+?\}\}","g");
	var arr=reg1.exec(pagecode);
	var rcode=pagecode;
    while(arr){
		var code=arr[0].substring(8,(arr[0].length-2));
		var sys=code.substring(0,code.indexOf("."));
		var url = util.makeUrl(sys,code);
		if(url!=null && url!="#"){
			rcode=rcode.replace("{{icode:"+code+"}}",url);
		}
		arr=reg1.exec(pagecode);
    }
    return rcode;
}
//页面加载初始化
$(function(){
	$("[icodeurl='true']").each(function(){
	 	//body 全局 接口匹配支持 
		var pagecode=$(this).html();
	    $(this).html(icodeTag(pagecode));
    }
    );
    
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
	//logo图片，点击，鼠标
	$("#logoimg").attr("src","login/logo/"+logo);
	$("#logoimg").css("cursor","pointer");
	$("#logoimg").click(function(){window.location.href=protocol+sysconfig.PORTAL});
	
	//当前城市名
	$("#areaname").html(areaname);
	//$("#appdown").attr("href",appdown);
	
	//切换城市链接
	var balanceUrl = portal_config.balanceUrl;
	var swap_city_href = null;
	if(balanceUrl != null && balanceUrl.indexOf("?") == -1){
		swap_city_href = balanceUrl + "?areaCode=" + areacode;
	}else{
		swap_city_href = balanceUrl + "&areaCode=" + areacode;
	}
	//URL参数传递logo切换区域支持
	if(param["logo"]!=undefined){
		swap_city_href=swap_city_href+"&logo="+param["logo"];
	}
	$(".swap_city").find("a").eq(0).attr("href",swap_city_href);
	//此处理已被loginobj中不同角色对应栏目-云平台多登录处理覆盖。且未知用户类型的情况下，指定栏目id没有意义。
	$("#data").attr("value",data);
	
	//页脚链接
	var foot_src = protocol+sysconfig.CMS+interface_config["CMS.PAGE.A01022"];
	$("#footiframe").attr("src",foot_src);
	 
	//找回密码
	//var getKey_url = protocol+sysconfig.TMS+interface_config["TMS.803"]+"&portalUrl="+encodeURI(encodeURI(basePath));
	//$(".getKey").find("a").eq(0).attr("href",getKey_url);
	
	//登陆帮助链接
    //$("#helplink").attr("href",protocol+sysconfig.CMS+interface_config["CMS.PAGE.USEGUIDE"]);
    
	//展示登陆页焦点图
	util.getCMSData(flashChannelCode,5,true,function(data){
		var counter_tp = "";
		var counter_an = "";
		for(var i=0;i<data.length;i++){
			var num = i+1;
			var tdata = data[i];
			var pic = tdata.pic;
			var target = "_blank";
			var url=tdata.url;
			if(url == "#"){
				url="javascript:;"
				target="";
			}
			counter_tp = counter_tp + '<li style="display:none;"><a href="'+url+'" target="'+target+'" ><span style="background:url('+pic+') no-repeat center center;"></span></a></li>';
			counter_an = counter_an + '<div class="no" onclick="changeflash('+num+')"></div>';
		}
		$("#flashul").html(counter_tp);
		$(".flash_bar").html(counter_an);
		falshStart();
	});
	
	checkDependent();
	
	/*
	错误提示
	*/
	loginutil.showLoginMessage(loginCheck);
	
	/*
	验证码点击，角色切换点击初始化
	*/
	var yz_url = protocol+sysconfig.SSO+interface_config["SSO.CODE"];
	$("#validateImg").attr("onclick","this.src='"+yz_url+"?r='+Math.floor(Math.random()*100000)");
	
	//绑定选择角色点击事件
	$(".tab a").click(function(){
		loginutil.changeLoginRole($(this));
	});
	//二维码登陆切换事件
	$(".qrcode_target").click(function(){codelogin.changeLoginType()});
	//绑定登陆事件
	$("#loginbuttion").click(function(){tologin()});
	//绑定注册事件
	$("#zcButton").click(function(){zcClick(null)});
	//输入手机多账号事件
	//$("#inputname").click(function(){ loginutil.getPhoneRoles($(this))});
	//$("#inputname").keyup(function(){ loginutil.getPhoneRoles($(this))});
	$('#loginForm').on("keyup",'input[type="text"]',function(eve){ //账号信息输入框绑定回车事件
		if(eve.which==13){  
			tologin();
		}         
	});
	$('#loginForm').on("keyup",'input[type="password"]',function(eve){ //账号信息输入框绑定回车事件
		if(eve.which==13){  
			tologin();
		}         
	});
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
	
	window.setTimeout('$("#validateImg").click()',500);
	
	
//浏览器及版本判断
if(util.browser.msie && util.browser.version<10){
	var form = $(this);  
	//遍历文本输入框
	var elements = form.find("input[type='text'][placeholder]");  
	elements.each(function(){
		var s = $(this);
		var pValue = s.attr("placeholder");
		var sValue = s.val();
		if (pValue){
			if(sValue == ''){
			  s.val(pValue);
			}
			//获取焦点事件
			s.focus(function(){  
				var thisobj = $(this);  
				var pValue = thisobj.attr("placeholder");  
				var sValue = thisobj.val();  
				if (sValue && pValue){  
				  if (sValue == pValue){
				    thisobj.val('');
				  }
				}
			});
			//丢失焦点事件 
			s.blur(function(){
				var thisobj = $(this);  
				var pValue = thisobj.attr("placeholder");  
				var sValue = thisobj.val();  
				if (!sValue){  
				  thisobj.val(pValue);  
				}
			});
		}
	});
}//浏览器及版本判断

//切换二维码登录
window.setTimeout(function(){
	codelogin.changeLoginType();
	},10);

});

//获取 谷歌 版本号
function getChromeVersion() {
    var arr = navigator.userAgent.split(' '); 
    var chromeVersion = '';
    for(var i=0;i < arr.length;i++){
        if(/chrome/i.test(arr[i]))
        chromeVersion = arr[i]
    }
    if(chromeVersion){
        return Number(chromeVersion.split('/')[1].split('.')[0]);
    } else {
        return false;
    }
}

function checkDependent(){
	var templet="<font class='redfon2'>温馨提示：</font>尊敬的教师用户，为了让您的备课过程更稳定、更流畅，建议您到登录页下方的教学工具中，下载安装最新版<a style='color:red' target='_blank' href='"+appdown+"'>优教备课助手</a>。下载完成后，点击优教备课快捷图标，开启您的高效备课之旅。";
	$('#tips').html(templet);
	//顶部插件及浏览器提示
	if(util.browser.msie){
		if(util.browser.version<9){
			if(util.userSys.winXP){
				//$('#tips').html("<font class='redfon2'>温馨提示：</font>检测到您的系统版本过低，WindowsXP系统及IE8浏览器已不再提供服务支持，为了您的正常使用，请升级操作系统并使用IE10以上浏览器。");//<a target='_blank' href='"+upIe+"'>点这里查看升级方法</a>
				$('#tips').show();
			}else{
				//$('#tips').html("<font class='redfon2'>温馨提示：</font>检测到您的浏览器版本过低，IE8浏览器已不再提供服务支持，为了您的正常使用，请升级到IE10以上浏览器版本。");//<a target='_blank' href='"+upIe+"'>点这里查看升级方法</a>
				$('#tips').show();
			}
		}else if(util.browser.version==9){
			//$('#tips').html("<font class='redfon2'>温馨提示：</font>检测到您的浏览器版本过低，为了获得更好的使用体验，请升级浏览器到IE10或IE11。");//<a target='_blank' href='"+upIe+"'>点这里查看升级方法</a>
			$('#tips').show();
		}
		//需要确认判断方式 
		/*else if("undefined"==typeof(ocx.GetVersion)){
			//$('#tips').html("<font class='redfon2'>温馨提示：</font>为确保更好体验平台资源及应用，请您点击客户端下载，下载并安装优教助手。只需轻松操作，后续畅享无忧！安装后，点击优教助手图标访问优教通。");
			$('#tips').show();
		}*/
	}else if(util.browser.chrome && util.browser.version==80){
		$('#tips').show();
	}else if(util.browser.se360){
		//$('#tips').html("<font class='redfon2'>温馨提示：</font>本系统暂不支持360安全浏览器访问，为了您的正常使用，请使用360极速浏览器或者IE10以上浏览器访问。");
		$('#tips').show();
	}else if(screen.width<1024){
		$('#tips').html("<font class='redfon2'>温馨提示：</font>为了保证您流畅观看网站内容，建议您将屏幕分辨率调至1024×768及以上。");
		$('#tips').show();
	}
}