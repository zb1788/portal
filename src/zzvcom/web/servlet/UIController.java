package zzvcom.web.servlet;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.*;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;


import org.dom4j.*;
import org.dom4j.io.SAXReader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import zzvcom.util.Common;


/**
 * 
 * 替代struts2，作为地址处理控制器，控制各个地址的处理逻辑
 * 
 * @author 苌黄林
 *
 */
public class UIController extends HttpServlet {

	private static final Logger logger = LoggerFactory.getLogger(UIController.class);
	private static String SUFFIX= ".action";
	private static Map<String,UIConfig> configMap= null;
	
	public void init(ServletConfig config){
		if(configMap==null){
			logger.debug("INIT!!!");
			getConfigs();
		}
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
		controller(request,response,"get");
	}
	public void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
		controller(request,response,"post");
	}
	
	/**
	 * 
	 * @param request
	 * @param response
	 * @param method     通过get，还是post
	 * @throws ServletException
	 * @throws IOException
	 */
	private void controller(HttpServletRequest request, HttpServletResponse response,String method){
		String path = request.getContextPath();
		if(path==null){
			path="";
		}
		String basePath = request.getServerName()+":"+request.getServerPort()+path+"/";
		String basePath2 = request.getServerName()+path+"/";
		
		String reqUrl = request.getRequestURL().toString();
		if(reqUrl==null){
			reqUrl="";
		}
		logger.debug("GET All request URL :"+reqUrl);

		//去除协议头
		reqUrl=reqUrl.replace(request.getScheme(),"");
		
		reqUrl=reqUrl.replaceAll("//","/");

		//去除项目根路径
		if(reqUrl.indexOf(basePath)>-1){
			reqUrl=reqUrl.substring(reqUrl.indexOf(basePath)+basePath.length());
		}else if(reqUrl.indexOf(basePath2)>-1){
			reqUrl=reqUrl.substring(reqUrl.indexOf(basePath2)+basePath2.length());
		}
		//去除get参数
		if(reqUrl!=null && reqUrl.indexOf("?")>-1){
			reqUrl=reqUrl.substring(0,reqUrl.indexOf("?"));
		}
		reqUrl=reqUrl.replaceAll("//","/");
		if(reqUrl.startsWith("/")){
			reqUrl=reqUrl.substring(1);
		}
		logger.debug("GET project URL :"+reqUrl);
		UIConfig tconfig=null;
		if(configMap!=null){
			tconfig=configMap.get(reqUrl.replace(SUFFIX,""));
		}
		if(tconfig==null){
			try{
				response.setContentType("text/html;charset=UTF-8");
				//response.setStatus(404);
				ServletOutputStream out = response.getOutputStream();
				out.write(("UICONFIG ERROR:CAN NOT GET CONFIG  !").getBytes("UTF-8"));
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return;
		}
		String className = tconfig.getClassName();
		String methodName = tconfig.getMethodName();
		if(className!=null){
			try {
				Class tClass = Class.forName(className);
				Object o = tClass.newInstance();
				Method m = tClass.getDeclaredMethod(methodName,String.class,HttpServletRequest.class,HttpServletResponse.class);
				Object [] oi= {method,request,response};
				String resultStr=(String)m.invoke(o, oi);
				if(resultStr!=null && resultStr.trim().length()>0 && tconfig.getResult(resultStr)!=null){
					logger.debug("RESULT KEY:"+resultStr+" URL:"+tconfig.getResult(resultStr));
					RequestDispatcher requestDispatcher =request.getRequestDispatcher(tconfig.getResult(resultStr));
				    //调用forward()方法，转发请求      
				   requestDispatcher.forward(request,response);
				}else if(tconfig.getResult("success")!=null){
					logger.debug("CAUSE:resultStr="+resultStr+" NOT FOUND! RESULT KEY TO SUCCESS。");
					RequestDispatcher requestDispatcher =request.getRequestDispatcher(tconfig.getResult("success"));
				    //调用forward()方法，转发请求
				   requestDispatcher.forward(request,response);
				}else{
					//如果out.getWriter()输出内容，会进入这里，修改为不做处理
					/*
					try{
						response.setContentType("text/html;charset=UTF-8");
						ServletOutputStream out = response.getOutputStream();
						out.write("UICONFIG ERROR:CAN NOT GET RESULT CONFIG!".getBytes("UTF-8"));
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					*/
					return;
				}
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error("Class Load Error!reqUrl:"+reqUrl);
			} catch (InstantiationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error("Class Init Error!reqUrl:"+reqUrl);
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error("Class Init Error!reqUrl:"+reqUrl);
			} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error("Method load Error!reqUrl:"+reqUrl);
			} catch (SecurityException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error("Method load Error!reqUrl:"+reqUrl);
			}  catch (IllegalArgumentException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error("Method exec Error!reqUrl:"+reqUrl);
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error("Method exec Error!reqUrl:"+reqUrl);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error("Unexpect Error!reqUrl:"+reqUrl);
			}
		}
	}
	
	private void getConfigs(){
		InputStream inf = UIController.class.getResourceAsStream(Common.UICONFIG_FILE);
		if(inf==null){
			logger.error("uiconfig XML read ERROR!");
			return;
		}
		configMap=new HashMap<String,UIConfig>();
		try {
			SAXReader reader = new SAXReader();
			Document doc = reader.read(inf);
			Element root = doc.getRootElement();   
			Element foo;   
			for (Iterator i = root.elementIterator("ui"); i.hasNext();) {
				foo = (Element) i.next();
				UIConfig tconfig = new UIConfig();
				tconfig.setUrlName(foo.attributeValue("url"));
				tconfig.setClassName(foo.attributeValue("class"));
				tconfig.setMethodName(foo.attributeValue("method"));
				if(tconfig.getMethodName()==null || tconfig.getMethodName().trim().length()==0){
					tconfig.setMethodName("execute");
				}
				logger.debug("*UI_CONFIG*");
				logger.debug("urlName:"+tconfig.getUrlName()+"  class:"+tconfig.getClassName()+"  method:"+tconfig.getMethodName());
				Iterator si=foo.elementIterator("result");
				if(si!=null){
					Map<String,String> rmap=null;
					while (si.hasNext()){
						if(rmap==null){
							rmap=new HashMap<String,String>();
						}
						Element so = (Element) si.next();
						String key = so.attributeValue("name");
						String value = so.getText();
						logger.debug("resultName:" + key+ " resultURL:" + value);
						if(key!=null && value!=null){
							rmap.put(key, value);
						}
					}
					tconfig.setResult(rmap);
				}
				if(tconfig.getUrlName()!=null && tconfig.getClassName()!=null){
					configMap.put(tconfig.getUrlName(),tconfig);
				}
			}

		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			logger.error("uiconfig XML load ERROR!");
			e.printStackTrace();
		}
	}
}