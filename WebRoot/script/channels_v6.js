
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
	var thisobj=$(this);
	if(thisobj.attr("opentype")=="5"){
		//js动态加载栏目
		eval($(thisobj).attr("src"));
	}
	var currentid=thisobj.attr("lmid");
	var url=null;
	
	if(thisobj.attr("opentype")=="6"){
		var lmchild=$("#"+currentid+" li");
		if(lmchild && lmchild.size()>0){
			for(var cli=0;cli<lmchild.length;cli++){
				var tlm=$(lmchild[cli]);
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
	}
}
//本地资源处理
function nav_bdzy(thisobj){
	var thislmid=thisobj.attr("lmid");//当前栏目id
	if(channelUtil.bdzy_init){
		var url=changechannelstyle(thislmid);
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
	//专为 fj莆田 start
	try{
		if("35.03"==userAreaId.substring(0,5)){
			var ptcode = '<li lmid="'+thislmid+'_011" src="" opentype="2">'+								
			'<a href="http://www.ptjy.com/cloud/index.html#src" target="_blank">莆田教育</a>'+
			'</li>';
			ptcode += '<li lmid="'+thislmid+'_012" src="" opentype="2">'+								
			'<a href="http://res.ptjy.com/jsp/tree/main.jsp?id=104" target="_blank">莆田资源</a>'+
			'</li>'
			sendhtml.push(ptcode);
		}
	}catch(e){}
	//专为 fj莆田 end
	//专为 sd寿光 start
	try{
		if("37.07.83"==userAreaId.substring(0,8)){
			var ptcode = '<li lmid="'+thislmid+'_013" src="" opentype="2">'+								
			'<a href="http://sg.kehou.com" target="_blank">本地名师</a>'+
			'</li>';
			sendhtml.push(ptcode);
		}
	}catch(e){}
	//专为 sd寿光 end
	//专为 sd阳谷 start
	//try{
	//if("37.15.21"==userAreaId.substring(0,8)){
	//	var ptcode = '<li lmid="11" src="" opentype="2">'+								
	//	'<a href="http://web.jingoal.com/mgt/index.jsp" target="_blank"><span>教研管理</span></a></li>';
	//	ptcode += '<li lmid="11" src="" opentype="2">'+								
	//	'<a href="http://172.23.127.90/" target="_blank"><span>课堂视频</span></a></li>';
	//	$("#bdzy_ul").append(ptcode);
	//}
	//}catch(e){}
	//专为 sd阳谷 end
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

//黑龙江全通本地资源--省级市级增加参数&hf=1
function hlyd_bdzy(thisobj){
	var thislmid=thisobj.attr("lmid");//当前栏目id
	if(channelUtil.bdzy_init){
		var url=changechannelstyle(thislmid);
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
	var nowareaId=null;
	//接口编号 学校PLS.200 地区的PLS.191
	var pdata="&schoolStage="+schoolStage+"&username="+username+"&studentId="+studentname+"&schoolId="+schoolId;
	//首个栏目是否加入分割符
	var firstSplit="";
	/*
	if(afterNode!=null){
		firstSplit="";
	}
	*/
	if(areaNameArrs.length>0 && areaIdArrs.length>0){
		for(var i=1;i<=areaIdArrs.length;i++){
			var name=areaNameArrs[i-1];
			if(nowareaId!=null){
				nowareaId=nowareaId+"."+areaIdArrs[i-1];
			}else{
				nowareaId=areaIdArrs[i-1];
			}
			//写入按钮
			sendhtml.push('<li lmid="'+thislmid+'_00'+(num+i)+'" src="'+protocol+sysconfig["PLS"]+interface_config["PLS.191"]+'&areaCode='+nowareaId+pdata+'&channelid='+thislmid+'_00'+(num+i)+'&hf=1&showSchoolMangerNav=0" opentype="1">'+firstSplit+'<a href="javascript:void(0)"  >'+name+'</a></li>');
			firstSplit="";
		}
	}else if( userAreaId!=null && areaName!=null ){
		//仅有省
		sendhtml.push('<li lmid="'+thislmid+'_002" src="'+protocol+sysconfig["PLS"]+interface_config["PLS.191"]+pdata+'&areaCode='+userAreaId+'&channelid='+thislmid+'_002&hf=1&showSchoolMangerNav=0" opentype="1">'+firstSplit+
				'<a href="javascript:void(0)" >'+areaName+'</a></li>');
	}
	//校级
	sendhtml.push('<li lmid="'+thislmid+'_001" src="'+protocol+sysconfig["PLS"]+interface_config["PLS.200"]+'&areaCode='+schoolId+pdata+'&channelid='+thislmid+'_001&showSchoolMangerNav=0" opentype="1">'+firstSplit+
				'<a href="javascript:void(0);" >'+schoolName+'</a></li>');
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

//汉阳微课
function nav_hywk(thisobj){
	var thislmid=thisobj.attr("lmid");//当前栏目id
	if(channelUtil.hywk_init){
		var url=changechannelstyle(thislmid);
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
	//地区拆分
	var areaNameArrs = areaName.split(".");
	var areaIdArrs = userAreaId.split(".");
	var sendhtml= new Array();
	var num = 1;
	var nowareaId=userAreaId;
	var firstSplit="";
	if(afterNode!=null){
		firstSplit=""
	}
	//接口编号 学校PLS.200 地区的PLS.191
	var pdata="&schoolStage="+schoolStage+"&username="+username+"&studentId="+studentname+"&schoolId="+schoolId;
	//校级
	sendhtml.push('<li lmid="'+thislmid+'_001" src="'+protocol+sysconfig["PLS"]+interface_config["PLS.200"]+'&areaCode='+schoolId+pdata+'&channelid='+thislmid+'_001&showSchoolMangerNav=0" opentype="1">'+firstSplit+
				'<a href="javascript:void(0);" >'+schoolName+'</a></li>');
	sendhtml.push('<li lmid="'+thislmid+'_002" src="'+protocol+sysconfig["PLS"]+interface_config["PLS.191"]+pdata+'&areaCode=42.01.05&channelid='+thislmid+'_002&showSchoolMangerNav=0" opentype="1"><a href="javascript:void(0);" >区域资源</a></li>');
	if(sendhtml.length>0){
		var htmlcode = sendhtml.join("");
		if(afterNode!=null){
			//如果有前置配置栏目，则在其后显示
			afterNode.after(htmlcode);
		}else if($("#"+thislmid).length > 0){
			//否则默认写入前端
			$("#"+thislmid).find("ul").prepend(htmlcode);
		}
		//针对新加入lmid=thislmid_00x的栏目，增加点击处理
		$("#"+thislmid+" li").each(function(){
			if($(this).attr("lmid").indexOf(thislmid+'_00')==0){
				$(this).click(menuclick);
			}
		});
	}
	channelUtil.hywk_init=true;
	var url=changechannelstyle(thislmid);
	channelGrantCheck(thislmid,url);
	$("#iframe01").attr("src",url);
}

//根据层次显示(校1，区2，市3，省4)本地资源,小于level资源,无level则不限制
function localResByLevel(thisobj,level){
	var thislmid=thisobj.attr("lmid");//当前栏目id
	if(channelUtil.hywk_init){
		var url=changechannelstyle(thislmid);
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
	var firstSplit="";
	if(afterNode!=null){
		firstSplit=""
	}
	//接口编号 学校PLS.200 地区的PLS.191
	var pdata="&schoolStage="+schoolStage+"&username="+username+"&studentId="+studentname+"&schoolId="+schoolId;
	//校级
	sendhtml.push('<li lmid="'+thislmid+'_001" src="'+protocol+sysconfig["PLS"]+interface_config["PLS.200"]+'&areaCode='+schoolId+pdata+'&channelid='+thislmid+'_001&showSchoolMangerNav=0" opentype="1">'+firstSplit+
				'<a href="javascript:void(0);" >'+schoolName+'</a></li>');
	if(areaNameArrs.length>0 && areaIdArrs.length>0){
		for(var i=1;i<=areaIdArrs.length;i++){
			var num = 1;
			//当大于限制级别层级时，跳出循环
			if( !util.isBlank(level) && ((num+i)>level) ){
				break;
			}
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
		//当大于限制级别层级时，跳出循环
		if( !util.isBlank(level) && ((num+1)<=level) ){
		//仅有省
		sendhtml.push('<li lmid="'+thislmid+'_002" src="'+protocol+sysconfig["PLS"]+interface_config["PLS.191"]+pdata+'&areaCode='+userAreaId+'&channelid='+thislmid+'_002&showSchoolMangerNav=0" opentype="1">'+firstSplit+							
				'<a href="javascript:void(0)" >'+areaName+'</a></li>');
		}
	}
	/**
	 * 特殊定制部分
	**/
	//专为 fj莆田 start
	try{
		if("35.03"==userAreaId.substring(0,5)){
			var ptcode = '<li lmid="'+thislmid+'_011" src="" opentype="2">'+								
			'<a href="http://www.ptjy.com/cloud/index.html#src" target="_blank">莆田教育</a>'+
			'</li>';
			ptcode += '<li lmid="'+thislmid+'_012" src="" opentype="2">'+								
			'<a href="http://res.ptjy.com/jsp/tree/main.jsp?id=104" target="_blank">莆田资源</a>'+
			'</li>'
			sendhtml.push(ptcode);
		}
	}catch(e){}
	//专为 fj莆田 end
	//专为 sd寿光 start
	try{
		if("37.07.83"==userAreaId.substring(0,8)){
			var ptcode = '<li lmid="'+thislmid+'_013" src="" opentype="2">'+								
			'<a href="http://sg.kehou.com" target="_blank">本地名师</a>'+
			'</li>';
			sendhtml.push(ptcode);
		}
	}catch(e){}
	//专为 sd寿光 end
	//专为 sd阳谷 start
	//try{
	//if("37.15.21"==userAreaId.substring(0,8)){
	//	var ptcode = '<li lmid="11" src="" opentype="2">'+								
	//	'<a href="http://web.jingoal.com/mgt/index.jsp" target="_blank"><span>教研管理</span></a></li>';
	//	ptcode += '<li lmid="11" src="" opentype="2">'+								
	//	'<a href="http://172.23.127.90/" target="_blank"><span>课堂视频</span></a></li>';
	//	$("#bdzy_ul").append(ptcode);
	//}
	//}catch(e){}
	//专为 sd阳谷 end
	if(sendhtml.length>0){
		var htmlcode = sendhtml.join("");
		if(afterNode!=null){
			//如果有前置配置栏目，则在其后显示
			afterNode.after(htmlcode);
		}else if($("#"+thislmid).length > 0){
			//否则默认写入前端
			$("#"+thislmid).find("ul").prepend(htmlcode);
		}
		//针对新加入lmid=thislmid_00x的栏目，增加点击处理
		$("#"+thislmid+" li").each(function(){
			if($(this).attr("lmid").indexOf(thislmid+'_00')==0){
				$(this).click(menuclick);
			}
		});
	}
	channelUtil.hywk_init=true;
	var url=changechannelstyle(thislmid);
	channelGrantCheck(thislmid,url);
	$("#iframe01").attr("src",url);
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
	if( !channelid || channelid.length==0 ){
		//channelid="";
		return;
	}
	channelid=channelid.replaceAll(".","_");
	var channelids=channelid.split("_");

	//当前选中栏目
	var thisobject = $("[lmid='"+channelid+"']");
	if(thisobject.attr("src").indexOf("defaultChannel=")>0){
		var spliteCode=thisobject.attr("src");
		spliteCode=spliteCode.substring(spliteCode.indexOf("defaultChannel=")+15,spliteCode.length);
		if(spliteCode.indexOf("&")>0){
			spliteCode=spliteCode.substring(0,spliteCode.indexOf("&"));
			if(spliteCode.indexOf(".")>0){
				channelid=spliteCode.replaceAll(".","_");
				channelids=spliteCode.split(".");
				thisobject = $("[lmid='"+spliteCode+"']");
			}
		}
	}
	//对应一级栏目
	var channel_first=$("[lmid='"+channelids[0]+"_"+channelids[1]+"']");
	
	if("4"==thisobject.attr("opentype") || "2"==thisobject.attr("opentype")){
		changeCss = false;
	}
	//设置一级栏目的选中状态
	if(channel_first){
		//移除选中
		if(changeCss){
			channel_first.siblings().each(function(){
				try{
					$(this).removeClass(lmCss1);
				}catch(e){
					
				}
			});
			//选中对应一级栏目
			channel_first.addClass(lmCss1);
			if(!("22_00"==channel_first.attr("lmid"))){
				$("#modeName").text(channel_first.text());
			}
		}
		//如果选中就是一级栏目则获取url
		if("5"!=thisobject.attr("opentype") && channelids.length==2 && "6"!=thisobject.attr("opentype")){
			url = thisobject.attr("src");
		}
	}
	//隐藏所有二级菜单的菜单层
	if(channelids[0] && changeCss){
		$("div[id^="+channelids[0]+"]").hide();
	}
	
	//当选中一级后,处理二级菜单选中状态及高度
	var lmidli2=$("#"+channelids[0]+"_"+channelids[1]+" li");
	if(lmidli2 && lmidli2.size()>0){
		var secLmId=null;
		//展示二级栏目菜单
		var childrenDiv =$("#"+channelids[0]+"_"+channelids[1]);
		$(".header").css("height",(channelUtil.headerheight+channelUtil.secmenuheight)+"px");
		childrenDiv.show();
		//当前传入为一级栏目则遍历其下级栏目，检查对应选中
		if(channelids.length==2){
			lmidli2.each(function(i){
				//防止第一个栏目不匹配，通过判断二级是否已设置，如果未设置，则向后匹配,设置后则其他非选中。
				if(secLmId==null){
					var purl=url;
					var turl=$(this).attr("src");
					//将一级栏目，二级栏目中的channelid部分移除，便于比较地址是否一致(防止将一级与二级无一致二级不做选中的二级栏目选中)
					if(purl!=null && turl!=null && url.indexOf("&channelid=")>-1 && $(this).attr("src").indexOf("&channelid=")>-1){
						 var purl=url.substring(0,url.indexOf("&channelid="));
						 var turl=$(this).attr("src").substring(0,$(this).attr("src").indexOf("&channelid="));
					}
					//如果一级栏目设置为默认下级，则判断opentype是否一致，地址是否一致，否则非选中
					if(thisobject.attr("opentype")=="6" && ($(this).attr("opentype")=="1" || $(this).attr("opentype")=="3")){
						if(changeCss){
							$(this).find("a").addClass(lmCss2);
						}
						url = $(this).attr("src");
						secLmId=$(this).attr("lmid");
					}else if(url==null || purl==turl){
						if(changeCss){
							$(this).find("a").addClass(lmCss2);
						}
						url = $(this).attr("src");
						secLmId=$(this).attr("lmid");
					}else{
						if(changeCss){
							$(this).find("a").removeClass(lmCss2);
						}
					}
				}else{
					if(changeCss){
						$(this).find("a").removeClass(lmCss2);
					}
				}
			});
		}else if(channelids.length>2){ //设置二级栏目的选中状态
			lmidli2.each(function(){
				if($(this).attr("lmid")==channelids[0]+"_"+channelids[1]+"_"+channelids[2]){ //是否为选中栏目
					if(changeCss){
						$(this).find("a").addClass(lmCss2);
					}
					url = $(this).attr("src");
					secLmId=$(this).attr("lmid");
				}else{
					if(changeCss){
						$(this).find("a").removeClass(lmCss2);
					}
				}
			});
		}
		
		//增加三级栏目部分
		if(secLmId!=null){
			var lmidli3=$("#"+secLmId+" li");
			if(lmidli3 && lmidli3.size()>0){
				//显示三级处理
				var childrenDiv =$("#"+secLmId);
				$(".header").css("height",(channelUtil.headerheight+channelUtil.secmenuheight)+"px");
				childrenDiv.show();
				//当前选中栏目在三级以上，检查三级是否选中
				if(channelids.length<4){
					var select=false;//标记是否选中到栏目
					lmidli3.each(function(i){
						if(!select){ //默认选中第一个栏目
							var purl=url;//上层传递来的url
							var turl=$(this).attr("src");
							//将一级栏目，二级栏目中的channelid部分移除，便于比较地址是否一致(防止将一级与二级无一致二级不做选中的二级栏目选中)
							if(purl!=null && turl!=null && url.indexOf("&channelid=")>-1 && $(this).attr("src").indexOf("&channelid=")>-1){
								 var purl=url.substring(0,url.indexOf("&channelid="));
								 var turl=$(this).attr("src").substring(0,$(this).attr("src").indexOf("&channelid="));
							}
							//如果上级栏目设置为默认下级，则判断opentype是否一致，地址是否一致，否则非选中
							var parentobj=$("[lmid='"+secLmId+"']");
							if(parentobj.attr("opentype")=="6" && ($(this).attr("opentype")=="1" || $(this).attr("opentype")=="3")){
								if(changeCss){
									$(this).find("a").addClass(lmCss2);
								}
								url = $(this).attr("src");
								secLmId=$(this).attr("lmid");
							}else if(url==null || purl==turl){
								if(changeCss){
									$(this).find("a").addClass(lmCss2);
								}
								url = $(this).attr("src");
								secLmId=$(this).attr("lmid");
							}else{
								if(changeCss){
									$(this).find("a").removeClass(lmCss2);
								}
							}
						}else{
							if(changeCss){
								$(this).find("a").removeClass(lmCss3);
							}
						}
					});
				}else{ //设置二级栏目的选中状态
					lmidli3.each(function(){
						if($(this).attr("lmid")==channelids[0]+"_"+channelids[1]+"_"+channelids[2]+"_"+channelids[3]){ //是否为选中栏目
							if(changeCss){
								$(this).find("a").addClass(lmCss3);
							}
							url = $(this).attr("src");
						}else{
							if(changeCss){
								$(this).find("a").removeClass(lmCss3);
							}
						}
					});
				}
			}
		}
	}else{
		//如果没有二级栏目则隐藏二级栏目显示层
		//$(".header").animate({height:"162px"});
		$(".header").css("height",channelUtil.headerheight+"px");
	}
	channelUtil.currentChannelid=channelid;
	return url;
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
		for(var i=0;i<menuList.length;i++){
			var tf=menuList[i];
			//教师不限制学段？
			//eduAndGrade  IndexAction定义 组装匹配 -- “学制|年级” 比对串
			if("2"==usertype || "3"==usertype || tf.c2==null || tf.c2.trim().length==0 || tf.c2.indexOf(eduAndGrade)>-1){
				firstChannelSize++;
				if(firstChannelSize>more_size){
					moreCode.push(channelUtil.templetParse(tf,firstChannelTemplet));
				}else{
					if(firstChannelSize>1){
						firstChannelCode.push(spliteCode);
					}
					firstChannelCode.push(channelUtil.templetParse(tf,firstChannelTemplet));
				}
			}
		}
		if(moreCode.length>0){
			//一级栏目末尾增加分割符
			firstChannelCode.push(spliteCode);
			//展示更多
			$("#moreFirstChannelContent").prepend(moreCode.join(""));
			$("#moreFirstChannel").show();
		}else{
			//避免重叠栏目，一级栏目右间距70
			$(".xy_nav").css("padding-right","0");
		}
		$("#menu").html(firstChannelCode.join("")+$("#menu").html());
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
	
	//首页一级栏目点击处理事件
	$("#menu a").click(menuclick);
	//首页二级栏目点击处理事件
	$(".tb-nav-wrap li").click(menuclick);
	//首页三级栏目点击处理事件
	$(".s1-nav li").click(menuclick);
	$("[lmid='22-01']").click();
	/*$("#22_04").show();
	$("[lmid='22_04_01'] a").addClass("cur");*/
});