function Common(){}
//String加入replaceAll
String.prototype.replaceAll = function(AFindText,ARepText){
  //不能return this,会出现异常
  var temp=this.replace(AFindText,ARepText);
  while(temp.indexOf(AFindText)>=0){
  	temp=temp.replace(AFindText,ARepText);
  }
  return temp;
}

Common.prototype.isBlank=function(tStr){
	//非undefined
	if(typeof(tStr)=="undefined"){
		return true;
	}
	//非null
	if(tStr==null){
		return true;
	}
	//非空字符串
	if(typeof(tStr)=="string" && tStr.replace(/(^\s*)|(\s*$)/g, "").length==0){
		return true;
	}
	return false;
}
//通用iframe打开接口方法
Common.prototype.openInFrame=function(sys,icode,param){
	var pageUrl=protocol+sysconfig[sys]+interface_config[icode]+param;
	$("#iframe01").attr("src",pageUrl);
}
//通用跨域异步调用
Common.prototype.getRemoteJson= function (sys,icode,param,callbackhander){
	var jsoncallStr=null;
	if(this.isBlank(param)){
		param="jsoncallback=?";
	}else{
		param=param+"&jsoncallback=?";
	}
	$.getJSON(protocol+sysconfig[sys]+interface_config[icode]+"&"+param,callbackhander);
}
Common.prototype.showlog= function(data){
	$("#logparent",window.top.document).show();
	$("#logmessage",window.top.document).attr("value",data);
}
var _common = new Common();

function shouajaxpro(type){
	try{
		if(type==1){
			$("#waithtml").html("<img src='space/images/extanim32.gif' /><span>正在加载数据，请稍后....</span>");
			$("#waithtml").show();
			$("#maskAllall").show();
		}else{
			$("#waithtml").hide();
			$("#maskAllall").hide();
		}
	}catch(e){}
	
}
//jquery远程调用
function ajaxJson(icode,data,uncode,fun){
	var myDate = new Date();
	//shouajaxpro(1);
	try{
	var sys=icode.substring(0,icode.indexOf("."));
  	jQuery(function($){
  		$.getJSON(sysconfig[sys]+interface_config[icode]+"&time="+myDate.getSeconds()+"&reqEncoding="+uncode+"&jsoncallback=?",data,function(result){
	  		fun(result);
	  		shouajaxpro(0);
	  	})
  	});
  	}catch(e){alert("ajaxJson error:"+e);}
}
//jquery调用
function commonajaxJson(url,data,fun){
	var myDate = new Date();
	shouajaxpro(1);
  	jQuery(function($){
  		alert(url+"&time="+myDate.getSeconds());
  		$.getJSON(url+"&time="+myDate.getSeconds(),function(result){
	  		fun(result);
	  		shouajaxpro(0);
	  	})
  	});
}
function randomsuijishu(){
	var r=parseInt(Math.random()*38);
	var array=[];
	var back="";
	for(var i=0;i<7;i++){ 
		var flag=0; 
		do {
			for(var j=0;j<array.length;j++)  {
			   if(array[j]==r) {flag=1;break;}  
			}  
			if(!flag){array[array.length]=r;  }  
			else  {   r=parseInt(Math.random()*38);  } }
		while(!flag);
	}
	for(var j=0;j<array.length;j++)back=back+array[j];
	return back;
}
/*得到http对象 end*/
/**/
function sendRequest(callback,url,method,xml){
/**
  var _method="get";
  if(null!=method)
     _method=method;
  xmlHttp=getXmlHttpObject();
  xmlHttp.open(_method,url,true);
  xmlHttp.onreadystatechange=callback;
  xmlHttp.send(null);
 */ 
   shouajaxpro(1);
   $.ajax({ 
	    url:url, 
	    type: method, 
	    datatype: 'xml',//这里可以不写，但千万别写text或者html!!! 
	    timeout: 60000,
	    data:xml,
	    error: function(xml){ 
	         //maskAllall.style.display="none";
            //_loginObj.error('登录超时！');
            alert('数据调用出错!');
            shouajaxpro(0);
           //top.location= _common.getCurrServerPath()+"/login/toLoginPage.do";
           // _common.timeout(null);//超时
	    }, 
	    success: function(xml){ 
	    shouajaxpro(0);
	     //alert(typeof(xml));
	     //alert(xml);
	     if('string'==typeof(xml)){
	       //alert('string'==typeof(xml));
	       if(xml.indexOf('window.parent.parent')>0){
	          alert('登录超时，请重新登录！');
	          top.location= _common.getCurrServerPath()+"/login/toLoginPage.do";
	          return;
	       }
	     }
	     callback(xml);
	    }
	 })
}