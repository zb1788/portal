var xylogin =new xyloginObj();
function xyloginObj(){};

function xyItemListSelect(data) {
	var _list = "";
	$.each(data, function (i, v) {
		_list += '<li><a href="' + v["item_url"] + '" target="_blank">' + v["item_title"] + '</a></li>';
	});
	$("#jyzxList").html(_list);
}

	
//名校特效
function mx_ys(){
	$(".s_con > ul > li > a").hover(function(){
			$(this).children("span").animate( { height: "100%"}, 400);
			$(this).children("span").children("font").show(50);
		},function(){
			$(this).children("span").animate( { height: "25px"}, 400);
		}
	);
}
//名师名校长特效
function msmxz_ys(){
	$(".ms_list > li > a").hover(function(){
			$(this).next(".ms_tips").fadeIn(400);
			$(this).parent().css('z-index','100');
			$(this).parent().siblings().css('opacity','.5');
		},function(){
			$(this).next(".ms_tips").fadeOut(50);
			$(this).parent().css('z-index','3');
			$(this).parent().siblings().css('opacity','1');
		}
	);
}

//String加入replaceAll
String.prototype.replaceAll = function(AFindText,ARepText){
  //不能return this,会出现异常
  var temp=this.replace(AFindText,ARepText);
  while(temp.indexOf(AFindText)>=0){
  	temp=temp.replace(AFindText,ARepText);
  }
  return temp;
}

//获取焦点图信息，幷在页面展示
xyloginObj.prototype.getLoginfocusImg=function(icode){
	var temp_tp = "<li id=\"~liid~\" style=\"display: block;\"><a target=\"~target~\" id=\"~aid~\" href=\"~href~\"><span id=\"~spid~\" style=\"background:url(~pic~) no-repeat center center\"></span></a></li>";
	var temp_an = "<div class=\"~sel~\" id=\"~did~\" onclick=\"changeflash(~num~)\"></div>";
	util.getCMSData(icode,10,true,function(data){
		var counter_tp = "";
		var counter_an = "";
		numbers = data.length;
		for(var i=0;i<data.length;i++){
			//图片
			var liid = "flash"+(i+1);
			var aid = "bga"+(i+1);
			var spid = "bg"+(i+1);
			//按钮
			var did = "f"+(i+1);
			var num = i+1;
			var sel = "";
			if(i==0){
				sel = "dq";
			}else{
				sel = "no";
			}
			var tdata = data[i];
			var pic = tdata.pic;
			var target = "_blank";
			var url=tdata.url;
			if(url == "#"){
				url="javascript:;"
				target="";
			}
			counter_tp = counter_tp + temp_tp.replaceAll("~liid~",liid).replaceAll("~target~",target).replaceAll("~aid~",aid).replaceAll("~href~",url).replaceAll("~spid~",spid).replaceAll("~pic~",pic);
			counter_an = counter_an + temp_an.replaceAll("~sel~",sel).replaceAll("~did~",did).replaceAll("~num~",num);
		}
		$("#tp").html(counter_tp);
		$("#an").html(counter_an);
		timer_tick();
	});
}

//获取名校信息并在页面展示
xyloginObj.prototype.showEliteSchool=function(showid,icode){
	util.getCMSData(icode,8,false,function(data){
		var temp_mx_1 = "<li><a href=\"javascript:void(0);\"><img src=\"~src~\" width=\"201\" height=\"103\" /><span style=\"width:200px\"><h2>~topic~</h2><font>~tdesc~</font></span></a></li>";
		var temp_mx_2 = "<li style=\"height:206px;\"><a href=\"javascript:void(0);\"><img src=\"~src~\" width=\"262\" height=\"206\" /><span style=\"width:262px\"><h2>~topic~</h2><font>~tdesc~</font></span></a></li>";
		var temp_mx_3 = "<li><a href=\"javascript:void(0);\"><img src=\"~src~\" width=\"262\" height=\"103\" /><span style=\"width:262px\"><h2>~topic~</h2><font>~tdesc~</font></span></a></li>";
		var counter = 0;
		for(var i=0;i<data.length;i++){
			var tdata = data[i];
			counter++;
			var tdesc = null;
			if(i<=2){
				tdesc = tdata.desc.length > 43 ? tdata.desc.substring(0,43)+'..': tdata.desc;
				$("#col_1").append(temp_mx_1.replaceAll("~src~",tdata.pic).replaceAll("~topic~",tdata.title).replaceAll("~tdesc~",tdesc));
			}else if(i>2 && i<=4){
				if(i==3){
				tdesc = tdata.desc.length > 130 ? tdata.desc.substring(0,130)+'..': tdata.desc;
					$("#col_2").append(temp_mx_2.replaceAll("~src~",tdata.pic).replaceAll("~topic~",tdata.title).replaceAll("~tdesc~",tdesc));
				}
				if(i==4){
					tdesc = tdata.desc.length > 65 ? tdata.desc.substring(0,65)+'..': tdata.desc;
					$("#col_2").append(temp_mx_3.replaceAll("~src~",tdata.pic).replaceAll("~topic~",tdata.title).replaceAll("~tdesc~",tdesc));
				}
			}else if(i>4){
				tdesc = tdata.desc.length > 43 ? tdata.desc.substring(0,43)+'..': tdata.desc;
				$("#col_3").append(temp_mx_1.replaceAll("~src~",tdata.pic).replaceAll("~topic~",tdata.title).replaceAll("~tdesc~",tdesc));
			}
		}
		mx_ys();
		if(counter == 0){
			$("#schoolList").html("<li>暂无数据...</li><div class=\"clearfix\"></div>");
		}
	});
}

//获取名师或名校长信息，并在页面中展示
//2014-11-12 董浩宇  去掉名师和名校长下的名字显示框，名字直接在描述中显示.replaceAll("~tname~",tname)   <span>~tname~</span>
xyloginObj.prototype.showMsOrMxz = function(showid,icode){
	util.getCMSData(icode,8,false,function(data){
		var temp_0 = "<li><a href=\"javascript:void(0);\"><img src=\"~src~\" width=\"77\" height=\"78\" /></a><div class=\"ms_tips\">~tdesc~</div></li>";
		var temp_1 = "<li><a href=\"javascript:void(0);\"><img src=\"~src~\" width=\"77\" height=\"78\" /></a><div class=\"ms_tips\" style=\"left:0; top:78px;\">~tdesc~</div></li>";
		var temp_2 = "<li><a href=\"javascript:void(0);\"><img src=\"~src~\" width=\"77\" height=\"78\" /></a><div class=\"ms_tips\" style=\"left:-156px; top:78px;\">~tdesc~</div></li>";
		var temp_3 = "<li><a href=\"javascript:void(0);\"><img src=\"~src~\" width=\"77\" height=\"78\" /></a><div class=\"ms_tips\" style=\"left:-234px; top:0;\">~tdesc~</div></li>";
		var temp_4 = "<li><a href=\"javascript:void(0);\"><img src=\"~src~\" width=\"77\" height=\"78\" /></a><div class=\"ms_tips\">~tdesc~</div></li>";
		var temp_5 = "<li><a href=\"javascript:void(0);\"><img src=\"~src~\" width=\"77\" height=\"78\" /></a><div class=\"ms_tips\" style=\"left:0; top:-78px;\">~tdesc~</div></li>";
		var temp_6 = "<li><a href=\"javascript:void(0);\"><img src=\"~src~\" width=\"77\" height=\"78\" /></a><div class=\"ms_tips\" style=\"left:-156px; top:-78px;\">~tdesc~</div></li>";
		var temp_7 = "<li><a href=\"javascript:void(0);\"><img src=\"~src~\" width=\"77\" height=\"78\" /></a><div class=\"ms_tips\" style=\"left:-234px; top:0;\">~tdesc~</div></li>";
		var counter = 0;
		for(var i=0;i<data.length;i++){
			var tdata = data[i];
			counter++;
			var tname = tdata.title.length> 3 ? tdata.title.substring(0,3)+'..': tdata.title;
			var tdesc = tdata.desc.length > 45 ? tdata.desc.substring(0,45)+'..': tdata.desc;
			$("#"+showid).append(eval("temp_"+i).replaceAll("~src~",tdata.pic).replaceAll("~tdesc~",tdesc));
		}
		msmxz_ys();
		if(counter == 0){
			$("#"+showid).html("<li>暂无数据...</li><div class=\"clearfix\"></div>");
		}
	});
}

//获取教育微博信息，幷在页面中展示
xyloginObj.prototype.showJywb = function(showid,icode,path){
	util.getCMSData(icode,8,false,function(data){
		var temp = "<li><span class=\"photo\"><img src=\"~src~\" width=\"50\" height=\"50\" /></span><span class=\"bo_txt\"><a href=\"~url~\" target=\"_blank\">~desc~</a></span><div class=\"clearfix\"></div></li>"
		var counter = 0;
		for(var i=0;i<data.length;i++){
			var tdata = data[i];
			counter++;
			var src = "login/xy/images/newImage/logo_newxy.gif";
			var tdesc = tdata.desc.length > 130 ? tdata.desc.substring(0,130)+'..': tdata.desc;
			$("#"+showid).append(temp.replaceAll("~src~",src).replaceAll("~url~",tdata.url).replaceAll("~desc~",tdesc));
		}
		if(counter == 0){
			$("#"+showid).html("<li>暂无数据...</li><div class=\"clearfix\"></div>");
		}
	});
}

//获取教育论坛数据，并在页面展示
xyloginObj.prototype.showBbs = function(showid){
	try{
		var htmlForBbs = new Array();
		$("#bbsdata div ul li").each(function(num){
			htmlForBbs.push('<li>· '+$(this).html()+'</li>');
			if(num>=5){
				return false;
			}
		});
		if(htmlForBbs.length==0){
			htmlForBbs.push('<li>·暂无信息</li><div class=\"clearfix\"></div>');
		}
		$("#"+showid).html(htmlForBbs.join(""));
	}catch(e){}
}

//获取资源信息，幷在页面中展示
xyloginObj.prototype.showZy = function(showid,icode){
	util.getCMSData(icode,5,false,function(data){
		var temp_zy = "<li><a href=\"~url~\" target=\"_blank\">· ~title~</a></li>";
		var counter = 0;
		for(var i=0;i<data.length;i++){
			var tdata = data[i];
			counter++;
			$("#"+showid).append(temp_zy.replaceAll("~url~",tdata.url).replaceAll("~title~",tdata.title));
		}
		$("#"+showid).append("<div class=\"clearfix\"></div>");
		if(counter == 0){
			$("#"+showid).html("<li>暂无数据...</li><div class=\"clearfix\"></div>");
		}
	});
}
