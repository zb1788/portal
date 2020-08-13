package vcom.sso.vo;

import java.io.Serializable;

public class StudentDetail implements Serializable {
	private Student student;
	private StudyStage studyStage;
	public Student getStudent() {
		return student;
	}
	public void setStudent(Student student) {
		this.student = student;
	}
	public StudyStage getStudyStage() {
		return studyStage;
	}
	public void setStudyStage(StudyStage studyStage) {
		this.studyStage = studyStage;
	}
}
