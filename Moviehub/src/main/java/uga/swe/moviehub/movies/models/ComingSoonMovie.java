package uga.swe.moviehub.movies.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comingsoonmovies")
public class ComingSoonMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id", nullable = false)
    private int movieId;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "releasedate", nullable = false) // yyyy-mm-dd
    private String releaseDate;
    @Column(name = "trailer")
    private String traier;
    @Column(name = "poster", nullable = false)
    private String poster;

}
