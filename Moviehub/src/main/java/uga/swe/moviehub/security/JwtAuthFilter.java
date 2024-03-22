package uga.swe.moviehub.security;


import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@AllArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserAuthProvider userAuthProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (header != null) {
            String[] headerElements = header.split(" ");

            if (headerElements.length == 2 && headerElements[0].equals("Bearer")) {
                try {
                    SecurityContextHolder
                            .getContext().setAuthentication(userAuthProvider.validateToken(headerElements[1]));
                } catch (RuntimeException ex) {
                    SecurityContextHolder.clearContext();
                    throw ex;
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}
