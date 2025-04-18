import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseUrl = 'http://localhost:8080/api/auth';
  private email: string | null = null;

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    this.email = userData.email; // Store the email here
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }

  verifyOtp(data: { email: string, otp: string }) {
    const response = this.http.post(`${this.baseUrl}/verify-otp`, data);
    this.clearEmail(); // Clear email after sending
    return response;
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signing`, userData);
  }

  verifyAdminCode(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-admin-code`, userData);
  }



  getEmail(): string | null {
    return this.email;
  }

  clearEmail(): void {
    this.email = null;
  }
}
