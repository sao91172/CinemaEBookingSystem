package uga.swe.moviehub.movies.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ShowingId.class)
@Table(name = "showings")
public class Showing implements Serializable {

    @Id
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "movieId", nullable = false)
    private Movie movie;

    @Id
    @Column(name = "dateTime", nullable = false)
    private String dateTime; //YYYY-MM-DD-HH-MM

    @Column(name = "seats_list", nullable = false)
    private String seatsList =
            "" +
                    "A1:0,A2:0,A3:0,A4:0,A5:0,A6:0,A7:0,A8:0," +
                    "B1:0,B2:0,B3:0,B4:0,B5:0,B6:0,B7:0,B8:0," +
                    "C1:0,C2:0,C3:0,C4:0,C5:0,C6:0,C7:0,C8:0," +
                    "D1:0,D2:0,D3:0,D4:0,D5:0,D6:0,D7:0,D8:0," +
                    "E1:0,E2:0,E3:0,E4:0,E5:0,E6:0,E7:0,E8:0";

}
