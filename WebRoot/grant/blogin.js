function getRoles(){
	var phoneNum=$("#inputname").val();
	var loginUsertype=usertype;
	if("teacher"==loginUsertype || phoneNum.trim().length!=11){
		return;
	}
	if(phoneNum!=$("#roleDiv").attr("phonenum")){
		util.getCharsetRemoteJson("SSO","SSO.203","q="+phoneNum+"&timestamp="+Math.floor(Math.random()*10000)+"&loginUsertype="+loginUsertype,"gbk",function(result){
			if(phoneNum!=$("#roleDiv").attr("phonenum") || $("#roleList li").length==0){
				if(phoneNum!=$("#roleDiv").attr("phonenum") || $("#roleList li").length==0){
					$("#roleList").html("");
					if(result){
						for(var num=0;num<result.length;num++){
							$("#roleList").append('<li roleid="'+result[num].username+'" onmouseover="$(this).addClass(\'ms\')" onmouseout="$(this).removeClass(\'ms\')" onclick="selRole(this)" >'+result[num].role+'</li>');
						}
						if(result.length>0){
							if($("#roleList li").length>0){
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
		if($("#roleList li").length>0){
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
	//$("#changename").html($(sobj).text());
	$("#roleDiv").css("display","none");
	//$(document).unbind("click");
	}catch(e){alert(e);}
}
function login(){
	$("#loginbtn").attr("disabled","true");
	var ssoUrl = "http://"+sysconfig["SSO"]+"/sso/verifyAuthInfo?appFlg=baiduEdu&encodeU=0&validateCodeEn=1&loginUsertype="+usertype;
	var username = $("#username").val();
	if(checkNull(username)){
		username = $("#inputname").val();
	}
	if(checkNull(username)){
		alert("账号不能为空!");
    	return;
	}
    var pwd=document.getElementById("pwd").value;
    if(!checkNull(pwd)){
        pwd=pwd.trim();
    }else{
    	alert("密码不能为空!");
    	return;
    }
	util.saveCookie("inputname",encodeURI($("#inputname").val()),1000,"",domain);
	util.saveCookie("loginUsertype",usertype,1000,"",domain);
	if(document.getElementById("savepass").checked){
		util.saveCookie("loginUsertype",encodeURI($("#pwd").val()),1000,"",domain);
	}	
    var pwdMD5 = hex_md5(pwd);
    var rand=$("#code").val();
    if(!checkNull(rand)){
    	ssoUrl +="&rand="+rand;
    }else{
    	alert("验证码不能为空!");
    	return;
    }
    ssoUrl +="&pwd="+pwdMD5;
	ssoUrl += "&username="+username;
	$.ajax({
	url:ssoUrl,
	type:"get",
	dataType:"jsonp",
	jsonp:"jsoncallback",
	scriptCharset:"utf-8",
	timeout: 30000,
	error: function(rdata){
	   //超时报错
	},
	success: function(rdata){
		if(rdata.authFlg&&rdata.authFlg==0){
	        //通过
	        var openurl=null;
	        if(baidu_url.indexOf("?")==-1){
	        	openurl=baidu_url+"?sso="+sysconfig["SSO"]+"&ut="+rdata.ut;
	        }else{
	        	openurl=baidu_url+"&sso="+sysconfig["SSO"]+"&ut="+rdata.ut;
	        }
	        window.location.href=openurl;
	        return;
		}else{
		    //允许点击登陆
			//打出出错信息
			$("#loginbtn").attr("disabled",false);
			alert(rdata.authInfo);
			$("#yzm").attr("src",yz_url+'?r='+Math.floor(Math.random()*10000));
			$("#code").val("")
			return;
		}
	}
	});
}