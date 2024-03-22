package uga.swe.moviehub.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentCardRequestDto {

    private String email;

    private String cardNo;
    private String expDate;
    private String cardHolderName;
    private int cvv;
    private String billingAddress;
    private int zipCode;
    private String state;
}
