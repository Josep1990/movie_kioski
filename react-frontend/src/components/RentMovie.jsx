import React, { Component } from 'react';
import MoviesService from '../services/MoviesService';
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Form, Row, Col} from "react-bootstrap";

class RentMovie extends Component {
    constructor(props){
        super(props)

        this.state = {
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

            }


        }
        this.getFullNameHandler   = this.getFullNameHandler.bind(this);
        this.getCreditCardHandler = this.getCreditCardHandler.bind(this);
        this.getEmailHandler      = this.getEmailHandler.bind(this);
        this.saveClient           = this.saveClient.bind(this); //bind the method
        
    }
    
    componentDidMount(){
        MoviesService.getMovies().then((res) => {
            this.setState({movie: res.data});
        });
    }

    data(){          
        return this.props.location.state.data;
    }
    saveClient = (e) =>{
        e.preventDefault();
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
        // console.log('Rented Movie' + JSON.stringify(rentedMovie));
        MoviesService.rentedMovie(rentedMovie).then(res =>{
            this.props.history.push("/movies");
        });
    }

    getFullNameHandler =(event) =>{
        this.setState({full_name: event.target.value});
    }

    getCreditCardHandler = (event) =>{
        this.setState({credit_card: event.target.value});
    }

    getEmailHandler = (event) =>{
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push("/movies" );
    }


    render() {
        let rentedMovieId = this.data().id;
       
        let rentingPrice = 2.99;
        return (

            <div className="container row m-5">    
                <div className="row">
                  
                  {this.state.movie.map(      
                        (movie, index) => {
                          
                            if(movie.id === rentedMovieId){ 
                                                   
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
                            <Form>
                                <Form.Group as={Row} controlId="formPlaintextPassword"> 
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
                                <Form.Group as={Row} controlId="formPlaintextPassword">
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
                               
                            </Form>                            
                                                   
                        </Modal.Body>  
                                 
                    </Modal.Dialog>  
                </div>  
                   
            </div>
        );
    }
}

export default RentMovie;


