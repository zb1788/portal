
var channelUtil={
bdzy_init:false,
hywk_init:false,
currentChannelid:null,
secmenuheight:50,
headerheight:125,
filterUrl:null,
//特殊处理控制标志
specialset:[{"specialFn":"channelUtil.specialLink('22_01')"}]
};

//根据栏目模板组装栏目代码
channelUtil.templetParse=function(menuobj,templet){
	if(typeof(templet)!="undefined" && templet && templet!=null){
		var url=menuobj.href;
		var menuid=menuobj.id.replaceAll("_",".");
		var cookieid="";
		//1默认 ,2 内部系统打开方式加入channelid,cookieid,regFlg
		if(menuobj.opentype!="3" && menuobj.opentype!="4" && menuobj.opentype!="5" && menuobj.opentype!="6"){
			if(url.indexOf("?")>0){
				url=url+"&";
			}else{
				url=url+"?";
			}
			url=url+"channelid="+menuid+"&cookieid="+cookieid+"&regFlg="+regFlg;
		}
		templet=templet.replaceAll("{{id}}",menuobj.id).replaceAll("{{link}}",url).replaceAll("{{type}}",menuobj.opentype).replaceAll("{{text}}",menuobj.text);
		return templet;
	}else{
		return "";
	}
}

//备课显示授课预览特殊处理
channelUtil.specialLink=function(code){
	$("#"+code+" .tb-nav").append('<span class="fr"> <a id="menu_22_01_199" opentype="5" lmid="22_01_199" src="channelUtil.specialNetDisk()" style="cursor:pointer" onclick="channelUtil.specialNetDisk()"> <i class="icon-yp"></i>教学云盘</a> | <a style="cursor:pointer" onclick="util.openIcode(\'PLS.TEACHREVIEW\')" ><i class="icon-yl"></i>授课预览</a><a title="客户端下载" style="cursor:pointer" onclick="util.openIcode(\'CMS.SETUPFILE\');"><i class="icon-duan"></i></a></span>');
}
//特殊-教学云盘打开
channelUtil.specialNetDisk=function(){
	$(".tb-nav-wrap li a").removeClass("cur");
	$(".s1-nav li a").removeClass("cur");
	util.openInFrame("PLS.NETDISK");
}

//检查栏目鉴权
function channelGrantCheck(channelid,turl){
	var content = null;
	if(util.isBlank(GrantTip)){
		content="很遗憾，本业务您未订购或订购已过期！暂不能进行正常访问。";
	}else{
		content=GrantTip;
	}
	try{
		if(util.grantChecker("channel",channelid)){
			$("#belowdiv").show();
			$("#grantAltContent").html(content);
			$("#grantAltdiv").css("left",(document.body.clientWidth/2-235)+"px");
			$("#grantAltdiv").show();
			channelUtil.filterUrl=turl;
		}else{
			$("#belowdiv").hide();
			$("#grantAltdiv").hide();
		}
	}catch(e){
		$("#belowdiv").hide();
		$("#grantAltdiv").hide();
	}
}
//供非栏目点击，取消所有栏目选中
function changeLm(nurl){
	//隐藏二级栏目
	$(".tb-nav-wrap").hide();
	//隐藏3级栏目
	$(".s1-nav").hide();
	//$(".reading_menu").hide();
	//取消一级栏目选中
	$("#menu a").removeClass("sel");
}

function menuclick(){
	//清除所有选中
	// $('#mainMenu li.tnNav-item').removeClass('layui-this');
	// $('#mainMenu li.tnNav-item a').removeClass('ch-this');
	// $('#mainMenu li.tnNav-item a').removeClass('cur');

	var thisobj=$(this);
	if(thisobj.attr("opentype")=="5"){
		//js动态加载栏目
		eval($(thisobj).attr("src"));
	}
	var currentid=thisobj.attr("lmid");
	var curlevel = thisobj.attr("lmlevel");
	var url=null;





	if(thisobj.attr("opentype")=="6"){
        var lmchild=$("#menu_"+currentid).next('dl').children('dd');
	    if(curlevel == 1){
            lmchild=$("#menu_"+currentid).next('dl').children('dd');
        }else{
            lmchild=$("#menu_"+currentid).parent().next('p').children('a');
        }

		if(lmchild && lmchild.size()>0){
			for(var cli=0;cli<lmchild.length;cli++){
				var tlm=$(lmchild[cli]);
				if(curlevel == 1){
                    tlm = tlm.find("a");
                }
				if(tlm.attr("opentype")=="6" || tlm.attr("opentype")=="1" || tlm.attr("opentype")=="3"){
					tlm.click();
					return;
				}
			}
		}
	}
	//判断url是否有defaultChannel参数，若无defaultChannel则默认选中二级栏目第一个幷跳转链接，若有且值为空则跳转链接不处理首选幷跳转链接，若不为空则默认选中defaultChannel值的二级栏目幷跳转链接
	var param = util.getRequest(thisobj.attr("src"));
	var defaultChannel = param["defaultChannel"];
	if(typeof(defaultChannel)!= "undefined" && defaultChannel != null && defaultChannel!=""){
		//url = changechannelstyle(defaultChannel);//传递default
		var thisobject = $("[lmid='"+defaultChannel.replaceAll(".","_")+"']");
		thisobject.click();
		return;
	}else{
		url = changechannelstyle(currentid);
		// if(curlevel == 1){
		// 	//点击的第一级（找是否有第二级）
		// 	if(thisobj.next("dl").length>0){
		// 		//有第二级
		// 		if(thisobj.next("dl").children("dd").eq(0).find("p").length > 0){
		// 			//有第三级
		// 			url = thisobj.next("dl").children("dd").eq(0).find("p").find("a").eq(0).attr("src");
		// 			thisobj.next("dl").children("dd").eq(0).find("p").find("a").eq(0).addClass("cur");
		// 		}else{
		// 			url = thisobj.next("dl").children("dd").eq(0).find("a").attr("src");
		// 		}
		// 		thisobj.next("dl").children("dd").eq(0).find("a").addClass("ch-this");
		// 	}else{
		// 		url = thisobj.attr("src");
		// 	}
		// 	thisobj.parent('li').addClass("layui-this");
		// }else if(curlevel == 2){
		// 	//点击的第二级（找是否有第三级）
		// 	if(thisobj.parent('h3').next('p').length > 0){
		// 		//有第三级
		// 		url = thisobj.parent('h3').next('p').find("a").eq(0).attr("src");
		// 		thisobj.parent('h3').next('p').find("a").eq(0).addClass("cur");
		// 		thisobj.addClass("ch-this");
		// 	}else{
		// 		url = thisobj.attr("src");
		// 		thisobj.addClass("ch-this");
		// 	}
		// 	thisobj.parent('h3').parent('dd').parent('dl').parent('li').addClass('layui-this');
		// }else if(curlevel == 3){
		// 	url = thisobj.attr("src");
		// 	thisobj.addClass("cur");
		// 	thisobj.parent('p').prev('h3').children('a').addClass("ch-this");
		// 	thisobj.parent('p').parent('dd').parent('dl').parent('li').addClass('layui-this');
		// }
	}
	//处理不同类型打开
	if(thisobj.attr("opentype")=="2" || thisobj.attr("opentype")=="4"){
		if(util.grantChecker("channel",currentid)){
			grantAlert();
		}else{
			if(thisobj.attr("opentype")=="2" && url!=null && url.length>3 && url.substring(0,2)=="//"){
				url=protocol+url.substring(2);
			}
			window.open(url);
		}
	}else if(thisobj.attr("opentype")!="5"){
		channelGrantCheck(currentid,url);
		$("#iframe01").attr("src",url);
	}else if(thisobj.attr("opentype")=="5" && currentid == "22_17"){
		//本地资源特殊处理
		channelGrantCheck(currentid,url);
		$("#iframe01").attr("src",url);
	}
}

function nav_bdzy(thisobj){
	//var thislmid=thisobj.attr("lmid");//当前栏目id
}

//本地资源处理
function nav_bdzy_old(thisobj){
	var thislmid=thisobj.attr("lmid");//当前栏目id
	if(channelUtil.bdzy_init){
		//var url=changechannelstyle(thislmid);
		var url=thislmid.next('dl').children('dd').eq(0).find('a').attr('url');
		channelGrantCheck(thislmid,url);
		$("#iframe01").attr("src",url);
		return;
	}
	var exitLmArr=$("#"+thislmid+" li");//子栏目数组
	var afterNode=null;
	if(exitLmArr && exitLmArr!=null && exitLmArr.length>0){
		for(var index=0;index<exitLmArr.length;index++){
			var firstNode=exitLmArr[index];
			var nodelId=Number($(firstNode).attr("lmid").replace(thislmid+"_",""));
			//当配置栏目尾数id小于5时，排列在动态栏目前
			if(nodelId<=5){
				afterNode=$(firstNode);
			}
		}
	}
	//当没有对应二级div时，从查找其他栏目复制，创建一个空的对应二级div
	if($("#"+thislmid).length==0){
		var lmlist=$(thisobj).siblings();//$("[lmid='22_17']").siblings();
		var stopflag=false;
		lmlist.each(function(){
			if(stopflag){return;}
			if($("#"+$(this).attr("lmid")).length>0){
		      $("#"+$(this).attr("lmid")).after($("#"+$(this).attr("lmid")).clone(true).attr("id",thislmid));
		      $("#"+thislmid).find(".s-nav ul").html("");
		      stopflag=true;
		    }
		});
	}

	//地区拆分
	var areaNameArrs = areaName.split(".");
	var areaIdArrs = userAreaId.split(".");
	var sendhtml= new Array();
	var num = 1;
	var nowareaId=userAreaId;
	//接口编号 学校PLS.200 地区的PLS.191
	var pdata="&schoolStage="+schoolStage+"&username="+username+"&studentId="+studentname+"&schoolId="+schoolId;
	//首个栏目是否加入分割符
	var firstSplit="";
	/*if(afterNode!=null){
		firstSplit="<span>|</span>"
	}*/
	//显示本地资源页面内顶部栏目导航&showSchoolMangerNav=0
	//校级
	sendhtml.push('<li lmid="'+thislmid+'_001" src="'+protocol+sysconfig["PLS"]+interface_config["PLS.200"]+'&areaCode='+schoolId+pdata+'&channelid='+thislmid+'_001&showSchoolMangerNav=0" opentype="1">'+firstSplit+
				'<a href="javascript:void(0);" >'+schoolName+'</a></li>');
	if(areaNameArrs.length>0 && areaIdArrs.length>0){
		for(var i=1;i<=areaIdArrs.length;i++){
			var num = 1;
			//areaNameArrs本身是省,市,区
			//反序从小到大
			var name=areaNameArrs[areaIdArrs.length-i];
			//写入按钮
			sendhtml.push('<li lmid="'+thislmid+'_00'+(num+i)+'" src="'+protocol+sysconfig["PLS"]+interface_config["PLS.191"]+'&areaCode='+nowareaId+pdata+'&channelid='+thislmid+'_00'+(num+i)+'&showSchoolMangerNav=0" opentype="1"><a href="javascript:void(0)"  >'+name+'</a></li>');
			//地区逐个按.削减，地区从小到大
			if(nowareaId.indexOf(".")>0){
				var endnum = nowareaId.lastIndexOf(".");
				nowareaId = nowareaId.substring(0,endnum);
			}
		}
	}else if( userAreaId!=null && areaName!=null ){
		//仅有省
		sendhtml.push('<li lmid="'+thislmid+'_002" src="'+protocol+sysconfig["PLS"]+interface_config["PLS.191"]+pdata+'&areaCode='+userAreaId+'&channelid='+thislmid+'_002&showSchoolMangerNav=0" opentype="1">'+firstSplit+							
				'<a href="javascript:void(0)" >'+areaName+'</a></li>');
	}

	if(sendhtml.length>0){
		var htmlcode = sendhtml.join("");
		if(afterNode!=null){
			//如果有前置配置栏目，则在其后显示
			afterNode.after(htmlcode);
			//针对新加入lmid=thislmid_00x的栏目，增加点击处理
			$("#"+thislmid+" li").each(function(){
				if($(this).attr("lmid").indexOf(thislmid+'_00')==0){
					$(this).click(menuclick);
				}
			});
		}else if($("#"+thislmid).length > 0){
			//否则默认写入前端
			$("#"+thislmid).find("ul").prepend(htmlcode);
			//针对新加入lmid=thislmid_00x的栏目，增加点击处理
			$("#"+thislmid+" li").each(function(){
				if($(this).attr("lmid").indexOf(thislmid+'_00')==0){
					$(this).click(menuclick);
				}
			});
		}else{
			//已经由上代码创建div，不应进入此处
		}
	}
	channelUtil.bdzy_init=true;
	var url=changechannelstyle(thislmid);
	channelGrantCheck(thislmid,url);
	$("#iframe01").attr("src",url);
}

function clearMenuCur(){
	$('#mainMenu li.tnNav-item').removeClass('layui-this');
	$('#mainMenu li.tnNav-item a').removeClass('ch-this');
	$('#mainMenu li.tnNav-item a').removeClass('cur');
}

//lmid=channelid的是二级栏目，id=channelid的是对应2级栏目的子栏目菜单
//180802增加对三级栏目支持
//180815增加default默认下级第一个栏目(后续需要考虑处理一级以外5，下级第一个非opentype1的情况)
function changechannelstyle(channelid){
	var url = null;
	var lmCss1 = "sel";//一级栏目选中样式
	var lmCss2 = "cur";//二级栏目选中样式
	var lmCss3 = "cur";//二级栏目选中样式
	var changeCss = true;
	var defaultSelVal = "default";

	var thisobj = $('#menu_'+channelid);
	var curlevel = thisobj.attr('lmlevel');
	var opentype = thisobj.attr('opentype');
	var begHtml = "当前位置：<a lmid='22_00'>首页</a> > ";
	var firHtml = '';
	var firLmId = '';
	var secHtml = '';//二级栏目名称
	var secLmId = '';
	var thirdHtml = '';//三级栏目名称
	var thirdLmId = '';

	var ischangeCur = true;

	if(curlevel == 1){
		//点击的第一级（找是否有第二级）
		if(thisobj.next("dl").length>0){
			//有第二级
			firHtml = thisobj.html();
			firLmId = thisobj.attr('lmid');
			secHtml = thisobj.next("dl").children("dd").eq(0).children('h3').children('a').html();
			secLmId = thisobj.next("dl").children("dd").eq(0).children('h3').children('a').attr('lmid');
			if(thisobj.next("dl").children("dd").eq(0).find("p").length > 0){
				//有第三级
				thirdHtml = thisobj.next("dl").children("dd").eq(0).find("p").find("a").eq(0).html();
				thirdLmId = thisobj.next("dl").children("dd").eq(0).find("p").find("a").eq(0).attr('lmid');
				url = thisobj.next("dl").children("dd").eq(0).find("p").find("a").eq(0).attr("src");

				opentype = thisobj.next("dl").children("dd").eq(0).find("p").find("a").eq(0).attr("opentype");

				if(opentype == 2){
					ischangeCur = false;
				}else{
					clearMenuCur();
					thisobj.next("dl").children("dd").eq(0).find("p").find("a").eq(0).addClass("cur");
					thisobj.next("dl").children("dd").eq(0).find("a").addClass("ch-this");
					thisobj.parent('li').addClass("layui-this");
				}
			}else{
				url = thisobj.next("dl").children("dd").eq(0).find("a").attr("src");
				opentype = thisobj.next("dl").children("dd").eq(0).find("a").attr("opentype");

				if(opentype == 2){
					ischangeCur = false;
				}else{
					clearMenuCur();
					thisobj.next("dl").children("dd").eq(0).find("a").addClass("ch-this");
					thisobj.parent('li').addClass("layui-this");
				}
			}
		}else{
			url = thisobj.attr("src");
			if(opentype == 2){
				ischangeCur = false;
			}else{
				clearMenuCur();
				thisobj.parent('li').addClass("layui-this");
				thisobj.addClass("ch-this");
			}
		}
	}else if(curlevel == 2){
		//点击的第二级（找是否有第三级）
		firHtml = thisobj.parent('h3').parent('dd').parent('dl').prev('a').html();
		firLmId = thisobj.parent('h3').parent('dd').parent('dl').prev('a').attr('lmid');
		secHtml = thisobj.html();
		secLmId = thisobj.attr('lmid');
		if(thisobj.parent('h3').next('p').length > 0){
			//有第三级
			thirdHtml = thisobj.parent('h3').next('p').find("a").eq(0).html();
			thirdLmId = thisobj.parent('h3').next('p').find("a").eq(0).attr("lmid");
			url = thisobj.parent('h3').next('p').find("a").eq(0).attr("src");

			opentype = thisobj.parent('h3').next('p').find("a").eq(0).attr("opentype");
			if(opentype == 2){
				ischangeCur = false;
			}else{
				clearMenuCur();
				thisobj.parent('h3').next('p').find("a").eq(0).addClass("cur");
				thisobj.addClass("ch-this");
				thisobj.parent('h3').parent('dd').parent('dl').parent('li').addClass('layui-this');
			}
		}else{
			url = thisobj.attr("src");
			if(opentype == 2){
				ischangeCur = false;
			}else{
				clearMenuCur();
				thisobj.addClass("ch-this");
				thisobj.parent('h3').parent('dd').parent('dl').parent('li').addClass('layui-this');
			}
		}
	}else if(curlevel == 3){
		firHtml = thisobj.parent('p').parent('dd').parent('dl').prev('a').html();
		firLmId = thisobj.parent('p').parent('dd').parent('dl').prev('a').attr('lmid');
		secHtml = thisobj.parent('p').prev('h3').children('a').html();
		secLmId = thisobj.parent('p').prev('h3').children('a').attr('lmid');
		thirdHtml = thisobj.html();
		thirdLmId = thisobj.attr('lmid');
		url = thisobj.attr("src");

		if(opentype == 2){
			ischangeCur = false;
		}else{
			clearMenuCur();
			thisobj.addClass("cur");
			thisobj.parent('p').prev('h3').children('a').addClass("ch-this");
			thisobj.parent('p').parent('dd').parent('dl').parent('li').addClass('layui-this');
		}
	}


	if(ischangeCur){
		var currentPosHtml = '';
		var showFlag = false;
		if(thirdHtml == ''){
			if(secHtml != ''){
				currentPosHtml = begHtml+'<a lmid="'+firLmId+'">'+firHtml+'</a> > '+secHtml;
				showFlag = true;
			}
		}else{
			currentPosHtml = begHtml + '<a lmid="'+firLmId+'">'+firHtml+'</a> > '+'<a lmid="'+secLmId+'">'+secHtml+'</a> > '+thirdHtml;
			showFlag = true;
		}
		$('#currentPos').html(currentPosHtml);
		if(showFlag){
			$('#currentPos').show();
		}else{
			$('#currentPos').hide();
		}
	}


	channelUtil.currentChannelid=channelid;
	return url;
}

function parseChannelObj(menuobj){
	var url=menuobj.href;
	var menuid=menuobj.id.replaceAll("_",".");
	var cookieid="";
	//1默认 ,2 内部系统打开方式加入channelid,cookieid,regFlg
	if(menuobj.opentype!="3" && menuobj.opentype!="4" && menuobj.opentype!="5" && menuobj.opentype!="6"){
		if(url.indexOf("?")>0){
			url=url+"&";
		}else{
			url=url+"?";
		}
		url=url+"channelid="+menuid+"&cookieid="+cookieid+"&regFlg="+regFlg;
	}

	var result = {};
	result.id = menuobj.id;
	result.menuid = menuid;
	result.url = url;
	result.opentype = menuobj.opentype;
	result.text = menuobj.text;
	result.children = menuobj.children;
	return result;
}

jQuery(function($){
	//栏目展示
	if(typeof(menuList)!="undefined" && menuList && menuList!=null){
		var firstChannelTemplet="<a lmid='{{id}}' id='menu_{{id}}' src='{{link}}' style='cursor:pointer' opentype='{{type}}' >{{text}}</a> ";
		var spliteCode="/";
		var firstChannelCode = new Array();
		var moreCode = new Array();
		var more_size=10;//一级栏目默认位置可放置栏目数
		var firstChannelSize = 0;
		// for(var i=0;i<menuList.length;i++){
		// 	var tf=menuList[i];
		// 	//教师不限制学段？
		// 	//eduAndGrade  IndexAction定义 组装匹配 -- “学制|年级” 比对串
		// 	if("2"==usertype || "3"==usertype || tf.c2==null || tf.c2.trim().length==0 || tf.c2.indexOf(eduAndGrade)>-1){
		// 		firstChannelSize++;
		// 		if(firstChannelSize>more_size){
		// 			moreCode.push(channelUtil.templetParse(tf,firstChannelTemplet));
		// 		}else{
		// 			if(firstChannelSize>1){
		// 				firstChannelCode.push(spliteCode);
		// 			}
		// 			firstChannelCode.push(channelUtil.templetParse(tf,firstChannelTemplet));
		// 		}
		// 	}
		// }
		// if(moreCode.length>0){
		// 	//一级栏目末尾增加分割符
		// 	firstChannelCode.push(spliteCode);
		// 	//展示更多
		// 	$("#moreFirstChannelContent").prepend(moreCode.join(""));
		// 	$("#moreFirstChannel").show();
		// }else{
		// 	//避免重叠栏目，一级栏目右间距70
		// 	$(".xy_nav").css("padding-right","0");
		// }
		// $("#menu").html(firstChannelCode.join("")+$("#menu").html());


		var menuArr = new Array();
		for(var i=0;i<menuList.length;i++){
			var tf=menuList[i];
			if(tf.id == "22_17"){
				//本地资源，提前把栏目处理好
				//先获取本地资源的个性栏目
				//地区拆分
				var areaNameArrs = areaName.split(".").reverse();
				var areaIdArrs = userAreaId.split(".").reverse();
				var sendhtml= new Array();
				var num = 1;
				var nowareaId=userAreaId;
				//接口编号 学校PLS.200 地区的PLS.191
				var pdata="&schoolStage="+schoolStage+"&username="+username+"&studentId="+studentname+"&schoolId="+schoolId;
				var bdzyArr = new Array();
				var schoolSrc = protocol+sysconfig["PLS"]+interface_config["PLS.200"]+'&areaCode='+schoolId+pdata+'&channelid='+tf.id+'_001&showSchoolMangerNav=0';
				bdzyArr.push({"c2":"","c3":"","c4":"","href":schoolSrc,"icon":"","icon2":"","id":tf.id+"_001","leaf":false,"opentype":"1","parentid":"","children":[],text:schoolName})

				if(areaNameArrs.length>0 && areaIdArrs.length>0){
					for(var k=0;k<areaIdArrs.length;k++){
						var tmpSrc = protocol+sysconfig["PLS"]+interface_config["PLS.191"]+'&areaCode='+nowareaId+pdata+'&channelid='+tf.id+'_00'+(k+2)+'&showSchoolMangerNav=0';
						bdzyArr.push({"c2":"","c3":"","c4":"","href":tmpSrc,"icon":"","icon2":"","id":tf.id+"_00"+(k+2),"leaf":false,"opentype":"1","parentid":"","children":[],text:areaNameArrs[k]});
						if(nowareaId.indexOf(".")>0){
							var endnum = nowareaId.lastIndexOf(".");
							nowareaId = nowareaId.substring(0,endnum);
						}
					}
				}else{
					//只有省级
					var tmpSrc = protocol+sysconfig["PLS"]+interface_config["PLS.191"]+pdata+'&areaCode='+userAreaId+'&channelid='+tf.id+'_002&showSchoolMangerNav=0';
					bdzyArr.push({"c2":"","c3":"","c4":"","href":tmpSrc,"icon":"","icon2":"","id":tf.id+"_002","leaf":false,"opentype":"1","parentid":"",text:areaName});
				}

				var obj = tf;
				var baseArr = tf.children;
				tf.children = [];
				var insertNum = 0;
				for(var j=0;j<baseArr.length;j++){
					var tj = baseArr[j];
					var curnum = tj.id.replace(tf.id+"_","")*1;
					if(curnum <= 5){
						insertNum = j;
					}
				}

				var beforeArr = baseArr.splice(0,insertNum+1);
				var afterArr = baseArr.splice(insertNum);

				var tarArr = beforeArr.concat(bdzyArr).concat(afterArr);
				console.log(tarArr);
				obj.children = tarArr;
				menuArr.push(obj);
			}else{
				menuArr.push(tf);
			}
		}


		var channelHtml = '';
		for(var i=0;i<menuList.length;i++){
			var tf=menuList[i];

			var channelItem = parseChannelObj(tf);
			if(i ==0){
				channelHtml += '<li class="tnNav-item layui-this">';
			}else{
				if(i>9){
					channelHtml += '<li class="tnNav-item" style="display:none;">';
				}else{
					channelHtml += '<li class="tnNav-item">';
				}
			}
			channelHtml += '<a lmlevel="1" lmid="'+channelItem.id+'" id="menu_'+channelItem.id+'" src="'+channelItem.url+'" opentype="'+channelItem.opentype+'"  class="tOne" style="cursor: pointer;">'+channelItem.text;
			if(channelItem.children.length > 0){
				channelHtml += '<span class="tnNav-more"></span>';
			}
			channelHtml += '</a>';
			//二级栏目循环
			if(channelItem.children.length > 0){
				channelHtml += '<dl class="tnNav-child">';
				for(var j=0;j<channelItem.children.length;j++){
					var secChannelObj = channelItem.children[j];
					var secChannelItem = parseChannelObj(secChannelObj);
					channelHtml += '<dd><h3><a lmlevel="2" lmid="'+secChannelItem.id+'" id="menu_'+secChannelItem.id+'" src="'+secChannelItem.url+'" opentype="'+secChannelItem.opentype+'" style="cursor: pointer;">'+secChannelItem.text+'</a></h3>';
					if(secChannelItem.children.length > 0){
						//三级栏目循环
						channelHtml += '<p class="tnNav-child-child">';
						for(var k=0;k<secChannelItem.children.length;k++){
							var thirdChannelItem = parseChannelObj(secChannelItem.children[k]);
							channelHtml += '<a lmlevel="3" lmid="'+thirdChannelItem.id+'" id="menu_'+thirdChannelItem.id+'" src="'+thirdChannelItem.url+'" opentype="'+thirdChannelItem.opentype+'" style="cursor: pointer;">'+thirdChannelItem.text+'</a>';
						}
						channelHtml += '</p>';
					}
					channelHtml += '</dd>';
				}
				channelHtml += '</dl>';
			}
			channelHtml += '</li>';
		}
		$('#mainMenu').html(channelHtml);
	}
	
	//特殊展示处理
	if(channelUtil.specialset && channelUtil.specialset.length>0){
		for(var i=0;i<channelUtil.specialset.length;i++){
			var tspecialset=channelUtil.specialset[i];
			if(tspecialset.specialFn){
				eval(tspecialset.specialFn);
			}
		}
	}

	$('li.tnNav-item').hover(function () {
		var b = $(this).children('a').has('span.tnNav-more');
		if(b.length > 0){
			$('#mainMenu dl').hide();
			$(this).children('dl').show();
		}
	},function(){
		$('#mainMenu dl').hide();
	})
	
	//首页一级栏目点击处理事件
	$("#mainMenu a").click(menuclick);
	//首页二级栏目点击处理事件
	// $(".tb-nav-wrap li").click(menuclick);
	//首页三级栏目点击处理事件
	// $(".s1-nav li").click(menuclick);
	// $("[lmid='22-01']").click();
	/*$("#22_04").show();
	$("[lmid='22_04_01'] a").addClass("cur");*/
});