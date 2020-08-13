var hsdz_lmid="#22_15";
$(hsdz_lmid).removeClass("s-nav-wrap").addClass("hs-nav-wrap");
$(hsdz_lmid+" li span").remove();
$(hsdz_lmid+" .s-nav").removeClass("s-nav").addClass("hs-nav");
$(hsdz_lmid+" li a").each(function(i){
	if(i==0){
		$(this).append("<span class=\"xk_icon\" ></span>");
	}else{
		$(this).append("<span class=\"xk_icon"+i+"\" ></span>");
	}
});
hsdz_lmid="#22_01";
$(hsdz_lmid).removeClass("s-nav-wrap").addClass("hs-nav-wrap");
$(hsdz_lmid+" li span").remove();
$(hsdz_lmid+" .s-nav").removeClass("s-nav").addClass("hs-nav").addClass("beike");
$(hsdz_lmid+" li a").each(function(i){
	if(i==0){
		$(this).append("<span class=\"xk_icon\" ></span>");
	}else{
		$(this).append("<span class=\"xk_icon"+i+"\" ></span>");
	}
});
$(".hs-nav-wrap li").click(menuclick);