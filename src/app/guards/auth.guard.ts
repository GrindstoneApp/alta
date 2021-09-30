import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Router } from '@angular/router';
import { PaginationService } from 'src/services/routing/pagination.service';
import { SessionService } from 'src/services/auth/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private session: SessionService,
    private pagination: PaginationService,
    private router: Router
  ) { }

  /**
   * Checks if the user is validated for the Auth Guard
   *
   * @example
   * // returns false
   * validate(); and token is not valid or and is not present
   * @example
   * // returns true
   * validate(); and token is valid or and is present
   * @returns {Boolean} Returns if the platform is authenticated
   */

  async validate() {
    const isAuthenticated = await this.session.sessionInService();
    if (isAuthenticated) {
      // console.log('[AuthGuard] ', 'Device is validated');
      return true;
    } else {
      // console.warn('[AuthGuard] ', 'Device is invalid');
      // window.location.href = 'https://accounts.grindstoneapp.com/o/oauth?redirectURI=https://my.grindstoneapp.com/auth/cb'
      return false;
    }
  }

  async canActivate(): Promise<boolean> {
    return await this.validate();
  }

  async canLoad(): Promise<boolean> {
    return await this.validate();
  }

}
