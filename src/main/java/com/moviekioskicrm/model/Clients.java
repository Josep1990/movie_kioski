package com.moviekioskicrm.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "rented_movies")
public class Clients {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	@Column(name = "client_id")
	private long client_id;		
	
	@Column(name = "movie_id")
	private long movie_id;

	@Column(name = "full_name") //variable names and column names has to be exactly the same
	private String full_name;
	
	@Column(name = "credit_card")
	private String credit_card;
	
	@Column(name = "emailId")
	private String emailId;
	
	public Clients() {
		
	}

	public Clients(long client_id, long movie_id, String full_name, String credit_card, String emailId) {	
		
		this.client_id   = client_id;
		this.movie_id    = movie_id;
		this.full_name   = full_name;
		this.credit_card = credit_card;
		this.emailId     = emailId;
		
	}

	public long getClientId() {
		return client_id;
	}

	public void setClientId(long client_id) {
		this.client_id = client_id;
	}
	
	public long getMovieId() {
		return movie_id;
	}
	
	public void setMovieId(long movie_id ) {
		this.movie_id = movie_id;
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
}
