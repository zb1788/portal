(function($) {
    $.zz_scroll = function(element, options) {
        var defaults = {
			eachBox:  '.pic_style_gun',
			prevId: 'btnPre',
			nextId: 'btnNext',
			dir: 1,
			type: 3,
			step: 3,
			effect: 'easeInOutExpo',
			loop: false
		}
		var plugin = this;
        plugin.settings = {}
		var $element = $(element);
		
		var init = function() {
			//�ϲ�����
            plugin.settings = $.extend({}, defaults, options);
			$(btnPre2).addClass("hover").attr("title","�Ѿ��ǵ�һҳ");
			
			//ÿ���ӿ��
			var eachWidth = $(plugin.settings.eachBox).outerWidth(),
			    //����
				countbox = $(plugin.settings.eachBox).length,
				overallWid = countbox*eachWidth,
			    //����Ԫ��
			    $gunMain = $(plugin.settings.eachBox).parent(),
				gunMwidth = countbox*eachWidth,
				
				//��������
				marWidth = 0,
				showWid = eachWidth*plugin.settings.type,
				maxlen = Math.ceil(countbox/plugin.settings.type-1)*plugin.settings.type,
				prevBtn = $('#'+plugin.settings.prevId),
				nextBtn = $('#'+plugin.settings.nextId);
				
			$gunMain.width(gunMwidth);
			if(!plugin.settings.loop){$(plugin.settings.prevId).attr('disabled', 'disabled');}	
				
			function mAni() {
				switch (plugin.settings.dir) {
				case 1: 
                $gunMain.animate({marginLeft: -marWidth}, 600 , plugin.settings.effect);

				
				break;
				case 2:
				$gunMain.animate({marginTop: marTop
                }, 600 , plugin.settings.effect);
				break;
			    }
			}
			
			function checkPos() {
				//alert(maxlen)
				$gunMain.stop();
				 if( marWidth >= (overallWid - showWid)){
						 marWidth = overallWid - showWid;
						 $(nextBtn).addClass("hover").attr("title","�Ѿ����һҳ");
					}
					else if(marWidth <= 0 ){
						marWidth = 0;
						 $(prevBtn).addClass("hover").attr("title","�Ѿ��ǵ�һҳ");
					  }
				
			}
				
			$(nextBtn).click(function() {	
				marWidth+=eachWidth*plugin.settings.step;
				$(prevBtn).removeClass("hover").attr("title","");
				checkPos(this);
		        mAni();
				return false;
	        });
			$(prevBtn).click(function() {
				marWidth-=eachWidth*plugin.settings.step;
				$(nextBtn).removeClass("hover").attr("title","");
				checkPos(this);
		        mAni();
				return false;
	        }); 
			$(plugin.settings.eachBox).hover(function(){
				$(this).addClass("hover");
				},function(){
				$(this).removeClass("hover");	
					})
			
		}
		init();
	}

})(jQuery);