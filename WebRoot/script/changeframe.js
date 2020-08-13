//动态改变iframe高度
function changeiframeh(){
	var bodyheigth=$(document.body).height();
	//window.name=bodyheigth;
	//alert($(document.body).height());
	try {
		$("#iframe01",parent.document).css("height",bodyheigth); 
	}catch(e){}
	//$("#iframe01",window.top.document).css("height",bodyheigth); 
}
//处理登录背景效果
jQuery(function($){
	changeiframeh();
});
$(window).resize(function() {
  	changeiframeh();
});
