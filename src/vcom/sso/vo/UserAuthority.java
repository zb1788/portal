package vcom.sso.vo;

import java.io.Serializable;
import java.util.LinkedHashSet;

public class UserAuthority implements Serializable{
	private String appFlg;
	private String appFlgNo;
	private String appName;
	private SysModule[] modules;
	public String getAppFlg() {
		return appFlg;
	}
	public void setAppFlg(String appFlg) {
		this.appFlg = appFlg;
	}
	public String getAppFlgNo() {
		return appFlgNo;
	}
	public void setAppFlgNo(String appFlgNo) {
		this.appFlgNo = appFlgNo;
	}
	public String getAppName() {
		return appName;
	}
	public void setAppName(String appName) {
		this.appName = appName;
	}
	public SysModule[] getModules() {
		return modules;
	}
	public void setModules(SysModule[] modules) {
		this.modules = modules;
	}
}
