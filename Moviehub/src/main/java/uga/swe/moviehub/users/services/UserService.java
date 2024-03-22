package uga.swe.moviehub.users.services;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import uga.swe.moviehub.email.EmailService;
import uga.swe.moviehub.payment.dto.PaymentCardRequestDto;
import uga.swe.moviehub.payment.models.Order;
import uga.swe.moviehub.payment.models.PaymentCard;
import uga.swe.moviehub.payment.repositories.PaymentCardRepository;
import uga.swe.moviehub.registration.emailtoken.ConfirmationToken;
import uga.swe.moviehub.registration.emailtoken.ConfirmationTokenService;
import uga.swe.moviehub.users.models.User;
import uga.swe.moviehub.users.repositories.UserRepository;
import uga.swe.moviehub.util.RandomStringGenerator;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final ConfirmationTokenService confirmationTokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final EmailService emailService;
    private final PaymentCardRepository paymentCardRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException(String.format("User could not be found with email: %s", email)));
    }

    public String addUser(User user) throws IllegalStateException {

        // check if the user already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalStateException("User already exists with email: " + user.getEmail());
        }

        // generate and save new confirmation token
        String tokenString = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken();
        confirmationToken.setToken(tokenString);
        confirmationToken.setUser(user);

        userRepository.save(user);
        confirmationTokenService.addConfirmationToken(confirmationToken);

        return tokenString;
    }

    public void activateUser(String userEmail) {
        userRepository.activateUser(userEmail);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void changePassword(String email, String password) {
        String encryptedPass = bCryptPasswordEncoder.encode(password);
        userRepository.changePassword(email, encryptedPass);
        emailService.sendSimpleMessage(email, "MovieHub Password Change",
                "Your MovieHub password has been successfully changed.");
    }

    public void changeName(String email, String name) {
        userRepository.changeName(email, name);
    }

    public Iterable<User> getUsers() {return userRepository.findAll();}

    public void forgotPassword(String email) {
        String tempPass = RandomStringGenerator.generateRandomString(10);

        emailService.sendSimpleMessage(email, "New Temporary Password",
                "Your new temporary password for MovieHub is: " + tempPass +
                "\nPlease reset your password from the user settings menu.");
        changePassword(email, tempPass);
    }

    public List<Order> getOrdersByUser(String email) {
        return findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User Not Found"))
                .getOrders();
    }

    public List<PaymentCard> getPaymentCardsByUser(String email) {
        return findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User Not Found"))
                .getPaymentCards();
    }

    public String addPaymentCard(PaymentCardRequestDto paymentCardRequestDto) {
        if (paymentCardRepository.existsById(paymentCardRequestDto.getCardNo())) {
            return "ERROR: credit card already in use";
        }

        User user = findByEmail(paymentCardRequestDto
                .getEmail())
                .orElseThrow(() -> new IllegalStateException("User could not be found with email")
                );

        PaymentCard paymentCard = new PaymentCard(
                paymentCardRequestDto.getCardNo(),
                paymentCardRequestDto.getExpDate(),
                paymentCardRequestDto.getCardHolderName(),
                paymentCardRequestDto.getCvv(),
                paymentCardRequestDto.getBillingAddress(),
                paymentCardRequestDto.getZipCode(),
                paymentCardRequestDto.getState(),
                user
        );

        paymentCardRepository.saveAndFlush(paymentCard);
        return "card added successfully";
    }

    public String removePaymentCard(String email, String cardNo) {
        if (!paymentCardRepository.existsById(cardNo)) {
            return "ERROR: card does not exist";
        }

        paymentCardRepository.deleteById(cardNo);
        return "card deleted successfully";
    }



}
