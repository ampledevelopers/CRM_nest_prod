import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordValidationFormsService {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    passwordMin: 6,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}',
    mobilePattern: '^((\\+91-?)|0)?[0-9]{10}$' 
  };

  formErrors = {
    
    password: '',
    confirmPassword: '',
  
    accept: false,
  };

  constructor() {
    this.errorMessages = {
     
      password: {
        required: 'Password is required',
        pattern: 'Password must contain: numbers, uppercase and lowercase letters',
        minLength: `Password must be at least ${this.formRules.passwordMin} characters`
      },
      confirmPassword: {
        required: 'Password confirmation is required',
        passwordMismatch: 'Passwords must match'
      },
      accept: {
        requiredTrue: 'You have to accept our Terms and Conditions'
      },
    };
  }
}
