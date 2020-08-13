package vcom.sso.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;
import org.apache.log4j.Logger;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.httpclient.methods.multipart.StringPart;

public class HttpClientUtil {

	 static Logger logger = Logger.getLogger(HttpClientUtil.class.getName());
	 //私有变量，http协议名称
    private static final String HTTP_PROTOCOL = "http://" ;
    //域名和端口间分隔符
    private static final String HTTP_COLON = ":" ;
    private static final String CHARACTER_SET_VALUE = "ISO-8859-1" ;
    
    private String servIp=null;
    private String servPort="80";
    private String appName=null;
    private String reqUri=null;
    private String[] responseInfo = new String[2] ;
    
    public String get() throws Exception
    {
   	 Part[] parts=new Part[0];
        
	   	String url="http://"+servIp+":"+servPort;
		if(appName!=null)
		{
			url+="/"+appName;
		}
		if(reqUri!=null)
		{
			url+="/"+reqUri;
		}
		System.out.println(url);
         //获得http客户端
         HttpClient httpclient = new HttpClient();

        GetMethod get=new GetMethod(url);

        int statusCode = httpclient.executeMethod(get);
        
        System.out.println(statusCode);
        
        String resultbody=get.getResponseBodyAsString();
        
        System.out.println(resultbody);
         //释放连接
        get.releaseConnection();

         //返回响应结果
         return resultbody ;
    }
    
    public String get(String url) throws Exception
    {
   	 	Part[] parts=new Part[0];
		System.out.println(url);
         //获得http客户端
         HttpClient httpclient = new HttpClient();

        GetMethod get=new GetMethod(url);

        int statusCode = httpclient.executeMethod(get);
        
        System.out.println(statusCode);
        
        String resultbody=get.getResponseBodyAsString();
        
        System.out.println(resultbody);
         //释放连接
        get.releaseConnection();

         //返回响应结果
         return resultbody ;
    }
    
    public String[] post(HashMap hm) throws Exception
    {
    		//取得一个set类集，存放所有key
            Set set = hm.keySet() ;
            //获取一个set类集的指针
            Iterator it = set.iterator() ;
            //实例化一个part容器对象，长度为所有域数量和
            Part[] parts= new Part[set.size()] ;
            //循环计数器
            int i = 0 ;
            while(it.hasNext())
            {
                String key = (String)it.next() ;
                if(key != null)
                {
                    //把域名和域值存入容器
                    parts[i] = new StringPart(key, (String) hm.get(key),CHARACTER_SET_VALUE);
                    System.out.println("key:value:"+key+","+(String) hm.get(key));
                }
                i++ ;
            }

    	HttpClient httpclient = new HttpClient();
    	String url="http://"+servIp+":"+servPort;
    	if(appName!=null)
    	{
    		url+="/"+appName;
    	}
    	if(reqUri!=null)
    	{
    		url+="/"+reqUri;
    	}
    	
    	System.out.println(url);
    	 PostMethod post = new PostMethod(url);

         NameValuePair simcard = new NameValuePair("simcard","1330227");
         post.setRequestBody(new NameValuePair[]{ simcard});

         //执行http post请求
         int statusCode = httpclient.executeMethod(post);
         
         System.out.println(statusCode);
         
         String resultbody=post.getResponseBodyAsString();
         
         System.out.println(resultbody);
         //释放连接
         post.releaseConnection();
  
        responseInfo[0]=String.valueOf(statusCode);
        responseInfo[1]=resultbody;
        return responseInfo;
    }
    
	public String getServIp() {
		return servIp;
	}

	public void setServIp(String servIp) {
		this.servIp = servIp;
	}

	public String getServPort() {
		return servPort;
	}

	public void setServPort(String servPort) {
		this.servPort = servPort;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}



	public String getReqUri() {
		return reqUri;
	}

	public void setReqUri(String reqUri) {
		this.reqUri = reqUri;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		HttpClientUtil util=new HttpClientUtil();
		util.servIp="192.168.15.122";
		util.setAppName("app2");
		util.setReqUri("index.jsp");
		HashMap params=new HashMap();
		params.put("utg", "sdffdfd");
		try
		{
			//util.get();
			util.post(params);
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
	}

}
