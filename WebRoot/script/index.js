//处理登录背景效果
function clearUserNameInput(obj){
    	if(obj==1){
    		if(''==$("#username").val()){
		       $("#username").attr("className","logininputbg");
		    }
    	}if(obj==2){
    		if(''==$("#password").val()){
		       $("#password").attr("className","logininputpass");
		    }
    	}if(obj==3){
    		if(''==$("#yanzhengma").val()){
		       $("#yanzhengma").attr("className","logininputyanzheng");
		    }
    	}else if(obj==11){
    		
			$("#username").attr("className","logininput");
    	}else if(obj==22){
    		
			$("#password").attr("className","logininput");
    	}else if(obj==33){
    		
			$("#yanzhengma").attr("className","logininput");
    	}
}
function logon(){	
    if($("#username").val()=='student'){
		top.location="student/index.html";
	}else if($("#username").val()=='teacher'){
		top.location="teacher/index.html";
    }else if($("#username").val()=='parents'){
		top.location="parents/index.html";
    }else{
		
		alert("请输入账号!");
	}
}
function Show_Tab_List(obj,classname){	
    $($(obj).parent().children()).each(function(){
    	if($(this).attr("showid")==$(obj).attr("showid")){
    		$(this).addClass(classname);
    		$(this).css("cursor","pointer");
    		$("#"+$(this).attr("showid")).show();
    	}else{
    		$(this).removeClass(classname);
    		$(this).css("cursor","pointer");
    		$("#"+$(this).attr("showid")).hide();
    	}
    });
}
//退出
function logonout(){	
    top.location="../index.html";
}
//获取cookle
function getcookle(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    	if(arr != null&&arr!="") return unescape(arr[2]);
    	return "";
}
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