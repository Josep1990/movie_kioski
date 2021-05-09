package com.moviekioskicrm;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;


import com.moviekioskicrm.model.Movies;
import com.moviekioskicrm.repository.MovieRepository;

@SpringBootApplication
public class MovieKioskiApplication {
	
	
	private static final Logger log = LoggerFactory.getLogger(MovieKioskiApplication.class);
	
//	@Bean
//	public RestTemplate getRestTemplate() {
//		return new RestTemplate();
//	}
	
	public static void main(String[] args) {
		SpringApplication.run(MovieKioskiApplication.class, args);
	}


}
