import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppCookieService {
  private cookieService = inject(CookieService);

  setCookie(name: string, value: string, expires?: number): void {
    this.cookieService.set(name, value, expires);
  }

  getCookie(name: string): string {
    return this.cookieService.get(name);
  }

  hasCookie(name: string): boolean {
    return this.cookieService.check(name);
  }

  deleteCookie(name: string): void {
    this.cookieService.delete(name);
  }

  deleteAllCookies(): void {
    this.cookieService.deleteAll();
  }

  getAllCookies(): { [key: string]: string } {
    return this.cookieService.getAll();
  }
}
