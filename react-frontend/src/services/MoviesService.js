import axios from 'axios';

const MOVIE_API_BASE_URL   = "http://localhost:8080/movie-api/v1/movies";
const MOVIE_API_CLIENT_REQUEST_URL = "http://localhost:8080/movie-api/v1/renting";
const MOVIE_API_CLIENT_RETURN_MOVIE_URL = "http://localhost:8080/movie-api/v1/client/";
const MOVIE_API_CONFIRM_RETURNED_MOVIE = "http://localhost:8080/movie-api/v1/return/movies"

class MoviesService {

    getMovies(){
        return axios.get(MOVIE_API_BASE_URL);
    }

    rentedMovie(rentedMovie){
        return axios.post(MOVIE_API_CLIENT_REQUEST_URL, rentedMovie);
    }

    getClientMovies(client_id){
        return axios.get(MOVIE_API_CLIENT_RETURN_MOVIE_URL + client_id);
    }

    confirmReturnedMovie(client_movie){
        return axios.post(MOVIE_API_CONFIRM_RETURNED_MOVIE, client_movie);
    }
    
}
// console.log("Movies Services"); 
// console.log(axios.get(MOVIE_API_BASE_URL)); 

export default new MoviesService();