import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Passwords must match */
function confirmPasswordValidator(control: FormGroup): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  return password && confirm && password.value === confirm.value ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;
  submitted = false;
  loading = false;
  message = '';
  messageType: 'info' | 'success' | 'danger' | null = 'info';
  readonly passwordMin = 8;
  readonly passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  formErrors: Record<string, string> = {};

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.resetForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(this.passwordMin),
            Validators.pattern(this.passwordPattern),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: confirmPasswordValidator }
    );
    this.message = 'You are required to reset your password. Please set a new password below.';
    this.messageType = 'info';
  }

  get f() {
    return this.resetForm.controls;
  }

  get formGroupErrors() {
    return this.resetForm.errors;
  }

  onSubmit(): void {
    this.submitted = true;
    this.formErrors = {};
    if (this.resetForm.invalid) {
      if (this.resetForm.errors?.['passwordMismatch']) {
        this.formErrors['confirmPassword'] = 'Passwords must match.';
      }
      return;
    }
    this.loading = true;
    this.message = '';
    this.messageType = null;
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.loading = false;
      this.message = 'Session expired. Please log in again.';
      this.messageType = 'danger';
      return;
    }
    this.userService
      .resetPassword(userId, JSON.stringify(this.resetForm.value))
      .subscribe({
        next: (data: any) => {
          this.loading = false;
          if (data.status == false) {
            this.message = data.message || 'Failed to reset password. Please try again.';
            this.messageType = 'danger';
            return;
          }
          this.message = 'Password reset successfully. Redirecting to login...';
          this.messageType = 'success';
          setTimeout(() => this.router.navigate(['login']), 1500);
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          this.message = err?.error?.message || 'Failed to reset password. Please try again.';
          this.messageType = 'danger';
        },
      });
  }
}
