package uga.swe.moviehub.movies.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uga.swe.moviehub.payment.models.Order;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id", nullable = false)
    private  int movieId;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "category")
    private String category;
    @Column(name = "cast")
    private String cast;
    @Column(name = "director")
    private String director;
    @Column(name = "producer")
    private String producer;
    @Column(name = "synopsis")
    private String synopsis;
    @Column(name = "review")
    private String review;
    @Column(name = "poster")
    private String poster;
    @Column(name = "trailer")
    private String trailer;
    @Column(name = "rating")
    private String rating;
    @Column(name = "year")
    private String year;

    @JsonManagedReference
    @OneToMany(mappedBy = "movie")
    private List<Showing> showings = new ArrayList<>();

    @JsonBackReference
    @OneToMany(mappedBy = "movie")
    private List<Order> orders = new ArrayList<>();

    public String toString() {
        String movieString = "";

        movieString += "id:" + movieId + " title:" + title + " category:" + category + " cast:" + cast + " director:"
                + director + " producer:" + producer + " synopsis:" + synopsis + " review:" + review + " youtubeLink:" +
                trailer + " rating:" + rating;

        return movieString;
    }
}
