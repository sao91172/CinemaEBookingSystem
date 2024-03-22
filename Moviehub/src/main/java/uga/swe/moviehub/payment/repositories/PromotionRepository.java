package uga.swe.moviehub.payment.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import uga.swe.moviehub.payment.models.Promotion;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, String> {

}
