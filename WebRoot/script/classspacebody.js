 
 var classSpace=new ClassSpace();
  function ClassSpace()
 {

 }
 ClassSpace.prototype.getTextByLength=function(text,length)
 {
   if(text)
   {
     if(text.length>length)
     {
       return text.substring(0,length)+"...";
     }
     
   }
   return text;
 }
//获取班级相册
ClassSpace.prototype.getClassAlbum = function (url,classid,mcneter){
	var myDate = new Date();
	var data="data={\"classinfo\":\""+classid+"\",\"pageSize\":20,\"pageNum\":1,\"orderby\":0}";
  	jQuery(function($){
  		$.getJSON(url+"GROUP.ALBUM.LIST&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",data,function(result){
  			$(result.pictrues).each(function(num){
  				if(num<5){
  				  	$("#albumlist").append('<dd><a href="'+mcneter+"/"+$(this).attr("filepath")+'" title="'+$(this).attr("title")+'" target="_blank"><img src="'+mcneter+"/"+$(this).attr("filepath")+'" width="90" height="60" /></a></dd>');
  				}else{
  					$("#albumlist").append('<dd style="display:none;"><a href="'+mcneter+"/"+$(this).attr("filepath")+'" title="'+$(this).attr("title")+'" target="_blank"><img src="'+mcneter+"/"+$(this).attr("filepath")+'" width="90" height="60" /></a></dd>');
  				}
  			});
  			if(result.pictrues.length==0){
  				$("#pinpairecommend").html("<li><span></span><a href=\"javascript:;\">·暂无相册...</a></li>");
  			}else{
  				$("#albumlistlodding").append('<div class="more3"><a href="javascript:;" onclick="classSpace.showMoreClassAlbum(this);" type="1">查看更多<img src="'+path+'/space/images/downArr.gif" width="7" height="4" /></a></div>');
  			}
  			$("#albumlist").append('<div class="clearfix"></div>');
  			$("#albumlistlodding").removeClass("loddingbg");
  			$("#albumlistlodding").removeClass("h130");
  		})
  	})
}
ClassSpace.prototype.showMoreClassAlbum = function (obj) {
	if($(obj).attr("type")==1){
		$("#albumlist dd").each(function(){
			$(this).show();
		});
		$(obj).attr("type",2);
		$(obj).html('收回更多<img src="'+path+'/space/images/downArr.gif" width="7" height="4" />');
	}else{
		$("#albumlist dd").each(function(num){
			if(num<5)$(this).show();
			else $(this).hide();
		});
		$(obj).attr("type",1);
		$(obj).html('查看更多<img src="'+path+'/space/images/downArr.gif" width="7" height="4" />');
	}
	
}
//班级公共
ClassSpace.prototype.getClassMessage = function (url,classid,num,compId) {
	var myDate = new Date();
	var data="data={\"classid\":\""+classid+"\",'type':'0','pagesize':"+num+"}";
  	jQuery(function($){
  		$.getJSON(url+"LCS.GG.1&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",data,function(result){
	  		if(result&&result.length){
	  		
	  			$(result).each(function(num){
	  			  var msgDate=new Date();
	  			  var dateStr="";
	  			  var tmpCreateTime= $(this).attr("createtime");
	  			   if(tmpCreateTime)
	  			   {
	  			     var dstr= Date.parse(tmpCreateTime.replace(/-/g, "/"));
	  			      var d=new Date(dstr);
	  			      var month= d.getMonth()+1;
	  			      dateStr=month+"月";
	  			       dateStr=dateStr+d.getDate()+"日 ";
	  			      var hours=d.getHours()-1;
	  			      dateStr=dateStr+hours+":";
	  			      dateStr=dateStr+d.getMinutes()+" ";
	  			     
	  			   }
	  			 var title=classSpace.getTextByLength($(this).attr("title"),12);
	  				$(compId).append("<li><a  class=\"blue\" href=\""+url+"LCS.GG.4&data={'id':'"+$(this).attr("id")+"'}\" title=\""+$(this).attr("title")+"\">"+title+"</a><br /><font class=\"grayfon2\">"+dateStr+"</font></li>");
	  			});
	  			
	  			if(result.length==0){
	  				$(compId).html("<li><span><a href=\"javascript:;\">·暂无公告...</a></span></li>");
	  			}
	  			
	  		}
	  	})
  	});
}

ClassSpace.prototype.getClassTeacher=function(url,classId,userCenterUrl,classTeacher,teachTeacherId,classTeacherId)
{
    var myDate = new Date();
    var data="data={\"queryType\":\"byClass\",\"schoolClassId\":\""+classId+"\"}";
   
     jQuery(function($){
  		   $.getJSON(url+"TMS.503&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",data,function(result){
	  	   if(result&&result.result)
	  	    {
	  	    var teachers="";
                $(result.rtnArray).each(function(num)
                {
                var headPhoto=userCenterUrl+"/"+$(this).attr("headPhoto");
	  	    	 $(teachTeacherId).append('<dl><dt><a href="'+url+'mcenter.home&reqEncoding=gbk&data={\'username\':\''+$(this).attr("username")+'\'}" target="_parent" title="'+$(this).attr("truename")+'"><img src="'+headPhoto+'" width="50" height="50" /></a></dt><dd><a href="#" class="blue"><strong>'+$(this).attr("truename")+'</strong></a></dd><dd></dd></dl>');
	  	    	if($(this).attr("username")==classTeacher)
	  	    	{
	  	    	  setClassTeacher($(this),userCenterUrl,classTeacherId);
	  	    	}
	  	    	});
	  	    	$(teachTeacherId).append("<div class=\"clearfix\"></div>");
	  	   
	  	       
	  	     }else
	  	     {
	  	     }
	  	   //  alert($("#teachTeacher"));
	  	})
  	});
 }
 function setClassTeacher(item,userCenterUrl,tmpId){
   	var headPhoto=userCenterUrl+"/"+item.attr("headPhoto");
 	$(tmpId).append('<dl style="border:none;">'+
                    '<dt><a href="'+interurll+'mcenter.home&reqEncoding=gbk&data={\'username\':\''+$(item).attr("username")+'\'}" target="_parent" title="'+$(item).attr("truename")+'"><img src="'+headPhoto+'" width="50" height="50" /></a></dt>'+
                    '<dd><a href="'+interurll+'mcenter.home&reqEncoding=gbk&data={\'username\':\''+$(item).attr("username")+'\'}" target="_parent" class="blue"><strong>'+$(item).attr("truename")+'</strong></a></dd>'+
                    '<dd><a href="'+interurll+'mcenter.home&reqEncoding=gbk&data={\'username\':\''+$(item).attr("username")+'\'}" target="_parent" class="blue">查看资料</a></dd>'+
                    '<div class="clearfix"></div>'+
                '</dl>');
   	//$(tmpId).append('<dl><dt><a href="'+interurll+'mcenter.home&reqEncoding=gbk&data={\'username\':\''+$(item).attr("username")+'\'}" target="_parent" title="'+$(item).attr("truename")+'"><img src="'+headPhoto+'" width="50" height="50" /></a></dt><dd><a href="#" class="blue"><strong>'+$(item).attr("truename")+'</strong></a></dd><dd></dd></dl>');
    $(tmpId).append('<div class="clearfix"></div>');
}
ClassSpace.prototype.getClassMonitor=function(url,classMonitor,userCenterUrl,compId)
{
   if(classMonitor==null || classMonitor==""){
   		//$(compId).html("<li><span><a href=\"javascript:;\">·暂无管理员...</a></span></li><div class=\"clearfix\"></div>");
   		$("#guanliyuan").hide();
   		return;
   };
   var myDate = new Date();
   var data="data={\"queryType\":\"byNames\",\"usernames\":[\""+classMonitor+"\"]}";
   jQuery(function($){
  		   $.getJSON(url+"TMS.501&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",data,function(result){
           if(result&&result.result==1)
	  	    {
	  	       $(result.rtnArray).each(function(num)
                {
                  setClassMonitor($(this),userCenterUrl,compId);
                }
                );
	  	    
	  	    }else{
	  	    	$("#guanliyuan").hide();
	  	    }
            
     	})
  	});

}

function setClassMonitor(item,userCenterUrl,tmpId){
    var headPhoto=userCenterUrl+"/"+item.attr("headPhoto");
      $(tmpId).append('<dl style="border:none;"><dt><a href="#" title="'+item.attr("realname")+'"><img src="'+headPhoto+'" width="50" height="50" /></a></dt><dd><a href="#" class="blue"><strong>'+item.attr("realname")+'</strong></a></dd>'
          +'<dd><a href="'+url+'mcenter.home&reqEncoding=gbk&data={\'username\':\''+$(this).attr("username")+'\'}" target="_parent" class="blue">查看资料</a></dd> <div class="clearfix"></div>'
         +'</dl>');
    $(tmpId).append('<div class="clearfix"></div>');
}
//获取班级访问量        
ClassSpace.prototype.getCalssVisCount=function(url,classid){
 	var myDate = new Date();
	var data="data={'classname':'"+classid+"'}";
  	jQuery(function($){
  		$.getJSON(url+"M.VIEWNUM&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",data,function(result){
	  		if(result){
	  			//if(result.errcode==0)$(".orangeFon").html(result.unReadMailNum);
	  			$("#visnum").html(result.viewNum);
	  		}
	  	})
  	});
}
//获取班级来访接口   
ClassSpace.prototype.getCalssVisit=function(url,classid,userCenterUrl){
 	var myDate = new Date();
	var data="data={'classname':'"+classid+"','num':'12'}";
  	jQuery(function($){
  		$.getJSON(url+"M.VISITORSLIST&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",data,function(result){
	  		if(result[0].vList){
	  			$(result[0].vList).each(function(){
	  				$("#visitlist").append('<li><a href="'+url+'mcenter.home&reqEncoding=gbk&data={\'username\':\''+$(this).attr("username")+'\'}" class="tooltip"><span>'+($(this).attr("truename")==null?"":$(this).attr("truename"))+'　'+$(this).attr("datetime")+'</span><img src="'+userCenterUrl+$(this).attr("avatarurl")+'" width="30" height="30" /></a></li>');
	  			});
	  		}
	  		$("#visitlist").removeClass("h50");
	  		$("#visitlist").removeClass("loddingbg");
	  	})
  	});
}
//添加班级来访接口   
ClassSpace.prototype.getaddCalssVisit=function(url,classid,currentname){
 	var myDate = new Date();
	var data="data={'classname':'"+classid+"','username':'"+currentname+"'}";
  	jQuery(function($){
  		$.getJSON(url+"M.VISITOR&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",data,function(result){
	  		//alert(result.result);
	  	})
  	});
}            
//获取班级留言接口
ClassSpace.prototype.getCalssMessageList=function(url,classid,pagesize,num){
 	var myDate = new Date();
	var data="data={'classname':'"+classid+"','pageSize':'"+pagesize+"','pageNum':'"+num+"'}";
  	jQuery(function($){
  		$.getJSON(url+"M.COMLIST&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",data,function(result){
	  		if(result){
	  			//$("#visitlist").append('<li><a href="#" class="tooltip"><span>苏军英　3月7号</span><img src="../img/touxiang5.gif" width="30" height="30" /></a></li>');
	  			$("#messagelist").html("");
	  			var del="";
	  			$(result[0].comList).each(function(){
	  				if(classTeacher==username){
		  				del='<br/><a href="javascript:" onclick="classSpace.delCalssMessage(interurll,'+$(this).attr("cid")+')">删除</a>';
		  			}
	  				var h='<tr>'+
					    '<td align="left" width="400"><span class="blue">&nbsp;&nbsp;&nbsp;&nbsp;'+$(this).attr("message")+'</span></td>'+
					    '<td><a href="'+url+'mcenter.home&reqEncoding=gbk&data={\'username\':\''+$(this).attr("username")+'\'}" target="_parent" class="blue" target="_parent">'+($(this).attr("truename")==null?"":$(this).attr("truename"))+'</a><br />'+$(this).attr("posttime").replace("T","<br/>")+del+'</td>'+
					    '</tr>';
					$("#messagelist").append(h);
	  			});
	  			$("#pages").html(classSpace.getCalssPage(result[0].pageSize,result[0].pageNum,result[0].count));
	  		}
	  		
	  	})
  	});
}
//分页计算
ClassSpace.prototype.getCalssPage=function(pageSize,pageNum,count){
	//<a href="#" class="a1">上一页</a> <span>1</span> <a href="#">2</a> <a href="#">3</a>  <a href="#">4</a>  <a href="#">5</a> <a href="#" class="a1">下一页</a>
	var allpage=Math.ceil(count/pageSize);
	var page='共<strong>'+count+'</strong>条 第<strong>'+pageNum+'</strong>页/共<strong>'+allpage+'</strong>页';
	if(pageNum>1)page+='<a href="javascript:classSpace.getCalssMessageList(interurll,classid,'+pageSize+','+(pageNum-1)+')" class="a1">上一页</a>';
	else page+='<a href="#" class="a1">上一页</a>';
	if(allpage<=5){
		for(var i=1;i<=allpage;i++){
			if(i==pageNum)page+='<span>'+i+'</span>';
			else page+='<a href="javascript:classSpace.getCalssMessageList(interurll,classid,'+pageSize+','+i+');">'+i+'</a>';
		}
	}else if(allpage-pageNum<5){
		for(var i=allpage-5;i<=allpage;i++){
			if(i==pageNum)page+='<span>'+i+'</span>';
			else page+='<a href="javascript:classSpace.getCalssMessageList(interurll,classid,'+pageSize+','+i+');">'+i+'</a>';
		}
	}else{
		if(pageNum-3<=0){
			for(var i=1;i<=5;i++){
				if(i==pageNum)page+='<span>'+i+'</span>';
				else page+='<a href="javascript:classSpace.getCalssMessageList(interurll,classid,'+pageSize+','+i+');">'+i+'</a>';
			}
		}else{
			for(var i=(pageNum-2);i<=(pageNum+3);i++){
				if(i==pageNum)page+='<span>'+i+'</span>';
				else page+='<a href="javascript:classSpace.getCalssMessageList(interurll,classid,'+pageSize+','+i+');">'+i+'</a>';
			}
		}
	}
	if(pageNum<allpage)page+='<a href="javascript:classSpace.getCalssMessageList(interurll,classid,'+pageSize+','+(pageNum+1)+')" class="a1">下一页</a>';
	else page+='<a href="#" class="a1">下一页</a>';
	return page;
}
ClassSpace.prototype.delCalssMessage=function(url,sid){
	if(window.confirm("你确定要删除该留言吗？")){
		var myDate = new Date();
		var data="data={'id':'"+sid+"'}";
	  	jQuery(function($){
	  		$.getJSON(url+"M.DELCOMMENT&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",data,function(result){
		  		if(result){
		  			if(result.result==0)alert("删除留言成功!");
		  			else alert("删除留言失败!");
		  			classSpace.getCalssMessageList(interurll,classid,20,1);
		  		}
		  		
		  	})
	  	});
	}
}
//添加班级留言接口
ClassSpace.prototype.getaddCalssMessage=function(url,classid,currentuser,message){
 	var myDate = new Date();
	var data="data={'classname':'"+classid+"','username':'"+currentuser+"','message':'"+encodeURIComponent(encodeURIComponent(message))+"'}";
  	jQuery(function($){
  		$.getJSON(url+"M.COMADD&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",data,function(result){
	  		if(result){
	  			if(result.result==0)alert("保存留言成功!");
	  			else alert("保存留言失败!");
	  			classSpace.getCalssMessageList(url,classid,20,1);
	  		}
	  		
	  	})
  	});
} 
//获取班级动态接口
ClassSpace.prototype.getClassdynamic=function(url,classid,sid,username){
 	var myDate = new Date();
	var data="data={'username':'"+classid+"','idtype':'"+sid+"'}";
  	jQuery(function($){
  		$.getJSON(url+"mcenter.myfeed&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",data,function(result){
 			$(result).each(function(){
 				var h='<li>'+
                	'<div class="touxiang1"><a href="'+url+'mcenter.home&reqEncoding=gbk&data={\'username\':\''+$(this).attr("username")+'\'}" title="'+$(this).attr("truename")+'" target="_parent"><img src="'+userCenterUrl+"/"+$(this).attr("avatarurl")+'" width="50" height="50" /></a></div>'+
                    '<div class="tIntro">'+
                    '<dl>'+
						'<dd class="font14"><a href="'+$(this).attr("url")+'" class="blue2">'+$(this).attr("title")+'</a></dd>'+
						'<dd>来自：<a href="'+url+'mcenter.home&reqEncoding=gbk&data={\'username\':\''+$(this).attr("username")+'\'}" class="blue" target="_parent">'+($(this).attr("truename")==null?"未知":$(this).attr("truename"))+'</a></dd>'+
                        '<dd>'+$(this).attr("body")+'</dd>'+
                        '<div class="clearfix"></div>'+
                        '</dd>'+
                    '</dl>'+
                   ' </div>'+
                    '<div class="clearfix"></div>'+
               ' </li>';
            $("#classdynamiclist").append(h);
 			});
 			if(result.length==0){
 				 $("#classdynamiclist").html("<li><span><a href=\"javascript:;\">·暂无动态...</a></span></li>");
 			}
 			$("#classdynamiclist").removeClass("h450");
 			$("#classdynamiclist").removeClass("loddingbg");
	  	})
  	});
} 