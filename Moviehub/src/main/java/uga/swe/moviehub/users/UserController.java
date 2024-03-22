package uga.swe.moviehub.users;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uga.swe.moviehub.payment.dto.PaymentCardRequestDto;
import uga.swe.moviehub.payment.models.Order;
import uga.swe.moviehub.payment.models.PaymentCard;
import uga.swe.moviehub.users.dto.UserChangeDto;
import uga.swe.moviehub.users.dto.UserDto;
import uga.swe.moviehub.users.models.User;
import uga.swe.moviehub.users.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping()
    public ResponseEntity<Iterable<User>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @DeleteMapping("/delete-account")
    public ResponseEntity<String> removeAccount(@RequestBody UserDto userDto) {
        return null;
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody UserChangeDto userChangeDto) {
        userService.changePassword(userChangeDto.getEmail(), userChangeDto.getElement());
        return new ResponseEntity<>("Password changed.", HttpStatus.OK);
    }

    @PostMapping("/change-name")
    public ResponseEntity<String> changeName(@RequestBody UserChangeDto userChangeDto) {
        userService.changeName(userChangeDto.getEmail(), userChangeDto.getElement());
        return new ResponseEntity<>("User's name changed.", HttpStatus.OK);
    }


    @PostMapping("/orders")
    public ResponseEntity<List<Order>> getOrdersByUser(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.getOrdersByUser(userDto.getEmail()), HttpStatus.OK);
    }

    @PostMapping("/payment-cards")
    public ResponseEntity<List<PaymentCard>> getPaymentCardsByUser(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.getPaymentCardsByUser(userDto.getEmail()), HttpStatus.OK);
    }

    @PostMapping("/payment-cards/add")
    public ResponseEntity<String> addPaymentCard(@RequestBody PaymentCardRequestDto paymentCardDto) {
        String responseMessage = userService.addPaymentCard(paymentCardDto);
        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }

    @DeleteMapping("/payment-cards/delete")
    public ResponseEntity<String> deletePaymentCard(@RequestBody PaymentCardRequestDto paymentCardRequestDto) {
        String responseMessage = userService.removePaymentCard(paymentCardRequestDto.getEmail(), paymentCardRequestDto.getCardNo());
        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }

}
