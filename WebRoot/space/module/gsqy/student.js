//学生鉴权提示
function grantAlert(){
	content="您所使用的提升版正处于体验期！3秒后可访问。";
	art.dialog({
		top:'100px',
		icon:'face-sad',
		padding:5,
		title:'提示信息',
		width:500,
		left:'50%',
		//提示内容
		content: '<p>'+content+'</p>',
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
		},
	    time:3//3秒后关闭
	});
}

//在新门户页面打开对应接口地址
UtilObj.prototype.newPortalOpen=function(icode){
	//非undefined
	if(util.isBlank(icode)){
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
		if(util.grantChecker("icode",icode)){
			if( "undefined"!=typeof(grantAlert) && grantAlert ){
				grantAlert();
			}
			window.setTimeout("window.open('"+iurl+"');",2800);
			return;
		}
		window.open(iurl);
	}
}

//根据接口标识打开对应页面
UtilObj.prototype.openIcode=function(icode){
	//非undefined
	if(util.isBlank(icode)){
		return;
	}
	var isyscode=icode.substring(0,icode.indexOf("."));
	var iurl=util.makeUrl(isyscode,icode);
	if(util.grantChecker("icode",icode)){
		if( "undefined"!=typeof(grantAlert) && grantAlert ){
			grantAlert();
		}
		window.setTimeout("window.open('"+iurl+"');",2800);
		return;
	}
	window.open(iurl);
}
/*
//util.makeUrl('QBMS','QBMS.STUDENT.APP_6'));

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
*/