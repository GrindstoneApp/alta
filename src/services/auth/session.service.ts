/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { ErrorService } from '../qas/error.service';
import { StorageService } from '../storage/storage.service';

import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { RequestService } from '../http/request.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    private store: StorageService,
    private err: ErrorService,
    private request: RequestService
  ) {}


  async initialize(): Promise<void> {
    try {
      const session = await this.sessionInService()
      return;
    } catch(err) { 
      throw err;
    }
  }

  async sessionInService(): Promise<boolean> {
    try {
      const accessToken = await this.get('accessToken');
      const refreshToken = await this.get('refreshToken');
      if (accessToken && refreshToken) {
        const sessionExpired = await this.tokenExpired({
          token: String(accessToken),
          threshold: 3500000,
        });
        if (sessionExpired) {
          // console.error('Token is expired, reissuing');
          const refresher = await this.reissueAccessToken();
          await this.store.string({
            key: 'accessToken',
            value: refresher.access_token,
          });
          return true;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
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
    } catch (err) {
      console.error(err);
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
      // console.log(isExpired);
      return isExpired;
    } catch (err) {
      throw err;
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.store.get({ key });
  }

  async getLanderURI(): Promise<string> {
    try {
      const user: any = await this.getBasicUser();
      if (user.type) {
        return String(
          `https://${user.type === 2 ? 'my' : 'hire'}.grindstoneapp.com/auth/cb`
        );
      } else {
        return ``;
      }
    } catch (err) {
      console.error(err);
      return '';
    }
  }

  async logout(): Promise<void> {
    try {
      this.store.delete({ key: 'accessToken' });
      this.store.delete({ key: 'refreshToken' });
      return;
    } catch (err) {
      throw err;
    }
  }

  async getBasicUser(): Promise<any> {
    try {
      const user = {
        id: 2,
        name: 'Aiden Appleby',
        email: 'aiden.appleby@yahoo.com',
        type: 2,
        phone_country_code: 1,
        phone_number: '(650) 704-7422',
        country: 'US',
        location: '0xF30E00000101000000FB5C6DC5FEC242400B293FA9F6955EC0',
        profile_image_url:
          'https://user-content.grindstoneapp.com/profile_pictures/2.jpeg',
        verified_email: 1,
        verified_phone: 1,
        inserted_at: '2021-01-16 06:24:03',
      };
      return user;
    } catch (err) {
      throw err;
    }
  }

  async begin(options: {
    accessToken: string;
    refreshToken: string;
  }): Promise<void> {
    try {
      console.log(options);
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
