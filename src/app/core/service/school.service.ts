import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { School } from '../models/School';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private urlBase = `${environment.api}`;

  constructor(
    private httpCLient: HttpClient,
  ) { }

  getAll(): Observable<School[]>{
    return this.httpCLient.get<School[]>(`${this.urlBase}/schools`);
  }
}
