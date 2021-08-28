import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(): Promise<boolean> | boolean {
    if (this.authService.isLoginUser()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
