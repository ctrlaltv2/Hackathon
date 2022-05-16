package com.pronounce.hackathon;

import java.io.Serializable;

public class Comments implements  Serializable{


	private static final long serialVersionUID = -3309529005425230949L;
	
	private String email;
	private int id;
	private int commentId;
	private String name;
	private String commentsDesc;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCommentId() {
		return commentId;
	}
	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCommentsDesc() {
		return commentsDesc;
	}
	public void setCommentsDesc(String commentsDesc) {
		this.commentsDesc = commentsDesc;
	}
	
}
