package vcom.sso.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class WebPayGrant {
	public static final String domainRegular="^([\\w-]+\\.)+((com)|(net)|(org)|(gov\\.cn)|(info)|(cc)|(com\\.cn)|(net\\.cn)|(org\\.cn)|(name)|(biz)|(tv)|(cn)|(mobi)|(name)|(sh)|(ac)|(io)|(tw)|(com\\.tw)|(hk)|(com\\.hk)|(ws)|(travel)|(us)|(tm)|(la)|(me\\.uk)|(org\\.uk)|(ltd\\.uk)|(plc\\.uk)|(in)|(eu)|(it)|(jp))$";
	public static final String url2DomainRegular="(?<=http://|\\.)[^.]*?\\.(com.cn|net.cn|org.cn|com|org|biz|info|cc|tv)";
	public static final String URL_SPLIT="/";
	
	public static final  String key_ut="ut";
	public static final  String key_loginAreaCode="loginAreaCode";
	public static final  String key_loginClientCode="loginClientCode";
	public static final  String key_loginClientType="loginClientType";
	public static final  String key_orderAreaCode="orderAreaCode";
	public static final  String key_orderClientCode="orderClientCode";
	public static final  String key_orderClientType="orderClientType";
	public static final  String key_orderClientStage="orderClientStage";
	public static final  String key_orderClientGrade="orderClientGrade";
	public static final  String key_productFreeTime="productFreeTime";
	
	private String ut;
	private String loginAreaCode;
	private String loginClientCode;
	private String loginClientType;
	private String orderAreaCode;
	private String orderClientCode;
	private String orderClientType;
	private String orderClientStage;
	private String orderClientGrade;
	private String productFreeTime;
	
	private HttpServletRequest request;
	private HttpServletResponse response;
	
	private String domain=null;
	private boolean isDomain=false;
	private Cookie[] cks=null;
  
	
	public  WebPayGrant()
	{
		//提取域名
		Pattern domainPattern = Pattern.compile(domainRegular);
		Matcher domainMatcher = domainPattern.matcher(request.getServerName());
		isDomain=domainMatcher.matches();
		
		if(isDomain)
		{
			String url = request.getRequestURL().toString();
			Pattern url2DomainPattern = Pattern.compile(url2DomainRegular,Pattern.CASE_INSENSITIVE);

			Matcher url2DomainMatcher = url2DomainPattern.matcher(url);
			url2DomainMatcher.find();
			domain=url2DomainMatcher.group();
		}
		
		//读取cookie
		cks=request.getCookies();
	}
	
	public  WebPayGrant(HttpServletRequest request,HttpServletResponse response)
	{
		this.request = request;
		this.response = response;
		
		//提取域名
		Pattern domainPattern = Pattern.compile(domainRegular);
		Matcher domainMatcher = domainPattern.matcher(request.getServerName());
		isDomain=domainMatcher.matches();
		
		if(isDomain)
		{
			String url = request.getRequestURL().toString();
			Pattern url2DomainPattern = Pattern.compile(url2DomainRegular,Pattern.CASE_INSENSITIVE);

			Matcher url2DomainMatcher = url2DomainPattern.matcher(url);
			url2DomainMatcher.find();
			domain=url2DomainMatcher.group();
		}
		
		//读取cookie
		cks=request.getCookies();
	}
	
	//写cookie
	public void writeCookie(String key,String value)
	{
		Cookie ck=new Cookie(key,value);
		if(isDomain)
		{
			ck.setDomain(domain);
		}
		ck.setPath(URL_SPLIT);
		response.addCookie(ck);
	}
	
	//读cookie
	public String readCookie(String key)
	{
		String value=null;
  		for(int i = 0;cks != null && i < cks.length;i++){  
  			Cookie ck = cks[i];   
  		    if(ck.getName().equals(key))
  		    {
  		    	value=ck.getValue();
  		    }
  		}
  		return value;
	}
	
	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	public HttpServletResponse getResponse() {
		return response;
	}

	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}
	
	public String getUt() {
		return this.readCookie(this.key_ut);
	}
	public void setUt(String ut) {
		
	}
	public String getLoginAreaCode() {
		return this.readCookie(this.key_loginAreaCode);
	}
	public void setLoginAreaCode(String loginAreaCode) {
		this.writeCookie(this.key_loginAreaCode, loginAreaCode);
	}
	public String getLoginClientCode() {
		return this.readCookie(this.key_loginClientCode);
	}
	public void setLoginClientCode(String loginClientCode) {
		this.writeCookie(this.key_loginClientCode, loginClientCode);
	}
	public String getLoginClientType() {
		return this.readCookie(this.key_loginClientType);
	}
	public void setLoginClientType(String loginClientType) {
		this.writeCookie(this.key_loginClientType, loginClientType);
	}
	public String getOrderAreaCode() {
		return this.readCookie(this.key_orderAreaCode);
	}
	public void setOrderAreaCode(String orderAreaCode) {
		this.writeCookie(this.key_orderAreaCode, orderAreaCode);
	}
	public String getOrderClientCode() {
		return this.readCookie(this.orderClientCode);
	}
	public void setOrderClientCode(String orderClientCode) {
		this.writeCookie(this.key_orderClientCode, orderClientCode);
	}
	public String getOrderClientType() {
		return this.readCookie(this.key_orderClientType);
	}
	public void setOrderClientType(String orderClientType) {
		this.writeCookie(this.key_orderClientType, orderClientType);
	}
	public String getProductFreeTime() {
		return this.readCookie(this.key_productFreeTime);
	}
	public void setProductFreeTime(String productFreeTime) {
		this.writeCookie(this.key_productFreeTime, productFreeTime);
	}

	public String getOrderClientStage() {
		return this.readCookie(this.key_orderClientStage);
	}

	public void setOrderClientStage(String orderClientStage) {
		this.writeCookie(this.key_orderClientStage, orderClientStage);
	}

	public String getOrderClientGrade() {
		return this.readCookie(this.key_orderClientGrade);
	}

	public void setOrderClientGrade(String orderClientGrade) {
		this.writeCookie(this.key_orderClientGrade,orderClientGrade);
	}

}
