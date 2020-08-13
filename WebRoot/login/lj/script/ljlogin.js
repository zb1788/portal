

//获取焦点图信息，幷在页面展示
function getLoginfocusImg(icode){
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
//获取名师或名校长信息，并在页面中展示
//2014-11-12 董浩宇  去掉名师和名校长下的名字显示框，名字直接在描述中显示.replaceAll("~tname~",tname)   <span>~tname~</span>
function showMsOrMxz(showid,icode){
	util.getCMSData(icode,10,false,function(data){
		var temp_0 = "<li><a href=\"~url~\" target=\"_blank\"><img src=\"~src~\" width=\"132\" height=\"77\" /></a><div class=\"tips2\">~tdesc~</div></li>";
		var temp_1 = "<li><a href=\"~url~\" target=\"_blank\"><img src=\"~src~\" width=\"132\" height=\"77\" /></a><div class=\"tips2\" style=\"left:0; top:78px;\">~tdesc~</div></li>";
		var temp_2 = "<li><a href=\"~url~\" target=\"_blank\"><img src=\"~src~\" width=\"132\" height=\"77\" /></a><div class=\"tips2\" style=\"left:-156px; top:78px;\">~tdesc~</div></li>";
		var temp_3 = "<li><a href=\"~url~\" target=\"_blank\"><img src=\"~src~\" width=\"132\" height=\"77\" /></a><div class=\"tips2\" style=\"left:-288px; top:0;\">~tdesc~</div></li>";
		var temp_4 = "<li><a href=\"~url~\" target=\"_blank\"><img src=\"~src~\" width=\"132\" height=\"77\" /></a><div class=\"tips2\" style=\"left:-288px; top:0;\">~tdesc~</div></li>";
		var temp_5 = "<li><a href=\"~url~\" target=\"_blank\"><img src=\"~src~\" width=\"132\" height=\"77\" /></a><div class=\"tips2\" style=\"left:0; top:-78px;\">~tdesc~</div></li>";
		var temp_6 = "<li><a href=\"~url~\" target=\"_blank\"><img src=\"~src~\" width=\"132\" height=\"77\" /></a><div class=\"tips2\" style=\"left:-156px; top:-78px;\">~tdesc~</div></li>";
		var temp_7 = "<li><a href=\"~url~\" target=\"_blank\"><img src=\"~src~\" width=\"132\" height=\"77\" /></a><div class=\"tips2\" style=\"left:-290px; top:0;\">~tdesc~</div></li>";
		var temp_8 = "<li><a href=\"~url~\" target=\"_blank\"><img src=\"~src~\" width=\"132\" height=\"77\" /></a><div class=\"tips2\" style=\"left:-290px; top:0;\">~tdesc~</div></li>";
		var temp_9 = "<li><a href=\"~url~\" target=\"_blank\"><img src=\"~src~\" width=\"132\" height=\"77\" /></a><div class=\"tips2\" style=\"left:-290px; top:0;\">~tdesc~</div></li>";
		var counter = 0;
		for(var i=0;i<data.length;i++){
			var tdata = data[i];
			counter++;
			var tname = tdata.title.length> 3 ? tdata.title.substring(0,3)+'..': tdata.title;
			var tdesc = tdata.desc.length > 45 ? tdata.desc.substring(0,45)+'..': tdata.desc;
			var url=tdata.url;
			$("#"+showid).append(eval("temp_"+i).replaceAll("~src~",tdata.pic).replaceAll("~tdesc~",tdesc).replaceAll("~url~",url));
		}
		msmxz_ys();
		if(counter == 0){
			$("#"+showid).html("<li>暂无数据...</li><div class=\"clearfix\"></div>");
		}
	});
}

//获取资源信息，幷在页面中展示
function showZy(showid,icode){
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

//展示登陆页广告图
function showBannerImg(showid,icode,num,templete){
	util.getCMSData(icode,num,false,function(data){
		if(data.length==0){
			$("#"+showid).html("暂无数据");
			return false;
		}else{
			for(var i=0;i<data.length;i++){
				if(i>=num){
					break; //超过规定条数则跳出循环
				}
				var tdata = data[i];
				var target = "_blank";
				var url=tdata.url;
				if(url == "#"){
					url="javascript:;"
					target="";
				}
				var codeStr = (templete.replaceAll("~url~",url).replaceAll("~src~",tdata.pic).replaceAll("~target~",target));
				$("#"+showid).html(codeStr);
				return true;
			}
	  }
	});
}