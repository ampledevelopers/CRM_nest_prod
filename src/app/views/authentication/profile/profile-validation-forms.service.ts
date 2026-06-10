import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileValidationFormsService {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    mobileMin: 10,
    passwordMin: 6,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}',
    mobilePattern: '^((\\+91-?)|0)?[0-9]{10}$' 
  };

  formErrors = {
    user_name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    gsx_id: '',
    gsx_api_token: '',
    accept: false,
  };

  constructor() {
    this.errorMessages = {
      user_name: {
        required: 'User name is required',
      },
      email: {
        required: 'required',
        email: 'Invalid email address',
      },
      mobile: {
        required: 'required',
        email: 'Mobile is  Required',
        mobilePattern: 'Mobile number is invalid'
      },
      password: {
        required: 'Password is required',
        pattern: 'Password must contain: numbers, uppercase and lowercase letters',
        minLength: `Password must be at least ${this.formRules.passwordMin} characters`
      },
      confirmPassword: {
        required: 'Password confirmation is required',
        passwordMismatch: 'Passwords must match'
      },
      
      gsx_id: {
        required: 'required',
        email: 'GSX ID is  Required',
      },
      
      gsx_api_token: {
        required: 'required',
        email: 'GSX API Token is Required',
      },
      accept: {
        requiredTrue: 'You have to accept our Terms and Conditions'
      },
    };
  }
}
