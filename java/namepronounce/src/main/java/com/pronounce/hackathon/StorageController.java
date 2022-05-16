package com.pronounce.hackathon;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import javax.activation.FileTypeMap;
import javax.annotation.Nullable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Blob.BlobSourceOption;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin(origins="*",maxAge=3600)
class StorageController {

	@Value("${bucketname}")
	String bucketName;
	// @Value("subdirectory")
	String subdirectory;
	// @Value("${spring.cloud.gcp.credentials.location}")
	ClassPathResource resource = new ClassPathResource("key.json");
	@Autowired
	PronounceDao pronounceDao;
	@Autowired
	Storage storage;
	@Autowired
	RestTemplate restTemplate;
	@Value("${phenemeURL}")
	String phenemeURL;

	@PostMapping(value = "/api/upload", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<PronounceDetails> uploadFile(@RequestPart("file") FilePart filePart,
			@RequestPart("pronounce") String pronounce) throws IOException {
		PronounceDetails pronouceDetails = new PronounceDetails();
		ObjectMapper maper = new ObjectMapper();
		pronouceDetails = maper.readValue(pronounce, PronounceDetails.class);
		String phenemeJson = restTemplate.getForEntity(phenemeURL+pronouceDetails.getName(), String.class).getBody();
		phenemeJson=phenemeJson.replaceAll("'", "\"");
		phenemeJson=phenemeJson.replaceFirst("\"", "");
		//phenemeJson=phenemeJson.replace ("\"", "");
		Pheneme pheneme = maper.readValue(phenemeJson, Pheneme.class);
		pronouceDetails.setPhoneme(pheneme.getPhoneme().get(0));
		pronouceDetails.setGrafeme(pheneme.getGraheme());
		Long timestamp = System.currentTimeMillis();

		final byte[] byteArray = convertToByteArray(filePart);
		int index = filePart.filename().lastIndexOf('.');
		String extension = filePart.filename().substring(index + 1);
		String fileNameinGCP = String.valueOf(timestamp) + "_" + pronouceDetails.getName().replaceAll("\\s","")+ "." + extension;
		pronouceDetails.setFilename(fileNameinGCP);
		Random rand = new Random();
		final BlobId blobId = constructBlobId(bucketName, subdirectory, fileNameinGCP);
		BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("text/plain").build();
		
		storage.create(blobInfo, byteArray);
		
		if(pronouceDetails.getId() == null ) {
			pronouceDetails.setEmpid(String.valueOf(rand.nextInt(9999999)));
			pronounceDao.create(pronouceDetails);
		}
		else {
			pronounceDao.udateProfile(pronouceDetails);
		}

		return new ResponseEntity<>(pronouceDetails, HttpStatus.OK);
	}

	@GetMapping(value = "/api/fetch")
	public ResponseEntity<List<PronounceDetails>> getDetails(
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "id", required = false) String id,
			@RequestParam(value = "filename", required = false) String filename,
			@RequestParam(value = "language", required = false) String language,
			@RequestParam(value = "empid", required = false) String empid) {
		List<PronounceDetails> list = pronounceDao.fetch(name, id, filename,language,empid);
		if (list != null) {
			return new ResponseEntity<>(list, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	}

	@GetMapping(value = "/api/download")
	public ResponseEntity<byte[]> download(@RequestParam(value = "filename", required = true) String filename) {

		BlobId blobId = BlobId.of(bucketName, filename);
		Blob blob = storage.get(blobId);
		return ResponseEntity.ok()
				.contentType(MediaType.valueOf(FileTypeMap.getDefaultFileTypeMap().getContentType(filename)))
				.body(blob.getContent(BlobSourceOption.generationMatch()));
	}
	@GetMapping(value = "/api/likes")
	public ResponseEntity<PronounceDetails> updateLikesCount(@RequestParam(value = "id", required = true) String id) {
		List<PronounceDetails> list = pronounceDao.udateLikes(id);
		if (list != null) {
			return new ResponseEntity<>(list.get(0), HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	}
	@GetMapping(value = "/api/dislikes")
	public ResponseEntity<PronounceDetails> updateDisLikesCount(@RequestParam(value = "id", required = true) String id) {
		List<PronounceDetails> list = pronounceDao.udateDisLikes(id);
		if (list != null & !list.isEmpty()) {
			return new ResponseEntity<>(list.get(0), HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping(value = "/api/getProfiles")
	public ResponseEntity<List<PronounceDetails>> getProfile() {
		List<PronounceDetails> list = pronounceDao.findAll();
		if (list != null & !list.isEmpty()) {
			return new ResponseEntity<>(list, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	}
	@PostMapping(value = "/api/updateProfiles")
	public ResponseEntity<PronounceDetails> updateProfile(@RequestBody PronounceDetails pronouce) {
		PronounceDetails obj = pronounceDao.udateProfile(pronouce);
		if (obj != null ) {
			return new ResponseEntity<>(obj, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	}

	/**
	 * Construct Blob ID
	 *
	 * @param bucketName
	 * @param subdirectory optional
	 * @param fileName
	 * @return
	 */
	private BlobId constructBlobId(String bucketName, @Nullable String subdirectory, String fileName) {
		return Optional.ofNullable(subdirectory).map(s -> BlobId.of(bucketName, subdirectory + "/" + fileName))
				.orElse(BlobId.of(bucketName, fileName));
	}

	/**
	 * Here, we convert the file to a byte array to be sent to GCS Libraries
	 *
	 * @param filePart File to be used
	 * @return Byte Array with all the contents of the file
	 * @throws IOException
	 */
	@SneakyThrows
	private byte[] convertToByteArray(FilePart filePart) throws IOException {
		try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
			filePart.content().subscribe(dataBuffer -> {
				byte[] bytes = new byte[dataBuffer.readableByteCount()];
				// log.trace("readable byte count:" + dataBuffer.readableByteCount());
				dataBuffer.read(bytes);
				DataBufferUtils.release(dataBuffer);
				try {
					bos.write(bytes);
				} catch (IOException e) {
					// log.error("read request body error...", e);
				}
			});

			return bos.toByteArray();
		}
	}


}
