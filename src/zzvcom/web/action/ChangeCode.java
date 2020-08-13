package zzvcom.web.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import zzvcom.util.Common;
import zzvcom.util.secret.*;

public class ChangeCode{
    
    public void changeStringCode(String method,HttpServletRequest request,HttpServletResponse response){
    	String username = request.getParameter("username");
    	String pwd = request.getParameter("pwd");
        String retJson ="";
        MD5 md5 = new MD5();
        String pwdMD5 = null;
        if(pwd!=null){
        	pwdMD5 = md5.getMD5ofStr(pwd).toLowerCase();
        }else{
        	pwdMD5="";
        }
        String user3DES = null;
        if(username!=null){
	        Vcom_3DES des = new Vcom_3DES();
	        des.setKeyStr(Common.getVcom3dskey());
	        des.setIsEncrypt(1);
	        des.setMessage(username);
	        user3DES = des.Vcom3DESChiper();
        }else{
        	user3DES="";
        }
        retJson +=user3DES+",";
        retJson += pwdMD5 ;
        PrintWriter out = null;
        try {
            out = response.getWriter();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (out != null) {
                out.print(retJson);
                out.flush();
                out.close();
            }
        }
    }
    
    public void URLdecodeString(String method,HttpServletRequest request,HttpServletResponse response){
		
		String referer=request.getHeader("Referer");
		if(referer==null){
			//来源异常进入404
			try {
				response.sendError(404);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return;
		}
        response.setContentType("text/html;charset=utf-8") ;
    	String tip = request.getParameter("tip");
        String tips = URLDecoder.decode(tip);
        tips=tips.replaceAll(";","").replaceAll("<","").replaceAll(">","").replaceAll("'","").replaceAll("\"","").replaceAll("=","").replaceAll("\\(","").replaceAll("\\)","").replaceAll("\\{","").replaceAll("\\}","");
        PrintWriter out = null;
        try {
            out = response.getWriter();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (out != null) {
                out.print(tips);
                out.flush();
                out.close();
            }
        }
    }
    
}
