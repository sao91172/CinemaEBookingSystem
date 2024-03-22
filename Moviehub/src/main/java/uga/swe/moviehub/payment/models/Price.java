package uga.swe.moviehub.payment.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "prices")
public class Price {

    @Id
    @Column(name = "category")
    private String category;
    @Column(name = "price")
    private double price;
}
