package zzvcom.util;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import sun.misc.BASE64Encoder;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class SendSMS {
	static Logger logger = Logger.getLogger(SendSMS.class);
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		System.out.print("resulT: "+new SendSMS().sendMessage("13623858586","5678"));
	}
	
	/**
	 * 新张威对接阿里短信
	 * @param phone	 	电话号码
	 * @param content  	纯数字验证码
	 * @return
	 */
	public boolean sendMessage(String phone, String content){
		String appid="vcom20010001";
		String appsecret="897095CE561B37F65AF705CAB1E453F9";
		String stime=new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new java.util.Date());
		String ss=new zzvcom.util.secret.MD5().getMD5ofStr(appid+stime+appsecret);
		String cstr=null;
		try {
			cstr=java.net.URLEncoder.encode("[{\"m\":\""+phone+"\",\"i\":\""+content+"\"}]","utf-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(cstr!=null){
			String url="http://47.93.167.116:8080/send?appid="+appid+"&signtype=1&t=c&sign="+ss+"&time="+stime+"&c="+cstr;
			logger.debug(" sendMessage - URL:"+url);
			String sr =HttpUtil.readURLByCharset(url, null, "UTF-8", 3000);
			logger.debug(" sendMessage - SEND RESULT:"+sr);

	        JSONObject obj=JSONObject.fromObject(sr);
	        if(obj.getString("result").equals("1")){
	        	return true;
	        }
		}
		return false;	
	}
	
	/**
	 * 短信平台发送短信
	 * @param request
	 * @param phone
	 * @param content
	 * @return
	 */
	public boolean sendMobileSMS(HttpServletRequest request,String phone, String content)
	{
		boolean isOk = true;
		String viManageUrl = Common.getInterfaceUrl(request.getServerName(),"VSMS_IP", "VSMS.SEND");
		String vsms_platUser = Common.getVsms_platUser();
		String vsms_platPwd = Common.getVsms_platPwd();

		// 初始化手机短信接口内容
		HashMap vsmsMap = new HashMap();
		vsmsMap.put("platUser", vsms_platUser);
		vsmsMap.put("platPwd", vsms_platPwd);

		// Base64加密
		content = new BASE64Encoder().encode(content.getBytes());

		Map<String, String> map = new HashMap<String, String>();

		map.put("needReport", "0");
		map.put("taskId", "");
		map.put("cronExpression", "");
		map.put("sendTime", "");
		map.put("msType", "0");
		map.put("sendType", "0");
		map.put("autoSplit", "1");
		map.put("chargeNumber", "");
		map.put("messageContent", content);
		map.put("mtMsType", "A");
		map.put("feeValue", "");
		map.put("spNumber", "");
		map.put("userNumber", phone);

		map.put("reportDes", "0");
		map.put("operateType", "A");

		map.put("givenValue", "000000");
		map.put("priority", "0");
		map.put("serviceType", "2.1.1.");

		ArrayList maps = new ArrayList();
		maps.add(map);
		vsmsMap.put("data", maps);

		String data = JSONObject.fromObject(vsmsMap).toString();
		String sendSMSurl = viManageUrl;
		HashMap paramMap = new HashMap();
		paramMap.put("data", data);

		// 发送手机短信
		HttpUtil sendMsg = new HttpUtil();
		logger.debug("send Message data:"+data);
		String vsmsRtnJson = sendMsg.sendPost(sendSMSurl + "&data=" + data, null, "");
		logger.debug("send Message data:"+vsmsRtnJson);

		if (vsmsRtnJson==null || "error".equals(vsmsRtnJson) || "null".equals(vsmsRtnJson)){
			isOk = false;
			return isOk;
		}

		JSONArray jsonArray = JSONArray.fromObject(vsmsRtnJson);
		JSONObject jsonResult = (JSONObject) jsonArray.get(0);
		Integer resultFlag = (Integer) jsonResult.get("resultFlag");

		if (null == resultFlag || 1 != resultFlag.intValue())
		{
			isOk = false;
			return isOk;
		}
		return isOk;
	}
}
