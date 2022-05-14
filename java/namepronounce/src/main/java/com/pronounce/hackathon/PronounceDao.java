package com.pronounce.hackathon;

import java.util.List;

public interface PronounceDao {

	List<PronounceDetails> findAll();
	PronounceDetails create(PronounceDetails pronounce);
	List<PronounceDetails> fetch(String name,String id,String filename,String language);
	
}
