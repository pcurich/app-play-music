import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, tap } from 'rxjs';
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
    return this.http.post<{data: AuthModel}>(`${this.URL}/login`, credentials)
      .pipe(
        tap(response => console.log('Login response:', response)),
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  register(userData: RegisterRequest): Observable<AuthModel> {
    return this.http.post<{data: AuthModel}>(`${this.URL}/register`, userData)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.URL}/logout`, {})
      .pipe(catchError(this.handleError));
  }

  refreshToken(token: string): Observable<AuthModel> {
    return this.http.post<{data: AuthModel}>(`${this.URL}/refresh`, { refreshToken: token })
      .pipe(
        map(response => response.data),
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
    throw error;
  };
}
