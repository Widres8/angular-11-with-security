import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class VerifyTokenGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(): boolean {
    const token = this.authService.token;
    const payload = JSON.parse(atob(token.access_token.split('.')[1]));
    const expired = this.expired(payload.exp);
    if (expired) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  expired(date: number) {
    const now = new Date().getTime() / 1000;
    return date < now ? true : false;
  }
}
