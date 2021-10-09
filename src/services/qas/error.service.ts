/* eslint-disable max-len */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ErrorService {

  constructor(
  ) { }

  public gen(errs: any[], message: string) {
      const data = {
        error: {errors: errs},
        message
      }
      return data
  }

}