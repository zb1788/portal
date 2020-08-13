package vcom.sso.vo;

import java.io.Serializable;

public class SchoolClass implements Serializable {
	private String classId;//班级ID 
	private String schoolId;//所属学校ID
	private String gradeCode;//年级编码
	private String classCode;//班号
	private String createYear;//建班年份
	private String className;//班级名称
	private String classSecond_name;//班级荣誉称号
	private String classType;//班级类型
	private String classTeacher;//班主任帐号
	private String classMonitor;//班长帐号
	private String classRemark;//备注
	private String classCover;//班级封面
	public String getClassId() {
		return classId;
	}
	public void setClassId(String classId) {
		this.classId = classId;
	}
	public String getSchoolId() {
		return schoolId;
	}
	public void setSchoolId(String schoolId) {
		this.schoolId = schoolId;
	}
	public String getGradeCode() {
		return gradeCode;
	}
	public void setGradeCode(String gradeCode) {
		this.gradeCode = gradeCode;
	}
	public String getClassCode() {
		return classCode;
	}
	public void setClassCode(String classCode) {
		this.classCode = classCode;
	}
	public String getCreateYear() {
		return createYear;
	}
	public void setCreateYear(String createYear) {
		this.createYear = createYear;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getClassSecond_name() {
		return classSecond_name;
	}
	public void setClassSecond_name(String classSecond_name) {
		this.classSecond_name = classSecond_name;
	}
	public String getClassType() {
		return classType;
	}
	public void setClassType(String classType) {
		this.classType = classType;
	}
	public String getClassTeacher() {
		return classTeacher;
	}
	public void setClassTeacher(String classTeacher) {
		this.classTeacher = classTeacher;
	}
	public String getClassMonitor() {
		return classMonitor;
	}
	public void setClassMonitor(String classMonitor) {
		this.classMonitor = classMonitor;
	}
	public String getClassRemark() {
		return classRemark;
	}
	public void setClassRemark(String classRemark) {
		this.classRemark = classRemark;
	}
	public String getClassCover() {
		return classCover;
	}
	public void setClassCover(String classCover) {
		this.classCover = classCover;
	}
}
