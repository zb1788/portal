package vcom.sso.vo;

import java.io.Serializable;

public class Grade  implements Serializable {
	private String gradeCode;
	private String studyStageCode;
	private String gradeName;
	public String getGradeCode() {
		return gradeCode;
	}
	public void setGradeCode(String gradeCode) {
		this.gradeCode = gradeCode;
	}
	public String getStudyStageCode() {
		return studyStageCode;
	}
	public void setStudyStageCode(String studyStageCode) {
		this.studyStageCode = studyStageCode;
	}
	public String getGradeName() {
		return gradeName;
	}
	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}
}
