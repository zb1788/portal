package zzvcom.util;

import java.io.*;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.log4j.Logger;

import vcom.sso.vo.AuthResult;
import vcom.sso.vo.SysModule;
import vcom.sso.vo.UserAuthority;
import zzvcom.entity.TreeForm;

/**
 * 本文件静态属性均为全局或者主域配置
 * @author Administrator
 *
 */
public class Common {
	static Logger logger = Logger.getLogger(Common.class);
	
	//当前配置加载时间
	private static Date catcheDate = null;
	//配置自动重加载时长(毫秒)
	private static long catcheTime = 600000;
	//优教通权各个系统地址配置
	private static Properties sysConfig=new Properties(); 
	//门户系统参数配置
	private static Properties portalConfig=new Properties();
	//门户系统参数配置
	private static Properties interfaceConfig=new Properties();
	//门户模板参数配置
	private static Properties portal_moduleConfig = new Properties();
	//系统配置组装js字符串缓存
	private static String configJsonCache=null;
	//用户session名称
	public static String usersessionname="authResult";
	//上级域,sso认证，跨域js调用
	private static String domain="czbanbantong.com";
	//接口调度vpn地址
	private static String vcom3dskey=null;
	//是否显示升级公告
	private static String showupdate="0";
	//是否显示授课升级公告
	private static String showSkUpdate="";
	//授课升级提示信息
	private static String skTip="";
	//是否显示升级公告
	private static String updateinfo="";
	private static String portal_config_path="/etc/vcom/portal_config.properties";
	private static String interface_config_path="/etc/vcom/yjt_interface.properties";
	private static String portal_moudle_path="/etc/vcom/portal_module_config.properties";
	//是否绑定手机发送
	private static String boundphone=null;
	//启动验证的角色类型
	private static String phoneusertype=null;
	private static String vsms_platUser=null;
	private static String vsms_platPwd=null;
	private static String vsms_content=null;
	//短信验证时长
	private static String vsms_day=null;
	//不限制重复登陆的用户
	private static String notcheckuser="";
	//重复登录检查时间
	private static String repeatCheckTime=null;
	//支付类型
	private static String paytype=null;
	//欠费提示控制 0屏蔽，1开启
	private static String payalert="1";
	//论坛id
	private static String bbsid="";
	//静态化用户应用权限
	private static HashMap<String, List> rolePer=new HashMap<String, List>();
	//当前门户areacode
	private static String areacode=null;
	//搜索关键词
	private static String seokey="";
	//默认关键词
	public static String DEFAULT_SEO_KEY="人人通";
	//地区名
	private static String areaname="";
	//地区map(暂时没用到)
	private static Map<String, String> areamap=new HashMap<String, String>();
	//扩展配置
	private static String otherConfig="";
	//是否检测多用户登录
	private static String 	repeatUsertype="";
	//是否开启免费提醒和未绑定手机号提醒
	private static String 	alerttype="";
	//是否开启用户关联 1-是,0-否
	private static String 	associate="";
	//订购提示信息
	private static String 	areamessage="";
	//订购业务发送编码
	private static String 	areaphonenumber="";
	//系统配置中的临时验证码次数
	private static Integer tempCodeCount=0;
	//配置管理登陆密码
	private static String tail_param="";
	//登陆页面显示注册按钮
	private static String showRegedit="0";
	//论坛系统地址
	private static String bbsurl="";
	//用户中心的服务器信息.
	private static String userCenterUrl="";
	//Cms服务器地址
	private static String cmsUrl="";
	//个人空间地址
	private static String mCenter="";
	//资源应用地址
	private static String pls="";
	//全国负载地址
	private static String balanceUrl="";
	//登录后是否显示引导 0-否  1-是
    private static String showguide;
    //教师首页引导链接
    private static String teachUrl;
    //家长登首页导链接
    private static String parentUrl;
    //小学生首页引导链接
    private static String pupilUrl;
    //初高中生首页引导链接
    private static String seniorUrl;
    //共建平台配置
    private static String gjptpz;
    //主域logo
    private static String logo;
    //主域module
    private static String module;
    //主域首页logo
    private static String indexlogo;
    //通用配置map
    private static Map<String,Map<String, Map<String, String>>> mapConfig = new HashMap<String, Map<String,Map<String,String>>>();
    //别名支持map
    private static Map<String,String> aliasConfig = new HashMap<String,String>();
    //Common配置map
    //private static Map<String,Map<String, Common> commonMap = new HashMap<String, Common>();
    
    public static Map<String,String> LOGIN_TEMPLET =new HashMap<String,String>();

    public static String UICONFIG_FILE="/uiconfig.xml";
    
    public static String PROTOCOL="http://";
    public static String PROTOCOL_IP="http://";
    
    private static String channelJson;
    private static Long channelGetTime;
    
    /**
     * 获取栏目Json数据
     * @param servername
     * @return
     */
    public static String getChannelJson(String servername) {
    	//(300000ms)5分钟刷新
    	if(channelGetTime==null || channelJson==null || channelJson.trim().length()==0 || channelGetTime>300000) {
        	String channelUrl=getInterfaceUrl(servername,"CMS_IP","CMS.JSON.CHANNEL");
        	logger.debug("[CHANNEL JSON URL] get ChannelJsonDateUrl:"+channelUrl);
    		channelJson=HttpUtil.readURLByCharset(channelUrl,null,"utf-8",5000);
        	logger.debug("[CHANNEL JSON DATA] get ChannelJsonDate:"+channelJson);
    		channelGetTime=new Date().getTime();
    	}
    	return channelJson;
    }
    
    
    
    /**
     * 返回全局配置Map
     * @return
     */
    public static Map<String,Map<String, Map<String, String>>> getConfigMap(){
    	init();
    	return mapConfig;
    }
    
    /**
     * @description：初始化，读取通用配置文件，若存在共建平台各平台一份通用配置存入map中
     * @time： 2016-5-13
     * @return 
     */
    private static void init(){
        if(catcheDate!=null && (new Date().getTime()-catcheDate.getTime())>catcheTime){
            catcheDate=null;
        }
        if(catcheDate==null){
        	Map<String,Map<String, Map<String, String>>> configTemp = new HashMap<String,Map<String, Map<String, String>>>();
        	HashMap<String,String> aliasTemp = new HashMap<String,String>();
            //读取系统配置
            InputStream pfi=null;
            try {
                pfi = new FileInputStream(new File("/etc/vcom/yjtconfig.properties"));
                sysConfig.load(pfi);
            } catch (IOException e) {
                e.printStackTrace();
            }finally{
                if(pfi!=null){
                    try {
                        pfi.close();
                        pfi=null;
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            //读取接口配置
            InputStream pi=null;
            try {
                pi = new FileInputStream(new File(interface_config_path));
                interfaceConfig.load(pi);
            } catch (IOException e) {
                e.printStackTrace();
            }finally{
                if(pi!=null){
                    try {
                        pi.close();
                        pi=null;
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            //读取门户配置
            try {
                pi = new FileInputStream(new File(portal_config_path));
                portalConfig.load(pi);
            } catch (IOException e) {
                e.printStackTrace();
            }finally{
                if(pi!=null){
                    try {
                        pi.close();
                        pi=null;
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            try {
                pi = new FileInputStream(new File(portal_moudle_path));
                portal_moduleConfig.load(pi);
            } catch (IOException e) {
                e.printStackTrace();
            }finally{
                if(pi!=null){
                    try {
                        pi.close();
                        pi=null;
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            
            if(sysConfig.getProperty("LOCAL_PROTOCOL")!=null && sysConfig.getProperty("LOCAL_PROTOCOL").trim().length()>4){
            	PROTOCOL=sysConfig.getProperty("LOCAL_PROTOCOL")+"://";
            }
            //配置mapConfig默认映射
            Map<String, String> map_sys = new HashMap<String, String>((Map) sysConfig);
            Map<String, String> map_interface = new HashMap<String, String>((Map) interfaceConfig);
            Map<String, String> map_portal = new HashMap<String, String>((Map) portalConfig);
            Map<String, String> map_module = new HashMap<String, String>((Map) portal_moduleConfig);
            Map<String, Map<String, String>> map = new HashMap<String, Map<String,String>>();
            
            if(map_portal.get("interfaceConfigstr")!=null){
            	Properties temp = new Properties();
                InputStream tin = new ByteArrayInputStream (StringUtil.decode4utf8(String.valueOf(map_portal.get("interfaceConfigstr"))).getBytes());
                try {
                	temp.load(tin);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                try {
					tin.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	            Map<String, String> temp_map = new HashMap<String, String>((Map) temp);
				map_interface.putAll(temp_map);
            }
            
            //初始化Common默认配置
            initDefaultConfig(map_portal);
            
            map.put("map_sys", map_sys);
            map.put("map_interface", map_interface);
            map.put("map_portal", map_portal);
            map.put("map_module", map_module);
            
            //缓存登陆模板静态页面内容
            Iterator iter = map_module.entrySet().iterator();
            while (iter.hasNext()) {
            	Map.Entry entry = (Map.Entry)iter.next();
            	String akey = (String)entry.getKey();
            	String templet_path = (String)entry.getValue();
            	if(Common.class.getClassLoader().getResource(Common.UICONFIG_FILE)==null){
            		break;
            	}
            	String ps=Common.class.getClassLoader().getResource(Common.UICONFIG_FILE).getPath();
            	ps = ps.substring(0,ps.indexOf("WEB-INF"));

            	InputStream is=null;
				try {
					is = new FileInputStream(new File(ps+templet_path));
				} catch (FileNotFoundException e1) {
					// TODO Auto-generated catch block
					logger.error(e1.getMessage());
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
						LOGIN_TEMPLET.put(templet_path,sbf.toString());
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
            	}else{
            		//map_module.remove(akey);
            		logger.error(" [MODULE CONFIG ERROR]   key:"+akey+" path:"+templet_path+" file not find!");
            	}
            }
            
			//缓存对应配置js对象
            Map<String, String> jsonmap = new HashMap<String, String>();
			JSONObject sysjsobj= net.sf.json.JSONObject.fromObject(map_sys, new JsonConfig());
			String sysJsonCache = "var sysconfig="+sysjsobj+";";
			jsonmap.put("sysConfigs", sysJsonCache);
			sysjsobj=null;
			JSONObject interfaceobj= net.sf.json.JSONObject.fromObject(map_interface, new JsonConfig());
			String interfaceJsonCache = "var interface_config="+interfaceobj+";";
			jsonmap.put("interfaceConfigs", interfaceJsonCache);
			interfaceobj=null;
			JSONObject portalobj= net.sf.json.JSONObject.fromObject(map_portal, new JsonConfig());
			String parmJsonCache = "var portal_config="+portalobj+";";
			jsonmap.put("portalConfigs", parmJsonCache);
			portalobj=null;
			JSONObject modulejsobj= net.sf.json.JSONObject.fromObject(map_module, new JsonConfig());
			String moduleJsonCache = "var moduleconfig="+modulejsobj+";";
			jsonmap.put("moduleConfigs", moduleJsonCache);
			modulejsobj=null;
            map.put("map_json", jsonmap);

        	configTemp.put("default", map);
            
            
            //若存在共建平台设置，根据传递进来的域名，对该域名下设置的系统、接口配置进行解析
            String gjptpz = map_portal.get("gjptpz");
            try {
                if(gjptpz!=null && gjptpz.length()>0){
                    //若共建平台配置有对应接口文件，则读取接口文件配置部分覆盖对应默认接口文件中配置的部分
                    JSONObject pz = JSONObject.fromObject(gjptpz);
                    for(Iterator iterator = pz.keys();iterator.hasNext();){
                        String mdomain = iterator.next().toString();//子地区域名
                        JSONObject zpz =JSONObject.fromObject(String.valueOf(pz.get(mdomain)).replace("[","").replace("]",""));
                        Properties zportalconfig = new Properties();
                        Properties zsysConfig = new Properties();
                        Properties zinterfaceConfig = new Properties();
                        zportalconfig.put("module", StringUtil.getStrFromNull((String)zpz.get("module")));
                        zportalconfig.put("logo", StringUtil.getStrFromNull((String)zpz.get("logo")));
                        zportalconfig.put("indexlogo", StringUtil.getStrFromNull((String)zpz.get("indexlogo")));
                        zportalconfig.put("areaname", StringUtil.getStrFromNull((String)zpz.get("areaname")));
                        zportalconfig.put("areacode", StringUtil.getStrFromNull((String)zpz.get("areacode")));
                        zportalconfig.put("seokey", StringUtil.getStrFromNull((String)zpz.get("seokey")));
                        zportalconfig.put("icoimg", StringUtil.getStrFromNull((String)zpz.get("icoimg")));
                        String otherConfigJs = StringUtil.getStrFromNull((String)zpz.get("otherConfigs"));
						if(otherConfigJs!=null){
							otherConfigJs=java.net.URLDecoder.decode(otherConfigJs, "UTF-8");
							otherConfigJs=java.net.URLDecoder.decode(otherConfigJs, "UTF-8");
						}
                        zportalconfig.put("otherConfig", otherConfigJs);
                        zportalconfig.put("spacedir", StringUtil.getStrFromNull((String)zpz.get("spacedir")));
                        zportalconfig.put("showindex", StringUtil.getStrFromNull((String)zpz.get("showindex")));
                        zportalconfig.put("ubName", StringUtil.getStrFromNull((String)zpz.get("ubName")));
                        if(zpz.get("sysConfigs")!=null){
                        	InputStream isys = new ByteArrayInputStream (StringUtil.decode4utf8(String.valueOf(zpz.get("sysConfigs"))).getBytes());
                        	 try {
                                 zsysConfig.load(isys);
                                 isys.close();
                             } catch (IOException e) {
                                 e.printStackTrace();
                             }
                        }
                        if(zpz.get("interfaceConfigs")!=null){
	                        InputStream iinterface = new ByteArrayInputStream (StringUtil.decode4utf8(String.valueOf(zpz.get("interfaceConfigs"))).getBytes());
	                        try {
	                            zinterfaceConfig.load(iinterface);
		                        iinterface.close();
	                        } catch (IOException e) {
	                            e.printStackTrace();
	                        }
                        }
                        //properties实现了Map接口，可强制转换成Map<String,String>
                        Map<String, String> zsys = new HashMap<String, String>((Map) zsysConfig);
                        Map<String, String> zinterface = new HashMap<String, String>((Map) zinterfaceConfig);
                        Map<String, String> zportal = new HashMap<String, String>((Map) zportalconfig);
                        //拷贝默认配置
                        Map<String, String> zmap_sys = new HashMap<String, String>();
                        zmap_sys.putAll(map_sys);
                        Map<String, String> zmap_interface = new HashMap<String, String>();
                        zmap_interface.putAll(map_interface);
                        Map<String, String> zmap_portal = new HashMap<String, String>();
                        zmap_portal.putAll(map_portal);
                        //覆盖相同的配置
                        zmap_sys.putAll(zsys);
                        zmap_interface.putAll(zinterface);
                        zmap_portal.putAll(zportal);
                        Map<String, Map<String, String>> zmap = new HashMap<String, Map<String,String>>();

            			//缓存对应配置js对象
                        Map<String, String> zmap_json = new HashMap<String, String>();
            			JSONObject zsyso= net.sf.json.JSONObject.fromObject(zmap_sys, new JsonConfig());
            			String zsysjson = "var sysconfig="+zsyso+";";
            			zmap_json.put("sysConfigs", zsysjson);
            			sysjsobj=null;
            			JSONObject zinterfaceo= net.sf.json.JSONObject.fromObject(zmap_interface, new JsonConfig());
            			String zinterfacejson = "var interface_config="+zinterfaceo+";";
            			zmap_json.put("interfaceConfigs", zinterfacejson);
            			interfaceobj=null;
            			JSONObject zportalo= net.sf.json.JSONObject.fromObject(zmap_portal, new JsonConfig());
            			String zparmjson = "var portal_config="+zportalo+";";
            			zmap_json.put("portalConfigs", zparmjson);
            			portalobj=null;
            			//模板直接用全局的。
            			zmap_json.put("moduleConfigs", moduleJsonCache);

                        zmap.put("map_sys", zmap_sys);
                        zmap.put("map_interface", zmap_interface);
                        zmap.put("map_portal", zmap_portal);
                        zmap.put("map_json", zmap_json);
            			//模板直接用全局的。
                        zmap.put("map_module", map_module);
                        
                        configTemp.put(mdomain.replaceAll("\\_", "\\."), zmap);
                        String talias = (String)zpz.get("alias");//子域支持别名处理
                        try{
	                        if(talias!=null && talias.trim().length()>0 && talias.indexOf(".")>0){
	                        	if(talias.indexOf(",")>0){
	                        		//多别名配置英文逗号分割
	                        		String aliasarr[]=talias.split(",");
	                        		for(String aalias:aliasarr){
	                        			aliasTemp.put(aalias, mdomain.replaceAll("\\_", "\\."));
	                        		}
	                        	}else{
	                        		//单别名无逗号
	                        		aliasTemp.put(talias, mdomain.replaceAll("\\_", "\\."));
	                        	}
	                        }
                        }catch(Exception e){
                        	e.printStackTrace();
                        }
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
			//重新获取配置，清除原有配置数据，替换处理，避免脏读，获取到处理中的数据.
        	mapConfig = configTemp;
        	aliasConfig = aliasTemp;
        	
            catcheDate=new Date();
        }
    }

	/**
	 * 初始化默认配置
	 * @param defaultmap 默认配置的初始化map
	 */
	public static void initDefaultConfig(Map<String, String> map_portalconfig){
			Common.bbsid = map_portalconfig.get("bbsid");
			Common.vcom3dskey = map_portalconfig.get("vcom3dskey");
			Common.boundphone = map_portalconfig.get("boundphone");
			Common.vsms_platUser = map_portalconfig.get("vsms_platUser");
			Common.vsms_platPwd = map_portalconfig.get("vsms_platUser");
			Common.phoneusertype = map_portalconfig.get("phoneusertype");
			Common.vsms_content = map_portalconfig.get("vsms_content");
			Common.vsms_day = map_portalconfig.get("vsms_day");
			if(map_portalconfig.get("domain")!=null && map_portalconfig.get("domain").length()>0){
				Common.domain =  map_portalconfig.get("domain");
			}
			Common.repeatCheckTime = map_portalconfig.get("repeatCheckTime");
			Common.tempCodeCount = Integer.parseInt(map_portalconfig.get("tempCodeCount")!=null?map_portalconfig.get("tempCodeCount"):"0");
			Common.paytype = map_portalconfig.get("paytype");
			Common.areaname = map_portalconfig.get("areaname");
			Common.areacode = map_portalconfig.get("areacode");
			Common.otherConfig = map_portalconfig.get("otherConfig");
			Common.balanceUrl = map_portalconfig.get("balanceUrl");
			//不验证重复登录的用户
			Common.notcheckuser = map_portalconfig.get("notcheckuser");
			//后台登陆密码
			Common.tail_param=map_portalconfig.get("tail_param");
			
			//是否加入引导
			if(map_portalconfig.get("showguide")!=null && map_portalconfig.get("showguide").length()>0){
			    Common.showguide = map_portalconfig.get("showguide");
            }else{
                Common.showguide = "";
            }
			if(map_portalconfig.get("teachUrl")!=null && map_portalconfig.get("teachUrl").length()>0){
			    Common.teachUrl = map_portalconfig.get("teachUrl");
            }else{
                Common.teachUrl = "";
            }
			if(map_portalconfig.get("parentUrl")!=null && map_portalconfig.get("parentUrl").length()>0){
			    Common.parentUrl = map_portalconfig.get("parentUrl");
            }else{
                Common.parentUrl = "";
            }
			if(map_portalconfig.get("pupilUrl")!=null && map_portalconfig.get("pupilUrl").length()>0){
			    Common.pupilUrl = map_portalconfig.get("pupilUrl");
            }else{
                Common.pupilUrl = "";
            }
			if(map_portalconfig.get("seniorUrl")!=null && map_portalconfig.get("seniorUrl").length()>0){
			    Common.seniorUrl = map_portalconfig.get("seniorUrl");
            }else{
                Common.seniorUrl = "";
            }
			
			if(map_portalconfig.get("showupdate")!=null && map_portalconfig.get("showupdate").length()>0){
				Common.showupdate = map_portalconfig.get("showupdate");
			}
			if(map_portalconfig.get("updateinfo")!=null && map_portalconfig.get("updateinfo").length()>0){
				Common.updateinfo = map_portalconfig.get("updateinfo");
			}

			if(map_portalconfig.get("repeatUsertype")!=null && map_portalconfig.get("repeatUsertype").length()>0){
				Common.repeatUsertype = map_portalconfig.get("repeatUsertype");
			}
			//是否开启免费提醒和未绑定手机号提醒
			if(map_portalconfig.get("alerttype")!=null && map_portalconfig.get("alerttype").length()>0){
				Common.alerttype = map_portalconfig.get("alerttype");
			}
			//是否开启免费提醒和未绑定手机号提醒
			if(map_portalconfig.get("payalert")!=null && map_portalconfig.get("payalert").length()>0){
				Common.payalert = map_portalconfig.get("payalert");
			}
			//是否开启用户关联 1-是,0-否
			if(map_portalconfig.get("associate")!=null && map_portalconfig.get("associate").length()>0){
				Common.associate = map_portalconfig.get("associate");
			}
			//订购提示信息
			if(map_portalconfig.get("areamessage")!=null && map_portalconfig.get("areamessage").length()>0){
				Common.areamessage = map_portalconfig.get("areamessage");
			}else{
				Common.areamessage = "";
			}
			//订购业务发送编码
			if(map_portalconfig.get("areaphonenumber")!=null && map_portalconfig.get("areaphonenumber").length()>0){
				Common.areaphonenumber = map_portalconfig.get("areaphonenumber");
			}
			//系统配置中的临时验证码次数
			if(map_portalconfig.get("tempCodeCount")!=null && map_portalconfig.get("tempCodeCount").length()>0){
				try{
				Common.tempCodeCount = Integer.parseInt(map_portalconfig.get("tempCodeCount"));
				}catch(Exception e){}
			}
			//是否显示注册
			if(map_portalconfig.get("show_reg")!=null && map_portalconfig.get("show_reg").length()>0){
				try{
				Common.showRegedit = map_portalconfig.get("show_reg");
				}catch(Exception e){}
			}
			//是否显示授课升级信息
			if(map_portalconfig.get("showSkUpdate")!=null && map_portalconfig.get("showSkUpdate").length()>0){
                try{
                Common.showSkUpdate = map_portalconfig.get("showSkUpdate");
                }catch(Exception e){}
            }
			//授课升级提示，允许为空
			if(map_portalconfig.get("skTip")!=null){
                try{
                Common.skTip = map_portalconfig.get("skTip");
                }catch(Exception e){}
            }
			//登陆页logo
			if(map_portalconfig.get("logo")!=null && map_portalconfig.get("logo").length()>0){
                try{
                Common.logo = map_portalconfig.get("logo");
                }catch(Exception e){}
            }else{
                Common.logo = "";
            }
			//模板配置
			if(map_portalconfig.get("module")!=null && map_portalconfig.get("module").length()>0){
                try{
                Common.module = map_portalconfig.get("module");
                }catch(Exception e){}
            }else{
                Common.module ="";
            }
			//ub名称
			/*
			if(map_portalconfig.get("ubName")!=null && map_portalconfig.get("ubName").length()>0){
                try{
                Common.ubName = map_portalconfig.get("ubName");
                }catch(Exception e){}
            }else{
                Common.ubName ="";
            }
            */
			//共建配置
			try{
				Common.gjptpz = StringUtil.getStrFromNull(map_portalconfig.get("gjptpz"));
	        }catch(Exception e){}
	        //首页logo
			try{
                Common.indexlogo = StringUtil.getStrFromNull(map_portalconfig.get("indexlogo"));
            }catch(Exception e){}
			//搜索关键词
            Common.seokey = StringUtil.getStrFromNull(map_portalconfig.get("seokey"));
			//http|https页面协议配置
			/*
			if(map_portalconfig.get("protocol")!=null && map_portalconfig.get("protocol").length()>0){
                try{
                Common.PROTOCOL = map_portalconfig.get("protocol");
                }catch(Exception e){}
            }
			*/
	}

	/**
	 * 强制重新加载配置文件数据
	 */
	public static void reload(){
		catcheDate=null;
		init();
	}
	
	/**
     * @description：根据当前域名返回该域名配置整合map
     * @time： 2016-3-25
     * @author：donghaoyu
     * @param serverName	当前域名
     * @return 
     */
    public static Map<String,String> initProperties(String serverName){
    	Common.init();
        Map<String, String> propertiesMap = new HashMap<String, String>();
        Map<String, Map<String, String>> map = getConfigMap().get(serverName);
        if(map==null){//表明不存在此域名的配置
        	//检查是否别名
            String domain=zzvcom.util.Common.checkAlias(serverName);
            if(domain!=null){
            	map = getConfigMap().get(domain);
            }
            //没有任何对应的别名及域名配置则使用默认配置
            if(map==null){
            	map = getConfigMap().get("default");
            }
        }
        Map<String, String> map_sys = map.get("map_sys");
        Map<String, String> map_interface = map.get("map_interface");
        Map<String, String> map_portal = map.get("map_portal");
        Map<String, String> map_module = map.get("map_module");
        propertiesMap.putAll(map_sys);
        propertiesMap.putAll(map_interface);
        propertiesMap.putAll(map_portal);
        propertiesMap.putAll(map_module);
        return propertiesMap;
    }
    
    /**
     * @description：检查是否匹配别名
     * @time： 2016-5-13
     * @author：changhuanglin
     * @param adomain	当前域名
     * @return 对应子域名或者null
     */
    public static String checkAlias(String adomain){
    	Common.init();
    	//如果存在非别名配置则按照无别名处理,避免无限循环
    	if(getConfigMap().get(adomain)!=null){
    		return null;
    	}
    	String mdomain=aliasConfig.get(adomain);//对应子域名
    	if(mdomain!=null && mdomain.trim().length()>0){
    		return mdomain;
    	}
    	mdomain=null;
    	return null;
    }
	
	/**
	 * 获得系统配置js
	 * @return
	 */
	public static String toJson(String servername){
		Map<String, Map<String, String>> map = getConfigMap().get(servername);
		if(map==null){//表明不存在此域名的配置
        	//检查是否别名
            String domain=zzvcom.util.Common.checkAlias(servername);
            if(domain!=null){
            	map = getConfigMap().get(domain);
            }
            //没有任何对应的别名及域名配置则使用默认配置
            if(map==null){
            	map = getConfigMap().get("default");
            }
        }
        Map<String, String> jsonmap = map.get("map_json");
        if(jsonmap!=null){
        	String protalConfigStr=jsonmap.get("portalConfigs");
        	protalConfigStr=protalConfigStr.replaceAll(",\"tail_param\":\".?\"", "");
        	String jsonstr = jsonmap.get("sysConfigs")+"\r\n"+jsonmap.get("interfaceConfigs")+"\r\n"+protalConfigStr+"\r\n"+jsonmap.get("moduleConfigs");
        	return jsonstr;
        }
        return "";
	}

	/**
     * 获得接口地址方法
     * @param sysCode
     * @param interfaceCode
     * @return
     */
    public static String getInterfaceUrl(String servername,String sysCode,String interfaceCode){
        Map<String, String> map = Common.initProperties(servername);
        String sys = map.get(sysCode);
        String inter = map.get(interfaceCode);
        if(
                sys!=null && inter!=null &&
                sys.trim().length()>0 && inter.trim().length()>0
        ){
        	if(sysCode.endsWith("IP")){
        		return PROTOCOL_IP+sys+inter;
        	}else{
        		return PROTOCOL+sys+inter;
        	}
        }
        return null;
    }

/**
     * 根据系统标示获取系统地址配置
     * @param syscode 系统标示
     * @return 系统域名(未取到则为null)
     */
    public static String getSysUrl(String servername,String syscode){
        Map<String, String> map = Common.initProperties(servername);
        String sys = map.get(syscode);
        if(syscode!=null && sys!=null){
            return sys;
        }
        return null;
    }

    /**
     * @description：根据接口标识获取系统接口配置
     * @time： 2016-3-16
     * @author：donghaoyu
     * @param interfaceCode
     * @return 
     */
    public static String getInterfaceConfig(String servername,String interfaceCode){
        Map<String, String> map = Common.initProperties(servername);
        String inter = map.get(interfaceCode);
        if(interfaceCode!=null && inter!=null){
            return inter;
        }
        return null;
    }

	/**
	 * 获取session用户信息
	 * @return
	 */
	public static AuthResult getSessiongUser(HttpServletRequest request){
		AuthResult authResult=(AuthResult)request.getSession().getAttribute(Common.usersessionname);
		return authResult;
	}
	/**
	 * 供后台管理读取图片列表选择用
	 * @param apath web根目录下相对路径，不以/开始
	 * @return
	 */
	public static String[] getWebFileNameList(String apath){
		String ps=Common.class.getClassLoader().getResource(Common.UICONFIG_FILE).getPath();
    	ps = ps.substring(0,ps.indexOf("WEB-INF"));
    	String[] rarr=null;
    	try{
    	rarr=new File(ps+apath).list();
    	}catch(Exception e){
    		e.printStackTrace();
    	}
    	return rarr;
	}
	/**
	 * 组织用户权限为树结构
	 * @param oa 栏目集合数组
	 * @param filterChannId 过滤栏目集合 -- 门户22  ,管理员28 (21，23废弃)
	 * @param paramMap		用户参数Map
	 * @param configMap     系统参数Map
	 * @param appNumbersNoGrant 权限过滤列表
	 * @return
	 */
	public static List<TreeForm> changetoList(Object[] oa,String filterChannId,Map<String,String> paramMap,Map<String,String> configMap,ArrayList<String> appNumbersNoGrant){
		SysModule[] modellist=null;
		for(Object o : oa) {
			modellist=((UserAuthority)o).getModules();
			if(modellist.length>1) {
				if(modellist[0].getModuleid()!=null && modellist[0].getModuleid().startsWith(filterChannId)  
						&& modellist[1].getModuleid()!=null && modellist[1].getModuleid().startsWith(filterChannId)) {
					break;
				}else {
					modellist=null;
				}
			}
		}
		if(modellist==null) {
			return null;
		}
		List<TreeForm> treelist=new ArrayList<TreeForm>();
		//全写入treelist
		for (SysModule sysModule : modellist) {
		    Boolean sfxs = true;
		    /*
		              变更原因：
                                          由于此次策划需要将考试专题下小升初 /中考 /高考放在门户栏目中，这里需要按学段展示，门户module表中已没有可用的扩展字段，因此将c4扩展字段改为json形式存储，
                                          目前暂配数据有areaid 如：{"areaid":"4,1.1"} schoolstage 如：{"schoolstage":"0001"} 字段内多值都是以逗号隔开
                                         程序中处理：
                                         如c4不为空
                                         如果里面包含areaid，则用当前用户的区域id与其比较，包含则展示，否则不展示
                                         如果里面包含noareaid，则用当前用户的区域id与其比较，包含则展示，否则不展示
									如果里面包含inareaid
									如果里面包含noinareaid
									如果里面包含schoolId
									如果里面包含noschoolId
                                         如果里面包含schoolstage ，则用当前用户的学段与其比较，包含则展示，否则不展示
		     */
		    
		    JSONObject c4Json = null;
		    //如果格式异常，按默认处理
		    if(!StringUtil.isBlank(sysModule.getC4())){
		    	try{
		    		c4Json = JSONObject.fromObject(sysModule.getC4());
		    	}catch(Exception e){
		    		logger.error("[[ERROR]]:::::: !!!!!!!!!!!!!! C4 VALUE ERROR !!!!!!!!!!!!!!! ::::::[[ERROR]]");
		    		if(sysModule!=null && sysModule.getModuleid()!=null){
		    			logger.error("!!!!!!!!!!!!!! C4 VALUE FORMAT ERROR !!!!!!!!!!!!!!! ====  FormatJson ERROR: sysmoduleid:"+sysModule.getModuleid());
		    		}
		    	}
		    }
		    if(c4Json!=null){
		        if( c4Json.containsKey("schoolstage")){//若当前角色包含多学段且扩展字段c4中维护的有学段
		        	if(StringUtil.isBlank(paramMap.get("schoolStage"))){
		        		sfxs = false;
		        	}else if(!StringUtil.isBlank(c4Json.get("schoolstage").toString())){
		        		//for(c4Json.containsKey("schoolstage").toString().)
			            if(paramMap.get("schoolStage").length()>c4Json.get("schoolstage").toString().length()){
		                    if((","+paramMap.get("schoolStage")+",").indexOf(","+c4Json.get("schoolstage").toString()+",")==-1){
		                        sfxs = false;
		                    } 
		                }else{
		                    if((","+c4Json.get("schoolstage").toString()+",").indexOf(","+paramMap.get("schoolStage")+",")==-1){
		                        sfxs = false;
		                    }
		                }
		        	}
		        }
		        if( c4Json.containsKey("noschoolstage")){ //若当前角色包含多学段且扩展字段c4中维护的有学段
                    if(paramMap.get("schoolStage").length()>c4Json.get("noschoolstage").toString().length()){
                        if((","+paramMap.get("schoolStage")+",").indexOf(","+c4Json.get("noschoolstage").toString()+",")!=-1){
                            sfxs = false;
                        } 
                    }else{
                        if((","+c4Json.get("noschoolstage").toString()+",").indexOf(","+paramMap.get("schoolStage")+",")!=-1){
                            sfxs = false;
                        }
                    }
                }
		        //等于地区
		        if(c4Json.containsKey("areaid")){
		        	if(paramMap.get("userAreaId")!=null && paramMap.get("userAreaId").length()>0){
	                    if((","+c4Json.get("areaid").toString()+",").indexOf(","+paramMap.get("userAreaId")+",")==-1){
	                        sfxs = false;
	                    }
		        	}
		        }
		        //不等于地区
		        if(c4Json.containsKey("noareaid")){//维护不显示地区的则不显示该栏目
		        	if(paramMap.get("userAreaId")!=null && paramMap.get("userAreaId").length()>0){
	                    if((","+c4Json.get("noareaid").toString()+",").indexOf(","+paramMap.get("userAreaId")+",")!=-1){
	                        sfxs = false;
	                    }
		        	}
		        }
		        //包含在地区中
		        if(c4Json.containsKey("inareaid")){
		            if(paramMap.get("userAreaId").length()>0 && c4Json.get("inareaid")!=null && c4Json.get("inareaid").toString().length()>0){
		            	//检查是否包含
		            	if(!checkAreaIdContains(c4Json.get("inareaid").toString(),paramMap.get("userAreaId"))){
		            		sfxs = false;
		            	}
	                }
		        }
		        //不包含在某地区下
		        if(c4Json.containsKey("noinareaid")){
		            if(paramMap.get("userAreaId").length()>0 && c4Json.get("noinareaid")!=null && c4Json.get("noinareaid").toString().length()>0){
		            	//检查是否包含
		            	if(checkAreaIdContains(c4Json.get("noinareaid").toString(),paramMap.get("userAreaId"))){
		            		sfxs = false;
		            	}
	                }
		        }
		        //某学校显示
		        if(c4Json.containsKey("schoolId")){
		            if(paramMap.get("schoolId").length()>0 && c4Json.get("schoolId")!=null && c4Json.get("schoolId").toString().length()>0){
		            	//不包含不显示
		            	if((","+c4Json.get("schoolId").toString()+",").indexOf(","+paramMap.get("schoolId")+",")==-1){
		            		sfxs = false;
		            	}
	                }
		        }
		        //某学校之外显示
		        if(c4Json.containsKey("noschoolId")){
		            if(paramMap.get("schoolId").length()>0 && c4Json.get("noschoolId")!=null && c4Json.get("noschoolId").toString().length()>0){
		            	//检查是否包含
		            	if((","+c4Json.get("noschoolId").toString()+",").indexOf(","+paramMap.get("schoolId")+",")!=-1){
		            		sfxs = false;
		            	}
	                }
		        }
		    }
		    //如果存在鉴权信息则校验
		    if(appNumbersNoGrant.size()>0){
		        boolean xzfw = appNumbersNoGrant.contains("portalmenu_"+sysModule.getModuleid().replaceAll("\\.", "_"));
		        if(xzfw){
		            sfxs = false;
		        }
		    }
		    //c2年级过滤处理，针对学生过滤年级
		    if(!"2".equals(paramMap.get("usertype")) && !"3".equals(paramMap.get("usertype")) && sysModule.getC2()!=null && sysModule.getC2().trim().length()>0) {
		    	if(paramMap.get("eduAndGrade")==null || sysModule.getC2().indexOf(paramMap.get("eduAndGrade"))==-1) {
		    		sfxs = false;
			    }
		    }
		    if(sfxs){
		        TreeForm tree=new TreeForm();
	            tree.setId(sysModule.getModuleid().replaceAll("\\.", "_"));
	            tree.setText(sysModule.getModulename());
	            tree.setParentid(sysModule.getParentid().replaceAll("\\.", "_"));
	            tree.setIcon(sysModule.getMoveinpic());
	            tree.setIcon2(sysModule.getMoveoutpic());
	            tree.setHref(sysModule.getModuleurl());
	            //针对https/http切换的处理类型，默认空，随访问协议变更。1为强制http不做端口处理
	            String protocoltype=null;
	            String portocol="//";
	            String opentype="1";//如果出现异常，默认1
	            //新扩展方式配置
	            if(sysModule.getC1().indexOf("{")>-1){
	            	try{
	            	JSONObject c1Json = JSONObject.fromObject(sysModule.getC1());
	            	if(c1Json!=null && c1Json.containsKey("opentype")){
		            	tree.setOpentype(c1Json.getString("opentype"));
	            		opentype=c1Json.getString("opentype");
	            	}
	            	if(c1Json!=null && c1Json.containsKey("ptype")){
	            		protocoltype=c1Json.getString("ptype");
	            	}
	            	}catch(Exception e){
	            		e.printStackTrace();
	            	}
	            }else{
	            	tree.setOpentype(sysModule.getC1());
	            	opentype=sysModule.getC1();
	            }
	            if("1".equals(protocoltype)){
	            	portocol="http://";
	            }
	            String tempUrl=null;
	            
	            //加入c3配置系统域名
	            if(sysModule.getC3()!=null && configMap.get(sysModule.getC3().trim())!=null && ( "1".equals(opentype) || "2".equals(opentype) ) ){
	                tempUrl=portocol+configMap.get(sysModule.getC3().trim())+sysModule.getModuleurl();
	            }else{
	                tempUrl=sysModule.getModuleurl();
	            }
	            /*
	                                处理可选参数
	            $username$
	            $usertype$
	            $schoolStage$
	            $schoolName$
	            $defaultStage$
	            $schoolId$
	            $gradeCode$
	            $classId$
	            $studentId$
	            $areaCode$
	            $regFlg$
	            $SchoolAreaCode$
	            $telNumber$
	            $trueName$
	            $yjtURL.系统标示$
	            */
	            if(tempUrl!=null){
	                int counter=0;
	                //$yjtURL.系统标示$正则
	                String regEx = "\\$yjtURL\\.[a-zA-Z\\_]{2,20}\\$";
	                Pattern pattern = Pattern.compile(regEx);   
	                Matcher match = pattern.matcher(tempUrl);
	                while(match.find()){
	                    String tempsys=match.group(0);
	                    if(counter>15){
	                        //防止死循环
	                        break;
	                    }
	                    if(tempsys.length()>9){
	                        String sys=tempsys.substring(8,tempsys.length()-1);
	                        if(null!=configMap.get(sys)){
	                        	tempUrl=tempUrl.replace(tempsys,configMap.get(sys));
	                        }
	                    }
	                    counter++;
	                }

	                //$yjtURL.系统标示$正则
	                regEx = "\\$yjtURL_enc\\.[a-zA-Z\\_]{2,20}\\$";
	                pattern = Pattern.compile(regEx);   
	                match = pattern.matcher(tempUrl);
	                while(match.find()){
	                    String tempsys=match.group(0);
	                    if(counter>15){
	                        //防止死循环
	                        break;
	                    }
	                    if(tempsys.length()>9){
	                        String sys=tempsys.substring(12,tempsys.length()-1);
	                        if(null!=configMap.get(sys)){
								try {
									String syscode = URLEncoder.encode(configMap.get(sys),"UTF-8");
		                        	tempUrl=tempUrl.replace(tempsys,syscode);
								} catch (UnsupportedEncodingException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
									tempUrl=tempUrl.replace(tempsys,configMap.get(sys));
								}
	                        }
	                    }
	                    counter++;
	                }
	                
	                if(tempUrl.indexOf("$areaCode$")>-1){
	                    tempUrl=tempUrl.replaceAll("\\$areaCode\\$", StringUtil.getStrFromNull(paramMap.get("areaCode")));
	                }
	                if(tempUrl.indexOf("$userAreaId$")>-1){
                        tempUrl=tempUrl.replaceAll("\\$userAreaId\\$", StringUtil.getStrFromNull(paramMap.get("userAreaId")));
                    }
	                if(tempUrl.indexOf("$username$")>-1){
	                    tempUrl=tempUrl.replaceAll("\\$username\\$", portalEncode(StringUtil.getStrFromNull(paramMap.get("username"))));
	                }
	                if(tempUrl.indexOf("$usertype$")>-1){
	                    tempUrl=tempUrl.replaceAll("\\$usertype\\$", StringUtil.getStrFromNull(paramMap.get("usertype")));
	                }
	                if(tempUrl.indexOf("SchoolAreaCode$")>-1){
	                    tempUrl=tempUrl.replaceAll("\\$SchoolAreaCode\\$", StringUtil.getStrFromNull(paramMap.get("SchoolAreaCode")));
	                }
	                if(tempUrl.indexOf("$schoolName$")>-1){
                        tempUrl=tempUrl.replaceAll("\\$schoolName\\$", StringUtil.getStrFromNull(paramMap.get("schoolName")));
                    }
	                if(tempUrl.indexOf("$schoolStage$")>-1){
	                    tempUrl=tempUrl.replaceAll("\\$schoolStage\\$", StringUtil.getStrFromNull(paramMap.get("schoolStage")));
	                }
	                if(tempUrl.indexOf("$defaultStage$")>-1){
	                    String defaultStage = StringUtil.getStrFromNull(paramMap.get("schoolStage"));
	                    int stageIndex = StringUtil.getStrFromNull(paramMap.get("schoolStage")).indexOf(",");
	                    if(stageIndex>-1){
	                        defaultStage=defaultStage.substring(0,stageIndex);
	                    }
	                    tempUrl=tempUrl.replaceAll("\\$defaultStage\\$", defaultStage );
	                }
	                if(tempUrl.indexOf("$telNumber$")>-1){
	                    tempUrl=tempUrl.replaceAll("\\$telNumber\\$", StringUtil.getStrFromNull(paramMap.get("telNumber")));
	                }
	                if(tempUrl.indexOf("$trueName$")>-1){
	                    tempUrl=tempUrl.replaceAll("\\$trueName\\$", java.net.URLEncoder.encode(StringUtil.getStrFromNull(paramMap.get("trueName"))));
	                }
	                if(tempUrl.indexOf("$schoolId$")>-1){
	                    tempUrl=tempUrl.replaceAll("\\$schoolId\\$", StringUtil.getStrFromNull(paramMap.get("schoolId")));
	                }
	                if(tempUrl.indexOf("$gradeCode$")>-1){
	                    tempUrl=tempUrl.replaceAll("\\$gradeCode\\$", StringUtil.getStrFromNull(paramMap.get("gradeCode")));
	                }
	                if(tempUrl.indexOf("$classId$")>-1){
	                    tempUrl=tempUrl.replaceAll("\\$classId\\$", StringUtil.getStrFromNull(paramMap.get("classId")));
	                }
	                if(tempUrl.indexOf("$studentId$")>-1){
	                    tempUrl=tempUrl.replaceAll("\\$studentId\\$", StringUtil.getStrFromNull(paramMap.get("studentId")));
	                }
	                if(tempUrl.indexOf("$regFlg$")>-1){
	                    tempUrl=tempUrl.replaceAll("\\$regFlg\\$", StringUtil.getStrFromNull(paramMap.get("regFlg")));
	                }
	                if(tempUrl.indexOf("$ut$")>-1){
	                    tempUrl=tempUrl.replaceAll("\\$ut\\$", StringUtil.getStrFromNull(paramMap.get("ut")));
	                }
	                tree.setHref(tempUrl);
	            }
	            tree.setC4(sysModule.getC4());//学段     新版改为用户中心的区域编码
	            tree.setC3(sysModule.getC3());//系统标志
	            tree.setC2(sysModule.getC2());//控制样式(改成原来的接口编号了。) 新版本将C2改为学制|年级，存放学制和年级。
	            treelist.add(tree);
		    }
		}

		//组装树形,子(firstmodel)找父(nextmodel)
		for(int i=0;i<treelist.size();i++){
			TreeForm firstmodel=(TreeForm) treelist.get(i);
			//从第二级栏目开始递归父找子
			if(firstmodel.getParentid()!=null && firstmodel.getParentid().length()==2){
				getChlidrenMenu(treelist,firstmodel);
			}
		}
		
		
		return treelist;
	}

	//找子栏目
	private static void getChlidrenMenu(List<TreeForm> plist,TreeForm af){
		if(af.getId()!=null){
			af.setLeaf(true);
			for(int i=0;i<plist.size();i++){
				TreeForm temp=plist.get(i);
				if(af.getId().equals(temp.getParentid())){
					af.setLeaf(false);
					if(af.getChildren()==null){
						af.setChildren(new ArrayList<TreeForm>());
					}
					af.getChildren().add(temp);
					//由于删除当前，所以下次+1后海要是当前的位置，否则将跳过下个
					plist.remove(i);
					i--;
				}
			}
			//循环完毕后再找下层子，避免下层删除节点导致当前循环错位跳过下个循环节点
			if(!af.getLeaf()){
				for(TreeForm children : (List<TreeForm>)af.getChildren()){
					getChlidrenMenu(plist,children);
				}
			}
		}
	}
	/**
	 * 判断areaId是否属于areas中任何一个地区下
	 * areas 为一个或多个areaId逗号分隔的字符串
	 * @param areas
	 * @param areaId
	 * @return true 包含  false不包含 如果areas和areaId任意为空则返回false
	 */
	public static boolean checkAreaIdContains(String areas,String areaId){
		if(areas==null || areaId==null || areas.trim().length()==0 || areaId.trim().length()==0){
			return false;
		}
    	/*
    	 * 转换为如下正则作起始字符串匹配
    	 * ^(35\\.03|35\\.01).*
    	 */
		String reg=areas.replaceAll(",","|").replaceAll("\\.", "\\\\.");
		reg="^("+reg+")(\\.\\d{1,4})*$";
		Pattern pattern = Pattern.compile(reg);
	    Matcher match = pattern.matcher(areaId);
	    return match.find();
	}
	
	//生成6位随机数
	public static int getrandom(int num){
		int[] array = {0,1,2,3,4,5,6,7,8,9};
        java.util.Random rand = new java.util.Random();
        for (int i = 10; i > 1; i--) {
            int index = rand.nextInt(i);
            int tmp = array[index];
            array[index] = array[i - 1];
            array[i - 1] = tmp;
        }
        int result = 0;
        for(int i = 0; i < num; i++)
            result = result * 10 + array[i];
        return result;
	}
	
	/**
	 * 门户独立加密编码在encode(UTF8)基础上，替换%为|
	 * @param a
	 * @return
	 */
	public static String portalEncode(String str){
		if(str!=null && str.trim().length()>0){
			try {
				return java.net.URLEncoder.encode(str,"UTF-8").replaceAll("%","|");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
		}else{
			return str;
		}
	}

	/**
	 * 门户独立编码解密在dncode(UTF8)基础上，替换|为%
	 * @param a
	 * @return
	 */
	public static String portalDecode(String str){
		if(str!=null && str.trim().length()>0){
			try {
				return java.net.URLDecoder.decode(str.replaceAll("\\|","%"),"UTF-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
		}else{
			return str;
		}
	}

	/**
	 * 获取统计地址
	 * @return
	 */
	public static String getStatip(HttpServletRequest request) {
		try{
			String pvurl=((Map<String,String>)request.getAttribute("ConfigMap")).get("STAT_PV");
			return "//"+pvurl+"/stat/a.html";
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 首页屏蔽检查及提示Code
	 * @param username
	 * @param usertype
	 * @return
	 */
	public static String noAlertCode(String username,String usertype){
		Date nd=new Date();
		String ucode=null;
		if(username.length()>3){
			ucode=username.substring(username.length()-3,username.length());
		}else{
			ucode=username;
		}
		return usertype+nd.getDay()+(nd.getDate()%10)+ucode+(nd.getDate()/10);
	}
	
	public static String getTail_param() {
	    Common.init();
		return tail_param;
	}

	public static String getVcom3dskey() {
	    Common.init();
		return vcom3dskey;
	}

	public static String getBoundphone() {
	    Common.init();
		return boundphone;
	}
	public static String getPhoneusertype() {
	    Common.init();
		return phoneusertype;
	}	
	public static String getPaytype() {
	    Common.init();
		return paytype;
	}

	public static String getVsms_platUser() {
	    Common.init();
		return vsms_platUser;
	}
	public static String getVsms_platPwd() {
	    Common.init();
		return vsms_platPwd;
	}
	public static String getVsms_content() {
	    Common.init();
		return vsms_content;
	}
	public static String getVsms_day() {
	    Common.init();
		return vsms_day;
	}
	public static String getNotcheckuser() {
	    Common.init();
		return notcheckuser;
	}
	public static void setNotcheckuser(String notcheckuser) {
		Common.notcheckuser = notcheckuser;
	}
	public static String getRepeatCheckTime() {
	    Common.init();
		return repeatCheckTime;
	}
	public static void setRepeatCheckTime(String repeatCheckTime) {
		Common.repeatCheckTime = repeatCheckTime;
	}
	public static String getUsersessionname() {
	    Common.init();
		return usersessionname;
	}
	public static void setUsersessionname(String usersessionname) {
		Common.usersessionname = usersessionname;
	}
	public static String getBbsid() {
	    Common.init();
		return bbsid;
	}
	public static void setBbsid(String bbsid) {
		Common.bbsid = bbsid;
	}
	public static HashMap<String, List> getRolePer() {
	    Common.init();
		return rolePer;
	}
	public static void setRolePer(HashMap<String, List> rolePer) {
		Common.rolePer = rolePer;
	}
	public static Integer getTempCodeCount() {
	    Common.init();
		return tempCodeCount;
	}
	public static void setTempCodeCount(Integer tempCodeCount) {
		Common.tempCodeCount = tempCodeCount;
	}
	public static void setAreamap(Map<String, String> areamap) {
		Common.areamap = areamap;
	}
	public Map<String, String> getAreamap() {
	    Common.init();
		return areamap;
	}
	
	public static String getBalanceUrl() {
	    Common.init();
		return balanceUrl;
	}
	
	public static Date getCatcheDate() {
	    Common.init();
		return catcheDate;
	}

	public static long getCatcheTime() {
	    Common.init();
		return catcheTime;
	}


	public static String getDomain() {
	    Common.init();
		if(domain==null){
			domain="";
		}
		return domain;
	}

	public static String getShowupdate() {
	    Common.init();
		return showupdate;
	}

	public static String getUpdateinfo() {
	    Common.init();
		return updateinfo;
	}
	public static String getRepeatUsertype() {
	    Common.init();
		return repeatUsertype;
	}
	public static String getAlerttype() {
	    Common.init();
		return alerttype;
	}
	public static String getPayalert() {
	    Common.init();
		return payalert;
	}
	public static String getAssociate() {
	    Common.init();
		return associate;
	}

	public static String getAreamessage() {
	    Common.init();
		return areamessage;
	}

	public static String getAreaphonenumber() {
	    Common.init();
		return areaphonenumber;
	}

	public static String getPortal_config_path() {
	    Common.init();
		return portal_config_path;
	}

	public static String getShowRegedit() {
	    Common.init();
		return showRegedit;
	}

    public static String getShowguide() {
        Common.init();
        return showguide;
    }

    public static void setShowguide(String showguide) {
        Common.showguide = showguide;
    }

    public static String getTeachUrl() {
        Common.init();
        return teachUrl;
    }

    public static void setTeachUrl(String teachUrl) {
        Common.teachUrl = teachUrl;
    }

    public static String getParentUrl() {
        Common.init();
        return parentUrl;
    }

    public static void setParentUrl(String parentUrl) {
        Common.parentUrl = parentUrl;
    }

    public static String getPupilUrl() {
        Common.init();
        return pupilUrl;
    }

    public static void setPupilUrl(String pupilUrl) {
        Common.pupilUrl = pupilUrl;
    }

    public static String getSeniorUrl() {
        Common.init();
        return seniorUrl;
    }

    public static void setSeniorUrl(String seniorUrl) {
        Common.seniorUrl = seniorUrl;
    }

    public static String getShowSkUpdate() {
        Common.init();
        return showSkUpdate;
    }

    public static String getSkTip() {
        Common.init();
        return skTip;
    }

    public static String getGjptpz() {
        Common.init();
        return gjptpz;
    }

    public static String getDefaultLogo() {
        Common.init();
        return logo;
    }

    public static String getDefaultModule() {
        Common.init();
        return module;
    }
	
	public static String getDefaultAreacode() {
	    Common.init();
		return areacode;
	}

	public static String getDefaultAreaname() {
	    Common.init();
		return areaname;
	}

	public static String getDefaultOtherConfig() {
	    Common.init();
		return otherConfig;
	}

    public static String getDefaultIndexlogo() {
        Common.init();
        return indexlogo;
    }

    public static String getSeoKey() {
        Common.init();
        return seokey;
    }
    /*
     * 返回默认主域U币名称
     */
    public static String getDefaultUbName() {
        Common.init();
        String ubName = getConfigMap().get("default").get("map_portal").get("ubName");
    	return ubName;
    }
    
    public static String getDefaultIcoimg() {
        Common.init();
        String ticoimg = StringUtil.getStrFromNull(getConfigMap().get("default").get("map_portal").get("icoimg"));
        return ticoimg;
    }
    public static String getDefaultShowIndex(){
    	Common.init();
        String show_index = StringUtil.getStrFromNull(getConfigMap().get("default").get("map_portal").get("showindex"));
        return show_index;
    }

    public static String getDefaultInterfaceConfig() {
        Common.init();
        return StringUtil.getStrFromNull((String)portalConfig.get("interfaceConfigstr"));
    }
    
    public static String getDefaultSpaceDir(){
    	String r=getConfigMap().get("default").get("map_portal").get("spacedir");
    	if(r==null){
    		return "";
    	}
    	return r;
    }
    
}
