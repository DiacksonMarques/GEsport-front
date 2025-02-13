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
    return this.httpCLient.put<Candidate>(`${this.urlBase}/putPixName`, {enrollment, name});
  }

  confirmPresence(enrollment: string): Observable<Candidate>{
    return this.httpCLient.put<Candidate>(`${this.urlBase}/putConfirmPresence`, {enrollment});
  }

  resultCandidate(enrollment: string, value: {}, valueLevel: {level: number}): Observable<Candidate>{
    return this.httpCLient.put<Candidate>(`${this.urlBase}/putResultCanditate`, {enrollment, result: value, level:valueLevel.level});
  }

  donwloadTerm() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.httpCLient.get(`${this.urlBase}/donwloadTerm`, {headers: headers, 'responseType': 'blob'});
  }

  getCandidate(enrollment: string): Observable<ReturnGet<Candidate>>{
    return this.httpCLient.get<ReturnGet<Candidate>>(`${this.urlBase}/candidate/${enrollment}`);
  }

  getCandidatePayment(): Observable<Candidate[]>{
    return this.httpCLient.get<Candidate[]>(`${this.urlBase}/candidatePayment`);
  }

  getCandidateForEvaluation(hour: string, gender: string): Observable<Candidate[]>{
    return this.httpCLient.get<Candidate[]>(`${this.urlBase}/candidateForEvaluation/${gender}/${hour}`);
  }
}
