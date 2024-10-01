import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../../pages/dashboard/financial/Fiancial';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = `${environment.api}`;

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAllMyPayment(): Observable<Payment[]>{
    return this.httpClient.get<Payment[]>(`${this.baseUrl}/paymentUser`);
  }
}
