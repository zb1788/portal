//检查栏目鉴权
function channelGrantCheck(channelid,turl){
	var content="您所使用的提升版正处于体验期！3秒后可访问。";
	try{
		if(util.grantChecker("channel",channelid)){
			$("#belowdiv").show();
			$("#grantAltContent").html(content);
			$("#grantAltdiv").css("left",(document.body.clientWidth/2-235)+"px");
			$("#grantAltdiv").show();
			channelUtil.filterUrl=turl;
			setTimeout('$("#belowdiv").hide();$("#grantAltdiv").hide();',3000);
		}else{
			$("#belowdiv").hide();
			$("#grantAltdiv").hide();
		}
	}catch(e){
		$("#belowdiv").hide();
		$("#grantAltdiv").hide();
	}
}