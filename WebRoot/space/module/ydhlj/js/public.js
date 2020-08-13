function getByClass(oParent,sClass){
    var aElem=oParent.getElementsByTagName('*');
    var arr=[];
    var re=new RegExp('\\b'+sClass+'\\b');
    for(var i=0;i<aElem.length;i++){
        if(re.test(aElem[i].className)){
            arr.push(aElem[i]);
        }
    }
    return arr;
}
function addClass(obj,sClass){
    var old=obj.className;
    var re=new RegExp('\\b'+sClass+'\\b','g');
    if(old==''){
        obj.className=sClass;
    }else if(!re.test(old)){
        obj.className+=' '+sClass;
    }
}
function removeClass(obj,sClass){
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