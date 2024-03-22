package uga.swe.moviehub.payment.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uga.swe.moviehub.movies.models.Movie;
import uga.swe.moviehub.movies.services.MovieService;
import uga.swe.moviehub.movies.services.ShowingService;
import uga.swe.moviehub.payment.dto.PlaceOrderDto;
import uga.swe.moviehub.payment.models.Order;
import uga.swe.moviehub.payment.models.Price;
import uga.swe.moviehub.payment.models.Promotion;
import uga.swe.moviehub.payment.repositories.OrderRepository;
import uga.swe.moviehub.payment.repositories.PriceRepository;
import uga.swe.moviehub.users.models.User;
import uga.swe.moviehub.users.services.UserService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PaymentService {

    private PriceRepository priceRepository;
    private OrderRepository orderRepository;
    private UserService userService;
    private PromotionService promotionService;
    private ShowingService showingService;
    private MovieService movieService;

    public List<Price> getPrices() {return priceRepository.findAll();}

    public Iterable<Order> getAllOrders() {return orderRepository.findAll();}

    public Order getOrderById(int orderId) {
        return orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new IllegalStateException("Order not found with ID: " + orderId));
    }

    public void changePrices(double adultPrice, double childPrice, double seniorPrice) {
        Optional<Price> optionalPrice = priceRepository.findById("Adult");
        if (optionalPrice.isPresent()) {
            Price adult = optionalPrice.get();
            adult.setPrice(adultPrice);
            priceRepository.save(adult);
        }

        optionalPrice = priceRepository.findById("Child");
        if (optionalPrice.isPresent()) {
            Price child = optionalPrice.get();
            child.setPrice(childPrice);
            priceRepository.save(child);
        }

        optionalPrice = priceRepository.findById("Senior");
        if (optionalPrice.isPresent()) {
            Price senior = optionalPrice.get();
            senior.setPrice(seniorPrice);
            priceRepository.save(senior);
        }
    }

    public String placeOrder(PlaceOrderDto placeOrderDto) {
        Order order = new Order();

        try {
            User user = userService.findByEmail(placeOrderDto.getEmail()).orElseThrow(() -> new IllegalStateException("User could not be found"));
            order.setUser(user);
        } catch (IllegalStateException e) {
            return "ERROR: User could not be found";
        }

        try {
            Movie movie = movieService.getMovieById(placeOrderDto.getMovieId()).orElseThrow(() -> new IllegalStateException("Movie could not be found"));
            order.setMovie(movie);
        } catch (IllegalStateException e) {
            return "ERROR: Requested movie could not be found";
        }

        order.setDateTime(getCurrentDateTime());

        order.setAdultQuantity(placeOrderDto.getAdultQuantity());
        order.setChildQuantity(placeOrderDto.getChildQuantity());
        order.setSeniorQuantity(placeOrderDto.getSeniorQuantity());

        List<Price> priceList = getPrices();
        order.setAdultPrice(priceList.get(0).getPrice());
        order.setChildPrice(priceList.get(1).getPrice());
        order.setSeniorPrice(priceList.get(2).getPrice());

        double promotionAmt = -1;

        if (placeOrderDto.getPromoCode() != null) {
            promotionAmt = getPromotionAmount(placeOrderDto.getPromoCode());
            if (promotionAmt == -1) {
                return "ERROR: promo code is invalid";
            }
            promotionAmt /= 100;
            promotionAmt = 1 - promotionAmt;
        } else {
            promotionAmt = 1;
        }

        double orderTotal = order.getAdultPrice() * order.getAdultQuantity() +
                order.getChildPrice() * order.getChildQuantity() +
                order.getSeniorPrice() * order.getSeniorQuantity();

        orderTotal *= promotionAmt;
        order.setOrderTotal(orderTotal);

        String seatsResult = showingService.setSeatsForShowing(placeOrderDto.getMovieId(), placeOrderDto.getShowingDateTime(), placeOrderDto.getRequestedSeats());
        if (seatsResult.startsWith("ERROR")){
            return seatsResult;
        }
        order.setOrderSeats(placeOrderDto.getRequestedSeats());

        Order savedOrder = orderRepository.saveAndFlush(order);

        return "Order has been processed successfully with ID:" + savedOrder.getOrderId();
    }

    private String getCurrentDateTime() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm");

        return currentDateTime.format(formatter);
    }

    private int getPromotionAmount(String promoCode) {
        int promotionAmt = -1;
        Optional<Promotion> promotionOptional = promotionService.getPromotionById(promoCode);

        if (promotionOptional.isPresent()) {
            promotionAmt = promotionOptional.get().getPromoAmt();
        }
        return promotionAmt;

    }

}
