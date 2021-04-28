package com.moviekioskicrm.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.moviekioskicrm.model.Movies;
import com.moviekioskicrm.repository.MovieRepository;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/movie-api/v1/")
public class MovieController {	
	
	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	private RestTemplate restTemplate;
	
	private static String url = "https://api.themoviedb.org/3/movie/popular?api_key=f83efc3c1b5e1e80a321f365d98b068b&language=en-US&page=1";
	
	//private static String url = "https://restcountries.eu/rest/v2/all";
	
	
//	//get all movies
//	@GetMapping("/movies")
//	public List<Movies> getAllMovies(){
//		
//		return movieRepository.findAll();
//	}
	
	//get all employees
	@GetMapping("/movies")
	public List<Object> getAllMovies(){
		Object[] movies = restTemplate.getForObject(url, Object[].class);
		
		return Arrays.asList(movies);
	}
	
	
	
	@PostMapping("/movies")	
	public Movies addMovie(@RequestBody Movies movies) {
		return movieRepository.save(movies);
	}

}
