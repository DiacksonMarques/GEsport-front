import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/Person';
import { ReturnGet } from '../models/ReturnGet';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private urlBase = `${environment.api}`;

  constructor(
    private httpCLient: HttpClient,
  ) { }

  createPersonParcial(value: Person): Observable<Person>{
    return this.httpCLient.post<Person>(`${this.urlBase}/personEnrollment`, value);
  }

  getEnrollment(enrollment: string): Observable<ReturnGet<Person>>{
    return this.httpCLient.get<ReturnGet<Person>>(`${this.urlBase}/personEnrollment/${enrollment}`);
  }
}
