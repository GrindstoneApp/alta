/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private route: Router) {}

  rootToPage(page: any, params = {}): void {
    this.route.navigate([page], { queryParams: params });
    return;
  }
}
