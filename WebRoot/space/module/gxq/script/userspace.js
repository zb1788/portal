//页面接口定义
var userspace = new userspaceObj();
var ubName="优币";
function userspaceObj(){
	this.SignUrl=null;
	this.SignText=null;
};
//调用某个栏目
userspaceObj.prototype.changeChannel=function(moduleid){
	try{
		var tmenu=$("[lmid='"+moduleid.replaceAll(".","_")+"']",parent.document);
		if(tmenu && tmenu!=null){
			parent.document.getElementById("menu_"+moduleid.replaceAll(".","_")).click();
		}else{
			
		}
	}catch(e){
	
	}
}
//调用父栏目的点击事件
userspaceObj.prototype.handleParentDom=function(id){
	try{
		parent.document.getElementById(id).click();
	}catch(e){

	}
}
//展示空间首页焦点图
//显示divid,切换divId,接口编码,数量,显示html模板，切换html模板
userspaceObj.prototype.showFocusImg = function(showId,changeId,iCode,num,temp,temp_c){
	var temp_an ="<a href=\"javascript:void(0)\" hidefocus=\"true\" target=\"_self\" class=\"~sel~\"><i>~numStr~</i></a> ";
	if(!util.isBlank(temp_c)){
		temp_an=temp_c;
	}
	util.getCMSData(iCode,num,true,function(data){
		if(data.length==0){
			return false;
		}else{
			var codeStr = new Array();
			var codeStr_an = new Array();
			for(var i=0;i<data.length;i++){
				var tdata = data[i];
				var target = "_blank";
				var url=tdata.url;
				if(url == "#"){
					url="javascript:;"
					target="";
				}
				var numStr = i+1;
				var sel = "";
				if(i==0){
					sel = "current";
				}else{
					sel = "";
				}
				codeStr =codeStr + temp.replaceAll("~url~",url).replaceAll("~img~",tdata.pic).replaceAll("~text~",tdata.title).replaceAll("~target~",target);
				codeStr_an = codeStr_an + temp_an.replaceAll("~sel~",sel).replaceAll("~numStr~",numStr);
			}
			$("#"+showId).html(codeStr);
			$("#"+changeId).html(codeStr_an);

			$(".flash_bar div").mouseover(function() {
				stopAm();
			}).mouseout(function() {
				startAm();
			});
			startAm();
		}
	});
}

userspaceObj.prototype.showFocusImgNew = function(showId,changeId,iCode,num){
	util.getCMSData(iCode,num,true,function(data){
		if(data.length==0){
			return false;
		}else{
			totalimg = data.length;
			var codeStr = '';
			var codeStr_an = '';
			for(var i=0;i<data.length;i++){
				var tdata = data[i];
				var target = "_blank";
				var url=tdata.url;
				if(url == "#"){
					url="javascript:;"
					target="";
				}
				var numStr = i+1;
				var sel = "";
				if(i==0){
					sel = 'style="display: block;"';
				}else{
					sel = 'style="display: none;"';
				}


				codeStr += '<li id="flash'+numStr+'"  '+sel+'><a href="'+url+'" target="'+target+'"><span style="background:url('+tdata.pic+')  no-repeat center center;"></span></a></li>';
				codeStr_an += '<div class="no" id="f'+numStr+'" onclick="changeflash('+numStr+')"></div>';


			}
			$("#"+showId).html(codeStr);
			$("#"+changeId).html(codeStr_an);

			$(".flash_bar div").mouseover(function() {
				stopAm();
			}).mouseout(function() {
				startAm();
			});
			startAm();
		}
	});
}

//sortType 0 最新 1次数最大
//type 1 优质课件 2教学视频 3精品试卷
userspaceObj.prototype.getResFromPls = function(type,idHead,idList,username){
	var typeCodes = '';
	if(type == 1){
		typeCodes = 'RT001,RT002,RT003,RT006,RT105,RT106';
	}else if(type == 2){
		typeCodes = 'RT005,RT107';
	}else if(type == 3){
		typeCodes = 'RT004';
	}
	var url = protocol+sysconfig.PORTAL+'/gw/pls/api/get_teacher_index_infos?userName='+username+'&typeCodes='+typeCodes+'&maxNum=10&sortType=';
	var html = new Array();
	var idstr = '';

	$.getJSON(url+'0',function (data) {
		for(var i=0;i<3;i++){
			var v = data[i];
			if(typeof v != 'undefined'){
                html.push(v);
				idstr += v.id+',';
			}
		}

		$.getJSON(url+'1',function (data) {
			$.each(data,function (k,v) {
				if(html.length<5 && idstr.indexOf(v.id) == -1){
                    html.push(v);
				}
			})

            $('#'+idList).html('');
            for(var i=0;i<html.length;i++){
                var v = html[i];
                var playUrl = protocol+sysconfig.PLS+'/youjiaoplay/playPage.do?rcode='+v.id;
                if(i == 0){
                    var firstHtml = '<dt><a href="'+playUrl+'" target="_blank"><img src="'+v.iconUrl+'" width="80" height="90"></a></dt>';
                    firstHtml += '<dd class="tit"><a href="'+playUrl+'" target="_blank">'+v.title+'</a> <span>'+v.issueDate.substring(0,10)+'</span></dd>';
                    firstHtml += '<dd class="desc">'+(v.desc?v.desc:'暂无描述')+'</dd>';
                    $('#'+idHead).html(firstHtml);
                }else if(i>0 && i<3){
                    var secHtml = '<li><span class="fr">'+v.issueDate.substring(0,10)+'</span><a href="'+playUrl+'" target="_blank"><img style="margin-right:2px;" src="'+protocol+sysconfig.PORTAL+'/space/module/gxq/images/gxin/new.png" alt=""><img class="small" src="'+v.iconUrl+'" width="80" height="90">'+v.title+'</a></li>';
                    $('#'+idList).append(secHtml);
                }else{
                    var secHtml = '<li><span class="fr">'+v.downnumber+'</span><a href="'+playUrl+'" target="_blank"><img style="margin-right:2px;" src="'+protocol+sysconfig.PORTAL+'/space/module/gxq/images/gxin/hot.png" alt=""><img class="small" src="'+v.iconUrl+'" width="80" height="90">'+v.title+'</a></li>';
                    $('#'+idList).append(secHtml);
                }
            }
		})
	})
}

//typeCodes:RT004 名师套卷  RT105拓展提升
userspaceObj.prototype.getResFromPlsByStu = function(typeCodes,idHead,idList){
    var url = '';
    if(studyStageCode != '0003'){
        //小初
        var url = protocol+sysconfig.PORTAL+'/gw/pls/api/get_student_index_infos?userName='+username+'&typeCodes='+typeCodes+'&maxNum=10&grade='+gradeCode+'&sortType=';
    }else {
        //高中
        var url = protocol+sysconfig.PORTAL+'/gw/pls/api/get_student_index_infos?typeCodes='+typeCodes+'&maxNum=10&sortType=';
    }

    var html = new Array();
    var idstr = '';

    $.getJSON(url+'0',function (data) {
        $('#'+idList).html('');
        for(var i=0;i<3;i++){
            var v = data[i];
            if(typeof v != 'undefined'){
                html.push(v);
                idstr += v.id+',';
            }
        }

        $.getJSON(url+'1',function (data) {
            $.each(data,function (k,v) {
                if(html.length<5 && idstr.indexOf(v.id) == -1){
                    html.push(v);
                }
            })

            $('#'+idList).html('');
            for(var i=0;i<html.length;i++){
                var v = html[i];
                var playUrl = protocol+sysconfig.PLS+'/youjiaoplay/playPage.do?rcode='+v.id;
                if(i == 0){
                    var firstHtml = '<dt><a href="'+playUrl+'" target="_blank"><img src="'+v.iconUrl+'" width="80" height="90"></a></dt>';
                    firstHtml += '<dd class="tit"><a href="'+playUrl+'" target="_blank">'+v.title+'</a> <span>'+v.issueDate.substring(0,10)+'</span></dd>';
                    firstHtml += '<dd class="desc">'+(v.desc?v.desc:'暂无描述')+'</dd>';
                    $('#'+idHead).html(firstHtml);
                }else if(i>0 && i<3){
                    var secHtml = '<li><span class="fr">'+v.issueDate.substring(0,10)+'</span><a href="'+playUrl+'" target="_blank"><img style="margin-right:2px;" src="'+protocol+sysconfig.PORTAL+'/space/module/gxq/images/gxin/new.png" alt=""><img class="small" src="'+v.iconUrl+'" width="80" height="90">'+v.title+'</a></li>';
                    $('#'+idList).append(secHtml);
                }else{
                    var secHtml = '<li><span class="fr">'+v.downnumber+'</span><a href="'+playUrl+'" target="_blank"><img style="margin-right:2px;" src="'+protocol+sysconfig.PORTAL+'/space/module/gxq/images/gxin/hot.png" alt=""><img class="small" src="'+v.iconUrl+'" width="80" height="90">'+v.title+'</a></li>';
                    $('#'+idList).append(secHtml);
                }
            }
        })
    })


}


userspaceObj.prototype.getResFromWkByStu = function(idHead,idList){
    var url = "";
    if(studyStageCode != '0003'){
        url = protocol+sysconfig.PORTAL+'/node/microapi/student/ownpc/getcourselist.action?gradeCode='+gradeCode+'&start=0&limit=10';
    }else {
        url = protocol+sysconfig.PORTAL+'/node/microapi/student/ownpc/getcourselist.action?gradeCode=0100'+'&start=0&limit=10';
    }


    var idstr = '';
    var html = new Array();
    $.getJSON(url+'&time=0',function (rdata) {
        var data = rdata.items;
        for(var i=0;i<3;i++){
            var v = data[i];
            if(typeof v != 'undefined'){
                html.push(v);
                idstr += v.id+',';
            }
        }

        $.getJSON(url+'&study=0',function (data) {
            $.each(data.items,function (k,v) {
                if(html.length<5 && idstr.indexOf(v.id) == -1){
                    html.push(v);
                }
            })

            $('#'+idList).html('');
            for(var i=0;i<html.length;i++){
                var v = html[i];
                var playUrl = protocol+sysconfig.MICRO+'/common/getcatalogInfoPre.action?id='+v.id;
                if(i == 0){
                    var firstHtml = '<dt><a href="'+playUrl+'" target="_blank"><img src="'+protocol+sysconfig.VFS+'/ilearn'+v.posterSmall+'" width="80" height="90"></a></dt>';
                    firstHtml += '<dd class="tit"><a href="'+playUrl+'" target="_blank">'+v.name+'</a> <span>'+v.createTime.substring(0,9)+'</span></dd>';
                    firstHtml += '<dd class="desc">'+(v.targetDesc?v.targetDesc:'暂无描述')+'</dd>';
                    $('#'+idHead).html(firstHtml);

                }else if(i>0 && i<3){
                    var secHtml = '<li><span class="fr">'+v.createTime.substring(0,9)+'</span><a href="'+playUrl+'" target="_blank"><img style="margin-right:2px;" src="'+protocol+sysconfig.PORTAL+'/space/module/gxq/images/gxin/new.png" alt=""><img class="small" src="'+protocol+sysconfig.VFS+'/ilearn'+v.posterSmall+'" width="80" height="90">'+v.name+'</a></li>';
                    $('#'+idList).append(secHtml);
                }else{
                    var secHtml = '<li><span class="fr">'+v.studynum+'</span><a href="'+playUrl+'" target="_blank"><img style="margin-right:2px;" src="'+protocol+sysconfig.PORTAL+'/space/module/gxq/images/gxin/hot.png" alt=""><img class="small" src="'+protocol+sysconfig.VFS+'/ilearn'+v.posterSmall+'" width="80" height="90">'+v.name+'</a></li>';
                    $('#'+idList).append(secHtml);
                }
            }
        })
    })
}

userspaceObj.prototype.getYunpanPercent = function(){
	var url = protocol+sysconfig.PLS+'/teacher/filepagecJson.do?t=_'+Date.parse(new Date()) / 1000;
	$.ajax({
		url:url,
		type:"get",
		dataType:"jsonp",
		jsonp:"jsoncallback",
		success:function(data){
			var percent = (data.useSpaceSize/data.spaceSize).toFixed(2)*100;
			$('#yunpanpercent').html(percent+'%');
			$('#percentsize').attr('style','width:'+percent+'%');
		}
	});
}

userspaceObj.prototype.getTeacherSubject=function(username){
	var xxGenreArr = [];
	var czGenreArr = [];
	var gzGenreArr = [];
	var xiaoxueSubject = '0001,0002,0003';//小学只取语数英
	var chuzhongSubject = '0001,0002,0003,0004,0005,0010,0011,0012,0013';//初中语数英物理化学生物地理政治历史
	var gaozhongSubject = '0001,0002,0003,0004,0005,0010,0011,0012,0013';//高中
	var hasXiaoxue = false;
	var hasChuzhong = false;
	var hasGaozhong = false;
	var url = protocol+sysconfig.TMS+'/tms/interface/queryVersion.jsp?reqEncoding=GBK&queryType=byUser&username='+username;
	$.ajax({
		url:url,
		type:'get',
		dataType:'jsonp',
		jsonp:'jsoncallback',
		success:function (data) {
			$.each(data.rtnArray,function (k,v) {
				if(v.studyStageCode == '0001' && xiaoxueSubject.indexOf(v.subjectCode) != -1 && xxGenreArr.indexOf(v.subject) ==-1){
					xxGenreArr.push(v.subject);
					hasXiaoxue = true;
				}else if(v.studyStageCode == '0002' && chuzhongSubject.indexOf(v.subjectCode) != -1 && czGenreArr.indexOf(v.subject) == -1){
					czGenreArr.push(v.subject);
					hasChuzhong = true;
				}else if(v.studyStageCode == '0003' && gaozhongSubject.indexOf(v.subjectCode) != -1 && gzGenreArr.indexOf(v.subject) == -1){
					gzGenreArr.push(v.subject)
					hasGaozhong = true;
				}

			})
			console.log(xxGenreArr,czGenreArr,gzGenreArr);
			for(var i=0;i<xxGenreArr.length;i++){
				var click='changeCurZt(this);userspace.getZtByXiaoxue(\''+xxGenreArr[i]+'\');';
				$('#subjectlist').append('<li onclick="'+click+'">小学'+xxGenreArr[i]+'</li>');
			}
			for(var i=0;i<czGenreArr.length;i++){
				var click = 'changeCurZt(this);userspace.getZtByChuzhong(\''+czGenreArr[i]+'\');';
				$('#subjectlist').append('<li onclick="'+click+'">初中'+czGenreArr[i]+'</li>');
			}
			for(var i=0;i<gzGenreArr.length;i++){
				var click = 'changeCurZt(this);userspace.getZtByGaozhogn(\''+gzGenreArr[i]+'\');';
				$('#subjectlist').append('<li onclick="'+click+'">高中'+gzGenreArr[i]+'</li>');
			}
			$('#subjectlist').children('li').eq(0).addClass('cur_2');
			if(hasXiaoxue){
				//请求小学cms专题
				userspace.getZtByXiaoxue(xxGenreArr[0]);
			}else{
				if(hasChuzhong) {
					//请求初中cms专题
					userspace.getZtByChuzhong(czGenreArr[0]);
				}else if(hasGaozhong){
					//请求高中cms专题
					userspace.getZtByGaozhogn(gzGenreArr[0]);
				}
			}
		}
	})
}


userspaceObj.prototype.getStudentZt=function(){
	if(studyStageCode == '0001'){
		userspace.getZtByXiaoxue('');
	}else if(studyStageCode == '0002'){
		userspace.getZtByChuzhong('');
	}else{
		userspace.getZtByGaozhogn('');
	}
}

function changeCurZt(obj){
	$(obj).siblings().removeClass('cur_2');
	$(obj).addClass('cur_2');
}

userspaceObj.prototype.getZtByXiaoxue=function(subject) {
	$.getScript(protocol + sysconfig["CMS"] + "/A01/A01064/A01064013/A01064013001/A01064013001001/list.json", function () {
		if(typeof infolistA01064013001001 != 'undefined' && infolistA01064013001001.infosList.length > 0){
			xiaoxueCmsZt = infolistA01064013001001.infosList;
			userspace.formatCmsZt(xiaoxueCmsZt,subject);
		}
	})
}

userspaceObj.prototype.getZtByChuzhong=function(subject) {
	$.getScript(protocol + sysconfig["CMS"] + "/A01/A01064/A01064013/A01064013001/A01064013001002/list.json", function () {
		if(typeof infolistA01064013001002 != 'undefined' && infolistA01064013001002.infosList.length > 0){
			chuzhongCmsZt = infolistA01064013001002.infosList;
			userspace.formatCmsZt(chuzhongCmsZt,subject);
		}
	})
}

userspaceObj.prototype.getZtByGaozhogn=function(subject) {
	$.getScript(protocol + sysconfig["CMS"] + "/A01/A01064/A01064013/A01064013001/A01064013001003/list.json", function () {
		if(typeof infolistA01064013001003 != 'undefined' && infolistA01064013001003.infosList.length > 0){
			gaozhongCmsZt = infolistA01064013001003.infosList;
			userspace.formatCmsZt(gaozhongCmsZt,subject);
		}
	})
}

//展示当前专题的资源
userspaceObj.prototype.formatCmsZt =function(list,subject){
	//cms学科和优教通学科对应
	var arr = [];
	arr['语文'] = '001';
	arr['数学'] = '002';
	arr['英语'] = '003';
	arr['物理'] = '004';
	arr['化学'] = '005';
	arr['生物'] = '006';
	arr['政治'] = '007';
	arr['历史'] = '008';
	arr['地理'] = '009';

	var liArr = [];
	$('#ztlist').html('');
	for(var i=0;i<list.length;i++){
		var item = list[i];
		if(subject != ''){
			var subjectcode = item.fromchannelcode.substring(item.fromchannelcode.length-6,item.fromchannelcode.length-3);
			if(arr[subject] == subjectcode && liArr.length <5){
				var url = protocol+sysconfig["CMS"]+item.filepath;
				var img = protocol+sysconfig["CMS"]+item.abbrevpic;

				liArr.push('<li><a href="'+url+'" target="_blank"><img src="'+img+'" width="320" height="131" alt=""><span class="tit">'+item.topic+'</span></a></li>');
			}
		}else{
			if(liArr.length <5){
				var url = protocol+sysconfig["CMS"]+item.filepath;
				var img = protocol+sysconfig["CMS"]+item.abbrevpic;

				liArr.push('<li><a href="'+url+'" target="_blank"><img src="'+img+'" width="320" height="131" alt=""><span class="tit">'+item.topic+'</span></a></li>');
			}
		}
	}
	$('#ztlist').html(liArr.join(''));
}



//教师-滚动通知
userspaceObj.prototype.showNotice=function(){
	$("#notice").html("");										
	userspace.getFilterCMS("notice","CMS.JSON.A01074015012",10,3,0,"<li><a href=\"~url~\" target=\"_blank\" >~text~</a> <span class=\"news_time\">~date~</span></li>");
}
//班级圈-班级空间红点提醒
userspaceObj.prototype.classMessage=function(){
	//班级圈是否显示圆点
	util.getRemoteJson("ILEARN","ILEARN.CLASSTEAM_NUM","",function(r){	
		if(r.success){
			$("#classMessage").show();
		}
	});
}
//优币攻略-活动
userspaceObj.prototype.showUbActive=function(){
	//教师学生样式不同
	if("2"==usertype || "3"==usertype){
		util.getCommonCMS("ubActive","CMS.JSON.A01074015013",1,0,"<a href=\"~url~\" target=\"_blank\" >~text~</a>",true,function(temp,data){if(data.title.length>6)data.title=data.title.substring(0,6);return temp;});
	}else{
		util.getCommonCMS("ubActive","CMS.JSON.A01074015013",1,0,"<a href=\"~url~\" target=\"_blank\" >~text~</a>",true,function(temp,data){if(data.title.length>6)data.title=data.title.substring(0,6);return temp;});
	}
}
//教师空间-每日推荐--小 初 高 按教师具有学段显示，过滤角色
userspaceObj.prototype.showTeacherTuijian=function(){
	var sel=false;
	if(schoolStage.indexOf("0001")>-1){
		util.getCommonCMS("xiaoxue_tj_ul","CMS.JSON.A01045001004001",6,0,"<li><span class=\"fr\">~date~</span><a href=\"~url~\" target=\"~target~\">~text~~special~</a></li>",true,userspace.infoSpecialImg);
		$("#13Tab_0").show();
		$("#13Tab_0").click();
		$('#tj_more').attr('stage','0001');
		sel=true;
	}
	if(schoolStage.indexOf("0002")>-1){
		util.getCommonCMS("chuzhong_tj_ul","CMS.JSON.A01045001004002",6,0,"<li><span class=\"fr\">~date~</span><a href=\"~url~\" target=\"~target~\">~text~~special~</a></li>",true,userspace.infoSpecialImg);
		$("#13Tab_1").show();
		if(!sel){
			$('#tj_more').attr('stage','0002');
			$("#13Tab_1").click();
			sel=true;
		}
	}
	if(schoolStage.indexOf("0003")>-1){
		util.getCommonCMS("gaozhong_tj_ul","CMS.JSON.A01045001004003",6,0,"<li><span class=\"fr\">~date~</span><a href=\"~url~\" target=\"~target~\">~text~~special~</a></li>",true,userspace.infoSpecialImg);
		$("#13Tab_2").show();
		if(!sel){
			$('#tj_more').attr('stage','0003');
			$("#13Tab_2").click();
		}
	}
}
//学生 学习加油站---同老师推荐接口，角色过滤不同
userspaceObj.prototype.showStudentTuijian=function(){
	var tuijian_code=null;
	if(schoolStage=="0001"){
		util.getCommonCMS("tuijian","CMS.JSON.A01045001005001",6,0,"<li><span class=\"fr\">~date~</span><a href=\"~url~\" target=\"~target~\">~text~~special~</a></li>",true,userspace.infoSpecialImg);
	}else if(schoolStage=="0002"){
		util.getCommonCMS("tuijian","CMS.JSON.A01045001005002",6,0,"<li><span class=\"fr\">~date~</span><a href=\"~url~\" target=\"~target~\">~text~~special~</a></li>",true,userspace.infoSpecialImg);
	}else if(schoolStage=="0003"){
		util.getCommonCMS("tuijian","CMS.JSON.A01045001005003",6,0,"<li><span class=\"fr\">~date~</span><a href=\"~url~\" target=\"~target~\">~text~~special~</a></li>",true,userspace.infoSpecialImg);
	}
}
//点击推荐更多
userspaceObj.prototype.openTuijian=function(obj){
	var stage=null;
	if(typeof(obj)!="undefined" && obj!=null){
		stage=$(obj).attr("stage")
	}
	if("2"==usertype || "3"==usertype){
		if(stage=="0001"){
			util.openIcode("CMS.PAGE.A01045001004001");
		}else if(stage=="0002"){
			util.openIcode("CMS.PAGE.A01045001004002");
		}else if(stage=="0003"){
			util.openIcode("CMS.PAGE.A01045001004003");
		}
	}else{
		if(schoolStage=="0001"){
			util.openIcode("CMS.PAGE.A01045001005001");
		}else if(schoolStage=="0002"){
			util.openIcode("CMS.PAGE.A01045001005002");
		}else if(schoolStage=="0003"){
			util.openIcode("CMS.PAGE.A01045001005003");
		}
	}
}
//处理信息标题跟new,hot
userspaceObj.prototype.infoSpecialImg=function(temp,data){
	try{
	var pubTimeStr=data.time.substring(0,10);
	var nowTimeStr=new Date().format("yyyy-MM-dd")
	var passDay=util.DateDiff(nowTimeStr,pubTimeStr);
	if(data.top>0){
		temp=temp.replaceAll("~special~","<img class=\"tu-ico\" src=\"space/images/hot.gif\" width=\"32\" height=\"24\" />");
	}else if(passDay<8){
		temp=temp.replaceAll("~special~","<img class=\"tu-ico\" src=\"space/images/new.gif\" width=\"32\" height=\"24\" />");
	}else{
		temp=temp.replaceAll("~special~","");
	}
	}catch(e){
		temp=temp.replaceAll("~special~","");
	}
	return temp;
}
//CMS条件过滤通用处理(替换~url~,~text~,~img~,~target~)
//显示位置id,接口编号,获取个数,显示个数,展示方式(0html,其他append),角色，展示模板(自动替换上述标签内容)
userspaceObj.prototype.getFilterCMS=function (showid,icode,ilength,slength,type,templete){
	util.getCommonCMS(showid,icode,slength,type,templete,true);
}

//1702改版学生，教师左下专题推荐图
userspaceObj.prototype.showZTimg=function(){
	$("#ztimgdiv").html("");
	userspace.getFilterCMS("ztimgdiv","CMS.JSON.A01074015006001",15,1,1,"<a href=\"~url~\" target=\"~target~\"><img src=\"~img~\" width=\"250\" height=\"75\" /></a>");
	userspace.getFilterCMS("ztimgdiv","CMS.JSON.A01074015006002",15,1,1,"<a href=\"~url~\" target=\"~target~\"><img src=\"~img~\" width=\"250\" height=\"75\" /></a>");
	/*增加问卷调查，移除教师多一广告
	if("2"==usertype){
		userspace.getFilterCMS("ztimgdiv","CMS.JSON.A01074015006003",15,1,1,"<a href=\"~url~\" target=\"~target~\"><img src=\"~img~\" width=\"250\" height=\"75\" /></a>");
	}
	*/
}

//获取未读取站内信个数
userspaceObj.prototype.getNotreadletterCount=function(username) {
	if(!username)return;
  	var param = "command=getMsgCount&username="+username+"&flg=0";
	if("4"==usertype) param=param+"&type=1&senduserType=2";//学生的教师消息只取消息类型
 	util.getRemoteJson("WEBMAIL","WEBMAIL.NOREAD_NUM",param,function(data){
 		if(data){
 			try{
  			if(data.result==1 && data.num && Number(data.num)>0){
	  			$("#letterCount").html(data.num);
	  			$("#letterCount").show();
  			}
  			}catch(e){}
  		}
  	});
}

//显示U币数
userspaceObj.prototype.showUbNum=function(){
	//展示总优币和可用优币
	util.getRemoteJson("UB","UB.SHOWPOINT","param=1",function(result){
		var use_point = "";
		//var all_point = "";
		if(result.length == 0){
			use_point = 0;
			//all_point = 0;
		}else{
			for(var i=0;i<result.length;i++){
				if(result[i].at == "u"){
					$("#use_point").html(ubName+result[i].unuse);
					//$("#all_point").html(result[i].total);
				}
			}
		}
	});
}
/*
//检查签到
userspaceObj.prototype.checkSign=function(){
	util.getRemoteJson("UB","UB.CHECKSIGN","username="+username+"&usertype="+usertype+"&areacode="+userAreaId,function(r){
		if("1"==r.result){
			$("#qiandao").html('<div class="qd_ico_wrap  over-qd" id="qiandao" ><a href="#" onclick="return false;"><i><img alt="" src="'+path+'/space/images/room/qian_ico_over.png" width="49" height="48"></i></a><p><a class="redFon" href="#" onclick="return false;">已签到</a></p></div>');
		}else{
			$("#qiandao").html('<div class="qd_ico_wrap "><a href="#"  onclick="userspace.SignIn();return false;" ><i><img src="'+path+'/space/images/room/qian_ico_over.png" width="49" height="48" alt=""/></i></a><p><a href="#"  onclick="userspace.SignIn();return false;" >签到</a></p></div>');
		}
	});
	util.getCMSData("CMS.JSON.A01074015011",2,true,function(data){
			if(data.length>0){
				var tdata = data[0];
				userspace.SignText =tdata.desc;
				userspace.SignUrl=tdata.url;
			}
		});
}
*/
//变为直接签到
userspaceObj.prototype.checkSign=function(){
	this.SignIn();
}
//签到
userspaceObj.prototype.SignIn=function(){
try{
	if(util.grantChecker("icode","UB.SIGNIN")){
		grantAlert();
		return;
	}
}catch(e){}
$.getJSON(path+"/interface/trains.jsp?code=UB.SIGNIN&r="+Math.round(Math.random()*999),function(data){	
		if(data.result==1){
			$("#qiandao").html('<div class="qd_ico_wrap  over-qd" id="qiandao" ><i><img alt="" src="'+path+'/space/images/room/qian_ico_over.png" width="49" height="48"></i><p><a class="redFon" href="#" onclick="return false;">已签到</a></p></div>');
			userspace.showUbNum();
			var content="";
			if(data.first==1){
				content='首次登录:+'+data.count;
			}else{
				content='今日登录:+'+data.count;
			}
			$("#LoginUb").html(content);
		}else{ 
			 //art.dialog({content: "<div class='you_ts'><dl><dd>签到失败！失败信息："+data.info+"</dd></dl></div>",width:380, top:'160px',padding:0, time: 2, lock:true, opacity: 0.3});
		}
	});
}

//增加搜索关键词
userspaceObj.prototype.showHotKey=function(){
	var maxLength=22;
	var temp = "<a href=\"~url~\" target=\"~target~\" >~title~</a>";
	//userspace.getCommonCMS("hot_search","CMS.JSON.A01074015010",);
	util.getCMSData("CMS.JSON.A01074015010",10,true,function(data){
		if(data.length!=0){ //没有数据则不显示关键词
			var codeStr = "";
			//codeStr =codeStr + "热门搜索：";
			var alllength=0;//超过maxLength个字就不再铺了，样式有问题，会导致换行空白处可点击.
			for(var i=0;i<data.length;i++){
				var tdata = data[i];
				var target = "_blank";
				var url=tdata.url;
				var title = tdata.title;
				if(url == "#"){
					url="javascript:;"
					target="";
				}
				if(i==0){
					/*
					$("#researchKey").val(title);
					var key = $("#researchKey").val();
					$("#researchKey").focus(function(){
						if ($("#researchKey").val() ==key){$("#researchKey").val("")};
					});
					$("#researchKey").blur(function(){
						if ($("#researchKey").val() ==''){$("#researchKey").val(key)}
					});
					*/
				}
				alllength=alllength+title.length;
				if(alllength>maxLength){
					break;
				}
				codeStr =codeStr + temp.replaceAll("~url~",url).replaceAll("~title~",title).replaceAll("~target~",target);
			}
			$("#hot_search").html(codeStr);
		}
	});
}