import { Injectable } from '@angular/core';
import {
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoginUser()) {
      const roles = route.data.roles as Array<string>;
      if (roles) {
        if (this.authService.rolesMatch(roles)) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
