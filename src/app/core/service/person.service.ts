import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/Person';
import { ReturnGet } from '../models/ReturnGet';
import { Athlete } from '../models/Athlete';

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

  getEnrollment(enrollment: string): Observable<ReturnGet<Athlete>>{
    return this.httpCLient.get<ReturnGet<Athlete>>(`${this.urlBase}/personEnrollment/${enrollment}`);
  }
}
