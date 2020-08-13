function isAuthority(url,isValid,e){
	if(isValid){
		var url_str=url;
		if(url.startsWith("http")||url.startsWith("https")){
			var index_=url.indexOf("/",8);
			url_str=url.substring(index_);
		}
		$.ajax({
			     url: ilearn_url+"/productGrant/isAuthority?url="+url_str,
			    type: 'POST',
			dataType: 'jsonp',
			jsonp:'callback',
			 success: function(data){
				if(data.success){
					location.href=url;
				}else{
					//artAlert(e, 'warnin', "<div style='text-align:center'>"+data.message+"</div>"); 
					//location.href=data.data;
					artAlertAuthority(e,data.message,data.data);
				}
			}
		});
	}else{
		location.href=url;
	}
}
function artAlertAuthority(e,message,url){
	art.dialog({
		top:'100px',
		width:"310px",
		height:"60px",
		title:"溫馨提示",
		icon: "face-sad",
		content: '<p>'+message+'</p><p align="center"><a style="text-decoration:underline;" target="_blank" href="'+url+'">查看详情</a></p>',
		time:  10,
		opacity:0.2,
		ok:function(){
			
		}
  });
}
var messageTip;
var messageUrl;
var istrue=true;
function getAuthority(url){
		istrue=true;
		var url_str=url;
		if(url.startsWith("http")||url.startsWith("https")){
			var index_=url.indexOf("/",8);
			url_str=url.substring(index_);
		}
		$.ajax({
			     url: "/productGrant/isAuthority?url="+url_str,
			    type: 'POST',
			    async : false,
			dataType: 'json',
			 success: function(data){
				if(!data.success){
					istrue=false;
					messageTip=data.message;
					messageUrl=data.data;
				}
			}
		});


}

String.prototype.startsWith=function(str){  
  if(str==null||str==""||this.length==0||str.length>this.length)  
   return false;  
  if(this.substr(0,str.length)==str)  
     return true;  
  else  
     return false;  
  return true;  
}  