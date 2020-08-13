<%@ page language="java" import="zzvcom.util.Common" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
String channelStr=Common.getChannelJson(request.getServerName());
if(channelStr==null || channelStr.trim().length()==0){
	channelStr="[]";
}
out.println("var managechannel="+channelStr+";");
%>
var recentlyChannel=[
 		{code:"22_01",name:"学校管理",count:1,img:"xxkj.png"},
 		{code:"22_02_01",name:"机构设置",count:1,img:"xxjg.png"},
 		{code:"22_03",name:"师生信息",count:1,img:"ssxx.png"},
 		{code:"23",name:"通知公告",count:1,img:"tzgg.png"},
 		{code:"24_01",name:"微课活动",count:1,img:"wkhd.png"},
 		{code:"24_02",name:"问卷调查",count:1,img:"wjdc.png"},
 		{code:"24_03",name:"评课活动",count:1,img:"pkhd.png"},
 		//{code:"",name:"备课统计",count:1,img:"dltj.png"},
 		//{code:"",name:"授课统计",count:1,img:"skjz.png"},
 		{code:"25_01",name:"集体备课",count:1,img:"zxbkgl.png"},
 		//{code:"",name:"作业统计",count:1,img:"zygl.png"},
 		{code:"25_02",name:"区本资源",count:1,img:"xbzy.png"},
 		{code:"26",name:"教务管理",count:1,img:"jwgl.png"},
 		{code:"27_01",name:"开通统计",count:1,img:"kttj.png"},
 		{code:"27_02",name:"登录统计",count:1,img:"dltj.png"},
 		{code:"27_03",name:"使用排行",count:1,img:"syph.png"},
 		{code:"24",name:"活动管理",count:1,img:"tyhd.png"},
 ];
