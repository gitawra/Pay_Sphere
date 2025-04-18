package com.tawratech.creditInformation.Services;

import com.tawratech.creditInformation.CardRepository.CreditCardNameRepository;
import com.tawratech.creditInformation.Entity.CreditCardName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreditCardNameService {

    @Autowired
    private CreditCardNameRepository creditCardNameRepository;

    public CreditCardName saveCreditCard(String cardName){
        int count = creditCardNameRepository.countCards();
        String cardCode = "CRED"+(count+1);

        CreditCardName creditCardName = new CreditCardName();
        creditCardName.setName(cardName);
        creditCardName.setCardCode(cardCode);

        return creditCardNameRepository.save(creditCardName);
    }

    public List<CreditCardName> searchCreditCardNames(String query) {
        return creditCardNameRepository.findByNameContainingIgnoreCase(query);
    }
}
