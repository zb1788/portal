package vcom.sso;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;


public class SsoServiceCfgListener implements ServletContextListener {
	protected Logger logger = Logger.getLogger(ServletContextListener.class);	
	public void contextDestroyed(ServletContextEvent scEvent) {
		// TODO Auto-generated method stub
		ServletContext sc=scEvent.getServletContext();
		sc.removeAttribute(SsoServiceCfg.SSO_SERVICE_CFG);
		logger.info("SSO_SERVICE_CFG remove");
	}

	public void contextInitialized(ServletContextEvent scEvent) {
		// TODO Auto-generated method stub
		ServletContext sc=scEvent.getServletContext();
		InputStream ssoServiceCfgIs =sc.getResourceAsStream("/WEB-INF/classes/sso_service_cfg.properties");   
		InputStream filterPathCfgIs =sc.getResourceAsStream("/WEB-INF/classes/filter_path_cfg.xml");
		
		//单点登录服务配置初始化
		Properties props = new Properties();    
		try  
		{    
		props.load(ssoServiceCfgIs);    
		}   
		catch (IOException e)   
		{    
			logger.info("读取sso 配置文件失败！");
		}    
		
		String deployWay=props.getProperty("deployWay");
		
		String scheme=props.getProperty("scheme");
		String serverName=props.getProperty("serverName");
		String vpnServerName=props.getProperty("vpnServerName");		
		String serverPort=props.getProperty("serverPort");
		String contextPath=props.getProperty("contextPath");
	
		String appFlg=props.getProperty("appFlg");

		if(serverName==null || serverName.trim().equals(""))
		{
			//ip/域名配置文件地址
			String serverNameCfgFile=props.getProperty("serverNameCfgFile");
			
			//读认证系统的ip/域名
			Properties prop = new Properties();
			FileInputStream fin = null;
	
			try
			{
				fin = new FileInputStream(serverNameCfgFile);
				prop.load(fin);
				serverName=prop.getProperty("SSO");
				vpnServerName=prop.getProperty("SSO_IP");
			}
			catch (FileNotFoundException e)
			{
				e.printStackTrace();
			}
			catch (IOException e)
			{
				e.printStackTrace();
			}
			finally
			{
				if (null != fin)
				{
					try
					{
						fin.close();
					}
					catch (IOException e)
					{
					}
				}
			}
		}
		SsoServiceCfg ssCfg=new SsoServiceCfg();
		ssCfg.setDeployWay(deployWay);
		ssCfg.setScheme(scheme);
		ssCfg.setServerName(serverName);
		ssCfg.setVpnServerName(vpnServerName);
		ssCfg.setServerPort(serverPort);
		ssCfg.setContextPath(contextPath);
		ssCfg.setAppFlg(appFlg);
		
		sc.setAttribute(SsoServiceCfg.SSO_SERVICE_CFG, ssCfg);
		
		
		//过滤路径初始化
		Document doc=null;
		
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();   
		try
		{
			DocumentBuilder db = dbf.newDocumentBuilder();      
			doc = db.parse(filterPathCfgIs); 
		}
		catch(ParserConfigurationException pce)
		{
			pce.printStackTrace();
		}
		catch(IOException ioe)
		{
			ioe.printStackTrace();
		}
		catch(SAXException saxe)
		{
			saxe.printStackTrace();
		}
		
		Element element = doc.getDocumentElement();
		
		//取过滤模式
		NodeList filterModeNodeList = doc.getElementsByTagName("filter-mode"); 
		String filterMode=filterModeNodeList.item(0).getFirstChild().getNodeValue();
		
		
		NodeList nodeList = doc.getElementsByTagName("cfg-filter-path");    
		System.out.println("book节点链的长度:" + nodeList.getLength());  
		String[] cfgFilterPaths=new String[nodeList.getLength()];
		for(int i=0;i<nodeList.getLength();i++)
		{
			Node noFilterPathNode=nodeList.item(i);
			NodeList paramsMap=noFilterPathNode.getChildNodes();

			Node pathNode=paramsMap.item(1);

			System.out.println(pathNode.getNodeName()+":"+pathNode.getFirstChild().getNodeValue());
			Node despNode=paramsMap.item(3);

			System.out.println(despNode.getNodeName()+":"+despNode.getFirstChild().getNodeValue());
			cfgFilterPaths[i]=pathNode.getFirstChild().getNodeValue();
			//System.out.println("子节点名为:" + noFilterPathNode.getNodeName()    
			//		+ "相对应的值为" + noFilterPathNode.getFirstChild().getNodeValue());  
		}
		for(int i=0;i<cfgFilterPaths.length;i++)
		{
			System.out.println(cfgFilterPaths[i]);
		}
		sc.setAttribute("cfgFilterPaths", cfgFilterPaths);
		sc.setAttribute("filterMode", filterMode);
	}

}
