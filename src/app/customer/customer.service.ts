import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Customer`);
  }

  getCustomerRewardHistory(data: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Customer/` + data);
  }

  getCustomerMonthlyReward(data: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Customer/Reward/` + data);
  }

  getTotalRewardPoint(data: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Customer/MontlyReward/` + data);
  }
}
