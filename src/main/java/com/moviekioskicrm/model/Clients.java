package com.moviekioskicrm.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;



@Entity //specifies that this class is a entity in the database in the
@Table(name = "rented_movies") //cretes the table called rented_movies
public class Clients {

	
	@Id //this annotation set this fild as id and it generates automatically it is autoincrement
	@GeneratedValue(strategy = GenerationType.AUTO)	 
	@Column(name = "client_id") //colum names
	private long client_id;		
	
	@ManyToOne(fetch = FetchType.EAGER) //defines the relationship with the movie model in the database the movie id is bind to the movie table so we can retrieve the movie info from the client table
	private Movies movies;

	@NotNull
	@Column(name = "full_name") //variable names and column names has to be exactly the same
	private String full_name;
	
	@NotNull
	@Column(name = "credit_card")
	private String credit_card;
	
	@NotNull
	@Email
	@Column(name = "emailId")
	private String emailId;
	
	@Column(name = "returned")
	private boolean returned;
	
	//default constructor is needed for the JPA Java persistence API
	public Clients() {
		
	}
	//getters and setters
	public long getClientId() {
		return client_id;
	}

	public void setClientId(long client_id) {
		this.client_id = client_id;
	}
	
	public Movies getMovies() {
		return movies;
	}

	public void setMovies(Movies movies) {
		this.movies = movies;
	}
	
	public String getFull_name() {
		return full_name;
	}

	public void setFull_name(String full_name) {
		this.full_name = full_name;
	}

	public String getCredit_card() {
		return credit_card;
	}

	public void setCredit_card(String credit_card) {
		this.credit_card = credit_card;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public boolean isReturned() {
		return returned;
	}

	public void setReturned(boolean returned) {
		this.returned = returned;
	}
	
	
}
