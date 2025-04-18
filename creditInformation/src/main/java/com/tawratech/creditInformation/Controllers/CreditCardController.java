package com.tawratech.creditInformation.Controllers;

import com.tawratech.creditInformation.Entity.CreditCard;
import com.tawratech.creditInformation.Entity.CreditCardName;
import com.tawratech.creditInformation.Services.CreditCardNameService;
import com.tawratech.creditInformation.Services.CreditCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/credit-cards")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular
public class CreditCardController   {
    @Autowired
    private CreditCardService creditCardService;

    @Autowired
    private CreditCardNameService creditCardNameService;

    @PostMapping("/addCard")
    public ResponseEntity<?> addCreditCard(@RequestBody CreditCard creditCard) {
        try {
            CreditCard savedCard = creditCardService.saveCreditCard(creditCard);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCard);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving credit card: " + e.getMessage());
        }
    }

    @PostMapping("/card-name/save")
    public CreditCardName saveCreditCard(@RequestBody Map<String, String> requestBody) {
        String cardName = requestBody.get("name"); // Extract "name" from JSON request
        return creditCardNameService.saveCreditCard(cardName);
    }

    @GetMapping("/all")
    public List<CreditCard> getAllCreditCards(){
        return creditCardService.getAllCreditCard();
    }

    @GetMapping("/search/{cardCode}")
    public ResponseEntity<?> getCreditCardByCardCode(@PathVariable String cardCode) {
        try {
            // Find the credit card using the cardCode
            Optional<CreditCard> creditCard = creditCardService.getCreditCardByCardCode(cardCode);

            // Check if the credit card was found
            if (creditCard.isPresent()) {
                return ResponseEntity.ok(creditCard.get()); // Return the found credit card with 200 OK status
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Credit card not found");
            }
        } catch (Exception e) {
            // Handle any exceptions that occur and return an internal server error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }


    @GetMapping("/search")
    public List<Map<String, String>> searchCreditCardNames(@RequestParam String query) {
        return creditCardNameService.searchCreditCardNames(query)
                .stream()
                .map(card -> {
                    Map<String, String> result = new HashMap<>();
                    result.put("name", card.getName());
                    result.put("cardCode", card.getCardCode());
                    return result;
                })
                .toList();
    }

    @DeleteMapping("/{id}")
    public void deleteCreditCard(@PathVariable Long id) {
        creditCardService.deleteCreditCard(id);
    }
}
