package uga.swe.moviehub.security.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import uga.swe.moviehub.security.AuthenticationEntryPointImplementation;
import uga.swe.moviehub.security.JwtAuthFilter;
import uga.swe.moviehub.security.UserAuthProvider;
import uga.swe.moviehub.users.services.UserService;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class WebSecurityConfiguration {

    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationEntryPointImplementation authenticationEntryPointImplementation;
    private final UserAuthProvider userAuthProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .exceptionHandling((exception) -> exception
                        .authenticationEntryPoint(authenticationEntryPointImplementation))
                .addFilterBefore(new JwtAuthFilter(userAuthProvider), BasicAuthenticationFilter.class)
                .csrf((csrf) -> csrf
                        .ignoringRequestMatchers("/api/**")
                )
                .authorizeHttpRequests((requests) -> requests
//                                .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
//                                .requestMatchers(HttpMethod.POST, "/api/**").permitAll()
                        .requestMatchers("/api/register/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/movies/**").permitAll()
                        .anyRequest().authenticated()

                )
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

}
