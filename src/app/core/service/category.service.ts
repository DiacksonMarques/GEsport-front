import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private urlBase = `${environment.api}`;

  constructor(
    private httpCLient: HttpClient,
  ) { }

  getAll(): Observable<Category[]>{
    return this.httpCLient.get<Category[]>(`${this.urlBase}/categorysEnrollment`);
  }
}
