/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { ErrorService } from 'src/services/qas/error.service';

export interface Portfolio {
    id: number;
    profile: Profile;
    routes: Route[];
}

export interface Profile {
    display_name?: string;
    pronouns?: string;
    bio?: string;
    location?: string;
    external_link?: string;
    display_email?: boolean;
}

export interface Route {
    id: number;
    url: string;
    active: boolean;
    inserted_at: number;
}

@Injectable({
  providedIn: 'root'
})

export class PortfolioProvider {

    private portfolio: Portfolio | {} = {};

    constructor(
        private err: ErrorService,
    ) { }

    set(portfolio: Portfolio): void {
        this.portfolio = portfolio;
        return;
    }

    setKey(key: keyof Portfolio, value: any): void {
        if (this.portfolio) {
            (this.portfolio as any)[key] = value
            return;
        } else {
            throw this.err.gen(["portfolio is null"], "unable to set key as the portfolio is null")
        }
    }

    get(): Portfolio {
        if(Object.keys(this.portfolio).length === 0) {
            
        }
        return (Object.assign({}, this.portfolio) as Portfolio);
    }

}
