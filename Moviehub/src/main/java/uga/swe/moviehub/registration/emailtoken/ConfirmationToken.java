package uga.swe.moviehub.registration.emailtoken;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uga.swe.moviehub.users.models.User;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "confirmation_tokens")
public class ConfirmationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "token", nullable = false)
    private String token;
    @Column(name = "confirmed", nullable = false)
    private boolean confirmed = false;

    @OneToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private User user;
}
