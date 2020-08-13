package zzvcom.util;

import java.net.URL;
import java.net.HttpURLConnection;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;

/**
 * 
 * @author liuzhiqiang
 * 
 */
public class FileUtil {
	static Logger logger = Logger.getLogger(FileUtil.class);
	
	/**
	 * 把文本保存进文件
	 * @param content
	 * @param path
	 */
	public void saveStrngFile(String content,String path){
		File file=new File(path.substring(0, path.lastIndexOf("/")));
		if(!file.exists())file.mkdirs();
		try {
    		//FileOutputStream out = new FileOutputStream(path);
			//out.write(content.getBytes());
			Writer out=new BufferedWriter(new OutputStreamWriter(new FileOutputStream( path),"utf-8"));  
			out.write(content);  
			out.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public String savepic(String urlpath,String filepath) {		
		String urlStr = urlpath;
		String destination = filepath;
		try {
			File file=new File(filepath.substring(0, destination.lastIndexOf("/")));
			File filepic=new File(destination);
			if(!file.exists())file.mkdirs();
			if(!filepic.exists()){
				byte[] chunk = new byte[4096];
				URL url = new URL(urlStr);
				InputStream is = url.openStream();
				int count;
				FileOutputStream out = new FileOutputStream(filepic);
				while ((count = is.read(chunk)) >= 0) {
					byte[] t = new byte[count];
					System.arraycopy(chunk, 0, t, 0, count);
					out.write(t);
				}
				out.close();
			}
			return "success";
		} catch (Exception ex) {
			return "err";
		}
	}
}