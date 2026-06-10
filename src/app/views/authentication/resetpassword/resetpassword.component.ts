import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName} from '@angular/forms';

import { ValidatorFn, ValidationErrors } from '@angular/forms';
import { ResetpasswordValidationFormsService } from './resetpassword-validation-forms.service';
//import {FormsComponent} from '../../base/forms.component';
import {UserService} from '../../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';




/** passwords must match - custom validator */
export const confirmPasswordValidator: any = (control: FormGroup): ValidationErrors | null => {
  const password: any= control.get('password');
  const confirm = control.get('confirmPassword');
  return password && confirm && password.value === confirm.value ? null : { 'passwordMismatch': true };
};


@Component({
    templateUrl: './resetpassword.component.html',
    styleUrls: ['./resetpassword.component.scss'],
    providers: [ResetpasswordValidationFormsService],
    standalone: false
})
export class ResetpasswordComponent {
  simpleForm!: FormGroup;
  submitted = false;
  formErrors: any;
  userId: any;

  constructor(private userService: UserService, private router: Router,
    private fb: FormBuilder,
    public vf: ResetpasswordValidationFormsService
  ) {
    this.formErrors = this.vf.errorMessages;
    this.createForm();
    this.loadUser();
  }

  createForm() {
    this.simpleForm = this.fb.group({
       password: ['', [Validators.required, Validators.minLength(this.vf.formRules.passwordMin),
       Validators.pattern(this.vf.formRules.passwordPattern)] ],
       confirmPassword: ['', [Validators.required] ],
    } , { validator: confirmPasswordValidator});
  }

  // convenience getter for easy access to form fields
  get f() { return this.simpleForm.controls; }

  onReset() {

    this.submitted = false;
    this.simpleForm.reset();

  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.simpleForm.invalid) {
      return;
    }

    // TODO: Use EventEmitter with form value
    // console.warn(this.simpleForm.value);
    this.userService.resetPassword(localStorage.getItem('userId'), JSON.stringify(this.simpleForm.value)).subscribe({next: (data: any) => {
        //  this.router.navigate(['/']);
        alert('SUCCESS!');
        window.location.reload();
    },
    error: (error: HttpErrorResponse) => {
        alert('Invalid Response');
        // this.isLoginError = true;
  }});
  }

   loadUser() {
        this.userId = localStorage.getItem('userId');
        this.userService.getUser(this.userId).subscribe({next: (data: any) => { // alert(data);
           // this.simpleForm = data;
            this.simpleForm.patchValue(data);
        },
            error: (error: HttpErrorResponse) => {
                alert('Invalid Response');
                // this.isLoginError = true;
   }});
    }

}
