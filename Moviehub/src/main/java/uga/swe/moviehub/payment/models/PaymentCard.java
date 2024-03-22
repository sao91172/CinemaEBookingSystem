package uga.swe.moviehub.payment.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uga.swe.moviehub.users.models.User;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "paymentcards")
public class PaymentCard {

    @Id
    @Column(name = "cardno", nullable = false)
    private String cardNo;
    @Column(name = "expdate",nullable = false)
    private String expDate;
    @Column(name = "cardholdername", nullable = false)
    private String cardHolderName;
    @Column(name = "cvv", nullable = false)
    private int cvv;
    @Column(name = "address", nullable = false)
    private String billingAddress;
    @Column(name = "zipcode", nullable = false)
    private int zipCode;
    @Column(name = "state", nullable = false)
    private String state;


    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
