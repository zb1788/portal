package zzvcom.web.servlet;

import java.util.Map;

class UIConfig{
	private String urlName;
	private String className;
	private String methodName;
	private Map<String,String> result;
	public String getUrlName() {
		return urlName;
	}
	public void setUrlName(String urlName) {
		this.urlName = urlName;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getMethodName() {
		return methodName;
	}
	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}
	public String getResult(String name) {
		if(result!=null){
			return result.get(name);
		}
		return null;
	}
	public void setResult(Map<String, String> result) {
		this.result = result;
	}
}