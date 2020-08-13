<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	response.setHeader("Pragma", "No-Cache");
	response.setHeader("Cache-Control", "No-Cache");
	response.setDateHeader("Expires", 0);
	
	String module="no";
	Map<String, Map<String, String>> amap = zzvcom.util.Common.getConfigMap().get(request.getServerName());
	if(amap==null){//表明不存在改域名的配置，此时取默认配置
	    amap = zzvcom.util.Common.getConfigMap().get("default");
	}
	//根据spacedir控制转向页
	if(amap.get("map_portal").get("spacedir")!=null && amap.get("map_portal").get("spacedir").trim().length()>0){
		module=amap.get("map_portal").get("spacedir");
	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<HTML xmlns="http://www.w3.org/1999/xhtml">
	<HEAD>
		<META content="text/html; charset=UTF-8" http-equiv=Content-Type>
		<TITLE>404页面</TITLE>
		<link href="<%=path%>/common/style/common.css" rel="stylesheet" type="text/css" />
		<style>
			.error {background:url(<%=path%>/common/images/404.jpg) no-repeat; width:980px; min-height:400px; height:auto; display:block; margin:30px auto; }
			.text_con {padding:380px 0 0 290px;}
			.error h2 { height:30px; line-height:30px; font-family:Microsoft YaHei; font-size:16px; display:block; margin-bottom:10px;}
			.error p { line-height:24px;}
			.error a,.error a:visited {color:#00f; text-decoration:underline;}
			.error a:hover {color:#f60;}
		</style>
		<link href="<%=path %>/common/style/<%=module %>.css?r=11" rel="stylesheet" type="text/css" />
		<script type="text/javascript">
		function closeWindow(){
			try{
				if(ocx.getVersion){
					window.location.href="close://";
				}else{
					window.close();
				}
			}catch(e){
				window.close();
			}
			return false;
		}
		</script> 
	</HEAD>
	<BODY>
	     <div style="display: none">
		 <OBJECT id=ocx codeBase="http://125.46.92.81:80/officdown.cab#version=1,0,1,4"
			     classid=CLSID:B02201C9-1789-4FF0-B95F-C1A03D8B6B99 width=0 height=0>
			     <PARAM NAME="_Version" VALUE="65536">
			     <PARAM NAME="_ExtentX" VALUE="10583">
			     <PARAM NAME="_ExtentY" VALUE="10583">
			     <PARAM NAME="_StockProps" VALUE="0">
		 </OBJECT>
		 </div>
		<div class="error">
    	<div class="text_con">
		     <h2><%if("no".equals(module)){ %>
		        	没有发现您要找的页面 ，经砖家仔细研究结果如下：
		         <% }else{ %>
		         	您访问的页面未找到!
		         <% } %>
		         </h2>
		     <p> 1、检查一下您的域名和地址是否输入正确；<br />
		         <%if("no".equals(module)){ %>
		         2、动动手指&nbsp;<a href="javascript:location.reload();">刷新</a>&nbsp;尝试一下；<br />
		         3、如果您当前使用授课客户端，请点此 <a href="#" onclick="closeWindow()" tareget="_self">关闭</a> 错误页面；<br />
		         4、您还可以拨打我们的客服电话哦！(<font class="orangeFon" >400-699-3111</font>)
		         <% }else{ %>
		         	2、点击<a href="javascript:location.reload();">刷新</a>&nbsp;重试一下；<br />
		         <% } %>
		         <a id="skUrl" style="display:none" href="http://www.czbanbantong.com/teach/" >设置授课区域</a>
		     </p>
     	</div>
		</div>
		<script type="text/javascript">
		//新版授课显示重设地区
			try{
				if(VcomTeach.isVcomTeach()) {
					document.getElementById("skUrl").style.display="block";
				}
			}catch(e){
				
			}
		</script>
	</BODY>
</HTML>