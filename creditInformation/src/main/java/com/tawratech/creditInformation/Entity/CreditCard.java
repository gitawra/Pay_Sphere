package com.tawratech.creditInformation.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "credit_cards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String bank;

    @Column(nullable = false)
    private String cardType;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String cardCode;


    @Column(name = "item_json", columnDefinition = "TEXT")
    private String itemJson;
}