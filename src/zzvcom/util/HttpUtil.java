package zzvcom.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;

/**
 * http post方法传递数据
 * 
 */
public class HttpUtil{
	static Logger logger = Logger.getLogger(HttpUtil.class);
	/**
	 * 向指定URL发送POST方法的请求
	 * 
	 * @param requestUrl
	 *            请求的URL
	 * @param requestHeadMap
	 *            请求头参数Map对象
	 * @return msg 提交的数据
	 */
	public String sendPost(String requestUrl, Map<String, Object> requestHeadMap, String msg)
	{

		PrintWriter printWriter = null;
		BufferedReader bufferedReader = null;
		StringBuffer responseResult = new StringBuffer();
		HttpURLConnection httpURLConnection = null;

		try
		{
			URL realUrl = new URL(requestUrl);

			// 打开和URL之间的连接
			httpURLConnection = (HttpURLConnection) realUrl.openConnection();

			// 设置请求属性
			httpURLConnection.setRequestProperty("content-type", "text/xml;utf-8");
			httpURLConnection.setRequestProperty("accept", "*/*");
			httpURLConnection.setRequestProperty("connection", "Keep-Alive");
			httpURLConnection.setRequestProperty("Content-Length", String.valueOf(msg.length()));
			httpURLConnection.setRequestProperty("Accept-Charset", "utf-8");
			httpURLConnection.setRequestProperty("contentType", "utf-8");
			if (requestHeadMap != null && requestHeadMap.size() > 0)
			{
				Iterator it = requestHeadMap.entrySet().iterator();
				while (it.hasNext())
				{
					Map.Entry element = (Map.Entry) it.next();
					httpURLConnection.setRequestProperty((String) element.getKey(), (String) element.getValue());
				}
			}

			// 发送POST请求必须设置如下两行
			httpURLConnection.setRequestMethod("POST");
			httpURLConnection.setDoOutput(true);
			httpURLConnection.setDoInput(true);
			//httpURLConnection.

			// 连接服务器
			httpURLConnection.connect();

			// 获取URLConnection对象对应的输出流
			printWriter = new PrintWriter(httpURLConnection.getOutputStream());

			// 发送请求参数
			if (msg != null && msg.length() > 0)
			{
				printWriter.write(msg);
			}

			// flush输出流的缓冲
			printWriter.flush();

			// 根据ResponseCode判断连接是否成功
			int responseCode = httpURLConnection.getResponseCode();
			System.out.println("responseCode:" + responseCode);
			if (responseCode != 200)
			{
				System.out.println("failure");
			}

			// 定义BufferedReader输入流来读取URL的ResponseData
			bufferedReader = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream(),"UTF-8"));
			String line;
			while ((line = bufferedReader.readLine()) != null)
			{
				responseResult.append(line);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			return "error";
		}
		finally
		{
			try
			{
				if (printWriter != null)
				{
					printWriter.close();
				}
				if (bufferedReader != null)
				{
					bufferedReader.close();
				}

				httpURLConnection.disconnect();
			}
			catch (IOException ex)
			{
				ex.printStackTrace();
			}
		}
		return responseResult.toString();
	}

	public static String readURL(String url, Map<String, String> map, String mess, String command, String service,
			String myUrl, int outtime) throws Exception
	{
		String sTotalString;
		sTotalString = "";
		URL httpurl = new URL(url);
		HttpURLConnection httpConn = (HttpURLConnection) httpurl.openConnection();
		httpConn.setConnectTimeout(outtime);
		httpConn.setReadTimeout(outtime);

		httpConn.setRequestMethod("POST");
		httpConn.setRequestProperty("content-type", "application/xml;");
		httpConn.setRequestProperty("accept", "*/*");
		httpConn.setRequestProperty("connection", "Keep-Alive");
		// httpConn.setRequestProperty("command",command);
		// httpConn.setRequestProperty("service",service);
		// httpConn.setRequestProperty("url",myUrl);
		httpConn.setDoOutput(true);
		httpConn.setDoInput(true);
		// 设置发送参数
		if (map != null)
		{
			Set<String> set = map.keySet();
			for (String key : set)
			{

				httpConn.setRequestProperty(key, map.get(key));
			}
		}
		if (mess != null)
		{
			httpConn.setRequestProperty("Content-Length", String.valueOf(mess.length()));
			PrintWriter out = new PrintWriter(httpConn.getOutputStream());
			out.print(mess);
			out.flush();
			out.close();
		}
		BufferedReader in = new BufferedReader(new InputStreamReader(httpConn.getInputStream()));
		String line;
		while ((line = in.readLine()) != null)
		{
			sTotalString += line;
		}
		in.close();
		httpConn.disconnect();
		return sTotalString;

	}
	public String readURL(String url, Map<String, String> map) {
		String sTotalString;
		sTotalString = "";
		try {

			URL httpurl = new URL(url);
			HttpURLConnection httpConn = (HttpURLConnection) httpurl
					.openConnection();
			httpConn.setConnectTimeout(5000);
			httpConn.setReadTimeout(5000);
			
			httpConn.setRequestMethod("GET"); 
            httpConn.setRequestProperty("User-Agent","Mozilla/4.0 (compatible; MSIE 6.0; Windows xp)"); 
			httpConn.setDoOutput(true);
			httpConn.setDoInput(true);
			
			if (map != null) {
				String param = "";
				PrintWriter out = new PrintWriter(httpConn.getOutputStream());
				Set<String> set = map.keySet();
				for (String key : set)
					param += "&" + key + "=" + URLEncoder.encode(map.get(key),"utf-8");
				param = param.replaceFirst("^\\&", "");
				out.print(param);
				out.flush();
				out.close();
			}
			
			BufferedReader in = new BufferedReader(new InputStreamReader(
					httpConn.getInputStream(), "utf-8"));
			String line;
			while ((line = in.readLine()) != null) {
				sTotalString += line;
			}
			in.close();
			httpConn.disconnect();
			return sTotalString;
		} catch (Exception e) {
			return null;
		}
	}
	
	public static String readURLByCharset(String url, Map<String, String> map,String charset,int timeout) {
		String sTotalString;
		sTotalString = "";
		try {
			logger.debug("URL:"+url+" CHARSET:"+charset);
			URL httpurl = new URL(url);
			HttpURLConnection httpConn = (HttpURLConnection) httpurl.openConnection();
			httpConn.setConnectTimeout(timeout);
			httpConn.setReadTimeout(timeout);
			httpConn.setRequestMethod("GET"); 
            httpConn.setRequestProperty("User-Agent","Mozilla/4.0 (compatible; MSIE 6.0; Windows xp)"); 
			httpConn.setDoOutput(true);
			httpConn.setDoInput(true);
			if (map != null) {
				String param = "";
				PrintWriter out = new PrintWriter(httpConn.getOutputStream());
				Set<String> set = map.keySet();
				for (String key : set)
					param += "&" + key + "=" + URLEncoder.encode(map.get(key),charset);
				param = param.replaceFirst("^\\&", "");
				out.print(param);
				out.flush();
				out.close();
				logger.debug(" PARAM:"+param);
			}
			BufferedReader in = new BufferedReader(new InputStreamReader(
					httpConn.getInputStream(), charset));
			String line;
			while ((line = in.readLine()) != null) {
				sTotalString += line;
				//sTotalString+="\r\n";
			}
			in.close();
			httpConn.disconnect();
			return sTotalString;
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}

}
