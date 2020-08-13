//-------------------------------工具js------------------------------
//(需要页面具备全局参数，供组装地址makeUrl使用 localAreaCode平台地区,username用户账号,usertype用户类型,classid班级id,studentId学生id,schoolStage学段,gradeCode年级,schoolId学校id,truename真实姓名)
//String加入replaceAll
String.prototype.replaceAll = function(AFindText,ARepText){
  //不能return this,会出现异常
  var temp=this.replace(AFindText,ARepText);
  while(temp.indexOf(AFindText)>=0){
  	temp=temp.replace(AFindText,ARepText);
  }
  return temp;
}
//String加入trim
String.prototype.trim = function() 
{ 
    return this.replace(/(^\s*)|(\s*$)/g, ""); 
}
//字符串反序
String.prototype.reverse = function() 
{
    if(this.length == 0)return this; 
    var i = this.length; 
    var dstr = ""; 
    while(--i >= 0) 
    { 
        dstr += this.charAt(i);  
    } 
    return dstr; 
} 
//扩充endWith
String.prototype.endWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
	  return false;
	if(this.substring(this.length-str.length)==str)
	  return true;
	else
	  return false;
	return true;
}
//扩充startWith
String.prototype.startWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
	  return false;
	if(this.substr(0,str.length)==str)
	  return true;
	else
	  return false;
	return true;
}
//日期格式化方法"yyyy-MM-dd"
Date.prototype.format = function (frule) {
	if(!frule || frule == "")
	{
	    frule = "yyyy-MM-dd";
	}
	 var o = {
	     "M+": this.getMonth() + 1, //月份 
	     "d+": this.getDate(), //日 
	     "H+": this.getHours(), //小时 
	     "m+": this.getMinutes(), //分 
	     "s+": this.getSeconds(), //秒 
	     "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	     "S": this.getMilliseconds() //毫秒 
	 };
	 if (/(y+)/.test(frule)) frule = frule.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	 for (var k in o)
	 if (new RegExp("(" + k + ")").test(frule)) frule = frule.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	 return frule;
}
//日期转化字符串默认格式:"yyyy-MM-dd",仅支持年月日
UtilObj.prototype.parseString = function(dateString,formatter)
{
    var today = new Date();
    if(!dateString || dateString == "")
    {
        return today;
    }
    if(!formatter || formatter == "")
    {
        formatter = "yyyy-MM-dd";
    }  
    var yearMarker = formatter.replace(/[^y|Y]/g,'');   
    var monthMarker = formatter.replace(/[^m|M]/g,'');   
    var dayMarker = formatter.replace(/[^d]/g,'');
    var yearPosition = formatter.indexOf(yearMarker);
    var yearLength = yearMarker.length;
    var year =  dateString.substring(yearPosition ,yearPosition + yearLength) * 1;
    if( yearLength == 2)
    {
        if(year < 50 )
        {
            year += 2000;
        }
        else
        {
            year += 1900;
        }
    }
    var monthPosition = formatter.indexOf(monthMarker);
    var month = dateString.substring(monthPosition,monthPosition + monthMarker.length) * 1 - 1;
    var dayPosition = formatter.indexOf(dayMarker);
    var day = dateString.substring( dayPosition,dayPosition + dayMarker.length )* 1;
    return new Date(year,month,day);
} 

UtilObj.prototype.getLocalData=function(key){
	if(window.localStorage){
		return localStorage.getItem(key);
	}else{
		alert("浏览器版本过低，最近应用记录无法存储！");
	}
	return null;
}

UtilObj.prototype.getRequestParam=function(key){
    //获取当前URL
    var local_url = document.location.href; 
    //获取要取得的get参数位置
    var get = local_url.indexOf(key +"=");
    if(get == -1){
        return false;   
    }   
    //截取字符串
    var get_par = local_url.slice(key.length + get + 1);    
    //判断截取后的字符串是否还有其他get参数
    var nextPar = get_par.indexOf("&");
    if(nextPar != -1){
        get_par = get_par.slice(0, nextPar);
    }
    return get_par;
}
UtilObj.prototype.setLocalData=function(key,value){
	if(window.localStorage){
		localStorage.setItem(key,value);
	}else{
		alert("浏览器版本过低，最近应用记录无法存储！");
	}
}
//两个日期减法
UtilObj.prototype.DateDiff=function(d1,d2){
    var day = 24 * 60 * 60 *1000; 
	try{     
        var dateArr = d1.split("-"); 
   		var checkDate = new Date(); 
        checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]); 
   		var checkTime = checkDate.getTime(); 
   		var dateArr2 = d2.split("-"); 
   		var checkDate2 = new Date(); 
        checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]); 
   		var checkTime2 = checkDate2.getTime(); 
   		var cha = (checkTime - checkTime2)/day;
        return cha; 
    }catch(e){ 
   		return false; 
	}
}

Array.prototype.remove = function(index){
	var isremove = false;
	if(index<this.length){
		for(var i=(index);i<this.length-1;i++){
			this[i]=this[i+1];
		}
	isremove = true;
	}
    if(isremove){
    	this[this.length-1]=null;
		this.length -= 1;
    }
}
//用于过滤CMS的信息，根据cookie中的值与扩展字段中的值进行匹配，若全部匹配这返回true（表明页面可以展示），否则返回false(表明页面不能展示)判断是否显示
function getSfxs(obj){
	//全局变量-负载平台标志 localAreaCode
	//全局变量-学段 schoolStage
	//全局变量-年级 gradeCode
	//全局变量-用户类型 usertype
	//根据扩展字段配置表，获取各扩展字段代表的意思获取扩展字段数据,这里需要判断扩展字段是否为空，为空则表示全部
	//-----------调用判断字符串是否为空-------
	//代表地区
	try{
		if(!util.isBlank(obj.attr("a1")) && localAreaCode && !util.isBlank(localAreaCode)){
			var attr_a1 = ","+obj.attr("a1")+",";
			if(attr_a1.indexOf(","+localAreaCode+",")<0){
				return false;
			}
		}
	}catch(e){}
	//代表学段
	try{
		if(!util.isBlank(obj.attr("a2")) && !util.isBlank(schoolStage) && schoolStage != "\"\""){
			var attr_a2 = obj.attr("a2");
			if(attr_a2.length>schoolStage.length){
				var schoolStages = schoolStage.split(",");
				var sfcz = true;
				for(var i=0;i<schoolStages.length;i++){
					if(attr_a2.indexOf(schoolStages[i])<0){
						sfcz = false;
					}
				}
				if(!sfcz){
					return false;
				}
			}else{
				var attr_a2s = attr_a2.split(",");
				var sfcz = true;
				for(var i=0;i<attr_a2s.length;i++){
					if(schoolStage.indexOf(attr_a2s[i])<0){
						sfcz = false;
					}
				}
				if(!sfcz){
					return false;
				}
			}
		}
	}catch(e){}
	//代表年级
	try{
		if(!util.isBlank(obj.attr("a3")) && !util.isBlank(gradeCode) && gradeCode != "\"\""){
			var attr_a3 = obj.attr("a3");
			if(attr_a3.length>gradeCode.length){
				var gradeCodes = gradeCode.split(",");
				var sfcz = true;
				for(var i=0;i<gradeCodes.length;i++){
					if(attr_a3.indexOf(gradeCodes[i])<0){
						sfcz = false;
					}
				}
				if(!sfcz){
					return false;
				}
			}else{
				var attr_a3s = attr_a3.split(",");
				var sfcz = true;
				for(var i=0;i<attr_a3s.length;i++){
					if(gradeCode.indexOf(attr_a3s[i])<0){
						sfcz = false;
					}
				}
				if(!sfcz){
					return false;
				}
			}
		}
	}catch(e){}
	//代表角色 这里需要对教师进行特殊判读，2和3都代表教师
	try{
		if(!util.isBlank(obj.attr("a4")) && !util.isBlank(usertype)){
			var attr_a4 = obj.attr("a4");
			if(usertype == 2 || usertype == 3){
				if(!(attr_a4.indexOf("2")>=0 || attr_a4.indexOf("3")>=0)){
					return false;
				}
			}else{
				if(attr_a4.indexOf(usertype)<0){
					return false;
				}
			}
		}
	}catch(e){}
	//按用户地区过滤
	try{
		if(!util.isBlank(obj.attr("a5")) && userAreaId && !util.isBlank(userAreaId)){
			//var areaArr=obj.attr("a5").split(",");
			var areaIds=","+obj.attr("a5")+",";
			//非省级
			if(userAreaId.indexOf(".")>1){
				var areaArr = userAreaId.split(".");
				//地区按照最多3层的情况处理
				if(areaArr.length>1){
					if(areaIds.indexOf(","+areaArr[0]+",")<0 && areaIds.indexOf(","+areaArr[0]+"."+areaArr[1]+",")<0 && areaIds.indexOf(","+userAreaId+",")<0){
						return false;
					}
				}
			}if(areaIds.indexOf(","+userAreaId+",")<0){
				return false;
			}
		}
	}catch(e){}
	//按学校Id过滤
	try{
		if(!util.isBlank(obj.attr("a6")) && schoolId && !util.isBlank(schoolId)){
			if(obj.attr("a6").indexOf(schoolId)<0){
				return false
			}
		}
	}catch(e){}
	return true;
}

/* pv异步请求方法
// pvip：各省pv采集服务器地址或域名 
// username：登录用户账号 
// cookieid:cookie唯一值
// channelid:频道编号
// rc:资源编号，没有时传null
// mc:目录编号，没有时传null
// so:访问来源，页面请求设置c,手机请求设置p,pad请求设置d，授课端请求设置a
// act：访问动作，页面刷新，默认设置c,其他传递请根据统计pv采集目录进行设置。
*/
function loadPV(username, cookieid,channelid,rc,mc) {
	$.getScript(protocol+sysconfig["STAT_PV"]+"/stat/a.html?c="+username+"&cookieid="+cookieid+"&channelid="+channelid+"&rc="+rc+"&mc="+mc+"&so=c&act=c",function(pvres){
		if(pvres){
			return true;
		}
		return;
	});
}

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
function UtilObj(){
	//浏览器版本判断
	var _browser_info=navigator.userAgent.toLowerCase();
	
	var _track = 'track' in document.createElement('track'); 
    var webstoreKeysLength = window.chrome && window.chrome.webstore ? Object.keys(window.chrome.webstore).length : 0; 

	//版本及浏览器类型
	this.browser ={ 
	version: (_browser_info.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1], 
	safari: /webkit/.test( _browser_info ), 
	opera: /opera/.test( _browser_info ),
	//msie: /msie/.test( _browser_info ) && !/opera/.test( _browser_info ),//不支持ie11判断
	msie: (!!window.ActiveXObject || "ActiveXObject" in window), 
	mozilla: /mozilla/.test( _browser_info ) && !/(compatible|webkit)/.test( _browser_info ) ,
	chrome: /chrome/.test( _browser_info ),
	se360:false,// 360安全浏览器，暂时无法判断 
	ee360:false// 360极速浏览器，暂时无法判断
	}
	if(this.browser.chrome){
		this.browser.version=getChromeVersion();
	}
	this.userSys={
			winXP:(navigator.userAgent.indexOf("Windows NT 5.1") > -1 || navigator.userAgent.indexOf("Windows XP") > -1)
		}
};
//定义工具页面接口
var util = new UtilObj();

//获取链接后缀参数以供设置标签使用这些参数
UtilObj.prototype.getRequestParams=function() { 
	var url = location.search; //获取url中"?"符后的字串 
	var theRequest = new Object(); 
	if (url.indexOf("?") != -1) { 
		var str = url.substr(1); 
		strs = str.split("&"); 
		for(var i = 0; i < strs.length; i ++) { 
			theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1];
		} 
	}
	return theRequest; 
}
//通用alertDialog提示调用，仅提示信息，点击后关闭，无后续处理
UtilObj.prototype.alert=function(tContent){
	if(util.isBlank(tContent)){
		return;
	}
	try{
		art.dialog({
			//设置内容与边界距离
			top:'50%',
			icon:'warning',
			padding:5,
			title:'提示信息',
			width:500,
			left:'60%',
			//提示内容
			content: tContent,
			//开启锁屏
			lock:true,
			//锁屏遮罩透明度
			opacity: 0.3,
			ok: function () {
				return true;
			},
			okVal:'关闭',
			close:function(){
				return true;
			}
		});
	}catch(e){}
}
//获取cookie
UtilObj.prototype.getCookie=function(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    	if(arr != null&&arr!="") return unescape(arr[2]);
    	return "";
}

//保存cookle
UtilObj.prototype.saveCookie=function(name,value,expires,path,domain,secure){  
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

//取最大值为imax的随机整数
UtilObj.prototype.MathRand=function(imax) { 
	var Num=""; 
	for(var i=0;i<6;i++) { 
		Num+=Math.floor(Math.random()*imax); 
	}
}

//非空判断
UtilObj.prototype.isBlank=function(tStr){
	//非undefined
	if(typeof(tStr)=="undefined"){
		return true;
	}
	//非null
	if(tStr==null){
		return true;
	}
	//非空字符串
	if(typeof(tStr)=="string" && tStr.replace(/(^\s*)|(\s*$)/g, "").length==0){
		return true;
	}
	return false;
}

//显示alrDialog提示框
UtilObj.prototype.showTips=function(tip){
	art.dialog({
		top:'100px',
		icon:'face-sad',
		padding:5,
		title:'提示信息',
		width:500,
		left:'50%',
		//提示内容
		content: '<p>'+tip+' <a style="text-decoration:underline;" target="_blank" href="'+reasonUrl+'">查看详情</a></p>',
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
}
//支持接口参数配置组装
UtilObj.prototype.makeUrl=function(isyscode,icode){
	//处理替换参数
	var iurl=interface_config[icode];
	var sysurl=sysconfig[isyscode];
	var stid="";
	if(typeof(studentId)!="undefined"){
		stid=studentId;
	}
	//判断结果
	if(util.isBlank(iurl) || util.isBlank(sysurl)){
		return "#";
	}
	//未登陆状态判断
	/*if("undefined"==typeof(username) || ( util.isBlank(_type4OtherConfig) && "login"==_type4OtherConfig ) ){
		return protocol+sysurl+iurl;
	}*/
	try{
		iurl=iurl.replaceAll("$userAreaId$",userAreaId).replaceAll("$username$",username).replaceAll("$usertype$",usertype).replaceAll("$classId$",classid).replaceAll("$studentId$",stid).replaceAll("$schoolId$",schoolId);
		return protocol+sysurl+iurl;
	}catch(e){
		return protocol+sysurl+iurl;
	}
}

/*
检查鉴权是否通过,需要页面存在appNoGrant鉴权过滤参数
type channel栏目鉴权，icode接口鉴权
id 栏目为channelid(下划线替换点后)，icode为接口编码
返回：true鉴权未通过，false鉴权通过
*/
UtilObj.prototype.grantChecker=function(type,id){
	var nograntStr=appNoGrant+",";
	if("channel"==type){
		if(nograntStr.indexOf("portal_v_menu_"+id+",")>=0){
			return true;
		}
	}else if("icode"==type){
		id=id.replaceAll(".","_");
		if(nograntStr.indexOf("portalcode_"+id+",")>=0){
			return true;
		}
	}
	return false;
}

//根据接口标识打开对应页面
UtilObj.prototype.openIcode=function(icode){
	//非undefined
	if(util.isBlank(icode)){
		return;
	}
	if(util.grantChecker("icode",icode)){
		if( "undefined"!=typeof(grantAlert) && grantAlert ){
			grantAlert();
		}
		return;
	}
	var isyscode=icode.substring(0,icode.indexOf("."));
	window.open(util.makeUrl(isyscode,icode));
}

//根据接口标识打开对应页面
UtilObj.prototype.getIcodeScript=function(icode){
	//非undefined
	if(util.isBlank(icode)){
		return;
	}
	var isyscode=icode.substring(0,icode.indexOf("."));
	var turl=util.makeUrl(isyscode,icode);
	if("#"!=turl){
		$.getScript(turl);
	}
}
//供外层index.jsp用，在iframe01中打开某个接口标识页面
UtilObj.prototype.openInFrame=function(icode){
	//组装地址
	//非undefined
	if(util.isBlank(icode)){
		return;
	}
	if(util.grantChecker("icode",icode)){
		if( "undefined"!=typeof(grantAlert) && grantAlert ){
			grantAlert();
		}
		return;
	}
	var isyscode=icode.substring(0,icode.indexOf("."));
	var turl=util.makeUrl(isyscode,icode);
	if("#"!=turl){
		changeLm(turl);
		window.document.getElementById("iframe01").src=turl;
		//鉴权通过则隐藏屏蔽
		$("#belowdiv").hide();
		$("#grantAltdiv").hide();
	}
}

//在新门户页面打开对应接口地址
UtilObj.prototype.newPortalOpen=function(icode){
	//非undefined
	if(util.isBlank(icode)){
		return;
	}
	if(util.grantChecker("icode",icode)){
		if( "undefined"!=typeof(grantAlert) && grantAlert ){
			grantAlert();
		}
		return;
	}
	//组装地址
	var iurl=sysconfig["PORTAL"];
	var rsc = new Date().getSeconds();
	if(rsc<10){
		rsc="0"+rsc;
	}
	if(iurl){
		iurl=protocol+iurl+"/webindex.action?data={icode:\""+icode+"\"}&na="+noalertCode+rsc;
		window.open(iurl);
	}
}

//转向页面到某个接口编码地址
UtilObj.prototype.gotoIcode=function(isyscode,icode){
	//非undefined
	if(util.isBlank(icode) || util.isBlank(isyscode)){
		return;
	}
	if(util.grantChecker("icode",icode)){
		if( "undefined"!=typeof(grantAlert) && grantAlert ){
			grantAlert();
		}
		return;
	}
	var turl=util.makeUrl(isyscode,icode);
	if("#"!=turl){
		window.location.href=turl;
	}
}

//获取链接后缀参数以供设置标签使用这些参数
UtilObj.prototype.getRequest=function(url) {
	var theRequest = new Object(); 
	if(url){
		if (url.indexOf("?") != -1) { 
			var str = url.substr(url.indexOf("?")+1);
			strs = str.split("&"); 
			for(var i = 0; i < strs.length; i ++) { 
				theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
			} 
		}
	}
	return theRequest;
} 

//通用跨域异步调用
UtilObj.prototype.getRemoteJson= function (sys,icode,param,callbackhander){
	if(this.isBlank(param)){
		param="jsoncallback=?";
	}else{
		param=param+"&jsoncallback=?";
	}
	var tempUrl=util.makeUrl(sys,icode);
	if("#"==tempUrl){
		//获取地址失败
		return;
	}
	var andFlag="&";
	if(tempUrl.indexOf("?")==-1){
		andFlag="?";
	}
	$.getJSON(tempUrl+andFlag+param,callbackhander);
}

//通用可设置编码的跨域异步调用
UtilObj.prototype.getCharsetRemoteJson= function (sys,icode,param,charset,callbackhander){
	var andFlag="&";
	var tempUrl=util.makeUrl(sys,icode);
	if("#"==tempUrl || tempUrl==null){
		//获取地址失败
		return;
	}
	if(tempUrl.indexOf("?")==-1){
		andFlag="?";
	}
	$.ajax({
		url:tempUrl+andFlag+param,
		type:"get",
		dataType:"jsonp",
		jsonp:"jsoncallback",
		scriptCharset:charset,  
		success:function(rdata){
			callbackhander(rdata);
		}
	});
}

//获取CMS数据方法,统一返回title,desc,url,pic,tag,type,time,mark(暂空),top(置顶0/1234),a9,a10
UtilObj.prototype.getCMSData= function(icode,rlength,filterCMS,callbackhander){
	if(util.isBlank(filterCMS)){
		filterCMS=false;
	}
	$.getScript(protocol+sysconfig["CMS"]+interface_config[icode],function(){ 
		var result = null;
		try{
			var rt=eval('typeof('+"infolist"+interface_config[icode].split("/")[interface_config[icode].split("/").length-2]+')'); 
			if("undefined"!=rt && "undefined"!=typeof(rt)){
				result = eval('('+"infolist"+interface_config[icode].split("/")[interface_config[icode].split("/").length-2]+')'); 
			}
		}catch(e){}
		if(result!=null && result.infosList){
			var rdata = new Array();
			var rnum=0;
			$(result.infosList).each(function(num){
				if(rnum>=rlength){
					return;
				}
				if(filterCMS){
					//CMS 扩展字段条件过滤
					var sfxs = getSfxs($(this));
					if(!sfxs){
						return true; //跳过本条数据
					}
				}
				var url=null;
				if($(this).attr("contenttype")=="HTML"){
					url=protocol+sysconfig["CMS"]+$(this).attr("filepath");
				}else if($(this).attr("contenttype")=="SURL"){
					url=$(this).attr("infourl");
				}
				var img="";
				if(typeof($(this).attr("abbrevpic"))!="undefined" && $(this).attr("abbrevpic")!="null"){
					img=protocol+sysconfig["CMS"]+$(this).attr("abbrevpic");
				}
				rdata.push({"id":$(this).attr("infoid"),"channelcode":$(this).attr("fromchannelcode"),"title":$(this).attr("topic"),"desc":$(this).attr("description"),"url":url,"pic":img,"time":$(this).attr("pubtime"),"tag":$(this).attr("tag"),"type":$(this).attr("contenttype"),"mark":"","top":$(this).attr("iscommend"),"a9":$(this).attr("a9"),"a10":$(this).attr("a10"),"a15":$(this).attr("a15"),"data":$(this)[0]});
				rnum++;
			});
			callbackhander(rdata);
		}else{
			callbackhander(new Array());
		}
	});
}

//CMS通用处理(替换~url~,~text~,~img~,~target~,~time~时间:年月日时分秒,~date~日期:年月日,~desc~时间)
//显示位置id,接口编号,显示个数,展示方式(0html,其他append),展示模板(自动替换上述标签内容),是否过滤，额外独有标签处理句柄
UtilObj.prototype.getCommonCMS=function (showid,icode,ilength,type,templete,filterCMS,shandel,nodataHandel){
	if(util.isBlank(templete)){alert("错误信息：空模板内容!位置："+showid+"，编号:"+icode);return;}
		util.getCMSData(icode,ilength,filterCMS,function(data){
		if(data.length==0){
			if(""!=typeof(nodataHandel) && nodataHandel){
				nodataHandel(showid,icode);
			}else if(icode.length>4 && "<li>"==icode.substring(0,4) && "</li>"==icode.substring(icode.length-4)){
				$("#"+showid).html('<li>暂无数据</li>');
			}
		}else{
			var codeStr=new Array();
			for(var i=0;i<data.length;i++){
				var tdata = data[i];
				var target = "_blank";
				if(tdata.a9=="当前页"){
					target = "";
				}else if(tdata.a9=="不打开"){
					infourll="javascript:;"
					target="";
				}
				var tempcode=null;
				if(""!=typeof(shandel) && shandel){
					tempcode=shandel(templete,tdata,i,data.length);
				}else{
					tempcode=templete;
				}
				codeStr.push(tempcode.replaceAll("~url~",tdata.url).replaceAll("~img~",tdata.pic).replaceAll("~time~",tdata.time).replaceAll("~date~",tdata.time.substring(0,10)).replaceAll("~text~",tdata.title).replaceAll("~desc~",tdata.desc).replaceAll("~target~",target));
				
			}
			if(codeStr!=null && codeStr.length>0){
				if(type==0){
					$("#"+showid).html(codeStr.join(""));
				}else{
					$("#"+showid).append(codeStr.join(""));
				}
			}
			codeStr = null;
			return true;
		}
	});
}
//混淆
UtilObj.prototype.mix=function (iname){
	var tcode = iname;
	if(iname && iname!=null && iname.trim().length>0){
		if(iname.length>1){
			tcode = iname.reverse();
			tcode=tcode.substring(tcode.length/2)+tcode.substring(0,(tcode.length/2));
		}else{
			tcode = iname;
		}
	}
	return tcode;
}
//还原混淆
UtilObj.prototype.unmix=function (str){
	var tcode=str;
	if(tcode && tcode!=null && tcode.trim().length>0){
		if(tcode.length>1){
			var temp = tcode.reverse();
			temp=temp.substring(temp.length/2)+temp.substring(0,(temp.length/2));
			return temp;
		}else{
			return tcode;
		}
	}
}

//Base64返回混淆的inputname
//200618增加混淆
UtilObj.prototype.confoundInputName=function (iname){
	var tcode = iname;
	if(iname && iname!=null && iname.trim().length>0){
		tcode = util.mix(new Base64().encode(iname));
	}
	return "v3:"+tcode;
}
//Base64混淆的inputname还原
//200618增加混淆
UtilObj.prototype.unconfoundInputName=function (str){
	var tcode=str;
	if(tcode && tcode!=null && tcode.trim().length>3){
		if("v3:"==tcode.substring(0,3)){
			var temp=new Base64().decode(util.unmix(tcode.substring(3)))
			return temp;
		}else{
			return "";
		}
	}
}


/** 
 * 检测 external 是否包含该字段 
 * @param reg 正则 
 * @param type 检测类型，0为键，1为值 
 * @returns {boolean} 
 * @private 
 */ 
UtilObj.prototype.checkExternal=function (reg, type) { 
    var external = window.external || {}; 


    for (var i in external) { 
        if (reg.test(type ? external[i] : i)) { 
            return true; 
        } 
    } 
    return false; 
} 