import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { CreditFormComponent } from './credit-form/credit-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    
  
    AdminHomeComponent,
    CreditFormComponent
  ],
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminHomeModule { }
