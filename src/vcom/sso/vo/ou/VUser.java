package vcom.sso.vo.ou;

import java.io.Serializable;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

public class VUser implements Serializable {
	private String code;
	private String studycode;
	private String studentid;	
	private String name;	
	private String sex;//1男；2女	
	private String type ;//1学生；2教师	
	private String role;
	private Classinfo classinfo;
	private Learningcenter learningcenter;
	private Set<Subject> subjects  = new LinkedHashSet<Subject>(0);
	private Course[] courses;
	public String getStudentid() {
		return studentid;
	}
	public void setStudentid(String studentid) {
		this.studentid = studentid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Learningcenter getLearningcenter() {
		return learningcenter;
	}
	public void setLearningcenter(Learningcenter learningcenter) {
		this.learningcenter = learningcenter;
	}
	public Set<Subject> getSubjects() {
		return subjects;
	}
	public void setSubjects(Set<Subject> subjects) {
		this.subjects = subjects;
	}
	public Course[] getCourses() {
		return courses;
	}
	public void setCourses(Course[] courses) {
		this.courses = courses;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getStudycode() {
		return studycode;
	}
	public void setStudycode(String studycode) {
		this.studycode = studycode;
	}
	public Classinfo getClassinfo() {
		return classinfo;
	}
	public void setClassinfo(Classinfo classinfo) {
		this.classinfo = classinfo;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
}
