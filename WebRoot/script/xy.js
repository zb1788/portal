//cms通用调用处理
//http://cms.czbanbantong.com/cms/interface.jsp?data={"dataflie":"/A01/A01051/A01051008/list.json"}
function getCMS_jyzx(filepath,bomid){
	var myDate = new Date();
	var htmlcode = new Array();
	var cmsurl="http://cms.czbanbantong.com";
	jQuery(function($){
  		$.getJSON("http://cms.czbanbantong.com/cms/interface.jsp?data={\"dataflie\":\""+filepath+"\"}&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",function(result){
  			if(result && result.infosList){
				$(result.infosList).each(function(num){
					if($(this).attr("contenttype")=="HTML"){
						htmlcode.push('<li><a href="'+cmsurl+$(this).attr("filepath")+'" target="_blank">·'+$(this).attr("topic")+'</a></li>');
					}else if($(this).attr("contenttype")=="SURL"){
						htmlcode.push('<li><a href="'+$(this).attr("infourl")+'" target="_blank">·'+$(this).attr("topic")+'</a></li>');
					}
				});
  			}
			if(htmlcode.length==0){
				htmlcode.push('<li>暂无信息</li>');
			}
			$("#"+bomid).html("<div class=\"news_zx\" ><ul>"+htmlcode.join("")+"</ul></div>");
  		})
  	});
}
//<script type="text/javascript" >
//getCMS_jyzx("/A01/A01051/A01051008/list.json","did");
//</script>