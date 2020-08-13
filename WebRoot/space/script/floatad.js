// JavaScript Document
var time;
var h;
var T;
var N; //高度
var ad_timer;

function addCount()
{
//	if(time>0)
//	{
//		time--;
//		h = h+5;
//	}
//	else
//	{
//		return;
//	}
//	if(h>=500)  //高度
//	{
//		return;
//	}
	document.getElementById("top_ads").style.display = "block";
	document.getElementById("top_ads").style.height = h+"px";
	//setTimeout("addCount()",10);
}
	
function showAds(paramTime,paramh,paramT,paramN)
{
	//document.getElementById("top_ads").style.display = "none";
	time = paramTime;
	h = paramh;
	h = 500;
	T = paramT;
	N = paramN; //高度
	addCount();
	ad_timer=setTimeout("noneAds()",5000); //停留时间自己适当调整
}

function noneAds()
{
	//if(T>0)
//	{
//		T--;
//		N = N-5;
//	}
//	else
//	{
//		return;
//	}
//	if(N<=0)
//	{
//		document.getElementById("float_ad").style.display = "block";
//		document.getElementById("top_ads").style.display = "none";
//		return;
//	}
	document.getElementById("top_ads").style.display = "none";
	document.getElementById("float_ad").style.display = "block";
	//document.getElementById("top_ads").style.height = N+"px";
	//setTimeout("noneAds()",5);
}

function clearTimer()
{
	clearInterval(ad_timer);
}

function closeAd()
{
	document.getElementById("top_ads").style.display = "none";
	document.getElementById("float_ad").style.display = "block";
	clearTimer();
}

function show()
{
	var obj_ad=document.getElementById("float_ad");
	obj_ad.style.display="none";
	showAds(500,500,500,500);
	
}
	
var _inner_browser_width = 0;
var _inner_browser_height = 0;
var _browser_scroll_x = 0;
var _browser_scroll_y = 0;	
	
function calc_window_size() 
{
    if( typeof( window.innerWidth ) == 'number' ) 
    {
        //Non-IE
        _inner_browser_width = window.innerWidth;
        _inner_browser_height = window.innerHeight;
    } 
    else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) 
    {
        //IE 6+ in 'standards compliant mode'
        _inner_browser_width = document.documentElement.clientWidth;
        _inner_browser_height = document.documentElement.clientHeight;
    } 
    else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) 
    {
        //IE 4 compatible
        _inner_browser_width = document.body.clientWidth;
        _inner_browser_height = document.body.clientHeight;
    }
}

function calc_scroll_xy() 
{
    _browser_scroll_x = 0;
    _browser_scroll_y = 0;
    if( typeof( window.pageYOffset ) == 'number' ) 
    {
        //Netscape compliant
        _browser_scroll_y = window.pageYOffset;
        _browser_scroll_x = window.pageXOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) 
    {
        //DOM compliant
        _browser_scroll_y = document.body.scrollTop;
        _browser_scroll_x = document.body.scrollLeft;
    } 
    else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) 
    {
        //IE6 standards compliant mode
        _browser_scroll_y = document.documentElement.scrollTop;
        _browser_scroll_x = document.documentElement.scrollLeft;
    }
}

function scorll_y()
{
	calc_window_size();
	calc_scroll_xy();
	var obj_ad=document.getElementById("float_ad");
	obj_ad.style.left=_inner_browser_width-(_inner_browser_width-1020)/2;
	obj_ad.style.top=_browser_scroll_y+_inner_browser_height-223;
	//setTimeout("scorll_y();",30)
}
//初始化显示悬浮窗
$(function(){
	try{
		if(noalert){
			return;
		}
	}catch(e){}
	//调用悬浮窗接口，获取悬浮窗显示图片及连接
	util.getCMSData("CMS.JSON.A01074015008","param=1",1,function(data){
		var result=null;
		//循环10个，找对应地区，或者全国的。
		for(var i=0;i<data.length;i++){
			var obj=data[i];
			if(i==10){
				break;
			}
			//判断地区限制
			if(obj.a1!=null && obj.a1!="" && areaCode!=null && areaCode!="" ){
				var attr_a1 = ","+obj.a1+",";
				if(attr_a1.indexOf(","+areaCode+",")<0){
					result=obj;
				}
			}else{
				if(result==null){
					result=obj;
				}
			}
		}
		if(result!=null){ //没有数据则不显示弹窗
			var src = result.pic;
			var desc = result.desc;
			var url = result.url;
			//若链接为#则不打开
			if(url !="#"){
				$("#header_ad").attr('onclick', '').bind('click',function(){window.open(url);});
			}
			var str = "<img src='"+src+"' width=950 height=500 border=0 />"
			document.getElementById("header_ad").innerHTML = str;
			$("#xinban").attr("href",url);
			$("#xinban").html(desc);
			
			//有数据才显示
			if( typeof(noalert)=="undefined" || !noalert ){
				showAds(500,0,500,500);
			}
			//scorll_y();
			//若描述为空则不显示描述信息
			if(desc==""){
				document.getElementById("xbdw").style.display = "none";
			}
		}
	});
});