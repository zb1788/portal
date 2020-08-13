package vcom.sso.vo;

import java.io.Serializable;

public class School implements Serializable {
	private String schoolId;
	private String areaId;
	private String schoolName;
	private String schoolType;//类型   小学 初中 高中 完中 一贯制 一贯制九年
	public String getSchoolType() {
		return schoolType;
	}
	public void setSchoolType(String schoolType) {
		this.schoolType = schoolType;
	}
	private String eduYears;//学制 六三 、五四
	public String getEduYears() {
		return eduYears;
	}
	public void setEduYears(String eduYears) {
		this.eduYears = eduYears;
	}
	public String getSchoolId() {
		return schoolId;
	}
	public void setSchoolId(String schoolId) {
		this.schoolId = schoolId;
	}
	public String getAreaId() {
		return areaId;
	}
	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}
	public String getSchoolName() {
		return schoolName;
	}
	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}
}
