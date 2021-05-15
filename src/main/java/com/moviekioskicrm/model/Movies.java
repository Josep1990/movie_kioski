package com.moviekioskicrm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity //defines this class as a entiry in the database
@Table(name = "movies") //table called movies
public class Movies {
	
	
	
	@Id //set this filed as id but we are using the id movies that come from the api so we dont need to specify auto increment
	private long id;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "release_date")
	private String release_date;
	
	@Column(name = "original_language")
	private String original_language;
	
	@Column(name = "poster_path")
	private String poster_path;
	
	//default constructor need for the JPA
	public Movies() {
		
	}
	//movie constructor
	public Movies(long id, String title, String release_date, String original_language, String poster_path) {
	
		this.id                = id;
		this.title             = title;
		this.release_date      = release_date;
		this.original_language = original_language;
		this.poster_path       = poster_path;

	}
	//getters and setters
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getRelease_date() {
		return release_date;
	}

	public void setRelease_date(String release_date) {
		this.release_date = release_date;
	}

	public String getOriginal_language() {
		return original_language;
	}

	public void setOriginal_language(String original_language) {
		this.original_language = original_language;
	}

	public String getPoster_path() {
		return poster_path;
	}

	public void setPoster_path(String poster_path) {
		this.poster_path = poster_path;
	}

//	public String getMovie_status() {
//		return movie_status;
//	}
//
//	public void setMovie_status(String movie_status) {
//		this.movie_status = movie_status;
//	}
	
	
	

}
