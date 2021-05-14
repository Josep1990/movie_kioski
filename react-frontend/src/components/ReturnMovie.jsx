import React, { Component } from 'react';
import MoviesService from '../services/MoviesService';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import {Form, Row, Col} from "react-bootstrap";

class ReturnMovie extends Component {
    constructor(props){
        super(props)

        this.state = {
            client_movie: {},          
            isLoading: true,           
            error: null,

            full_name: '',
            credit_card: '',
            emailId: '',
            client_id:'',
            movies:{
                id: '',
                title: '',
                release_date: '',
                original_language: '',
                poster_path: ''

            }
          

        }
       
        this.getClientIdHandler   = this.getClientIdHandler.bind(this);
        this.returnedMovie        = this.returnedMovie.bind(this);
     
        
    }
    getClientIdHandler = (event) =>{        
        event.preventDefault();
        if(event.target.value !== null){
            this.setState({client_id: event.target.value});
        }      
    }

    componentDidUpdate(prevProps, prevStates){

        if (this.state.client_id.length >= 1 && prevStates.client_movie === this.state.client_movie   ) {
           
            MoviesService.getClientMovies(this.state.client_id).then((res) => {
                if(res.data.returned === false ){
                    this.setState({client_movie: res.data,
                                   isLoading: false
                    })
                }
            })
            .catch(error => this.setState({error, isLoading : false}));              
        }        
    }   

    returnedMovie = (e) => {

        const {client_movie, client_id}  = this.state;      
        e.preventDefault(); 
        let returnedMovie = {
            full_name: client_movie.full_name,
            credit_card: client_movie.credit_card,
            emailId: client_movie.emailId,
            clientId: client_id,
            movies:{
             id: client_movie.movies.id,
             title: client_movie.movies.title,
             release_date: client_movie.movies.release_date,
             original_language: client_movie.movies.original_language,
             poster_path: client_movie.movies.poster_path
            } 
         }      
       
         MoviesService.confirmReturnedMovie(returnedMovie).then(res =>{
            this.props.history.push("/movies");
        });
     
       
    }


    cancel(){
        this.props.history.push("/movies" );
    }

    render() {   
   
        const { isLoading, client_movie, error } = this.state;

        
        return (                  
              
            <div className="container row m-5">

                <div className="row">
                    {error ? <p>{error.message}</p> : null}
                    {!isLoading ? (
                        Object.values(client_movie).slice(0,1).map((movie, index) => {
                            const { id, title, release_date, original_language, poster_path } = movie;
                            
                            return (
                                <Card key = {index} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={poster_path} />
                                    <Card.Body>
                                        <Card.Title>
                                            {title}
                                        </Card.Title>    
                                        <Card.Text>
                                            {`Movie Id: ${id}`} <br/>
                                            {`Resealese date: ${release_date}`} <br/>
                                            {`Language: ${original_language}`}  <br/>   
                                            Confirm to return the Movie.                                                                                       
                                        </Card.Text>  

                                        <Button variant="primary" onClick={this.returnedMovie} >Confirm</Button>                                                                                                                                     
                                    </Card.Body>
                                        
                                </Card>            
                            );
                        })
                        // If there is a delay in data, let's let the user know it's loading
                        ) : (<h3 className="text-white">Please provide Client ID...</h3> )                    
                    }


                </div>
                <div className="col">
                    <Modal.Dialog>
                            <Modal.Header >
                                <Modal.Title>Return Movie Info</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ul>
                                    <li>Please locate Your Client ID e.g. "25"</li>
                                    <li>The client ID is on your receipt</li>
                                    <li>You can contact us at help@xvxpress.com or call us on 1890 700 700</li>
                                    <li>Thank you for using our services. See you next time.</li>
                                </ul>                          
                            </Modal.Body>
                        </Modal.Dialog>  
                        <Modal.Dialog>
                            <Modal.Header >
                                <Modal.Title>Return Movie:</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="formPlaintextPassword"> 
                                        <Form.Label column sm="4">
                                            Enter Client ID:
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" placeholder="33" name="client_id"
                                            value={this.state.client_id} onChange={this.getClientIdHandler } />
                                        </Col>
                                    </Form.Group>                            
                                    <Modal.Footer>                                                  
                                        <Button variant="danger" onClick={this.cancel.bind(this)} >Home Page</Button>     
                                                                     
                                    </Modal.Footer>                          
                                </Form>                                                          
                            </Modal.Body>                                 
                        </Modal.Dialog>     
                    </div>
            </div>
                         
        );
    }
}

export default ReturnMovie;