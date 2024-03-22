package uga.swe.moviehub.payment.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uga.swe.moviehub.payment.models.Price;

@Repository
public interface PriceRepository extends JpaRepository<Price, String> {

}
