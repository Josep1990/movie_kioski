package com.moviekioskicrm.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moviekioskicrm.model.Clients;
import com.moviekioskicrm.repository.RentedMoviesRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/movie-api/v1/")
public class ClientController {
	
	@Autowired
	private RentedMoviesRepository rentedMoviesRepository;	
	
	
    @PostMapping("/renting") //save movie on database after being rented
    public Clients rentMovies(@RequestBody Clients client) {

        //Movies movie = movieRepository.findById(client.get());

        //send email

        return rentedMoviesRepository.save(client);
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
    public Clients returnMovieSummary(@RequestBody Clients clients) {
		clients.setReturned(true);
		
		Clients client = rentedMoviesRepository.save(clients);

		//send email

		return client;
	}

}
