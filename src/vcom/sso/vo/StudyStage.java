package vcom.sso.vo;

import java.io.Serializable;

public class StudyStage implements Serializable {
	private String studyStageCode;
	private String studyStageName;
	public String getStudyStageCode() {
		return studyStageCode;
	}
	public void setStudyStageCode(String studyStageCode) {
		this.studyStageCode = studyStageCode;
	}
	public String getStudyStageName() {
		return studyStageName;
	}
	public void setStudyStageName(String studyStageName) {
		this.studyStageName = studyStageName;
	}
}
