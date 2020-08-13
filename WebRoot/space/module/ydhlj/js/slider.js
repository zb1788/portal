function fSlider(ImgParent, ImgList, NumParent, time) {
    var sNumList = '';
    var iLength = ImgList.length;
    var iCurNum = 1;
    var timer = null;
    //初始化,开始{
    for (var i = 0; i < ImgList.length; i++) {
        ImgList[i].style.opacity = ImgList[i].style.filter = '0';
        sNumList += "<li></li>";
    }
    ImgList[0].style.opacity = '1';
    ImgList[0].style.filter = '100';
    NumParent.innerHTML = sNumList;
    var NumList = NumParent.getElementsByTagName("li");
    NumList[0].className = 'active';
    //}结束，初始化
    timer = setInterval(function () {
        if (iCurNum >= iLength) {
            iCurNum = 0;
        }
        for (var i = 0; i < NumList.length; i++) {
            removeClass(NumList[i], 'active');
            move(ImgList[i], { opacity: 0 }, 1000, 'easeOut', function () { });
            ImgList[i].style.zIndex = 1;
        }
        move(ImgList[iCurNum], { opacity: 1 }, 1000, 'easeOut', function () { iCurNum++ });
        ImgList[iCurNum].style.zIndex = 100;
        addClass(NumList[iCurNum], 'active');
    }, time);
    for (var i = 0; i < NumList.length; i++) {
        NumList[i].index = i;

        NumList[i].onmouseover = function () {
            for (var i = 0; i < NumList.length; i++) {
                removeClass(NumList[i], 'active');
                move(ImgList[i], { opacity: 0 }, 1000, 'easeOut', function () { });
                ImgList[i].style.zIndex = 1;
            }
            addClass(this, 'active');
            move(ImgList[this.index], { opacity: 1 }, 1000, 'easeOut', function () { });
            iCurNum = this.index;
            ImgList[this.index].style.zIndex = 100;
        }
    }
    ImgParent.onmouseover = function () {
        clearInterval(timer);
    }
    ImgParent.onmouseout = function () {
        timer = setInterval(function () {
            if (iCurNum >= iLength) {
                iCurNum = 0;
            }
            for (var i = 0; i < NumList.length; i++) {
                removeClass(NumList[i], 'active');
                move(ImgList[i], { opacity: 0 }, 1000, 'easeOut', function () { });
                ImgList[i].style.zIndex = 1;
            }
            move(ImgList[iCurNum], { opacity: 1 }, 1000, 'easeOut', function () { iCurNum++ });
            ImgList[iCurNum].style.zIndex = 100;
            addClass(NumList[iCurNum], 'active');
        }, time);
    }
}