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

  updatePersonParcial(value: Person): Observable<Person>{
    return this.httpCLient.put<Person>(`${this.urlBase}/personEnrollment/${value.id}`, value);
  }

  getEnrollment(enrollment: string): Observable<ReturnGet<Athlete>>{
    return this.httpCLient.get<ReturnGet<Athlete>>(`${this.urlBase}/personEnrollment/${enrollment}`);
  }

  getEnrollmentAthelete(enrollment: string): Observable<ReturnGet<Person>>{
    return this.httpCLient.get<ReturnGet<Person>>(`${this.urlBase}/personEnrollmentAthelete/${enrollment}`);
  }
}
