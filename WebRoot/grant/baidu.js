var baidu_url="http://study.baidu.com/";
function setBaiDuUrl(turl){
	if(typeof(turl)!="undefined" && turl!=null && turl!="null" && turl!=""){
		baidu_url=turl;
		if("http:"!=baidu_url.substring(0,5) && baidu_url.indexOf(":")==-1){
			baidu_url="http://"+baidu_url;
		}
	}
}