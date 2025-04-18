import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  userType: string = 'User';
  userTypeUrl: string = 'user';
  loading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserServiceService
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.extractUserType();
  }

  extractUserType() {
    // Get the current URL
    const urlSegments = this.router.url.split('/');
    
    // Extract the dynamic user type (assuming it's always after `/auth/`)
    const authIndex = urlSegments.indexOf('auth');
    if (authIndex !== -1 && authIndex + 1 < urlSegments.length) {
      let userTypeRaw = urlSegments[authIndex + 1]; // Extract the user type
      this.userTypeUrl = userTypeRaw;
      this.userType = userTypeRaw.charAt(0).toUpperCase() + userTypeRaw.slice(1); // Capitalize first letter
    }

    console.log('User Type:', this.userType);
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.loading = true;
      this.userService.register(formData).subscribe({
        next: (resp:any) => {
          console.log(resp);
          this.router.navigate([`/auth/${this.userTypeUrl}/verify-otp`]);
        },
        error: (err:any) => {
          console.error('Registration failed:', err);
          alert('Registration failed. Please try again.');
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
}
