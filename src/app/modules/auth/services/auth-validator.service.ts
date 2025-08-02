import { Injectable } from '@angular/core';
import { IAuthValidator } from '../interfaces/auth-validator.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthValidatorService implements IAuthValidator {

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validatePasswordMatch(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

  validateUsername(username: string): boolean {
    return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
  }
}
