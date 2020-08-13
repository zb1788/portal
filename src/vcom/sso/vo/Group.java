package vcom.sso.vo;

import java.io.Serializable;
import java.util.Date;

public class Group implements Serializable {
	public static final String GROUP_REARCH="RG";//教研组
	public static final String GROUP_INTEREST="IG";//兴趣组
	public static final String GROUP_TEACHER="TG";//教师组
	public static final String GROUP_STUDENT="SG";//学生组
	public static final String GROUP_PARENT="PG";//家长组
	public static final String GROUP_EXECLLENT_TEACHER="EG";//名师组

	
	private Long gtId;//组ID
	private String gtName;//组名称
	private String areaId;//行政区ID
	private String eduOrgId;//教育机构ID
	private String eduOrgName;
	private String schoolId;//学校ID
	private String schoolName;
	private String createUser;//创建者
	private String groupType;//组类型 tg 教师组 sg学生组 pg家长组 ig兴趣组 rg 教研组 eg名师组
	private String vistable;//是否允许访问 0 不允许非成员访问 1 允许非成员访问
	private String joinable;//加入限制 0 自由加入 1 申请加入 2 邀请加入
	private String groupClass;//组分类
	private String groupLogo;//组封面
	private String groupDesp;//组描述
	private int memberCount;//成员个数
	private String createTime;//创建时间
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public int getMemberCount() {
		return memberCount;
	}
	public void setMemberCount(int memberCount) {
		this.memberCount = memberCount;
	}
	public String getVistable() {
		return vistable;
	}
	public String getGroupLogo() {
		return groupLogo;
	}
	public void setGroupLogo(String groupLogo) {
		this.groupLogo = groupLogo;
	}
	public String getGroupDesp() {
		return groupDesp;
	}
	public void setGroupDesp(String groupDesp) {
		this.groupDesp = groupDesp;
	}
	public void setVistable(String vistable) {
		this.vistable = vistable;
	}
	public String getGroupType() {
		return groupType;
	}
	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}
	public Long getGtId() {
		return gtId;
	}
	public void setGtId(Long gtId) {
		this.gtId = gtId;
	}
	public String getGtName() {
		return gtName;
	}
	public void setGtName(String gtName) {
		this.gtName = gtName;
	}
	public String getAreaId() {
		return areaId;
	}
	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}
	public String getEduOrgId() {
		return eduOrgId;
	}
	public void setEduOrgId(String eduOrgId) {
		this.eduOrgId = eduOrgId;
	}
	public String getSchoolId() {
		return schoolId;
	}
	public void setSchoolId(String schoolId) {
		this.schoolId = schoolId;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public String getGroupClass() {
		return groupClass;
	}
	public void setGroupClass(String groupClass) {
		this.groupClass = groupClass;
	}
	public String getJoinable() {
		return joinable;
	}
	public void setJoinable(String joinable) {
		this.joinable = joinable;
	}
	public String getEduOrgName() {
		return eduOrgName;
	}
	public void setEduOrgName(String eduOrgName) {
		this.eduOrgName = eduOrgName;
	}
	public String getSchoolName() {
		return schoolName;
	}
	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}
}
