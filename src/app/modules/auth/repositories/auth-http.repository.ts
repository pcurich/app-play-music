import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, tap, throwError } from 'rxjs';
import { IAuthRepository } from '../interfaces/auth-repository.interface';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { LoginRequest, RegisterRequest } from '../models/request.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpRepository implements IAuthRepository {
  private readonly URL = `${environment.api}/auth`;
  private http = inject(HttpClient);

  login(credentials: LoginRequest): Observable<AuthModel> {
    console.log('Login credentials:', `${this.URL}/login`, credentials);
    return this.http.post<LoginServerResponse>(`${this.URL}/login`, credentials)
      .pipe(
        tap(response => console.log('Login response:', response)),
        map(response => this.mapLoginResponse(response)),
        catchError(this.handleError)
      );
  }

   private mapLoginResponse(response: LoginServerResponse): AuthModel {
    const user: UserModel = {
      name: response.data.name,
      email: response.data.email,
      avatar: response.data.avatar,
      username: response.data.name, // Alias para compatibilidad
      id: this.extractUserIdFromToken(response.tokenSession), // Extraer del token si es posible
      isActive: true
    };
    return {
      user,
      tokenSession: response.tokenSession,
      expiresIn: this.calculateExpirationFromToken(response.tokenSession)
    };
  };

  private extractUserIdFromToken(token: string): number | undefined {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || payload.sub || undefined;
    } catch {
      return undefined;
    }
  }

  private calculateExpirationFromToken(token: string): number | undefined {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp) {
        const now = Math.floor(Date.now() / 1000);
        return payload.exp - now; // Segundos hasta expiración
      }
    } catch {
      // Si no se puede parsear, usar valor por defecto
    }
    return 7200; // 2 horas por defecto
  }

  register(userData: RegisterRequest): Observable<AuthModel> {
    const serverData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      avatar: userData.avatar || 'https://via.placeholder.com/150'
    };

    return this.http.post<LoginServerResponse>(`${this.URL}/register`, serverData)
      .pipe(
        map(response => this.mapLoginResponse(response)),
        catchError(this.handleError)
      );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.URL}/logout`, {})
      .pipe(catchError(this.handleError));
  }

  refreshToken(token: string): Observable<AuthModel> {
    return this.http.post<LoginServerResponse>(`${this.URL}/refresh`, { refreshToken: token })
      .pipe(
        map(response => this.mapLoginResponse(response)),
        catchError(this.handleError)
      );
  }

  getCurrentUser(): Observable<UserModel> {
    return this.http.get<{data: UserModel}>(`${this.URL}/me`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  private handleError = (error: any): Observable<never> => {
    console.error('Auth Error:', error);

    // Mapear errores específicos del servidor
    if (error.status === 401) {
      return throwError(() => new Error('Invalid credentials'));
    }
    if (error.status === 422) {
      return throwError(() => new Error('Validation failed'));
    }
    if (error.status === 409) {
      return throwError(() => new Error('Email already exists'));
    }

    return throwError(() => new Error(error.message || 'Authentication failed'));
  };
}
