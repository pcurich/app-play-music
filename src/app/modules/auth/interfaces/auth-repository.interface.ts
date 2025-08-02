import { Observable } from 'rxjs';
import { AuthModel } from '../models/auth.model';
import { LoginRequest, RegisterRequest } from '../models/request.model';
import { UserModel } from '../models/user.model';

export interface IAuthRepository {
  login(credentials: LoginRequest): Observable<AuthModel>;
  register(userData: RegisterRequest): Observable<AuthModel>;
  logout(): Observable<void>;
  refreshToken(token: string): Observable<AuthModel>;
  getCurrentUser(): Observable<UserModel>;
}
