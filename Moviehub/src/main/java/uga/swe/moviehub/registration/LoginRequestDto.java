package uga.swe.moviehub.registration;

import lombok.*;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode
@ToString
public class LoginRequestDto {

    private String email;
    private String password;
}
