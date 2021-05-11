import axios from 'axios';

const MOVIE_API_BASE_URL = "http://localhost:8080/movie-api/v1/movies";

class MoviesService {

    getMovies(){
        return axios.get(MOVIE_API_BASE_URL);
    }

    rentedMovie(rentedMovie){
        return axios.post(MOVIE_API_BASE_URL, rentedMovie);
    }
}
// console.log("Movies Services"); 
// console.log(axios.get(MOVIE_API_BASE_URL)); 

export default new MoviesService();