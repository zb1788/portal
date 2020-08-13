/**//** 目标面板 */
var tarElement=null;
/**//** 实际被拖动面板 */
var dragElement=null;
/**//** 定义元素位置 */
var downX,downY,tmp_o_x,tmp_o_y;

var refElement=null;
var dragActive=0;//拖动状态是否，1代表拖动中，0代表拖动完毕
var dragendtype=0;
var targetobject;
/**//** 是否在移动中 1为是 */
var draging=0;

function getEventElement (event){
    if(event == null){
        event = window.event;
    } 
    return (event.srcElement ? event.srcElement : event.target);
}

/**//**
 * onMouseDown触发事件
 */
 function readyDrag(event) {
  	//testdrag为测试打印日志信息
  	if(dragActive==1)return;
  	dragActive = 1;
    var eventObj = getEventElement(event);
    // 非DIV元素不能被拖动
    //if(eventObj.tagName != "LI") return;
	
    // 将目标元素附给dragElement
    
    dragElement = eventObj;
   // while(dragElement.tagName != "dl"&&dragElement.tagName != "BODY"){
    	//dragElement=dragElement.parentNode;
    //}
    //alert(dragElement.outerHTML);
    // 复制一个tmpElement到目标面板
    tarElement = dragElement.cloneNode(true);
    // TODO alpha(opacity=50)仅被IE支持
    //tarElement.style.filter="alpha(opacity=70)"
    tarElement.style.zIndex=1000000000;
    tarElement.oncontextmenu=null;
    tarElement.ondblclick=null;
    tarElement.onMouseDown=null;
    tarElement.onclick=null;
    tarElement.onmousedown=null;
	tarElement.id="drag";
    //tarElement.onmouseOut="testmouceout()";
    //tarElement.attachEvent("onmouseout",testmouceout);
    //tarElement.style.top=dragElement.getBoundingClientRect().top+200;
    //tarElement.style.left=dragElement.getBoundingClientRect().left;
    //alert(dragElement.getBoundingClientRect().top);
    //dragElement.style.zIndxe=1;
    //tarElement.style.zIndxe=1000000000;
    tarElement.style.position="absolute";

    //if(dragElement.parentNode.tagName != "BODY"){
        // 当选中可拖动元素时,初始化拖动元素的初始位置
        // TODO pixelLeft仅被IE支持
        //dragElement.style.left = dragElement.offsetLeft + dragElement.parentNode.style.pixelLeft;
       // dragElement.style.top = dragElement.offsetTop + dragElement.parentNode.style.pixelTop;
    //}

    //取得当前鼠标的绝对位置
    downX=event.clientX;
    downY=event.clientY;
    //取得拖动元素当前的绝对位置
    tmp_o_x=dragElement.getBoundingClientRect().left-5;
    tmp_o_y=dragElement.getBoundingClientRect().top-7;
    tarElement.style.visibility="hidden";

    movetarget.appendChild(tarElement);
    ___fcode=null;
    
    testdrag.innerHTML="1";
    document.onmousemove=startDrag;
    document.onmouseup=endDrag;
 }
function testmouceout(){
	testdrag.innerHTML="__f";
	//endDrag();
}

/**//**
 * onMouseOver事件触发
 */
function startDrag(){
	testdrag.innerHTML="2dddddddddddddd";
	//testdrag.innerHTML=new Date(); 
    if(dragActive==1&&dragElement!=null&&tarElement!=null){
		testdrag.innerHTML="3"+"dd"+(Math.abs(tmp_o_y-(tmp_o_y+event.clientY-downY))>5||Math.abs(tmp_o_x-(tmp_o_x+event.clientX-downX))>5);
		//当拖动动作进行、mouse button pressed、拖动物件存在、目标面板存在的情况下
        //if(Math.abs(tmp_o_y-(tmp_o_y+event.clientY-downY))>5||Math.abs(tmp_o_x-(tmp_o_x+event.clientX-downX))>5){
        	tarElement.style.visibility="visible";
	        tarElement.style.left=tmp_o_x+event.clientX-downX;
	        tarElement.style.top=tmp_o_y+event.clientY-downY;
	        //dragElement.style.backgroundColor="#CCCCCC";
	        //游标样式
	        //document.body.style.cursor="move";
	        draging=1;
	        dragendtype=1;
	        mathposition(tarElement);
        //}else{
        	//dragendtype=0;
        	//tosetallselect();
        	//testdrag.innerHTML="a";
        	//endDrag();
        //}
        
    }else{
    	dragendtype=0;
    	tosetallselect();
    	testdrag.innerHTML="b";
    	//endDrag();
    }
}
var ___fcode;
function mathposition(object){
	testdrag.innerHTML="4";
	try{
		if(targetobject){
			targetobject.childNodes(0).className="";
		}
	}catch(e){}
	
	targetobject=null;
	var ilinesize=parseInt(movetarget.offsetWidth/114);
	var ifilesize=movetarget.children.length;
	var itop=movetarget.getBoundingClientRect().top;
	var ileft=movetarget.getBoundingClientRect().left;
	//itop=parseInt(itop)+parseInt(movetarget.scrollTop);
	
	var itopline=parseInt((parseInt(object.style.top)+parseInt(movetarget.scrollTop)-parseInt(itop)+30)/137);
	var ileftline=parseInt((parseInt(object.style.left)-parseInt(ileft))/114);
	var currentsize=itopline*ilinesize+ileftline;
	if(currentsize<ifilesize&&currentsize>=0){
		try{
			targetobject=movetarget.childNodes(currentsize);
			targetobject.childNodes(0).className="onmove";
			//__object.className="onmove";
			if(!___fcode){
				___fcode=targetobject;
			}else if(___fcode.fcode!=targetobject.fcode){
				___fcode.childNodes(0).className="";
				___fcode=targetobject;
			}
		}catch(e){
			
		}
		testdrag.innerHTML="4a";
	}
	testdrag.innerHTML="7";
	//if(parseInt(object.style.left)<20||parseInt(object.style.left)>document.body.clientWidth-100||parseInt(object.style.top)<20||parseInt(object.style.top)>document.body.clientHeight-100){testdrag.innerHTML="4b";endDrag();return;}
	testdrag.innerHTML="4c";
	//testdrag.innerHTML=itopline*ilinesize+ileftline+""+movetarget.childNodes(currentsize).outerHTML;
}
/**//**
 * onMouseUp时间触发
 */
function endDrag(){
	document.onmousemove=null;
	document.onmouseup=null;
	testdrag.innerHTML="5";
	try{
		targetobject.childNodes(0).className="";
	}catch(e){}
    if(dragActive==1&&tarElement!=null){
        //当拖动动作进行、目标面板存在的情况下
        if(draging==1){
            // 如果面板处于移动状态中，将原有面板移除 
            //tarElement.removeNode(true);
            //tarElement.style.visibility="hidden";
            draging=0;
        }

        //tarElement.style.filter="alpha(opacity=100)";
        //tarElement.style.zIndex=1;
        //document.body.style.cursor="default";
        //window.resizeBy(0,1);
    }
	//scroller("toddrags",150,"drag");

    if(tarElement){
    	tarElement.removeNode(true);
    	tarElement=null;
    }
    //alert(document.body.clientWidth+"dd"+movetarget.getBoundingClientRect().left+"ss"+movetarget.getBoundingClientRect().right+"bb"+movetarget.offsetWidth);
    //alert(movetarget.offsetWidth/114)
    if(!targetobject||dragElement.fcode==targetobject.fcode){dragActive=0;tosetallselect();return};
    if(dragendtype==1){
    	if(targetobject){
			   if(targetobject.getBoundingClientRect().top<dragElement.getBoundingClientRect().top){
			   		targetobject.outerHTML=dragElement.outerHTML+targetobject.outerHTML;
			   }else if(targetobject.getBoundingClientRect().top>dragElement.getBoundingClientRect().top){
			   		targetobject.outerHTML=targetobject.outerHTML+dragElement.outerHTML;
			   }else if(targetobject.getBoundingClientRect().left>dragElement.getBoundingClientRect().left){
			   		targetobject.outerHTML=targetobject.outerHTML+dragElement.outerHTML;
			   }else{
			   		targetobject.outerHTML=dragElement.outerHTML+targetobject.outerHTML;
			   }
			   dragElement.removeNode(true);
			   dragElement=null;
			   //tarElement=null;
			   dragActive=0;
			   //savesort();
			  // for(var i=0;i<movetarget.children.length;
			   //
				//alert(this.pos);
				
			   // alert(targetobject.outerHTML);
		}
		dragendtype=0;
		dragActive=0;
    }else{
    	dragendtype=0;
    	dragActive=0;
    }
    //tosetallselect();
}
//转换为整数
	function intval(v){
		  v=parseInt(v);
		  return isNaN(v)?0:v;
	}
	//获取元素的坐标
	function getPos(e){
		  var l=0;
		  var t=0;
		  var w=intval(e.style.width);
		  var h=intval(e.style.height);
		  var wb=e.offsetWidth;
		  var hb=e.offsetHeight;
		  while(e.offsetParent){
			l+=e.offsetLeft+(e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
			t+=e.offsetTop+(e.currentStyle?intval(e.currentStyle.borderTopWidth):0);
			e=e.offsetParent;
		  }
		  l+=e.offsetLeft+(e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
		  t+=e.offsetTop+(e.currentStyle?intval(e.currentStyle.borderTopWidth):0);
		  return {x:l,y:t,w:w,h:h,wb:wb,hb:hb};
	}
	//移动层
	function scroller(el,duration,e2){
		  if(typeof el!="object"){
			el=document.getElementById(el);
		  }
		  if(!el){
			return ;
		  }
		  var z=this;
		  z.el=el;
		  z.p=getPos(el);
		  z.s=getPos(document.getElementById(e2));
		  z.clear=function(){
			window.clearInterval(z.timer);
			z.timer=null;
		  };
		  z.t=(new Date).getTime();
		  z.step=function(){
			var t=(new Date).getTime();
			var p=(t-z.t)/duration;
			if(t>=duration+z.t){
			  z.clear();
			  window.setTimeout(function(){
				z.scroll(z.p.y,z.p.x);
			  },13);
			}else {
			  st=((-Math.cos(p*Math.PI)/2)+0.5)*(z.p.y-z.s.y)+z.s.y;
			  sl=((-Math.cos(p*Math.PI)/2)+0.5)*(z.p.x-z.s.x)+z.s.x;
			  z.scroll(st,sl);
			}
		  };
		  z.scroll=function(t,l){
			document.getElementById(e2).style.top=t+"px";
			document.getElementById(e2).style.left=l+"px";
		  };
		  z.timer=window.setInterval(function(){
			z.step();
		  },13);
	}

function tosetallselect(){
	try{
		//for(var i=0;i<_fileUtil.fileList.length;i++){
	   		//_fileUtil.setSelectStatusCss(_fileUtil.fileList[i].id);
	  // }
	}catch(e){}
}
function savesort(){
	
}
function gettargetobject(){
	//targetobject=event.srcElement;
	//testdrag.innerHTML=targetobject.outerHTML
}


 document.onselectstart   =   function()   
  {   
          return   false;   
  }