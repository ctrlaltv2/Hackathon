package com.pronounce.hackathon;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Test {

	public static void main(String[] args) throws JsonMappingException, JsonProcessingException {
		
		String  s = "{'name': 'Swaroop', 'phoneme': ['swɔruːp']}";
		s = s.replaceAll("'", "\"");
		System.out.println(s);
		Pheneme obj = new Pheneme();
		obj.setName("Name");
		List l = new ArrayList<>();
		l.add("swɔruːp");
		obj.setPhoneme(l);
		ObjectMapper maper = new ObjectMapper();
		
		System.out.println(maper.writeValueAsString(obj));
		Pheneme ss = maper.readValue(s, Pheneme.class);
		System.out.println(ss);
	}
}
