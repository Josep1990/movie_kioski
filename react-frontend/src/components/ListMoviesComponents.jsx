import React, { Component } from 'react';
import MoviesService from '../services/MoviesService';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";


SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

class ListMoviesComponents extends Component {
    constructor(props){
        super(props)

        this.state = {
            movies: [] //this array will be populated with the movies coming from the database through axios get request communicating with the backend
        }
        this.rentMovie = this.rentMovie.bind(this); //bind the method 
        this.returnMovie = this.returnMovie.bind(this);
    }

    componentDidMount(){ //this is build in method in react when the get request comes with the data it populate the array movies
        MoviesService.getMovies().then((res) => { 
            this.setState({movies: res.data}); //here it is where react update the state od movis array and populate with the data
        });
    }

    rentMovie(id, title, release_date, original_language, poster_path){ //this method get the information when the client choose a movie and save to the array state data in react
        this.props.history.push({pathname: `/rent-movie/${id}`, //send the client to this path after get the movie id
        state: { data: {
                id,
                title,
                release_date,
                original_language,
                poster_path
                }}}); //save this information on state.data 
              
    }

    returnMovie(){ //whenever the method is called redirect to this url where the client can return a movie
        this.props.history.push("/return-movie"); 
    }

    render() {//this is a react method and it render all the components on the browser       
       
        return (
            <div>
                <h1 className="text-center p-5 "><Badge variant="danger">Available Movies</Badge></h1>
                <div className = "Column">   
                    <Swiper  //swiper is the library that generates the carrousel where the client can choose a movie                        
                        id="main"                                   
                        tag="section"
                        wrapperTag="ul"
                        navigation                      
                        spaceBetween={10}
                        slidesPerView={4}
                        onInit={(swiper) => console.log('Swiper initialized!', swiper)}
                        onSlideChange={(swiper) => { //keep tracks on the console of the slides that are currently rendered
                            console.log('Slide index changed to: ', swiper.activeIndex);
                        }}
                        onReachEnd={() => console.log('Swiper end reached')}                                  
                    >       
                        {   this.state.movies.map( //this map through the array movies rendering all the movies insede
                                movies => 
                                <SwiperSlide key = {movies.id}>
                                    <Card style={{ width: '15rem' }}>
                                        <Card.Img variant="top" src={movies.poster_path} />
                                        <Card.Body>
                                            <Card.Title>
                                                {movies.title.length > 15 ? `${movies.title.substring(0, 15)}...` : movies.title }
                                            </Card.Title>    
                                            <Card.Text>
                                                Resealese date: {movies.release_date} <br/>
                                                Language: {movies.original_language}                                                
                                            </Card.Text>     
                                            <Button variant="success" onClick={ //this btn create an event saving all the info in state. data and goes to the rent movie url where the client can pay and for the movie
                                                 () => this.rentMovie(movies.id, 
                                                                      movies.title, 
                                                                      movies.release_date, 
                                                                      movies.original_language, 
                                                                      movies.poster_path
                                                                    )}>
                                                                    Rent Now
                                            </Button>                                                                  
                                        </Card.Body>
                                    </Card>     
                                </SwiperSlide>                                                                                                      
                            )                             
                        }    
                    </Swiper>           
                </div>   
                <div className="return-movies">
                    <Button variant="danger" size="lg" onClick={this.returnMovie}><h3>Return a Movie</h3></Button> 
                </div>
            </div>
        );
    }
}

export default ListMoviesComponents;