/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { ErrorService } from 'src/services/qas/error.service';
export interface Status {
    id: number;
    name: string;
    short_name: string;
}

export interface Profile {
    display_name: string;
    display_email: boolean;
    bio: string;
    external_link: string;
    pronouns: string;
    location: string;
    video_url?: any;
    inserted_at?: Date;
    updated_at?: Date;
}

export interface ModuleType {
    id: number;
    short_name: string;
    name: string;
    icon: string;
    description: string;
}

export interface Data {
    _id: string;
    date_created: Date;
    portfolio_id: number;
}

export interface Module {
    id: number;
    portfolio_id: number;
    module_type: ModuleType;
    object_id: string;
    status: Status;
    data: Data;
}

export interface User {
    profile_image_url: string;
}

export interface Route {
    id: number;
    url: string;
    active: boolean;
    inserted_at: Date;
}

export interface Portfolio {
    id: number;
    user_id: number;
    status: Status;
    profile: Profile;
    modules: Module[];
    user: User;
    routes: Route[];
    inserted_at: Date;
    updated_at: Date;
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
