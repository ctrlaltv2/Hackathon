package com.pronounce.hackathon;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

@SpringBootApplication
public class SpringbootGcsSignedUrlApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootGcsSignedUrlApplication.class, args);
	}

	@Bean
	public Storage getStorage() {
		Storage storage = null;
		InputStream io = getClass().getResourceAsStream("/key.json");
		try {
			storage = StorageOptions.newBuilder().setProjectId("main-crow-349906")
					.setCredentials(GoogleCredentials.fromStream(io)).build().getService();
		} catch (IOException e) {
			System.out.println("===error=");
		}
		return storage;
	}

	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}
}
