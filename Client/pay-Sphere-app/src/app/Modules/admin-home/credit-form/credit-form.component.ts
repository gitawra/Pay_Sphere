import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCardService } from 'src/app/Services/credit-card.service';

@Component({
  selector: 'app-credit-form',
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.css']
})
export class CreditFormComponent implements OnInit {

  creditForm!: FormGroup;
  submitted = false;
  
  constructor(private fb: FormBuilder, private creditCardService: CreditCardService) { }

  ngOnInit(): void {
    this.creditForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      cardCode: [''],
      bank: ['', Validators.required],
      cardType: ['', Validators.required],

      lounges: [''],
      petrolWaivers: [''],
      points: [''],
  
      // Benefits breakdown
      welcomeGift: [''],
      milestoneBenefits: [''],
      birthdayBenefit: [''],
  
      // Charges breakdown
      joiningFee: [''],
      annualFee: [''],
      renewalFee: [''],
  
      // Offers breakdown
      diningOffers: [''],
      travelOffers: [''],
      partnerOffers: ['']
    });
  }
  

  // Convenience getter for easy access to form fields
  get f() { return this.creditForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.creditForm.invalid) {
      return;
    }

      // Extract nested values properly
  const Benefits = {
    welcomeGift: this.creditForm.get('welcomeGift')?.value,
    milestoneBenefits: this.creditForm.get('milestoneBenefits')?.value,
    birthdayBenefit: this.creditForm.get('birthdayBenefit')?.value
  };

  const Charges = {
    joiningFee: this.creditForm.get('joiningFee')?.value,
    annualFee: this.creditForm.get('annualFee')?.value,
    renewalFee: this.creditForm.get('renewalFee')?.value
  };

  const Offers = {
    diningOffers: this.creditForm.get('diningOffers')?.value,
    travelOffers: this.creditForm.get('travelOffers')?.value,
    partnerOffers: this.creditForm.get('partnerOffers')?.value
  };

  const payload = {
    lounges: this.creditForm.get('lounges')?.value,
    petrolWaivers: this.creditForm.get('petrolWaivers')?.value,
    points: this.creditForm.get('points')?.value,
    Charges,
    Offers,
    Benefits
  };

  const finalObject = {
    name: this.creditForm.get('name')?.value,
    cardCode: this.creditForm.get('cardCode')?.value,
    bank: this.creditForm.get('bank')?.value,
    cardType: this.creditForm.get('cardType')?.value,
    itemJson: JSON.stringify(payload)
  };

    // Call the service to submit the data
    this.creditCardService.submitCardDetails(finalObject).subscribe({
      next: (response) => {
        console.log('Form submitted successfully', response);
        alert('Card details submitted successfully!');
        this.creditForm.reset();
        this.submitted = false;
      },
      error: (error) => {
        console.error('Error submitting form', error.message);
        alert('Submission failed. Please try again.');
      }
    });
  }

  onReset(): void {
    this.creditForm.reset();
    this.submitted = false;
  }

}
