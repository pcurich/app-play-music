import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/request.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  showPassword = signal(false);

  hasError = computed(() => this.errorMessage() !== null);

  formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12)
    ]]
  });

  isFormValid = computed(() => {
    console.log('Form valid:', this.formLogin.valid);
    return this.formLogin.valid;
  });
  emailErrors = computed(() => {
    const emailControl = this.formLogin.get('email');
    if (emailControl?.errors && emailControl.touched) {
      if (emailControl.errors['required']) return 'Email is required';
      if (emailControl.errors['email']) return 'Invalid email format';
    }
    return null;
  });

  passwordErrors = computed(() => {
    const passwordControl = this.formLogin.get('password');
    if (passwordControl?.errors && passwordControl.touched) {
      if (passwordControl.errors['required']) return 'Password is required';
      if (passwordControl.errors['minlength']) return 'Password must be at least 6 characters';
      if (passwordControl.errors['maxlength']) return 'Password must not exceed 20 characters';
    }
    return null;
  });


  sendLogin(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const credentials: LoginRequest = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    };

    console.log('credentials', credentials);

    this.authService.login(credentials).subscribe({
      next: (authData) => {
        console.log('✅ Login successful', authData);
        this.isLoading.set(false);
        this.router.navigate(['/', 'tracks']);
      },
      error: (error) => {
        console.error('❌ Login failed', error);
        this.isLoading.set(false);
        this.errorMessage.set(
          error.message || 'Invalid email or password. Please try again.'
        );
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(current => !current);
  }

  clearError(): void {
    this.errorMessage.set(null);
  }

  // Método para prellenar datos de prueba (solo en desarrollo)
  fillTestCredentials(): void {
    this.formLogin.patchValue({
      email: 'test@test.com',
      password: '12345678'
    });
  }

}
