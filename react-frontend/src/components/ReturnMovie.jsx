import React, { Component } from 'react';
import MoviesService from '../services/MoviesService';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import {Form, Row, Col} from "react-bootstrap";

class ReturnMovie extends Component {
    constructor(props){
        super(props)

        this.state = { //this fields get the movie when the clien enter thei id on the browser and send it to the backend after the client confirm the return
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
       
        this.getClientIdHandler   = this.getClientIdHandler.bind(this); //bind the methods so we can use inside the render method
        this.returnedMovie        = this.returnedMovie.bind(this);
     
        
    }
    getClientIdHandler = (event) =>{  //get the client id from the client input and assing it to the client_id field       
        event.preventDefault();
        if(event.target.value !== null){
            this.setState({client_id: event.target.value});
        }      
    }

    componentDidUpdate(prevProps, prevStates){ //this method get the movie from the database after the client put their id 

        if (this.state.client_id.length >= 1 && prevStates.client_movie === this.state.client_movie   ) { //checks if the id is not 0 and if there are any changes in the client_movie that represents the movie that the client want to return
           
            MoviesService.getClientMovies(this.state.client_id).then((res) => {
                if(res.data.returned === false ){ //validate if the client id has a movie that has not been returned if is returned is false then assign the values to client_movie
                    this.setState({client_movie: res.data,
                                   isLoading: false
                    })
                }
            })
            .catch(error => this.setState({error, isLoading : false}));              
        }        
    }   

    returnedMovie = (e) => { //this method send the movie info in a json object to the backend application 

        const {client_movie, client_id}  = this.state;      
        e.preventDefault(); 
        let returnedMovie = { //assing the values to the field 
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
       
         MoviesService.confirmReturnedMovie(returnedMovie).then(res =>{ //send the data in json to the back end application  
            this.props.history.push("/movies"); //redirets the client to the homepage
        });
     
       
    }


    cancel(){ //redirets the client to the homepage
        this.props.history.push("/movies" );
    }

    render() {   
   
        const { isLoading, client_movie, error } = this.state; //this is a shortcut so dont need to type this.state all the time

        
        return (                  
              
            <div className="container row m-5">

                <div className="row">
                    {error ? <p>{error.message}</p> : null} 
                    {!isLoading ? ( //this tenary operator check is there is any error fetching the data
                        Object.values(client_movie).slice(0,1).map((movie, index) => { //thie get the json obj values i used slice method to limit it to one when mapping through the values so does not render the movie more than one time in the browser
                            const { id, title, release_date, original_language, poster_path } = movie; //assign the values to the movie object in the callback function
                                
                            return ( //return the movie that the client rented and display it on the browser 
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

                                         <Button variant="primary" onClick={this.returnedMovie} >Confirm</Button> {/*this button return the movie to the backend when the client confir that he wants to return the movi*/}
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
                                            <Form.Control type="text" placeholder="33" name="client_id" //get the client id so the app can retrieve the rented moi from the database
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