package com.pronounce.hackathon;

import java.io.Serializable;
import java.util.List;

public class Pheneme implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7324853048004683713L;
	private List<String> phoneme;
	private String name;
	private String graheme;

	public List<String> getPhoneme() {
		return phoneme;
	}

	public void setPhoneme(List<String> phoneme) {
		this.phoneme = phoneme;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGraheme() {
		return graheme;
	}

	public void setGraheme(String graheme) {
		this.graheme = graheme;
	}

}
