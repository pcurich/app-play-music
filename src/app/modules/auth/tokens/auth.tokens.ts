import { InjectionToken } from '@angular/core';
import { IAuthRepository } from '../interfaces/auth-repository.interface';
import { IAuthValidator } from '../interfaces/auth-validator.interface';

export const AUTH_REPOSITORY_TOKEN = new InjectionToken<IAuthRepository>('AuthRepository');
export const AUTH_VALIDATOR_TOKEN = new InjectionToken<IAuthValidator>('AuthValidator');
