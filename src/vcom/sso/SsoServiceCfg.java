package vcom.sso;

public class SsoServiceCfg {
	public static final String APP_SERVER_NAME="appServerName";
	public static final String APP_SERVER_PORT="appServerPort";
	public static final String APP_CONTEXT_PATH="appContextPath";
	
	public static final String APP_FLG="appFlg";
	

	
	public static final String SSO_SERVICE_CFG="ssoServiceCfg";

	
	public static final String DEPLOY_WAY="deployWay";
	public static final String SINGLE_HOST="single_host";
	public static final String MULTI_HOST="multi_host";
	

	private String deployWay;//部署方式：single_host【单机】 or multi_host【分布部署】	

	
	/*****单点登录服务配置****/
	private String scheme;//访问协议
	private String serverName;//单点登录服务器主机名
	private String vpnServerName;//单点登录服务器的VPN IP
	private String serverPort;//单点登录服务端口号
	private String contextPath;//单点登录服务部署路径

	private String ssoBasePath;
	
	private String ssoVpnBasePath;
	/*****单点登录服务配置****/
	

	
	/*****业务系统配置*****/
	private String appFlg;//业务标识，每个业务系统制订唯一标识

	/*****业务系统配置*****/
	

	public String getAppFlg() {
		return appFlg;
	}
	public void setAppFlg(String appFlg) {
		this.appFlg = appFlg;
	}
	public String getScheme() {
		return scheme;
	}
	public void setScheme(String scheme) {
		this.scheme = scheme;
	}
	public String getServerName() {
		return serverName;
	}
	public void setServerName(String serverName) {
		this.serverName = serverName;
	}
	public String getServerPort() {
		return serverPort;
	}
	public void setServerPort(String serverPort) {
		this.serverPort = serverPort;
	}
	public String getContextPath() {
		return contextPath;
	}
	public void setContextPath(String contextPath) {
		this.contextPath = contextPath;
	}
	public String getDeployWay() {
		return deployWay;
	}
	public void setDeployWay(String deployWay) {
		this.deployWay = deployWay;
	}
	public String getVpnServerName() {
		return vpnServerName;
	}
	public void setVpnServerName(String vpnServerName) {
		this.vpnServerName = vpnServerName;
	}
	public String getSsoBasePath() {
		ssoBasePath=scheme+"://"+serverName+":"+serverPort+"/"+contextPath+"/";
		return ssoBasePath;
	}

	public String getSsoVpnBasePath() {
		if(vpnServerName==null || vpnServerName.trim().equals(""))
		{
			return null;
		}
		ssoVpnBasePath=scheme+"://"+vpnServerName+":"+serverPort+"/"+contextPath+"/";
		return ssoVpnBasePath;
	}

}
