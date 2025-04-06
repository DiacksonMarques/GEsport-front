import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnGet } from '../models/ReturnGet';
import { Product } from '../models/Product';
import { Genreic } from '../models/Generic';
import { PaymentMehod, Sale } from '../models/Sale';
import { Pix } from '../models/Pix';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private urlBase = `${environment.api}`;

  constructor(
    private httpClient: HttpClient,
  ) { }

  getProduct(): Observable<ReturnGet<Product[]>>{
    return this.httpClient.get<ReturnGet<Product[]>>(`${this.urlBase}/allProduct`);
  }

  getSeller(sellerId: number): Observable<ReturnGet<Genreic>>{
    return this.httpClient.get<ReturnGet<Genreic>>(`${this.urlBase}/seller/${sellerId}`);
  }

  getAllSeller(): Observable<ReturnGet<Genreic[]>>{
    return this.httpClient.get<ReturnGet<Genreic[]>>(`${this.urlBase}/allSeller`);
  }

  getAllSale(): Observable<ReturnGet<Sale[]>>{
    return this.httpClient.get<ReturnGet<Sale[]>>(`${this.urlBase}/allSale`);
  }

  getAllSaleStatus(): Observable<ReturnGet<Sale[]>>{
    return this.httpClient.get<ReturnGet<Sale[]>>(`${this.urlBase}/allSaleStatus`);
  }

  getSale(numberSale: number): Observable<ReturnGet<Sale>>{
    return this.httpClient.get<ReturnGet<Sale>>(`${this.urlBase}/sale/${numberSale}`);
  }

  getSaleSeller(sellerId: number): Observable<ReturnGet<Sale[]>>{
    return this.httpClient.get<ReturnGet<Sale[]>>(`${this.urlBase}/checkSaleSeller/${sellerId}`);
  }

  getPixSale(txid: string): Observable<ReturnGet<Pix>>{
    return this.httpClient.get<ReturnGet<Pix>>(`${this.urlBase}/searchPixSale/${txid}`);
  }

  postCreateSale(sale: Sale): Observable<Sale>{
    return this.httpClient.post<Sale>(`${this.urlBase}/createSale`, sale);
  }

  postCreateSeller(seller: { name: string }): Observable<Genreic>{
    return this.httpClient.post<Genreic>(`${this.urlBase}/createSeller`, seller);
  }

  putPaymentMethod(paymentMehod: any): Observable<ReturnGet<Sale>>{
    return this.httpClient.put<ReturnGet<Sale>>(`${this.urlBase}/updatePaymentMethod`, paymentMehod);
  }

  putDeliveryStatus(saleSatsus: any): Observable<ReturnGet<Sale>>{
    return this.httpClient.put<ReturnGet<Sale>>(`${this.urlBase}/updateDeliveryStatus`, saleSatsus);
  }
}
