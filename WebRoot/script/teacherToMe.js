/**
 * 首页：教师对我说
 * b01:网上作业
 * b03：预 习
 * b04：推 荐
 * b05：成 绩
 * b06：消 息
 * b07：错题本
 * basepath：根路径(http://192.168.143.43:8080/ilearn)
 */
(function($){
	$.fn.task=function(options){
		if (typeof options == 'string'){
			return {};
		}
		options = options || {};
		var el=[
				    '<div class="app_stu">',
				    	'<a class="ta b01" href="javascript:;"><strong>作业</strong></a>',
				    	'<a class="ta b03" href="javascript:;"><strong>导学</strong></a>',
				    	'<a class="ta b04" href="javascript:;"><strong>推 荐</strong></a>',
				    	'<a class="ta b05" href="javascript:;"><strong>成 绩</strong></a>',
				    	'<a class="ta b06" href="javascript:;"><strong>消 息</strong></a>',
				    	'<a class="ta b07" href="javascript:;"><strong>错题本</strong></a>',
			    		'<div class="clearfix"></div>',
				    '</div>'
		    ].join('');
		el=$(el);
		//$(this).children(':first').after(el);
		el.appendTo($(this));
		if(options.basepath){
			var basepath=options.basepath;
			var plspath=options.plspath;
			//加载链接
			$.ajax({
				url:basepath+'w/stu/inf/genTaskUrl.action',
				type:'POST',
				dataType:'jsonp',
				jsonpCallback:'ilearntask',
				success:function(data){
					$.each(data,function(k,v){
						el.find('a.'+k).attr('href',"javascript:isAuthority('"+v+"',true,this)");
					});
				}
			});
			
			//加载网上作业
			/*$.ajax({
				url:basepath+'w/stu/inf/oLHomeCount.action',
				type:'POST',
				dataType:'jsonp',
				jsonpCallback:'ilearnolhome',
				success:function(data){
					if(data.count > 0){
						el.find('a.b01').children(':first').before('<span>'+data.count+'</span>');
					}
				}
			});*/
			
			//预习、推 荐、成 绩、消息
			$.ajax({
				url:basepath+'w/stu/inf/getNewsCount.action',
				type:'POST',
				dataType:'jsonp',
				success:function(data){
					$.each(data,function(k,v){
						if(v > 0 && k != "b03"){
							el.find('a.'+k).children(':first').before('<span>'+v+'</span>');
						}
					});
				}
			});
			//导学未完成数量
			$.ajax({
				     url: options.plspath+username,
				    type: 'POST',
				dataType: 'jsonp',
				   jsonp: 'jsoncallback',
				 success: function(data){
					 if(data.StuKpNotLearnCount > 0)
					    el.find('a.b03').children(':first').before('<span>'+ data.StuKpNotLearnCount +'</span>');
				}
			});
		}
	}
})(jQuery);