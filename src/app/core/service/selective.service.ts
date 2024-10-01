import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Candidate } from '../models/Candidate';
import { Observable } from 'rxjs';
import { ReturnGet } from '../models/ReturnGet';

@Injectable({
  providedIn: 'root'
})
export class SelectiveService {

  private urlBase = `${environment.api}`;

  constructor(
    private httpCLient: HttpClient,
  ) { }

  createCandidate(value: Candidate): Observable<Candidate>{
    return this.httpCLient.post<Candidate>(`${this.urlBase}/createCandidate`, value);
  }

  paymentCreate(enrollment: string, name: string): Observable<Candidate>{
    return this.httpCLient.post<Candidate>(`${this.urlBase}/putPixName`, {enrollment, name});
  }

  getCandidate(enrollment: string): Observable<ReturnGet<Candidate>>{
    return this.httpCLient.get<ReturnGet<Candidate>>(`${this.urlBase}/candidate/${enrollment}`);
  }

  donwloadTerm() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.httpCLient.get(`${this.urlBase}/donwloadTerm`, {headers: headers, 'responseType': 'blob'});
  }
}
