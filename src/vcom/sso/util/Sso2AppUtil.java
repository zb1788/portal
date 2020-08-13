package vcom.sso.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vcom.sso.pdgrant.ProductGrantUtil;
import vcom.sso.vo.AuthResult;

public class Sso2AppUtil {
	public static void cpSessionVo(HttpServletRequest request,HttpServletResponse response,AuthResult authResult)
	{
		 javax.servlet.http.HttpSession session = request.getSession(true);
		 /****************************业务系统代码  更新业务系统定义的用户信息及权限**********************************/
		 //产品权限
		 ProductGrantUtil pdGrantUtil=new ProductGrantUtil();
		 pdGrantUtil.getProductGrant(request);
 		
 		
 		
 		/****************************业务系统代码  更新业务系统定义的用户信息及权限**********************************/
	}
}
