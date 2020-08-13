$(function() {

    // 推荐课堂分类切换
    var $listEl = $('#listEl');
    $listEl.find('.listIndex').on('click', 'li', function() {
        var index = $(this).index();
        $listEl.find('.listBody').children('ul').eq(index).addClass('on').siblings().removeClass('on');
        $(this).addClass('on').siblings('li').removeClass('on');
    });
});