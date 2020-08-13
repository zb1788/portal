<%@ page language="java" import="vcom.sso.vo.AuthResult,java.security.*,org.apache.commons.codec.binary.Base64,java.security.*,javax.crypto.*,javax.crypto.spec.SecretKeySpec,java.util.Date,java.net.URLEncoder" pageEncoding="UTF-8"%>
<%!
	/**
	 * * 利用java原生的摘要实现SHA256加密21. *
	 * 
	 * @param str
	 *            加密后的报文22. *
	 * @return23.
	 */
	public String HMACSHA256(byte[] data, byte[] key) {
		try {
			SecretKeySpec signingKey = new SecretKeySpec(key, "HmacSHA256");
			Mac mac = Mac.getInstance("HmacSHA256");
			mac.init(signingKey);
			
			return URLEncoder.encode(new String(Base64.encodeBase64(mac.doFinal(data))));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		}
		return null;
	}
%>
<%
/*
阿里DataV接入
大屏编码:	a68c21212bdabf50c6ef94db33f200d7
token:		QfLZLifDoK1tFJ-thdgRRX3pfNaZ6tUd

URL中4个参数
_datav_time：		当前时间，1970-01-01 08:00:00到现在的毫秒数（例：1529460265000）
_datav_signature：	令牌，32小时失效 ，将大屏编码与_data_time值连起来，用 |（竖线）分隔开（例：a68c21212bdabf50c6ef94db33f200d7|1529460265000）,再用token值通过 HMAC-SHA256 base64加密。

vcom_areacode：		显示的区域编码--以点结束（例：43.04.12.或43.04.或43.）
plat_id：		显示的平台编码（例：hn）
*/
//大屏id
String screenID = "a68c21212bdabf50c6ef94db33f200d7";
//token
String token = "QfLZLifDoK1tFJ-thdgRRX3pfNaZ6tUd";
Date date = new Date();
Long time = date.getTime();
String stringToSign = screenID + "|" + time;
String signature = HMACSHA256(stringToSign.getBytes(), token.getBytes());
String url = "https://datav.aliyun.com/share/" + screenID
		+ "?_datav_time=" + time + "&_datav_signature=" + signature;
String userAreaCode=((AuthResult)session.getAttribute("authResult")).getUser().getArea().getAreaId();
String serverName=request.getServerName();
String platId=null;
if(serverName!=null && serverName.indexOf(".")>0){
	platId=serverName.substring(0,serverName.indexOf("."));
}else{
	platId="";
}
response.sendRedirect(url+"&vcom_areacode="+userAreaCode+".&plat_id="+platId);
%>