import axios from 'axios';

const MOVIE_API_BASE_URL   = "http://localhost:8080/movie-api/v1/movies";
const MOVIE_API_CLIENT_REQUEST_URL = "http://localhost:8080/movie-api/v1/renting";
const MOVIE_API_CLIENT_RETURN_MOVIE_URL = "http://localhost:8080/movie-api/v1/client/";
const MOVIE_API_CONFIRM_RETURNED_MOVIE = "http://localhost:8080/movie-api/v1/return/movies"

class MoviesService {

    getMovies(){ //this method get all the movies from the Spring Boot Api and return an json object with all the movies in the database
        return axios.get(MOVIE_API_BASE_URL); 
    }

    rentedMovie(rentedMovie){ //this method send the client information toghether with the rented movie to the backend application and then the backend save it in the database
        return axios.post(MOVIE_API_CLIENT_REQUEST_URL, rentedMovie);
    }

    getClientMovies(client_id){ //this method get the client by id and the movie that has been rented 
        return axios.get(MOVIE_API_CLIENT_RETURN_MOVIE_URL + client_id);
    }

    confirmReturnedMovie(client_movie){ //this method confirm when the client return a movie and update the database
        return axios.post(MOVIE_API_CONFIRM_RETURNED_MOVIE, client_movie);
    }
    
}

export default new MoviesService();