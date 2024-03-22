package uga.swe.moviehub.movies.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uga.swe.moviehub.movies.models.ComingSoonMovie;
import uga.swe.moviehub.movies.models.Movie;
import uga.swe.moviehub.movies.repositories.ComingSoonMovieRepository;
import uga.swe.moviehub.movies.repositories.MovieRepository;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MovieService {

    private MovieRepository movieRepository;
    private ComingSoonMovieRepository comingSoonMovieRepository;

    public Iterable<Movie> getMovies() {return movieRepository.findAll();}

    public Movie addMovie(Movie m) {
        return movieRepository.saveAndFlush(m);
    }

    public void removeMovie(int movieId) { movieRepository.deleteById(movieId); }

    public Optional<Movie> getMovieById(int movieId) { return movieRepository.findById(movieId); }

    public Iterable<ComingSoonMovie> getFutureMovies() {return comingSoonMovieRepository.findAll();}

    public ComingSoonMovie addFutureMovie(ComingSoonMovie m) {return comingSoonMovieRepository.saveAndFlush(m);}

    public void removeFutureMovie(int movieId) { comingSoonMovieRepository.deleteById(movieId);}
}
