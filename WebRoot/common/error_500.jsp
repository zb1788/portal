<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isErrorPage="true" %>
<%!/**
	 * 格式化异常堆栈信息
	 * @param e					
	 * @param messageMaxLength	返回信息最大长度，0为不限
	 * @return
	 */
	public String getStackTraceMessage(Throwable error,int messageMaxLength){
		StringBuffer es = new StringBuffer();
		int eslength = 0;
		try{
		for(StackTraceElement est : error.getStackTrace() ){
			if(est!=null && est.toString()!=null){
				eslength=eslength+est.toString().length()+1;
				if(messageMaxLength==0 || eslength<=messageMaxLength){
					es.append(est.toString());
				}else{
					break;
				}
				es.append(";\r\n");
			}
		}
		}catch(Exception e){
			
		}
		return es.toString();
	}
%>
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
		<TITLE>出错啦。</TITLE>
		<META content="text/html; charset=UTF-8" http-equiv=Content-Type>
		<STYLE type=text/css>
BODY {
	PADDING-BOTTOM: 0px;
	MARGIN: 0px;
	PADDING-LEFT: 0px;
	PADDING-RIGHT: 0px;
	PADDING-TOP: 0px;
	BACKGROUND: #1B93C2;
}

P {
	PADDING-BOTTOM: 0px;
	MARGIN: 0px;
	PADDING-LEFT: 0px;
	PADDING-RIGHT: 0px;
	PADDING-TOP: 0px
}

BLOCKQUOTE {
	PADDING-BOTTOM: 0px;
	MARGIN: 0px;
	PADDING-LEFT: 0px;
	PADDING-RIGHT: 0px;
	PADDING-TOP: 0px
}

BODY {
	FONT: 12px Tahoma, Helvetica, Arial, "宋体", sans-serif;
	COLOR: #0152a4
}

A {
	COLOR: #0152a4;
	TEXT-DECORATION: none
}

A:hover {
	COLOR: #ce3400
}

.header {
	BACKGROUND: #1B93C2;
	HEIGHT: 30px;
	float: left;
	width: 100%;
}

.top {
	MARGIN: 0px auto;
	PADDING-LEFT: 10px;
	WIDTH: 993px;
	HEIGHT: 30px;
	float: left;
}

.container {
	BACKGROUND: url(<%=path%>/common/images/error_cbg.gif) repeat-x
}

.container .c {
	POSITION: relative;
	PADDING-BOTTOM: 100px;
	LINE-HEIGHT: 36px;
	MARGIN: 0px auto;
	PADDING-LEFT: 200px;
	WIDTH: 803px;
	PADDING-RIGHT: 0px;
	PADDING-TOP: 120px
}

H3 {
	FONT-FAMILY: 微软雅黑, 宋体, Arial, Helvetica, sans-serif;
	FONT-SIZE: 40px;
	BACKGROUND:none;
	color:black;
}

.info {
	FONT-FAMILY: 微软雅黑, 宋体, Arial, Helvetica, sans-serif;
	FONT-SIZE: 40px
}

.info {
	LINE-HEIGHT: 30px;
	MARGIN-TOP: 8px;
	FONT-SIZE: 18px
}

.footer {
	BACKGROUND: url(<%=path%>/common/images/error_fbg.gif) repeat-x 50% bottom;
	HEIGHT: 99px
}

.a {
	POSITION: absolute;
	WIDTH: 311px;
	BOTTOM: -53px;
	BACKGROUND: url(<%=path%>/common/images/error_a.gif) no-repeat;
	HEIGHT: 201px;
	RIGHT: 135px
}
</STYLE>
		<link href="<%=path %>/common/style/<%=module %>.css?r=11" rel="stylesheet" type="text/css" />
		<META name=GENERATOR content="MSHTML 8.00.7600.16821">
	</HEAD>

	<BODY>
		<DIV class=header>
			<DIV class=top>
				 <!-- <IMG src="<%=path%>/common/images/error_logo.gif" width=234 height=30>  -->
			</DIV>
		</DIV>
		<DIV class="container" >
			<DIV class="c" >
				<H3>
					出错啦 - 找不到页面。
				</H3>
				<DIV class=info>
					<P>
						内部服务器错误，服务器无法解析代码！ 如果您当前使用授课客户端，请点此 <a href="close://" tareget="_self">关闭</a> 错误页面；<br />
						<div style="display:none">
						<%= exception.getMessage() %>
						<%= getStackTraceMessage(exception,500) %>
						</div>
					</P>
					<P>&nbsp;
					</P>
					<P>&nbsp;</P>
				</DIV>
				<DIV class=op>
				<a href="javascript:top.window.close();" class="norBtn">关闭</a>
				</DIV>
				<DIV class=a>
				</DIV>
			</DIV>
		</DIV>
		<DIV class=footer>
		</DIV>
		<script type="text/javascript">
		if (top.location !== self.location) {
			  $("#loginbuttion",window.top.document).attr("disabled",false);
			  $("#message",window.top.document).html("&nbsp;<img src=\"<%=path%>/login/images/lodding.gif\">登录出错...");
		}
		</script>
	</BODY>

</HTML>