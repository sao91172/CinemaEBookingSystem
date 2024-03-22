package uga.swe.moviehub.movies;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uga.swe.moviehub.movies.dto.MovieRequestDto;
import uga.swe.moviehub.movies.dto.ShowingRequestDto;
import uga.swe.moviehub.movies.models.ComingSoonMovie;
import uga.swe.moviehub.movies.models.Movie;
import uga.swe.moviehub.movies.models.Showing;
import uga.swe.moviehub.movies.services.MovieService;
import uga.swe.moviehub.movies.services.ShowingService;

import java.util.Optional;


@RestController
@AllArgsConstructor
@RequestMapping("/api/movies")
public class MovieController {

    private MovieService movieService;
    private ShowingService showingService;


    @GetMapping
    public ResponseEntity<Iterable<Movie>> getMovies() {
        return new ResponseEntity<>(movieService.getMovies(), HttpStatus.OK);
    }

    @PostMapping("/movie")
    public ResponseEntity<Movie> getMovieById(@RequestBody MovieRequestDto movieRequestDto) {
        Movie movie = movieService.getMovieById(movieRequestDto.getMovieId()).orElseThrow(() -> new IllegalStateException("Movie could not be found"));
        return new ResponseEntity<>(movie, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addMovie(@RequestBody Movie movie) {
        movieService.addMovie(movie);
        String responseMessage = "Movie was successfully added with attributes: " + movie.toString();
        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> removeMovie(@RequestBody MovieRequestDto movieRequestDto) {
        movieService.removeMovie(movieRequestDto.getMovieId());
        return new ResponseEntity<>("Movie has been removed", HttpStatus.OK);
    }

    @GetMapping("/coming-soon")
    public ResponseEntity<Iterable<ComingSoonMovie>> getFutureMovies() {
        return new ResponseEntity<>(movieService.getFutureMovies(), HttpStatus.OK);
    }

    @PostMapping("/coming-soon/add")
    public ResponseEntity<String> addFutureMovie(@RequestBody ComingSoonMovie movie) {
        movieService.addFutureMovie(movie);
        String responseMessage = "Coming soon movie was successfully added with title: " + movie.toString();
        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }

    @DeleteMapping("/coming-soon/delete")
    public ResponseEntity<String> removeFutureMovie(@RequestBody MovieRequestDto movieRequestDto) {
        movieService.removeFutureMovie(movieRequestDto.getMovieId());
        return new ResponseEntity<>("Removed Future Movie", HttpStatus.OK);
    }

    @GetMapping("/showings")
    public ResponseEntity<Iterable<Showing>> getAllShowings() {
        return new ResponseEntity<>(showingService.getAllShowings(), HttpStatus.OK);
    }

    @PostMapping("/showings/movie")
    public ResponseEntity<Iterable<Showing>> getShowingsForMovie(@RequestBody ShowingRequestDto requestDto) {
        return new ResponseEntity<>(showingService.getShowingsForMovie(requestDto.getMovieId()), HttpStatus.OK);
    }

    @PostMapping("/showings/movie-date")
    public ResponseEntity<Showing> getShowingForMovieAndDateTime(@RequestBody ShowingRequestDto requestDto) {
        return new ResponseEntity<>(showingService.getShowingForMovieAndDateTime(requestDto.getMovieId(), requestDto.getDateTime()), HttpStatus.OK);
    }

    @PostMapping("/showings/movie/add")
    public ResponseEntity<String> addShowingForMovie(@RequestBody ShowingRequestDto requestDto) {
        showingService.addShowingForMovie(requestDto.getMovieId(), requestDto.getDateTime());
        return new ResponseEntity<>("Showing added", HttpStatus.OK);
    }

    @PutMapping("/showings/movie/seats")
    public ResponseEntity<String> setSeatsForShowing(@RequestBody ShowingRequestDto requestDto) {
        String response = showingService.setSeatsForShowing(requestDto.getMovieId(), requestDto.getDateTime(), requestDto.getRequestedSeats());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
