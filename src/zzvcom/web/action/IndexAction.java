package zzvcom.web.action;


import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import vcom.sso.pdgrant.ProductGrantRtn;
import vcom.sso.pdgrant.ProductGrantUtil;
import vcom.sso.vo.AuthResult;
import vcom.sso.vo.SchoolClass;
import vcom.sso.vo.Student;
import vcom.sso.vo.StudyStage;
import vcom.sso.vo.SysModule;
import vcom.sso.vo.UserAuthority;
import zzvcom.entity.TreeForm;
import zzvcom.util.Common;
import zzvcom.util.Interface;
import zzvcom.util.ManageUtil;
import zzvcom.util.SendSMS;
import zzvcom.util.StringUtil;
import zzvcom.util.secret.Vcom_3DES;
/**
 * 用户集成首页登录类 
 */
public class IndexAction extends BaseAction{
	static Logger logger = Logger.getLogger(IndexAction.class);
	
	/**
	 * 退出登录
	 * @return
	 */
	public String loginout(String method,HttpServletRequest request,HttpServletResponse response){
		request.getSession().removeAttribute(Common.usersessionname);
		
		return SUCCESS;
	}
	
	
	/**
	 * 空间首页
	 * @return
	 */
	public String webindex(String method,HttpServletRequest request,HttpServletResponse response,String spacetype){
        String areacode=((Map<String,String>)request.getAttribute("ConfigMap")).get("areacode");
	    //产品鉴权信息
	    ProductGrantUtil pdGrantUtil=new ProductGrantUtil();
        ProductGrantRtn pdGrantRtn=pdGrantUtil.getProductGrant(request);
        //禁止使用的功能列表
        ArrayList<String> appNumbersNoGrant=null;
        if(pdGrantUtil!=null){
        	appNumbersNoGrant=pdGrantRtn.getAppNumbersNoGrant();
        }
        //禁止使用的提示信息
        //String tip=pdGrantRtn.getTip();
        //禁止使用的详细信息页面、
        //String reasonUrl=pdGrantRtn.getReasonUrl();
        
		AuthResult authResult=Common.getSessiongUser(request);
				
		//组合学制和年级eduAndGrade放入后台session
		HttpSession session = request.getSession();
		//年级
		String eduAndGrade="";
		if("2".equals(authResult.getUser().getUsertype()) || "3".equals(authResult.getUser().getUsertype()) || "".equals(authResult.getUser().getUsertype()) ){
		    
		}else{
		    eduAndGrade=authResult.getUser().getSchool().getEduYears()+"|"+authResult.getUser().getGrade().getGradeCode();
		    
		    Interface.addCookie("eduYears", authResult.getUser().getSchool().getEduYears(), response);
		}
		session.setAttribute("eduAndGrade", eduAndGrade);
		
		Vcom_3DES vcom3DES = new Vcom_3DES();
		vcom3DES.setKeyStr(Common.getVcom3dskey());
		vcom3DES.setIsEncrypt(1);
		vcom3DES.setMessage(authResult.getUser().getUsername());
		String outStr = vcom3DES.Vcom3DESChiper();
		authResult.getUser().setNickname(outStr);
		Student student=(Student)request.getSession().getAttribute("student");
		String studyStage=(String)request.getSession().getAttribute("studyStage");
		//session_student
		if(request.getSession().getAttribute("student")==null){
			request.setAttribute("loginCheck", "4");
			return "err";
		}
		
		Map<String,String> pMap = new HashMap<String,String>();
		if(authResult.getUser().getArea()!=null){
			pMap.put("userAreaId", authResult.getUser().getArea().getAreaId());
		}else{
			pMap.put("userAreaId", "");
		}
		pMap.put("eduAndGrade", eduAndGrade);
		pMap.put("schoolId", student.getSchoolId());
		pMap.put("gradeCode",student.getGradeCode());
		pMap.put("classId",student.getSchoolClassId());
		pMap.put("studentId",student.getStudentNumber());
		pMap.put("schoolStage",studyStage);
		pMap.put("username",authResult.getUser().getUsername());
		pMap.put("usertype",authResult.getUser().getUsertype());
		pMap.put("regFlg",authResult.getUser().getRegFlg());
		//pMap.put("areaCode",Common.getAreacode());
		pMap.put("areaCode",areacode);
		pMap.put("telNumber",authResult.getUser().getLink());
		pMap.put("trueName",authResult.getUser().getTruename());				
		if(authResult.getUser()!=null && authResult.getUser().getSchool()!=null && authResult.getUser().getSchool().getAreaId()!=null){
			pMap.put("SchoolAreaCode",authResult.getUser().getSchool().getAreaId());
			pMap.put("schoolName",authResult.getUser().getSchool().getSchoolName());
		}else{
			pMap.put("SchoolAreaCode","");
			pMap.put("schoolName","");
		}

		if(null!=authResult.getUt() && authResult.getUt().trim().length()>0) {
			pMap.put("ut",authResult.getUt());
		}else {
			if(null!=Interface.getCookie("ut", request) && Interface.getCookie("ut", request).trim().length()>0 ) {
				pMap.put("ut",Interface.getCookie("ut", request));
			}else {
				pMap.put("ut","");
			}
		}
		Map<String, Map<String, String>> amap = Common.getConfigMap().get(request.getServerName());
        if(amap==null){//表明不存在改域名的配置，此时取默认配置
            amap = Common.getConfigMap().get("default");
        }
        Map<String,String> cmap = amap.get("map_sys");
        
        List<TreeForm> navauthority=null;
        List<TreeForm> menauthority=null;
        
        
        //appFlag不同，导致门户无法获取管理员栏目，本次改版修改栏目来源;
        //栏目获取
        if("portal".equals(spacetype)) {
    		Object[] module=authResult.getUserAuthoritys();
        	//门户
			if(module.length>=2){
				navauthority=Common.changetoList(module,"21",pMap,cmap,appNumbersNoGrant);
				menauthority=Common.changetoList(module,"22",pMap,cmap,appNumbersNoGrant);
			}
        }else if("manage".equals(spacetype)) {
        	String ut=authResult.getUt();
        	if(null==ut || ut.trim().length()==0) {
        		ut =Interface.getCookie("ut", request);
        	}
        	AuthResult mAuthResult = ManageUtil.getManageAuthResult(ut);
        	if(mAuthResult!=null) {
	    		Object[] module=mAuthResult.getUserAuthoritys();
	        	//管理员空间
	    		if(module.length>=1){
	    			menauthority=Common.changetoList(module,"28",pMap,cmap,appNumbersNoGrant);
	    		}
        	}
        }

		//将一些参数存入cookie中，一共后边的全国运营链接参数替换使用
		Interface.addCookie("regFlg", authResult.getUser().getRegFlg(),response);
		Interface.addCookie("username", authResult.getUser().getUsername(),response);
		Interface.addCookie("usertype", authResult.getUser().getUsertype(),response);
		//Interface.addCookie("vcom3dsusername", authResult.getUser().getNickname(),response);
		//Interface.addCookie("localAreaCode", Common.getAreacode(),response);
		Interface.addCookie("localAreaCode", amap.get("map_portal").get("areacode") ,response);
		Interface.addCookie("schoolStage", studyStage,response);
		Interface.addCookie("gradeCode", student.getGradeCode(),response);
		Interface.addCookie("schoolId", student.getSchoolId(),response);
		String defaultStage = StringUtil.getStrFromNull(studyStage);
        int stageIndex = StringUtil.getStrFromNull(studyStage).indexOf(",");
        if(stageIndex>-1){
            defaultStage=defaultStage.substring(0,stageIndex);
        }
		Interface.addCookie("defaultStage", defaultStage,response);
		Interface.addCookie("classId", student.getSchoolClassId(),response);
		Interface.addCookie("studentId", student.getStudentNumber(),response);
		if(authResult.getUser()!=null && authResult.getUser().getArea()!=null){
			Interface.addCookie("areacode", authResult.getUser().getArea().getAreaId(),response);
		}else{
            Interface.addCookie("areacode","" ,response);
		}
		if(authResult.getUser()!=null && authResult.getUser().getSchool()!=null && authResult.getUser().getSchool().getAreaId()!=null){
            Interface.addCookie("schoolAreaCode", authResult.getUser().getSchool().getAreaId(),response);
		}else{
            Interface.addCookie("schoolAreaCode", "",response);
        }
		//Interface.addCookie("telNumber", authResult.getUser().getLink(),response);
		
		request.setAttribute("navauthority",navauthority);
		request.setAttribute("menauthority",menauthority);
		/*
		Integer useragetn=Interface.getSystemUserAgent(request);
		if(useragetn==0)return SUCCESS;
		else return "mobile";
		*/
		//根据spacedir控制转向页
		return configForward(request.getServerName());
	}

	public String portalFrame(String method,HttpServletRequest request,HttpServletResponse response){
		return webindex(method,request,response,"portal");
	}

	public String manageFrame(String method,HttpServletRequest request,HttpServletResponse response){
		return webindex(method,request,response,"manage");
	}
	
	/**
	 * 教师首页
	 * @return
	 */
	public String teacherindex(String method,HttpServletRequest request,HttpServletResponse response){
		AuthResult authResult=Common.getSessiongUser(request);
		List menyUserAuthority=hebingarray(authResult);
		String commonstring = "";
		SchoolClass[] classs=authResult.getUser().getSchoolClasses();
		List<JSONObject> list = new ArrayList<JSONObject>();
		/*
		//最后使用目录，现在应该没用了吧
		if(request.getSession().getAttribute("LastCode")==null){
			request.getSession().setAttribute("LastCode", Interface.getLastMenuCode(request,authResult.getUser().getUsername(),""));
		}
		*/
		for (SchoolClass schoolClass : classs) {
			commonstring+=schoolClass.getClassId()+",";
			//构造一个map，存放classid和classname，并转成json对象
			Map<String,String> classesMap = new HashMap<String, String>();
			classesMap.put("classid", schoolClass.getClassId());
			classesMap.put("classname", schoolClass.getClassName());
			JSONObject jsonobj = JSONObject.fromObject(classesMap); 
			list.add(jsonobj);
		}
		Map oo = new HashMap(); 
		oo.put("classes",list.toArray()); 
		JSONObject jsonobj = JSONObject.fromObject(oo); 
		request.getSession().setAttribute("classJson", jsonobj.toString());
		commonstring=commonstring.replaceAll(",$", "");

		//根据spacedir控制转向页
		return configForward(request.getServerName());
	}
	
	/**
	 * 学生首页
	 * @return
	 */
	public String studentindex(String method,HttpServletRequest request,HttpServletResponse response){
		AuthResult authResult=Common.getSessiongUser(request);
		List menyUserAuthority=hebingarray(authResult);
		String commonstring=null;
		String studyStage=null;
		SchoolClass[] classs=authResult.getUser().getSchoolClasses();
		for (SchoolClass schoolClass : classs) {
			commonstring+=schoolClass.getClassId()+",";
		}
		commonstring=commonstring.replaceAll(",$", "");
		/*
		//最后使用目录，现在应该没用了吧
		request.getSession().setAttribute("Favorite", Interface.getMyFavorite(request,authResult.getUser().getUsertype(), authResult.getUser().getUsername()));
		request.getSession().setAttribute("LastCode", Interface.getLastMenuCode(request,authResult.getUser().getUsername(),""));
		*/
		//判断当前登陆账号是小学还是初高中
		SchoolClass sc = null;
		if (null != classs && classs.length>0) {
			 sc = classs[0];
		}
		if(sc!=null&&sc.getClassId()!=null){
			if(authResult.getUser().getStudyStage().length>0){
				StudyStage ss=(StudyStage)authResult.getUser().getStudyStage()[0];
				if (null != ss) {
					studyStage=ss.getStudyStageCode();
					String gradecode = authResult.getUser().getGrade().getGradeCode();
					if (StringUtils.isNotBlank(studyStage)) {
						//根据spacedir控制转向页
						return configForward(request.getServerName());
					}
				}
			}
		}
		request.setAttribute("menyUserAuthority", menyUserAuthority);
		request.setAttribute("studyStage", studyStage);

		//根据spacedir控制转向页
		return configForward(request.getServerName());
	}
	
	/**
	 * 家长首页
	 * @return
	 */
	public String parentindex(String method,HttpServletRequest request,HttpServletResponse response){
		AuthResult authResult=Common.getSessiongUser(request);
		List menyUserAuthority=hebingarray(authResult);
		String commonstring=null;
		
		//request.getSession().setAttribute("Favorite", Interface.getMyFavorite(request,"4", student.getStudentNumber()));
		//request.getSession().setAttribute("LastCode", Interface.getLastMenuCode(request,student.getStudentNumber(),""));
		
		SchoolClass[] classs=authResult.getUser().getSchoolClasses();
		for (SchoolClass schoolClass : classs) {
			commonstring+=schoolClass.getClassId()+",";
		}
		commonstring=commonstring.replaceAll(",$", "");
		request.setAttribute("menyUserAuthority", menyUserAuthority);

		//根据spacedir控制转向页
		return configForward(request.getServerName());
	}

	/**
	 * 管理员页-同步管理员代码用
	 * @return 
	 */
	public String manageindex(String method,HttpServletRequest request,HttpServletResponse response){
		AuthResult authResult=Common.getSessiongUser(request);
	    String usertype = authResult.getUser().getUsertype();
         if("3".equals(usertype)){
             return "xiaoji";
         }else{
             return "quji";
         }
	}
	
	/**
	 * 根据配置目录进行重定向
	 * @param ServerName
	 * @return 没有对应spacedir，按默认进入SUCCESS;
	 */
	private String configForward(String ServerName){
		Map<String, Map<String, String>> amap = Common.getConfigMap().get(ServerName);
        if(amap==null){//表明不存在改域名的配置，此时取默认配置
            amap = Common.getConfigMap().get("default");
        }
		//根据spacedir控制转向页
		if(amap.get("map_portal").get("spacedir")!=null && amap.get("map_portal").get("spacedir").trim().length()>0){
			return amap.get("map_portal").get("spacedir");
		}
		return SUCCESS;
	}
	
	/**
	 * 合并前两个菜单数组
	 * @return
	 */
	public List hebingarray(AuthResult authResult){
		List list=new ArrayList();
		if(authResult==null || authResult.getUserAuthoritys()==null || authResult.getUserAuthoritys().length<2){
			return list;
		}
		Object[] module=authResult.getUserAuthoritys();
		Object[] menyUserAuthority0=((UserAuthority)( module[0])).getModules();
		Object[] menyUserAuthority1=((UserAuthority)( module[1])).getModules();
		if(menyUserAuthority0!=null){
			for(int i=0;i<menyUserAuthority0.length;i++){
				list.add(menyUserAuthority0[i]);
			}
		}
		if(menyUserAuthority1!=null){
			for(int i=0;i<menyUserAuthority1.length;i++){
				SysModule smodule=(SysModule)menyUserAuthority1[i];
				if(smodule.getModuleLevel().equals("3")){
					list.add(menyUserAuthority1[i]);
				}
			}
		}
		return list;
	}
	
}