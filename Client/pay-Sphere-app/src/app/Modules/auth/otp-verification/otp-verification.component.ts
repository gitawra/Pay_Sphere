import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements AfterViewInit {
  otp: string[] = ['', '', '', '', '', ''];
  otpDigits = new Array(6);

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(
      private router: Router,
      private userService: UserServiceService) { }

  timer!: any;
  timeLeft: number = 300; // 5 minutes = 300 seconds
  formattedTime: string = '05:00';

  ngAfterViewInit() {
    this.focusInput(0); // Focus first input on load
    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  focusInput(index: number) {
    const inputArray = this.otpInputs.toArray();
    if (inputArray[index]) {
      inputArray[index].nativeElement.focus();
    }
  }

  getOtpValue(index: number): string {
    return this.otp[index];
  }

  setOtpValue(index: number, value: string): void {
    this.otp[index] = value;
  }

  onInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    if (/^[0-9]$/.test(value)) {
      this.setOtpValue(index, value);
      if (index < this.otp.length - 1) {
        this.focusInput(index + 1);
      }
    } else {
      input.value = '';
      this.setOtpValue(index, '');
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (!this.otp[index] && index > 0) {
        this.focusInput(index - 1);
      }
    }
  }

  verifyOtp() {
    const code = this.otp.join('');
    const email = this.userService.getEmail(); // assume you saved the email during signup
  
    if (!email) {
      alert('Email not found. Please register again.');
      return;
    }
  
    const payload = {
      email: email,
      otp: code
    };

    this.resetTimer();
    this.otp = ['', '', '', '', '', ''];
    this.focusInput(0);

    this.userService.verifyOtp(payload).subscribe({
      next: (resp: any) => {
        console.log(resp);
        alert(resp.message);
        this.router.navigate([`/auth/admin/login`]);
      },
      error: (err: any) => {
        console.error('Verification failed:', err);
        alert(err.error?.message || 'Verification failed. Please try again.');
      }
    });
  }

  startTimer() {
    this.updateFormattedTime();
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateFormattedTime();
      } else {
        clearInterval(this.timer);
        // Optional: disable inputs or show "OTP expired" message
      }
    }, 1000);
  }

  resetTimer() {
    clearInterval(this.timer);
    this.timeLeft = 300;
    this.startTimer();
  }

  updateFormattedTime() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.formattedTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  resendCode() {
    console.log('Resend code clicked');
    // Trigger resend API
  }

}
