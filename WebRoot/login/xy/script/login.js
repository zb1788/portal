//保存cookle
function   saveCookie(name,   value,   expires,   path,   domain,   secure){  
      var   strCookie   =   name   +   "="   +   value;  
      if   (expires){  
            //   计算Cookie的期限,   参数为天数  
            var   curTime   =   new   Date();  
            curTime.setTime(curTime.getTime()   +   expires*24*60*60*1000);  
            strCookie   +=   ";   expires="   +   curTime.toGMTString();  
      }  
      //   Cookie的路径  
      strCookie   +=     (path)   ?   ";   path="   +   path   :   "";    
      //   Cookie的Domain  
      strCookie   +=     (domain)   ?   ";   domain="   +   domain   :   "";  
      //   是否需要保密传送,为一个布尔值  
      strCookie   +=     (secure)   ?   ";   secure"   :   "";  
      document.cookie   =   strCookie;  
} 

//获取cookle
function getcookle(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    	if(arr != null&&arr!="") return unescape(arr[2]);
    	return "";
}

//当输入为手机号的时候，调用选择用户多账号接口，显示该手机号角色绑定的多个账号
function clearusername(){
	if($("#inputname").val().length!=11){
		$("#roleDiv").css("display","none"); //隐藏角色框
	}else{
		getRoles(1); //调用选择账号接口
	}
	$("#username").attr("value","");
	$("#changename").html("");
}

//获取角色信息  
function getRoles(){
	var flag=1;
	var loginUsertype = "";
	if($("#loginUsertype").val().replace(/\s+/g,"")==""){ //默认老师
		$("#loginUsertype").attr("value","teacher");
		loginUsertype = "teacher";
	}else{
		loginUsertype = $("#loginUsertype").val();
	}
	try{
	//自适应宽度
	var phoneNum=$("#inputname").val();
	
	if(phoneNum.length!=11){
		return;
	}
	if("student"==sutype || "parent"==loginUsertype){
		flag==1;
	}else{
		return;
	}
	var allwidth = document.body.clientWidth;
	if(allwidth>1024){
		var wn = (allwidth-1014)/2+800;
		$("#roleDiv").css("left",wn+"px");
	}else if(allwidth>970){
		var wn = 798-(1014-allwidth)/2;
		$("#roleDiv").css("left",wn+"px");
	}else{
		$("#roleDiv").css("left","780px");
	}
	}catch(e){}
	
	if(phoneNum!=$("#roleDiv").attr("phonenum")){
		util.getRemoteJson("SSO","SSO.203","q="+phoneNum+"&timestamp="+Math.floor(Math.random()*10000)+"&loginUsertype="+loginUsertype,function(result){
			if(phoneNum!=$("#roleDiv").attr("phonenum") || $("#roleList li").length==0){
				if(phoneNum!=$("#roleDiv").attr("phonenum") || $("#roleList li").length==0){
					$("#roleList").html("");
					if(result){
						for(var num=0;num<result.length;num++){
							if(num%2==0){
								$("#roleList").append('<li class="ac_even" onmouseover="this.className=\'ac_over\'" onmouseout="this.className=\'ac_even\'" roleid="'+result[num].username+'" onclick="selRole(this)" title="'+result[num].role+'" >'+result[num].role+'</li>');
							}else{
								$("#roleList").append('<li class="ac_odd" onmouseover="this.className=\'ac_over\'" onmouseout="this.className=\'ac_odd\'" roleid="'+result[num].username+'" onclick="selRole(this)" title="'+result[num].role+'" >'+result[num].role+'</li>');
							}
						}
						if(result.length>0){
							if($("#roleList li").length>0){
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
	}catch(e){alert(e);}
}
//提示无角色可选择
function alertNoRole(flag){
	if(flag==1){
		$("#getrolemsg").show();
		window.setTimeout("$('#getrolemsg').hide(200);",1000);
	}
}

//显示和隐藏账号不在同一个地区的信息
function hideMsg2() {
    $('#msgs').fadeOut(300);
}
function msg2(value) {
	if(value)$('#tsInfo').html(value);
	$('#msgs').show();
} 
//处理用户中心返回提示信息
function msg(value) {
	if(value)$('#msg').html(value);
	$('#msg').fadeIn(100);
	setTimeout(function() {
		$('#msg').fadeOut(100);	
		},
	5000);
}




//登录效果
function focuss(t){
	var c=$(t).attr('id');
	var a=$(t).val();
	var d=$(t).attr("def");
	if(typeof(d)=="undefined" || d==null){
		d="";
	}
	if (a ==d){
		$(t).val("");
	};
	$(t).css('color','#333');
	if(c=='inputname'){
		$(t).parent().parent().removeClass();
		$(t).parent().parent().addClass("bor_hover");
	}else{
		$(t).parent().removeClass();
		$(t).parent().addClass("bor_hover");
	}
}
function blurr(t){
	var c=$(t).attr('id');
	var a=$(t).val();
	var d=$(t).attr("def");
	if(typeof(d)=="undefined" || d==null){
		d="";
	}
	if (a ==''){
		$(t).val(d);
	}
	$(t).css('color','#aaa');
	if(c=='inputname'){
		$(t).parent().parent().removeClass();
		$(t).parent().parent().addClass("bor");
	}else{
		$(t).parent().removeClass();
		$(t).parent().addClass("bor");
	}	
}
	
//登录
function tologin(){
	if($("#inputname").val()=="请输入账号/手机号" || $("#inputname").val().replace(/\s+/g,"")==""){
		msg("&nbsp;<img src=\""+path+"/login/xy/images/newImage/error.gif\" width='18'>&nbsp;用户名不能为空!");
		return;
	}else if($("#pwd").val().replace(/\s+/g,"")==""){
		msg("&nbsp;<img src=\""+path+"/login/xy/images/newImage/error.gif\" width='18'>&nbsp;密码不能为空!");
		return;
	}else if($("#validateCode").val()=="验证码" || $("#validateCode").val().replace(/\s+/g,"")==""){
		msg("&nbsp;<img src=\""+path+"/login/xy/images/newImage/error.gif\" width='18'>&nbsp;验证码不能为空!");
		return;
	}
	if(document.getElementById("savepass").checked){
 		saveCookie("pwd",$("#pwd").val(),1000);
 		saveCookie("savepass",1,1000);
	}else{
 		saveCookie("pwd","",1000);
 		saveCookie("savepass",0,1000);
	}
	$("#loginbuttion").attr("disabled","disabled");
	$("#msg").html("&nbsp;<img src=\""+path+"/login/xy/images/lodding.gif\">正在登陆....");
	$("#msg").show();
	$("#inputname").attr("value",util.confoundInputName($("#inputname").val().replace(/\s+/g,"")));
	if($("#username").val()=="")$("#username").attr("value",$("#inputname").val());
	saveCookie("inputname",escape(encodeURI($("#inputname").val().replace(/\s+/g,""))),1000);
	saveCookie("username",escape(encodeURI($("#username").val().replace(/\s+/g,""))),1000);
	if($("#loginUsertype").val().replace(/\s+/g,"")==""){ //默认老师
		$("#loginUsertype").attr("value","teacher");
		saveCookie("loginUsertype",$("#loginUsertype").val().replace(/\s+/g,""),1000);
	}else{
		saveCookie("loginUsertype",$("#loginUsertype").val().replace(/\s+/g,""),1000);
	}
	$("#loginForm").attr("action",protocol+sysconfig.SSO+"/sso/ssoAuth");
	$("#loginForm").submit();
}
