package uga.swe.moviehub.movies.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import uga.swe.moviehub.movies.models.Movie;

import java.io.Serializable;

@Data
@NoArgsConstructor
@Embeddable
public class ShowingId implements Serializable {

    @ManyToOne
    @JoinColumn(name = "movieId", nullable = false)
    private Movie movie;

    @Column(name = "dateTime", nullable = false)
    private String dateTime;
}
