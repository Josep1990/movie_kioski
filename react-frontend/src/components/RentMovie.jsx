import React, { Component } from 'react';
import MoviesService from '../services/MoviesService';
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Form, Row, Col} from "react-bootstrap";
// import { Form } from 'react-bootstrap';




class RentMovie extends Component {
    constructor(props){
        super(props)

        this.state = {
            movie: []
        }
        this.payMovie = this.payMovie.bind(this); //bind the method
        
    }
    
    componentDidMount(){
        MoviesService.getMovies().then((res) => {
            this.setState({movie: res.data});
        });
    }

    data(){          
        return this.props.location.state.data;
    }
    payMovie(){
        return <h1>payment</h1>
    }




    render() {
        let rentedMovieId = this.data();
        let rentingPrice = 2.99;
        return (

            <div className="container row m-5">    
                <div className="row">
                    {this.state.movie.map(      
                        (movie, index) => {
                            if(movie.id == rentedMovieId){                        
                                return  <Card key = {index} style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={movie.poster_path} />
                                            <Card.Body>
                                                <Card.Title>
                                                    {movie.title}
                                                </Card.Title>    
                                                <Card.Text>
                                                    Resealese date: {movie.release_date} <br/>
                                                    Language: {movie.original_language}  <br/>
                                                    {<h3> Price: €{rentingPrice}</h3>}                                           
                                                </Card.Text>                                                                                                                       
                                            </Card.Body>
                                        </Card> 
                            }
                            
                        } 
                    )}                 
   
                </div>  
                <div className="col">  
                    <Modal.Dialog>
                        <Modal.Header closeButton>
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
                        <Modal.Header closeButton>
                            <Modal.Title>Checkout:</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group as={Row} controlId="formPlaintextPassword"> 
                                    <Form.Label column sm="4">
                                        Name:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" placeholder="John Doe" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword">                                  
                                    <Form.Label column sm="4">
                                        Credit Card:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" placeholder="4555-6666-6688-1235" />
                                    </Col>
                                </Form.Group>
                                <Modal.Footer>                            
                                    <Button variant="danger" onClick={this.payMovie} >Confirm</Button>
                                </Modal.Footer> 
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="4">
                                        Send Receipt by Email
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" placeholder="email@example.com" />
                                    </Col>
                                </Form.Group>
                            </Form>
                            <Modal.Footer>                            
                            <Button variant="success" onClick={this.payMovie} > Send </Button>
                            </Modal.Footer> 
                                                   
                        </Modal.Body>  
                                 
                    </Modal.Dialog>  
                </div>  
                   
            </div>
        );
    }
}

export default RentMovie;


// if(movie.id ==  x){
//     <Card key = {index} style={{ width: '18rem' }}>
//         <Card.Img variant="top" src={movie.poster_path} />
//         <Card.Body>
//             <Card.Title>
//                 {movie.title}
//             </Card.Title>    
//             <Card.Text>
//                 Resealese date: {movie.release_date} <br/>
//                 Language: {movie.original_language}                                                
//             </Card.Text>     
//             {/* <Button variant="success" onClick={this.rentMovie}>Rent Now</Button>                                                                   */}
//         </Card.Body>
//     </Card> 
// }else{

//     <h1 key={index}>The    {x} did not work</h1>
// }