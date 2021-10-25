/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { ErrorService } from '../qas/error.service';
import { StorageService } from '../storage/storage.service';

import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { RequestService } from '../http/request.service';
import { User, UserProvider } from 'src/providers/user.provider';
import { from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Portfolio, PortfolioProvider } from 'src/providers/portfolio.provider';
import { PaginationService } from '../routing/pagination.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  accessToken: string | null = null;
  refreshToken: string | null = null;

  constructor(
    private store: StorageService,
    private err: ErrorService,
    private http: HttpClient,
    private user: UserProvider,
    private pagination: PaginationService,
    private portfolio: PortfolioProvider,
    private request: RequestService
  ) {}


  async initialize(): Promise<void> {
    try {
      const session = await this.sessionInService()
      if (session) {
        await this.initializeUser();
        // await this.initializePortfolio();
      } else {
        // Do Something
      }
      return;
    } catch(err) { 
      throw err;
    }
  }

  async initializeUser(): Promise<void> {
    try {
      const response: any = await this.request.get(`${environment.API_URL}/auth/user`)
      this.user.set(response as User);
    } catch(err) { 
      await this.setAccountType()
      this.initialize()
      this.pagination.rootToPage('/editor')
      throw err
    }
  }

  async setAccountType(): Promise<void> {
    try {
      const data = {
        account_type: "employee"
      }
      const response: any = await this.request.put(`${environment.API_URL}/auth/set-account-type`, data)
      console.log(response)
      return
    } catch(err) { 
     throw err
    }
  }

  async initializePortfolio(): Promise<void> {
    try {
      const response: any = await this.request.get(`${environment.API_URL}/ptfl/grab/userPortfolios`)
      if ( !response || response.length === 0 ) {throw this.err.gen(['user has no portfolios'], 'unable to find a portfolio')}
      this.portfolio.set(response[0] as Portfolio);
    } catch(err) { 
      throw err
    }
  }

  async sessionInService(): Promise<boolean> {
    try {
      const accessToken = await this.get('accessToken');
      const refreshToken = await this.get('refreshToken');
      if (accessToken && refreshToken) {
        this.refreshToken = refreshToken;
        const sessionExpired = await this.tokenExpired({
          token: String(accessToken),
          threshold: 1200000,
        });
        if (sessionExpired) {
          const refresher = await this.reissueAccessToken();
          await this.store.string({
            key: 'accessToken',
            value: refresher.access_token,
          });
          this.accessToken = refresher.access_token;
          return true;
        } else {
          this.accessToken = accessToken;
          return true;
        }
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }

  // Pipe New Access Token
  getNewAccessToken() {
    const refreshToken = from(this.getRefresh());
    const rts = this.getRefresh();
    return refreshToken.pipe(
      switchMap((token: any) => {
        if (token) {
          return this.http.post(`${environment.API_URL}/auth/token`, {
            grant_type: 'refresh_token',
            refresh_token: rts,
          });
        } else {
          return of(null);
        }
      })
    );
  }

  getRefresh(): string {
    return String(this.refreshToken);
  }

  // Reissue Token Promise
  async reissueAccessToken() {
    try {
      const tokenResponder: any = await this.request.post(
        `${environment.API_URL}/auth/token`,
        {
          grant_type: 'refresh_token',
          refresh_token: await this.get('refreshToken'),
        }
      );
      return tokenResponder;
    } catch (err: any) {
      console.error(err);
      if (err.error.errors) {
        if (err.error.errors.toString().includes("invalid refresh_token")) {
          this.logout();
        }
      }
    }
  }

  async checkTokenExpiration(): Promise<void> {
    try {
      if (this.accessToken) {
        const sessionExpired = await this.tokenExpired({
          token: String(this.accessToken),
          threshold: 1200000,
        });
        if (sessionExpired) {
          console.error(
            'Token expiration within 20 minutes, preemptive reissue init'
          );
          const refresher = await this.reissueAccessToken();
          this.accessToken = refresher.access_token;
          this.store.string({key: 'accessToken', value: String(refresher.access_token)});
          return;
        } else {
          return;
        }
      }
    } catch (err) {
      console.error('Check Token Expiration', err);
    }
  }

  async tokenExpired(options: {
    token: string;
    threshold: number;
  }): Promise<boolean> {
    try {
      const decoded: any = await jwt_decode(options.token);
      // console.log(
      //   'Comparing token for expiration',
      //   decoded.exp * 1000,
      //   Date.now(),
      //   'Time Left: ' + (decoded.exp * 1000 - Date.now())
      // );
      const isExpired = decoded.exp * 1000 - Date.now() <= options.threshold;
      return isExpired;
    } catch (err) {
      throw err;
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.store.get({ key });
  }

  async logout(): Promise<void> {
    try {
      this.store.delete({ key: 'accessToken' });
      this.store.delete({ key: 'refreshToken' });
      location.href = `https://accounts.grindstoneapp.com/o/oauth/logout`
      return;
    } catch (err) {
      throw err;
    }
  }

  async begin(options: {
    accessToken: string;
    refreshToken: string;
  }): Promise<void> {
    try {
      if (options.accessToken.length === 0) {
        throw this.err.gen(['missing accessToken'], 'failed to begin session');
      }
      if (options.refreshToken.length === 0) {
        throw this.err.gen(['missing refreshToken'], 'failed to begin session');
      }

      await this.store.string({
        key: 'accessToken',
        value: options.accessToken,
      });
      await this.store.string({
        key: 'refreshToken',
        value: options.refreshToken,
      });

      return;
    } catch (err) {
      throw err;
    }
  }
}
