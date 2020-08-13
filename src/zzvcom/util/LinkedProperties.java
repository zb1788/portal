package zzvcom.util;

import java.util.Collections;
import java.util.Enumeration;
import java.util.LinkedHashSet;
import java.util.Properties;
import java.util.Set;

/**
 * 继承properties,保证顺序写入properties文件 。
 * (自带的properties,键所对应的值被重新写入后,会打乱原有排列的顺序)
 * @time 2014-5-14
 * @author lxj
 */
public class LinkedProperties extends Properties{
	 private static final long serialVersionUID = -4627607243846121965L;
     
	    private final LinkedHashSet<Object> keys = new LinkedHashSet<Object>();
	 
	    public Enumeration<Object> keys() {
	        return Collections.<Object> enumeration(keys);
	    }
	 
	    public Object put(Object key, Object value) {
	        keys.add(key);
	        return super.put(key, value);
	    }
	 
	    public Set<Object> keySet() {
	        return keys;
	    }
	 
	    public Set<String> stringPropertyNames() {
	        Set<String> set = new LinkedHashSet<String>();
	 
	        for (Object key : this.keys) {
	            set.add((String) key);
	        }
	 
	        return set;
	    }
}
