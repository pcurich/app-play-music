import { Injectable, Inject, signal, computed } from '@angular/core';
import { Observable, BehaviorSubject, map, tap, catchError, throwError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { IAuthRepository } from '../interfaces/auth-repository.interface';
import { IAuthValidator } from '../interfaces/auth-validator.interface';
import { AUTH_REPOSITORY_TOKEN, AUTH_VALIDATOR_TOKEN } from '../tokens/auth.tokens';
import { AuthModel } from '../models/auth.model';
import { UserModel } from '../models/user.model';
import { AppCookieService } from '@shared/index';
import { LoginRequest, RegisterRequest } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserModel | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // Signals
  currentUser = toSignal(this.currentUserSubject.asObservable(), { initialValue: null });
  isAuthenticated = toSignal(this.isAuthenticatedSubject.asObservable(), { initialValue: false });

  // Computed signals
  isLoggedIn = computed(() => this.isAuthenticated() && this.currentUser() !== null);
  userDisplayName = computed(() => {
    const user = this.currentUser();
    return user ? user.username || user.email : '';
  });

  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN) private repository: IAuthRepository,
    @Inject(AUTH_VALIDATOR_TOKEN) private validator: IAuthValidator,
    private cookieService: AppCookieService
  ) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = this.cookieService.getCookie('access_token');
    if (token) {
      this.repository.getCurrentUser().subscribe({
        next: (user) => {
          this.setCurrentUser(user);
          this.setAuthenticated(true);
        },
        error: () => {
          this.logout();
        }
      });
    }
  }

  login(credentials: LoginRequest): Observable<AuthModel> {
    return this.repository.login(credentials).pipe(
      tap(authData => {
        this.saveTokens(authData);
        this.setCurrentUser(authData.user);
        this.setAuthenticated(true);
      }),
      catchError(error => {
        this.setAuthenticated(false);
        return throwError(() => error);
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthModel> {
    // Validar datos antes de enviar
    const validationErrors = this.validateRegistrationData(userData);
    if (validationErrors.length > 0) {
      return throwError(() => ({ message: 'Validation failed', errors: validationErrors }));
    }

    return this.repository.register(userData).pipe(
      tap(authData => {
        this.saveTokens(authData);
        this.setCurrentUser(authData.user);
        this.setAuthenticated(true);
      }),
      catchError(error => {
        this.setAuthenticated(false);
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<void> {
    return this.repository.logout().pipe(
      tap(() => {
        this.clearTokens();
        this.setCurrentUser(null);
        this.setAuthenticated(false);
      })
    );
  }

  private validateRegistrationData(userData: RegisterRequest): string[] {
    const errors: string[] = [];

    if (!this.validator.validateEmail(userData.email)) {
      errors.push('Invalid email format');
    }

    if (!this.validator.validateUsername(userData.username)) {
      errors.push('Username must be at least 3 characters and contain only letters, numbers, and underscores');
    }

    const passwordValidation = this.validator.validatePassword(userData.password);
    if (!passwordValidation.isValid) {
      errors.push(...passwordValidation.errors);
    }

    if (!this.validator.validatePasswordMatch(userData.password, userData.confirmPassword)) {
      errors.push('Passwords do not match');
    }

    return errors;
  }

  private saveTokens(authData: AuthModel): void {
    this.cookieService.setCookie('access_token', authData.accessToken, 1); // 1 día
    this.cookieService.setCookie('refresh_token', authData.refreshToken, 30); // 30 días
  }

  private clearTokens(): void {
    this.cookieService.deleteCookie('access_token');
    this.cookieService.deleteCookie('refresh_token');
  }

  private setCurrentUser(user: UserModel | null): void {
    this.currentUserSubject.next(user);
  }

  private setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  // Métodos públicos para componentes
  getAccessToken(): string | null {
    return this.cookieService.getCookie('access_token') || null;
  }

  refreshTokens(): Observable<AuthModel> {
    const refreshToken = this.cookieService.getCookie('refresh_token');
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.repository.refreshToken(refreshToken).pipe(
      tap(authData => {
        this.saveTokens(authData);
      })
    );
  }
}
