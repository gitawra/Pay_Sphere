package com.tawratech.creditInformation.CardRepository;

import com.tawratech.creditInformation.Entity.CreditCardName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CreditCardNameRepository extends JpaRepository<CreditCardName, Long> {
    @Query("SELECT COUNT(c) FROM CreditCardName c")
    int countCards();

    Optional<CreditCardName> findByName(String name);

    List<CreditCardName> findByNameContainingIgnoreCase(String name);
}
