package zzvcom.web.action;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vcom.sso.vo.AuthResult;
import zzvcom.util.Common;
import zzvcom.util.SendSMS;

public class SendMsg {

	/**
	 * 发送验证码
	 */
	public void sendVicode(String method,HttpServletRequest request,HttpServletResponse response){
		SendSMS send=new SendSMS();
		String back="";
		AuthResult authResult=Common.getSessiongUser(request);
		String phoneActiveState = request.getParameter("phoneActiveState");
		String phonenumber = request.getParameter("phonenumber");
		//if(true){
		if(phoneActiveState!=null&&phoneActiveState.equals("1")){
			String content=Common.getVsms_content();
			int rand=Common.getrandom(6);
			boolean sendtype=false;
			try{
				if("1".equals(Common.getBoundphone())){
					//短信系统发送
					sendtype=send.sendMobileSMS(request,phonenumber, content.replace("###", String.valueOf(rand)));
				}else if("2".equals(Common.getBoundphone())){
				//阿里短信格式由阿里定义
					sendtype=send.sendMessage(phonenumber, String.valueOf(rand));
				}
				if(sendtype){
					request.getSession().setAttribute("vicode", rand);
					back="{'type':'1','message':'','icode':'"+rand+"'}";
				}else{
					back="{'type':'0','message':'重新发送短信失败!'}";
				}
			}catch(Exception e){
				e.printStackTrace();
				back="{'type':'0','message':'发送短信失败!'}";
			}
		}else{
			back="{'type':'0','message':'手机号未绑定.请联系管理员!'}";
		}
		try {
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(back);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
