<%@page contentType="text/html; charset=utf-8"  import="java.util.*,zzvcom.util.*" %><%@page import="org.apache.commons.lang.StringUtils"%>

<%
	String port="";
	//判断来源，禁止直接访问
	String referer=request.getHeader("Referer");
	if(referer==null){
		//来源异常进入404
		//response.sendError(404);
		out.println("bad request!! This Page is for Page use!Do not Open In Browser !!!");
		return;
	}
	/*
	request.getServerPort()+"";
	if("80".equals(port)){
		port="";
	}else{
		port=":"+port;
	}
	*/
    String basePath = "//"+request.getServerName()+port+request.getContextPath();
    String data=request.getParameter("data");
    String type="0",path="";//1表示自动调整高度，2表示跳转，3表示全部需要。
	Integer useragetn=zzvcom.util.Interface.getSystemUserAgent(request);
	type=request.getParameter("type");
	if(type==null){
		type="1";
	}
    path=request.getParameter("path");
	if(path==null)path="";
	//传入最小高度，以适应不同情况变化（即如果传递有最小高度，则按最小高度来显示）
	String minHeight = request.getParameter("minHeight");
	String setHeight = request.getParameter("setHeight");
	String heightType = request.getParameter("heightType");
	if(heightType!=null){
		if( heightType.indexOf("eight")==-1 || heightType.length()>30 ){
			heightType = "null";
		}
	}
	Integer minhei = 0;
	try{
		if(!StringUtils.isBlank(minHeight)){
			minhei = Integer.valueOf(minHeight);
		}
	}catch(Exception e){e.printStackTrace();}try{
		if(!StringUtils.isBlank(setHeight)){
			Integer.valueOf(setHeight);
		}
	}catch(Exception e){setHeight="null";}
%>
//动态改变iframe高度
var _bodyheigth=0,path="<%=path %>",minhei="<%=minhei %>",linkalength=0,__count=0,setHeight="<%=setHeight %>";
//判断当前浏览器是否是IE浏览器
function isIE() { 
    if (!!window.ActiveXObject || "ActiveXObject" in window)  {
        return true;  
    }else{  
        return false;  
		}
}
function isGoogle(){
	return navigator.userAgent.toLowerCase().indexOf("chrome")!=-1;
}
/*
opentype 打开方式
forceflush 传递字符串"true"时，强制执行高度调整，无视高度是否变化
*/
function changeiframeh(opentype,forceflush){
	var _setBodyHeigth=null;
	try{
		_setBodyHeigth=<%=heightType %>;
	}catch(e){}
	try {
		var __currrentbodyheight=0;//当前页面高度
		//body高度
		var bodyheigth=jQuery(document.body).height();
		//网页正文全文高
		var scrollHeight=document.body.scrollHeight;
		if(isGoogle()){
			scrollHeight=document.documentElement.scrollHeight;
		}
		if(__count==0){
			__currrentbodyheight=bodyheigth;
			if(bodyheigth==0)__currrentbodyheight=50;
		}else{
			if(bodyheigth>=scrollHeight)__currrentbodyheight=bodyheigth;
			else if(scrollHeight!=1565) __currrentbodyheight=scrollHeight;//如果是默认的1565的放弃。
			else __currrentbodyheight=bodyheigth;
		}
		if("number"==typeof(_setBodyHeigth)){
			__currrentbodyheight=_setBodyHeigth;
		}
		//如果高度没变化，不做处理
		if(__currrentbodyheight!=_bodyheigth){
			_bodyheigth=__currrentbodyheight;
		}else if("true"!=forceflush){
			return;
		}
		__count++;
		//alert("jqery:"+jQuery(document.body).height()+"scrollHeight:"+document.body.scrollHeight+",current:"+__currrentbodyheight);
		//window.name=bodyheigth;
		if(isIE()){ //表明是IE浏览器，页面高度需要+20微调，其他浏览器不需要
			__currrentbodyheight=__currrentbodyheight+20;
		}
		if(setHeight!=null && setHeight!="null"){
			__currrentbodyheight=setHeight;
		}
		
		//if(typeof(window.postMessage)!= undefined){
		//	window.parent.postMessage({"type":"mainFrameHeight","value":__currrentbodyheight},"*");
		//}else{
			if(!document.getElementById("crossdomainiframe")){
				jQuery("body").append("<iframe id=\"crossdomainiframe\" style=\"display:none;\" src=\"<%=basePath %>/common/crossdomain.jsp?opentype="+opentype+"&height="+__currrentbodyheight+"&minhei="+minhei+"\"></iframe>");
			}else{
				jQuery("#crossdomainiframe").attr("src","<%=basePath %>/common/crossdomain.jsp?height="+__currrentbodyheight+"&minhei="+minhei);
			}
			//jQuery("#iframe01",window.top.document).css("height",bodyheigth);
		//} 
	}catch(e){}
	//jQuery("#iframe01",window.top.document).css("height",bodyheigth); 
}
//子系统调整上层iframe接口url地址(base64加密)，count层次0--top,2(crossdomain.jsp2次parent)外1层,3外2层,依次类推最多5
function changelocation(url,count){
	try {
		jQuery(function($){
			if(!document.getElementById("_locationiframe")){
				jQuery("body").append("<iframe id=\"_locationiframe\" style=\"display:none;\" src=\"<%=basePath %>/common/crossdomain.jsp?url="+url+"&count="+count+"\"></iframe>");
			}else{
				jQuery("#_locationiframe").attr("src","<%=basePath %>/common/crossdomain.jsp?url="+url+"&count="+count);
			}
		})
		//jQuery("#iframe01",window.top.document).css("height",bodyheigth); 
	}catch(e){}
}
//子系统调整上层滚动条接口
function changetopscroll(scrollto){
	try {
		jQuery(function($){
			if(!document.getElementById("_locationiframe")){
				jQuery("body").append("<iframe id=\"_locationiframe\" style=\"display:none;\" src=\"<%=basePath %>/common/crossdomain.jsp?scrollto="+scrollto+"\"></iframe>");
			}else{
				jQuery("#_locationiframe").attr("src","<%=basePath %>/common/crossdomain.jsp?scrollto="+scrollto);
			}
		})
		//jQuery("#iframe01",window.top.document).css("height",bodyheigth); 
	}catch(e){}
}
//统计系统统一调用方法(应该已无用)
function commonstatistics(staturl){
	try {
		jQuery(function($){
			staturl=decodeURIComponent(staturl);
			if(!document.getElementById("_commonstatisticsiframe")){
				jQuery("body").append("<iframe id=\"_commonstatisticsiframe\" style=\"display:none;\" src=\""+staturl+"\"></iframe>");
			}else{
				jQuery("#_commonstatisticsiframe").attr("src",staturl);
			}
		})
		//jQuery("#iframe01",window.top.document).css("height",bodyheigth); 
	}catch(e){}
}
//统一调整上级栏目样式
function changetopstyle(channelid){
	if(typeof(channelid)=="string"){
		channelid=channelid.replace(/(^\s*)|(\s*$)/g, ""); 
	}
	try {
		jQuery(function($){
			if(!document.getElementById("_changetopstyleiframe")){
				jQuery("body").append("<iframe id=\"_changetopstyleiframe\" style=\"display:none;\" src=\"<%=basePath %>/common/crossdomainstyle.jsp?channelid="+channelid+"\"></iframe>");
			}else{
				jQuery("#_changetopstyleiframe").attr("src","<%=basePath%>/common/crossdomainstyle.jsp?channelid="+channelid);
			}
		})
		//jQuery("#iframe01",window.top.document).css("height",bodyheigth); 
	}catch(e){}
}
//打开链接--非优教通连接提示
function checknoturltoopen(url){
	if(confirm("\u6B64\u94FE\u63A5\u4E3A\u975E\u4F18\u6559\u901A\u94FE\u63A5\uFF0C\u5982\u679C\u4F60\u5F53\u524D\u7528\u7684\u662F\u975EWi-Fi\u73AF\u5883\uFF0C\u53EF\u80FD\u4F1A\u4EA7\u751F\u6D41\u91CF\!")){
		window.open(url);
	}
}
//判断所有a链接-增加非优教通连接提示
function checknoturl(allalink){
	//var allalink=$("a");
	linkalength=allalink.length;
	allalink.each(function(){ 
		if($(this).attr("href").indexOf(protocol)==0&&$(this).attr("href").indexOf("czbanbantong.com")<0){
			var url=$(this).attr("href");
			$(this).attr("target","");
			$(this).attr("href","javascript:checknoturltoopen(\""+url+"\")");
		}
	});
		
}
<%
	if(data==null||!type.equals("2")){//判断是否启用重置iframe高度
%>
//处理登录背景效果
jQuery(function(jQuery){
	window.setInterval("changeiframeh(1)",500);
});
//如果做了图像修改则改变则相应改变上层页面的用户图像
function changeUserImage(imgurl){
	try{
	    var imgurl=decodeURIComponent(imgurl)
		if(!document.getElementById("crossdomainiframe")){
			jQuery("body").append("<iframe id=\"crossdomainiframe\" style=\"display:none;\" src=\"<%=basePath %>/common/crossdomain.jsp?changeImg="+imgurl+"\"></iframe>");
		}else{
			jQuery("#crossdomainiframe").attr("src","<%=basePath %>/common/crossdomain.jsp?changeImg="+imgurl);
		}
	}catch(e){}
}

//下层调用上层方法
function callUpperMethod(methodName){
	try{
		if(!document.getElementById("crossdomainMethodiframe")){
			jQuery("body").append("<iframe id=\"crossdomainMethodiframe\" style=\"display:none;\" src=\"<%=basePath %>/common/crossdomainMethod.jsp?methodName="+methodName+"\"></iframe>");
		}else{
			jQuery("#crossdomainMethodiframe").attr("src","<%=basePath %>/common/crossdomainMethod.jsp?methodName="+methodName);
		}
	}catch(e){}
}
<%
	}
%> 
<%
	if(useragetn!=null&&useragetn!=0){//判断如果是非windows操作系统，处理所有站外链接。
%>
	jQuery(function($){
		window.setInterval(function(){
			var allalink=$("a");
			if(allalink.length!=linkalength){checknoturl(allalink);};
		},1000);
	});
<%
	}
%>
//var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
//jQuery("body").append(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F0b0f7d57860101334db36e42090dec3a' type='text/javascript'%3E%3C/script%3E"));

