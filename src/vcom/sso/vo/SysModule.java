package vcom.sso.vo;

import java.util.HashSet;
import java.util.Set;

/**
 * SysModule generated by MyEclipse Persistence Tools
 */

public class SysModule implements java.io.Serializable
{

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 900379002675354997L;

	private String moduleid;

	private String parentid;

	private String modulename;
	
	private String moduleLevel;

	private String moduleurl;

	private String moveinpic;

	private String moveoutpic;

	private String allowuse;

	private String allowshow;

	private Long orderid;
	
	private String c1;

	private String c2;
	
	private String c3;
	
	private String c4;
	
	private String moduleurl_3g;
	private String icon_3g;
	private String enable_3g;

	// Constructors

	/**
	 * @return roles
	 */

	public String getC1() {
		return c1;
	}

	public void setC1(String c1) {
		this.c1 = c1;
	}

	public String getC2() {
		return c2;
	}

	public void setC2(String c2) {
		this.c2 = c2;
	}

	public String getC3() {
		return c3;
	}

	public void setC3(String c3) {
		this.c3 = c3;
	}

	public String getC4() {
		return c4;
	}

	public void setC4(String c4) {
		this.c4 = c4;
	}

	/** default constructor */
	public SysModule()
	{
	}

	/** minimal constructor */
	public SysModule(String parentid, String modulename, String allowuse,
			String allowshow)
	{
		this.parentid = parentid;
		this.modulename = modulename;
		this.allowuse = allowuse;
		this.allowshow = allowshow;
	}

	/** full constructor */
	public SysModule(String parentid, String modulename, String moduleurl,
			String moveinpic, String moveoutpic, String allowuse,
			String allowshow, long orderid)
	{
		this.parentid = parentid;
		this.modulename = modulename;
		this.moduleurl = moduleurl;
		this.moveinpic = moveinpic;
		this.moveoutpic = moveoutpic;
		this.allowuse = allowuse;
		this.allowshow = allowshow;
		this.orderid = orderid;
	}

	// Property accessors

	public String getModuleid()
	{
		return this.moduleid;
	}

	public void setModuleid(String moduleid)
	{
		this.moduleid = moduleid;
	}

	public String getParentid()
	{
		return this.parentid;
	}

	public void setParentid(String parentid)
	{
		this.parentid = parentid;
	}

	public String getModulename()
	{
		return this.modulename;
	}

	public void setModulename(String modulename)
	{
		this.modulename = modulename;
	}

	public String getModuleurl()
	{
		return this.moduleurl;
	}

	public void setModuleurl(String moduleurl)
	{
		this.moduleurl = moduleurl;
	}

	public String getMoveinpic()
	{
		return this.moveinpic;
	}

	public void setMoveinpic(String moveinpic)
	{
		this.moveinpic = moveinpic;
	}

	public String getMoveoutpic()
	{
		return this.moveoutpic;
	}

	public void setMoveoutpic(String moveoutpic)
	{
		this.moveoutpic = moveoutpic;
	}

	public String getAllowuse()
	{
		return this.allowuse;
	}

	public void setAllowuse(String allowuse)
	{
		this.allowuse = allowuse;
	}

	public String getAllowshow()
	{
		return this.allowshow;
	}

	public void setAllowshow(String allowshow)
	{
		this.allowshow = allowshow;
	}

	public Long getOrderid()
	{
		return this.orderid;
	}

	public void setOrderid(Long orderid)
	{
		this.orderid = orderid;
	}

	public int hashCode()
	{
		return this.getModuleid().hashCode();
	}
	public boolean equals(Object o)
	{
		if(o==null) return false;
		if(this==o) return true;
		if(this.getModuleid()==null || !(o instanceof SysModule))
			return false;
		SysModule sysModule=(SysModule)o;
		return this.getModuleid().equals(sysModule.getModuleid());
	}

	public String getModuleLevel() {
		return moduleLevel;
	}

	public void setModuleLevel(String moduleLevel) {
		this.moduleLevel = moduleLevel;
	}

	public String getModuleurl_3g() {
		return moduleurl_3g;
	}

	public void setModuleurl_3g(String moduleurl_3g) {
		this.moduleurl_3g = moduleurl_3g;
	}

	public String getIcon_3g() {
		return icon_3g;
	}

	public void setIcon_3g(String icon_3g) {
		this.icon_3g = icon_3g;
	}

	public String getEnable_3g() {
		return enable_3g;
	}

	public void setEnable_3g(String enable_3g) {
		this.enable_3g = enable_3g;
	}
}