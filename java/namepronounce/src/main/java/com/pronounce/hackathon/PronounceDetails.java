package com.pronounce.hackathon;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PronounceDetails implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String name;
	private String gender;
	private String language;
	private String country;
	private Long id;
	private String phoneme;
	private String  grafeme;
	private String filename;
	private String empid;
	private int likes;
	private int dislikes;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getPhoneme() {
		return phoneme;
	}
	public void setPhoneme(String phoneme) {
		this.phoneme = phoneme;
	}
	public String getGrafeme() {
		return grafeme;
	}
	public void setGrafeme(String grafeme) {
		this.grafeme = grafeme;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getEmpid() {
		return empid;
	}
	public void setEmpid(String empid) {
		this.empid = empid;
	}
	public int getLikes() {
		return likes;
	}
	public void setLikes(int likes) {
		this.likes = likes;
	}
	public int getDislikes() {
		return dislikes;
	}
	public void setDislikes(int dislikes) {
		this.dislikes = dislikes;
	}
	
}
