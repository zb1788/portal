// JavaScript Document

//页面加载完成时，判断页面分辨率，自动加载不同样式。
$(document).ready(function(){
	var clienW =($(window).width()); //浏览器时下窗口可视区域宽度 
	if (clienW >= 1280) {
		$("#cssName").attr("href","../css/w1200/T-index.css");
	}else{
		$("#cssName").attr("href","../css/w980/T-index.css");
		}
	
	
});

//调整窗口宽度时，批量替换页面中的样式。
function resizeWidth(){
	var clienW =($(window).width()); //浏览器时下窗口可视区域宽度 
	if (clienW >= 1280) {
		$("#cssName").attr("href","../css/w1200/T-index.css");
	}else{
		$("#cssName").attr("href","../css/w980/T-index.css");
		}
	}

$(window).resize(function(){
	setTimeout(resizeWidth,500);
})
