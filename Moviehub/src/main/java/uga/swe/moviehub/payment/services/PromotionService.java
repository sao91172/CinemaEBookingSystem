package uga.swe.moviehub.payment.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uga.swe.moviehub.payment.models.Promotion;
import uga.swe.moviehub.payment.repositories.PromotionRepository;

import java.util.Optional;

@Service
@AllArgsConstructor
public class PromotionService {

    private final PromotionRepository promotionRepository;

    public void addPromotion(Promotion promotion) {
        promotionRepository.saveAndFlush(promotion);
    }

    public Iterable<Promotion> getPromotions() {
        return promotionRepository.findAll();
    }

    public void removePromotion(String promotionId) { promotionRepository.deleteById(promotionId); }

    public Optional<Promotion> getPromotionById(String promotionId) { return promotionRepository.findById(promotionId); }
}
