package vcom.sso.vo.ou;

import java.io.Serializable;

public class Course implements Serializable {
	private String id;
	private String name;
	private String subjectid;
	private String choosecategery;//培养方案内或培养方案外 1培养方案内  2培养方案外
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSubjectid() {
		return subjectid;
	}
	public void setSubjectid(String subjectid) {
		this.subjectid = subjectid;
	}
	public String getChoosecategery() {
		return choosecategery;
	}
	public void setChoosecategery(String choosecategery) {
		this.choosecategery = choosecategery;
	}
}
