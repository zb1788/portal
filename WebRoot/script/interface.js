//页面接口定义
var _interface = new InterfaceObj();
//String加入replaceAll
String.prototype.replaceAll = function(AFindText,ARepText){
  //不能return this,会出现异常
  var temp=this.replace(AFindText,ARepText);
  while(temp.indexOf(AFindText)>=0){
  	temp=temp.replace(AFindText,ARepText);
  }
  return temp;
}

//window.onerror=function(){return true;}//屏蔽浏览器错误
function InterfaceObj(){}
//隐藏作业层
InterfaceObj.prototype.hiddenZuoyeDiv=function(tStr){
	$("#__zuoyediv").slideUp();
}
//点击名称处理
InterfaceObj.prototype.clickName=function(){
	if(usertype==2||usertype==3){
		this.openInFrame("TMS","TMS.SHOWPOINT","");
	}
	return false;
}
InterfaceObj.prototype.isBlank=function(tStr){
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
InterfaceObj.prototype.openInFrame=function(sys,icode,param){
	var pageUrl=protocol+sysconfig[sys]+interface_config[icode]+param;
	$("#iframe01").attr("src",pageUrl);
}
//链接点击过滤处理 参数：(权限控制标示，导航切换id)
InterfaceObj.prototype.openLinkFilter=function(channelid,grantFlag){
	if(grantFlag && grantFlag!=null && grantFlag.length>0){
		if(!isGrant(grantFlag)){
			return false;
		}
	}
	if(channelid && channelid!=null && channelid.length>0){
		if(parent){
			parent.changechannelstyle(channelid);
		}else{
			changechannelstyle(channelid);
		}
	}
	return true;
}
//通用跨域异步调用
InterfaceObj.prototype.getRemoteJson= function (sys,icode,param,callbackhander){
	var jsoncallStr=null;
	if(this.isBlank(param)){
		param="jsoncallback=?";
	}else{
		param=param+"&jsoncallback=?";
	}
	var tempUrl=sysconfig[sys]+interface_config[icode];
	var andFlag="&";
	if(tempUrl.indexOf("?")==-1){
		andFlag="?";
	}
	$.getJSON(protocol+tempUrl+andFlag+param,callbackhander);
}
//通用可设置编码的跨域异步调用
InterfaceObj.prototype.getCharsetRemoteJson= function (sys,icode,param,charset,callbackhander){
	var andFlag="&";
	var tempUrl=sysconfig[sys]+interface_config[icode];
	if(tempUrl.indexOf("?")==-1){
		andFlag="?";
	}
	$.ajax({
		url:protocol+tempUrl+andFlag+param,
		type:"get",
		dataType:"jsonp",
		jsonp:"jsoncallback",
		scriptCharset:charset,  
		success:function(rdata){
			callbackhander(rdata);
			
		}
	});
	//$.getJSON(protocol+tempUrl+andFlag+param,callbackhander);
}
InterfaceObj.prototype.showlog= function(data){
	$("#logparent",window.top.document).show();
	$("#logmessage",window.top.document).attr("value",data);
}
//获取CMS数据方法,统一返回title,desc,url,pic,tag,type,time,mark,a9,a10
InterfaceObj.prototype.getCMSData= function(icode,param,rlength,callbackhander){
	_interface.getRemoteJson("CMS",icode,"&1=1",function(result){
		if(result.infosList){
			var rdata = new Array();
			$(result.infosList).each(function(num){
				if(num>=rlength){
					return;
				}
				var url=null;
				if($(this).attr("contenttype")=="HTML"){
					url=protocol+sysconfig["CMS"]+$(this).attr("filepath")+"?"+parent.__par+"&plsurl="+sysconfig["PLS"]+"&staturl="+sysconfig["STAT_PV"]+"&mailurl="+sysconfig["WEBMAIL"];
				}else if($(this).attr("contenttype")=="SURL"){
					url=$(this).attr("infourl");
				}
				var img=null;
				if(typeof($(this).attr("abbrevpic"))!="undefined" && $(this).attr("abbrevpic")!="null"){
					img=protocol+sysconfig["CMS"]+$(this).attr("abbrevpic");
				}
				rdata.push({"id":$(this).attr("infoid"),"title":$(this).attr("topic"),"desc":$(this).attr("description"),"url":url,"pic":img,"time":$(this).attr("pubtime"),"tag":$(this).attr("tag"),"type":$(this).attr("contenttype"),"mark":"","a9":$(this).attr("a9"),"a10":$(this).attr("a10")});
			});
			callbackhander(rdata);
		}
	});
}
//获取PLS数据方法,统一返回id(rcode),title,desc,url,pic,tag(filetype),type(RTypecode),time,mark,a9,a10
InterfaceObj.prototype.getPLSData= function(icode,param,rlength,callbackhander){
	_interface.getCharsetRemoteJson("PLS",icode,param,"gbk",function(result){
		var rdata=null;
		if(icode=="PLS.170" && result && result.RmsKnowledgeList){
			rdata = new Array();
			$(result.RmsKnowledgeList).each(function(num){
				if(num>=rlength){
					return;
				}
				var url=protocol+sysconfig["PLS"]+interface_config["PLS.182"]+"&schoolStage="+parent.schoolStage+"&username="+username+"&classId="+classid+"&studentId="+username+"&schoolId="+parent.schoolId+"&kpCode="+$(this).attr("kpCode")+"&ksCode="+$(this).attr("ksCode");
				rdata.push({"title":$(this).attr("kpName"),"desc":$(this).attr("kpDesc"),"url":url,"pic":$(this).attr("thumbnailImg"),"time":"","tag":$(this).attr("kpCode"),"type":"","mark":$(this).attr("ksCode"),"a9":"","a10":""});
			});
		}else if(icode=="PLS.103" && result && result.TuiJianList){
			rdata = new Array();
			$(result.TuiJianList).each(function(num){
				if(num>=rlength){
					return;
				}
				var url=protocol+sysconfig['PLS']+interface_config['PLS.113']+"&username="+username+"&areaId="+userAreaId+"&rcode="+$(this).attr("resId")+"&type=1&bodyId=&cusip="+parent.ip+"&filetype=~tag~&schoolId="+parent.schoolId
				if($(this).attr("recommentType")==3){
					url="javascript:parent.playrecommendfile('"+$(this).attr("resId")+"','"+parent.plsUrl+"','"+$(this).attr("resFormat")+"');";
				}else if($(this).attr("recommentType")==2){
					//题库
					//QBMS.015 家长只读
					//QBMS.008 学生可做题
					url=protocol+sysconfig['QBMS']+interface_config['QBMS.015']+"&paperId="+$(this).attr("resId")+"&studentId="+username;
				}
				rdata.push({"id":$(this).attr("resId"),"title":$(this).attr("resTitle"),"desc":"","url":url,"pic":"","time":$(this).attr("collectDate"),"tag":$(this).attr("resFormat"),"type":$(this).attr("resourceType"),"mark":"","a9":"","a10":""});
			});
		}else if(result && result.ResInfo){
			rdata = new Array();
			$(result.ResInfo).each(function(num){
				if(num>=rlength){
					return;
				}
				var url=protocol+sysconfig['PLS']+interface_config['PLS.113']+"&username="+username+"&areaId="+userAreaId+"&rcode="+$(this).attr("RCode")+"&type=1&bodyId=&cusip="+parent.ip+"&filetype=~tag~&schoolId="+parent.schoolId
				rdata.push({"id":$(this).attr("RCode"),"title":$(this).attr("RTitle"),"desc":$(this).attr("RDesc"),"url":url,"pic":$(this).attr("imagePic"),"time":$(this).attr("RCreatedate"),"tag":$(this).attr("RFormat"),"type":$(this).attr("RTypecode"),"mark":$(this).attr("RFormatMark"),"a9":"","a10":""});
			});
		}
		callbackhander(rdata);
	});
}
//CMS通用处理(替换~url~,~text~,~img~,~target~)
//显示位置id,接口编号,显示个数,展示方式(0html,其他append),展示模板(自动替换上述标签内容)
InterfaceObj.prototype.getCommonCMS=function (showid,icode,ilength,type,templete){
	if(_interface.isBlank(templete)){alert("错误信息：空模板内容!位置："+showid+"，编号:"+icode);return;}
	_interface.getCMSData(icode,null,ilength,function(data){
		if(data.length==0){return false;}else{
			for(var i=0;i<data.length;i++){
				var tdata = data[i];
				var target = "_blank";
				if(tdata.a9=="当前页"){
					target = "";
				}else if(tdata.a9=="不打开"){
					infourll="javascript:;"
					target="";
				}
				var codeStr=(templete.replaceAll("~url~",tdata.url).replaceAll("~img~",tdata.pic).replaceAll("~img~",tdata.pic).replaceAll("~text~",tdata.title).replaceAll("~target~",target));
				/*
				var codeStr=templete;
				try{
					if(!_interface.isBlank(tdata.url)){
						codeStr=codeStr.replaceAll("~url~",tdata.url);
					}
					if(!_interface.isBlank(tdata.pic)){
						codeStr=codeStr.replaceAll("~img~",tdata.pic);
					}
					if(!_interface.isBlank(tdata.title)){
						codeStr=codeStr.replaceAll("~text~",tdata.title);
					}
				}catch(e){alert(e);}
				*/
				if(type==0){
					$("#"+showid).html(codeStr);
				}else{
					$("#"+showid).append(codeStr);
				}
			}
			return true;
		}
	});
}
//PLS通用处理(替换~url~,~text~,~time~,~tag~)
//显示位置id,接口编号,显示个数,展示方式(0html,其他append),展示模板(自动替换上述标签内容)
InterfaceObj.prototype.getCommonPLS=function (showid,icode,param,ilength,type,templete){
	if(_interface.isBlank(templete)){alert("错误信息：空模板内容!位置："+showid+"，编号:"+icode);return;}
	_interface.getPLSData(icode,param,ilength,function(data){
		var targettype="_self";
		if(icode=="PLS.103"){
			targettype="_blank";
		}
		if(typeof(data)=="undefined" || data==null || data.length==0){
			if(type==0){
				$("#"+showid).html("<li>暂无数据...</li>");
			}else{
				$("#"+showid).append("<li>暂无数据...</li>");
			}
		}else{
	  		for(var i=0;i<data.length;i++){
	  			var tdata=data[i];
	  			var target=targettype;
	  			if(tdata.url.indexOf("javascript:")>-1){
	  				target="";
	  			}
				var codeStr=(templete.replaceAll("~url~",tdata.url).replaceAll("~img~",tdata.pic).replaceAll("~img~",tdata.pic).replaceAll("~text~",tdata.title).replaceAll("~target~",target).replaceAll("~time~",tdata.time).replaceAll("~tag~",tdata.tag));
				if(type==0){
					$("#"+showid).html(codeStr);
				}else{
					$("#"+showid).append(codeStr);
				}
			}
		}
	});
}
//学生、家长、教师(除作业)第三层次通用展示(效果为：第一个以图片显示,其他以列表显示 通用展示套用[标题<FONT class=redline>效果通过title传入])
InterfaceObj.prototype.showStudentArea3=function(showid,result,title,moreurl,channelid,targettype){
	if(_interface.isBlank(result)){return;}
	if(typeof(targettype)=="undefined" || targettype==null){targettype="_blank"}
	var codeArray=new Array();
	if(_interface.isBlank(moreurl)){
		codeArray.push('<h2 ><span class="more3" ></span>'+title+'</h2>');
	}else{
 		codeArray.push('<h2 slmid="'+channelid+'" ><span class="more3" ><a onclick="parent.changechannelstyle(\''+channelid+'\')" href="'+moreurl+'">进入</a></span>'+title+'</h2>');
 	}
	if(result){
  		if(result.length==0){
 			codeArray.push('<ul><li>暂无信息...</li></ul>');
 		}else{
			$(result).each(function(num){
				var urltemp = $(this).attr("url");
				if(urltemp.indexOf("javascript:")==1){
					targettype="";
				}else if(urltemp.indexOf("?")>-1){
					urltemp=urltemp+"&channelid="+channelid;
				}else{
					urltemp=urltemp+"?channelid="+channelid;
				}
				if(num==0){
					codeArray.push('<DL slmid="'+channelid+'" class="tj_img qk8">');
					codeArray.push('<DT><A title="'+$(this).attr("title")+'" href="'+urltemp+'" target="'+targettype+'" ><IMG src="'+$(this).attr("pic")+'" width=88 height=65></A></DT>');
					codeArray.push('<DD class=h24><A class=orange2 title="'+$(this).attr("title")+'" href="'+urltemp+'" target="'+targettype+'" >'+$(this).attr("title")+'</A></DD>');
					codeArray.push('<DD class=h40 >'+$(this).attr("desc")+'</DD>');
					codeArray.push('</DL>');
					codeArray.push('<UL class="h75" slmid="'+channelid+'" >');
				}else{
					codeArray.push('<LI>');
					//新上图标--&nbsp;<IMG src="http://ha.czbanbantong.com/space/images/newIcon.gif" width=23 height=11>
					codeArray.push('<A class="orange" title="'+$(this).attr("title")+'" href="'+urltemp+'" target="'+targettype+'" >'+$(this).attr("title")+'</A>');
					codeArray.push('</LI>');
				}
				if(num==(result.length-1) ){
					codeArray.push('</UL>');
				}
	 		});
 		}
	} else {
		codeArray.push('<ul><li>暂无信息...</li></ul>');
	}
	$("#"+showid).html(codeArray.join(""));
	codeArray=null;
}

//家长、亲子教育、家教视点 通用展示(效果为：列表显示 通用展示套用[标题<FONT class=redline>效果通过title传入])
InterfaceObj.prototype.showNoimgArea3=function(showid,result,title,moreurl,channelid,targettype){
	if(_interface.isBlank(result)){return;}
	if(typeof(targettype)=="undefined" || targettype==null){targettype="_blank"}
	var codeArray=new Array();
	if(_interface.isBlank(moreurl)){
		codeArray.push('<h2 ><span class="more3" ></span>'+title+'</h2>');
	}else{
 		codeArray.push('<h2 slmid="'+channelid+'" ><span class="more3" ><a onclick="parent.changechannelstyle(\''+channelid+'\')" href="'+moreurl+'">进入</a></span>'+title+'</h2>');
 	}
	if(result){
  		if(result.length==0){
 			codeArray.push('<ul><li>暂无信息...</li></ul>');
 		}else{
			$(result).each(function(num){
				var urltemp = $(this).attr("url");
				if(urltemp.indexOf("javascript:")==1){
					targettype="";
				}else  if(urltemp.indexOf("?")>-1){
					urltemp=urltemp+"&channelid="+channelid;
				}else{
					urltemp=urltemp+"?channelid="+channelid;
				}
				if(num==0){
					codeArray.push('<UL style="height:179px" slmid="'+channelid+'" >');
				}
				codeArray.push('<LI>');
				//新上图标--&nbsp;<IMG src="http://ha.czbanbantong.com/space/images/newIcon.gif" width=23 height=11>
				codeArray.push('<A class="orange" title="'+$(this).attr("title")+'" href="'+urltemp+'" target="'+targettype+'" >'+$(this).attr("title")+'</A>');
				codeArray.push('</LI>');
				if(num==(result.length-1) ){
					codeArray.push('</UL>');
				}
	 		});
 		}
	} else {
		codeArray.push('<ul><li>暂无信息...</li></ul>');
	}
	$("#"+showid).html(codeArray.join(""));
	codeArray=null;
}
//教师首页第一层次区域代码处理(效果为：全部以列表显示 通用展示套用[标题<FONT class=redline>效果通过title传入])
InterfaceObj.prototype.showTeacherArea1=function(showid,result,title,moreurl,channelid,urltemplet){
	var targettype="_self";
	if(_interface.isBlank(result)){return;}
	var codeArray=new Array();
	if(_interface.isBlank(moreurl)){
 		codeArray.push('<h2><span class="more3" ></span>'+title+'</h2>');
 	}else{
 		codeArray.push('<h2 slm="1" lmid="'+channelid+'" ><span class="more3" ><a onclick="parent.changechannelstyle(\''+channelid+'\')" href="'+moreurl+'">进入</a></span>'+title+'</h2>');
 	}
 	codeArray.push('<UL class="h165" slmid="'+channelid+'" >');
	if(result && result.length>0){
		$(result).each(function(num){
			var urltemp = $(this).attr("url");
			if(urltemp.indexOf("javascript:")==1){
				targettype="";
			}else   if(urltemp.indexOf("?")>-1){
				urltemp=urltemp+"&channelid="+channelid;
			}else{
				urltemp=urltemp+"?channelid="+channelid;
			}
			urltemp = urltemplet.replaceAll("~id~",$(this).attr("id")).replaceAll("~url~",urltemp).replaceAll("~img~",$(this).attr("pic")).replaceAll("~desc~",$(this).attr("desc")).replaceAll("~text~",$(this).attr("title")).replaceAll("~target~",targettype).replaceAll("~a9~",$(this).attr("a9")).replaceAll("~time~",$(this).attr("time")).replaceAll("~mark~",$(this).attr("mark")).replaceAll("~type~",$(this).attr("type")).replaceAll("~tag~",$(this).attr("tag"))
			//codeArray.push('<LI>');
			//新上图标--&nbsp;<IMG src="http://ha.czbanbantong.com/space/images/newIcon.gif" width=23 height=11>
			//codeArray.push('<A class="orange" title="'+$(this).attr("title")+'" href="'+urltemp+'" target="_blank" >'+$(this).attr("title")+'</A>');
			//codeArray.push('</LI>');
			codeArray.push(urltemp);
 		});
	}else{
		codeArray.push('<li>暂无数据...</li>');
	}
	codeArray.push('</UL>');
	$("#"+showid).html(codeArray.join(""));
	codeArray=null;
}
/*
//cms通用调用处理
InterfaceObj.prototype.getCommonCMS=function (showid,icode,a,type){
	_interface.getCMSData(icode,null,8,function(data){
		if(data.length==0){$("#"+showid).hide();}else{
			for(var i=0;i<data.length;i++){
				var tdata = data[i];
				if(type==0){
					$("#"+showid).html('<a href="'+tdata.url+'" target="_blank"><img src="'+tdata.pic+'" width="902" height="100" /></a>');
				}else if(type==1){
					$("#"+showid).append('<li><a href="'+tdata.url+'" target="_blank"><img src="'+tdata.pic+'" width="132" height="67" /></a></li>');
				}else if(type==3){
					$("#"+showid).append('<li><a href="'+tdata.url+'" target="_blank">'+tdata.title+'</a></li>');
				}
			}
		}
	});
}
*/
InterfaceObj.prototype.getJingcai_common= function (icode){
	var myDate = new Date();
	var cmsurl=protocol+sysconfig["CMS"];
	jQuery(function($){
  		$.getJSON(protocol+sysconfig["CMS"]+interface_config[icode]+"&time="+myDate.getSeconds()+"&jsoncallback=?",function(result){
  			var jingcaicount=0;
  			$(result.infosList).each(function(num){
 					if($(this).attr("abbrevpic")!=""||$(this).attr("abbrevpic")!="null"){
  						if(jingcaicount>5)return;
  						else jingcaicount++;
  						var des=$(this).attr("description");
	  					if(des=="null")des="";
	  					if(des.length>22)des=des.substring(0,22);
	  					var url="";
	  					if(icode=="CMS.JSON.A01012002"){//教师
							if(usertype==2||usertype==3){
		  						if($(this).attr("tag")!="null"&&getcookle("autologin")!=''){
		  							url="href=\"javascript:autologin('"+$(this).attr("tag")+"')\"";
		  						}else{
		  							url="href=\""+cmsurl+$(this).attr("filepath")+"\" target=\"_blank\"";
		  						}
		  					}else{
		  						url="href=\""+cmsurl+$(this).attr("filepath")+"\" target=\"_blank\"";
		  					}
						}else if(icode=="CMS.JSON.A01012001"){//学生
							if(usertype==4){
		  						if($(this).attr("tag")!="null"&&getcookle("autologin")!=''){
		  							url="href=\"javascript:autologin('"+$(this).attr("tag")+"')\"";
		  						}else{
		  							url="href=\""+cmsurl+$(this).attr("filepath")+"\" target=\"_blank\"";
		  						}
		  					}else{
		  						url="href=\""+cmsurl+$(this).attr("filepath")+"\" target=\"_blank\"";
		  					}
						}else if(icode=="CMS.JSON.A01012003"){//家长
							if(usertype==0){
		  						if($(this).attr("tag")!="null"&&getcookle("autologin")!=''){
		  							url="href=\"javascript:autologin('"+$(this).attr("tag")+"')\"";
		  						}else{
		  							url="href=\""+cmsurl+$(this).attr("filepath")+"\" target=\"_blank\"";
		  						}
		  					}else{
		  						url="href=\""+cmsurl+$(this).attr("filepath")+"\" target=\"_blank\"";
		  					}
						}	
	  					var h='<dl>'+
								'<dt>'+
									'<a '+url+' title="'+$(this).attr("topic")+'"><img src="'+cmsurl+"/"+$(this).attr("abbrevpic")+'" width="60" height="60" /></a>'+
								'</dt>'+
								'<dd class="bt1 texhidden">'+
									'<a '+url+' title="'+$(this).attr("topic")+'">'+$(this).attr("topic")+'</a>'+
								'</dd>'+
								'<dd class="intro">'+
									des+
								'</dd>'+
							'</dl>';
						if(icode=="CMS.JSON.A01012002"){//教师
							$("#tea_appShow").append(h);
						}else if(icode=="CMS.JSON.A01012001"){//学生
							$("#stu_appShow").append(h);
						}else if(icode=="CMS.JSON.A01012003"){//家长
							$("#pare_appShow").append(h);
						}
  					}
	  		});
  		})
  	});
}
//获取最近的邮件列表-站内消息
//username=邮箱账号(@前面的部分，使用3des加密)
//userpwd=邮箱密码 (使用3des加密，目前留空即可)
//num=获得的邮件个数
//usertype=账号类型
InterfaceObj.prototype.getWebMail = function (username,userpwd,number,usertype) {
  	var myDate = new Date();
	var data="data={\"command\":\"getUnReadMailContent\",\"username\":\""+username+"\",\"userpwd\":\"\",\"usertype\":\""+usertype+"\",\"num\":\""+number+"\"}";
  	if(!username)return;
  	jQuery(function($){
  		_interface.getCharsetRemoteJson("WEBMAIL","WEBMAIL.001",data,"gbk",function(result){
			if(result && result.msgList){
				if (result.msgList.length>0){
					for(var i=0;i<result.msgList.length;i++){
						var title=result.msgList[i].title;
						if (''==title || null==title || 'null'==title) {
							title="无标题";
						}
	  					//if(title.length>15)title=title.substring(0,15)+"...";
						var parmDate = "";
						var channelid = "";
	  					if(usertype==0){//家长.
	  						channelid = "22.14";
	  					} else if (usertype==2 || usertype==3){//教师
	  						channelid = "22.27";
	  					} else {//学生
	  						channelid = "22.27";
	  					}
	  					
	  					parmDate = "&data={\"command\":\"viewMail\",\"username\":\""+username+"\",\"userpwd\":\"\",\"usertype\":\""+usertype+"\",\"mailId\":\""+result.msgList[i].mailId+"\",\"channelid\":\""+channelid+"\",\"cookieid\":\""+parent.cookieid+"\"}";
	  					var mailurl=protocol+sysconfig["WEBMAIL"]+interface_config["WEBMAIL.002"]+"&time="+myDate.getSeconds()+parmDate;
	  					
						if (i==0) {
							//未读邮件
							if(result.msgList[i].state==0) {
								$("#webmail").append("<li>·<a href="+mailurl+" onclick=\"if(isGrant('jxhd')){parent.changechannelstyle('"+channelid+"');}else{return false;}\" class=\"orange\" title=\""+title+"\">"+title+"&nbsp;<img src='space/images/newIcon.gif' width='23' height='11' /></a></li>");
							} else {//已读邮件
								$("#webmail").append("<li>·<a href="+mailurl+" onclick=\"if(isGrant('jxhd')){parent.changechannelstyle('"+channelid+"');}else{return false;}\" title=\""+title+"\">"+title+"&nbsp;<img src='space/images/newIcon.gif' width='23' height='11' /></a></li>");
							}
						} else {
								//未读邮件
							if(result.msgList[i].state==0) {
								$("#webmail").append("<li>·<a href="+mailurl+" onclick=\"if(isGrant('jxhd')){parent.changechannelstyle('"+channelid+"');}else{return false;}\" class=\"orange\" title=\""+title+"\">"+title+"</a></li>");
							} else {//已读邮件
								$("#webmail").append("<li>·<a href="+mailurl+" onclick=\"if(isGrant('jxhd')){parent.changechannelstyle('"+channelid+"');}else{return false;}\" title=\""+title+"\">"+title+"</a></li>");
							}
						}
		  			}
	  			} else {
	  				$("#webmail").append("<li>·暂无站内信...</li>");
	  			}
	  		}else{
	  			$("#webmail").append("<li>·暂无站内信...</li>");
	  		}
	  		$("#webmail").removeClass("loddingbg");
	  	})
  	});
}
//显示各个角色首页广播列表,type==null是用户登录广播，否则是首页用户广播
InterfaceObj.prototype.getGuangboMessage = function (classid,type) {
	var myDate = new Date();
	var data="classId="+classid+"&type=2&pagesize=8";
	if(usertype){
		data=data+"&role="+usertype;
	}
	//prompt('',data);
  	jQuery(function($){
  		_interface.getRemoteJson("LCS","LCS.GG.1",data,function(result){
	  		if(result&&result.length){
	  			$(result).each(function(num){
	  				if(num>=6)return;
	  				if(!type){
	  					$("#messagebox").append("<li><a href=\""+protocol+sysconfig["LCS"]+interface_config["LCS.GG.4"]+"&id="+$(this).attr("id")+"\" title=\""+$(this).attr("title")+"\">·"+$(this).attr("title")+"</a></li>");
	  				}else if(type==1){
	  					marqueeContent.push("<li><a href=\"javascript:shouguangbomessage("+num+")\" title="+$(this).attr("title")+">·"+$(this).attr("title")+"</a></li>");
	  					marqueeContent_con.push($(this).attr("content"));
	  					marqueeContent_title.push($(this).attr("title"));
	  				}
	  			});
	  		}
	  		if(result.length==0){
  				if(!type)$("#messagebox").html("<li><span><a href=\"javascript:;\">·暂无公告...</a></span></li>");
  			}else if(type){
  				initMarquee();
  			}
  			var moreData="&type=2&role="+usertype+"&cookieid="+parent.cookieid;
  			$("#moreMessage").attr("href",protocol+sysconfig["LCS"]+interface_config["LCS.GG.2"]+moreData);
  			if(!type){$("#messagebox").removeClass("loddingbg");}
	  	})
  	});
}
//获取各个角色首页滚图下的通栏广告
InterfaceObj.prototype.getGuangGao = function (usertype) {
	var myDate = new Date();
	var a1 = "";
	var cmsurl = protocol+sysconfig["CMS"];
	if(usertype==2)a1="教师";//教师
	else if(usertype==3)a1="教师";//教师
	else if(usertype==4)a1="学生";//学生
	else if(usertype==0)a1="家长";//家长
  	//加载flash幻灯片
  	jQuery(function($){
  		_interface.getRemoteJson("CMS","CMS.JSON.A01028","&1=1",function(result){
	  		if(result){
	  			var infourll = "";
	  			var imgSrc = "";
	  			var opentype="";
				var schools=parent.schoolStage.split(",");
	  			$(result.infosList).each(function(num){
	  				if (''!=$(this).attr("a1") && null!=$(this).attr("a1") && 'null'!=$(this).attr("a1")){
	  					var aCode = "1.";
	  					if (''!=parent.areaCode && null!=parent.areaCode && 'null'!=parent.areaCode){
	  						aCode = parent.areaCode;
	  					}
	  					if ($(this).attr("a1") == a1&&$(this).attr("a3")==aCode) {
							if(""!=$(this).attr("a4") && null!=$(this).attr("a4") && "null"!=$(this).attr("a4") && "0000"!=$(this).attr("a4")){
								//如果当前用户属于多学段，则取第一个学段对应的图片及连接
								if($(this).attr("a4").indexOf(schools[0])>=0){
					  				infourll = $(this).attr("infourl");
					  				imgSrc = $(this).attr("abbrevpic");
					  				opentype=$(this).attr("a2");
					  				return false;//终止循环
								}
							}
	  					}
	  				}
	  			});
	  			if(''==imgSrc || null==imgSrc || "null"==imgSrc){
		  			 if (usertype==4){
		  				 imgSrc = "space/img/banner01.jpg";
		  			 } else if(usertype==2 || usertype==3) {
		  			 	 imgSrc = "space/img/banner02.jpg";
		  			 } else {
		  			  	 imgSrc = "space/img/banner03.jpg";
		  			 }
	  			} else {
	  				imgSrc = cmsurl+imgSrc;
	  			}
	  			var myobj = "";
	  			if(""==infourll || null==infourll || "null"==infourll){
  					myobj = "<img src=\""+imgSrc+"\" width=\"1000\" height=\"100\">";
	  			} else {
	  				var schools=parent.schoolStage.substring(0,parent.schoolStage.indexOf(",")<0?parent.schoolStage.length:parent.schoolStage.indexOf(","));
	  				if(infourll&&infourll.indexOf("data=")>=0){
	  					infourll=replaceregpar(infourll,"username",parent.username);
	  					infourll=replaceregpar(infourll,"cookieid",parent.cookieid);
	  					infourll=replaceregpar(infourll,"schoolStage",schools);
	  					infourll=replaceregpar(infourll,"schoolId",parent.schoolId);
	  					infourll=replaceregpar(infourll,"usertype",parent.usertype);
	  					//infourll=infourll.replace(/data=[^}]+}/,"data="+parent.__par);
	  				}else if(infourll&&infourll.indexOf("?")>=0){
	  					infourll=infourll+"&"+parent.__par;
	  				}else if(infourll){
	  					infourll=infourll+"?"+parent.__par;
	  				}
	  				var target = "_blank";
	  				if(opentype=="当前页"){
	  					target = "";
	  				}else if(opentype=="不打开"){
	  					infourll="javascript:;"
	  					target="";
	  				}
	  				if(infourll.indexOf("\"")>=0)
	  				myobj = "<a href='"+infourll+"' target=\""+target+"\"><img src=\""+imgSrc+"\" width=\"1000\" height=\"100\"></a>";
	  				else
	  				myobj = "<a href=\""+infourll+"\" target=\""+target+"\"><img src=\""+imgSrc+"\" width=\"1000\" height=\"100\"></a>";
	  			}
	  			$("#guanggao").html(myobj);
	  		}

	  	});
  	});
}

//获取首页幻灯效果getBanFlash
InterfaceObj.prototype.getBanFlash = function (usertype) {
	var cmsurl=protocol+sysconfig["CMS"];
	var myDate = new Date();
	var id="";
	if(usertype==2)id="CMS.JSON.A01004";//教师
	else if(usertype==3)id="CMS.JSON.A01004";//教师
	else if(usertype==4)id="CMS.JSON.A01006";//学生
	else if(usertype==0)id="CMS.JSON.A01007";//家长
  	//加载flash幻灯片
  	jQuery(function($){
  		_interface.getRemoteJson("CMS",id,"&1=1",function(result){
	  		if(result){
	  			var leng = 0;
	  			var myobj = "";
	  			$(result.infosList).each(function(num){
					if(leng>7)return false;
	  				var schools=parent.schoolStage.split(",");
	  				if(""!=$(this).attr("a10") && null!=$(this).attr("a10") && "null"!=$(this).attr("a10")){
						//如果当前用户属于多学段，则取第一个学段对应的图片及连接
						if($(this).attr("a10").indexOf(schools[0])>=0 ||$(this).attr("a10")=="0000"){
			  				leng++;
			  				var infourll=$(this).attr("infourl");
			  				if(infourll&&infourll.indexOf("data=")>=0){
			  					infourll=replaceregpar(infourll,"username",parent.username);
			  					infourll=replaceregpar(infourll,"cookieid",parent.cookieid);
			  					infourll=replaceregpar(infourll,"schoolStage",schools[0]);
			  					infourll=replaceregpar(infourll,"schoolId",parent.schoolId);
			  					infourll=replaceregpar(infourll,"usertype",parent.usertype);
			  					//infourll=infourll.replace(/data=[^}]+}/,"data="+parent.__par);
			  				}else if(infourll&&infourll.indexOf("?")>=0){
			  					infourll=infourll+"&"+parent.__par;
			  				}else if(infourll){
			  					infourll=infourll+"?"+parent.__par;
			  				}
			  				var imgSrc = '';
			  				//alert($(this).attr("abbrevpic"));
			  				if (''!=$(this).attr("abbrevpic") && null!=$(this).attr("abbrevpic") && 'null'!=$(this).attr("abbrevpic")){
			  					imgSrc = cmsurl+$(this).attr("abbrevpic");
			  				}
			  				//$("#href_"+num).attr("href",infourll);
			  				//$("#img_"+num).attr("src",imgSrc);
			  				var target = "_blank";
			  				if($(this).attr("a9")=="当前页"){
			  					target = "iframe01";
			  				}else if($(this).attr("a9")=="不打开"){
			  					infourll="javascript:;"
			  					target="";
			  				}
			  				if(infourll.indexOf("\"")>=0)
			  				myobj = myobj+ "<TD><A href='"+infourll+"' target=\""+target+"\"><IMG src=\""+imgSrc+"\"></A></TD>";
			  				else
			  				myobj = myobj+ "<TD><A href=\""+infourll+"\" target=\""+target+"\"><IMG src=\""+imgSrc+"\"></A></TD>";
					   }
	  				}
				
	  			});
	  			$("#focusImgDiv").html(myobj);
	  			
	  			var forEach = function(array, callback, thisObject){
				if(array.forEach){
						array.forEach(callback, thisObject);
					}else{
						for (var i = 0, len = array.length; i < len; i++) { callback.call(thisObject, array[i], i, array); }
					}
				}
				var st = new SlideTrans("idContainer2", "idSlider2", leng, { Vertical: false });
				var nums = [];
				for(var i = 0, n = st._count - 1; i <= n;){
					(nums[i] = $tmp("idNum").appendChild(document.createElement("li"))).innerHTML = ++i;
				}
				forEach(nums, function(o, i){
					o.onmouseover = function(){ o.className = "on"; st.Auto = false; st.Run(i); }
					o.onmouseout = function(){ o.className = ""; st.Auto = true; st.Run(); }
				})
				
				st.onStart = function(){
					forEach(nums, function(o, i){ o.className = st.Index == i ? "on" : ""; })
				}
				st.Run();
	  		}

	  	});
  	});
}
InterfaceObj.prototype.getLoginfocusImg=function(showid,icode){
	_interface.getCMSData(icode,null,7,function(data){
		for(var i=0;i<data.length;i++){
			var tdata = data[i];
			var target = "_blank";
			if(tdata.a9=="当前页"){
				target = "";
			}else if(tdata.a9=="不打开"){
				infourll="javascript:;"
				target="";
			}
			$("#loginflash").append('<li><a href="'+tdata.url+'" target="'+target+'"><img src="'+tdata.pic+'" width="710" height="300"/></a></li>');
		}
		$(function(){
			var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）
			var len = $("#focus ul li").length; //获取焦点图个数
			var index = 0;
			var picTimer;
			
			//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
			var btn = "<div class='btn'>";
			for(var i=0; i < len; i++) {
				btn += "<span></span>";
			}
			btn += "</div>";
			$("#focus").append(btn);
		
			//为小按钮添加鼠标滑入事件，以显示相应的内容
			$("#focus .btn span").mouseenter(function() {
				index = $("#focus .btn span").index(this);
				showPics(index);
			}).eq(0).trigger("mouseenter");
		
		
			//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
			$("#focus ul").css("width",sWidth * (len));
			
			//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
			$("#focus").hover(function() {
				clearInterval(picTimer);
			},function() {
				picTimer = setInterval(function() {
					showPics(index);
					index++;
					if(index == len) {index = 0;}
				},4000); //此4000代表自动播放的间隔，单位：毫秒
			}).trigger("mouseleave");
			
			//显示图片函数，根据接收的index值显示相应的内容
			function showPics(index) { //普通切换
				var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
				$("#focus ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
				$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
				//$("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
			}
		});
	});
}

//##教师首页处理##

//获取教师首页：教材资源
InterfaceObj.prototype.showTeacherArea1_1 = function (username,usertype,myFavorite,lastCode,classid,number) {
    //menuCode先从myFavorite中取数据，目录编号（支持多个编号,分隔），如果没有，就从接口中获取
	//var menuCode = getMenuCode(myFavorite,lastCode,1);
	var channelid="22.01";
	var schoolS=parent.schoolStage.split(",");
	var menuCode = getMenuCode(myFavorite,false);
	var myDate = new Date();
	//var data="data={\"listType\":\"1\",\"menuCode\":\""+menuCode+"\",\"page\":\"1\",\"pageNum\":\""+number+"\",\"recommend\":\"ZYNEW\",\"schoolId\":\""+parent.schoolId+"\"}";
  	if(!username)return;
  	//设定的课程目录
	var data="menuCode="+menuCode+"&resCount="+number+"&schoolId="+parent.schoolId;
	//var parmDate = "&username="+username+"&areaId="+userAreaId+"&rcode=~url~&type=1&bodyId=&cusip="+parent.ip+"&filetype=undefined&schoolId="+parent.schoolId+"&channelid="+channelid;
	
  	var moreurl=null;
	//学生、家长
	if (usertype==0 || usertype==4) {
		moreurl=protocol+sysconfig["PLS"]+interface_config["PLS.114"];
	} else {//教师
		moreurl=protocol+sysconfig["PLS"]+interface_config["PLS.015"];
	}
	moreurl=moreurl+'&schoolStage='+schoolS[0]+'&username='+username+'&classId='+classid+'&studentId='+username+'&schoolId='+parent.schoolId+"&channelid="+channelid;
  	jQuery(function($){
  		//$("#moreBaseRes").attr("href",moreurl);
		$("#baseRes").removeClass("loddingbg");
		//if(_interface.getCommonPLS("baseRes","PLS.100",data,6,1,"<li><a href="+protocol+sysconfig["PLS"]+interface_config["PLS.113"]+"&"+parmDate+" target='_blank' class='orange' title='~text~'>~text~</a></li>")){
		//	$("#baseRes").append("<li>暂无数据...</li>");
		//}
		_interface.getPLSData("PLS.100",data,7,function(result){
			_interface.showTeacherArea1("baseRes",result,"<font  class=\"redline\" >教材资源</font>",moreurl,channelid,"<li><a href='~url~' target='_blank' class='orange' title='~text~'>~text~</a></li>");
			
		});
  	});
}
//获取教师首页：系统推荐资源
InterfaceObj.prototype.showTeacherArea1_2 = function (username) {
	//var menucode= '000115';
	//var menuCodeTemp = getMenuCode(myFavorite,lastCode,1);
	var menuCodeTemp = getMenuCode(myFavorite,false);
	var codes = menuCodeTemp.split(",");
	var menuCode = "";
	for(var i=0;i<codes.length;i++){
		//对每一个课程编号去掉最后两位
		var code = codes[i].substring(0,codes[i].length-2);
		if(i==codes.length-1){
			menuCode = menuCode + code;
		} else {
			menuCode = menuCode + code + ",";
		}
	}
	var channelid="22.00";
	var myDate = new Date();
	var moredata=parent.__par+"&channelid="+channelid;
	var data="resCount=7&recommend=ZYTJNEW&menuCode="+menuCode+"&schoolId="+parent.schoolId;
  	//加载最新资源
  	jQuery(function($){
		$("#systemTuijian").removeClass("loddingbg");
		var moreurl=protocol+sysconfig["PLS"]+interface_config["PLS.130"]+"&time="+myDate.getSeconds()+moredata;
		_interface.getPLSData("PLS.104",data,7,function(result){
			_interface.showTeacherArea1("systemTuijian",result,"<font  class=\"redline\" >系统推荐</font>",moreurl,channelid,"<li><span><a href='javascript:parent.tuijianResToClass(\"~id~\",\"~text~\",\"~mark~\",\"~type~\");' class='hongfon aba'>推荐</a></span><a href=\"~url~\" target='_blank' title='~text~'>~text~</a></li>");
			
		});
  	});
}
//获取教师首页：拓展资源
InterfaceObj.prototype.showTeacherArea1_3 = function (username,usertype,lastCode,classid,number) {
  	var myDate = new Date();
  	//目录编号，最终是要从lastCode中取数据，如果没有，默认一个编号
	var ksCode = '';
	if(lastCode && null!=lastCode){
		 $(lastCode.TeacherInfo).each(function(num){
			 	if (null !=$(this).attr("menuType") &&  ''!=$(this).attr("menuType") && 'null'!=$(this).attr("menuType")) {
			 		if($(this).attr("menuType")==2){//2是专题教育
						ksCode = $(this).attr("ksCode");
						return false;//终止循环
			 		}
			 	}
		 });
	 }
  	if (''==ksCode || null==ksCode || 'null'==ksCode){
  		//给一个默认编号
  		ksCode = '000111';
  	}
  	var channelid="22.03";
  	if(!username)return;
	//设定的课程目录
	var data="menuCode="+ksCode+"&resCount=7&schoolId="+parent.schoolId;
  	var parmDate="&username="+username+"&areaId="+userAreaId+"&rcode=~url~&type=1&bodyId=&cusip="+parent.ip+"&filetype=undefined&schoolId="+parent.schoolId+"&cookieid="+parent.cookieid+"&channelid="+channelid;
	var moredata = parent.__par+'&channelid=22.03';
  	var moreurl=protocol+sysconfig["PLS"]+interface_config["PLS.135"]+moredata;
  	jQuery(function($){
		$("#secondKetang").removeClass("loddingbg");
  		_interface.getPLSData("PLS.101",data,7,function(result){
			_interface.showTeacherArea1("secondKetang",result,"<font  class=\"redline\" >数字阅览室</font>",moreurl,channelid,"<li><a href='~url~' target='_blank' title='~text~'>~text~</a></li>");
		});
	});
}
//获取教师首页：推荐作业列表
InterfaceObj.prototype.showTeacherArea2_1 = function (username,usertype,number,myFavorite,lastCode) {
	//此处要传课程目录ID
	var menuCode = "";
	//menuCode = getMenuCode(myFavorite,null,1,true);
	menuCode = getMenuCode(myFavorite,false);
  	var myDate = new Date();
  	var channelid="22.04.02";
  	//alert(menuCode);
  	var data = "classId="+menuCode+"&count="+number;
  	if(!username)return;
  	jQuery(function($){
  		$("#assignZuoye").removeClass("loddingbg");
  		_interface.getRemoteJson("QBMS","QBMS.020",data,function(rdata){
  			var numflag = 0;
			if(rdata[""] && rdata[""].list){
				var result=	rdata[""].list;
				for(var i=0;i<result.length;i++){
					//获取lessionId和versionid
					var paperId = result[i].id;//没用
					var title = result[i].paperName;
					var fenId = result[i].paperTypeId;
					var lessionId =  result[i].class_id;
					var subjectId =  result[i].subject_id;
					var versionId =  result[i].material_id;
					//var paraData = "data={navTarget:\"publish\",lessionId:\""+lessionId+"\",versionId:\""+versionId+"\",classifyId:\""+fenId+"\",\"subjectId\":\""+subjectId+"\",channelid:\"22.04.02\",cookieid:\""+parent.cookieid+"\"}";
					var paraData = "navTarget=publish&lessionId="+lessionId+"&paperId="+paperId+"&versionId="+versionId+"&classifyId="+fenId+"&subjectId="+subjectId+"&channelid="+channelid+"&cookieid="+parent.cookieid;
					/*
					if (numflag==1) {//如果是第一条
						$("#assignZuoye").append("<li><a class='orange'  href='"+url+"LCS.ZY.TEACHER.RECOMMEND&reqEncoding=utf-8&"+paraData+"' title='"+title+"'>"+title+"&nbsp;<img src='space/images/newIcon.gif' width='23' height='11' /></a></li>");
					} else {
						$("#assignZuoye").append("<li><a href='"+url+"LCS.ZY.TEACHER.RECOMMEND&reqEncoding=utf-8&"+paraData+"' title='"+title+"'>"+title+"</a></li>");
					}
					*/
					$("#assignZuoye").append("<li><a href='http://"+sysconfig["LCS"]+interface_config["LCS.ZY.TEACHER.RECOMMEND"]+"&reqEncoding=utf-8&"+paraData+"' title='"+title+"'>"+title+"</a></li>");
				}
				if(result.length==0){
	  				$("#assignZuoye").html("<li>暂无信息...</li>");
	  			} 
			} else {
		  		$("#assignZuoye").html("<li>暂无信息...</li>");
		  	}
		  	var moredata = parent.__par+"&channelid=22.04.02";
		  	$("#moreAssignZuoye").attr("href",protocol+sysconfig["LCS"]+interface_config["LCS.ZY.TEACHER.RECOMMEND"]+"&reqEncoding=utf-8&"+moredata);
	  	});
	  });
}

//获取教师首页：作业布置
InterfaceObj.prototype.showTeacherArea2_2 = function (username,usertype,number,classjson) {
	//从classjson中获得classid和classname串
	//此处要传课程目录ID
  	//$("#correctZuoye").removeClass("loddingbg");
	menuCode = getMenuCode(myFavorite,null,1,true);
	$(myFavorite.rtnArray).each(function(num){
		 	//从设置的课程进度中取目录编号
	       if (null !=$(this).attr("ksId") &&  ''!=$(this).attr("ksId") && 'null'!=$(this).attr("ksId")) {
				menuCode = $(this).attr("ksId");
				return;
			}
	});
  	var myDate = new Date();
  	if(!username)return;
  	var data = "teacherId="+username+"&lessionId="+menuCode+"&versionId=&num="+number;
 	_interface.getRemoteJson("LCS","LCS.ZY.TEACHER.PUBLISHlIST",data,function(result){
		if(result && result.length>0){
			var tempCode=new Array(); 
			$(result).each(function(num){
				if(!$(this).attr("name")) return true;
				if(num>6)return false;
				var title=$(this).attr("name");
  				var paraData = "homeworkId="+$(this).attr("id")+"&num=7&channelid=22.04.02&cookieid="+parent.cookieid;
				tempCode.push("<li><a href='"+protocol+sysconfig["LCS"]+interface_config["LCS.ZY.TEACHER.ONLINELIST"]+"&"+paraData+"' title='"+title+"'>"+title+"</a></li>");
		  	});
			$("#correctZuoye").html(tempCode.join(""));
		} else {
	  		$("#correctZuoye").html("<li style='height:50px;'>您还没有给您的学生布置过任何作业呢，请点击“<b>创建<br>作业</b>”给您的学生布置下第一份在线作业吧。</li>");
	  	}
  		$("#moreCorrectZuoye").attr("href",protocol+sysconfig["LCS"]+interface_config["LCS.ZY.TEACHER.INDEX"]+"&navTarget=correct&channelid=22.04.02&cookieid="+parent.cookieid);
  		$("#correctZuoye").removeClass("loddingbg");
  	});
}

//获取教师首页：作业统计
InterfaceObj.prototype.showTeacherArea2_3 = function (username) {
  	var myDate = new Date();
  	var data = "teacherId="+username+"&num=7";
  	if(!username)return;
	_interface.getRemoteJson("LCS","LCS.ZY.STATICINFO",data,function(result){
	if(result && result.length>0){
		var codeTemp = new Array();
		$(result).each(function(num){
			if(!$(this).attr("name"))return true;
			if(num>6)return false;
			var title=$(this).attr("name");
			codeTemp.push("<li><span>已完成(<font class='redfon'>"+$(this).attr("realNum")+"</font>)</span><a href='"+protocol+sysconfig["LCS"]+interface_config["LCS.ZY.TEACHER.STATIC"]+"&homeworkId="+$(this).attr("id")+"&channelid=22.04.02' class='orange' title='"+title+"'>"+title+"</a></li>");
	  	});
	  	$("#statZuoye").html(codeTemp.join(""));
	} else {
  		$("#statZuoye").html("<li  style='height:50px;'>这里还没有任何数据哟，试一下布置给学生<br>一些作业吧。</li>");
  	}
 		$("#moreStatZuoye").attr("href",protocol+sysconfig["LCS"]+interface_config["LCS.ZY.TEACHER.STATIC"]+"&navTarget=static&channelid=22.04.02&cookieid="+parent.cookieid);
  		$("#statZuoye").removeClass("loddingbg");
 	});
}
//获取教师首页：大家都在学习的资料
InterfaceObj.prototype.showTeacherArea3_1 = function (myFavorite,lastCode,username,classid,number) {
	var myDate = new Date();
  	var fenLeiType = 'ZIYUAN';
  	var channelid = "22.05";
	//此处的分类编号是固定的
	var fenleiCode = '20121220134539750375186507388';
  	var data = "page=1&pageNum=6&fenLeiType="+fenLeiType+"&fenLeiCode="+fenleiCode+"&listType=0";
  	if(!username)return;
	$("#ziliao").removeClass("loddingbg");
  	jQuery(function($){
  		_interface.getPLSData("PLS.115",data,8,function(result){
			var moredata = parent.__par+"&channelid="+channelid;
			var moreurl=protocol+sysconfig['PLS']+interface_config['PLS.169']+"&reqEncoding=utf-8&"+moredata;
			_interface.showStudentArea3("ziliao",result,"<FONT class=redline>大家都在学习的资料</FONT>",protocol+sysconfig['PLS']+interface_config['PLS.169']+moredata,channelid);
		});
  	});
}
//获取教师首页：丰富多彩的活动
InterfaceObj.prototype.showTeacherArea3_2 = function (username,cmsurl,usertype) {
  	var myDate = new Date();
  	var fenLeiType = 'ZIYUAN';
	//此处的分类编号是固定的
	var fenleiCode = '20121228173207727764161282875';
  	var data = "page=1&pageNum=4&fenLeiType="+fenLeiType+"&fenLeiCode="+fenleiCode+"&listType=0";
  	if(!username)return;
  	jQuery(function($){
 		$("#activities").removeClass("loddingbg");
  		_interface.getPLSData("PLS.115",data,7,function(result){
			var channelid="22.05";
 			var moreurl=null;
 			_interface.showStudentArea3("activities",result,"<font class='redline'>丰富多彩的活动</font>",moreurl,channelid,protocol+sysconfig['PLS']+interface_config['PLS.113']+"&username="+username+"&areaId="+userAreaId+"&rcode=~url~&type=1&bodyId=&cusip="+parent.ip+"&filetype=undefined&schoolId="+parent.schoolId);
	  	});
	  });
}
//获取教师首页：教师文件夹(河南)
InterfaceObj.prototype.getTeacherFileFolder = function (username,myFavorite) {
	var myDate = new Date();
  	//设定的课程目录
	var data="interFaceType=getfilelist&parentfcode=&teachnumber="+username+"&sort=createtime";
  	//加载最新资源
	//alert(url+"PLS.FILE.01&time="+myDate.getSeconds()+"&reqEncoding=gbk&"+data);
  	jQuery(function($){
  		$("#localteacherfile").removeClass("loddingbg");
		var moredata = parent.__par+'&channelid=21.05';
		$("#moreLocalteacherfile").attr("href",protocol+sysconfig["PLS"]+interface_config["PLS.SPACE.01"]+moredata);
  		_interface.getCharsetRemoteJson("PLS","PLS.FILE.01",data,"gbk",function(result){
			 if(result && result.back){
					$(result.back).each(function(num){
						if(num>6)return false;
						var title=$(this).attr("filename");
						//var parmDate = "data={\"username\":\""+username+"\",\"areaId\":\""+userAreaId+"\",\"rcode\":\""+$(this).attr("RCode")+"\",\"type\":\"1\",\"bodyId\":\"\",\"cusip\":\""+parent.ip+"\",\"filetype\":\"undefined\",\"schoolId\":\""+parent.schoolId+"\"}";
						if (num==0) {
							$("#localteacherfile").append("<li><a href=\"javascript:parent.playrecommendfile('"+$(this).attr("fcode")+"','"+parent.plsUrl+"','"+$(this).attr("filetype")+"');\"  class='orange' title='"+title+"'>"+title+"&nbsp;<img src='space/images/newIcon.gif' width='23' height='11' /></a></li>");
						} else {
							$("#localteacherfile").append("<li><a href=\"javascript:parent.playrecommendfile('"+$(this).attr("fcode")+"','"+parent.plsUrl+"','"+$(this).attr("filetype")+"');\"  title='"+title+"'>"+title+"</a></li>");
						}
				  	});
			  		if(result.back.length==0){
			  			$("#localteacherfile").html("<li>您的文件夹中还没有文件，请上传您的资源。</li>");
		  			} 
	  		} else {
	  			$("#localRes").html("<li>您的文件夹中还没有文件，请上传您的资源。</li>");
	  		}
	  	});
	});
}

//##学生首页处理:小学##

//学生首页、家长首页：显示教师作业-网上作业
InterfaceObj.prototype.getTeacherzuoye = function (type,student,classid,number) {
	var myDate = new Date();
	var data="",icode='',moreurl='',channelid;
	var moredata = parent.__par+"&channelid=22.09.01";
	data="studentId="+student+"&count="+number+"&classId="+classid;
	if(type==4){//学生
		icode="LCS.ZY.2";
		channelid='22.17';
		moreurl=protocol+sysconfig["LCS"]+interface_config["LCS.ZY.STUDENT.INDEX"]+moredata;
	}else if(type==0){//家长
		icode="LCS.ZY.3";
		channelid='22.35';
		moreurl=protocol+sysconfig["LCS"]+interface_config["LCS.ZY.PARENTS.INDEX"]+moredata;
	}
	//prompt('',protocol+sysconfig["LCS"]+interface_config[icode]+data);
  	jQuery(function($){
  		$("#morezuoye").attr("href",moreurl);
  		$("#zuoye").removeClass("loddingbg");
		_interface.getRemoteJson("LCS",icode,data,function(result){
  			if(result && result.length && result.length>0){
	  			$(result).each(function(num){
					if(num>6)return false;
	  				var title=$(this).attr("name");
	  				var tip="发布了";
	  				if(null!=$(this).attr("markflag") && ""!=$(this).attr("markflag") && "null"!=$(this).attr("markflag")){
	  					if($(this).attr("markflag")==1){
		  					tip = "发布了";
	  					}
	  				}
	  				//if(title.length>15)title=title.substring(0,15)+"...";
	  				if(type==4){//学生
		  				var zuoyeLink = protocol+sysconfig["LCS"]+interface_config["LCS.ZY.STUDENT.REPLYHOMEWORK"]+"&homework.id="+$(this).attr("id")+"&cookieid="+parent.cookieid+"&channelid="+channelid;
						if (num == 0) {
							$("#zuoye").append("<li><a href='"+zuoyeLink+"' class='orange' title='"+title+"'>["+$(this).attr("teacherName")+"]"+tip+title+"作业。&nbsp;<img src='space/images/newIcon.gif' width='23' height='11' /></a></li>");
						} else {
							$("#zuoye").append("<li><a href='"+zuoyeLink+"' title='"+title+"'>["+$(this).attr("teacherName")+"]"+tip+"<font style='color:#ee9400;font-weight:bold;'>"+title+"</font>作业。</a></li>");
						}
					}else if(type==0){//家长
						//对于家长，都是查看作业
						var zuoyeLink = protocol+sysconfig["LCS"]+interface_config["LCS.ZY.PARENT.REPLYHOMEWORK"]+"&homeworkId="+$(this).attr("id")+"&studentId="+student+"&cookieid="+parent.cookieid+"&channelid="+channelid;
						//不区分作业类型
						if (num == 0) {
							$("#zuoye").append("<li><a href='"+zuoyeLink+"' class='orange' title='"+title+"'>["+$(this).attr("teacherName")+"]"+tip+title+"作业。</a>&nbsp;<img src='space/images/newIcon.gif' width='23' height='11' /></li>");
						} else {
							$("#zuoye").append("<li><a href='"+zuoyeLink+"' title='"+title+"'>["+$(this).attr("teacherName")+"]"+tip+"<font style='color:#ee9400;font-weight:bold;'>"+title+"</font>作业。</a></li>");
						}
					}
	  			});
	  			if(result.length==0){
	  				if(type==4){//学生
						$("#zuoye").html("<li><span>老师还没有给您布置作业哦！</span></li>");
					}else if(type==0){//家长
						$("#zuoye").html("<li><span>老师还没有给您的孩子布置作业哦！</span></li>");
					}
	  			}
	  		}else{
	  			if(type==4){//学生
					$("#zuoye").html("<li><span>老师还没有给您布置作业哦！</span></li>");
				}else if(type==0){//家长
					$("#zuoye").html("<li><span>老师还没有给您的孩子布置作业哦！</span></li>");
				}
	  		}
	  	});
  	});
}
//学生首页：获取辅导答疑1：未解答，2：已解答，3：已精选-网上答疑
InterfaceObj.prototype.getStudentTiWen = function (username,type,myfav,lastCode) {
	var myDate = new Date();
	var data="",id="",moreurl="";
	//获取所选科目
	var subjectCode = getSelectedSubject();
	data="askerId=&num=7&subjectId='"+subjectCode+"'&randomdata="+myDate.getSeconds();
	id="LCS.FD.1";
	var channelid="22.09.01";
	var moredata = parent.__par+'&channelid='+channelid;
	if(username)moreurl=protocol+sysconfig["LCS"]+interface_config["LCS.FD.XS"]+moredata;
	else moreurl=protocol+sysconfig["LCS"]+interface_config["LCS.FD.JX"]+moredata;
	$("#teacherfudao").html("");
  	//保存定制的应用
  	jQuery(function($){
		$("#moreteacherfudao").attr("href",moreurl);
		$("#teacherfudao").removeClass("loddingbg");
  		_interface.getRemoteJson("LCS",id,data,function(result){
	  		if( result && result.length ){
	  			$(result).each(function(num){
	  				$("#teacherfudao").append('<li><a href="'+protocol+sysconfig["LCS"]+interface_config["LCS.FD.5"]+'&id='+$(this).attr("q_id")+'&cookieid='+parent.cookieid+'&channelid='+channelid+'" class="orange" title="'+$(this).attr("q_title")+'"><img src="space/images/ask_icon2.gif" width="16" height="16" />&nbsp;'+$(this).attr("q_title")+'</a></li>');
	  			});
	  			if(result.length==0){
	  				$("#teacherfudao").html("<li>暂无信息...</li>");
	  			}
	  		}else{
	  			$("#teacherfudao").html("<li>暂无信息...</li>");
	  		} 
	  	})
  	});
}
//学生首页-小初高学段 ：获取专题教育-课外拓展
InterfaceObj.prototype.getZhuanTiRs = function (username,usertype,myFavorite,lastCode,classid) {
	var myDate = new Date();
	var channelid = "22.26";
  	var data="knowledgeName=&ksCode=00011108,00011110,00011109,00011102,00011101,00011104,00011103&kstate="+parent.schoolStage+"&kpCode=&mainType=&nextType=GLZYLX&listType=1&page=1&pageNum=7&usertype="+usertype+"&krType=1&jsonType=1";
  	if(!username)return;
  	jQuery(function($){
	 	$("#zhuanti").removeClass("loddingbg");
  		_interface.getPLSData("PLS.170",data,5,function(result){
				var moredata = parent.__par+'&channelid='+channelid;
	 			var moreurl=protocol+sysconfig["PLS"]+interface_config["PLS.176"]+moredata;
	 			_interface.showStudentArea3("zhuanti",result,"数字阅览室",moreurl,channelid,"_self");
	  	});
	});
}

//##学生首页处理:初中、高中##
//获取学生-初高中首页：考试专题 备考专区(分学段，对应教师考试专题中的精品推荐)
InterfaceObj.prototype.getExamRs = function (username,cmsurl,usertype) {
  	var myDate = new Date();
  	var fenLeiType = 'ZIYUAN';
  	var channelid = "22.29";
	//var fenleiCode = '20120824110706343747448119200';
	var fenleiCode = '';
  	if(parent.schoolStage=="0001"){
  		fenleiCode="20120817113856398499512753084";//小学
  		channelid="22.32";
	}else if(parent.schoolStage=="0002"){
		fenleiCode="20120824110706343747448119200";//初中
		channelid="22.33";
	}else if(parent.schoolStage=="0003"){
		fenleiCode="20120824110721935912812337719";//高中
		channelid="22.34";
	}
  	if(!username)return;
  	var data="page=1&pageNum=5&fenLeiType="+fenLeiType+"&fenLeiCode="+fenleiCode+"&listType=0";
  	jQuery(function($){
		$("#kaoshi").removeClass("loddingbg");
  		_interface.getPLSData("PLS.115",data,7,function(result){
				var moredata = parent.__par+'&channelid='+channelid;
	 			var moreurl=protocol+sysconfig['PLS']+interface_config['PLS.STUDENTTEST']+moredata;
	 			_interface.showStudentArea3("kaoshi",result,"考试专题",moreurl,channelid);
	  	});
	});
}

//获取学生-初高中首页：健康成长数据
InterfaceObj.prototype.getJianKangChengZhang = function (cmsurl,username) {
  	var myDate = new Date();
  	var channelid="22.24";
	//此处的分类编号是固定的
  	var data = "page=1&pageNum=5&fenLeiType=ZIYUAN&fenLeiCode=20131228173207727764161282875&listType=0";
  	if(!username)return;
  	jQuery(function($){
  		_interface.getPLSData("PLS.115",data,7,function(result){
				var moredata = parent.__par+'&channelid='+channelid;
	 			var moreurl=protocol+sysconfig['PLS']+interface_config['PLS.137']+moredata;
	 			_interface.showStudentArea3("jiankang",result,"健康成长",moreurl,channelid,protocol+sysconfig['PLS']+interface_config['PLS.113']+data);
	 			$("#kaoshi").removeClass("loddingbg");
	  	});
	});
}


//获取小学生首页：大家都在学习的资料 名师课堂资源
InterfaceObj.prototype.getMeiRiRs = function (username,cmsurl,usertype) {
  	var myDate = new Date();
  	var fenLeiType = 'ZIYUAN';
	//var fenleiCode = '20120824110706343747448119200';
	var fenleiCode = '00013201';
	var channelid='22.08';
	//PLS.115
  	//var data="data={\"page\":\"1\",\"pageNum\":\"5\",\"fenLeiType\":\""+fenLeiType+"\",\"fenLeiCode\":\""+fenleiCode+"\",\"listType\":\"0\"}";
	var data="menuCode=00013201&resCount=7&schoolId=4101019999";
  	if(!username)return;
  	jQuery(function($){
  		_interface.getPLSData("PLS.100",data,7,function(result){
				var moredata = parent.__par+'&channelid='+channelid;
	 			var moreurl=protocol+sysconfig['PLS']+interface_config['PLS.185']+moredata;
	 			_interface.showStudentArea3("kaoshi",result,"大家都在学习的资料",moreurl,channelid,protocol+sysconfig['PLS']+interface_config['PLS.113']+data);
	 			$("#kaoshi").removeClass("loddingbg");
	  	});
	  });
}
//##家长首页处理##

//家长首页：获取推荐的资源
InterfaceObj.prototype.recommendResources = function (classid) {
	var myDate = new Date();
	//老师设定的课程目录
	var data="listType=1&pageNum=7&schoolId="+parent.schoolId;
	if(classid)data="groupId="+classid+"&listType=1&pageNum=7&schoolId="+parent.schoolId;
  	//加载最新资源
 	jQuery(function($){
 		$("#renwu").removeClass("loddingbg");
  		_interface.getCommonPLS("renwu","PLS.103",data,7,1,"<li><span>~time~</span><a onclick=\"return isGrant('zyyy');\" href=\"~url~\" target=\"~target~\">·~text~</a></li>");
		//if(name)$("#2Tab_1").append('<div class="more" id="moremyrecommend"><a class="green2"  href="'+url+'PLS.014&'+parent.__par+'">更多>></a></div>');
		//else $("#2Tab_1").append('<div class="more" id="moremyrecommend"><a class="green2" href="'+url+'PLS.023&'+parent.__par+'">更多>></a></div>');
  	});
}
//家长首页:健康宝典数据
InterfaceObj.prototype.getJianKangBd = function () {
  	var myDate = new Date();
  	jQuery(function($){
  		_interface.getCMSData("CMS.JSON.A01003009003","",7,function(result){
	 			var moreurl=protocol+sysconfig['CMS']+interface_config['CMS.PAGE.A01003009003']+parent.__par;
	 			_interface.showNoimgArea3("jiankang",result,"亲子教育",moreurl,'22.15.04',"~url~");
	  	});
	});
}
//家长首页：获取家庭教育指导
InterfaceObj.prototype.getJiaTingJiaoYu = function () {
  	jQuery(function($){
  		_interface.getCMSData("CMS.JSON.A01003010003","",7,function(result){
	 			var moreurl=protocol+sysconfig['CMS']+interface_config['CMS.PAGE.A01003010003']+parent.__par;
	 			_interface.showNoimgArea3("jiaTingJiaoyu",result,"家教视点",moreurl,'22.15.02',"~url~");
	  	});
	});
}
//家长首页：获取教育热点关注
InterfaceObj.prototype.getJiaoYuHot = function () {
  	jQuery(function($){
  		_interface.getCMSData("CMS.JSON.A01003001","",7,function(result){
	 			var moreurl=protocol+sysconfig['CMS']+interface_config['CMS.PAGE.A01003001']+parent.__par;
	 			_interface.showNoimgArea3("jiaoyuHot",result,"教育热点",moreurl,'22.15.01',"~url~");
	  	});
	});
}


//##其他业务处理##

//到期及欠费提示(河南)
InterfaceObj.prototype.getPayTypeAlert= function (username,studentname){
	_interface.getRemoteJson("SSO","SSO.208","&username="+username+"&studentNumber="+studentname,function(result){
		var currentuser=null,showmessage=false;
		for(var i=0;i<result.buyUsersState.length;i++){
			var c=result.buyUsersState[i];
			if(usertype==4){
				if(c.username==username)currentuser=c;
			}else if(usertype==0){
				if(c.username==studentname)currentuser=c;
			}
		}
		//if(currentuser.isNeedTipBuy=="false")return;
		var payurl="";
		//如果支付类型为1-在线支付，或支付类型为3-匹配运营商类型在线支付(phoneBuyAble=true 手机订购 =false支付订购)
		if(paytype==1){
			payurl="<a href=\"javascript:tosetpaycookile('"+result.areaId+"','"+result.username+"','"+result.usertype+"','"+currentuser.areaId+"','"+currentuser.username+"','"+currentuser.usertype+"','"+currentuser.useDisableDate+"','"+currentuser.studyStageCode+"','"+currentuser.gradeCode+"');\" class=\"btn_pop2\" >马上订购</a>";
		}else if(paytype==3 && !_interface.isBlank(phoneBuyAble) && phoneBuyAble=="false"){
			payurl="<a href=\"javascript:tosetpaycookile('"+result.areaId+"','"+result.username+"','"+result.usertype+"','"+currentuser.areaId+"','"+currentuser.username+"','"+currentuser.usertype+"','"+currentuser.useDisableDate+"','"+currentuser.studyStageCode+"','"+currentuser.gradeCode+"');\" class=\"btn_pop2\" >马上订购</a>";
		}else{}
		var startcode ="<div id='tempCodeDiv'><ul style='text-align:left;margin:10px;margin-top:-10px;'><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		var acall="";
		var amessage="";
		if(usertype==4){
			acall=truename+"同学您好：";
			var tempstr1="感谢您使用优教通业务，优教通平台可以帮助您完成同步预习、网上作业、测评提升、复习巩固、课外拓展等，";
			var tempstr2=null;
			try{
				if(areamessage && areamessage["type"+usertype]){
					if(areamessage["type"+usertype].indexOf("$LastDay$")>-1){
						var temparr=areamessage["type"+usertype].split("$LastDay$");
						if(temparr.length>1){
							tempstr1=temparr[0];
							tempstr2=temparr[1];
						}
					}else{
						tempstr1=areamessage["type"+usertype];
					}
				}
			}catch(e){}
			if(currentuser.isNeedTipBuy=="true"&&currentuser.isInFreeTime=="true"){
				if(tempstr2==null){
					tempstr2="为不影响您继续使用，请进行业务订购。"
				}
				amessage=startcode+tempstr1+"您已经免费试用"+currentuser.useDays+"天，免费期还剩下 "+currentuser.freeLeftDays+" 天；"+tempstr2+"</b></ul></div><br/>"+payurl+" <a href=\"javascript:hideshowmessage();\" class=\"btn_pop2\">继续体验</a>";
				showmessage=true;
			}else if(currentuser.isNeedTipBuy=="true"&&currentuser.isInFreeTime=="false"){
				if(tempstr2==null){
					tempstr2="为不影响您继续使用，请进行业务续订。"
				}
				amessage=startcode+tempstr1+"您的使用有效期至"+currentuser.endUseDate+"日，还剩 "+currentuser.leftDays+" 天；"+tempstr2+"</b></ul></div><br/>"+payurl+" <a href=\"javascript:hideshowmessage();\" class=\"btn_pop2\">关闭</a>";
				showmessage=true;
			}
		}else if(usertype==0){
			acall=truename+"同学的家长您好：";
			var tempstr1="感谢您使用优教通业务，优教通平台可以帮助您的孩子完成同步预习、网上作业、测评提升、复习巩固、课外拓展等，帮助您了解孩子的学习情况，";
			var tempstr2=null;
			try{
				if(areamessage && areamessage["type"+usertype]){
					if(areamessage["type"+usertype].indexOf("$LastDay$")>-1){
						var temparr=areamessage["type"+usertype].split("$LastDay$");
						if(temparr.length>1){
							tempstr1=temparr[0];
							tempstr2=temparr[1];
						}
					}else{
						tempstr1=areamessage["type"+usertype];
					}
				}
			}catch(e){}
			if(currentuser.isNeedTipBuy=="true"&&currentuser.isInFreeTime=="true"){
				if(tempstr2==null){
					tempstr2="为不影响您和孩子继续使用，请进行业务订购。"
				}
				amessage=startcode+tempstr1+"您的孩子已经免费使用"+currentuser.useDays+"天，免费期还剩下 "+currentuser.freeLeftDays+" 天；"+tempstr2+"</b></ul></div><br/>"+payurl+" <a href=\"javascript:hideshowmessage();\" class=\"btn_pop2\">继续体验</a>";
				showmessage=true;
			}else if(currentuser.isNeedTipBuy=="true"&&currentuser.isInFreeTime=="false"){
				if(tempstr2==null){
					tempstr2="为方便您和孩子的继续使用，请进行业务续订。"
				}
				amessage=startcode+tempstr1+"您的孩子使用有效期至"+currentuser.endUseDate+"日，还剩 "+currentuser.leftDays+" 天；"+tempstr2+"</b></ul></div><br/>"+payurl+" <a href=\"javascript:hideshowmessage();\" class=\"btn_pop2\">关闭</a>";
				showmessage=true;
			}
			try{
				parentAppGrant(result.studentGrantApps);//设置权限
			}catch(e){}
		}
		if(showmessage){
			AlertQuery.push({run:function(){$("#alertmessage").html(acall);$("#alertshuaxin").html(amessage);$("#pop6").show();$("#mask").show();}});
		}
	})
}

//验证码处理(type0读取是否验证，1写入验证信息)
InterfaceObj.prototype.getSendCodeType= function (type) {
	if(type==0){
		doVerify=0;
	} else {
	    doVerify=1;
	}
	//doVerify写入、读取标志-- 0读取 ,1写入
	//判断当前发送验证码的类型是短信还是临时验证码，如果是临时验证码，对noCheckCountUsed+1=noCheckCount加到参数中，如果是短信，则是原值noCheckCountUsed
	var noCheckCount = noCheckCountUsed;
	if(codeType=="temp"){
		noCheckCount = noCheckCount+1;
	}
	_interface.getRemoteJson("SSO","SSO.207","lastUt=&username="+username+"&doVerify="+doVerify+"&noCheckCount="+noCheckCount+"&verifyPhone="+phoneNumber,function(result){
		if(doVerify==0&&(vsms_day==0||$(result).attr("verifyDayBeforeToday")>=vsms_day)){
			_interface.getSMSAlert();
		}else if(doVerify==1){
			if($(result).attr("verifyDayBeforeToday")!=0){
				
			}
		}else{
			_interface.getSMSAlert(1);//如果不需要弹出验证码，写授权
		}
	})
}

//短信验证及手机绑定提示
InterfaceObj.prototype.getSMSAlert= function (apptype) {
	var myDate = new Date();
	_interface.getRemoteJson("SSO","SSO.205","username="+username+"&studentNumber="+studentname,function(result){
		var checktype=0;var showmessage=false;//如果有免费期提醒，就不发验证码
		if(apptype)return;//判断如果是不需要弹出的，只写权限后返回。
		//家长、老师、学生、已绑定手机、切需要验证短信的
		if(boundphone==1&&phoneusertype.indexOf(usertype)>=0&&$(result).attr("phoneActiveState")==1&&$(result).attr("isNeedVerifyCode")==1){
			var acall2="";
			var amsg2="";
			if(true){
				var bangdingbutton="";
				noCheckCountUsed = $(result).attr("noCheckCountUsed");
				phoneNumber = $(result).attr("link");
				var diffCount = tempCodeCount-noCheckCountUsed;
				
				amsg2="验证码：<input type='text' name='vicode' id='vicode' style='height:20px;border:#666 dashed 1px;'/> <a href=\"javascript:;\" class=\"btn_pop2\" key='sms' id='geticode'><font color='#c2c2c2'>60秒重新获取</font></a> <br/><br/><a href=\"javascript:checkicode();\" class=\"btn_pop2\" >确定</a> "+bangdingbutton+" <a href=\"javascript:;\" class=\"btn_pop2\"  onclick=\"window.location.href='"+path+"/ssoLoginFail.jsp';\">关闭</a>";
				amsg2+="<div id='tempCodeDiv'><ul style='text-align:left;margin:10px;'><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1：点击</b><a href=\"javascript:getTempPhoneCode();\" class=\"btn_pop2\" id='getTempCode'><font>获取临时验证码</font></a><b>系统会自动给您分配一个验证码，您本月还剩余<font color='red'>"+diffCount+"</font>次获取机会。</b><br/><br/><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2：如遇问题请拨打客服电话：4006-371-319。</b></ul></div>";
				amsg2+="<ul style='text-align:left;margin:10px;'><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;尊敬的用户，为了保证您的帐号安全，每天首次登录本系统时需要输入手机短信验证码，并确保手机处于正常状态。</b></ul>";
				//加入提示
				AlertQuery.push({run:function(){
					$("#alertmessage").html(acall2);
					$("#alertshuaxin").html(amsg2);
					$("#pop6").show();
					$("#mask").show();
					//临时验证码使用次数 $(result).attr("noCheckCountUsed"));
					//判断reqCode是否有值，如果有值了，就不用发送验证码了
					if(null!=$(result).attr("reqCode") && ""!=$(result).attr("reqCode") && "null"!=$(result).attr("reqCode")){
					///判断___icode是否为空，如果空，追加
						if (""==___icode || null==___icode || "null"==___icode){
							___icode = $(result).attr("reqCode");
						} else {
							___icode = ___icode+","+$(result).attr("reqCode");
						}
					} else {
						getphonevicode(1,$(result).attr("link"),$(result).attr("phoneActiveState"));//发送验证码
					}
					//控制定时重发
					jsdingshi($(result).attr("link"),$(result).attr("phoneActiveState"));
				}});
			}
		}else if($(result).attr("phoneActiveState")==0&&alerttype==1){
			var acall3="";
			var amsg3="";
			acall3="绑定提醒!";
			amsg3="你没有绑定手机，建议你绑定手机，这样就可以用手机号登录了<br/><br/><br/><a href=\"javascript:;\" onclick=\"$('#iframe01').attr('src','http://"+sysconfig["TMS"]+interface_config["TMS.812"]+"');hideclass('pop6');\" class=\"btn_pop2\"  >绑定手机</a> <a href=\"javascript:;\" class=\"btn_pop2\"  onclick=\"hideclass('pop6');\">关闭</a>";
			if(usertype=="4"){
				amsg3="你的家长没有绑定手机，建议你的家长绑定手机，这样就可以用手机号登录了<br/><br/><br/><a href=\"javascript:;\" class=\"btn_pop2\"  onclick=\"hideclass('pop6');\">关闭</a>";
			}
			AlertQuery.push({run:function(){$("#alertmessage").html(acall3);$("#alertshuaxin").html(amsg3);$("#pop6").show();$("#mask").show();}});
		}
	});
}
function openTipDiv(){
	if(document.getElementById("tempCodeDiv").style.display=="none"){
		document.getElementById("tempCodeDiv").style.display="";
	}else{
		document.getElementById("tempCodeDiv").style.display="none";
	}
}
//检测其他角色身份登录 tims 间隔时间ms
InterfaceObj.prototype.checkMoreRolelogin = function(times){
	//获取当前登录令牌
	var logincookile=getcookle("ut");
	if(times){}else{times=5000}
	//定时检查令牌是否匹配
	window.setInterval(function(){
		if(getcookle("ut")!=logincookile){
			AlertQuery.push({run:function(){
				$("#alertmessage").html("功能禁用");
				$("#alertshuaxin").html("<a href=\"javascript:;\" class=\"btn_pop2\" onclick=\"window.location.reload();\">确定</a><br/><div>你已经用其他身份登录系统，点击确定切换到新身份。</div>");
				$("#pop6").show();
				$("#mask").show();
			}});
		}
	},times);
}

//用户重复登陆检测
InterfaceObj.prototype.getRepeatUserlogin= function () {
	var myDate = new Date();
	_interface.getRemoteJson("SSO","SSO.207","username="+username+"&lastUt="+getcookle("ut"),function(result){
		//alert($(result).attr("lastutEqualsUt"));
		if($(result).attr("lastutEqualsUt")!="true"){
			AlertQuery.push({run:function(){
				$("#alertmessage").html("功能禁用");
				$("#alertshuaxin").html("<div>你的帐号已经在别处登录，你被强制退出。</div>");
				$("#alertshuaxinbutton").html("<a href=\"javascript:;\" class=\"close\" onclick=\"window.location.href='"+path+"';\">确定</a>");
				$("#pop6").show();
				$("#mask").show();
			}});
			//__showmessagetype=1;
			//window.clearInterval(muinter);
		}
	});
}

//从全国负载调度获取区域信息
InterfaceObj.prototype.getUserArea= function () {
	var myDate = new Date();
	$.getJSON(protocol+sysconfig["bbt.Balance"]+interface_config["get_area"]+"&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?","utf-8",function(result){
		var msghtml='';
		$(result).each(function(){
			if($(this).attr("areaCode"))
			msghtml=msghtml+"<a href='"+$(this).attr("pc_url")+"?areaCode="+$(this).attr("areaCode")+"'>"+$(this).attr("areaName")+"</a> "
			//$("#userclass").append('<input name="input3" type="checkbox" value="'+$(this).attr("classId")+","+$(this).attr("className")+'" />'+$(this).attr("className")+'');
			//$("#userclass").append('<a href="'+url+'TMS.006&data={\'classId\':\''+$(this).attr("classId")+'\'}" target="iframe01"  class="btn_pop3" onclick="hideclass(\'pop4\');">'+$(this).attr("className")+'</a> ');
			  //$("#userclass").append('<a href="'+path+'/toclassspacepage.action?data={\'classId\':\''+$(this).attr("classId")+'\'}" target="_blank"  class="btn_pop3" onclick="hideclass(\'pop4\');">'+$(this).attr("className")+'</a> ');
		});
		$('#area').html(msghtml);
	});
}

//获取用户所在的班级
InterfaceObj.prototype.getUserClass= function (username) {
	var data="queryType=byUserName&userName="+username;
	var myDate = new Date();
	
	_interface.getRemoteJson("TMS","TMS.401",data,function(result){
		$("#userclass").html("");
		$(result.rtnArray).each(function(){
			$("#userclass").append('<a href="'+protocol+sysconfig["TMS"]+interface_config["TMS.006"]+'&data={\'classId\':\''+$(this).attr("classId")+'\'}" target="iframe01"  class="btn_pop3" onclick="hideclass(\'pop4\');">'+$(this).attr("className")+'</a> ');
		});
		if(result.rtnArray.length>9){
			$("#createclass").hide();
			$("#showmoreerr").show();
		}else if(result.rtnArray.length==0){
			$("#userclass").append("你没有加入或者创建班级!");
			$("#createclass").show();
			$("#showmoreerr").hide();
		}else{
			$("#createclass").show();
			$("#showmoreerr").hide();
		}
	});
}

//获取教师推荐，教师所在的班级
InterfaceObj.prototype.getTeacherTuijianClass= function (username) {
	$("#teacherclass").attr("checked",false);
	var data="queryType=byUserName&userName="+username;
	_interface.getRemoteJson("TMS","TMS.401",data,function(result){
		$("#teacherclass").html("");
		$(result.rtnArray).each(function(){
			$("#teacherclass").append('<li><input align="left" type="checkbox" name="resource" onclick="chkSonClick();" id="'+$(this).attr("classId")+'" value="'+$(this).attr("className")+'">&nbsp;'+$(this).attr("className")+'</li>');
		});
		if(result.rtnArray.length==0){
			$("#teacherclass").append("你没有加入或者创建班级!");
		}
	});
}

//家长获取孩子信息，展示孩子选择
InterfaceObj.prototype.getMyChildren= function (username,type) {
	var data="queryType=byParent&parentAccount="+username;
	var myDate = new Date();
	jQuery(function($){
		_interface.getRemoteJson("TMS","TMS.501",data,function(result){
			$("#mychilds").html("");
			mychidrenjson=result.rtnArray;
  			$(result.rtnArray).each(function(num){
  				//$("#userclass").append('<input name="input3" type="checkbox" value="'+$(this).attr("classId")+","+$(this).attr("className")+'" />'+$(this).attr("className")+'');
  				$("#mychilds").append('<a href="'+path+'/webindex.action?student.studentNumber='+$(this).attr("studentNumber")+'" class="btn_pop3" onclick="hidemychildren(\''+$(this).attr("realname")+'\');">'+$(this).attr("realname")+'</a> ');
  			});
		});
  	});
}
//获取用户群组
InterfaceObj.prototype.getUserGroup= function (username) {
	var data="data={\"queryType\":\"byUserName\",\"userName\":\""+username+"\"}";
	var myDate = new Date();
	jQuery(function($){
  		_interface.getRemoteJson("TMS","TMS.402","queryType=byUserName&userName="+username,function(result){
  			$(result.rtnArray).each(function(){
  				$("#usergroup").append('<input name="input3" type="checkbox" value="'+$(this).attr("gtId")+","+$(this).attr("gtName")+'" />'+$(this).attr("gtName")+'');
  			});
  		})
  	});
}
//把教师设置的课程转换成字符chuan；
InterfaceObj.prototype.getmyFavorite=function(favorite){
	var back="";
	if(favorite&&favorite.rtnArray){
		$(favorite.rtnArray).each(function(num){
			if(num<5)back+="'"+$(this).attr("studyStageCode")+","+$(this).attr("gradeCode")+","+$(this).attr("termCode")+","+$(this).attr("subjectCode")+","+$(this).attr("versionCode")+","+$(this).attr("bookOptionCode")+"',";
		});
		if(back!="")back=back.replace(/,$/,"");
	}
	return back;
}
//获取未读取站内信个数(已废弃)
InterfaceObj.prototype.getNotreadletterCount = function (username) {
	var myDate = new Date();
	if(!username)return;
  	jQuery(function($){
  		_interface.getRemoteJson("WEBMAIL","WEBMAIL.001","data={\"command\":\"getUnReadMailNum\",\"userpwd\":\"\",\"username\":\""+username+"\"}",function(result){
	  		if(result){
	  			if(result.errcode==0)$(".orangeFon").html(result.unReadMailNum);
	  		}
	  	})
  	});
}
function setFlashNum() {
	    $('a','#tabs-navi').each(function(index,a){
	    	$(this).bind('propertychange',function(){
			   if ($(this).attr('class') != 'current') {
			   	 $('span',$(this)).css('color','#fff');
			   } else {
			   	 $('span',$(this)).css('color','');
			   }
			});
	    	// 获取当前a标签加入数字
			$(this).html("<span style='position: relative;left: 12px;top: 10px;'>"+(index+1)+"</span>");
		});
		
}
//获取最新资源
InterfaceObj.prototype.newResources = function (myFavorite) {
	//老师设定的课程目录
	//var data="data={'menuCode':'','resCount':14,'rtnArray':["+_interface.getmyFavorite(myFavorite)+"],'schoolId':'"+parent.schoolId+"'}";
  	//加载最新资源
  	jQuery(function($){
  		if(_interface.getCommonPLS("#1Tab_0","PLS.100","menuCode=&resCount=14&rtnArray="+_interface.getmyFavorite(myFavorite)+"&schoolId="+parent.schoolId,14,1,"<ul class=\"news double\"><li><span>~time~</span><a href=\""+protocol+sysconfig["PLS"]+interface_config["PLS.113"]+"&username="+username+"&areaId="+userAreaId+"&rcode=~url~&type=1&bodyId=&cusip="+parent.ip+"&filetype=~tag~&schoolId="+parent.schoolId+"\" target=\"_blank\">·~text~</a></li></ul>")){
  			$("#1Tab_0").removeClass("loddingbg");
  		}else{
  			$("#1Tab_0").html("<ul class=\"news\"><li><span></span><a href=\"javascript:;\">·无最新资源...</a></li></ul>");
  			$("#1Tab_0").removeClass("loddingbg");
  		}
  		
  	});
}
//获取热点资源
InterfaceObj.prototype.hotResources = function (myFavorite) {
	//老师设定的课程目录
	//var data="data={'menuCode':'','resCount':14,'rtnArray':["+_interface.getmyFavorite(myFavorite)+"],'schoolId':'"+parent.schoolId+"'}";
  	//加载最热资源
  	jQuery(function($){
  		if(_interface.getCommonPLS("#1Tab_1","PLS.101","menuCode=&resCount=14&rtnArray="+_interface.getmyFavorite(myFavorite)+"&schoolId="+parent.schoolId,14,1,"<ul class=\"news double\"><li><span>~time~</span><a href=\""+protocol+sysconfig["PLS"]+interface_config["PLS.113"]+"&username="+username+"&areaId="+userAreaId+"&rcode=~url~&type=1&bodyId=&cusip="+parent.ip+"&filetype=~tag~&schoolId="+parent.schoolId+"\" target=\"_blank\">·~text~</a></li></ul>")){
  			$("#1Tab_1").removeClass("loddingbg");
  		}else{
  			$("#1Tab_1").html("<ul class=\"news\"><li><span></span><a href=\"javascript:;\">·无热点资源...</a></li></ul>");
	  		$("#1Tab_1").removeClass("loddingbg");
  		}
  	});
}
/*
InterfaceObj.prototype.sysRecommend = function (username) {
	//老师设定的课程目录
	//var data="data={'resCount':12,'recommend':'ZYTJNEW','rtnArray':["+_interface.getmyFavorite(myFavorite)+"],'schoolId':'"+parent.schoolId+"'}";
  	//加载系统推荐资源
  	jQuery(function($){
  		if(_interface.getCommonPLS("#2Tab_0","PLS.104","recommend=ZYTJNEW&resCount=14&rtnArray="+_interface.getmyFavorite(myFavorite)+"&schoolId="+parent.schoolId,14,1,"<ul class=\"news double\"><li><span>~time~</span><a href=\""+protocol+sysconfig["PLS"]+interface_config["PLS.113"]+"&username="+username+"&areaId="+userAreaId+"&rcode=~url~&type=1&bodyId=&cusip="+parent.ip+"&filetype=~tag~&schoolId="+parent.schoolId+"\" target=\"_blank\">·~text~</a></li></ul>")){
  			$("#1Tab_0").removeClass("loddingbg");
  		}else{
  			$("#1Tab_0").html("<ul class=\"news\"><li><span></span><a href=\"javascript:;\">·无系统推荐资源...</a></li></ul>");
  			$("#1Tab_0").removeClass("loddingbg");
  		}
  	});
}
*/

//获取教师推荐作业(未使用。。。不知道哪用)
InterfaceObj.prototype.getTeacherAssignHomework = function (username,usertype,number,myFavorite,lastCode) {
	//此处要传课程目录ID
	var menuCode = "";
	//menuCode = getMenuCode(myFavorite,null,1,true);
	menuCode = getMenuCode(myFavorite,true);
  	var myDate = new Date();
  	var data = "versionId=&lessionId="+menuCode+"&num="+number+"&teacherId="+username;
  	if(!username)return;
  	alert("work");
  	_interface.getRemoteJson("LCS","LCS.ZY.RECOMMENDLIST",data,function(result){
  			
		if(result){	
			$(result).each(function(num){
				if(!$(this).attr("name")) return true;
				if(num>6)return false;
				var title=$(this).attr("name");
  				//if(title.length>15)title=title.substring(0,15)+"...";
  				var paraData = "data={navTarget:\"publish\",lessionId:\""+$(this).attr("lessionId")+"\",versionId:\""+$(this).attr("versionId")+"\",homeworkId:\""+$(this).attr("id")+"\",channelid:\"22.04.02\",cookieid:\""+parent.cookieid+"\"}";
				if (num==0) {
					$("#assignZuoye").append("<li><a href='"+url+"LCS.ZY.TEACHER.INDEX&reqEncoding=utf-8&"+paraData+"' class='orange' title='"+title+"'>"+title+"&nbsp;<img src='space/images/newIcon.gif' width='23' height='11' /></a></li>");
				} else {
					$("#assignZuoye").append("<li><a href='"+url+"LCS.ZY.TEACHER.INDEX&reqEncoding=utf-8&"+paraData+"' title='"+title+"'>"+title+"</a></li>");
				}
		  	});
			if(result.length==0){
  				//$("#__zuoyediv").slideUp();
  				$("#assignZuoye").html("<li>暂无作业...</li>");
  			} 
		} else {
	  		//$("#__zuoyediv").slideUp();
	  		$("#assignZuoye").html("<li>暂无作业...</li>");
	  	}
	  	var moredata = parent.__par.replace(/\}+/g,",'channelid':'22.04.02'}");
	  	$("#moreAssignZuoye").attr("href",protocol+sysconfig["LCS"]+interface_config["LCS.ZY.TEACHER.INDEX"]+moredata);
	  	$("#assignZuoye").removeClass("loddingbg");
  	});
}

/*
//学习达人type==1,显示名师排行,否则显示学习达人
InterfaceObj.prototype.getLearningpeopleMessage = function (type,userType,paihangid) {
  	jQuery(function($){
  		var myDate = new Date();
		var data="data={'page':'0','pageNum':'6','type':'"+type+"','userType':'"+userType+"','listType':'1'}";
  		$.getJSON(url+"PLS.107&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",data,function(result){
  			if(result&&result.UserStatTotals){
	  			$(result.UserStatTotals.UserStatTotal).each(function(num){
	  				var teachername=$(this).attr("teacherName");
	  				if(teachername.length>3)teachername=teachername.substring(0,3)+"..";
	  				if(type==1){
	  					$("#"+(paihangid==null?"learningpeople":paihangid)).append('<dl>'+
									'<dt>'+
										'<a ref="'+url+'mcenter.home&reqEncoding=gbk&data={\'username\':\''+$(this).attr("teacherNumber")+'\'}" title="'+$(this).attr("teacherName")+'"><img src="'+$(this).attr("headPhoto")+'" width="60" height="60" /></a>'+
									'</dt>'+
									'<dd><a ref="'+url+'mcenter.home&reqEncoding=gbk&data={\'username\':\''+$(this).attr("teacherNumber")+'\'}" class="blue2 texhidden" title="'+$(this).attr("teacherName")+'">'+teachername+'</a></dd>'+
								'</dl>');
	  				}else{
	  					$("#learningpeople").append('<dl><dt><a title="'+$(this).attr("teacherName")+'"><img src="'+$(this).attr("headPhoto")+'" width="60" height="60" /></a></dt><dd><a ref="#" class="blue texhidden">'+teachername+'</a></dd></dl>');
	  				}
	  				if(num>6)return false;
	  			});
	  			if(type!=1&&result.length==0){
	  				$("#learningpeople").html("<li><span><a href=\"javascript:;\">·暂无达人...</a></span></li>");
	  			}
	  			if(type!=1)$("#learningpeople_lodding").removeClass("loddingbg");
	  		}
  		});
  	});
}
*/
//家长学堂
InterfaceObj.prototype.getJiazhangxuetang = function () {
	var myDate = new Date();
  	jQuery(function($){
  		$.getJSON(url+"CMS.JSON.A01003&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",function(result){
  			if(result){
	  			var numcount=0;
	  			$(result.infosList).each(function(num){
	  				if($(this).attr("contenttype")=="HTML"&&numcount<=8){
	  						//var h='<dl><dt><a href="'+cmsurl+$(this).attr("filepath")+'" title="'+$(this).attr("topic")+'"><img src="'+cmsurl+$(this).attr("abbrevpic")+'" width="131" height="36" /></a></dt></dl>'
	  						//$("#mingSchool").append(h);
	  					$("#parentclass").append('<li><span>'+$(this).attr("pubtime")+'</span><a href="'+cmsurl+$(this).attr("filepath")+'">·'+$(this).attr("topic")+'</a></li>');
	  					numcount++;
	  				}
	  			})
	  			if(result.infosList.length==0){
	  				$("#parentclass").html("<li><span><a href=\"javascript:;\">·暂无家长学堂...</a></span></li>");
	  				$("#parentclass").removeClass("loddingbg");
	  			}else{
	  				$("#moreparentclass").html('<a class="green2" href="'+url+'PLS.032&'+parent.__par+'">更多>></a>');
	  				$("#parentclass").removeClass("loddingbg");
	  			}
	  		}
  		})
  	});
}
//名师讲堂
InterfaceObj.prototype.getMingshecus = function (type,lmid) {
  	var myDate = new Date();
	var data="data={'resCount':'8','menuCode':'"+lmid+"','schoolId':'"+parent.schoolId+"','schoolStage':'"+parent.schoolStage+"'}";
  	//this.showlog(data);
  	var icode=(type==1?"PLS.100":"PLS.101");
  	jQuery(function($){
  		$.getJSON(protocol+protocol+sysconfig["PLS"]+interface_config[icode],data,function(result){
	  		if(result&&result.ResInfo){
	  			$(result.ResInfo).each(function(num){
	  				var desc=$(this).attr("RDesc");
	  				if(desc.length>10)desc=$(this).attr("RDesc").substring(0,10)+"..";
	  				var play="";
	  				if(type==3){
	  					play=protocol+sysconfig["PLS"]+interface_config["PLS.113"]+"&data={'username':'"+parent.username+"','areaId':'"+userAreaId+"','rcode':'"+$(this).attr("RCode")+"','type':'1','bodyId':'','cusip':'"+parent.ip+"','filetype':'"+$(this).attr("RFormat")+"','schoolId':'"+parent.schoolId+"'}";
	  				}else{
	  					play=protocol+sysconfig["PLS"]+interface_config["PLS.MINGSHI.RES.PLAY"]+'&data={\'rcode\':\''+$(this).attr("RCode")+'\',\'schoolStage\':\''+parent.schoolStage+'\',\'schoolId\':\''+parent.schoolId+'\'}';
	  				}
	  				var dtcontent='<dl>'+
                                '<dt><a href="'+play+'" target="_blank"><img src="'+$(this).attr("imagePic")+'" width="101" height="81" /></a></dt>'+
                                '<dd class="yahie"><a href="'+play+'" target="_blank">'+$(this).attr("RTitle")+'</a></dd>'+
                                '<dd><font class="grayfon texhidden">名师：</font>'+$(this).attr("jiangShiName")+'</dd>'+
                            '</dl>';
	  				if(type==1){
	  					$("#newcus").append(dtcontent);
	  				}else if(type==2) {
	  					$("#hotcus").append(dtcontent);
	  				}else if(type==3) {
	  					$("#parentclass").append('<li><span>'+$(this).attr("RCreatedate")+'</span><a target="_blank" href="'+play+'">·'+$(this).attr("RTitle")+'</a></li>');
	  				}
	  			});
	  			if(result.ResInfo.length==0){
	  				if(type==1){
	  					$("#newcus").html("<li><span><a href=\"javascript:;\">·暂无最新课程...</a></span></li>");
	  				}else if(type==2) {
	  					$("#hotcus").html("<li><span><a href=\"javascript:;\">·暂无热门课程...</a></span></li>");
	  				}else if(type==3) {
	  					$("#parentclass").html("<li><span><a href=\"javascript:;\">·暂无家长学堂资源...</a></span></li>");
	  				}
	  			}else{
	  				if(type==1){
	  					$("#morenewcus").html('<a class="green2" href="'+protocol+sysconfig["PLS"]+interface_config["PLS.019"]+'&'+parent.__par+'">更多>></a>');
	  				}else if(type==2) {
	  					$("#morehotcus").html('<a class="green2" href="'+protocol+sysconfig["PLS"]+interface_config["PLS.019"]+'&'+parent.__par+'">更多>></a>');
	  				}else if(type==3) {
	  					$("#moreparentclass").html('<a class="green2" href="'+protocol+sysconfig["PLS"]+interface_config["PLS.032"]+'&'+parent.__par+'">更多>></a>');
	  				}
	  			}
	  			if(type==1){
  					$("#newcus").removeClass("loddingbg");
  					$("#newcus").removeClass("h450");
  				}else if(type==2) {
  					$("#hotcus").removeClass("loddingbg");
  					$("#hotcus").removeClass("h450");
  				}else if(type==3) {
  					$("#parentclass").removeClass("loddingbg");
  					$("#parentclass").removeClass("h250");
  				}
	  			
	  		}
	  	})
  	});
}

//获取基础资源 家长、学生 同步导学 同步辅学
InterfaceObj.prototype.getStudentBaseResource = function (username,usertype,myFavorite,lastCode,classid,number) {
    //menuCode先从myFavorite中取数据，目录编号（支持多个编号,分隔），如果没有，就从接口中获取
	$("#baseRes").html("");
	if(!username)return;
	var channelid = "";
	if(usertype==0){
		channelid = "22.25";
	} else if(usertype==4){
		channelid = "22.17";
	} else {
		channelid = "22.01";
	}
	var schoolS = parent.schoolStage.split(",");
	var moredata="&schoolStage="+schoolS[0]+"&username="+username+"&classId="+classid+"&studentId="+username+"&schoolId="+parent.schoolId+"&channelid="+channelid+"&cookieid="+parent.cookieid;
	//更多链接
	if (usertype==0 || usertype==4) {
		//学生、家长
		$("#moreBaseRes").attr("href",protocol+sysconfig["PLS"]+interface_config["PLS.114"]+moredata);
	} else {//教师
		$("#moreBaseRes").attr("href",protocol+sysconfig["PLS"]+interface_config["PLS.015"]+moredata);
	}
	$("#baseRes").removeClass("loddingbg");
	//var menuCode = getSelectedMenuCode(myFavorite,lastCode,1);
	var menuCode = getSelectedMenuCode(myFavorite);
	if(""==menuCode || null==menuCode || "null"==menuCode){
		var obj="";
		if (usertype==4) {
		   obj="<div class='msg_9'><img src='space/images/tip_icon.gif' width='16' height='16' />&nbsp;您还没有设置该学科版本进度，请点击'<a onclick='_interface.setJindu();return false;'  href='#' class='hongfon' >课程设置</a>'</font>设置版本进度。</div>";
		}else if(usertype==0){	
		   obj="<div class='msg_9'><img src='space/images/tip_icon.gif' width='16' height='16' />&nbsp;您的孩子还没有设置该学科版本进度。</div>";
		}
		$("#baseRes").html(obj);
	} else {
	  	//设定的课程目录
		var data="menuCode="+menuCode+"&resCount="+number+"&schoolId="+parent.schoolId;
		//加载最新资源
  		_interface.getCharsetRemoteJson("PLS","PLS.100",data,"gbk",function(result){
			if(result){	
				$(result.ResInfo).each(function(num){
					if(num>6)return false;
					var title=$(this).attr("RTitle");
	  				//if(title.length>15)title=title.substring(0,15)+"...";
					var parmDate = "&username="+username+"&areaId="+userAreaId+"&rcode="+$(this).attr("RCode")+"&type=1&bodyId=&cusip="+parent.ip+"&filetype=undefined&schoolId="+parent.schoolId+"&channelid="+channelid+"&cookieid="+parent.cookieid;
					if (num==0){
						$("#baseRes").append("<li><a onclick=\"return isGrant('zyyy');\" href=\""+protocol+sysconfig["PLS"]+interface_config["PLS.113"]+parmDate+"\" target='_blank' class='orange' title='"+title+"'>"+title+"&nbsp;<img src='space/images/newIcon.gif' width='23' height='11' /></a></li>");
					} else {
						$("#baseRes").append("<li><a onclick=\"return isGrant('zyyy');\" href=\""+protocol+sysconfig["PLS"]+interface_config["PLS.113"]+parmDate+"\" target='_blank' title='"+title+"'>"+title+"</a></li>");
					}
			  	});
				if(result.ResInfo.length==0){
	  				$("#baseRes").html("<li>暂无资源...</li>");
	  			} 
			} else {
		  		$("#baseRes").html("<li>暂无资源...</li>");
		  	}
	  	});
	}
}

//2013-1-29之后的逻辑：获取设置的课程进度
function getMenuCode(myFavorite,yinhaoFlag) {
	var menuCode = '';
	$(myFavorite.rtnArray).each(function(num){
		 	//从设置的课程进度中取目录编号
	       if (null !=$(this).attr("ksId") &&  ''!=$(this).attr("ksId") && 'null'!=$(this).attr("ksId")) {
					if (yinhaoFlag) {
						menuCode = menuCode + "'" +$(this).attr("ksId")+ "',";
					} else {
						menuCode = menuCode + $(this).attr("ksId")+",";
					}
			}
	});
	menuCode = menuCode.replace(/,$/,"");
	return menuCode;
}

//保存教师推荐到班级的资源
InterfaceObj.prototype.saveTuiJianRes= function (username,truename,tuijianResId,tuijianResTitle,tuijianResFormat,tuijianRtypeCode,groups,classnames) {
	var resGroup = tuijianResId+","+tuijianResTitle+","+tuijianRtypeCode+","+tuijianResFormat;
	var data="groupName="+classnames+"&resGroup="+resGroup+"&groups="+groups+"&userCode="+username+"&userName="+truename+"&recommentType=1&schoolCode="+parent.schoolId;
	var myDate = new Date();
	jQuery(function($){
  		$.getJSON(protocol+sysconfig["PLS"]+interface_config["PLS.184"]+"&time="+myDate.getSeconds()+"&jsoncallback=?",data,function(result){	
  			if(result){
				if(result.Success){
					alert(result.Success.msg);
					$("#cancelBut").click();
				}
  			}
		});
	});
}


//获取教师首页：区分福建、河南显示我的本地资源（河南：教师文件夹；福建：本地资源库）
InterfaceObj.prototype.getTeacherLocal = function (username,myFavorite,areaCode) {
	if(areaCode=='2.'){//福建
		$("#local_res").show();
		$("#local_teacherfile").hide();
		_interface.getTeacherLocalFuJian(username,myFavorite);
	}else{//河南
		$("#local_res").hide();
		$("#local_teacherfile").show();
		_interface.getTeacherFileFolder(username,myFavorite);
	}
}

//获取教师首页：我的本地资源（校本资源）福建
InterfaceObj.prototype.getTeacherLocalFuJianAAAA = function (username,classid,myFavorite,lastCode) {
	//menuCode先从myFavorite中取数据，目录编号（支持多个编号,分隔），如果没有，就从接口中获取
	//var menuCode = getMenuCode(myFavorite,lastCode);
	var localCode = '000112';
	var myDate = new Date();
  	//设定的课程目录
	var data="data={\"menuCode\":\""+localCode+"\",\"resCount\":\"4\",\"schoolId\":\""+parent.schoolId+"\",\"areaId\":\""+userAreaId+"\"}";
  	//加载最新资源
  	jQuery(function($){
  		$.getJSON(url+"PLS.100&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",data,function(result){
			if(result){
					$(result.ResInfo).each(function(num){
						if(num>4)return false;
						var title=$(this).attr("RTitle");
	  					//if(title.length>15)title=title.substring(0,15)+"...";     
						var parmDate = "data={\"username\":\""+username+"\",\"areaId\":\""+userAreaId+"\",\"rcode\":\""+$(this).attr("RCode")+"\",\"type\":\"1\",\"bodyId\":\"\",\"cusip\":\""+parent.ip+"\",\"filetype\":\"undefined\",\"schoolId\":\""+parent.schoolId+"\",\"channelid\":\"22.05.12\",\"cookieid\":\""+parent.cookieid+"\"}";
						if (num==0) {
							$("#localRes").append("<li><a href="+url+"PLS.113&time="+myDate.getSeconds()+"&reqEncoding=gbk&jsoncallback=?&"+parmDate+" target='_blank' class='orange' title='"+title+"'>"+title+"&nbsp;<img src='space/images/newIcon.gif' width='23' height='11' /></a></li>");
						} else {
							$("#localRes").append("<li><a href="+url+"PLS.113&time="+myDate.getSeconds()+"&reqEncoding=gbk&jsoncallback=?&"+parmDate+" target='_blank' title='"+title+"'>"+title+"</a></li>");
						}
				  	});
			  		if(result.ResInfo.length==0){
			  			$("#localRes").html("<li>您还没有本地化资源信息。</li>");
		  			}else{
		  				var moredata = parent.__par.replace(/\}+/g,",'channelid':'22.05.12'}");
		  				$("#moreLocalRes").attr("href",url+"PLS.008&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?&"+moredata);
		  			}
	  		} else {
	  			$("#localRes").html("<li>您还没有本地化资源信息。</li>");
	  		}
	  		var moredata = parent.__par.replace(/\}+/g,",'channelid':'22.05.12'}");
		  	$("#moreLocalRes").attr("href",url+"PLS.008&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?&"+moredata);
	  		$("#localRes").removeClass("loddingbg");
	  	});
	  });
}


//获取教师首页：我的本地资源（校本资源）福建
InterfaceObj.prototype.getTeacherLocalFuJian = function (username,classid,myFavorite,lastCode) {
	var myDate = new Date();
	//获取校级本地资源
	var data="&listType=1&page=1&pageNum=4&schoolCode="+parent.schoolId;
  	//加载最新资源
  	jQuery(function($){
  		_interface.getCharsetRemoteJson("PLS","PLS.173",data,"gbk",function(result){
			if(result){
					if(result.ResInfo.length==0){
						//递归获取区、市、省级本地资源
			  			getLocalFuJian(username,userAreaId);
		  			} else {
						$(result.ResInfo).each(function(num){
							if(num>4)return false;
							var title=$(this).attr("RTitle");
							var parmDate = "&username="+username+"&areaId="+userAreaId+"&rcode="+$(this).attr("RCode")+"&type=1&bodyId=&cusip="+parent.ip+"&filetype=undefined&schoolId="+parent.schoolId+"&cookieid="+parent.cookieid+"&channelid=22.31";
							if (num==0) {
								$("#localRes").append("<li><a href=http://"+sysconfig["PLS"]+interface_config["PLS.113"]+"&time="+myDate.getSeconds()+"&reqEncoding=gbk&jsoncallback=?&"+parmDate+" target='_blank' class='orange' title='"+title+"'>"+title+"&nbsp;<img src='space/images/newIcon.gif' width='23' height='11' /></a></li>");
							} else {
								$("#localRes").append("<li><a href=http://"+sysconfig["PLS"]+interface_config["PLS.113"]+"&time="+myDate.getSeconds()+"&reqEncoding=gbk&jsoncallback=?&"+parmDate+" target='_blank' title='"+title+"'>"+title+"</a></li>");
							}
					  	});
		  			}
	  		}else{
	  			//递归获取区、市、省级本地资源
			  	getLocalFuJian(username,userAreaId);
	  		}
	  		$("#localRes").removeClass("loddingbg");
	  	});
	  });
}


//递归获取区、市、省级本地资源（福建）
function getLocalFuJian (username,areaTempId) {
	var myDate = new Date();
	//获取校级本地资源
	var data="&listType=1&page=1&pageNum=4&areaId="+areaTempId;
  	//加载最新资源
  	jQuery(function($){
  		_interface.getRemoteJson("PLS","PLS.173",data,function(result){
			if(result){
			  		if(result.ResInfo.length==0){
			  			var indexTemp = areaTempId.lastIndexOf(".");
			  			if(indexTemp==-1){
			  				$("#localRes").html("<li>您还没有本地化资源信息。</li>");	
			  			} else {
				  			areaTempId = areaTempId.substring(0,indexTemp);
				  			getLocalFuJian(username,areaTempId);
			  			} 
		  			}else{
			  			$(result.ResInfo).each(function(num){
							if(num>4)return false;
							var title=$(this).attr("RTitle");
							var parmDate = "&username="+username+"&areaId="+userAreaId+"&rcode="+$(this).attr("RCode")+"&type=1&bodyId=&cusip="+parent.ip+"&filetype=undefined&schoolId="+parent.schoolId+"&cookieid="+parent.cookieid+"&channelid=22.31";
							if (num==0) {
								$("#localRes").append("<li><a href=http://"+sysconfig["PLS"]+interface_config["PLS.113"]+"&time="+myDate.getSeconds()+"&reqEncoding=gbk&jsoncallback=?&"+parmDate+" target='_blank' class='orange' title='"+title+"'>"+title+"&nbsp;<img src='space/images/newIcon.gif' width='23' height='11' /></a></li>");
							} else {
								$("#localRes").append("<li><a href=http://"+sysconfig["PLS"]+interface_config["PLS.113"]+"&time="+myDate.getSeconds()+"&reqEncoding=gbk&jsoncallback=?&"+parmDate+" target='_blank' title='"+title+"'>"+title+"</a></li>");
							}
					  	});
		  			}
	  		} else {
	  			var indexTemp = areaTempId.lastIndexOf(".");
	  			if(indexTemp==-1){
	  				$("#localRes").html("<li>您还没有本地化资源信息。</li>");	
	  			} else {
		  			areaTempId = areaTempId.substring(0,indexTemp);
		  			getLocalFuJian(username,areaTempId);
	  			}
	  		}
	  		$("#localRes").removeClass("loddingbg");
	  	});
	  });
}

function getTeacherBaseResourceByMenuCode(username,usertype,lastCode,classid){
	var menuCode = '';
	if(lastCode && null!=lastCode){
		 $(lastCode.TeacherInfo).each(function(num){
			 	if (null !=$(this).attr("menuType") &&  ''!=$(this).attr("menuType") && 'null'!=$(this).attr("menuType")) {
			 		if($(this).attr("menuType")==4){//4是教师发展
						menuCode = $(this).attr("ksCode");
						return false;//终止循环
			 		}
			 	}
		 });
	 }
	if (''==menuCode || null==menuCode || 'null'==menuCode){
  		//给一个默认的教师发展的编号
  		menuCode = '000138';
  	}
	var myDate = new Date();
  	//设定的课程目录
	var data="data={\"menuCode\":\""+menuCode+"\",\"resCount\":\"4\",\"schoolId\":\""+parent.schoolId+"\"}";
  	//加载最新资源
  	jQuery(function($){
  		_interface.getRemoteJson("PLS","PLS.100",data,function(result){
		if(result){	
			$(result.ResInfo).each(function(num){
				if(num>4)return false;
				var title=$(this).attr("RTitle");
	  			//if(title.length>15)title=title.substring(0,15)+"...";   
				var parmDate = "data={\"username\":\""+username+"\",\"areaId\":\""+userAreaId+"\",\"rcode\":\""+$(this).attr("RCode")+"\",\"type\":\"1\",\"bodyId\":\"\",\"cusip\":\""+parent.ip+"\",\"filetype\":\"undefined\",\"schoolId\":\""+parent.schoolId+"\",\"channelid\":\"22.05\",\"cookieid\":\""+parent.cookieid+"\"}";
				if (num==0) {
					$("#localRes").append("<li><a href="+url+"PLS.113&time="+myDate.getSeconds()+"&reqEncoding=gbk&jsoncallback=?&"+parmDate+" target='_blank' class='orange' title='"+title+"'>"+title+"&nbsp;<img src='space/images/newIcon.gif' width='23' height='11' /></a></li>");
				} else {
					$("#localRes").append("<li><a href="+url+"PLS.113&time="+myDate.getSeconds()+"&reqEncoding=gbk&jsoncallback=?&"+parmDate+" target='_blank' title='"+title+"'>"+title+"</a></li>");
				}
		  	});
			if(result.ResInfo.length==0){
  				$("#localRes").html("<li>暂无资源...</li>");
  			}
		} else {
	  		$("#localRes").html("<li>暂无资源...</li>");
	  	}
	  	var moredata = parent.__par.replace(/\}+/g,",'channelid':'22.05'}");
		$("#moreLocalRes").attr("href",url+"PLS.020&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?&"+moredata);
		$("#localRes").removeClass("loddingbg");
  	});
  });
}

//显示当前课程进度
function setCourseJindu(myFavorite,usertype,lastCode) {
	var startHtml = "";
	$(myFavorite.rtnArray).each(function(num){
				if (null !=$(this).attr("ksId") &&  ''!=$(this).attr("ksId") && 'null'!=$(this).attr("ksId")) {
					var grade = "";
					if (null !=$(this).attr("grade") &&  ''!=$(this).attr("grade") && 'null'!=$(this).attr("grade")) {
						grade = $(this).attr("grade")+"&nbsp;<img src='space/images/arr_01.gif' width='8' height='9' />&nbsp;"
					}
					var term = "";
					if (null !=$(this).attr("term") &&  ''!=$(this).attr("term") && 'null'!=$(this).attr("term")) {
						term = $(this).attr("term")+"&nbsp;<img src='space/images/arr_01.gif' width='8' height='9' />&nbsp;"
					}
					var html = "<li>"+$(this).attr("studyStage")+"&nbsp;<img src='space/images/arr_01.gif' width='8' height='9' />&nbsp;"+grade+term+$(this).attr("subject")+"&nbsp;<img src='space/images/arr_01.gif' width='8' height='9' />&nbsp;"+$(this).attr("version")+"&nbsp;<img src='space/images/arr_01.gif' width='8' height='9' />&nbsp;"+$(this).attr("ksName")+"</li>";
					startHtml = startHtml + html;
				}
	});
	if (usertype!=0) {
		$("#rollBox").html(startHtml);
	}
}

//设置进度
InterfaceObj.prototype.setJindu=function(){
	window.location.href = protocol+sysconfig["TMS"]+interface_config["TMS.603"]+"&time="+new Date().getSeconds();	
}

//2013-1-29之后的逻辑：设置哪个科目被选中了
function setKeMuSelected() {
	var yuwenFlag = false;
	var shuxueFlag = false;
	var yingyuFlag = false;
	$(myFavorite.rtnArray).each(function(num){
		//先判断myFavorite中的ksId是否为空
		if (null !=$(this).attr("ksId") &&  ''!=$(this).attr("ksId") && 'null'!=$(this).attr("ksId")) {
			if(null !=$(this).attr("subjectCode") &&  ''!=$(this).attr("subjectCode") && 'null'!=$(this).attr("subjectCode")){
				if("0001"==$(this).attr("subjectCode")){
					yuwenFlag = true;
					//return false;//终止循环
				} else if("0002"==$(this).attr("subjectCode")){
					shuxueFlag = true;
					//return false;//终止循环
				} else if("0003"==$(this).attr("subjectCode")){
					yingyuFlag = true;
					//return false;//终止循环
				}
			}
		}
	});
	//①若三个学科都有设置默认显示语文；
	//②若其中有学科未设置则按照语文——数学——英语的顺序哪个学科有设置就默认显示哪个学科，没设置进度的学科内容框中显示提示文字“您还没有设置该学科版本进度，请通过点击页面右上方“课程设置”设置版本进度。”；
	//③若语数外三个学科都未设置进度，则默认选中语文学科，显示提示文字“您还没有设置该学科版本进度，请通过点击页面右上方“课程设置”设置版本进度。”。
	if(!yuwenFlag && !shuxueFlag && !yingyuFlag){
		$("#shuxue").removeClass("cur2");
		$("#yingyu").removeClass("cur2");
		return;
	} else if (yuwenFlag) {
		$("#shuxue").removeClass("cur2");
		$("#yingyu").removeClass("cur2");
		return;
	} else if(shuxueFlag){
		$("#yuwen").removeClass("cur2");
		$("#yingyu").removeClass("cur2");
		return;
	} else if(yingyuFlag){
		$("#yuwen").removeClass("cur2");
		$("#shuxue").removeClass("cur2");
		return;
	}
}


//检查是否设置了课程进度，并弹出设置课程进度的提示
function popKeChengJinDu(myFavorite,usertype,lastCode) {
	var ksIdFlag = false;//是否设置了课程
	var todayFlag = false;//是否过期
	/*
	$(myFavorite.rtnArray).each(function(num){
		//先判断myFavorite中的ksId是否为空
		if (null !=$(this).attr("ksId") &&  ''!=$(this).attr("ksId") && 'null'!=$(this).attr("ksId")) {
		   ksIdFlag = true;
		}
	});
	try{
		if(myFavorite.seted&&myFavorite.seted==2)
			return 2;
		if(!ksIdFlag){//如果没有设置课程进度,则弹出
			return 1;
		}
	}catch(e){}
	return 0;
	*/
	if(myFavorite.seted&&myFavorite.seted=="2"){
			return "2";
	}else if(myFavorite.seted && myFavorite.seted=="1"){
		//设置过
		return false;
	}else{
		return "1";
	}
}


//教师首页全局搜索
function researchKeyResource(searchTextValue){
   	  var researchKey=null;
      if(searchTextValue && searchTextValue!=null && searchTextValue!=""){
        researchKey=searchTextValue;
      } else{
      	//去掉两端空格
        researchKey=$("#researchKey").val().replace(/(^\s*)|(\s*$)/g, ""); 
      }
     if(researchKey==null || researchKey=="" || researchKey=="请输入关键词") {
      	alert("请输入搜索内容！");
      	return false;
     } else {
      researchKey = encodeURIComponent(encodeURIComponent(researchKey)).replace(/'/g,"\\'").replace(/\"/,"\"");
      var paramData = parent.__par+"&title="+researchKey;
      window.location.href = protocol+sysconfig["PLS"]+interface_config["PLS.183"]+paramData;
     }
}


//2013-1-29之后的逻辑：获取当前所选科目的进度编号
function getSelectedMenuCode(myFavorite) {
	var subjectId = getSelectedSubject();
	var menuCode = '';
//	var nowDate =  new Date();   
 	$(myFavorite.rtnArray).each(function(num){
		if (null !=$(this).attr("subjectCode") &&  ''!=$(this).attr("subjectCode") && 'null'!=$(this).attr("subjectCode")) {
			if (subjectId==$(this).attr("subjectCode")) {
				//从设置的课程进度中取目录编号
		       if (null !=$(this).attr("ksId") &&  ''!=$(this).attr("ksId") && 'null'!=$(this).attr("ksId")) {
					menuCode = menuCode + $(this).attr("ksId")+",";
			   }
			}
		}
	});
	menuCode = menuCode.replace(/,$/,"");
	return menuCode;
}

//获取当前所选科目的进度编号
function getSelectedSubject() {
	var subjectId = "0001";
	if ($("#yuwen").attr("class")=="kcBtn cur2"){
		subjectId = "0001";
	} else if($("#shuxue").attr("class")=="kcBtn cur2"){
		subjectId = "0002";
	} else if($("#yingyu").attr("class")=="kcBtn cur2"){
		subjectId = "0003";
	}
	return subjectId;
}

//家长首页：点击切换科目
function changeParentKeMuState(subjectId){
	if(subjectId=="0001"){
		$("#yuwen").attr("class","kcBtn cur2");
		$("#shuxue").removeClass("cur2");
		$("#yingyu").removeClass("cur2");
	} else if(subjectId=="0002"){
		$("#shuxue").attr("class","kcBtn cur2");
		$("#yuwen").removeClass("cur2");
		$("#yingyu").removeClass("cur2");
	} else if(subjectId=="0003"){
		$("#yingyu").attr("class","kcBtn cur2");
		$("#shuxue").removeClass("cur2");
		$("#yuwen").removeClass("cur2");
	}
	//获取基础资源
	_interface.getStudentBaseResource(parent.chidrenid,0,myFavorite,lastCode,parent.classid,7);
}

//学生首页：点击切换科目
function changeKeMuState(subjectId,student){
	if(subjectId=="0001"){
		$("#yuwen").attr("class","kcBtn cur2");
		$("#shuxue").removeClass("cur2");
		$("#yingyu").removeClass("cur2");
	} else if(subjectId=="0002"){
		$("#shuxue").attr("class","kcBtn cur2");
		$("#yuwen").removeClass("cur2");
		$("#yingyu").removeClass("cur2");
	} else if(subjectId=="0003"){
		$("#yingyu").attr("class","kcBtn cur2");
		$("#shuxue").removeClass("cur2");
		$("#yuwen").removeClass("cur2");
	}
	if(student){
		 _interface.getStudentTiWen(username,usertype,myFavorite,lastCode);
	}
	//获取基础资源
	_interface.getStudentBaseResource(username,usertype,myFavorite,lastCode,classid,7);
}


function replaceregpar(url,par,value){
	var re = new RegExp("['\"]"+par+"['\"]:['\"]([^'\"]+)['\"]");
	url = url.replace(re,function(m){
		//m=m.replace(RegExp.$1,value);
		if(m.indexOf("\"")>=0){
			m=m.replace(m,"\""+par+"\":\""+value+"\"");
		}else{
			m=m.replace(m,"'"+par+"':'"+value+"'");
		}
		return m;
	});
	return url;
}   




function Roller(){
    var rollBox = document.getElementById("rollBox");
	var iDelay = 2000||3000;//每次停顿事件。
	var iSpeed=50||50;//滚动速度。
	var iheight = 20||20;//容器高度
	var timer = null, pause = false;
	var start = function(){
		timer = setInterval(rollUp,iSpeed);
	}
	
	var rollUp = function(){
		if(pause){ return;}
		    rollBox.scrollTop += 2;
			if(rollBox.scrollTop % iheight == 0){
				clearInterval(timer);
				if(typeof(rollBox.getElementsByTagName('li'))!="undefined" && rollBox.getElementsByTagName('li').length>0){
					rollBox.appendChild(rollBox.getElementsByTagName('li')[0]);
				}
				rollBox.scrollTop=0;
				setTimeout(start,iDelay);
			}
	}
  
    rollBox.onmouseover = function(){pause = true;}
	rollBox.onmouseout = function(){pause = false;}
    setTimeout(start,iDelay);
}


//精彩应用展示_interface.getJingcai();logparent 
InterfaceObj.prototype.getJingcai= function (cmsurl,usertype) {
	var myDate = new Date();
	jQuery(function($){
  		$.getJSON(url+"CMS.JINGCAI&time="+myDate.getSeconds()+"&reqEncoding=utf-8&jsoncallback=?",function(result){
  			$(result.infosList).each(function(num){
 					if($(this).attr("iscommend")!="0"){
  						var des=$(this).attr("description");
	  					if(des=="null")des="";
	  					if(des.length>22)des=des.substring(0,22);
	  					var url="";
	  					if($(this).attr("fromchannelcode")=="A01012002"){//教师
							if(usertype==2||usertype==3){
		  						if($(this).attr("tag")!="null"&&getcookle("autologin")!=''){
		  							url="href=\"javascript:autologin('"+$(this).attr("tag")+"')\"";
		  						}else{
		  							url="href=\""+cmsurl+$(this).attr("filepath")+"\" target=\"_blank\"";
		  						}
		  					}else{
		  						url="href=\""+cmsurl+$(this).attr("filepath")+"\" target=\"_blank\"";
		  					}
						}else if($(this).attr("fromchannelcode")=="A01012001"){//学生
							if(usertype==4){
		  						if($(this).attr("tag")!="null"&&getcookle("autologin")!=''){
		  							url="href=\"javascript:autologin('"+$(this).attr("tag")+"')\"";
		  						}else{
		  							url="href=\""+cmsurl+$(this).attr("filepath")+"\" target=\"_blank\"";
		  						}
		  					}else{
		  						url="href=\""+cmsurl+$(this).attr("filepath")+"\" target=\"_blank\"";
		  					}
						}else if($(this).attr("fromchannelcode")=="A01012003"){//家长
							if(usertype==0){
		  						if($(this).attr("tag")!="null"&&getcookle("autologin")!=''){
		  							url="href=\"javascript:autologin('"+$(this).attr("tag")+"')\"";
		  						}else{
		  							url="href=\""+cmsurl+$(this).attr("filepath")+"\" target=\"_blank\"";
		  						}
		  					}else{
		  						url="href=\""+cmsurl+$(this).attr("filepath")+"\" target=\"_blank\"";
		  					}
						}	
	  					var h='<dl>'+
								'<dt>'+
									'<a '+url+' title="'+$(this).attr("topic")+'"><img src="'+cmsurl+"/"+$(this).attr("abbrevpic")+'" width="60" height="60" /></a>'+
								'</dt>'+
								'<dd class="bt1 texhidden">'+
									'<a '+url+' title="'+$(this).attr("topic")+'">'+$(this).attr("topic")+'</a>'+
								'</dd>'+
								'<dd class="intro">'+
									des+
								'</dd>'+
							'</dl>';
						if($(this).attr("fromchannelcode")=="A01012002"){//教师
							$("#tea_appShow").append(h);
						}else if($(this).attr("fromchannelcode")=="A01012001"){//学生
							$("#stu_appShow").append(h);
						}else if($(this).attr("fromchannelcode")=="A01012003"){//家长
							$("#pare_appShow").append(h);
						}				
						
  					}
	  		});
	  		$(".appShow").removeClass("h380");
	  		$(".appShow").removeClass("loddingbg");
  		})
  	});
}

/*全部处理太复杂，现弄个简单的方式
//obj 为对象句柄 可由提示队列处理展示，控制队列顺序展示
//title,text,btn
AlertArray.prototype.show=function(){
	var sobj=this.tarr[ai];
	var htmlCodeArr=new Array();
	htmlCodeArr.push('<h2><span><a href="javascript:void(0);" title="关闭" onclick="closeAlertDiv();"></a></span>'+sobj.title+'：</h2>');
	htmlCodeArr.push('<ul><div class="popCon"><strong>尊敬的用户</strong>：<br />您好！<span id="freeLeftDaymessage"></span><br />');
    htmlCodeArr.push(sobj.text);
    htmlCodeArr.push('<br /></div><div class="juz">');
	if(sobj.btn){
		for(var i=0;i<sobj.btn.length;i++){
			var bt=btn[i];
			htmlCodeArr.push("&nbsp;<a href=\"javascript:void(0);\" class=\"close\" onclick=\"AlertQueue.colse("+i+");\">"+bt.text+"</a>&nbsp;");
		}
	}
    htmlCodeArr.push('</div>');
    htmlCodeArr.push('</ul><div class="bomAng"></div>');
	$("#pop_array").html(htmlCodeArr.join(""));
	htmlCodeArr=null;
	$("#pop_array").show();
}
AlertArray.prototype.close=function(index){
	$("#pop_array").hide();
	sobj.btn[index].click();
	if(this.isend()){
		this.clear();
	}
	this.shownext();
}
AlertArray.prototype.isend=function(){
	if(this.aindex>=this.tarr.length){
		return true;
	}
	return false;
}
AlertArray.prototype.clear=function(){
	this.aindex=0;
	for(var i=0;i<this.tarr.length;i++){
		this.tarr[i]=null;
	}
	this.tarr.length=0;
	this.tarr=new Array();
}
*/
//AlertArray.prototype.settop需要清除已提示的。避免跳过

//全局控制处理(太麻烦暂时不这么做了)
/*
$(function(){
	//权限控制
	$("[grantCheck]").each(function(){
		var appType = $(this).attr("grantCheck");
		$(this).children("a").bind("click","return isGrant('"+appType+"');");
	});
	$("[slm='1']").each(function(){
		var lmid = $(this).attr("slmid");
		alert($(this).html());
		if(parent){
			$(this).children("a").bind("click","parent.changechannelstyle('"+lmid+"');");
		}else{
			$(this).children("a").bind("click","changechannelstyle('"+lmid+"');");
		}
	});
});
*/
