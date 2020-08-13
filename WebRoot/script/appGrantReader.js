//var appCode='zyyy';//资源应用
//var userjaose=',4,0,'; //4学生，0家长
//var appCode="wszy";//网上作业
//var appCode="cpts";//测评提升
//var appCode="wsdy";//网上答疑
//var appCode="jxhd";//家校互动
//ture 订购 false 未订购

var tipDic = new Array();
tipDic[0] = "已定购";
tipDic[1] = "很遗憾，本业务您未订购或订购已过期！暂不能进行正常访问。";
tipDic[2] = "很遗憾，您所在学校的班级过保护期还未缴费！暂不能进行正常访问。";
function getGrantFlg(appCode)
{
    var grantFlg='0';// 0 可用 1或2或其他不可用

	var ut=$.cookie('ut');
	//alert('ut:'+ut);
	var grantKey=ut+"_services";
	var grantValue=$.cookie(grantKey);
	//alert('appGrantKey:'+appGrantKey);
	//alert('grantValue:'+grantValue);
	if(grantValue!=null)
	{
		var appGrants=grantValue.split('|');
		//alert(appGrants.length);
		for(i=0;i<appGrants.length;i++)
		{
			var appGrant=appGrants[i];
			var appGrantKeyValue=appGrant.split('_');
			var appGrantKey=appGrantKeyValue[0];
			var appGrantValue=appGrantKeyValue[1];
			if(appGrantKey==appCode)
			{
				grantFlg=appGrantValue;
			}
		}
	}
	//alert(grantFlg);
	return grantFlg;
}
function isGrant(appCode){
	return getIsGrant(appCode);
}

function getIsGrant(appCode){
	 var grantFlg=getGrantFlg(appCode);// 0 可用 1或2或其他不可用
		 if(grantFlg=='0'){
		 	return true;
		 }else{
		 	var tip=tipDic[grantFlg];
		 	try{
				if(parent){
				   parent.art.dialog({
				       title: '温馨提示:',
				       content: tip,
				       icon: 'face-sad',
				       lock: true,    
				       ok: function(){
				           this.close();
				     		return false;}
					});
				}else{
					art.dialog({
				       title: '温馨提示:',
				       content: tip,
				       icon: 'face-sad',
				       lock: true,    
				       ok: function(){
				           this.close();
				     		return false;}
					});
				}
			}catch(e){}
		 	return false;
		 }
}
function parentAppGrant(apps)
{
	var ut=$.cookie('ut');
	var topDomain=document.domain.match(/(\w+\.(?:com.cn|net.cn|org.cn|com|org|biz|info|cc|tv))(?:\/|$)/)[1];
	//alert(ut);

    var keyPre=ut+'.';
    var grantKey=ut+'_services';
    var grantValue='';
      
	var cookies = document.cookie.split(";");
   	for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var key = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;   
           if(key.indexOf('_service')!=-1 && key.indexOf(ut)==-1)
           {
                   $.cookie(key,'0',{ path: '/', domain:topDomain});
           }
       }
	grantValue+=apps.join("|");
    $.cookie(grantKey,grantValue,{ path: '/', domain: topDomain});
}