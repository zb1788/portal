<%@ page language="java" import="zzvcom.util.*,java.io.*,org.apache.commons.httpclient.methods.PostMethod,java.util.*,org.apache.commons.httpclient.*,java.util.regex.*" pageEncoding="utf-8"%><%

		// 获取登录参数
		String userName = request.getParameter("userId");
		String password = request.getParameter("password");
		String callback = request.getParameter("jsoncallback");
		String callbacks = "";
		String callbacke = "";
		
		String debug = request.getParameter("debug");
		
		if(callback!=null && callback.trim().length()>0){
			callbacks = callback+"(";
			callbacke = ")";
		}
		
		try {
			String result = "0";
			if(userName==null || password==null){
				out.println(callbacks+"{result:'0',username:''}"+callbacke);
				return;
			}
			String ssoUrl = ((Map<String,String>)request.getAttribute("ConfigMap")).get("SSO_IP");
			//String ssoUrl = (String)request.getAttribute("SSO_IP");
			//String ssoUrl = "ssozz.zzedu.net.cn";
			
			/**
			 * SSO请求验证用户,参数如下： 
			 * appFlg：系统标识 
			 * username：用户名 3des加密 
			 * pwd：用户密码  md5加密
			 * inputname：登录名 
			 * schoolId：学校ID 
			 * isPortal：是否门户登录
			 */
			 
			zzvcom.util.secret.Vcom_3DES vcom3DES = new zzvcom.util.secret.Vcom_3DES();
			vcom3DES.setKeyStr("vcomnryyvcomnryyvcomnryy");
			vcom3DES.setIsEncrypt(1);
			vcom3DES.setMessage(userName);
			String userNameDes = vcom3DES.Vcom3DESChiper().toLowerCase();
			
			String md5pwd = new zzvcom.util.secret.MD5().getMD5ofStr(password).toLowerCase();
			
			String ssoSendUrl = "http://"+ssoUrl + "/sso/verifyAuthInfo?" + "appFlg=YJWK"
					+ "&username=" + userNameDes + "&pwd=" + md5pwd
					+ "&inputname=" + userName + "&schoolId=" + "&isPortal=0&loginUsertype=teacher";

			if(debug!=null && "true".equals(debug)){
				out.println("[ssoGetUrl]：&nbsp;"+ssoSendUrl+"<br/>");
			}
			PostMethod postMethod = new PostMethod(ssoSendUrl);
			HttpClient client = new HttpClient();
			
			client.getHttpConnectionManager().getParams().setConnectionTimeout(1000 * 60);
			int status = 0;

			try {
				status = client.executeMethod(postMethod);
			} catch (HttpException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			if(status == HttpStatus.SC_OK) {
				try {
					String ut=null;
					String name=null;
					String username=null;
					String rbody = postMethod.getResponseBodyAsString();
					
					//调试用显示结果
					if(debug!=null && "true".equals(debug)){
						if(rbody!=null){
							out.println("[RESULT]:&nbsp;"+rbody+"<br/>");
						}else{
							out.println("[RESULT]:&nbsp;null<br/>");
							return;
						}
					}
					
					Pattern ut_pattern = Pattern.compile("\"ut\":\"(.+)?\"}");
					Matcher ut_matcher = ut_pattern.matcher(rbody);
					if(ut_matcher.find()){
						String temp1=ut_matcher.group(0);
						if(temp1.length()>7){
							ut=temp1.substring(6,temp1.length()-2);
						}
					}
					if(ut==null || ut.trim().length()==0){
						out.println(callbacks+"{result:'0',username:''}"+callbacke);
						return;
					}
					
					Pattern pattern2 = Pattern.compile("\"truename\":\"(.+)?\",\"username");
					Matcher matcher2 = pattern2.matcher(rbody);
					if(matcher2.find()){
						String temp2=matcher2.group(0);
						if(temp2.length()>24){
							name=temp2.substring(12,temp2.length()-11);
						}
					}
					
					Pattern un_pattern = Pattern.compile("username\":\"(.+)?\",\"usertype\"");
					Matcher un_matcher = un_pattern.matcher(rbody);
					if(un_matcher.find()){
						String temp=un_matcher.group(0);
						if(temp.length()>23){
							username=temp.substring(11,temp.length()-12);
						}
					}
					
					out.println(callbacks+"{result:'1',username:'"+username+"',truename:'"+name+"',ut:'"+ut+"'}"+callbacke);
					return;
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			out.println(callbacks+"{result:'0',username:''}"+callbacke);
			postMethod.releaseConnection();
		} catch (Exception e) {
			out.println(callbacks+"{result:'0',username:''}"+callbacke);
			e.printStackTrace();
		}
%>