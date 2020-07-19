import { Injectable } from '@angular/core';
import{
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { NotifyService } from './notify.service';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(private auth: AuthenticationService, private router: Router, private notify: NotifyService) {}
    async canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Promise<boolean> {
      const user = await this.auth.getUser();
      if (!user) {
        if (!user) {
          this.router.navigate(['/']);
        }
      }
      return !user;
    }
}