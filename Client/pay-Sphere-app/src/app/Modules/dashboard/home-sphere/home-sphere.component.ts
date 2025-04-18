import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CreditCardService } from 'src/app/Services/credit-card.service';

@Component({
  selector: 'app-home-sphere',
  templateUrl: './home-sphere.component.html',
  styleUrls: ['./home-sphere.component.css']
})
export class HomeSphereComponent implements OnInit {
  searchControl = new FormControl('');
  suggestions: { name: string; cardCode: string }[] = [];
  itemDtls: any = {}; // or use a proper interface if you prefer typing


  selectedCardDetails: any = null; // Stores full card details after selection

  constructor(private creditCardService: CreditCardService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),  // Wait for 300ms after user stops typing
      distinctUntilChanged(),  // Ignore duplicate values
      switchMap(query => {
        if (!query || query.trim() === '') {
          this.suggestions = []; // Hide suggestions when input is empty
          return []; // Return an empty observable
        }
        return this.creditCardService.searchCreditCards(query); // Call API
      })
    ).subscribe(data => {
      this.suggestions = data;  // Update suggestions array
    });
  }

  selectSuggestion(cardCode: string) {
    this.creditCardService.getCardDetails(cardCode).subscribe(
      (data) => {
        this.selectedCardDetails = data; // Store fetched card details
        try {
          this.itemDtls = JSON.parse(data.itemJson);
        } catch (e) {
          console.error("Failed to parse itemJson:", e);
        }
        
        this.suggestions = []; // Clear suggestions after selection
      },
      (error) => {
        console.error('Error fetching card details:', error);
      }
    );
  }
}
