import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userType: string = 'User';
  userTypeUrl: string = 'User';

  loginForm!: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private userService: UserServiceService) {}

  ngOnInit() {
    this.extractUserType();

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
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

  //signing ib to the admin portal
  signIn(){
    if(this.userTypeUrl == 'admin'){
      
      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        return;
      }
      const formData = this.loginForm.value;
      const { email, password } = this.loginForm.value;
      this.userService.login(formData).subscribe({
        next: (resp:any) => {
          if(resp.token){
            localStorage.setItem('authToken', resp.token);
            this.router.navigate([`/${this.userTypeUrl}/home`]);
          }
        },
        error: (err:any) => {
          console.error('Registration failed:', err);
          alert('login failed. Please try again and check email and password.');
        }
      })
    
    }else{
      this.router.navigate([`/auth/${this.userTypeUrl}/home`]); // it may have different path modify it accordingly
    }
  }
  
}
