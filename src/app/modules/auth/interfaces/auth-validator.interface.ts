export interface IAuthValidator {
  validateEmail(email: string): boolean;
  validatePassword(password: string): { isValid: boolean; errors: string[] };
  validatePasswordMatch(password: string, confirmPassword: string): boolean;
  validateUsername(username: string): boolean;
}
