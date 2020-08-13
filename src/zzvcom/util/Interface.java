package zzvcom.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import vcom.sso.vo.AuthResult;
import vcom.sso.vo.Student;

public class Interface {
	static Logger logger = Logger.getLogger(Interface.class);
	/**
	 * 保存cookie到二级域
	 * @param name
	 * @param value
	 * @param response
	 */
	public static void addCookie(String name,String value,HttpServletResponse response){
		Cookie namecookie=null;
		if(value==null) {
			return;
		}
		try {
			namecookie = new Cookie(name,URLEncoder.encode(value,"UTF-8"));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
		namecookie.setMaxAge(60*60*24);
		//用户名和用户区域编码仍记录为全局域下
		String domain=Common.getDomain();
		//if("username".equals(name) || "areacode".equals(name) || "usertype".equals(name)){
		    namecookie.setDomain(domain); 
		//}else{
		   // namecookie.setDomain(Common.getSysUrl("CMS"));
		//}
		namecookie.setPath("/");
		response.addCookie(namecookie);
	}

	/**
	 * 保存cookie到二级域
	 * @param name
	 * @param value
	 * @param response
	 */
	public static void addCookiePath(String name,String value,String path,HttpServletResponse response){
		Cookie namecookie = new Cookie(name,value);
		namecookie.setMaxAge(60*60*24);
		namecookie.setPath(path);
		namecookie.setDomain(Common.getDomain());
		response.addCookie(namecookie);
	}
	/**
	 * 获取cookie
	 * @param name
	 * @param value
	 * @param response
	 */
	public static String getCookie(String name,HttpServletRequest request){
		Cookie[] cookies = request.getCookies(); 
		String username = ""; 
		if(cookies!=null){
		    
		    for (int i = 0; i < cookies.length; i++) { 
		       Cookie c = cookies[i];     
		       if(c.getName().equalsIgnoreCase(name)) { 
		    	   username = c.getValue(); 
		       } 
		    }
		  } 
		return username;
	}
	
	/**
	 * 获取客户端浏览器版本
	 * return 0代表windwos系统，1代表安卓系统，2代表iphone操作系统，3代表ipad操作系统。
	 * @return
	 */
	public static Integer getSystemUserAgent(HttpServletRequest request){
		String useragent=request.getHeader("user-agent");
		if(useragent!=null){
			useragent=useragent.toLowerCase();
			if(useragent.indexOf("windows")>=0){
				return 0;
			}else if(useragent.indexOf("iphone")>=0||useragent.indexOf("ios")>=0){
				return 2;
			}else if(useragent.indexOf("android")>=0){
				return 1;
			}else if(useragent.indexOf("ipad")>=0){
				return 3;
			}else{
				return 0;
			}
		}else
			return 0;
	}
	
	/**
	 * 获取资源个数
	 * @param request
	 * @return
	 */
	public static String getResourcesNum(HttpServletRequest request){
	
//		if(PortalCache.getCache("PLS.2")!=null){
//			return PortalCache.getCache("PLS.2").toString();
//		}else{
//			String value=Thief.readURLByCharset(Common.getInterFaceIp(request,1)+"PLS.2", null, "gbk", 5000);
//			PortalCache.pugCatche("PLS.2", value);
//			System.out.println("pubcache:pls.2");
//			return value;
//		}
		String value=HttpUtil.readURLByCharset(Common.getInterfaceUrl(request.getServerName(),"PLS_IP","PLS.106")+"?totalType=RES_STAT_TOTAL", null, "GBK", 5000);
		if(value==null||value.equals(""))value="null";
		if(value.startsWith("<"))value="null";
		return value;
	}
	
	/**
	 * 获取系统区域信息
	 * @param system
	 * @return
	 */
	public static String getAreaCode(){
		//String value=Thief.readURLByCharset(Common.getInterfaceUrl("Balance","Balance.get_area"), null, "utf-8", 5000);
		//if(value==null||value.equals(""))value="null";
		//if(value.startsWith("<"))value="null";
		//return value;
		return null;
	}
	/**
	 * 获取系统ip信息
	 * @param system
	 * @return
	 
	public static String getSystempath(String system){
		String value=Thief.readURLByCharset(Common.vpninterface+"VICenter.001&sysCode="+system, null, "utf-8", 5000);
		if(value==null||value.equals(""))value="null";
		if(value.startsWith("<"))value="null";
		return value;
	}
	*/
	
	/**
	 * 获取我定制的应用
	 * @param request
	 * @return
	 */
	public static String myCustomerService(HttpServletRequest request){
		AuthResult authResult=Common.getSessiongUser(request);
		Map map=new HashMap();
		map.put("data", "{\"interFaceType\":\"get\",\"userName\":\""+authResult.getUser().getUsername()+"\"}");
		String value=HttpUtil.readURLByCharset(Common.getInterfaceUrl(request.getServerName(),"TMS_IP","TMS.201"), map, "GBK", 5000);
		if(value==null)value="null";
		if(value.startsWith("<"))value="null";
		return value;
	}
	
	/**
	 * 获取我定制的课程
	 * {"areaId":"","queryTyep":"byUser","schoolClassId":"","schoolId":"","username":"4101016001030002"}
	 * queryTyep: byUser按用户查询
	 * username：用户帐号
	 * 其他属性为空
	 * @param request
	 * @return
	 */
	public static String getMyFavorite(HttpServletRequest request,String usertype,String id){
		Map map=new HashMap();
		//if(usertype.equals("2")||usertype.equals("3")){
			map.put("data", "{\"areaId\":\"\",\"queryType\":\"byUser\",\"schoolClassId\":\"\",\"schoolId\":\"\",\"username\":\""+id+"\"}");
		//}else{
			//map.put("data", "{\"areaId\":\"\",\"queryType\":\"byClass\",\"schoolClassId\":\""+id+"\"}");
		//}
		String value=HttpUtil.readURLByCharset(Common.getInterfaceUrl(request.getServerName(),"TMS_IP", "TMS.601"), map, "GBK", 5000);
		if(value==null||value.equals(""))value="{\"error\":\"\",\"result\":0,\"rtnArray\":[],\"seted\":\"0\"}";
		if(value.startsWith("<"))value="{\"error\":\"\",\"result\":0,\"rtnArray\":[],\"seted\":\"0\"}";
		//String value="{\"error\":\"\",\"result\":2,\"rtnArray\":[{\"bookId\":\"000500050005000500050000\",\"bookNote\":\"\",\"bookOptionCode\":\"0000\",\"bookOptionName\":\"　　\",\"courseId\":\"0005000500050001\",\"courseVersionId\":\"00050005000500050001\",\"displayOrder\":\"1\",\"grade\":\"一年级\",\"gradeCode\":\"0001\",\"studyStage\":\"小学\",\"studyStageCode\":\"0001\",\"subject\":\"语文\",\"subjectCode\":\"0001\",\"term\":\"上学期\",\"termCode\":\"0001\",\"version\":\"人教版\",\"versionCode\":\"0001\"}]}";
		return value;
	}
	
	/**
	 * 获取最近一次的目录编号
	 * {"username":"","menuType":""}
	 * username：用户帐号
	 * menuType：目录类型
	 * 其他属性为空
	 * @return
	 */
	public static String getLastMenuCode(HttpServletRequest request,String username,String menuType){
		Map map=new HashMap();
		//map.put("data", "data={\"username\":\""+username+"\",\"menuType\":\"\"}");
		String value=HttpUtil.readURLByCharset(Common.getInterfaceUrl(request.getServerName(),"PLS_IP","PLS.172")+"?userName="+username+"&menuType=", null, "GBK", 5000);
		if(value==null||value.equals(""))value="null";
		if(value.startsWith("<"))value="null";
		return value;
	}
	
	/**
	 * 获取我的孩子
	 * {"areaId":"","queryTyep":"byUser","schoolClassId":"","schoolId":"","username":"4101016001030002"}
	 * queryTyep: byParent按用户查询
	 * parentAccount：用户帐号
	 * 其他属性为空
	 * @param servername 当前域名，用于获取对应域的系统地址设置
	 * @param authResult 登陆用户信息
	 * @return
	 */
	public static String getMyChildren(String servername,AuthResult authResult){
		String value=null;
		try{
		Map map=new HashMap();
		String dataparam="{\"parentAccount\":\""+authResult.getUser().getUsername()+"\",\"queryType\":\"detailByParent\"}";
		map.put("data", dataparam);
		String url = Common.getInterfaceUrl(servername,"TMS_IP","TMS.501");
		logger.debug("[URL]:"+url+"&data="+map.get("data"));
		System.out.print("Interface.calss getMyChildren url:"+url+"&data="+dataparam);
		value=HttpUtil.readURLByCharset(url, map, "GBK", 5000);
		logger.debug("获取孩子："+value);
		System.out.print("Interface.calss getMyChildren result : "+value);
		if(value==null||value.equals(""))value="null";
		if(value.startsWith("<"))value="null";
		//String value="{\"error\":\"\",\"result\":2,\"rtnArray\":[{\"bookId\":\"000500050005000500050000\",\"bookNote\":\"\",\"bookOptionCode\":\"0000\",\"bookOptionName\":\"　　\",\"courseId\":\"0005000500050001\",\"courseVersionId\":\"00050005000500050001\",\"displayOrder\":\"1\",\"grade\":\"一年级\",\"gradeCode\":\"0001\",\"studyStage\":\"小学\",\"studyStageCode\":\"0001\",\"subject\":\"语文\",\"subjectCode\":\"0001\",\"term\":\"上学期\",\"termCode\":\"0001\",\"version\":\"人教版\",\"versionCode\":\"0001\"}]}";
		}catch(Exception e){
			e.printStackTrace();
		}
		return value;
	}
	/**
	 * 根据学生账号获取学生-家长
	 * queryType=byNames&usernames=41010310277067
	 * 其他属性为空
	 * @param servername 当前域名，用于获取对应域的系统地址设置
	 * @param authResult 登陆用户信息
	 * @return
	 */
	public static String getStudentInfo(String servername,AuthResult authResult){
		String value=null;
		try{
		Map map=new HashMap();
		map.put("queryType", "byNames");
		map.put("usernames", authResult.getUser().getUsername());
		String url = Common.getInterfaceUrl(servername,"TMS_IP","TMS.501");
		logger.debug("[URL]:"+url+"&data="+map.get("data"));
		value=HttpUtil.readURLByCharset(url, map, "GBK", 5000);
		logger.debug("获取孩子："+value);
		if(value==null||value.equals(""))value="null";
		}catch(Exception e){}
		return value;
	}
	/**
	 * 根据学生账号获取学生-家长电话号码
	 * @param servername
	 * @param authResult
	 * @return
	 */
	public static String getParentTel(String servername,AuthResult authResult){
		try{
			String rs=getStudentInfo(servername,authResult);
			if(rs!=null){
				JSONObject obj=JSONObject.fromObject(rs);
				String rstr=obj.getString("rtnArray");
				rstr=rstr.substring(1,rstr.length()-1);
				obj=JSONObject.fromObject(rstr);
				String pslist=obj.getString("studentParents");
		        if(pslist!=null && pslist.startsWith("[{") && pslist.endsWith("}]")){
		        	pslist=pslist.substring(2,pslist.length()-2);
		        	if(pslist.indexOf("},{")>-1){
			        	String[] parr=pslist.split("\\},\\{");
			        	for(String ap: parr){
				        	obj=JSONObject.fromObject("{"+ap+"}");
				        	String tel=obj.getString("concatNumber");
				        	if(tel!=null && tel.trim().length()>0){
				        		return tel;
				        	}
			        	}
		        	}else{
		        		obj=JSONObject.fromObject("{"+pslist+"}");
			        	String tel=obj.getString("concatNumber");
			        	if(tel!=null && tel.trim().length()>0){
			        		return tel;
			        	}
		        	}
		        	return null;
		        }
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 获取统计数据
	 * @return
	 */
	public static String getQueryUserCount(HttpServletRequest request){
		//AuthResult authResult=Common.getSessiongUser(request);
		//Map map=new HashMap();
		//map.put("data", "{\"areaId\":\"\",\"queryType\":\"byUser\",\"schoolClassId\":\"\",\"schoolId\":\"\",\"username\":\""+authResult.getUser().getUsername()+"\"}");
		String value=HttpUtil.readURLByCharset(Common.getInterfaceUrl(request.getServerName(),"TMS_IP","TMS.504"), null, "GBK", 5000);
		if(value==null||value.equals(""))value="null";
		if(value.startsWith("<"))value="null";
		//String value="{\"error\":\"\",\"result\":2,\"rtnArray\":[{\"bookId\":\"000500050005000500050000\",\"bookNote\":\"\",\"bookOptionCode\":\"0000\",\"bookOptionName\":\"　　\",\"courseId\":\"0005000500050001\",\"courseVersionId\":\"00050005000500050001\",\"displayOrder\":\"1\",\"grade\":\"一年级\",\"gradeCode\":\"0001\",\"studyStage\":\"小学\",\"studyStageCode\":\"0001\",\"subject\":\"语文\",\"subjectCode\":\"0001\",\"term\":\"上学期\",\"termCode\":\"0001\",\"version\":\"人教版\",\"versionCode\":\"0001\"}]}";
		return value;
	}
	/**
	 * 统计资源信息
	 * @return
	 */
	/*public static String getLearningpeopleMessage(Integer type,Integer userType){
		Map<String,String> map=new HashMap<String,String>();
		map.put("data", "{'page':'0','pageNum':'6','type':'"+type+"','userType':'"+userType+"','listType':'1'}");
		String value=HttpUtil.readURLByCharset(Common.getInterfaceUrl("PLS_IP","PLS.107"), map, "GBK", 5000);
		if(value==null||value.equals(""))value="null";
		if(value.startsWith("<"))value="null";
		//String value="{\"error\":\"\",\"result\":2,\"rtnArray\":[{\"bookId\":\"000500050005000500050000\",\"bookNote\":\"\",\"bookOptionCode\":\"0000\",\"bookOptionName\":\"　　\",\"courseId\":\"0005000500050001\",\"courseVersionId\":\"00050005000500050001\",\"displayOrder\":\"1\",\"grade\":\"一年级\",\"gradeCode\":\"0001\",\"studyStage\":\"小学\",\"studyStageCode\":\"0001\",\"subject\":\"语文\",\"subjectCode\":\"0001\",\"term\":\"上学期\",\"termCode\":\"0001\",\"version\":\"人教版\",\"versionCode\":\"0001\"}]}";
		return value;
	}*/
	/**
	 * 获取班级信息
	 * {\"queryType\":\"bySchoolClassId\",\"schooClasslId\":\""+classid+"\"}
	 * queryTyep: bySchoolClassId按用户查询
	 * schooClasslId：班级编号
	 * 其他属性为空
	 * @param request
	 * @return
	 */
	public static String getSchoolClass(HttpServletRequest request,String classid){
		//AuthResult authResult=Common.getSessiongUser(request);
		Map map=new HashMap();
		map.put("data", "{\"queryType\":\"bySchoolClassId\",\"schooClasslId\":\""+classid+"\"}");
		//HttpUtil thief=new HttpUtil();
		String value=HttpUtil.readURLByCharset(Common.getInterfaceUrl(request.getServerName(),"TMS_IP", "TMS.401"), map, "GBK", 5000);
		if(value==null||value.equals(""))value="null";
		return value;
	}
	/**
	 * 获取群组信息
	 * {"gtId":"1335180248706226","queryType":"byGrpId","userName":""}
	 * queryTyep: bySchoolClassId按用户查询
	 * gtId：群组编号
	 * 其他属性为空
	 * @param request
	 * @return
	 */
	public static String getGroup(HttpServletRequest request,String groupid){
		//AuthResult authResult=Common.getSessiongUser(request);
		Map map=new HashMap();
		map.put("data", "{\"queryType\":\"byGrpId\",\"gtId\":\""+groupid+"\"}");
		HttpUtil thief=new HttpUtil();
		String value=thief.readURLByCharset(Common.getInterfaceUrl(request.getServerName(),"TMS_IP","TMS.402"), map, "GBK", 5000);
		if(value==null||value.equals(""))value="null";
		if(value.startsWith("<"))value="null";
		return value;
	}
	
}
