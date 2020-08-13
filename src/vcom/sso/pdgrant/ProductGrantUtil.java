package vcom.sso.pdgrant;

import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;
import vcom.sso.SsoServiceCfg;
import vcom.sso.util.HttpClientUtil;
import vcom.sso.vo.AuthResult;
import vcom.sso.vo.VSysUser;

public class ProductGrantUtil {
    
    public static String reqSsoBasePath=null;
    public static String reasonSsoBasePath=null;
    
    public static String appFlg=null;

    
    public ProductGrantRtn getProductGrant(HttpServletRequest hrequest)
    {
        javax.servlet.http.HttpSession session = hrequest.getSession(true);
    
        ProductGrantRtn productGrantRtn=(ProductGrantRtn)session.getAttribute("productGrantRtn");
        String username="";
        AuthResult authResult = (AuthResult)session.getAttribute("authResult");
         if(authResult!=null)
         {
                 VSysUser vuser=authResult.getUser();
                 username=vuser.getUsername();
         }
        if(productGrantRtn==null)
        {
            productGrantRtn = this.getProductGrantHttp(username, hrequest); 
            session.setAttribute("productGrantRtn", productGrantRtn);
        }
        else
        {
             if(username!=null && !username.equals(productGrantRtn.getUsername()))
             {
                productGrantRtn = this.getProductGrantHttp(username, hrequest); 
                session.setAttribute("productGrantRtn", productGrantRtn);
             }
             
        }
        
        return productGrantRtn;
    }
    
    public ProductGrantRtn getProductGrantHttp(String username,HttpServletRequest hrequest)
    {
        //如果认证地址为空，初始化认证地址
        if(reqSsoBasePath==null)
        {
            initPdGrantBasePath(hrequest);
        }

         //获取产品鉴权信息
        String reqUrl=reqSsoBasePath+"pdGrant?username="+username+"&appFlg=PORTAL";
        HttpClientUtil hcu=new HttpClientUtil();
        String rtnJson=null;
        //logger.info("reqUrl："+reqUrl);

        try
        {
            rtnJson=hcu.get(reqUrl);
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        
        //logger.info("业务系统得到校验信息："+authResultJson);
        JSONObject js = JSONObject.fromObject(rtnJson);

        ProductGrantRtn productGrantRtn = (ProductGrantRtn) js.toBean(js, ProductGrantRtn.class); 
        String reasonUrl=reasonSsoBasePath+"pdgrant/reason.jsp";
        productGrantRtn.setReasonUrl(reasonUrl);
        
        return productGrantRtn;
    }
    

    
    public ProductGrantRtn getProductGrantCache(String username,HttpServletRequest hrequest)
    {
        ProductGrantRtn productGrantRtn=null;
        //从缓存服务器读取产品授权信息

        return productGrantRtn;
    }
    
    public void initPdGrantBasePath(HttpServletRequest hrequest)
    {
        javax.servlet.http.HttpSession session = hrequest.getSession(true);
        ServletContext sc=session.getServletContext();
        SsoServiceCfg ssoServiceCfg=(SsoServiceCfg)sc.getAttribute(SsoServiceCfg.SSO_SERVICE_CFG);
        
         String deployWay=ssoServiceCfg.getDeployWay(); 
         
         //初始化认证的最佳请求地址
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
         
         //初始化认证的公网地址
         reasonSsoBasePath = ssoServiceCfg.getScheme()+"://"+ssoServiceCfg.getServerName()+":"+ssoServiceCfg.getServerPort()+"/"+ssoServiceCfg.getContextPath()+"/";
         
         //初始化系统标识
         appFlg=ssoServiceCfg.getAppFlg();
    }

}
