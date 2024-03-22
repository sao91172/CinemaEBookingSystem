package uga.swe.moviehub.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PriceDto {

    private double adultPrice;
    private double childPrice;
    private double seniorPrice;
}
