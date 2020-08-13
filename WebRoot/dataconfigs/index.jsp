<%@ page language="java" import="java.util.*,zzvcom.util.*" pageEncoding="utf-8"%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<script type="text/javascript" src="../js/lib/jquery.js"></script>
<%
/*
 * 验证码生成规则：
 * 随机0-9个数字，0-4则按问题方式校验，5-9则按计算题方式校验。
 * 问题方式：随机0-99个数字，请登录者用大写表示。
 * 计算题方式：随机两个0-99以内的数字，并随机加减，请登录者计算。
 */
String validateCode = "验证码：";
int i = (int) (Math.random() * 10 );
int j = (int) (Math.random() * 89);
int k = (int) (Math.random() * 100);
Map dxMap = new HashMap<String,String>();
dxMap.put("0","零");dxMap.put("1","一");dxMap.put("2","二");
dxMap.put("3","三");dxMap.put("4","四");dxMap.put("5","五");
dxMap.put("6","六");dxMap.put("7","七");dxMap.put("8","八");
dxMap.put("9","九");
String result = "";
if(i>=0 && i<=4){
	validateCode = validateCode + "请用汉字描述：<font color='red'>"+j+"</font>&nbsp;&nbsp;(例：20：二十)";
	if(String.valueOf(j).length()>1){
    if(j==10){
		result = "十";
    }if(Integer.parseInt(String.valueOf(j).substring(1,2))==0){
		result = dxMap.get(String.valueOf(j).substring(0,1)).toString()+"十";
    }else if(Integer.parseInt(String.valueOf(j).substring(0,1))==1){
    	result = "十"+dxMap.get(String.valueOf(j).substring(1,2)).toString();
    }else{
    	result = dxMap.get(String.valueOf(j).substring(0,1)).toString()+"十"+dxMap.get(String.valueOf(j).substring(1,2)).toString();
    }
  }else{
    result = dxMap.get(String.valueOf(j)).toString();
  }
}else{
	if(k > j ){
		validateCode = validateCode + j +"+" +k + "=";
		result = String.valueOf(j+k);
	}else{
		validateCode = validateCode + j +"-" +k + "=";
		result = String.valueOf(j-k);
	}
}
session.setAttribute("checkCode",result);
%>
<script type="text/javascript">
	<!--
	
	$(document).ready(function(){
		$("#validate").html("<%=validateCode%>");
	});
	
	//-->
</script>
<style type="text/css">
body,table{
	font-size:12px;
}
table{
	table-layout:fixed;
	empty-cells:show; 
	border-collapse: collapse;
	margin:0 auto;
}
h1{
	font-size:14px;
	margin:0;
	padding:0;
}
.title{
background: #FFF;
border: 1px solid #9DB3C5;
padding: 1px; 
width:90%;
margin:1px auto; 
}
.title h1 {
line-height: 31px; 
text-align:center; 
background: #2F589C url(pic/th_bg2.gif); 
background-repeat: repeat-x;
background-position: 0 0;
}
.title th, .title td {
border: 1px solid #CAD9EA; 
padding: 5px;
font-weight:bold
}
table.t2{
border:1px solid #9db3c5;
color:#666;
}
table.t2 th{
height:25px;
background-repeat:repeat-x;
}
table.t2 td{
height:25px;
border:1px dotted #cad9ea;
padding:0 2px 0;
}
table.t2 tr.a1{
background-color:#e8f3fd;
}
</style>
</head>  
  <body>
  	<form action="configparam.jsp" method="post">
  	 	<div class="title">
  		<h1>门户管理系统</h1>
   </div> 	
  	<table width="90%" id="mytab" border="1" class="t2">
  		<tr class="a1" >
  			<td colspan="2" >&nbsp;
  			</td>
  		</tr>
  		<tr>
  			<th>
  			用户
  			</th>
  			<td>
  			<input type="text" value="" style="width:100%">
  			</td>
  		</tr>
  		<tr class="a1" >
  			<td colspan="2" >&nbsp;
  			</td>
  		</tr>
  		<tr>
  			<th>
  			密码
  			</th>
  			<td>
  			<input type="password" name="tail" value=""  style="width:100%" >
  			</td>
  		</tr>
  		<tr class="a1" >
  			<td colspan="2" >&nbsp;
  			</td>
  		</tr>
  		<tr>
  			<th id="validate">
  			验证码
  			</th>
  			<td>
  			<input type="text" name="vCode" value=""  style="width:100%" >
  			</td>
  		</tr>
	  <tr class="a1">
	  	<td colspan="2" align="center">	<input type="submit" value="进入" ></td>
	  </tr>
  </table>
 </form>
 <script type="text/javascript">
 document.getElementsByName("tail")[0].focus();
 </script>
 </body>
</html>
