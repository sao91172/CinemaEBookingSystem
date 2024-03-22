package uga.swe.moviehub.registration;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uga.swe.moviehub.security.UserAuthProvider;
import uga.swe.moviehub.users.dto.UserChangeDto;
import uga.swe.moviehub.users.services.UserService;

@RestController
@RequestMapping("/api/register")
@AllArgsConstructor
public class UserRegistrationController {

    // WARNING: ALL ENDPOINTS IN THIS CLASS ARE OPEN

    private final UserRegistrationService userRegistrationService;
    private final UserAuthProvider userAuthProvider;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<String> register(@RequestBody RegistrationRequest request) {
        String responseMessage = userRegistrationService.register(request);
        return new ResponseEntity<String>(responseMessage, HttpStatus.OK);
    }

    @GetMapping("/confirm")
    public ResponseEntity<String> confirmToken(@RequestParam("token") String token) {
        String responseMessage = "";

        try {
            responseMessage = userRegistrationService.confirmToken(token);
        } catch (IllegalStateException ex) {
            responseMessage = "ERROR: " + ex.getMessage();
        }

        return new ResponseEntity<String>(responseMessage, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        UserDto userDto;

        try {
            userDto = userRegistrationService.login(loginRequestDto);
            userDto.setToken(userAuthProvider.createToken(userDto.getEmail()));
        } catch (IllegalStateException ex) {
            userDto = new UserDto();
            userDto.setMessage(ex.getMessage());
            return new ResponseEntity<>(userDto, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody UserChangeDto userChangeDto) {
        userService.forgotPassword(userChangeDto.getEmail());
        String response = "Check your email for a new temporary password. The password can be changed " +
                "from the user settings menu.";
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
