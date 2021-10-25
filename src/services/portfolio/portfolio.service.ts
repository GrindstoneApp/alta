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

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {

  constructor(
    private store: StorageService,
    private err: ErrorService,
    private http: HttpClient,
    private user: UserProvider,
    private portfolio: PortfolioProvider,
    private request: RequestService
  ) {}

    async create(): Promise<Portfolio> {
        try {
            const response: any = await this.request.post(`${environment.API_URL}/ptfl/create/portfolio`, {})
            return response
        } catch(err) { 
            throw err
        }
   
    }

    async updateProfile(data: any): Promise<Portfolio> {
        try {
            const response: any = await this.request.post(`${environment.API_URL}/ptfl/update/profile`, data)
            return response
        } catch(err) { 
            throw err
        }
   
    }

    async getModules(): Promise<any> {
        try {
            const response: any = await this.request.get(`${environment.API_URL}/ptfl/grab/moduleList`);
            return response;
        } catch(err) {
            throw err;
        }
    }

    async deleteModule(id: number): Promise<any> {
        try {
            const data = {
                module_id: id,
                status: 2
            };
            const response: any = await this.request.post(`${environment.API_URL}/ptfl/update/module`, data)
            return response.status?.id === 2 || false;
        } catch(err) { 
            throw err;
        }
    }

}
