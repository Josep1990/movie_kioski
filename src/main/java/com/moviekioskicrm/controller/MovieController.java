package com.moviekioskicrm.controller;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moviekioskicrm.model.Movies;
import com.moviekioskicrm.repository.MovieRepository;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/movie-api/v1/")
public class MovieController {	
	
	@Autowired
	private MovieRepository movieRepository;
	
	private static List<Movies> movieData = new ArrayList<Movies>();
		
	//get all movies from database and send to front end
	@GetMapping("/movies")
	public List<Movies> getAllMovies(){
		
		return movieRepository.findAll();
		
	}	

//	@Bean
	@RequestMapping("/object") // add movies o the database
	public List<Movies> httpConnection () {
		
		int pageNumber= 1; // there 500 page each page return 20 movies we are using 100 movies so we load 1-5 page 
		
		HttpClient client   = HttpClient.newHttpClient();
		HttpRequest request = HttpRequest.newBuilder().uri(URI.create("https://api.themoviedb.org/3/movie/popular?api_key=f83efc3c1b5e1e80a321f365d98b068b&language=en-US&page="+pageNumber)).build();
		return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
				.thenApply(HttpResponse::body)
				.thenApply(MovieController::parse) //double colon is method reference operator s used to call a method by referring to it with the help of its class directly. They behave exactly as the lambda expressions. The only difference it has from lambda expressions is that this uses direct reference to the method by name instead of providing a delegate to the method.
				.join();		

	}	
	
	private static List<Movies> parse(String responseBody) {
		
		JSONObject movies = new JSONObject(responseBody);		
	    JSONArray movie = movies.getJSONArray("results");
	    int n = movie.length();	    
	    
	    
	    for (int i = 0; i < n; ++i) {
    	 	JSONObject info = movie.getJSONObject(i);		   
    	 	int id                   = info.getInt("id");
			String title             = info.getString("title"); 
			String release_date      = info.getString("release_date");
			String original_language = info.getString("original_language").toUpperCase();
			String poster_path       = info.getString("poster_path");	
		
			movieData.add(new Movies(id, title, release_date, original_language, "https://image.tmdb.org/t/p/w342" + poster_path));	
	    }			
		return movieData;		
	}		
	
//	@Bean
//	public void addMovies() {
//		
//		List<Movies> movieData = httpConnection();
//		
//		for(Movies movie: movieData){			
//			movieRepository.save(movie);
//		}		
//	}



	
	

}
