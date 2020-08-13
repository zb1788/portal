/**
 * 面向对象选项卡 2015/5/19. 李聪，QQ271512735
 */
function tab(ID,tabTitle,tabContent){
    this.oTab=document.getElementById(ID);
    this.aTabTitle=this.getByClass(tabTitle)[0].children;
    this.atabContent=this.getByClass(tabContent)[0].children;
    this.iNow=0;
    this.timer=null;
    this.arr=[];

}
tab.prototype.init = function (Event) {
    for (var i = 0; i < this.atabContent.length; i++) {
        this.atabContent[i].style.display = 'none';
    }
    this.addClass(this.aTabTitle[0], 'active');
    if (this.atabContent[0].tagName.toLocaleLowerCase() == "table") {
        this.atabContent[0].style.display = 'inline-table';
    } else {
        this.atabContent[0].style.display = 'block';
    }
    var _this = this;
    for (var i = 0; i < this.aTabTitle.length; i++) {
        this.aTabTitle[i].index = i;
        this.aTabTitle[i][Event] = function () {
            _this.change(this);
        }
    }
}
tab.prototype.change = function (obj) {
    for (var i = 0; i < this.aTabTitle.length; i++) {
        this.removeClass(this.aTabTitle[i], 'active');
        this.atabContent[i].style.display = 'none';
    }
    this.addClass(obj, 'active');
    if (this.atabContent[0].tagName.toLocaleLowerCase() == "table") {
        this.atabContent[obj.index].style.display = 'inline-table';
    } else {
        this.atabContent[obj.index].style.display = 'block';
    }
    this.iNow = obj.index;
}
tab.prototype.autoplay=function(){
    var _this=this;
    this.timerFn();
    this.oTab.onmouseover=function(){
        clearInterval(_this.timer);
    }
    this.oTab.onmouseout=function(){
        _this.timerFn();
    }
}
tab.prototype.timerFn = function () {
    var _this = this;
    this.timer = setInterval(function () {
        if (_this.iNow == _this.aTabTitle.length - 1) {
            _this.iNow = 0;
        }
        else {
            _this.iNow++;
        }
        for (var i = 0; i < _this.aTabTitle.length; i++) {
            _this.removeClass(_this.aTabTitle[i], 'active');
            _this.atabContent[i].style.display = 'none';
        }
        _this.addClass(_this.aTabTitle[_this.iNow], 'active');
        if (this.atabContent[0].tagName.toLocaleLowerCase() == "table") {
            _this.atabContent[_this.iNow].style.display = 'inline-table';
        } else {
            _this.atabContent[_this.iNow].style.display = 'block';
        }
    }, 2000);
}
tab.prototype.getByClass=function(sClass){
    var aElem=this.oTab.getElementsByTagName('*');
    var arr=[];
    var re=new RegExp('\\b'+sClass+'\\b');
    for(var i=0;i<aElem.length;i++){
        if(re.test(aElem[i].className)){
            arr.push(aElem[i]);
        }
    }
    return arr;
}

tab.prototype.addClass=function (obj,sClass){
    var old=obj.className;
    var re=new RegExp('\\b'+sClass+'\\b','g');
    if(old==''){
        obj.className=sClass;
    }else if(!re.test(old)){
        obj.className+=' '+sClass;
    }
}

tab.prototype.removeClass=function(obj,sClass){
    var old=obj.className;
    var arr=old.split(' ');
    var re=new RegExp('\\b'+sClass+'\\b','g');
    if(old==sClass){
        obj.className='';
    }else{
        for(var i=0;i<arr.length;i++){
            if(arr[i]==sClass){
                arr.splice(i,1);
            }
        }
        obj.className=arr.join(' ');
    }
}