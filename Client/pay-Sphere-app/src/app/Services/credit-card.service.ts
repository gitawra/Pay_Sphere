import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private apiUrl = 'http://localhost:8080/credit-cards'; // Update this if needed

  constructor(private http: HttpClient) {}

  // Fetch credit card suggestions based on user input
  searchCreditCards(query: string): Observable<{ name: string; cardCode: string }[]> {
    return this.http.get<{ name: string; cardCode: string }[]>(`${this.apiUrl}/search?query=${query}`);
  }

  // Save a new credit card name
  saveCreditCard(name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/card-name/save`, { name });
  }

  //save a complete credit card information
  submitCardDetails(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addCard`, data);
  }

    // Fetch full details of selected card
    getCardDetails(cardCode: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/search/${cardCode}`);
    }
}
