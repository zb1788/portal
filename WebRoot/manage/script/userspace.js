//页面接口定义
var userspace = new userspaceObj();

function userspaceObj(){
	this.pvUrl="";
};

//String加入replaceAll
String.prototype.replaceAll = function(AFindText,ARepText){
  //不能return this,会出现异常
  var temp=this.replace(AFindText,ARepText);
  while(temp.indexOf(AFindText)>=0){
  	temp=temp.replace(AFindText,ARepText);
  }
  return temp;
}

//获取cookie
function getcookie(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    	if(arr != null&&arr!="") return unescape(arr[2]);
    	return "";
}

//非空判断
userspaceObj.prototype.isBlank=function(tStr){
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

//初始化管理我的应用
function initMyUse(){
	//从应用配置文件defaultUse.js中读取配置的应用展示到页面中，幷处理选中效果
	var temp= "<li><a href=\"#\" class=\"~bjs~\"><span class=\"~bjt~\"></span><s class=\"app_txt\">~bjm~</s></a><span style=\"display:none\">~bjcode~</span></li>";
	var codeStr = "";
	for(var i=1;i<=12;i++){
		var bjs = defalutMyUseMap[i]["bjs"];
		var bjt = defalutMyUseMap[i]["bjt"];
		var bjm = defalutMyUseMap[i]["bjm"];
		var bjcode = defalutMyUseMap[i]["bjcode"];
		codeStr = codeStr + temp.replaceAll("~bjs~",bjs).replaceAll("~bjt~",bjt).replaceAll("~bjm~",bjm).replaceAll("~bjcode~",bjcode);
	}
	codeStr = codeStr + "<div class=\"clearfix\"></div>";
	$("#glyy").html(codeStr);
	//实现应用图标勾选状态切换
	$(".myApp.pop ul li").toggle(function(){
		var num = $(".myApp.pop ul li").children(".ok").length;
		//alert(num);
		var num1= 5-num;
		if(num1 < 0){num1 = 0};
		//alert(num1);
		if ( num > 5 ) {
			alert("最多能选6个");
			}else{
			$(this).append('<em class="ok"></em>');
			}
		$("#num8").text(num1);
	},function(){
		$(this).children().remove(".ok");
		var num = $(".myApp.pop ul li").children(".ok").length;
		var num1= 6-num;
		if(num1 < 0){num1 = 0};
		$("#num8").text(num1);
		}
	);
}

//保存我的应用
function saveMyUse(){
	//调用用户中心栏目收藏接口，将选择的应用进行保存
	var param = "data={\"interFaceType\":\"save\",\"modules\":[" ;
	$(".ok").each(function(num){
		var lmid = $(this).parent().find("span").eq(1).html();
		if(num == 0){
			param += '{"allowshow":"","allowuse":"","c1":"","c2":"","c3":"","c4":"","moduleLevel":"","moduleid":"'+lmid+'","modulename":"","moduleurl":"","moveinpic":"","moveoutpic":"","orderid":"'+num+'","parentid":""}'
		}else{
			param += ',{"allowshow":"","allowuse":"","c1":"","c2":"","c3":"","c4":"","moduleLevel":"","moduleid":"'+lmid+'","modulename":"","moduleurl":"","moveinpic":"","moveoutpic":"","orderid":"'+num+'","parentid":""}';
		}
	});
	param = param + "],\"userName\":\""+username+"\"}";
	//跨域调用接口
	userspace.getRemoteJson("SSO","SSO.SHOWMYUSE",param,function(result){
		//重现调用展示我的应用方法
		showMyUse();
	});
}
//调用用户中心栏目收藏接口，展示我的应用，如果未做任何选择，则显示默认应用
//链接地址如该格式（http://192.168.164.95/sso/interface/flavorApp.jsp?data={"interFaceType":"get","modules":[],"userName":"1000"}）
function showMyUse(){
	$("#myUse").html("");
	//参数
	var param = "data={\"interFaceType\":\"get\",\"modules\":[],\"userName\":\""+username+"\"}";
	//模板
	var temp = "<li><a href=\"#\" onclick=\"showUse(this,'~bjcode~','~bjurl~')\" class=\"~bjs~\"><span class=\"~bjt~\"></span><s class=\"app_txt\">~bjm~</s></a></li>";
	var number = 0;
	var str = ",";
	var bjcode = "";
	var bjurl = "";
	var bjs = "";
	var bjt = "";
	var bjm = "";
	//跨域调用接口
	userspace.getRemoteJson("SSO","SSO.SHOWMYUSE",param,function(result){
		//如果返回数据有值，则展示
		if(result.rtnArray){
			$(result.rtnArray).each(function(num){
				number = number + 1;
				bjcode = $(this).attr("moduleid");
				var j = 1;
				for(var i=1;i<=12;i++){
					if(defalutMyUseMap[i]["bjcode"]==bjcode){
						j = i;
					}
				}
				str += bjcode+",";
				$("#myUse").append(temp.replaceAll("~bjs~",defalutMyUseMap[j]["bjs"]).replaceAll("~bjt~",defalutMyUseMap[j]["bjt"]).replaceAll("~bjm~",defalutMyUseMap[j]["bjm"]).replaceAll("~bjcode~",bjcode).replaceAll("~bjurl~",defalutMyUseMap[j]["bjurl"]));
			});
		}
		if(number<6){ //展示部分为选中的应用+默认，合计共6条，其中选中的应用展示在前面
			number = 6 - number;		
			for(var i=1;i<=number;i++){
				for(var key in defalutMyUseMap[i]){
					if(key == "bjs"){
						bjs = defalutMyUseMap[i][key];
					}
					if(key == "bjt"){
						bjt = defalutMyUseMap[i][key];
					}
					if(key == "bjm"){
						bjm = defalutMyUseMap[i][key];
					}
					if(key == "bjcode"){
						bjcode = defalutMyUseMap[i][key];
					}
					if(key == "bjurl"){
						bjurl = defalutMyUseMap[i][key];
					}
				}
				if(str.indexOf(","+bjcode+",")>=0){
					number = number + 1;
					continue;
				}else{
					$("#myUse").append(temp.replaceAll("~bjs~",bjs).replaceAll("~bjt~",bjt).replaceAll("~bjm~",bjm).replaceAll("~bjcode~",bjcode).replaceAll("~bjurl~",bjurl));
				}
			}
		}
	});
}
	
//点击我的应用跳转相应功能页面
function showUse(obj,bjcode,bjurl){
	/*  替换链接参数
		~username~
		~usertype~
		~schoolStage~
		~defaultStage~
		~schoolId~
		~gradeCode~
		~classId~
		~studentId~
		~areaCode~
		~SchoolAreaCode~
		~telNumber~
		~trueName~
		~regFlg~
		~yjtURL_系统标示~
	*/
	//通过正则匹配获取链接中域名参数名
	var reg = "\~yjtURL_[A-Z]{3,7}\~";
	var url_temp = bjurl.match(reg);
	if(!userspace.isBlank(url_temp)){
		var ym_temp = url_temp[0].split("_")[1];
		var ym = ym_temp.substr(0,ym_temp.length-1);
		ym = sysconfig[ym];
		bjurl=bjurl.replaceAll(url_temp, ym);
	}
	if(bjurl.indexOf("~username~")>-1){
		bjurl=bjurl.replaceAll("~username~", username);
	}
	if(bjurl.indexOf("~usertype~")>-1){
		bjurl=bjurl.replaceAll("~usertype~", usertype);
	}
	if(bjurl.indexOf("~schoolStage~")>-1){
		bjurl=bjurl.replaceAll("~schoolStage~", schoolStage);
	}
	if(bjurl.indexOf("~defaultStage~")>-1){
		bjurl=bjurl.replaceAll("~defaultStage~", defaultStage);
	}
	if(bjurl.indexOf("~schoolId~")>-1){
		bjurl=bjurl.replaceAll("~schoolId~", schoolId);
	}
	if(bjurl.indexOf("~gradeCode~")>-1){
		bjurl=bjurl.replaceAll("~gradeCode~", gradeCode);
	}
	if(bjurl.indexOf("~classId~")>-1){
		bjurl=bjurl.replaceAll("~classId~", classId);
	}
	if(bjurl.indexOf("~studentId~")>-1){
		bjurl=bjurl.replaceAll("~studentId~", studentId);
	}
	if(bjurl.indexOf("~areaCode~")>-1){
		bjurl=bjurl.replaceAll("~areaCode~", areaCode);
	}
	if(bjurl.indexOf("~SchoolAreaCode~")>-1){
		bjurl=bjurl.replaceAll("~SchoolAreaCode~", SchoolAreaCode);
	}
	if(bjurl.indexOf("~telNumber~")>-1){
		bjurl=bjurl.replaceAll("~telNumber~", telNumber);
	}
	if(bjurl.indexOf("~regFlg~")>-1){
		bjurl=bjurl.replaceAll("~regFlg~", regFlg);
	}
	if(bjurl.indexOf("~trueName~")>-1){
		bjurl=bjurl.replaceAll("~trueName~", trueName);
	}
	//跳转相应栏目幷设置栏目选中样式
	var lmid = bjcode.substring(0,5);
	parent.$("a").removeClass("sel");
	parent.$("li[lmid='"+lmid+"']").find("a").addClass("sel");
	$(obj).attr("href","//"+bjurl);
	$(obj).attr("target","_self");
	$(obj).attr("onclick","");
	$(obj).trigger("onclick");
	/*try{
		if(!userspace.isBlank(lmid)){*/
			//判断打开的栏目
			/*var targetObject=parent.$("a[lmid="+lmid+"]");
			if(targetObject){
				targetObject.click();
			}
		}
	}catch(e){
		alert("跳转相应栏目失败，请于管理员联系！");
	}*/
}

//根据cookie中的值与扩展字段中的值进行匹配，若全部匹配这返回true（表明页面可以展示），否则返回false(表明页面不能展示)判断是否显示
function getSfxs(obj){
	//读取cookie中地区、学段、年级、角色值
	var localAreaCode = this.getcookie("localAreaCode").replaceAll("\"","");
	var schoolStage = this.getcookie("schoolStage").replaceAll("\"",""); 
	var gradeCode = this.getcookie("gradeCode").replaceAll("\"","");
	var usertype = this.getcookie("usertype").replaceAll("\"","");
	//根据扩展字段配置表，获取各扩展字段代表的意思获取扩展字段数据,这里需要判断扩展字段是否为空，为空则表示全部
	//-----------调用判断字符串是否为空-------
	//代表地区
	if(!userspace.isBlank(obj.attr("a1")) && !userspace.isBlank(localAreaCode)){
		var attr_a1 = ","+obj.attr("a1")+",";
		if(attr_a1.indexOf(","+localAreaCode+",")<0){
			return false;
		}
	}
	//代表学段
	if(!userspace.isBlank(obj.attr("a2")) && !userspace.isBlank(schoolStage) && schoolStage != "\"\""){
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
	//代表年级
	if(!userspace.isBlank(obj.attr("a3")) && !userspace.isBlank(gradeCode) && gradeCode != "\"\""){
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
	//代表角色 这里需要对教师进行特殊判读，2和3都代表教师
	if(!userspace.isBlank(obj.attr("a4")) && !userspace.isBlank(usertype)){
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
	return true;
}

//通用跨域异步调用
userspaceObj.prototype.getRemoteJson= function (sys,icode,param,callbackhander){
	if(userspace.isBlank(param)){
		param="jsoncallback=?";
	}else{
		param=param+"&jsoncallback=?";
	}
	var tempUrl=sysconfig[sys]+interface_config[icode];
	var andFlag="&";
	if(tempUrl.indexOf("?")==-1){
		andFlag="?";
	}
	$.getJSON(protocol+tempUrl+andFlag+param,callbackhander);
}

//通用可设置编码的跨域异步调用
userspaceObj.prototype.getCharsetRemoteJson= function (sys,icode,param,charset,callbackhander){
	var andFlag="&";
	var tempUrl=sysconfig[sys]+interface_config[icode];
	if(tempUrl.indexOf("?")==-1){
		andFlag="?";
	}
	$.ajax({
		url:protocol+tempUrl+andFlag+param,
		type:"get",
		dataType:"jsonp",
		jsonp:"jsoncallback",
		scriptCharset:charset,  
		success:function(rdata){
			callbackhander(rdata);
		}
	});
}

//获取CMS数据方法,统一返回title,desc,url,pic,tag,type,time,mark,a9,a10
userspaceObj.prototype.getCMSData= function(icode,callbackhander){
	$.getScript(protocol+sysconfig["CMS"]+interface_config[icode],function(){ 
		var result = eval('('+"infolist"+interface_config[icode].split("/")[interface_config[icode].split("/").length-2]+')'); 
		if(result.infosList){
			var rdata = new Array();
			$(result.infosList).each(function(num){
				//根据cookie中的值与扩展字段中的值进行匹配，若全部匹配这返回true（表明页面可以展示），否则返回false(表明页面不能展示)判断是否显示;若不用改判断可以去掉。
				var sfxs = getSfxs($(this));
				if(!sfxs){
					return true; //跳出本次循环
				}
				var url=null;
				if($(this).attr("contenttype")=="HTML"){
					url=protocol+sysconfig["CMS"]+$(this).attr("filepath");
				}else if($(this).attr("contenttype")=="SURL"){
					url=$(this).attr("infourl");
				}
				var img=null;
				if(typeof($(this).attr("abbrevpic"))!="undefined" && $(this).attr("abbrevpic")!="null"){
					img=protocol+sysconfig["CMS"]+$(this).attr("abbrevpic");
				}
				rdata.push({"id":$(this).attr("infoid"),"title":$(this).attr("topic"),"desc":$(this).attr("description"),"url":url,"pic":img,"time":$(this).attr("pubtime"),"tag":$(this).attr("tag"),"type":$(this).attr("contenttype"),"mark":"","a9":$(this).attr("a9"),"a10":$(this).attr("a10")});
			});
			callbackhander(rdata);
		}
	});
}

//展示空间首页焦点图
userspaceObj.prototype.showFocusImg = function(showId,iCode,num,temp){
	var temp_an =" <a href=\"javascript:void(0)\" hidefocus=\"true\" target=\"_self\" class=\"~sel~\"><i>~numStr~</i></a> "
	userspace.getCMSData(iCode,function(data){
		if(data.length==0){
			return false;
		}else{
			var codeStr = new Array();
			var codeStr_an = new Array();
			for(var i=0;i<data.length;i++){
				var tdata = data[i];
				var target = "_blank";
				if(tdata.a9=="当前页"){
					target = "";
				}else if(tdata.a9=="不打开"){
					infourll="javascript:;"
					target="";
				}
				var numStr = i+1;
				var sel = "";
				if(i==0){
					sel = "current";
				}else{
					sel = "";
				}
				codeStr =codeStr + temp.replaceAll("~url~",tdata.url).replaceAll("~img~",tdata.pic).replaceAll("~text~",tdata.title).replaceAll("~target~",target);
				codeStr_an = codeStr_an + temp_an.replaceAll("~sel~",sel).replaceAll("~numStr~",numStr);
			}
			$("#"+showId).html(codeStr);
			$("#D1fBt").html(codeStr_an);
			Qfast.add('widgets', { path: path+"/script/terminator2.2.min.js", type: "js", requires: ['fx'] });  
		    Qfast(false, 'widgets', function () {
		        K.tabs({
		            id: 'fsD1',   //焦点图包裹id  
		            conId: "D1pic1",  //** 大图域包裹id  
		            tabId:"D1fBt",  
		            tabTn:"a",
		            conCn: '.fcon', //** 大图域配置class       
		            auto: 1,   //自动播放 1或0
		            effect: 'fade',   //效果配置
		            eType: 'click', //** 鼠标事件
		            pageBt:true,//是否有按钮切换页码
		            bns: ['.prev', '.next'],//** 前后按钮配置class                          
		            interval: 3000  //** 停顿时间  
		        }) 
		    }) 
			return true;
		}
	});
}

//展示家长空间每日推荐
userspaceObj.prototype.showParentMeirituijian = function(){
	var tempdt = "<dt><a href=\"~url~\" target=\"~target~\"><img src=\"~src~\" width=\"120\" height=\"90\"/><span style=\"display:block;width:115px\">~title~</span></a></dt>";
	var tempdd = "<dd><a href=\"~url~\" title=\"~title~\" target=\"~target~\">~text~</a></dd>";
	var contentdt = new Array();
	var contentdd = new Array();
	userspace.getCMSData("CMS.JSON.A01074016002",function(data){
		if(data.length==0){return false;}else{
				for(var i=0;i<data.length;i++){
					var tdata = data[i];
					var text = "";
					if(tdata.title.length>15){
						text=tdata.title.substring(0,15)+"...";
					}else{
						text=tdata.title;
					}
					if(tdata.type == "SURL"){ //图片加链接形式
						var target = "_blank";
						if(tdata.a9=="当前页"){
							target = "";
						}else if(tdata.a9=="不打开"){
							infourll="javascript:;"
							target="";
						}
						contentdt.push(tempdt.replaceAll("~url~",tdata.url).replaceAll("~src~",tdata.pic).replaceAll("~title~",text).replaceAll("~target~",target));
					}else{  //正文形式
						var target = "_blank";
						if(tdata.a9=="当前页"){
							target = "";
						}else if(tdata.a9=="不打开"){
							infourll="javascript:;"
							target="";
						}
						contentdd.push(tempdd.replaceAll("~url~",tdata.url).replaceAll("~title~",text).replaceAll("~target~",target).replaceAll("~text~",text));
					}
				}
		}
		$("#tuijian_l").append(contentdt[0]).append(contentdd[0]).append(contentdd[1]).append(contentdd[2]);
		$("#tuijian_r").append(contentdt[1]).append(contentdd[3]).append(contentdd[4]).append(contentdd[5]);
		tuijian_yx();
	});
}

//显示教师每日推荐
userspaceObj.prototype.showTeacherMeirituijian = function(showid,icode,ilength,type,templete){
	if(userspace.isBlank(templete)){alert("错误信息：空模板内容!位置："+showid+"，编号:"+icode);return;}
		userspace.getCMSData(icode,function(data){
		if(data.length==0){
			$("#"+showid).html("暂无数据");
			return false;
		}else{
			for(var i=0;i<data.length;i++){
				if(i>=ilength){
					break; //超过规定条数则跳出循环
				}
				var tdata = data[i];
				var text = "";
				if(tdata.title.length>15){
					text=tdata.title.substring(0,15)+"...";
				}else{
					text=tdata.title;
				}
				var target = "_blank";
				if(tdata.a9=="当前页"){
					target = "";
				}else if(tdata.a9=="不打开"){
					infourll="javascript:;"
					target="";
				}
				var codeStr = (templete.replaceAll("~url~",tdata.url).replaceAll("~img~",tdata.pic).replaceAll("~img~",tdata.pic).replaceAll("~text~",text).replaceAll("~target~",target));
				if(type==0){
					$("#"+showid).html(codeStr);
				}else{
					$("#"+showid).append(codeStr);
				}
			}
			return true;
		}
	});
}


//CMS通用处理(替换~url~,~text~,~img~,~target~)
//显示位置id,接口编号,显示个数,展示方式(0html,其他append),展示模板(自动替换上述标签内容)
userspaceObj.prototype.getCommonCMS=function (showid,icode,ilength,type,templete){
	if(userspace.isBlank(templete)){alert("错误信息：空模板内容!位置："+showid+"，编号:"+icode);return;}
		userspace.getCMSData(icode,function(data){
		if(data.length==0){
			$("#"+showid).html("暂无数据");
			return false;
		}else{
			for(var i=0;i<data.length;i++){
				if(i>=ilength){
					break; //超过规定条数则跳出循环
				}
				var tdata = data[i];
				var target = "_blank";
				if(tdata.a9=="当前页"){
					target = "";
				}else if(tdata.a9=="不打开"){
					infourll="javascript:;"
					target="";
				}
				var text = "";
				if(tdata.title.length>13){
					text=tdata.title.substring(0,13)+"...";
				}else{
					text=tdata.title;
				}
				var codeStr=(templete.replaceAll("~url~",tdata.url).replaceAll("~img~",tdata.pic).replaceAll("~img~",tdata.pic).replaceAll("~text~",text).replaceAll("~target~",target));
				if(icode == "CMS.JSON.A01074016004" && ilength==30){ //此处先暂时这样判断，等以后有时间了在做修改
					marqueeContent.push(codeStr);
				}else{
					if(type==0){
						$("#"+showid).html(codeStr);
					}else{
						$("#"+showid).append(codeStr);
					}
				}
			}
			if(icode == "CMS.JSON.A01074016004"  && ilength==30){  //此处先暂时这样判断，等以后有时间了在做修改
				initMarquee();	
			}
			return true;
		}
	});
}

//接下来的是定义一些要使用到的函数
function initMarquee() {
	var str=marqueeContent[0];
	$("#tuijian").html('<div id=marqueeBox style="overflow:hidden;height:'+marqueeHeight+'px" onmouseover="clearInterval(marqueeInterval[0])" onmouseout="marqueeInterval[0]=setInterval(\'startMarquee()\',marqueeDelay)"><div>'+str+'</div></div>');
	marqueeInterval[0]=setInterval("startMarquee()",marqueeDelay);
}
function startMarquee() {
	var str=marqueeContent[marqueeId];
		marqueeId++;
	if(marqueeId>=marqueeContent.length) marqueeId=0;
	if(marqueeBox.childNodes.length==1) {
		var nextLine=document.createElement('DIV');
		nextLine.innerHTML=str;
		marqueeBox.appendChild(nextLine);
		}
	else {
		marqueeBox.childNodes[0].innerHTML=str;
		marqueeBox.appendChild(marqueeBox.childNodes[0]);
		marqueeBox.scrollTop=0;
		}
	clearInterval(marqueeInterval[1]);
	marqueeInterval[1]=setInterval("scrollMarquee()",24);
}
function scrollMarquee() {
	marqueeBox.scrollTop++;
	if(marqueeBox.scrollTop%marqueeHeight==(marqueeHeight-1)){
		clearInterval(marqueeInterval[1]);
		}
}

//获取未读取站内信个数
function getNotreadletterCount(username) {
	if(!username)return;
  	jQuery(function($){
  		var param = "command=getMsgCount&username="+username+"&flg=0";
  		userspace.getRemoteJson("WEBMAIL","WEBMAIL.001",param,function(data){
  			if(data){
	  			if(data.result==1)$("#letterCount").html(data.num);
	  		}else{
	  			$("#letterCount").html(0);
	  		}
	  	})
  	});
}

function showUbNum(){
	//展示总优币和可用优币
	userspace.getRemoteJson("UB","UB.SHOWPOINT","param=1",function(result){
		var use_point = "";
		var all_point = "";
		if(result.length == 0){
			use_point = 0;
			all_point = 0;
		}else{
			for(var i=0;i<result.length;i++){
				if(result[i].at == "u"){
					$("#use_point").html(result[i].unuse);
					$("#all_point").html(result[i].total);
				}
			}
		}
	});
}
//校本资源审核数
userspaceObj.prototype.getXbzyRms = function(){
	userspace.getRemoteJson("PLS","PLS.BDZYSHS","resState=0&listType=0&schoolCode="+schoolid,function(result){
		$("#xbzy").html(result.ResInfo);
	});
}

//录直播课程审核数
userspaceObj.prototype.getLzbRms = function(){
	$.getScript(path+"/interface/trains.jsp?code=RLMS.LZBSHS&schoolId="+schoolid,function(){
		var result = pvJson;
		if(pvJson==null || result.length == 0){
			return false;
		}else{
			$("#lzb").html(result.count);
		}
	});
}
//用户管理 type（0-校管理员  1-区管理员）
userspaceObj.prototype.getUserManage = function(type){
	if(type=="0"){
		userspace.getRemoteJson("TMS","TMS.USERXMANAGE","schoolId="+schoolid,function(result){
			if(result.length==0){
				return false;
			}else{
				$("#studentCount").html(result.studentCount);
				$("#teacherCount").html(result.teacherCount);
				$("#schoolClassCount").html(result.schoolClassCount);
			}
		});
	}else{
		userspace.getRemoteJson("TMS","TMS.USERQMANAGE","areaId="+areaId,function(result){
			if(result.length==0){
				return false;
			}else{
				$("#schoolCount").html(result.schoolCount);
				$("#studentCount").html(result.studentCount);
				$("#teacherCount").html(result.teacherCount);
				$("#schoolClassCount").html(result.schoolClassCount);
			}
		});
	}
	
}

//活跃用户统计
userspaceObj.prototype.getActivePvJson= function(){
	//$.getScript(tjurl+s+"/"+schoolid+"_active.json",function(data){
	//var url = tjurl+s+"/"+schoolid+"_active.json?param=1";
	var url = this.pvUrl+s+"/"+schoolid+"_active.json?param=1";
	$.getScript(path+"/common/pvInfo.jsp?url="+encodeURIComponent(encodeURIComponent(url)),function(){
		var result = pvJson; 
		if(pvJson==null || result.ACTIVE_USER==null || result.ACTIVE_USER.length == 0){
			return false;
		}else{
			var js_p_all = null; //上周教师人数
			var js_pp_all = null; //上上周教师人数
			var js_p_active = null; //上周教师比例
			var js_pp_active = null; //上上周教师比例
			var xs_p_all = null; //上周学生人数
			var xs_pp_all = null; //上上周学生人数
			var xs_p_active = null; //上周学生比例
			var xs_pp_active = null; //上上周学生比例
			$("#user_sq_date").html(result.PPWEEK);//上上周时段
			$("#user_bq_date").html(result.PWEEK);//上周时段
			$(result.ACTIVE_USER).each(function(){
				if($(this).attr("USERTYPE")=="教师"){  //统计教师活跃信息
					js_p_all =  $(this).attr("P_ALL");
					js_pp_all = $(this).attr("PP_ALL");
					js_p_active =  $(this).attr("P_ACTIVE");
					js_pp_active = $(this).attr("PP_ACTIVE");
				}else{
					xs_p_all =  $(this).attr("P_ALL");
					xs_pp_all = $(this).attr("PP_ALL");
					xs_p_active =  $(this).attr("P_ACTIVE");
					xs_pp_active = $(this).attr("PP_ACTIVE");
				}
			});
			if(js_p_all > js_pp_all){ //本期使用人数比上期大
				$("#js_bq_rs").html(js_p_all+"<img src='images/manage/up.png'>"); 
			}else{
				$("#js_bq_rs").html(js_p_all+"<img src='images/manage/down.png'>"); 
			}
			if(js_p_active > js_pp_active){
				$("#js_bq_bl").html(js_p_active+"<img src='images/manage/up.png'>");
			}else{
				$("#js_bq_bl").html(js_p_active+"<img src='images/manage/down.png'>");
			}
			$("#js_sq_rs").html(js_pp_all); 
			$("#js_sq_bl").html(js_pp_active);
			
			if(xs_p_all > xs_pp_all){ //本期使用人数比上期大
				$("#xs_bq_rs").html(xs_p_all+"<img src='images/manage/up.png'>"); 
			}else{
				$("#xs_bq_rs").html(xs_p_all+"<img src='images/manage/down.png'>"); 
			}
			if(xs_p_active > xs_pp_active){
				$("#xs_bq_bl").html(xs_p_active+"<img src='images/manage/up.png'>");
			}else{
				$("#xs_bq_bl").html(xs_p_active+"<img src='images/manage/down.png'>");
			}
			$("#xs_sq_rs").html(xs_pp_all); 
			$("#xs_sq_bl").html(xs_pp_active);
		}
	});
}

//教师使用情况统计
userspaceObj.prototype.getUsagePvJson= function(){
	//$.getJSON(tjurl+s+"/"+schoolid+"_usage.json?param=1&jsoncallback=?",function(result){
	var url = this.pvUrl+s+"/"+schoolid+"_usage.json?param=1";
	$.getScript(path+"/common/pvInfo.jsp?url="+encodeURIComponent(encodeURIComponent(url)),function(){
		var result = pvJson;
		if(pvJson==null || result.TEACHER_USAGE==null || result.TEACHER_USAGE.length == 0){
			return false;
		}else{
			$("#sq_date").html(result.PPWEEK);//上上周时段
			$("#bq_date").html(result.PWEEK);//上周时段
			$(result.TEACHER_USAGE).each(function(){
				if($(this).attr("TIMERANGE")=="pp"){  //上上周
					 $("#sq_res").html($(this).attr("RESUSAGE"));//上上周资源使用次数
					 $("#sq_zx").html($(this).attr("ONLINEHW"));//上上周在线作业次数
					 $("#sq_lx").html($(this).attr("OFFLINEHW"));//上上周离线作业次数
					 $("#sq_dx").html($(this).attr("SMSSEND"));//上上周短信发送数
					 $("#sq_dxa").html($(this).attr("DXASEND"));//上上周导学案发送次数
					 $("#sq_sk").html($(this).attr("PLSLOGIN"));//上上周授课端登陆次数
					 $("#sq_bk").html($(this).attr("PORTALLOGIN"));//上上周备课端登陆次数
					 $("#sq_yx").html($(this).attr("UXINLOGIN"));//上上周优信登陆次数
				}else{
					$("#bq_res").html($(this).attr("RESUSAGE"));//上周资源使用次数
					$("#bq_zx").html($(this).attr("ONLINEHW"));//上周在线作业次数
					$("#bq_lx").html($(this).attr("OFFLINEHW"));//上周离线作业次数
					$("#bq_dx").html($(this).attr("SMSSEND"));//上周短信发送数
					$("#bq_dxa").html($(this).attr("DXASEND"));//上周导学案发送次数
					$("#bq_sk").html($(this).attr("PLSLOGIN"));//上周授课端登陆次数
					$("#bq_bk").html($(this).attr("PORTALLOGIN"));//上周备课端登陆次数
					$("#bq_yx").html($(this).attr("UXINLOGIN"));//上周优信登陆次数
				}
			});
		}
	});
}
//获取优教通使用排名
userspaceObj.prototype.getRankPvJson= function(){
	var dqtime = new Date();
	var month = parseInt(dqtime.getMonth());
	var year = ""; 
	if(month == 0){
		year = (dqtime.getFullYear()-1).toString().substring(0,4); 
	}else{
		year = dqtime.getFullYear().toString().substring(0,4); 
	}
	
	if (month < 10){
		if(month == 0){
			month="12";
		}else{
			month = "0" + month;
		}
	} 
	var data = year+month;
	var url = this.pvUrl+"yjtrank/"+data+".json?param=1";
	var userAreaId = null;
	if(areaId.indexOf(".")>0){
		userAreaId = areaId.substring(0,areaId.indexOf(".")+1);
	}else{
		userAreaId=areaId+".";
	}
	$.getScript(path+"/common/pvInfo.jsp?url="+encodeURIComponent(encodeURIComponent(url)),function(){
		var result = pvJson;
		var str = "<tr><td></td><td>暂无数据</td><td>暂无数据</td></tr>";
		if(pvJson==null ){
			$("#login_rank").append(str);
			$("#jxhd_rank").append(str);
			$("#fszy_rank").append(str);
			$("#bdzy_rank").append(str);
			return false;
		}else{
			var login_rank_num = 0;jxhd_rank_num = 0;fszy_rank_num = 0;bdzy_rank_num = 0;
			//用户登陆排名
			if(result.LOGIN_RANK.length != 0){
				$(result.LOGIN_RANK).each(function(num){
					if($(this).attr("AREAID") == userAreaId){
						var login_str = "";
						if(login_rank_num<=2){ //前三名
							login_str = "<tr><td class='red'>"+(login_rank_num+1)+"</td><td>"+$(this).attr("SCHOOL_AREA_NAME")+"-"+$(this).attr("SCHOOL_NAME")+"</td><td><span>"+$(this).attr("NUM")+"</span></td></tr>";
						}else{
							login_str = "<tr><td class='grey'>"+(login_rank_num+1)+"</td><td>"+$(this).attr("SCHOOL_AREA_NAME")+"-"+$(this).attr("SCHOOL_NAME")+"</td><td><span>"+$(this).attr("NUM")+"</span></td></tr>";
						}
						$("#login_rank").append(login_str);
						login_rank_num++;
					}
				});
				if(login_rank_num == 0){
					$("#login_rank").append(str);
				}
			}else{
				$("#login_rank").append(str);
			}
			
			//家校互动排名
			if(result.JXHD_RANK.length !=0){
				$(result.JXHD_RANK).each(function(num){
					if($(this).attr("AREAID") == userAreaId){
						var jxhd_str = "";
						if(jxhd_rank_num<=2){ //前三名
							jxhd_str = "<tr><td class='red'>"+(jxhd_rank_num+1)+"</td><td>"+$(this).attr("SCHOOL_AREA_NAME")+"-"+$(this).attr("SCHOOL_NAME")+"</td><td><span>"+$(this).attr("NUM")+"</span></td></tr>";
						}else{
							jxhd_str = "<tr><td class='grey'>"+(jxhd_rank_num+1)+"</td><td>"+$(this).attr("SCHOOL_AREA_NAME")+"-"+$(this).attr("SCHOOL_NAME")+"</td><td><span>"+$(this).attr("NUM")+"</span></td></tr>";
						}
						$("#jxhd_rank").append(jxhd_str);
						jxhd_rank_num++;
					}
				});
				if(jxhd_rank_num == 0){
					$("#jxhd_rank").append(str);
				}
			}else{
				$("#jxhd_rank").append(str);
			}
			
			//发送作业排名
			if(result.FSZY_RANK.length !=0){
				$(result.FSZY_RANK).each(function(num){
					if($(this).attr("AREAID") == userAreaId){
						var fszy_str = "";
						if(fszy_rank_num<=2){ //前三名
							fszy_str = "<tr><td class='red'>"+(fszy_rank_num+1)+"</td><td>"+$(this).attr("SCHOOL_AREA_NAME")+"-"+$(this).attr("SCHOOL_NAME")+"</td><td><span>"+$(this).attr("NUM")+"</span></td></tr>";
						}else{
							fszy_str = "<tr><td class='grey'>"+(fszy_rank_num+1)+"</td><td>"+$(this).attr("SCHOOL_AREA_NAME")+"-"+$(this).attr("SCHOOL_NAME")+"</td><td><span>"+$(this).attr("NUM")+"</span></td></tr>";
						}
						$("#fszy_rank").append(fszy_str);
						fszy_rank_num++;
					}
				});
				if(fszy_rank_num == 0){
					$("#fszy_rank").append(str);
				}
			}else{
				$("#fszy_rank").append(str);
			}
			
			//本地资源排名
			if(result.BDZY_RANK.length != 0){
				$(result.BDZY_RANK).each(function(num){
					if($(this).attr("AREAID") == userAreaId){
						var bdzy_str = "";
						if(bdzy_rank_num<=2){ //前三名
							bdzy_str = "<tr><td class='red'>"+(bdzy_rank_num+1)+"</td><td>"+$(this).attr("SCHOOL_AREA_NAME")+"-"+$(this).attr("SCHOOL_NAME")+"</td><td><span>"+$(this).attr("NUM")+"</span></td></tr>";
						}else{
							bdzy_str = "<tr><td class='grey'>"+(bdzy_rank_num+1)+"</td><td>"+$(this).attr("SCHOOL_AREA_NAME")+"-"+$(this).attr("SCHOOL_NAME")+"</td><td><span>"+$(this).attr("NUM")+"</span></td></tr>";
						}
						$("#bdzy_rank").append(bdzy_str);
						bdzy_rank_num++;
					}
				});
				if(bdzy_rank_num ==0 ){
					$("#bdzy_rank").append(str);
				}
			}else{
				$("#bdzy_rank").append(str);
			}
		}
	});
}