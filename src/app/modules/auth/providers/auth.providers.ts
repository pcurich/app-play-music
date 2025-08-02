import { Provider } from '@angular/core';
import { environment } from '@env/environment';
import { AUTH_REPOSITORY_TOKEN, AUTH_VALIDATOR_TOKEN } from '../tokens/auth.tokens';
import { AuthHttpRepository } from '../repositories/auth-http.repository';
import { AuthMockRepository } from '../repositories/auth-mock.repository';
import { AuthValidatorService } from '../services/auth-validator.service';

export const AUTH_PROVIDERS: Provider[] = [
  {
    provide: AUTH_REPOSITORY_TOKEN,
    useClass: environment.production ? AuthHttpRepository : AuthMockRepository
  },
  {
    provide: AUTH_VALIDATOR_TOKEN,
    useClass: AuthValidatorService
  }
];
