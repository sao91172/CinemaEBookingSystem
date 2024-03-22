package uga.swe.moviehub.movies.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uga.swe.moviehub.movies.models.Movie;
import uga.swe.moviehub.movies.models.Showing;
import uga.swe.moviehub.movies.models.ShowingId;

import java.util.List;

@Repository
public interface ShowingRepository extends JpaRepository<Showing, ShowingId> {

    List<Showing> findByMovie(Movie movie);

    Showing findByMovieAndDateTime(Movie movie, String dateTime);

}
