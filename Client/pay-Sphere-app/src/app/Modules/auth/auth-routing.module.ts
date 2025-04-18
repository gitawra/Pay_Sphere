import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'admin/login', component: LoginComponent },
  {path:'admin/register',component:RegisterComponent},
  { path: 'admin/verify-otp', component: OtpVerificationComponent},
  { path: 'admin/home', component: AdminHomeComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
