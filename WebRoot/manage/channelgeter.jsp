<%@ page language="java" import="zzvcom.util.Common" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
String channelStr=Common.getChannelJson(request.getServerName());
if(channelStr==null || channelStr.trim().length()==0){
	channelStr="[]";
}
out.println("var managechannel="+channelStr+";");
%>
var recentlyChannel=[
 		{code:"02_02",name:"师生信息",count:1,img:"ssxx.png"},
 		//{code:"04_04",name:"通用活动",count:1,img:"tyhd.png"},
 		{code:"02_03",name:"学校号",count:1,img:"xxh.png"},
 		{code:"03",name:"通知公告",count:1,img:"tzgg.png"},
 		{code:"08_01",name:"开通统计",count:1,img:"kttj.png"},
 		//{code:"02_01_02",name:"学校信息",count:1,img:"xxxx.png"},
 		{code:"04_02",name:"微课活动",count:1,img:"wkhd.png"},
 		{code:"05_02_02",name:"互动训练",count:1,img:"hdxl.png"},
 		{code:"02_01_03",name:"学校机构",count:1,img:"xxjg.png"},
 		{code:"04_01",name:"问卷调查",count:1,img:"wjdc.png"},
 		{code:"05_02_03",name:"平板课堂",count:1,img:"pbkt.png"},
 		{code:"02_01_04",name:"教研组",count:1,img:"jyz.png"},
 		{code:"04_03",name:"评课活动",count:1,img:"pkhd.png"},
 		{code:"05_02_04",name:"平板应用申请",count:1,img:"pbyysc.png"},
 		{code:"05_01",name:"在线备课管理",count:1,img:"zxbkgl.png"},
 		//{code:"",name:"学情分析",count:1,img:"xqfx.png"},
 		{code:"05_04",name:"校本资源",count:1,img:"xbzy.png"},
 		{code:"07",name:"教务管理",count:1,img:"jwgl.png"},
 		//{code:"02_04",name:"学校空间",count:1,img:"xxkj.png"},
 		{code:"05_03",name:"作业管理",count:1,img:"zygl.png"},
 		{code:"05_05_02",name:"直播监控",count:1,img:"zbjk.png"},
 		{code:"08_02",name:"登录统计",count:1,img:"dltj.png"},
 		{code:"05_02_01",name:"授课进展",count:1,img:"skjz.png"},
 		{code:"08_03",name:"使用排行",count:1,img:"syph.png"}
 ];
