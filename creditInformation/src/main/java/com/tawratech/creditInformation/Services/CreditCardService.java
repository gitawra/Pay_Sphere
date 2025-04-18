package com.tawratech.creditInformation.Services;

import com.tawratech.creditInformation.CardRepository.BankRepository;
import com.tawratech.creditInformation.CardRepository.CreditCardNameRepository;
import com.tawratech.creditInformation.CardRepository.CreditCardRepository;
import com.tawratech.creditInformation.Entity.Bank;
import com.tawratech.creditInformation.Entity.CreditCard;
import com.tawratech.creditInformation.Entity.CreditCardName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CreditCardService {

    @Autowired
    private CreditCardRepository creditCardRepository;

    @Autowired
    private CreditCardNameRepository creditCardNameRepository;

    @Autowired
    private BankRepository bankRepository;

    public List<CreditCard> getAllCreditCard() {
        return creditCardRepository.findAll();
    }

    public CreditCard saveCreditCard(CreditCard creditCard) {
        // Check if the bank exists, if not, create it
        Optional<Bank> existingBank = bankRepository.findByName(creditCard.getBank());
        Bank bank;

        if (existingBank.isEmpty()) {
            bank = new Bank();
            bank.setName(creditCard.getBank());
            bankRepository.save(bank);
        } else {
            bank = existingBank.get();
        }

        // Store the bank name in the credit card entity
        creditCard.setBank(bank.getName());

        // Generate a cardCode (modify logic as needed)
        String cardCode = generateCardCode(creditCard.getName());

        // Check if CreditCardName already exists
        Optional<CreditCardName> existingCreditCardName = creditCardNameRepository.findByName(creditCard.getName());
        CreditCardName creditCardName;

        if (existingCreditCardName.isEmpty()) {
            creditCardName = new CreditCardName();
            creditCardName.setName(creditCard.getName());
            creditCardName.setCardCode(cardCode);
            creditCardNameRepository.save(creditCardName);
        } else {
            creditCardName = existingCreditCardName.get();
        }

        // Set cardCode in CreditCard
        creditCard.setCardCode(creditCardName.getCardCode());

        return creditCardRepository.save(creditCard);
    }


    public Optional<CreditCard> getCreditCardByCardCode(String cardCode) {
        return creditCardRepository.findByCardCode(cardCode);
    }

    public void deleteCreditCard(Long id) {
        creditCardRepository.deleteById(id);
    }

    private String generateCardCode(String name) {
        int count = creditCardNameRepository.countCards();
        return "CRED" + (count + 1);
    }
}
