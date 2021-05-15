import React, { Component } from 'react';
import MoviesService from '../services/MoviesService';
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Form, Row, Col, Alert} from "react-bootstrap";





class RentMovie extends Component {
    constructor(props){
        super(props)

        this.state = { //this fields are used to retrieve the movies from the array and sent it to the backend through an json object
            movie: [],
            full_name: '',
            credit_card: '',
            emailId: '',
            movies:{
                id: '',
                title: '',
                release_date: '',
                original_language: '',
                poster_path: ''

            }, 
            errors: {}                 
        }
       
        this.getFullNameHandler   = this.getFullNameHandler.bind(this); //bind the method so i can use inside the render method
        this.getCreditCardHandler = this.getCreditCardHandler.bind(this);
        this.getEmailHandler      = this.getEmailHandler.bind(this);
        this.saveClient           = this.saveClient.bind(this); 
        
    }
    
    componentDidMount(){ //this is build in method in react when the get request comes with the data it populate the array movies
        MoviesService.getMovies().then((res) => {
            this.setState({movie: res.data});//here it is where react update the state od movis array and populate with the data
        });
    }

    data(){          
        return this.props.location.state.data;
    }

    formValidation = () => { //this method validade the form so the user cannot send null values
        const {full_name, credit_card, emailId} = this.state;
        let isValid = true;
        let regexBNumbers = "^[0-9]+";
        const errors = {};
        
        if(full_name.trim().length < 6){ //check name lengh
            errors.full_name = "Plase, provide your full name";
            isValid = false;
        }
        if(credit_card.trim().length < 16 || credit_card.trim().length > 16  ){ //check credit card input
            errors.credit_card = "Plase, provide 16 number of you Credit Card";
            isValid = false;
        }
        if(!credit_card.match(regexBNumbers) ){ //check if the credit car has letter 
            errors.usernameLength = "Plase, provide only numbers of you Credit Card";
            isValid = false;
        }
        if(!emailId.includes("@") || emailId.length <= 6){ //check if the email is correct
            errors.emailId = "Plase, provide a valid email address";
            isValid = false;
        }
        this.setState({errors});
        return isValid;
   
    }

    saveClient = (e) =>{ // send the movie info to the database toghether with the client info in json object
        e.preventDefault();
        const isValid = this.formValidation();
        if(isValid){
            let rentedMovie = {full_name: this.state.full_name,
                                credit_card: this.state.credit_card,
                                emailId: this.state.emailId,
                                movies:{
                                id: this.data().id,
                                title: this.data().title,
                                release_date: this.data().release_date,
                                original_language: this.data().original_language,
                                poster_path: this.data().poster_path
                            } 
                            }        
            
                MoviesService.rentedMovie(rentedMovie).then(res =>{                   
                        this.props.history.push("/movies");  //send the json object with client info and redirect the client to the main page                
                });    
        }   
    }

    getFullNameHandler =(event) =>{    //get the full name of the client and save in the full_name filed    
        this.setState({full_name: event.target.value});
    }

    getCreditCardHandler = (event) =>{ //get the credit card info and save to the credit_card fild
        this.setState({credit_card: event.target.value});
    }

    getEmailHandler = (event) =>{ //save the email in the emailId field
        this.setState({emailId: event.target.value});
    }

    cancel(){ //redirec the client to the home page
        this.props.history.push("/movies" );
    }

    
    render() { // render all the methods inside in the browser
        let rentedMovieId = this.data().id; //get the movie id      
        let rentingPrice = 2.99; //display the price
        const {full_name, credit_card, emailId, errors } = this.state; //this is a shortcut so we dont need to type this.state all the time
        
        return (

            <div className="container row m-5">    
                <div className="row">
                  
                  {this.state.movie.map(      
                        (movie, index) => {
                          
                            if(movie.id === rentedMovieId){  //map through the array movies and find the movie that the client choose based on the movie id
                                                   
                                return  <Card key = {index} style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={movie.poster_path} />
                                            <Card.Body>
                                                <Card.Title>
                                                    {movie.title}
                                                </Card.Title>    
                                                <Card.Text>
                                                    Resealese date: {movie.release_date} <br/>
                                                    Language: {movie.original_language}  <br/>                                                                                          
                                                </Card.Text>  
                                                <h3> Price: €{rentingPrice}</h3>                                                                                                                     
                                            </Card.Body>
                                        </Card> 
                            };    
                            return null;                   
                        } 
                    )}                 
   
                </div>  
                <div className="col">  
                    <Modal.Dialog>
                        <Modal.Header >
                            <Modal.Title>Renting Info</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul>
                                <li>Please Press Checkout to procced to the payment screen.</li>
                                <li>You have 72 Hours to enjoy your movie.</li>
                                <li>After this time you will be charged €1.50 per day.</li>
                                <li>After 10 Days you will be charged €15.00 and the disc is your to keep.</li>
                            </ul>  
                        
                        </Modal.Body>
                    </Modal.Dialog>  
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Checkout:</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form > 
                                <Form.Group as={Row} controlId="formPlaintext"> 
                                    <Form.Label column sm="4">
                                        Name:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" placeholder="John Doe" name="full_name"
                                        value={this.state.full_name} onChange={this.getFullNameHandler} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword">                                  
                                    <Form.Label column sm="4">
                                        Credit Card:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" placeholder="4555-6666-6688-1235" name="credit_card"
                                         value={this.state.credit_card} onChange={this.getCreditCardHandler} />                                       
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="4">
                                        Send Receipt by Email
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="email" placeholder="email@example.com" name="emailId"
                                        value={this.state.emailId} onChange={this.getEmailHandler} />
                                    </Col>
                                </Form.Group>
                                <Modal.Footer>          
                                    <Button variant="danger" onClick={this.cancel.bind(this)} >Cancel</Button>                  
                                    <Button variant="success" onClick={this.saveClient} >Confirm</Button>                                  
                                </Modal.Footer>                                
                                {Object.keys(this.state.errors).map((key) => { //this map through the validation form method and display the right erros
                                    return <Alert key={key} variant="danger">{errors[key]}</Alert>
                                })}
                            </Form>                            
                                                   
                        </Modal.Body>  
                                 
                    </Modal.Dialog>  
                </div>  
                   
            </div>
        );
    }
}

export default RentMovie;


