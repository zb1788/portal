//关闭上传窗口
var filearray=new Array();//存放待下载的文件列表
var filesavepath=defaultpath="c:\\download";
var filedowntype=0;
var currentfile;
var currentscroll=0;
var errfilesize=0;
var __beike;
function tocloseupload(){
	$("#mask").hide();
	$("#upload").hide();
	//mask.style.display="none";
	//upload.style.display="none";
	try{
		TB_remove();
	}catch(e){}
	
	//if(currentscroll==1){
		//document.body.scroll="yes";
		//currentscroll=0;
	//}
	try{
		ocx.stopDownload();
	}catch(e){}	
	cleaninserthtml();
}
//选择文件夹
function selectDir(){
	var dirStr = ocx.SelectPath("");
	document.getElementById("currentselectd").innerHTML=dirStr;
	filesavepath=dirStr.replace(/\\$/g,"");
	setCookie(dirStr);
}
//获取cookie信息
function downloadgetcookle(){
	var arr = document.cookie.match(new RegExp("(^| )teacherselectpath=([^;]*)(;|$)"));
   	if(arr != null){
   		document.getElementById("currentselectd").innerHTML=unescape(arr[2]);
   		filesavepath=unescape(arr[2]).replace(/\\$/g,"");
   	}else{
   		try{
 			var userSavePath=ocx.GetUserSavePath();
 			if(userSavePath){
 				document.getElementById("currentselectd").innerHTML=userSavePath;
 				filesavepath=userSavePath.replace(/\\$/g,"");
 			}
 		}catch(e){}
   	}
}
function downlaodsaveCookie(name,   value,   expires,   path,   domain,   secure){  
	      var   strCookie   =   name   +   "="   +   value;  
	      if   (expires){  
	            //   计算Cookie的期限,   参数为天数  
	            var   curTime   =   new   Date();  
	            curTime.setTime(curTime.getTime()   +   expires*24*60*60*1000);  
	            strCookie   +=   ";   expires="   +   curTime.toGMTString();  
	      }  
	      //   Cookie的路径  
	      strCookie   +=     (path)   ?   ";   path="   +   path   :   "";    
	      //   Cookie的Domain  
	      strCookie   +=     (domain)   ?   ";   domain="   +   domain   :   "";  
	      //   是否需要保密传送,为一个布尔值  
	      strCookie   +=     (secure)   ?   ";   secure"   :   "";  
	      document.cookie   =   strCookie;  
}  
//保存cookie信息
function setCookie(path){     
	 if(!navigator.cookieEnabled){   

	 }else{   
	  	//document.cookie='teacherselectpath='+escape(path); 
	  	downlaodsaveCookie("teacherselectpath",escape(path),1000);
	 }    
}
function openfiledirect(){
	try{
		var downloaddirectory=document.getElementById("currentselectd").innerHTML;
		if(downloaddirectory==""){
			alert("请选择下载目录!");
		}else{
			ocx.OpenDirectory(downloaddirectory.replace(/\\$/,"")+"\\");
		}
		//PlayOneFile("d:/home/teachFile",1);
	}catch(e){
		if(window.confirm("打开文件控件已升级，请重新下载安装!")){
			window.location.href=global_basePath+'downloadplay.exe'
		}
	}
}
//获取需要下载的xml文件
function togetdownloadres(xmlurl,type,usetype){
	try{
		if(upload.style.display=="")return;
	}catch(e){alert(e)}
	$("#mask").show();
	$("#upload").show();
 	uploadlist.innerHTML="";
 	//if(document.body.scroll!="no"){
 		//currentscroll=1;
 		//document.body.scroll="no";
 		//scroll(0,0);
 	//}
 	filedowntype=type;
 	if(type==3){
 		__openfile.innerHTML="文件下载";
 	}else{
 		__openfile.innerHTML="正在加载资源,请稍候....";
 	}
 	try{
 		//upload.style.left=document.documentElement.clientWidth/2-330;
 		try{//判断是否需要升级，进行提示
 			if(ocx.GetVersion()!=ocxversion){
 				if(usetype==1){
 					insertocx(0);//备课
 				}else{
 					insertocx(1);
 				}
 				return;
 			}
 		}catch(e){
 			if(usetype==1){
				insertocx(0);//备课
			}else{
				insertocx(1);
			}
			return;
 		}
 		ocx.GetXmlFromUrl(xmlurl);
 	}catch(e){
 		if(usetype==1){
			insertocx(3);//备课
		}else{
			insertocx(1);
		}
 	}
	
}
//显示未安装空间遮罩层
function showinsertocxmessage(){
	try{
		TB_show('test',300,650);
	}catch(e){}
	$("#mask").show();
	$("#upload").show();
 	insertocx(4);
}
function dbclicplay(ids,type,beike,select){
	try{
		_fileUtil.clearSelectStatus();
		_fileUtil.setSelectStatusByIndex(select);
		_fileUtil.setSelectStatusCss(select);
		//_fileUtil.createFileArrayByClick(ids);"<%=PlayAction.videotype %>".indexOf(","+RFormat.toUpperCase()+",")>=0
	}catch(e){}
	teacherfileplay(ids,type,beike)
}
function playrecommendfile(ids,plspath){
	$("#mask").show();
	$("#upload").show();
	//mask.style.display="";
 	//upload.style.display="";
 	__openfile.innerHTML="正在加载资源,请稍候....";
 	upload.style.left=document.documentElement.clientWidth/2-330
 	var url=plspath+"/teacherfile/playfile.do?ids="+ids;
 	filedowntype=2;
 	try{
 		ocx.GetXmlFromUrl(url);
 	}catch(e){
 		insertocx(3);//备课
 	}
}
function teacherfileplay(ids,type,beike){
	if(ids==null||ids==""){
		alert("请选择文件!");
		return;
	}
	var checkfiletype=0;
	for(var i=0;i<_fileUtil.fileList.length;i++){
	     if(ids.indexOf(_fileUtil.fileList[i].fCode)>=0){
	         if(_pictype.indexOf(","+_fileUtil.fileList[i].fileType.toUpperCase()+",")>=0){
				checkfiletype=1;
			 }else{
			 	checkfiletype=0;
			 	break;
			 }
	     }
	}
	if(checkfiletype==1){
		if(beike)PlayVideo(ids,'-2','jpg',2,'图片播放');
		else PlayVideo_shouke(ids,'-2','jpg',2,'图片播放');
		return;
	}
	try{
		TB_show('test',300,650);
	}catch(e){}
	$("#mask").show();
	$("#upload").show();
 	filedowntype=type;
 	__beike=beike;
 	__openfile.innerHTML="正在加载资源,请稍候....";
 	var url=global_basePath+"/teacherfile/playfile.do?ids="+ids+"&virtualDirectory="+virtualDirectory+"&teachernumber="+teachernumber+"&teacherjyjg="+teacherjyjg+"&parentfcode="+_fileUtil.currParentFcode;
 	try{
 		//upload.style.left=document.documentElement.clientWidth/2-330;
 		try{//判断是否需要升级，进行提示
 			if(ocx.GetVersion()!=ocxversion){
 				if(beike){
 					insertocx(0);//备课
 				}else{
 					insertocx(1);//授课
 				}
 				return;
 			}
 		}catch(e){
 			if(beike){
				insertocx(0);//备课
			}else{
				insertocx(1);//授课
			}
			return;
 		}
 		ocx.GetXmlFromUrl(url);
 	}catch(e){
 		if(beike){
			insertocx(3);//备课
		}else{
			insertocx(1);//授课
		}
 	}
}
//浏览器下载插件提示!type为1表示授课，否则为备课
function insertocx(type){
	try{
		__openfile.innerHTML="插件加载不成功,请稍候....";
	}catch(e){}
	if(type==1){
		uploadlist.outerHTML="<div id=\"uploadlist\"><table width=\"100%\" border=\"0\" bgcolor=\"#8AA9BE\"><tr><td width=\"9%\" align=\"right\"><img src=\""+global_basePath+"teacher/images/bg-2.jpg\" width=\"62\" height=\"63\" /></td><td width=\"91%\" height=\"50\" style=\"font-size:12px; color:#FFF\">你的下载控件没有安装或者已经升级，如果没有自动升级，请联系管理员。</td></tr></table></div>";
	}else if(type==3){
		uploadlist.outerHTML="<div id=\"uploadlist\"><table width=\"100%\" border=\"0\" bgcolor=\"#8AA9BE\"><tr><td width=\"9%\" rowspan=\"2\" align=\"right\"><img src=\""+global_basePath+"teacher/images/bg-2.jpg\" width=\"62\" height=\"63\" /></td><td width=\"91%\" height=\"50\" style=\"font-size:12px; color:#FFF\">你的下载控件没有安装，请点击页面下方的系统提示条安装。</td></tr><tr><td height=\"43\"><input type=\"button\" value=\"请点击这里手工安装，安装后请重新打开浏览器并加载控件！\" onclick=\"window.location.href='"+global_basePath+"exe/vcomueduplayer.exe'\"/></td></tr></table></div>";
	}else if(type==0){
		uploadlist.outerHTML="<div id=\"uploadlist\"><table width=\"100%\" border=\"0\" bgcolor=\"#8AA9BE\"><tr><td width=\"9%\" rowspan=\"2\" align=\"right\"><img src=\""+global_basePath+"teacher/images/bg-2.jpg\" width=\"62\" height=\"63\" /></td><td width=\"91%\" height=\"50\" style=\"font-size:12px; color:#FFF\">你的下载控件已经升级，请点击页面下方的系统提示条安装。</td></tr><tr><td height=\"43\"><input type=\"button\" value=\"请点击这里手工安装!安装后请重新打开浏览器!\" onclick=\"window.location.href='"+global_basePath+"exe/vcomueduplayer.exe'\"/></td></tr></table></div>";
	}else if(type==4){
		uploadlist.outerHTML="<div id=\"uploadlist\"><table width=\"100%\" border=\"0\" bgcolor=\"#8AA9BE\"><tr><td width=\"9%\" rowspan=\"2\" align=\"right\"><img src=\""+global_basePath+"teacher/images/bg-2.jpg\" width=\"62\" height=\"63\" /></td><td width=\"91%\" height=\"50\" style=\"font-size:12px; color:#FFF\">你的上传控件没有安装，请点击页面下方的系统提示条安装。</td></tr><tr><td height=\"43\"><input type=\"button\" value=\"请点击这里手工安装!安装后请重新打开浏览器!\" onclick=\"window.location.href='"+global_basePath+"exe/vcomueduplayer.exe'\"/></td></tr></table></div>";
	}else{
		uploadlist.outerHTML="<div id=\"uploadlist\"><table width=\"100%\" border=\"0\" bgcolor=\"#8AA9BE\"><tr><td width=\"9%\" rowspan=\"2\" align=\"right\"><img src=\""+global_basePath+"teacher/images/bg-2.jpg\" width=\"62\" height=\"63\" /></td><td width=\"91%\" height=\"50\" style=\"font-size:12px; color:#FFF\">你的下载控件没有安装，请点击页面上方的系统提示条安装。</td></tr><tr><td height=\"43\"><input type=\"button\" value=\"请点击这里手工安装，安装后请重新打开浏览器并加载控件！\" onclick=\"window.location.href='"+global_basePath+"exe/vcomueduplayer.exe'\"/></td></tr></table></div>";
	}

}
function cleaninserthtml(){
	try{
		uploadlist.outerHTML="<div id=\"uploadlist\"></div>";
		downloadsize.outerHTML="";
		downlaodbutton.outerHTML="";
	}catch(e){
	}
}
function teacherfiledownload(ids,type){
	if(ids==null||ids==""){
		alert("请选择文件!");
		return;
	}
	$("#mask").show();
	$("#upload").show();
 	filedowntype=type;
 	
 	__openfile.innerHTML="文件下载";
 	var url=global_basePath+"/teacherfile/playfile.do?ids="+ids+"&virtualDirectory="+virtualDirectory+"&teachernumber="+teachernumber+"&teacherjyjg="+teacherjyjg+"&parentfcode="+_fileUtil.currParentFcode;
 	try{
 		//upload.style.left=document.documentElement.clientWidth/2-330;
 		try{//判断是否需要升级，进行提示
 			if(ocx.GetVersion()!=ocxversion){
 				if(beike){
 					insertocx(0);//备课
 				}else{
 					insertocx(1);//授课
 				}
 				return;
 			}
 		}catch(e){
 			if(beike){
				insertocx(0);//备课
			}else{
				insertocx(1);//授课
			}
			return;
 		}
 		ocx.GetXmlFromUrl(url);
 	}catch(e){
 		if(beike){
			insertocx(3);
		}else{
			insertocx(1);//授课
		}
 	}
}
//文件下载进度条显示
function OnXmlFinish3(xml){//资源下载使用
	if(xml=="获取xml失败"||xml.indexOf("<vcom>much</vcom>")>0){
		cleaninserthtml();
		__openfile.innerHTML="获取资源失败，可能下载的资源太多或者资源不存在....";
		return;
	}else if(xml.indexOf("<vcom>small</vcom>")>0){
		cleaninserthtml();
		__openfile.innerHTML="没有可以下载的资源....";
		return;
	}
	filearray=new Array();//
	var fileurl=new Array(),filepath=new Array();
	var reg=/\"([^\"]+)\"/ig;
	while((__path=reg.exec(xml))!=null){
		if((__path+"").indexOf("http")>=0){
			fileurl.push(__path[1]);
		}else{
			filepath.push(__path[1]);
		}
		
	}
	if(fileurl.length>0&&fileurl.length==filepath.length){
		var table="";
		
		for(var i=0;i<fileurl.length;i++){
			var clor="";
			if(i%2==1)clor="class=\"gray\"";
			table=table+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload">'
  					+'<tr '+clor+'>'
				    +'<td style="width:360px;">'
				    +'<p style="font-size: 14px;">'+filepath[i].substring(filepath[i].lastIndexOf("/")+1,filepath[i].length)+'</p>'
				    +'<p><div style="float:left;width:450px;"><div style="float:left;width:20px;"><input type="checkbox" checked id="file_'+i+'_download"></div><div style="float:left;width:430px;margin-top:5px;" id="file_'+i+'_pro" ></div></div></p>'
				    +'</td>'
				   // +'<td class="kd2">'+size.toFixed(2)+'M</td>'
				    +'<td valign="bottom" style="font-size: 12px;padding-bottom: 5px;" style="width:10px;"><img src="'+global_basePath+'/teacher/images/laji.gif" id="file_'+i+'_img"></td>'
				    +'<td valign="bottom" style="font-size: 12px;padding-bottom: 5px;" id="file_'+i+'_sta">已下载0%</td>'
				    +'<td valign="bottom" style="font-size: 12px;width:100px;display:none;" id="file_'+i+'_radio"><input name="openfile" type="radio" value="'+i+'" onclick="getPlayFile(1);"/>打开文件</td>'
				  	+'</tr>'
				  	+'</table> ';
			filearray.push({"id":"file_"+i,"url":fileurl[i],"path":filepath[i],"index":i});
			
		}
		
		var listend='</div>';
		var filelength='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload" id="downloadsize">'
		  				+'<tr class="gray linet">'
		    			+'<td style="width:50%">共'+fileurl.length+'个文件&nbsp;<span id="downlaodspead" style="color:red;"></span></td>'
		   			 	+'<td style="color:#111;font-size: 14px;" id="file_state"></td>'
		  				+'</tr>'
		  				+'</table>';
		 var button='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload" id="downlaodbutton">'
					  +'<tr>'
					  +' <td class="up" ><button onclick="togetdownloadfile(1);">下载</button><button onclick="tocloseupload();">关闭</button></td>'
					  +'</tr>'
					  +'</table>';
		cleaninserthtml();
		//if(fileurl.length==1){
			//var liststart='<div id="uploadlist">';
			//uploadlist.outerHTML=liststart+table+listend+filelength+button;
			//upload.style.top="40%";
		//}else{
			var liststart='<div class="box" id="uploadlist">';
			liststart=liststart+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload">'
  				+'<tr class="line">'
			   	+'<td class="add" style="text-align: left;"><button onclick="selectDir();">选择目录</button><span id="currentselectd"></span></td>'
			   	+'<td class="add" style="text-align: right;PADDING-RIGHT: 20px;"><a href="javascript:" onclick="openfiledirect();">打开目录</a></td>'
			 	+' </tr>'
			 	+'</table>';
			uploadlist.outerHTML=liststart+table+listend+filelength+button;
			//upload.style.top="5%";
			//upload.style.left=document.documentElement.clientWidth/2-330;
		//}
		for(var j=0;j<filearray.length;j++){
			var progress1 = new Progress(filearray[j].id+"_pro", 0, 100, 0, 1, new ProgressStyle(430, 10, "#009999", "#00CCCC"));
			progress1.create();
			filearray[j].progress=progress1;	
		}
		if(fileurl.length>0){
			currentfile=filearray[0];
			//ClearSaveDirectory(filesavepath);
			//alert(filesavepath+filearray[0].path.replace(/\//g,"\\"));
			//prompt('',encodeURI(filearray[0].url));
			//ocx.StartDownload(filearray[0].url,filesavepath+filearray[0].path.replace(/\//g,"\\"));
		}
 		downloadgetcookle();
	}else{
		try{
			__openfile.innerHTML="没有可下载的资源....</font>";
			cleaninserthtml();
		}catch(e){}
	}
}

function togetdownloadfile(){
	if(document.getElementById("currentselectd").innerHTML==""){
		alert("请选择下载目录!");
		return ;
	}else{
		if(filearray.length>0){
			currentfile=filearray[0];
			if(document.getElementById(currentfile.id+"_download").checked){
				ocx.StartDownload(currentfile.url,filesavepath+currentfile.path.replace(/\//g,"\\"));
			}else{
				todownloadnext();
			}
		}
	}
}
function OnXmlFinish(xml){//教师文件夹浏览使用
	
	filesavepath=defaultpath;
	try{
		//filesavepath=ocx.GetUserSavePath();
		//alert(filesavepath);
	}catch(e){};
	cleaninserthtml();
	if(xml=="获取xml失败"||xml.indexOf("<vcom>much</vcom>")>0){
		__openfile.innerHTML="获取资源失败，可能浏览的资源太多或者资源不存在....";
		return;
	}else if(xml.indexOf("<vcom>small</vcom>")>0){
		__openfile.innerHTML="没有可以浏览的资源....";
		//OnXmlFinish2(xml);
		return;
	}
	filearray=new Array();//
	var fileurl=new Array(),filepath=new Array();
	var reg=/\"([^\"]+)\"/ig;
	while((__path=reg.exec(xml))!=null){
		if((__path+"").indexOf("http")>=0){
			fileurl.push(__path[1]);
		}else{
			filepath.push(__path[1]);
		}
		
	}
	if(fileurl.length>0&&fileurl.length==filepath.length){
		var table="";
		
		for(var i=0;i<fileurl.length;i++){
			var clor="";
			if(i%2==1)clor="class=\"gray\"";
			table=table+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload">'
  					+'<tr '+clor+'>'
				    +'<td style="width:360px;">'
				    +'<p style="font-size: 14px;">'+filepath[i].substring(filepath[i].lastIndexOf("/")+1,filepath[i].length)+'</p>'
				    +'<p id="file_'+i+'_pro" ></p>'
				    +'</td>'
				   // +'<td class="kd2">'+size.toFixed(2)+'M</td>'
				    +'<td valign="bottom" style="font-size: 12px;padding-bottom: 5px;width:15px;"><img src="'+global_basePath+'/space/images/laji.gif" id="file_'+i+'_img"></td>'
				    +'<td valign="bottom" style="font-size: 12px;width:50px;display:none;" id="file_'+i+'_radio"><input name="openfile" type="radio" value="'+i+'" onclick="getPlayFile(1);"/>打开</td>'
				  	+'<td valign="bottom" style="font-size: 12px;" id="file_'+i+'_sta">已下载0%</td>'
				  	+'</tr>'
				  	+'</table> ';
			filearray.push({"id":"file_"+i,"url":fileurl[i],"path":filepath[i],"index":i});
			
		}
		
		var listend='</div>';
		var filelength='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload" id="downloadsize">'
		  				+'<tr class="gray linet">'
		    			+'<td style="width:20%" >共'+fileurl.length+'个文件</td>'
		   			 	+'<td style="color:#111;font-size: 14px;" id="file_state"></td>'
		  				+'</tr>'
		  				+'</table>';
		 var button='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload">'
					  +'<tr>'
					  +' <td class="up"><button onclick="getPlayFile(1);">打开</button><button onclick="tocloseupload();">关闭</button></td>'
					  +'</tr>'
					  +'</table>';
		cleaninserthtml();
		if(fileurl.length==1){
			var liststart='<div id="uploadlist">';
			uploadlist.outerHTML=liststart+table+listend+filelength;
			//if(__beike)
				//upload.style.top="5%";
			//else
				//upload.style.top="40%";
		}else{
			var liststart='<div class="box" id="uploadlist">';
			uploadlist.outerHTML=liststart+table+listend+filelength;
			//if(__beike)
				//upload.style.top="5%";
			//else
				//upload.style.top="25%";
		}
		//upload.style.left=document.documentElement.clientWidth/2-330;
		for(var j=0;j<filearray.length;j++){
			var progress1 = new Progress(filearray[j].id+"_pro", 0, 100, 0, 1, new ProgressStyle(370, 10, "#009999", "#00CCCC"));
			progress1.create();
			filearray[j].progress=progress1;	
		}
		if(fileurl.length>0){
			currentfile=filearray[0];
			ClearSaveDirectory(filesavepath);
			//alert(filesavepath+filearray[0].path.replace(/\//g,"\\"));
			ocx.StartDownload(filearray[0].url,filesavepath+filearray[0].path.replace(/\//g,"\\"));
		}
		
	}else{
		try{
			__openfile.innerHTML="没有可浏览的资源....</font>";
			cleaninserthtml();
		}catch(e){}
	}
}
function OnXmlFinish2(xml){//基础资源浏览使用
	errfilesize=0;
	filesavepath=defaultpath;

	try{
		//filesavepath=ocx.GetMyDocumentPath()+"\\download";
	}catch(e){};
	if(xml=="获取xml失败"){
		cleaninserthtml();
		__openfile.innerHTML="获取浏览的资源失败....";
		return;
	}
	filearray=new Array();//
	__openfile.innerHTML="正在加载资源，请稍候....</font>";
	var fileurl=new Array(),filepath=new Array();
	var reg=/\"([^\"]+)\"/ig;
	
	while((__path=reg.exec(xml))!=null)
	{
	//alert(__path);
		if((__path+"").indexOf("http")>=0){
			fileurl.push(__path[1]);
		}else{
			filepath.push(__path[1]);
		}
		
	}
	if(fileurl.length>0&&fileurl.length==filepath.length)
	{
		for(var i=0;i<fileurl.length;i++){
			filearray.push({"id":"file_"+i,"url":fileurl[i],"path":filepath[i],"index":i});
		}
		var table='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="upload" id="'+this.fileProgressID+'">'
  					+'<tr class="gray">'
				    +'<td>'
				    +'<p id="file_0_pro" ></p>'
				    +'</td>'
				    +'<td class="kd2" style="font-size: 14px;" id="file_pos">15%</td>'
				    +'<td style="padding-right: 15px;"><img src="'+global_basePath+'/teacher/images/laji.gif" id="file_0_img"></td>'
				  	+'</tr>'
				  	+'</table> ';
		var listend='</div>';
		var liststart='<div>';
		cleaninserthtml();
		uploadlist.innerHTML=liststart+table+listend;
		
		//upload.style.top="40%";
		//upload.style.left=document.documentElement.clientWidth/2-330;
		progress1 = new Progress("file_0_pro", 0, 100, 0, 1, new ProgressStyle(470, 10, "#009999", "#00CCCC"));
		progress1.create();
		if(fileurl.length>0){
			currentfile=filearray[0];
			ClearSaveDirectory(filesavepath);
			ocx.StartDownload(currentfile.url,filesavepath+currentfile.path.replace(/\//g,"\\"));
		}
		
	}else{
		__openfile.innerHTML="没有可播放的资源....</font>";
	}
}
//更新进度条
function updatePos2(pos,speed)
{
	try{
		var currentspeed;
		//speed 的单位是 字节/秒
		if(speed > 1024 * 1024)
			currentspeed = (speed/(1024*1024)).toFixed(2) + "MB/S";
		else if(speed > 1024)
			currentspeed = (speed/1024).toFixed(2) + "KB/S";
		else if(speed < 0)  //下载已经停止
			currentspeed = "";
		else
			currentspeed = speed + "Bytes/S";
		//alert(filearray.length);
		if(filearray.length==1){
			progress1.setPosition(pos);
			document.getElementById("file_pos").innerHTML=pos+"%";
		}else{
			if(pos==100){
				pos=parseInt(100/filearray.length*(currentfile.index+1-errfilesize));
				progress1.setPosition(pos);
				document.getElementById("file_pos").innerHTML=pos+"%";
			}else{
				var tempos=parseInt((currentfile.index-errfilesize)*(100/filearray.length)+(100/filearray.length*pos*0.01));
				progress1.setPosition(tempos);
				document.getElementById("file_pos").innerHTML=tempos+"%";
			}
			
		}
		if(pos!=100){
			//document.getElementById("file_state").innerHTML="正在初始化第"+(currentfile.index+1)+"个文件>>"+pos+"%";
		}else{
			//document.getElementById(currentfile.id+"_sta").innerHTML="加载成功";
			document.getElementById("file_0_img").src=global_basePath+"/space/images/success.gif";
			
		}
	}catch(e){}
	
}

//更新进度条
function updatePos3(pos,speed)
{
	try{
		var currentspeed;
		//speed 的单位是 字节/秒
		if(speed > 1024 * 1024)
			currentspeed = (speed/(1024*1024)).toFixed(2) + "MB/S";
		else if(speed > 1024)
			currentspeed = (speed/1024).toFixed(2) + "KB/S";
		else if(speed < 0)  //下载已经停止
			currentspeed = "";
		else
			currentspeed = speed + "Bytes/S";
		currentfile.progress.setPosition(pos);
		//document.getElementById("file_state").innerHTML="正在初始化第"+(currentfile.index+1)+"个文件>>"+pos+"% 当前速度"+currentspeed;
		if(pos!=100){
			//document.getElementById("file_state").innerHTML="正在初始化第"+(currentfile.index+1)+"个文件>>"+pos+"%";
			document.getElementById(currentfile.id+"_sta").innerHTML="已加载"+pos+"%";
			try{
				document.getElementById("downlaodspead").innerHTML="当前速度"+currentspeed
			}catch(e){}
		}else{
			document.getElementById(currentfile.id+"_sta").innerHTML="下载成功";
			try{
				document.getElementById("downlaodspead").innerHTML="下载成功";
				document.getElementById(currentfile.id+"_radio").style.display="";
			}catch(e){}
			document.getElementById(currentfile.id+"_img").src=global_basePath+"/space/images/success.gif";
			if(currentfile.index==(filearray.length-1)){
				
			}
			
		}
	}catch(e){}
	
}
function tosleepfile(){
	if(filearray.length==1){
		PlayOneFile(filesavepath+currentfile.path.replace(/\//g,"\\"));
	}else if(filearray.length>1){
		PlayOneFile(filesavepath+filearray[0].path.replace(/\//g,"\\"));
	}
}
//更新进度条
function updatePos(pos,speed)
{
	var currentspeed;
	//speed 的单位是 字节/秒
	if(speed > 1024 * 1024)
		currentspeed = (speed/(1024*1024)).toFixed(2) + "M/S";
	else if(speed > 1024)
		currentspeed = (speed/1024).toFixed(2) + "K/S";
	else if(speed < 0)  //下载已经停止
		currentspeed = "";
	else
		currentspeed = speed + "B/S";
	currentfile.progress.setPosition(pos);
	//document.getElementById("file_state").innerHTML="正在初始化第"+(currentfile.index+1)+"个文件>>"+pos+"% 当前速度"+currentspeed;
	try{
		if(pos!=100){
			//document.getElementById("file_state").innerHTML="正在初始化第"+(currentfile.index+1)+"个文件>>"+pos+"%";
			document.getElementById(currentfile.id+"_sta").innerHTML="速度"+currentspeed
		}else{
			document.getElementById(currentfile.id+"_sta").innerHTML="加载成功";
			document.getElementById(currentfile.id+"_img").src=global_basePath+"/space/images/success.gif";
			document.getElementById(currentfile.id+"_radio").style.display="";
		}
	}catch(e){}
	
}
function getPlayFile(type){
	var value=getradiovalue(document.getElementsByName("openfile"));
	if(value!=""){
		for(var i=0;i<filearray.length;i++){
				if(filearray[i].index==value){
					PlayOneFile(filesavepath+filearray[i].path.replace(/\//g,"\\"),type);
					break;
				}
			}
	}else{
		if(type!=null){
			alert("请选择待播放的文件!");
		}
	}
}
//播放一个文件
function PlayOneFile(name,type)
{
	//alert(name);
	var ret=ocx.playFile(name);
	switch(ret)
	{
		case -1:
			__openfile.innerHTML="<font style=\"color: green;\">播放失败，可能文件不存在或者加载失败....</font><a href='javascript:' onclick=\"window.open('"+global_basePath+"teacher/frame/help.htm')\">帮助</a>";
		break;

		case -2:
			__openfile.innerHTML="<font style=\"color: green;\">请你选择打开方式....</font>";
		break;
		
		case -3:
			__openfile.innerHTML="<font style=\"color: green;\">无效的文件路径....</font>";
		break;

		case 1:
			__openfile.innerHTML="<font style=\"color: green;\">成功开始播放....</font>";
			if(!type)window.setTimeout(closediv,500);
		break;
	}
}
function closediv(){
	$("#mask").hide();
	$("#upload").hide();
 	try{
		TB_remove();
	}catch(e){}
 	//if(currentscroll==1){
		//document.body.scroll="yes";
		//currentscroll=0;
	//}
}
//下载状态发生变化
function updateState(state,errMsg)
{
	switch(state)
	{
		case 1:
			//stateLabel.value="正在连接";
			//alert(正在连接);
			break;
		case 2:
			//stateLabel.value="下载中";
			//alert();
			break;
		case -1:
			//stateLabel.value="下载出错:"+errMsg;
			//startbtn.disabled=false;
			//stopbtn.disabled=true;
			//alert("下载出错:"+errMsg);
			errfilesize=errfilesize+1;
			try{
				document.getElementById(currentfile.id+"_sta").innerHTML="下载出错:"+errMsg+"&nbsp;&nbsp;&nbsp;<a href='javascript:' onclick=\"window.open('"+global_basePath+"teacher/frame/help.htm')\">帮助</a>";
			}catch(e){
				if(__openfile)
				__openfile.innerHTML="<font style=\"color: green;\">打开出错:"+errMsg+"....</font>";
			}
			
			//__openfile.innerHTML="<font style=\"color: green;\">"+errMsg+"....</font>";
			todownloadnext();
			break;
		case 3:
			//stateLabel.value="下载完成";
			//startbtn.disabled=false;
			//stopbtn.disabled=true;
			//alert("下载完成");
			todownloadnext();
			
			break;

		case 4:
			//stateLabel.value="已经停止";
			//alert("已经停止");
			break;
	}
		
}
function todownloadnext(){
	if(upload.style.display=="none"){
		return;
	}
	if(currentfile.index==(filearray.length-1)&&filedowntype==1){
		__openfile.innerHTML="<font style=\"color: green;\">正在打开资源，请稍候....</font>";
		window.setTimeout(tosleepfile,0);
	}if(currentfile.index==(filearray.length-1)&&filedowntype==2){
		if(filearray.length==1){
			window.setTimeout(tosleepfile,0);
		}else{
			__openfile.innerHTML="<font style=\"color: green;\">资源加载完毕，请选择打开的资源....</font>";
		}
		
	}else{
		for(var i=0;i<filearray.length;i++){
			if(filearray[i].id==currentfile.id&&i<(filearray.length-1)){
				currentfile=filearray[i+1];
				if(i>=3){
					uploadlist.scrollTop=(i-2)*40;
				}
				if(document.getElementById(currentfile.id+"_download")){
					if(document.getElementById(currentfile.id+"_download").checked){
						ocx.StartDownload(currentfile.url,filesavepath+currentfile.path.replace(/\//g,"\\"));
					}else{
						todownloadnext();
					}
				}else{
					ocx.StartDownload(currentfile.url,filesavepath+currentfile.path.replace(/\//g,"\\"));
				}
				break;
			}
		}
	}
	
}
//清空下载目录
function ClearSaveDirectory(path)
{
	var ret = ocx.clearSaveDirectory(path);
	switch(ret)
	{
		case 1:
			//clearRet.value = '已经清空';
			break;
		case -1:
			//clearRet.value = '其中一些文件正在被使用，无法删除';
			//__openfile.innerHTML="<font style=\"color: green;\">文件正在被使用，无法删除....</font>";
			break;
		case -2:
			//clearRet.value = '无效的文件夹路径';
			break;
	}
}
//停止下载
function StopDownload()
{
	ocx.stopDownload();
}
/*得到选中的radio值*/
function getradiovalue(objField){
	var idvalue="";
	if(typeof(objField)!="undefined"){
		if(typeof(objField.length)=="undefined"){
			if(radio.checked==true)idvalue=radio.value;
		}else{
			for(var i=0;i<objField.length;i++){
				if(objField[i].checked==true){
					idvalue=objField[i].value;
					break;
				}
			}
		}
	}
	return idvalue;
}
//显示灰色JS遮罩层
function showBg(ct,content){

	var bH=$("body").height();
	var bW=$("body").width()+16;
	var objWH=getObjWh(ct);

	
	$("#fullbg").css({width:bW,height:bH,display:"block"});
	var tbT=objWH.split("|")[0]+"px";
	var tbL=objWH.split("|")[1]+"px";
	$("#"+ct).css({top:tbT,left:tbL,display:"block"});
	$("#"+content).html("<div style='text-align:center'>正在加载，请稍后...</div>");
	$(window).scroll(function(){resetBg()});
	$(window).resize(function(){resetBg()});
}
function getObjWh(obj){
	var st=document.documentElement.scrollTop;//滚动条距顶部的距离
	var sl=document.documentElement.scrollLeft;//滚动条距左边的距离
	var ch=document.documentElement.clientHeight;//屏幕的高度
	var cw=document.documentElement.clientWidth;//屏幕的宽度
	var objH=$("#"+obj).height();//浮动对象的高度
	var objW=$("#"+obj).width();//浮动对象的宽度
	var objT=Number(st)+(Number(ch)-Number(objH))/2;
	var objL=Number(sl)+(Number(cw)-Number(objW))/2;
	return objT+"|"+objL;
}
function resetBg(){
	var fullbg=$("#fullbg").css("display");
	if(fullbg=="block"){
		var bH2=$("body").height();
		var bW2=$("body").width()+16;
		$("#fullbg").css({width:bW2,height:bH2});
		var objV=getObjWh("dialog");
		var tbT=objV.split("|")[0]+"px";
		var tbL=objV.split("|")[1]+"px";
		$("#dialog").css({top:tbT,left:tbL});
	}
}

//关闭灰色JS遮罩层和操作窗口
function closeBg(){
	$("#fullbg").css("display","none");
	$("#dialog").css("display","none");
}