package zzvcom.util.filter;

import java.io.IOException;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import vcom.sso.vo.AuthResult;
import vcom.sso.vo.SchoolClass;
import vcom.sso.vo.Student;
import vcom.sso.vo.StudyStage;
import zzvcom.util.Common;
import zzvcom.util.Interface;

public class PropertiesFilter implements Filter {

    protected FilterConfig config;
    
    public void destroy() {
        // TODO Auto-generated method stub

    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // TODO Auto-generated method stub
        HttpServletRequest hrequest = (HttpServletRequest) request;
        HttpServletResponse hresponse = (HttpServletResponse) response;
        String servername = request.getServerName();
        //String u=hrequest.getLocalAddr();
        //String domain=zzvcom.util.Common.checkAlias(servername);
        //if(domain!=null){
        	//如果匹配则进入对应域名
        	//hresponse.sendRedirect(Common.PROTOCOL+domain+"/");
        	//return;
        	//servername=domain;
        //}
        Map<String,String> configCacheMap = Common.initProperties(servername);
        /*
        for(Map.Entry<String, String> entry:configCacheMap.entrySet()){
            String key = entry.getKey();
            String value = entry.getValue();
            hrequest.setAttribute(key, value);
        }
        */
        hrequest.setAttribute("ConfigMap", configCacheMap);
        
        putSession(hrequest);
        
        chain.doFilter(hrequest, hresponse);
    }
    

	/**
	 * 写入session信息
	 * @param authResult
	 * @return
	 */
	private String putSession(HttpServletRequest irequest){
		Student student = null;
		String studyStage = null;
		AuthResult authResult=Common.getSessiongUser(irequest);
		if(authResult==null){
			return null;
		}
		if(authResult.getUser().getUsertype().equals("0")){//获取家长的孩子
			String back=Interface.getMyChildren(irequest.getServerName(),authResult);
			if(back!=null){
				JSONObject js = JSONObject.fromObject(back);
				JSONArray jsarray = JSONArray.fromObject(js.get("rtnArray"));
				if(jsarray.size()>0){JSONObject chidren = JSONObject.fromObject(jsarray.get(0));
					JSONObject chidrens = JSONObject.fromObject(chidren.get("student"));
					JSONObject studyStagejson = JSONObject.fromObject(chidren.get("studyStage"));
					student=(Student)chidrens.toBean(chidrens,Student.class);
					StudyStage[] st=new StudyStage[1];
					st[0]=(StudyStage)studyStagejson.toBean(studyStagejson,StudyStage.class);
					if(st[0]!=null){
						studyStage=st[0].getStudyStageCode();
					}
					//authResult.getUser().setStudyStage(st);
				}else{
					return "err";
				}
			}
		}else if(authResult.getUser().getUsertype().equals("4")){//学生
			if(authResult.getUser().getSchoolClasses().length>0){
				SchoolClass sc=authResult.getUser().getSchoolClasses()[0];
				if(sc!=null&&sc.getClassId()!=null){
					if(authResult.getUser().getStudyStage().length>0){
						StudyStage ss=(StudyStage)authResult.getUser().getStudyStage()[0];
						studyStage=ss.getStudyStageCode();
					}
					student=new Student();
					student.setSchoolClassId(sc.getClassId());
					student.setSchoolId(sc.getSchoolId());
					student.setStudentNumber(authResult.getUser().getUsername());//登录账户
					student.setGradeCode(sc.getGradeCode());
				}
			}
		}else{
			StudyStage[] ss=authResult.getUser().getStudyStage();
			for (StudyStage studyStages : ss) {
				if(studyStage==null || studyStage.equals("")){
					studyStage=studyStages.getStudyStageCode();
				}else{
					studyStage=studyStage+","+studyStages.getStudyStageCode();
				}
			}
			//request.getSession().removeAttribute("student");
			student=new Student();
			if(authResult.getUser().getSchool()!=null){
				student.setSchoolId(authResult.getUser().getSchool().getSchoolId());
			}
		}
		irequest.getSession().setAttribute("student",student);
		irequest.getSession().setAttribute("studyStage",studyStage);
		return null;
	}
	
    public void init(FilterConfig filterConfig) throws ServletException {
        // TODO Auto-generated method stub
        this.config = filterConfig;
    }

}
