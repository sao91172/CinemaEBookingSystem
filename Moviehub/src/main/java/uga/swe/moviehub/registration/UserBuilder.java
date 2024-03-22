package uga.swe.moviehub.registration;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import uga.swe.moviehub.users.models.User;

@Service
@AllArgsConstructor
public class UserBuilder {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public User build(RegistrationRequest request) {

        User newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setName(request.getName());
        newUser.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));

        return newUser;

    }

}
