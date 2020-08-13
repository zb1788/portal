package vcom.sso.util;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import net.sf.json.JSONObject;


import vcom.sso.SsoServiceCfg;
import vcom.sso.vo.AuthResult;

public class SpaceFailFilter  implements Filter{

	 /**
     * 本过滤器的配置信息
     */
    protected FilterConfig filterConfig = null;
    
    /**
     * 初始化过滤器
     */
    public void init(FilterConfig filterConfig) throws ServletException {

        this.filterConfig = filterConfig;
        
    }
    
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain) throws IOException, ServletException {

         HttpServletRequest hrequest =(HttpServletRequest)request ;;
         HttpServletResponse hresponse =(HttpServletResponse)response ;
         hresponse.setHeader("P3P","CP=CAO PSA OUR");
         hresponse.setHeader("X-XSS-protection", "0; mode=block");
         javax.servlet.http.HttpSession session = hrequest.getSession(true);
         String requesturi = hrequest.getRequestURI().replaceAll("//", "/");  //请求的页面
         String contentpath = hrequest.getContextPath();
         String servletpath =hrequest.getServletPath();
         String path = hrequest.getContextPath();
         String basePath = hrequest.getScheme()+"://"+hrequest.getServerName()+":"+hrequest.getServerPort()+path+"/";
         String requestPath = requesturi;
          if (requesturi.startsWith(path))
         {
             requestPath = requesturi.substring(path.length());
         }
          
         ServletContext sc=session.getServletContext();
         boolean isNeedFilter=false;//当前URL是否需要过滤
         boolean UserNeedUpdate=false;//用户信息是否需要更新
         
         if(requestPath.equals("/ssoLogin.jsp") || requestPath.equals("/ssoLogout.jsp") ||  requestPath.equals("/ssoLoginFail.jsp"))
         {
        	 isNeedFilter=false;
         }
         
         //logger.info("isNeedFilter:"+isNeedFilter);
         String lastUrlSession=(String)session.getAttribute("lastUrl");
         //logger.info("req rul filter :"+hrequest.getRequestURL().toString());
         //logger.info("lastUrlSession filter:"+lastUrlSession);
         
         if(isNeedFilter)
         {
	         //获取用户信息时用到的用户凭证
	         String utSession=(String)session.getAttribute("utSession");
	         boolean isNeedGetUt=false;//是否需要获取用户信息
	         String ut=null;//cookie用户凭证，单点登录写入的用户凭证
	         String isPortal=null;//是否通过门户登录
	         String ssoLoginFlag=null;//是否通过单点登录进入
	         
		       //取单点登录写入的用户凭证
		  		Cookie[] cks=hrequest.getCookies();
		  		for(int i = 0;cks != null && i < cks.length;i++){  
		  			Cookie ck = cks[i];   
		  		    if(ck.getName().equals("ut"))
		  		    {
		  		    	ut=ck.getValue();
		  		    }
		  		   if(ck.getName().equals("isPortal"))
		 		    {
		  			  isPortal=ck.getValue();
		 		    }
		  		  if(ck.getName().equals("sso_login_flag"))
		 		    {
		  			  ssoLoginFlag=ck.getValue();
		 		    }
		  		}
	         //logger.info("ut:"+ut);
	        // logger.info("utSession:"+utSession);
	        if(ssoLoginFlag==null || ssoLoginFlag.equals("1"))
	        {
		         //未认证
		         if(ut==null|| ut.trim().equals(""))
		         {
		        	//认证
		             String reqPath=hrequest.getRequestURI().replaceAll("//", "/");
		             String queryString=hrequest.getQueryString();
		             String reqUrl=reqPath;
		             if(queryString!=null)
		             {
		            	 reqUrl+="?"+queryString;
		             }
		             //logger.info("reqUrl:"+reqUrl);
		             session.setAttribute("lastUrl", reqUrl);
		             Cookie cookie=new Cookie("lastUrl", reqUrl);
		             hresponse.addCookie(cookie); 
		             session.setAttribute("utSession", null);
		             //logger.info("get Ut filter: go ssoLogin.jsp");
		        	 //hrequest.getRequestDispatcher("/ssoLogin.jsp").forward(hrequest, hresponse);
		             chain.doFilter(request, response);
		         }
		         //未获取用户信息,已认证；或者已获取用户信息,认证已更新
		         else if((utSession==null && ut !=null)  || (utSession!=null && ut !=null  && !utSession.equals(ut)))
		         {
		        	 String reqPath=hrequest.getRequestURI().replaceAll("//", "/");
		             String queryString=hrequest.getQueryString();
		             String reqUrl=reqPath;
		             if(queryString!=null)
		             {
		            	 reqUrl+="?"+queryString;
		             }
		             //logger.info("reqUrl:"+reqUrl);
		            // session.setAttribute("lastUrl", reqUrl);
		             //Cookie cookie=new Cookie("lastUrl", reqUrl);
		            //hresponse.addCookie(cookie); 
		             
		        	 //初始化单点登录路径
		        	 SsoServiceCfg ssoServiceCfg=(SsoServiceCfg)sc.getAttribute(SsoServiceCfg.SSO_SERVICE_CFG);
		        	 
		        	 String deployWay=ssoServiceCfg.getDeployWay(); 
		        	 
		        	 String reqSsoBasePath=null;
		
		        	 if(deployWay.equals(ssoServiceCfg.SINGLE_HOST))
		        	 {
		        	 	reqSsoBasePath = ssoServiceCfg.getScheme()+"://127.0.0.1:"+ssoServiceCfg.getServerPort()+"/"+ssoServiceCfg.getContextPath()+"/";
		        	 }
		        	 else if(deployWay.equals(ssoServiceCfg.MULTI_HOST))
		        	 {
		        		 if(ssoServiceCfg.getVpnServerName()!=null && !ssoServiceCfg.getVpnServerName().trim().equals(""))
		         	 	{
		         	 		reqSsoBasePath = ssoServiceCfg.getScheme()+"://"+ssoServiceCfg.getVpnServerName()+":"+ssoServiceCfg.getServerPort()+"/"+ssoServiceCfg.getContextPath()+"/";
		         	 	}	
		        		else if(ssoServiceCfg.getServerName()!=null && !ssoServiceCfg.getServerName().trim().equals(""))
		        	 	{
		        			reqSsoBasePath = ssoServiceCfg.getScheme()+"://"+ssoServiceCfg.getServerName()+":"+ssoServiceCfg.getServerPort()+"/"+ssoServiceCfg.getContextPath()+"/";
		        	 	}
		        	 	
		        	 }
		
		        	 //获取用户信息
		        	 	String authUrl=reqSsoBasePath+"ssoGrant?ut="+ut+"&isPortal="+isPortal+"&appFlg="+ssoServiceCfg.getAppFlg();
			     		HttpClientUtil hcu=new HttpClientUtil();
			    		String authResultJson=null;
			    		//logger.info("authUrl："+authUrl);
			
			    		try
			    		{
			    			authResultJson=hcu.get(authUrl);
			    		}
			    		catch(Exception e)
			    		{
			    			e.printStackTrace();
			    		}
			    		
			    		//logger.info("业务系统得到校验信息："+authResultJson);
			    		JSONObject js = JSONObject.fromObject(authResultJson);
			
			    		AuthResult authResult = (AuthResult) js.toBean(js, AuthResult.class); 
			    		if(authResult.getAuthFlg()!=null && authResult.getAuthFlg().equals("0"))
			    		{
			    			 hrequest.getRequestDispatcher("/ssoLoginFail.jsp").forward(hrequest, hresponse);
			    			 return;
			    		}
			    		session.setAttribute("utSession",ut);
			    		session.setAttribute("authResult",authResult);
			    		UserNeedUpdate=true;
		         }
	         }

	         if(UserNeedUpdate)
	         {
	        	 AuthResult authResult = (AuthResult)session.getAttribute("authResult");
	        	 Sso2AppUtil.cpSessionVo(hrequest, hresponse, authResult);
	         }
         }
         chain.doFilter(request, response);
    }
    
    public void destroy() {

    }
    
    protected void forward(ServletRequest request, ServletResponse response,
            String url) throws IOException, ServletException {
			javax.servlet.RequestDispatcher rd = request.getRequestDispatcher(url);
			rd.forward(request, response);
}

}
