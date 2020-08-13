<%@ page language="java" import="java.util.*,zzvcom.util.Common,vcom.sso.vo.*" pageEncoding="UTF-8"%>
<%
response.setHeader("Pragma","No-cache");
response.setHeader("Cache-Control","no-cache");
response.setDateHeader("Expires", 0);
String path = request.getContextPath();
String basePath = Common.PROTOCOL+request.getServerName()+path+"/";
String username=null;
AuthResult aur=(AuthResult)session.getAttribute("authResult");
if(aur!=null && aur.getUser()!=null){
	username = aur.getUser().getUsername();
}
if(username==null){
	username="";
}
%>
/*
需要jquery组件
需要artDialog组件
*/
var portalchecker= {
	"baseUt":null,//暂未用
	"initset":null,
	//用户
	"username":"<%= username %>",
	//通信协议
	"protocol":"<%= Common.PROTOCOL%>",
	"passTime":0,
	"portalURL":"<%= basePath %>",
	"ssoURL":"<%=((Map<String,String>)request.getAttribute("ConfigMap")).get("SSO")%>",
	"sso_207":"<%=((Map<String,String>)request.getAttribute("ConfigMap")).get("SSO.207")%>",
	//检查ut(统计在线)间隔时间
	"repeatCheckTime":<%=Common.getRepeatCheckTime()%>,
	//平台父级域
	"domain":"<%=Common.getDomain()%>",
	"start":function(){
		portalchecker.userChangeChecker();
		portalchecker.repeatLoginChecker();
	},
	"init":function(setobj){
		this.initset=null;
		//额外样式要求
			if(setobj){
			//缓存设置，供关闭时使用
			this.initset=setobj;
			/*添加样式文件*/
		    $("head").append("<link id=\"userCheckCss\" >");
		    var ncss = $("#userCheckCss");
		    ncss.attr({
		        rel: "stylesheet",
		        type: "text/css",
		        href: portalchecker.portalURL+"interface/usercheck.css"
		    });
			//加入遮罩层
			if(setobj.cover){
				this.addCoverDiv();
			}
			if(setobj.closeButton){
				this.addPageClose();
			}
		}
	},
	"userChangeChecker":function(times){
		//登陆用户变更检查
		var logincookile=portalchecker.getCookie("ut");
		if(times){}else{times=5000}
		//定时检查令牌是否匹配,不匹配则提示刷新页面更新用户
		window.setInterval(function(){
			if(portalchecker.getCookie("ut")!=logincookile || ""==portalchecker.getCookie("ut")){
				portalchecker.messageAlert('<div align="center" >你已经用其他身份登录系统，点击确定切换到新身份。</div>',function () {
					  window.location.reload();
				      return true;
				},"");
			}
		},times);
	},
	"repeatLoginChecker":function(){
		if(this.username==""){
			return;
		}
		//时间间隔校验，避免多开多次检查重复登陆多次计时
		var lastTime=Number(portalchecker.getCookie("checkut"));
		var nowTime=new Date().getTime();
		if( lastTime==0 || (nowTime-lastTime)>(this.repeatCheckTime-10*1000) ){
			portalchecker.saveCookie("checkut",nowTime);
		}else{
			return;
		}
		if(""==portalchecker.getCookie("ut")){
			//如果用户已经通过其他系统被踢出，则不再检测ut，提示踢出。
			portalchecker.messageAlert();
			return;
		}
		var url=portalchecker.protocol+portalchecker.ssoURL+portalchecker.sso_207;
		if(url.indexOf("?")){
			url+="&";
		}else{
			url+="?";
		}
		url=url+"username="+portalchecker.username+"&lastUt="+portalchecker.getCookie("ut")+"&appFlg=portal&jsoncallback=?";
		$.getJSON(url,function(result){
			if($(result).attr("lastutEqualsUt")!="true"){
				portalchecker.messageAlert();
				return;
			}
		});
	},
	"getCookie":function(name){
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    	if(arr != null&&arr!="") return unescape(arr[2]);
    	return "";
	},
	//保存cookie,默认平台父级域
	"saveCookie":function(name,value,expires,path,domain,secure){
	      var   strCookie   =   name   +   "="   +   value;  
	      if   (expires){  
	            //计算Cookie的期限,单位为天  
	            var   curTime   =   new   Date();  
	            curTime.setTime(curTime.getTime()+expires*24*60*60*1000);  
	            strCookie+=";expires="+curTime.toGMTString();  
	      }
	      //Cookie的路径
	      strCookie   +=     (path)?";path="+path:"";    
	      //Cookie的Domain
	      strCookie   +=     (domain)?";domain="+this.domain:"";  
	      //是否需要保密传送,为一个布尔值  
	      strCookie   +=     (secure)   ?   ";   secure"   :   "";  
	      document.cookie   =   strCookie;  
	},
	"messageAlert":function(contentStr,okHandel,closeHandel){
		if(typeof(contentStr)=="undefined" || contentStr==null || contentStr.length==0){
			contentStr='<div align="center" >你的帐号已经在别处登录，你被强制退出。</div>';
		}
		if(typeof(okHandel)=="undefined" || okHandel==null){
			//默认退出
			okHandel=function(){
				  //强制退出
				  window.location.href=portalchecker.portalURL+"/ssoLoginFail.jsp";
			      return true;
				};
		}
		if(typeof(closeHandel)=="undefined" || closeHandel==null){
			//默认退出
			okHandel=function(){
				  //强制退出
				  window.location.href=portalchecker.portalURL+"/ssoLoginFail.jsp";
			      return true;
				};
		}
		if(typeof(art)!="undefined" && art!=null){
			art.dialog({
				icon:'warning',
				//设置内容与边界距离
				padding:5,
				title:'功能禁用',
				width:500,
				//提示内容
				content: contentStr,
				//开启锁屏
				lock:true,
				//锁屏遮罩透明度
				opacity: 0.2,
				ok: okHandel,
			    okVal:'确定',
			    close:closeHandel
			});
		}
	},
	"addPageClose":function(){
		jQuery(function($){
			try{
				$("body").append("<div class=\"close-layer\" ><i onclick=\"portalchecker.onPageClose()\" ></i></div>");
			}catch(e){}
		});
	},
	"addCoverDiv":function(){
		jQuery(function($){
			try{
				$("body").append("<div id=\"pin_view_layer\"> </div>");
			}catch(e){}
		});
	},
	"onPageClose":function(){
		if(portalchecker.initset.beforeCloseFn){
			portalchecker.initset.beforeCloseFn();		
		}
		if("#"!=portalchecker.initset.closeButton){
			window.location.href=portalchecker.initset.closeButton;
		}
	}
}
//用户检查启动
portalchecker.start();