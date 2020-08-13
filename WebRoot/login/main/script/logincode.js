function codeLoginObj(){
	//是否可WebSocket
	this.ifsocket=false;
	//二维码有效状态
	this.status=false;
	//当前二维码ID
	this.codeid=null;
	//websock连接
	this.connect=null;
	//过期时长
	this.expiredtime=300*1000;
	//二维码验证系统地址
	this.sysurl=sysconfig.SSO+":8900";
	if(protocol.indexOf("https")>-1){
		this.sysurl=sysconfig.SSO+":8901";
	}
	this.width=235;
	this.height=235;
}
var codelogin=new codeLoginObj();

//登陆切换
codeLoginObj.prototype.changeLoginType=function(){
	if($(".scan .qrcode_target").hasClass("pt")){
		$(".scan .qrcode_target").removeClass("pt");
		$("#codeLogin").hide();
		$(".scan-ts").show();
		$(".tab").show();
		$("#pwdLogin").show();
		//清除二维码
		$("#qrcodeCanvas").html("");
		if(codelogin.connect){
			codelogin.connect.close();
		}
		codelogin.status=false;
	}else{
		$(".tab").hide();
		$(".scan-ts").hide();
		$("#pwdLogin").hide();
		$(".scan .qrcode_target").addClass("pt");
		//清除二维码
		$("#qrcodeCanvas").html("<br/><br/><br/><br/>二维码生成中...");
		$("#codeLogin").show();
		window.setTimeout('codelogin.getLoginCode();',50);
	}
}

//$(document).ready();
codeLoginObj.prototype.getLoginCode=function(){
    if (!window.WebSocket) {
        window.WebSocket = window.MozWebSocket;
    }
    if (window.WebSocket) {
    	codelogin.ifsocket=true;
    	
    	if(protocol.indexOf("https")>-1){
        	codelogin.connect = new WebSocket("wss://"+codelogin.sysurl+"/pmserver");
    	}else{
        	codelogin.connect = new WebSocket("ws://"+codelogin.sysurl+"/pmserver");
		}
		
        codelogin.connect.onmessage = function (event) {
	        var myjson = eval('(' +event.data+ ')');
			if(myjson.type=="getcode"){
				//记录codeid
			   codelogin.showLoginCode("canvas",myjson);
			}else if(myjson.type=="getstatus"){
				//扫码状态
				codelogin.checkResult(myjson);
			}
        };
        codelogin.connect.onopen = function (event) {
	        codelogin.connect.send("11111111111111111");
	        //已连接
        };
        codelogin.connect.onclose = function (event) {
			//连接关闭!二维码过期
			//codelogin.codeExpired();
			//codelogin.codeid=null;
			//codelogin.connect=null;
        };
        
    }else{
        //浏览器不支持WebSocket协议
        var timestamp = Date.parse(new Date());
        $.getJSON(protocol+codelogin.sysurl+"?type=getcode&timestamp="+timestamp+"&jsoncallback=?",function(myjson){
	        //console.log(msg);
			codelogin.showLoginCode("table",myjson);
        });
    }
}
//设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
codeLoginObj.prototype.showLoginCode=function(type,tjson){
	var url=decodeURIComponent(tjson.url);
	if(url.indexOf("?")){
		//通过地区ID换图标用
		url=url+"&areacode="+areacode;
	}else{
		url=url+"&areacode="+areacode;
	}
	//记录codeid
	codelogin.codeid=tjson.key;
	//过期计时
	window.setTimeout("codelogin.checkExpired('"+codelogin.codeid+"')",codelogin.expiredtime);
	//设置二维码有效状态
    codelogin.status=true;
	$("#qrcodeCanvas").html("");
	$("#qrcodeCanvas").qrcode({
	   render : type,    			//设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
	   text : url,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
	   width : codelogin.width,               //二维码的宽度
	   height : codelogin.height,              //二维码的高度
	   background : "#ffffff",      //二维码的后景色
	   foreground : "#000000",      //二维码的前景色
	   src: ""						//二维码中间的图片
	});
	codelogin.timer=new Date().getTime();
}
//检查是否显示二维码登陆-不代表二维码是否有效
/*
codeLoginObj.prototype.checkCodeLoginStatus=function(){
	if($(".scan .qrcode_target").hasClass("pt")){
		return true;
	}
	return false;
}
*/
//ajax方式检查扫描二维码是否通过
codeLoginObj.prototype.codeLoginCheck=function(){
	//是否socket连接模式
	if(codelogin.ifsocket){
		return;
	}
	var timestamp = Date.parse(new Date());
	if(codelogin.status && codelogin.codeid!=null){
	    $.getJSON(protocol+codelogin.sysurl+"?type=getstatus&key="+codelogin.codeid+"&timestamp="+timestamp+"&jsoncallback=?",function(myjson){//如果放入一个不存在的网址怎么办?
	        //console.log(msg);
			codelogin.checkResult(myjson);
	    });
	}
}
//二维码通过
codeLoginObj.prototype.codeIn=function(codeid,data){
	//window.location.href = decodeURIComponent(myjson.url);
	var url=util.makeUrl("SSO","SSO.CHANGEUSE")+"?key="+codeid+"&gjpt="+$("#gjpt").val();
	//设定data
	if(typeof(pdata)!="undefined" && typeof(data.usertype)!="undefined" && data.usertype!=null && pdata[data.usertype]){
		url=url+"&data="+pdata[data.usertype];
	}
	//改为自组url
	window.location.href = url;
}
//二维码过期
codeLoginObj.prototype.checkResult=function(myjson){
	if(myjson.flag=="2"){
		//二维码通过
		codelogin.codeIn(codelogin.codeid,myjson);
	}else if(myjson.flag=="1"){
		//已扫描
		
	}else if(myjson.flag=="3"){
		//二维码过期
		codelogin.status=false;
		codelogin.codeid=null;
		$("#qrcodeCanvas").html("<br/><br/>二维码过期<br/><a style='cursor:pointer' onclick='codelogin.getLoginCode()'>点此刷新二维码</a>");
	}
}
//socket模式，自动5分钟检测是否过期
codeLoginObj.prototype.checkExpired=function(codeid){
	if(codeid==codelogin.codeid && codelogin.ifsocket){
		codelogin.checkResult({flag:'3'});
	}
}
$(function(){
setInterval('codelogin.codeLoginCheck()',3000);
});
	