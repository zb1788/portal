package zzvcom.web.action;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import zzvcom.util.Common;
import zzvcom.util.Interface;
import zzvcom.util.StringUtil;

public class LoginAction {
	/**
	 * 进入系统首页
	 * 
	 * @return
	 */
	public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String path = request.getContextPath();
		String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
		String defmodule = "login/default/login.html";
		String moban = request.getParameter("module");//待预览模板参数
		String nowmodule=((Map<String,String>)request.getAttribute("ConfigMap")).get("module");//当前域模板
		String seokey=((Map<String,String>)request.getAttribute("ConfigMap")).get("seokey");//当前域关键词
		String icoimg=((Map<String,String>)request.getAttribute("ConfigMap")).get("icoimg");//当前域页面图标
		if(icoimg==null || icoimg.trim().length()==0){
			icoimg="yjt.ico";
		}
		if(seokey==null || seokey.trim().length()==0){
			seokey=Common.DEFAULT_SEO_KEY;
		}
		if(moban!=null && icoimg.trim().length()>0){//模板预览
		    nowmodule=moban;
		}
		if(nowmodule==null || nowmodule.trim().length()==0){//判空
		    nowmodule=defmodule;
		}
		String code = Common.LOGIN_TEMPLET.get(nowmodule);
		if(code==null){//判空
			code = Common.LOGIN_TEMPLET.get(defmodule);
		}
		response.setContentType("text/html;charset=UTF-8");
		ServletOutputStream out = response.getOutputStream();
		out.write(code.replaceAll("[{]SEOKEY[}]",seokey).replaceAll("[{]ICOIMG[}]",request.getContextPath()+"/ico/"+icoimg).getBytes());
	}
}
