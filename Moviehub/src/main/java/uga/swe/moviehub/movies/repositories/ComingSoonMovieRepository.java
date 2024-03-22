package uga.swe.moviehub.movies.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uga.swe.moviehub.movies.models.ComingSoonMovie;

@Repository
public interface ComingSoonMovieRepository extends JpaRepository<ComingSoonMovie, Integer> {

}
