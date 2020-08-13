$(function() {
	setInterval(function(){
		$("img[data-title]").each(function() {
			if("1"!=$(this).attr("data-init")){
				LoadImage($(this));
				$(this).attr("data-init","1");
			}
		});
	},1000)
});

function LoadImage(_this) {
    var Title = _this.attr("data-title");
    var Width = _this.attr('data-w') || parseInt(_this.css("width"));
    var Height = _this.attr('data-h') || parseInt(_this.css("height"));
    var BorderRadius = _this.css("border-radius");
    var Shape = "square"; if (BorderRadius == "50%") { Shape = "circle" };
    var BorderWidth = parseInt(_this.css("border-width"));
    var BorderColor = Rgb2Hex(_this.css("border-color"));
    if (Title == undefined || !Title) return;
    var cb = 'ddp' + Math.floor(Math.random() * 10000);
    // 留下一个属性为图片的懒惰加载准备
    var _src = _this.attr("data-src") || 'src';
	
    var ajaxparam = {
        url: 'http://112.74.75.214/I_VSEA/service/i_vsea/i_vsea_service.ashx',
        dataType: 'jsonp',
        data: {
            rsc_title: Title,
            width: Width,
            height: Height,
            shape: Shape,
            border_width: BorderWidth,
            border_color: BorderColor
        },
        success: function(data) {
            if (typeof(data) == 'string') {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    data = eval(data);
                }
            }
            if (data && data.data) _this.attr(_src, data.data + '?r=' + new Date().getTime());
        },
        error: function(data, status, e) {
            // console.(JSON.stringify(data), status, e);
        }
    };

    if ($.fn && $.fn.jquery) {
        ajaxparam.jsonpCallback = cb;
        //ajaxparam.data.callback = cb;
        ajaxparam.type = 'post';
    } else {
        ajaxparam.type = 'get';
    }
    $.ajax(ajaxparam);
}

function Rgb2Hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    if (rgb == null) {
        return '000000';
    }
    return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}