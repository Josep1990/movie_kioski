package com.moviekioskicrm.controller;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.json.JSONArray;
import org.json.JSONObject;


import com.moviekioskicrm.model.Movies;

//import httprequesttest.AsyncHttpRequest;

public class MovieAPIConnection {
	
 	public static long id;                 
 	public static String title;
 	public static String release_date;
 	public static String original_language;
 	public static String poster_path;

	public String httpConnection () {
		
		HttpClient client   = HttpClient.newHttpClient();
		HttpRequest request = HttpRequest.newBuilder().uri(URI.create("https://api.themoviedb.org/3/movie/popular?api_key=f83efc3c1b5e1e80a321f365d98b068b&language=en-US&page=1")).build();
		return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
				.thenApply(HttpResponse::body)
				.thenApply(MovieAPIConnection::parse) //double colon is method reference operator s used to call a method by referring to it with the help of its class directly. They behave exactly as the lambda expressions. The only difference it has from lambda expressions is that this uses direct reference to the method by name instead of providing a delegate to the method.
				.join();		

	}	
	
	public static String parse(String responseBody) {
	
		final JSONObject movies = new JSONObject(responseBody);		
	    final JSONArray movie = movies.getJSONArray("results");
	    final int n = movie.length();
	    
	  //  Movies data = null; 
	    
	    for (int i = 0; i < n; ++i) {
	    	 	JSONObject info = movie.getJSONObject(i);
	    	 	
	    	 	id                = info.getLong("id");
				title             = info.getString("title"); 
				release_date      = info.getString("release_date");
				original_language = info.getString("original_language");
				poster_path       = info.getString("poster_path");								
				
				//System.out.println(title + "\n " + overview + "\n " + poster + "\n " + id);
				
				//data = new Movies(id, title, release_date, original_language, poster_path);
	    }	
		
		
		return null;
		
	}

}
