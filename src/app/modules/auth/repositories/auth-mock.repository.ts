import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { IAuthRepository } from '../interfaces/auth-repository.interface';
import { AuthModel } from '../models/auth.model';
import { UserModel } from '../models/user.model';
import { LoginRequest, RegisterRequest } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthMockRepository implements IAuthRepository {
  private mockUsers: UserModel[] = [
    {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      avatar: 'https://via.placeholder.com/150',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  login(credentials: LoginRequest): Observable<AuthModel> {
    return new Observable(observer => {
      setTimeout(() => {
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
          const authData: AuthModel = {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            user: this.mockUsers[0],
            expiresIn: 3600
          };
          observer.next(authData);
        } else {
          observer.error({ message: 'Invalid credentials' });
        }
        observer.complete();
      }, 1000);
    });
  }

  register(userData: RegisterRequest): Observable<AuthModel> {
    return new Observable(observer => {
      setTimeout(() => {
        const newUser: UserModel = {
          id: Date.now(),
          username: userData.username,
          email: userData.email,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const authData: AuthModel = {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          user: newUser,
          expiresIn: 3600
        };

        this.mockUsers.push(newUser);
        observer.next(authData);
        observer.complete();
      }, 1500);
    });
  }

  logout(): Observable<void> {
    return of(void 0).pipe(delay(500));
  }

  refreshToken(token: string): Observable<AuthModel> {
    return of({
      accessToken: 'new-mock-access-token',
      refreshToken: token,
      user: this.mockUsers[0],
      expiresIn: 3600
    }).pipe(delay(300));
  }

  getCurrentUser(): Observable<UserModel> {
    return of(this.mockUsers[0]).pipe(delay(200));
  }
}
