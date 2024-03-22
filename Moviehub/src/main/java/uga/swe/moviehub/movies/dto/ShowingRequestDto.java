package uga.swe.moviehub.movies.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShowingRequestDto {

    private int movieId;
    private String dateTime;
    private String requestedSeats;
}
