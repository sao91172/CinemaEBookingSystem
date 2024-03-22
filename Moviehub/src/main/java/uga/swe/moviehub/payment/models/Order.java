package uga.swe.moviehub.payment.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uga.swe.moviehub.movies.models.Movie;
import uga.swe.moviehub.users.models.User;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", nullable = false)
    private int orderId;
    @Column(name = "date", nullable = false)
    private String dateTime;
    @Column(name = "adult_qty", nullable = false)
    private int adultQuantity;
    @Column(name = "child_qty", nullable = false)
    private int childQuantity;
    @Column(name = "senior_qty", nullable = false)
    private int seniorQuantity;
    @Column(name = "adult_price", nullable = false)
    private double adultPrice;
    @Column(name = "child_price", nullable = false)
    private double childPrice;
    @Column(name = "senior_price", nullable = false)
    private double seniorPrice;
    @Column(name = "order_total", nullable = false)
    private double orderTotal;
    @Column(name = "seats",nullable = false)
    private String orderSeats; // list delimited by commas


    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

}
