/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient,
  ) { }

  post(url: string, data: object) {
    return new Promise((resolve, reject) => {
      this.http.post(url, data).subscribe(
        respon => resolve(respon),
        error => reject(error)
      );
    });
  }

  get(url: string) {
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        respon => resolve(respon),
        error => reject(error)
      );
    });
  }

}
