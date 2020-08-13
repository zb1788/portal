package vcom.sso.vo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;

import vcom.sso.vo.ou.VUser;


public class AuthResult implements Serializable {
	private String authFlg; //1 success 0 fail 2 no access
	
	private String authInfo; 
	
	private String appFlg;
	
	private VSysUser user;
	
	private VUser ouUser;//开放大学用户
	
	private String ut;
	
	private UserAuthority[] userAuthoritys;
	//temp token
	private String tmpToken;
	//是否需要用户同意个人信息授权 0 不需要 1 需要
	private String infoAllowUseNeed;
	//用户同意个人信息授权 提示信息
	private String infoAllowUseNeedTip;
	
	public String getAuthFlg() {
		return authFlg;
	}

	public void setAuthFlg(String authFlg) {
		this.authFlg = authFlg;
	}

	public String getAuthInfo() {
		return authInfo;
	}

	public void setAuthInfo(String authInfo) {
		this.authInfo = authInfo;
	}

	public String getAppFlg() {
		return appFlg;
	}

	public void setAppFlg(String appFlg) {
		this.appFlg = appFlg;
	}

	public VSysUser getUser() {
		return user;
	}

	public void setUser(VSysUser user) {
		this.user = user;
	}

	public UserAuthority[] getUserAuthoritys() {
		return userAuthoritys;
	}

	public void setUserAuthoritys(UserAuthority[] userAuthoritys) {
		this.userAuthoritys = userAuthoritys;
	}

	public VUser getOuUser() {
		return ouUser;
	}

	public void setOuUser(VUser ouUser) {
		this.ouUser = ouUser;
	}

	public String getUt() {
		return ut;
	}

	public void setUt(String ut) {
		this.ut = ut;
	}

	public String getTmpToken() {
		return tmpToken;
	}

	public void setTmpToken(String tmpToken) {
		this.tmpToken = tmpToken;
	}

	public String getInfoAllowUseNeed() {
		return infoAllowUseNeed;
	}

	public void setInfoAllowUseNeed(String infoAllowUseNeed) {
		this.infoAllowUseNeed = infoAllowUseNeed;
	}

	public String getInfoAllowUseNeedTip() {
		return infoAllowUseNeedTip;
	}

	public void setInfoAllowUseNeedTip(String infoAllowUseNeedTip) {
		this.infoAllowUseNeedTip = infoAllowUseNeedTip;
	}
	
}
