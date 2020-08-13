//据下次短信发送间隔
var __intercount=150;
//短信发送间隔
var __intercount_default=150;
var default_index_name="智慧教育云";
//提示信息处理队列
function AlertArray(){
	this.aindex=0;
	this.tarr=new Array();
}
var AlertQuery=new AlertArray();
AlertArray.prototype.push=function(obj){
	this.tarr.push(obj);
	if(this.aindex==0){
		this.shownext();
	}
}
AlertArray.prototype.shownext=function(){
	//170303增加对于多开关闭提示的支持
	if(noalert){
		return;
	}
	//当要显示下个提示时，删除数组中第一个元素(该元素为前一个提示），幷自动改变数组的长度
	if(this.aindex!=0){
		this.tarr.shift(); 
		this.aindex=this.aindex-1; 
	}
	this.aindex=this.aindex+1;
	var ai=this.aindex-1;
	if(this.aindex<=this.tarr.length && this.tarr[ai]){
		this.show();
	}/*else if(this.aindex>0 && this.tarr.length>0){
		this.tarr=null;
		this.tarr=new Array();
		this.aindex=0;
	}*/
}
AlertArray.prototype.run =function(){
	if(this.tarr.length>0){
		//this.shownext();
	}
}
AlertArray.prototype.show =function(){
	this.tarr[this.aindex-1].run();
}

//关闭引导层通用方法
function closeYd(){
	$("#common_dhzz").hide();
	$("#dhzz").attr("src","");
}

//进入主页-非管理员
function goMain(){
	if(mainpage){
		if(util.isBlank(portal_config.seokey)){
			$("#modeName").text(default_index_name);
		}else{
			$("#modeName").text(portal_config.seokey);
		}
		$("#belowdiv").hide();
		$("#grantAltdiv").hide();
		$("#iframe01").attr("src",mainpage);
		changeLm();
		$("[lmid='22_00']").addClass("sel");
	}
}

//首页全局搜索
function researchKeyResource(searchTextValue){
	var researchKey=null;
	if(searchTextValue && searchTextValue!=null && searchTextValue!=""){
		researchKey=searchTextValue;
	}else{
   		//去掉两端空格
    	researchKey=$("#researchKey").val(); 
	}
	if( util.isBlank(researchKey) || researchKey=="搜索您感兴趣的内容") {
		alert("请输入搜索内容！");
		return false;
	}else{
	    researchKey = researchKey.trim().replaceAll("%","％");
	    researchKey = encodeURIComponent(encodeURIComponent(researchKey)).replace(/'/g,"\\'").replace(/\"/,"\"");
	    var paramData ="&areaCode="+localAreaCode+"&schoolStage="+schoolStage+"&schoolId="+schoolId+"&username="+username+"&classId="+classid+"&studentId="+studentId+"&gradeCode="+gradeCode+"&usertype="+usertype+"&title="+researchKey;
	    //隐藏二级栏目，调整页面头部高度
	    //changetopstyle("22.55");
	    var nurl=protocol+sysconfig["PLS"]+interface_config["PLS.183"]+paramData;
	    $("#iframe01").attr("src",nurl);
	    changeLm(nurl);//解除栏目选择及鉴权遮罩
	    try{
	    $.getScript(protocol+sysconfig["STAT_PV"]+"/stat/a.html?c="+username+"&cookieid="+cookieid+"&channelid=22.00&rc=&mc=&so=c&act=a&con="+researchKey);
	    }catch(e){}
	    //window.location.href=protocol+sysconfig["PLS"]+interface_config["PLS.183"]+paramData;
	}
}

//判断当前浏览器是否是IE浏览器
function isIE(){
    return navigator.userAgent.indexOf("MSIE")!=-1;
}
function isGoogle(){
	return navigator.userAgent.toLowerCase().indexOf("chrome")!=-1;
}

//发送短信定时器
function jsdingshi(phone,phoneActiveState){
	//短信发送间隔
	__intercount=__intercount_default;
	var __inter=window.setInterval(function(){
		if(__intercount==0){
			$("#geticode").html("<font color='blue'>获取验证码</font>");
			$("#geticode").attr("href","javascript:getphonevicode(null,'"+phone+"','"+phoneActiveState+"');");
			//$("#geticode").removeClass("btn_pop2_hui");
			//$("#geticode").addClass("btn_pop2");
			window.clearInterval(__inter);
		}else{
			$("#geticode").html("<font color='#c2c2c2'>"+__intercount+"秒重新获取</font>");
			$("#geticode").attr("href","javascript:;");
			//$("#geticode").removeClass("btn_pop2");
			//$("#geticode").addClass("btn_pop2_hui");
		}
		__intercount--;
	},1000);
}
//发送短信验证码
function getphonevicode(type,phone,phoneActiveState){
	codeType = "phone";//设置获取方式为短信验证码
	sendRequest(function(result){
	  		shouajaxpro(0);
	  		result=eval("("+result+")");
	  		if(result.type==1){
	  			if(!type)jsdingshi(phone,phoneActiveState);
	  			///判断___icode是否为空，如果空，追加
				if (""==___icode || null==___icode || "null"==___icode){
					___icode = result.icode;
				} else {
		  			___icode=___icode+","+result.icode;
				}
	  			if(!type)alert("发送验证码成功!");
	  			
	  		}else{
	  			if(!type)alert(result.message);
	  		}
	},path+"/sendVicode.action?phonenumber="+phone+"&phoneActiveState="+phoneActiveState,"post");
}

//发送短信验证码校验
function checkicode(){
	//判断___icode中包含验证码
	if($("#vicode").attr("value")!="" && (___icode.indexOf($("#vicode").attr("value")) > 0 || ___icode==$("#vicode").attr("value"))){
		//$("#pop6").hide();
		//$("#mask").hide();
		//util.saveCookie(username,__date,1000);
		//__showmessagetype=0;
		getSendCodeType(1);
		util.saveCookie("checksms",util.getCookie("ut")+username,{ path: '/'});
		//隐藏该弹出框
		art.dialog.list['message'].hide();
		AlertQuery.shownext();
	}else{
		alert("输入的验证码有误!");
	}
}

//获取临时验证码，赋值给输入框
function getTempPhoneCode(diffCount){
	$("#vicode").attr("value","");
	//验证获取次数是否超过系统配置的次数noCheckCountUsed,codeCount在getValAlert方法中已经赋值
	//如果超过了，给出提示，并且按钮灰显
	if(noCheckCountUsed>=tempCodeCount){
		alert("您本月获取临时验证码的次数已使用完毕！");
		//$("#getTempCode").html("<font color='#c2c2c2'>获取临时验证码</font>");
		//$("#getTempCode").attr("href","javascript:;");
	} else {
		codeType = "temp";//设置发送方式为获取临时验证码
		//生成随机6位数
		var Num=""; 
		for(var i=0;i<6;i++){ 
			Num+=Math.floor(Math.random()*10); 
		}
		///判断___icode是否为空，如果空，追加
		if (""==___icode || null==___icode || "null"==___icode){
			___icode = Num;
		} else {
			___icode = ___icode+","+Num;
		}
		$("#vicode").attr("value",Num);
		//调整本月剩余获取临时验证码次数
		diffCount--;
		$("#showRestNum").html("<font color='red'>"+diffCount+"</font>");
		//checkicode();
	}
}

//设置支付信息
function tosetpaycookile(loginAreaCode,loginClientCode,loginClientType,orderAreaCode,orderClientCode,orderClientType,productFreeTime,studyStageCode,gradeCode){
	$("#iframe01").attr("src",path+"/space/returntopay.jsp");
}

//隐藏欠费提示弹出提示层
/*function hideshowmessage(){
	$("#pop6").hide();
	$("#mask").hide();
	AlertQuery.shownext();
}*/

//隐藏短信验证及手机绑定提示层
/*function hideclass(obj){
	$("#"+obj).hide();
	$("#mask").hide();
	AlertQuery.shownext();
}*/

//班级收费提示
function classCostTip(){
	if(noalert){
		return;
	}
	try{
		$.getJSON(protocol+sysconfig["SSO"]+interface_config["SSO.BSS_STATE_SCHOOL"]+"?username="+username+"&reqEncoding=gbk&time="+Math.random()+"&jsoncallback=?",function(res){
			if( typeof(res.userAble)!="undefined" && !res.userAble){
				AlertQuery.push({run:function(){
					art.dialog({
					//设置内容与边界距离
					icon:'warning',
					padding:5,
					title:'提示信息',
					width:500,
					//提示内容
					content: "尊敬的用户：<br/>&nbsp;&nbsp;&nbsp;&nbsp;您好！<br/>&nbsp;&nbsp;&nbsp;&nbsp;"+res.bssStateFlgTip,
					//开启锁屏
					lock:true,
					//锁屏遮罩透明度
					opacity: 0.2,
					ok: function () {
					  //强制退出
					  window.location.href=path+"/ssoLoginFail.jsp";
				      return true;
				    },
				    okVal:'退出',
				    close:function(){
					  //强制退出
					  window.location.href=path+"/ssoLoginFail.jsp";
				      return true;
					}
					});
				}});
			}else if( typeof(res.userAble)!="undefined" && res.userAble && res.bssStateFlg=="2"){ //bssStateFlg 学校运营状态 0:不可用  1：可用 2：保护
				AlertQuery.push({run:function(){
					art.dialog({
					//设置内容与边界距离
					icon:'warning',
					padding:5,
					title:'提示信息',
					width:500,
					//提示内容
					content: "尊敬的用户：<br/>&nbsp;&nbsp;&nbsp;&nbsp;您好！<br/>&nbsp;&nbsp;&nbsp;&nbsp;"+res.bssStateFlgTip,
					//开启锁屏
					lock:true,
					//锁屏遮罩透明度
					opacity: 0.2,
					ok: function () {
				      return true;
				    },
				    okVal:'关闭',
				    close:function(){
				      return true;
					}
					});
				}});
			}
		});
	}catch(e){}
}
//检查用户禁用状态
var muinter=null;
function boxmessageshow(){
	jQuery(function($){
		//班级收费提示
		if(usertype==2 || usertype==3){
			classCostTip();
		}
		//未设置班级提示
		if(usertype==4 && classid=="" && !noalert ){
			AlertQuery.push({run:function(){
				art.dialog({
				//设置内容与边界距离
				icon:'warning',
				padding:5,
				title:'功能禁用',
				width:500,
				//提示内容
				content: '<div align="center" >你当前没有加入到任何班级，请拨打客服电话：4006-371-319。</div>',
				//开启锁屏
				lock:true,
				//锁屏遮罩透明度
				opacity: 0.2,
				ok: function () {
			      return true;
			    },
			    okVal:'确定',
			    close:function(){
				  AlertQuery.shownext();
			      return true;
				}
				//cancelVal: '关闭',
			    //cancel: function(){},
				});
				//$("#alertmessage").html(acall);$("#alertshuaxin").html(amsg);$("#pop6").show();$("#mask").show();
			}});
			return;
		}else if(usertype==4 && classid=="" && !noalert ){
			AlertQuery.push({run:function(){
				art.dialog({
				//设置内容与边界距离
				icon:'warning',
				padding:5,
				title:'功能禁用',
				width:500,
				//提示内容
				content: '<div align="center" >你的孩子当前没有加入到任何班级，请拨打客服电话：4006-371-319,。</div>',
				//开启锁屏
				lock:true,
				//锁屏遮罩透明度
				opacity: 0.2,
				ok: function () {
			      return true;
			    },
			    okVal:'确定',
			    close:function(){
				  AlertQuery.shownext();
			      return true;
				}
				//cancelVal: '关闭',
			    //cancel: function(){},
				});
				//$("#alertmessage").html(acall);$("#alertshuaxin").html(amsg);$("#pop6").show();$("#mask").show();
			}});
			return;
		}
		//不同用户角色登录检查(对比ut)
		checkMoreRolelogin(6000);
		//用户身份重复登录检查定时器
		//在线时长
		if(notcheckuser.indexOf(username+",")<0){//如果是配置的用户则不用检测
			if(repeatUsertype==1){
				getRepeatUserlogin();
				muinter=window.setInterval(function(){
					getRepeatUserlogin();
				},repeatCheckTime);
			}
		}
		//增加欠费提示显示开关
		if(typeof(portal_config.payalert)=="undefined" || "0"!=portal_config.payalert){
			//欠费提示
			if(usertype=="4"){
				getPayTypeAlert(username);
			}else if(usertype=="0"){
				getPayTypeAlert(username,studentname);
			}
		}
		//手机绑定提示(alerttype==1弹出提示，由于加入有效期，改为调用后判断)
		//管理员空间不调用
		if("manage_index"!=_type4OtherConfig){
			getBoundPhoneTip();
		}
		//短信验证
		//phoneNumber通过cookie[verifyCodePhone]获取，此仅针对通过手机登陆用户(福建均通过手机登陆)
		if(boundphone>0 && !util.isBlank(phoneNumber) && phoneNumber!="\"\""){
			if(util.getCookie("checksms")!=(util.getCookie("ut")+username)){//如果当前用户已验证则不弹出
				getSendCodeType(0);
			}
		}
	});
}

//检测其他角色身份登录 tims 间隔时间ms
function checkMoreRolelogin(times){
	//获取当前登录令牌
	var logincookile=util.getCookie("ut");
	if(times){}else{times=5000}
	//定时检查令牌是否匹配
	window.setInterval(function(){
		if(util.getCookie("ut")!=logincookile || ""==util.getCookie("ut")){
			AlertQuery.push({run:function(){
				art.dialog({
				icon:'warning',
				//设置内容与边界距离
				padding:5,
				title:'功能禁用',
				width:500,
				//提示内容
				content: '<div align="center" >你已经用其他身份登录系统，点击确定切换到新身份。</div>',
				//开启锁屏
				lock:true,
				//锁屏遮罩透明度
				opacity: 0.2,
				ok: function () {
				  window.location.reload();
			      return true;
			    },
			    okVal:'确定',
			    close:function(){
				  window.location.reload();
			      return true;
				}
				//cancelVal: '关闭',
			    //cancel: function(){},
				});
				//$("#alertmessage").html("功能禁用");
				//$("#alertshuaxin").html("<div>你已经用其他身份登录系统，点击确定切换到新身份。</div><br/><a href=\"javascript:;\" onclick=\"window.location.reload();\">确定</a>");
				//$("#pop6").show();
				//$("#mask").show();
			}});
		}
	},times);
}

//用户重复登陆检测
function getRepeatUserlogin() {
	//时间间隔校验，避免多开多次检查重复登陆多次计时
	var lastTime=Number(util.getCookie("checkut"));
	var nowTime=new Date().getTime();
	if( lastTime==0 || (nowTime-lastTime)>(repeatCheckTime-10*1000) ){
		util.saveCookie("checkut",nowTime);
	}else{
		return;
	}
	if(""==util.getCookie("ut")){
		//如果用户已经通过其他系统被踢出，则不再检测ut，提示踢出。
		kickOutAlert();
		return;
	}
	//new Date().getTime()-Number(util.getCookie());
	util.getRemoteJson("SSO","SSO.207","username="+username+"&lastUt="+util.getCookie("ut")+"&appFlg=portal",function(result){
		if($(result).attr("lastutEqualsUt")!="true"){
			kickOutAlert();
		}
	});
}
//多机登录或者踢出提示
function kickOutAlert(){
	AlertQuery.push({run:function(){
		art.dialog({
		icon:'warning',
		//设置内容与边界距离
		padding:5,
		title:'功能禁用',
		width:500,
		//提示内容
		content: '<div align="center" >你的帐号已经在别处登录，你被强制退出。</div>',
		//开启锁屏
		lock:true,
		//锁屏遮罩透明度
		opacity: 0.2,
		ok: function () {
		  //强制退出
		  window.location.href=path+"/ssoLoginFail.jsp";
	      return true;
	    },
	    okVal:'确定',
	    close:function(){
		  //强制退出
		  window.location.href=path+"/ssoLoginFail.jsp";
	      return true;
		}
		});
	}});
}
//到期及欠费提示(河南)
function getPayTypeAlert(username,studentname){
	if(noalert){
		return;
	}
	util.getRemoteJson("SSO","SSO.208","&username="+username+"&studentNumber="+studentname,function(result){
		var currentuser=null,showmessage=false;

		for(var i=0;i<result.buyUsersState.length;i++){
			var c=result.buyUsersState[i];
			if(usertype==4){//学生
				if(c.username==username)currentuser=c;
			}else if(usertype==0){
				if(c.username==studentname)currentuser=c;
			}
		}

		//切面定制插入接口
		if("undefined"!=typeof(otherConfigUtil.payAlertBeforeCutPoint)){
			otherConfigUtil.payAlertBeforeCutPoint(result,currentuser,areamessage);
		}
		
		
		var button = null;
		//如果支付类型为1-在线支付，或支付类型为3-匹配运营商类型在线支付(phoneBuyAble=true 手机订购 =false支付订购)
		if(paytype==1){
			//payurl="<a href=\"javascript:tosetpaycookile('"+result.areaId+"','"+result.username+"','"+result.usertype+"','"+currentuser.areaId+"','"+currentuser.username+"','"+currentuser.usertype+"','"+currentuser.useDisableDate+"','"+currentuser.studyStageCode+"','"+currentuser.gradeCode+"');\" class=\"btn_pop2\" >马上订购</a>";
			button = {name:'马上订购',callback:function(){
				tosetpaycookile('"+result.areaId+"','"+result.username+"','"+result.usertype+"','"+currentuser.areaId+"','"+currentuser.username+"','"+currentuser.usertype+"','"+currentuser.useDisableDate+"','"+currentuser.studyStageCode+"','"+currentuser.gradeCode+"');
				return true;
			}};
		}else if(paytype==3 && !util.isBlank(phoneBuyAble) && phoneBuyAble=="false"){
			if(usertype == 0 || usertype == 4){
				//payurl="<a href=\"javascript:tosetpaycookile('"+result.areaId+"','"+result.username+"','"+result.usertype+"','"+currentuser.areaId+"','"+currentuser.username+"','"+currentuser.usertype+"','"+currentuser.useDisableDate+"','"+currentuser.studyStageCode+"','"+currentuser.gradeCode+"');\" class=\"btn_pop2\" >马上订购</a>";
				button = {name:'马上订购',callback:function(){
					tosetpaycookile('"+result.areaId+"','"+result.username+"','"+result.usertype+"','"+currentuser.areaId+"','"+currentuser.username+"','"+currentuser.usertype+"','"+currentuser.useDisableDate+"','"+currentuser.studyStageCode+"','"+currentuser.gradeCode+"');
					return true;
				}};
			}
		}else{}
		//var startcode ="<div id='tempCodeDiv'><ul style='text-align:left;margin:10px;margin-top:-10px;'><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		var acall="";
		var alertText="";
		var tipButtonVal = "";
		//默认配置_free为有效期到期提示，无_free为续订提示
		var defaultTemplet={
				"type4":"感谢使用本平台业务！课后作业及时查收，作答情况智能反馈；同步教材课前抢先预习、名师微课指点迷津，汇聚名校联考模考试卷，升学备考轻松无忧！<font color='red'>您$LastDay$；</font>为不影响您继续使用，请进行业务续订。",
		   "type4_free":"感谢使用本平台业务！课后作业及时查收，作答情况智能反馈；同步教材课前抢先预习、名师微课指点迷津，汇聚名校联考模考试卷，升学备考轻松无忧！<font color='red'>您$LastDay$；</font>为不影响您继续使用，请进行业务订购。",
				"type0":"感谢使用本平台业务！课后作业及时查收，作答情况智能反馈；同步教材课前抢先预习、名师微课指点迷津，汇聚名校联考模考试卷，升学备考轻松无忧！<font color='red'>您的孩子$LastDay$；</font>为方便您和孩子的继续使用，请进行业务续订。",
		   "type0_free":"感谢使用本平台业务！课后作业及时查收，作答情况智能反馈；同步教材课前抢先预习、名师微课指点迷津，汇聚名校联考模考试卷，升学备考轻松无忧！<font color='red'>您的孩子$LastDay$；</font>为不影响您和孩子继续使用，请进行业务订购。"
		};

	
		//isNeedTipBuy是否需要订购提示；isInFreeTime是否超出免费期
		if(currentuser.isNeedTipBuy=="true"){
			showmessage=true;
			var lastDayMessage="";
			var templet="";
			if(currentuser.isInFreeTime=="true"){
				lastDayMessage="已经免费试用"+currentuser.useDays+"天，免费期还剩下 "+currentuser.freeLeftDays+" 天";
				templet=defaultTemplet["type"+usertype+"_free"];
				if( "undefined"!=typeof(areamessage) && areamessage!=null){
					if("undefined"!=typeof(areamessage["type"+usertype+"_free"]) && areamessage["type"+usertype+"_free"]!=null){
						templet=areamessage["type"+usertype+"_free"];
					}else if("undefined"!=typeof(areamessage["type"+usertype]) && areamessage["type"+usertype]!=null){
						templet=areamessage["type"+usertype];
					}
				}
				tipButtonVal = "继续体验";
				
			}else if(currentuser.isInFreeTime=="false"){
				lastDayMessage="使用有效期至"+currentuser.endUseDate+"日，还剩 "+currentuser.leftDays+" 天";
				templet=defaultTemplet["type"+usertype];
				if( "undefined"!=typeof(areamessage) && areamessage!=null){
					if("undefined"!=typeof(areamessage["type"+usertype]) && areamessage["type"+usertype]!=null){
						templet=areamessage["type"+usertype];
					}
				}
				tipButtonVal = "关闭";
			}
			alertText=templet.replace("$LastDay$",lastDayMessage);
		}
		
		
		if(usertype==4){
			acall=truename+" 同学您好：";
		}else if(usertype==0){
			acall=truename+" 您好：";
			try{
				parentAppGrant(result.studentGrantApps);//设置权限
			}catch(e){}
		}
		
		if(showmessage){
			AlertQuery.push({run:function(){
				art.dialog({
				icon:null,
				//设置内容与边界距离
				padding:0,
				title:acall,
				width:500,
				//提示内容
				content: "<div style=\"padding-left:15px;padding-right:15px\">"+alertText+"</div>",
				//开启锁屏
				lock:true,
				//锁屏遮罩透明度
				opacity: 0.2,
				ok: function () {
			      return true;
			    },
			    okVal:tipButtonVal,
			    button:button,
			    close:function(){
				  AlertQuery.shownext();
			      return true;
				}
				//cancelVal: '关闭',
			    //cancel: function(){},
				});
				//$("#alertmessage").html(acall);$("#alertshuaxin").html(amessage);$("#pop6").show();$("#mask").show();
			}});
		}
	})
}
//短信验证码处理(type0读取是否验证，1写入验证信息)
function getSendCodeType(type) {
	if(noalert){
		return;
	}
	//如果未得到手机号码也不做提示
	if(util.isBlank(phoneNumber)){
		return;
	}
	if(type==0){
		doVerify=0;
	//调用免费短信验证码查询接口
	util.getRemoteJson("SSO","SSO.209","&username="+username+"&doVerify="+doVerify+"&verifyPhone="+phoneNumber,function(result){
		if(vsms_day==0||$(result).attr("verifyDayBeforeToday")>=vsms_day){
			//家长、老师、学生、已绑定手机、切需要验证短信的
			if(phoneusertype.indexOf(usertype)>=0&&( $(result).attr("isNeedVerifyCode")==1 || vsms_day==0 ) ){
				var acall2="";
				var amsg2="";
				if(true){
					noCheckCountUsed = $(result).attr("noCheckCountUsed");
					phoneNumber = $(result).attr("verifyPhone");
					var diffCount = tempCodeCount-noCheckCountUsed;
					if(diffCount<0)diffCount=0;//避免小于零
					var showphoneNumber=phoneNumber;
					if(phoneNumber.length>9){
						showphoneNumber=phoneNumber.substring(0,3)+"*****"+phoneNumber.substring(8);
					}
					amsg2="<div><ul style='margin: 10px; text-align: left;'>验证码：(已发送至："+showphoneNumber+") &nbsp;<input name='vicode' id='vicode' style='border: 1px solid rgb(102, 102, 102); border-image: none; height: 20px;' type='text'>&nbsp;<a class='btn_pop2' id='geticode' href=\"javascript:;\" key='sms'><font color='#c2c2c2'>"+__intercount+"秒重新获取</font></a></ul></div>"
					//amsg2="<div><ul style='text-align:left;margin:10px;'><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;验证码：<input type='text' name='vicode' id='vicode' style='height:20px;border:#666 dashed 1px;'/> <a href=\"javascript:;\" class=\"btn_pop2\" key='sms' id='geticode'><font color='#c2c2c2'>60秒重新获取</font></a></b></ul></div> ";
					amsg2+="<div id='tempCodeDiv'><ul style='margin: 10px; text-align: left;'>1、点击<a class='btn_pop2' id='getTempCode' href=\"javascript:getTempPhoneCode("+diffCount+");\"><font color='blue'>获取临时验证码</font></a>系统会自动给您分配一个验证码，您本月还剩余<span id='showRestNum'><font color='red'>"+diffCount+"</font></span>次获取机会。<br>2、如遇问题请拨打客服电话：4006-371-319。</ul></div>";
					//amsg2+="<div id='tempCodeDiv'><ul style='text-align:left;margin:10px;'><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1：点击</b><a href=\"javascript:getTempPhoneCode("+diffCount+");\" class=\"btn_pop2\" id='getTempCode'><font color='blue'>获取临时验证码</font></a><b>系统会自动给您分配一个验证码，您本月还剩余<span id='showRestNum'><font color='red'>"+diffCount+"</font></span>次获取机会。</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2：如遇问题请拨打客服电话：4006-371-319。</b></ul></div>";
					amsg2+="<ul style='background: rgb(248, 248, 248); margin: 10px; padding: 5px; border: 1px dotted rgb(228, 228, 228); border-image: none; text-align: left; line-height: 20px;'>尊敬的用户，为了保证您的帐号安全，每天首次登录本系统时需要输入手机短信验证码，并确保手机处于正常状态。</ul>";
					//amsg2+="<ul style='text-align:left;margin:10px;'><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;尊敬的用户，为了保证您的帐号安全，每天首次登录本系统时需要输入手机短信验证码，并确保手机处于正常状态。</b></ul>";
					//加入提示
					AlertQuery.push({run:function(){
						art.dialog({
							id:'message',
							icon:'warning',
							//设置内容与边界距离
							padding:5,
							title:acall2,
							width:500,
							//提示内容
							content: amsg2,
							//开启锁屏
							lock:true,
							//锁屏遮罩透明度
							opacity: 0.2,
							ok: function () {
							  window.location.href=path+"/ssoLoginFail.jsp";
						      return true;
						    },
						    okVal:'退出',
						    button:[{name:'确定',callback:function(){checkicode();return false;}}],
						    close:function(){
							  window.location.href=path+"/ssoLoginFail.jsp";
						      return true;
							}
						});
						//$("#alertmessage").html(acall2);
						//$("#alertshuaxin").html(amsg2);
						//$("#pop6").show();
						//$("#mask").show();
						//临时验证码使用次数 $(result).attr("noCheckCountUsed"));
						//判断reqCode是否有值，如果有值了，就不用发送验证码了
						if(null!=$(result).attr("reqCode") && ""!=$(result).attr("reqCode") && "null"!=$(result).attr("reqCode")){
						///判断___icode是否为空，如果空，追加
							if (""==___icode || null==___icode || "null"==___icode){
								___icode = $(result).attr("reqCode");
							} else {
								___icode = ___icode+","+$(result).attr("reqCode");
							}
						} else {
							getphonevicode(1,$(result).attr("verifyPhone"),1);//发送验证码
						}
						//控制定时重发
						jsdingshi($(result).attr("verifyPhone"),1);
					}});
				}
			}
		}
	});
	} else {
	    doVerify=1;
	    //判断当前发送验证码的类型是短信还是临时验证码，如果是临时验证码，对noCheckCountUsed+1=noCheckCount加到参数中，如果是短信，则是原值noCheckCountUsed
		var noCheckCount = noCheckCountUsed;
		if(codeType=="temp"){
			noCheckCount = noCheckCount+1;
		}
		//调用短信验证码更新接口
		util.getRemoteJson("SSO","SSO.209","&username="+username+"&doVerify="+doVerify+"&noCheckCount="+noCheckCount+"&verifyPhone="+phoneNumber,function(result){
			
		});
	}
}

//手机绑定提示及有效期显示
function getBoundPhoneTip() {
	if(noalert){
		return;
	}
	util.getRemoteJson("SSO","SSO.205","username="+username+"&studentNumber="+studentname,function(result){
		//显示有效期
		try{
			if(result.eduCardEndDate && result.eduCardEndDate!="" && result.eduCardEndDate!=null){
				expDate=result.eduCardEndDate;
			}else{
				expDate="未知";
			}
		}catch(e){}
		//alerttype==1时提示
		if(alerttype!=1){
			return;
		}
		if($(result).attr("phoneActiveState")==0&&alerttype==1){
			var acall3="";
			var amsg3="";
			acall3="绑定提醒!";
			amsg3="你没有绑定手机，建议你绑定手机，这样就可以用手机号登录了";
			var button =[{name:'绑定手机',callback:function(){
				$("#iframe01").attr("src",protocol+sysconfig["TMS"]+interface_config["TMS.812"]);
				return true;
			}},{name:'关闭',callback:function(){return true;}}];
			if(usertype=="4"){ //学生
				amsg3="你的家长没有绑定手机，建议你的家长绑定手机，这样就可以用手机号登录了";
				button ={name:'关闭',callback:function(){
					return true;
				}};
			}
			AlertQuery.push({run:function(){
				art.dialog({
				icon:'warning',
				//设置内容与边界距离
				padding:5,
				title:acall3,
				width:500,
				//提示内容
				content: amsg3,
				//开启锁屏
				lock:true,
				//锁屏遮罩透明度
				opacity: 0.2,
			    button:button,
			    close:function(){
				  AlertQuery.shownext();
			      return true;
				}
				});
			}});
		}
	});
}

jQuery(function($){
	//页面加载后一些校验（未加入班级提示、班级收费提示、欠费订购提示、短信验证、手机绑定提示 、不同身份登录、其他地方登录提示）
	boxmessageshow();
});
//postMessage监听
if(typeof(window.postMessage)!= undefined){
	//IE8兼容模式不支持window.addEventListener及postMessage
	//百度对接
	try{
     window.addEventListener("message", messageHandler, true);
    }catch(e){}
	//实时监听滚动
    try{
	window.addEventListener("scroll",function(){
	    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	    if("undefined"!=typeof(document.getElementById("iframe01")) && null!=document.getElementById("iframe01")){
	    	document.getElementById("iframe01").contentWindow.postMessage({"type":"scrollTopValue","value":scrollTop},"*");
	    }
	},true);
	}catch(e){}
}

/** 接受postMessage消息 */
function messageHandler(e){
	if(e.origin.indexOf("baidu.com")>-1){
		var lth = Number(e.data);
		if(lth && lth!=NaN){
			$("#iframe01").css("height",lth+"px")
		}
	}else{
		if("undefined"!=typeof(e.data) && e.data!=null){
			jdata=e.data;
			if(util.isBlank(jdata.type)){
				return;
			}
			if("mainFrameHeight"==jdata.type){
				var h=Number(jdata.value);
				if(h && h!=NaN){
					$("#iframe01").css("height",h+"px");
				}
			}else if("scrollto"==jdata.type){
				
			}else if("changeMenuStyle"==jdata.type){
				
			}else if("mainFrameUrl"==jdata.type){
				
			}else if("changeMenu"==jdata.type && !util.isBlank(jdata.value)){
				if(_type4OtherConfig!="manage_index"){
					document.getElementById("menu_"+jdata.value.replaceAll(".","_")).click();
				}else{
					document.getElementById("lm"+jdata.value.replaceAll(".","_")).click();
				}
			}
		}
	}
}
function baiduEdu(url){
	var brow=$.browser;
	var ut = util.getCookie("ut");
	if(""==ut){
		return;
	}
	var tempurl = null;
	if(url.indexOf("?")>1){
		tempurl=url+"&ut="+ut;
	}else{
		tempurl=url+"?ut="+ut;
	}
	if(util.isBlank(sysconfig.SSO_PIP)){
		tempurl=tempurl+"&sso=http://"+sysconfig.SSO;
	}else{
		tempurl=tempurl+"&sso=http://"+sysconfig.SSO_PIP;
	}
	if(brow.msie && 9>=brow.version){
		window.open(tempurl);
	}else{
		$("#iframe01").attr("src",tempurl+"&portal=http://"+sysconfig.PORTAL);
	}
}

//3、判断该账号是否绑定多个家长账号和管理员账号，若存在则显示家长账号和管理员账号以供选择切换
function getMulteRole(temp,prependid,spacetype){//"<a href=\"~url~\">~role~</a>";
	var pnumber=phoneNumber;
	if(util.isBlank(pnumber)){
		pnumber=inputname;
	}
	
	var param = "q="+pnumber+"&loginName="+pnumber;
	var str = "";var url = "";
	var strCount = 0;

	var manage_url = "manage/webindex.action";
	var portal_url = "../webindex.action";
	if(usertype == 3 && "manage"==spacetype){ //3类型，管理员-教师切换(同一账号)
		str += temp.replaceAll("~url~",portal_url).replaceAll("~role~","教师空间");
	}else if(usertype == 3){
		str += temp.replaceAll("~url~",manage_url).replaceAll("~role~","管理员空间");
	}
	if(util.isBlank(pnumber)){
		$("#"+prependid).prepend(str);
	}else{
		util.getRemoteJson("SSO","SSO.203",param,function(result){
			if(result){
			  for(var i = 0;i<result.length;i++){
				    //过滤当前的账号
					if(result[i].userType == "parent" && result[i].username != username){
						url = protocol+sysconfig.SSO+interface_config["SSO.LOGIN"]+"?changeUsername="+result[i].username+"&gjpt="+getHost();
						str += temp.replaceAll("~url~",url).replaceAll("~role~",result[i].role);
						strCount++;
					}
					if(result[i].userType == "teacher" && result[i].username != username){
						url = protocol+sysconfig.SSO+interface_config["SSO.LOGIN"]+"?changeUsername="+result[i].username+"&gjpt="+getHost();
						str += temp.replaceAll("~url~",url).replaceAll("~role~",result[i].role+"老师");
						strCount++;
					}
			  }
			}
			
			$("#"+prependid).prepend(str);
		});
	}
}
/*单校上云校级门户入口*/
function schoolProtalLink(){
$.getJSON("vip/space/getspacebyusername.action?spaceType=0&oid="+schoolId+"&rond="+Math.round(Math.random()*10000),function(result){
	if("1"==result.succ){
		var startimg="";
		var ssname="";
                    if("3"==usertype){
                        startimg="style='color:#ecb700'";
                    }
                    if(schoolName.length>6){
                        ssname=schoolName.substring(0,5)+"..";
                    }else{
                        ssname=schoolName;
                    }
		$("#showSchool").html("<a target='_blank' href='vip/"+result.data.abbr+"' "+startimg+" title='"+schoolName+"'><i class='fa fa-home' style='font-size: 16px;'></i>"+ssname+"</a>");
	}
});
}
/*
针对新版备课客户端
6、区域和学校信息
为了保证区域更新功能正常执行，在教师登录账号时，请获取教师所在的区域及学校ID，并保存到本地。保存时可以调用DownOcx对象的WriteInfo方法，前两个参数为空字符串即可。
区域及学校ID 及保存示例如下所示：
*/
try{
if(window.IsVcomCef())
{

var strcode = "&areacode="+userAreaId+"&schoolcode="+schoolId;
	DownOcx.WriteInfo("","",strcode, strcode.length);
}
}catch(e){}