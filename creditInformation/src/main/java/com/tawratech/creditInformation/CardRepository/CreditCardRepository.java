package com.tawratech.creditInformation.CardRepository;

import com.tawratech.creditInformation.Entity.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {
    Optional<CreditCard> findByCardCode(String cardCode);
}
