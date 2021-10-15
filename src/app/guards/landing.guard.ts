import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Router } from '@angular/router';
import { SessionService } from 'src/services/auth/session.service';
import { PaginationService } from 'src/services/routing/pagination.service';

@Injectable({
  providedIn: 'root'
})
export class LandingGuard implements CanLoad, CanActivate {

  constructor(
    private pagination: PaginationService,
    private session: SessionService,
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
        this.pagination.rootToPage('editor');
        return false;
    } else {
        return true;
    }
  }

  async canActivate(): Promise<boolean> {
    return await this.validate();
  }

  async canLoad(): Promise<boolean> {
    return await this.validate();
  }

}
