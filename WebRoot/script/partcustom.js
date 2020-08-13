//处理定制应用
//liuzhiqiang@zzvcom.com
var _customUtil = new CustomUtilObj();

function CustomUtilObj() {
	
}
//_customUtil.del(obj)  
CustomUtilObj.prototype.del = function (obj) {
   var lmid=$(obj).attr("type");
   var lmidindex=$(obj).attr("index")
   if(lmid){
	  $(obj).unbind();
	  $(obj).removeClass("del");
   	  $(obj).addClass("add");
      $(obj).click(function(){
		_customUtil.add(this);		 
	  });
	  $(obj).find("img:first").attr("src",path+"/space/images/add.jpg");
	  if($("#"+lmid+" .add").size()==0){
	  	  $("#"+lmid).append($(obj).parent().parent());
	  }else{
		  $("#"+lmid+" .add").each(function(i){
			   var lmid2=$(this).attr("index");
			   if(lmid2>lmidindex){
				   $(obj).parent().parent().insertBefore($(this).parent().parent());
				   //$(this).parent().parent().insertBefore($(obj).parent().parent()); 
				   return false;
			   }else{
			   		if(i==$("#"+lmid+" .add").size()-1){
						 $("#"+lmid).append($(obj).parent().parent());	
					}
			   }
		  });
	  }
	  
   }
   //$(obj).parent().parent().remove();
}
//_customUtil.add(obj)  
CustomUtilObj.prototype.add = function (obj) {
   $(obj).unbind();
   $(obj).removeClass("add");
   $(obj).addClass("del");
   $(obj).click(function(){
		_customUtil.del(this);		 
	});
   $(obj).find("img:first").attr("src",path+"/space/images/del.jpg");
   $("#dingzhi").append($(obj).parent().parent());
}
CustomUtilObj.prototype.over= function (obj){
	$("#testdrag").html($(obj).html());
}
//展开或者隐藏我的应用
CustomUtilObj.prototype.expend=function(){
	var leg=$("#customer dl");
	if(!$("#customer_lodding").attr("showtype")){
		var he=(leg.size()>6)?(280+(Math.ceil(leg.size()/3)-2)*85+(Math.ceil(leg.size()/3)-2)*6):280;
		leg.each(function(){
			$(this).show();
		});
		$("#customer_lodding").attr("showtype",1);
		$("#customer_lodding").css("height",he);
		$(".more_app span").removeClass("downArr");
		$(".more_app span").addClass("upArr");
	}else{
		leg.each(function(num){
			if(num<=5)$(this).show();
			else $(this).hide();
		});
		$("#customer_lodding").attr("showtype",0);
		$("#customer_lodding").css("height",280);
		$(".more_app span").removeClass("upArr");
		$(".more_app span").addClass("downArr");
	}
}
jQuery(function($){
	$(".del").click(function(){
		_customUtil.del(this);		 
	});
	$(".add").click(function(){
		_customUtil.add(this);		 
	});
});