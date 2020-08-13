//本js在config及util后加载
//登陆方法集
function LoginObj(){
	this.codeimgtime=null;//验证码显示时间
	this.codepasstime=1000;//验证码刷新间隔
}

//根据门户地址计算前缀
LoginObj.prototype.getHost=function(url){
   	var host = "";
    if (typeof url == "undefined" || null == url){
	    var regex = /.*\:\/\/([^\/|:]*).*/;
	    url = url.match(window.location.href);
    }
    if (typeof url != "undefined"
            && null != url) {
        var strAry = url.split(".");
         host=strAry[0];
    }
    return host;
}

var loginutil=new LoginObj();
//登陆角色切换处理,thisobj为当前点击的角色div
LoginObj.prototype.changeLoginRole=function(thisobj){
	$(thisobj).siblings().removeClass();
		//登录角色
		$("#loginUsertype").attr("value",$(thisobj).attr("id"));
		
		$(thisobj).siblings().removeClass();
		
		if(util.isBlank(usertype)){//门户登陆页
			 $(thisobj).addClass("sel");
			 if(showRegedit == "0"){
				$(".mt20").removeClass("qk2");
				$(".greenBtn").hide();
				$("#kqzc1").hide();
				$("#kqzc2").hide();
			}else{
				if($("#loginUsertype").val() == "student" || $("#loginUsertype").val() == "teacher"){
						$(".mt20").addClass("qk2");
						$(".greenBtn").fadeIn(300);
				}else{
					$(".mt20").removeClass("qk2");
					$(".greenBtn").hide();
				}
			}
		 }else{//空间内登录
			 $(thisobj).addClass("cur_5");
		 }
		//重置用户选择学生/家长
		$("#username").attr("value","");
		//调用选择账号接口
		$("#roleDiv").attr("phonenum","");
		//手机多账号选择
		loginutil.getPhoneRoles();
		//根据时间刷新验证码
		loginutil.refreshCodeImg();
}
//刷新验证码(force为true时，强制刷新，否则默认间隔codepasstime毫秒以上)
LoginObj.prototype.refreshCodeImg=function(force){
	var mstime=new Date().getTime();
	if(force || loginutil.codeimgtime==null || (mstime-loginutil.codeimgtime)>loginutil.codepasstime){
		loginutil.codeimgtime=mstime;
		$("#codeimg").click();
	}
}
//显示登陆异常消息
LoginObj.prototype.showLoginMessage=function(mes){
	if(!util.isBlank(mes) && mes !="null"){
		if(mes=="1"){
			art.dialog({
				//设置内容与边界距离
				top:'50%',
				icon:'face-sad',
				padding:5,
				title:'提示信息',
				width:500,
				left:'50%',
				//提示内容
				content: '请检查账号是否错误，或者<a href="'+portal_config.balanceUrl+'?areaCode='+portal_config.areacode+'" ><b>重新选择账号注册地区</b></font></a>后重试',
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
			$.get(basePath+"/urldecode.action?tip="+tips,"",function(data){
				tips = data;
				if(tips==null || tips==""){
					if (mes != null && mes=="1") {
						tips="请检查您的账号!";
					} else if (mes != null && mes=="2") {
						tips="密码不正确!";
					} else if (mes != null && mes=="3") {
						tips="用户被禁用";
					}else if (mes != null && mes=="4") {
						tips="登录被禁止";
					}
				}
				if(tips==null){
					tips="";
				}
				art.dialog({
					//设置内容与边界距离
					top:'50%',
					icon:'face-sad',
					padding:5,
					title:'提示信息',
					width:500,
					left:'50%',
					//提示内容
					content: tips,
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
			});
		}
	}
}
//注册处理
function zcClick(param){
	if("undefined"==typeof(param) || param==null){
		param=document.getElementById("loginUsertype").value;
	}
	if(param=='parent'){
		param="student";
	}
	var loginUsertype="teacher";//默认老师
	if(param==null || param==""){
		if($("#loginUsertype").val()==""){ //默认老师
			loginUsertype = "teacher";
		}else{
			loginUsertype = $("#loginUsertype").val();
		}
	}else if(param=='student' || param =='teacher'){
		loginUsertype=param;
	}
	window.open(protocol+sysconfig.PORTAL+"/login/zcPage.jsp?usertype="+loginUsertype);
}
//当输入为手机号的时候，调用选择用户多账号接口，显示该手机号角色绑定的多个账号
function clearusername(){
	if($("#inputname").attr("value").length!=11){
		$("#roleDiv").css("display","none"); //隐藏角色框
	}else{
		loginutil.getPhoneRoles(); //调用选择账号接口
	}
	$("#username").attr("value","");
	$("#changename").html("");
}
//多账号时选择账号
LoginObj.prototype.getPhoneRoles=function(flag){
	try{
	//自适应宽度及高度
	//document.body.clientWidth
	var phoneNum=$("#inputname").attr("value");
	if(phoneNum.length!=11){
		$("#roleDiv").hide();
		return;
	}
	var allwidth = document.body.clientWidth;
	if(allwidth>1024){
		var wn = (allwidth-1014)/2+800;
		//$("#roleDiv").css("left",wn+"px");
	}else if(allwidth>970){
		var wn = 798-(1014-allwidth)/2;
		//$("#roleDiv").css("left",wn+"px");
	}else{
		//$("#roleDiv").css("left","780px");
	}
	var Xp = $('#inputname').offset().top;
	if(Xp && Xp>100 && Xp<300){
		Xp=Xp+20;
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
			if(phoneNum!=$("#roleDiv").attr("phonenum") || $("#roleList li").length==0){
				if(phoneNum!=$("#roleDiv").attr("phonenum") || $("#roleList li").length==0){
					$("#roleList").html("");
					if(result){
						for(var num=0;num<result.length;num++){
							if(num%2==0){
								$("#roleList").append('<li class="ac_even" style="height:22px;line-height:22px;margin-bottom:0px;"  onmouseover="this.className=\'ac_over\'" onmouseout="this.className=\'ac_even\'" roleid="'+result[num].username+'" onclick="selRole(this)" >'+result[num].role+'</li>');
							}else{
								$("#roleList").append('<li class="ac_odd" style="height:22px;line-height:22px;margin-bottom:0px;" onmouseover="this.className=\'ac_over\'" onmouseout="this.className=\'ac_odd\'" roleid="'+result[num].username+'" onclick="selRole(this)" >'+result[num].role+'</li>');
							}
						}
						if(result.length>0){
							if($("#roleList li").length>0){
								$("#roleList").attr("height",(result.length * 22));
								$("#roleDiv").css("display","block");
							}else{
								$("#roleDiv").css("display","none");
							}
						}else{
							$("#roleDiv").css("display","none");
							alertNoRole(flag);
						}
					}
					$("#roleDiv").attr("phonenum",phoneNum);
				}
			}
		});
	}else{
		if($("#roleList li").length>0){
			$("#roleList").attr("height",($("#roleList li").length * 22));
			$("#roleDiv").css("display","block");
		}else{
			$("#roleDiv").css("display","none");
			alertNoRole(flag);
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
//提示无角色可选择
function alertNoRole(flag){
	if(flag){
		$("#getrolemsg").show();
		window.setTimeout("$('#getrolemsg').hide(200);",1000);
	}
}
//登录
function tologin(){
	if($("#inputname").val().replace(/\s+/g,"")=="请输入账号/手机号" || $("#inputname").val().replace(/\s+/g,"")==""){
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
	}else if($("#inpwd").val().replace(/\s+/g,"")==""){
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
	}else if($("#validateCode").val().replace(/\s+/g,"")=="" || $("#validateCode").val().replace(/\s+/g,"") == "验证码"){
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
	if($("#savepass").attr("checked")){
 		util.saveCookie("pwd",util.confoundInputName($("#inpwd").val()),1000);
 		util.saveCookie("savepass",1,1000);
	}else{
 		util.saveCookie("pwd","",1000);
 		util.saveCookie("savepass",0,1000);
	}
	//登录置为不可用
	$("#loginbuttion").attr("disabled","disabled");
	$("#inputname").attr("value",$("#inputname").val().replace(/\s+/g,""));
	if($("#username").val()=="")$("#username").attr("value",$("#inputname").val());
	util.saveCookie("inputname",util.confoundInputName(escape($("#inputname").val().replace(/\s+/g,""))),1000);
	util.saveCookie("username",escape(encodeURI($("#username").val().replace(/\s+/g,""))),1000);
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
		var pwdRSA = RSAUtils.encryptedString(pubkey,$("#inpwd").val());
		$("#pwd").val(pwdRSA);
		$("#inpwd").val("");
		secpwd.value="2";
	}
	$("#loginForm").submit();
}

//获取焦点图信息，并在页面展示
function getLoginfocusImg(icode){
	var temp_tp = "<li id=\"~liid~\" style=\"display: block;\"><a target=\"~target~\" id=\"~aid~\" href=\"~href~\"><span id=\"~spid~\" style=\"background:url(~pic~) no-repeat center center\"></span></a></li>";
	var temp_an = "<div class=\"~sel~\" id=\"~did~\" onclick=\"changeflash(~num~)\"></div>";
	util.getCMSData(icode,10,true,function(data){
		var counter_tp = "";
		var counter_an = "";
		numbers = data.length;
		for(var i=0;i<data.length;i++){
			//图片
			var liid = "flash"+(i+1);
			var aid = "bga"+(i+1);
			var spid = "bg"+(i+1);
			//按钮
			var did = "f"+(i+1);
			var num = i+1;
			var sel = "";
			if(i==0){
				sel = "dq";
			}else{
				sel = "no";
			}
			var tdata = data[i];
			var pic = tdata.pic;
			var target = "_blank";
			var url=tdata.url;
			if(url == "#"){
				url="javascript:;"
				target="";
			}
			counter_tp = counter_tp + temp_tp.replaceAll("~liid~",liid).replaceAll("~target~",target).replaceAll("~aid~",aid).replaceAll("~href~",url).replaceAll("~spid~",spid).replaceAll("~pic~",pic);
			counter_an = counter_an + temp_an.replaceAll("~sel~",sel).replaceAll("~did~",did).replaceAll("~num~",num);
		}
		$("#tp").html(counter_tp);
		$("#an").html(counter_an);
		timer_tick();
	});
}