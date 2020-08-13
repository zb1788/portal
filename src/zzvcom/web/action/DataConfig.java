package zzvcom.web.action;

/**
 *配置管理项
 */
public class DataConfig {
	private String 	bbsid;//bbs编号
	private String 	vcom3dskey;//3D加密密码
	private String 	boundphone;//是否启用手机绑定.1-是,0-否
	private String 	vsms_platUser;//用户
	private String 	vsms_platPwd;//密码
	private String 	phoneusertype;//需要启用的用户角色
	private String 	vsms_content;//短信内容
	private String 	vsms_day;//验证时长
	private String 	repeatCheckTime;//检测用户是否重复登陆
	private String 	tempCodeCount;//临时码使用次数
	private String 	paytype		;//支付类型
	private String 	payalert	;//是否显示欠费/免费期提醒 0-关闭，默认1- 开启
	private String 	areaname	;//区域名字
	private String 	areacode	;//区域代码
	private String 	otherConfig	;//扩展属性
	private String 	balanceUrl	;//全国负载地址
	private String 	showupdate	;//是否开启升级提示 0关闭;1开启不允许登陆;2开启并允许登陆
	private String 	updateinfo	;//升级提示
	private String 	seokey		;//SEO搜索关键词
	private String 	icoimg		;//页面图标名(ico/目录下)
	private String 	interfaceConfigstr;//接口定制配置字符串
	private String domain		;//域名配置
	//private String protocol		;//浏览协议配置
	private String showindex	;//是否处理首页/默认页
	private String ubName		;//u币名称
	//不判断重复登录用户
	private String 	notcheckuser;
	//是否检测多用户登录
	private String 	repeatUsertype;
	//是否开启免费提醒和未绑定手机号提醒
	private String 	alerttype;
	//是否开启用户关联 1-是,0-否
	private String 	associate;
	//订购提示信息
	private String 	areamessage;
	//订购业务发送编码
	private String 	areaphonenumber;
	//门户登陆页面是否显示注册链接
	private String 	showreg;
	//登录后是否显示引导 0-否  1-是
	private String showguide;
	//教师首页引导链接
	private String teachUrl;
	//家长登首页导链接
	private String parentUrl;
	//小学生首页引导链接
	private String pupilUrl;
	//初高中生首页引导链接
	private String seniorUrl;
	//是否显示授课升级提示
	private String showSkUpdate;
	//授课升级提示信息
	private String skTip;
	//共建平台设置
	private String gjptpz;
	//主域模板
	private String module;
	private String 	spacedir	;//空间模板目录配置
	//主域logo
	private String logo;
	//主域首页logo
    private String indexlogo;
	
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public String getBbsid() {
		return bbsid;
	}
	public void setBbsid(String bbsid) {
		this.bbsid = bbsid;
	}
	public String getVcom3dskey() {
		return vcom3dskey;
	}
	public void setVcom3dskey(String vcom3dskey) {
		this.vcom3dskey = vcom3dskey;
	}
	public String getBoundphone() {
		return boundphone;
	}
	public void setBoundphone(String boundphone) {
		this.boundphone = boundphone;
	}
	public String getVsms_platUser() {
		return vsms_platUser;
	}
	public void setVsms_platUser(String vsmsPlatUser) {
		vsms_platUser = vsmsPlatUser;
	}
	public String getVsms_platPwd() {
		return vsms_platPwd;
	}
	public void setVsms_platPwd(String vsmsPlatPwd) {
		vsms_platPwd = vsmsPlatPwd;
	}
	public String getPhoneusertype() {
		return phoneusertype;
	}
	public void setPhoneusertype(String phoneusertype) {
		this.phoneusertype = phoneusertype;
	}
	public String getVsms_content() {
		return vsms_content;
	}
	public void setVsms_content(String vsmsContent) {
		vsms_content = vsmsContent;
	}
	public String getVsms_day() {
		return vsms_day;
	}
	public void setVsms_day(String vsmsDay) {
		vsms_day = vsmsDay;
	}
	public String getRepeatCheckTime() {
		return repeatCheckTime;
	}
	public void setRepeatCheckTime(String repeatCheckTime) {
		this.repeatCheckTime = repeatCheckTime;
	}
	public String getTempCodeCount() {
		return tempCodeCount;
	}
	public void setTempCodeCount(String tempCodeCount) {
		this.tempCodeCount = tempCodeCount;
	}
	public String getPaytype() {
		return paytype;
	}
	public void setPaytype(String paytype) {
		this.paytype = paytype;
	}
	public String getAreaname() {
		return areaname;
	}
	public void setAreaname(String areaname) {
		this.areaname = areaname;
	}
	public String getAreacode() {
		return areacode;
	}
	public void setAreacode(String areacode) {
		this.areacode = areacode;
	}
	public String getOtherConfig() {
		return otherConfig;
	}
	public void setOtherConfig(String otherConfig) {
		this.otherConfig = otherConfig;
	}
	public String getBalanceUrl() {
		return balanceUrl;
	}
	public void setBalanceUrl(String balanceUrl) {
		this.balanceUrl = balanceUrl;
	}
	public String getShowupdate() {
		return showupdate;
	}
	public void setShowupdate(String showupdate) {
		this.showupdate = showupdate;
	}
	public String getUpdateinfo() {
		return updateinfo;
	}
	public void setUpdateinfo(String updateinfo) {
		this.updateinfo = updateinfo;
	}
	public String getRepeatUsertype() {
		return repeatUsertype;
	}
	public void setRepeatUsertype(String repeatUsertype) {
		this.repeatUsertype = repeatUsertype;
	}
	public String getAlerttype() {
		return alerttype;
	}
	public void setAlerttype(String alerttype) {
		this.alerttype = alerttype;
	}
	public String getNotcheckuser() {
		return notcheckuser;
	}
	public void setNotcheckuser(String notcheckuser) {
		this.notcheckuser = notcheckuser;
	}
	public String getAssociate() {
		return associate;
	}
	public void setAssociate(String associate) {
		this.associate = associate;
	}
	public String getAreamessage() {
		return areamessage;
	}
	public void setAreamessage(String areamessage) {
		this.areamessage = areamessage;
	}
	public String getAreaphonenumber() {
		return areaphonenumber;
	}
	public void setAreaphonenumber(String areaphonenumber) {
		this.areaphonenumber = areaphonenumber;
	}
	public String getShowreg() {
		return showreg;
	}
	public void setShowreg(String showreg) {
		this.showreg = showreg;
	}
    public String getShowguide() {
        return showguide;
    }
    public void setShowguide(String showguide) {
        this.showguide = showguide;
    }
    public String getTeachUrl() {
        return teachUrl;
    }
    public void setTeachUrl(String teachUrl) {
        this.teachUrl = teachUrl;
    }
    public String getParentUrl() {
        return parentUrl;
    }
    public void setParentUrl(String parentUrl) {
        this.parentUrl = parentUrl;
    }
    public String getPupilUrl() {
        return pupilUrl;
    }
    public void setPupilUrl(String pupilUrl) {
        this.pupilUrl = pupilUrl;
    }
    public String getSeniorUrl() {
        return seniorUrl;
    }
    public void setSeniorUrl(String seniorUrl) {
        this.seniorUrl = seniorUrl;
    }
    public String getShowSkUpdate() {
        return showSkUpdate;
    }
    public void setShowSkUpdate(String showSkUpdate) {
        this.showSkUpdate = showSkUpdate;
    }
    public String getSkTip() {
        return skTip;
    }
    public void setSkTip(String skTip) {
        this.skTip = skTip;
    }
    public String getGjptpz() {
        return gjptpz;
    }
    public void setGjptpz(String gjptpz) {
        this.gjptpz = gjptpz;
    }
    public String getModule() {
        return module;
    }
    public void setModule(String module) {
        this.module = module;
    }
    public String getLogo() {
        return logo;
    }
    public void setLogo(String logo) {
        this.logo = logo;
    }
    public String getIndexlogo() {
        return indexlogo;
    }
    public void setIndexlogo(String indexlogo) {
        this.indexlogo = indexlogo;
    }
	public String getSeokey() {
		return seokey;
	}
	public void setSeokey(String seokey) {
		this.seokey = seokey;
	}
	public String getIcoimg() {
		return icoimg;
	}
	public void setIcoimg(String icoimg) {
		this.icoimg = icoimg;
	}
	public String getSpacedir() {
		return spacedir;
	}
	public void setSpacedir(String spacedir) {
		this.spacedir = spacedir;
	}
	public String getPayalert() {
		return payalert;
	}
	public void setPayalert(String payalert) {
		this.payalert = payalert;
	}
	public String getInterfaceConfigstr() {
		return interfaceConfigstr;
	}
	public void setInterfaceConfigstr(String interfaceConfigstr) {
		this.interfaceConfigstr = interfaceConfigstr;
	}
	/*
	public String getProtocol() {
		return protocol;
	}
	public void setProtocol(String protocol) {
		this.protocol = protocol;
	}
	*/
	public String getShowindex() {
		return showindex;
	}
	public void setShowindex(String showindex) {
		this.showindex = showindex;
	}
	public String getUbName() {
		return ubName;
	}
	public void setUbName(String ubName) {
		this.ubName = ubName;
	}
	
}
