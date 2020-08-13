package vcom.sso.pdgrant;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;

public class ProductGrantRtn implements Serializable {
    private String username;
    private String userType;
    private String appFlg;
    private String tip;
    private String reasonUrl;
    private ArrayList<String> appNumbersNoGrant;////未授权的应用模块识别码列表
    private LinkedHashMap<String,String> appIdNameMap;//模块ID和名称对照表
    private LinkedHashMap<String,String> appIdNumberMap;//模块ID和应用模块识别码对照表
    
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getUserType() {
        return userType;
    }
    public void setUserType(String userType) {
        this.userType = userType;
    }
    public String getAppFlg() {
        return appFlg;
    }
    public void setAppFlg(String appFlg) {
        this.appFlg = appFlg;
    }
    public String getTip() {
        return tip;
    }
    public void setTip(String tip) {
        this.tip = tip;
    }
    public String getReasonUrl() {
        return reasonUrl;
    }
    public void setReasonUrl(String reasonUrl) {
        this.reasonUrl = reasonUrl;
    }
    
    public ArrayList<String> getAppNumbersNoGrant() {
        return appNumbersNoGrant;
    }
    public void setAppNumbersNoGrant(ArrayList<String> appNumbersNoGrant) {
        this.appNumbersNoGrant = appNumbersNoGrant;
    }
    public LinkedHashMap<String,String> getAppIdNameMap() {
        return appIdNameMap;
    }
    public void setAppIdNameMap(LinkedHashMap<String,String> appIdNameMap) {
        this.appIdNameMap = appIdNameMap;
    }
    public LinkedHashMap<String,String> getAppIdNumberMap() {
        return appIdNumberMap;
    }
    public void setAppIdNumberMap(LinkedHashMap<String,String> appIdNumberMap) {
        this.appIdNumberMap = appIdNumberMap;
    }
    
}
