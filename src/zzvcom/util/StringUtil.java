/**
 * 
 */
package zzvcom.util;

import java.io.UnsupportedEncodingException;

/**
 * @author 苌黄林
 *
 */
public class StringUtil {
	 /**
     * 如果一个字符串为null，则返回空串
     * @param str
     * @return
     */
    public static String getStrFromNull(String str) {
        if (str == null || "null".equals(str) || "NULL".equals(str)) {
            str = "";
        }
        return str;
    }
    
    /**
     * 判断字符串是否为null或者空字符串
     * @param str
     * @return
     */
    public static boolean isBlank(String str){
    	if(str==null || str.trim().length()==0){
    		return true;
    	}
    	return false;
    }
    
    /**
     * 将字符串列表格式化为英文逗号分隔的字符串
     * @param l
     * @return
     */
    public static String listToString(java.util.List<String> l){
    	if(l!=null){
    		StringBuilder rsb=new StringBuilder();
    		for(String grantStr:l){
    			if(rsb.length()>0){
    				rsb.append(",");
    			}
    			rsb.append(grantStr);
    		}
    		return rsb.toString();
    	}
    	return null;
    }
    
    /**
     * @description：解码
     * @time： 2015-11-23
     * @author：donghaoyu
     * @param text
     * @return 
     */
    public static String decode4utf8(String text){
        if(text==null || text.trim().length()<=0)
            return text;
        String s = "";
            try {
                s = java.net.URLDecoder.decode(java.net.URLDecoder.decode(text, "utf-8"));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        return s;
    }
    
    public static void main(String[] args){
        String aa = "CMS.PAGE.A01003%253D%252FA01%252FA01003%252Flist_5.html%253Fpram%255C%253D1";
        try {
            aa = java.net.URLDecoder.decode(java.net.URLDecoder.decode(aa, "utf-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        };
        System.out.println(aa);
    }
    
}
