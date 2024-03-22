package uga.swe.moviehub.payment.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "promotions")
public class Promotion {

    @Id
    @Column(name = "code", nullable = false)
    private String promoCode;
    @Column(name = "promoAmt", nullable = false)
    private int promoAmt;

}
