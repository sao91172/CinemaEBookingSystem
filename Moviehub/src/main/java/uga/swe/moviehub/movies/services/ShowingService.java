package uga.swe.moviehub.movies.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uga.swe.moviehub.movies.models.Showing;
import uga.swe.moviehub.movies.repositories.ShowingRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class ShowingService {

    private ShowingRepository showingRepository;
    private MovieService movieService;


    public List<Showing> getAllShowings() {
        return showingRepository.findAll();
    }

    public List<Showing> getShowingsForMovie(int movieId) {
        return showingRepository.findByMovie(
                movieService
                        .getMovieById(movieId)
                        .orElseThrow(() -> new IllegalStateException("Movie could not be found"))
        );
    }

    public Showing getShowingForMovieAndDateTime(int movieId, String dateTime) {
        return showingRepository.findByMovieAndDateTime(
                movieService
                        .getMovieById(movieId)
                        .orElseThrow(() -> new IllegalStateException("Movie could not be found")),
                dateTime
        );
    }

    public void addShowingForMovie(int movieId, String dateTime) {
        Showing showing = new Showing();
        showing.setMovie(movieService
                .getMovieById(movieId)
                .orElseThrow(() -> new IllegalStateException("Movie could not be found"))
        );
        showing.setDateTime(dateTime);

        showingRepository.saveAndFlush(showing);
    }

    public String setSeatsForShowing(int movieId, String dateTime, String requestedSeats) {
        Showing showing = getShowingForMovieAndDateTime(movieId, dateTime);
        String seats = showing.getSeatsList();


        String[] requestedSeatsArray = requestedSeats.split(",");

        for (int i = 0; i < requestedSeatsArray.length; i++) {
            int seatIndex = seats.indexOf(requestedSeatsArray[i]);
            if (seats.charAt(seatIndex + 3) != '0') {
                return "ERROR: seat " + requestedSeatsArray[i] + " is already taken";
            }

            String result = seats.substring(0, seatIndex + 3);
            result += "1";
            if (seatIndex + 4 < seats.length()) {
                result += seats.substring(seatIndex + 4);
            }
            seats = result;
        }
        showing.setSeatsList(seats);

        showingRepository.save(showing);
        return "SUCCESS: seats are saved";
    }
}
