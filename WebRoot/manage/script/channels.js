
//供非栏目点击，取消所有栏目选中
function menuclick(lmobj){
	var opentype=$(lmobj).attr("opentype");
	if("2"!=opentype && "4"!=opentype){
		//取消一级栏目选中
		$("#menu li").each(function(){
			try{
				$(this).find("a").removeClass("sel");
			}catch(e){alert(e);}
		});
		var lmid=$(lmobj).attr("lmid");
		var slmid=lmid;
		if(lmid){
			var lmArr=lmid.split("_");
			if(lmArr.length>2){
				slmid=lmArr[0]+"_"+lmArr[1];
			}
		}
		$("#"+slmid).addClass("sel");
	}
}