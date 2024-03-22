package uga.swe.moviehub.payment;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uga.swe.moviehub.payment.dto.GenericStringDto;
import uga.swe.moviehub.payment.dto.OrderDto;
import uga.swe.moviehub.payment.dto.PlaceOrderDto;
import uga.swe.moviehub.payment.dto.PriceDto;
import uga.swe.moviehub.payment.models.Order;
import uga.swe.moviehub.payment.models.Price;
import uga.swe.moviehub.payment.models.Promotion;
import uga.swe.moviehub.payment.services.PaymentService;
import uga.swe.moviehub.payment.services.PromotionService;

import java.util.Optional;

@RestController
@RequestMapping("/api/payment")
@AllArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final PromotionService promotionService;

    @GetMapping("/prices")
    public ResponseEntity<Iterable<Price>> getPrices() {
        return new ResponseEntity<>(paymentService.getPrices(), HttpStatus.OK);
    }

    @PutMapping("/prices/set")
    public ResponseEntity<String> changePrices(@RequestBody PriceDto priceDto) {
        paymentService.changePrices(priceDto.getAdultPrice(), priceDto.getChildPrice(), priceDto.getSeniorPrice());
        return new ResponseEntity<>("Prices Changed", HttpStatus.OK);
    }

    @GetMapping("/orders")
    public ResponseEntity<Iterable<Order>> getOrders() {
        return new ResponseEntity<>(paymentService.getAllOrders(), HttpStatus.OK);
    }

    @PostMapping("/place-order")
    public ResponseEntity<String> placeOrder(@RequestBody PlaceOrderDto placeOrderDto) {
        String response = paymentService.placeOrder(placeOrderDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/order-number")
    public ResponseEntity<Order> getOrderById(@RequestBody OrderDto orderDto) {
        return new ResponseEntity<>(paymentService.getOrderById(orderDto.getOrderNum()), HttpStatus.OK);
    }

    @PostMapping("/promotions/add")
    public ResponseEntity<String> addPromotion(@RequestBody Promotion promotion) {
        promotionService.addPromotion(promotion);
        return new ResponseEntity<>("Promotion added", HttpStatus.OK);
    }

    @GetMapping("/promotions")
    public ResponseEntity<Iterable<Promotion>> getPromotions() {
        return new ResponseEntity<>(promotionService.getPromotions(), HttpStatus.OK);
    }

    @PostMapping("/promotions/promotion")
    public ResponseEntity<Optional<Promotion>> getPromotionById(@RequestBody GenericStringDto request) {
        return new ResponseEntity<>(promotionService.getPromotionById(request.getElement()), HttpStatus.OK);
    }

    @DeleteMapping("/promotions/delete")
    public ResponseEntity<String> deletePromotion(@RequestBody GenericStringDto request) {
        promotionService.removePromotion(request.getElement());
        return new ResponseEntity<>("Promotion Removed", HttpStatus.OK);
    }

}
