package com.moviekioskicrm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

//@Entity
//@Table(name = "movies_rented")
public class Client {
	
	
	
//	@Column(name = "credit_card")
	private String creditCard;
	
//	@Column(name = "emailId")
	private String emailId;
		
	
	public Client(String emailId, String creditCard) {		
		this.emailId = emailId;
		this.creditCard = creditCard;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getCreditCard() {
		return creditCard;
	}
	public void setCreditCard(String creditCard) {
		this.creditCard = creditCard;
	}
	
	
	
	

}
