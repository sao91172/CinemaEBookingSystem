package uga.swe.moviehub.registration;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import uga.swe.moviehub.email.EmailService;
import uga.swe.moviehub.registration.emailtoken.ConfirmationToken;
import uga.swe.moviehub.registration.emailtoken.ConfirmationTokenService;
import uga.swe.moviehub.users.models.User;
import uga.swe.moviehub.users.services.UserService;

import java.nio.CharBuffer;

@Service
@AllArgsConstructor
public class UserRegistrationService {

    private final UserService userService;
    private final UserBuilder userBuilder;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailService emailService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    public String register(RegistrationRequest request) {
        String responseMessage = "";

        try {
            String emailToken = userService.addUser(userBuilder.build(request));
            String emailLink = "http://localhost:8080/api/register/confirm?token=" + emailToken;

            emailService.sendSimpleMessage(request.getEmail(), "Confirm Email for MovieHub",
                    "Use the following link to confirm your email and activate your account:\n" + emailLink);

            responseMessage = "User has been added, check email to activate account.";

        } catch (IllegalStateException ex) {
            responseMessage = ex.getMessage();
        }

        return responseMessage;
    }

    @Transactional
    public String confirmToken(String token) {

        ConfirmationToken confirmationToken = confirmationTokenService
                .getConfirmationToken(token)
                .orElseThrow(() -> new IllegalStateException("token could not be found"));

        if (confirmationToken.isConfirmed()) {
            throw new IllegalStateException("the user email has already been confirmed");
        }

        confirmationTokenService.confirmToken(token);
        userService.activateUser(confirmationToken.getUser().getEmail());

        return "User email " + confirmationToken.getUser().getEmail() + " has been confirmed";
    }

    public UserDto login(LoginRequestDto request) {
        User user = userService.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalStateException("Invalid Credentials"));

        if (bCryptPasswordEncoder.matches(CharBuffer.wrap(request.getPassword()), user.getPassword())) {
            UserDto userDto = new UserDto();
            userDto.setEmail(user.getEmail());
            userDto.setName(user.getName());
            userDto.setRole(user.getUserPermissions().toString());
            return userDto;
        } else {
            throw new IllegalStateException("Invalid Credentials");
        }

    }
}
