package zzvcom.web.action;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;

import zzvcom.util.Common;
import zzvcom.util.LinkedProperties;
import zzvcom.util.StringUtil;
/**
 *配置文件 读入，修改，写入
 *@time 2014-5-14
 */
public class DataConfigAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = -261923663595888594L;
	
	//修改配置
	public String editconfiginfo(String method,HttpServletRequest request,HttpServletResponse response) throws IOException{
		//配置管理登陆密码
		String tail=request.getParameter("tail");
		String jsoncallback=request.getParameter("jsoncallback");
		FileInputStream fi;
		if(Common.getTail_param()!=null && !Common.getTail_param().equals(tail)){
			return ERROR;
		}

		try {
			fi = new FileInputStream(Common.getPortal_config_path());
			LinkedProperties p=new LinkedProperties();
			p.load(fi);
			fi.close();
			p.setProperty("bbsid", StringUtil.getStrFromNull(request.getParameter("dc.bbsid")));
			p.setProperty("vcom3dskey", StringUtil.getStrFromNull(request.getParameter("dc.vcom3dskey")));
			p.setProperty("boundphone", StringUtil.getStrFromNull(request.getParameter("dc.boundphone")));
			p.setProperty("vsms_platUser", StringUtil.getStrFromNull(request.getParameter("dc.vsms_platUser")));
			p.setProperty("vsms_platPwd", StringUtil.getStrFromNull(request.getParameter("dc.vsms_platPwd")));
			p.setProperty("phoneusertype", StringUtil.getStrFromNull(request.getParameter("dc.phoneusertype")));
			p.setProperty("vsms_content", StringUtil.getStrFromNull(request.getParameter("dc.vsms_content")));
			p.setProperty("vsms_day", StringUtil.getStrFromNull(request.getParameter("dc.vsms_day")));
			p.setProperty("repeatCheckTime", StringUtil.getStrFromNull(request.getParameter("dc.repeatCheckTime")));
			p.setProperty("tempCodeCount", StringUtil.getStrFromNull(request.getParameter("dc.tempCodeCount")));
			p.setProperty("paytype", StringUtil.getStrFromNull(request.getParameter("dc.paytype")));
			p.setProperty("payalert", StringUtil.getStrFromNull(request.getParameter("dc.payalert")));
			p.setProperty("areaname", StringUtil.getStrFromNull(request.getParameter("dc.areaname")));
			p.setProperty("areacode", StringUtil.getStrFromNull(request.getParameter("dc.areacode")));
			p.setProperty("otherConfig", StringUtil.getStrFromNull(request.getParameter("dc.otherConfig")));
			p.setProperty("balanceUrl", StringUtil.getStrFromNull(request.getParameter("dc.balanceUrl")));
			p.setProperty("showupdate", StringUtil.getStrFromNull(request.getParameter("dc.showupdate")));
			p.setProperty("updateinfo", StringUtil.getStrFromNull(request.getParameter("dc.updateinfo")));
			p.setProperty("domain", StringUtil.getStrFromNull(request.getParameter("dc.domain")));
			p.setProperty("spacedir", StringUtil.getStrFromNull(request.getParameter("dc.spacedir")));
			//是否检测多用户登录
			p.setProperty("repeatUsertype", StringUtil.getStrFromNull(request.getParameter("dc.repeatUsertype")));
			//是否开启免费提醒和未绑定手机号提醒
			p.setProperty("alerttype", StringUtil.getStrFromNull(request.getParameter("dc.alerttype")));
			//不判断重复登录用户
			p.setProperty("notcheckuser", StringUtil.getStrFromNull(request.getParameter("dc.notcheckuser")));
			//是否开启用户关联
			p.setProperty("associate", StringUtil.getStrFromNull(request.getParameter("dc.associate")));
			//订购提示信息
			p.setProperty("areamessage", StringUtil.getStrFromNull(request.getParameter("dc.areamessage")));
			//订购业务发送编码
			p.setProperty("areaphonenumber", StringUtil.getStrFromNull(request.getParameter("dc.areaphonenumber")));
			//显示注册
			p.setProperty("show_reg", StringUtil.getStrFromNull(request.getParameter("dc.showreg")));
			//是否显示引导
			p.setProperty("showguide", StringUtil.getStrFromNull(request.getParameter("dc.showguide")));
			//教师首页引导链接
			p.setProperty("teachUrl", StringUtil.getStrFromNull(request.getParameter("dc.teachUrl")));
			//家长登首页导链接
			p.setProperty("parentUrl", StringUtil.getStrFromNull(request.getParameter("dc.parentUrl")));
			//小学生首页引导链接
			p.setProperty("pupilUrl", StringUtil.getStrFromNull(request.getParameter("dc.pupilUrl")));
			//初高中生首页引导链接
			p.setProperty("seniorUrl", StringUtil.getStrFromNull(request.getParameter("dc.seniorUrl")));
			//是否显示授课升级提示
			p.setProperty("showSkUpdate", StringUtil.getStrFromNull(request.getParameter("dc.showSkUpdate")));
            //授课升级提示信息
			p.setProperty("skTip", StringUtil.getStrFromNull(request.getParameter("dc.skTip")));
            //共建平台配置
			p.setProperty("gjptpz", StringUtil.getStrFromNull(request.getParameter("dc.gjptpz")));
			//主域logo
			p.setProperty("logo", StringUtil.getStrFromNull(request.getParameter("dc.logo")));
			//主域模板
			p.setProperty("module", StringUtil.getStrFromNull(request.getParameter("dc.module")));
			//主域首页logo
            p.setProperty("indexlogo", StringUtil.getStrFromNull(request.getParameter("dc.indexlogo")));
			//搜索关键词
            p.setProperty("seokey", StringUtil.getStrFromNull(request.getParameter("dc.seokey")));
			//页面图标
            p.setProperty("icoimg", StringUtil.getStrFromNull(request.getParameter("dc.icoimg")));
			//主域接口定制
            p.setProperty("interfaceConfigstr", StringUtil.getStrFromNull(request.getParameter("dc.interfaceConfigstr")));
            //浏览器协议配置
            //p.setProperty("protocol", StringUtil.getStrFromNull(request.getParameter("dc.protocol")));
			//主域是否展示默认页
            p.setProperty("showindex", StringUtil.getStrFromNull(request.getParameter("dc.showindex")));
            //主域UB名称
            p.setProperty("ubName", StringUtil.getStrFromNull(request.getParameter("dc.ubName")));
            FileOutputStream fo=new FileOutputStream(Common.getPortal_config_path());
			p.store(fo, " yjt portal parameter config ");
			fo.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	public void showSkUpdate(String method,HttpServletRequest request,HttpServletResponse response){
	    String showSkUpdate = Common.getShowSkUpdate();
	    String skTip ="";
		String jsoncallback=request.getParameter("jsoncallback");
        try {
            skTip = java.net.URLEncoder.encode(Common.getSkTip().trim(), "utf-8");
        } catch (UnsupportedEncodingException e1) {
            e1.printStackTrace();
        }
	    String json = "";
	    if(!StringUtils.isBlank(jsoncallback)){
	        json = jsoncallback+ "({\"showSkUpdate\": \""+showSkUpdate+"\", \"skTip\": \""+skTip+"\"})";
	    }else{
	        json = "({\"showSkUpdate\": \""+showSkUpdate+"\", \"skTip\": \""+skTip+"\"})";
	    }
	    PrintWriter out = null;
	    try {
            out = response.getWriter();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (out != null) {
                out.print(json);
                out.flush();
                out.close();
            }
        }
	}

}
