/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { ErrorService } from 'src/services/qas/error.service';

export interface User {
    id: number;
    type: number;
    name: string;
    email: string;
    phone_number: string | null;
    profile_image_url: string;
    verified_email: boolean;
    verified_phone: boolean;
    inserted_at: number;
}

@Injectable({
  providedIn: 'root'
})

export class UserProvider {

    private user: User | {} = {};

    constructor(
        private err: ErrorService,
    ) { }

    set(user: User): void {
        this.user = user;
        return;
    }

    setKey(key: keyof User, value: any): void {
        if (this.user) {
            (this.user as any)[key] = value
            return;
        } else {
            throw this.err.gen(["user is null"], "unable to set key as the user is null")
        }
    }

    get(): User {
        return (Object.assign({}, this.user) as User);
    }

}
