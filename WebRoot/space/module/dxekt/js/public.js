var dxbannerf_init=0;
function bannerInit(){
	if(0==dxbannerf_init){
		setTimeout(bannerFlash,300);
		dxbannerf_init=1;
	}
}
function bannerFlash(){
    // localStorage.setItem('height', $(window).height());
    // 导航效果
    autoiFrame($('#getNav .on').find('a'));
    $('#getNav').find('a').click(function() {
        autoiFrame($(this));
    });

    // 兼容IE8样式
    // if (!!$.support.leadingWhitespace) {
    //     $('.banner-nav .grade-body li:nth-child(3n)').css('margin-right', '0');
    //     $('.main-list-body li:first-child,.main-list-body.four li:nth-child(5n),.main-list-body.fives li:nth-child(6n)').css('margin-left', '0');
    // }

    $barnnerImg = $('#barnnerImg');
    // 幻灯片效果处理
    var _iw = 1200;
    $(window).resize(function() {
        var _w = $(window).width();
        _iw = $barnnerImg.find('.banner-img-content').find('li').width(_w < 1270 ? '1270' : _w).width();
        var _ilngth = $barnnerImg.find('.banner-img-content').find('li').length;
        $barnnerImg.find('.banner-img-content').width(_iw * _ilngth);
    }).resize();
    $barnnerImg.find('.banner-img-sub').on('click', 'li', function() {
        var index = $(this).index();
        $barnnerImg.find('.banner-img-content').animate({ left: '-' + (index * _iw) }, 500);
        $(this).addClass('on').siblings('li').removeClass('on');
        $barnnerImg.find('.banner-img-content').find('li').eq(index).addClass('on').siblings('li').removeClass('on');
    });

    // var he = $(window).height;
}
function autoiFrame(el) {
    var height = el.data('h');
    var link = el.data('link');
    var bg = el.data('bg');
    if (!link) {
        return false;
    }
    if (!height) {
        height = 10000;
    }
    // if (localStorage.getItem('height')) {
    //     height = localStorage.getItem('height');
    // }
    // 焦点样式
    $(el).parent().addClass('on').siblings().removeClass('on');
    // 换背景
    $(el).parents('.nav').removeClass('bg');
    if (bg) {
        $(el).parents('.nav').addClass('bg');
    }
    // 改地址
    $('#bodyIframe').height(height).attr('src', link);
    return false;
}