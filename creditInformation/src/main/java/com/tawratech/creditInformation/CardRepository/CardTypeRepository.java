package com.tawratech.creditInformation.CardRepository;

import com.tawratech.creditInformation.Entity.CardType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardTypeRepository extends JpaRepository<CardType, Long> {
}
