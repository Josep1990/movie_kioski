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

import com.moviekioskicrm.controller.MovieAPIConnection;
import com.moviekioskicrm.model.Movies;
import com.moviekioskicrm.repository.MovieRepository;

@SpringBootApplication
public class MovieKioskiApplication {
	
	
	private static final Logger log = LoggerFactory.getLogger(MovieKioskiApplication.class);
	
	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}
	
	public static void main(String[] args) {
		SpringApplication.run(MovieKioskiApplication.class, args);
	}
	
	
//	@Component
//	class saveMovies implements CommandLineRunner{
//		
//		@Autowired
//		private MovieRepository repository;
//		
//		@Override
//		public void run(String... args) throws Exception {
//			
//			MovieAPIConnection api = new MovieAPIConnection();
//			api.httpConnection();
//			repository.save(new Movies(MovieAPIConnection.id, MovieAPIConnection.title, MovieAPIConnection.release_date, MovieAPIConnection.original_language, MovieAPIConnection.poster_path));
//			log.info(api.httpConnection());
//			
//		}
//		
//		
//	}


}
