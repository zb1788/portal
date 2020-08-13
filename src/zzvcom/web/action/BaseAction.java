package zzvcom.web.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import zzvcom.util.Common;

public class BaseAction {
	public static String SUCCESS="success";
	public static String ERROR="error";
	
	/**
	 * 直接转入success方法
	 * @return
	 */
	public String transit(String m, javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response){
		return SUCCESS;
	}
}
