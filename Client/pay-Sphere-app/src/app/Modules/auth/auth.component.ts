import {Component,OnInit,ElementRef,QueryList,ViewChildren} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from 'src/app/Services/user-service.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  showAdminCodeOverlay = false;
  adminCode: string[] = ['', '', '', ''];
  otpDigits = new Array(4);
  verifyingAdminCode = false;

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(private router: Router, private http: HttpClient,private userService: UserServiceService) {}

  ngOnInit(): void {}


  navigateToLogin(role: string) {
    if (role === 'admin') {
      this.showAdminCodeOverlay = true;
      setTimeout(() => this.focusInput(0), 0); // Focus after overlay shown
    } else {
      this.router.navigate(['/dashboard/home']);
    }
  }

  focusInput(index: number) {
    const inputArray = this.otpInputs.toArray();
    if (inputArray[index]) {
      inputArray[index].nativeElement.focus();
    }
  }

  setOtpValue(index: number, value: string): void {
    this.adminCode[index] = value;
  }

  getOtpValue(index: number): string {
    return this.adminCode[index];
  }

  onInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;
  
    if (/^[0-9]$/.test(value)) {
      this.setOtpValue(index, value);
  
      if (index < this.adminCode.length - 1) {
        this.focusInput(index + 1);
      } else {
        // Check if all digits are entered
        const enteredCode = this.adminCode.join('');
        if (enteredCode.length === this.adminCode.length && /^[0-9]+$/.test(enteredCode)) {
          this.verifyAdminCode();
        }
      }
    } else {
      input.value = '';
      this.setOtpValue(index, '');
    }
  }
  

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (!this.adminCode[index] && index > 0) {
        this.focusInput(index - 1);
      }
    }
  }

  verifyAdminCode() {
    this.verifyingAdminCode = true;
    const enteredCode = this.adminCode.join('');
  
    const encryptedCode = CryptoJS.SHA256(enteredCode).toString(); // or AES if you want two-way
  
    const payload = {
      code: encryptedCode
    };
  
    this.userService.verifyAdminCode(payload).subscribe({
      next: () => {
        this.verifyingAdminCode = false;
        this.showAdminCodeOverlay = false;
        this.router.navigate(['/auth/admin/login']);
      },
      error: () => {
        this.verifyingAdminCode = false;
        this.adminCode = ['', '', '', ''];
        this.focusInput(0);
        alert('Invalid admin code. Try again.');
      }
    });
  }

  closeAdminOverlay() {
    this.showAdminCodeOverlay = false;
    this.adminCode = ['', '', '', ''];
  }
}
