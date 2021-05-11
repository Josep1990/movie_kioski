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
            movies: []
        }
        this.rentMovie = this.rentMovie.bind(this); //bind the method
        this.returnMovie = this.returnMovie.bind(this);
    }

    componentDidMount(){
        MoviesService.getMovies().then((res) => {
            this.setState({movies: res.data});
        });
    }

    rentMovie(id){
        this.props.history.push({pathname: `/rent-movie/${id}`, state: { data: id }}); //whenever the method is called redirect to this url
 
    }

    returnMovie(){
        this.props.history.push("/return-movie"); //whenever the method is called redirect to this url
    }

    render() {
        
       
        return (
            <div>
                <h1 className="text-center p-5 "><Badge variant="dark">Available Movies</Badge></h1>
                <div className = "Column">   
                    <Swiper                           
                        id="main"                                   
                        tag="section"
                        wrapperTag="ul"
                        navigation                      
                        spaceBetween={10}
                        slidesPerView={4}
                        onInit={(swiper) => console.log('Swiper initialized!', swiper)}
                        onSlideChange={(swiper) => {
                            console.log('Slide index changed to: ', swiper.activeIndex);
                        }}
                        onReachEnd={() => console.log('Swiper end reached')}                                  
                    >       
                        {   this.state.movies.map(
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
                                             <Button variant="success" onClick={() => this.rentMovie(movies.id)}>Rent Now</Button>                                                                  
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