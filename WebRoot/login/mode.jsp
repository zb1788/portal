<%@ page language="java" import="java.util.*" pageEncoding="utf-8" import="zzvcom.util.Common,net.sf.json.JSONObject,org.apache.commons.lang.StringUtils,java.io.*"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String defmodule = ((Map<String,String>)request.getAttribute("ConfigMap")).get("default_module");
String nowmodule = request.getParameter("module");//待预览模板参数

String seokey=((Map<String,String>)request.getAttribute("ConfigMap")).get("seokey");//当前域关键词
String icoimg=((Map<String,String>)request.getAttribute("ConfigMap")).get("icoimg");//当前域页面图标
if(StringUtils.isBlank(icoimg)){
	//icoimg="yjt.ico";
	icoimg="";
}else{
	icoimg=request.getContextPath()+"/ico/"+icoimg;
}
if(seokey==null || seokey.trim().length()==0){
	seokey=Common.DEFAULT_SEO_KEY;
}
//随机数
String randomStr=Math.round(Math.random()*100)+""+Math.round(Math.random()*100);

String code = Common.LOGIN_TEMPLET.get(nowmodule);
if(code==null){//判空
	//如果没有缓存，则加入缓存
	String ps=Common.class.getClassLoader().getResource(Common.UICONFIG_FILE).getPath();
        	ps = ps.substring(0,ps.indexOf("WEB-INF"));

        	InputStream is=null;
			try {
				is = new FileInputStream(new File(ps+nowmodule));
			} catch (FileNotFoundException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
        	if(is!=null){
        		BufferedReader read=null;
				try {
					read = new BufferedReader(new InputStreamReader(is,"UTF-8"));
			         		StringBuffer sbf = new StringBuffer();
			         		String temp = null;
					while((temp = read.readLine()) != null){
						sbf.append(temp);
						sbf.append("\r\n");
					}
					code=sbf.toString();
					Common.LOGIN_TEMPLET.put(nowmodule,code);
					sbf=null;
				}catch (UnsupportedEncodingException e2) {
					// TODO Auto-generated catch block
					e2.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} 
			    try {
					read.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			    try {
			         is.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				//code = Common.LOGIN_TEMPLET.get(defmodule);
			}
}
String protocol=((Map<String,String>)request.getAttribute("ConfigMap")).get("LOCAL_PROTOCOL");//当前域模板

//安全修复--浏览器检查跨站攻击
response.addHeader("X-XSS-protection"," 1; mode=block");
//安全修复--仅允许本域 iframe
response.addHeader("X-Frame-Options","SAMEORIGIN"); 
//安全修复--要求Https访问
if("https".equals(protocol) && "https".equals(request.getScheme())) {
	response.setHeader("Strict-Transport-Security" ,"max-age=86400" );
}

response.setContentType("text/html;charset=UTF-8");

out.print(code.replaceAll("[{]SEOKEY[}]",seokey).replaceAll("[{]ICOIMG[}]",icoimg).replaceAll("[{]RANDOM[}]",randomStr));
//out.clear();
//out = pageContext.pushBody();
%>
