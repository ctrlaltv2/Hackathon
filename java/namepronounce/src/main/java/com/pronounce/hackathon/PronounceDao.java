package com.pronounce.hackathon;

import java.util.List;

public interface PronounceDao {

	List<PronounceDetails> findAll();
	PronounceDetails create(PronounceDetails pronounce);
	List<PronounceDetails> fetch(String name,String id,String filename,String language,String country,String gender);
	List<PronounceDetails> udateLikes(String id);
	List<PronounceDetails> udateDisLikes(String id);
	PronounceDetails udateProfile(PronounceDetails obj);
	void createComments(Comments comments);
}
