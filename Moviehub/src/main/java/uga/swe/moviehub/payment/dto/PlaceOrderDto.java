package uga.swe.moviehub.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaceOrderDto {

    private String email;

    private int adultQuantity;
    private int childQuantity;
    private int seniorQuantity;

    private String requestedSeats;
    private int movieId;
    private String showingDateTime;

    // 0  is new payment, 1 2 3 are users payment cards
    private int paymentMethod;
    private String promoCode;

    private String cardNo;
    private String expDate;
    private String cardHolderName;
    private int cvv;
    private String billingAddress;
    private int zipCode;
    private String state;

}
