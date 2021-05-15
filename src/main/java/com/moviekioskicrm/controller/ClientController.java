package com.moviekioskicrm.controller;

import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moviekioskicrm.mailsender.EmailConfiguration;
import com.moviekioskicrm.model.Clients;
import com.moviekioskicrm.repository.RentedMoviesRepository;

@CrossOrigin(origins = "http://localhost:3000") //connects the front end with the backend
@RestController //Spring RestController takes care of mapping request data to the defined request handler method. Once response body is generated from the handler method, it converts it to JSON or XML response.
@RequestMapping("/movie-api/v1/")
public class ClientController {
	
	@Autowired //inject the object dependency. It internally uses setter or constructor injection. 
	private RentedMoviesRepository rentedMoviesRepository;	//interface to the repository in spring boot
	
	private EmailConfiguration emailConfig; // instance of the email configuration class
	
	private String emailBody; // this filed will be used to set the email body 
	private int rentMovie = 1; //this fielda is used to check if the email sent will be returning a movie or renting a movie
	private int returnMovie = 2;
	
	public ClientController(EmailConfiguration emailConfig) { //dependency injection to populate this field
		this.emailConfig = emailConfig;
	}
	
    @PostMapping("/renting") //save movie on database after being rented
    public Clients rentMovies(@RequestBody Clients client, BindingResult bindingResult) {
    	
    	    	
    	if(bindingResult.hasErrors()) { //ckeck for errors in the data from the front end api
    		throw new ValidationException("Client is Not Valid");
    	}        
    	  	
    	client = rentedMoviesRepository.saveAndFlush(client);//save client in teh database instantly
    	
    	//Send Email
    	javaMailSender(emailConfig).send(simpleMailMessage(client, rentMovie ));     	
    	
        return client;
    }
    
    //get by id client and return movie data to front end 
    @GetMapping("/client/{id}")
    public Clients getClientById(@PathVariable("id") long id) {
    	
    	//Optional is a container object used to contain not-null objects
    	Optional<Clients> clientsOptional = rentedMoviesRepository.findByIdAndReturnedIsFalse(id); //query the database for the field returned = false so we know that the movie has not been returned yet

    	if (clientsOptional.isPresent()) { //check is there is dta insede the optional and get it
    		return clientsOptional.get();
		}

        return null;

    }
    
    @PostMapping("/return/movies") //movie returned sucessifully
    public Clients returnMovieSummary(@RequestBody Clients clients, BindingResult bindingResult) {
    	
    	if(bindingResult.hasErrors()) { //ckeck for errors in the data from the front end api
    		throw new ValidationException("Client is Not Valid");
    	}        
    	  	
		clients.setReturned(true); //when client confi the movie return set is returne to true before save in the database
		
		Clients client = rentedMoviesRepository.saveAndFlush(clients); //save and change stantl in the database

		//send email
		javaMailSender(emailConfig).send(simpleMailMessage(client, returnMovie ));
		
		return client;
	}
    
    private JavaMailSenderImpl javaMailSender(EmailConfiguration emailConfig) { //this method set up the email service with password which port it will use and username
    	//create a  email sender
    	JavaMailSenderImpl mailSender = new JavaMailSenderImpl(); //provides an implementation of the JavaMailSender interface.
    	mailSender.setHost(emailConfig.getHost());
    	mailSender.setPort(emailConfig.getPort());
    	mailSender.setUsername(emailConfig.getEmail());
    	mailSender.setPassword(emailConfig.getPass());
    	
		return mailSender;
    	
    }
    
    private SimpleMailMessage simpleMailMessage(Clients client, int returnOrRent){ //this method configure the the email like who will be receiving and the body of the email
    	
    	//create email istance
    	SimpleMailMessage mailMessage = new SimpleMailMessage(); //used to create a simple mail message including the from, to, cc, subject and text fields
    	mailMessage.setFrom(emailConfig.getEmail());
    	mailMessage.setTo(client.getEmailId());
    	mailMessage.setSubject("The Movie is : " + client.getMovies().getTitle());
    	mailMessage.setText(emailBody(client, returnOrRent));
    	
    	return mailMessage;
    }
    
    private String emailBody(Clients client, int rentOrReturn) {   	
    	
    	if(rentOrReturn == rentMovie) { //set tthe right message to send to the client
    		
		emailBody = "Hello " + client.getFull_name() + " your CLIENT Id is: " + client.getClientId() + "\n" 
							+ " You rented the movie: " + client.getMovies().getTitle() 
							+ " Enjoy yout movie and dont forget that you have up to 72 hours to return it,\n Thank you and see you again.";
		
    	}else if(rentOrReturn == returnMovie) {
    		
    		emailBody = "Hello " + client.getFull_name() + " your CLIENT Id is: " + client.getClientId() + "\n" 
					+ " You have returned the movie: " + client.getMovies().getTitle() 
					+ " I hope you enjoyed the movie. \n Thank you and see you again.";
    		
    	}
							
    	return emailBody;
    	
    }   

}
