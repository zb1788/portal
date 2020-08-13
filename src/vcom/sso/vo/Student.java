package vcom.sso.vo;

import java.io.Serializable;
import java.util.ArrayList;

public class Student implements Serializable{
	private String studentId;//学生ID
	private String studentAccount;//学生帐号
	private String studentNumber;//学号
	private String realname;//姓名
	private String sex;//性别
	private StudentParent[] studentParents;//家长
	private ArrayList<StudentParent> studentParentArray=new ArrayList<StudentParent>();//家长	
	public void setStudentParents(StudentParent[] studentParents) {
		this.studentParents = studentParents;
	}

	private String email;
	private String concatNumber;//联系电话
	private String schoolId;//学校ID
	private String schoolClassId;//班级ID
	private String gradeCode;//年级
	private String headPhoto;//头像
	private String smsBuyed;//订购标记
	public String getStudentId() {
		return studentId;
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}
	public String getStudentAccount() {
		return studentAccount;
	}
	public void setStudentAccount(String studentAccount) {
		this.studentAccount = studentAccount;
	}
	public String getStudentNumber() {
		return studentNumber;
	}
	public void setStudentNumber(String studentNumber) {
		this.studentNumber = studentNumber;
	}
	public String getRealname() {
		return realname;
	}
	public void setRealname(String realname) {
		this.realname = realname;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}

	public StudentParent[] getStudentParents() {
		studentParents=new StudentParent[studentParentArray.size()];
		studentParents=studentParentArray.toArray(studentParents);
		return studentParents;
	}
	
	public ArrayList<StudentParent> refStudentParentArray() {
		return studentParentArray;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getConcatNumber() {
		return concatNumber;
	}
	public void setConcatNumber(String concatNumber) {
		this.concatNumber = concatNumber;
	}
	public String getSchoolId() {
		return schoolId;
	}
	public void setSchoolId(String schoolId) {
		this.schoolId = schoolId;
	}
	public String getSchoolClassId() {
		return schoolClassId;
	}
	public void setSchoolClassId(String schoolClassId) {
		this.schoolClassId = schoolClassId;
	}
	public String getHeadPhoto() {
		if(headPhoto==null || headPhoto.trim().equals(""))
		{
			if(sex!=null && sex.trim().equals("1"))
			{
				headPhoto="/upload/template/default_girl.jpg";
			}
			else if(sex!=null && sex.trim().equals("0"))
			{
				headPhoto="/upload/template/default_boy.jpg";
			}
		}
		return headPhoto;
	}
	public void setHeadPhoto(String headPhoto) {
		this.headPhoto = headPhoto;
	}
	public String getSmsBuyed() {
		return smsBuyed;
	}
	public void setSmsBuyed(String smsBuyed) {
		this.smsBuyed = smsBuyed;
	}
	public String getGradeCode() {
		return gradeCode;
	}
	public void setGradeCode(String gradeCode) {
		this.gradeCode = gradeCode;
	}
	
	public void setStudentParentArray(ArrayList<StudentParent> studentParentArray) {
		this.studentParentArray = studentParentArray;
	}
}
