package uga.swe.moviehub.registration;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistrationRequest {

    private String name;
    private String email;
    private String password;
}
