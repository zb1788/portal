package vcom.sso.vo;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class VSysUser implements Serializable {
	private String username;//用户名

	private String account;//帐号
	
	private String truename;//姓名
	
	private String nickname;//昵称
	
	private String sex;//性别
	
	private String state;//状态
	
	private String eduOrgId;
	
	private School school;
	
	
	private String email;//邮箱
	
	private String link;//手机
	
	private String usertype;//用户类型 2 教师 4 学生 0 家长
	
	private String headPhoto;//头像
	
	private String photo;//形象照
	
	private String isGather;
	
	private String regFlg; // 0 系统录入 1 自注册
	
	private String phoneActiveState;// 0 未绑定 1 已绑定
	
	private StudyStage[] studyStage=null;//学段
	
	private Grade grade=null;//年级

	private SysArea area = null;//行政区
	
	private SysCp[] sysCPs = null;
	
	private Group[] groups=null;
	
	private SchoolClass[] schoolClasses=null;
	
	public SchoolClass[] getSchoolClasses() {
		return schoolClasses;
	}

	public void setSchoolClasses(SchoolClass[] schoolClasses) {
		this.schoolClasses = schoolClasses;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getTruename() {
		return truename;
	}

	public void setTruename(String truename) {
		this.truename = truename;
	}
	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}
	
	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
	public Group[] getGroups() {
		return groups;
	}

	public void setGroups(Group[] groups) {
		this.groups = groups;
	}

	public SysCp[] getSysCPs() {
		return sysCPs;
	}

	public void setSysCPs(SysCp[] sysCPs) {
		this.sysCPs = sysCPs;
	}

	public String getIsGather() {
		return isGather;
	}

	public void setIsGather(String isGather) {
		this.isGather = isGather;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRegFlg() {
		return regFlg;
	}

	public void setRegFlg(String regFlg) {
		this.regFlg = regFlg;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getEduOrgId() {
		return eduOrgId;
	}

	public void setEduOrgId(String eduOrgId) {
		this.eduOrgId = eduOrgId;
	}

	public String getUsertype() {
		return usertype;
	}

	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}

	public School getSchool() {
		return school;
	}

	public void setSchool(School school) {
		this.school = school;
	}

	public SysArea getArea() {
		return area;
	}

	public void setArea(SysArea area) {
		this.area = area;
	}

	public StudyStage[] getStudyStage() {
		return studyStage;
	}

	public void setStudyStage(StudyStage[] studyStage) {
		this.studyStage = studyStage;
	}

	public Grade getGrade() {
		return grade;
	}

	public void setGrade(Grade grade) {
		this.grade = grade;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getHeadPhoto() {
		return headPhoto;
	}

	public void setHeadPhoto(String headPhoto) {
		this.headPhoto = headPhoto;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getPhoneActiveState() {
		return phoneActiveState;
	}

	public void setPhoneActiveState(String phoneActiveState) {
		this.phoneActiveState = phoneActiveState;
	}	
}
