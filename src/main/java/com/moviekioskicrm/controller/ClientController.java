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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/movie-api/v1/")
public class ClientController {
	
	@Autowired
	private RentedMoviesRepository rentedMoviesRepository;	
	
	private EmailConfiguration emailConfig;
	
	private String emailBody;
	private int rentMovie = 1;
	private int returnMovie = 2;
	
	public ClientController(EmailConfiguration emailConfig) { //dependency injection to populate this field
		this.emailConfig = emailConfig;
	}
	
    @PostMapping("/renting") //save movie on database after being rented
    public Clients rentMovies(@RequestBody Clients client, BindingResult bindingResult) {
    	
    	    	
    	if(bindingResult.hasErrors()) {
    		throw new ValidationException("Client is Not Valid");
    	}        
    	  	
    	client = rentedMoviesRepository.saveAndFlush(client);
    	
    	//Send Email
    	javaMailSender(emailConfig).send(simpleMailMessage(client, rentMovie ));     	
    	
        return client;
    }
    
    //get by id client and return movie data to front end 
    @GetMapping("/client/{id}")
    public Clients getClientById(@PathVariable("id") long id) {

    	Optional<Clients> clientsOptional = rentedMoviesRepository.findByIdAndReturnedIsFalse(id);

    	if (clientsOptional.isPresent()) {
    		return clientsOptional.get();
		}

        return null;

    }
    
    @PostMapping("/return/movies") //movie returned sucessifully
    public Clients returnMovieSummary(@RequestBody Clients clients, BindingResult bindingResult) {
    	
    	if(bindingResult.hasErrors()) {
    		throw new ValidationException("Client is Not Valid");
    	}        
    	  	
		clients.setReturned(true);
		
		Clients client = rentedMoviesRepository.saveAndFlush(clients);

		//send email
		javaMailSender(emailConfig).send(simpleMailMessage(client, returnMovie ));
		
		return client;
	}
    
    private JavaMailSenderImpl javaMailSender(EmailConfiguration emailConfig) {
    	//create a  email sender
    	JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    	mailSender.setHost(emailConfig.getHost());
    	mailSender.setPort(emailConfig.getPort());
    	mailSender.setUsername(emailConfig.getEmail());
    	mailSender.setPassword(emailConfig.getPass());
    	
		return mailSender;
    	
    }
    
    private SimpleMailMessage simpleMailMessage(Clients client, int returnOrRent){
    	
    	//create email istance
    	SimpleMailMessage mailMessage = new SimpleMailMessage();
    	mailMessage.setFrom(emailConfig.getEmail());
    	mailMessage.setTo(client.getEmailId());
    	mailMessage.setSubject("Congrats You Rented the Movie: " + client.getMovies().getTitle());
    	mailMessage.setText(emailBody(client, returnOrRent));
    	
    	return mailMessage;
    }
    
    private String emailBody(Clients client, int rentOrReturn) {   	
    	
    	if(rentOrReturn == rentMovie) {
    		
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
